import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
        console.log('Menu Component constructor is invoked');
    }

    componentDidMount() {
        console.log('Menu Component componentDidMount is invoked');
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }

    renderDish(dish) {
        if (dish != null) {
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
    }

    renderComment(dish) {
        if (dish != null) {
            let options = { year: 'numeric', month: 'short', day: 'numeric' };
            console.log(dish.comments);
            const dishComments = dish.comments.map((comment, index) => {
                return (
                    <div key={index}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, <span>{new Date(comment.date).toLocaleDateString("en-US", options)}</span></p>
                    </div>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    {dishComments}
                </div>
            )

        } else {
            return (
                <div></div>
            )
        }
    }

    render() {

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div >
            );
        });

        console.log('Menu Component render is invoked');

        return (
            <div className="container" >
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderDish(this.state.selectedDish)}
                    </div>
                    <div className="col-md-5 m-1">
                        {this.renderComment(this.state.selectedDish)}
                    </div>
                </div>
            </div>
        );
    }

}

export default Menu;