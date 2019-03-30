#! /usr/bin/env node

const cv = require('opencv4nodejs');

const cli = async () => {
  require('dotenv').config();
  const yargs = require('yargs')
        .demandCommand(1)
        .usage('Usage: $0 [options] [file]')
        .default('o', 'out.png')
        .alias('o', 'output')
        .array('filter')
        .describe('o', 'Write to FILE instead of stdout')
        .help()
        .version('0.0.1')
        .locale('en');
  const argv = yargs.argv;
  const imgPath = (argv._)[0];
  const img = cv.imread(imgPath);
  const grayImg = img.bgrToGray();
  console.log(33);
  filteredImage = applyFilter(grayImg, argv.filter);
  console.log(3);
  cv.imwrite(argv.output, filteredImage);
}

const rcKernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3));
const crKernel = cv.getStructuringElement(cv.MORPH_CROSS, new cv.Size(3, 3));

const applyFilter = (img, filters) => {
  workImg = img;
  for (const filter of filters) {
    switch(filter) {
    case 'median':
      workImg = workImg.medianBlur(3);
      break;
    case 'gaussian':
      workImg = workImg.gaussianBlur(new cv.Size(5, 5), 3);
      break;
    case 'bilateral':
      workImg = workImg.bilateralFilter(7, 35, 7);
      break;
    case 'erode':
      workImg = workImg.erode(crKernel);
      break;
    case 'dilate':
      workImg = workImg.dilate(crKernel);
      break;
    case 'erode-rect':
      workImg = workImg.erode(rcKernel);
      break;
    case 'dilate-rect':
      workImg = workImg.dilate(rcKernel);
      break;
      /*
    case 'fastnl-means':
      workImg = cv.fastNlMeansDenoisingColored(workImg);
      break;
      */
    default:
      break;
    }
  }
  return workImg;
}

cli();
