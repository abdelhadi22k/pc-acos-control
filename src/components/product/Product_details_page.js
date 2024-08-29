import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import domain from "../../utils/config";
import {  Col, Container, Row, Stack } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";
import EjectSharpIcon from "@mui/icons-material/EjectSharp";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useDispatch } from "react-redux";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentReturnRoundedIcon from "@mui/icons-material/AssignmentReturnRounded";
import Rating from "../utils/Rating";
import Accordion from "react-bootstrap/Accordion";
import Product from "../.././components/product/Product"
import Loading from "../utils/Loding";
import Message from "../utils/Message ";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { AlertTitle, Pagination } from "@mui/material";

const Product_details_page = () => {

  
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadings, setLoadings] = useState(true);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate()
  const [products, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState(1); 
  const itemsPerPage = 3; 
  



  const add_quantity = () => {
    if (product.countInStock === quantity) {
      return;
    } else {
      setQuantity(quantity + 1);
    }
  };

  const remove_quantity = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`${domain}/api/products/slug/${slug}`);
        setProduct(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (product) {
      setLoadings(true);
      async function fetchProject() {
        try {
          const { data } = await axios.get(`${domain}/api/products/categories/${product.category}`);
          setProjects(data);
          setData(data);
        } catch (err) {
          setErrors(err.message);
        } finally {
          setLoadings(false);
        }
      }
      fetchProject();
    }
  }, [product]);

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setPage(value); 
  };

  if (loading) {
    return <Loading/>; 
  }

  if (error) {
    return <Message variant="danger" message={error} />;
  }

  const rate = product.discount.discountAvailable
    ? (product.discount.discountValue * product.price) / 100
    : 0;
  const newPrice = product.price - rate;



  const addToCart = async () => {
    if (product) {
      try {
        const { data } = await axios.get(
          `${domain}/api/products/${product._id}`
        );

        dispatch({
          type: "CART_ADD_ITEM",
          payload: { ...data, quantity },
        });

        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            The product was added to the cart successfully
          </Alert>
        );

        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } catch (err) {
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error.{err.message}
        </Alert>;
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            Error adding to cart: {err.message}
          </Alert>
        );

        setTimeout(() => {
          setAlert(null);
        }, 3000); // إخفاء التنبيه بعد 3 ثوانٍ
      }
    } else {
      <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Product data not loaded 
        </Alert>;
    }
  };


  

  const buy_new = async () => {
    if (product) {
      try {
        const { data } = await axios.get(
          `${domain}/api/products/${product._id}`
        );

        dispatch({
          type: "CART_ADD_ITEM",
          payload: { ...data, quantity },
        });
        navigate("/cart");
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    } else {
      console.log("Product data not loaded");
    }
  };

  return (
    <Container className="product_details_page">
    <div className="alert"> {alert}</div>
      <Row>
        <Col md={4}>
          <img alt={product.name} src={product.product_image}  />
        </Col>
        <Col md={5}>
          <h5>{product.name}</h5>
          <div className="discount_btn_price">
            <h4 className="new_price">Price: </h4>
            {product.discount.discountAvailable ? (
              <span className="discount_btn_details">
                -{product.discount.discountValue}%
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <div>
            {product.discount.discountAvailable ? (
              <div className="discount_price">
                <h4 className="old_price">{product.price.toFixed(2)} </h4>
                <h4 className="new_price"> {newPrice.toFixed(2)} DZD</h4>
              </div>
            ) : (
              <h4 className="new_price">{product.price.toFixed(2)} DZD</h4>
            )}
          </div>
          <div>
            <p>{product.description}</p>
          </div>
          <div className="review_box review_box_product">
            <StarIcon sx={{ fontSize: 18, color: "#DDC531" }} />
            {product.rating}({product.numberReviews} review)
          </div>
          <div className="warranty_box">
            <h4>
              {product.warranty}: <a>Learn more</a>
            </h4>
            <h4>
              Easy returns for products: <a>Learn more</a>
            </h4>
          </div>
        </Col>
        <Col className="buy_box" md={3}>
          <div>
            <h5>Buy New</h5>

            <h5>
              {product.discount.discountAvailable === true ? (
                <div className="discount_price">
                  <span className="new_price"> {newPrice.toFixed(2)} DZD</span>
                </div>
              ) : (
                <span className="new_price">{product.price.toFixed(2)}DZD</span>
              )}
            </h5>
            <h5 className="In_Stock">In Stock</h5>
          </div>
          <div className="quantity">
            <span>Quantity</span>
            <div>
              <div className="quantity_btn">
                <button onClick={add_quantity} className="quantity_btn_1">
                  {" "}
                  <EjectSharpIcon sx={{ fontSize: 18, color: "#DDC531" }} />
                </button>
                <button onClick={remove_quantity} className="quantity_btn_2">
                  {" "}
                  <EjectSharpIcon sx={{ fontSize: 18, color: "#DDC531" }} />
                </button>
              </div>
              {quantity}
            </div>
          </div>
          <div>
            <p>You can shop effectively and find all the right products</p>
          </div>

          <div className="buy_btn">
            <button className="add_card" onClick={addToCart}>
              Add To Cart <LocalMallOutlinedIcon sx={{ fontSize: 24 }} />{" "}
            </button>
            <button className="buy_now" onClick={buy_new}>
              Buy Now
            </button>
          </div>
        </Col>
      </Row>
      <div className="delivery_information">
        <div className="delivery_box">
          <LocalOfferIcon
            sx={{ fontSize: 60, color: "#E7E7E7" }}
            className="icons_delivery"
          />
          <div>
            <h6>HOT Price</h6>
            <p>Save on your needs</p>
          </div>
        </div>
        <div className="delivery_box">
          <LocalShippingIcon
            sx={{ fontSize: 60, color: "#E7E7E7" }}
            className="icons_delivery"
          />
          <div>
            <h6>Fast Delivery</h6>
            <p>Anywhere in Algeria</p>
          </div>
        </div>
        <div className="delivery_box">
          <SupportAgentIcon
            sx={{ fontSize: 60, color: "#E7E7E7" }}
            className="icons_delivery"
          />
          <div>
            <h6>Customer Service</h6>
            <p>From start to finish.</p>
          </div>
        </div>
        <div className="delivery_box">
          <AssignmentReturnRoundedIcon
            sx={{ fontSize: 60, color: "#E7E7E7" }}
            className="icons_delivery"
          />
          <div>
            <h6>Easy returns</h6>
            <p>Exchanges or refunds</p>
          </div>
        </div>
      </div>
      <div className="overview">
        <div className="">
          <h3>Overview</h3>
        </div>
        <div className="table_section">
          <h5>Specifications</h5>

          <table className="table">
            <tbody>
              {product.specifications.map((specification, index) => (

                <tr key={specification._id} className="table">
                  <td>{specification.name}</td> <td>{specification.value}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      <Container >
        <div className="info_reviews">
          <h3>Product ratings and reviews</h3>
          <h5>overall assessment</h5>
          <div className="review_box review_box_product">
            <h3 className="">{product.rating.toFixed(1)}</h3>
            <h3 className="review_title">
              <Rating rating={product.rating.toFixed(1)} /> Review: {product.numberReviews}
            </h3>
          </div>
        </div>

        <div className="detail_reviews">
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="product_reviews_header">
                {" "}
                <h4>Product reviews</h4>{" "}
              </Accordion.Header>
              <Accordion.Body>
              {
                product.product_reviews.map((reviews, index) => {
                  return loading ? (
                    <Loading key={index}></Loading>
                  ) : error ? (
                    <Message variant="danger" message={error} />
                  ) : (
                    <div key={index} className="product_reviews_box">
                      <h5 className="review_title">
                        {reviews.name}{" "}
                        <span className="review_order">Confirmed order</span>
                      </h5>
                      <h6 className="review_title">
                        {reviews.rating.toFixed(1)}
                        <Rating rating={reviews.rating.toFixed(1)} />
                      </h6>
                      <p>{reviews.comment}</p>
                    </div>
                  );
                })
              }
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>

      <div className="product_similar Similar">
        <div className="info_top">
          <h2>Shop some similar products</h2>
        </div>
        <h5>Similar items: {products.length} </h5>
        <div className="product_holder">
          {
            
            currentItems.map((product, index) => {
              return loading ? (
                <Loading key={index}></Loading>
              ) : error ? (
                <Message variant="danger" message={error} />
              ) : (
                <Stack spacing={2} key={index}>
                <Product product={product} />
                </Stack>
              )
            })
          }
        </div>
        <div className="Pagination">
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </div>
      </div>
    </Container>
  );
};

export default Product_details_page;
