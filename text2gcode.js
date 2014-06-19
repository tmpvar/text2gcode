#!/usr/bin/env node

var opentype = require('opentype.js');
var argv = require('yargs')
  .usage('$0 --font=/path/to/text.ttf --diameter --depth=-5 "hello world"')
  .demand('font')
  .describe('font', '/path/to/font.ttf')
  .demand('depth')
  .describe('depth', 'total depth to go (may be negative if your machine is normal)')
  .demand('diameter')
  .describe('diameter', 'cutting tool diameter')
  .describe('fs', 'size of the font in world units (mm/in)')
  .default('fs', 20)
  .describe('pass', 'total depth taken off per layer (depth per pass)')
  .describe('rotate', 'rotate by % TAU (i.e. --rotate=.25 means 90 degrees)')
  .default('rotate', 0)
  .describe('mirror', 'mirror on the x axis')
  .default('mirror', false)
  .default('pass', .1)
  .default('x', 0)
  .describe('x', 'translate on the x')
  .default('y', 0)
  .describe('y', 'translate on the y')
  .argv;


var gcanvas = require('gcanvas');

var text = argv._[0];
var fontFile = argv.font;
var size = text
var ctx = new (require('gcanvas'));
var fontsize =  argv.fs || 30;

var TAU = Math.PI*2;

var defined = function(a) {
  return typeof a !== 'undefined';
}

opentype.load(argv.font, function(err, font) {
  if (err) {
    throw err;
  }

  ctx.depth = argv.depth || -5;
  ctx.depthOfCut = argv.pass || .1;

  ctx.scale(argv.mirror ? 1 : -1, 1)
  ctx.toolDiameter = argv.diameter || 1.6;

  var width = 0;
  font.forEachGlyph(text + ' ', 0, 0, fontsize, null, function(glyph, x, y) {
    width = x;
  });

  var x = defined(argv.x) ? argv.x : 0;
  var y = defined(argv.y) ? argv.y : 0;


  ctx.translate((argv.mirror ? 0 : -width) + x, fontsize + y);
  var path = font.getPath(text, 0, 0, fontsize, null);

  argv.rotate && ctx.rotate(TAU * parseFloat(argv.rotate))

  if (argv.stroke) {
    path.lineWidth = parseInt(argv.stroke);
    path.stroke = 'black'
  } else {
    path.stroke = null;
  }

  if (!defined(argv.fill) || argv.fill) {
    path.fill = 'black';
  } else {
    path.fill = null;
  }

  path.draw(ctx);
});
