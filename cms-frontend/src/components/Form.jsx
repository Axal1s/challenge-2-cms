import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Form({ baseUrl, nameProp, handleFormSubmit, product }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    stock: "",
    categoryId: "",
  });

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setCategories(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        imgUrl: product.imgUrl,
        stock: product.stock,
        categoryId: product.categoryId,
      });
    }
  }, [product]);

  const handleInputName = (event) => {
    setForm({
      ...form,
      name: event.target.value,
    });
  };
  const handleInputDescription = (event) => {
    setForm({
      ...form,
      description: event.target.value,
    });
  };
  const handleInputPrice = (event) => {
    setForm({
      ...form,
      price: event.target.value,
    });
  };
  const handleInputImgUrl = (event) => {
    setForm({
      ...form,
      imgUrl: event.target.value,
    });
  };
  const handleInputStock = (event) => {
    setForm({
      ...form,
      stock: event.target.value,
    });
  };
  const handleInputCategory = (event) => {
    setForm({
      ...form,
      categoryId: event.target.value,
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="display-2">{nameProp}</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <form
            id="product-form"
            onSubmit={(event) => {
              handleFormSubmit(
                event,
                form.name,
                form.description,
                form.price,
                form.imgUrl,
                form.stock,
                form.categoryId
              );
            }}
          >
            <div className="mb-3">
              <label htmlFor="product-name">
                Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Enter product name"
                autoComplete="off"
                required
                value={form.name}
                onChange={handleInputName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="product-category">
                Category <span className="text-danger fw-bold">*</span>
              </label>
              <select
                id="product-category"
                className="form-select"
                required
                value={form.categoryId}
                onChange={handleInputCategory}
              >
                <option value="" disabled>
                  -- Select Category --
                </option>
                {categories.map((el, idx) => {
                  return (
                    <option key={idx} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="product-desc">
                Description <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="product-desc"
                placeholder="Enter product description"
                autoComplete="off"
                required
                value={form.description}
                onChange={handleInputDescription}
              />
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="product-stock">
                    Stock <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="product-stock"
                    placeholder="Enter product stock"
                    autoComplete="off"
                    required
                    value={form.stock}
                    onChange={handleInputStock}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="product-price">
                    Price <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="product-price"
                    placeholder="Enter product price"
                    autoComplete="off"
                    required
                    value={form.price}
                    onChange={handleInputPrice}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="product-image">Image</label>
              <input
                type="text"
                className="form-control"
                id="product-image"
                placeholder="Enter product image url"
                autoComplete="off"
                value={form.imgUrl}
                onChange={handleInputImgUrl}
              />
            </div>
            <div className="row mt-5 mb-3">
              <div className="col-6">
                <Link
                  to={"/products"}
                  className="btn btn-lg btn-light rounded-pill w-100 p-2"
                  href=""
                >
                  Cancel
                </Link>
              </div>
              <div className="col-6">
                <Button nameProp={nameProp} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
