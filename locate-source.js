#!/usr/bin/env node

const port = process.env.PORT || 3222

var injectClickHandler = function() {
  var source = null;
  document.addEventListener('mousedown', function(e) {
    var targetElement = e.target;
    for (var key in targetElement) {
      if (key.startsWith('__reactInternalInstance$')) {
        var compInternals = targetElement[key]._currentElement;
        if (compInternals && e.metaKey) {
          source = compInternals._source;
          while (!source) {
            compInternals = compInternals._owner._currentElement;
            source = compInternals._source
          }
          if (compInternals && e.shiftKey) {
            compInternals = compInternals._owner._currentElement;
            source = compInternals._source
            while (!source) {
              compInternals = compInternals._owner._currentElement;
              source = compInternals._source
            }
          }
          fetch('http://localhost:${port}/go-to-element-source?filename=' + source.fileName + '&line=' + source.lineNumber);
        }
      }
    }
  });
};

const express = require('express')
const app = express()
const http = require('http')

const net = require('net')
const sock = process.env.ATOM_SOCK || require('child_process').execSync(`lsof -c Atom | grep sock | awk '{print $NF}'`).toString().split('\n').join('')

console.log(`Using socket ${sock} to talk to Atom`)

const messageAtom = m => {
  const s = net.connect(sock)
  s.write(JSON.stringify(m))
  s.end()
}

const openInAtom = (fileName, lineNumber) => {
  messageAtom({
    pathsToOpen: [`${fileName}:${lineNumber}`]
  })
}

const parse = require('url').parse
const path = require('path')

app.get('/open-in-editor.js', (req, res) => {
  res.end(`(${injectClickHandler.toString()})()`)
})

app.get('/go-to-element-source', (req, res) => {
  res.end('ok')
  const q = parse(req.url, true).query
  const fileName = path.resolve(__dirname, q.filename)
  const lineNumber = q.line
  res.end('ok')
  if (typeof lineNumber === 'undefined' || lineNumber === 'undefined') {
    return
  }
  openInAtom(fileName, lineNumber)
})

http.createServer(app).listen(port)
