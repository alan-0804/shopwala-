import { useState } from "react";
import axios from "axios";

function AddItem() {

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    reorderLevel: "",
    mrp: ""
  });

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/items",
        form,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Item added");

      setForm({
        name: "",
        quantity: "",
        reorderLevel: "",
        mrp: ""
      });

    } catch (err) {

      console.log(err.response?.data);

      alert(
        err.response?.data?.error ||
        "Error adding item"
      );

    }
  };

  return (

    <form
      className="add-form"
      onSubmit={handleSubmit}
    >

      <h2>Add Item</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value
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
        placeholder="Reorder Level"
        value={form.reorderLevel}
        onChange={(e) =>
          setForm({
            ...form,
            reorderLevel: e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="MRP"
        value={form.mrp}
        onChange={(e) =>
          setForm({
            ...form,
            mrp: e.target.value
          })
        }
      />

      <button
        className="add-btn"
        type="submit"
      >
        Add
      </button>

    </form>
  );
}

export default AddItem;