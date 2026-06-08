import { useEffect, useState } from "react";
import axios from "axios";
import DistributorLayout from "../components/DistributorLayout";

function DistributorOrders() {

  const [orders, setOrders] =
    useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    try {

      const res =
        await axios.get(

          "http://localhost:5000/api/orders/distributor",

          {
            headers: {
              Authorization: token
            }
          }
        );

      setOrders(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const updateStatus =
    async (id, status) => {

      try {

        await axios.put(

          `http://localhost:5000/api/orders/status/${id}`,

          { status },

          {
            headers: {
              Authorization: token
            }
          }

        );

        loadOrders();

      } catch (err) {

        console.log(err);

      }

    };

  const groupedOrders =
    orders.reduce(

      (groups, order) => {

        const key =
          `${order.orderGroupId}-${order.shopkeeperId?._id}`;

        if (!groups[key]) {

          groups[key] = [];

        }

        groups[key].push(order);

        return groups;

      },

      {}

    );

  return (

    <DistributorLayout>

      <div className="card">

        <h1>
          Distributor Orders
        </h1>

        {

          Object.entries(
            groupedOrders
          ).map(

            ([key, items]) => {

              const first =
                items[0];

              const total =
                items.reduce(

                  (sum, item) =>

                    sum +
                    item.total,

                  0

                );

              return (

                <div
                  key={key}
                  className="order-group"
                >

                  <div
                    className="order-header"
                  >

                    <h2>

                      📦 Order #

                      {
                        first
                          .orderGroupId
                          ?.slice(-6)
                      }

                    </h2>

                    <h3>

                      {
                        first
                          .shopkeeperId
                          ?.name
                      }

                    </h3>

                  </div>

                  {

                    items.map((o) => (

                      <div
                        key={o._id}
                        className="order-item"
                      >

                        <span>
                          {o.itemId?.name}
                        </span>

                        <span>
                          x{o.quantity}
                        </span>

                        <span>
                          ₹{o.total}
                        </span>

                      </div>

                    ))

                  }

                  <div
                    className="order-footer"
                  >

                    <strong>
                      Total: ₹{total}
                    </strong>

                    <span
                      className="status-pill active"
                    >
                      {first.status}
                    </span>

                  </div>

                  <div
                    className="order-actions"
                  >

                    {

                      first.status ===
                      "Pending" && (

                        <>

                          <button
                            className="btn-approve"
                           onClick={async () => {

  for (const item of items) {

    await updateStatus(
      item._id,
      "Approved"
    );

  }

  loadOrders();

}}
                          >
                            Approve
                          </button>

                          <button
                            className="btn-reject"
                            onClick={() =>
                              items.forEach(
                                (item) =>
                                  updateStatus(
                                    item._id,
                                    "Rejected"
                                  )
                              )
                            }
                          >
                            Reject
                          </button>

                        </>

                      )

                    }
                   {first.status === "Approved" && (

  <button
    className="btn-processing"
    onClick={() =>
      items.forEach(
        (item) =>
          updateStatus(
            item._id,
            "Processing"
          )
      )
    }
  >
    Processing
  </button>

)}

{first.status === "Processing" && (

  <button
    className="btn-delivery"
    onClick={() =>
      items.forEach(
        (item) =>
          updateStatus(
            item._id,
            "Out For Delivery"
          )
      )
    }
  >
    Out For Delivery
  </button>

)}

{first.status === "Out For Delivery" && (

  <button
    className="btn-delivered"
    onClick={() =>
      items.forEach(
        (item) =>
          updateStatus(
            item._id,
            "Delivered"
          )
      )
    }
  >
    Delivered
  </button>

)}
{(first.status === "Approved" ||
  first.status === "Processing" ||
  first.status === "Out For Delivery" ||
  first.status === "Delivered"
) && (

  <button
  className="btn-green"
  onClick={async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(

          `http://localhost:5000/api/orders/invoice/${first.orderGroupId}`,

          {
            responseType:
              "blob",

            headers: {
              Authorization:
                token
            }
          }
        );

      const url =
        window.URL.createObjectURL(
          new Blob([
            response.data
          ])
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.setAttribute(
        "download",
        `Invoice-${first.orderGroupId}.pdf`
      );

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

    } catch (err) {

      console.log(err);

      alert(
        "Invoice download failed"
      );

    }

  }}
>
  Download Invoice
</button>

)}
                          
                       
                  </div>

                </div>

              );

            }

          )

        }

      </div>

    </DistributorLayout>

  );

}

export default DistributorOrders;