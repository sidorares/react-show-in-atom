# react-show-in-atom

Navigate to line of code where react element is defined by clicking on it
Currently only for Atom editor


installation:

`
npm install -g react-show-in-atom
`

1) enable jsx source plugin in your compilation step - https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source
2) Add `<script src='http://localhost:3222/open-in-editor.js'></script>` to your page
3) start server by typing `show-in-atom` ( or `./.bin/show-in-atom` if installed locally )
4) Command+mouse click on the element to open source for the element, Command+Shift+mouse click to navigate to owner element source.
