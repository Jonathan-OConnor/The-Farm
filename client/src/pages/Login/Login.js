import React from "react"
import "./Login.css"
function Login(props) {
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
        console.log(response.status)
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
                    <input type="checkbox" id="remember"></input>
                    <label for="remember">Remember Me</label>
                </div>
                <button className="btn btn-primary" onClick={attemptLogin}>Log In</button>
            </div>

        </div>
    )
}

export default Login