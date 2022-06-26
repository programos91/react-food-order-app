import React, { useContext, useState, Fragment } from 'react';
import axios from 'axios';

import classes from './Cart.module.css';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = userData => {
        setIsSubmitting(true);
        axios
            .post(`${process.env.REACT_APP_FIREBASE_URL}orders.json`, {
                user: userData,
                orderedItems: cartCtx.items,
            })
            .then(() => {
                setIsSubmitting(false);
                setDidSubmit(true);
                cartCtx.clearCart();
            });
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button onClick={props.onHideCart} className={classes['button--alt']}>
                Close
            </button>
            {hasItems && (
                <button onClick={orderHandler} className={classes.button}>
                    Order
                </button>
            )}
        </div>
    );

    const isSubmittingModalContent = <p>Sending Order Data...</p>;

    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button onClick={props.onHideCart} className={classes.button}>
                    Close
                </button>
            </div>
        </Fragment>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount: </span>
                <span> {totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
            {!isCheckout && modalActions}
        </Fragment>
    );
    return (
        <Modal onHideModal={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
