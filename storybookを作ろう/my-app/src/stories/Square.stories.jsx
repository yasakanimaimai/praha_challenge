import React from 'react';

import { Square } from '../Square';

export default {
  title: 'MyApp/Square',
  component: Square,
};

const Template = (args) => <Square {...args} />;

export const DefaultSquare = Template.bind({});
DefaultSquare.args = {
  value: null,
  onClick: () => {},
}

export const CircleSquare = Template.bind({});
CircleSquare.args = {
  ...DefaultSquare.args,
  value: 'O',
};

export const TriangleSquare = Template.bind({});
TriangleSquare.args = {
  ...DefaultSquare.args,
  value: '△',
};

export const XSquare = Template.bind({});
XSquare.args = {
  ...DefaultSquare.args,
  value: 'X',
};