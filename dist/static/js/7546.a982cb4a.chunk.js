"use strict";(self.webpackChunkjsonforms_playground=self.webpackChunkjsonforms_playground||[]).push([[7546],{7546:function(n,e,t){t.r(e),t.d(e,{setupMode:function(){return Dn}});var r,i,o,a,s,u,c,d,f,g,l,h,p,v,m,_,w,y,b,k,C,E,x,I,A,j,M=t(6506),S=function(){function n(n){var e=this;this._defaults=n,this._worker=null,this._idleCheckInterval=window.setInterval((function(){return e._checkIfIdle()}),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((function(){return e._stopWorker()}))}return n.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},n.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},n.prototype._checkIfIdle=function(){this._worker&&(Date.now()-this._lastUsedTime>12e4&&this._stopWorker())},n.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=M.j6.createWebWorker({moduleId:"vs/language/css/cssWorker",label:this._defaults.languageId,createData:{options:this._defaults.options,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client},n.prototype.getLanguageServiceWorker=function(){for(var n,e=this,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return this._getClient().then((function(e){n=e})).then((function(n){return e._worker.withSyncedResources(t)})).then((function(e){return n}))},n}();!function(n){n.MIN_VALUE=-2147483648,n.MAX_VALUE=2147483647}(r||(r={})),function(n){n.MIN_VALUE=0,n.MAX_VALUE=2147483647}(i||(i={})),function(n){n.create=function(n,e){return n===Number.MAX_VALUE&&(n=i.MAX_VALUE),e===Number.MAX_VALUE&&(e=i.MAX_VALUE),{line:n,character:e}},n.is=function(n){var e=n;return fn.objectLiteral(e)&&fn.uinteger(e.line)&&fn.uinteger(e.character)}}(o||(o={})),function(n){n.create=function(n,e,t,r){if(fn.uinteger(n)&&fn.uinteger(e)&&fn.uinteger(t)&&fn.uinteger(r))return{start:o.create(n,e),end:o.create(t,r)};if(o.is(n)&&o.is(e))return{start:n,end:e};throw new Error("Range#create called with invalid arguments["+n+", "+e+", "+t+", "+r+"]")},n.is=function(n){var e=n;return fn.objectLiteral(e)&&o.is(e.start)&&o.is(e.end)}}(a||(a={})),function(n){n.create=function(n,e){return{uri:n,range:e}},n.is=function(n){var e=n;return fn.defined(e)&&a.is(e.range)&&(fn.string(e.uri)||fn.undefined(e.uri))}}(s||(s={})),function(n){n.create=function(n,e,t,r){return{targetUri:n,targetRange:e,targetSelectionRange:t,originSelectionRange:r}},n.is=function(n){var e=n;return fn.defined(e)&&a.is(e.targetRange)&&fn.string(e.targetUri)&&(a.is(e.targetSelectionRange)||fn.undefined(e.targetSelectionRange))&&(a.is(e.originSelectionRange)||fn.undefined(e.originSelectionRange))}}(u||(u={})),function(n){n.create=function(n,e,t,r){return{red:n,green:e,blue:t,alpha:r}},n.is=function(n){var e=n;return fn.numberRange(e.red,0,1)&&fn.numberRange(e.green,0,1)&&fn.numberRange(e.blue,0,1)&&fn.numberRange(e.alpha,0,1)}}(c||(c={})),function(n){n.create=function(n,e){return{range:n,color:e}},n.is=function(n){var e=n;return a.is(e.range)&&c.is(e.color)}}(d||(d={})),function(n){n.create=function(n,e,t){return{label:n,textEdit:e,additionalTextEdits:t}},n.is=function(n){var e=n;return fn.string(e.label)&&(fn.undefined(e.textEdit)||y.is(e))&&(fn.undefined(e.additionalTextEdits)||fn.typedArray(e.additionalTextEdits,y.is))}}(f||(f={})),function(n){n.Comment="comment",n.Imports="imports",n.Region="region"}(g||(g={})),function(n){n.create=function(n,e,t,r,i){var o={startLine:n,endLine:e};return fn.defined(t)&&(o.startCharacter=t),fn.defined(r)&&(o.endCharacter=r),fn.defined(i)&&(o.kind=i),o},n.is=function(n){var e=n;return fn.uinteger(e.startLine)&&fn.uinteger(e.startLine)&&(fn.undefined(e.startCharacter)||fn.uinteger(e.startCharacter))&&(fn.undefined(e.endCharacter)||fn.uinteger(e.endCharacter))&&(fn.undefined(e.kind)||fn.string(e.kind))}}(l||(l={})),function(n){n.create=function(n,e){return{location:n,message:e}},n.is=function(n){var e=n;return fn.defined(e)&&s.is(e.location)&&fn.string(e.message)}}(h||(h={})),function(n){n.Error=1,n.Warning=2,n.Information=3,n.Hint=4}(p||(p={})),function(n){n.Unnecessary=1,n.Deprecated=2}(v||(v={})),function(n){n.is=function(n){var e=n;return void 0!==e&&null!==e&&fn.string(e.href)}}(m||(m={})),function(n){n.create=function(n,e,t,r,i,o){var a={range:n,message:e};return fn.defined(t)&&(a.severity=t),fn.defined(r)&&(a.code=r),fn.defined(i)&&(a.source=i),fn.defined(o)&&(a.relatedInformation=o),a},n.is=function(n){var e,t=n;return fn.defined(t)&&a.is(t.range)&&fn.string(t.message)&&(fn.number(t.severity)||fn.undefined(t.severity))&&(fn.integer(t.code)||fn.string(t.code)||fn.undefined(t.code))&&(fn.undefined(t.codeDescription)||fn.string(null===(e=t.codeDescription)||void 0===e?void 0:e.href))&&(fn.string(t.source)||fn.undefined(t.source))&&(fn.undefined(t.relatedInformation)||fn.typedArray(t.relatedInformation,h.is))}}(_||(_={})),function(n){n.create=function(n,e){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var i={title:n,command:e};return fn.defined(t)&&t.length>0&&(i.arguments=t),i},n.is=function(n){var e=n;return fn.defined(e)&&fn.string(e.title)&&fn.string(e.command)}}(w||(w={})),function(n){n.replace=function(n,e){return{range:n,newText:e}},n.insert=function(n,e){return{range:{start:n,end:n},newText:e}},n.del=function(n){return{range:n,newText:""}},n.is=function(n){var e=n;return fn.objectLiteral(e)&&fn.string(e.newText)&&a.is(e.range)}}(y||(y={})),function(n){n.create=function(n,e,t){var r={label:n};return void 0!==e&&(r.needsConfirmation=e),void 0!==t&&(r.description=t),r},n.is=function(n){var e=n;return void 0!==e&&fn.objectLiteral(e)&&fn.string(e.label)&&(fn.boolean(e.needsConfirmation)||void 0===e.needsConfirmation)&&(fn.string(e.description)||void 0===e.description)}}(b||(b={})),function(n){n.is=function(n){return"string"===typeof n}}(k||(k={})),function(n){n.replace=function(n,e,t){return{range:n,newText:e,annotationId:t}},n.insert=function(n,e,t){return{range:{start:n,end:n},newText:e,annotationId:t}},n.del=function(n,e){return{range:n,newText:"",annotationId:e}},n.is=function(n){var e=n;return y.is(e)&&(b.is(e.annotationId)||k.is(e.annotationId))}}(C||(C={})),function(n){n.create=function(n,e){return{textDocument:n,edits:e}},n.is=function(n){var e=n;return fn.defined(e)&&L.is(e.textDocument)&&Array.isArray(e.edits)}}(E||(E={})),function(n){n.create=function(n,e,t){var r={kind:"create",uri:n};return void 0===e||void 0===e.overwrite&&void 0===e.ignoreIfExists||(r.options=e),void 0!==t&&(r.annotationId=t),r},n.is=function(n){var e=n;return e&&"create"===e.kind&&fn.string(e.uri)&&(void 0===e.options||(void 0===e.options.overwrite||fn.boolean(e.options.overwrite))&&(void 0===e.options.ignoreIfExists||fn.boolean(e.options.ignoreIfExists)))&&(void 0===e.annotationId||k.is(e.annotationId))}}(x||(x={})),function(n){n.create=function(n,e,t,r){var i={kind:"rename",oldUri:n,newUri:e};return void 0===t||void 0===t.overwrite&&void 0===t.ignoreIfExists||(i.options=t),void 0!==r&&(i.annotationId=r),i},n.is=function(n){var e=n;return e&&"rename"===e.kind&&fn.string(e.oldUri)&&fn.string(e.newUri)&&(void 0===e.options||(void 0===e.options.overwrite||fn.boolean(e.options.overwrite))&&(void 0===e.options.ignoreIfExists||fn.boolean(e.options.ignoreIfExists)))&&(void 0===e.annotationId||k.is(e.annotationId))}}(I||(I={})),function(n){n.create=function(n,e,t){var r={kind:"delete",uri:n};return void 0===e||void 0===e.recursive&&void 0===e.ignoreIfNotExists||(r.options=e),void 0!==t&&(r.annotationId=t),r},n.is=function(n){var e=n;return e&&"delete"===e.kind&&fn.string(e.uri)&&(void 0===e.options||(void 0===e.options.recursive||fn.boolean(e.options.recursive))&&(void 0===e.options.ignoreIfNotExists||fn.boolean(e.options.ignoreIfNotExists)))&&(void 0===e.annotationId||k.is(e.annotationId))}}(A||(A={})),function(n){n.is=function(n){var e=n;return e&&(void 0!==e.changes||void 0!==e.documentChanges)&&(void 0===e.documentChanges||e.documentChanges.every((function(n){return fn.string(n.kind)?x.is(n)||I.is(n)||A.is(n):E.is(n)})))}}(j||(j={}));var T,R,L,D,P,F,N,O,U,W,V,H,K,z,X,Z,B,$,q,Q,G,J,Y,nn,en,tn,rn,on,an,sn,un=function(){function n(n,e){this.edits=n,this.changeAnnotations=e}return n.prototype.insert=function(n,e,t){var r,i;if(void 0===t?r=y.insert(n,e):k.is(t)?(i=t,r=C.insert(n,e,t)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(t),r=C.insert(n,e,i)),this.edits.push(r),void 0!==i)return i},n.prototype.replace=function(n,e,t){var r,i;if(void 0===t?r=y.replace(n,e):k.is(t)?(i=t,r=C.replace(n,e,t)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(t),r=C.replace(n,e,i)),this.edits.push(r),void 0!==i)return i},n.prototype.delete=function(n,e){var t,r;if(void 0===e?t=y.del(n):k.is(e)?(r=e,t=C.del(n,e)):(this.assertChangeAnnotations(this.changeAnnotations),r=this.changeAnnotations.manage(e),t=C.del(n,r)),this.edits.push(t),void 0!==r)return r},n.prototype.add=function(n){this.edits.push(n)},n.prototype.all=function(){return this.edits},n.prototype.clear=function(){this.edits.splice(0,this.edits.length)},n.prototype.assertChangeAnnotations=function(n){if(void 0===n)throw new Error("Text edit change is not configured to manage change annotations.")},n}(),cn=function(){function n(n){this._annotations=void 0===n?Object.create(null):n,this._counter=0,this._size=0}return n.prototype.all=function(){return this._annotations},Object.defineProperty(n.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),n.prototype.manage=function(n,e){var t;if(k.is(n)?t=n:(t=this.nextId(),e=n),void 0!==this._annotations[t])throw new Error("Id "+t+" is already in use.");if(void 0===e)throw new Error("No annotation provided for id "+t);return this._annotations[t]=e,this._size++,t},n.prototype.nextId=function(){return this._counter++,this._counter.toString()},n}();!function(){function n(n){var e=this;this._textEditChanges=Object.create(null),void 0!==n?(this._workspaceEdit=n,n.documentChanges?(this._changeAnnotations=new cn(n.changeAnnotations),n.changeAnnotations=this._changeAnnotations.all(),n.documentChanges.forEach((function(n){if(E.is(n)){var t=new un(n.edits,e._changeAnnotations);e._textEditChanges[n.textDocument.uri]=t}}))):n.changes&&Object.keys(n.changes).forEach((function(t){var r=new un(n.changes[t]);e._textEditChanges[t]=r}))):this._workspaceEdit={}}Object.defineProperty(n.prototype,"edit",{get:function(){return this.initDocumentChanges(),void 0!==this._changeAnnotations&&(0===this._changeAnnotations.size?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),n.prototype.getTextEditChange=function(n){if(L.is(n)){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var e={uri:n.uri,version:n.version};if(!(r=this._textEditChanges[e.uri])){var t={textDocument:e,edits:i=[]};this._workspaceEdit.documentChanges.push(t),r=new un(i,this._changeAnnotations),this._textEditChanges[e.uri]=r}return r}if(this.initChanges(),void 0===this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[n])){var i=[];this._workspaceEdit.changes[n]=i,r=new un(i),this._textEditChanges[n]=r}return r},n.prototype.initDocumentChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._changeAnnotations=new cn,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},n.prototype.initChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._workspaceEdit.changes=Object.create(null))},n.prototype.createFile=function(n,e,t){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(b.is(e)||k.is(e)?r=e:t=e,void 0===r?i=x.create(n,t):(o=k.is(r)?r:this._changeAnnotations.manage(r),i=x.create(n,t,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o},n.prototype.renameFile=function(n,e,t,r){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var i,o,a;if(b.is(t)||k.is(t)?i=t:r=t,void 0===i?o=I.create(n,e,r):(a=k.is(i)?i:this._changeAnnotations.manage(i),o=I.create(n,e,r,a)),this._workspaceEdit.documentChanges.push(o),void 0!==a)return a},n.prototype.deleteFile=function(n,e,t){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(b.is(e)||k.is(e)?r=e:t=e,void 0===r?i=A.create(n,t):(o=k.is(r)?r:this._changeAnnotations.manage(r),i=A.create(n,t,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o}}();!function(n){n.create=function(n){return{uri:n}},n.is=function(n){var e=n;return fn.defined(e)&&fn.string(e.uri)}}(T||(T={})),function(n){n.create=function(n,e){return{uri:n,version:e}},n.is=function(n){var e=n;return fn.defined(e)&&fn.string(e.uri)&&fn.integer(e.version)}}(R||(R={})),function(n){n.create=function(n,e){return{uri:n,version:e}},n.is=function(n){var e=n;return fn.defined(e)&&fn.string(e.uri)&&(null===e.version||fn.integer(e.version))}}(L||(L={})),function(n){n.create=function(n,e,t,r){return{uri:n,languageId:e,version:t,text:r}},n.is=function(n){var e=n;return fn.defined(e)&&fn.string(e.uri)&&fn.string(e.languageId)&&fn.integer(e.version)&&fn.string(e.text)}}(D||(D={})),function(n){n.PlainText="plaintext",n.Markdown="markdown"}(P||(P={})),function(n){n.is=function(e){var t=e;return t===n.PlainText||t===n.Markdown}}(P||(P={})),function(n){n.is=function(n){var e=n;return fn.objectLiteral(n)&&P.is(e.kind)&&fn.string(e.value)}}(F||(F={})),function(n){n.Text=1,n.Method=2,n.Function=3,n.Constructor=4,n.Field=5,n.Variable=6,n.Class=7,n.Interface=8,n.Module=9,n.Property=10,n.Unit=11,n.Value=12,n.Enum=13,n.Keyword=14,n.Snippet=15,n.Color=16,n.File=17,n.Reference=18,n.Folder=19,n.EnumMember=20,n.Constant=21,n.Struct=22,n.Event=23,n.Operator=24,n.TypeParameter=25}(N||(N={})),function(n){n.PlainText=1,n.Snippet=2}(O||(O={})),function(n){n.Deprecated=1}(U||(U={})),function(n){n.create=function(n,e,t){return{newText:n,insert:e,replace:t}},n.is=function(n){var e=n;return e&&fn.string(e.newText)&&a.is(e.insert)&&a.is(e.replace)}}(W||(W={})),function(n){n.asIs=1,n.adjustIndentation=2}(V||(V={})),function(n){n.create=function(n){return{label:n}}}(H||(H={})),function(n){n.create=function(n,e){return{items:n||[],isIncomplete:!!e}}}(K||(K={})),function(n){n.fromPlainText=function(n){return n.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},n.is=function(n){var e=n;return fn.string(e)||fn.objectLiteral(e)&&fn.string(e.language)&&fn.string(e.value)}}(z||(z={})),function(n){n.is=function(n){var e=n;return!!e&&fn.objectLiteral(e)&&(F.is(e.contents)||z.is(e.contents)||fn.typedArray(e.contents,z.is))&&(void 0===n.range||a.is(n.range))}}(X||(X={})),function(n){n.create=function(n,e){return e?{label:n,documentation:e}:{label:n}}}(Z||(Z={})),function(n){n.create=function(n,e){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var i={label:n};return fn.defined(e)&&(i.documentation=e),fn.defined(t)?i.parameters=t:i.parameters=[],i}}(B||(B={})),function(n){n.Text=1,n.Read=2,n.Write=3}($||($={})),function(n){n.create=function(n,e){var t={range:n};return fn.number(e)&&(t.kind=e),t}}(q||(q={})),function(n){n.File=1,n.Module=2,n.Namespace=3,n.Package=4,n.Class=5,n.Method=6,n.Property=7,n.Field=8,n.Constructor=9,n.Enum=10,n.Interface=11,n.Function=12,n.Variable=13,n.Constant=14,n.String=15,n.Number=16,n.Boolean=17,n.Array=18,n.Object=19,n.Key=20,n.Null=21,n.EnumMember=22,n.Struct=23,n.Event=24,n.Operator=25,n.TypeParameter=26}(Q||(Q={})),function(n){n.Deprecated=1}(G||(G={})),function(n){n.create=function(n,e,t,r,i){var o={name:n,kind:e,location:{uri:r,range:t}};return i&&(o.containerName=i),o}}(J||(J={})),function(n){n.create=function(n,e,t,r,i,o){var a={name:n,detail:e,kind:t,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},n.is=function(n){var e=n;return e&&fn.string(e.name)&&fn.number(e.kind)&&a.is(e.range)&&a.is(e.selectionRange)&&(void 0===e.detail||fn.string(e.detail))&&(void 0===e.deprecated||fn.boolean(e.deprecated))&&(void 0===e.children||Array.isArray(e.children))&&(void 0===e.tags||Array.isArray(e.tags))}}(Y||(Y={})),function(n){n.Empty="",n.QuickFix="quickfix",n.Refactor="refactor",n.RefactorExtract="refactor.extract",n.RefactorInline="refactor.inline",n.RefactorRewrite="refactor.rewrite",n.Source="source",n.SourceOrganizeImports="source.organizeImports",n.SourceFixAll="source.fixAll"}(nn||(nn={})),function(n){n.create=function(n,e){var t={diagnostics:n};return void 0!==e&&null!==e&&(t.only=e),t},n.is=function(n){var e=n;return fn.defined(e)&&fn.typedArray(e.diagnostics,_.is)&&(void 0===e.only||fn.typedArray(e.only,fn.string))}}(en||(en={})),function(n){n.create=function(n,e,t){var r={title:n},i=!0;return"string"===typeof e?(i=!1,r.kind=e):w.is(e)?r.command=e:r.edit=e,i&&void 0!==t&&(r.kind=t),r},n.is=function(n){var e=n;return e&&fn.string(e.title)&&(void 0===e.diagnostics||fn.typedArray(e.diagnostics,_.is))&&(void 0===e.kind||fn.string(e.kind))&&(void 0!==e.edit||void 0!==e.command)&&(void 0===e.command||w.is(e.command))&&(void 0===e.isPreferred||fn.boolean(e.isPreferred))&&(void 0===e.edit||j.is(e.edit))}}(tn||(tn={})),function(n){n.create=function(n,e){var t={range:n};return fn.defined(e)&&(t.data=e),t},n.is=function(n){var e=n;return fn.defined(e)&&a.is(e.range)&&(fn.undefined(e.command)||w.is(e.command))}}(rn||(rn={})),function(n){n.create=function(n,e){return{tabSize:n,insertSpaces:e}},n.is=function(n){var e=n;return fn.defined(e)&&fn.uinteger(e.tabSize)&&fn.boolean(e.insertSpaces)}}(on||(on={})),function(n){n.create=function(n,e,t){return{range:n,target:e,data:t}},n.is=function(n){var e=n;return fn.defined(e)&&a.is(e.range)&&(fn.undefined(e.target)||fn.string(e.target))}}(an||(an={})),function(n){n.create=function(n,e){return{range:n,parent:e}},n.is=function(e){var t=e;return void 0!==t&&a.is(t.range)&&(void 0===t.parent||n.is(t.parent))}}(sn||(sn={}));var dn;!function(n){function e(n,t){if(n.length<=1)return n;var r=n.length/2|0,i=n.slice(0,r),o=n.slice(r);e(i,t),e(o,t);for(var a=0,s=0,u=0;a<i.length&&s<o.length;){var c=t(i[a],o[s]);n[u++]=c<=0?i[a++]:o[s++]}for(;a<i.length;)n[u++]=i[a++];for(;s<o.length;)n[u++]=o[s++];return n}n.create=function(n,e,t,r){return new gn(n,e,t,r)},n.is=function(n){var e=n;return!!(fn.defined(e)&&fn.string(e.uri)&&(fn.undefined(e.languageId)||fn.string(e.languageId))&&fn.uinteger(e.lineCount)&&fn.func(e.getText)&&fn.func(e.positionAt)&&fn.func(e.offsetAt))},n.applyEdits=function(n,t){for(var r=n.getText(),i=e(t,(function(n,e){var t=n.range.start.line-e.range.start.line;return 0===t?n.range.start.character-e.range.start.character:t})),o=r.length,a=i.length-1;a>=0;a--){var s=i[a],u=n.offsetAt(s.range.start),c=n.offsetAt(s.range.end);if(!(c<=o))throw new Error("Overlapping edit");r=r.substring(0,u)+s.newText+r.substring(c,r.length),o=u}return r}}(dn||(dn={}));var fn,gn=function(){function n(n,e,t,r){this._uri=n,this._languageId=e,this._version=t,this._content=r,this._lineOffsets=void 0}return Object.defineProperty(n.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),n.prototype.getText=function(n){if(n){var e=this.offsetAt(n.start),t=this.offsetAt(n.end);return this._content.substring(e,t)}return this._content},n.prototype.update=function(n,e){this._content=n.text,this._version=e,this._lineOffsets=void 0},n.prototype.getLineOffsets=function(){if(void 0===this._lineOffsets){for(var n=[],e=this._content,t=!0,r=0;r<e.length;r++){t&&(n.push(r),t=!1);var i=e.charAt(r);t="\r"===i||"\n"===i,"\r"===i&&r+1<e.length&&"\n"===e.charAt(r+1)&&r++}t&&e.length>0&&n.push(e.length),this._lineOffsets=n}return this._lineOffsets},n.prototype.positionAt=function(n){n=Math.max(Math.min(n,this._content.length),0);var e=this.getLineOffsets(),t=0,r=e.length;if(0===r)return o.create(0,n);for(;t<r;){var i=Math.floor((t+r)/2);e[i]>n?r=i:t=i+1}var a=t-1;return o.create(a,n-e[a])},n.prototype.offsetAt=function(n){var e=this.getLineOffsets();if(n.line>=e.length)return this._content.length;if(n.line<0)return 0;var t=e[n.line],r=n.line+1<e.length?e[n.line+1]:this._content.length;return Math.max(Math.min(t+n.character,r),t)},Object.defineProperty(n.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),n}();!function(n){var e=Object.prototype.toString;n.defined=function(n){return"undefined"!==typeof n},n.undefined=function(n){return"undefined"===typeof n},n.boolean=function(n){return!0===n||!1===n},n.string=function(n){return"[object String]"===e.call(n)},n.number=function(n){return"[object Number]"===e.call(n)},n.numberRange=function(n,t,r){return"[object Number]"===e.call(n)&&t<=n&&n<=r},n.integer=function(n){return"[object Number]"===e.call(n)&&-2147483648<=n&&n<=2147483647},n.uinteger=function(n){return"[object Number]"===e.call(n)&&0<=n&&n<=2147483647},n.func=function(n){return"[object Function]"===e.call(n)},n.objectLiteral=function(n){return null!==n&&"object"===typeof n},n.typedArray=function(n,e){return Array.isArray(n)&&n.every(e)}}(fn||(fn={}));var ln=function(){function n(n,e,t){var r=this;this._languageId=n,this._worker=e,this._disposables=[],this._listener=Object.create(null);var i=function(n){var e,t=n.getLanguageId();t===r._languageId&&(r._listener[n.uri.toString()]=n.onDidChangeContent((function(){window.clearTimeout(e),e=window.setTimeout((function(){return r._doValidate(n.uri,t)}),500)})),r._doValidate(n.uri,t))},o=function(n){M.j6.setModelMarkers(n,r._languageId,[]);var e=n.uri.toString(),t=r._listener[e];t&&(t.dispose(),delete r._listener[e])};this._disposables.push(M.j6.onDidCreateModel(i)),this._disposables.push(M.j6.onWillDisposeModel(o)),this._disposables.push(M.j6.onDidChangeModelLanguage((function(n){o(n.model),i(n.model)}))),t.onDidChange((function(n){M.j6.getModels().forEach((function(n){n.getLanguageId()===r._languageId&&(o(n),i(n))}))})),this._disposables.push({dispose:function(){for(var n in r._listener)r._listener[n].dispose()}}),M.j6.getModels().forEach(i)}return n.prototype.dispose=function(){this._disposables.forEach((function(n){return n&&n.dispose()})),this._disposables=[]},n.prototype._doValidate=function(n,e){this._worker(n).then((function(e){return e.doValidation(n.toString())})).then((function(t){var r=t.map((function(n){return function(n,e){var t="number"===typeof e.code?String(e.code):e.code;return{severity:hn(e.severity),startLineNumber:e.range.start.line+1,startColumn:e.range.start.character+1,endLineNumber:e.range.end.line+1,endColumn:e.range.end.character+1,message:e.message,code:t,source:e.source}}(0,n)})),i=M.j6.getModel(n);i&&i.getLanguageId()===e&&M.j6.setModelMarkers(i,e,r)})).then(void 0,(function(n){console.error(n)}))},n}();function hn(n){switch(n){case p.Error:return M.ZL.Error;case p.Warning:return M.ZL.Warning;case p.Information:return M.ZL.Info;case p.Hint:return M.ZL.Hint;default:return M.ZL.Info}}function pn(n){if(n)return{character:n.column-1,line:n.lineNumber-1}}function vn(n){if(n)return new M.e6(n.start.line+1,n.start.character+1,n.end.line+1,n.end.character+1)}function mn(n){var e=M.Mj.CompletionItemKind;switch(n){case N.Text:return e.Text;case N.Method:return e.Method;case N.Function:return e.Function;case N.Constructor:return e.Constructor;case N.Field:return e.Field;case N.Variable:return e.Variable;case N.Class:return e.Class;case N.Interface:return e.Interface;case N.Module:return e.Module;case N.Property:return e.Property;case N.Unit:return e.Unit;case N.Value:return e.Value;case N.Enum:return e.Enum;case N.Keyword:return e.Keyword;case N.Snippet:return e.Snippet;case N.Color:return e.Color;case N.File:return e.File;case N.Reference:return e.Reference}return e.Property}function _n(n){if(n)return{range:vn(n.range),text:n.newText}}var wn=function(){function n(n){this._worker=n}return Object.defineProperty(n.prototype,"triggerCharacters",{get:function(){return["/","-",":"]},enumerable:!1,configurable:!0}),n.prototype.provideCompletionItems=function(n,e,t,r){var i=n.uri;return this._worker(i).then((function(n){return n.doComplete(i.toString(),pn(e))})).then((function(t){if(t){var r=n.getWordUntilPosition(e),i=new M.e6(e.lineNumber,r.startColumn,e.lineNumber,r.endColumn),o=t.items.map((function(n){var e,t,r={label:n.label,insertText:n.insertText||n.label,sortText:n.sortText,filterText:n.filterText,documentation:n.documentation,detail:n.detail,command:(e=n.command,e&&"editor.action.triggerSuggest"===e.command?{id:e.command,title:e.title,arguments:e.arguments}:void 0),range:i,kind:mn(n.kind)};return n.textEdit&&("undefined"!==typeof(t=n.textEdit).insert&&"undefined"!==typeof t.replace?r.range={insert:vn(n.textEdit.insert),replace:vn(n.textEdit.replace)}:r.range=vn(n.textEdit.range),r.insertText=n.textEdit.newText),n.additionalTextEdits&&(r.additionalTextEdits=n.additionalTextEdits.map(_n)),n.insertTextFormat===O.Snippet&&(r.insertTextRules=M.Mj.CompletionItemInsertTextRule.InsertAsSnippet),r}));return{isIncomplete:t.isIncomplete,suggestions:o}}}))},n}();function yn(n){return"string"===typeof n?{value:n}:(e=n)&&"object"===typeof e&&"string"===typeof e.kind?"plaintext"===n.kind?{value:n.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:n.value}:{value:"```"+n.language+"\n"+n.value+"\n```\n"};var e}function bn(n){if(n)return Array.isArray(n)?n.map(yn):[yn(n)]}var kn=function(){function n(n){this._worker=n}return n.prototype.provideHover=function(n,e,t){var r=n.uri;return this._worker(r).then((function(n){return n.doHover(r.toString(),pn(e))})).then((function(n){if(n)return{range:vn(n.range),contents:bn(n.contents)}}))},n}();function Cn(n){switch(n){case $.Read:return M.Mj.DocumentHighlightKind.Read;case $.Write:return M.Mj.DocumentHighlightKind.Write;case $.Text:return M.Mj.DocumentHighlightKind.Text}return M.Mj.DocumentHighlightKind.Text}var En=function(){function n(n){this._worker=n}return n.prototype.provideDocumentHighlights=function(n,e,t){var r=n.uri;return this._worker(r).then((function(n){return n.findDocumentHighlights(r.toString(),pn(e))})).then((function(n){if(n)return n.map((function(n){return{range:vn(n.range),kind:Cn(n.kind)}}))}))},n}();function xn(n){return{uri:M.Sf.parse(n.uri),range:vn(n.range)}}var In=function(){function n(n){this._worker=n}return n.prototype.provideDefinition=function(n,e,t){var r=n.uri;return this._worker(r).then((function(n){return n.findDefinition(r.toString(),pn(e))})).then((function(n){if(n)return[xn(n)]}))},n}(),An=function(){function n(n){this._worker=n}return n.prototype.provideReferences=function(n,e,t,r){var i=n.uri;return this._worker(i).then((function(n){return n.findReferences(i.toString(),pn(e))})).then((function(n){if(n)return n.map(xn)}))},n}();var jn=function(){function n(n){this._worker=n}return n.prototype.provideRenameEdits=function(n,e,t,r){var i=n.uri;return this._worker(i).then((function(n){return n.doRename(i.toString(),pn(e),t)})).then((function(n){return function(n){if(n&&n.changes){var e=[];for(var t in n.changes)for(var r=M.Sf.parse(t),i=0,o=n.changes[t];i<o.length;i++){var a=o[i];e.push({resource:r,edit:{range:vn(a.range),text:a.newText}})}return{edits:e}}}(n)}))},n}();function Mn(n){var e=M.Mj.SymbolKind;switch(n){case Q.File:return e.Array;case Q.Module:return e.Module;case Q.Namespace:return e.Namespace;case Q.Package:return e.Package;case Q.Class:return e.Class;case Q.Method:return e.Method;case Q.Property:return e.Property;case Q.Field:return e.Field;case Q.Constructor:return e.Constructor;case Q.Enum:return e.Enum;case Q.Interface:return e.Interface;case Q.Function:return e.Function;case Q.Variable:return e.Variable;case Q.Constant:return e.Constant;case Q.String:return e.String;case Q.Number:return e.Number;case Q.Boolean:return e.Boolean;case Q.Array:return e.Array}return e.Function}var Sn=function(){function n(n){this._worker=n}return n.prototype.provideDocumentSymbols=function(n,e){var t=n.uri;return this._worker(t).then((function(n){return n.findDocumentSymbols(t.toString())})).then((function(n){if(n)return n.map((function(n){return{name:n.name,detail:"",containerName:n.containerName,kind:Mn(n.kind),tags:[],range:vn(n.location.range),selectionRange:vn(n.location.range)}}))}))},n}(),Tn=function(){function n(n){this._worker=n}return n.prototype.provideDocumentColors=function(n,e){var t=n.uri;return this._worker(t).then((function(n){return n.findDocumentColors(t.toString())})).then((function(n){if(n)return n.map((function(n){return{color:n.color,range:vn(n.range)}}))}))},n.prototype.provideColorPresentations=function(n,e,t){var r=n.uri;return this._worker(r).then((function(n){return n.getColorPresentations(r.toString(),e.color,function(n){if(n)return{start:{line:n.startLineNumber-1,character:n.startColumn-1},end:{line:n.endLineNumber-1,character:n.endColumn-1}}}(e.range))})).then((function(n){if(n)return n.map((function(n){var e={label:n.label};return n.textEdit&&(e.textEdit=_n(n.textEdit)),n.additionalTextEdits&&(e.additionalTextEdits=n.additionalTextEdits.map(_n)),e}))}))},n}(),Rn=function(){function n(n){this._worker=n}return n.prototype.provideFoldingRanges=function(n,e,t){var r=n.uri;return this._worker(r).then((function(n){return n.getFoldingRanges(r.toString(),e)})).then((function(n){if(n)return n.map((function(n){var e={start:n.startLine+1,end:n.endLine+1};return"undefined"!==typeof n.kind&&(e.kind=function(n){switch(n){case g.Comment:return M.Mj.FoldingRangeKind.Comment;case g.Imports:return M.Mj.FoldingRangeKind.Imports;case g.Region:return M.Mj.FoldingRangeKind.Region}}(n.kind)),e}))}))},n}();var Ln=function(){function n(n){this._worker=n}return n.prototype.provideSelectionRanges=function(n,e,t){var r=n.uri;return this._worker(r).then((function(n){return n.getSelectionRanges(r.toString(),e.map(pn))})).then((function(n){if(n)return n.map((function(n){for(var e=[];n;)e.push({range:vn(n.range)}),n=n.parent;return e}))}))},n}();function Dn(n){var e=[],t=[],r=new S(n);e.push(r);var i=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return r.getLanguageServiceWorker.apply(r,n)};return function(){var e=n.languageId,r=n.modeConfiguration;Fn(t),r.completionItems&&t.push(M.Mj.registerCompletionItemProvider(e,new wn(i))),r.hovers&&t.push(M.Mj.registerHoverProvider(e,new kn(i))),r.documentHighlights&&t.push(M.Mj.registerDocumentHighlightProvider(e,new En(i))),r.definitions&&t.push(M.Mj.registerDefinitionProvider(e,new In(i))),r.references&&t.push(M.Mj.registerReferenceProvider(e,new An(i))),r.documentSymbols&&t.push(M.Mj.registerDocumentSymbolProvider(e,new Sn(i))),r.rename&&t.push(M.Mj.registerRenameProvider(e,new jn(i))),r.colors&&t.push(M.Mj.registerColorProvider(e,new Tn(i))),r.foldingRanges&&t.push(M.Mj.registerFoldingRangeProvider(e,new Rn(i))),r.diagnostics&&t.push(new ln(e,i,n)),r.selectionRanges&&t.push(M.Mj.registerSelectionRangeProvider(e,new Ln(i)))}(),e.push(Pn(t)),Pn(e)}function Pn(n){return{dispose:function(){return Fn(n)}}}function Fn(n){for(;n.length;)n.pop().dispose()}}}]);