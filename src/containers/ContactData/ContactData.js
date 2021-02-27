import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
class ContactData extends Component {

    state = {
        orderForm: {
                name:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    valadiation: {
                        required: true
                    },
                    valid: false ,
                    touched: false
                },
                street:  {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street Name'
                    },
                    value: '',
                    valadiation: {
                        required: true
                    },
                    valid: false ,
                    touched: false
                },
                 zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZipCode'
                    },
                    value: '',
                    valadiation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false ,
                    touched: false
                },
                 country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    valadiation: {
                        required: true
                    },
                    valid: false ,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    valadiation: {
                        required: true
                    },
                    valid: false ,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest' , displayValue: 'Faster'},
                            {value: 'cheapest' , displayValue: 'Cheapest'}
                        
                    ]
                    },
                    value: 'fastest',
                    valadiation: {},
                    valid: true
                }
        },
        formisValid: false,
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for(let formElementIdentifer in this.state.orderForm){
            formData[formElementIdentifer] = this.state.orderForm[formElementIdentifer].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
    }

    checkValidity(value,rules){
        let isValid = true;
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }

            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid;
            }

            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid;
            }
            console.log(isValid)
            return isValid;
    }

    inputChangedHandler = (event, inputIdentifer) => {
        const updatedOrderform = {
            ...this.state.orderForm
        }
      const updatedFormELement =  {...updatedOrderform[inputIdentifer]
      };
      updatedFormELement.value = event.target.value;
      updatedFormELement.valid = this.checkValidity(updatedFormELement.value,updatedFormELement.valadiation);
      updatedFormELement.touched = true;
      updatedOrderform[inputIdentifer] = updatedFormELement;
      let formisvalid = true;

      for(let inputIdentifer in updatedOrderform){
        formisvalid = updatedOrderform[inputIdentifer].valid && formisvalid; 
      }

      this.setState({orderForm: updatedOrderform,formisValid: formisvalid});
    }

    render() {
        const formElmentsArray = [];

        for( let key in this.state.orderForm){
            formElmentsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
          
            {formElmentsArray.map(formElement => (
                <Input  
                key={formElement.id}
                elementType={formElement.config.elementType}
                 elementConfig={formElement.config.elementConfig} 
                 value={formElement.config.value} 
                 invalid={!formElement.config.valid}
                 shouldValidate={formElement.config.valadiation}
                 touched={formElement.config.touched}
                 changed={(event) => this.inputChangedHandler(event,formElement.id) }></Input>
            ))}
            <Button btnType="Success" disabled={!this.state.formisValid} clicked={this.orderHandler} >ORDER</Button>
        </form>
        );
        if(this.props.loading){
           form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
              <h4>Enter your Contact Information</h4>  
             {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
   onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));