import _ from "lodash";
import axios from "axios";

export const firstLetterToUppercase = (str) => _.startCase(_.toLower(str));
export const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
const getAverage = (good, bad, neutral) =>
  Number(
    (
      arrSum([good * 1, bad * -1, neutral * 0]) / arrSum([good, bad, neutral])
    ).toFixed(3)
  );

const getPossitive = (good, bad, neutral) => {
  const percentage = Number(
    ((good / arrSum([good, bad, neutral])) * 100).toFixed(2)
  );
  return `${percentage} %`;
};

export const calcStats = (feedback) => {
  const { good, bad, neutral } = feedback;
  const stats = {
    all: arrSum([good, bad, neutral]),
    average: getAverage(good, bad, neutral),
    possitive: getPossitive(good, bad, neutral),
  };

  return stats;
};
export const randomArrIndex = (arr) => Math.floor(Math.random() * arr.length);

export const findMaxInObject = (obj) =>
  _.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
export const isEmpty = (str) => {
  const newStr = str.trim();
  return !newStr || 0 === newStr.length;
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
      (item?.number &&
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
  let errors = {
    name: { isEmpty: false, exist: false },
    number: { isEmpty: false, exist: false },
  };
  const { name, number } = errors;
  if (isEmpty(newName)) {
    name.isEmpty = true;
  } else if (persons.find((item) => item["name"] === newName)) {
    name.exist = true;
  }

  if (isEmpty(newNumber)) {
    number.isEmpty = true;
  } else if (persons.find((item) => item["number"] === newNumber)) {
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
