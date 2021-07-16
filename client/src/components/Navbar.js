
import React from "react"
import {Link} from "react-router-dom"
function Navbar(props) {
    function active() {
        switch (props.active) {
            case "home":
                return (<div class="navbar-nav">
                    <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                    <Link class="nav-link" to="/calendar">Calendar</Link>
                    <Link class="nav-link" to="/emailer">Emailer</Link>
                </div>)

            case "calendar":
                return (<div class="navbar-nav">
                <Link class="nav-link" aria-current="page" to="/">Home</Link>
                <Link class="nav-link active" to="/calendar">Calendar</Link>
                <Link class="nav-link" to="/emailer">Emailer</Link>
            </div>)
            case "emailer":
                return (<div class="navbar-nav">
                <Link class="nav-link" aria-current="page" to="/">Home</Link>
                <Link class="nav-link " to="/calendar">Calendar</Link>
                <Link class="nav-link active" to="/emailer">Emailer</Link>
            </div>)
            default:
                return (<div class="navbar-nav">
                <Link class="nav-link" aria-current="page" to="/">Home</Link>
                <Link class="nav-link " to="/calendar">Calendar</Link>
                <Link class="nav-link" to="/emailer">Emailer</Link>
            </div>)
        }
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {active()}
                </div>
            </div>
        </nav>
    )
}

export default Navbar