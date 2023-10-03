import React from 'react';
import {
    BranchesOutlined,
    CarryOutOutlined,
    FieldTimeOutlined,
    FileProtectOutlined,
    FlagOutlined,
    HomeOutlined,
    MailOutlined,
    MenuOutlined,
    ProfileOutlined,
    ScheduleOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";

const IconApp = ({label}) => {
    switch (label) {
        case 'home' :
            return <HomeOutlined/>
        case 'sessionCAGs' :
            return <FileProtectOutlined/>
        case 'organisations' :
            return <BranchesOutlined/>
        case 'status' :
            return <FieldTimeOutlined/>
        case 'organisationTypes' :
            return <FlagOutlined/>
        case 'users' :
            return <UserSwitchOutlined/>
        case 'menus' :
            return <MenuOutlined/>
        case 'sessionCAGs/planifications' :
            return <ScheduleOutlined/>
        case 'sessionCAGs/aValider' :
            return <CarryOutOutlined/>
        case 'sessionCAGInvitations' :
            return <MailOutlined/>
        default:
            return <ProfileOutlined/>
    }
}

export default IconApp;