import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Product from "../components/product/Product";


function LikePage() {
  const dispatch = useDispatch();

  const likeData = useSelector((state) => state.like.like.likeItems);
  const userInfo = useSelector((state) => state.user.userInfo);

  const removeItemHandler = (item) => {
    dispatch({
      type: "LIKE_REMOVE_ITEM",
      payload: item,
    });
  };

  return (
    <Container className="cartSction">
      <Helmet>
        <title>{userInfo.name} Favorites</title>
      </Helmet>
      <div>
        <h1>Favorites Product</h1>
        {likeData.length === 0 ? (
          <div className="empty_page">
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <lord-icon
              src="https://cdn.lordicon.com/oiiqgosg.json"
              trigger="hover"
              colors="primary:#151515"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>

            <h3>
              You Have No Favorite Products <br />{" "}
              <Link to="/Product">Go Shopping</Link>
            </h3>
          </div>
        ) : (
          <div className="Favorites">
            {likeData.map((item) => (
              <div className="FavoritesItem" key={item._id}>
                <Product product={item} />
                <Button onClick={() => removeItemHandler(item)} variant="light">
                  <i className="fas fa-trash"></i>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default LikePage;
