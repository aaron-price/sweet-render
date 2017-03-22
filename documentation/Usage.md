## Default Syntax
> sweetRender(input[, config])

Pass a string or array of strings as an argument to the sweetRender function.

Start each line with any opening html tag.

If you need to nest elements, use indentation. Double spaces (by default) will cause an element to become a child of whatever element appears above it with a smaller indent.

To add attributes, put them before the "|" (by default), but after the element type.

Separate multiple attributes with a comma followed by a space.

To interpolate or concatenate javascript, do it just like you normally would. Template literals have an extra interpolation syntax: ${}

Remember that the input is just a plain old javascript datatype. You have access to all the normal String.prototype methods.

```javascript
import { sweetRender } from "sweet-render";

const input = `
h1| Hello world
ul|
  li| I am a list item
  li| Here's a link:
    a href="http://aaroncoding.com"| click me!
`

sweetRender(input);

```


## Configuration
"|"s aren't good enough for you? No problem, you can make your own templating engine! Just pass it an object as the second argument, and override some of the defaults.

Almost everything is configurable. So much so, that you can design your own syntax.

The element tag (whatever wraps around "div", "ul", etc.) can have an opening tag and a different closing tag depending on whether the element takes attributes.
By default, the opening element and attribute tags are just blank strings, so it happens invisibly, but you can make it more obvious if you want.

The element and attribute segments can be joined (default) or totally separate by overriding the defaults.

```javascript
import { sweetRender } from "sweet-render";

const config = {
    elementOpenTag: "[[",
    elementCloseTagWithAttr: "]]",
    elementCloseTagWithoutAttr: "]]",

    attributeTagOpen: "(-:",
    attributeTagClose: ":-)",
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

# Next step
If you find that exciting, go dive into the configuration API

[NEXT: CONFIG >>>>](Config.md)
