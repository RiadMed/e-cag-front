import React from 'react';
import {Timeline} from 'antd';

const Timelines = ({items}) => {
    return (
        <Timeline style={{margin: "30px 10px 10px 30px"}}>
            {items.map(item => {
                return <Timeline.Item color="red">
                    <p>{item.statusDescription} - Date : <b>{item.dateStatusRequest}</b> - Par
                        : <b>{item.username.toUpperCase()}</b></p>
                </Timeline.Item>
            })}
        </Timeline>
    );
};

export default Timelines;