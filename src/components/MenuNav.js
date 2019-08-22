import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'

import * as actions from '../redux/actions/menuActions';

class MenuNav extends Component{
    constructor(props){
        super(props)

        this.renderMenuElements = this.renderMenuElements.bind(this)

    }

    handleMenuItemClick(menuItem){
        this.props.activeMenuElement(menuItem.idMenu)
    }

    renderMenuElements(){
        return this.props.menu.menuData.map( menuItem => {
            return(
                <Menu.Item key = {menuItem.idMenu} name = {menuItem.name} active = {menuItem.active} onClick = {()=>{}}>
                    <Icon name = {menuItem.icon} />
                    {menuItem.name}
                </Menu.Item>
            )
        })
    }

    render(){
        return(
            <React.Fragment>
                <Menu vertical pointing secondary size = 'large' >
                    {this.renderMenuElements()}
                </Menu>
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