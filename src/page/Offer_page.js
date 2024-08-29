import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import domain from "./../utils/config";
import Product from "./../components/product/Product";
import { Container } from "react-bootstrap";
import Loading from "../components/utils/Loding";
import Message from "../components/utils/Message ";
import { Alert, AlertTitle } from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const Offer_page = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const brand = sp.get("brand") || "all";
  const offer = sp.get("offer") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages,  }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: "",
    }
  );

  // products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${domain}/api/products/search?page=${page}&query=${query}&brand=${brand}&offer=${offer}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: console.error(err),
        });
      }
    };
    fetchData();
  }, [category, brand, offer, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${domain}/api/products/categories`);
        setCategories(data);
      } catch (err) {
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error.{err.message}
      </Alert>;
      }
    };
    fetchCategories();
  }, [dispatch]);

  const [brands, setBrand] = useState([]);
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const { data } = await axios.get(`${domain}/api/products/brand`);
        setBrand(data);
      } catch (err) {
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error.{err.message}
        </Alert>;
      }
    };
    fetchBrand();
  }, [dispatch]);

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const { data } = await axios.get(
          `${domain}/api/products/offer_description`
        );
        setOffers(data);
      } catch (err) {
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error.{err.message}
        </Alert>;
      }
    };
    fetchOffer();
  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterBrand = filter.brand || brand;
    const filterOffer = filter.offer || offer;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? "" : "/offer?"
    }category=${filterCategory}&offer=${filterOffer}&brand=${filterBrand}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <Message variant="danger" message={error} />
  ) : (
    <Container className="searchContener">
      <Helmet>
        <title>Shop Product</title>
      </Helmet>

      <Row>
        <Col md={2} className="product_page_sort_by">
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === offer ? "text-bold" : ""}
                  to={getFilterUrl({ offer: "all" })}
                >
                  {" "}
                  All Offer
                </Link>
              </li>

              {offers.map((c) => (
                <li key={c}>
                  <Link
                    className={c === offer ? "text-bold" : ""}
                    to={getFilterUrl({ offer: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading></Loading>
          ) : error ? (
            <Message variant="danger" message={error} />
          ) : (
            <>
            
              {products.length === 0 && <h1>No Product Found</h1>}

              <div className="product_page_holder">
                {products.map((product) => (
                  
                  <div className="mb-3" key={product._id}>
                    <div className="searchBoxHolder">
                      <Product product={product}></Product>
                    </div>
                  </div>
                ))}

              </div>

              <div className="page_next">
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: "/offer",
                      search: getFilterUrl({ page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Offer_page;
