import React, {useEffect, useState} from 'react';
import {Button, Drawer} from "antd";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";

const Drawers = ({shwAdvancedSearch, position, height, width, onSearch, onShow}) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(shwAdvancedSearch);
    }, [shwAdvancedSearch]);

    return (
        <Drawer
            title="Recherche Avancée"
            placement={position ? position : "top"}
            width={width ? width : "100%"}
            height={height ? height : "100%"}
            closable={true}
            onClose={() => setVisible(false)}
            visible={visible}
            getContainer={true}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={() => setVisible(false)} style={{marginRight: 8}}
                            icon={<CloseOutlined/>} danger size="middle">
                        Fermer
                    </Button>
                    <Button type="primary" onClick={onSearch} danger icon={<SearchOutlined/>}
                            size="middle">
                        Search
                    </Button>
                </div>
            }>

            {onShow}

        </Drawer>
    );
}

export default Drawers;
