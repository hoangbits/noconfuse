import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect = dishId => {
    this.setState({
      selectedDish: dishId
    });
  };

  renderMenuPage = () => {
    return <Menu dishes={this.state.dishes} />;
  };

  render() {
    const HomePage = () => {
      return <Home />;
    };
    const MenuPage = () => {
      return <Menu dishes={this.state.dishes} />;
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />

          {/*
          error
          Element type is invalid: expected a string (for built-in components)
           or a class/function (for composite components) but got: object.
          If we do:
          <Route exact path="/menu" component={<Menu dishes={this.state.dishes} />} />
          OR
          <Route exact path="/menu" component={this.renderMenuPage()} />
          */}

          {/*<Route exact path="/menu" component={MenuPage} />*/}

          <Route exact path="/menu" component={this.renderMenuPage} />
          {/* Default Route */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
