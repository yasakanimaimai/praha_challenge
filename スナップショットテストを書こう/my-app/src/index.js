import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Game } from './Game';


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Game />);
}