import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import { Reducer } from "redux";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage'
import { initialStateModel } from './initialState';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
}
const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);
export default function configureStore(initialState: initialStateModel)
{
    const composeEnhancers = composeWithDevTools || compose;
    let store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())))
    let persistor = persistStore(store)
    return { store, persistor }
}