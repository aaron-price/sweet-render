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

```javascript
import { sweetRender } from "sweet-render";

const input = `
<h1> Hello world
<ul>
  <li> I am a list item
  <li> Here's a link:
    <a href="http://aaroncoding.com"> click me!
`

sweetRender(input);

```


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
            closeWithAttr: "]]",# Next step
Now that you have your environment set up, you need to pick a format to use. 

[NEXT: FORMATS >>>>](Formats.md)
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

# Next step
If you find that exciting, go dive into the configuration API

[NEXT: CONFIG >>>>](Config.md)
