import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./style.scss";
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
class BillStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalFilter: null
        }
        this.onIndexTemplate = this.onIndexTemplate.bind(this);
        // this.gettotal = this.gettotal.bind(this);
    }
    componentDidMount() {
        let { billStatus } = this.props;
        this.setState({
            billStatus: billStatus
        });
        
    }
    onIndexTemplate(data, props) {
        return props.rowIndex+1;
    }
    actionBodyTemplate(rowData) {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded edit_icon"  />
            </>
        );
    }
    onEditorValueChange(productKey, props, value) {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        this.setState({ [`${productKey}`]: updatedProducts });
        // this.props.dispatch(editRequests(updatedProducts,requestsType));

    }
    inputTextEditor(productKey, props, field) {
       if(field!="status"){
        return <input type="text" className="price-input" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />
       }
       else{
        if(props.rowData.total - parseInt(props.rowData.amountPaid) == 0 || parseInt(props.rowData.amountPaid) > props.rowData.total){
            props.rowData[field] = "Paid"

        }
        if(props.rowData.total - parseInt(props.rowData.amountPaid) > 0  && props.rowData.total - parseInt(props.rowData.amountPaid) < (props.rowData.total)){
            props.rowData[field] = "somedue"

        }
        if(props.rowData.total - parseInt(props.rowData.amountPaid) == (props.rowData.total)){
            props.rowData[field] = "pending"

        }
        return <input type="text" className="price-input" value={props.rowData[field]} />

       }
      

        

    }
    priceEditor = (productKey, props) => {
        return this.inputTextEditor(productKey, props, "Price");
    }
    statusEditor =(productKey, props) => {
        return this.inputTextEditor(productKey, props, "status");
    }
    rowClassName = (rowData) => {
    if(rowData.status =="Paid"){
        return { "Paid-row": rowData.status == "Paid" }; 
    }
    if(rowData.status =="pending"){
        return { "Pending-row": rowData.status == "pending" }; 
    }
    if(rowData.status =="somedue"){
        return { "PaidLess-row": rowData.status == "somedue" }; 
    }
    }
   
    render() {
        let { billStatus } = this.props;
        let currentdate = moment().format("MMM YYYY");
       let types =["oldDue","Milk","Paper","Water","fruits","ServiceCharge","total","amountPaid"];
       let finalTotal=[];
       if(this.state.billStatus){
           let billstate = [...this.state.billStatus];
     types.map((_item)=>{
        let total =0;
        for(let sale of billstate) {
            total += parseInt(sale[_item]);
        }
        finalTotal.push({_item,total})
       })
    }    
    let finalDue =    parseInt(finalTotal && finalTotal[6] &&finalTotal[6].total) - parseInt(finalTotal && finalTotal[7] &&finalTotal[7].total);
    const paginatorLeft = <div><span> Total dues  : </span><span>{finalDue}</span></div>

        const footerGroup = <ColumnGroup>
        <Row>
            <Column footer="Totals:" colSpan={2} footerStyle={{textAlign: 'right'}}/>
            <Column footer={finalTotal && finalTotal[0] &&finalTotal[0].total} />
            <Column footer={finalTotal && finalTotal[1] &&finalTotal[1].total} />
            <Column footer={finalTotal && finalTotal[2] &&finalTotal[2].total} />
            <Column footer={finalTotal && finalTotal[3] &&finalTotal[3].total} />
            <Column footer={finalTotal && finalTotal[4] &&finalTotal[4].total} />
            <Column footer={finalTotal && finalTotal[5] &&finalTotal[5].total} />
            <Column footer={finalTotal && finalTotal[6] &&finalTotal[6].total}/>
            <Column footer={finalTotal && finalTotal[7] &&finalTotal[7].total} />
            <Column footer="" colSpan={2} footerStyle={{textAlign: 'right'}}/>
        </Row>
        </ColumnGroup>;
        const header = (
            <div className="table-header">
                <div className="p-col-6 left_container">
                <div style={{marginLeft:"4px",fontWeight:"bold"}}>Month : {currentdate}</div>

                    {/* <Button label="Add" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.addNewRequest} /> */}
                    {/* <Button type="button" icon="pi pi-external-link" label="Print" onClick={this.handleClick}></Button> */}
                    {/* {this.printPdf} */}
                    {/* <Datatablecontent {...this.state} isPrint= {true} key="pdf"/> */}
                </div>
                <div className="p-col-6 Right_container">
                    <span className="p-input-icon-left">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search by Status..." />
                       <i className="pi pi-search" />
                    </span>
                </div>
            </div>
        );
        console.log(this.state.billStatus);
        return (
            <div className="billstatus"> 
                <DataTable ref={(el) => this.dt = el} value={this.state.billStatus}
                    dataKey="id"
                    paginator={(this.state.billStatus && this.state.billStatus.length > 21) ? true : false}
                    // rows={20}
                    header={header}
                    scrollable scrollHeight="600px" 
                    // loading={loading}
                    // first={(this.state.ItemRequests && this.state.ItemRequests.length > 13) ? this.state.first : 0}
                    // onPage={(e) => this.setState({ first: e.first })}
                    // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    globalFilter={this.state.globalFilter}
                    editMode="row"
                    emptyMessage="No Orders Found"
                    rowClassName={this.rowClassName}
                    footerColumnGroup={footerGroup}
                    paginatorLeft={paginatorLeft}

                    // onRowEditInit={this.onRowEditInit}
                    // onRowEditCancel={this.onRowEditCancel}
                    reorderableColumns

                >
                    <Column field="Index" header="" body={this.onIndexTemplate}  headerStyle={{ width: '3rem' }}/>
                    <Column field="Flat" header="Flat Num" headerStyle={{ width: '6rem' }}
                    
                    ></Column>
                    <Column field="oldDue" excludeGlobalFilter header="oldDue" headerStyle={{ width: '6rem' }}
                    ></Column>
                    <Column field="Milk" excludeGlobalFilter header="Milk" headerStyle={{ width: '6.5rem' }}
                    ></Column>
                    <Column field="Paper" header="Paper" excludeGlobalFilter headerStyle={{ width: '6.5rem' }}
                    ></Column>
                    <Column field="Water" header="Water" excludeGlobalFilter  headerStyle={{ width: '6.5rem' }} ></Column>
                    <Column header="fruits" field="fruits"
                        headerStyle={{ width: '6.5rem' }}  ></Column>
                    <Column field="ServiceCharge" header="ServiceCharge" excludeGlobalFilter 
                    ></Column>
                    <Column header="total" field="total"
                        headerStyle={{ width: '6.5rem' }}  ></Column>
                    <Column field="amountPaid" header="amountPaid"  
                    editor={(props) => this.priceEditor('WaterRequest', props)}
                    ></Column><Column field="status" header="status" editor={(props) => this.statusEditor('WaterRequest', props)} 
                    ></Column>
                     <Column header="Edit" rowEditor  headerStyle={{ width: '5rem' }} bodyStyle={{ textAlign: 'center' }} ></Column>
                </DataTable>
            </div>
        )
    }
}
export default BillStatus;