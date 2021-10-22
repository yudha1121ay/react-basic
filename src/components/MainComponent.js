import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishDetailComponents'
import { DISHES } from '../shared/Dishes';
import { COMMENTS } from '../shared/Comments';
import { LEADERS } from '../shared/Leaders';
import { PROMOTIONS } from '../shared/Promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';



class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        };
    }


    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promo={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWIthID = ({ match }) => {
            return (
                <Dishdetail
                    dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comment={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/aboutus"
                        component={() => <About leaders={this.state.leaders} />} />
                    <Route exact path="/menu"
                        component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWIthID} />
                    <Route exact path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;