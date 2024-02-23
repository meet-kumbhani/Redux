import Card from "react-bootstrap/Card";
import { FormControl, Form, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { listurl } from "../Config/urls";

function Productlist() {
  const [productsData, setProductsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

  useEffect(() => {
    axios
      .get(listurl)
      .then((responce) => {
        setProductsData(responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productsData]);

  const filteredItems = productsData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (selectedFilter === "All" || item.storage === selectedFilter)
    );
  });

  const lastitemindex = currentPage * itemsPerPage;
  const firstitemindex = lastitemindex - itemsPerPage;
  const currentphones = filteredItems.slice(firstitemindex, lastitemindex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container-fluid bg-dark">
      <div className="py-3 d-flex justify-content-between align-items-center count-search">
        <h3 className="text-white">
          Showing {firstitemindex + 1} to{" "}
          {Math.min(lastitemindex, filteredItems.length)} of{" "}
          {filteredItems.length} Results For "Phone"
        </h3>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Form.Select
            className="me-2"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
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
          {currentphones.map((info) => (
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
      <div className="d-flex justify-content-center">
        <Pagination className="mt-3">
          {[...Array(Math.ceil(filteredItems.length / itemsPerPage))].map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </div>
  );
}

export default Productlist;
