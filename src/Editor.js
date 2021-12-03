import deepEqual from '@graphix/deep-equal'
import {makeStyles, Typography} from '@material-ui/core'
import React, {useCallback, useEffect, useState} from 'react'
import JsonEditor from './JsonEditor'

function Editor({
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
  const [contentUpdatedFromLocalStorage, setContentUpdatedFromLocalStorage] = useState(false)
  
  const syncWithStorage = useCallback((event) => {
    if (event.key === `${editorName}-content`) {
      setContent(event.newValue)
      setContentUpdatedFromLocalStorage(true)
    }
  }, [])
  
  useEffect(() => {
    window.addEventListener('storage', syncWithStorage)
    return () => {
      window.removeEventListener('storage', syncWithStorage)
    }
  }, [])
  
  useEffect(() => {
    console.debug(`useEffect: ${dataName} content`, /* content, */ contentUpdatedFromEditor || data !== parsedContent)
    
    if (content === undefined) return
    
    if (!contentUpdatedFromEditor && data === parsedContent) {
      return
    }
    
    if (!contentUpdatedFromLocalStorage) {
      localStorage.setItem(editorName + '-content', content)
    } else {
      setContentUpdatedFromLocalStorage(false)
    }
    
    try {
      setParsedContent(JSON.parse(content))
      setDataError('')
    } catch (e) {
      setDataError('Invalid JSON!')
    }
  }, [content])
  
  useEffect(() => {
    console.debug(`useEffect: ${dataName} parsedContent`/*, parsedContent */)
    
    if (parsedContent === undefined) return
    
    if (deepEqual(data, parsedContent)) {
      return
    }
    setData(parsedContent)
    setJsonFormError(false)
    
    console.debug(`${dataName} updated from ${editorName.toUpperCase()}`)
  }, [parsedContent])
  
  useEffect(() => {
    console.debug(`useEffect: ${dataName} data`, /* data, */ !deepEqual(data, parsedContent))
    
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
    console.debug(`${editorName.toUpperCase()}: New content`/*, newContent */)
    setContent(newContent)
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

export default React.memo(Editor)

const useStyles = makeStyles((theme) => ({
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
