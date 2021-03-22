import React from 'react'
import { useHistory } from 'react-router-dom'
import '../../assets/css/not-found.scss'
import { FaGhost } from 'react-icons/fa'

function NotFound () {
  const history = useHistory()

  const goBack = (e) => {
    e.preventDefault()
    history.goBack()
  }

  // https://dev.to/webdeasy/25-creative-404-error-pages-with-cool-animations-16jn
  return (
    <div id='body'>
      <main id='main'>
        <h1 className='mb-5' id='header'>4<span><FaGhost /></span>4</h1>
        <h2 id='sub-header'>Error: 404 page not found</h2>
        <p className='message'>Sorry, the page you're looking for cannot be accessed</p>
        <p onClick={goBack} className='message' id='go-back-link'>Go back</p>
      </main>
    </div>
  )
}

export default NotFound