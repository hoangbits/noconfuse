import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
class Main extends Component {
  constructor() {
    super();
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={
            this.state.promotions.filter(promotion => promotion.featured)[0]
          }
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    const AboutPage = () => {
      return <About leaders={this.state.leaders} />;
    };

    const renderMenuPage = () => {
      return <Menu dishes={this.state.dishes} />;
    };
    // a component
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={this.state.dishes.find(
            dish => dish.id === parseInt(match.params.dishId, 10)
          )}
          comments={this.state.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
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

export default Main;
