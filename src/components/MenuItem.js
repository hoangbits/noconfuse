import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class MenuItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.dish.id);
  };

  render() {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card onClick={this.handleClick}>
          <CardImg
            width="100%"
            src={this.props.dish.image}
            alt={this.props.dish.name}
          />
          <CardImgOverlay>
            <CardTitle>{this.props.dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    );
  }
}

export default MenuItem;
