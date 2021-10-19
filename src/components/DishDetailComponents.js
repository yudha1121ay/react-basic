import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'


class Dishdetail extends Component {

    /* render selected dish with its details */
    renderSelectedDish(dish) {
        if (dish != null) {
            /* return dish details of clicked one*/
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />

                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        } else {
            /* return empty div when user didn't click any dish initial case*/
            return (
                <div></div>
            )
        }
    }

    renderComments(dish) {
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

        /* this div to display selectedDish details if user click on a dish */
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderSelectedDish(this.props.selectedDish)}
                    </div>

                    <div className="col-md-5 m-1">
                        {this.renderComments(this.props.selectedDish)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dishdetail;