const path = require('path');

const arrLinks = [];
let countBroken = 0;
let shortPath = '';
let mySet = {};


const statsAndValidate = (data) => {
  data.forEach((object) => {
    arrLinks.push(object.href);
    if (object.statusText === 'fail') countBroken += 1;
  });
  mySet = new Set(arrLinks);
  return `Total: ${data.length} \nUnique: ${mySet.size} \nBroken: ${countBroken}`;
};

const onlyStats = (data) => {
  data.forEach((object) => {
    arrLinks.push(object.href);
  });
  mySet = new Set(arrLinks);
  return `Total: ${data.length} \nUnique: ${mySet.size}`;
};

const onlyValidate = (data) => {
  let newData = '';
  data.forEach((detailLink) => {
    shortPath = path.relative(process.cwd(), detailLink.file);
    newData += `${shortPath} ${detailLink.href} ${detailLink.text} ${detailLink.status} ${detailLink.statusText}\n`;
  });
  return newData;
};

const onlyPath = (data) => {
  let newData = '';
  data.forEach((detailLink) => {
    shortPath = path.relative(process.cwd(), detailLink.file);
    newData += `${shortPath} ${detailLink.href} ${detailLink.text} \n`;
  });
  return newData;
};

const options = {
  statsAndValidate: statsAndValidate,
  onlyStats: onlyStats,
  onlyValidate: onlyValidate,
  onlyPath: onlyPath,
};

module.exports = options;
