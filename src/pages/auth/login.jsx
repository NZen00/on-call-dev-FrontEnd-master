import React, { useEffect, useState } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";

import { useHistory } from "react-router-dom";

import qs from "qs";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { setWithExpiry } from "../../helpers/localStorage";
import { LOGIN } from "../../graphql/auth-queries";

import { Colors } from "../../styles/colors";

const Login = ({ location }) => {
  // const history = useHistory();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setWithExpiry("user", data.login, data.login.tokenExpiration);
      window.location.replace("/account");
    },
    onError: ({ graphQLErrors }) => {
      setLoginError(graphQLErrors[0]);
    },
  });

  const { email: queryEmail } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const onSubmit = async (formData) => {
    await login({
      variables: { email: formData.email, password: formData.password },
    });
  };
  return (
    <div>
      <Navbar />
      <div className="col-10 col-md-6 col-lg-4 mx-auto">
        <div className="card p-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign In</h3>
            <div className="text-danger">{loginError?.message}</div>
            <div className="form-group">
              <label>Email address</label>
              <input
                defaultValue={queryEmail}
                {...register("email", { required: true })}
                type="email"
                className="form-control"
                placeholder="Enter Your Email Address"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
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
                "Login"
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

export default Login;
