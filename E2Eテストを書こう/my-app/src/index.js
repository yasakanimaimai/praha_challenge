import React from 'react';
import ReactDOM from 'react-dom/client';
import { Game } from './game/Game';

const root = ReactDOM.createRoot(document.getElementById("root"));
const history = [{squares: Array(9).fill(null)}];
const stepNumber = 0;
const xIsNext = true;
root.render(<Game history={history} stepNumber={stepNumber} xIsNext={xIsNext}/>);