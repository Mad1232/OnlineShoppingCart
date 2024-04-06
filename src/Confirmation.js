import React, { useState } from "react";
import Shop from './Shopping_bootstrap.js';

const Confirmation = ({ itemsPurchased, deliveryAddress, recipient }) => {
    const [shopPress, setShopPress] = useState(false);

    const handleShopPress = () => {
        setShopPress(true);
    }

    return (
        <>
            {shopPress ? (
                <Shop resetCart={true} />
            ) : (
                <>
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>Confirmation</h1>
                    <h3>Items Purchased:</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {itemsPurchased.map((item, index) => (
                            <li key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                
                    <p>Delivery Address: {deliveryAddress}</p>
                    <p>Recipient: {recipient}</p>
                    <p>Thank you for your purchase!</p>
                    <button className="btn bg-warning" onClick={handleShopPress}>Shop</button>
                </>
            )}
        </>
    );
}

export default Confirmation;
