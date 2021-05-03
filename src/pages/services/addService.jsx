import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";

import { useForm } from "react-hook-form";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { UPLOAD_SERVICE_IMAGE } from "../../helpers/uploadImage";
import { CATEGORIES, LOCATIONS, ADD_SERVICE } from "../../graphql/queries";

const AddService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState();

  //use query
  const locations = useQuery(LOCATIONS);
  const categories = useQuery(CATEGORIES);
  //use mutation
  const [addService] = useMutation(ADD_SERVICE);

  const history = useHistory();

  const submitService = async (image, data) => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "services_thumbnails");

    Axios({
      method: "post",
      url: UPLOAD_SERVICE_IMAGE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        const { url } = res.data;
        const { title, description, price, category, location } = data;
        addService({
          variables: {
            title,
            description,
            price: parseFloat(price),
            location,
            category,
            imageUrl: url,
          },
        })
          .then(() => {
            history.go(0);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchImage = watch("imageUrl");

  useEffect(() => {
    let imageFile = watchImage && watchImage[0];
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [watchImage]);

  const onSubmit = (data) => {
    submitService(data.imageUrl, data);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar toggle={toggle} />
      <div className="container py-5 text-left">
        <h4>Add Service</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row pt-5">
            <div className="col-md-6 mb-3">
              <label htmlFor="serviceTitle" className="form-label">
                Service Title
              </label>
              <input
                {...register("title", {
                  required: true,
                })}
                type="text"
                className="form-control"
                id="serviceTitle"
                placeholder="ex: Plumbing Service"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="pricePerHour" className="form-label">
                Price per hour
              </label>
              <input
                {...register("price", {
                  required: true,
                })}
                type="text"
                className="form-control"
                id="pricePerHour"
                placeholder="ex: 3500/hr"
              />
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="servicesDescription" className="form-label">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: true,
                  })}
                  className="form-control"
                  id="servicesDescription"
                  rows={3}
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div>
                <label htmlFor="exampleDataList" className="form-label">
                  Category
                </label>
                <input
                  {...register("category", {
                    required: true,
                  })}
                  className="form-control"
                  list="CategoryList"
                  id="CategoryListInput"
                  placeholder="Type to search category..."
                />
                <datalist id="CategoryList">
                  {categories && categories.data ? (
                    categories.data.categories.map((category, index) => {
                      return (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      );
                    })
                  ) : (
                    <option>No CategoryData Data</option>
                  )}
                </datalist>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div>
                <label htmlFor="exampleDataList" className="form-label">
                  Location
                </label>
                <input
                  {...register("location", {
                    required: true,
                  })}
                  className="form-control"
                  list="locationList"
                  id="locationListInput"
                  placeholder="Type to search location..."
                />
                <datalist id="locationList">
                  {locations && locations.data ? (
                    locations.data.locations.map((location, index) => {
                      return (
                        <option key={index} value={location.name}>
                          {location.name}
                        </option>
                      );
                    })
                  ) : (
                    <option>No Location Data</option>
                  )}
                </datalist>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <label htmlFor="formFile" className="form-label">
                Service Thumbnail
              </label>
              <input
                {...register("imageUrl", {
                  required: true,
                })}
                className="form-control"
                type="file"
                id="formFile"
              />
            </div>
          </div>

          <input type="submit" name="Submit" className="btn btn-info " id="" />
        </form>
        <div style={{ marginTop: 60 }}>
          {previewImage && (
            <img src={previewImage} alt="" style={{ height: 200 }} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddService;
