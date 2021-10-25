import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Col, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row } from 'reactstrap'
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


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

function Comment({ comments }) {
    if (comments != null) {
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        return (
            <>
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString("en-US", options)}</p>
                        </div>
                    );
                })}
            </>
        )

    } else {
        return (
            <div></div>
        )
    }
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        alert("Current state is: " + JSON.stringify(values))
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu" />Menu</BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Dish dish={this.props.dish} />
                        </div>

                        <div className="col-12 col-md-5 m-1">
                            <Comment comments={this.props.comment} />
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-pencil fa-lg"></span> Submit Comment
                            </Button>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody className="ml-3 mr-3">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="username">Username</Label>
                                <Control.text
                                    className="form-control"
                                    model=".username"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    validators={{ minLength: minLength(3), maxLength: maxLength(15) }} />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages={{
                                        minLength: 'This field can be filled with minimum 3 characters',
                                        maxLength: 'Maximum character for this field is 15!'
                                    }} />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Username</Label>{''}
                                <Control.textarea
                                    rows="6"
                                    className="form-control"
                                    model=".comment"
                                    id="comment"
                                    name="comment"
                                    placeholder="Enter your comment" />
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Dishdetail;