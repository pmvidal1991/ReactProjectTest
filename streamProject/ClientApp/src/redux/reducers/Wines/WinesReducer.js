"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wine = exports.WineError = exports.AddWineError = exports.winesIsLoading = exports.WinesError = exports.Wines = void 0;
var types = require("../../actions/actionTypes");
function Wines(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case types.GET_WINES_SUCCESS: {
            return action.Wines;
        }
        default: {
            return state;
        }
    }
}
exports.Wines = Wines;
function WinesError(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case types.GET_WINES_ERROR: {
            return action.WinesError;
        }
        default: {
            return state;
        }
    }
}
exports.WinesError = WinesError;
function winesIsLoading(state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case types.WINES_IS_LOADING:
            return action.iswinesLoading;
        default: {
            return state;
        }
    }
}
exports.winesIsLoading = winesIsLoading;
function AddWineError(state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case types.ADD_WINE_ERROR: {
            return action.AddWineError;
        }
        default: {
            return state;
        }
    }
}
exports.AddWineError = AddWineError;
function WineError(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case types.GET_WINE_BY_ID_ERROR: {
            return action.WineError;
        }
        default: {
            return state;
        }
    }
}
exports.WineError = WineError;
function Wine(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case types.GET_WINE_BY_ID_SUCCESS: {
            return action.Wine;
        }
        default: {
            return state;
        }
    }
}
exports.Wine = Wine;
//# sourceMappingURL=WinesReducer.js.map