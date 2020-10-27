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
const brandList =["Bisleri","Kinley","Aquapure","Bailey"];
const waterstockData=[
    ["Aquapure",100], 
    ["Bisleri",25],
    ["Kinley",35],
    ["Bailey",30]
];
const waterPriceList =[
{"Brand":"Aquapure","Price": 40},
{"Brand":"Bisleri","Price": 100},
{"Brand":"Kinley","Price": 70},
{"Brand":"Bailey","Price": 50}

];
class ItemrequestDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            globalFilter: null,
            FlatsList: [],
            suggestedFlats: null
        };
        this.datatableRef = React.createRef();
        this.originalRows = {};
        this.onRowEditInit = this.onRowEditInit.bind(this);
        this.onRowEditCancel = this.onRowEditCancel.bind(this);
        this.flatNameEditor = this.flatNameEditor.bind(this);
        this.onRowReorder = this.onRowReorder.bind(this);
        this.addNewRequest = this.addNewRequest.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.deleteWaterRequest = this.deleteWaterRequest.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
    }
    componentDidMount(props) {
        let {requests,requestsType,ItemPriceList,brandList} = this.props;
            this.setState({
            ItemRequests: requests,
            FlatsList: FlatsList,
            brandList:brandList,
            ItemPriceList:ItemPriceList,
            requestsType:requestsType
        })
    }
    componentWillReceiveProps(){
        this.setState({
            ItemRequests: this.props.requests,
            FlatsList: FlatsList,
            brandList:this.props.brandList,
        })
    }
    deleteWaterRequest(rowData) {
        let {requestsType=""} = this.props;

        let ItemRequests = [...this.state.ItemRequests];
        let Index = _.findIndex(ItemRequests, rowData);
        ItemRequests.splice(Index, 1);
        this.props.dispatch(deleteWaterRequest(rowData,requestsType));
        this.setState({
            ItemRequests: ItemRequests
        });
    }
    addNewRequest() {
        let {requestsType=""} = this.props;

        let newRequest = {
            Flat: "",
            Brand: "",
            Quantity: null,
            Price: null,
            isNewlyadded:true
        };
        let updatedRequests = [...this.state.ItemRequests];
        updatedRequests.push(newRequest);
        this.props.dispatch(addWaterRequest(newRequest,requestsType));
        this.setState({
            ItemRequests: updatedRequests,
        });
    }
    exportCSV() {
        this.dt.exportCSV();
    }
 
    waterDelivered = (rowData) => {
        toast.success(` water for ${rowData.Flat} delivered successfully`);
    }
    searchFlat = (event,field) => {
        setTimeout(() => {
            let suggestedFlats;
                let fieldType  = (field == "Flat") ? [...this.state.FlatsList] : [...this.state.brandList];
            if (!event.query.trim().length) {
                suggestedFlats = fieldType;
            }
            else {
                suggestedFlats = fieldType.filter((country) => {
                    return country.toLowerCase().startsWith(event.query.toLowerCase());
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
        this.originalRows[event.index] = { ...this.state.ItemRequests[event.index] };
    }
    onRowEditCancel(event) {
        let products = [...this.state.ItemRequests];
        products[event.index] = this.originalRows[event.index];
        delete this.originalRows[event.index];
        this.setState({ ItemRequests: products });
    }
    onEditorValueChange(productKey, props, value) {
        let {requestsType=""} = this.props;
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        this.setState({ [`${productKey}`]: updatedProducts });
        this.props.dispatch(editRequests(updatedProducts,requestsType));
    }
    inputTextEditor(productKey, props, field) {
        if(field !="Price"){
            return <AutoComplete value={props.rowData[field]} suggestions={this.state.suggestedFlats} completeMethod={(event)=>this.searchFlat(event,field)} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />
        }
        else{
            let price;
            let {ItemPriceList} = this.state;
            let _value = _.filter(ItemPriceList,{'Brand':props.rowData.Brand});
            if(!props.rowData.isNewlyadded){
                props.rowData[field] = _value[0].Price * props.rowData.Quantity || null;
            }
            else{
                if(_value &&_value[0] &&_value[0].Brand){
                    props.rowData[field] = _value[0].Price * props.rowData.Quantity || null;;

                }
            }
          
            return <input type ="number" className="price-input" value={props.rowData[field]  } />
        }
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
        this.setState({ ItemRequests: e.value });
    }
    getToast = (waterStatus)=>{
        if( waterStatus.currentStatus <10){
            return  toast.error(`${waterStatus.Brand} is getting out of stock`)
        };
    }
    // saveItemRequests = () =>{
    //     let updatedRequests = [...this.state.ItemRequests];
    //     this.props.dispatch(updateRequest(updatedRequests))
    // }
    render() {
        // const data = _.groupBy(this.props.Requests, "Brand") || [];
        // let finalData = [];
    
        // let totalCount = 0;
        // waterstockData.map((_items) => {
        //   let firstKey = _items[0];
        //   if (Object.keys(data).indexOf(firstKey) >= 0) {
        //     totalCount += data[firstKey].length;
        //     finalData.push({ currentStatus: _items[1]- data[firstKey].length,Brand: _items[0], count: data[firstKey].length });
    
        //   } else {
        //     finalData.push({currentStatus: _items[1],
        //          Brand: _items[0], count: 0 });
        //   }
        // });
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
                {/* <div className="water_status_wrapper">
                {
                    finalData.map((_count)=>{
                        let classname= _count.currentStatus < 10 ? "gettingoutofstock" :"";
                        {this.getToast(_count)}
                        return( <div className="water_count_status"> 
                        <div className={`${classname} current_water_stock`} >{_count.currentStatus} </div>
                        <div className="water_brand">{_count.Brand} </div>
                        <div className="current_water_orders"> {_count.count}</div>
                        </div>
                       );
                    })
                }
                </div> */}
                <div className="card" ref={this.datatableRef}>
                    <DataTable ref={(el) => this.dt = el} value={this.state.ItemRequests}
                        dataKey="id" paginator rows={13}
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
                        <Column field="Flat" header="Flat Num"  sortable editor={(props) => this.flatNameEditor('WaterRequest', props)}></Column>
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
export default connect(mapStateToProps)(ItemrequestDataTable);
















