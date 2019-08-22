import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Grid} from 'semantic-ui-react'

import NavBar from '../components/NavBar'
import Menu from '../components/MenuNav'

class MiNube extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <React.Fragment>
                <NavBar />
                <Grid>
                    <Grid.Column width={4}>
                        <Menu />
                    </Grid.Column>
                    <Grid.Column width={12}>

                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withRouter(MiNube)