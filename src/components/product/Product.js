import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import domain from "../../utils/config";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { AlertTitle } from "@mui/material";

const Product = ({ product }) => {
  const [quantity, setCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

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
        This is an error
      </Alert>;
    }
  };

  const addToLike = async () => {
    if (product) {
      try {
        const { data } = await axios.get(
          `${domain}/api/products/${product._id}`
        );

        dispatch({
          type: "LIKE_ADD_ITEM",
          payload: { ...data },
        });

        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            The product was added to the Favorite successfully
          </Alert>
        );

        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } catch (err) {
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            Error adding to Favorite: {err.message}
          </Alert>
        );

        setTimeout(() => {
          setAlert(null);
        }, 3000); // إخفاء التنبيه بعد 3 ثوانٍ
      }
    } else {
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error
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

        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            The product was added to the Favorite successfully
          </Alert>
        );

        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } catch (err) {
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            Error adding to Favorite: {err.message}
          </Alert>
        );

        setTimeout(() => {
          setAlert(null);
        }, 3000); // إخفاء التنبيه بعد 3 ثوانٍ
      }
    } else {
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error.
      </Alert>;
    }
  };


  const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${domain}/api/products/${productId}`);

        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Deleted successfully
          </Alert>
        );
        setTimeout(() => {
          setAlert(null);
        }, 3000);
    } catch (error) {
      <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error. {error}
    </Alert>;
    } 
};


  const rate = (product.discount.discountValue * product.price) / 100;
  const newPrice = product.price - rate;

  return (
    <div className="product_box">
      <div className="alert"> {alert}</div>
      <div className="product_img">
        <span>
          {product.discount.discountAvailable === true ? (
            <span className="discount_btn">
              -{product.discount.discountValue}%
            </span>
          ) : (
            <span></span>
          )}
        </span>
        <span>
          {product.offer.offerAvailable === true ? (
            <span className="product_offer_btn">
              {product.offer.offerDescription}
            </span>
          ) : (
            <span></span>
          )}
        </span>
  
        <Link to={`/Product/${product.slug}`}>
          <img loading="lazy" alt={product.name} src={product.product_image} />
        </Link>
      </div>

      <div className="product_info">
        <h5>{product.name}</h5>

        <div className="price_box">
          <div className="review_box">
            <StarIcon sx={{ fontSize: 18, color: "#DDC531" }} />
            {product.rating.toFixed(1)}({product.numberReviews} review)
          </div>
          <h5>
            {product.discount.discountAvailable === true ? (
              <div className="discount_price">
                <span className="old_price">{product.price.toFixed(2)} </span>

                <span className="new_price"> {newPrice.toFixed(2)} DZD</span>
              </div>
            ) : (
              <span className="new_price">{product.price.toFixed(2)}DZD</span>
            )}
          </h5>
        </div>
        <div className="btn_holder">
          <button className="add_card" onClick={() => deleteProduct(product._id)}>
            DELETE
          </button>

          <Link className="add_card" to={`/UPdateProduct/${product._id}`} >
            up date
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Product;
