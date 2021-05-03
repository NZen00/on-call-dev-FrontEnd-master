import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Marginer } from "../marginer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../styles/colors";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 250px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  margin: 0.5em;
  margin-bottom: 1.3em;
`;

const TopContainer = styled.div`
  width: 100%;
`;

const ServiceThumbnail = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 15px 14px;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(15, 15, 15, 0.19);
  padding: 0 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
  font-weight: 500;
  color: #000;
  text-align: start;
`;

const SpecialistName = styled.h4`
  margin: 0;
  color: rgba(151, 151, 151, 1);
  font-size: 12px;
  font-weight: 400;
`;

const RatingContainer = styled.div`
  display: flex;
  color: #ebe204;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceText = styled.div`
  margin-left: 3px;
  color: #2ba679;
  font-weight: 700;
`;

const StartingAtText = styled.h6`
  margin: 0;
  color: rgb(161, 161, 161);
  font-weight: 400;
`;

export function ServiceCard(props) {
  const {
    thumbnailUrl,
    specialist,
    _id,
    title,
    rate,
    // rating,
    price,
    imageUrl,
  } = props;

  return (
    <div className="col-md-4 mb-4">
      <figure className="card card-product h-100">
        <div className="img-wrap">
          <div
            style={{
              width: "100%",
              height: 250,
              maxHeight: 250,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        </div>
        <figcaption className="info-wrap p-3">
          <h4 className="title">{title}</h4>
          {/* <p className="desc">Some small description goes here</p> */}
          {/* <div className="rating-wrap">
            <div className="label-rating">132 reviews</div>
            <div className="label-rating">154 orders </div>
          </div> */}
        </figcaption>
        <div className="bottom-wrap d-flex align-items-center justify-content-between p-3">
          <div>
            <Link
              to={`/service/${_id}`}
              style={{ backgroundColor: Colors.accent, border: "none" }}
              className="btn btn-primary d-block"
            >
              Order Now
            </Link>
          </div>
          <div className="price-wrap h5">
            <span style={{ color: Colors.primary }} className="price-new">
              <span style={{ fontSize: 13, color: Colors.accent }}>
                Starting from
              </span>
              <br />
              Rs.{price}
            </span>
          </div>
        </div>
      </figure>
    </div>
  );
}
