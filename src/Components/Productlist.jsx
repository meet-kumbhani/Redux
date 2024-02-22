import { connect } from "react-redux";
import { Fetchalldata } from "../Services/Module/action";
import Card from "react-bootstrap/Card";
import { FormControl, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Productlist({ products }) {
  const productsData = products?.data || [];
  console.log(productsData);
  return (
    <div className="container-fluid bg-dark">
      <div className="py-3 d-flex justify-content-between align-items-center count-search">
        <h3 className="text-white">Showing to of Results For "Phone"</h3>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Form.Select className="me-2">
            <option value="All">All</option>
            <option value="2GB">2GB</option>
            <option value="4GB">4GB</option>
            <option value="6GB">6GB</option>
            <option value="8GB">8GB</option>
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
            <option value="64GB">64GB</option>
            <option value="128GB">128GB</option>
          </Form.Select>
        </Form>
      </div>
      <>
        <div className="row">
          {productsData.map((info) => (
            <div className="col-lg-3 col-md-3 col-sm-6 mb-4" key={info.id}>
              <Link className="nav-link" to={`/productdetails/${info.id}`}>
                <Card className="w-100 h-100">
                  <Card.Img
                    variant="top"
                    src={info.image}
                    width="100%"
                    height="350px"
                    className="p-1"
                  />
                  <Card.Body>
                    <Card.Title>
                      <p>{info.name}</p>
                      <p>{info.model}</p>
                      <p>{info.storage}</p>
                    </Card.Title>
                    <Card.Text>
                      <h3>Price: ₹{info.price}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.items,
  };
};

const mapDispatchToProps = {
  getproducts: Fetchalldata,
};

const wrapper = connect(mapStateToProps, mapDispatchToProps);
export default wrapper(Productlist);
