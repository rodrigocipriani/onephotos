// const shortid = require("shortid");

// var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHABET = "23456789abdegjkmnpqrvwxyz";

const ID_LENGTH = 8;

const generate = function({ size }) {
  const totalSize = size || ID_LENGTH;
  var rtn = "";
  for (var i = 0; i < totalSize; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
};

module.exports = props => {
  return generate(props || {});
  // return shortid.generate();
};
