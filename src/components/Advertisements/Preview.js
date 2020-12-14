import React, { Component } from "react";
import Slider from "react-slick";

export default class AutoPlay extends Component {
    componentDidMount(){
        let{Data} = this.props;
    }
  render() {
    let{Data} = this.props;

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      adaptiveHeight: true

    };
    return (
      <div>
        <Slider {...settings}>
          {Data && Data.length ? Data.map((_Item)=>{
           let Imageurl = _Item.thumbUrl;
        return   <img src={Imageurl}/>
          }) :""}
        </Slider>
      </div>
    );
  }
}
