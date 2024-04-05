import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import PersonalAccountPage from "./components/PersonalAccountPage";

const Routes = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Switch>
          <Route path="/" exact component={Items} />
          <Route path="/categories" component={Categories} />
          <Route path="/show-full-item" component={ShowFullItem} />
          <Route path="/personal-account/:userId" component={PersonalAccountPage} />

        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default Routes;
