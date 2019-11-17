import React from 'react';
import { mount } from 'enzyme';
import GuestCard from './GuestCard';

it('renders correct guest information according to props', () => {
  const guest = {
    id: 2,
    first_name: "Lilias",
    last_name: "Pace",
    email: "lpace1@toplist.cz",
    city: "Krasnyye Chetai",
    visit_count: 22,
    total_spend: 138.03,
    allow_marketing: true,
    tags: ["protocol", "Compatible", "Cloned", "Cloned", "frame"]
  };

  const wrapper = mount(<GuestCard guest={guest} />);
  expect(wrapper.find('div')).toHaveLength(3);
  expect(wrapper.find('img')).toHaveLength(1);
  expect(wrapper.find('p')).toHaveLength(4);
  expect(wrapper.find('ul')).toHaveLength(1);
  expect(wrapper.find('li')).toHaveLength(5);
  expect(wrapper.find('p.name').text()).toEqual("Lilias Pace");
  expect(wrapper.find('li').at(3).text()).toEqual("Cloned");
  expect(wrapper.find('p.email').text()).toEqual("lpace1@toplist.cz");
  expect(wrapper.find('p.city').text()).toEqual("Krasnyye Chetai");
  expect(wrapper.find('p.visit-info').text()).toEqual("Has visited 22 times, total spend is $138.03");
});

it('renders correct guest information when some info is missing', () => {
  const guest = {
    id: 2,
    first_name: "Lilias",
    last_name: null,
    email: null,
    city: null,
    visit_count: 22,
    total_spend: 138.03,
    allow_marketing: true,
    tags: null
  };

  const wrapper = mount(<GuestCard guest={guest} />);
  expect(wrapper.find('div')).toHaveLength(3);
  expect(wrapper.find('img')).toHaveLength(1);
  expect(wrapper.find('p')).toHaveLength(4);
  expect(wrapper.find('ul')).toHaveLength(0);
  expect(wrapper.find('p.name').text()).toEqual("Lilias ");
  expect(wrapper.find('p.email').text()).toEqual('');
  expect(wrapper.find('p.city').text()).toEqual('');
  expect(wrapper.find('p.visit-info').text()).toEqual("Has visited 22 times, total spend is $138.03");
});
