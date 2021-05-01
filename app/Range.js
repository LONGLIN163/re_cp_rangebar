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
            scaleLeft:min,
            scaleRight:max
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
           //console.log(item)
           $(this).append("<u>"+(self.props.min+self.perbigUnitNumber*item)+"</u>")
       })


       // *******************bar draggable logic************************
       // find the distance of the left edge to screen`s edge
       let barleft= $(this.refs.range).find(".bar").offset().left;
       // console.log(barleft)
       // define the limit of the right side
       let scaleRightPx=barleft+(this.state.scaleRight-this.props.min)/this.persmallUnitNumber * this.smallUnitWidth // get all small scale units which can be moved
       //console.log(scaleRightPx)
       let barright= $(this.refs.range).find(".bar").offset().left+this.props.width;
       //console.log("barright",barright)
       let scaleLeftPx=barleft+(this.state.scaleLeft-this.props.min)/this.persmallUnitNumber * this.smallUnitWidth // get all small scale units which can be moved


       setLeftB();
       setRightB();

       // *****the positons of two "b" reference as css(the dragged element itself)
       // 
       let leftbpx=0;
       let rightbpx=self.props.width;

       function setLeftB(){
           $(self.refs.range).find(".bar b.left").draggable({
                "axis": "x",
                "containment":[barleft,0,scaleRightPx,0],
                "drag":function(event,ui){
                    leftbpx=ui.position.left;
                    //console.log("left",left)
                    var scaleLeft=Math.ceil((leftbpx*((self.props.max-self.props.min)/self.props.width)+self.props.min))
                    //console.log(scaleLeft)
                    self.setState({"scaleLeft":scaleLeft})

                    // reset right edge for the right bar
                    scaleLeftPx = barleft+(self.state.scaleLeft-self.props.min)/self.persmallUnitNumber * self.smallUnitWidth
    
                    //when change left,we need to set limit for right
                    setRightB();

                    //set span bar length
                    $(self.refs.range).find(".bar span").css({
                        "left":leftbpx,
                        "width":rightbpx-leftbpx
                    })
                }
           })
       }

       function setRightB(){
           $(self.refs.range).find(".bar b.right").draggable({
            "axis": "x",
            "containment":[scaleLeftPx,0,barright,0],
            "drag":function(event,ui){
                rightbpx=ui.position.left;
                //console.log("left",left)
                var scaleRight=Math.ceil((rightbpx*((self.props.max-self.props.min)/self.props.width)+self.props.min))
                //console.log(scaleLeft)
                self.setState({"scaleRight":scaleRight})
                // reset left edge for the left bar
                scaleRightPx = barleft+(self.state.scaleRight-self.props.min)/self.persmallUnitNumber * self.smallUnitWidth

                setLeftB();
                //set span bar length
                $(self.refs.range).find(".bar span").css({
                    "width":rightbpx-leftbpx
                })
           }
       })
 
      } 

      // *******************bar draggable logic************************
      $(self.refs.range).find(".bar").click(function(e){
           var x=e.clientX-$(this).offset().left;
           console.log("x",x)
           if(x<leftbpx){
            self.setState({scaleLeft:Math.ceil((x*((self.props.max-self.props.min)/self.props.width)+self.props.min))})
            leftbpx=x;
            $(self.refs.range).find(".bar b.left").css("left",x);
            //set span bar length
            $(self.refs.range).find(".bar span").css({
                "left":leftbpx,
                "width":rightbpx-leftbpx
            })
          }else if(x>rightbpx){
            self.setState({scaleRight:Math.ceil((rightbpx*((self.props.max-self.props.min)/self.props.width)+self.props.min))})
            rightbpx=x;
            $(self.refs.range).find(".bar b.right").css("left",x);
            //set span bar length
            $(self.refs.range).find(".bar span").css({
                "left":leftbpx,
                "width":rightbpx-leftbpx
            }) 
          }
      })

    }
    render(){

        return(
            <div className="range" ref="range" style={{width:this.props.width}} >
                <div className="bar" style={{width:this.props.width+6}}>
                    <span style={{width:this.props.width}} ></span>

                    <b className="left" style={{left:3}}>
                        <u>{this.state.scaleLeft}</u>
                    </b>
                    <b className="right" style={{left:this.props.width+1}}>
                    <u>{this.state.scaleRight}</u>
                    </b>
                </div>
                <div className="scaleline">
                    {this.showScaleLine()}
                  </div>
            </div>
        )
    }
}

export default Range;