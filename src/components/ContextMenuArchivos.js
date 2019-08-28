import React, { Component } from 'react';
import {Menu, Icon} from 'semantic-ui-react'
import {MenuItem, ContextMenu} from 'react-contextmenu'
import PropTypes from 'prop-types';
import {} from 'react-redux'

export default class ContextMenuArchivos extends Component{
    constructor(props){
        super(props)

        this._renderMenuItems = this._renderMenuItems.bind(this)

        this.state = {
            menuData: [
                { idMenu: 1, name: 'Agregar a favoritos',  icon: 'star outline' },
                { idMenu: 2, name: 'Eliminar',  icon: 'trash alternate outline' },
                { idMenu: 3, name: 'Compartir',  icon: 'share' },
                { idMenu: 4, name: 'Mover a',  icon: 'folder outline' },
            ]
        }
    }

    static propTypes = {
        idContextTrigger: PropTypes.string.isRequired,
    }

    _renderMenuItems(){
        return this.state.menuData.map((item, key) =>
            <MenuItem key={key} onClick = {()=>{}}>
                <Menu.Item onClick={()=>{}}>
                    {item.name}
                    <Icon name = {item.icon} />
                </Menu.Item>
            </MenuItem>
        )
    }


    render(){
        return(
            <React.Fragment>
                <ContextMenu id = {this.props.idContextTrigger}>
                    <Menu inverted vertical style = {{zIndex: '100'}}>
                        {this._renderMenuItems()}
                    </Menu>
                </ContextMenu>
            </React.Fragment>
        )
    }
}
 
