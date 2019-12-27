import React, { Component } from 'react';
import { NavbarBrand, Navbar } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

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

  render() {
    return (
      <div>
        <Header />
        <Menu dishes={this.state.dishes} onClick={this.onDishSelect} />
        <DishDetail
          dish={this.state.dishes.find(
            dish => dish.id === this.state.selectedDish
          )}
        />
        <Footer />
      </div>
    );
  }
}

export default Main;
