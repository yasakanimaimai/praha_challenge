import path from 'path';

import initStoryshots from '@storybook/addon-storyshots';

// The required import from the @storybook/addon-storyshots-puppeteer addon
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// Function to customize the snapshot location
// この設定によってファイル名ごとに保存場所を切り替えられる。おそらく。
const getMatchOptions = ({ context: { fileName } }) => {
  // Generates a custom path based on the file name and the custom directory.
  const snapshotPath = path.join(path.dirname(fileName), './test/__snapshotsimage__');
  return { customSnapshotsDir: snapshotPath };
};

initStoryshots({
  // your own configuration
  test: imageSnapshot({
    // invoke the function above here
    getMatchOptions,
  }),
});