import React from 'react';
import renderer from 'react-test-renderer';

import data from './mock-data';
import FloatingButton from '../components/common/FloatingButton';
import DropDown from '../components/common/DropDown';
import Modal from '../components/common/Modal';

it('renders the floating button correctly', () => {
  const tree = renderer
    .create(<FloatingButton
      icon="group_add"
      tooltip="Start Room"
      handleClick={() => {}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the dropdown correctly', () => {
  const tree = renderer
    .create(<DropDown
      list={data.dropdown}
      tooltip="Tooltip test"
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the modal correctly', () => {
  const tree = renderer
    .create(<Modal />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
