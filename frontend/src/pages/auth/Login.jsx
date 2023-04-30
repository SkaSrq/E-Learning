import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from "mdb-react-ui-kit";
import "./styles.css";

const Login = () => {
  const googleLogin = () => {
    window.open("http://localhost:8089/auth/google", "_self");
  };
  return (
    <div className="login-box">
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow className="row">
          <MDBCol col="10" md="1"></MDBCol>
          <MDBCol col="10" md="5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </MDBCol>

          <MDBCol col="4" md="5">
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg">
              Sign in
            </MDBBtn>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn
              className="mb-4 w-100 c-g-btn"
              size="lg"
              style={{ backgroundColor: "#4285F4" }}
              onClick={googleLogin}
            >
              <MDBIcon fab icon="google" className="mx-2" />
              Continue with Google
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
