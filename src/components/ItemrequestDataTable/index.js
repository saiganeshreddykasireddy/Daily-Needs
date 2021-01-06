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
import { renderToString } from 'react-dom/server';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Datatablecontent from "./PdfDocument";
import "./style.scss";
import _ from "lodash";
const FlatsList = ["A123", "A234"];
const brandList = ["Bisleri", "Kinley", "Aquapure", "Bailey"];

const waterPriceList = [
    { "Brand": "Aquapure", "Price": 40 },
    { "Brand": "Bisleri", "Price": 100 },
    { "Brand": "Kinley", "Price": 70 },
    { "Brand": "Bailey", "Price": 50 }
];
 

class ItemrequestDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            globalFilter: null,
            FlatsList: [],
            suggestedFlats: null,
            deleteProductDialog: false,
            first: 0,
            showModal: false 
        };
        this.datatableRef = React.createRef();
        
        this.originalRows = {};
        this.onRowEditInit = this.onRowEditInit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onRowEditCancel = this.onRowEditCancel.bind(this);
        this.flatNameEditor = this.flatNameEditor.bind(this);
        this.onRowReorder = this.onRowReorder.bind(this);
        this.addNewRequest = this.addNewRequest.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.deleteWaterRequest = this.deleteWaterRequest.bind(this);
        this.printPdf = this.printPdf.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
    }
    componentDidMount(props) {
        let { requests, requestsType, ItemPriceList, brandList, waterstockData, FlatsList } = this.props;
        let flatslist = [];
        if (FlatsList && FlatsList.length) {
            FlatsList.map((_flatslist) => {
                flatslist.push(_flatslist.Flat);
            })
        }
        this.setState({
            ItemRequests: requests,
            FlatsList: FlatsList,
            brandList: brandList,
            ItemPriceList: ItemPriceList,
            requestsType: requestsType,
            waterstockData: waterstockData,
            flatslist: flatslist
        })
    }
    componentWillReceiveProps() {
        let { requests, requestsType, ItemPriceList, brandList, waterstockData, FlatsList } = this.props;
        let flatslist = [];
        if (FlatsList && FlatsList.length) {
            FlatsList.map((_flatslist) => {
                flatslist.push(_flatslist.Flat);
            })
        }
        this.setState({
            ItemRequests: this.props.requests,
            FlatsList: FlatsList,
            brandList: this.props.brandList,
            flatslist: flatslist
        })
    }
    deleteWaterRequest() {
        let { rowdata } = this.state;
        let { requestsType = "" } = this.props;
        let ItemRequests = [...this.state.ItemRequests];
        let Index = _.findIndex(ItemRequests, rowdata);
        ItemRequests.splice(Index, 1);
        this.props.dispatch(deleteWaterRequest(rowdata, requestsType));
        this.setState({
            ItemRequests: ItemRequests,
            deleteProductDialog: false,
            rowdata: {},
            isrendered: true
        });
    }
    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }
    openDeleteDialog = (rowData) => {
        this.setState({
            deleteProductDialog: true,
            rowdata: rowData,
            isrendered: true
        });
    }
    addNewRequest() {
        let { requestsType = "" } = this.props;
        let newRequest = {
            Flat: "",
            Brand: "",
            Quantity: null,
            Price: null,
            isNewlyadded: true
        };
        let updatedRequests = [...this.state.ItemRequests];
        updatedRequests.push(newRequest);
        this.props.dispatch(addWaterRequest(newRequest, requestsType));
        this.setState({
            ItemRequests: updatedRequests,
            isrendered: true
        });
    }
    

    waterDelivered = (rowData) => {
        toast.success(` water for ${rowData.Flat} delivered successfully`);
    }
    searchFlat = (event, field) => {
        setTimeout(() => {
            let suggestedFlats;
            console.log(this.state.flatslist);
            let fieldType = (field == "Flat") ? [...this.state.flatslist] : [...this.state.brandList];
            if (!event.query.trim().length) {
                suggestedFlats = fieldType;
            }
            else {
                suggestedFlats = fieldType.filter((country) => {
                    return country.toLowerCase().startsWith(event.query);
                });
            }
            this.setState({ suggestedFlats });
        }, 250);
    }
    actionBodyTemplate(rowData) {
        return (
            <>
                <Button icon="pi pi-trash" className="p-button-rounded delete_icon" onClick={() => this.openDeleteDialog(rowData)} />
            </>
        );
    }
    statusBodyTemplate = (rowData) => {
        return <Button icon="pi pi-home" className="p-button-rounded  delivery_icon" onClick={() => this.waterDelivered(rowData)} />
    }
  
    handleClick(event) {  // switch the value of the showModal state
        this.setState({
            showModal: !this.state.showModal
        });
      }
    printPdf=()=>{
        // this.setState({
        //     isPrint:true
        // });
        
            if (this.state.showModal) {
        return <Datatablecontent {...this.state} isPrint= {true} key="pdf"/>;
            }
            else{
                return null;
            }
        // const string = renderToString(<Prints{...this.state}/>);
        // const pdf = new jsPDF("p", "mm", "a4");
        // // pdf.fromHTML(string);
        // // string.print();
        // // );

        // pdf.setFontSize(16);
        // pdf.setTextColor(0, 255, 0);
        // pdf.html(string, {
        //     callback: function () {
        //         pdf.save('myDocument.pdf');
        //         // window.open(pdf.output('bloburl')); // To debug.
        //     }
        // });
        
        // fromHTML
        // pdf.autoTable({Prints});
        // pdf.save('pdf')
    }
     
    onRowEditInit(event) {
        this.originalRows[event.index] = { ...this.state.ItemRequests[event.index] };
        this.setState({
            isrendered: true
        })
    }
    onRowEditCancel(event) {
        let products = [...this.state.ItemRequests];
        // products[event.index] = this.originalRows[event.index];
        // delete this.originalRows[event.index];
        this.setState({ ItemRequests: products });

    }
    onEditorValueChange(productKey, props, value) {
        let { requestsType = "" } = this.props;
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        this.setState({ [`${productKey}`]: updatedProducts });
        // this.props.dispatch(editRequests(updatedProducts,requestsType));

    }
    inputTextEditor(productKey, props, field) {
        if (field != "Price") {
            return <AutoComplete value={props.rowData[field]} suggestions={this.state.suggestedFlats} completeMethod={(event) => this.searchFlat(event, field)} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />
        }
        else {
            let price;
            let { ItemPriceList } = this.state;
            let _value = _.filter(ItemPriceList, { 'Brand': props.rowData.Brand });
            if (!props.rowData.isNewlyadded) {
                props.rowData[field] = _value[0].Price * props.rowData.Quantity || null;
            }
            else {
                if (_value && _value[0] && _value[0].Brand) {
                    props.rowData[field] = _value[0].Price * props.rowData.Quantity || null;;

                }
            }

            return <input type="number" className="price-input" value={props.rowData[field]} />
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
    getToast = (_isgettingoutofstock) => {
        return toast.error(`${_isgettingoutofstock} is getting out of stock`)
    }
    // saveItemRequests = () =>{
    //     let updatedRequests = [...this.state.ItemRequests];
    //     this.props.dispatch(updateRequest(updatedRequests))
    // }
    render() {
        let { requests = {}, requestsType = "", waterstockData = [], FlatsList } = this.props;
        let finalData = [];

        let totalCount = 0;
        if (requestsType = "WaterRequests") {
            const data = _.groupBy(requests, "Brand") || [];
            waterstockData.map((_items) => {
                let firstKey = _items[0];
                console.log()
                if (Object.keys(data).indexOf(firstKey) >= 0) {
                    let count = data[firstKey];
                    let _count = 0;
                    count.map((_Item) => {
                        _count = _count + parseInt(_Item.Quantity);
                    })
                    finalData.push({ currentStatus: _items[1] - _count, Brand: firstKey, count: _count });
                } else {
                    finalData.push({
                        currentStatus: _items[1],
                        Brand: _items[0], count: 0
                    });
                }
            });
            let _finalData = _.filter(finalData, function (o) { return o.currentStatus <= 10; });
            if (_finalData && _finalData.length) {
                if (!this.state.isrendered) {

                    _finalData.map((_itemgettingoutostock => {
                        this.getToast(_itemgettingoutostock.Brand);

                    }))
                }
            }


        }


        const header = (
            <div className="table-header">
                <div className="p-col-6 left_container">
                    <Button label="Add" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.addNewRequest} />
                    <Button type="button" icon="pi pi-external-link" label="Print" onClick={this.handleClick}></Button>
                    {this.printPdf}
                </div>
                <div className="p-col-6 Right_container">
                    <span className="p-input-icon-left">
                        {/* <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." /> */}
                        {/* <i className="pi pi-search" /> */}
                    </span>
                </div>
            </div>
        );

        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="Yes" icon="pi pi-check" className="p-button-text yesbtn" onClick={this.deleteWaterRequest} />
                <Button label="No" icon="pi pi-times" className="p-button-text nobtn" onClick={this.hideDeleteProductDialog} />
            </React.Fragment>
        );
        return (
            <div className="datatable_water_Requests">
                <div className="water_status_wrapper">
                    {
                        finalData.map((_count, index) => {
                            let classname = _count.currentStatus < 10 ? "gettingoutofstock" : "";
                            return (<div key={index} className="water_count_status">
                                <div className="water_brand p-col-12">{_count.Brand} </div>
                                <div className=" p-col-12 status">
                                    <div className="p-col-6 sub_status  current-stock ">
                                        <div className=" "> Stock Left </div>
                                        <div className={`${classname} current_water_stock`} >{_count.currentStatus} </div>
                                    </div>
                                    <div className="p-col-6 sub_status orders-left">
                                        <div className=""> Orders Left</div>

                                        <div className="current_water_orders"> {_count.count}</div>

                                    </div>

                                </div>
                            </div>
                            );
                        })
                    }
                </div>
                <div className="card" ref={this.datatableRef}>
                    <DataTable ref={(el) => this.dt = el} value={this.state.ItemRequests}
                        dataKey="id"
                        paginator={(this.state.ItemRequests && this.state.ItemRequests.length > 13) ? true : false}
                        rows={13}
                        first={(this.state.ItemRequests && this.state.ItemRequests.length > 13) ? this.state.first : 0}
                        onPage={(e) => this.setState({ first: e.first })}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                        // globalFilter={this.state.globalFilter}
                        header={header}
                        editMode="row"
                        emptyMessage="No Orders Found"
                        onRowEditInit={this.onRowEditInit}
                        onRowEditCancel={this.onRowEditCancel}
                        reorderableColumns
                        onRowReorder={this.onRowReorder}
                    >
                        <Column rowReorder style={{ width: '3em' }} />
                        <Column field="Flat" header="Flat Num" sortable filter filterPlaceholder="Search by Block"  editor={(props) => this.flatNameEditor('WaterRequest', props)}></Column>
                        <Column field="Brand" header="Brand" sortable  filter  filterPlaceholder="Search by Brand" editor={(props) => this.brandEditor('WaterRequest', props)}></Column>
                        <Column field="Quantity" header="Quantity" sortable editor={(props) => this.quantityEditor('WaterRequest', props)}></Column>
                        <Column field="Price" header="Price" sortable editor={(props) => this.priceEditor('WaterRequest', props)}></Column>
                        <Column header="Edit" rowEditor headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                        <Column header="Delete" body={this.actionBodyTemplate} headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }} ></Column>
                        <Column header="Status" body={this.statusBodyTemplate} headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }} ></Column>
                    </DataTable>
                    <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog} className="delete_product_dialog">
                        <div className="confirmation-content">
                            {this.state.rowdata ? <span><b>Are you sure you want to delete</b> <b>{this.state.rowdata.Flat}</b><b>'s  </b><b>{this.props.requestsType}</b> <b>  ?</b></span> : ""}
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({
    Requests,
    FlatsList
}) => ({
    Requests,
    FlatsList
})
export default connect(mapStateToProps)(ItemrequestDataTable);
















