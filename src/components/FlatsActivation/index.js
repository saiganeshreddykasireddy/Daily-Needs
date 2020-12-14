import React, { Component } from 'react';
import { connect } from 'react-redux'
import classNames from 'classnames';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./style.scss";
import _ from "lodash";
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const Blocks = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

class FlatsActivation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activecls: "",
            visible: true,
            deleteProductDialog: false,
            newproductDialog: false,
            isOpenable:true

        }
        this.openeditDialog = this.openeditDialog.bind(this);
        this.rowClick = this.rowClick.bind(this);
    }
    componentDidMount(props) {
        let { FlatsList } = this.props;
        this.setState({
            FlatsList: FlatsList,

        })
    }

    onSelectionChange = () => {

    }
    onFilterCheck = (e, _blocks) => {
        let finalData = [...this.props.FlatsList];

        let data = _.filter(finalData, function (o) {
            return o.Flat.startsWith(_blocks);
        });
        // data = data.length ? data :finalData;
        let _activecls = "activecls" + _blocks;
        this.setState({
            activecls: _activecls,
            FlatsList: data
        });
    }
    statusBodyTemplate = (rowdata) => {
        return <Checkbox checked={rowdata.isActivated} onChange={() => { this.onSelectionChange(); }} />
    }
    rowClick = (data_key, e) => {
        console.log(e);
        this.setState({
            showSubscriptionpage: true,
            visible: true,
            selectedFlatsubscriptionDetails: e.data
        })
    }

    openeditDialog = (data) => {
        this.setState({
            productDialog: true,
            editedRow: data

        })
    }
    openDeleteDialog = (e, data) => {
        this.setState({
            deleteProductDialog: true,
            rowdata: data
        })
    }
    renderSubscriptionPage = () => {
        let { selectedFlatsubscriptionDetails = {} } = this.state;
        let subscriptionData = selectedFlatsubscriptionDetails.subscriptionDetails || [];
        let _data = _.groupBy(subscriptionData, "Type") || {};
        console.log(_data);
        return (
            <React.Fragment>
                <div className="p-col-12 Subscriptionpage_profile">
                    <i className="pi pi-user" ></i>
                    Profile
                </div>
                <div>
                    <div className="profile">
                        <div className="profile_name">Flat</div>
                        <div className="colon">:</div>
                        <div className="flat_num"> {selectedFlatsubscriptionDetails.Flat}</div>
                    </div>
                    <div className="profile">
                        <div className="profile_name">Mobile</div>
                        <div className="colon">:</div>
                        <div className="flat_num"> {selectedFlatsubscriptionDetails.mobile}</div>
                    </div>
                    <div className="profile">
                        <div className="profile_name">Status</div>
                        <div className="colon">:</div>
                        <div className="flat_num"> {selectedFlatsubscriptionDetails.isActivated ? "Active" : "inActive"}</div>
                    </div>
                </div>
                <div>
                    {Object.keys(_data).map((key, index) => {
                        return (<div>
                            <div className="type-header">{key}</div>
                            <div className="items">
                                {_data[key].map((_item, index) => {
                                    return (
                                        <div className="product-list-item">
                                            <div>
                                                <img src={`showcase/demo/images/product/${_item.Brand}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={_item.Brand} />
                                            </div>
                                            <div className="item_data">
                                                <div className="product-name">{_item.Brand}</div>
                                                <div className="product-price">Quantity : {_item.Quantity}</div>
                                                <div>
                                                    <Button icon="pi pi-pencil" key={_item.Brand + index} className="p-button-rounded edit_icon"
                                                        onClick={() => this.openeditDialog(_item)}
                                                        style={{ marginRight: "8px" }} />
                                                    <Button icon="pi pi-trash" className="p-button-rounded delete_icon"
                                                        onClick={(e) => this.openDeleteDialog(e, _item)}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>)


                    })}
                </div>
                <div className="p-col-12 left_container">
                    <Button label="Add Item" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.addItemToSubscription} />
                </div>
            </React.Fragment>
        )
    }


    hideProductDialog = () => {
        this.setState({
            productDialog: false,
            editedRow: {}

        })
    }
    onInputChange(e, name) {
        let val = "";
        // if(name == "isAvailable"){
        //      val = e.checked;
        // }
        // else{
        val = parseInt(e.target.value) || e.target.value;
        // }
        let { selectedFlatsubscriptionDetails = {} } = this.state;
        let subscriptionData = selectedFlatsubscriptionDetails.subscriptionDetails || [];
        let { editedRow } = this.state;
        let Index = _.findIndex(subscriptionData, editedRow);
        let _editedRow = { ...this.state.editedRow };
        _editedRow[`${name}`] = val;
        subscriptionData[Index] = _editedRow;
        this.setState({
            selectedFlatsubscriptionDetails: selectedFlatsubscriptionDetails,
            editedRow: _editedRow
        });
        // this.props.dispatch(editProductsList(products));

    }
    saveProduct = () => {
        this.setState({
            productDialog: false

        })
    }
    hideDeleteProductDialog = () => {
        this.setState({
            deleteProductDialog: false

        })
    }
    deleteProduct = () => {
        let { rowdata } = this.state;

        let { selectedFlatsubscriptionDetails = {} } = this.state;
        let subscriptionData = selectedFlatsubscriptionDetails.subscriptionDetails || [];
        let Index = _.findIndex(subscriptionData, rowdata);
        subscriptionData.splice(Index, 1);
        this.setState({
            selectedFlatsubscriptionDetails: selectedFlatsubscriptionDetails,
            rowdata: {},
            deleteProductDialog: false,

        })
    }
    addItemToSubscription = () => {

        let newRequest = {
            Brand: "",
            Price: "",
            isAvailable: true,
            Type: ""
        };
        let { selectedFlatsubscriptionDetails = {} } = this.state;
        let subscriptionData = selectedFlatsubscriptionDetails.subscriptionDetails || [];
        subscriptionData.push(newRequest);

        this.setState({
            selectedFlatsubscriptionDetails: selectedFlatsubscriptionDetails,
            addNewRow: true,
            newproductDialog: true,
        });

    }
    hideNewProductDialog = () => {
        this.setState({
            newproductDialog: false

        })
    }
    onnewInputChange = (e, name) => {
        let val = "";
        // if(name == "isAvailable"){
        //      val = e.checked;
        // }
        // if(name =="Price"){
        // val = parseInt(e.target.value);
        // }
        // else{
        val = e.target.value;

        // }
        let { selectedFlatsubscriptionDetails = {} } = this.state;
        let subscriptionData = selectedFlatsubscriptionDetails.subscriptionDetails || [];
        selectedFlatsubscriptionDetails.subscriptionDetails[selectedFlatsubscriptionDetails.subscriptionDetails.length - 1][`${name}`] = val;

        this.setState({
            selectedFlatsubscriptionDetails: selectedFlatsubscriptionDetails,
        });
    }
    savenewProduct =()=>{
        this.setState({
            newproductDialog: false

        }) 
    }
    onRowEditInit=()=>{
this.setState({
    isOpenable:false
});
    }
    onRowEditCancel = ()=>{

    }
    render() {
        const header = (
            <div className="table-header">

                <div className="p-col-12 ">
                    <span className="p-input-icon-left">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                        <i className="pi pi-search" />
                    </span>
                </div>
            </div>
        );
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Save" icon="pi pi-check" className="p-button-text yesbtn" onClick={this.saveProduct} />
                <Button label="Cancel" icon="pi pi-times" className="p-button-text nobtn" onClick={this.hideProductDialog} />
            </React.Fragment>
        );
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="Yes" icon="pi pi-check" className="p-button-text yesbtn" onClick={this.deleteProduct} />
                <Button label="No" icon="pi pi-times" className="p-button-text nobtn" onClick={this.hideDeleteProductDialog} />
            </React.Fragment>
        );
        const newproductDialogFooter = (
            <React.Fragment>
                <Button label="Save" icon="pi pi-check" className="p-button-text yesbtn" onClick={this.savenewProduct} />
                <Button label="Cancel" icon="pi pi-times" className="p-button-text nobtn" onClick={this.hideNewProductDialog} />
            </React.Fragment>
        );
        return (
            <React.Fragment>
                <div className="Blocks_list">
                    {Blocks.map((_blocks) => {
                        return <div className={` ${_blocks}${this.state.activecls} blocks`} onClick={(e) => this.onFilterCheck(e, _blocks)}>{_blocks} Block</div>
                    })}

                </div>
                <DataTable ref={(el) => this.dt = el} value={this.state.FlatsList}
                    dataKey="id"
                    className="Flats_Activation"
                    paginator={((this.state.FlatsList && this.state.FlatsList.length) > 18) ? true : false}
                    emptyMessage="No Flats Found"
                    content="Flat"
                    dataKey="Flat"
                    onRowClick={(e) => this.rowClick("Flat", e)}
                    
                    rows={18}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    globalFilter={this.state.globalFilter}
                    header={header}
                    editMode="row"
                    onRowEditInit={this.onRowEditInit}
                  onRowEditCancel={this.onRowEditCancel}

                >
                    <Column header=""
                        body={this.statusBodyTemplate}
                        headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }} ></Column>
                    <Column field="Flat" header="Flat" headerStyle={{ width: '10rem' }}
                    // editor={(props) => this.flatNameEditor('WaterRequest', props)}
                    ></Column>
                    <Column field="mobile" header="mobile"
                    // editor={(props) => this.brandEditor('WaterRequest', props)}
                    ></Column>
                    <Column header="Edit" rowEditor headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
                {this.state.showSubscriptionpage  ? <Sidebar className="subscription_overlay" visible={this.state.visible} position="right" onHide={() => this.setState({ visible: false })}>
                    {this.renderSubscriptionPage()}
                </Sidebar> : ""}
                <Dialog visible={this.state.productDialog} style={{ width: '450px' }} header=" Edit Subscribed Items" modal className="p-fluid editable_dialogs" footer={productDialogFooter} onHide={this.hideProductDialog}>
                    {this.state.editedRow ?
                        <>
                            <div className="p-field">
                                <label htmlFor="Brand">Brand</label>
                                <InputText id="Brand" value={this.state.editedRow.Brand} />
                            </div>
                            <div className="p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="Quantity">Quantity</label>
                                    <InputText id="Quantity" value={this.state.editedRow.Quantity} onChange={(e) => this.onInputChange(e, 'Quantity')} intgeronly />
                                </div>

                            </div> </> : ""}
                </Dialog>
                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirmation" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog} className="delete_product_dialog">
                    <div className="confirmation-content">
                        {this.state.rowdata ? <>  <b>Are you sure you want to delete <b>{this.state.rowdata.Brand}</b> From Current Flat's Subscription </b><b> ?</b> </> : ""}
                    </div>
                </Dialog>
                <Dialog visible={this.state.newproductDialog} style={{ width: '450px' }} header=" Add New Item Into Subscription" modal className="p-fluid editable_dialogs" footer={newproductDialogFooter} onHide={this.hideNewProductDialog}>
                    {this.state.addNewRow ?
                        <>
                            <div className="p-field">
                                <label htmlFor="Brand">Brand</label>
                                <InputText id="Brand"
                                    value={this.state.selectedFlatsubscriptionDetails.subscriptionDetails[this.state.selectedFlatsubscriptionDetails.subscriptionDetails.length - 1].Brand}
                                    onChange={(e) => this.onnewInputChange(e, 'Brand')} />
                            </div>
                            <div className="p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="Quantity">Quantity</label>
                                    <InputText id="Quantity"
                                        value={this.state.selectedFlatsubscriptionDetails.subscriptionDetails[this.state.selectedFlatsubscriptionDetails.subscriptionDetails.length - 1].Quantity}
                                        onChange={(e) => this.onnewInputChange(e, 'Quantity')} integeronly />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="quantity">Type</label>
                                    <InputText id="Type"
                                        value={this.state.selectedFlatsubscriptionDetails.subscriptionDetails[this.state.selectedFlatsubscriptionDetails.subscriptionDetails.length - 1].Type}
                                        onChange={(e) => this.onnewInputChange(e, 'Type')} />
                                </div>

                            </div> </> : ""}

                </Dialog>
            </React.Fragment>
        )
    }
}
const mapStateToProps = ({
    FlatsList
}) => ({
    FlatsList
})
export default connect(mapStateToProps)(FlatsActivation);