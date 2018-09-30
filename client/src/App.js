import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/color/random');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body)
    return body;
  };

  render() {
    return (
      <div className="App" style={{backgroundColor : this.state.response.hex}}>
        <p>{this.state.response.name}</p>
      </div>
    );
  }
}

export default App;
