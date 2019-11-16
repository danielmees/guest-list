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
  }
];

it('fetches guests information on #componentDidMount and update states correctly', () => {
  const wrapper = shallow(<App />);
  wrapper.instance()
    .componentDidMount()
    .then((response) => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/db/guests.json');
      expect(wrapper.state('loading')).toEqual(false);
      expect(wrapper.state('guests')).toEqual(guests);
    });
});