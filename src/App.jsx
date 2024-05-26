import './App.css'
import Canvas from './Canvas'

function App() {
  
  const clickButton = () => {
    console.log('click button')
  }

  return (
    <div>
      <button onClick={() => clickButton()}>
        Button
      </button>
      <Canvas></Canvas>
    </div>
  )
}

export default App
