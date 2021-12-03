import deepEqual from '@graphix/deep-equal'
import {materialCells, materialRenderers} from '@jsonforms/material-renderers'
import {JsonForms} from '@jsonforms/react'
import {Box, Grid, makeStyles, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import Editor from './Editor.js'
import ErrorBoundary from './ErrorBoundary'
import {useLocation} from './LocationProvider.js'
import defSchema from './schema.json'
import defUiSchema from './uiSchema.json'

/**
 * Created on 1400/8/30 (2021/11/21).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

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

function App() {
  const classes = useStyles()
  const {hash} = useLocation()
  
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
          <Grid
              item xs={12} md={6} xl={hash.startsWith('#') ? 6 : 3}
              style={hash === '#1' ? {height: '100%'} : hash === '#2' ? {display: 'none'} : {}}
              className={classes.editorsGrid}
          >
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
          
          <Grid
              item xs={12} md={6} xl={hash.startsWith('#') ? 6 : 3}
              style={hash === '#1' ? {height: '100%'} : hash === '#2' ? {display: 'none'} : {}}
              className={classes.editorsGrid}
          >
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
          
          <Grid
              item xs={12} md={6} xl={hash.startsWith('#') ? 6 : 3}
              style={hash === '#2' ? {height: '100%'} : hash === '#1' ? {display: 'none'} : {}}
              className={classes.editorsGrid}
          >
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
          
          <Grid
              item xs={12} md={6} xl={hash.startsWith('#') ? 6 : 3}
              style={hash === '#2' ? {height: '100%'} : hash === '#1' ? {display: 'none'} : {}}
          >
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

function Form({schema, uiSchema, data, renderers, cells, onChange}) {
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

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: theme.spacing(1),
    width: '100%',
    height: '100vh',
  },
  form: {
    padding: theme.spacing(1),
  },
  editorsGrid: {
    [theme.breakpoints.down('lg')]: {
      height: '50%',
    },
  },
}))
