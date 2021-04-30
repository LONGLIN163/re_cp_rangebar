import React from "react"
import { Component } from "react";

class Range extends Component{
    constructor({width,min,max}){
        super()
        this.bigUnitAmount = Math.ceil(width/60); // get how many big scale unit
        this.bigUnitWidth = width / this.bigUnitAmount; // get the width a big scale unit
        this.smallUnitWidth =  this.bigUnitWidth / 5; // get the width of a small scale(the big scale unit divide by 5 )

        this.perbigUnitNumber = parseInt((max-min)/this.bigUnitAmount); // every big scale`s value
        this.persmallUnitNumber = parseInt(this.perbigUnitNumber/5); // every small scale`s value
 
        console.log(this)

        this.state={
            scaleLeft:0,
            scaleRight:6000
        }
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
       // ****adjust distance between scale lines here
       $(this.refs.range).find(".scaleline i").css("margin-right",this.smallUnitWidth-1);
       $(this.refs.range).find(".scaleline i").eq(-2).css("margin-right",this.smallUnitWidth-2);
       $(this.refs.range).find(".scaleline i").eq(-1).css("margin-right",0);
       $(this.refs.range).find(".scaleline i:nth-child(5n+1)").addClass("big");

       var self=this;
       $(this.refs.range).find(".scaleline i.big").each(function(item){
           console.log(item)
           $(this).append("<u>"+(self.props.min+self.perbigUnitNumber*item)+"</u>")
       })


       // ****bar draggable logic
       // find the distance of the left edge to screen`s edge
       let barleft= $(this.refs.range).find(".bar").offset().left;
       // console.log(barleft)
       // define the limit of the right side
       let scaleRightPx=barleft+(this.state.scaleRight-this.props.min)/this.persmallUnitNumber * this.smallUnitWidth // get all small scale units which can be moved
       //console.log(scaleRightPx)
       $(this.refs.range).find(".bar b.left").draggable({
            "axis": "x",
            "containment":[barleft,0,scaleRightPx,0],
            // "drag":function(event,ui){
            //     var left=ui.position.left;
            //     var scaleLeft=Math.ceil((left*((self.props.max-self.props.min)/self.props.width)+100))
            //     console.log(scaleLeft)
            // }
       })

       let barright= $(this.refs.range).find(".bar").offset().left+this.props.width;
       console.log("barright",barright)

       $(this.refs.range).find(".bar b.right").draggable({
        "axis": "x",
        "containment":[scaleRightPx,0,barright,0]
       })

    } 

    render(){

        return(
            <div className="range" ref="range" style={{width:this.props.width}} >
                <div className="bar" style={{width:this.props.width+6}}>
                    <span style={{width:this.props.width}} ></span>

                    <b className="left" style={{left:3}}></b>
                    <b className="right" style={{left:this.props.width+1}}></b>
                </div>
                <div className="scaleline">
                    {this.showScaleLine()}
                  </div>
            </div>
        )
    }
}

export default Range;