import React, { Component } from 'react';
import { FileUpload } from 'primereact/fileupload';

 class Advertisements extends Component {

    constructor(props) {
        super(props);

        this.onUpload = this.onUpload.bind(this);
        this.onBasicUpload = this.onBasicUpload.bind(this);
        this.onBasicUploadAuto = this.onBasicUploadAuto.bind(this);
    }

    onUpload() {
    }

    onBasicUpload() {
    }

    onBasicUploadAuto(event) {
        console.log(event.files);
    }

    render() {
        return (
            <div>
\
                <div className="card">
                    
                    <FileUpload mode="basic" name="demo[]"   maxFileSize={1000000} onUpload={this.onBasicUploadAuto}  chooseLabel="Browse"					multiple={true}
 />
                </div>
            </div>
        )
    }
}
export default Advertisements;