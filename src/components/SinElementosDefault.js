import React from 'react'
import {Segment, Header, Icon} from 'semantic-ui-react'

const getNameIcon = (nameIcon) => {
    switch(nameIcon){

    }
}

const SinElementosDefault = (props) => (
    <React.Fragment>
        <Segment basic placeholder>
            <Header icon = {getNameIcon(props.tipo)}>
                <p>{this.props.titulo}</p>
            </Header>
        </Segment>
    </React.Fragment>
)

export default SinElementosDefault