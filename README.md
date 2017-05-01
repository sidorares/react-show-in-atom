# react-show-in-atom

[![Greenkeeper badge](https://badges.greenkeeper.io/sidorares/react-show-in-atom.svg)](https://greenkeeper.io/)

Navigate to line of code where react element is defined by clicking on it
Currently only for Atom editor


installation:

`
npm install -g react-show-in-atom
`

- enable jsx source plugin in your compilation step - https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source
- Add `<script src='http://localhost:3222/open-in-editor.js'></script>` to your page
- start server by typing `show-in-atom` ( or `./.bin/show-in-atom` if installed locally )
- Command+mouse click on the element to open source for the element, Command+Shift+mouse click to navigate to owner element source.
