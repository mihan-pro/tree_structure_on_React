import React from 'react';
import "./style.css"
import Button from './../lineButton/lineButton';

class OneLine extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            redactionMode: false,
            name:this.props.name,
        }
        this.input = React.createRef();
    }
    componentDidMount(){
        if(this.props.isNew){
            this.setRedactionMode();
        }
    }

    componentDidUpdate(){ 
        if(this.state.redactionMode){
            this.input.current.select();
        }
        if(this.props.name !== this.state.name){
            this.setState({name:this.props.name})
        }
    }

    updateName = (e) =>{
        if(e.type === "blur" || e.keyCode === 13){
            if(this.state.name === "" && this.input.current.value === ""){
                this.props.del(this.props.path);
            }
            this.props.rename(this.props.path, this.input.current.value);
            this.setState ({redactionMode:false})
        }
    }

    makeBuutons(){
        if(this.props.typeOfElement === "main"){
            return(
                <>
                    <div/>
                    <div/>
                    <Button type="add" add={this.props.add} typeOfElement = {this.props.typeOfElement}
                    index = {this.props.index} path = {this.props.path}/>
                </>
            )
        }
        else{
            return(
                <>
                    <Button type = "add" add = {this.props.add} typeOfElement = {this.props.typeOfElement}
                    path = {this.props.path}/>
                    <Button type = "del" del = {this.props.del} typeOfElement = {this.props.typeOfElement}
                    path = {this.props.path}/>
                    <Button type = "correct" typeOfElement = {this.props.typeOfElement} setRedMode = {this.setRedactionMode}
                    path = {this.props.path}/>
                </>
            )
        }
    }

    getStyle = () =>{
        let style = {};
        let green = 1;
        if(this.props.typeOfElement === "main"){
            style = {background : "#2f6ffe"};
        }
        else{
            style = {
                background : `rgba(140,${green+(this.props.path.length * 10)},215,.8)`,
                "fontWeight": 400 ,
                "fontStyle":"italic"}
        };
        return style;
    }

    setRedactionMode = () => {
        this.setState({redactionMode:!this.state.redactionMode});
    }

    getMargin(){
        if(this.props.typeOfElement === "main")return;
        let count = 0;
        let pathArr = this.props.path.split('/');
        pathArr.forEach(element=>{
            if(element !== ''){
                count++;
            }
        })
        return <>{"▹".repeat(count)}&#8192;</>
    }

    render(){
        return(
            <div className = "element" style = {this.getStyle()}>
                <div className = "element__name">
                    {this.getMargin()}
                    {this.state.redactionMode? 
                    <input type="text" ref = {this.input} defaultValue={this.state.name}
                    onBlur = {this.updateName} onKeyDown = {this.updateName} 
                    />
                    : this.state.name}
                </div>
                {this.makeBuutons()}
            </div>
        )
    }
}

export default OneLine;