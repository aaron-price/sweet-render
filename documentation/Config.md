# Configuration

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
