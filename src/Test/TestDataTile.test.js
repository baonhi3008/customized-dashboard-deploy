import React from 'react';
import { shallow } from 'enzyme';
import DataTile from '../Dash2/DataTile';

const title = 'Test DataTile';

let wrapped = shallow(<DataTile>{title}</DataTile>);


describe('DefaultText', () => {
  it('should render the DefaultText Component accordingly', () => { 
expect(wrapped).toMatchSnapshot();
  });  it('renders the DefaultTexts children component', () => {
expect(wrapped.find('h1').text()).toEqual(title);
  });
});