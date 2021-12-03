import React from 'react'

export default class ErrorBoundary extends React.PureComponent {
  componentDidCatch(error, errorInfo) { // eslint-disable-line @typescript-eslint/no-unused-vars
    this.props.setError(error)
  }
  
  render() {
    return this.props.children
  }
}
