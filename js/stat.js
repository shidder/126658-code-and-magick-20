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

var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_Y = 240;
var GAP = 50;
var FONT_GAP = 16;

var Message = {
  FIRST: 'Ура вы победили!',
  SECOND: 'Список результатов:'
};

var Color = {
  BLACK: '#000',
  RED: 'rgba(255, 0, 0, 1)'
};

var Saturation = {
  MIN: 1,
  MAX: 100
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMessage = function (ctx, text, x, y) {
  ctx.font = MESSAGE_FONT;
  ctx.fillStyle = Color.BLACK;
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

var getRandomBlueColor = function () {
  var saturation = getRandomNumber(Saturation.MIN, Saturation.MAX);
  var randomBlueColor = 'hsl(240,' + saturation + '%' + ', 50%)';
  return randomBlueColor;
};

var getPlayerColor = function (name) {
  return name === 'Вы' ? Color.RED : getRandomBlueColor();
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderMessage(ctx, Message.FIRST, MESSAGE_X, MESSAGE_Y);
  renderMessage(ctx, Message.SECOND, MESSAGE_X, MESSAGE_Y + MESSAGE_BR);

  var maxTime = getMaxElement(times);
  var renderPlayerScore = function () {
    var playersBarHeight = (-BAR_MAX_HEIGHT * times[i]) / maxTime;
    ctx.fillStyle = getPlayerColor(players[i]);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, playersBarHeight);
    ctx.fillStyle = Color.BLACK;
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - GAP + playersBarHeight);
  };
  for (var i = 0; i < players.length; i++) {
    renderPlayerScore(players[i], times[i]);
  }
};
