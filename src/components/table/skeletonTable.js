import {Skeleton, Table} from 'antd';
import React from 'react';
import Controls from "../index";

const SkeletonTable = ({columns, rowCount}) => {
    return (
        <Table
            title={() => <Controls.TableHeader showNewBtn={true} disableSearchTxt={true} disableNewBtn={true}/>}
            size="small"
            rowKey="key"
            pagination={false}
            dataSource={[...Array(rowCount)].map((_, index) => ({
                key: `key${index}`,
            }))}
            columns={columns.map((column) => {
                return {
                    ...column,
                    render: function renderPlaceholder() {
                        return (
                            <Skeleton
                                size="small"
                                key={column.dataIndex}
                                active={true}
                                title={true}
                                paragraph={false}
                            />
                        );
                    },
                };
            })}
        />
    );
};
export default SkeletonTable;