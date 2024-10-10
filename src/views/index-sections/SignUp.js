import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner
} from "reactstrap";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    userid: "",
    Name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    techId: "",
    techName: "",
    techEmail: "",
    techPhone: "",
    aadharNumber: "",
    techPassword: "",
    techConfirmPassword: "",
  });

  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For loading animation
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setErrors({});

    if (selectedRole === "user") {
      setFormData((prev) => ({
        ...prev,
        techId: "",
        techName: "",
        techEmail: "",
        techPhone: "",
        aadharNumber: "",
        techPassword: "",
        techConfirmPassword: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        userid: "",
        Name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      }));
    }
  };

  const validateUserForm = () => {
    const newErrors = {};
    if (!formData.userid.trim()) newErrors.userid = "User ID is required.";
    if (!formData.Name.trim()) newErrors.Name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const validateTechnicianForm = () => {
    const newErrors = {};
    if (!formData.techId.trim()) newErrors.techId = "Tech ID is required.";
    if (!formData.techName.trim()) newErrors.techName = "Name is required.";
    if (!formData.techEmail) newErrors.techEmail = "Email is required.";
    if (!formData.techPhone) newErrors.techPhone = "Phone number is required.";
    if (!formData.aadharNumber) newErrors.aadharNumber = "Aadhar number is required.";
    if (!formData.techPassword) newErrors.techPassword = "Password is required.";
    if (formData.techPassword !== formData.techConfirmPassword) newErrors.techConfirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = role === "user" ? validateUserForm() : validateTechnicianForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Start loading animation
    const endpoint = role === "user"
      ? `https://sreeteqs-api.onrender.com/api/auth/register-user`
      : `https://sreeteqs-api.onrender.com/api/auth/register-technician`;

    const payload = role === "user"
      ? {
        userid: formData.userid,
        Name: formData.Name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }
      : {
        techid: formData.techId,
        techName: formData.techName,
        email: formData.techEmail,
        phone: formData.techPhone,
        adharnumber: formData.aadharNumber,
        password: formData.techPassword,
      };

    try {
      const response = await axios.post(endpoint, payload);
      setLoading(false); // Stop loading animation
      navigate("/login-page");
    } catch (error) {
      setLoading(false); // Stop loading animation in case of an error
      console.error("Error during signup:", error.response?.data?.message || "Signup failed");
      setErrors({ submit: error.response?.data?.message || "Signup failed. Please try again." });
    }
  };

  return (
    <div
      className="section section-signup"
      style={{
        backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        minHeight: "700px",
      }}
    >
      <Container>
        <Row>
          <Card className="card-signup" data-background-color="blue">
            <Form className="form" onSubmit={handleSubmit}>
              <CardHeader className="text-center">
                <CardTitle className="title-up" tag="h3">Sign Up</CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="text-center mb-3">
                  <Col>
                    <Button
                      className={role === "user" ? "btn-primary" : "btn-neutral"}
                      onClick={() => handleRoleChange({ target: { value: "user" } })}
                    >
                      User
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className={role === "technician" ? "btn-primary" : "btn-neutral"}
                      onClick={() => handleRoleChange({ target: { value: "technician" } })}
                    >
                      Technician
                    </Button>
                  </Col>
                </Row>

                {role === "user" && (
                  <>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="userid"
                        placeholder="User ID..."
                        type="text"
                        onChange={handleChange}
                        value={formData.userid}
                      />
                      {errors.userid && <div className="text-danger">{errors.userid}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="Name"
                        placeholder="Name..."
                        type="text"
                        onChange={handleChange}
                        value={formData.Name}
                      />
                      {errors.Name && <div className="text-danger">{errors.Name}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        placeholder="Email..."
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons tech_mobile"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="phone"
                        placeholder="Phone Number..."
                        type="text"
                        onChange={handleChange}
                        value={formData.phone}
                      />
                      {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        placeholder="Password..."
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                      />
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="confirmPassword"
                        placeholder="Confirm Password..."
                        type="password"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                      />
                      {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                    </InputGroup>
                  </>
                )}

                {role === "technician" && (
                  <>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="techId"
                        placeholder="Technician ID..."
                        type="text"
                        onChange={handleChange}
                        value={formData.techId}
                      />
                      {errors.techId && <div className="text-danger">{errors.techId}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="techName"
                        placeholder="Name..."
                        type="text"
                        onChange={handleChange}
                        value={formData.techName}
                      />
                      {errors.techName && <div className="text-danger">{errors.techName}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="techEmail"
                        placeholder="Email..."
                        type="email"
                        onChange={handleChange}
                        value={formData.techEmail}
                      />
                      {errors.techEmail && <div className="text-danger">{errors.techEmail}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons tech_mobile"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="techPhone"
                        placeholder="Phone Number..."
                        type="text"
                        onChange={handleChange}
                        value={formData.techPhone}
                      />
                      {errors.techPhone && <div className="text-danger">{errors.techPhone}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons business_badge"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="aadharNumber"
                        placeholder="Aadhar Number..."
                        type="text"
                        onChange={handleChange}
                        value={formData.aadharNumber}
                      />
                      {errors.aadharNumber && <div className="text-danger">{errors.aadharNumber}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="techPassword"
                        placeholder="Password..."
                        type="password"
                        onChange={handleChange}
                        value={formData.techPassword}
                      />
                      {errors.techPassword && <div className="text-danger">{errors.techPassword}</div>}
                    </InputGroup>
                    <InputGroup className={"no-border"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="techConfirmPassword"
                        placeholder="Confirm Password..."
                        type="password"
                        onChange={handleChange}
                        value={formData.techConfirmPassword}
                      />
                      {errors.techConfirmPassword && <div className="text-danger">{errors.techConfirmPassword}</div>}
                    </InputGroup>
                  </>
                )}

                {errors.submit && <div className="text-danger text-center">{errors.submit}</div>}
              </CardBody>
              <CardFooter className="text-center">
                <Button type="submit" className="btn-neutral btn-round" color="primary" size="lg">
                  {loading ? <Spinner size="sm" color="light" /> : "Sign Up"}
                </Button>
                <Row className="text-center">
                  <Col>
                  <Link to="/login-page">Already have an account? Login</Link>
                  </Col>
                  </Row>
              </CardFooter>
            </Form>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
