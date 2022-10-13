import React from 'react';

import { Game } from '../Game';

export default {
  title: 'MyApp/Game',
  component: Game,
  parameters: { fileName: __filename },
};

const Template = () => <Game />;

export const DefaultGame = Template.bind({});