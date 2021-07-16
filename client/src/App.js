import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'


//pages
import Homepage from "./pages/homepage/homepage"
import Calendar from './pages/calendar/calendar'
import Emailer from './pages/Emailer/Emailer'
import Login from './pages/Login/Login'

function App() {

   const [isAuthed, setIsAuthed] = useState(false)

   useEffect(() => {
      async function verify() {
         if (localStorage.getItem('uuid')) {
            const response = await fetch('/api/verify', {
               method: 'put',
               headers: {
                  'Content-Type': 'application/json',
                  'Session': localStorage.session || '',
               },
               body: JSON.stringify(localStorage.getItem('uuid'))
            }).then(res => res.json())
         } else if (sessionStorage.getItem('uuid')) {
            const response = await fetch('/api/verify', {
               method: 'put',
               headers: {
                  'Content-Type': 'application/json',
                  'Session': localStorage.session || '',
               },
               body: JSON.stringify(sessionStorage.getItem('uuid'))
            }).then(res => res.json())
         }
      }
      verify()
   }, [])
   console.log("isAuthed:", isAuthed)
   function PrivateRoute({ component: Component, authed, ...rest }) {
      return (
         <Route
            {...rest}
            render={(props) => authed === true
               ? <Component {...props} />
               : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
         />
      )
   }

   return (
      <BrowserRouter>
         <Route exact path='/' component={Homepage} />
         <PrivateRoute path='/calendar' component={Calendar} authed={isAuthed} />
         <PrivateRoute path='/emailer' component={Emailer} authed={isAuthed} />
         <Route exact path='/login' render={(props) => (
            <Login setIsAuthed={setIsAuthed} isAuthed={isAuthed} />
         )} />
      </BrowserRouter>


   )
}

export default App