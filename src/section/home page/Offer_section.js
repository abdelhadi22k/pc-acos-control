import { Container } from "react-bootstrap";
import offer from "../../data/offers";
import Offer from "../../components/offer/Offer";
import axios from "axios";
import domain from "../../utils/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Offer_section = () => {


 

  return (
    <Container className="offer_container">
      <div className="info_top">
        <h2>Electronic products  offers </h2>
        <Link to="/Product" className="main_btn">Discover More</Link>
      </div>

      <div className="offer_holder">
        {offer.slice(0, 3).map((offer, index) => {
          return <Offer key={index} offer={offer} />;
        })}
      </div>
    </Container>
  );
};

export default Offer_section;
