"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.winesisLoading = exports.getWineById = exports.getWineByIdSuccess = exports.setWines = exports.AddWineError = exports.getWineByIdError = exports.getWinesError = exports.getWinesSuccess = void 0;
var types = require("./actionTypes");
var WineApi = require("../../api/WineApi");
var GetWinesErrorMessage = 'An error has occured while trying geting the list: ';
var GetWineErrorMessage = "An error has occured while trying geting the wine: ";
var AddWineErrorMessage = "An error has occured while trying to add the wine: ";
function getWinesSuccess(Wines) {
    return { type: types.GET_WINES_SUCCESS, Wines: Wines };
}
exports.getWinesSuccess = getWinesSuccess;
function getWinesError(Error) {
    return { type: types.GET_WINES_ERROR, WinesError: { isError: Error && Error.isAxiosError !== undefined ? Error.isAxiosError : false, errorMessage: Error && Error.message !== undefined ? GetWinesErrorMessage + Error.message : '' } };
}
exports.getWinesError = getWinesError;
function getWineByIdError(Error) {
    return { type: types.GET_WINE_BY_ID_ERROR, WineError: { isError: Error && Error.isAxiosError !== undefined ? Error.isAxiosError : false, errorMessage: Error && Error.message !== undefined ? GetWineErrorMessage + Error.message : '' } };
}
exports.getWineByIdError = getWineByIdError;
function AddWineError(Error) {
    return { type: types.ADD_WINE_ERROR, AddWineError: { isError: Error && Error.isAxiosError !== undefined ? Error.isAxiosError : false, errorMessage: Error && Error.message !== undefined ? AddWineErrorMessage + Error.message : '' } };
}
exports.AddWineError = AddWineError;
function setWines(filters) {
    return function (dispatch) {
        return __awaiter(this, void 0, void 0, function () {
            var WinesResp, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, WineApi.GetWines(filters)];
                    case 1:
                        WinesResp = _a.sent();
                        return [2 /*return*/, dispatch(getWinesSuccess(WinesResp.data))];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, dispatch(getWinesError(error_1))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
}
exports.setWines = setWines;
function getWineByIdSuccess(Wine) {
    return { type: types.GET_WINE_BY_ID_SUCCESS, Wine: Wine };
}
exports.getWineByIdSuccess = getWineByIdSuccess;
function getWineById(id) {
    return function (dispatch) {
        return __awaiter(this, void 0, void 0, function () {
            var WinesResp, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, WineApi.GetWineById(id)];
                    case 1:
                        WinesResp = _a.sent();
                        return [2 /*return*/, dispatch(getWineByIdSuccess(WinesResp.data))];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, dispatch(getWineByIdError(error_2))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
}
exports.getWineById = getWineById;
function winesisLoading(loading) {
    return { type: types.WINES_IS_LOADING, iswinesLoading: loading };
}
exports.winesisLoading = winesisLoading;
//# sourceMappingURL=WinesActions.js.map