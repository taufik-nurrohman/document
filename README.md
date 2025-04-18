Document Utility
================

HTML document object utility.

Usage
-----

### CommonJS

~~~ js
const {setElement} = require('@taufik-nurrohman/document');

console.log(setElement('div', 'Content goes here.', {
    'class': 'bar foo',
    'id': 'baz'
}));
~~~

### ECMAScript

~~~ js
import {setElement} from '@taufik-nurrohman/document';

console.log(setElement('div', 'Content goes here.', {
    'class': 'bar foo',
    'id': 'baz'
}));
~~~

Methods
-------

### fromElement(node)

Convert element to array of element name, element content and element attributes.

### getAria(node, aria, parseValue = true)

### getArias(node, parseValue = true)

### getAttribute(node, attribute, parseValue = true)

### getAttributes(node, parseValue = true)

### getChild(parent, index = 0, anyNode)

### getChildFirst(parent, anyNode)

### getChildLast(parent, anyNode)

### getChildren(parent, index, anyNode)

### getClass(node)

### getClasses(node, toArray = true)

### getCookie(cookie, parseValue = true)

### getCookies(parseValue = true)

### getData(node, parseValue = true)

### getDatum(node, datum, parseValue = true)

### getElement(query, scope = document)

### getElementIndex(node, anyNode)

### getElements(query, scope = document)

### getFormElement(nameOrIndex)

### getFormElements()

### getHTML(node, trim = true)

### getID(node, batch = 'e:')

Get element&rsquo;s ID or return an unique ID.

### getName(node)

Get element name.

### getNext(node, anyNode)

### getParent(node, query)

Get element&rsquo;s parent.

### getParentForm(node)

Get closest `<form>` element from current element.

### getPrev(node, anyNode)

### getRole(node)

### getScriptElements()

### getStyle(node, style, parseValue = true)

### getStyles(node, styles, parseValue = true)

### getStyleElements()

### getState(node, state)

### getText(node, trim = true)

### getType(node)

### getValue(node)

### hasAria(node, aria)

### hasAttribute(node, attribute)

### hasClass(node, class)

### hasDatum(node, datum)

### hasID(node)

### hasParent(node, query)

### hasRole(node)

### hasState(node, state)

### isComment(node)

### isDisabled(node)

### isDocument(node)

### isEditable(node)

### isElement(node)

### isNode(node)

### isParent(node, parent, query)

### isReadOnly(node)

### isRequired(node)

### isText(node)

### isWindow(node)

### letAria(node, aria)

### letArias(node, arias)

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

// Remove `bar` and `foo` class only
letClasses(node, ['bar', 'foo']);

// Remove `bar` and `foo` class only
const isButtonDisabled = false;
letClasses(node, {
    'active': isButtonDisabled, // Keep this class
    'bar': true,
    'foo': true
});
~~~

### letCookie(cookie)

### letCookies(cookies)

### letData(node, data)

~~~ js
// Remove all `data-*` attribute(s)
letData(node);

// Remove `data-bar` and `data-foo` attribute only
letData(node, ['bar', 'foo']);

// Remove `data-bar` and `data-foo` attribute only
const removeBazData = false;
letData(node, {
    'bar': true,
    'baz': removeBazData, // Keep this attribute
    'foo': true
});
~~~

### letDatum(node, datum)

### letElement(node)

### letHTML(node)

### letID(node)

### letNext(node)

### letPrev(node)

### letRole(node)

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
    'left': true,
    'position': removePositionStyle, // Keep this style
    'top': true
});
~~~

### letText(node)

### replaceClass(node, from, to)

### replaceClasses(node, classes)

### setAria(node, aria, value)

### setArias(node, arias)

### setAttribute(node, attribute, value)

### setAttributes(node, attributes)

~~~ js
// Add `bar` and `foo` attribute(s)
// Remove the `baz` attribute if exists
setAttributes(node, {
    'bar': 100,
    'baz': false,
    'foo': 1
});
~~~

### setChildFirst(parent, node)

### setChildLast(parent, node)

### setClass(node, class)

### setClasses(node, classes)

~~~ js
// Set class value(s) to `['bar', 'foo']`
setClasses(node, 'bar foo');

// Add `bar` and `foo` to the class value(s)
setClasses(node, ['bar', 'foo']);

// Add `bar` and `foo` to the class value(s)
// Remove the `baz` value if exists
setClasses(node, {
    'bar': true,
    'baz': false,
    'foo': true
});
~~~

### setCookie(cookie, value, days = 1)

### setCookies(cookies, days = 1)

### setData(node, data)

~~~ js
// Add `data-bar` and `data-foo` attribute(s)
// Remove the `data-baz` attribute if exists
setData(node, {
    'bar': 100,
    'baz': false,
    'foo': 1
});
~~~

### setDatum(node, datum, value)

### setElement(name|node, content, attributes, options)

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

### setElementText(text|node)

### setHTML(node)

### setID(node, value, batch = 'e:')

Set element&rsquo;s ID to `value` or to the value returned by `getID()` function if it is not set.

### setNext(current, node)

### setPrev(current, node)

### setRole(node, value)

### setState(node, state, value)

### setStyle(node, style, value)

### setStyles(node, styles)

~~~ js
// Add `left` and `top` style(s)
// Remove `bottom` and `right` style(s) if exist
setStyles(node, {
    'bottom': false,
    'left': 0,
    'right': false,
    'top': 0
});
~~~

### setText(node)

### setValue(node, value)

### toString(node)

Get element&rsquo;s outer HTML.

### toggleClass(node, class, force)

### toggleClasses(node, classes, force)

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

### theID

Return the unique ID storage.

### theLocation

Return the `window.location` object.

### theScript

Return the current `<script>` element.