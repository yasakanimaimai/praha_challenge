import React from 'react';

import { Game } from './Game';

export default {
  title: 'MyApp/Game',
  component: Game,
  parameters: { fileName: __filename },
};

const Template = (args) => <Game {...args} />;

export const DefaultGame = Template.bind({});