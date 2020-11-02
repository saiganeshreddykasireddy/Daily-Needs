import React, { Component } from 'react';
import { connect } from 'react-redux'
import classNames from 'classnames';
import {Checkbox} from 'primereact/checkbox';
import {editProductsList} from "../../actions/action";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import _ from "lodash";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './style.scss';
class ItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            layout: 'grid',
            productDialog: false,
            deleteProductDialog: false,
            newproductDialog:false

        };


        this.itemTemplate = this.itemTemplate.bind(this);
    }

    componentDidMount(props) {
        let { products, ItemList } = this.props;
        // let sortOptions=[];
        // console.log(products,"cdm");
        // let _products = _.groupBy(products,"Type") || [];
        //  let sortoptionsArray =  Object.keys(_products) || [];
        //  sortoptionsArray.map((_item,index) => {
        //     return sortOptions.push({
        //         label:  _item,
        //         value:  _item,
        //         key: index
        //     });
        // });
        this.setState({
            products: products,
            // sortOptions:sortOptions

        })
    }
    componentWillReceiveProps() {
        let { products, ItemList } = this.props;

        this.setState({
            products: products,
            // sortOptions:ItemList

        })
    }


    renderListItem(data) {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={`showcase/demo/images/product/${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.Brand}</div>

                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.Type}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">Rs {data.Price}</span>
                        <span>
                        <Button icon="pi pi-pencil" className="p-button-rounded edit_icon" onClick={(e) => this.openEditDialog(e, data)} style={{marginRight:"8px"}} />
                        <Button icon="pi pi-trash" className="p-button-rounded delete_icon" onClick={(e) => this.openDeleteDialog(e, data)} />   
                       
                        </span>

                                       </div>
                </div>
            </div>
        );
    }

    renderGridItem(data) {
        return (
            <div className="p-col-12 p-md-3">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.Type}</span>
                        </div>
                        <Button icon="pi pi-pencil" className="p-button-rounded edit_icon" onClick={(e) => this.openEditDialog(e, data)} />

                    </div>
                    <div className="product-grid-item-content">
                        <img src={`showcase/demo/images/product/${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="product-name">{data.Brand}</div>

                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">Rs {data.Price}</span>
                        <Button icon="pi pi-trash" className="p-button-rounded delete_icon" onClick={(e) => this.openDeleteDialog(e, data)} />
                    </div>
                </div>
            </div>
        );
    }

    itemTemplate(product, layout) {
        if (!product) {
            return null;
        }

        if (layout === 'list')
            return this.renderListItem(product);
        else if (layout === 'grid')
            return this.renderGridItem(product);
    }
    addNewProduct = ()=>{

        let newRequest = {
            Brand: "",
            Price: "",
            isAvailable:true,
            Type:""
        };
        let updatedRequests = [...this.state.products];
        updatedRequests.push(newRequest);
        
        this.setState({
            products: updatedRequests,
            addNewRow:true,
            newproductDialog: true,
        });

    }
    renderHeader() {

        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{ textAlign: 'left' }}>
                    <Button label="Add" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.addNewProduct} />
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({ layout: e.value })} />
                </div>
            </div>
        );
    }
    deleteProduct = () => {
        let { rowdata } = this.state;

        let ItemRequests = [...this.state.products];
        let Index = _.findIndex(ItemRequests, rowdata);
        ItemRequests.splice(Index, 1);
        this.setState({
            products: ItemRequests,
            rowdata: {},
            deleteProductDialog: false,

        })
    }
    openDeleteDialog = (e, data) => {
        console.log(data);
        this.setState({
            deleteProductDialog: true,
            rowdata: data
        })
    }
    hideDeleteProductDialog = () => {
        this.setState({
            deleteProductDialog: false

        })
    }
    hideProductDialog = () => {
        this.setState({
            productDialog: false,
            editedRow:{}

        })
    }
    hideNewProductDialog= ()=>{
        this.setState({
            newproductDialog: false

        })
    }
    openEditDialog = (e, data) => {
        this.setState({
            productDialog: true,
            editedRow: data

        })
    }
    onInputChange(e, name) {
        let val = "";
        if(name == "isAvailable"){
             val = e.checked;
        }
        else{
            val = parseInt(e.target.value);
        }
        let products = [...this.state.products];
        let {editedRow}=this.state;
        let Index = _.findIndex(products, editedRow);

        let _editedRow = { ...this.state.editedRow };
        _editedRow[`${name}`] = val;
        products[Index] = _editedRow;
        this.props.dispatch(editProductsList(products));
        this.setState({ 
            products:products,
            editedRow:_editedRow
         });
    }
    onnewInputChange = (e,name)=>{
        let val = "";
        if(name == "isAvailable"){
             val = e.checked;
        }
        if(name =="Price"){
            val = parseInt(e.target.value);
        }
        else{
            val = e.target.value;

        }
        let products = [...this.state.products];

        products[products.length - 1][`${name}`] = val;

        this.setState({ 
            products:products,
         });
    }
    savenewProduct =()=>{
        this.setState({
            newproductDialog: false

        }) 
    }
    saveProduct = () => {
        this.setState({
            productDialog: false

        })
    }
    render() {
        const header = this.renderHeader();
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Save" icon="pi pi-check" className="p-button-text yesbtn" onClick={this.saveProduct} />
                <Button label="Cancel" icon="pi pi-times" className="p-button-text nobtn" onClick={this.hideProductDialog} />
            </React.Fragment>
        );
        const newproductDialogFooter = (
            <React.Fragment>
                <Button label="Save" icon="pi pi-check" className="p-button-text yesbtn" onClick={this.savenewProduct} />
                <Button label="Cancel" icon="pi pi-times" className="p-button-text nobtn" onClick={this.hideNewProductDialog} />
            </React.Fragment>
        );
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="Yes" icon="pi pi-check" className="p-button-text yesbtn" onClick={this.deleteProduct} />
                <Button label="No" icon="pi pi-times" className="p-button-text nobtn" onClick={this.hideDeleteProductDialog} />
            </React.Fragment>
        );
        return (
            <div className="products_list">
                <div className="card">
                    <DataView value={this.state.products || []} layout={this.state.layout} header={header}
                        itemTemplate={this.itemTemplate} paginator rows={12}
                    />
                    <Dialog visible={this.state.productDialog} style={{ width: '450px' }} header=" Edit Product Details" modal className="p-fluid editable_dialog" footer={productDialogFooter} onHide={this.hideProductDialog}>
                        {this.state.editedRow ?
                            <>
                                <div className="p-field">
                                    <label htmlFor="Brand">Name</label>
                                    <InputText id="Brand" value={this.state.editedRow.Brand} />
                                </div>
                                <div className="p-formgrid p-grid">
                                    <div className="p-field p-col">
                                        <label htmlFor="Price">Price</label>
                                        <InputText id="Price" value={this.state.editedRow.Price} onChange={(e) => this.onInputChange(e, 'Price')} mode="currency" intgeronly />
                                    </div>
                                    <div className="p-field p-col">
                                        <label htmlFor="quantity">Type</label>
                                        <InputText id="Type" value={this.state.editedRow.Type}  />
                                    </div>
                                    <div className="p-col-12" style={{    paddingLeft: "12px"
}}>
                                        <Checkbox inputId="cb1" value="isAvailable" onChange={(e) => this.onInputChange(e, 'isAvailable')} checked={this.state.editedRow.isAvailable}></Checkbox>
                                        <label htmlFor="cb1" className="p-checkbox-label">isAvailable</label>
                                    </div>
                                </div> </> : ""}
                    </Dialog>

                    <Dialog visible={this.state.newproductDialog} style={{ width: '450px' }} header=" Add New Product" modal className="p-fluid editable_dialog" footer={newproductDialogFooter} onHide={this.hideNewProductDialog}>
                        {this.state.addNewRow ?
                            <>
                                <div className="p-field">
                                    <label htmlFor="Brand">Name</label>
                                    <InputText id="Brand" value={this.state.products[this.state.products.length - 1].Brand} onChange={(e) => this.onnewInputChange(e, 'Brand')}/>
                                </div>
                                <div className="p-formgrid p-grid">
                                    <div className="p-field p-col">
                                        <label htmlFor="Price">Price</label>
                                        <InputText id="Price" value={this.state.products[this.state.products.length - 1].Price} onChange={(e) => this.onnewInputChange(e, 'Price')} mode="currency" integeronly />
                                    </div>
                                    <div className="p-field p-col">
                                        <label htmlFor="quantity">Type</label>
                                        <InputText id="Type" value={this.state.products[this.state.products.length - 1].Type} onChange={(e) => this.onnewInputChange(e, 'Type')} />
                                    </div>
                                    <div className="p-col-12" style={{    paddingLeft: "12px"
}}>
                                        <Checkbox inputId="cb1" value="isAvailable" onChange={(e) => this.onnewInputChange(e, 'isAvailable')} checked={this.state.products[this.state.products.length - 1].isAvailable}></Checkbox>
                                        <label htmlFor="cb1" className="p-checkbox-label">isAvailable</label>
                                    </div>
                                </div> </> : ""}

                    </Dialog>

                    <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirmation" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog} className="delete_product_dialog">
                        <div className="confirmation-content">
                            {this.state.rowdata ? <>  <b>Are you sure you want to delete <b>{this.state.rowdata.Brand}</b> From Products </b><b> ?</b> </> : ""}
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({
    products
}) => ({
    products
})
export default connect(mapStateToProps)(ItemsList);