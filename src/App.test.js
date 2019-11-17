import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import App from './App';

jest.mock('axios', () => {
  const fakeResponse = {
    data: {
      data:[
        {
          id: 1,
          first_name: "Byrom",
          last_name: "Leggen",
          email: null,
          city: "Chat Trakan",
          visit_count: 7,
          total_spend: 137.71,
          allow_marketing: true,
          tags: ["protocol", "migration", "executive", "Down-sized", "Proactive"]
        },
        {
          id: 2,
          first_name: "Lilias",
          last_name: "Pace",
          email: "lpace1@toplist.cz",
          city: "Krasnyye Chetai",
          visit_count: 22,
          total_spend: 138.03,
          allow_marketing: true,
          tags: ["protocol", "Compatible", "Cloned", "Cloned", "frame"]
        },
        {
         id: 3,
         first_name: "Nappy",
         last_name: "Prate",
         email: "nprate2@g.co",
         city: "Funza",
         visit_count: 14,
         total_spend: 153.27,
         allow_marketing: false,
         tags: [
            "client-driven",
            "encompassing",
            "Vision-oriented",
            "6th generation",
            "Down-sized"
          ]
        },
        {
          id: 4,
          first_name: "Claudina",
          last_name: null,
          email: "cdunhillc@friendfeed.com",
          city: null,
          visit_count: 22,
          total_spend: 132.26,
          allow_marketing: true,
          tags: [
            "Visionary",
            "Open-source",
            "functionalities",
            "intermediate",
            "well-modulated"
          ]
        }
      ]
    }
  };
  return {
    get: jest.fn(() => Promise.resolve(fakeResponse)),
  };
});

const guests = [
  {
    id: 1,
    first_name: "Byrom",
    last_name: "Leggen",
    email: null,
    city: "Chat Trakan",
    visit_count: 7,
    total_spend: 137.71,
    allow_marketing: true,
    tags: ["protocol", "migration", "executive", "Down-sized", "Proactive"]
  },
  {
    id: 2,
    first_name: "Lilias",
    last_name: "Pace",
    email: "lpace1@toplist.cz",
    city: "Krasnyye Chetai",
    visit_count: 22,
    total_spend: 138.03,
    allow_marketing: true,
    tags: ["protocol", "Compatible", "Cloned", "Cloned", "frame"]
  },
  {
   id: 3,
   first_name: "Nappy",
   last_name: "Prate",
   email: "nprate2@g.co",
   city: "Funza",
   visit_count: 14,
   total_spend: 153.27,
   allow_marketing: false,
   tags: [
      "client-driven",
      "encompassing",
      "Vision-oriented",
      "6th generation",
      "Down-sized"
    ]
  },
  {
    id: 4,
    first_name: "Claudina",
    last_name: null,
    email: "cdunhillc@friendfeed.com",
    city: null,
    visit_count: 22,
    total_spend: 132.26,
    allow_marketing: true,
    tags: [
      "Visionary",
      "Open-source",
      "functionalities",
      "intermediate",
      "well-modulated"
    ]
  }
];

it('fetches guests information on #componentDidMount and update states correctly', () => {
  const wrapper = shallow(<App />);
  wrapper.instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/db/guests.json');
      expect(wrapper.state('loading')).toEqual(false);
      expect(wrapper.state('guests')).toEqual(guests);
    });
});

it('renders correct toggle button and sort dropdown', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('button')).toHaveLength(2);
  expect(wrapper.find('ul')).toHaveLength(1);
  expect(wrapper.find('li')).toHaveLength(4);
  expect(wrapper.find('button.toggle-btn').text()).toEqual("View guests allow marketing");
  expect(wrapper.find('div.sort-container button').text()).toEqual("Sort by");
  expect(wrapper.find('div.sort-container li').at(1).text()).toEqual("Least visited");
  expect(wrapper.find('div.sort-container li').at(2).text()).toEqual("Most total spend");
});

it('toggle button and sort dropdown clicks change their default text and toggle sort menu correctly', () => {
  const wrapper = shallow(<App />);
  wrapper.find('button.toggle-btn').simulate('click');
  expect(wrapper.find('button.toggle-btn').text()).toEqual("View all");
  wrapper.find('button.toggle-btn').simulate('click');
  expect(wrapper.find('button.toggle-btn').text()).toEqual("View guests allow marketing");
  expect(wrapper.state('sortMenuShow')).toEqual(false);
  wrapper.find('div.sort-container button').simulate('click');
  expect(wrapper.state('sortMenuShow')).toEqual(true);
  wrapper.find('div.sort-container li').at(1).simulate('click', { target: { innerText : "test text" }});
  expect(wrapper.find('div.sort-container button').text()).toEqual("test text");
  expect(wrapper.state('sortMenuShow')).toEqual(false);
});

it('displays guests information correctly after toggle button clicking ', () => {
  const wrapper = shallow(<App />);
  const guestsAllowMarketing = [guests[0], guests[1], guests[3]];
  wrapper.instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(wrapper.state('guests')).toEqual(guests);
      wrapper.find('button.toggle-btn').simulate('click');
      expect(wrapper.state('displayGuests')).toHaveLength(3);
      expect(wrapper.state('displayGuests')).toEqual(guestsAllowMarketing);
      wrapper.find('button.toggle-btn').simulate('click');
      expect(wrapper.state('displayGuests')).toEqual(guests);
    });
});

it('displays guests in correct order after sorting by total spend in ascending', () => {
  const wrapper = shallow(<App />);
  const guestsTotalSpendAsc = [guests[3], guests[0], guests[1], guests[2]];
  const guestsTotalSpendAscwithMarketing = [guests[3], guests[0], guests[1]];
  wrapper.instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();
      wrapper.find('div.sort-container li').at(3).simulate('click', { target: { innerText : "Least total spend" }});
      expect(wrapper.state('displayGuests')).toEqual(guestsTotalSpendAsc);
      wrapper.find('button.toggle-btn').simulate('click');
      wrapper.find('div.sort-container li').at(3).simulate('click', { target: { innerText : "Least total spend" }});
      expect(wrapper.state('displayGuests')).toEqual(guestsTotalSpendAscwithMarketing);
    });
});

it('displays guests in correct order after sorting by total spend in descending', () => {
  const wrapper = shallow(<App />);
  const guestsTotalSpendDesc = [guests[2], guests[1], guests[0], guests[3]];
  const guestsTotalSpendDescwithMarketing = [guests[1], guests[0], guests[3]];
  wrapper.instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();  
      wrapper.find('div.sort-container li').at(2).simulate('click', { target: { innerText : "Most total spend" }});
      expect(wrapper.state('displayGuests')).toEqual(guestsTotalSpendDesc);
      wrapper.find('button.toggle-btn').simulate('click');
      wrapper.find('div.sort-container li').at(2).simulate('click', { target: { innerText : "Most total spend" }});
      expect(wrapper.state('displayGuests')).toEqual(guestsTotalSpendDescwithMarketing);
    });
});

it('displays guests in correct order after sorting by visit times in ascending, when two guests have same visit times, sorts them by total spending in ascending', () => {
  const wrapper = shallow(<App />);
  const guestsVisitAsc = [guests[0], guests[2], guests[3], guests[1]];
  const guestsVisitAscwithMarketing = [guests[0], guests[3], guests[1]];
  wrapper.instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();
      wrapper.find('div.sort-container li').at(1).simulate('click', { target: { innerText : "Least visited" }});
      expect(wrapper.state('displayGuests')).toEqual(guestsVisitAsc);
      wrapper.find('button.toggle-btn').simulate('click');
      wrapper.find('div.sort-container li').at(1).simulate('click', { target: { innerText : "Least visited" }});
      expect(wrapper.state('displayGuests')).toEqual(guestsVisitAscwithMarketing);
    });
});

it('displays guests in correct order after sorting by visit times in descending, when two guests have same visit times, sorts them by total spending in descending', () => {
  const wrapper = shallow(<App />);
  const guestsVisitDesc = [guests[1], guests[3], guests[2], guests[0]];
  const guestsVisitDescwithMarketing = [guests[1], guests[3], guests[0]];
  wrapper.instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();
      wrapper.find('div.sort-container li').at(0).simulate('click', { target: { innerText : "Most visited" }});
      expect(wrapper.state('displayGuests')).toEqual(guestsVisitDesc);
      wrapper.find('button.toggle-btn').simulate('click');
      wrapper.find('div.sort-container li').at(0).simulate('click', { target: { innerText : "Most visited" }});
      expect(wrapper.state('displayGuests')).toEqual(guestsVisitDescwithMarketing);
    });
});
