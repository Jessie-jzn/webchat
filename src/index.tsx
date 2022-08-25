import React from 'react'
import ReactDOM from 'react-dom'
import ImWorkBox from './pages/index'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import 'antd/dist/antd.css'
import '@styles/_index.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ImWorkBox />} />
        <Route path='/' element={<Navigate replace to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
