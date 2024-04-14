import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function AddUserPage({ baseUrl }) {
  const navigate = useNavigate();

  const [addUserForm, setAddUserForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handleUsernameInput = (event) => {
    setAddUserForm({
      ...addUserForm,
      username: event.target.value,
    });
  };
  const handleEmailInput = (event) => {
    setAddUserForm({
      ...addUserForm,
      email: event.target.value,
    });
  };
  const handlePasswordInput = (event) => {
    setAddUserForm({
      ...addUserForm,
      password: event.target.value,
    });
  };
  const handlePhoneNumberInput = (event) => {
    setAddUserForm({
      ...addUserForm,
      phoneNumber: event.target.value,
    });
  };
  const handleAddressInput = (event) => {
    setAddUserForm({
      ...addUserForm,
      address: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post(
        `${baseUrl}/apis/add-user`,
        addUserForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

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
    <section
      className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="new-user-section"
    >
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="pt-3 pb-2 mb-3 border-bottom">
            <form id="register-form" onSubmit={handleFormSubmit}>
              <h1 className="h3 mb-3 display-1">Register User</h1>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="register-username">Username</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="register-username"
                  placeholder="Enter username ..."
                  autoComplete="off"
                  required
                  value={addUserForm.username}
                  onChange={handleUsernameInput}
                />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="register-email">Email</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="register-email"
                  placeholder="Enter email address ..."
                  autoComplete="off"
                  required
                  value={addUserForm.email}
                  onChange={handleEmailInput}
                />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="register-password">Password</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="register-password"
                  placeholder="Enter password ..."
                  autoComplete="off"
                  required
                  value={addUserForm.password}
                  onChange={handlePasswordInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="register-phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="register-phone"
                  placeholder="Enter phone number (optional) ..."
                  autoComplete="off"
                  value={addUserForm.phoneNumber}
                  onChange={handlePhoneNumberInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="register-address">Address</label>
                <textarea
                  id="register-address"
                  className="form-control"
                  rows="3"
                  placeholder="Enter address (optional) ..."
                  autoComplete="off"
                  value={addUserForm.address}
                  onChange={handleAddressInput}
                ></textarea>
              </div>
              <button
                className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
