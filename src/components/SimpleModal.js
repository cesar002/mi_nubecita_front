import React from 'react';
import {connect} from 'react-redux';
import {Modal, Header, Button, Icon} from 'semantic-ui-react';

import * as actions from '../redux/actions/SimpleModalActions'

const SimpleModal = (props) =>(
    <Modal
        basic
        open = {props.modal.isOpen}
        size = 'small'
    >
        <Header icon = {props.modal.iconName} content = {props.modal.titulo} />
        <Modal.Content>
            <h3>{props.modal.texto}</h3>
        </Modal.Content>
        <Modal.Actions>
            <Button color = {props.modal.buttonColor} onClick = {props.clearModal} inverted>
                <Icon name = 'close'/> Cerrar
            </Button>
        </Modal.Actions>
    </Modal>
)


const mapStateToProps = state =>{
    return{
        modal: state.simpleModal,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        clearModal(){
            dispatch(actions.cleanModalContent())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleModal)



