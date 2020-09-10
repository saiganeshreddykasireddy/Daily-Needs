import React, { Component } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { editRequests, deleteWaterRequest, addWaterRequest } from "../../actions/action";
import { Button } from 'primereact/button';
import { connect } from 'react-redux'
import { AutoComplete } from 'primereact/autocomplete';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import "./style.scss";
import _ from "lodash";
const FlatsList = ["A123","A234"];
class WaterRequest extends Component {


    constructor(props) {
        super(props);
        this.state = {
            globalFilter: null,
            FlatsList: [],
            suggestedFlats: null

        };
        this.originalRows = {};
        this.onRowEditInit = this.onRowEditInit.bind(this);
        this.onRowEditCancel = this.onRowEditCancel.bind(this);
        this.flatNameEditor = this.flatNameEditor.bind(this);
        this.onRowReorder = this.onRowReorder.bind(this);
        this.addNewRequest = this.addNewRequest.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.deleteWaterRequest = this.deleteWaterRequest.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            waterrequests: this.props.Requests,
            FlatsList: FlatsList
        })
    }
    deleteWaterRequest(rowData) {
        let waterrequests = [...this.state.waterrequests];
        let Index = _.findIndex(waterrequests, rowData);
        waterrequests.splice(Index, 1);
        this.props.dispatch(deleteWaterRequest(rowData.Flat));
        this.setState({
            waterrequests: waterrequests,
            deleteProductDialog: false,
            product: this.emptyProduct
        });
    }
    addNewRequest() {
        let newRequest = {
            Flat: "",
            Brand: "",
            Quantity: null,
            Price: null
        };
        let updatedRequests = [...this.state.waterrequests];
        updatedRequests.push(newRequest);
        this.props.dispatch(addWaterRequest(newRequest));
        this.setState({
            waterrequests: updatedRequests,
        });
    }

    exportCSV() {
        this.dt.exportCSV();
    }
    onInputChange(e, name) {

    }

    onInputNumberChange(e, name) {
    }
    waterDelivered = (rowData) => {
        alert();
        toast.success(` water for ${rowData.Flat} delivered successfully`);

    }
    searchFlat = (event) => {
        console.log(event.query);
        setTimeout(() => {
            let suggestedFlats;
            if (!event.query.length) {
                suggestedFlats = [...this.state.FlatsList];
            }
            else {
                suggestedFlats = this.state.FlatsList.filter((data) => {
                    console.log(data);
                    return data.includes(event.query);
                });
            }

            this.setState({ suggestedFlats });
        }, 250);
    }
    actionBodyTemplate(rowData) {
        return (
            <>
                <Button icon="pi pi-trash" className="p-button-rounded delete_icon" onClick={() => this.deleteWaterRequest(rowData)} />
            </>
        );
    }
    statusBodyTemplate = (rowData) => {
        return <Button icon="pi pi-home" className="p-button-rounded  delivery_icon" onClick={() => this.waterDelivered(rowData)} />
    }
    exportCSV() {
        this.dt.exportCSV();
    }
    onRowEditInit(event) {
        this.originalRows[event.index] = { ...this.state.waterrequests[event.index] };
    }
    onRowEditCancel(event) {
        let products = [...this.state.waterrequests];
        products[event.index] = this.originalRows[event.index];
        delete this.originalRows[event.index];
        this.setState({ waterrequests: products });
    }
    onEditorValueChange(productKey, props, value) {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        this.setState({ [`${productKey}`]: updatedProducts });
        this.props.dispatch(editRequests(updatedProducts));
    }
    inputTextEditor(productKey, props, field) {
        console.log(props,this.state);
        return <AutoComplete value={props.rowData[field]} suggestions={this.state.FlatsList} completeMethod={this.searchFlat} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />

    }
    flatNameEditor = (productKey, props) => {
        return this.inputTextEditor(productKey, props, "Flat");
    }
    brandEditor = (productKey, props) => {
        return this.inputTextEditor(productKey, props, "Brand");
    }
    quantityEditor = (productKey, props) => {
        return this.inputTextEditor(productKey, props, "Quantity");
    }
    priceEditor = (productKey, props) => {
        return this.inputTextEditor(productKey, props, "Price");
    }
    onRowReorder(e) {
        this.setState({ waterrequests: e.value });
    }
    render() {

        const header = (
            <div className="table-header">
                <div className="p-col-6 left_container">
                    <Button label="Add" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.addNewRequest} />
                    <Button type="button" icon="pi pi-external-link" label="Print" onClick={this.exportCSV}></Button>
                </div>
                <div className="p-col-6 Right_container">
                    <span className="p-input-icon-left">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                        <i className="pi pi-search" />
                    </span>
                </div>
            </div>
        );
        return (
            <div className="datatable_water_Requests">
                <div className="card">
                    <DataTable ref={(el) => this.dt = el} value={this.state.waterrequests}
                        dataKey="id" paginator rows={12}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                        globalFilter={this.state.globalFilter}
                        header={header}
                        editMode="row"
                        onRowEditInit={this.onRowEditInit}
                        onRowEditCancel={this.onRowEditCancel}
                        reorderableColumns
                        onRowReorder={this.onRowReorder}
                    >
                        <Column rowReorder style={{ width: '3em' }} />
                        <Column field="Flat" header="Flat Num" sortable editor={(props) => this.flatNameEditor('WaterRequest', props)}></Column>
                        <Column field="Brand" header="Brand" sortable editor={(props) => this.brandEditor('WaterRequest', props)}></Column>
                        <Column field="Quantity" header="Quantity" sortable editor={(props) => this.quantityEditor('WaterRequest', props)}></Column>
                        <Column field="Price" header="Price" sortable editor={(props) => this.priceEditor('WaterRequest', props)}></Column>
                        <Column header="Edit" rowEditor headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                        <Column header="Delete" body={this.actionBodyTemplate} headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }} ></Column>
                        <Column header="Status" body={this.statusBodyTemplate} headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }} ></Column>
                    </DataTable>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({
    Requests
}) => ({
    Requests
})
export default connect(mapStateToProps)(WaterRequest);
















