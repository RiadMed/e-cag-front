import React, {useEffect, useState} from 'react';
import {doGet} from "../redux/services/httpActions";
import {TOKEN_KEYS} from "../const/staticKeys";
import {Badge, Button, Dropdown, Menu, Tag} from "antd";
import {NavLink} from "react-router-dom";
import {AlertFilled, MailOutlined} from "@ant-design/icons";

const CommentsMenu = () => {

    const [menu, setMenu] = useState();
    const [count, setCount] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await doGet(`/comments/noRead?page=${0}&size=${3}&field=${'date'}&sort=${'desc'}&username=${localStorage.getItem(TOKEN_KEYS.USERNAME)}`)
            const data = products.data;
            if (products) {
                setCount(data.totalElements);
                setMenu(<Menu>
                    {data.content.map(d => <Menu.Item className={"comment-menu-item"} key={d.id}>
                        <NavLink exact to={`/request/view/${d.requestsId}`}>
                            <MailOutlined
                                style={{fontSize: "14px"}}/> - <Tag
                            color={'#ff4d4f'}>#{d.requestsCode}</Tag> - {d.description}
                        </NavLink>
                    </Menu.Item>)}
                    <Menu.Item className={'last-menu'}>
                        <NavLink exact to="/request">
                            Voir plus
                        </NavLink>
                    </Menu.Item>
                </Menu>)
            }
        }
        fetchProducts()
    }, [])

    return (
        <Badge count={count} className={'right-comment-btn'}>
            <Dropdown overlay={menu} placement="bottomCenter" arrow className={'comment-btn'}>
                <Button className={'comment-btn-txt'}><AlertFilled
                    style={{fontSize: '16px', color: '#ff4d4f'}}/> Message</Button>
            </Dropdown>
        </Badge>
    );
}

export default CommentsMenu;