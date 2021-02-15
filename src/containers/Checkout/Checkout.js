

import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {


   /*  componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1];
            }
           
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    } */

    checkoutCancelledHandler= () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
            this.props.history.replace('/checkout/contact-data');
    }

    render(){
        console.log('Checkout is called');
        let summary = <Redirect to="/"></Redirect>;
     
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ?  <Redirect to="/"></Redirect> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings}
                onCheckoutCancelled={this.checkoutCancelledHandler}
                onCheckoutContinue={this.checkoutContinueHandler}
                ></CheckoutSummary>
                    <Route
                 path={this.props.match.path+ '/contact-data'} 
                    component={ContactData}>
                </Route>
                </div>
            )
        }
        return (
            <div>
             {summary}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};



export default connect(mapStateToProps)(Checkout);