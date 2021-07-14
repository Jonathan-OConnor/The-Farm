import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'


//pages
import Homepage from "./pages/homepage/homepage"
import Calendar from './pages/calendar/calendar'
import Emailer from './pages/Emailer/Emailer'
import Login from './pages/Login/Login'

function App() {
   function PrivateRoute ({component: Component, authed, ...rest}) {
      return (
        <Route
          {...rest}
          render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
      )
    }

   return (
      <BrowserRouter>
         <Route exact path='/' component={Homepage} />
         <PrivateRoute  path='/calendar' component={Calendar} authed={false}/>
         <PrivateRoute  path='/emailer' component={Emailer} authed={false}/>
         <Route exact path='/login' component={Login}/>
      </BrowserRouter>


   )
}

export default App