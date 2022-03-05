const {fromJSON, fromURL, fromValue} = require('@taufik-nurrohman/from');
const {isArray, isInstance, isNumber, isObject, isString} = require('@taufik-nurrohman/is');
const {toCaseCamel, toCaseLower, toJSON, toValue} = require('@taufik-nurrohman/to');

const D = document;
const W = window;

const B = D.body;
const H = D.head;
const R = D.documentElement;

const fromElement = node => {
    let attributes = getAttributes(node),
        content = getHTML(node),
        title = getName(node);
    return false !== content ? [title, content, attributes] : [title, attributes];
};

const getAttribute = (node, attribute, parseValue = true) => {
    if (!hasAttribute(node, attribute)) {
        return null;
    }
    let value = node.getAttribute(attribute);
    return parseValue ? toValue(value) : value;
};

const getAttributes = (node, parseValue = true) => {
    let attributes = node.attributes,
        value, values = {};
    for (let i = 0, j = attributes.length; i < j; ++i) {
        value = attributes[i].value;
        values[attributes[i].name] = parseValue ? toValue(value) : value;
    }
    return values;
};

const getChildFirst = parent => {
    return parent.firstElementChild || null;
};

const getChildLast = parent => {
    return parent.lastElementChild || null;
};

const getChildren = (parent, index) => {
    let children = parent.children;
    return isNumber(index) ? (children[index] || null) : (children || []);
};

const getClass = node => getClasses(node, false); // Dummy

const getClasses = (node, toArray = true) => {
    let value = (getState(node, 'className') || "").trim();
    return toArray ? value.split(/\s+/).filter(v => "" !== v) : value;
};

const getCookie = (cookie, parseValue = true) => {
    let value = getCookies(parseValue)[cookie];
    return value || "" === value || 0 === value ? value : null;
};

const getCookies = (parseValue = true) => {
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

const getData = (node, parseValue = true) => {
    let attributes = getAttributes(node, parseValue);
    for (let attribute in attributes) {
        if ('data-' !== attribute.slice(0, 5)) {
            delete attributes[attribute];
        }
    }
    return attributes;
};

const getDatum = (node, datum, parseValue = true) => {
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

const getElement = (query, scope) => {
    return (scope || D).querySelector(query);
};

const getElements = (query, scope) => {
    return (scope || D).querySelectorAll(query);
};

const getFormElement = nameOrIndex => {
    return D.forms[nameOrIndex] || null;
};

const getFormElements = () => {
    return D.forms;
};

const getHTML = (node, trim = true) => {
    let state = 'innerHTML';
    if (!hasState(node, state)) {
        return false;
    }
    let content = node[state];
    content = trim ? content.trim() : content;
    return "" !== content ? content : null;
};

const getName = node => {
    return toCaseLower(node && node.nodeName || "") || null;
};

const getNext = (node, anyNode) => {
    return node['next' + (anyNode ? "" : 'Element') + 'Sibling'] || null;
};

const getParent = (node, query) => {
    if (query) {
        return node.closest(query) || null;
    }
    return node.parentNode || null;
};

const getParentForm = node => {
    let state = 'form';
    if (hasState(node, state) && state === getName(node[state])) {
        return node[state];
    }
    return getParent(node, state);
};

const getPrev = (node, anyNode) => {
    return node['previous' + (anyNode ? "" : 'Element') + 'Sibling'] || null;
};

const getScriptElements = () => {
    return getElements('script');
};

const getStyle = (node, style, parseValue = true) => {
    let value = W.getComputedStyle(node).getPropertyValue(style);
    if (parseValue) {
        value = toValue(value);
    }
    return value || "" === value || 0 === value ? value : null;
};

const getStyles = (node, styles, parseValue = true) => {
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

const getStyleElements = () => {
    return getElements('link[href][rel=stylesheet],style');
};

const getState = (node, state) => {
    return hasState(node, state) && node[state] || null;
};

const getText = (node, trim = true) => {
    let state = 'textContent';
    if (!hasState(node, state)) {
        return false;
    }
    let content = node[state];
    content = trim ? content.trim() : content;
    return "" !== content ? content : null;
};

const getType = node => {
    return node && node.nodeType || null;
};

const hasAttribute = (node, attribute) => {
    return node.hasAttribute(attribute);
};

const hasClass = (node, value) => {
    return node.classList.contains(value);
};

const hasParent = (node, query) => {
    return null !== getParent(node, query);
};

const hasState = (node, state) => {
    return state in node;
};

const isComment = node => {
    return isNode(node) && /* Node.COMMENT_NODE */ 8 === getType(node);
};

const isDocument = node => {
    return node === D;
};

const isElement = node => {
    return isNode(node) && /* Node.ELEMENT_NODE */ 1 === getType(node);
};

const isNode = node => {
    return isInstance(node, Node);
};

const isParent = (node, parent, query) => {
    return node && parent && parent === getParent(node, query);
};

const isText = node => {
    return isNode(node) && /* Node.TEXT_NODE */ 3 === getType(node);
};

const isWindow = node => {
    return node === W;
};

const letAttribute = (node, attribute) => {
    return node.removeAttribute(attribute), node;
};

const letAttributes = (node, attributes) => {
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

const letChildFirst = parent => {
    let childFirst = getChildFirst(parent);
    return (childFirst && letElement(childFirst)), parent;
};

const letChildLast = parent => {
    let childLast = getChildLast(parent);
    return (childLast && letElement(childLast)), parent;
};

const letChildren = (parent, index) => {
    let value = getChildren(parent, index);
    if (isNumber(index) && value) {
        return letElement(value), parent;
    }
    return value.forEach(child => letElement(child)), parent;
};

const letClass = (node, value) => {
    return node.classList.remove(value), node;
};

const letClasses = (node, classes) => {
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

const letCookie = cookie => {
    setCookie(cookie, "", -1);
};

const letCookies = cookies => {
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

const letData = (node, data) => {
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

const letDatum = (node, datum) => {
    return letAttribute(node, 'data-' + datum);
};

const letElement = node => {
    let parent = getParent(node);
    return node.remove(), parent;
};

const letHTML = node => {
    let state = 'innerHTML';
    return hasState(node, state) && (node[state] = ""), node;
};

const letNext = node => {
    let next = getNext(node);
    return (next && letElement(next)), node;
};

const letPrev = node => {
    let prev = getPrev(node);
    return (prev && letElement(prev)), node;
};

const letState = (node, state) => {
    return (delete node[state]), node;
};

const letStates = (node, states) => {
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

const letStyle = (node, style) => {
    return (node.style[toCaseCamel(style)] = null), node;
};

const letStyles = (node, styles) => {
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

const letText = node => {
    let state = 'textContent';
    return hasState(node, state) && (node[state] = ""), node;
};

const replaceClass = (node, from, to) => {
    return node.classList.replace(from, to), node;
};

const replaceClasses = (node, classes) => {
    for (let name in classes) {
        replaceClass(node, name, classes[name]);
    }
    return node;
};

const setAttribute = (node, attribute, value) => {
    if (true === value) {
        value = attribute;
    }
    return node.setAttribute(attribute, fromValue(value)), node;
};

const setAttributes = (node, attributes) => {
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

const setChildFirst = (parent, node) => {
    return parent.prepend(node), node;
};

const setChildLast = (parent, node) => {
    return parent.append(node), node;
};

const setClass = (node, value) => {
    return node.classList.add(value), node;
};

const setClasses = (node, classes) => {
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

const setCookie = (cookie, value, days = 1) => {
    const date = new Date;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
    D.cookie = cookie + '=' + fromValue(value) + ';path=/;expires=' + date.toGMTString();
    theCookies = 0; // Reset cache
};

const setCookies = (cookies, days = 1) => {
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

const setData = (node, data) => {
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

const setDatum = (node, datum, value) => {
    if (isArray(value) || isObject(value)) {
        value = toJSON(value);
    }
    return setAttribute(node, 'data-' + datum, value);
};

const setElement = (node, content, attributes) => {
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

const setHTML = (node, content, trim = true) => {
    if (null === content) {
        return node;
    }
    let state = 'innerHTML';
    return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
};

const setNext = (current, node) => {
    return getParent(current).insertBefore(node, getNext(current, true)), node;
};

const setPrev = (current, node) => {
    return getParent(current).insertBefore(node, current), node;
};

const setState = (node, key, value) => {
    return (node[key] = value), node;
};

const setStates = (node, states) => {
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

const setStyle = (node, style, value) => {
    if (isNumber(value)) {
        value += 'px';
    }
    return (node.style[toCaseCamel(style)] = fromValue(value)), node;
};

const setStyles = (node, styles) => {
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

const setText = (node, content, trim = true) => {
    if (null === content) {
        return node;
    }
    let state = 'textContent';
    return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
};

const toElement = fromArray => {
    return setElement(...fromArray);
};

const toString = node => {
    let state = 'outerHTML';
    if (!hasState(node, state)) {
        return false;
    }
    return node[state] || "";
};

const toggleClass = (node, name, force) => {
    return node.classList.toggle(name, force), node;
};

const toggleClasses = (node, classes, force) => {
    if (isArray(classes)) {
        return classes.forEach(name => toggleClass(node, name, force)), node;
    }
    if (isObject(classes)) {
        for (let name in classes) {
            classes[name] && toggleClass(node, name, force);
        }
    }
    return node;
};

const toggleState = (node, state) => {
    return hasState(node, state) && (node[state] = !node[state]), node;
};

const toggleStates = (node, states) => {
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

const theHistory = W.history;

const theLocation = W.location;

const theScript = D.currentScript;

Object.assign(exports, {
    D, W, B, H, R,
    fromElement,
    getAttribute,
    getAttributes,
    getChildFirst,
    getChildLast,
    getChildren,
    getClass,
    getClasses,
    getCookie,
    getCookies,
    getData,
    getDatum,
    getElement,
    getElements,
    getFormElement,
    getFormElements,
    getHTML,
    getName,
    getNext,
    getParent,
    getParentForm,
    getPrev,
    getScriptElements,
    getState,
    getStyle,
    getStyleElements,
    getStyles,
    getText,
    getType,
    hasAttribute,
    hasClass,
    hasParent,
    hasState,
    isComment,
    isDocument,
    isElement,
    isNode,
    isParent,
    isText,
    isWindow,
    letAttribute,
    letAttributes,
    letChildFirst,
    letChildLast,
    letChildren,
    letClass,
    letClasses,
    letCookie,
    letCookies,
    letData,
    letDatum,
    letElement,
    letHTML,
    letNext,
    letPrev,
    letState,
    letStates,
    letStyle,
    letStyles
    letText,
    replaceClass,
    replaceClasses,
    setAttribute,
    setAttributes,
    setChildFirst,
    setChildLast,
    setClass,
    setClasses,
    setCookie,
    setCookies,
    setData,
    setDatum,
    setElement,
    setHTML,
    setNext,
    setPrev,
    setState,
    setStates,
    setStyle,
    setStyles,
    setText,
    theHistory,
    theLocation,
    theScript
    toElement,
    toString,
    toggleClass,
    toggleClasses,
    toggleState,
    toggleStates
});