HTML Document Utility
=====================

HTML document object utility.

Usage
-----

### CommonJS

~~~ js
const {element} = require('@taufik-nurrohman/document');

console.log(element('div', 'Content goes here.', {
    'class': 'foo bar',
    'id': 'baz'
}));
~~~

### ECMAScript

~~~ js
import {element} = from '@taufik-nurrohman/document';

console.log(element('div', 'Content goes here.', {
    'class': 'foo bar',
    'id': 'baz'
}));
~~~

Methods
-------

### after(node, target)

Insert `node` after `target`.

### append(node, target)

Append `node` to `target`.

### before(node, target)

Insert `node` before `target`.

### element(name|node, content, attributes)

Create a HTML element or update the existing element.

~~~ js
console.log(element('div', 'Content goes here.', {
    'id': 'foo-bar'
}));

console.log(element('input', false, {
    'name': 'title',
    'type': 'text',
    'value': 'Title Goes Here'
}));

console.log(element('input', {
    'name': 'title',
    'type': 'text',
    'value': 'Title Goes Here'
}));
~~~

~~~ js
let input = queryElement('input[name="title"][type="text"]');

console.log(element(input, {
    'value': 'Title Goes Here'
}));
~~~

### fromElement(node)

Convert element to array of element name, element content and element attributes.

### getAttribute(node, key, eval = true)

### getAttributes(node, eval = true)

### getClasses(node, toArray = true)

### getInnerHTML(node, trim = true)

### getInnerText(node, trim = true)

### getState(node, key)

### hasParent(node)

### hasState(node)

### isParent(node, target)

### letAttribute(node, key)

### letAttributes(node, attributes)

~~~ js
// Remove all attribute(s)
letAttribute(node);

// Remove `class` and `id` attribute only
letAttribute(node, ['class', 'id']);

// Remove `class` and `id` attribute only
const preserveValueAttribute = true;
letAttribute(node, {
    'class': true,
    'id': true,
    'value': preserveValueAttribute // Keep this attribute
});
~~~

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

### letInnerHTML(node)

### letInnerText(node)

### letState(node)

### name(node)

Get element name.

### parent(node)

Get element&rsquo;s parent.

### prepend(node, target)

Prepend `node` to `target`.

### queryElement(query, scope = document)

### queryElements(query, scope = document)

### setAttribute(node, key, value)

### setAttributes(node, attributes)

### setClasses(node, classes)

~~~ js
setClasses(node, 'foo bar');
setClasses(node, ['foo', 'bar']);
setClasses(node, {
    'foo': true,
    'bar': true,
    'baz': false
});
~~~

### setInnerHTML(node)

### setInnerText(node)

### setState(node, key, value)

### toElement(array)

Convert array of element name, element content and element attributes to element.

### toggleState(node, key)

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
