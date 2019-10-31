import React from 'react';
import "./style.css"
import OneLine from "./../oneLine/oneLine"

class Tree extends React.Component{

    makeTree = (arr) => {
        let linesArr = [];
        let getChild = (element) => {
            let parent = <OneLine name = {element.name} isNew = {element.isNew}
            path = {element.path} add = {this.props.addElement} del ={this.props.deleteElement}
            rename = {this.props.renameElement} key = {element.path}/>            
            let children = [];
            children.push(parent);
            if(element.children && element.children.length !== 0){
                let subBchildren = [];
                subBchildren = element.children.map((child,i) => {
                    return [ getChild(child, i)];
                })
                children = [...children,...subBchildren]
            }
            return children;
        }
        linesArr = arr.map((element,i)=>{
            return getChild(element , i);
        })
        return linesArr;
    }

    render(){
        return(
            <div className = "tree">
                <OneLine name = "TOP LEVEL" typeOfElement = "main" add = {this.props.addElement} path = ""/>
                {this.makeTree(this.props.content)}
            </div>
        )
    }
}

export default Tree;