import {fromValue} from '@taufik-nurrohman/from';
import {isArray, isObject, isString} from '@taufik-nurrohman/is';
import {toValue} from '@taufik-nurrohman/to';

export const D = document;
export const W = window;

export const B = D.body;
export const H = D.head;
export const R = D.documentElement;

export const after = (node, target) => {
    return parent(target).insertBefore(node, target.nextElementSibling), node;
};

export const append = (node, target) => {
    return target.append(node), node;
};

export const before = (node, target) => {
    return parent(target).insertBefore(node, target), node;
};

export const element = (node, content, attributes) => {
    node = isString(node) ? D.createElement(node) : node;
    if (isObject(content)) {
        attributes = content;
        content = false;
    }
    if (isString(content)) {
        setInnerHTML(node, content);
    }
    if(isObject(attributes)) {
        let value;
        for (let key in attributes) {
            value = attributes[key];
            if (!value && "" !== value) {
                setAttribute(node, value);
            } else {
                letAttribute(node);
            }
        }
    }
    return node;
};

export const fromElement = node => {
    let data = getAttributes(node),
        content = getInnerHTML(node),
        title = name(node);
    return false !== content ? [title, content, data] : [title, data];
};

export const getAttribute = (node, key, eval = true) => {
    if (!hasAttribute(node, key)) {
        return null;
    }
    let value = node.getAttribute(key);
    return eval ? toValue(value) : value;
};

export const getAttributes = (node, eval = true) => {
    let attributes = node.attributes,
        value, values = {};
    for (let i = 0, j = attributes.length; i < j; ++i) {
        value = attributes[i].value;
        values[attributes[i].name] = eval ? toValue(value) : value;
    }
    return values;
};

export const getClasses = (node, toArray = true) => {
    let value = node.className.trim();
    return toArray ? value.split(/\s+/) : value;
};

export const getInnerHTML = (node, trim = true) => {
    let key = 'innerHTML';
    if (!hasState(node, key)) {
        return false;
    }
    let content = node[key];
    content = trim ? content.trim() : content;
    return "" !== content ? content : null;
};

export const getInnerText = (node, trim = true) => {
    let key = 'textContent';
    if (!hasState(node, key)) {
        return false;
    }
    let content = node[key];
    content = trim ? content.trim() : content;
    return "" !== content ? content : null;
};

export const getState = (node, key) => {
    return hasState(node, key) && node[key] || null;
};

export const hasParent = node => {
    return null !== parent(node);
};

export const hasState = (node, key) => {
    return key in node;
};

export const isParent = (node, target) => {
    return node && target && target === parent(node);
};

export const letAttribute = (node, key) => {
    return node.removeAttribute(key), node;
};

export const letAttributes = (node, attributes) => {
    if (isArray(attributes)) {
        attributes.forEach(key => letAttribute(node, key));
        return node;
    }
    if (true === attributes) {
        attributes = getAttributes(node, false);
        for (let key in attributes) {
            letAttribute(node, key);
        }
        return node;
    }
    for (let key in attributes) {
        if (attributes[key]) {
            letAttribute(node, key);
        }
    }
    return node;
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
    // if (isString(classes)) {
        node.className = "";
    // }
    return node;
};

export const letInnerHTML = node => {
    let key = 'innerHTML';
    return hasState(node, key) && (node[key] = ""), node;
};

export const letInnerText = node => {
    let key = 'textContent';
    return hasState(node, key) && (node[key] = ""), node;
};

export const letState = (node, key) => {
    return (delete node[key]), node;
};

export const name = node => {
    return (node.nodeName || "").toLowerCase() || null;
};

export const parent = node => {
    return node.parentNode || null;
};

export const prepend = (node, target) => {
    return target.prepend(node), node;
};

export const queryElement = (query, scope) => {
    return (scope || D).querySelector(query);
};

export const queryElements = (query, scope) => {
    return (scope || D).querySelectorAll(query);
};

export const script = D.currentScript;

export const setAttribute = (node, key, value) => {
    return node.setAttribute(key, fromValue(value)), node;
};

export const setAttributes = (node, attributes) => {
    let value;
    for (let key in attributes) {
        value = attributes[key];
        if (!value && "" !== value) {
            letAttribute(node, key);
        } else {
            setAttribute(node, key, attributes[key]);
        }
    }
    return node;
};

export const setClasses = (node, classes) => {
    if (isArray(classes)) {
        classes.forEach(value => node.classList.add(value));
        return node;
    }
    if (isObject(classes)) {
        for (let value in classes) {
            if (classes[value]) {
                node.classList.add(value);
            } else {
                node.classList.remove(value);
            }
        }
    }
    // if (isString(classes)) {
        node.className = classes;
    // }
    return node;
};

export const setInnerHTML = (node, content, trim = true) => {
    let key = 'innerHTML';
    return hasState(node, key) && (node[key] = trim ? content.trim() : content), node;
};

export const setInnerText = (node, content, trim = true) => {
    let key = 'textContent';
    return hasState(node, key) && (node[key] = trim ? content.trim() : content), node;
};

export const setState = (node, key, value) => {
    return (node[key] = value), node;
};

export const toElement = fromArray => {
    return element(...fromArray);
};

export const toggleState = (node, key) => {
    return hasState(node, key) && (node[key] = !node[key]), node;
};
