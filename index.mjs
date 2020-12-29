import {fromJSON, fromURL, fromValue} from '@taufik-nurrohman/from';
import {isArray, isInstance, isNumber, isObject, isString} from '@taufik-nurrohman/is';
import {toCaseCamel, toCaseLower, toJSON, toValue} from '@taufik-nurrohman/to';

export const D = document;
export const W = window;

export const B = D.body;
export const H = D.head;
export const R = D.documentElement;

export const fromElement = node => {
    let attributes = getAttributes(node),
        content = getHTML(node),
        title = getName(node);
    return false !== content ? [title, content, attributes] : [title, attributes];
};

export const getAttribute = (node, attribute, parseValue = true) => {
    if (!hasAttribute(node, attribute)) {
        return null;
    }
    let value = node.getAttribute(attribute);
    return parseValue ? toValue(value) : value;
};

export const getAttributes = (node, parseValue = true) => {
    let attributes = node.attributes,
        value, values = {};
    for (let i = 0, j = attributes.length; i < j; ++i) {
        value = attributes[i].value;
        values[attributes[i].name] = parseValue ? toValue(value) : value;
    }
    return values;
};

export const getChildFirst = parent => {
    return parent.firstElementChild || null;
};

export const getChildLast = parent => {
    return parent.lastElementChild || null;
};

export const getChildren = (parent, index) => {
    let children = parent.children;
    return isNumber(index) ? (children[index] || null) : (children || []);
};

export const getClass = node => getClasses(node, false); // Dummy

export const getClasses = (node, toArray = true) => {
    let value = (getState(node, 'className') || "").trim();
    return toArray ? value.split(/\s+/) : value;
};

export const getCookie = (cookie, parseValue = true) => {
    let value = getCookies(parseValue)[cookie];
    return value || "" === value || 0 === value ? value : null;
};

export const getCookies = (parseValue = true) => {
    if (theCookies) {
        // Generate from cache
        return parseValue ? toValue(theCookies) : theCookies;
    }
    let values = {};
    D.cookie.split(/;\s*/).forEach(cookie => {
        let a = cookie.split('='),
            value = a[1] || "";
        values[a[0]] = value ? fromURL(value) : null;
    });
    theCookies = values; // Store to cache
    return parseValue ? toValue(values) : values;
};

export const getData = (node, parseValue = true) => {
    let attributes = getAttributes(node, parseValue);
    for (let attribute in attributes) {
        if ('data-' !== attribute.slice(0, 5)) {
            delete attributes[attribute];
        }
    }
    return attributes;
};

export const getDatum = (node, datum, parseValue = true) => {
    let value = getAttribute(node, 'data-' + datum, parseValue),
        v = (value + "").trim();
    if (
        parseValue &&
        v &&
        (
            '[' === v[0] && ']' === v.slice(-1) ||
            '{' === v[0] && '}' === v.slice(-1)
        ) &&
        null !== (v = fromJSON(value))
    ) {
        return v;
    }
    return value;
};

export const getElement = (query, scope) => {
    return (scope || D).querySelector(query);
};

export const getElements = (query, scope) => {
    return (scope || D).querySelectorAll(query);
};

export const getFormElement = nameOrIndex => {
    return D.forms[nameOrIndex] || null;
};

export const getFormElements = () => {
    return D.forms;
};

export const getHTML = (node, trim = true) => {
    let state = 'innerHTML';
    if (!hasState(node, state)) {
        return false;
    }
    let content = node[state];
    content = trim ? content.trim() : content;
    return "" !== content ? content : null;
};

export const getName = node => {
    return toCaseLower(node && node.nodeName || "") || null;
};

export const getNext = node => {
    return node.nextElementSibling || null;
};

export const getParent = node => {
    return node.parentNode || null;
};

export const getParentForm = node => {
    let state = 'form';
    if (hasState(node, state) && state === getName(node[state])) {
        return node[state];
    }
    let parent = getParent(node);
    while (parent) {
        if (state === getName(parent)) {
            break;
        }
        parent = getParent(parent);
    }
    return parent || null;
};

export const getPrev = node => {
    return node.previousElementSibling || null;
};

export const getScriptElements = () => {
    return getElements('script');
};

export const getStyle = (node, style, parseValue = true) => {
    let value = W.getComputedStyle(node).getPropertyValue(style);
    if (parseValue) {
        value = toValue(value);
    }
    return value || "" === value || 0 === value ? value : null;
};

export const getStyles = (node, styles, parseValue = true) => {
    let properties = W.getComputedStyle(node),
        values = {};
    if (isArray(styles)) {
        let value;
        styles.forEach(style => {
            value = properties.getPropertyValue(style);
            values[style] = parseValue ? toValue(value) : value;
        });
        return values;
    }
    return properties;
};

export const getStyleElements = () => {
    return getElements('link[href][rel=stylesheet],style');
};

export const getState = (node, state) => {
    return hasState(node, state) && node[state] || null;
};

export const getText = (node, trim = true) => {
    let state = 'textContent';
    if (!hasState(node, state)) {
        return false;
    }
    let content = node[state];
    content = trim ? content.trim() : content;
    return "" !== content ? content : null;
};

export const getType = node => {
    return node && node.nodeType || null;
};

export const hasAttribute = (node, attribute) => {
    return node.hasAttribute(attribute);
};

export const hasClass = (node, value) => {
    return node.classList.contains(value);
};

export const hasParent = node => {
    return null !== getParent(node);
};

export const hasState = (node, state) => {
    return state in node;
};

export const isComment = node => {
    return isNode(node) && /* Node.COMMENT_NODE */ 8 === getType(node);
};

export const isDocument = node => {
    return node === D;
};

export const isElement = node => {
    return isNode(node) && /* Node.ELEMENT_NODE */ 1 === getType(node);
};

export const isNode = node => {
    return isInstance(node, Node);
};

export const isParent = (node, parent) => {
    return node && parent && parent === getParent(node);
};

export const isText = node => {
    return isNode(node) && /* Node.TEXT_NODE */ 3 === getType(node);
};

export const isWindow = node => {
    return node === W;
};

export const letAttribute = (node, attribute) => {
    return node.removeAttribute(attribute), node;
};

export const letAttributes = (node, attributes) => {
    if (!attributes) {
        attributes = getAttributes(node, false);
        for (let attribute in attributes) {
            letAttribute(node, attribute);
        }
        return node;
    }
    if (isArray(attributes)) {
        return attributes.forEach(attribute => letAttribute(node, attribute)), node;
    }
    if (isObject(attributes)) {
        for (let attribute in attributes) {
            attributes[attribute] && letAttribute(node, attribute);
        }
    }
    return node;
};

export const letChildFirst = parent => {
    let childFirst = getChildFirst(parent);
    return (childFirst && letElement(childFirst)), parent;
};

export const letChildLast = parent => {
    let childLast = getChildLast(parent);
    return (childLast && letElement(childLast)), parent;
};

export const letChildren = (parent, index) => {
    let value = getChildren(parent, index);
    if (isNumber(index) && value) {
        return letElement(value), parent;
    }
    return value.forEach(child => letElement(child)), parent;
};

export const letClass = (node, value) => {
    return node.classList.remove(value), node;
};

export const letClasses = (node, classes) => {
    if (isArray(classes)) {
        return classes.forEach(name => node.classList.remove(name)), node;
    }
    if (isObject(classes)) {
        for (let name in classes) {
            classes[name] && node.classList.remove(name);
        }
        return node;
    }
    return (node.className = ""), node;
};

export const letCookie = cookie => {
    setCookie(cookie, "", -1);
};

export const letCookies = cookies => {
    if (!cookies) {
        cookies = getCookies(false);
        for (let cookie in cookies) {
            letCookie(cookie);
        }
        return;
    }
    if (isArray(cookies)) {
        cookies.forEach(cookie => letCookie(cookie));
        return;
    }
    if (isObject(cookies)) {
        for (let cookie in cookies) {
            cookies[cookie] && letCookie(cookie);
        }
    }
};

export const letData = (node, data) => {
    if (!data) {
        data = getData(node, false);
        for (let datum in data) {
            letAttribute(node, 'data-' + datum);
        }
        return node;
    }
    if (isArray(data)) {
        return data.forEach(datum => letAttribute(node, 'data-' + datum)), node;
    }
    if (isObject(data)) {
        for (let datum in data) {
            data[datum] && letAttribute(node, 'data-' + datum);
        }
    }
    return node;
};

export const letDatum = (node, datum) => {
    return letAttribute(node, 'data-' + datum);
};

export const letElement = node => {
    let parent = getParent(node);
    return node.remove(), parent;
};

export const letHTML = node => {
    let state = 'innerHTML';
    return hasState(node, state) && (node[state] = ""), node;
};

export const letNext = node => {
    let next = getNext(node);
    return (next && letElement(next)), node;
};

export const letPrev = node => {
    let prev = getPrev(node);
    return (prev && letElement(prev)), node;
};

export const letState = (node, state) => {
    return (delete node[state]), node;
};

export const letStates = (node, states) => {
    if (!states) {
        // Do nothing.
        return node;
    }
    if (isArray(states)) {
        return states.forEach(state => letState(node, state)), node;
    }
    if (isObject(states)) {
        for (let state in states) {
            states[state] && letState(node, state);
        }
    }
    return node;
};

export const letStyle = (node, style) => {
    return (node.style[toCaseCamel(style)] = null), node;
};

export const letStyles = (node, styles) => {
    if (!styles) {
        return letAttribute(node, 'style');
    }
    if (isArray(styles)) {
        return styles.forEach(style => letStyle(node, style)), node;
    }
    if (isObject(styles)) {
        for (let style in styles) {
            styles[style] && letStyle(node, style);
        }
    }
    return node;
};

export const letText = node => {
    let state = 'textContent';
    return hasState(node, state) && (node[state] = ""), node;
};

export const setAttribute = (node, attribute, value) => {
    if (true === value) {
        value = attribute;
    }
    return node.setAttribute(attribute, fromValue(value)), node;
};

export const setAttributes = (node, attributes) => {
    let value;
    for (let attribute in attributes) {
        value = attributes[attribute];
        if (value || "" === value || 0 === value) {
            setAttribute(node, attribute, value);
        } else {
            letAttribute(node, attribute);
        }
    }
    return node;
};

export const setChildFirst = (parent, node) => {
    return parent.prepend(node), node;
};

export const setChildLast = (parent, node) => {
    return parent.append(node), node;
};

export const setClass = (node, value) => {
    return node.classList.add(value), node;
};

export const setClasses = (node, classes) => {
    if (isArray(classes)) {
        return classes.forEach(name => node.classList.add(name)), node;
    }
    if (isObject(classes)) {
        for (let name in classes) {
            if (classes[name]) {
                node.classList.add(name);
            } else {
                node.classList.remove(name);
            }
        }
    }
    // if (isString(classes)) {
        node.className = classes;
    // }
    return node;
};

export const setCookie = (cookie, value, days = 1) => {
    const date = new Date;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
    D.cookie = cookie + '=' + fromValue(value) + ';path=/;expires=' + date.toGMTString();
    theCookies = 0; // Reset cache
};

export const setCookies = (cookies, days = 1) => {
    let value;
    for (let cookie in cookies) {
        value = cookies[cookie];
        if (value || "" === value || 0 === value) {
            setCookie(cookie, value, days);
        } else {
            letCookie(cookie);
        }
    }
};

export const setData = (node, data) => {
    let value;
    for (let datum in data) {
        value = data[datum];
        if (value || "" === value || 0 === value) {
            setDatum(node, datum, value);
        } else {
            letDatum(node, datum);
        }
    }
    return node;
};

export const setDatum = (node, datum, value) => {
    if (isArray(value) || isObject(value)) {
        value = toJSON(value);
    }
    return setAttribute(node, 'data-' + datum, value);
};

export const setElement = (node, content, attributes) => {
    node = isString(node) ? D.createElement(node) : node;
    if (isObject(content)) {
        attributes = content;
        content = false;
    }
    if (isString(content)) {
        setHTML(node, content);
    }
    if (isObject(attributes)) {
        setAttributes(node, attributes);
    }
    return node;
};

export const setHTML = (node, content, trim = true) => {
    if (null === content) {
        return node;
    }
    let state = 'innerHTML';
    return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
};

export const setNext = (current, node) => {
    return getParent(current).insertBefore(node, getNext(current)), node;
};

export const setPrev = (current, node) => {
    return getParent(current).insertBefore(node, current), node;
};

export const setState = (node, key, value) => {
    return (node[key] = value), node;
};

export const setStates = (node, states) => {
    let value;
    for (let state in states) {
        value = states[state];
        if (value || "" === value || 0 === value) {
            setState(node, state, states[state]);
        } else {
            letState(node, state);
        }
    }
    return node;
};

export const setStyle = (node, style, value) => {
    if (isNumber(value)) {
        value += 'px';
    }
    return (node.style[toCaseCamel(style)] = fromValue(value)), node;
};

export const setStyles = (node, styles) => {
    let value;
    for (let style in styles) {
        value = styles[style];
        if (value || "" === value || 0 === value) {
            setStyle(node, style, value);
        } else {
            letStyle(node, style);
        }
    }
    return node;
};

export const setText = (node, content, trim = true) => {
    if (null === content) {
        return node;
    }
    let state = 'textContent';
    return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
};

export const toElement = fromArray => {
    return setElement(...fromArray);
};

export const toString = node => {
    let state = 'outerHTML';
    if (!hasState(node, state)) {
        return false;
    }
    return node[state] || "";
};

export const toggleClass = (node, name) => {
    return node.classList.toggle(name), node;
};

export const toggleClasses = (node, classes) => {
    if (isArray(classes)) {
        return classes.forEach(name => toggleClass(node, name)), node;
    }
    if (isObject(classes)) {
        for (let name in classes) {
            classes[name] && toggleClass(node, name);
        }
    }
    return node;
};

export const toggleState = (node, state) => {
    return hasState(node, state) && (node[state] = !node[state]), node;
};

export const toggleStates = (node, states) => {
    if (isArray(states)){
        return states.forEach(state => toggleState(node, state)), node;
    }
    if (isObject(states)) {
        for (let state in states) {
            states[state] && toggleState(node, state);
        }
    }
    return node;
};

let theCookies = 0;

export const theHistory = W.history;

export const theLocation = W.location;

export const theScript = D.currentScript;
