import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // لا تنس استخدام useDispatch
import { userSignin } from "../redux/user/UserAction";
import { Helmet } from "react-helmet-async";
import domain from "../utils/config";
function SingIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // استخدم useDispatch لتحديث الـRedux

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const handelsubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${domain}/api/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const datas = await response.json();
      if (response.ok) {
        const { token, user } = datas;
        dispatch(
          userSignin({
            type: "USER_SIGNIN",
            payload: { token, user },
          })
        );
        localStorage.setItem("userInfo", JSON.stringify({ token, user }));
        setTimeout(() => {
          navigate("/");
          window.location.reload(); 
        }, 1000);
      } else {
        setErr(datas.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="signIn-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <div className="form-wrapper">
        <h2 className="form-title">Sign In</h2>

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
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <Link className="sign-up-link" to={"/singup"}>
            Don't have an account? Sign Up
          </Link>
          <span className="sign-up-link-err">{err}</span>
        </div>
      </div>
    </Container>
  );
}

export default SingIn;
