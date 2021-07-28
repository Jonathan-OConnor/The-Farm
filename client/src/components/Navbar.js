
import React from "react"
import { Link } from "react-router-dom"
function Navbar(props) {
    function active() {
        if (props.isAuthed) {
            switch (props.active) {
                case "home":
                    return (<div>
                        <div class="navbar-nav">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                            <Link class="nav-link" to="/calendar">Calendar</Link>
                            <Link class="nav-link" to="/emailer">Emailer</Link>
                        </div>
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
        else {
            return(<div class="navbar-nav">
            <a class="nav-link" href="#OurHistory">Our History</a>
            <a class="nav-link" href="#UpcomingEvents">Upcoming Events</a>
            <a class="nav-link" href="#Photos">Photos</a>
        </div>)
        }
    }

    function logout() {
        if (localStorage.uuid) {
            localStorage.removeItem('uuid')
        }
        if (sessionStorage.uuid) {
            sessionStorage.removeItem('uuid')
        }
        props.setIsAuthed(false)

    }
    return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {active()}
                </div>
                {props.isAuthed ? <div className="d-flex">
                    <button className="btn btn-link" onClick={logout}>Logout</button>
                </div>: "" }

            </div>
        </nav>
    )
}

export default Navbar