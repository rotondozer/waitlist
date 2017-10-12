import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css'
import './semantic/dist/semantic.min.css'
// import WaitListApp from './WaitListApp'
import Navbar from './Tmp'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Navbar />, document.getElementById('root'))
registerServiceWorker()
