import React from "react"
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade'
import Navbar from "../../components/Navbar"
import "./homepage.css"

function Homepage() {

    return (
        <div >
            <Navbar active="home" />
            <div className="homePageBanner" style={{ backgroundImage: `url("images/landingpage.jpg")` }}>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <img src="images/logo.png" alt="Farm Logo" id="farmLogo" />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div style={{ width: "30vw" }}>
                        <div className="" >
                            <Fade in={true} timeout={1000}>
                                <h1 className="text-center" id="landingPageTitle">Welcome to the O'Connor Family Farm</h1>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ourHistory">
                <h1 className="text-center">The History </h1>
            </div>


        </div>


    )
}

export default Homepage