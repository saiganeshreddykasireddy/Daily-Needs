import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { DatePicker } from 'antd';

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
        this.setState({
            showDialog: false
        })
    }
    getSelectedDate = (e) => {
        this.setState({
            paidDate: e.value
        });
    }
    SaveData = () => {
        this.setState({
            showDialog: false
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
            ExpenditureList: _ExpenditureList,
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
                        globalFilter={this.state.globalFilter} emptyMessage="No customers found." >
                        <Column field="Name" header="Name" />
                        <Column field="Reason" header="Reason" />
                        <Column field="Date" header="Date" />
                        <Column field="Amount" header="Amount" />
                    </DataTable>
                </div>
            </div>
        );
    }
}

export default Expenditure;