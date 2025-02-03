import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StoreList from './stores/storeslist.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
        <img src="/Restaurant4.jpg" className="logo" alt="Restaurant Image" />
        </a>
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>Online Shop</h1>
      <div className="card">
        <p>
          Shop Everything you want
        </p>
        <h1>
          Products
        </h1>
        <StoreList/>
      </div>
    </>
  )
}

export default App
