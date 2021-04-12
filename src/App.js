import React from 'react'
import Main from './routes/index'
import './assets/css/style.css'
import { Provider } from 'react-redux'
import store from './store'

function App () {
  return (
    <Provider store={store}>
      <div className='bg-p-alice-blue'>
        <Main />
      </div>
    </Provider>
  )
}

export default App