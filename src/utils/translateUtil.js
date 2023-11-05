var _t = undefined;

export function setT(fn) {
    _t = fn;
}

export default function t(text) {
    if (_t) 
        return _t(text);
    else
        return text;
}