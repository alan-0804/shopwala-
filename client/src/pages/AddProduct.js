import { useState } from "react";
import API from "../api";

function AddProduct() {

  const [form, setForm] = useState({
    name: "",
    mrp: "",
    quantity: "",
    price: ""
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
          quantity: form.quantity
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
        price: ""
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
    <div className="dashboard-card">

      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

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

        <br /><br />
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

<br /><br />
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

        <br /><br />

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

        <br /><br />

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

        <br /><br />

        <button className="add-product-btn">
          Save Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;