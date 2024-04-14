import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import loadAnimation from "../assets/Ripple@1.25x-1.0s-200px-200px.gif";

export default function CategoryPage({ baseUrl }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseUrl}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setCategories(data.data);
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
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section
      className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="category-section"
    >
      {loading ? (
        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <img src={loadAnimation} alt="" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="display-2">Categories</h1>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody id="table-category">
                  {categories.map((el, idx) => {
                    return (
                      <tr key={idx}>
                        <td scope="row">{el.id}</td>
                        <td className="fw-bold">{el.name}</td>
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
