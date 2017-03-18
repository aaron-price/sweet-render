# Set up
## Node based environments

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

Renders to your page as:

### Hello world
* [Click me](http://aaroncoding.com)

Wasn't that easy? Now that you have your environment set up, you need to pick a format to use. 

[NEXT: FORMATS](Formats.md)


=======================


## Browser based environments

In your html:
 1. Grab the library from a CDN
 2. Make an element with class container
 3 Put your js anywhere below it.
 
index.html
```HTML
<html>
    <head>
        <script src="https://npmcdn.com/sweet-render/dist/index.umd.min.js"></script>
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

Renders to your page as:

### Hello world
* [Click me](http://aaroncoding.com)

Wasn't that easy? Now that you have your environment set up, you need to pick a format to use. 

[NEXT: FORMATS](Formats.md)
