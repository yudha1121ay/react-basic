import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        );
    } else if (errMess) {
        return (
            <h3>{errMess}</h3>
        );
    } else {
        return (
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle> {item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card >
            </FadeTransform>
        );
    }
}


function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={props.dish}
                        isLoading={props.dishLoad}
                        errMess={props.dishErr} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={props.promo}
                        isLoading={props.promosLoad}
                        errMess={props.promosErr} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={props.leader}
                        isLoading={props.leadsLoad}
                        errMess={props.leadsErr} />
                </div>
            </div>
        </div>
    );
}

export default Home;