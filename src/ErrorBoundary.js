import React from 'react'

export default class ErrorBoundary extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			error: null,
		}
	}
	
	static getDerivedStateFromError (error) {
		console.error(error)
		return {error}
	}
	
	componentDidCatch (error, errorInfo) {
		// You can also log the error to an error reporting service
	}
	
	render () {
		if (this.state.error) {
			return <div style={{color: 'crimson', overflow: 'scroll'}}>
				<h3>OOPS! Something went wrong!</h3>
				<h5>{this.state.error.message}</h5>
				<pre>{this.state.error.stack}</pre>
			</div>
		}
		
		return this.props.children
	}
}