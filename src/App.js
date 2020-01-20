import React from 'react';
import './App.css';
import {Table, TableBody} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import FB from 'fb';
import TextField from "@material-ui/core/TextField";
import {InputLabel} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import {green} from "@material-ui/core/colors";
import { connect } from 'react-redux';
import {closeSnackbar, openSnackbar} from './actions'

class FBApi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiResult: {},
            pageName: "",
            apiPostResult: "",
            isSuccess: true,
            imageLink: ""
        };
    }

    searchPageInfo() {
        FB.api(
            '/853672968393408',
            'GET',
            {
                "fields": "id,name,category,link,subcategory,photo_url,logo_url",
                "access_token": "EAAMIaToJEsABAPTWCyFHdsGP4LS2MrUTnZASUjhAEQAaOaSJVQl28FEykdqEzmZBiIoEEdxXXkvSDS0OhF3ddT2OmfkZAGqUqZCnxZA6g0oCzhANqZAsYYlWoIjZCjF1QGgLGFvd8KRf1IhmIs68S435PYqWXiaX25H1RZC1PYSWYYhlSaWDjaxNb0ZBpVtSt60pL2xEGJ9AJDAZDZD"
            },
            (response) => {
                this.setState({apiResult: response})
                // console.log(JSON.stringify(response));
            }
        );
    }

    changePageInfo() {
        console.log(this.state.pageName);

        FB.api(
            '/853672968393408',
            'POST',
            {
                "/fields/name": this.state.pageName,
                "/fields/photo_url": this.state.imageLink,
                "/field/link": "https://www.facebook.com/?ref=tn_tnmn",
                "access_token": "853672968393408|3DP0mrDVHxxn9AeZqYQoBo0xbXU"
            },
            (error, response) => {
                console.log(response ? "not null" : "null");
                if (error) {
                    this.setState({apiPostResult: "Update info failed!", resultColor: "#fc0303"});
                    console.log(error);
                } else {
                    this.setState({
                        apiResult: response,
                        apiPostResult: "Update info successful!", resultColor: "#14fc03"
                    });
                    this.searchPageInfo();
                }
                console.log(JSON.stringify(response));
            }
        );
    }

    readingPermissionInfo() {
        FB.api(
            '/853672968393408?fields=permissions',
            {
                "access_token": "853672968393408|3DP0mrDVHxxn9AeZqYQoBo0xbXU"
            },
            (response) => {
                console.log(JSON.stringify(response));
                this.setState({apiPostResult: JSON.stringify(response)});
            }
        );
    }

    deletePageInfo() {
        FB.api(
            '/1138168126514171/permissions',
            'DELETE',
            {
                "access_token": "853672968393408|3DP0mrDVHxxn9AeZqYQoBo0xbXU"
            },
            (response) => {
                console.log(JSON.stringify(response));
                this.setState({apiResult: {}, apiPostResult: "Delete page info successful!"});
            }
        );
    }

    handleChange = (event) => {
        this.setState({
            pageName: event.target.value,
        });
    };

    uploadImage = (event) => {
        this.setState({
            imageLink: event.target.value
        });
    };

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: green,
            },
        });

        return (
            <div className="FacebookApi">
                <header className="FacebookApi-header">
                    <h3>Facebook Graph Api Page</h3>
                    <Button onClick={()=>{
                        this.props.openSnackbar("adfd")
                    }}>Show snackbar</Button>
                    <form noValidate>
                        <InputLabel style={{marginBottom: "7px"}}>Page Name</InputLabel>
                        <TextField variant="outlined"
                                   id="custom-css-outlined-input" label="Page name"
                                   color="primary"
                                   value={this.state.pageName}
                                   onChange={this.handleChange}
                                   required
                        />
                    </form>
                    <br/>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            style={{display: "none"}}
                            value={this.state.imageLink}
                            onChange={this.uploadImage}
                        />
                    </Button>
                    <p>{this.state.imageLink !== "" ? "Image link: " + this.state.imageLink : ""}</p>
                    <div>
                        <Button variant="contained" color="primary"
                                style={{marginRight: "5px"}}
                                onClick={() => this.searchPageInfo()}>
                            Get page info</Button>
                        <Button variant="contained" color="primary"
                                style={{marginRight: "5px"}}
                                onClick={() => this.changePageInfo()}>
                            Update page info</Button>
                        <Button variant="contained" color="secondary"
                                onClick={() => this.deletePageInfo()}>
                            Delete page info</Button>
                    </div>
                    <br/>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.props.snackbar.open}
                        autoHideDuration={6000}
                        message={this.props.snackbar.message ? this.props.snackbar.message: ""}
                        action={
                            <React.Fragment>
                                <Button color="primary" size="small" onClick={
                                    ()=> {this.props.closeSnackbar()}
                                }>
                                    UNDO
                                </Button>
                            </React.Fragment>
                        }/>

                    <TableContainer component={Paper} className="FacebookApiTable">
                        <Table className="FBtable" aria-label="simple table"
                               style={{width: 200}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">Link</TableCell>
                                    <TableCell align="center">Subcategory</TableCell>
                                    <TableCell align="center">Photo</TableCell>
                                    <TableCell align="center">Logo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={this.state.apiResult.id}>
                                    <TableCell component="th" scope="row">
                                        {this.state.apiResult.id}
                                    </TableCell>
                                    <TableCell align="center">{this.state.apiResult.name}</TableCell>
                                    <TableCell align="center">{this.state.apiResult.category}</TableCell>
                                    <TableCell align="center">{this.state.apiResult.link}</TableCell>
                                    <TableCell align="center">{this.state.apiResult.subcategory}</TableCell>
                                    <TableCell align="center">
                                        <img src={this.state.apiResult.photo_url}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        <img src={this.state.apiResult.logo_url}/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    snackbar: state.snackbar
})

const mapDispatchToProps = dispatch => ({
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    closeSnackbar: () => dispatch(closeSnackbar())
})

export default connect(mapStateToProps, mapDispatchToProps)(FBApi);
