import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { ServiceCard } from "../../components/serviceCard";
import { CATEGORIES, LOCATIONS, SERVICES } from "../../graphql/queries";

const Services = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(CATEGORIES);
  const {
    data: locations,
    loading: locationsLoading,
    error: locationsError,
  } = useQuery(LOCATIONS);
  const {
    data: services,
    loading: servicesLoading,
    error: servicesError,
  } = useQuery(SERVICES);

  console.log(services);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar toggle={toggle} />
      <div className="col-md-10 mx-auto py-5">
        <h2>All Services</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="mt-4">
              <h4>Categories</h4>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {categories && categories.categories?.length !== 0 ? (
                  categories.categories.map((category, index) => {
                    return (
                      <li key={index}>
                        <Link to={`/category/${category._id}`}>
                          {category.name}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
            <div className="mt-4">
              <h4>Locations</h4>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {locations && locations.loacations?.length !== 0 ? (
                  locations.locations.map((location, index) => {
                    return (
                      <li key={index}>
                        <Link to={`/location/${location._id}`}>
                          {location.name}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            {!servicesLoading ? (
              <div className="row">
                {services && services.service?.length !== 0 ? (
                  services.services.map((service) => {
                    return <ServiceCard {...service} key={service._id} />;
                  })
                ) : (
                  <div>No Service Added</div>
                )}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
