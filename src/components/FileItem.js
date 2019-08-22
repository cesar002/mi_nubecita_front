import React, { PureComponent } from 'react';
import {Segment, Container, Header, Checkbox, Item} from 'semantic-ui-react'
import FileIcon, { defaultStyles } from 'react-file-icon';
import PropTypes from 'prop-types';

export default class FileItem extends PureComponent{
    constructor(props){
        super(props)

        this._toggleIsChecked = this._toggleIsChecked.bind(this)
        this._toggleCheckedIsVisible = this._toggleCheckedIsVisible.bind(this)


        this.state = {
            isCheked: false,
            checkedIsVisible: false,
        }
    }

    static propTypes = {

    }

    static defaultProps = {

    }

    _toggleCheckedIsVisible(){
        let isVisible = this.state.checkedIsVisible
        this.setState({checkedIsVisible: !isVisible})
    }

    _toggleIsChecked(){
        let cheked = this.state.isCheked
        this.setState({isCheked: !cheked})
    }


    render(){
        return(
            <React.Fragment>

                <div className = 'file-element' onMouseOver = {this._toggleCheckedIsVisible} onMouseOut = {this._toggleCheckedIsVisible} onClick = {this._toggleIsChecked}>
                    <div className = 'file-element-check'>
                        { (this.state.checkedIsVisible || this.state.isCheked) && 
                        <Checkbox checked = {this.state.isCheked} style = {{marginLeft: '0.5rem', marginTop: '0.5rem'}} />}
                    </div>
                    <div className = 'file-element-body'>
                        <Container fluid textAlign = 'center'>
                        <Segment basic>
                            <Header icon>
                                <FileIcon extension = 'pdf' {...defaultStyles.pdf} size = {55} />
                                <p>Documento</p>
                            </Header>
                            <Segment.Inline>
                                <Header as = 'h5' color = 'grey'>
                                    10 ene. 2019
                                </Header>
                            </Segment.Inline>
                        </Segment>
                        </Container>
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }


}