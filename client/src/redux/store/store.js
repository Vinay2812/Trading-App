import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import logger from "../../utils/logger";
import reducers from "../reducer"


function saveToLocalStorage(store) {
    try {
        if (store === undefined || store.authReducer == null || store.authReducer.authData === null) return;
        const serializedStore = JSON.stringify(store);
        localStorage.setItem('store', serializedStore);
    } catch (e) {
        logger.error(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if (serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch (e) {
        logger.error(e)
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();
const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));
store.subscribe(() => { 
    saveToLocalStorage(store.getState()) 
});

export default store;

