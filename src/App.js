import deepEqual from '@graphix/deep-equal'
import {materialCells, materialRenderers} from '@jsonforms/material-renderers'
import {JsonForms} from '@jsonforms/react'
import {Box, Grid, Link, makeStyles, Tooltip, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import {APP_VERSION, BUILD_TIME, JSONFORMS_VERSION} from './constants.js'
import Editor from './Editor.js'
import ErrorBoundary from './ErrorBoundary'
import {useLocation, useParams} from './LocationProvider.js'
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
  const {hideinfo} = useParams()
  const [data, setData] = useState()
  const [dataError, setDataError] = useState('') // noinspection JSCheckFunctionSignatures
  
  const [schema, setSchema] = useState()
  const [schemaError, setSchemaError] = useState('') // noinspection JSCheckFunctionSignatures
  
  const [uiSchema, setUiSchema] = useState()
  const [uiSchemaError, setUiSchemaError] = useState('') // noinspection JSCheckFunctionSignatures
  
  const [jsonFormError, setJsonFormError] = useState(null)
  
  return (
    <Grid container className={classes.page}>
      <Grid
        item
        component="header"
        xs={12}
        className={classes.header}
        style={hideinfo === undefined ? {} : {display: 'none'}}
      >
        <Tooltip
          title={<>Built at <time dateTime={BUILD_TIME.toISOString()}>{BUILD_TIME.toLocaleDateString()}</time></>}
        >
          <Typography component="span" variant="body2">
            JsonForms Playground v{APP_VERSION}
          </Typography>
        </Tooltip>
      
        <Typography component="span" variant="body2">
          &nbsp; / Using <Link href="https://jsonforms.io/" target="_blank"><b>JSON</b>Forms</Link> v{JSONFORMS_VERSION}
        </Typography>
      
        <Box m={1}>
          <Typography variant="body2">
            <b>Multiple tabs/windows are synchronized!</b><br/>
            For example, You can open <b>JSON-Schema</b> and <b>UI-Schema</b> editors in the current window/tab (
            <Link href="#1">#1</Link>
            ) and <b>Data</b> editor and <b>Form</b> in another window/tab (
            <Link onClick={() => {
              window.open('#2', 'Playground Tab 2',
                `width=${window.screen.availWidth - 100},height=${window.screen.availHeight - 100}`)
              return false
            }} target="_blank" href="#2">#2</Link>
            ).
          </Typography>
        </Box>
        <Box m={1}>
          <Typography variant="body2">
            Hide this notation: <Link style={{cursor: 'pointer'}} onClick={
            () => {
              console.log('here')
              const newUrl = new URL(window.location)
              if (newUrl.searchParams.get('hideinfo') === null) {
                newUrl.searchParams.append('hideinfo', '')
                // newUrl.search = newUrl.search.slice(0, -1) // remove trailing "="
              }
              // noinspection JSCheckFunctionSignatures
              window.history.pushState(undefined, 'hide-info', newUrl)
              return false
            }
          }>?hideinfo</Link>
          </Typography>
        </Box>
      </Grid>
    
      <Grid component="main" container spacing={2} item xs={12} className={classes.main}>
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
            dataName="JSON-Schema"
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
                    <Typography component="pre" style={{fontFamily: 'Monospace'}}>
                      {jsonFormError.message}
                    </Typography>
                    <Typography component="pre" style={{fontFamily: 'Monospace'}}>
                      {jsonFormError.stack}
                    </Typography>
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
    </Grid>
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
  page: {
    padding: theme.spacing(1),
    width: '100%',
    height: '100vh',
    flexDirection: 'column',
    flexWrap: 'nowrap !important', // `!important` to overcome `container` prop (of <Grid>)
  },
  header: {
    padding: theme.spacing(0, 1),
    flexGrow: 0,
    flexBasis: 0,
  },
  main: {
    margin: 0,
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
