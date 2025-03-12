import {forEachArray, forEachObject} from '@taufik-nurrohman/f';
import {fromJSON, fromURL, fromValue} from '@taufik-nurrohman/from';
import {isArray, isInstance, isNumber, isObject, isSet, isString} from '@taufik-nurrohman/is';
import {toCaseCamel, toCaseLower, toCount, toJSON, toValue} from '@taufik-nurrohman/to';

export const D = document;
export const W = window;

export const B = D.body;
export const H = D.head;
export const R = D.documentElement;

export const focusTo = node => node.focus();

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
        values = {};
    forEachArray(attributes, v => {
        let {name, value} = v;
        values[name] = parseValue ? toValue(value) : value;
    });
    return values;
};

export const getChild = (parent, index, anyNode) => {
    return getChildren(parent, index || 0, anyNode);
};

export const getChildFirst = (parent, anyNode) => {
    return parent['first' + (anyNode ? "" : 'Element') + 'Child'] || null;
};

export const getChildLast = (parent, anyNode) => {
    return parent['last' + (anyNode ? "" : 'Element') + 'Child'] || null;
};

export const getChildren = (parent, index, anyNode) => {
    let children = [].slice.call(parent['child' + (anyNode ? 'Nodes' : 'ren')]);
    return isNumber(index) ? (children[index] || null) : children;
};

export const getClass = node => getClasses(node, false); // Dummy

export const getClasses = (node, toArray = true) => {
    let value = (getState(node, 'className') || "").trim();
    return toArray ? value.split(/\s+/).filter(v => "" !== v) : value;
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
    forEachArray(D.cookie.split(/;\s*/), cookie => {
        let [k, v] = cookie.split('=');
        values[k] = v ? fromURL(v) : null;
    });
    theCookies = values; // Store to cache
    return parseValue ? toValue(values) : values;
};

export const getData = (node, parseValue = true) => {
    let attributes = getAttributes(node, parseValue);
    forEachObject(attributes, (v, k) => {
        if ('data-' !== k.slice(0, 5)) {
            delete attributes[k];
        }
    });
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

export const getElementIndex = (node, anyNode) => {
    if (!node || !getParent(node)) {
        return -1;
    }
    let index = 0;
    while (node = getPrev(node, anyNode)) {
        ++index;
    }
    return index;
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

export const getID = (node, batch = 'e:') => {
    if (node.id) {
        return node.id;
    }
    if (!isSet(theID[batch])) {
        theID[batch] = 0;
    }
    return (node.id = batch + (theID[batch] += 1));
};

export const getName = node => {
    return toCaseLower(node && node.nodeName || "") || null;
};

export const getNext = (node, anyNode) => {
    return node['next' + (anyNode ? "" : 'Element') + 'Sibling'] || null;
};

export const getParent = (node, query) => {
    if (query) {
        return node.closest(query) || null;
    }
    return node.parentNode || null;
};

export const getParentForm = node => {
    let state = 'form';
    if (hasState(node, state) && state === getName(node[state])) {
        return node[state];
    }
    return getParent(node, state);
};

export const getPrev = (node, anyNode) => {
    return node['previous' + (anyNode ? "" : 'Element') + 'Sibling'] || null;
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
        let v;
        forEachArray(styles, k => {
            v = properties.getPropertyValue(k);
            values[k] = parseValue ? toValue(v) : v;
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

export const getValue = (node, parseValue) => {
    let value = (node.value || "").replace(/\r?\n|\r/g, '\n');
    value = parseValue ? toValue(value) : value;
    return "" !== value ? value : null;
};

export const hasAttribute = (node, attribute) => {
    return node.hasAttribute(attribute);
};

export const hasClass = (node, value) => {
    return node.classList.contains(value);
};

export const hasParent = (node, query) => {
    return null !== getParent(node, query);
};

export const hasState = (node, state) => {
    return state in node;
};

// <https://stackoverflow.com/a/6691294/1163000>
export const insertAtCaret = (content, mode) => {
    let from, range, selection = D.getSelection(), to;
    if (selection.getRangeAt && selection.rangeCount) {
        range = selection.getRangeAt(0);
        range.deleteContents();
        from = setElement('div', content);
        to = D.createDocumentFragment();
        let nodeCurrent, nodeFirst, nodeLast;
        while (nodeCurrent = getChildFirst(from, 1)) {
            nodeLast = setChildLast(to, nodeCurrent);
        }
        nodeFirst = getChildFirst(to, 1);
        range.insertNode(to);
        if (nodeLast) {
            range = range.cloneRange();
            range.setStartAfter(nodeLast);
            range.setStartBefore(nodeFirst);
            if (1 === mode) {
                range.collapse(true);
            } else if (-1 === mode) {
                range.collapse();
            }
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};

export const isComment = node => {
    return isNode(node) && /* Node.COMMENT_NODE */ 8 === getType(node);
};

export const isDisabled = node => node.disabled;

export const isDocument = node => {
    return node === D;
};

export const isEditable = node => node.isContentEditable;

export const isElement = node => {
    return isNode(node) && /* Node.ELEMENT_NODE */ 1 === getType(node);
};

export const isNode = node => {
    return isInstance(node, Node);
};

export const isParent = (node, parent, query) => {
    return node && parent && parent === getParent(node, query);
};

export const isReadOnly = node => node.readOnly;

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
    return forEachArray(value, k => letElement(k)), parent;
};

export const letClass = (node, value) => {
    return node.classList.remove(value), node;
};

export const letClasses = (node, classes) => {
    if (isArray(classes)) {
        return forEachArray(classes, k => letClass(node, k)), node;
    }
    if (isObject(classes)) {
        return forEachObject(classes => (v, k) => v && letClass(node, k)), node;
    }
    return (node.className = ""), node;
};

export const letCookie = cookie => {
    setCookie(cookie, "", -1);
};

export const letCookies = cookies => {
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

export const letData = (node, data) => {
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
        return forEachArray(states, k => letState(node, k)), node;
    }
    if (isObject(states)) {
        return forEachObject(states, (v, k) => v && letState(node, k)), node;
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
        return forEachArray(styles, k => letStyle(node, k)), node;
    }
    if (isObject(styles)) {
        return forEachObject(styles, (v, k) => v && letStyle(node, k)), node;
    }
    return node;
};

export const letText = node => {
    let state = 'textContent';
    return hasState(node, state) && (node[state] = ""), node;
};

export const replaceClass = (node, from, to) => {
    return node.classList.replace(from, to), node;
};

export const replaceClasses = (node, classes) => {
    return forEachObject(classes, (v, k) => replaceClass(node, k, v)), node;
};

export const selectNone = node => {
    const selection = D.getSelection();
    if (node) {} else {
        // selection.removeAllRanges();
        if (selection.rangeCount) {
            selection.removeRange(selection.getRangeAt(0));
        }
    }
};

export const selectTo = (node, mode) => {
    const selection = D.getSelection();
    selectNone();
    const range = D.createRange();
    range.selectNodeContents(node);
    selection.addRange(range);
    if (1 === mode) {
        selection.collapseToEnd();
    } else if (-1 === mode) {
        selection.collapseToStart();
    } else {
        // Select all
    }
};

export const setAttribute = (node, attribute, value) => {
    if (true === value) {
        value = attribute;
    }
    return node.setAttribute(attribute, fromValue(value)), node;
};

export const setAttributes = (node, attributes) => {
    return forEachObject(attributes, (v, k) => {
        v || "" === v || 0 === v ? setAttribute(node, k, v) : letAttribute(node, k);
    }), node;
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
        return forEachArray(classes, k => setClass(node, k)), node;
    }
    if (isObject(classes)) {
        return forEachObject(classes, (v, k) => v ? setClass(node, k, v) : letClass(node, k)), node;
    }
    return (node.className = classes), node;
};

export const setCookie = (cookie, value, days = 1) => {
    const date = new Date;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
    D.cookie = cookie + '=' + fromValue(value) + ';path=/;expires=' + date.toGMTString();
    theCookies = 0; // Reset cache
};

export const setCookies = (cookies, days = 1) => {
    return forEachObject(cookies, (v, k) => {
        v || "" === v || 0 === v ? setCookie(k, v, days) : letCookie(k);
    }), cookies;
};

export const setData = (node, data) => {
    return forEachObject(data, (v, k) => {
        v || "" === v || 0 === v ? setDatum(node, k, v) : letDatum(node, k);
    }), node;
};

export const setDatum = (node, datum, value) => {
    if (isArray(value) || isObject(value)) {
        value = toJSON(value);
    }
    return setAttribute(node, 'data-' + datum, value);
};

export const setElement = (node, content, attributes, options) => {
    node = isString(node) ? D.createElement(node, isString(options) ? {is: options} : options) : node;
    if (isArray(content) && toCount(content)) {
        letHTML(node);
        forEachArray(content, v => setChildLast(isString(v) ? setElementText(v) : v));
    } else if (isObject(content)) {
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

export const setElementText = text => isString(text) ? D.createTextNode(text) : text;

export const setHTML = (node, content, trim = true) => {
    if (null === content) {
        return node;
    }
    let state = 'innerHTML';
    return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
};

export const setNext = (current, node) => {
    return getParent(current).insertBefore(node, getNext(current, true)), node;
};

export const setPrev = (current, node) => {
    return getParent(current).insertBefore(node, current), node;
};

export const setState = (node, key, value) => {
    return (node[key] = value), node;
};

export const setStates = (node, states) => {
    return forEachObject(states, (v, k) => {
        v || "" === v || 0 === v ? setState(node, k, v) : letState(node, k);
    }), node;
};

export const setStyle = (node, style, value) => {
    if (isNumber(value)) {
        value += 'px';
    }
    return (node.style[toCaseCamel(style)] = fromValue(value)), node;
};

export const setStyles = (node, styles) => {
    return forEachObject(styles, (v, k) => {
        v || "" === v || 0 === v ? setStyle(node, k, v) : letStyle(node, k);
    }), node;
};

export const setText = (node, content, trim = true) => {
    if (null === content) {
        return node;
    }
    let state = 'textContent';
    return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
};

export const setValue = (node, value) => {
    if (null === value) {
        return letAttribute(node, 'value');
    }
    return (node.value = fromValue(value)), node;
};

export const toString = node => {
    let state = 'outerHTML';
    if (!hasState(node, state)) {
        return false;
    }
    return node[state] || "";
};

export const toggleClass = (node, name, force) => {
    return node.classList.toggle(name, force), node;
};

export const toggleClasses = (node, classes, force) => {
    if (isArray(classes)) {
        return forEachArray(classes, k => toggleClass(node, k, force)), node;
    }
    if (isObject(classes)) {
        return forEachObject(classes, (v, k) => v && toggleClass(node, k, force)), node;
    }
    return node;
};

export const toggleState = (node, state) => {
    return hasState(node, state) && (node[state] = !node[state]), node;
};

export const toggleStates = (node, states) => {
    if (isArray(states)) {
        return forEachArray(states, k => toggleState(node, k)), node;
    }
    if (isObject(states)) {
        return forEachObject(states, (v, k) => v && toggleState(node, k)), node;
    }
    return node;
};

let theCookies = 0;

export const theHistory = W.history;

export const theID = {};

export const theLocation = W.location;

export const theScript = D.currentScript;