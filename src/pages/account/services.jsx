import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { getUser } from "../../helpers/getUser";
import AccountMenu from "./accountMenu";

const ServicesPage = () => {
  const [isOpen, setIsOpen] = useState(false); //Sidebar properties access{opasity and top}
  const [state, setState] = useState(null);
  const history = useHistory();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const user = getUser();

  const GET_USER = gql`
    query GetUser {
      getUser {
        createdServices {
          _id
          title
          imageUrl
          description
          price
        }
      }
    }
  `;

  if (!user) {
    history.push("/");
  }
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    setState(data && data.getUser);
  }, [data]);

  return (
    <div>
      <Navbar toggle={toggle} />
      <div className="container py-5">
        <div className="py-4 px-4 bg-light d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Account</h5>
          <Link
            to="/services/add"
            style={{ backgroundColor: "#01bf71", border: "none" }}
            className="btn btn-primary"
          >
            Add Service
          </Link>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="py-4 px-4 bg-light mb-5">
            <div className="row">
              <AccountMenu />
              <div className="col-md-9 text-left">
                <div className="px-4">
                  <h5>Services</h5>
                  <hr />
                </div>
                <div className="px-4">
                  <div className="row">
                    {state && state.createdServices.length !== 0 ? (
                      state.createdServices.map((service, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "block",
                              width: "100%",
                              color: "#000",
                              textDecoration: "none",
                            }}
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
                                        <Link
                                          to={`/service/${service._id}`}
                                          className="btn btn-info btn-sm"
                                        >
                                          View Service
                                        </Link>
                                        <button className="btn btn-danger btn-sm ml-2">
                                          Delete
                                        </button>
                                        <button className="btn btn-primary btn-sm ml-2">
                                          Edit
                                        </button>
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
                          </div>
                        );
                      })
                    ) : (
                      <div>There are no services you created</div>
                    )}
                    <div className="col-md-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
