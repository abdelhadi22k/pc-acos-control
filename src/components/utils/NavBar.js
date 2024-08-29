import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LoupeIcon from '@mui/icons-material/Loupe';

function NavBar() {
  const likeData = useSelector((state) => state.like.like.likeItems);
  const cartData = useSelector((state) => state.cart.cart.cartItems);
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <Container className="Nva_Container">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary Navbar">
        <LinkContainer to="/">
          <Navbar.Brand className="Nav_Brand" href="#home">
            <img alt="Brand" src="sources/svg/mainLogo.svg" />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="Navbar_Toggle"
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="Nav_Link_Icon">
            <Link  to="/product">
            product...
            </Link>
            <Link to="/add_Product">
            Add product...
            </Link>

            <Link to="/Dashboard">
              Dashboard...
            </Link>

            <Link to="/Favorite">
              <FavoriteBorderIcon sx={{ fontSize: 24 }} />
              {likeData.length > 0 && (
                <Badge pill bg="danger">
                  +
                </Badge>
              )}
            </Link>

            {userInfo ? (
              <Link to="/profile" className="Nav nava NavDropdown">
                <Person2OutlinedIcon sx={{ fontSize: 24 }} />
              </Link>
            ) : (
              <Link className="" to="/SingUp">
                SingUp
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavBar;
