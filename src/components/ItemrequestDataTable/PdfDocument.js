
import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import ReactToPrint from 'react-to-print';

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
      isPrint: true
    });
  }
  render() {
    let { ItemRequests } = this.props;
    console.log(ItemRequests);
    return (<>
      <ReactToPrint
        trigger={() => this.state.isPrint === true}
        content={this.componentRef}
      />
      <div style={{ display: "flex" }} ref={this.componentRef} >

        <div  >
          <DataTable ref={(el) => this.dt = el} value={ItemRequests}
            dataKey="id"
            
            emptyMessage="No Orders Found"
         
          >
            <Column field="Flat" header="Flat Num"></Column>
            <Column field="Brand" header="Brand" ></Column>
            <Column field="Quantity" header="Quantity" ></Column>

          </DataTable>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <table>
            <tr style={{ fontSize: "6px" }}>
              <th>brand</th>
              <th>quantity</th>

            </tr>
            <tr style={{ fontSize: "6px" }}>
              <td>Amul</td>
              <td>4</td>


            </tr>
          </table>
        </div>
      </div>
    </>
    )
  }
}
export default Datatablecontent;




