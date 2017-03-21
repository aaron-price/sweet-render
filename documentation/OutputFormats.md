# Output Formats

### HTML
This is the default. No extra configuration needed, just execute the sweetRender function and it will render it as HTML inside the first element with class "container". So make sure you have an existing element with class container, or []configure it to find a different container](Config.md/#container).

### ReactJs

As of v1.2.0, you can render React components, allowing you to use sweetRender as a drop-in replacement for JSX. Note that it doesn't replace React itself, but it can replace all or part of the return statement of your component.

To render React, you must pass a config argument with an output object, with both of these properties:

```javascript
const config = {
    output: {
        format: React,
        render: "default",
    }
};
```
#### output.format

This is not a string, it's passing in the actual React object you normally use. 
You will need to import React yourself, this is one thing that allows sweet-render to have no production dependencies, and therefore a very small footprint in your app.

It should work in any version of React you pass it.

#### output.render

It's recommended that you use "default" and just call sweetRender inside the return statement of your component. 
That way it will be rendered seamlessly with the rest of the component.

If you need to totally separate concerns, you can still do that and call the sweetRender function from outside of a component.
To do that, you will need to pass it your ReactDOM function as the render property. 
By default, it will render to the first DOM element with class "container". See [Configuration Docs](Config.md/#container) for details

Using ReactDOM as the render property is not yet stable

#### Input

In order to pass props and state to your sweetRender syntax, you can easily put in inline... or wrap it in a function if you need to call it from outside the component.
 
```javascript
// anonymous function
const input = function(props) {
    return (`
<p> Hello ${props.value}
`
    );
}

// es6 arrow function
const input = (props) => `<h1> Hello ${props.value}`

// Inline
class MyComponent extends Component {
    render() {
       return sweetRender(`
<h1> Hello ${this.props.value}
`, config) 
    }
}
```
 
 


```javascript
import React, { Component } from "react";
import sweetRender from "sweet-render";

const input = (props) => `<h1>Hello ${props.value}`;

const config = {
    output: {
        format: React,
        render: "default",
    }
};

// Use the sweetRender function as the return statement
const MyStatelessFunctionalComponent = (props) => {
    return sweetRender(input(props), config);
}

// or

class MyStatefulClassComponent extends Component {
    render() {
        return sweetRender(input(this.props), config);
    }
}

// or as part of existing JSX

const myInterpolationExample = (props) => {
    return (
        <div>
            <h1> Time to greet someone</h1>
            {sweetRender(input(props), config)}
            <p>words words words words</p>
        </div>
    );
}

// All of these examples assume that there is, in fact, a value prop passed from a parent, like usual.
class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "room"
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                value: "WORLD!"
            });
        }, 2000);
    }
    render() {
        return (
            <div>
                 <Foo val={this.state.val} />
            </div>
        );
    }
};

```