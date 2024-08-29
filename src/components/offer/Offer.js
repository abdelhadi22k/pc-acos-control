import React from "react";
import { Link } from "react-router-dom";

const Offer = ({ offer }) => {
  return (
    <div className="offer_box">
      <span className="offer_btn">{offer.offer_title}</span>
      <img alt={offer.offer_title} src={offer.offer_image} />
      <h5>{offer.offer_description} </h5>
      <div>
        <Link to='/Product' className="Check_offer">Check the offer</Link>
        <Link to='/Product' className="Shop_products">Shop products</Link>
      </div>
    </div>
  );
};

export default Offer;
