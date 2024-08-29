import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import domain from "../utils/config";
import { cartClierItem } from "../redux/cart/cartAction";
import { toast } from 'react-toastify';
import { getError } from './../handelErorr/Utis';
import { useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import CheckoutSteps from "../components/utils/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Alert, AlertTitle } from "@mui/material";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart.cartItems);
  const carts = useSelector((state) => state.cart.cart);
  const userInfo = useSelector((state) => state.user.userInfo);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    carts.cartItems.reduce((a, c) => a + (c.price - ((c.price * c.discount.discountValue) / 100)) * c.quantity, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      // ضبط طريقة الدفع على "عند الاستلام" إذا لم تكن موجودة
      const paymentMethod = "COD"; // أو القيمة المناسبة لطريقة الدفع عند الاستلام
  
      const { data } = await Axios.post(
        `${domain}/api/orders`,
        {
          orderItems: carts.cartItems,
          shippingAddress: carts.shippingAddress,
          paymentMethod: paymentMethod, // تعيين الدفع عند الاستلام
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch(cartClierItem({ type: "CART_CLEAR" }));
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {

      <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Error placing order: ", {err.response ? err.response.data : err.message};
        </Alert>;

      toast.error(getError(err));
    }
  };
  
  useEffect(() => {
    // تعيين طريقة الدفع إلى "عند الاستلام" إذا لم تكن محددة
    if (carts.paymentMethod !== "COD") {
      // يمكنك عرض رسالة للمستخدم أو تنفيذ إجراء آخر هنا
      navigate("/payment");
    }
  }, [carts.paymentMethod, navigate]);
  return (
    <Container className="shipping">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>


              <strong>Name: </strong> {carts.shippingAddress.fullName} <br />
              <strong>Address: </strong>{carts.shippingAddress.address},<br/>
              <strong>Municipality: </strong>{carts.shippingAddress.city}, <br/>
              <strong>Phone Number: </strong>{carts.shippingAddress.postalCode}<br/>
              <strong>Post Code: </strong>{carts.shippingAddress.country}
                
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {carts.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {carts.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.product_image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link className='productTitle' to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>
                        {item.discount.discountAvailable ? (
                          (item.price - ((item.price * item.discount.discountValue) / 100)  * item.quantity ).toFixed(2)
                        ) : (
                         (item.price * item.quantity).toFixed(2) 
                        )}
                     {' '}   DZD
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemsPrice.toFixed(2)} DZD</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice.toFixed(2)} DZD</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{cart.taxPrice.toFixed(2)} DZD</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>{cart.totalPrice.toFixed(2)} DZD</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceOrderPage;
