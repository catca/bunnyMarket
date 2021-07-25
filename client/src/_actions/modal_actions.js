import {
    MODAL_OPEN,
    MODAL_CLOSE,
} from '../_actions/types';

export function modalOpen(){
    
    return {
        type: MODAL_OPEN,
        payload: true
    }
}

export function modalClose(){
    
    return {
        type: MODAL_CLOSE,
        payload: false
    }
}

