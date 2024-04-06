import React, { useState } from "react";
import Confirmation from './Confirmation.js';

const Checkout = ({ cart, cartTotal, onReturnClick }) => {
    const [name, setName] = useState(""); // State variable to store the name
    const [email, setEmail] = useState(""); // Store the email
    const [card, setCard] = useState(""); // Store the card info
    const [address, setAddress] = useState(""); // Store the address
    const [city, setCity] = useState(""); // Store the city
    const [state, setState] = useState(""); // Store the state
    const [zip, setZip] = useState(""); // Store the zip code
    const [errors, setErrors] = useState({}); // State variable to store validation errors
    const [orderClicked, setOrderClick] = useState(false); //State variable to store if order is clicked

    // Validation function for card information
    const validateCard = () => {
        const isValid = /^\d{16}$/.test(card); // Assuming card number is 16 digits
        setErrors((prevErrors) => ({
            ...prevErrors,
            card: isValid ? "" : "Invalid card format",
        }));
    };

    // Validation function for email
    const validateEmail = () => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: isValid ? "" : "Invalid email format",
        }));
    };

    // Validation function for zip code
    const validateZip = () => {
        const isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip); // Zip code should be 5 digits
        setErrors((prevErrors) => ({
            ...prevErrors,
            zip: isValid ? "" : "Invalid zip code format",
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate all fields
        validateEmail();
        validateCard();
        validateZip();

        // Check if there are any errors
        if (Object.values(errors).every((error) => !error)) { 
            setOrderClick(true); // no errors so success!
        } else {
            // Display error messages
            alert("Wrong input field, check again!");
        }
    };

    return (
        <div className="container">
            {orderClicked ? (
                <Confirmation
                itemsPurchased={cart}
                deliveryAddress={address}
                recipient={name}
                
                />
            ) : (
                <>
                    <div className="row mb-3">
                        <div className="col">
                            <h2>Checkout</h2>
                        </div>
                        <div className="col">
                            <button className="btn bg-warning mt-1" onClick={onReturnClick}>Back</button>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            {cart && cart.length > 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '33%' }}>Product</th>
                                            <th style={{ width: '33%' }}>Price</th>
                                            <th style={{ width: '33%' }}>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.title}</td>
                                                <td>${item.price}</td>
                                                <td><img src={item.image} alt={item.title} style={{ width: '100%', height: 'auto' }} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No items in the cart</p>
                            )}
                            <div>
                                <h4 >Cart Total:<span className="text-danger">${cartTotal}</span> </h4>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="col">
                            <h2>Payment Information</h2>
                            {/* 3 rows, 2 cols*/}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={validateEmail}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="State"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Zip Code"
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        onBlur={validateZip}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Card information"
                                        value={card}
                                        onChange={(e) => setCard(e.target.value)}
                                        onBlur={validateCard}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success">Order</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default Checkout;
