
import './index.css'
import Create from './create.tsx'
import {Route, Routes} from 'react-router-dom'
import Update from './update.tsx'

const App = () => {


  return (
    <div>
       <div className="App">
      <div className='header'>
        <h1>React JS CRUD</h1>
        <button className='border border-amber-200 rounded-md p-2 bg-amber-200 text-black font-bold '
        onClick={() => 
        window.location.href = '/create'
        }>
          Create
          </button>
      </div>
    </div>

        <Routes>
         
          <Route path="/create" element={<Create/>} />
          <Route path="/update" element={<Update/>} />
        </Routes>



   


    </div>
  )
}

export default App
