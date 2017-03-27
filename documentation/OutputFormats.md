# Output Formats

### HTML
This is the default. No extra configuration needed, just execute the sweetRender function and it will render it as HTML inside the first element with class "container". So make sure you have an existing element with class container, or [configure it to find a different container](Config.md/#container).

### ReactJs

As of v1.2.0, you can render React components, allowing you to use sweetRender as a drop-in replacement for JSX. Note that it doesn't replace React itself, but it can replace all or part of the return statement of your component.

To render React, you must pass a config argument with an outputFormat property, using the React object as the value

```javascript
const config = {
    outputFormat: React  
};
```
#### outputFormat

This is not a string, it's passing in the actual React object you normally use. 
You will need to import React yourself, this is one thing that allows sweet-render to have no production dependencies, and therefore a very small footprint in your app.

It should work in any version of React you pass it.

#### outputRender

It's recommended that you don't touch the outputRender property, and just call sweetRender inside the return statement of an existing component. 
That way it will be rendered seamlessly with the rest of the component.

If you need to totally separate concerns, you can still do that and call the sweetRender function from outside of a component.
To do that, you will need to pass it your ReactDOM function as the render property. 

This is code:
```javascript
const input = `p|Hello world`
const config = {outputFormat: React, outputRender: ReactDOM}
sweetRender(input, config)
```

is roughly equivalent to this:
```javascript
ReactDOM.render(
    <p>Hello World</p>,
    document.getElementByClassName("container")[0]
);
```

By default, it will render to the first DOM element with class "container". See [Configuration Docs](Config.md/#container) for details

Using ReactDOM as the render property is quite limited because it doesn't come with everything you usually get with React. Remember, sweet-render can't replace React, even if it can replace JSX.

#### Building input for React

In order to pass props and state to your sweetRender syntax, you can easily put it inline... or wrap it in a function if you need to call it from outside the component.
 
```javascript
/**************************/
// Basic function
const input = function(props) {
    return (`
p| Hello ${props.value}
`);
}
class MyComponent extends Component {
    render() {
       return sweetRender(input(this.props), config) 
    }
}

/**************************/
// es6 arrow function
const input = (props) => `h1| Hello ${props.value}`
class MyComponent extends Component {
    render() {
       return sweetRender(input(this.props), config) 
    }
}

/**************************/
// Inline
class MyComponent extends Component {
    render() {
       return sweetRender(`
h1| Hello ${this.props.value}
`, config) 
    }
}
/**************************/
```

#### Putting it all together

So the full file could like this:
```javascript
import React, { Component } from "react";
import sweetRender from "sweet-render";

const input = (props) => `h1| Hello ${props.value}`;

const config = {
    outputFormat: React
};

// Use the sweetRender function as the return statement
// Stateless functional component
const MyStatelessFunctionalComponent = (props) => {
    return sweetRender(input(props), config);
}

// Stateful class component
class MyStatefulClassComponent extends Component {
    render() {
        return sweetRender(input(this.props), config);
    }
}

// As part of existing JSX
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
const Foo = (props) => {
    return sweetRender(`p|Hello ${props.val}`, config);
}

```