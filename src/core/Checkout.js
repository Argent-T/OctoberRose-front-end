import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getBraintreeClientToken, processPayment } from './apiCore'
import Card from './Card';
import {emptyCart} from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {

    const [payData, setPayData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setPayData({ ...payData, error: data.error });
            } else {
                setPayData({ ...payData, clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };


    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-primary"> Sign in to checkout</button>
                </Link>
            )

    }

    const buy = () => {
        setPayData({...payData, loading: true});
        // send the nonce to server
        // nonce = data.instance.requestPaymentMethod()

        let nonce;
        let getNonce = payData.instance
            .requestPaymentMethod()
            .then(d => {
                // console.log(d);
                nonce = d.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce' to back end
                // along with total to be charged
                // console.log(
                //     'send nonce and total to process: ',
                //     nonce,
                //     getTotal(products)
                //     );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
                // console.log(paymentData);
                processPayment(userId, token, paymentData)
                    .then(response => {
                        //console.log(response)
                        setPayData({ ...payData, success: response.success });
                        //empty cart
                        //create order
                        emptyCart(() =>{
                            setRun(!run)
                            console.log('payment success and cart emptied');
                            setPayData({success: true, loading: false});
                           
                        });

                    })
                    .catch(error => {
                        console.log(error)
                        setPayData({...payData, loading: false});
                    });
            })
            .catch(error => {
                // console.log('dropin error: ', error);
                setPayData({ ...payData, error: error.message });
            });
    };

    const showDropIn = () => (
        <div onBlur={() => setPayData({ ...payData, error: '' })} >
            {payData.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: payData.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (payData.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
            ) : null}
        </div>

    )

    const showError = error => (
        <div className='alert alert-danger' 
        style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className='alert alert-info' 
        style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading =>(<h2 style={{ display: loading ? '' : 'none' }}>Loading...</h2>);
   

    return <div>
        <h2>Total: ${getTotal()}</h2>
        {showLoading(payData.loading)}
        {showSuccess(payData.success)}
        {showError(payData.error)}
        {showCheckout()}
    </div>
};

export default Checkout;