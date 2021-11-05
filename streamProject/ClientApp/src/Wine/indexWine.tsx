import React, { useState } from "react";
import { Action, bindActionCreators } from "redux";
import * as WinesActions from "../redux/actions/WinesActions";
import * as LoginActions from "../redux/actions/LoginActions";
import { connect } from "react-redux";
import "../HomePage/HomePage.css";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import "react-toastify/dist/ReactToastify.css";
import { wineBrands, wineTypes, wineRegions, wineSections, wineDivision } from '../utils/ComboValues'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import utf8 from 'utf8';
import {
    withStyles,
} from '@material-ui/core/styles';
import { ThunkDispatch } from "redux-thunk";
import { initialStateModel } from "../redux/initialState";
import { wineFilters, WinePagePropsInterface, WinesResponse } from "./WineInterfaces";
import { AxiosError } from "axios";
import MenuComponent from "./components/MenuComponent";
import ErrorBoundary from "./components/ErrorBoundary";
import WineTableComponent from "./components/table/WineTableComponent";
import AddWineModal from "./components/Modals/AddWineModal";
import WineDetailsModal from "./components/Modals/WineDetailsModal";

const CssSelect = withStyles({
    root: {
        '& label': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-input': {
            color: 'black',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.MuiFormControl-root ': {
            minWidth: '600px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
                color: 'black'
            },


        },
    },
})(Select);

const WinePage: React.FC<WinePagePropsInterface | null> = props => {
    const {
        User,
        login,
        WinesError,
        getWinesError,
        getWineByIdError,
        AddWineError,
        iswinesLoading,
        winesisLoading,
        setWines,
        Wines,
        getWineById,
        addWineError,
        WineError,
        Wine
    } = props;
    const [showmodal, setShowmodal] = useState(false);
    const [filters, setFilters] = useState({ brand: '', type: '', region: '', section: '', division: '' });
    const [filterBrand, setFilterBrand] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterSection, setFilterSection] = useState('');
    const [filterDivision, setFilterDivision] = useState('');
    const [filterRegion, setFilterRegion] = useState('');
    const [showEditmodal, setShowEditmodal] = useState(false);
    const showLoader = () => {

        winesisLoading(true);


    };
    const closeLoader = () => {

        winesisLoading(false);

    };
    const closeEditModal = () => {
        setShowEditmodal(false);
    }
    const closeModal = () => {
        setShowmodal(false);
    }
    const showEditModal = () => {
        setShowEditmodal(true);
    }
    const handleOnChangeFilters = (value: string, name: string) => {

        switch (name) {
            case "brand": {

                const newFilterArr = filters;
                newFilterArr.brand = utf8.encode(value);
                setFilters(newFilterArr);
                break;
            }
            case "type": {
                const newFilterArr = filters;
                newFilterArr.type = utf8.encode(value);
                setFilters(newFilterArr);
                break;
            }
            case "region": {
                const newFilterArr = filters;
                newFilterArr.region = utf8.encode(value);
                setFilters(newFilterArr);
                break;
            }
            case "section": {
                const newFilterArr = filters;
                newFilterArr.section = utf8.encode(value);
                setFilters(newFilterArr);
                break;
            }
            case "division": {
                const newFilterArr = filters;
                newFilterArr.division = utf8.encode(value);
                setFilters(newFilterArr);
                break;
            }

        }
    }
    const clearFiltrers = async () => {
        setFilters({ brand: '', type: '', region: '', section: '', division: '' });
        setFilterBrand('');
        setFilterType('');
        setFilterRegion('');
        setFilterSection('');
        setFilterDivision('');
        showLoader();

        try {
            await setWines({ brand: '', type: '', region: '', section: '', division: '' }).then((resp: WinesResponse) => {
                closeLoader();
            });
        }
        catch (ex) {
            closeLoader();
            toast.error("An error has occured while trying geting the list", {
                position: toast.POSITION.TOP_CENTER,
                toastId: "logout-exit-message"
            });
        }

    }
    const getList = async () => {
        showLoader();

        try {
            await setWines(filters).then((resp: WinesResponse) => {
                closeLoader();
            });
        }
        catch (ex) {
            closeLoader();
            toast.error("An error has occured while trying geting the list", {
                position: toast.POSITION.TOP_CENTER,
                toastId: "logout-exit-message"
            });
        }
    }
    return (
        <>
            <div className="container" style={{ textAlign: "center", marginTop: "5%", maxWidth: '1513px' }}>
                <ErrorBoundary Error={WinesError} getWinesError={getWinesError} getWineByIdError={getWineByIdError} AddWineError={AddWineError} closeModal={closeModal} type='list'>
                    <LoadingOverlay active={iswinesLoading} spinner text={"Loading..."}>
                        <div className="wrapper">
                            <div id="formContent2">
                                <MenuComponent
                                    user={User}
                                    login={login}
                                />
                                <div
                                    className="row"
                                    style={{ marginTop: "2%", width: "96%", marginLeft: "2%" }}
                                >
                                </div>
                                <div
                                    className="row"
                                    style={{ marginTop: "2%", width: "96%", marginLeft: "2%" }}
                                >
                                    <button type="submit" id="AddEventButtonModal" style={{ float: 'right', width: "250px" }} onClick={() => { setShowmodal(true) }} className='btn btn-primary'>
                                        Add Wine
                                    </button>
                                </div>
                                <div
                                    className="row"
                                    style={{ marginTop: "2%", width: "96%", marginLeft: "2%", borderRadius: '40px', border: 'solid', borderWidth: '1px', borderColor: 'grey', padding: '50px' }}
                                >
                                    <div className='col-md-4'>
                                        <InputLabel htmlFor="color-native-simple">Select Brand</InputLabel>
                                        <CssSelect
                                            onChange={(option: React.ChangeEvent<{ value: unknown }>) => { setFilterBrand(option.target.value as string); handleOnChangeFilters(option.target.value as string, "brand") }}
                                            value={filterBrand}
                                            style={{ width: 300 }}
                                            name="brand"
                                            placeholder={"Brand"}
                                            inputProps={{ style: { width: 300 } }}
                                        >
                                            <MenuItem value=""> </MenuItem>
                                            {wineBrands.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                        </CssSelect></div>
                                    <div className='col-md-4'>
                                        <InputLabel htmlFor="color-native-simple">Select Type</InputLabel>
                                        <CssSelect
                                            onChange={(option: React.ChangeEvent<{ value: unknown }>) => { setFilterType(option.target.value as string); handleOnChangeFilters(option.target.value as string, "type"); }}
                                            value={filterType}
                                            name="type"
                                            style={{ width: 300 }}
                                            placeholder={"Type"}
                                            inputProps={{ style: { width: 300 } }}
                                        >
                                            <MenuItem value=""> </MenuItem>
                                            {wineTypes.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                        </CssSelect></div>
                                    <div className='col-md-4'>
                                        <InputLabel htmlFor="color-native-simple">Select Region</InputLabel>
                                        <CssSelect
                                            onChange={(option: React.ChangeEvent<{ value: unknown }>) => { setFilterRegion(option.target.value as string); handleOnChangeFilters(option.target.value as string, "region") }}
                                            value={filterRegion}
                                            name="region"
                                            placeholder={"Region"}
                                            style={{ width: 300 }}
                                            inputProps={{ style: { width: 300 } }}
                                        >
                                            <MenuItem value=""> </MenuItem>
                                            {wineRegions.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                        </CssSelect></div>

                                    <div className='col-md-4' style={{ marginTop: '2%' }}>
                                        <InputLabel htmlFor="color-native-simple" >Select Section</InputLabel>
                                        <CssSelect
                                            onChange={(option: React.ChangeEvent<{ value: unknown }>) => { setFilterSection(option.target.value as string); handleOnChangeFilters(option.target.value as string, "section"); }}
                                            value={filterSection}
                                            style={{ width: 300, marginTop: '2%' }}
                                            name="section"
                                            placeholder={"Section"}
                                            inputProps={{ style: { width: 300 } }}
                                        >
                                            <MenuItem value=""> </MenuItem>
                                            {wineSections.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                        </CssSelect></div>
                                    <div className='col-md-4' style={{ marginTop: '2%' }}>
                                        <InputLabel htmlFor="color-native-simple" >Select Division</InputLabel>
                                        <CssSelect
                                            onChange={(option: React.ChangeEvent<{ value: unknown }>) => { setFilterDivision(option.target.value as string); handleOnChangeFilters(option.target.value as string, "division") }}
                                            value={filterDivision}
                                            name="division"
                                            style={{ width: 300 }}
                                            placeholder={"Division"}
                                            inputProps={{ style: { width: 300 } }}
                                        >
                                            <MenuItem value=""> </MenuItem>
                                            {wineDivision.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                        </CssSelect></div>
                                    <div className='col-md-4'></div>
                                    <div className='col-md-4' style={{ marginTop: '5%' }}></div>
                                    <div className='col-md-4' style={{ marginTop: '5%' }}></div>
                                    <div className='col-md-4' style={{ marginTop: '5%' }}>
                                        <button type="button" style={{ width: "150px", backgroundColor: "rgb(159, 29, 65)" }} onClick={() => { clearFiltrers()}} className='btn btn-primary'>
                                            Clear filters <ClearIcon style={{ fontSize: '20px' }} />
                                        </button>
                                        <button type="button" style={{ width: "150px", marginLeft: '1%', backgroundColor: "rgb(159, 29, 65)" }} onClick={() => { getList() }} className='btn btn-primary'>
                                            Search Table  <SearchIcon style={{ fontSize: '20px' }} />
                                        </button>

                                    </div>
                                </div>
                                <div
                                    className="row"
                                    style={{ marginTop: "2%", width: "96%", marginLeft: "2%" }}
                                >
                                    <WineTableComponent list={Wines} showLoader={showLoader} showEditModal={showEditModal} closeLoader={closeLoader} getWineById={getWineById} />
                                </div>
                            </div>
                        </div>
                    </LoadingOverlay>
                </ErrorBoundary>
            </div>
            <AddWineModal showmodal={showmodal} closeModal={closeModal} getList={getList} iswinesLoading={iswinesLoading} getWinesError={getWinesError} getWineByIdError={getWineByIdError} AddWineError={AddWineError} addWineError={addWineError} winesisLoading={winesisLoading} />
            <WineDetailsModal showmodal={showEditmodal} closeModal={closeEditModal} wine={Wine} getWinesError={getWinesError} getWineByIdError={getWineByIdError} AddWineError={AddWineError} WineError={WineError} />
        </>);
}
function mapStateToProps(state: initialStateModel) {
    return {
        User: state.Login,
        WinesError: state.WinesError,
        iswinesLoading: state.winesIsLoading,
        Wines: state.Wines,
        addWineError: state.AddWineError,
        WineError: state.WineError,
        Wine: state.Wine
    };
}
function mapDispatchToProps(dispatch: ThunkDispatch<initialStateModel, void, Action>) {
    return {
        login: (arg: FormData | null) => dispatch(LoginActions.login(arg)),
        getWinesError: (arg: AxiosError | null) => dispatch(WinesActions.getWinesError(arg)),
        getWineByIdError: (arg: AxiosError | null) => dispatch(WinesActions.getWineByIdError(arg)),
        AddWineError: (arg: AxiosError | null) => dispatch(WinesActions.AddWineError(arg)),
        winesisLoading: (arg: boolean) => dispatch(WinesActions.winesisLoading(arg)),
        setWines: (arg: wineFilters) => dispatch(WinesActions.setWines(arg)),
        getWineById: (arg: string) => dispatch(WinesActions.getWineById(arg)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps as any)(WinePage);
