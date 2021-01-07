import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { DatePicker } from 'antd';
import _ from "lodash";

import "./style.scss";
class Expenditure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            paidDate: null,
            globalFilter: "",
            selectedmonth: null
        };
        this.dt = React.createRef();

        this.closeDialog = this.closeDialog.bind(this);
    }
    componentDidMount() {
        this.setState({
            ExpenditureList: this.props.ExpenditureList
        });
    }
   
    renderForm = () => {
        let newRequest = {
            Name: "",
            Reason: "",
            Amount: null,
            Date: "",
        };
        let updatedRequests = [...this.state.ExpenditureList];
        updatedRequests.push(newRequest);
        this.setState({
            showDialog: true,
            ExpenditureList: updatedRequests
        });
    }
    closeDialog = () => {
        let updatedRequests = [...this.state.ExpenditureList];
        updatedRequests.pop();
        this.setState({
            showDialog: false,
            // ExpenditureList:updatedRequests
        })
    }
    getSelectedDate = (e) => {
        this.setState({
            paidDate: e.value
        });
    }
    SaveData = () => {
        let{ExpenditureListUpdated}= this.state;
        console.log(this.state);
        this.setState({
            showDialog: false,
            ExpenditureList:ExpenditureListUpdated
        })
    }
    onInputChange = (e, name) => {
        let val = "";
        if (name == "Amount" || name == "Name" || name == "Reason") {
            val = e.target.value;
        }
        else {
            val = name
        }
        name = (name == "Amount" || name == "Name" || name == "Reason") ? name : "Date";
        let _ExpenditureList = [...this.state.ExpenditureList];
        _ExpenditureList[_ExpenditureList.length - 1][`${name}`] = val;
        this.setState({
            ExpenditureListUpdated: _ExpenditureList,
        });
    }
    setInputChange = (date, dateString)=>{
        this.setState({
            globalFilter:dateString,
            searchedMonth:dateString
        },()=>this.getTotalAmount());
    }
    getTotalAmount =()=>{
        if(this.state.ExpenditureList){
            let expends = this.state.ExpenditureList;
            let filteredData = expends.map((_item)=>{
                if(this.state.searchedMonth){
                 if((_item.Date).includes(this.state.searchedMonth) == true){
                    return _item
                 }
                 else{
                     //do nothing
                 }
                }
                else{
                    if((_item.Name).toLowerCase().includes(this.state.globalFilter) == true){
                        return _item
                     }
                     else{
                         //do nothing
                     }  
                }
                
            })
            let filtered = filteredData.filter(function(x) {
                return x !== undefined;
             });
            let total = 0;
            filtered.map((_Item)=>{
                let amount = _Item.Amount!=null ? _Item.Amount : 0;
                total += parseInt(amount);
            })
            return total;
        }
    }
     paginatorLeft = ()=> <div><span> Total Spends  :</span><span>{this.getTotalAmount()}</span></div>
     closeDialogwithoutsaving = ()=>{
        let updatedRequests = [...this.state.ExpenditureList];
         updatedRequests.pop();
         this.setState({
            showDialog: false,
            ExpenditureList:updatedRequests
         });
     }
    render() {
        const renderFooter = (
            <div>
                <Button label="Save" onClick={() => this.SaveData()} className="p-button-text yesbtn" />
                <Button label="Cancel" onClick={() => this.closeDialogwithoutsaving()} autoFocus className="p-button-text nobtn" />
            </div>
        )
        const header = (
            <div className="table-header">
                <div className="p-col-6 left_container">
                    <Button label="Add Spends" icon="pi pi-plus" className="p-button-text yesbtn" onClick={this.renderForm} />
                </div>
                <div className="p-col-6 Right_container">
                    <span className="p-input-icon-left">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                        <i className="pi pi-search" />
                    </span>
                </div>
            </div>
        );
        const dateFilter = <DatePicker
        picker="month"
        format="MM-YYYY"
        // value={selectedstartdate}
        onChange={this.setInputChange}
    />

        return (
            <div className="expenditurepage">
                <Dialog header="Add Expenditure" visible={this.state.showDialog} style={{ width: '35vw' }} footer={renderFooter} onHide={this.closeDialog}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="firstname1">Paid To</label>
                            <InputText id="firstname1" value={this.state.ExpenditureList && this.state.ExpenditureList.length ? this.state.ExpenditureList[this.state.ExpenditureList.length - 1].Name : ""} type="text" onChange={(e) => this.onInputChange(e, 'Name')} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname1">Reason</label>
                            <InputText id="lastname1" value={this.state.ExpenditureList && this.state.ExpenditureList.length ? this.state.ExpenditureList[this.state.ExpenditureList.length - 1].Reason : ""} type="text" onChange={(e) => this.onInputChange(e, 'Reason')} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname1">Amount</label>
                            <InputText value={this.state.ExpenditureList && this.state.ExpenditureList.length ? this.state.ExpenditureList[this.state.ExpenditureList.length - 1].Amount : ""} type="text" onChange={(e) => this.onInputChange(e, 'Amount')} />
                        </div>
                        <div className="p-field ">
                            <label htmlFor="time24">Date</label>
                            <DatePicker
                                format={'DD-MM-YYYY'}
                                // value={selectedstartdate}
                                onChange={this.onInputChange}
                            />
                        </div>
                    </div>
                </Dialog>
                <div className="card">
                    <DataTable ref={this.dt} paginator rows={15} value={this.state.ExpenditureList}
                        header={header} className="p-datatable-customers"
                        globalFilter={this.state.globalFilter} emptyMessage="No Expenditures found."
                        paginatorLeft={this.paginatorLeft()}
                        >
                        <Column field="Name" header="Name" />
                        <Column field="Reason" header="Reason" />
                        <Column field="Date" header="Date" filter filterElement={dateFilter} />
                        <Column field="Amount" header="Amount" />
                    </DataTable>
                </div>
            </div>
        );
    }
}

export default Expenditure;