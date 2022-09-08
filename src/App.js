import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import logo from './images/logo/2.svg'
// import Navbar from './Component/Navbar';
import Loader from './Component/Loader';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import DetailModal from './Component/DetailModal';

function App() {
    const [phone, setPhone] = useState("");
    const [resData, setDataResponse] = useState("")
    const [phoneError, setPhoneError] = useState("");
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    


    const axiosConfig = {
        headers: {
            'x-api-key': 'oUze08xJB35YIl75qBirl1TRyz9uiB1u413dgQls',
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    }
    function addCharacterToString(stringData, newCharacter) {
        return newCharacter.concat(stringData);
    }


    const body = {
        "phone": addCharacterToString(phone, '+')
    }

    const baseURL = "https://6y4q0774wl.execute-api.us-east-1.amazonaws.com/default/trucallercontacts_API_numberleaks";
    const numberLeaks = async (event) => {
        event.preventDefault();
        if (phone) {
            setLoader(true);
            try {
                const res = await axios.post(baseURL,
                    body,
                    axiosConfig
                )
                setLoader(false);
                let response = res?.data?.responseData;
                if (response === "") {
                    setLoader(false);
                    setPhoneError("No Recourd Found");
                    return false;
                } else {
                    setPhoneError("");
                }
                if (response !== "") {
                    setLoader(false);
                    console.log(res.data.responseData, "response")
                    setDataResponse(res.data.responseData)
                    setOpen(true)

                }
                console.log(res.data.responseData, "response")
            } catch (error) {
                console.log(error, "error")
                setPhoneError(error.responseMessage)
            }
        }
        else {
            setPhoneError("Please enter phone number")
        }
    }
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    return (
        <div>
            <div className="pageWrapper">
                <div className="container-fluid">
                    <canvas id='canvas' className='screen-bg canvasStyle'></canvas>
                    {/* <Navbar /> */}
                    <div className="mainContainer d-flex flex-column align-items-center justify-content-center ">
                        <div className="search-input">
                            <div className="brand-logo">
                                <img src={logo} alt="" />
                            </div>
                            <form className="form-floating" onSubmit={numberLeaks } >
                                <PhoneInput
                                    name="phone"
                                    type="text"
                                    id="floatingInputInvalid"
                                    country="pk"
                                    inputClass="form-control"
                                    enableAreaCodes={true}
                                    placeholder="Find Phone no details and ID"
                                    inputProps={{
                                        name: "phone",
                                        country: "Pakistan",
                                        required: true,
                                        autoFocus: true,

                                    }}
                                    value={phone}
                                    onChange={event => setPhone(event)}
                                    onEnterKeyPress={numberLeaks}
                                    inputStyle={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "30px",
                                        background: "#EDEDED",
                                        borderWidth: " 1px !important",
                                    }}
                                    dropdownClass={{
                                        paddingRight: "30px"
                                    }}
                                />
                                <button className="inputIcons" type='submit'  >
                                    {loader ? (
                                        <Loader />
                                    ) : (
                                        <div className="searchIcon" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </div>
                                    )}
                                </button>
                            </form>
                            {phoneError ? <div className="error-msg" >{phoneError}</div> : ""}
                        </div>
                    </div>
                </div>
            </div>
            {open && (
                <DetailModal
                    setOpen={setOpen}
                    detail={resData}
                    open={open}
                />
            )}
        </div>

    );
}

export default App;

