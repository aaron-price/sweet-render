# Accepted Formats
sweet-render is meant to be as flexible as possible, and take whatever format you give it.

### Template literal backticks
(ES6+ only) Use the template literal (backtick) to create a multiline string.

```javascript
const input = `
<h1> Hello World
<ul>
  <li> This is a list item!
`
```

### Arrays of strings
```javascript
var input = [
    "<h1> Hello World",
    "<ul>",
    "  <li> This is a list item!"
];
```

### JSON
```json
{
    "input": [
        "<h3> Hello World",
        "<ul>",
        "  <li> This is a list item!"
    ]
}
```

### Strings
Concatenate multiple strings together, with a "\n" at the end of each line.

```Javascript
var input = "" +
"<h1> Hello World\n" +
"<ul>\n" +
"  <li> This is a list item!\n"
```

# Next Step

Great, you know your input options. Now time to use it

[NEXT: USAGE >>>>](Usage.md)
