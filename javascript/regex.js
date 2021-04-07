function validatePIN(pin) {
    return /^(\d{4}|\d{6})$/.test(pin);
}



function toCamelCase(str) {

    var regExp = /[-_]\w/ig;

    return str.replace(regExp, function (match) {
        return match.charAt(1).toUpperCase();
    });
}