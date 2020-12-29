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
import {setElement} from '@taufik-nurrohman/document';

console.log(setElement('div', 'Content goes here.', {
    'class': 'foo bar',
    'id': 'baz'
}));
~~~

Methods
-------

### fromElement(node)

Convert element to array of element name, element content and element attributes.

### getAttribute(node, attribute, parseValue = true)

### getAttributes(node, parseValue = true)

### getChildFirst(parent)

### getChildLast(parent)

### getChildren(parent, index)

### getClass(node)

### getClasses(node, toArray = true)

### getCookie(cookie, parseValue = true)

### getCookies(parseValue = true)

### getData(node, parseValue = true)

### getDatum(node, datum, parseValue = true)

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

### getStyle(node, style, parseValue = true)

### getStyles(node, styles, parseValue = true)

### getStyleElements()

### getState(node, state)

### getText(node, trim = true)

### getType(node)

### hasAttribute(node, attribute)

### hasClass(node, class)

### hasParent(node)

### hasState(node)

### isComment(node)

### isDocument(node)

### isElement(node)

### isNode(node)

### isParent(node, parent)

### isText(node)

### isWindow(node)

### letAttribute(node, attribute)

### letAttributes(node, attributes)

~~~ js
// Remove all attribute(s)
letAttributes(node);

// Remove `class` and `id` attribute only
letAttributes(node, ['class', 'id']);

// Remove `class` and `id` attribute only
const removeValueAttribute = false;
letAttributes(node, {
    'class': true,
    'id': true,
    'value': removeValueAttribute // Keep this attribute
});
~~~

### letChildFirst(parent)

### letChildLast(parent)

### letChildren(parent)

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

### letCookie(cookie)

### letCookies(cookies)

### letData(node, data)

~~~ js
// Remove all `data-*` attribute(s)
letData(node);

// Remove `data-foo` and `data-bar` attribute only
letData(node, ['foo', 'bar']);

// Remove `data-foo` and `data-bar` attribute only
const removeBazData = false;
letData(node, {
    'foo': true,
    'bar': true,
    'baz': removeBazData // Keep this attribute
});
~~~

### letDatum(node, datum)

### letElement(node)

### letHTML(node)

### letNext(node)

### letPrev(node)

### letState(node)

### letStyle(node, style)

### letStyles(node, styles)

~~~ js
// Remove all style(s)
letStyles(node);

// Remove `left` and `top` style only
letStyles(node, ['left', 'top']);

// Remove `left` and `top` style only
const removePositionStyle = false;
letStyles(node, {
    'position': removePositionStyle, // Keep this style
    'left': true,
    'top': true
});
~~~

### letText(node)

### setAttribute(node, attribute, value)

### setAttributes(node, attributes)

~~~ js
// Add `foo` and `bar` attribute(s)
// Remove the `baz` attribute if exists
setAttributes(node, {
    'foo': 1,
    'bar': 100,
    'baz': false
});
~~~

### setChildFirst(parent)

### setChildLast(parent)

### setClass(node, class)

### setClasses(node, classes)

~~~ js
// Set class value(s) to `['foo', 'bar']`
setClasses(node, 'foo bar');

// Add `foo` and `bar` to the class value(s)
setClasses(node, ['foo', 'bar']);

// Add `foo` and `bar` to the class value(s)
// Remove the `baz` value if exists
setClasses(node, {
    'foo': true,
    'bar': true,
    'baz': false
});
~~~

### setCookie(cookie, value, days = 1)

### setCookies(cookies, days = 1)

### setData(node, data)

~~~ js
// Add `data-foo` and `data-bar` attribute(s)
// Remove the `data-baz` attribute if exists
setData(node, {
    'foo': 1,
    'bar': 100,
    'baz': false
});
~~~

### setDatum(node, datum, value)

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
let input = getElement('input[name="title"][type="text"]');

console.log(setElement(input, {
    'value': 'Title Goes Here'
}));
~~~

### setHTML(node)

### setNext(current, node)

### setPrev(current, node)

### setState(node, state, value)

### setStyle(node, style, value)

### setStyles(node, styles)

~~~ js
// Add `left` and `top` style(s)
// Remove `bottom` and `right` style(s) if exist
setStyles(node, {
    'left': 0,
    'top': 0,
    'bottom': false,
    'right': false
});
~~~

### setText(node)

### toElement(array)

Convert array of element name, element content and element attributes to element.

### toString(node)

Get element&rsquo;s outer HTML.

### toggleClass(node, class)

### toggleClasses(node, classes)

### toggleState(node, state)

Toggle element state if available.

~~~ js
const button = getElement('button');
const details = getElement('details');

button.addEventListener('click', () => {
    toggleState(details, 'open');
});
~~~

### toggleStates(node, states)

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

### theHistory

Return the `window.history` object.

### theLocation

Return the `window.location` object.

### theScript

Return the current `<script>` element.
