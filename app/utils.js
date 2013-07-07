exports.isObjectId = function (id) {
  return /^[\da-f]{24}$/.test(id);
}
