import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'

import NavBar from './NavBar'
import Menu from './MenuNav'
import DetallesArchivo from './DetallesFile'

export default class AppViewTemplate extends Component{
    constructor(props){
        super(props)

        this._renderDesktopInterface = this._renderDesktopInterface.bind(this)
        this._renderMobileInterface = this._renderMobileInterface.bind(this)

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
        return(
            <React.Fragment>
                <NavBar />
                {!isMobile && this._renderDesktopInterface()}
                {isMobile && this._renderMobileInterface()}
            </React.Fragment>
        )
    }
}