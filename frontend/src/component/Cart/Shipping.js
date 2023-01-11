import React, { Fragment, useState } from "react";
import "./Shipping.css";
import {
    MdPinDrop,
    MdHome,
    MdLocationCity,
    MdPublic,
    MdPhone,
    MdTransferWithinAStation,
} from "react-icons/md";
import MetaData from "../layout/MetaData";
import { Country, State } from "country-state-city"; // need to install a package to get all the cities and State of all countries
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import CheckOutSteps from "./CheckOutSteps.js";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";




const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhonNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        // console.log("shipping submit");
        e.preventDefault(); // not to load the page 
        if(phoneNo.length > 10 || phoneNo.length < 10){
            alert.error("Phone no should be of 10 digits");
            return;
        }
        else{
            dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo})); // we need to send the data from here to cartAction.js 
            navigate('/order/confirm'); // redirect to this confirm page with a thank note
        }
    }


    return (
        <Fragment>
            <MetaData title="Shipping Details - ECOMMERCE"/>
            <CheckOutSteps activeStep={0}/>
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping details</h2>
                    <form
                        className="shippingForm"
                        onSubmit={shippingSubmit}
                        encType="multipart/form-data" // 
                    >
                        <div>
                            <MdHome />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdLocationCity/>
                            <input 
                                type="text" 
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdPinDrop/>
                            <input 
                                type="number"
                                placeholder="Pincode" 
                                required
                                value={pinCode}
                                onChange={(e)=>setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdPhone/>
                            <input 
                                type="number"
                                placeholder="Phone"
                                required
                                value={phoneNo}
                                onChange={(e)=>setPhonNo(e.target.value)}
                                size="10" // number must be 10 character long
                            />
                        </div>

                        <div>
                            <MdPublic/>
                            <select 
                                required
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                            >   
                            <option value="">Country</option>
                                {   Country && Country.getAllCountries().map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        {country && (
                            <div>
                                <MdTransferWithinAStation/>
                                <select 
                                    required
                                    value={state}
                                    onChange={(e)=>setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {
                                        State && State.getStatesOfCountry(country).map((item)=>(
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        )}

                        <input  
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state?false:true} // if state is then only work 
                         />

                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
