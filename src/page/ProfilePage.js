import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignout } from "../redux/user/UserAction";
import { Helmet } from "react-helmet-async";
import { Button, Container } from "react-bootstrap";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useReducer, useState } from "react";
import { getError } from "../handelErorr/Utis";
import axios from "axios";
import domain from "../utils/config";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Loading from "../components/utils/Loding";
import { useMediaQuery, useTheme } from '@mui/material';
import Message from "../components/utils/Message ";
import { Form } from "react-bootstrap"
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import { userSignin } from "../redux/user/UserAction";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const reducer1 = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const ProfilePage = () => {


  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    orders: [], // تهيئة orders كمصفوفة فارغة
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`${domain}/api/orders/mine`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  const [value, setValue] = useState(0);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signoutHandler = () => {
    userSignout({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };


  const [{ loadingUpdate }, dispatch1] = useReducer(reducer1, {
    loadingUpdate: false,
  });
  if (confirmPassword === loadingUpdate) {
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${domain}/api/users/profile`,
        {
          name,
          email,
          password,
        },
        { 
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch1({
        type: "UPDATE_SUCCESS",
      });
      userSignin({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");

      setAlert(
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          The product was added to the cart successfully
        </Alert>
      );

      setTimeout(() => {
        setAlert(null);
      }, 3000);

    } catch (err) {
      dispatch1({
        type: "FETCH_FAIL",
      });
      setAlert(
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Error adding to cart: {err.message}
        </Alert>
      );
    }
  };




  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Message variant="danger" message={error} />;
  }

  return (
    <Container className="userProfile" maxWidth="lg">
    <div className="alert"> {alert}</div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Typography variant="h4" gutterBottom>
        {userInfo.name} Profile
      </Typography>
  
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <Tabs
          orientation={isSmallScreen ? 'horizontal' : 'vertical'}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Profile Tabs"
          sx={{
            borderRight: isSmallScreen ? 'none' : 1,
            borderBottom: isSmallScreen ? 1 : 'none',
            borderColor: 'divider',
            width: isSmallScreen ? '100%' : 'auto',
            '& .MuiTabs-flexContainer': {
              flexDirection: isSmallScreen ? 'row' : 'column',
            },
          }}
        >
          <Tab label="My order" {...a11yProps(0)} />
          <Tab label="Profile" {...a11yProps(1)} />
          <Tab label="Sign Out" {...a11yProps(2)} />
        </Tabs>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <TabPanel value={value} index={0}>
            <Typography variant="h6" gutterBottom>Order History</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">DATE</TableCell>
                    <TableCell align="right">TOTAL</TableCell>
                    <TableCell align="right">PAID</TableCell>
                    <TableCell align="right">DELIVERED</TableCell>
                    <TableCell align="right">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell component="th" scope="row">
                          {order._id}
                        </TableCell>
                        <TableCell align="right">{order.createdAt.substring(0, 10)}</TableCell>
                        <TableCell align="right">{order.totalPrice.toFixed(2)} DZD</TableCell>

                        <TableCell align="right">

                        {order.isPaid === true ? (
                          <h4 variant="danger"> Paid </h4>
                        ) : (
                          <h4 variant="danger">Cash on delivery</h4>
                        )}
          
                        </TableCell>


                        <TableCell align="right">
                       
                        {order.isDelivered === true ? (
                          <h4 variant="danger"> delivery</h4>
                        ) : (
                          <h4 variant="danger">
                          delivered soon	
                          </h4>
                        )}
                        
                        </TableCell>


                        <TableCell align="right">
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => navigate(`/order/${order._id}`)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        لا توجد طلبات حتى الآن
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={value} index={1}>
          <Typography variant="h6" gutterBottom>Update Your  Info</Typography>

             <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Update</Button>
          </div>
        </Form>
          </TabPanel>

          <TabPanel value={value} index={2}>
          <Container className="userProfile">
      
              <ul>

                <li onClick={signoutHandler}>

                  <Link to="/signin">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> signout
                  </Link>
                </li>
              </ul>
          
        </Container>
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
