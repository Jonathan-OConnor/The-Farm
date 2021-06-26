import React from "react"
import Grow from '@material-ui/core/Grow';
import Navbar from "../../components/Navbar"
import "./homepage.css"

function Homepage() {

    return (
        <div >
            <Navbar active="home" />
            <div className="homePageBanner d-flex justify-content-center" style={{backgroundImage: `url("images/landingpage.jpg")`}}>
                <img src="images/logo.png" alt="Farm Logo" id="farmLogo"/>
            </div>
       
     

        </div>


    )
}

export default Homepage