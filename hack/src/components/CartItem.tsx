import React, { useEffect, useRef, useState } from 'react';

interface Cart {
  name: string;
  img: string;
  quantity: number;
  price: number;
  description: string;
  id: number;
  number: number;
}

interface Cart2 {
  cartItem: Cart;
  onClickRemove: (item: Cart) => void;
  onClickUpdate: (item: Cart, newValue: number) => void;
}

export default function CartItem(Props: Cart2) {
  let [store, setStore] = useState<number>(Props.cartItem.number);
  useEffect(() => {
    setStore(Props.cartItem.number);
  },[Props.cartItem.number]);
  let inputRef = useRef<HTMLInputElement>(null);
  return (
    <tr>
      <th scope="row">1</th>
      <td>{Props.cartItem.name}</td>
      <td>{Props.cartItem.price}</td>
      <td>
        <input
          ref={inputRef}
          name="cart-item-quantity-1"
          type="number"
          value={store}
          onChange={(e) => {
            setStore(+e.target.value);
          }}
        />
      </td>
      <td>
        <a
          className="label label-info update-cart-item"
          data-product=""
          onClick={() => {
            if (inputRef.current) {
              Props.onClickUpdate(Props.cartItem, +inputRef.current.value);
            }
          }}
        >
          Update
        </a>
        <a
          className="label label-danger delete-cart-item"
          data-product=""
          onClick={() => {
            Props.onClickRemove(Props.cartItem);
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
