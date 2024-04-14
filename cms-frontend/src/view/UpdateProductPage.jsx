import axios from "axios";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";
import { useEffect, useState } from "react";

export default function UpdateProductPage({ baseUrl }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/apis/branded-things/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProduct(data.data);
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
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleFormSubmit = async (
    event,
    name,
    description,
    price,
    imgUrl,
    stock,
    categoryId
  ) => {
    try {
      event.preventDefault();

      const body = {
        name,
        description,
        imgUrl,
        price: +price,
        stock: +stock,
        categoryId: +categoryId,
      };

      const { data } = await axios.put(
        `${baseUrl}/apis/branded-things/products/${id}`,
        body,
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
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-product-section"
      >
        <Form
          baseUrl={baseUrl}
          nameProp={"Update Product"}
          handleFormSubmit={handleFormSubmit}
          product={product}
        />
      </section>
    </>
  );
}
