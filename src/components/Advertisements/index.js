import React, { useState } from 'react';
import Uploadfiles from "./Advertisement";
import { Button } from 'primereact/button';
import AutoPlay from "./Preview";
import "./style.scss";
const Advertisements = () => {

    const [fileList, setFileList] = useState([
    ]);
    const [Label , setLabel] = useState("preview");

    const getData = (data) => {
        setFileList(data);
    }
    const changeMode = () => {
    let label = (Label == "preview") ? "Upload" :"preview";
    setLabel(label);
    }

    return (
        <React.Fragment>
            <div className="advertisements_buttons">
                <Button label={Label} onClick={changeMode} />
            </div>
           { (Label == "preview") ? <Uploadfiles getData={getData} /> :
           <AutoPlay Data={fileList} /> }
        </React.Fragment>
    );
};

export default Advertisements;