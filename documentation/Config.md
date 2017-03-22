# Configuration

You can override any of these defaults:

```
elementOpenTag: "",
elementCloseTagWithAttr: " ",
elementCloseTagWithoutAttr: "|",


attributeTagOpen: "",
attributeTagClose: "|",
attributesSeparator: ", ",


indentString: "  ",


outputContainer: ".container",
outputFormat: "HTML",
outputRender: "default",


preset: "default",
    
```

## outputContainer

**Default**:

".container" (the first element with class "container")

**Type**: 

string OR array

**Default example**

```javascript
<div></div>
<div class="container">This is the container</div>
<div></div>
```

**Customized example** 

const config = {outputContainer: [".foo", 3]}

````javascript
<div class="foo"></div>
<div class="foo"></div>
<div class="foo"></div>
<div class="foo">This is the container</div>
<div class="foo"></div>
````

**Description** 

The target element in which to render your input.

**Usage**

Start with either "." for class, "#" for id. 
If you use a class but don't want to target the first of it's kind, pass an array instead of a string, with the string as the first element and the nth number as the second.
If you pass a class as a string, the nth instance parameter will default to 0.

## Tags

**Default**: 
elementOpenTag: "" (empty string)
elementCloseTagWithAttr: " "  (single space)
elementCloseTagWithoutAttr: "|" (pipe)
attributeTagOpen: "" (empty string)
attributeTagClose: "|", (pipe)

**Type**: string
**Default Example**

```
a href="www.aaroncoding.com", class="batman"| The href and class are attributes
p| This paragraph has no attributes
```

**Customized Example**

```Javascript
const config = {
    elementOpenTag: "<",
    elementCloseTagWithoutAttr: ">",
    elementCloseTagWithAttr: ">",
    attributeTagOpen: "{",
    attributeTagClose: "}"
    
}

const input = `
<a> {href="www.aaroncoding.com", class="batman"} href and class are attributes
<p> This paragraph has no attributes
`
```

**Description**: 

Contains the tags for opening and closing elements and attributes. Can be almost any string, any length.

sweetRender will start looking for the attribute open tag as soon as it sees the element close (with attributes).

## attributesSeparator

**Default**: 
```
", "
```
(Single space after a comma)

**Type**:

string

**Default Example**

```
div style="margin: auto", class="foo", href="www.aaroncoding.com"| Hello World
```

**Customized Example**

```Javascript
const config = {attributesSeparator: " BAM "}

div style="margin: auto" BAM class="foo" BAM href="www.aaroncoding.com"| Hello World
```

**Description**: 

When you have multiple attributes in an element, this is how you need to separate them. 

**Known issues**

A single space *can* work, but you will need to be careful with spaces within a given attribute. For example inline styles with spaces


## indentString

**Default**: 
```
"  "
``` 
(Two spaces)

**Type**: string

**Default example**:

```
div|
  ul|
    li| first list item
    li| I have a link
      a href="http://aaroncoding.com"| here
    li| third list item
p| No more lists.
```

**Customized example**

```
const config = {indentString: "-_"}

div|
-_ul|
-_-_li| first list item
-_-_li| I have a link
-_-_-_a href="http://aaroncoding.com"| here
-_-_li| third list item
p| No more lists.
```

**Description**: 

The string that counts as an indent. 
Can be a different number of spaces, or different string entirely.

# Presets

**Description**:

Override some of the default settings with one of the presets

## Preset: Smiley

```javascript
const config = {preset: "smiley"}

```


```
elementOpenTag: ":-)",
elementCloseTagWithAttr: " ",
elementCloseTagWithoutAttr: "(-:",

attributeTagOpen: "X-D",
attributeTagClose: "8-P",
```
example
```
:-)a href="www.aaroncoding.com", class="batman"8-P The href and class are attributes
:-)p(-: This paragraph has no attributes
```



## Preset: surprised

```javascript
const config = {preset: "surprised"}

```

```
elementOpenTag: "!",
elementCloseTagWithAttr: "!",
elementCloseTagWithoutAttr: "!",

attributeTagOpen: "!",
attributeTagClose: "!",
```
example
```
!a! !href="www.aaroncoding.com", class="batman"! The href and class are attributes
!p! This paragraph has no attributes
```


## Preset: verbose
```javascript
const config = {preset: "verbose"}

```

```
elementOpenTag: "el",
elementCloseTagWithAttr: "el",
elementCloseTagWithoutAttr: "el",

attributeTagOpen: "attr",
attributeTagClose: "attr",
```
example
```
el a el attr href="www.aaroncoding.com", class="batman" attr The href and class are attributes
el p el This paragraph has no attributes
```


## Preset: html
```javascript
const config = {preset: "html"}

```

```
elementOpenTag: "<",
elementCloseTagWithAttr: " ",
elementCloseTagWithoutAttr: ">",

attributeTagOpen: "",
attributeTagClose: ">",
```
example
```
<a href="www.aaroncoding.com", class="batman"> The href and class are attributes
<p> This paragraph has no attributes
```