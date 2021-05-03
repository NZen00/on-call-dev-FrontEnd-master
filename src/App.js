import "./App.css";
import { HomePage } from "./pages/home/index.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountPage from "./pages/account/account";
import AccountServicePage from "./pages/account/services";

import SingleServiceItem from "./pages/services/singleService";
import AddService from "./pages/services/addService";
import Services from "./pages/services";
import Location from "./pages/location";
import SignUp from "./pages/auth/signup";
import Login from "./pages/auth/login";
import PrivateRoute from "./routes/privateRoutes";
import PublicRoute from "./routes/publicRoutes";
import Category from "./pages/categories";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <PublicRoute restricted path="/register/" exact component={SignUp} />
          <PublicRoute restricted path="/login" exact component={Login} />
          <PrivateRoute path="/account" exact component={AccountPage} />
          <PrivateRoute
            path="/account/services"
            exact
            component={AccountServicePage}
          />
          <Route path="/services/" exact component={Services} />
          <Route path="/service/:id" exact component={SingleServiceItem} />
          <Route path="/category/:id" exact component={Category} />
          <Route path="/location/:id" exact component={Location} />
          <PrivateRoute path="/services/add" exact component={AddService} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
