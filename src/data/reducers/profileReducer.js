import * as dataType from '../actions/dataType';

const defaultState = {
    profile: {}
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case dataType.GET_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        default:
            return state;
    }
};
export default reducer;