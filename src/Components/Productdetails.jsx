import React from "react";
import { connect } from "react-redux";
import { Fetchproductdetails } from "../Services/Module/action";
// import { Fetchalldata } from "../Services/Module/action";

const Productdetails = ({ getproductsdetails }) => {
  const productsData = getproductsdetails?.data || [];
  console.log(productsData);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

// export default Productdetails;

const mapStateToProps = (state) => {
  return {
    products: state.items,
  };
};

const mapDispatchToProps = {
  getproductsdetails: Fetchproductdetails,
};

const wrapper = connect(mapStateToProps, mapDispatchToProps);
export default wrapper(Productdetails);
