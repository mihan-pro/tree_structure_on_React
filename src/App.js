import React from 'react';
import './App.css';
import Tree from "./modules/Tree/Tree"
import ExampleTree from "./exampleTree"


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tree: ExampleTree,
    }
  };

  componentDidMount(){
    let state = localStorage.getItem("tree");
    if(!state){
      localStorage.setItem("tree",JSON.stringify([])) // тестовое дерево
      state = localStorage.getItem("tree");
    }
    state = JSON.parse(state);
    this.setState({tree:state});
  }
  componentDidUpdate(){
    localStorage.setItem("tree",JSON.stringify(this.state.tree))
  }  

  addElement = ( path , name ) =>{
    console.log(`path = ${path}`);
    let newState = this.state.tree;
    let pathArr = path.split('/');
    pathArr.forEach((el,i)=>{
      if(el === ""){
        pathArr.splice(i,1);
      }
    })
    console.log(`pathArr.length = ${pathArr.length}`);
    if(pathArr.length === 0){
      console.log(`new state.length = ${newState.length}`)
      newState.push({
        name:name,
        children:[],
        path: (newState.length === 0)?"0":`${newState.length}`,
        isNew: true,
      });
      this.setState(newState);
      return;
    }
    else {
      var depth = pathArr.length;
      var goToElement = (arr, indexPath, depth) => {
        if (depth !== 0) {
          let currentPath = pathArr[indexPath];
          depth -= 1;
          if (arr[currentPath].children === undefined) arr[currentPath].children = [];
          goToElement(arr[currentPath].children, indexPath + 1, depth);
        }
        else {
          arr.push({
            name: name,
            children: [],
            path: `${path}/${arr.length}`,
            isNew: true,
          })
        }
      }
    }
    goToElement(newState, 0, depth);
    this.setState(newState);    
  }

  deleteElement = (path) => {
    if(!path)return;
    if(path[0] === '/')path = path.slice(1);
    let newState = this.state.tree;
    let pathArr = path.split('/');
    let depth = pathArr.length;
    let goToElement = (arr, indexPath, depth) => {
      if (depth !== 1) {
        let currentPath = pathArr[indexPath];
        depth -= 1;
        goToElement(arr[currentPath].children, indexPath + 1, depth);
      }
      else {
        arr.splice( pathArr[pathArr.length-1] , 1);
      }
    }
    goToElement(newState,0,depth)
    newState = this.recoverPaths(newState);
    this.setState({newState});
  }

  renameElement = (path, newName) => {
    let newState = this.state.tree;
    if(path[0] === '/')path = path.slice(1);
    let pathArr = path.split('/');
    let depth = pathArr.length;
    let goToElement = (arr , indexPath , depth) => {
      if(depth !== 1){
        let currentPath = pathArr[indexPath];
        depth -= 1;
        goToElement(arr[currentPath].children , indexPath + 1 , depth);
      }
      else{
        let indexEl = pathArr[pathArr.length - 1];
        try{
          arr[indexEl].name = newName;
          arr[indexEl].isNew = false;
        }catch{
          console.log("нет доступа к элементу", Error.name);
        }        
      }
    }
    goToElement(newState,0,depth);
    this.setState(newState); 
  }

  recoverPaths (arr) {
    let newState = arr;
    let detour = ( arr , parentPath) =>{
      arr.forEach((element,i)=>{
        element.path =`${parentPath}/${i}`;
        if(element.children!==undefined){
          detour(element.children, element.path);
        }
      })
    }
    detour(newState,"");
    return newState;
  }


  
  render(){
  return (
    <div className="App">
      <Tree   
        content        = {this.state.tree}
        addElement     = {this.addElement}
        deleteElement  = {this.deleteElement}
        renameElement  = {this.renameElement}   
      ></Tree>
    </div>
  );}
}

export default App;
