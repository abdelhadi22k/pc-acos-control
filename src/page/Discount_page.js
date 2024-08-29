import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Product from "../components/product/Product";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import domain from "../utils/config";

const Discount_page = () => {

  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${domain}/api/products/product_discount`);
        setProduct(data);
        setData(data);  // Set data to all Products initially
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }
    fetchProduct();
  }, []);


  


  return (
    <Container className="product_page">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Row>
        <Col md={3} className="product_page_sort_by">
          <ul>
            {product.map((product, index) => {
              return <li>{product.category}</li>;
            })}
          </ul>
        </Col>

        <Col md={9} className="product_page_holder">
          {product.map((product, index) => {
            return <Product key={index} product={product} />;
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Discount_page;
