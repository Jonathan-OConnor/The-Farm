import React from "react"
import Grow from '@material-ui/core/Grow';
import Navbar from "../../components/Navbar"
import "./homepage.css"

function Homepage() {

    return (
        <div>
            <Navbar active="home"/>
            <div className="container">
                <Grow in={true}>
                    <div className="row" id="TitleBlock">
                        <div className="col-8">
                            <div className="row">
                                <h1>Welcome to the Farm</h1>
                            </div>
                            <div className="row">
                                <p>Description about farm goes here</p>
                            </div>
                        </div>
                        <div className="col-4" style={{ padding: '0px' }}>
                            <img src="https://blog.ed.gov/files/2019/08/AdobeStock_221344370.jpeg" style={{ width: "100%", padding: "0px" }} />
                        </div>
                    </div>
                </Grow>
            </div>

        </div>


    )
}

export default Homepage