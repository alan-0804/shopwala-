import { useEffect, useState } from "react";
import axios from "axios";

function LowStockAlerts() {

  const [lowStock, setLowStock] =
    useState([]);

  useEffect(() => {

    loadLowStock();

  }, []);

  const loadLowStock = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/items"
      );

      // LOW STOCK ITEMS

      const filtered =
        res.data.filter(
          (item) =>
            item.quantity <= 10
        );

      setLowStock(filtered);

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="card">

      <div className="card-hd">

        <span className="card-title">
          AI Low Stock Alerts
        </span>

      </div>

      {
        lowStock.length === 0 ? (

          <p>
            No low stock items 🎉
          </p>

        ) : (

          lowStock.map((item) => (

            <div
              key={item._id}
              className="alert-card"
            >

              <h3>
                ⚠ {item.name}
              </h3>

              <p>
                Current stock:
                {" "}
                {item.quantity}
              </p>

              <p>

                Recommended reorder:
                {" "}
                {20 - item.quantity}
                {" "}
                units

              </p>

            </div>
          ))
        )
      }

    </div>
  );
}

export default LowStockAlerts;