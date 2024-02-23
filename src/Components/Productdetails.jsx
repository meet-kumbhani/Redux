import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { carturl, listurl } from "../Config/urls";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { connect } from "react-redux";
import { addToCart, updateQuantity } from "../Services/Module/action";

const Productdetails = ({ cartQuantity }) => {
  const [productdata, setProducdata] = useState([]);
  // const [addcart, setaddcart] = useState(false);
  // const [carthandel, setcarthandel] = useState([]);
  const [quantity, setQuantity] = useState(1);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${listurl}/${id}`)
      .then((result) => {
        setProducdata(result.data);
      })
      .catch((err) => {
        console.log("==>", err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${carturl}/${id}`)
      .then((response) => {
        if (response.data && response.data.quantity) {
          setQuantity(response.data.quantity);
        } else {
          setQuantity(0);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [id]);

  let handelcart = () => {
    // axios
    //   .post(carturl, { ...productdata })
    //   .then(() => {
    //     setaddcart(true);
    //     setcarthandel((prev) => [...prev, { ...productdata }]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    addToCart(productdata);
    axios
      .post(carturl, { id: productdata.id, ...productdata, quantity: 1 })
      .then((response) => {
        console.log("added", response.data);
        setQuantity(1);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(productdata.id, newQuantity);
    setQuantity(newQuantity);
    axios
      .patch(`${carturl}/${id}`, { quantity: newQuantity })
      .then((response) => {
        console.log("qty updated cart", response.data);
      })
      .catch((error) => {
        console.error("qty error cart", error);
      });
  };

  return (
    <>
      {productdata ? (
        <>
          <div className="container mb-3">
            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12 mt-5">
                <div className="image-part">
                  <img
                    src={productdata.image}
                    alt=""
                    width="70%"
                    height="500px"
                  />
                  <div className="buttons mt-4">
                    {quantity ? (
                      <>
                        <button className="buynow-btn me-2">Buy Now</button>

                        <h5 className="d-flex align-items-center">
                          Quantity:-
                          <RemoveCircleOutlineIcon
                            fontSize="small"
                            className="me-2"
                            onClick={() => handleQuantityChange(quantity - 1)}
                          />
                          {quantity}
                          <ControlPointIcon
                            fontSize="small"
                            className="ms-2"
                            onClick={() => handleQuantityChange(quantity + 1)}
                          />
                        </h5>
                      </>
                    ) : (
                      <>
                        <button className="buynow-btn me-2">Buy Now</button>
                        <button className="cart-btn" onClick={handelcart}>
                          Add To Cart
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12 mt-5">
                <div className="discription-part">
                  <h2>{productdata.fullname}</h2>
                  <h5>Model: {productdata.model}</h5>
                  <h5>{productdata.review}</h5>
                  <h5>Price: ₹{productdata.price} 10% Off</h5>
                  <h5>PackingFee: ₹{productdata.packaging_fee}</h5>

                  <h2 className="mt-5">Offers</h2>

                  <h5>{productdata.offers}</h5>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "Loading...."
      )}
    </>
  );
};

export default connect(null, { addToCart, updateQuantity })(Productdetails);
