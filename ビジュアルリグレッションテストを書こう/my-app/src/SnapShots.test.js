import initStoryshots, { 
  multiSnapshotWithOptions,
  Stories2SnapsConverter, 
} from '@storybook/addon-storyshots'; // eslint-disable-line import/no-extraneous-dependencies

initStoryshots({
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: './test/__snapshots__/'
  })
});