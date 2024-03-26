import React from 'react'
import PropTypes from 'prop-types'




const Weatherdetails= ({snowIcon, WeTemp, Wecity, Wecountry, Welat, Welog, Wehum, Wewind, Wetexthum, Wetextwind}) => {
  return (
    <>
    <div className='snow'>
        <img src={snowIcon} alt='Snow' width={100}/>
    </div>
    <div className="temperture common">{WeTemp}&#176;C</div>
    <div className="city common">{Wecity}</div>
    <div className="country common">{Wecountry}</div>
    <div className="cord">
      <div>
        <span className="latiude">latitude</span>
        <span>{Welat}</span>
      </div>
      <div>
        <span className="loiude">longitude</span>
        <span>{Welog}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
      <img src={Wehum} alt='humidty' className='comImg' width={70}/>
      <div className="data">
        <div className="humdity comIcon">{Wetexthum}%</div>
        <div className="text comText">Humidity</div>
        </div>
      </div>
      <div className="element">
      <img src={Wewind} alt='wind' className='comImg' width={70}/>
      <div className="data">
        <div className="humdity comIcon">{Wetextwind} Km/h</div>
        <div className="text comText">Wind speed</div>
        </div>
      </div>
    </div>
    </>
  )
  Weatherdetails.propTypes ={
     snowIcon:PropTypes.string.isRequired,
     WeTemp:PropTypes.number.isRequired,
     Wecity:PropTypes.string.isRequired,
     Wecountry:PropTypes.string.isRequired,
     Welat:PropTypes.number.isRequired,
     Welog:PropTypes.number.isRequired,
     Wetexthum:PropTypes.number.isRequired,
     Wetextwind:PropTypes.number.isRequired,
     Wehum:PropTypes.string.isRequired,
     Wewind:PropTypes.string.isRequired
    }
};

export default Weatherdetails;