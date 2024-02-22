import React from "react";
import { connect } from "react-redux";

const Cart = (products) => {
  const cartdata = products.data;
  console.log(cartdata);
  return (
    <div>
      <h2>Cart</h2>
    </div>
  );
};

// export default Cart;

const mapStateToProps = (state) => {
  return {
    products: state.items,
  };
};

const mapDispatchToProps = {
  // getproducts: Fetchalldata,
};

const wrapper = connect(mapStateToProps, mapDispatchToProps);
export default wrapper(Cart);
