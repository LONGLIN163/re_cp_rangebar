import React from "react"
import { Component } from "react";

class Range extends Component{
    constructor({width,min,max}){
        super()
        this.bigUnitAmount = Math.ceil(width/60);
        this.bigUnitWidth = width / this.bigUnitAmount;
        this.smallUnitWidth =  this.bigUnitWidth / 5;

        this.perbigUnitNumber = parseInt((max-min)/this.bigUnitAmount);
        this.persmallUnitNumber = parseInt(this.perbigUnitNumber/5);
 
        console.log(this)
    }

    showScaleLine(){
        var scalelines=[];
        var length=this.bigUnitAmount*5+1;
        for(var i=0;i<length;i++){
            scalelines.push(<i key={i}></i>)
        }

        return scalelines;
    }

    componentDidMount(){
       $(this.refs.range).find(".scaleline i").css("margin-right",this.smallUnitWidth-1);
       $(this.refs.range).find(".scaleline i").eq(-2).css("margin-right",this.smallUnitWidth-2);
       $(this.refs.range).find(".scaleline i").eq(-1).css("margin-right",0);
       $(this.refs.range).find(".scaleline i:nth-child(5n+1)").addClass("big");
    } 

    render(){

        return(
            <div className="range" ref="range" style={{width:this.props.width}} >
                <div className="bar" style={{width:this.props.width}}></div>
                <div className="scaleline">
                    {this.showScaleLine()}
                    {/* <i className="b"></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i className="b"></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i className="b"></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i className="b"></i> */}
                </div>
            </div>
        )
    }
}

export default Range;