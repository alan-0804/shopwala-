import axios from "axios";
import Layout from "../components/Layout";
import {
  useSelector,
  useDispatch
} from "react-redux";

import {

  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart

} from "../redux/cartSlice";


function Cart() {

  const dispatch =
    useDispatch();

  const cartItems =
    useSelector(
      (state) => state.cart.items
    );


  // TOTAL

  const total =
    cartItems.reduce(

      (sum, item) =>

        sum +
        item.price *
        item.quantity,

      0
    );


  // PLACE ALL ORDERS

  const placeAllOrders = async () => {

    try {

      const token =
        localStorage.getItem("token");

        const orderGroupId =
        Date.now().toString();

      for (const item of cartItems) {

        await axios.post(

          "http://localhost:5000/api/orders",

          {
            orderGroupId,
            
            priceId: item.priceId,

            quantity: item.quantity

          },

          {

            headers: {

              Authorization: token

            }
          }
        );
      }

      alert("Orders placed successfully");

      dispatch(clearCart());

    } catch (err) {

      console.log(err);

      alert("Order failed");

    }
  };


  return (

    <Layout>

    <div className="card">

      <h1>
        My Cart
      </h1>


      {
        cartItems.length === 0 ? (

          <p>
            Cart is empty
          </p>

        ) : (

          <div>

            {cartItems.map((item) => (

              <div
  key={item.priceId}
  className="cart-card"
>

  <div className="cart-left">

<img
  src={
    item.image ||
    "https://via.placeholder.com/150"
  }
  alt={item.name}
  className="product-image"
/>
  </div>

  <div className="cart-right">

    <h3>
      {item.name}
    </h3>

    <p>
      Distributor:
      {" "}
      {item.distributor}
    </p>

    <p>
      Price:
      ₹{item.price}
    </p>

    <div className="qty-row">

      <button
        onClick={() =>
          dispatch(
            decreaseQty(
              item.priceId
            )
          )
        }
      >
        -
      </button>

      <span>
        {item.quantity}
      </span>

      <button
        onClick={() =>
          dispatch(
            increaseQty(
              item.priceId
            )
          )
        }
      >
        +
      </button>

    </div>

    <p>
      Total:
      ₹{
        item.price *
        item.quantity
      }
    </p>

    <button
      className="remove-btn"
      onClick={() =>
        dispatch(
          removeFromCart(
            item.priceId
          )
        )
      }
    >
      Remove
    </button>

  </div>

</div>
            ))}

            <h2>
              Grand Total:
              ₹{total}
            </h2>

           <div className="cart-summary">

  <h2>
    Order Summary
  </h2>

  <p>
    Items:
    {" "}
    {cartItems.length}
  </p>

  <p>
    Total:
    ₹{total}
  </p>

  <button
    className="btn-green"
    onClick={placeAllOrders}
  >
    Place Order
  </button>

</div>

          </div>
        )
      }

    </div>

    </Layout>
  );
}

export default Cart;