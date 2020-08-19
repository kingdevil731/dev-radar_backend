module.exports = function arrayAsString(string) {
    return string.split(",").map((item) => item.trim());
}