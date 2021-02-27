import React,{ Component } from "react";
import Order from '../Orders/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
  
    componentDidMount(){
     this.props.ontFetchOrders(this.props.token,this.props.userId);
    }
    render() {
        let order = <Spinner></Spinner>;
        if(!this.props.loading){
            order = this.props.orders.map(order1=> (
               
                <Order key={order1.id}
                ingredients={order1.ingredients}
                price={order1.price}></Order>
            ))
        };
        return (
            <div>
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToprops = dispatch => {
    return {
        ontFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToprops)(withErrorHandler(Orders,axios));