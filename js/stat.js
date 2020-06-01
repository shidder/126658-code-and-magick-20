'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_X = 110;
var SHADOW_Y = 20;

var MESSAGE_FONT = '16px PT Mono';
var MESSAGE_COLOR = '#000';
var MESSAGE_BASELINE = 'hanging';
var MESSAGE_X = 125;
var MESSAGE_Y = 25;
var MESSAGE_BR = 20;

var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_Y = 240;
var GAP = 50;
var FONT_GAP = 16;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMessage = function (ctx, text, x, y) {
  ctx.font = MESSAGE_FONT;
  ctx.fillStyle = MESSAGE_COLOR;
  ctx.textBaseline = MESSAGE_BASELINE;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  if (arr.length !== 0) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderMessage(ctx, 'Ура вы победили!', MESSAGE_X, MESSAGE_Y);
  renderMessage(ctx, 'Список результатов:', MESSAGE_X, MESSAGE_Y + MESSAGE_BR);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = (Math.floor(Math.random() * 101));
      ctx.fillStyle = 'hsl(240,' + saturation + '%' + ', 50%)';
    }
    var playersBarHeight = (-BAR_MAX_HEIGHT * times[i]) / maxTime;

    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, playersBarHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - GAP + playersBarHeight);
  }
};

