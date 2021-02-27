import * as actiontypes from './actiontypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
            type: actiontypes.PURCHASE_BURGER_SUCCESS,
            orderId: id,
            orderData: orderData
    }
};


export const purchaseBurgerFail = (error) => {
    return {
            type: actiontypes.PURCHASE_BURGER_FAIL,
            error:error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actiontypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
       dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth='+ token, orderData )
        .then( response => {
           dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } ); 
    }
}

export const purchaseInit = () => {
    return {
        type: actiontypes.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actiontypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
};

export const fetchOrderFail = (error) => {
    return {
        type: actiontypes.FETCH_INGREDIENTS_FAILED,
        error: error
        
    }
};

export const fetchOrderStart = () => {
    return {
        type: actiontypes.PURCHASE_BURGER_START
    
    }
};

export const fetchOrders = (token, userId) => {
   return dispatch => {
       dispatch(fetchOrderStart());
       const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId  + '"';
    axios.get('/orders.json' + queryParams )
    .then(res => {
        const fetchedOrders = [];
        for(let key in res.data){
            fetchedOrders.push({
                ...res.data[key],
                id:key
            });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
        
    })
    .catch(err => {
       dispatch(fetchOrderFail(err));
    });
   }
}