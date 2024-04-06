import React, { useState, useEffect } from "react";
import items from './products.json';
import Checkout from './Checkout.js';
import Confirmation from "./Confirmation.js";

const Shop = ({resetCart}) => {
    const [cart, setCart] = useState([]); // State variable to store the cart items
    const [cartTotal, setCartTotal] = useState(0); // State variable to store the total price of the cart items
    const [searchTerm, setSearchTerm] = useState(""); // State variable to store the search term
    const [checkoutClicked, setCheckoutClicked] = useState(false); // State variable to track if the checkout button is clicked

    // Function to calculate how many of a particular product are in the cart
    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    // Function to calculate the total price of the items in the cart
    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        // Round the total to 2 decimal places
        totalVal = totalVal.toFixed(2);
        setCartTotal(totalVal);
    };

    // Update total whenever cart changes
    useEffect(() => {
        total();
    }, [cart]);

    // Reset the cart when resetCart prop is true
    useEffect(() => {
        if (resetCart) {
            setCart([]); // Reset the cart to an empty array
            setCartTotal(0); // Reset the cart total to 0
            setSearchTerm(""); // empty search term
            setCheckoutClicked(false);
        }
    }, [resetCart]);


    // Function to add a product to the cart
    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    // Function to remove a product from the cart
    const removeFromCart = (el) => {
        let itemFound = false;
        const updatedCart = cart.filter((item) => {
            if (item.id === el.id && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
        }
    };

    // Filter products based on search term
    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mapping over the products to display them
    const listItems = filteredItems.reduce((rows, product, index) => {
        if (index % 3 === 0) {
            rows.push([]);
        }
        rows[rows.length - 1].push(product);
        return rows;
    }, []).map((rowProducts, rowIndex) => (
        <div className="row" key={rowIndex} >
            {rowProducts.map((product) => (
                <div className="col-md-4" key={product.id} >
                    <div className="">
                        <img className="card img-fluid" src={product.image} alt={product.title} />
                        <h5 className="card-title mt-2 mb-0 font-weight-bold">{product.title}</h5>
                        <p className="card-text text-muted">${product.price}
                            <span className="close">&#10005;</span>{howManyofThis(product.id)}
                            <button type="button" style={{ marginLeft: '5%' }} className="btn btn-light" onClick={() => removeFromCart(product)}> - </button>
                            <button type="button" className="btn btn-light" onClick={() => addToCart(product)}> + </button>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    ));

    // Function to handle checkout button click
    const handleCheckoutClick = () => {
        setCheckoutClicked(true);
    };

    // Function to handle return button click
    const handleReturnClick = () => {
        setCheckoutClicked(false); // Reset checkoutClicked to false
    };

    return (
        <div className="container-fluid d-flex justify-content-start">
            <div className="">
                <div className="row">
                    <div className="col-md-12 cart">
                        {!checkoutClicked &&
                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control mt-3 mb-3"
                                        style={{ width: '350px' }}
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                        }

                        {/*"?" If the condition is true, the expression before the : (colon) is evaluated. If the condition is false, the expression after the : (colon) is evaluated. */}
                        {checkoutClicked ? <Checkout cart={cart} cartTotal={cartTotal} onReturnClick={handleReturnClick} /> : ( // cart and cartTotal are props
                            <>
                                <div>{listItems}</div>
                                <button className="btn btn-light bg-warning container-fluid d-flex justify-content-center mt-2" onClick={handleCheckoutClick}>
                                    Checkout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
