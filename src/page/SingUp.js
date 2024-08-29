import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignin } from "../redux/user/UserAction";
import { Helmet } from "react-helmet-async";
import domain from "../utils/config";

function SingUp() {
  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const handelsubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${domain}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const datas = await response.json();

      if (response.ok) {
        userSignin({
          type: "USER_SIGNIN",
          payload: datas,
        });

        localStorage.setItem("userInfo", JSON.stringify(datas));

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 500);
      } else {
        setErr(datas.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Container className="signUp-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="form-wrapper">
        <h2 className="form-title">Create Your Account</h2>
        <div className="form-group">
          <label htmlFor="title">Username</label>
          <input
            id="name"
            type="text"
            placeholder="name"
            value={name}
            required={true}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            onClick={handelsubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : " Sign Up"}
          </button>
          <Link className="naveget" to={"/signin"}>
            Already have an account? Sign In
          </Link>
          <span className="sign-up-link-err">{err}</span>
        </div>
      </div>
    </Container>
  );
}

export default SingUp;
