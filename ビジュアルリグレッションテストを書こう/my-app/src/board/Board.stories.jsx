import React from 'react';

import { Board } from './Board';
import { action } from "@storybook/addon-actions";


export default {
  title: 'MyApp/Board',
  component: Board,
  parameters: { fileName: __filename },
};

const Template = (args) => <Board {...args} />;

export const DefaultBoard = Template.bind({});
DefaultBoard.args = {
  squares: [
    null, null, null,
    null, null, null,
    null, null, null,
  ],
  onClick: action("clicked"),
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