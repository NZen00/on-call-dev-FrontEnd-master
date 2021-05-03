import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import moment from "moment";
import { Link } from "react-router-dom";
import { GET_SERVICE } from "../../graphql/queries";

const SingleServiceItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(null);
  const [service, setService] = useState(null);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { id } = props.match.params;

  const { loading, errors, data } = useQuery(GET_SERVICE, {
    variables: { serviceId: id },
  });

  useEffect(() => {
    setState({
      loading,
      errors,
    });
    setService(data && data.getService);
  }, [data]);

  const dateFormat = (data) => {
    let dateString = moment(data).format("MMMM Do YYYY, h:mm:ss a");
    return dateString;
  };

  return (
    <div>
      <Navbar toggle={toggle} />
      {loading ? (
        <div className="py-5 my-5">loading...</div>
      ) : (
        <div className="col-md-8 mx-auto py-5 px-5 my-5 bg-light text-left">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/services">Services</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {service?.title}
              </li>
            </ol>
          </nav>
          <h3>{service?.title}</h3>
          <span>
            Posted on {dateFormat(service?.createdAt)} |{" "}
            {service?.location.name}
          </span>

          <div className="row">
            <div className="col-md-7">
              <div className="card mt-2">
                <img
                  className=""
                  src={service?.imageUrl}
                  alt={service?.title}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="mt-1 bg-white h-100 p-4">
                <div className="">
                  <div className="text-left">
                    <span>
                      Service by{" "}
                      <Link to={`/user/${service?.creator._id}`}>
                        <b>{service?.creator.username}</b>
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span style={{ fontSize: 13 }}>Starting from</span>
                  <h3 className="text-success" style={{ fontWeight: "bold" }}>
                    Rs.{service?.price}
                  </h3>
                </div>
                <div className="mt-4">
                  <h5>Description</h5>
                  <p>{service?.description}</p>
                </div>
                <button className="w-100 btn btn-success  mt-4">
                  Request Service
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4"></div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SingleServiceItem;
