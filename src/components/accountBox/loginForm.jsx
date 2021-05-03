import React, { useContext, useState } from "react";
import { Marginer } from "../marginer";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext } from "./context";

import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";

import axios from "axios";
import { setWithExpiry } from "../../helpers/localStorage";
import { useHistory } from "react-router";

const initialState = {
  email: "",
  password: "",
};

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      type
      tokenExpiration
    }
  }
`;

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [login, { data }] = useMutation(LOGIN);
  const onSubmit = async (formData) => {
    await login({
      variables: { email: formData.email, password: formData.password },
    })
      .then((res) => {
        setWithExpiry("user", res.data.login, res.data.login.tokenExpiration);
        history.push(`/account/`);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>

      <div className="form-group">
        <label>Email address</label>
        <input
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

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
}
