import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import GuestCard from './components/GuestCard';

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
    const { loading, guests, error } = this.state;
    
    return (
      <div className="container">
        <h1>Guests of Cafe Masa</h1>
        <div className='guests-card-container'>
          {loading && <h3>Loading, please wait...</h3>}
          {(loading && error) && <h3>{error}</h3>}
          {(!loading && guests.length > 0) &&
            guests.map(guest => 
              <GuestCard key={guest.id} guest={guest} />
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
