import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useReducer, useState } from "react";
import { getError } from "../handelErorr/Utis";
import axios from "axios";
import domain from "../utils/config";
import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loading from "../components/utils/Loding";
import { useMediaQuery, useTheme } from "@mui/material";
import Message from "../components/utils/Message ";
import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import { userSignin } from "../redux/user/UserAction";
import { toast } from "react-toastify";
import ProgressCircle from "../components/ProgressCircle";

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
    "aria-controls": `tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const [{ loading, error, orders, stats }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    orders: [],
    stats: {
      totalOrders: 0,
      completedOrders: 0,
      pendingOrders: 0,
      totalRevenue: 0,
      paidOrders: 0,
      unpaidOrders: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`${domain}/api/orders`, {
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
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const displayedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [orders]);

  const [{ loadingUpdate }, dispatch1] = useReducer(reducer1, {
    loadingUpdate: false,
  });

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
      dispatch1({ type: "UPDATE_SUCCESS" });
      userSignin({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
      setAlert(
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Profile updated successfully
        </Alert>
      );
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      dispatch1({ type: "UPDATE_FAIL" });
      setAlert(
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Error updating profile: {err.message}
        </Alert>
      );
    }
  };



  const completedOrders = orders.filter(
    (order) => order.isPaid === true && order.isDelivered === true
  );
  const completedOrdersPrice = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  const DeliveredOrders = orders.filter((order) => order.isDelivered === true);
  const DeliveredPrice = DeliveredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  
  
  
  const PaidOrders = orders.filter((order) => order.isPaid === true);
  const PaidPrice = PaidOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  
  
  const unPaidOrders = orders.filter((order) => order.isPaid === false);
  const unPaidPrice = unPaidOrders.reduce((sum, order) => sum + order.totalPrice, 0);



  const totalOrders = orders.length;

  const unDeliveredOrders = totalOrders - DeliveredOrders.length;
  const unDeliveredPercentage = (unDeliveredOrders / totalOrders) * 100;

  if (loading) return <Loading />;
  if (error) return <Message variant="danger" message={error} />;

  return (
    <Container className="userProfile" maxWidth="lg">
      <div className="alert"> {alert}</div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Typography variant="h4" gutterBottom>
        {userInfo.name}'s Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Dashboard Tabs"
          sx={{
            borderRight: isSmallScreen ? "none" : 1,
            borderBottom: isSmallScreen ? 1 : "none",
            borderColor: "divider",
            width: isSmallScreen ? "100%" : "auto",
            "& .MuiTabs-flexContainer": {
              flexDirection: isSmallScreen ? "row" : "column",
            },
          }}
        >
          <Tab label="My Orders" {...a11yProps(0)} />
          <Tab label="Order Summary" {...a11yProps(1)} />
          <Tab label="status" {...a11yProps(2)} />
          <Tab label="Profile" {...a11yProps(3)} />
        </Tabs>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <TabPanel value={value} index={0}>
            <Typography variant="h6" gutterBottom>
              Client Orders
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="orders table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Paid</TableCell>
                    <TableCell align="right">Delivered</TableCell>
                    <TableCell align="right">Items</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell component="th" scope="row">
                          {order._id}
                        </TableCell>
                        <TableCell align="right">
                          {order.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell align="right">
                          {order.totalPrice.toFixed(2)} DZD
                        </TableCell>
                        <TableCell align="right">
                          {order.isPaid ? (
                            <span className="green">Paid</span>
                          ) : (
                            <span className="red">Pending</span>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {order.isDelivered ? (
                            <span className="green">Delivered</span>
                          ) : (
                            <span className="red">Pending</span>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {order.orderItems.length} Items
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
                      <TableCell colSpan={7} align="center">
                        No orders yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Container>
              <Typography variant="h6" gutterBottom>
                Total Price of All Orders: {totalPrice.toFixed(2)} DZD
              </Typography>
              <Grid container spacing={3}>
                {displayedOrders.map((order, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      elevation={3}
                      style={{ padding: "20px", borderRadius: "15px" }}
                    >
                      <Typography variant="h6" component="h2">
                        Order {index + 1 + (currentPage - 1) * ordersPerPage}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        <h5>Total Price: {order.totalPrice.toFixed(2)} DZD</h5>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {order.isDelivered ? "Delivered" : "Pending"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Items: {order.orderItems.length}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </Container>
          </TabPanel>

         

          <TabPanel value={value} index={2}>
            <Typography variant="h6" gutterBottom>
              Payment Status
            </Typography>
            <Container>
              <Typography variant="h4" gutterBottom>
                Dashboard
              </Typography>
              <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Total Orders: {orders.length}</Typography>
                    <Typography variant="h5"></Typography>
                    <ProgressCircle
                      percentage={(orders.length / totalOrders) * 100} // نسبة مئوية لتقدم الطلبات الكلية
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={8} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Revenue: {totalPrice.toFixed(2)} DZD</Typography>
                  <Typography variant="h5"></Typography>
                  <ProgressCircle
                    percentage={1 * 100} 
                  />
                </CardContent>
              </Card>
            </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Confirmed Orders: {completedOrders.length}</Typography>
                    <Typography variant="h5">{completedOrdersPrice.toFixed(2)} DZD</Typography>
                    <ProgressCircle
                      percentage={(completedOrders.length / totalOrders) * 100} 
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Pending Orders: {orders.length - completedOrders.length}</Typography>
                    <Typography variant="h5">{ (totalPrice - completedOrdersPrice).toFixed(2)} DZD</Typography>
                    <ProgressCircle
                      percentage={((orders.length - completedOrders.length) / totalOrders) * 100} 
                    />
                  </CardContent>
                </Card>
              </Grid>
             
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Paid Orders: {PaidOrders.length}</Typography>
                    <Typography variant="h5">{PaidPrice.toFixed(2)} DZD</Typography>
                    <ProgressCircle
                      percentage={(PaidOrders.length / totalOrders) * 100} 
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Unpaid Orders: {orders.length - PaidOrders.length}</Typography>
                    <Typography variant="h5">{unPaidPrice.toFixed(2)} DZD</Typography>
                    <ProgressCircle
                      percentage={((orders.length - PaidOrders.length) / totalOrders) * 100} 
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Delivered Orders: {DeliveredOrders.length}</Typography>
                    <Typography variant="h5"> {DeliveredPrice.toFixed(2)} DZD</Typography>
                    <ProgressCircle
                      percentage={(DeliveredOrders.length / totalOrders) * 100} 
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Undelivered Orders: {unDeliveredOrders} </Typography>
                    <Typography variant="h5">{(totalPrice - DeliveredPrice).toFixed(2)} DZD </Typography>
                   
                    <ProgressCircle
                      percentage={unDeliveredPercentage}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            </Container>
          </TabPanel>

          <TabPanel value={value} index={3}>
          <Typography variant="h6" gutterBottom>
            Update Your Profile
          </Typography>

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
            <Form.Group className="mb-3" controlId="confirmPassword">
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
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
