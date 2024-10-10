import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import { jwtDecode } from "jwt-decode";
import ClipLoader from "react-spinners/ClipLoader"; // Import the animated spinner

const API_BASE_URL = `https://sreeteqs-api.onrender.com/api/auth`;

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return () => {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    if (!userId || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true); 

    try {
      const endpoint = role === "user"
        ? `${API_BASE_URL}/login-user`
        : `${API_BASE_URL}/login-technician`;

      const payload = role === "user"
        ? { userid: userId, password }
        : { techid: userId, password };

      const response = await axios.post(endpoint, payload);
      const { token, user, techId } = response.data;
      const decodedToken = jwtDecode(token);
      const id = role === "user"
        ? user?.userid || decodedToken.userId
        : techId || decodedToken.techId;

      if (token && id) {
        localStorage.setItem(role === "user" ? "user_token" : "tech_token", token);
        localStorage.setItem(role === "user" ? "user_id" : "tech_id", id);

        if (role === "user") {
          localStorage.removeItem("tech_id");
        } else {
          localStorage.removeItem("user_id");
        }

        navigate(role === "user" ? "/userdashboard" : "/techdashboard");
      } else {
        setError("Invalid User ID or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2019/05/15/10/16/air-conditioner-4204637_1280.jpg')",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={handleLogin} className="form">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="Logo"
                        src={require("assets/img/now-logo.png")}
                      />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="User ID"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons objects_key-25"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      />
                    </InputGroup>

                    <div className="text-center my-3">
                      <label>
                        <input
                          type="radio"
                          name="role"
                          value="user"
                          checked={role === "user"}
                          onChange={() => setRole("user")}
                        />{" "}
                        User
                      </label>
                      {"  "}
                      <label>
                        <input
                          type="radio"
                          name="role"
                          value="technician"
                          checked={role === "technician"}
                          onChange={() => setRole("technician")}
                        />{" "}
                        Technician
                      </label>
                    </div>

                    {error && <div className="text-danger text-center">{error}</div>}
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      size="lg"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <ClipLoader color="#ffffff" size={25} /> : "Get Started"}
                    </Button>
                    <div className="text-center mt-3">
                      <a href="/signup-page" className="link">
                        Create Account
                      </a>
                    </div>
                    <div className="text-center mt-2">
                      <a
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        className="link"
                      >
                        Need Help?
                      </a>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
