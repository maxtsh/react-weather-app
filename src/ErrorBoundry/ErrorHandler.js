import React from 'react';

const languages = {
    English: {
        errMessage: "We are sorry about this but"
    },
    Persian: {
        errMessage: "متاسفانه خطایی رخ داده است که"
    }
};

// **** This Component handles the errors happening withing Async Calls
export default function ErrorHandler({ message, currentLang }){
    
    return(
        <div className="error-wrapper">
            <i className="fas fa-exclamation-circle"></i>
            <h3 className="error-message">{languages[currentLang].errMessage + " " + message}!</h3>
        </div>
    )
};