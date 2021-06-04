
import React from "react"

function Navbar(props) {
    function active() {
        switch (props.active) {
            case "home":
                return (<div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                    <a class="nav-link" href="/calendar">Calendar</a>
                </div>)
         
            case "calendar":
                return (<div class="navbar-nav">
                    <a class="nav-link" aria-current="page" href="/">Home</a>
                    <a class="nav-link active" href="/calendar">Calendar</a>
                </div>)
                
            default: 
                return(<div class="navbar-nav">
                <a class="nav-link" aria-current="page" href="/">Home</a>
                <a class="nav-link " href="/calendar">Calendar</a>
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