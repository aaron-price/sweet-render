# Sweet Render
#### A lightweight, customizable, syntactic sugar template engine.
Add it anywhere in your javascript to render html DOM elements.

## Set up:
index.html
```
<html>
    <head>
        <script src="index.js" type="text/javascript"/>
    </head>
    <body>
        <div class="container"></div>
    </body>
</html>
```

index.js
```
import sweet_render from "sweet-render";

const input = `
@h3@ Hello world
`

sweet_render(input);
```

converts into:
```
<h3>Hello world</h3>
```

Renders to your page as:
### Hello world

## Syntax
Use the es6 template literal (backtick) to create a multiline string, and pass it as an argument to the sweet_render function.

Start each line with any html tag wrapped in @s
If there is no tag, it defaults to @span@. Note that if you want to start the span content with a space, you'll need to explicitly declare @span@ otherwise it'll conflict with the indentation

To add attributes, wrap all of them in a single pair of !s
Separate multiple attributes with spaces

Spaces after a closing element or closing attribute tag are optional.

To nest elements, indent them with 2 spaces.

To interpolate or concatenate javascript, do it just like you would with any other template literal string.

Example:
```
@div@ ! height="${some_variable}px", width="300px", style="text-align: center" !
  @p@ In the middle
    @a@ ! href="http://aaroncoding.com" ! click me!
    I'm a span in a paragraph
  @ul@
    @li@ first list item
    @li@ second list item

```

## Configuration
@s aren't good enough for you? No problem, you can make your own templating engine! Just pass it a config parameter and override some of the defaults.

```
import sweet_render from "sweet-render";

const config = {
    element_tag: "<$>",
    attributes_tag: "ATTR"
}

const input = `
<$>ul<$>
  <$>li<$> first list item
  <$>li<$>
    <$>a<$> ATTR href="http://aaroncoding.com" ATTR click me!
`

sweet_render(input, config);

```

You can override any of these defaults in the same manner:
```
container: ".container",
element_tag: "@",
attributes_tag: "!",
attributes_separator: ", ",
indent_str: "  ",
```
### Config details
#### container
**Default**: ".container" (the first element with class "container")
**Type**: string OR array
**Default example**
<div></div>
<div class="container">This is the container</div>
<div></div>

**Customized example** 
const config = {container: [".foo", 3]}

<div class="foo"></div>
<div class="foo"></div>
<div class="foo"></div>
<div class="foo">This is the container</div>
<div class="foo"></div>

**Description** The target element in which to render your input.
**Usage**
Start with either "." for class, "#" for id. 
If you use a class but don't want to target the first of it's kind, pass an array instead of a string, with the string as the first element and the nth number as the second.
If you pass a class as a string, the nth instance parameter will default to 0.

#### element_tag
**Default**: "@"
**Type**: string
**Default Example**
@a@ !href="www.aaroncoding.com", class="batman"!
**Customized Example**
const config = {element_tag: "$$"}

$$a$$ !href="www.aaroncoding.com", class="batman"!
**Description**: Contains the element type. Can be any string, any length... except spaces.

#### attributes_tag
**Default**: "!"
**Type**: string
**Default Example**
@a@ !href="www.aaroncoding.com", class="batman"!
**Customized Example**
const config = {attributes_tag: "$$"}

@a@ $$href="www.aaroncoding.com", class="batman"$$
**Description**: Contains the attribute(s). Can be any string, any length... except spaces.

#### attributes_separator
**Default**: ", " (Note the space after the comma)
**Type**: string
**Default Example** 
!style="margin: auto", class="foo", href="www.aaroncoding.com"!
**Customized Example**
const config = {attributes_separator: " BAM "}

!style="margin: auto" BAM class="foo" BAM href="www.aaroncoding.com"!

**Description**: When you have multiple attributes in an element, this is how you need to separate them. A single space *can* work, but you will need to be careful with spaces within a given attribute.


#### indent_str
**Default**: "  " (That's two spaces)
**Type**: string
**Default example**:
@div@
  @p@
**Customized example** 
const config = {indent_str: "--"}

@div@
--@p@
**Description**: The string that counts as an indent. Can be a different number of spaces, or something else entirely

