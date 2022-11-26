import * as React from 'react';
import BasicSpeedDial from './BasicSpeedDial';
import TemporaryDrawer from './DrawerComp';
import EmptyTextarea from './EmptyTextarea';
import SimplePaper from './Paper';
import FullWidthTextField from './TextField'


export default function App() {
  return (
    <>
      <FullWidthTextField />
      <br />
      <SimplePaper />
      <br />
      <TemporaryDrawer />
      <br />
      <BasicSpeedDial />
      <br />
      <EmptyTextarea />
    </>
  );
}