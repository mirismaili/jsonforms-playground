import deepEqual from '@graphix/deep-equal'
import {materialCells, materialRenderers} from '@jsonforms/material-renderers'
import {JsonForms} from '@jsonforms/react'
import {Box, Grid, makeStyles, TextField} from '@material-ui/core'
import React, {useEffect, useRef, useState} from 'react'
import ErrorBoundary from './ErrorBoundary'
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

const useStyles = makeStyles(() => ({
	container: {
		padding: '1em',
		width: '100%',
	},
	demoForm: {
		padding: '1rem',
	},
}))

function App () {
	const classes = useStyles()
	const [data, setData] = useState(initialData)
	const [schema, setSchema] = useState(initialSchema)
	const [uiSchema, setUiSchema] = useState(initialUiSchema)
	
	const [dataError, setDataError] = useState('')
	const [uiSchemaError, setUiSchemaError] = useState('')
	const [schemaError, setSchemaError] = useState('')
	
	const dataInputField = useRef(null)
	
	const dataAsString = JSON.stringify(data, null, 2)
	
	useEffect(() => {
		if (dataInputField.current.value !== dataAsString) {
			dataInputField.current.value = dataAsString
		}
	}, [dataAsString])
	
	const muiTextFieldsCommonProps = {
		InputProps: {style: {fontFamily: 'monospace'}},
		multiline: true,
		fullWidth: true,
		minRows: 10,
		maxRows: 10,
		variant: 'outlined',
	}
	
	return (
			<Grid container spacing={1} className={classes.container}>
				<Grid item xs={12} md={6}>
					<Box mx={2}>
						<div className={classes.demoForm}>
							<ErrorBoundary>
								<JsonForms
										schema={schema}
										uischema={uiSchema}
										data={data}
										renderers={renderers}
										cells={materialCells}
										onChange={(event) => {
											// console.debug(event.errors)
											console.debug('FORM changed')
											if (!deepEqual(data, event.data)) {
												console.debug('Data edited from FORM')
												setData(event.data)
											}
										}}
								/>
							</ErrorBoundary>
						</div>
					</Box>
				</Grid>
				
				<Grid item dir="ltr" xs={12} md={6}>
					<Box mb={2}>
						<TextField
								{...muiTextFieldsCommonProps}
								onChange={(event) => {
									console.debug('DATA-EDITOR changed')
									try {
										const newData = JSON.parse(event.target.value)
										if (!deepEqual(data, newData)) {
											console.debug('Data edited from EDITOR')
											setData(newData)
										}
										setDataError('')
									} catch (e) {
										setDataError('Invalid JSON!')
									}
								}}
								error={!!dataError}
								helperText={' ' + dataError}
								label="Data"
								inputRef={(node) => { dataInputField.current = node }}
						/>
					</Box>
					
					<Box mb={2}>
						<TextField
								{...muiTextFieldsCommonProps}
								onChange={(event) => {
									console.debug('UI-SCHEMA-EDITOR changed')
									try {
										setUiSchema(JSON.parse(event.target.value))
										setUiSchemaError('')
									} catch (e) {
										setUiSchemaError('Invalid JSON!')
									}
								}}
								defaultValue={JSON.stringify(uiSchema, null, 2)}
								error={!!uiSchemaError}
								helperText={' ' + uiSchemaError}
								label="UI-Schema"
						/>
					</Box>
					
					<Box mb={2}>
						<TextField
								{...muiTextFieldsCommonProps}
								onChange={(event) => {
									console.debug('SCHEMA-EDITOR changed')
									try {
										setSchema(JSON.parse(event.target.value))
										setSchemaError('')
									} catch (e) {
										setSchemaError('Invalid JSON!')
									}
								}}
								defaultValue={JSON.stringify(schema, null, 2)}
								error={!!schemaError}
								helperText={' ' + schemaError}
								label="Schema"
						/>
					</Box>
				</Grid>
			</Grid>
	)
}

export default React.memo(App)
