import React from 'react';
import { shallow } from 'enzyme';
import Orders from './index';
import orderData from '../../mock/orderData.json';

describe('Orders component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Orders />);
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should filter data based on search term', () => {
    const searchInput = wrapper.find('input[type="text"]');
    searchInput.simulate('change', { target: { value: 'Sushi' } });

    const filteredData = orderData.filter((item) =>
      Object.values(item).some((value) =>
        value.toLowerCase().includes('sushi')
      )
    );

    expect(wrapper.state('searchTerm')).toEqual('Sushi');
    expect(wrapper.instance().filteredData).toEqual(filteredData);
  });

  it('should display the correct number of rows based on filtered data and pagination', () => {
    expect(wrapper.find('tr').length).toEqual(9);
    wrapper.setState({ currentPage: 1 });
    expect(wrapper.find('tr').length).toEqual(2);
  });
});