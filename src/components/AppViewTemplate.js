import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'
import {withRouter} from 'react-router-dom'

import NavBar from './NavBar'
import Menu from './MenuNav'
import DetallesArchivo from './DetallesFile'
import Loader from './Loading';

import * as actions from '../redux/actions/userDataAction';
import * as fileActions from '../redux/actions/userDataFilesActions'
import ApiService from '../services/ApiService';
import LocalStorageService from '../services/LocalStorageService';


class AppViewTemplate extends Component{
    constructor(props){
        super(props)

        this._renderDesktopInterface = this._renderDesktopInterface.bind(this)
        this._renderMobileInterface = this._renderMobileInterface.bind(this)
        this._verifySession = this._verifySession.bind(this)

        this.state = {
            consultando: false,
        }
    }

    componentWillMount(){
        this._verifySession();
    }

    _verifySession(){
        if(LocalStorageService.existSessionToken()){
            if(!this.props.userData){
                this.setState({consultando: true})
                Promise.all([ApiService.getMe(), ApiService.getFiles()])
                .then(values => {
                    this.props.setUserData(values[0])
                    this.props.setFiles(values[1])
                    // console.log(values)
                    this.setState({consultando: false})
                })
                .catch(error =>{    
                    console.log(error)
                })
            }
        }else{
            this.props.history.push('/');
        }
    }


    _renderDesktopInterface(){
        let Element = this.props.component
       return(
            <Grid>
                <Grid.Column width={3}>
                    <Menu />
                </Grid.Column>
                <Grid.Column width={9}>
                    {this.props.component && <Element />}
                </Grid.Column>
                <Grid.Column width = {4}>
                    <DetallesArchivo />
                </Grid.Column>
            </Grid>
       )
    }

    _renderMobileInterface(){
        let Element = this.props.component
        return(
            <Grid>
                <Grid.Column>
                    <Grid.Row>
                        <Menu />
                    </Grid.Row>
                    <Grid.Row>
                        {this.props.component && <Element />}
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }

    render(){
        if(this.state.consultando){
            return <Loader texto = 'Obteniendo información...' indeterminado />
        }
        return(
            <React.Fragment>
                <NavBar />
                {this.props.logoutActive && <Loader texto = 'Cerrando sesión...' />}
                {!isMobile && this._renderDesktopInterface()}
                {isMobile && this._renderMobileInterface()}
            </React.Fragment>
        )
    }
}


const mapStateTuProps = state =>{
    return{
        logoutActive: state.logout.logoutActive,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        setUserData(data){
            dispatch(actions.setUserData(data));
        },
        setFiles(files){
            dispatch(fileActions.setFilesUser(files))
        }
    }
}



export default connect(mapStateTuProps, mapDispatchToProps)(withRouter(AppViewTemplate))