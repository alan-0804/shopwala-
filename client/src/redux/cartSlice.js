import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({

  name: "cart",

  initialState,

  reducers: {

    // ADD TO CART

    addToCart: (
      state,
      action
    ) => {

      console.log(
        "ADDING:",
        action.payload
      );

      const existingItem =
        state.items.find(

          (item) =>

            item._id ===
            action.payload._id
        );

      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        state.items.push({

          ...action.payload,

          quantity: 1

        });
      }

      console.log(
        "CART:",
        state.items
      );
    },


    // REMOVE FROM CART

    removeFromCart: (
      state,
      action
    ) => {

      state.items =
        state.items.filter(

          (item) =>

            item._id !==
            action.payload
        );
    },


    // INCREASE QUANTITY

    increaseQty: (
      state,
      action
    ) => {

      const item =
        state.items.find(

          (i) =>

            i._id ===
            action.payload
        );

      if (item) {

        item.quantity += 1;

      }
    },


    // DECREASE QUANTITY

    decreaseQty: (
      state,
      action
    ) => {

      const item =
        state.items.find(

          (i) =>

            i._id ===
            action.payload
        );

      if (
        item &&
        item.quantity > 1
      ) {

        item.quantity -= 1;

      }
    },


    // CLEAR CART

    clearCart: (state) => {

      state.items = [];

    }

  }

});


export const {

  addToCart,

  removeFromCart,

  increaseQty,

  decreaseQty,

  clearCart

} = cartSlice.actions;


export default cartSlice.reducer;