import React, { Component } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import ProductService from '../service/ProductService';
// import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
// import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import "./style.scss";
const Requests = [
    {
        "Flat": "A 1208",
        "Brand": "Bisleri",
        "Quantity": 2,
        "Price": 20
    },
    {
        "Flat": "B 1208",
        "Brand": "Bisleri",
        "Quantity": 2,
        "Price": 20
    },
    {
        "Flat": "C 1208",
        "Brand": "Bisleri",
        "Quantity": 2,
        "Price": 20


    },
    {
        "Flat": "D 1208",
        "Brand": "Bisleri",
        "Quantity": 1,
        "Price": 20
    }, {
        "Flat": "E 1208",
        "Brand": "Bisleri",
        "Quantity": 2,
        "Price": 20
    },
    {
        "Flat": "F 1208",
        "Brand": "Bisleri",
        "Quantity": 1,
        "Price": 20
    },
    {
        "Flat": "G 1208",
        "Brand": "Bisleri",
        "Quantity": 1,
        "Price": 20
    },
    {
        "Flat": "H 1208",
        "Brand": "Bisleri",
        "Quantity": 1,
        "Price": 20
    },
    {
        "Flat": "I 1208",
        "Brand": "Bisleri",
        "Quantity": 1,
        "Price": 20
    },
    {
        "Flat": "F 1308",
        "Brand": "Kinley",
        "Quantity": 1,
        "Price": 60
    },
    {
        "Flat": "G 108",
        "Brand": "Aquapure",
        "Quantity": 1,
        "Price": 40
    }
]
class WaterRequest extends Component {

    emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    constructor(props) {
        super(props);

        this.state = {
            products: null,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: this.emptyProduct,
            selectedProducts: null,
            submitted: false,
            globalFilter: null
        };
        this.originalRows = {};
        this.onRowEditInit = this.onRowEditInit.bind(this);
        this.onRowEditCancel = this.onRowEditCancel.bind(this);
        this.flatNameEditor = this.flatNameEditor.bind(this);
        // this.productService = new ProductService();

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);

        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.exportCSV = this.exportCSV.bind(this);

        this.onInputChange = this.onInputChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
    }

    componentDidMount() {
        // this.productService.getProducts().then(data => this.setState({ products: data }));
        this.setState({
            waterrequests: Requests
        })
    }



    openNew() {
        this.setState({
            product: this.emptyProduct,
            submitted: false,
            productDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }

    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }





    editProduct(product) {
        this.setState({
            productDialog: true
        })
    }

    confirmDeleteProduct(product) {

    }

    deleteProduct() {
        // let products = this.state.products.filter(val => val.id !== this.state.product.id);
        // this.setState({
        //     products,
        //     deleteProductDialog: false,
        //     product: this.emptyProduct
        // });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    exportCSV() {
        this.dt.exportCSV();
    }





    onInputChange(e, name) {

    }

    onInputNumberChange(e, name) {
    }











    actionBodyTemplate(rowData) {
        return (
            <>
                <Button icon="pi pi-trash" className="p-button-rounded delete_icon" onClick={() => this.confirmDeleteProduct(rowData)} />
            </>
        );
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
    inputTextEditor(productKey, props, field) {
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />;
    }
    flatNameEditor = (productKey, props) => {
        // if(props.rowData){
                    return this.inputTextEditor(productKey, props, 'code');

        // }
        // return this.inputTextEditor(productKey, props, 'code');
console.log(productKey, props);
    }
    render() {
        const header = (
            <div className="table-header">
                <div className="p-col-6 left_container">
                    <Button label="Add" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />

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
     
        const deleteProductDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </>
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
                        onRowEditInit={this.onRowEditInit} onRowEditCancel={this.onRowEditCancel}
                    >

                        <Column field="Flat" header="Flat Num" sortable editor={(props) => this.flatNameEditor('WaterRequest', props)}></Column>
                        <Column field="Brand" header="Brand" sortable editor={(props) => this.flatNameEditor('WaterRequest', props)}></Column>
                        <Column field="Quantity" header="Quantity" sortable editor={(props) => this.flatNameEditor('WaterRequest', props)}></Column>
                        <Column field="Price" header="Price" sortable editor={(props) => this.flatNameEditor('WaterRequest', props)}></Column>
                        <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

                        <Column body={this.actionBodyTemplate} headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }} ></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.product && <span>Are you sure you want to delete <b>{this.state.product.name}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default WaterRequest;
















