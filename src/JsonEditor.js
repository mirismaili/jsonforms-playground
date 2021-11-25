import {editor as monacoEditor, languages, Uri} from 'monaco-editor'
import React, {useEffect, useLayoutEffect, useRef} from 'react'

window.Uri = Uri
// noinspection JSUnusedGlobalSymbols
window.MonacoEnvironment = {
	getWorker (moduleId, label) {
		console.debug({label})
		switch (label) {
		case 'editorWorkerService':
			return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url))
		case 'json':
			return new Worker(new URL('monaco-editor/esm/vs/language/json/json.worker.js', import.meta.url))
		default:
			throw new Error(`Unknown label ${label}`)
		}
	},
}

languages.json.jsonDefaults.setDiagnosticsOptions({
	validate: true,
	enableSchemaRequest: true,
	format: true,
	hover: true,
	completion: true,
	schemas: [{
		uri: 'json://data-editor.json',
		fileMatch: ['schema-editor.json'],
		schema: {
			type: 'object',
			properties: {
				property: {
					description: 'I have a description',
				},
				titledProperty: {
					title: 'I have a title',
					description: 'I also have a description',
				},
				markdown: {
					markdownDescription: 'Even **markdown** _descriptions_ `are` ~~not~~ supported!',
				},
				enum: {
					description: 'Pick your starter',
					enum: ['Bulbasaur', 'Squirtle', 'Charmander', 'Pikachu'],
				},
				number: {
					description: 'Numbers work!',
					minimum: 42,
					maximum: 1337,
				},
				boolean: {
					description: 'Are boolean supported?',
					type: 'boolean',
				},
				string: {
					type: 'string',
				},
				reference: {
					description: 'JSON schemas can be referenced, even recursively',
					$ref: '#',
				},
				array: {
					description: 'It also works in arrays',
					items: {
						$ref: '#',
					},
				},
			},
		},
	}],
})

/**
 *
 * @param {string|DONT_UPDATE_CONTENT.} content
 * @param editorRef
 * @param onTextChanged
 * @param {string} [uri]
 * @param rest
 * @return {JSX.Element}
 * @constructor
 */
function JsonEditor ({
	content = `{
  "name": "jsonforms-playground",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": [
      "node scripts/start.js",
      "node scripts/build.js"
    ],
    "build-for-gh-pages": "cross-env GENERATE_SOURCEMAP=false BUILD_PATH=dist PUBLIC_URL=dist node scripts/build.js && mv dist/index.html index.html",
    "test": "node scripts/test.js"
  }
}`, editorRef = {}, onTextChanged = () => {}, uri = 'json://data.json', ...rest
}) {
	const editorContainer = useRef(null)
	const editor = useRef(null)
	
	useLayoutEffect(() => {
		if (editor.current) { return }
		
		editor.current = monacoEditor.create(editorContainer.current, {
			automaticLayout: true,
			model: monacoEditor.createModel('', 'json', Uri.parse(uri)),
			theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'vs-light',
			fontSize: '16px',
			lineNumbers: 'on',
			scrollBeyondLastLine: false,
			readOnly: false,
			minimap: {
				enabled: false,
			},
		})
		
		editor.current.getModel().onDidChangeContent(() => {
			onTextChanged(editor.current.getValue())
		})
		
		editorRef.current = editor.current
		
		return () => void (editor.current.getModel()?.dispose()) // eslint-disable-line no-void
	}, [])
	
	useEffect(() => {
		console.debug(uri, 'NEW CONTENT', content === DONT_UPDATE_CONTENT ? 'DONT_UPDATE_CONTENT' : '')
		// console.log(content)
		if (content !== DONT_UPDATE_CONTENT) {
			editor.current.setValue(content)
		}
	}, [content])
	
	return <div {...rest} ref={editorContainer}/>
}

export class DONT_UPDATE_CONTENT {}

export default React.memo(JsonEditor)