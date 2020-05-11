export default function fullWeatherReducer(state, action){
    switch(action.type){
        case "GET_FULL_WEATHER":
            return {
                ...state,
                error: null,
                loading: false,
                all: action.payload
            }
        case "FULL_WEATHER_ERROR":
            return {
                ...state,
                loading: false,
                all: "No Weather",
                error: action.payload
            }
        
        case "CLEAR_FULL_WEATHER":
            return {
                ...state,
                error: null,
                loading: true,
                all: null
            }   

        default:
            return{
                ...state
            }
    }
};