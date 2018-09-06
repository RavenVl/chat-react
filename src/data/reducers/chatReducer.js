import * as dataType from '../actions/dataType';

const defaultState = {
    user: {}
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case dataType.USER_LOGIN:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};
export default reducer;