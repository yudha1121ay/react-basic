import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row } from 'reactstrap'
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


function Dish({ dish }) {
    if (dish != null) {
        return (
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
    } else {
        return (
            <div></div>
        )
    }
}

function Comment({ comments, postComments, dishId }) {
    if (comments != null) {
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        return (
            <>
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map((comment) => {
                        return (
                            <Fade in>
                                <div key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString("en-US", options)}</p>
                                </div>
                            </Fade>
                        );
                    })}
                </Stagger>
                <CommentForm dishId={dishId} postComments={postComments} />
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

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.props.postComments(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
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
                                <Label htmlFor="author">Author</Label>
                                <Control.text
                                    className="form-control"
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Author..."
                                    validators={{ minLength: minLength(3), maxLength: maxLength(15) }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'This field can be filled with minimum 3 characters',
                                        maxLength: 'Maximum character for this field is 15!'
                                    }} />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>{''}
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
        )
    }
}

const Dishdetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h2>{props.errMess}</h2>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu" >Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Dish dish={props.dish} />
                    </div>

                    <div className="col-12 col-md-5 m-1">
                        <Comment
                            comments={props.comment}
                            postComments={props.postComments}
                            dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dishdetail;