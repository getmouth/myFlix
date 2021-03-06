import {types} from '../actions/comments';

const initialState = [];

const ratingReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${types.GETCOMMENTS}_SUCCESS`:
      return action.data;

    case `${types.POSTCOMMENTS}_SUCCESS`:
      return [state, ...action.data]
      
    default:
      return state;
  }
}

export default ratingReducer;