import React from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card, Carousel } from 'react-bootstrap'



export const ProductoCarousels = () => {
    return (
        <Carousel >
            <Carousel.Item>
                <img
                className="d-block w-100"
                height="350"
                src="/images/files/spacejam1.jpg"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                height="350"
                src="/images/files/spacejam3.jpg"
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                height="350"
                src="/images/files/spacejam2.jpeg"
                alt="Third slide"
                />
            </Carousel.Item>
            </Carousel>
    )
}
