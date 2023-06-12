interface AppReducerState {
    listUser: any | null
}

export type AppReducerAction = { type: 'SET_LIST_USER' ; listUser: any}

const defaultState = {
    listUser: null
} as AppReducerState;

export default function listReducer(
    state = defaultState,
    action: AppReducerAction
) {
    switch (action.type) {
        case 'SET_LIST_USER':
            return {
                ...state,
                listUser: action.listUser
            }
        default:
            return state;
    }
}