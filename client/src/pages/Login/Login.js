import React, {useState} from "react"
import {Redirect} from 'react-router-dom'
import "./Login.css"

function Login(props) {
    const [authed, setAuthed] = useState(props.isAuthed)
    const [remember, setRemember] = useState(false)

    async function attemptLogin() {
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const body = {
            username: username,
            password: password
        }
        const response = await fetch('/api/login', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Session': localStorage.session || '',
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        if (response.status){
            if (remember){
                localStorage.setItem('uuid', response.uuid)
                localStorage.setItem('sessionDate', response.sessionDate)
            } else {
                sessionStorage.setItem('uuid', response.uuid)
                sessionStorage.setItem('sessionDate', response.sessionDate)
            }
            props.setIsAuthed(true)
            setAuthed(true)
        }
    }
    function toggleRemember(){
        setRemember(!remember)
    }
    return (
        <div className="vertical-center">
            <div className="container">
                <div className="d-flex justify-content-center" style={{ paddingBottom: "50px" }}>
                    <h1>User Login</h1>
                </div>

                <div>
                    <input type="text" id="username"></input>
                    <label for="username">Username</label>
                </div>
                <div>
                    <input type="password" id="password"></input>
                    <label for="password">Password</label>
                </div>
                <div>
                    <input type="checkbox" id="remember" onClick={toggleRemember}></input>
                    <label for="remember">Remember Me</label>
                </div>
                <button className="btn btn-primary" onClick={attemptLogin}>Log In</button>
            </div>
            {authed ?  <Redirect to={{ pathname: '/', state: { from: props.location } }} /> : ""}
        </div>
    )
}

export default Login