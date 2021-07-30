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
                <h1 className="text-center sectionTitle">Our Story </h1>
                <div className="container" >
                    <div className="row">
                        <div className="col-4" style={{ paddingRight: "50px" }}>
                            <img id="ourHistoryImage" src="/images/ourHistory.jpg" style={{ width: "100%" }} />
                        </div>
                        <div className="col-8" style={{ paddingTop: "50px" }}>
                            <p id="ourHistoryText">
                                Our family tree traces its roots back to County Kerry, Ireland and our ancestors Maurice and Mary, who immigrated to Godmanchester in 1830. They made the Atlantic crossing with their sons Michael and James. Over the next few generations, the Irish community in Godmanchester would become concentrated along a region colloquially referred to as the Irish Ridge. Because the Irish shared religion, lifestyle, and dairy farming-derived work ethic with the French Québécois cohabiting the area, many families eventually intermarried. The Shamrock and Fleur de Lys, symbols of both cultures, found a place to flourish and prosper.
                                <br />
                                <br />
                                In 1921, Patrick O’Connor and his spouse Stella Walsh purchased 110 acres from John Allan Smellie on the Irish Ridge, just west of Clyde Corners in Godmanchester, Quebec. They made their home here for three decades until 1951, when their son Walter and his wife Joan purchased the property. On their dairy farm, Walter and Joan raised nine children, instilling a strong work ethic and a reverence of family values.
                                <br />
                                <br />
                                One hundred years have passed, and this homestead remains, resolute and restored. It has been the host of a myriad of memories and gatherings, and will be the place where new memories and gatherings happen. It has been the place that Walter and Joan’s children returned to time and time again, and will be the place that their grandchildren and great-grandchildren can find solace. It has been the place that we call home, and will be, always, “The Farm”.
                                <br />
                                <br />
                                We celebrate our history by using this property to remember the sacrifice, effort and love it took to offer hope and pride for generations to come.
                            </p>
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