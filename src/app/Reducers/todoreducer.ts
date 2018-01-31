import { Action } from '@ngrx/store';

export const ACTIONS = {
    GET_TODO: 'GET_TODO',
    ADD_TODO: 'ADD_TODO',
    DELETE_TODO: 'DELETE_TODO',
    UPDATE_TODO: 'UPDATE_TODO'
};

export function todoreducer  (state: Array<any> = [], action: Action) {
    switch (action.type) {
        case ACTIONS.GET_TODO:
         console.log('here');
         return action.payload;
         default:
         return state;
    }
}
