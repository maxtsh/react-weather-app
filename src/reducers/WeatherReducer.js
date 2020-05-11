export default function weatherReducer(state, action){
    switch(action.type){
        case "GET_WEATHER":
            return {
                ...state,
                error: null,
                loading: false,
                weather: action.payload
            }
        case "WEATHER_ERROR":
            return {
                ...state,
                loading: false,
                weather: null,
                error: action.payload
            }
        
        case "CLEAR_WEATHER":
            return {
                ...state,
                error: null,
                loading: true,
                weather: null
            }   
        default: 
            return{
                ...state
            }
    }
};