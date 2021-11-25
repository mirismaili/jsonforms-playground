import deepEqual from '@graphix/deep-equal'
import {materialCells, materialRenderers} from '@jsonforms/material-renderers'
import {JsonForms} from '@jsonforms/react'
import {Box, Grid, makeStyles, Typography} from '@material-ui/core'
import React, {useReducer, useRef, useState} from 'react'
import ErrorBoundary from './ErrorBoundary'
import JsonEditor, {DONT_UPDATE_CONTENT} from './JsonEditor'
import initialSchema from './schema.json'
import initialUiSchema from './uiSchema.json'

const renderers = materialRenderers

const initialData = {
	name: 'Send email to Adrian',
	description: 'Confirm if you have passed the subject\nHereby ...',
	done: true,
	recurrence: 'Daily',
	rating: 3,
}

const useStyles = makeStyles((theme) => ({
	container: {
		margin: 0,
		padding: theme.spacing(1),
		width: '100%',
		flexGrow: 1,
	},
	form: {
		padding: theme.spacing(1),
	},
	editorsGrid: {
		[theme.breakpoints.down('lg')]: {
			height: '50%',
		},
	},
	editorContainer: {
		height: '100%',
		position: 'relative', // is necessary to position the children as absolute
	},
	editorLabel: {
		position: 'absolute',
		top: 0,
		left: theme.spacing(1.5),
		padding: theme.spacing(0, 0.5),
		backgroundColor: 'white',
	},
	editor: {
		position: 'absolute',
		top: theme.spacing(1.7), // match upper-bound behind the label
		bottom: 0,
		left: 0,
		right: 0,
		boxShadow: `0 0 4px ${theme.palette.type === 'dark' ? 'white' : 'black'}`,
		borderRadius: theme.spacing(0.5),
		paddingTop: theme.spacing(2), // a little far from the label
		marginBottom: theme.spacing(2), // Fix monaco-editor over-size issue
	},
}))

function App () {
	const classes = useStyles()
	
	const dataRef = useRef(initialData)
	const [dataError, setDataError] = useState('') // noinspection JSCheckFunctionSignatures
	const [dataUpdated, dataUpdatedFrom] = useReducer((_, from) => ({from}), {from: ''})
	
	const schemaRef = useRef(initialSchema)
	const [schemaError, setSchemaError] = useState('') // noinspection JSCheckFunctionSignatures
	const [schemaUpdated, schemaUpdatedFrom] = useReducer((_, from) => ({from}), {from: ''})
	
	const uiSchemaRef = useRef(initialUiSchema)
	const [uiSchemaError, setUiSchemaError] = useState('') // noinspection JSCheckFunctionSignatures
	const [uiSchemaUpdated, uiSchemaUpdatedFrom] = useReducer((_, from) => ({from}), {from: ''})
	
	const [jsonFormError, setJsonFormError] = useState(null)
	
	return (
			<>
				<Grid container spacing={2} className={classes.container}>
					<Grid item xs={12} md={6} xl={3} className={classes.editorsGrid}>
						<Editor
								dataRef={schemaRef}
								dataError={schemaError}
								setDataError={setSchemaError}
								dataUpdated={schemaUpdated}
								dataUpdatedFrom={schemaUpdatedFrom}
								editorName="schema-editor"
								dataName="Schema"
								setJsonFormError={setJsonFormError}
						/>
					</Grid>
					
					<Grid item xs={12} md={6} xl={3} className={classes.editorsGrid}>
						<Editor
								dataRef={uiSchemaRef}
								dataError={uiSchemaError}
								setDataError={setUiSchemaError}
								dataUpdated={uiSchemaUpdated}
								dataUpdatedFrom={uiSchemaUpdatedFrom}
								editorName="ui-schema-editor"
								dataName="UI-Schema"
								setJsonFormError={setJsonFormError}
						/>
					</Grid>
					
					<Grid item xs={12} md={6} xl={3} className={classes.editorsGrid}>
						<Editor
								dataRef={dataRef}
								dataError={dataError}
								setDataError={setDataError}
								dataUpdated={dataUpdated}
								dataUpdatedFrom={dataUpdatedFrom}
								editorName="data-editor"
								dataName="Data"
								setJsonFormError={setJsonFormError}
						/>
					</Grid>
					
					<Grid item xs={12} md={6} xl={3}>
						<div className={classes.form}>
							<ErrorBoundary setError={setJsonFormError}>
								{jsonFormError
										? (
												<Box sx={{color: 'red', overflowX: 'scroll'}}>
													<Typography component="h6" variant="h6">OOPS! Something went wrong!</Typography>
													<Typography component="pre"
																	style={{fontFamily: 'Monospace'}}>{jsonFormError.message}</Typography>
													<Typography component="pre"
																	style={{fontFamily: 'Monospace'}}>{jsonFormError.stack}</Typography>
												</Box>
										)
										:
										<JsonForms
												schema={schemaRef.current}
												uischema={uiSchemaRef.current}
												data={dataRef.current}
												renderers={renderers}
												cells={materialCells}
												onChange={(event) => {
													// console.debug(event.errors)
													console.debug('FORM changed')
													if (!deepEqual(dataRef.current, event.data)) {
														dataRef.current = event.data
														setJsonFormError(false)
														dataUpdatedFrom('form')
														console.debug('Data updated from FORM')
													}
												}}
										/>}
							</ErrorBoundary>
						</div>
					</Grid>
				</Grid>
			</>
	)
}

export default React.memo(App)

const Editor = ({
	dataRef, dataError, setDataError, dataUpdated, dataUpdatedFrom, editorName, dataName, setJsonFormError,
}) => {
	const classes = useStyles()
	
	const content = dataUpdated.from === editorName
			? DONT_UPDATE_CONTENT
			: JSON.stringify(dataRef.current, null, 2)
	
	const onTextChanged = (newText) => {
		console.debug(`${editorName.toUpperCase()} changed`)
		try {
			const newData = JSON.parse(newText)
			if (!deepEqual(dataRef.current, newData)) {
				dataRef.current = newData
				setJsonFormError(false)
				dataUpdatedFrom(editorName)
				console.debug(`${dataName} updated from EDITOR`)
			}
			setDataError('')
		} catch (e) {
			setDataError('Invalid JSON!')
		}
	}
	
	return (
			<div dir="ltr" className={classes.editorContainer}>
				<JsonEditor
						className={classes.editor}
						uri={`json://${editorName}.json`}
						style={dataError ? {boxShadow: '0 0 4px red'} : {}}
						content={content}
						onTextChanged={onTextChanged}
				/>
				<Typography color="textSecondary" className={classes.editorLabel}>{dataName}</Typography>
			</div>
	)
}
