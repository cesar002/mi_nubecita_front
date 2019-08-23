import React, { Component } from 'react'
import {Container, Icon, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const NotFound = () => {
    return(
        <React.Fragment>
            <div className = 'not-found'>
                <Container fluid textAlign='center'>
                    <Icon color = 'grey' size = 'massive' name = 'warning sign'/>
                    <Header as = 'h1' >
                        PAGINA NO ENCONTRADA :/
                        <Header.Subheader><Link to = '/mi_nube'>
                            regrese para seguir nubeando
                        </Link></Header.Subheader>
                    </Header>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default NotFound;