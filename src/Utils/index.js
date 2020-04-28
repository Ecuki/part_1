import _ from "lodash";
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
