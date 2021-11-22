import React from 'react'

export default class ErrorBoundary extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			error: null,
		}
	}
	
	static getDerivedStateFromError (error, ...args) {
		console.log({error})
		return {error: error}
	}
	
	componentDidCatch (error, errorInfo) {
		// You can also log the error to an error reporting service
	}
	
	render () {
		if (this.state.error) {
			return <div style={{color: 'red', overflow: 'scroll'}}>
				<h3>OOPS! Something went wrong!</h3>
				<pre>{this.state.error.message}</pre>
				<pre>{this.state.error.stack}</pre>
			</div>
		}
		
		return this.props.children
	}
}