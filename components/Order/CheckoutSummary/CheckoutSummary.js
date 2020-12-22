import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary} >
            <h1>We hope it tastes well!</h1>
            <div style={{width:'300px', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType="Danger" clicked={props.onCheckoutCancelled} >Cancel</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinue}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;