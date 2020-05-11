export default function languageReducer(state, action){
    switch(action.type){
        case "CHANGE_LANGUAGE":
            return{
                ...state,
                current: action.payload
            }

        default:
            return{
                ...state
            }
    }
};