import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';

class App extends Component{

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  // if you dont use the syntax below(more modern) use this to declare initial state inside constructor:  this.state =
  }


  state = {
    persons:[
      {id: "www1", name: "Mark", age: 32},
      {id: "www2", name:"Tim", age: 28},
      {id: "www3", name:"Maggie", age:29}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0

  }

  static getDerivedStateFromProps(props, state){

    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }



deletePersonHandler =(personIndex) =>{
  // ALTERNATIVE TO below  LINE OF CODE: const persons = this.state.persons.slice();
     const persons =[...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons})
}

nameChangedHandler = (event, id) => {
//  console.log('Was clicked!');
//DONT DO THIS:    this.state.persons[0].name = "Markusio";
const personIndex = this.state.persons.findIndex(p =>{
  return p.id === id;
});

const person =  {
  ...this.state.persons[personIndex],
};

person.name = event.target.value;

const persons = [...this.state.persons];
persons[personIndex] = person;

 this.setState((prevState, props)=>{
   return{
     persons: persons,
     changeCounter: prevState.changeCounter +1
   };
 });
};


togglePersonHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow})

}

    render(){
      console.log('[App.js] render')
    let persons = null;

    if(this.state.showPersons){
      persons = (
           <Persons
              persons={this.state.persons}
              clicked={this.deletePersonHandler}
              changed={this.nameChangedHandler}
          />
      );
    }
    return (
        <Auxiliary>
          <button onClick={()=>{
            this.setState({ showCockpit: false});
          }}
          >Remove Cockpit</button>
          {this.state.showCockpit ?  (<Cockpit
                title={this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength = {this.state.persons.length}
                clicked= {this.togglePersonHandler}
            /> ) : null}
            {persons}
        </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);
