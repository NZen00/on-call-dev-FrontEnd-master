import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import AccountMenu from "./accountMenu";

import { useForm } from "react-hook-form";

import { GET_USER, UPDATE_USER } from "../../graphql/auth-queries.js";

const AccountPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(null);
  const [editable, setEditable] = useState(false);

  const { loading, data } = useQuery(GET_USER);
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  useEffect(() => {
    setState(data && data.getUser);
  }, [data]);

  const onSubmit = async (data) => {
    await updateUser({
      variables: {
        userId: state._id,
        ...data,
      },
    })
      .then(() => {
        setState({
          ...state,
          ...data,
        });
        setEditable(!editable);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onExit = () => {
    setEditable(!editable);
  };

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
                <div className="px-4 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div>
                      {state?.avatar && state.avatar !== " " ? (
                        <img style={{ width: 80 }} src={state?.avatar} alt="" />
                      ) : (
                        <img
                          style={{ width: 80 }}
                          src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
                          alt=""
                        />
                      )}
                    </div>
                    <h5 className="m-0 ml-3">
                      {editable ? (
                        <div className="d-flex ">
                          <input
                            {...register("firstName", {
                              required: true,
                            })}
                            defaultValue={state?.firstName}
                            className="form-control"
                            type="text"
                          />
                          <input
                            style={{ marginLeft: 5 }}
                            {...register("lastName", {
                              required: true,
                            })}
                            defaultValue={state?.lastName}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      ) : (
                        <>
                          {state && state.firstName} {state && state.lastName}
                        </>
                      )}
                    </h5>
                  </div>
                  {editable ? (
                    <div>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className={`btn btn-warning btn-sm`}
                      >
                        {updating ? (
                          <div
                            className="spinner-border text-white"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Save Profile"
                        )}
                      </button>
                      <button
                        onClick={onExit}
                        style={{ marginLeft: 10 }}
                        className="btn btn-danger btn-sm"
                      >
                        Exit
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={toggleEditable}
                      className={`btn btn-info btn-sm`}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
                <hr />

                <div className="px-4">
                  <div className="row">
                    <div className="col-md-6">
                      {!editable ? (
                        <> Username: {state?.username} </>
                      ) : (
                        <input
                          {...register("username", {
                            required: true,
                          })}
                          defaultValue={state?.username}
                          className="form-control"
                          type="text"
                        />
                      )}
                    </div>
                    <div className="col-md-6">
                      {!editable ? (
                        <> Email: {state?.email} </>
                      ) : (
                        <input
                          {...register("email", {
                            required: true,
                          })}
                          defaultValue={state?.email}
                          className="form-control"
                          type="text"
                        />
                      )}
                    </div>
                    <div className="col-md-6 mt-3">
                      {!editable ? (
                        <> Phone: {state?.phone} </>
                      ) : (
                        <input
                          {...register("phone", {
                            required: true,
                          })}
                          defaultValue={state?.phone}
                          className="form-control"
                        />
                      )}
                    </div>
                    <div className="col-md-6 mt-3">
                      {!editable ? (
                        <> Address: {state?.address} </>
                      ) : (
                        <input
                          {...register("address", {
                            required: true,
                          })}
                          defaultValue={state?.address}
                          className="form-control"
                          type="text"
                        />
                      )}
                    </div>
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

export default AccountPage;
