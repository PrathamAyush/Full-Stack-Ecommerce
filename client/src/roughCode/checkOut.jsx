import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CART_STORAGE_KEY = 'myCart';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer.cart);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            const cartData = JSON.parse(storedCart);
            setToken(cartData.token);
            dispatch({ type: 'SET_CART', payload: cartData });
        }
    }, [dispatch]);

    const handleCheckout = () => {
        console.log('Checking out cart:', cart);
        // perform checkout logic
        // clear cart after successful checkout
        dispatch({ type: 'CLEAR_CART' });
        setToken('');
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    return (
        <div>
            <h2>My Cart</h2>
            {cart.length > 0 ? (
                <div>
                    <p>Total Items: {cart.length}</p>
                    <p>Total Price: ${cart.reduce((acc, item) => acc + item.price, 0)}</p>
                    {token ? (
                        <button onClick={handleCheckout}>Checkout</button>
                    ) : (
                        <p>Please login to checkout</p>
                    )}
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;
