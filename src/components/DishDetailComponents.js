import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'



function Dish({ dish }) {
    if (dish != null) {
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
        return (
            <div></div>
        )
    }
}

function Comment({ dish }) {
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

const Dishdetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Dish dish={props.selectedDish} />
                </div>

                <div className="col-12 col-md-5 m-1">
                    <Comment dish={props.selectedDish} />
                </div>
            </div>
        </div>
    );
}

export default Dishdetail;