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
              Authorization:
                token
            }
          }
        );

      setOrders(res.data);

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

        {Object.entries(
  groupedOrders
).map(

  ([key, items]) => {

    const first =
      items[0];

    const total =
      items.reduce(

        (sum, item) =>

          sum + item.total,

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

                {
                  o.itemId?.name
                }

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

            Total:
            ₹{total}

          </strong>

          <span
            className="status-pill active"
          >

            {
              first.status
            }

          </span>

        </div>

      </div>

    );

  }

)}

      </div>

    </DistributorLayout>

  );
}

export default DistributorOrders;