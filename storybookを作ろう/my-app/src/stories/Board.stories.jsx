import React from 'react';

import { Board } from '../Board';

export default {
  title: 'MyApp/Board',
  component: Board,
};

const Template = (args) => <Board {...args} />;

export const DefaultBoard = Template.bind({});
DefaultBoard.args = {
  squares: [
    null, null, null,
    null, null, null,
    null, null, null,
  ],
  onClick: () => {},
}

export const AllCircle = Template.bind({});
AllCircle.args = {
  ...DefaultBoard.args,
  squares: [
    'O', 'O', 'O', 
    'O', 'O', 'O', 
    'O', 'O', 'O', 
  ],
}

export const AllX = Template.bind({});
AllX.args = {
  ...DefaultBoard.args,
  squares: [
    'X', 'X', 'X', 
    'X', 'X', 'X', 
    'X', 'X', 'X', 
  ],
}

export const AllTriangle = Template.bind({});
AllTriangle.args = {
  ...DefaultBoard.args,
  squares: [
    '△', '△', '△', 
    '△', '△', '△', 
    '△', '△', '△', 
  ],
}