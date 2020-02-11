const path = require('path');

const stats = (data, option) => {
  const arrLinks = [];
  let countBroken = 0;
  let shortPath = '';

  data.forEach((object) => {
    arrLinks.push(object.href);
    if (option.validate === true && object.statusText === 'fail') countBroken += 1;
  });

  const mySet = new Set(arrLinks);

  if (option.stats === true && option.validate === false) {
    console.log(`Total: ${data.length} \nUnique: ${mySet.size}`);
  } else if (option.stats === true && option.validate === true) {
    console.log(`Total: ${data.length} \nUnique: ${mySet.size} \nBroken: ${countBroken}`);
  } else if (option.stats === false && option.validate === true) {
    data.forEach((detailLink) => {
      shortPath = path.relative(process.cwd(), detailLink.file);
      console.log(`${shortPath} ${detailLink.href} ${detailLink.text} ${detailLink.status} ${detailLink.statusText}`);
    });
  } else {
    data.forEach((detailLink) => {
      shortPath = path.relative(process.cwd(), detailLink.file);
      console.log(`${shortPath} ${detailLink.href} ${detailLink.text}`);
    });
  }
};

module.exports = stats;
