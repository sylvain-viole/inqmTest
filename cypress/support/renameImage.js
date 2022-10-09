const fs = require("fs");
/**
 * @param {String} suffix 
 */
export const addSuffixToImageFileName = (suffix) => {
  const rootDir = require("path").resolve("./");
  const dir = `${rootDir}/cypress/fixtures/img`;
  const files = fs.readdirSync(dir);
  const imgFileName = files.filter((file) => file.includes("inqom"))[0];
  fs.renameSync(`${dir}/${imgFileName}`, `${dir}/inqom_${suffix}.png`);
};
