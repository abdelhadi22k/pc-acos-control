import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import domain from "./../utils/config";

function AddProduct() {
  const [alert, setAlert] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [product_image, setProductImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [offerAvailable, setOfferAvailable] = useState();
  const [offerDescription, setOfferDescription] = useState("");
  const [discountAvailable, setDiscountAvailable] = useState();
  const [discountValue, setDiscountValue] = useState("");
  const [description, setDescription] = useState("");
  const [warranty, setWarranty] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [rating, setRating] = useState("");
  const [numberReviews, setNumberReviews] = useState("");
  const [specifications, setSpecifications] = useState([
    { name: "", value: "" },
  ]);

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setProductImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  }

  const handleSpecificationChange = (index, event) => {
    const values = [...specifications];
    values[index][event.target.name] = event.target.value;
    setSpecifications(values);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }]);
  };

  const removeSpecification = (index) => {
    const values = [...specifications];
    values.splice(index, 1);
    setSpecifications(values);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const offer = {
      offerAvailable: offerAvailable === "true",
      offerDescription,
    };

    const discount = {
      discountAvailable: discountAvailable === "true",
      discountValue: parseFloat(discountValue) || 0,
    };

    const product = {
      name,
      slug,
      product_image,
      brand,
      category,
      offer,
      discount,
      description,
      warranty,
      price: parseFloat(price) || 0,
      countInStock: parseInt(countInStock) || 0,
      rating: parseFloat(rating) || 0,
      numberReviews: parseInt(numberReviews) || 0,
      specifications,
    };

    const response = await fetch(`${domain}/api/products/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    if (response.ok) {
      setAlert(
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          The product has been successfully added to the store.
        </Alert>
      );
    } else {
      setAlert(
        <Alert severity="error">
          An error occurred while adding the product: {data.message}
        </Alert>
      );
    }

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <Container className="AddProduct">
      {alert && <div className="alert">{alert}</div>}
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                required
                accept="image/*"
                type="file"
                onChange={convertToBase64}
              />
            </Form.Group>
            {product_image && <img src={product_image} alt="Product Preview" />}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} xs={12}>
            <Form.Group controlId="formGridName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6} xs={12}>
            <Form.Group controlId="formGridSlug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6} xs={12}>
            <Form.Group controlId="formGridCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6} xs={12}>
            <Form.Group controlId="formGridBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6} xs={12}>
            <Form.Group controlId="formGridWarranty">
              <Form.Label>Warranty</Form.Label>
              <Form.Control
                placeholder="Warranty"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6} xs={12}>
            <Form.Group controlId="formGridPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6} xs={12}>
            <Form.Group controlId="formGridCountInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} xs={12}>
            <Form.Group controlId="formGridRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6} xs={12}>
            <Form.Group controlId="formGridNumberReviews">
              <Form.Label>Number of Reviews</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of Reviews"
                value={numberReviews}
                onChange={(e) => setNumberReviews(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} xs={12}>
            <Form.Group controlId="formGridOfferState">
              <Form.Label>Offer Available</Form.Label>
              <Form.Select
                value={offerAvailable}
                onChange={(e) => setOfferAvailable(e.target.value)}
              >
                <option>Offer Available</option>
                <option value={true}>true</option>
                <option value={false}>false</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6} xs={12}>
            <Form.Group controlId="formGridOfferDescription">
              <Form.Label>Offer Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Offer Description"
                value={offerDescription}
                onChange={(e) => setOfferDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} xs={12}>
            <Form.Group controlId="formGridDiscount">
              <Form.Label>Discount Available</Form.Label>
              <Form.Select
                value={discountAvailable}
                onChange={(e) => setDiscountAvailable(e.target.value)}
              >
                <option>Discount Available</option>
                <option value={true}>true</option>
                <option value={false}>false</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6} xs={12}>
            <Form.Group controlId="formGridDiscountValue">
              <Form.Label>Discount Value</Form.Label>
              <Form.Control
                type="number"
                placeholder="Discount Value"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        {specifications.map((item, index) => (
          <Row className="mb-3" key={index}>
            <Col md={5} xs={12}>
              <Form.Group controlId={`specName${index}`}>
                <Form.Label>Specifications</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Specifications"
                  name="name"
                  value={item.name}
                  onChange={(event) => handleSpecificationChange(index, event)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={5} xs={12}>
              <Form.Group controlId={`specValue${index}`}>
                <Form.Label>Specifications Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Specifications Value"
                  name="value"
                  value={item.value}
                  onChange={(event) => handleSpecificationChange(index, event)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={2} xs={12}>
              <Form.Group controlId={`removeSpec${index}`}>
                <Button
                  variant="danger"
                  onClick={() => removeSpecification(index)}
                  style={{ marginTop: "32px", width: "100%" }}
                >
                  Remove Specifications
                </Button>
              </Form.Group>
            </Col>
          </Row>
        ))}

        <Button variant="primary" onClick={addSpecification}>
          Add Specifications
        </Button>
        <br />

        <Button variant="success" type="submit" className="mt-3">
          Add Product
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
