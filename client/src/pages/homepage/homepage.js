import React, { useState, useEffect } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from "../../components/Navbar"
import "./homepage.css"

function Homepage(props) {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function getEvents() {
            const { status, message, eventList } = await fetch('/api/event', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Session': localStorage.session || ''
                }
            }).then(res => res.json())
            // add yearly recurring events
            const yearlyArray = addYearlies(eventList)
            const oldYearlyArray = addYearliesPast(eventList)
            const final = [...eventList, ...yearlyArray, ...oldYearlyArray]
            setEvents(final)
            setLoading(false)
        }
        getEvents()
    }, [])

    // page javascript functions
    function addYearlies(eventList) {
        const yearlyArray = []
        for (var i = 0; i < eventList.length; i++) {
            if (eventList[i].yearly) {
                const startYear = parseInt(eventList[i].date.substring(0, 4))
                const endString = eventList[i].date.substring(4, eventList[i].date.length)
                for (var j = 1; j < 51; j++) {
                    const newYear = startYear + j
                    const newDate = newYear.toString() + endString
                    const event = {
                        date: newDate,
                        title: eventList[i].title,
                        description: eventList[i].description,
                        _id: eventList[i]._id,
                        yearly: eventList[i].yearly
                    }
                    yearlyArray.push(event)
                }
            }
        }
        return yearlyArray
    }
    function addYearliesPast(eventList) {
        const yearlyArray = []
        for (var i = 0; i < eventList.length; i++) {
            if (eventList[i].yearly) {
                const startYear = parseInt(eventList[i].date.substring(0, 4))
                const endString = eventList[i].date.substring(4, eventList[i].date.length)
                for (var j = 1; j < 51; j++) {
                    const newYear = startYear - j
                    const newDate = newYear.toString() + endString
                    const event = {
                        date: newDate,
                        title: eventList[i].title,
                        description: eventList[i].description,
                        _id: eventList[i]._id,
                        yearly: eventList[i].yearly
                    }
                    yearlyArray.push(event)
                }
            }
        }
        return yearlyArray
    }
    return (
        <div >
            <Navbar active="home" isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} />
            <div className="homePageBanner" style={{ backgroundImage: `url("images/landingpage.jpg")` }}>
                <div className="row d-flex justify-content-center">
                    <div style={{ width: "30vw" }}>
                        <div className="" >
                            <Fade in={true} timeout={1000}>
                                <div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center">
                                            <img src="images/logo.png" alt="Farm Logo" id="farmLogo" />
                                        </div>
                                    </div>
                                    <h1 className="text-center sectionTitle">Welcome to the O'Connor Family Farm</h1>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ourHistory" id="OurHistory">
                <h1 className="text-center sectionTitle">Our History </h1>
                <div className="container" >
                    <div className="row">
                        <div className="col-4" >
                            <img id="ourHistoryImage" src="/images/ourHistory.jpg" style={{ width: "100%" }} />
                        </div>
                        <div className="col-8" style={{ paddingTop: "50px" }}>
                            <p id="ourHistoryText">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mauris mauris, vestibulum id imperdiet sed, finibus id nunc. Nunc auctor ac turpis nec ultrices. Phasellus in feugiat orci, at convallis nisi. Donec tincidunt et velit id imperdiet. Aliquam risus nibh, venenatis in scelerisque sit amet, bibendum non nisi. Sed maximus lacus vitae elementum facilisis. Integer quis mi dui.

                                Donec hendrerit ipsum in nisl tincidunt fringilla. Morbi sollicitudin ex et lacus porttitor congue at quis augue. Maecenas id ultrices lectus. Curabitur urna arcu, tincidunt eu purus commodo, tempus ornare nunc. Vestibulum eget urna aliquet, cursus dui eu, rhoncus magna. In vitae nisl hendrerit, sagittis quam vel, porttitor lacus. In sit amet dui eu odio porttitor convallis ut vitae arcu. Donec tincidunt vehicula rhoncus. Nam semper, est quis eleifend placerat, magna mauris lobortis tellus, non sagittis nisl sapien ac leo.

                                Pellentesque et sagittis urna. Aenean id sollicitudin dui, eget consequat orci. Sed sed hendrerit felis. Nunc et laoreet leo, in rutrum mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras tincidunt a dolor vitae hendrerit. Nam a rutrum magna. Nam eget nisl in eros sagittis consequat ullamcorper vel velit. Sed aliquam leo sem, id vestibulum elit pellentesque at.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: "50px", marginBottom: "50px" }} id="UpcomingEvents">
                <h1 className="text-center sectionTitle">Upcoming Events</h1>
                <div className="container">
                    {loading ? <CircularProgress /> : <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                    />}
                </div>

            </div>
            <div className="PhotoGallerySection" id="Photos">
                <h1 className="text-center sectionTitle">Photo Gallery </h1>
                <div className="container">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="/images/gallery0.jpeg" class="d-block w-100" alt="gallery image 1" style={{ maxWidth: "1000px", maxHeight: "1000px" }} />
                            </div>
                            <div class="carousel-item">
                                <img src="/images/gallery1.jpeg" class="d-block w-100" alt="..." style={{ maxWidth: "1000px", maxHeight: "1000px" }} />
                            </div>
                            <div class="carousel-item">
                                <img src="/images/gallery2.jpeg" class="d-block w-100" alt="..." style={{ maxWidth: "1000px", maxHeight: "1000px" }} />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

            </div>
            <div className="container">
                <a href="/login">User Page</a>
            </div>
        </div>


    )
}

export default Homepage