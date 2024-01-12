import { useSelector } from 'react-redux';
import './App.css'

function App() {
  const state = useSelector((state => state))
  console.log(state)

  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
