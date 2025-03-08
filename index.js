const {fromJSON, fromURL, fromValue} = require('@taufik-nurrohman/from');
const {isArray, isInstance, isNumber, isObject, isString} = require('@taufik-nurrohman/is');
const {toCaseCamel, toCaseLower, toJSON, toValue} = require('@taufik-nurrohman/to');

function forEachArray(array, then) {
    array.forEach(then);
}

function forEachObject(object, then) {
    for (let k in object) {
        then(object[k], k);
    }
}

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

const getChild = (parent, index) => {
    return getChildren(parent, index || 0);
};

const getChildFirst = parent => {
    return parent.firstElementChild || null;
};

const getChildLast = parent => {
    return parent.lastElementChild || null;
};

const getChildren = (parent, index) => {
    let children = [].slice.call(parent.children);
    return isNumber(index) ? (children[index] || null) : children;
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
    forEachArray(D.cookie.split(/;\s*/), cookie => {
        let [k, v] = cookie.split('=');
        values[k] = v ? fromURL(v) : null;
    });
    theCookies = values; // Store to cache
    return parseValue ? toValue(values) : values;
};

const getData = (node, parseValue = true) => {
    let attributes = getAttributes(node, parseValue);
    forEachObject(attributes, (v, k) => {
        if ('data-' !== k.slice(0, 5)) {
            delete attributes[k];
        }
    });
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

const getElementIndex = (node, anyNode) => {
    if (!node || !getParent(node)) {
        return -1;
    }
    let index = 0;
    while (node = getPrev(node, anyNode)) {
        ++index;
    }
    return index;
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
        let v;
        forEachArray(styles, k => {
            v = properties.getPropertyValue(k);
            values[k] = parseValue ? toValue(v) : v;
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
        return forEachObject(attributes, (v, k) => letAttribute(node, k)), node;
    }
    if (isArray(attributes)) {
        return forEachArray(attributes, k => letAttribute(node, k)), node;
    }
    if (isObject(attributes)) {
        return forEachObject(attributes, (v, k) => v && letAttribute(node, k)), node;
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
    return forEachArray(value, k => letElement(k)), parent;
};

const letClass = (node, value) => {
    return node.classList.remove(value), node;
};

const letClasses = (node, classes) => {
    if (isArray(classes)) {
        return forEachArray(classes, k => letClass(node, k)), node;
    }
    if (isObject(classes)) {
        return forEachObject(classes => (v, k) => v && letClass(node, k)), node;
    }
    return (node.className = ""), node;
};

const letCookie = cookie => {
    setCookie(cookie, "", -1);
};

const letCookies = cookies => {
    if (!cookies) {
        cookies = getCookies(false);
        return forEachObject(cookies, (v, k) => letCookie(k)), cookies;
    }
    if (isArray(cookies)) {
        return forEachArray(cookies, k => letCookie(k)), cookies;
    }
    if (isObject(cookies)) {
        return forEachObject(cookies, (v, k) => v && letCookie(k)), cookies;
    }
    return cookies;
};

const letData = (node, data) => {
    if (!data) {
        data = getData(node, false);
        return forEachObject(data, (v, k) => letAttribute(node, 'data-' + k)), node;
    }
    if (isArray(data)) {
        return forEachArray(data, k => letAttribute(node, 'data-' + k)), node;
    }
    if (isObject(data)) {
        return forEachObject(data, (v, k) => v && letAttribute(node, 'data-' + k)), node;
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
        return forEachArray(states, k => letState(node, k)), node;
    }
    if (isObject(states)) {
        return forEachObject(states, (v, k) => v && letState(node, k)), node;
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
        return forEachArray(styles, k => letStyle(node, k)), node;
    }
    if (isObject(styles)) {
        return forEachObject(styles, (v, k) => v && letStyle(node, k)), node;
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
    return forEachObject(classes, (v, k) => replaceClass(node, k, v)), node;
};

const setAttribute = (node, attribute, value) => {
    if (true === value) {
        value = attribute;
    }
    return node.setAttribute(attribute, fromValue(value)), node;
};

const setAttributes = (node, attributes) => {
    return forEachObject(attributes, (v, k) => {
        v || "" === v || 0 === v ? setAttribute(node, k, v) : letAttribute(node, k);
    }), node;
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
        return forEachArray(classes, k => setClass(node, k)), node;
    }
    if (isObject(classes)) {
        return forEachObject(classes, (v, k) => v ? setClass(node, k, v) : letClass(node, k)), node;
    }
    return (node.className = classes), node;
};

const setCookie = (cookie, value, days = 1) => {
    const date = new Date;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
    D.cookie = cookie + '=' + fromValue(value) + ';path=/;expires=' + date.toGMTString();
    theCookies = 0; // Reset cache
};

const setCookies = (cookies, days = 1) => {
    return forEachObject(cookies, (v, k) => {
        v || "" === v || 0 === v ? setCookie(k, v, days) : letCookie(k);
    }), cookies;
};

const setData = (node, data) => {
    return forEachObject(data, (v, k) => {
        v || "" === v || 0 === v ? setDatum(node, k, v) : letDatum(node, k);
    }), node;
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
        return setAttributes(node, attributes), node;
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
    return forEachObject(states, (v, k) => {
        v || "" === v || 0 === v ? setState(node, k, v) : letState(node, k);
    }), node;
};

const setStyle = (node, style, value) => {
    if (isNumber(value)) {
        value += 'px';
    }
    return (node.style[toCaseCamel(style)] = fromValue(value)), node;
};

const setStyles = (node, styles) => {
    return forEachObject(styles, (v, k) => {
        v || "" === v || 0 === v ? setStyle(node, k, v) : letStyle(node, k);
    }), node;
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
        return forEachArray(classes, k => toggleClass(node, k, force)), node;
    }
    if (isObject(classes)) {
        return forEachObject(classes, (v, k) => v && toggleClass(node, k, force)), node;
    }
    return node;
};

const toggleState = (node, state) => {
    return hasState(node, state) && (node[state] = !node[state]), node;
};

const toggleStates = (node, states) => {
    if (isArray(states)) {
        return forEachArray(states, k => toggleState(node, k)), node;
    }
    if (isObject(states)) {
        return forEachObject(states, (v, k) => v && toggleState(node, k)), node;
    }
    return node;
};

let theCookies = 0;

const theHistory = W.history;

const theLocation = W.location;

const theScript = D.currentScript;

Object.assign(exports, {
    B, D, H, R, W,
    fromElement,
    getAttribute,
    getAttributes,
    getChild,
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
    getElementIndex,
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