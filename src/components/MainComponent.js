import React, { Component } from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import {
  postComment,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders
} from "../redux/ActionCreators";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
  postComment: (dishId, rating, author, comment) => {
    dispatch(postComment(dishId, rating, author, comment));
  },
  postFeedback: (
    firstName,
    lastName,
    telNum,
    email,
    agree,
    contactType,
    message,
    date
  ) => {
    dispatch(
      postFeedback(
        firstName,
        lastName,
        telNum,
        email,
        agree,
        contactType,
        message,
        date
      )
    );
  }
});
// TODO convert to functional component and using hooks instead of life cycle method

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              promotion => promotion.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter(leader => leader.featured)[0]
          }
        />
      );
    };

    // a component
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={this.props.dishes.dishes.find(
            dish => dish.id === parseInt(match.params.dishId, 10)
          )}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    const renderMenuPage = () => {
      return <Menu dishes={this.props.dishes} />;
    };

    const renderContactUs = () => {
      return <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>;
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
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
              <Route exact path="/contactus" component={renderContactUs} />
              {/* Default Route */}

              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
