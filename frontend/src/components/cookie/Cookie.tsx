import React, { useState } from 'react';
import "./cookie.scss";

const Cookie = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAccept = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300); 
  };

  const handleReject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300); 
  };

  return (
    <>
      {isVisible && (
        <div className={`cookie ${isAnimating ? 'animating' : ''}`}>
          <div className="container">
            <div className="cookie__box">
              <p className="cookie__text">
                We use cookies to enhance your experience on our site. Please select “Accept All” or “Reject” to continue.
              </p>
              <div className="cookie__buttons">
                <button className="cookie__button accept" onClick={handleAccept}>Accept All</button>
                <button className="cookie__button reject" onClick={handleReject}>Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cookie;
