import axios from "axios";

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

      for (const item of cartItems) {

        await axios.post(

          "http://localhost:5000/api/orders",

          {

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
                style={{
                  border:
                    "1px solid #ddd",

                  padding: "15px",

                  marginBottom: "15px",

                  borderRadius: "10px"
                }}
              >

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

                <p>

                  Quantity:

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

                  {" "}

                  {item.quantity}

                  {" "}

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

                </p>

                <p>

                  Total:
                  ₹
                  {
                    item.price *
                    item.quantity
                  }

                </p>

                <button
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
            ))}

            <h2>
              Grand Total:
              ₹{total}
            </h2>

            <button
              className="btn-green"
              onClick={placeAllOrders}
            >

              Place Order

            </button>

          </div>
        )
      }

    </div>
  );
}

export default Cart;