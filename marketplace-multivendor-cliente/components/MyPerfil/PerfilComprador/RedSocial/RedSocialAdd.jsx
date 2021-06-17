import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Select from 'react-select';

export const RedSocialAdd = () => {
    const redSocialOptions = [
        { value: 'facebook', label: 'Facebook'},
        { value: 'instagram', label: 'Instagram'},
        { value: 'twitter', label: 'Twitter'},
        { value: 'reddit', label: 'Reddit'},
        { value: 'tiktok', label: 'Tiktok'},
        { value: 'youtube', label: 'Youtube'},
        { value: 'twitch', label: 'Twitch'},
    ]

    return (
        <>
            <Row>
                <Col>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={redSocialOptions[0]}
                        isSearchable={true}
                        name="color"
                        options={redSocialOptions}
                    />
                </Col>
            </Row>
            
        </>
    )
}
