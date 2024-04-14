import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import loadAnimation from "../assets/Ripple@1.25x-1.0s-200px-200px.gif";

export default function ProductPage({ baseUrl }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${baseUrl}/apis/branded-things/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProducts(data.data);
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

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/apis/branded-things/products/${id}`,
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

      fetchProducts();
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
    fetchProducts();
  }, []);

  return (
    <section
      className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="product-section"
    >
      {loading ? (
        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <img src={loadAnimation} alt="" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="display-2">Products</h1>
            <button
              className="btn btn-primary rounded-pill"
              id="new-product"
              onClick={() => {
                navigate("/products/add");
              }}
            >
              <span className="icon material-symbols-outlined">add</span>New
              Product
            </button>
          </div>
          <div className="row">
            <div className="col-12 table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" width="180px">
                      Image
                    </th>
                    <th scope="col" width="250px">
                      Description
                    </th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Author</th>
                    <th scope="col" width="50px"></th>
                  </tr>
                </thead>
                <tbody id="table-product">
                  {products.length > 0 &&
                    products.map((el, idx) => {
                      return (
                        <tr key={idx}>
                          <td scope="row">{idx + 1}</td>
                          <td className="fw-bold">{el.name}</td>
                          <td>
                            <img src={el.imgUrl} className="img-fluid" />
                          </td>
                          <td>{el.description}</td>
                          <td>{el.stock}</td>
                          <td className="fw-bold">{el.price}</td>
                          <td>{el.User.email}</td>
                          <td>
                            <span className="d-flex">
                              <NavLink
                                className="ms-3"
                                onClick={() => {
                                  handleDelete(el.id);
                                }}
                              >
                                <span className="icon material-symbols-outlined text-danger">
                                  delete
                                </span>
                              </NavLink>
                              <Link
                                to={`/products/update/${el.id}`}
                                className="ms-3"
                              >
                                <span className="icon material-symbols-outlined text-danger">
                                  edit
                                </span>
                              </Link>
                              <Link
                                to={`/products/update-image/${el.id}`}
                                className="ms-3"
                              >
                                <span className="icon material-symbols-outlined text-danger">
                                  image
                                </span>
                              </Link>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
