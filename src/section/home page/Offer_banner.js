import React from "react";
import { Container } from "react-bootstrap";

const Offer_banner = () => {
  return (
    <Container className="offer_banner">
      <h2>
        Here you will find the best offers for PC parts, with discounts of up to
        30%
      </h2>
      <img alt='banner' src="sources/img/o3.png"/>
    </Container>
  );
};

export default Offer_banner;
