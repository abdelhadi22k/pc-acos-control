import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignin } from "../redux/user/UserAction";
import { Helmet } from "react-helmet-async";
import domain from "../utils/config";


function SingIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelsubmit = async (event) => {
    event.preventDefault();
    const data = await fetch(`${domain}/api/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const datas = await data.json();
    console.log(datas);
    userSignin({
      type: "USER_SIGNIN",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/");
  };

  return (
    <Container className="Container">
      <Helmet>
        <title> Sign In</title>
      </Helmet>
      <div className="mainContainers">
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            required={true}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            required={true}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="submit">
          <button type="submit" className="btnsub" onClick={handelsubmit}>
            Sign In
          </button>

          <Link className="naveget" to={"/singup"}>
            {" "}
            You don't have account{" "}
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default SingIn;