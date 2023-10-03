import React, {useEffect, useState} from 'react';
import Search from "antd/lib/input/Search";
import {Button, Col, Divider, Row, Select, Tooltip} from "antd";
import {FileSearchOutlined, FilterOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LazyLoadData, searchLazyData} from "../../redux/services/actions";
import {doGetData} from "../../redux/services/localActions";

const TableHeader = ({
                         filters,
                         route,
                         pageSize,
                         sortBy,
                         advSearch,
                         defaultFilterValue,
                         showAdvSearch,
                         showNewBtn,
                         labelNewBtn,
                         filterFileName,
                         newBtnRedirect,
                         disableSearchTxt,
                         disableNewBtn
                     }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const search = (request) => dispatch(searchLazyData(0, pageSize ? pageSize : 5, sortBy ? sortBy : 'id', 'ascend', request, `${route}`));
    const reset = () => dispatch(LazyLoadData(0, pageSize ? pageSize : 5, sortBy ? sortBy : 'id', 'ascend', `${route}`));

    const {Option} = Select;

    const [options, setOptions] = useState();
    const [filterBy, setFilterBy] = useState();

    const formatString = (value) => {
        if (value) {
            return value.includes('%20') ? encodeURI(value.replace('%20', ' ')) : encodeURI(value.trim());
        }
    }

    useEffect(() => {
        if (route) {
            doGetData(`filters${filterFileName ? filterFileName : route}_filters.json`).then(response => {
                setOptions(response.data.map(d => <Option key={d.value}>{d.label}</Option>));
            });
        }
    }, []);

    const onSearch = (value) => {
        if (filterBy && value) {
            search(encodeURI(`${getFilters(filters)}${filterBy}==*${formatString(value)}*`));
        } else if (value) {
            search(encodeURI(`${getFilters(filters)}${defaultFilterValue}==*${formatString(value)}*`));
        } else {
            reset();
        }
    }

    const getFilters = (filters) => {
        if (filters) {
            return filters + ';';
        }
        return '';
    }

    /**
     * Add Filter default value
     */
    if (!defaultFilterValue) {
        defaultFilterValue = 'code'
    }

    const onSelectFilterColumn = (value) => {
        setFilterBy(value);
    };

    const selectBefore = (
        <Select defaultValue={defaultFilterValue} style={{width: 120, marginRight: "5px"}}
                onChange={onSelectFilterColumn}>
            {options}
        </Select>
    );


    return (
        <Row>
            {showNewBtn ? <Col flex="100px">
                    <Tooltip placement="top" title="Ajouter une ligne" color="red">
                        <Button
                            disabled={disableNewBtn ? disableNewBtn : false}
                            style={{marginTop: '4px'}}
                            size="small"
                            danger
                            icon={<PlusOutlined/>}
                            onClick={() => navigate(`${route}/${newBtnRedirect}`)}>
                            {labelNewBtn}
                        </Button>
                    </Tooltip>
                </Col>
                : <></>}
            {showNewBtn ?
                <Col flex="30px"> <Divider type="vertical"
                                           style={{borderColor: "#d0d0d0", marginTop: '7px', height: '20px'}}
                                           dashed/></Col> : <></>}

            <Col flex="auto"><Search
                prefix={<FilterOutlined style={{color: "#9d9b9b"}} className="site-form-item-icon"/>}
                addonBefore={selectBefore} placeholder="Search..."
                disabled={disableSearchTxt ? disableSearchTxt : false}
                onSearch={value => onSearch(value)} allowClear/></Col>
            {showAdvSearch ? (
                    <>
                        <Col flex="30px"> <Divider type="vertical"
                                                   style={{borderColor: "#d0d0d0", marginTop: '7px', height: '20px'}}
                                                   dashed/>
                        </Col>
                        <Col flex="40px">
                            <Tooltip placement="top" title="Recherche avancée" color="red">
                                <Button
                                    style={{marginTop: '4px'}}
                                    size="small"
                                    danger
                                    icon={<FileSearchOutlined/>}
                                    onClick={advSearch}>
                                </Button>
                            </Tooltip>
                        </Col>
                    </>
                )
                : ('')}


        </Row>
    );
}

export default TableHeader;

TableHeader.defaultProps = {
    labelNewBtn: 'Nouveau',
    newBtnRedirect: 'add'
};
