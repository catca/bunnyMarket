import {
    MODAL_OPEN,
    MODAL_CLOSE,
} from '../_actions/types';

export default function(state={},action){
    switch(action.type){
        case MODAL_OPEN:
            return {...state, visible: action.payload }
        case MODAL_CLOSE:
            return { ...state, visible: action.payload }
        default:
            return state;
    }
}