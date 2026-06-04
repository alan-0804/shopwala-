import { useState } from "react";
import API from "../api";
import DistributorLayout from "../components/DistributorLayout";
import "../distributor.css";

function AddProduct() {

  const [form, setForm] = useState({
  name: "",
  category: "",
  mrp: "",
  quantity: "",
  price: "",
  image: ""
});

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // CREATE ITEM
      const itemRes = await API.post(
        "/api/items",
        {
          name: form.name,
          category: form.category,
          mrp: form.mrp,
          quantity: form.quantity,
          image: form.image
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      const itemId = itemRes.data._id;

      // ADD PRICE
      await API.post(
        "/api/prices",
        {
          itemId,
          price: form.price
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Product added");

      setForm({
        name: "",
        category:"",
        mrp: "",
        quantity: "",
        price: "",
        image:""
      });

    } catch (err) {

  console.log(err.response?.data);

  alert(
    err.response?.data?.error ||
    "Error adding product"
  );

}
  };

  return (

  <DistributorLayout>

    <div className="add-product-container">

      <div className="add-product-card">

        <h1>Add Product</h1>

        <p className="subtitle">
          Add a new product to your inventory
        </p>

        <form
          onSubmit={handleSubmit}
          className="add-product-form"
        >

          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value
              })
            }
          >
            <option value="">
              Select Category
            </option>

            <option value="Grocery">
              Grocery
            </option>

            <option value="Beverages">
              Beverages
            </option>

            <option value="Snacks">
              Snacks
            </option>

            <option value="Dairy">
              Dairy
            </option>

            <option value="Personal Care">
              Personal Care
            </option>
          </select>

          <input
            placeholder="MRP"
            value={form.mrp}
            onChange={(e) =>
              setForm({
                ...form,
                mrp: e.target.value
              })
            }
          />

          <input
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({
                ...form,
                quantity: e.target.value
              })
            }
          />

          <input
            placeholder="Distributor Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value
              })
            }
          />

          
          <input
          placeholder="Product Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value
            })
          }
        />

          <button
            className="add-product-btn"
          >
            Save Product
          </button>

        </form>

      </div>

    </div>

  </DistributorLayout>

);
}

export default AddProduct;