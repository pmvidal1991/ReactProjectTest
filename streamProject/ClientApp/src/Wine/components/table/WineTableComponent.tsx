import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TablePagination from "@material-ui/core/TablePagination";
import { toast } from "react-toastify";
import ModalImage from "react-modal-image";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { wineModel, WineResponse, WineTablePropsInterface } from "../../WineInterfaces";
function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: string, orderBy: string) {
    return order === "desc"
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: wineModel[], comparator: any) {
    const stabilizedThis = array.map((el: any, index) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}
const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
        overflow: "unset"
    }
}));
const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));

function TablePaginationActions(props: any) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: any) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: any) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: any) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: any) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};
const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
        fontSize: 14
    },
    head: {
        backgroundColor: "#3498DB",
        color: "white"
    },
    input: {
        display: "none"
    },
    icon: {
        color: "#3498DB"
    },
    dialogButton: {
        color: "#3498DB"
    },
    dialogText: {
        color: "#3498DB"
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
});

const WineTableComponent: React.FC<WineTablePropsInterface | null> = props => {
    const { list, getWineById, showLoader, closeLoader, showEditModal } = props;
    const classes = useStyles2();
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("id");
    const [page, setPage] = useState(0);
    const emptyArray: any = [];
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, list as any - page * rowsPerPage) as any;
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const getTableWineById = async (id: string) => {
        showLoader();
        try {
            await getWineById(id).then((resp: WineResponse) => {
                showEditModal();
                closeLoader();
            });

        }
        catch (ex) {
            closeLoader();
            toast.error("ocorreu um erro", {
                position: toast.POSITION.TOP_CENTER,
                toastId: "logout-exit-message"
            });
        }
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead style={{ backgroundColor: "#9F1D41" }}>
                        <TableRow>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Image</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Name</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Description</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Brand</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Type</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Reference</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Region</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Division</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Section</label>
                            </TableCell>
                            <TableCell align="right">
                                <label style={{ color: "white" }}>Check Detail</label>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(list.length ? list : emptyArray)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: wineModel, index: number) => (
                                <TableRow key={index}>
                                    <TableCell align="center" style={{ width: "150px" }}>
                                        <ModalImage
                                            small={"/img/Wine/" + row.img}
                                            large={"/img/Wine/" + row.img}
                                            alt={row.img}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.brand}</TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.reference}</TableCell>
                                    <TableCell align="right">{row.region}</TableCell>
                                    <TableCell align="right">{row.division}</TableCell>
                                    <TableCell align="right">{row.section}</TableCell>
                                    <TableCell align="right">  <button id={row.id} type="button"
                                        className="btn btn-primary" onClick={() => { getTableWineById(row.id) }} style={{ backgroundColor: "#9F1D41" }}>
                                        <VisibilityIcon style={{ fontSize: '20px' }} />
                                    </button></TableCell>
                                </TableRow>
                            ))}

                        {list.length ? list.length === 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={8}>
                                    <label style={{ marginLeft: "42%" }}>No results</label>
                                </TableCell>
                            </TableRow>
                        ) : (<TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={8}>
                                <label style={{ marginLeft: "42%" }}>No results</label>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                colSpan={3}
                                count={list.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { "aria-label": "rows per page" },
                                    native: true
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

export default WineTableComponent;