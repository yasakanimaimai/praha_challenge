// スクエア関数
export function Square(props) {
  return (
    <button 
      className='square'
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}