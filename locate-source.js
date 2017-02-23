const port = process.env.PORT || 3222

const script = `
  (function() {
    var keyboardState = {};
    document.addEventListener('mousedown', function(e) {
      var dom = e.target;
      for (var key in dom) {
        if (key.startsWith("__reactInternalInstance$")) {
          window.__react$0 = dom[key]._currentElement;
          var compInternals = dom[key]._currentElement;
          if (compInternals && e.metaKey) {
            var source = compInternals._source;
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
            fetch('http://localhost:${port}/source?filename=' + source.fileName + '&line=' + source.lineNumber);
          }
        }
      }
    });
  })();
  `

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

const parse = require('url').parse
const path = require('path')

app.get('/open-in-editor.js', (req, res) => { res.end(script) })
app.get('/source', (req, res) => {
  res.end('ok')
  const q = parse(req.url, true).query
  const filename = path.resolve(__dirname, q.filename)
  res.end('ok')
  if (typeof q.line == 'undefined' || q.line === 'undefined') {
    return
  }
  messageAtom({
    pathsToOpen: [`${filename}:${q.line}${typeof q.column != 'undefined' ? (':' + q.column) : '' }`]
  })
})

http.createServer(app).listen(port)
