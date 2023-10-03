import React from 'react';
import {Col, Image, Row} from "antd";

const ImageGrid = ({items, imgWidth}) => {

    let imgItem;

    if (items) {
        imgItem = items.map((item, index) => {
            return (
                <div key={index}>
                    <Col className="gutter-row" span={6}>
                        <Image width={imgWidth ? imgWidth : 152}
                               src={item}
                               style={{cursor: "pointer"}}/>
                    </Col>
                </div>
            );
        })
    }

    return (
        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            {imgItem}
        </Row>
    );
}

export default ImageGrid;
