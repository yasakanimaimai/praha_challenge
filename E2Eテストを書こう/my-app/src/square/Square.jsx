import './square.css';

export function Square(props) {
  return (
    <button 
      className='square'
      onClick={props.onClick}
      data-cy={props.indexNumber}
    >
      {props.value}
    </button>
  )
}