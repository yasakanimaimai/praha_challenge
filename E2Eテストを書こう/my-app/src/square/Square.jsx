import './square.css';

export function Square(props) {
  return (
    <button 
      className='square'
      onClick={props.onClick}
      e2e={props.e2e}
    >
      {props.value}
    </button>
  )
}