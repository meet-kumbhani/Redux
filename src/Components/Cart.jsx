import React from "react";
import { connect } from "react-redux";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Cart = ({ products }) => {
  const productsData = products.data;
  console.log(productsData);
  return (
    <>
      <section className="cart-part container">
        {productsData.map((item) => (
          <div className="row mt-5" key={item.id}>
            <div className="col-md-2 col-lg-2 col-sm-12">
              <img
                src={item.image}
                alt="cart-img"
                className="w-100"
                height="250px"
              />
            </div>

            <div className="col-md-10 col-lg-10 col-sm-12">
              <div className="item-details">
                <h5>{item.fullname}</h5>
                <h5>Price:- ₹{item.price}/- Only❣</h5>
                <h5>Variant:- {item.storage}</h5>
                <h5 className="d-flex align-items-center">
                  Quantity:-
                  <RemoveCircleOutlineIcon fontSize="small" className="me-2" />
                  {item.quantity}
                  <ControlPointIcon fontSize="small" className="ms-2" />
                </h5>

                <h4>Total:- ₹{item.price * item.quantity}</h4>

                <button className="btn btn-outline-danger rounded-pill">
                  Remove item
                </button>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <h3 className="text-end">Total Amount: ₹{0}</h3>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.items,
  };
};

const mapDispatchToProps = {
  //   getproducts: Fetchalldata,
};

const wrapper = connect(mapStateToProps, mapDispatchToProps);
export default wrapper(Cart);
