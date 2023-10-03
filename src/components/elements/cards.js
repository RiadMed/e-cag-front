import React from 'react';
import {Card} from "antd";

const Cards = ({title, loading, bordered, style, extra, className, children}) => {

    return (
        <Card title={title} bordered={bordered} style={style} extra={extra}
              loading={loading}
              bodyStyle={{padding: "0px !important"}}
              className={className}>
            {children}
        </Card>
    );
}

export default Cards;
