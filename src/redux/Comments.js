import * as ActionTypes from './ActionTypes';


export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            return { ...state, isLoading: false, errMess: null, comments: action.payload }

        case ActionTypes.ADD_COMMENTS:
            var comment = action.payload;
            return { ...state, comments: state.comments.concat(comment) };

        case ActionTypes.COMMENT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] }

        default: return state;
    }
}