import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loadAnimation from "../assets/Ripple@1.25x-1.0s-200px-200px.gif";
import Toastify from "toastify-js";

export default function UpdateProductImage({ baseUrl }) {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formData = new FormData();

  async function handleFormSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);

      formData.append("file", image);

      const { data } = await axios.patch(
        `${baseUrl}/apis/branded-things/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "Mul",
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="update-product-section"
    >
      {loading ? (
        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <img src={loadAnimation} alt="" />
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="pt-3 pb-2 mb-3">
                <form id="register-form" onSubmit={handleFormSubmit}>
                  <h1 className="h3 mb-3 display-1">Update Image</h1>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control pb-2"
                      id="inputGroupFile02"
                      autoComplete="off"
                      required
                      onChange={(event) => {
                        setImage(event.target.files[0]);
                      }}
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                    type="submit"
                  >
                    Update Image
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
