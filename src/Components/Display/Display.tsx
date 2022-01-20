import React, { useEffect, useState } from 'react'
import "./Display.css";
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import morning from "../../assets/morning.jpg";
import afternoon from "../../assets/afternoon.jpg";
import evening from "../../assets/evening.jpg";
import night from "../../assets/night.jpg";
import atmosphere from "../../assets/atmosphere.jpg";
import axios, { AxiosResponse } from 'axios';


// The object to be passecd to the useState of weather
interface weatherData {
    SkyCondition: string,
    windSpeed: string,
    humidity: string,
    temperature: number,
}

function Display(props: any) {

    const [dateState, setDateState] = useState(new Date());
    const [greeting, setGreeting] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [weather, setWeather] = useState<weatherData>();
    const [SearchError, setSearchError] = useState(false);
    const [cityName, setCityName] = useState("");
    const [found, setFound] = useState(false);  // To check if display boxes are to displayed or not
    const [modal, setModal] = useState(false);

    // For the reactstrap modal to open and close
    const toggle = () => {
        setModal(!modal);
    }

    // Getting Time and Date
    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);

    // API call
    useEffect(() => {
        props.input !== "" ?
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.input}&units=metric&appid=32e773e2fe0de1ca58b5261f44ae1cab`)
                .then((response: AxiosResponse) => {
                    // console.log(response!.data);
                    setWeather({
                        SkyCondition: response.data.weather[0].main,
                        windSpeed: response.data.wind.speed,
                        humidity: response.data.main.humidity,
                        temperature: response.data.main.temp,
                    })
                    setCityName(props.input);
                    setFound(true);
                })
                .catch(error => {
                    // console.log("error");
                    setSearchError(true);
                    toggle();
                })
            : axios.get("")
    }, [props.input]);

    // For the Dynamic background URL 
    const style = {
        backgroundStyle: {
            backgroundImage: `url("${imgUrl}")`,
        }
    };

    // Getting Hour to Choose Greeting Accordignly
    const hourNumber = new Date().getHours();
    useEffect(() => {
        if (hourNumber > 4 && hourNumber < 12) {
            setGreeting("morning");
            setImgUrl(morning);
        }
        else if (hourNumber === 12) {
            setGreeting("noon");
            setImgUrl(afternoon);
        }
        else if (hourNumber >= 13 && hourNumber <= 17) {
            setGreeting("afternoon");
            setImgUrl(afternoon);
        }
        else if (hourNumber > 17 && hourNumber <= 18) {
            setGreeting("evening");
            setImgUrl(evening);
        }
        else if (hourNumber >= 19 && hourNumber <= 24) {
            setGreeting("night");
            setImgUrl(night);
        }
        else if (hourNumber >= 0 && hourNumber <= 4) {
            setGreeting("night");
            setImgUrl(night);
        }
    }, [])


    return (
        <>
            {
                found &&
                <div className='scroll-down-div'>
                    <p style={{ textAlign: "center", fontSize: "20px", color: "white" }} className='scroll-down'>Scroll Down 👇🏻</p>
                    <i style={{ textAlign: "center", fontSize: "55px", color: "white" }} className="scroll-down fas fa-angle-double-down"></i>
                </div>
            }

            <div className="container">
                <div style={style.backgroundStyle} className="time-outer-div">
                    <div className="greeting-div">
                        <h6 id="greeting_statement">
                            {`GOOD ${greeting.toUpperCase()}`}
                        </h6>
                    </div>
                    <div className="date-time-div">
                        <div className="time-div">
                            <p className='time-date-text text-right'>
                                {dateState.toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: true,
                                })}
                            </p>
                        </div>
                        <div className="date-div">
                            <p className='time-date-text text-right'>
                                {dateState.toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="city-name-div">
                    {
                        cityName !== "" ?
                            <>
                                <h3 className='text-center font-weight-bold'
                                    style={{
                                        color: "aliceblue",
                                        fontSize: "45px",
                                        marginBottom: "20px",
                                        textShadow: " 2px 2px grey",
                                    }}>AY YO <span className=' text-uppercase'>{cityName}</span>
                                </h3>
                            </>
                            : ""
                    }
                </div>

                {found &&
                    <div className="data-display-div">
                        <div className="d-flex flex-xs-column flex-row  justify-content-center flex-wrap">
                            <div className='box' id="box1">
                                <div className="property-logo">
                                    <img src={atmosphere} alt="mist" />
                                </div>
                                <div className="property-value">
                                    <p>Atmosphere</p>
                                    <p>{weather?.SkyCondition}</p>
                                </div>
                            </div>
                            <div className='box' id="box1">
                                <div className="property-logo">
                                    <i style={{ fontSize: "55px" }} className="fas fa-wind"></i>
                                </div>
                                <div className="property-value">
                                    <p>Wind</p>
                                    <p>{weather?.windSpeed}m/s</p>
                                </div>
                            </div>
                            <div className='box' id="box1">
                                <div className="property-logo">
                                    <i style={{ fontSize: "55px" }} className="fas fa-tint"></i>
                                </div>
                                <div className="property-value">
                                    <p>Humidity</p>
                                    <p>{weather?.humidity}%</p>
                                </div>
                            </div>
                            <div className='box' id="box1">
                                <div className="property-logo">
                                    <i style={{ fontSize: "55px" }} className="fas fa-thermometer-empty"></i>
                                </div>
                                <div className="property-value">
                                    <p>Temerature</p>
                                    <p>{weather?.temperature}°C / {weather?.temperature !== undefined ? ((weather?.temperature * 1.8) + 32).toFixed(2) : ""}°F</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {
                SearchError &&
                <div style={{ margin: "50px" }}>
                    <Modal funk="true" isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>City Not found</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" onClick={toggle}>Go Back</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            }
        </>
    )
}

export default Display
