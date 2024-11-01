import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import UsersTable from './pages/UsersTable'

const MyRoutes = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<MainPage/>}></Route>
                <Route path='/userdetails' element={<UsersTable/>}></Route>
            </Routes>
        </Router>
    </div>
  )
}

export default MyRoutes