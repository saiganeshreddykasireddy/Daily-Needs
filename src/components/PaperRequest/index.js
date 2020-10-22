import React, { Component } from 'react';
import ItemrequestDataTable from "../ItemrequestDataTable";

import { connect } from 'react-redux'

// import "./style.scss";
const ItemPriceList = [
    { "Brand": "Eenadu", "Price": 6 },
    { "Brand": "Sakshi", "Price": 7 },
    { "Brand": "Hindu", "Price": 10 },
    { "Brand": "Andhrajyothy", "Price": 2 },
    { "Brand": "Times Of India", "Price": 8 },
    { "Brand": "Economic Times", "Price": 10 },
    { "Brand": "The Hindu", "Price": 9 }
];
class PaperRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        let ItemList = [];
        if (ItemPriceList && ItemPriceList.length) {
            ItemPriceList.map((_items) => {
                ItemList.push(_items.Brand);
            })
        }
        let {Requests} = this.props;
        this.setState({
            requests: Requests.PaperRequests,
            brandList: ItemList,
        })
    }
    render() {
        return (
            <div>
                <ItemrequestDataTable key="PaperRequests" requests={this.state.requests} requestsType="PaperRequests" brandList={this.state.brandList} />
            </div>
        );
    }
}
const mapStateToProps = ({
    Requests
}) => ({
    Requests
})
export default connect(mapStateToProps)(PaperRequest);
















