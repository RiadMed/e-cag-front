import React from 'react';
import {DownloadOutlined, PaperClipOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";

const Uploads = ({title, onFileUpload, accept, icon, file, name}) => {
    return (
        <div>
            <label htmlFor="_logo" className={icon ? 'comment-btn' : 'ant-btn'}>
                {icon ?
                    (
                        <Tooltip title={name}>
                            <PaperClipOutlined className={'comment-btn'}
                                               style={{
                                                   margin: "12px 7px 1px 10px",
                                                   color: file ? '#52C423' : '#ff4d4f'
                                               }}/>

                        </Tooltip>)
                    :
                    (<div style={{padding: "10px", border: "1px solid #e0e0e0", borderRadius: "4px", width: "15%"}}>
                        <DownloadOutlined style={{marginRight: "10px"}}/>
                        {title ? title : 'Télécharger..'}
                    </div>)}

            </label>
            <input type="file" id="_logo"
                   onChange={onFileUpload}
                   className="input-file"
                   accept={accept ? accept : '.xlsx, .xls, .docx, .doc, .png, .jpeg'}/>
        </div>
    );
}

export default Uploads;
