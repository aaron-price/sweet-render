# Sweet Render
#### A build-your-own-templating-engine sandbox
Add it anywhere in your javascript to render html DOM elements.
Use the default, or the powerful customization API.


Table of contents:
[Set up](#Set-up)
  - [Node based environments](#Node-based-environments)
  - [Browser based environments](#Browser-based-environments)
  - [Accepted Formats](#Accepted-Formats)
    - [Template literals](#Template-literal-backticks)
    - [Arrays of strings](#Arrays-of-strings)
    - [JSON](#JSON)
    - [Strings](#Strings)
Usage
  - [Default Syntax](#Default-Syntax)
  - [Configuration](#Configuration)

## Set up
### Node based environments

```BASH
npm install --save sweet-render
```

In your html make an element with class container, and put your js anywhere below it.
index.html
```HTML
<html>
    <body>
        <div class="container"></div>
        <script src="index.js" type="text/javascript"/>
    </body>
</html>
```

In your script, import sweetRender from the package, and pass it an input string using a multiline template literal 
index.js
```Javascript
import { sweetRender } from "sweet-render";
let some_variable = "aaroncoding";

const input = `
<h3> Hello World!
<ul>
  <li>
    <a href="http://${some_variable}.com"> Click me!
<p> Wasn't that easy?
`

sweetRender(input);
```

It automatically converts into:
```HTML
<h3>Hello world</h3>
<ul>
  <li>
    <a href="http://aaroncoding.com">Click Me</a>
  </li>
</ul>
<p> Wasn't that easy?</p>
```

Which renders to your page as:

### Hello world
* [Click me](http://aaroncoding.com)

Wasn't that easy?


## Browser based environments


In your html:
 1. Grab the library from a CDN
 2. Make an element with class container
 3 Put your js anywhere below it.
 
index.html
```HTML
<html>
    <head>
        <script src="https://npmcdn.com/sweet-render"></script>
    </head>
    <body>
        <div class="container"></div>
        <script src="index.js" type="text/javascript"/>
    </body>
</html>
```

In your script, pass the sweetRender.sweetRender() function an input string using a multiline template literal 
index.js
```Javascript
let some_variable = "aaroncoding";

const input = `
<h3> Hello World!
<ul>
  <li>
    <a href="http://${some_variable}.com"> Click me!
<p> Wasn't that easy?
`;

sweetRender.sweetRender(input);
```

It automatically converts into:
```HTML
<h3>Hello world</h3>
<ul>
  <li>
    <a href="http://aaroncoding.com">Click Me</a>
  </li>
</ul>
<p> Wasn't that easy?</p>
```

Which renders to your page as:

### Hello world
* [Click me](http://aaroncoding.com)

Wasn't that easy?

## Accepted Formats
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
var some_url = "aaroncoding";
var input = "" +
"<h1> Hello World\n" +
"<ul>\n" +
"  <li> This is a list item!\n"
```


## Default Syntax
> sweetRender(input[, config])

Pass a string or array of strings as an argument to the sweetRender function.

Start each line with any opening html tag.

If there is no tag, it defaults to "<span>". Note that if you want to start the span content with a space, or add attributes to it, you'll need to explicitly declare "<span>" otherwise it'll conflict with the indentation.
Speaking of indentation, that's how nesting elements works. Double spaces (by default) will cause an element to become a child of whatever element appears above it with a smaller indent.

To add attributes, wrap all of them in the ">" bracket as well (by default).

Separate multiple attributes with a comma followed by a space.

Spaces after a ">" are optional.

To interpolate or concatenate javascript, do it just like you normally would. Template literals have an extra interpolation syntax: ${}

## Configuration
"<"s aren't good enough for you? No problem, you can make your own templating engine! Just pass it an object as the second argument, and override some of the defaults.

Almost everything is configurable. So much so, that you can design your own syntax.

The element tag (whatever wraps around "div", "ul", etc.) can have an opening tag and a different closing tag depending on whether the element takes attributes.

So you can have element and attribute segments joined (default) or totally separate by overriding the defaults like this:

```javascript
import { sweetRender } from "sweet-render";

const config = {
    tags: {
        element: {
            open: "[[",
            closeWithAttr: "]]",
            closeWithoutAttr: "]]"
        },
        attribute: {
            open: "(-:",
            close: ":-)",
        },
    }
}

const input = `
[[h1]] Hello world
[[ul]]
  [[li]] I am a list item
  [[li]] Here's a link:
    [[a]] (-:href="http://aaroncoding.com":-) click me!
`

sweetRender(input, config);

```

A tag can be any string. It can be identical or different from any other string. By composing them in different ways, there is room for tremendous creativity.

You can override any of these defaults:

```
container: ".container",
tags: {
    element: {
        open: "<",
        closeWithAttr: " ",
        closeWithoutAttr: ">",
    },
    attribute: {
        open: "",
        close: ">",
    },
},
attributes_separator: ", ",
indent_str: "  "
```

# Config details

## container

**Default**:

".container" (the first element with class "container")

**Type**: 

string OR array

**Default example**

```Javascript
<div></div>
<div class="container">This is the container</div>
<div></div>
```

**Customized example** 

const config = {container: [".foo", 3]}

```Javascript
<div class="foo"></div>
<div class="foo"></div>
<div class="foo"></div>
<div class="foo">This is the container</div>
<div class="foo"></div>
```

**Description** 

The target element in which to render your input.

**Usage**

Start with either "." for class, "#" for id. 
If you use a class but don't want to target the first of it's kind, pass an array instead of a string, with the string as the first element and the nth number as the second.
If you pass a class as a string, the nth instance parameter will default to 0.

## tags.element

**Default**: 
open: "<"
closeWithAttr: " "  (single space)
closeWithoutAttr: ">"

**Type**: string
**Default Example**

```
<a href="www.aaroncoding.com", class="batman"> href and class are attributes
<p> This paragraph has no attributes
```

**Customized Example**

```Javascript
const config = {
    tags: {
        element: {
            open: "$$",
            closeWithoutAttr: "$$"
        }
    }
}

const input = `
$$a href="www.aaroncoding.com", class="batman"> href and class are attributes
$$p$$ This paragraph has no attributes
`
```

**Description**: 

Contains the element type. Can be almost any string, any length.

**Known issues**: 

Don't open with spaces if you also indent with spaces.

## tags.attribute

**Default**:
open: ""    (blank string)
close: ">"

**Type**: 

string

**Default Example**

```
<a !href="www.aaroncoding.com", class="batman"> Click me
```

**Customized Example**

```Javascript
const config = {
    tags: {
        element: {
            open: "$$",
            closeWithoutAttr: "$$",
            closeWithAttr: "!"
        },
        attribute: {
            open: "{",
            close: "}"
        }
    }
}

const input = `
$$a! {href="www.aaroncoding.com", class="batman"} href and class are attributes
$$p$$ This paragraph has no attributes
`
```

**Description**: 

Contains the attribute(s). Can be almost any string, any length.
sweetRender will start looking for the attribute open tag as soon as it sees the element close.

## attributes_separator

**Default**: 
```
", "
```
(Single space after a comma)

**Type**:

string

**Default Example**

```
<div style="margin: auto", class="foo", href="www.aaroncoding.com">
```

**Customized Example**

```Javascript
const config = {attributes_separator: " BAM "}

<div style="margin: auto" BAM class="foo" BAM href="www.aaroncoding.com">
```

**Description**: 

When you have multiple attributes in an element, this is how you need to separate them. 

**Known issues**

A single space *can* work, but you will need to be careful with spaces within a given attribute. For example inline styles with spaces


## indent_str

**Default**: 
```
"  "
``` 
(Two spaces)

**Type**: string

**Default example**:

```
<div>
  <p> Hello
```

**Customized example**

```
const config = {indent_str: "--"}

<div>
--<p> Hello
```

**Description**: 

The string that counts as an indent. 
Can be a different number of spaces, or different string entirely.
