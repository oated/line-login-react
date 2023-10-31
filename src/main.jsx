import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, RouterProvider, Route, Link, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
import Merchant from './components/Merchant.jsx'
import Profile from './components/Profile.jsx'
import LinePush from './components/LinePush'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "merchant",
    element: <Merchant />
  },
  {
    path: "profile",
    element: <Profile />
  },
  {
    path: "linepush",
    element: <LinePush />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
