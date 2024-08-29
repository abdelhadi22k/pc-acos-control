import axios from "axios";
import React, { useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import domain from "../utils/config";
import { userSignin } from "../redux/user/UserAction";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const reducer = (state, action) => {
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

const ProfileScreen = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);


  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
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
      dispatch({
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
      dispatch({
        type: "FETCH_FAIL",
      });
      setAlert(
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Error adding to cart: {err.message}
        </Alert>
      );
    }
  };

  return (
    
    <div> 
    <div className="alert"> {alert}</div>
      <div className="container small-container">
        <Helmet>
          <title>User Profile</title>
        </Helmet>
        <h1 className="my-3">User Profile</h1>
        <form onSubmit={submitHandler}>
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
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
