import React from "react";
import { Link, useHistory } from "react-router-dom";

const AccountMenu = () => {
  const history = useHistory();
  return (
    <div className="col-md-3" style={{ borderRight: "1px solid #ddd" }}>
      <ul className="nav flex-column text-left">
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to={`/account/`}
          >
            My Account
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={`/account/services`}>
            My Services
          </Link>
        </li>
        <li className="ml-3 mt-3">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              history.push("/");
            }}
            className="btn btn-danger btn-sm"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountMenu;
