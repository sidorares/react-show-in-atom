# react-show-in-atom

Navigate to line of code where react element is defined by clicking on it.
Currently only for Atom editor


installation:

`
npm install -g react-show-in-atom
`

- enable jsx source plugin in your compilation step - https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source
- Add `<script src='http://localhost:3222/open-in-editor.js'></script>` to your page
- start server by typing `show-in-atom` ( or `./node_modules/.bin/show-in-atom` if installed locally )
- Command+mouse click on the element to open source for the element, Command+Shift+mouse click to navigate to owner element source.

# linux, osx:
no need to do anything, should connect to atom automatically

# windows:

before starting 'show-in-atom': (TODO: research a way to automate this using node core or windows built in functionality)

1) locate pipe name for atom using [pipelist](https://technet.microsoft.com/en-us/sysinternals/dd581625.aspx)
2) set `ATOM_SOCK` variable to be `\\.\pipe\[pipe name]`
