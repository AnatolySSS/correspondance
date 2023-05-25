import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import appReducer from "./reducers/app-reducer";
import authReducer from "./reducers/auth-reducer";
import sideBarReducer from "./reducers/side-bar-reducer";
import corrAppReducer from "./reducers/corr-app-reducer";
import corrFoReducer from "./reducers/corr-fo-reducer";
import corrFuReducer from "./reducers/corr-fu-reducer";
import preloaderReducer from "./reducers/preloader-reducer";

let reducers = combineReducers({
    corrApp: corrAppReducer,
    corrFo: corrFoReducer,
    corrFu: corrFuReducer,
    sideBar: sideBarReducer,
    auth: authReducer,
    app: appReducer,
    preloader: preloaderReducer,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store