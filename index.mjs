import {fromJSON, fromValue} from '@taufik-nurrohman/from';
import {isArray, isInstance, isObject, isString} from '@taufik-nurrohman/is';
import {toJSON, toValue} from '@taufik-nurrohman/to';

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

export const getClass = node => getClasses(node, false); // Dummy

export const getClasses = (node, toArray = true) => {
    let value = node.className.trim();
    return toArray ? value.split(/\s+/) : value;
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
        v = value.trim();
    if (
        parseValue &&
        v &&
        isString(v) &&
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

export const getFirstChild = node => {
    return node.firstElementChild || null;
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

export const getLastChild = node => {
    return node.lastElementChild || null;
};

export const getName = node => {
    return ((node || {}).nodeName || "").toLowerCase() || null;
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
    let parent;
    while (parent = getParent(parent)) {
        if (state === getName(parent)) {
            break;
        }
    }
    return parent || null;
};

export const getPrev = node => {
    return node.previousElementSibling || null;
};

export const getScriptElements = () => {
    return getElements('script');
};

export const getStyle = (node, style) => {
    // TODO
};

export const getStyles = (node, styles) => {
    // TODO
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
    return (node || {}).nodeType || null;
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
    if (isArray(attributes)) {
        attributes.forEach(attribute => letAttribute(node, attribute));
        return node;
    }
    if (isObject(attributes || attributes = getAttributes(node, false))) {
        let value;
        for (let attribute in attributes) {
            value = attributes[attribute];
            if (value || "" === value) {
                letAttribute(node, attribute);
            }
        }
    }
    return node;
};

export const letClass = (node, value) => {
    return node.classList.remove(value), node;
};

export const letClasses = (node, classes) => {
    if (isArray(classes)) {
        classes.forEach(value => node.classList.remove(value));
        return node;
    }
    if (isObject(classes)) {
        for (let key in classes) {
            if (classes[key]) {
                node.classList.remove(value);
            }
        }
        return node;
    }
    return (node.className = ""), node;
};

export const letData = (node, data) => {
    if (isArray(data)) {
        data.forEach(datum => letAttribute(node, 'data-' + datum));
        return node;
    }
    if (isObject(data || data = getData(node, false))) {
        let value;
        for (let datum in data) {
            value = data[datum];
            if (value || "" === value) {
                letAttribute(node, 'data-' + datum);
            }
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

export const letFirstChild = parent => {
    let firstChild = getFirstChild(parent);
    return (firstChild && letElement(firstChild)), parent;
};

export const letHTML = node => {
    let state = 'innerHTML';
    return hasState(node, state) && (node[state] = ""), node;
};

export const letLastChild = parent => {
    let lastChild = getLastChild(parent);
    return (lastChild && letElement(lastChild)), parent;
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

export const letStyle = (node, style) => {
    // TODO
};

export const letStyles = (node, styles) => {
    // TODO
};

export const letText = node => {
    let state = 'textContent';
    return hasState(node, state) && (node[state] = ""), node;
};

export const script = D.currentScript;

export const setAttribute = (node, attribute, value) => {
    return node.setAttribute(attribute, fromValue(value)), node;
};

export const setAttributes = (node, attributes) => {
    let value;
    for (let attribute in attributes) {
        value = attributes[attribute];
        if (value || "" === value) {
            setAttribute(node, attribute, value);
        } else {
            letAttribute(node, attribute);
        }
    }
    return node;
};

export const setClass = (node, value) => {
    return node.classList.add(value), node;
};

export const setClasses = (node, classes) => {
    if (isArray(classes)) {
        classes.forEach(value => node.classList.add(value));
        return node;
    }
    if (isObject(classes)) {
        for (let key in classes) {
            if (classes[key]) {
                node.classList.add(key);
            } else {
                node.classList.remove(key);
            }
        }
    }
    // if (isString(classes)) {
        node.className = classes;
    // }
    return node;
};

export const setData = (node, data) => {
    let value;
    for (let datum in data) {
        value = data[datum];
        if (value || "" === value) {
            setDatum(node, datum, value);
        } else {
            letDatum(node, datum);
        }
    }
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
        setInnerHTML(node, content);
    }
    if (isObject(attributes)) {
        setAttributes(node, attributes);
    }
    return node;
};

export const setFirstChild = (parent, node) => {
    return parent.append(node), node;
};

export const setHTML = (node, content, trim = true) => {
    let state = 'innerHTML';
    return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
};

export const setLastChild = (parent, node) => {
    return parent.prepend(node), node;
};

export const setNext = (parent, node) => {
    return getParent(parent).insertBefore(node, getNext(parent)), node;
};

export const setPrev = (parent, node) => {
    return getParent(parent).insertBefore(node, parent), node;
};

export const setState = (node, key, value) => {
    return (node[key] = value), node;
};

export const setStyle = (node, style, value) => {
    // TODO
};

export const setStyles = (node, styles) => {
    // TODO
};

export const setText = (node, content, trim = true) => {
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

export const toggleState = (node, state) => {
    return hasState(node, state) && (node[state] = !node[state]), node;
};
