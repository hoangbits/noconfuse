import React, {Component} from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from "./components/MenuComponent";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">NoConfuse react</NavbarBrand>
          </div>
        </Navbar>
        <Menu/>
      </div>
    );
  }
}

export default App;
