import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {

  const [orders, setOrders] =
    useState([]);

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

    <div className="card">

      <div className="card-hd">

        <span className="card-title">
          My Orders
        </span>

      </div>


      <table className="tbl">

        <thead>

          <tr>

            <th>Product</th>

            <th>Distributor</th>

            <th>Qty</th>

            <th>Price</th>

            <th>Total</th>

            <th>Status</th>

          </tr>

        </thead>


        <tbody>

          {orders.map((o) => (

            <tr key={o._id}>

              <td>
                {o.itemId?.name}
              </td>

              <td>
                {o.distributorId?.name}
              </td>

              <td>
                {o.quantity}
              </td>

              <td>
                ₹{o.price}
              </td>

              <td>
                ₹{o.total}
              </td>

              <td>
                {o.status}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MyOrders;