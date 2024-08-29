import { Alert } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import domain from "../utils/config";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const [alert, setAlert] = useState(null);
  const [offerAvailable, setOfferAvailable] = useState(false);
  const [offerDescription, setOfferDescription] = useState("");
  const [discountAvailable, setDiscountAvailable] = useState(false);
  const [discountValue, setDiscountValue] = useState("");

  const params = useParams();
  const { id } = params;
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const update = async (event) => {
    event.preventDefault();

    const offer = {
      offerAvailable,
      offerDescription,
    };

    const discount = {
      discountAvailable,
      discountValue: parseFloat(discountValue) || 0,
    };

    const product = {
      offer,
      discount,
    };

    try {
      console.log(product)
      await axios.put(`${domain}/api/products/${id}`, product);

      setAlert(
        <Alert  severity="success" >
          The product has been successfully updated.
        </Alert>
      );
    } catch (error) {
      setAlert(
        <Alert severity="error">
          An error occurred while updating the product: {error.response?.data?.message || error.message}
        </Alert>
      );
    }

    timerRef.current = setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <Container className='UpdateProduct'>
      <div className="alert"> {alert}</div>

      <Form onSubmit={update}>
        <Row className="mb-3"></Row>

        <Row className="mb-3">
          <Col md={6} xs={12}>
            <Form.Group controlId="formGridOfferState">
              <Form.Label>Offer Available</Form.Label>
              <Form.Select
                value={offerAvailable}
                onChange={(e) => setOfferAvailable(e.target.value === "true")}
              >
                <option value="">Select Offer Availability</option>
                <option value="true">true</option>
                <option value="false">false</option>
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
                onChange={(e) => setDiscountAvailable(e.target.value === "true")}
              >
                <option value="">Select Discount Availability</option>
                <option value="true">true</option>
                <option value="false">false</option>
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

        <Button variant="success" type="submit" className="mt-3">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
