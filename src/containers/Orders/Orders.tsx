import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  // state = {
  //   orders: [],
  //   error: false,
  //   loading: true
  // };

  componentDidMount() {
    (this.props as $TSFixMe).onFetchOrders((this.props as $TSFixMe).token, (this.props as $TSFixMe).userId);
    // const req = async () => {
    //   try {
    //     const res = await axios.get('/orders.json');
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key
    //       });
    //     }
    //     this.setState({
    //       orders: fetchedOrders,
    //       loading: false
    //     });
    //   } catch (e) {
    //     this.setState({
    //       error: true,
    //       loading: false
    //     });
    //   }
    // };
    // req();
  }

  render() {
    let orders = <Spinner />;
    if (!(this.props as $TSFixMe).loading) {
      orders = (this.props as $TSFixMe).orders.map((order: $TSFixMe) => <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>);
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state: $TSFixMe) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: $TSFixMe) => {
  return {
    onFetchOrders: (token: $TSFixMe, userId: $TSFixMe) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
