import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Divider, List, Row, Tag} from "antd";
import RedirectButton from "./redirectButton";
import {useDispatch, useSelector} from "react-redux";
import {checkRolesUser} from "../../redux/services/securityAction";
import {useNavigate} from "react-router";
import moment from "moment";
import {doGet} from "../../redux/services/httpActions";
import {catchError} from "../../redux/services/actions";
import {ROLES_KEYS} from "../../const/staticKeys";
import {InfoCircleOutlined} from "@ant-design/icons";
import {route} from "../session";
import HomeSessionData from "./homeSessionData";

const HomeSecretaire = () => {

    const [currentSession, setCurrentSession] = useState([]);
    const [lastSession, setLastSession] = useState([]);
    const [currentYear, setCurrentYear] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLogin, loading} = useSelector((state) => state.security);

    const checkRoles = (roles) => {
        if (isLogin)
            return checkRolesUser(user.rolesList.map(x => x.label), roles);
        return false;
    };

    useEffect(() => {

        const currentMonth = (moment().month() + 2);
        const year = moment().year();
        setCurrentYear(year);
        let lastMonth = currentMonth - 2;
        const fetchCurrentSession = async () => {
            doGet(`/sessionCAGs?orgId=${user.organisationList.map(a => a.key)}&annnee=${year}&mois=${currentMonth}`).then(response => {
                setCurrentSession(response.data);
            });
        };
        fetchCurrentSession().catch((error) => {
            dispatch(catchError(error, navigate));
        });

        if (lastMonth !== 0) {
            const fetchLastSession = async () => {
                doGet(`/sessionCAGs?orgId=${user.organisationList.map(a => a.key)}&annnee=${year}&mois=${lastMonth}`).then(response => {
                    setLastSession(response.data);
                });
            };
            fetchLastSession().catch((error) => {
                dispatch(catchError(error, navigate));
            });
        }
    }, []);

    return (
        <div>
            <Row gutter={24}>
                <Col span={12}>

                    <Card bordered={false} loading={loading}>
                        <div className="flex align-items-start justify-content-between">

                            <div style={{width: "100%"}}>
                                <Divider orientation="left">Session en cours</Divider>

                                <List
                                    size="small"
                                    bordered
                                    dataSource={currentSession}
                                    renderItem={item =>

                                        <List.Item>
                                            <Row style={{width: "100%"}}>
                                                <Col style={{float: "left"}}
                                                     lg={{span: 6}}>{item.code}</Col>
                                                <Col lg={{span: 4}}><Tag
                                                    color="success">{item.organisationLabel}</Tag></Col>
                                                <Col lg={{span: 3, offset: 3}}>{item.sessionDateTime}</Col>
                                                <Col lg={{span: 5, offset: 2}}><RedirectButton
                                                    record={checkRoles(ROLES_KEYS.ROLE_SECRETAIRE) ? item : []}/>
                                                </Col>
                                            </Row>
                                        </List.Item>}
                                />

                            </div>

                        </div>
                    </Card>

                </Col>
                <Col span={12}>

                    <Card bordered={false} loading={loading}>
                        <div className="flex align-items-center justify-content-between">
                            <div style={{width: "100%"}}>
                                <Divider orientation="left">Dernière session</Divider>
                                <List
                                    size="small"
                                    bordered
                                    dataSource={lastSession}
                                    renderItem={item =>

                                        <List.Item>
                                            <Row style={{width: "100%"}}>
                                                <Col style={{float: "left"}}
                                                     lg={{span: 5, offset: 2}}>{item.code}</Col>
                                                <Col lg={{span: 4, offset: 2}}><Tag
                                                    color="success">{item.organisationLabel}</Tag></Col>
                                                <Col lg={{span: 3, offset: 2}}>{item.sessionDateTime}</Col>
                                                <Col lg={{span: 4, offset: 2}}>
                                                    <Button size={'small'}
                                                            key={item.id}
                                                            onClick={() => navigate(`${route}/view/${item.id}`)}
                                                            icon={<InfoCircleOutlined/>}>Détail</Button>
                                                </Col>
                                            </Row>
                                        </List.Item>}
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
            <>
                <Divider orientation="left">{"Liste des Sessions : " + currentYear}</Divider>
                <HomeSessionData orgIds={user.organisationList.map(a => a.key)}/>
            </>
        </div>
    );
}

export default HomeSecretaire;