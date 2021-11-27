import deepEqual from '@graphix/deep-equal'
import {materialCells, materialRenderers} from '@jsonforms/material-renderers'
import {JsonForms} from '@jsonforms/react'
import {Box, Grid, makeStyles, Typography} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import ErrorBoundary from './ErrorBoundary'
import JsonEditor from './JsonEditor'
import defSchema from './schema.json'
import defUiSchema from './uiSchema.json'

const renderers = materialRenderers

const initialData = JSON.parse(localStorage.getItem('data-editor-content')) ?? {
	name: 'Send email to Adrian',
	description: 'Confirm if you have passed the subject\nHereby ...',
	done: true,
	recurrence: 'Daily',
	rating: 3,
}
const initialSchema = JSON.parse(localStorage.getItem('schema-editor-content')) ?? defSchema
const initialUiSchema = JSON.parse(localStorage.getItem('ui-schema-editor-content')) ?? defUiSchema

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
	
	const [data, setData] = useState()
	const [dataError, setDataError] = useState('') // noinspection JSCheckFunctionSignatures
	
	const [schema, setSchema] = useState()
	const [schemaError, setSchemaError] = useState('') // noinspection JSCheckFunctionSignatures
	
	const [uiSchema, setUiSchema] = useState()
	const [uiSchemaError, setUiSchemaError] = useState('') // noinspection JSCheckFunctionSignatures
	
	const [jsonFormError, setJsonFormError] = useState(null)
	
	return (
			<>
				<Grid container spacing={2} className={classes.container}>
					<Grid item xs={12} md={6} xl={3} className={classes.editorsGrid}>
						<Editor
								initialData={initialSchema}
								data={schema}
								setData={setSchema}
								dataError={schemaError}
								setDataError={setSchemaError}
								editorName="schema-editor"
								dataName="Schema"
								setJsonFormError={setJsonFormError}
						/>
					</Grid>
					
					<Grid item xs={12} md={6} xl={3} className={classes.editorsGrid}>
						<Editor
								initialData={initialUiSchema}
								data={uiSchema}
								setData={setUiSchema}
								dataError={uiSchemaError}
								setDataError={setUiSchemaError}
								editorName="ui-schema-editor"
								dataName="UI-Schema"
								setJsonFormError={setJsonFormError}
						/>
					</Grid>
					
					<Grid item xs={12} md={6} xl={3} className={classes.editorsGrid}>
						<Editor
								initialData={initialData}
								data={data}
								setData={setData}
								dataError={dataError}
								setDataError={setDataError}
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
										<Form
												schema={schema}
												uiSchema={uiSchema}
												data={data}
												renderers={renderers}
												cells={materialCells}
												onChange={(event) => {
													// console.debug(event.errors)
													console.debug('FORM changed'/*, event.data, data*/)
													if (!deepEqual(data, event.data)) {
														setData(event.data)
														setJsonFormError(false)
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

function Form ({schema, uiSchema, data, renderers, cells, onChange}) {
	if ([data, schema, uiSchema].includes(undefined)) {
		return <></>
	}
	
	return (
			<JsonForms
					schema={schema}
					uischema={uiSchema}
					data={data}
					renderers={renderers}
					cells={cells}
					onChange={onChange}
			/>
	)
}

function Editor ({
	initialData,
	data,
	setData,
	dataError,
	setDataError,
	editorName,
	dataName,
	setJsonFormError,
}) {
	const classes = useStyles()
	
	const [parsedContent, setParsedContent] = useState()
	const [content, setContent] = useState()
	const [contentUpdatedFromEditor, setContentUpdatedFromEditor] = useState(false)
	
	useEffect(() => {
		console.debug(`useEffect: ${dataName} content`,/* content,*/ contentUpdatedFromEditor || data !== parsedContent)
		
		if (content === undefined) return
		
		if (!contentUpdatedFromEditor && data === parsedContent) {
			return
		}
		
		try {
			setParsedContent(JSON.parse(content))
			setDataError('')
		} catch (e) {
			setDataError('Invalid JSON!')
		}
	}, [content])
	
	useEffect(() => {
		console.debug(`useEffect: ${dataName} parsedContent`/*, parsedContent*/)
		
		if (parsedContent === undefined) return
		
		if (deepEqual(data, parsedContent)) {
			return
		}
		setData(parsedContent)
		setJsonFormError(false)
		
		console.debug(`${dataName} updated from ${editorName.toUpperCase()}`)
	}, [parsedContent])
	
	useEffect(() => {
		console.debug(`useEffect: ${dataName} data`, /*data,*/ !deepEqual(data, parsedContent))
		
		if (data === undefined) return
		
		if (deepEqual(data, parsedContent)) return
		
		console.debug(`${editorName} will be updated`)
		
		const newContent = JSON.stringify(data, null, 2)
		setContent(newContent)
		localStorage.setItem(editorName + '-content', newContent)
		setContentUpdatedFromEditor(false)
		setParsedContent(data)
	}, [data])
	
	const onTextChanged = (newContent) => {
		console.debug(`${editorName.toUpperCase()}: New content`/*, newContent*/)
		setContent(newContent)
		localStorage.setItem(editorName + '-content', newContent)
		setContentUpdatedFromEditor(true)
	}
	
	return (
			<div dir="ltr" className={classes.editorContainer}>
				<JsonEditor
						className={classes.editor}
						uri={`json://${editorName}.json`}
						style={dataError ? {boxShadow: '0 0 4px red'} : {}}
						initialContent={JSON.stringify(initialData, null, 2)}
						content={content}
						onTextChanged={onTextChanged}
				/>
				<Typography color="textSecondary" className={classes.editorLabel}>{dataName}</Typography>
			</div>
	)
}
