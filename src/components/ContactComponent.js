import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            telnum: '',
            email: '',
            accept: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstName: false,
                lastName: false,
                telnum: false,
                email: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit(event) {
        alert("Current state is: " + JSON.stringify(this.state))
        event.preventDefault();
    }

    handleValidation = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(firstName, lastName, telnum, email) {
        const error = {
            firstName: '',
            lastName: '',
            telnum: '',
            email: '',
        };

        if (this.state.touched.firstName && firstName.length < 3)
            error.firstName = "First name should be more than 3 characters";
        else if (this.state.touched.firstName && firstName.length > 10)
            error.firstName = "First name should be less than 10 characters";

        if (this.state.touched.lastName && lastName.length < 3)
            error.lastName = "First name should be more than 3 characters";
        else if (this.state.touched.lastName && lastName.length > 10)
            error.lastName = "First name should be less than 10 characters";

        const regex = /^\d+$/;
        if (this.state.touched.telnum && !regex.test(telnum))
            error.telnum = "This should be filled only with numbers"

        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            error.email = "Email should contain valid email format";

        return error;
    }

    render() {
        const error = this.validate(this.state.firstName, this.state.lastName, this.state.telnum, this.state.email);
        return (
            <div className="container" >
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home" />Home</BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="/"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstName" placeholder="First Name"
                                        value={this.state.firstName}
                                        valid={error.firstName === ''}
                                        invalid={error.firstName !== ''}
                                        onBlur={this.handleValidation('firstName')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {error.firstName}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastName" placeholder="Last Name"
                                        value={this.state.lastName}
                                        valid={error.lastName === ''}
                                        invalid={error.lastName !== ''}
                                        onBlur={this.handleValidation('lastName')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {error.lastName}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Contact Number</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum" placeholder="Telephone Number"
                                        value={this.state.telnum}
                                        valid={error.telnum === ''}
                                        invalid={error.telnum !== ''}
                                        onBlur={this.handleValidation('telnum')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {error.telnum}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="mail" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="mail" name="email" placeholder="Email"
                                        value={this.state.email}
                                        valid={error.email === ''}
                                        invalid={error.email !== ''}
                                        onBlur={this.handleValidation('email')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {error.email}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="accept"
                                                checked={this.state.accept}
                                                onChange={this.handleInputChange} /> {''}
                                            <strong>May we contact you ?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 2 }}>
                                    <Input type="select" name="contactType"
                                        value={this.state.contactType}
                                        onChange={this.handleInputChange}>
                                        <option>Telephone</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" rows="10" name="message" placeholder="Input your feedback"
                                        value={this.state.message}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;