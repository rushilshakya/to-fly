import { useSelector } from "react-redux";
import { useState } from "react";
import CheckoutButton from "./Buttons/CheckoutButton";

const Cart = () => {
  const [address, setAddress] = useState("");
  const cart = useSelector((state) => state.cart);
  const cartTotal = cart.order_detail.reduce(
    (prev, curr) => prev + curr.item_price * curr.quantity,
    0
  );
  const products = useSelector((state) =>
    state.products.reduce((prev, curr) => {
      prev[curr.id] = curr;
      return prev;
    }, {})
  );

  return (
    <div className="wrapper padding-top-2 padding-bottom-3">
      {cart.order_detail.length ? (
        <>
          <table>
            <caption>Your shopping cart</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.order_detail.map((x) => (
                <tr key={x.id}>
                  <th scope="row">{products[x.id].name}</th>
                  <td>Rs. {x.item_price}</td>
                  <td>{x.quantity}</td>
                  <td className="text-align-right">
                    Rs. {x.item_price * x.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Grand total</th>
                <td className="text-align-right" colSpan="3">
                  Rs. {cartTotal}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="padding-bottom-1">
            Enter shipping address
            <input
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <CheckoutButton address={{ address }} />
        </>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
