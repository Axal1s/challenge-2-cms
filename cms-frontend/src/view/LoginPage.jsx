import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import Button from "../components/Button";

export default function LoginPage({ baseUrl }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleEmailInput = (event) => {
    setLoginForm({
      ...loginForm,
      email: event.target.value,
    });
  };

  const handlePasswordInput = (event) => {
    setLoginForm({
      ...loginForm,
      password: event.target.value,
    });
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`${baseUrl}/apis/login`, loginForm, {});

      localStorage.setItem("access_token", data.data.access_token);

      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#32CD32",
        },
      }).showToast();

      navigate("/products");
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#C81D11",
        },
      }).showToast();
    }
  };
  return (
    <section className="container" id="login-section">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mb-3 mt-5">Login Options</h1>
          <span>
            Log in and autocomplete your order with your personal data, or sign
            up to enjoy all the benefits of an IDEA account.
          </span>
        </div>
        <div className="col-12 col-lg-8 offset-lg-2 my-5">
          <div className="row">
            <div className="col-12 col-md-6 border-end p-5 text-left">
              <img
                src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/561/1056141_PE848273_S4.webp"
                width="350px"
                alt="sofa"
              />
            </div>
            <div className="col-12 col-md-6 p-5 text-left">
              <div className="form-signin m-auto">
                <form id="login-form" onSubmit={handleFormSubmit}>
                  <h1 className="h3 mb-3 display-1">Log in to your account</h1>
                  <span>
                    Log in on your profile to autocomplete your purchase order
                    with your personal data.
                  </span>
                  <div className="mb-3 mt-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="login-email">Email</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="login-email"
                      placeholder="Enter email address ..."
                      autoComplete="off"
                      required
                      value={loginForm.email}
                      onChange={handleEmailInput}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="login-password">Password</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="login-password"
                      placeholder="Enter your password ..."
                      autoComplete="off"
                      required
                      value={loginForm.password}
                      onChange={handlePasswordInput}
                    />
                  </div>
                  <div className="checkbox mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="login-remember"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="login-remember"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Button nameProp={"Login"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
