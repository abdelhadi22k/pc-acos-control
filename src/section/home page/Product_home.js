import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Product from "../../components/product/Product";
import axios from "axios";
import domain from "../../utils/config";
import Loading from "../../components/utils/Loding";
import Message from "../../components/utils/Message ";
import { Link } from "react-router-dom";

const Product_home = () => {
  
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); 
  const itemsPerPage = 6; 

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${domain}/api/products`);
        setProduct(data);
        setData(data); 
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }
    fetchProduct();
  }, []);

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setPage(value); 
  };

  return (
    <Container className="product_home">
      <div className="info_top">
        <h2>Save your money by shopping with us</h2>
        <Link to="/Product" className="main_btn">
          Discover More
        </Link>
      </div>
      <div className="product_holder">
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <Message variant="danger" message={error}></Message>
        ) : (
          currentItems.map((product, index) => (
            <Stack spacing={2} key={index}>
              <Product product={product} />
            </Stack>
          ))
        )}
      </div>

      <div className="Pagination">
        <Pagination
          count={Math.ceil(product.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </div>
    </Container>
  );
};

export default Product_home;
