import { useEffect } from "react";
import API from "../api";
import "../distributor.css";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { useNavigate } from "react-router-dom";

import { fetchPrices }
from "../redux/priceSlice";

import DistributorLayout
from "../components/DistributorLayout";

function Distributor() {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    prices,
    loading
  } = useSelector(
    (state) => state.prices
  );

  const token =
    localStorage.getItem("token");

    const name =
  localStorage.getItem("name");

  useEffect(() => {

    dispatch(
      fetchPrices()
    );

  }, [dispatch]);


  // UPDATE PRICE

  const handleUpdate =
    async (id) => {

      const newPrice =
        prompt(
          "Enter new price"
        );

      if (!newPrice)
        return;

      try {

        await API.put(

          `/api/prices/${id}`,

          {
            price:
              newPrice
          },

          {
            headers: {
              Authorization:
                token
            }
          }

        );

        alert(
          "Price updated"
        );

        dispatch(
          fetchPrices()
        );

      } catch {

        alert(
          "Update failed"
        );

      }

    };


  // DELETE PRODUCT

  const handleDelete =
    async (id) => {

      try {

        await API.delete(

          `/api/prices/${id}`,

          {
            headers: {
              Authorization:
                token
            }
          }

        );

        alert(
          "Deleted"
        );

        dispatch(
          fetchPrices()
        );

      } catch {

        alert(
          "Delete failed"
        );

      }

    };


  return (

    <DistributorLayout>

      {/* TOP BAR */}

      <div className="top-bar">

        <div>

          <h1>
            Good morning,
            {name}
          </h1>

          <p>
            Manage products
            and distributor
            prices
          </p>

        </div>

        <div
          className="top-actions"
        >

          <button
            className="btn-outline"
          >
            Import CSV
          </button>

          <button
            className="btn-blue"
            onClick={() =>
              navigate(
                "/distributor/add-product"
              )
            }
          >
            + Add Product
          </button>

        </div>

      </div>


      {/* STATS */}

      <div className="stats">

        <div
          className="stat-card"
        >

          <div
            className="stat-label"
          >
            Total Products
          </div>

          <div
            className="stat-val"
          >
            {prices.length}
          </div>

        </div>


        <div
          className="stat-card"
        >

          <div
            className="stat-label"
          >
            In Stock
          </div>

          <div
            className="stat-val"
          >

            {
              prices.filter(
                p =>
                  p.itemId
                    ?.quantity >
                  10
              ).length
            }

          </div>

        </div>


        <div
          className="stat-card"
        >

          <div
            className="stat-label"
          >
            Low Stock
          </div>

          <div
            className="stat-val"
          >

            {
              prices.filter(
                p =>
                  p.itemId
                    ?.quantity <=
                  10
              ).length
            }

          </div>

        </div>

      </div>


      {/* PRODUCTS TABLE */}

      <div
        className="table-wrap"
      >

        <table
          className="tbl"
        >

          <thead>

            <tr>

              <th>
                Product
              </th>

              <th>
                Your Price
              </th>

              <th>
                MRP
              </th>

              <th>
                Stock
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                >
                  Loading...
                </td>

              </tr>

            ) : (

              prices.map(
                (p) => (

                  <tr
                    key={p._id}
                  >

                    <td>

                      <div
                        className="prod-name"
                      >

                        {
                          p.itemId
                            ?.name
                        }

                      </div>

                    </td>

                    <td>
                      ₹{p.price}
                    </td>

                    <td>
                      ₹
                      {
                        p.itemId
                          ?.mrp
                      }
                    </td>

                    <td>

                      {
                        p.itemId
                          ?.quantity
                      }

                    </td>

                    <td>

                      <span
                        className={
                          p.itemId
                            ?.quantity >
                          10

                            ? "status-pill active"

                            : "status-pill low"
                        }
                      >

                        {
                          p.itemId
                            ?.quantity >
                          10

                            ? "Active"

                            : "Low Stock"
                        }

                      </span>

                    </td>

                    <td>

                      <button
                        className="btn-edit"
                        onClick={() =>
                          handleUpdate(
                            p._id
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn-remove"
                        onClick={() =>
                          handleDelete(
                            p._id
                          )
                        }
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </DistributorLayout>

  );

}

export default Distributor;