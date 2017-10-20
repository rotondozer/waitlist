import React from 'react'
import ReactDOM from 'react-dom'
import './semantic/dist/semantic.min.css'

import './index.css'
import WaitListApp from './WaitListApp'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<WaitListApp />, document.getElementById('root'))
registerServiceWorker()
