import React from 'react';
import {Card, Col, Divider, Row} from "antd";
import {ROLES_KEYS} from "../../const/staticKeys";
import {useNavigate} from "react-router";
import {CarryOutOutlined, PlusSquareOutlined, SisternodeOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {checkRolesUser} from "../../redux/services/securityAction";

const HomeAdmin = () => {

    const navigate = useNavigate();

    const {user, isLogin} = useSelector((state) => state.security);

    const checkRoles = (roles) => {
        if (isLogin)
            return checkRolesUser(user.rolesList.map(x => x.label), roles);
        return false;
    };

    return (
        <div>
            <Divider orientation="left"> Raccourci :</Divider>
            <Row gutter={24} style={{marginLeft: "15px"}}>
                {checkRoles(ROLES_KEYS.ROLE_SECRETAIRE) ?
                    <Col span={4}>
                        <Card className={'card-click background-card '}
                              onClick={() => navigate('/sessionCAGs/create')}>
                            <div className="flex align-items-center justify-content-between">
                                <div>
                                     <span className="stats-value"><CarryOutOutlined
                                         style={{fontSize: "25px", color: "#42b883"}}/></span>
                                    <p className="mt-2 mb-0 stats-title"
                                       style={{color: '#6d6d6d', fontSize: "12px"}}>
                                        <strong>Programmer une session</strong></p>
                                </div>
                                <div>
                                    <img src={process.env.PUBLIC_URL + '/images/calendar.png'}
                                         width="50"
                                         alt="stats-illustration-1"/>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    : <></>}
                <Col span={4}>
                    {checkRoles(ROLES_KEYS.ROLE_ADMIN) ?
                        <>
                            <Card className={'card-click background-card '}
                                  onClick={() => navigate('/users/add')}>
                                <div className="flex align-items-center justify-content-between">
                                    <div>
                                     <span className="stats-value"><PlusSquareOutlined
                                         style={{fontSize: "25px", color: "#42b883"}}/></span>
                                        <p className="mt-2 mb-0 stats-title"
                                           style={{color: '#6d6d6d', fontSize: "12px"}}>
                                            <strong>Nouveau
                                                Membre</strong></p>
                                    </div>
                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/images/manager.png'}
                                             width="60"
                                             alt="stats-illustration-1"/>
                                    </div>
                                </div>
                            </Card>

                        </>

                        : <></>}

                </Col>
                <Col span={4}>
                    {checkRoles(ROLES_KEYS.ROLE_ADMIN) ?
                        <>
                            <Card className={'card-click background-card '}
                                  onClick={() => navigate('/users/add')}>
                                <div className="flex align-items-center justify-content-between">
                                    <div>
                                     <span className="stats-value"><SisternodeOutlined
                                         style={{fontSize: "25px", color: "#42b883"}}/></span>
                                        <p className="mt-2 mb-0 stats-title"
                                           style={{color: '#6d6d6d', fontSize: "12px"}}>
                                            <strong>Nouvelle organisation</strong></p>
                                    </div>
                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/images/organization.png'}
                                             width="60"
                                             alt="stats-illustration-1"/>
                                    </div>
                                </div>
                            </Card>

                        </>

                        : <></>}

                </Col>
            </Row>
        </div>
    );
}

export default HomeAdmin;