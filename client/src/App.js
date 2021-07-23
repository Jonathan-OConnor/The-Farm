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
         console.log("running")
         if (localStorage.getItem('uuid')) {
            const body = {
               uuid: localStorage.getItem('uuid'),
               sessionDate: localStorage.getItem('sessionDate')
            }
            const response = await fetch('/api/verify', {
               method: 'put',
               headers: {
                  'Content-Type': 'application/json',
                  'Session': localStorage.session || '',
               },
               body: JSON.stringify(body)
            }).then(res => res.json())
            if (response.status){
               setIsAuthed(true)
            }
         } else if (sessionStorage.getItem('uuid')) {
            const body = {
               uuid: sessionStorage.getItem('uuid'),
               sessionDate: sessionStorage.getItem('sessionDate')
            }
            const response = await fetch('/api/verify', {
               method: 'put',
               headers: {
                  'Content-Type': 'application/json',
                  'Session': localStorage.session || '',
               },
               body: JSON.stringify(body)
            }).then(res => res.json())
            console.log(response)
            if (response.status){
               setIsAuthed(true)
            }
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
               ? <Component isAuthed={authed} setIsAuthed={setIsAuthed}/>
               : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
         />
      )
   }

   return (
      <BrowserRouter>
         <Route exact path='/' render={(props) => (
            <Homepage setIsAuthed={setIsAuthed} isAuthed={isAuthed} />
         )}/>
         <PrivateRoute exact path='/calendar' component={Calendar} authed={isAuthed} />
         <PrivateRoute exact path='/emailer' component={Emailer} authed={isAuthed} />
         <Route exact path='/login' render={(props) => (
            <Login setIsAuthed={setIsAuthed} isAuthed={isAuthed} />
         )} />
      </BrowserRouter>


   )
}

export default App