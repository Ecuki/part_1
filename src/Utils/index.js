import _ from 'lodash';
import axios from 'axios';

export const firstLetterToUppercase = (str) => _.startCase(_.toLower(str));
export const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
const getAverage = (good, bad, ok) =>
  Number(
    (arrSum([good * 1, bad * -1, ok * 0]) / arrSum([good, bad, ok])).toFixed(3)
  );

const getPossitive = (good, bad, ok) =>
  Number(((good / arrSum([good, bad, ok])) * 100).toFixed(2));

export const calcStats = (feedback) => {
  const { good, bad, ok } = feedback;
  const sum = arrSum([good, bad, ok]);
  const average = getAverage(good, bad, ok);
  const possitive = getPossitive(good, bad, ok);
  const stats = {
    all: sum ? sum : '-',
    average: average || average === 0 ? average : '-',
    possitive: possitive || possitive === 0 ? `${possitive} %` : '-',
  };

  return stats;
};

export const randomArrIndex = (arr) => Math.floor(Math.random() * arr.length);

export const findMaxInObject = (obj) =>
  _.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
export const isEmpty = (str) => {
  const newStr = str.trim();
  return !newStr || newStr.length === 0;
};
export const handleInput = (fn) => (e) => fn(e.target.value);

export const validateAddInput = (text, arr, prop) => {
  let error = false;
  if (isEmpty(text)) {
    error = `${firstLetterToUppercase(prop)} cannot be empty`;
  } else if (arr.find((item) => item[prop] === text)) {
    error = `Item ${text} already exist`;
  }
  return error;
};

export const searchInArray = (arr, search) => {
  if (isEmpty(search)) {
    return arr;
  }
  const newArr = arr.filter(
    (item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      (item.number &&
        item.number.toLowerCase().includes(search.trim().toLowerCase()))
  );

  return newArr;
};
export const fechData = (url, callback) => {
  axios
    .get(url)
    .then((res) => callback(res.data))
    .catch((err) => console.error(err));
};

export const validatePerson = (persons, newNumber, newName) => {
  const errors = {
    name: { isEmpty: false, exist: false },
    number: { isEmpty: false, exist: false },
  };
  const { name, number } = errors;
  if (isEmpty(newName)) {
    name.isEmpty = true;
  } else if (persons.find((item) => item.name === newName)) {
    name.exist = true;
  }

  if (isEmpty(newNumber)) {
    number.isEmpty = true;
  } else if (persons.find((item) => item.number === newNumber)) {
    number.exist = true;
  }
  return errors;
};
export const changeMessage = (message, callback) => {
  callback(message);
  setTimeout(() => {
    callback(null);
  }, 5000);
};
const ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ID_LENGTH = 8;

export const generateID = function() {
  var rtn = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
};
