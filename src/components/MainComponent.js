import React, { Component } from 'react';
import { NavbarBrand, Navbar } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId
    });
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante No Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu
          dishes={this.state.dishes}
          onClick={dishId => this.onDishSelect(dishId)}
        />
        <DishDetail
          dish={this.state.dishes.find(
            dish => dish.id === this.state.selectedDish
          )}
        />
      </div>
    );
  }
}

export default Main;
