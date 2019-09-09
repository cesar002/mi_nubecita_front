import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'
import {withRouter} from 'react-router-dom'

import NavBar from './NavBar'
import MenuComponent from './MenuNav'
import DetallesArchivo from './DetallesFile'
import Loader from './Loading';
import SimpleModal from './SimpleModal'
import MenuContextual from './ContextMenuArchivos'

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
        this._redirectMenu = this._redirectMenu.bind(this)

        this.state = {
            consultando: false,
        }
    }

    componentWillMount(){
        this._verifySession();
    }

    _verifySession(){
        debugger;
        if(LocalStorageService.existSessionToken()){
            if(!this.props.userData || !this.props.userData.enUso){
                this.setState({consultando: true})
                Promise.all([ApiService.getMe(), ApiService.getFiles(), ApiService.getDeletedFiles()])
                .then(values => {
                    this.props.setUserData(values[0])
                    this.props.setFiles(values[1])
                    this.props.setFilesDeleted(values[2])

                    this.setState({consultando: false})
                    this._redirectMenu();
                })
                .catch(error =>{    
                    this.setState({consultando: false})
                    LocalStorageService.deleteSessionToken()
                    this.props.history.push('/');
                })
            }else{
                // this.setState({consultando: false})
                // LocalStorageService.deleteSessionToken()
                // this.props.history.push('/');
            }
        }else{
            this.props.history.push('/');
        }
    }

    _redirectMenu(){
        this.props.menuData.forEach(menuItem => {
            if(menuItem.active){
                switch(menuItem.idMenu){
                    case 1:
                        this.props.history.push('/mi_nube')
                    break;
                    case 2:
                        this.props.history.push('/mi_nube/favoritos')
                    break;
                    case 3:
                        this.props.history.push('/mi_nube/recientes')
                    break;
                    case 4:
                        this.props.history.push('/mi_nube/fotos')
                    break;
                    case 5:
                        this.props.history.push('/mi_nube/papelera')
                    break;
                    default:
                }
            }  
        })
    }


    _renderDesktopInterface(){
        let Element = this.props.component
       return(
            <Grid columns = {3}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuComponent />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        {this.props.component && <Element />}
                    </Grid.Column>
                    <Grid.Column width = {4}>
                        <DetallesArchivo />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row />
            </Grid>
       )
    }

    _renderMobileInterface(){
        let Element = this.props.component
        return(
            <Grid>
                <Grid.Column>
                    <Grid.Row>
                        <MenuComponent />
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
                <SimpleModal />
                <MenuContextual idContextTrigger = 'fileContainer' />
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
        userData: state.userData,
        menuData: state.menuData.menuData,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        setUserData(data){
            dispatch(actions.setUserData(data));
        },
        setFiles(files){
            dispatch(fileActions.setFilesUser(files))
        },
        setFilesDeleted(files){
            dispatch(fileActions.setFilesDeletedUser(files));
        }
    }
}



export default connect(mapStateTuProps, mapDispatchToProps)(withRouter(AppViewTemplate))