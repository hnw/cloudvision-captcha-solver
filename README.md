# cloudvision-captcha-solver

Text recognition CAPTCHA solver using Cloud Vision API and OpenCV

## Install

### macOS

```
$ brew install opencv@3
$ OPENCV4NODEJS_DISABLE_AUTOBUILD=1 npm i
```

## Usage

Prepare API credential file downloaded from GCP console.

```
$ cp .env.example .env
$ vi .env
```

### text detection

```
$ ./text-detection.js /path/to/captcha.image
Full text: 434975

Block confidence: 0.9800000190734863
Paragraph confidence: 0.9800000190734863
Word text: 434975
Word confidence: 0.9800000190734863
Symbol text: 4
Symbol confidence: 0.9900000095367432
Symbol text: 3
Symbol confidence: 0.9900000095367432
Symbol text: 4
Symbol confidence: 1
Symbol text: 9
Symbol confidence: 0.9700000286102295
Symbol text: 7
Symbol confidence: 0.9800000190734863
Symbol text: 5
Symbol confidence: 0.9700000286102295
```

### noise reduction

```
$ ./noise-reduction.js -o out.jpg --filter median median -- input.jpg
```

filters which can be specified:

 * `median`
 * `gaussian`
 * `bilateral`
 * `erode`
 * `dilate`
 * `erode-rect`
 * `dilate-rect`
