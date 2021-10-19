import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import Dishdetail from './components/DishDetailComponents';
import { Dishes } from './components/shared/Dishes';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: Dishes,
      selectedDish: null
    };
  }

  onDishSelected(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelected(dishId)} />
        <Dishdetail
          selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      </div>
    );
  }
}

export default App;