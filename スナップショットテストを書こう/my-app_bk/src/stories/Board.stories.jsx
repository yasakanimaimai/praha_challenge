import React from 'react';

import { Board } from '../Board';

export default {
  title: 'MyApp/Board',
  component: Board,
  // storybook.test.jsにmultiSnapshotWithOptionsを設定した場合にparametersが必要
  // fileNameで指定したファイル名でスナップショットファイルが作成される
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