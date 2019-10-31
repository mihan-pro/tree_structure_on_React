import React from 'react';
import "./style.css";

class Button extends React.Component{
    
    clickHandler = () => {
        if(this.props.add){
            this.props.add(this.props.path ,"")
        }
        else if(this.props.del){
            this.props.del(this.props.path);
        }
        else if(this.props.setRedMode){
            this.props.setRedMode();
        }
    }
    

    render(){
        if(this.props.type === "add"){
            return(
                <div className = "Line__button" onClick = {this.clickHandler}>
                    <img src="./plus-black-symbol.png"  alt="add"/>
                </div>
            )
        }
        else if(this.props.type === "del" ){
            return(
                <div className = "Line__button" onClick = {this.clickHandler}>
                    <img src="./rubbish-bin.png"        alt="delete"/>
                </div>
            )
        }
        else if(this.props.type === "correct"){
            return(
            <div className = "Line__button" onClick = {this.clickHandler}>
                <img src="./pencil-edit-button.png" alt="correct"/>
            </div>
        )}
    }
}

export default Button;