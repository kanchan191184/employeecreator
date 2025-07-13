import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeeListPage from './pages/EmployeeListPage'
import EmployeeAddPage from './pages/EmployeeAddPage'
import EmployeeUpdateDetailsPage from './pages/EmployeeUpdatePage'
// import LoginPage from './pages/LoginPage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path="/auth" element={<LoginPage />} /> */}
          <Route path='/addEmployee' element={<EmployeeAddPage /> } />
          <Route path='/updateEmployee/:id' element={<EmployeeUpdateDetailsPage/> } />
          <Route path="/" element={<EmployeeListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
