
import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import _ from "lodash";

import ReactToPrint from 'react-to-print';
import moment from "moment";

// let currentdate = moment().format("h.mm a");
class Datatablecontent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPrint: false
    }
    this.componentRef = React.createRef();
  }
  componentDidMount(props) {
    let { ItemRequests } = this.props;
    this.setState({
      isPrint: true,
    });
  }
  render() {
    let { ItemRequests, globalFilter } = this.props;
    if (globalFilter != null) {
      ItemRequests = _.filter(ItemRequests, (obj) => {
        if ((obj.Flat).toLowerCase().includes(globalFilter)) {
          return obj;
        };
      })
    }
    else {
      ItemRequests = ItemRequests;
    }
    const data = _.groupBy(ItemRequests, "Brand") || [];
    let _brands = Object.keys(data) || {};

    let finalData = _brands.map((_Item) => {
      let brand = _Item;
      let _count = 0;

      let count = data[_Item].map((_item)=>{
        _count = _count + parseInt(_item.Quantity);
        return _count

      });
      let Count = count[count.length-1];

      return { brand, Count }
    })
    let currentdate = moment().format("Do MMM YYYY");
    return (<>
      <ReactToPrint
        trigger={() => {
          return <Button icon="pi pi-external-link" label="Print" onClick={this.printPdf}></Button>;
        }}
        content={() => this.componentRef}
      />
      <div className="printablediv">
        <div  ref={(el) => (this.componentRef = el)}   >
          <div style={{ display: "flex",justifyContent:"space-between" }}>
        <div style={{ margin: "30px 20px 10px 20px",fontWeight:'bold'}}> Date : {currentdate}</div>
        <div style={{ margin: "20px 20px 10px 20px",fontWeight:'bold'}}> Block : {globalFilter ? globalFilter.toUpperCase() : "All"} Block</div>

        </div>
          <div style={{ display: "flex" }}> 
          <div style={{ margin: "0px 0px 10px 20px"}} >
            <DataTable ref={(el) => this.dt = el} value={ItemRequests}
              dataKey="id"
              sortOrder={1}
              sortMode="single"
              sortField="Flat"
              rowGroupMode="rowspan"
              groupField="Flat"
              emptyMessage="No Orders Found"
            >
              <Column field="Flat" header="Flat Num"></Column>
              <Column field="Brand" header="Brand" ></Column>
              <Column field="Quantity" header="Quantity" ></Column>
            </DataTable>
          </div>
          <div style={{ margin: "0px 15px 0px 25px" }}>
            <DataTable ref={(el) => this.dt = el} value={finalData}
              className="quantitytable"
              emptyMessage="No Orders Found"
            >
              <Column field="brand" header="Brand" ></Column>
              <Column field="Count" header="Quantity" ></Column>
            </DataTable>
          </div>
        </div>
      </div>
      </div>
    </>
    )
  }
}
export default Datatablecontent;




