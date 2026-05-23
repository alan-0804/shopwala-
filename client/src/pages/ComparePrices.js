import { useEffect, useState } from "react";
import API from "../api";

function ComparePrices() {

  const [items, setItems] = useState([]);

  useEffect(() => {

    loadItems();

  }, []);

  // LOAD ITEMS + BEST PRICES

  const loadItems = async () => {

    try {

      const res = await API.get("/api/items");

      const itemsWithPrices =
        await Promise.all(

          res.data.map(async (item) => {

            try {

              const best =
                await API.get(
                  `/api/prices/best/${item._id}`
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

  return (

    <div className="dashboard-card">

      <div className="table-header">

        <h1>
          Compare Distributor Prices
        </h1>

      </div>

      <table className="product-table">

        <thead>

          <tr>

            <th>Product</th>

            <th>MRP</th>

            <th>Distributor Price</th>

            <th>Margin</th>

            <th>Distributor</th>

          </tr>

        </thead>

        <tbody>

          {items.map((item) => {

            const distributorPrice =
              item.bestPrice?.price || 0;

            const margin =
              item.mrp - distributorPrice;

            return (

              <tr key={item._id}>

                <td>
                  {item.name}
                </td>

                <td>
                  ₹{item.mrp}
                </td>

                <td>

                  {
                    distributorPrice
                      ? `₹${distributorPrice}`
                      : "No price"
                  }

                </td>

                <td>

                  {
                    distributorPrice
                      ? `₹${margin}`
                      : "-"
                  }

                </td>

                <td>

                  {
                    item.bestPrice
                      ?.distributorId?.name || "-"
                  }

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}

export default ComparePrices;