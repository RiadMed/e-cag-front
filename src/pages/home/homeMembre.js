import React from 'react';
import {Divider} from "antd";
import HomeSessionData from "./homeSessionData";
import {useSelector} from "react-redux";
import moment from "moment";

const HomeMembre = () => {

    const {user} = useSelector((state) => state.security);

    const year = moment().year();

    return (
        <div>
            <Divider orientation="left">{"Liste des Sessions : " + year}</Divider>
            <HomeSessionData orgIds={user.organisationList.map(a => a.key)}/>
        </div>
    );
}

export default HomeMembre;