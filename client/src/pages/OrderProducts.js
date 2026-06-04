import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch }
from "react-redux";
import { useNavigate }
from "react-router-dom";
import { addToCart }
from "../redux/cartSlice";
import Layout from "../components/Layout";
function OrderProducts() {

  const [items, setItems] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");
 const navigate = useNavigate();
 const dispatch = useDispatch();
  // LOAD PRODUCTS

  useEffect(() => {

    loadItems();

  }, []);


  const loadItems = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/items"
      );

      const itemsWithPrices =
        await Promise.all(

          res.data.map(async (item) => {

            try {

              const best =
                await axios.get(
                  `http://localhost:5000/api/prices/best/${item._id}`
                );

              return {
                ...item,
                bestPrice: best.data
              };

            } catch {

              return {
                ...item,
                bestPrice: null
              };

            }
          })
        );

      setItems(itemsWithPrices);

    } catch (err) {

      console.log(err);

    }
  };


  // FILTER PRODUCTS

  const filteredItems =
    items.filter((item) => {

      const matchCategory =
        selectedCategory === "All"
          ? true
          : item.category ===
            selectedCategory;

      const matchSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchCategory &&
        matchSearch
      );
    });

    const placeOrder = async (item) => {

  const quantity =
    prompt("Enter quantity");

  if (!quantity) return;

  try {

    const token =
      localStorage.getItem("token");

    await axios.post(

      "http://localhost:5000/api/orders",

      {
        priceId:
          item.bestPrice._id,

        quantity
      },

      {
        headers: {
          Authorization: token
        }
      }
    );

    alert("Order placed");

  } catch (err) {

    console.log(err);

    alert("Order failed");

  }
};
 return (

  <Layout>

    <div className="card">

      <div className="card-hd">

        <span className="card-title">
          Order Products
        </span>

      </div>

      {/* SEARCH + FILTER */}

      <div className="order-top">

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
        >

          <option>All</option>
          <option>Grocery</option>
          <option>Beverages</option>
          <option>Snacks</option>
          <option>Dairy</option>
          <option>Personal Care</option>

        </select>

      </div>

      {/* PRODUCTS */}

      <div className="product-grid">

        {filteredItems.map((item) => {

          const bestPrice =
            item.bestPrice?.price || 0;

          const margin =
            item.mrp - bestPrice;

          return (

            <div
              key={item._id}
              className="product-card"
            >

              {/* IMAGE */}

              <div className="product-left">

                <img
  src={
    item.image ||
    "https://via.placeholder.com/150"
  }
  alt={item.name}
  className="product-image"
/>

              </div>

              {/* DETAILS */}

              <div className="product-right">

                <h3>
                  {item.name}
                </h3>

                <p>
                  Category:
                  {" "}
                  {item.category}
                </p>

                <p>
                  MRP:
                  ₹{item.mrp}
                </p>

                <p>
                  Best Price:
                  ₹{bestPrice}
                </p>

                <p>
                  Margin:
                  ₹{margin}
                </p>

                <p>
                  Distributor:
                  {" "}
                  {
                    item.bestPrice
                      ?.distributorId
                      ?.name || "-"
                  }
                </p>

                <div className="product-buttons">

                  <button
                    className="btn-green"
                    onClick={() => {

                      const cartItem = {

                        priceId:
                          item.bestPrice?._id,

                        name:
                          item.name,

                        price:
                          item.bestPrice?.price || 0,

                        distributor:
                          item.bestPrice
                            ?.distributorId?.name || "-"

                      };

                      dispatch(
                        addToCart(
                          cartItem
                        )
                      );

                      alert(
                        "Added to cart"
                      );

                    }}
                  >

                    Add To Cart

                  </button>

                  <button
                    className="btn-green"
                    onClick={() =>
                      navigate("/cart")
                    }
                  >

                    Go To Cart

                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  </Layout>

);

}

export default OrderProducts;