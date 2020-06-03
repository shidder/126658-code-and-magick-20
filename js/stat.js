'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_X = 110;
var SHADOW_Y = 20;

var MESSAGE_FONT = '16px PT Mono';
var MESSAGE_BASELINE = 'hanging';
var MESSAGE_X = 125;
var MESSAGE_Y = 25;
var MESSAGE_BR = 20;
var MESSAGE_FIRST = 'Ура вы победили!';
var MESSAGE_SECOND = 'Список результатов:';

var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_Y = 240;
var GAP = 50;
var FONT_GAP = 16;

var COLOR_BLACK = '#000';
var COLOR_RED = 'rgba(255, 0, 0, 1)';

var SATURATION_MIN = 1;
var SATURATION_MAX = 100;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMessage = function (ctx, text, x, y) {
  ctx.font = MESSAGE_FONT;
  ctx.fillStyle = COLOR_BLACK;
  ctx.textBaseline = MESSAGE_BASELINE;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBlueColor = function (arr) {
  var randomBlueColor = [];
  for (var i = 0; i < arr.length; i++) {
    var saturation = getRandomNumber(SATURATION_MIN, SATURATION_MAX);
    randomBlueColor[i] = 'hsl(240,' + saturation + '%' + ', 50%)';
  }
  return randomBlueColor;
};

var getPlayersColor = function (name) {
  var playersColor = getRandomBlueColor();
  if (name === 'Вы') {
    playersColor = COLOR_RED;
  }
  return playersColor;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderMessage(ctx, MESSAGE_FIRST, MESSAGE_X, MESSAGE_Y);
  renderMessage(ctx, MESSAGE_SECOND, MESSAGE_X, MESSAGE_Y + MESSAGE_BR);

  var maxTime = getMaxElement(times);
  var playersColor = getPlayersColor(players);

  for (var i = 0; i < players.length; i++) {
    var playersBarHeight = (-BAR_MAX_HEIGHT * times[i]) / maxTime;
    ctx.fillStyle = getPlayersColor(playersColor[i]);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, playersBarHeight);
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - GAP + playersBarHeight);
  }
};
