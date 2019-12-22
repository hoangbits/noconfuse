import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import moment from 'moment';

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComment(comments) {
    const listComments = comments.map(comment => {
      if (comment && comment.comment && comment.author && comment.date) {
        return (
          <div key={comment.id}>
            <li>{comment.comment}</li>
            <li>
              -- {comment.author}, {moment(comment.date).format('MMM DD, YYYY')}
            </li>
          </div>
        );
      } else {
        return <div />;
      }
    });
    return <ul className="list-unstyled">{listComments}</ul>;
  }

  render() {
    if (this.props.selectedDish != null) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.selectedDish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComment(this.props.selectedDish.comments)}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default DishDetail;
