import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Menu, Icon, Progress, Segment} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'

import * as actions from '../redux/actions/menuActions';

class MenuNav extends Component{
    constructor(props){
        super(props)

        this.renderMenuElements = this.renderMenuElements.bind(this)
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this)

    }

    handleMenuItemClick(menuItem){
        this.props.activeMenuElement(menuItem.idMenu)
        this.props.history.push(menuItem.route)
    }

    renderMenuElements(){
        return this.props.menu.menuData.map( menuItem => {
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

    render(){
        return(
            <React.Fragment>
                <Segment basic>
                    {isMobile && this._renderMobileInterface()}
                    {!isMobile && this._renderDesktopInterface()}
                </Segment>
                <Segment basic>
                    <Progress percent = {70} size = 'tiny' color = 'teal'>
                        32 MB de 50 MB usado
                    </Progress>
                </Segment>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return{
        menu: state.menuData,
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