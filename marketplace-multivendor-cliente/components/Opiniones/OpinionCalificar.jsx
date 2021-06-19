import React from 'react'
import ReactStars from "react-rating-stars-component"
import { Button, Col, Row, InputGroup, FormControl, Card } from 'react-bootstrap'

export const OpinionCalificar = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };

    return (
        <Row className="pl-4">
            <Col>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />
            </Col>
            <Col className="pt-1">
                <Button variant="outline-info" size="sm">Calificar</Button>
            </Col>
        </Row>
    )
}
