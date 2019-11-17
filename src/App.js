import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import GuestCard from './components/GuestCard';

class App extends Component {
  state = {
    loading: true,
    guests: [],
    error: false,
    displayGuests: [],
    sortMenuShow: false,
    toggleBtnText: 'View guests allow marketing',
    sortBtnText: 'Sort by'
  };

  componentDidMount() {
    return axios.get('http://localhost:3000/db/guests.json')
      .then(res => {
        this.setState({
          loading: false,
          guests: res.data.data,
          displayGuests: res.data.data
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Oops, something went wrong!'
        });
      });
  }

  handleToggleClick = () => {
    this.setState({ sortMenuShow: false, sortBtnText: 'Sort by' });
    if (this.state.toggleBtnText === 'View guests allow marketing') {
      this.setState({ toggleBtnText: 'View all'});
      const filteredGuests = this.state.guests.filter(guest => guest.allow_marketing);
      if (filteredGuests.length > 0) {
        this.setState({ displayGuests: filteredGuests });
      } 
    } else {
      this.setState({ toggleBtnText: 'View guests allow marketing'});
      this.setState({ displayGuests: this.state.guests });
    }
  }

  toggleSortMenu = () => {
    this.setState({ sortMenuShow: !this.state.sortMenuShow });
  }

  // when two guests have the same visit count, sort them with total spend as the same order
  sortGuests(mainKey, secondKey, order, event) {
    let newGuestsSorted = [];
    const guestToSort = [...this.state.displayGuests];
    if (order === 'asc') {
      newGuestsSorted = guestToSort.sort((a, b) => {
        if (a[mainKey] === b[mainKey]) {
          return a[secondKey] - b[secondKey];
        } else {
          return a[mainKey] - b[mainKey];
        }
      });
    } else {
      newGuestsSorted = guestToSort.sort((a, b) => {
        if (a[mainKey] === b[mainKey]) {
          return b[secondKey] - a[secondKey];
        } else {
          return b[mainKey] - a[mainKey];
        }
      });
    }

    this.setState({
      displayGuests: newGuestsSorted, 
      sortMenuShow: false,
      sortBtnText: event.target.innerText
    });
  }

  renderFilters = () => {
    const { sortMenuShow, sortBtnText} = this.state;
    return <div className='filters-container'>
      <button className='toggle-btn' onClick={this.handleToggleClick}>{this.state.toggleBtnText}</button>
      <div className={`sort-container ${(sortMenuShow) ? 'menu-show' : ''}`}>
        <button onClick={this.toggleSortMenu}>{sortBtnText}</button>
        <ul>
          <li className={(sortBtnText === 'Most visited') ? 'active' : ''} onClick={(event) => this.sortGuests('visit_count', 'total_spend', 'desc', event)}>Most visited</li>
          <li className={(sortBtnText === 'Least visited') ? 'active' : ''} onClick={(event) => this.sortGuests('visit_count', 'total_spend', 'asc', event)}>Least visited</li>
          <li className={(sortBtnText === 'Most total spend') ? 'active' : ''} onClick={(event) => this.sortGuests('total_spend', '', 'desc', event)}>Most total spend</li>
          <li className={(sortBtnText === 'Least total spend') ? 'active' : ''} onClick={(event) => this.sortGuests('total_spend', '', 'asc', event)}>Least total spend</li>
        </ul>
      </div>
    </div>
  }

  render() {
    const { loading, error, displayGuests } = this.state;
    return (
      <div className="container">
        <h1>Guests of Cafe Masa</h1>
        {this.renderFilters()}
        <div className='guests-card-container'>
          {loading && <h3>Loading, please wait...</h3>}
          {(loading && error) && <h3>{error}</h3>}
          {(!loading && displayGuests.length > 0) &&
            displayGuests.map(guest => 
              <GuestCard key={guest.id} guest={guest} />
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
