import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const ACTIONS = {
  ADD: "ADD_ITEM",
  REMOVE: "REMOVE_ITEM",
  CLEAR: "CLEAR_ITEM"
};

const cartReducer = (state, action) => {
  // adding an Item
  if (action.type === ACTIONS.ADD) {
    const updatedTotalAmounts =
      state.totalAmount + action.item.amount * action.item.price;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };
  }

  // removing an Item
//   if (action.type === ACTIONS.ADD) {
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.item.id
//     );
//     const existingCartItem = state.items[existingCartItemIndex];

//     const updatedTotalAmounts = state.totalAmount - existingCartItem.price;

//     let updatedItems;
//     if (existingCartItem.amount === 1) {
//       updatedItems = state.items.filter((item) => item.id !== action.id);
//     } else {
//       const updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount - 1,
//       };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmounts,
//     };
//   }

if (action.type === ACTIONS.REMOVE) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
if(action.type === ACTIONS.CLEAR) {
  return defaultCartState;
}
  return defaultCartState;
};



const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: ACTIONS.ADD, item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: ACTIONS.REMOVE, id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: ACTIONS.CLEAR});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
