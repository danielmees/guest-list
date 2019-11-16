import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';

class App extends Component {
  state = {
    loading: true,
    guests: [],
    error: false
  };

  componentDidMount() {
    return axios.get('http://localhost:3000/db/guests.json')
      .then(res => {
        this.setState({
          loading: false,
          guests: res.data.data
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Oops, something went wrong!'
        });
      });
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
