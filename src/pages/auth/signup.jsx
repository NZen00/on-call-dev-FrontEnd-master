import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { SIGNUP } from "../../graphql/auth-queries";
import { Colors } from "../../styles/colors";

const SignUp = (props) => {
  const [signUpError, setSignUpError] = useState(null);
  const [signup, { loading }] = useMutation(SIGNUP, {
    onError: ({ graphQLErrors }) => {
      setSignUpError(graphQLErrors[0]);
    },

    onCompleted: (data) => {
      // console.log(data);
      window.location.replace(`/login?email=${data.createUser.email}`);
    },
  });
  const [codes, setCodes] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getCodes = async () => {
    await fetch(
      "https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((json) => {
        setCodes(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCodes();
  }, []);

  const username = watch("firstName");
  const code = watch("code");

  const onSubmit = (data) => {
    const { username, firstName, lastName, email, password, phone } = data;
    const withoutZero = parseInt(phone, 10);
    const verifiedPhone = code + withoutZero;
    signup({
      variables: {
        username,
        firstName,
        lastName,
        email,
        password,
        phone: verifiedPhone,
        avatar: " ",
        type: "USER",
        address: " ",
      },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="col-10 col-md-8 col-lg-6 mx-auto">
        <div className="card p-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign Up</h3>

            <div className="text-warning">{signUpError?.message}</div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    {...register("firstName", { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    {...register("lastName", { required: true })}
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    defaultValue={username?.toLowerCase()}
                    type="text"
                    {...register("username", { required: true })}
                    className="form-control"
                    placeholder="Type your username"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="form-control"
                    placeholder="ex: example@domain.com"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <div>
                        <input
                          {...register("code", {
                            required: true,
                          })}
                          defaultValue="+94"
                          className="form-control"
                          list="countryCodes"
                          id="countryCodeDatalist"
                        />
                        <datalist id="countryCodes">
                          {codes &&
                            codes.map((code, index) => {
                              return (
                                <option key={index} value={code.dial_code}>
                                  {code.name}
                                </option>
                              );
                            })}
                        </datalist>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <input
                        type="text"
                        {...register("phone", { required: true })}
                        className="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: Colors.primary }}
              className="btn btn-primary btn-block"
            >
              {loading ? (
                <div className="spinner-border text-white" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Regsiter"
              )}
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
