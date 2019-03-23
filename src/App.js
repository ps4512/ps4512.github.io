import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      price: null,
      ticker: ''
    };

    this.onGetStockPrice = this.onGetStockPrice.bind(this);
  }

  onGetStockPrice() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+this.state.ticker+'&interval=1min&apikey=VGDQ94ZG26OZZDFP', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({price: json['Time Series (1min)']});
      })
      .then(console.log(this.state.price))
      .then(console.log('operation completed'))
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <input
            className = 'App-searchbox'
            type="text"
            placeholder="Please enter ticker..."
            onChange = {event => {
              this.setState({ticker: event.target.value});
              console.log(this.state.ticker)
            }}
          />
          <br></br>
          <button className = 'App-button' onClick={this.onGetStockPrice}>Get Latest Stock Price</button>

          <p className="App-info">{JSON.stringify(this.state.price)}</p>
        </header>
      </div>
    );
  }

}

export default App;
