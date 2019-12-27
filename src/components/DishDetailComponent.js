import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import moment from 'moment';

function RenderDish({ dish }) {
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

function RenderComment({ comments }) {
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
const DishDetail = props => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComment comments={props.dish.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default DishDetail;
