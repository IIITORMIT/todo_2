import React, {useState, useEffect } from 'react';
import { v4 as uuidv4} from 'uuid'
import { randomColor } from 'randomcolor'
import './App.css';
import Draggable from 'react-draggable';

function App() {

const [item, setItem] = useState('')
const [items, setItems] = useState(
  JSON.parse(localStorage.getItem('items')) || []
)

useEffect(() =>{
 localStorage.setItem('items', JSON.stringify(items))
}, [items] )

  const newItem = () => {
    if(item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Enter something...')
      setItem('')
    }
  }

const deleteNode = (id) => {
 setItems(items.filter((item) => item.id !== id))
}

const updatePos = (date, index) => {
  let newArray = [...items]
  newArray[index].defaultPos = { x: date.x, y: date.y}
  setItems(newArray)
}

const keyPress = (e) => {
  const code = e.keyCode || e.which
  if ( code === 13) {
    newItem()
  }
}

  return (
    <div className="App">
      <div className='wrapper'>
        <input 
        value={item}
        type="text" 
        placeholder="Enter something..."
        onChange={(e) => setItem(e.target.value)}
        onKeyPress={(e) => keyPress(e)}
        />
        <button className="enter"onClick={newItem}>ENTER</button>
      </div>

      {
        items.map((item, index) => {
         return (
          <Draggable
           key={index}
           defaultPosition={item.defaultPos}
           onStop={(_, date) => {
            updatePos(date, index)
           }}
           >

            <div className="todo_item" style={{backgroundColor: item.color}}>
             {`${item.item}`}
             <button 
              className="delete"
              onClick={() => deleteNode(item.id)}
             >
              x
             </button>
            </div>
          </Draggable>
         )
        })
      }
    </div>
  );
}

export default App;
