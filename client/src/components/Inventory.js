import { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {

  const [items, setItems] = useState([]);

  const [allPrices, setAllPrices] =
    useState([]);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [search, setSearch] =
  useState("");

  // LOAD ITEMS

  useEffect(() => {

    loadItems();

  }, []);


  // FETCH ITEMS + BEST PRICES

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


  // VIEW ALL DISTRIBUTOR PRICES

  const handleCompare = async (item) => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/prices/compare/${item._id}`
      );

      const prices = res.data;

      if (prices.message) {

        alert("No prices available");

        return;

      }

      setAllPrices(prices);

      setSelectedItem(item._id);

    } catch (err) {

      console.log(err);

    }
  };


  return (

    <div className="card">

      <div className="card-hd">

        <span className="card-title">

          Inventory — Compare distributor prices

        </span>

      </div>

      <div className="inventory-top">

  <input
    className="search-input"
    placeholder="Search products..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

</div>
      {/* MAIN TABLE */}

      <table className="tbl">

        <thead>

          <tr>

            <th>Item</th>

            <th className="right">
              MRP
            </th>

            <th className="right">
              Distributor Price
            </th>

            <th className="right">
              Margin
            </th>

            <th></th>

          </tr>

        </thead>


        <tbody>

          {items
  .filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((item) => {

            const distributorPrice =
              item.bestPrice?.price || 0;

            const margin =
              item.mrp - distributorPrice;

            return (

              <tr key={item._id}>


                {/* PRODUCT */}

                <td>

                  <div className="item-name">
                    {item.name}
                  </div>

                  <div className="item-cat">
                    Grocery
                  </div>

                </td>


                {/* MRP */}

                <td className="mrp-val">

                  ₹{item.mrp}

                </td>


                {/* BEST DISTRIBUTOR PRICE */}

                <td>

                  <div className="price-group">

                    <div className="dist-price-row">

                      <span className="dist-name-sm">

                        {
                          item.bestPrice
                            ?.distributorId?.name
                            || "No Distributor"
                        }

                      </span>

                      <span className="price-tag best">

                        {
                          distributorPrice
                            ? `₹${distributorPrice}`
                            : "No price"
                        }

                      </span>

                    </div>

                  </div>

                </td>


                {/* MARGIN */}

                <td
                  style={{
                    textAlign: "right"
                  }}
                >

                  <span className="margin-pill good">

                    {
                      distributorPrice
                        ? `₹${margin}`
                        : "-"
                    }

                  </span>

                </td>


                {/* BUTTON */}

                <td
                  style={{
                    textAlign: "right"
                  }}
                >

                  <button
                    className="compare-btn"
                    onClick={() =>
                      handleCompare(item)
                    }
                  >

                    View Prices

                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>


      {/* ALL DISTRIBUTOR PRICES TABLE */}

      {
        selectedItem && (

          <div
            style={{
              marginTop: "30px"
            }}
          >

            <h2>
              All Distributor Prices
            </h2>

            <table className="tbl">

              <thead>

                <tr>

                  <th>Distributor</th>

                  <th>Price</th>

                </tr>

              </thead>

              <tbody>

                {allPrices.map((p) => (

                  <tr key={p._id}>

                    <td>

                      {
                        p.distributorId?.name
                      }

                    </td>

                    <td>

                      ₹{p.price}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )
      }

    </div>
  );
}

export default Inventory;