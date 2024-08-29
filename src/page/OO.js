

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSignout } from "../redux/user/UserAction";
import { Helmet } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditNoteIcon from '@mui/icons-material/EditNote';
const ProfilePage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const signoutHandler = () => {
    userSignout({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <Container className="userProfile">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1>{userInfo.name} Profile</h1>
  
          <ul>
            <li>
              <Link to="/Favorite">
              <FavoriteIcon sx={{ fontSize: 36 }} /> Favorites
              </Link>
            </li>
            <li>
              <Link to="/orderhistory">
              <BorderColorIcon sx={{ fontSize: 36 }} /> My Order
              </Link>
            </li>
            <li>
              <Link to="/Editprofile">
                {" "}
                <EditNoteIcon sx={{ fontSize:40 }} /> Edit Profile
              </Link>
            </li>
            <li onClick={signoutHandler}>
              <Link to="/signin">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> signout
              </Link>
            </li>
          </ul>
      
    </Container>
  );
};
export default ProfilePage;
