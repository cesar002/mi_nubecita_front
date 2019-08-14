import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react'

const LoaderComponent = (props) => (
    <React.Fragment>
            <Dimmer active>
                <Loader indeterminate = {props.indeterminado? true: false}>
                    <p>{props.texto}</p>
                </Loader>
            </Dimmer>
    </React.Fragment>
)

export default LoaderComponent;