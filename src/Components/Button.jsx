import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ url, className, content }) => {
  return (
    <Link to={url}> <button className={className}>{content}</button></Link>

  )
}

export default Button