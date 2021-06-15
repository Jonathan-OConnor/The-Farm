import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

//pages
import Homepage from "./pages/homepage/homepage"
import Calendar from './pages/calendar/calendar'
import Emailer from './pages/Emailer/Emailer'

function App() {
   return (
      <BrowserRouter>
         <Route exact path='/' component={Homepage} />
         <Route exact path='/calendar' component={Calendar} />
         <Route exact path='/emailer' component={Emailer} />
      </BrowserRouter>


   )
}

export default App