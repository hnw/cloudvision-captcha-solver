#! /usr/bin/env node

const vision = require('@google-cloud/vision');

const cli = async () => {
  require('dotenv').config();
  const yargs = require('yargs')
        .demandCommand(1)
        .usage('Usage: $0 [options]')
        .default('lang', 'en')
        .describe('lang', 'Language hints')
        .help()
        .version('0.0.1')
        .locale('en');
  const argv = yargs.argv;

  const resultJson = await recognizeTextFromImage((argv._)[0], argv.lang);
  outputResult(resultJson);
}

const recognizeTextFromImage = async (imagePath, lang) => {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const request = {
    "image": {
      "source": {
        filename: imagePath,
      }
    },
    "imageContext": {
      "languageHints": [
        lang
      ]
    }
  };
  const [result] = await client.documentTextDetection(request);
  const fullTextAnnotation = result.fullTextAnnotation;
  return fullTextAnnotation;
}

const outputResult = (fullTextAnnotation) => {
  console.log(`Full text: ${fullTextAnnotation.text}`);
  fullTextAnnotation.pages.forEach(page => {
    page.blocks.forEach(block => {
      console.log(`Block confidence: ${block.confidence}`);
      block.paragraphs.forEach(paragraph => {
        console.log(`Paragraph confidence: ${paragraph.confidence}`);
        paragraph.words.forEach(word => {
          const wordText = word.symbols.map(s => s.text).join('');
          console.log(`Word text: ${wordText}`);
          console.log(`Word confidence: ${word.confidence}`);
          word.symbols.forEach(symbol => {
            console.log(`Symbol text: ${symbol.text}`);
            console.log(`Symbol confidence: ${symbol.confidence}`);
          });
        });
      });
    });
  });
}

cli();
