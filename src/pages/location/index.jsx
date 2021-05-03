import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { GET_LOCATION } from "../../graphql/queries";

const Location = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);
  const locationId = match.params.id;
  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: {
      locationId: locationId,
    },
  });
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  console.log(loading, error, data);
  return (
    <div>
      <Navbar toggle={toggle} />
      {!loading ? (
        <div>
          <div className="container py-5 my-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/services">Services</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {data?.getLocation.name}
                </li>
              </ol>
            </nav>
            <div className="container">
              <div className="row">
                {data?.getLocation &&
                  data.getLocation.services.map((service, index) => {
                    return (
                      <Link
                        key={index}
                        style={{
                          marginBottom: 10,
                          display: "block",
                          width: "100%",
                          color: "#000",
                          textDecoration: "none",
                        }}
                        to={`/service/${service._id}`}
                      >
                        <div className="card w-100">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-3">
                                <img
                                  src={service.imageUrl}
                                  className="card-img-top"
                                  alt="..."
                                />
                              </div>
                              <div className="col-md-9">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <h5 className="card-title">
                                      {service.title}
                                    </h5>
                                    <p className="card-text">
                                      {service.description}
                                    </p>
                                    <span className="btn btn-info btn-sm">
                                      View Service
                                    </span>
                                  </div>
                                  <div>
                                    <span>
                                      Starting At{" "}
                                      <span
                                        style={{
                                          color: "#01bf71",
                                          fontSize: 25,
                                        }}
                                      >
                                        {service.price}/hr
                                      </span>{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                {data?.getLocation.services.length === 0 ? (
                  <div>No Services Found on this location</div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <Footer />
    </div>
  );
};

export default Location;
