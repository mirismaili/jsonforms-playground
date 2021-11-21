import {materialCells, materialRenderers} from '@jsonforms/material-renderers'
import {JsonForms} from '@jsonforms/react'
import {Box, Grid, makeStyles, TextField} from '@material-ui/core'
import React, {useEffect, useRef, useState} from 'react'
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
		padding: '1em',
		width: '100%',
	},
	title: {
		padding: '0.25em',
	},
	dataContent: {
		fontFamily: 'monospace !important',
	},
	resetButton: {
		margin: 'auto',
		display: 'block',
	},
	demoForm: {
		margin: 'auto',
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
			<Grid
					container
					spacing={1}
					className={classes.container}
			>
				<Grid item xs={12} md={6}>
					<Box mx={2}>
						<div className={classes.demoForm}>
							<JsonForms
									schema={schema}
									uischema={uiSchema}
									data={data}
									renderers={renderers}
									cells={materialCells}
									onChange={({errors, data}) => setData(data)}
							/>
						</div>
					</Box>
				</Grid>
				
				<Grid item xs={12} md={6}>
					<Box mx={2}>
						<TextField
								{...muiTextFieldsCommonProps}
								onChange={(event) => {
									try {
										setData(JSON.parse(event.target.value))
										setDataError(null)
									} catch (e) {
										setDataError('JSON Parse Error!')
									}
								}}
								error={!!dataError}
								helperText={dataError ? dataError : ' '}
								label="Data"
								inputRef={(node) => { dataInputField.current = node }}
						/>
					</Box>
					
					<Box mx={2}>
						<TextField
								{...muiTextFieldsCommonProps}
								onChange={(event) => {
									try {
										setUiSchema(JSON.parse(event.target.value))
										setUiSchemaError(null)
									} catch (e) {
										setUiSchemaError('JSON Parse Error!')
									}
								}}
								defaultValue={JSON.stringify(uiSchema, null, 2)}
								error={!!uiSchemaError}
								helperText={uiSchemaError ? uiSchemaError : ' '}
								label="UI-Schema"
						/>
					</Box>
					
					<Box mx={2}>
						<TextField
								{...muiTextFieldsCommonProps}
								onChange={(event) => {
									try {
										setSchema(JSON.parse(event.target.value))
										setSchemaError(null)
									} catch (e) {
										setSchemaError('JSON Parse Error!')
									}
								}}
								defaultValue={JSON.stringify(schema, null, 2)}
								error={!!schemaError}
								helperText={schemaError ? schemaError : ' '}
								label="Schema"
						/>
					</Box>
				</Grid>
			</Grid>
	)
}

export default React.memo(App)
