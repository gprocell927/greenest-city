import React, { Component } from 'react'
import LocationForm from './location-form'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      city: '',
      state: '',
      zipcode: ''
    }
  } //end of constructor

  handleSubmit (e) {
    e.preventDefault()
    console.log('You clicked submit!')
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Find the world's greenest city</h2>
        </div>
        <p className="App-intro">
          To get started, enter a city/state location or a zipcode and click 'Submit'
        </p>
        <LocationForm
          handleSubmit={ (e) => this.handleSubmit(e) }
        />
      </div>
    );
  }
}

export default App;
