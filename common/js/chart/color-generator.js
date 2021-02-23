function calculatePoint(i, intervalSize, colorRangeInfo) {
  var colorStart = colorRangeInfo.colorStart;
  var colorEnd = colorRangeInfo.colorEnd;
  var useEndAsStart = colorRangeInfo.useEndAsStart;
  
  return (useEndAsStart
    ? (colorEnd - (i * intervalSize))
    : (colorStart + (i * intervalSize)));
}

/* Must use an interpolated color scale, which has a range of [0, 1] */
function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  var colorStart = colorRangeInfo.colorStart;
  var colorEnd = colorRangeInfo.colorEnd;
  var colorRange = colorEnd - colorStart;
  var intervalSize = colorRange / dataLength;
  var i, colorPoint;
  var colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}
