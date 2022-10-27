import React from 'react';

import { Game } from './Game';

export default {
  title: 'MyApp/Game',
  component: Game,
  parameters: { fileName: __filename },
};

const Template = (args) => <Game {...args} />;

export const DefaultGame = Template.bind({});
DefaultGame.args = {
  history: [{squares: Array(9).fill(null)}],
  stepNumber: 0,
  xIsNext: true,
};

export const DrawGame = Template.bind({});
DrawGame.args = {
  history: [
    {squares: [null,null,null,null,null,null,null,null,null]},
    {squares: ['X',null,null,null,null,null,null,null,null]},
    {squares: ['X','O',null,null,null,null,null,null,null]},
    {squares: ['X','O','X',null,null,null,null,null,null]},
    {squares: ['X','O','X','X',null,null,null,null,null]},
    {squares: ['X','O','X','X','O',null,null,null,null]},
    {squares: ['X','O','X','X','O','X',null,null,null]},
    {squares: ['X','O','X','X','O','X','O',null,null]},
    {squares: ['X','O','X','X','O','X','O','X',null]},
    {squares: ['X','O','X','X','O','X','O','X','O']},
  ],
  stepNumber: 9,
  xIsNext: true,
}