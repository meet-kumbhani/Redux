import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { cartlist, listurl } from "../Config/urls";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Productdetails = () => {
  const [productdata, setProducdata] = useState([]);
  const [addcart, setaddcart] = useState(false);
  const [carthandel, setcarthandel] = useState([]);

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

  let handelcart = () => {
    axios
      .post("http://localhost:3001/cart", { ...productdata })
      .then(() => {
        setaddcart(true);
        setcarthandel((prev) => [...prev, { ...productdata }]);
      })
      .catch((err) => {
        console.log(err);
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
                    {addcart ? (
                      <>
                        <button className="buynow-btn me-2">Buy Now</button>

                        <h5 className="d-flex align-items-center">
                          Quantity:-
                          <RemoveCircleOutlineIcon
                            fontSize="small"
                            className="me-2"
                          />
                          {productdata.quantity}
                          <ControlPointIcon fontSize="small" className="ms-2" />
                        </h5>
                      </>
                    ) : (
                      <>
                        <button className="buynow-btn me-2">Buy Now</button>
                        <button className="cart-btn" onClick={handelcart}>
                          Add To Cart
                        </button>

                        {/* <ControlPointIcon fontSize="small" className="ms-2" /> */}
                      </>
                    )}
                    {/* <button className="buynow-btn me-2">Buy Now</button>
                    <button className="cart-btn" onClick={handelcart}>
                      Add To Cart
                    </button> */}
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

export default Productdetails;
