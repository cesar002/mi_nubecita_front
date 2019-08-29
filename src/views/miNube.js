import React from 'react'
import {withRouter} from 'react-router-dom'

import AppView from '../components/AppViewTemplate'
import ContenedorArchivos from '../components/ContenedorArchivos'

const MiNube = () => <AppView component = {ContenedorArchivos} />

export default withRouter(MiNube);
