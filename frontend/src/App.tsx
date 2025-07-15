import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeeListPage from './pages/EmployeeListPage'
import EmployeeAddPage from './pages/EmployeeAddPage'
import EmployeeUpdateDetailsPage from './pages/EmployeeUpdatePage'
import AIChatbot from './pages/AIChatbot';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import LoginPage from './pages/LoginPage'

function App() {


  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
          <Route path="/chatbot" element={<AIChatbot />} />
          <Route path='/addEmployee' element={<EmployeeAddPage /> } />
          <Route path='/updateEmployee/:id' element={<EmployeeUpdateDetailsPage/> } />
          <Route path="/" element={<EmployeeListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
