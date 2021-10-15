function deepCopy(object) { // This is a level 1 deep copy --- i.e. if some value is itself another JS-object, it will be copied in a shallow manner.
    "use strict";
    const copycat = {};
    for (const key of Object.keys(object)) {
        copycat[key] = object[key];
    }
    return copycat;
}

function removeAll(list, toBeRemoved) {
    "use strict";
    if (toBeRemoved.length == 0) {
        return list;
    }
    for (let i=0; i<list.length; i++) {
        if (toBeRemoved.includes(list[i])) { // Shallow check, might need rivision!
            list.splice(i, 1);
            i--;
        }
    }
    return list;
}

function deepEquals(x, y) { // x, y are objects --- possibly restricted version of deep equality for our purposes only!
    "use strict";
    // console.log("Equals?");
    // console.log(x);
    // console.log(y);
    if (typeof x != typeof y) {
        return false;
    }
    if (!(typeof x == "object")) {
        return x === y;
    }
    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);
    if (xKeys.length != yKeys.length) {
        return false;
    }
    for (let i=0; i<xKeys.length; i++) {
        let xi = x[xKeys[i]];
        let yi = y[yKeys[i]];
        if (xKeys[i] != yKeys[i] || (typeof xi !== "object" && xi != yi) || !deepEquals(xi, yi)) {
            return false;
        }
    }
    return true;
}

function arrayDeepEquals(x, y) { // x, y are arrays --- not used as of now!
    "use strict";
    if (x.length != y.length) {
        return false;
    }
    for (let i=0; i<x.length; i++) {
        if (!deepEquals(x[i], y[i])) {
            return false;
        }
    }
    return true;
}

function deepIncludes(object, list) { //Re-implementation of Array.prototype.includes() that checks at depth=1 for equal objects.
    "use strict";
    for (const entry of list) {
        if (deepEquals(object, entry)) {
            return true;
        }
    }
    return false;
}