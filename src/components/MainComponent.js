import React, { Component } from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter(dish => dish.featured)[0]}
          promotion={
            this.props.promotions.filter(promotion => promotion.featured)[0]
          }
          leader={this.props.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    // a component
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={this.props.dishes.find(
            dish => dish.id === parseInt(match.params.dishId, 10)
          )}
          comments={this.props.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };

    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    const renderMenuPage = () => {
      return <Menu dishes={this.props.dishes} />;
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/aboutus" component={AboutPage} />
          {/*
          error
          Element type is invalid: expected a string (for built-in components)
           or a class/function (for composite components) but got: object.
          If we do:
          <Route exact path="/menu" component={<Menu dishes={this.state.dishes} />} />
          OR
          <Route exact path="/menu" component={this.renderMenuPage()} /> // call method in outside component
          */}

          {/*<Route exact path="/menu" component={MenuPage} />*/}
          {/* Switch will match the very first one it encounter*/}
          <Route exact path="/menu" component={renderMenuPage} />
          <Route path="/menu/:dishId" component={DishWithId} />
          {/*
          previously we maintain selected dish here
          */}
          <Route exact path="/contactus" component={Contact} />
          {/* Default Route */}

          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
