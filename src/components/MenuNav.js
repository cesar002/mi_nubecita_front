import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Menu, Icon, Progress, Segment, Button} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'

import * as actions from '../redux/actions/menuActions';
import FormatBytes from '../utils/FormatBytes'

class MenuNav extends Component{
    constructor(props){
        super(props)

        this.fileInputRef = React.createRef()
        this.renderMenuElements = this.renderMenuElements.bind(this)
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this)

    }

    

    handleMenuItemClick(menuItem){
        this.props.activeMenuElement(menuItem.idMenu)
        this.props.history.push(menuItem.route)
    }

    renderMenuElements(){
        return this.props.menu.map( menuItem => {
            return(
                <Menu.Item key = {menuItem.idMenu} name = {menuItem.name} active = {menuItem.active} onClick = {()=>{ this.handleMenuItemClick(menuItem) }}>
                    <Icon name = {menuItem.icon} />
                    <p className = {isMobile? '' : 'text-menu-item'}>{menuItem.name}</p>
                </Menu.Item>
            )
        })
    }

    _renderDesktopInterface(){
        return(
            <Menu vertical pointing secondary fluid >
                {this.renderMenuElements()}
            </Menu>
        )
    }

    _renderMobileInterface(){
        return(
            <Menu stackable fluid>
                {this.renderMenuElements()}
            </Menu>
        )
    }

    _convertPorcentaje(){
        let result = (this.props.userData.enUso * 100)/(this.props.userData.limiteAlmacenaje.limite * 1000)
        return Math.round(result)
    }

    render(){
        return(
            <React.Fragment>
                <Segment basic>
                    {isMobile && this._renderMobileInterface()}
                    {!isMobile && this._renderDesktopInterface()}
                </Segment>
                <Segment basic>
                    <Button color = 'teal' fluid labelPosition = 'left' icon = 'cloud upload' content = 'Subir archivo' onClick = {()=> this.fileInputRef.current.click()} />
                    <input 
                        ref = {this.fileInputRef}
                        type = 'file'
                        hidden
                        multiple
                    />
                </Segment>
                <Segment basic>
                    {this.props.userData && 
                    <Progress percent = {this._convertPorcentaje()} size = 'tiny' color = 'teal'>
                        {FormatBytes(this.props.userData.enUso)} de {this.props.userData.limiteAlmacenaje.limite/1000000} GB usados
                    </Progress>
                    }
                </Segment>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return{
        menu: state.menuData,
        userData: state.userData.userData,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        activeMenuElement(idMenu){
            dispatch(actions.activeMenuElement(idMenu))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuNav))