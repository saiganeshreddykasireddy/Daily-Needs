import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Form, DatePicker, AutoComplete, Button } from 'antd';
import "./style.scss";
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};



const DayWiseItems = (props) => {
    const FlatsList = useSelector(state => {
        let { FlatsList  } = state;
        return FlatsList;
    });
    const [selectedflat, setSelectedflat] = useState('');
    const [selectedstartdate, setSelectedstartdate] = useState('');
    const [selectedenddate, setSelectedenddate] = useState('');
 
    let flatslist=[];
    // useEffect(()=>{
        if(FlatsList && FlatsList.length){
            FlatsList.map((_flatslist)=>{
                flatslist.push({value:_flatslist.Flat});
            })
        }
       
    // },[FlatsList])
 
    const onSelect = (value) => {
        setSelectedflat(value);
    }
    const onChange = (date, dateString) => {
        setSelectedstartdate(dateString);

    }
    const setEnddate = (date, dateString) => {
        setSelectedenddate(dateString);
    }
    const onSubmit = ()=>{
        console.log(selectedflat,selectedstartdate,selectedenddate);
    }
    return (<>
        <Form name="time_related_controls" {...formItemLayout} >
        <div className="bill-header">Day Wise Items</div>
<div className ="form-layout"> 
            <div className="formlabel">Flat Number</div>
            <Form.Item
                name="Flat-Num"
                rules={[
                    {
                        required: true,
                        message: 'Please Enter The Flat Number!',
                    },
                ]}
            >
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    options={flatslist}
                    onSelect={onSelect}
                    value={selectedflat}
                    placeholder="Enter Flat Number"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </Form.Item>
            <Form.Item name="Start-Date"
                rules={[
                    {
                        required: false,
                        message: 'Please select start date!',
                    },
                ]}  >
                <div className="formlabel"> Select Date</div>
                <DatePicker style={{
                    width: 200,
                }}
                format={'DD-MM-YYYY'}
                // picker="month"
                    // value={selectedstartdate}
                    onChange={onChange}
                />
            </Form.Item>
{/* 
            <Form.Item name="End-Date"
                rules={[
                    {
                        required: false,
                        message: 'Please select end date!',
                    },
                ]} >
                <div className="formlabel">End Date</div>
                <DatePicker style={{
                    width: 200,
                }}
                    onChange={setEnddate}
                />
            </Form.Item> */}
            <Form.Item name="submit">
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Get Details
        </Button>
            </Form.Item>
        </div>

        </Form>
        </>
    );
};

export default DayWiseItems;








