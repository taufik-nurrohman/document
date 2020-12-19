Document Utility
================

HTML document object utility.

Usage
-----

### CommonJS (TODO)

~~~ js
const {setElement} = require('@taufik-nurrohman/document');

console.log(setElement('div', 'Content goes here.', {
    'class': 'foo bar',
    'id': 'baz'
}));
~~~

### ECMAScript

~~~ js
import {setElement} = from '@taufik-nurrohman/document';

console.log(setElement('div', 'Content goes here.', {
    'class': 'foo bar',
    'id': 'baz'
}));
~~~

Methods
-------

### fromElement(node)

Convert element to array of element name, element content and element attributes.

### getAttribute(node, key, parseValue = true)

### getAttributes(node, parseValue = true)

### getClass(node)

### getClasses(node, toArray = true)

### getData(node, parseValue = true)

### getDatum(node, key, parseValue = true)

### getElement(query, scope = document)

### getElements(query, scope = document)

### getFormElement(nameOrIndex)

### getFormElements()

### getHTML(node, trim = true)

### getName(node)

Get element name.

### getNext(node)

### getParent(node)

Get element&rsquo;s parent.

### getParentForm(node)

Get closest `<form>` element from current element.

### getPrev(node)

### getScriptElements()

### getStyle(node, style)

### getStyles(node, styles)

### getStyleElements()

### getState(node, state)

### getText(node, trim = true)

### hasParent(node)

### hasState(node)

### isComment(node)

### isDocument(node)

### isElement(node)

### isParent(node, parent)

### isText(node)

### isWindow(node)

### letAttribute(node, key)

### letAttributes(node, attributes)

~~~ js
// Remove all attributes
letAttribute(node);

// Remove `class` and `id` attribute only
letAttribute(node, ['class', 'id']);

// Remove `class` and `id` attribute only
const removeValueAttribute = false;
letAttribute(node, {
    'class': true,
    'id': true,
    'value': removeValueAttribute // Keep this attribute
});
~~~

### letClass(node, class)

### letClasses(node, classes)

~~~ js
// Remove all class(es)
letClasses(node);

// Remove `foo` and `bar` class only
letClasses(node, ['foo', 'bar']);

// Remove `foo` and `bar` class only
const isButtonDisabled = false;
letClasses(node, {
    'active': isButtonDisabled, // Keep this class
    'foo': true,
    'bar': true
});
~~~

### letData(node, data)

~~~ js
// Remove all `data-*` attributes
letData(node);

// Remove `data-foo` and `data-bar` attribute only
letData(node, ['foo', 'bar']);

// Remove `data-foo` and `data-bar` attribute only
const removeBazData = false;
letData(node, {
    'foo': true,
    'bar': true,
    'baz': !removeBazData // Keep this attribute
});
~~~

### letDatum(node, key)

### letElement(node)

### letFirstChild(parent)

### letHTML(node)

### letLastChild(parent)

### letNext(node)

### letPrev(node)

### letState(node)

### letStyle(node, style)

### letStyles(node, styles)

### letText(node)

### setAttribute(node, key, value)

### setAttributes(node, attributes)

~~~ js
// Add `foo` and `bar` attributes
// Remove the `baz` attribute if exists
setAttributes(node, {
    'foo': 1,
    'bar': 100,
    'baz': false
});
~~~

### setClass(node, class)

### setClasses(node, classes)

~~~ js
// Set class values to `['foo', 'bar']`
setClasses(node, 'foo bar');

// Add `foo` and `bar` to the class values
setClasses(node, ['foo', 'bar']);

// Add `foo` and `bar` to the class values
// Remove the `baz` value if exists
setClasses(node, {
    'foo': true,
    'bar': true,
    'baz': false
});
~~~

### setData(node, data)

~~~ js
// Add `data-foo` and `data-bar` attributes
// Remove the `data-baz` attribute if exists
setData(node, {
    'foo': 1,
    'bar': 100,
    'baz': false
});
~~~

### setDatum(node, key, value)

### setElement(name|node, content, attributes)

Create a HTML element or update the existing HTML element.

~~~ js
console.log(setElement('div', 'Content goes here.', {
    'id': 'foo-bar'
}));

console.log(setElement('input', false, {
    'name': 'title',
    'type': 'text',
    'value': 'Title Goes Here'
}));

console.log(setElement('input', {
    'name': 'title',
    'type': 'text',
    'value': 'Title Goes Here'
}));
~~~

~~~ js
let input = queryElement('input[name="title"][type="text"]');

console.log(setElement(input, {
    'value': 'Title Goes Here'
}));
~~~

### setFirstChild(parent, node)

### setHTML(node)

### setLastChild(parent, node)

### setNext(parent, node)

### setPrev(parent, node)

### setState(node, state, value)

### setStyle(node, style, value)

### setStyles(node, styles)

### setText(node)

### toElement(array)

Convert array of element name, element content and element attributes to element.

### toString(node)

Get element&rsquo;s outer HTML.

### toggleState(node, state)

Properties
----------

### B

Return the `<body>` element.

### D

Return the `document` object.

### H

Return the `<head>` element.

### R

Return the `<html>` element.

### W

Return the `window` object.

### script

Return the current `<script>` element.
