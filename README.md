# Sweet Render
#### A build-your-own-templating-engine sandbox

## How it works
1. Choose an input format (String, array, json)
2. Choose an output format (HTML, React)
3. Invent your own syntax, or use a default.
4. Automagically render it to the page.

## Table of contents:

  - [Set up](https://github.com/aaron-price/sweet-render/blob/master/documentation/Setup.md/)
    - [Node based environments](https://github.com/aaron-price/sweet-render/blob/master/documentation/Setup.md/#node-based-environments)
    - [Browser based environments](https://github.com/aaron-price/sweet-render/blob/master/documentation/Setup.md/#browser-based-environments)
    
  - [Input Formats](https://github.com/aaron-price/sweet-render/blob/master/documentation/Formats.md/)
    - [Template literals](https://github.com/aaron-price/sweet-render/blob/master/documentation/Formats.md/#template-literal-backticks)
    - [Arrays of strings](https://github.com/aaron-price/sweet-render/blob/master/documentation/Formats.md/#arrays-of-strings)
    - [JSON](https://github.com/aaron-price/sweet-render/blob/master/documentation/Formats.md/#json)
    - [Strings](https://github.com/aaron-price/sweet-render/blob/master/documentation/Formats.md/#strings)
 
  - [Output Formats](https://github.com/aaron-price/sweet-render/blob/master/documentation/Output-Formats.md/)
    - [HTML](https://github.com/aaron-price/sweet-render/blob/master/documentation/Output-Formats.md/#html)
    - [ReactJs](https://github.com/aaron-price/sweet-render/blob/master/documentation/Output-Formats.md/#reactjs)
  
  - [Usage](https://github.com/aaron-price/sweet-render/blob/master/documentation/Usage.md/)
    - [Default syntax](https://github.com/aaron-price/sweet-render/blob/master/documentation/Usage.md/#default-syntax)
    - [Configuration](https://github.com/aaron-price/sweet-render/blob/master/documentation/Config.md/#configuration)
    
## General bragging
#### Lightweight
This package has no production dependencies, and no excess bloat.
gzipped, it comes to 4kb total.

#### Modern
Works fine in older javascript.
Utilizes es6+ if you do.

Can be used as an alternative to React's JSX. Invent your own syntax and use that instead.