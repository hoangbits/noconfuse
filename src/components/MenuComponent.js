import React, { Component } from 'react';
import MenuItem from './MenuItem';

class Menu extends Component {
  render() {
    const menu = this.props.dishes.map(dish => {
      return (
        <MenuItem key={dish.id} dish={dish} onClick={this.props.onClick} />
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
      </div>
    );
  }
}

export default Menu;
