import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

//pages
import Homepage from "./pages/homepage/homepage"
import Calendar from './pages/calendar/calendar'
import Emailer from './pages/Emailer/Emailer'
import Login from './pages/Login/Login'

function App() {
   return (
      <BrowserRouter>
         <Route exact path='/' component={Homepage} />
         <Route exact path='/calendar' component={Calendar} />
         <Route exact path='/emailer' component={Emailer} />
         <Route exact path='/login' component={Login}/>
      </BrowserRouter>


   )
}

export default App