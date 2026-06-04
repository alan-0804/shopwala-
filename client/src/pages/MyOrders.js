import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function MyOrders() {

  const [orders, setOrders] =
    useState([]);

    const groupedOrders =
  orders.reduce(

    (groups, order) => {

      if (
        !groups[
          order.orderGroupId
        ]
      ) {

        groups[
          order.orderGroupId
        ] = [];

      }

      groups[
        order.orderGroupId
      ].push(order);

      return groups;

    },

    {}

  );
  const token =
    localStorage.getItem("token");


  useEffect(() => {

    loadOrders();

  }, []);


  const loadOrders = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/orders/my",

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


  return (

  <Layout>

    <div className="card">

      <div className="card-hd">

        <span className="card-title">
          My Orders
        </span>

      </div>

      <div className="orders-grid">

        {Object.entries(
  groupedOrders
).map(

  ([groupId, items]) => {

    const grandTotal =
      items.reduce(

        (sum, item) =>

          sum +
          item.total,

        0

      );

    return (

      <div
        key={groupId}
        className="order-group"
      >

        <div
          className="order-group-header"
        >

          <h2>

            📦 Order #
            {
              groupId.slice(-6)
            }

          </h2>

          <h3>
            ₹{grandTotal}
          </h3>

        </div>

        {

          items.map((o) => (

            <div
              key={o._id}
              className="order-card"
            >

              <div
                className="order-left"
              >

                <img

  src={
    o.itemId?.image ||
    "https://via.placeholder.com/150"
  }
  alt={o.itemId?.name}
  className="order-image"
/>
              </div>

              <div
                className="order-right"
              >

                <h3>
                  {
                    o.itemId?.name
                  }
                </h3>

                <p>

                  Qty:
                  {" "}
                  {
                    o.quantity
                  }

                </p>

                <p>

                  Price:
                  ₹{o.price}

                </p>

                <p>

                  Total:
                  ₹{o.total}

                </p>

                <p>

                  Distributor:
                  {" "}

                  {
                    o
                    .distributorId
                    ?.name
                  }

                </p>

                <span
                  className="status-pending"
                >

                  {o.status}

                </span>

              </div>

            </div>

          ))

        }

      </div>

    );

  }

)}

      </div>

    </div>

  </Layout>

);
}

export default MyOrders;