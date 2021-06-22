import React, { useState, useEffect } from 'react'
import { Button, Col, Row, InputGroup, FormControl, Card, Carousel } from 'react-bootstrap'
import { getImageByProducto } from '../../services/productos.service';


export const ProductoCarousels = ({idProducto}) => {
    const [ images, setImages ] = useState([]);


    const getImages = async(productoID)=>{
        let imgs = await getImageByProducto(productoID);
        return imgs;
    }

    useEffect(() => {
        let imgs = getImages(idProducto).then(i=>setImages(i));
    }, [])


    return (
        <Carousel >
            {
                images.length > 0 && images.map( image => (
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            height="350"
                                            src={`/images/files/${image.url_foto}`}
                                            alt="First slide"
                                            />
                                        </Carousel.Item>
                                    ))
            }
            {
                images.length <= 0 &&   <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            height="350"
                                            src="/images/files/no-disponible.jpg"
                                            alt="First slide"
                                            />
                                        </Carousel.Item>
            }
        </Carousel>
    )
}
