#! /usr/bin/env node

'use strict';

const flags = require('commander');
const plateCheck = require('../lib/plate-check');

flags
  .description(
    'Given a plate, find out its registration information.')
  .usage('[options] [plate number]')
  .version('0.1.0')
  .option('-p, --plate', 'Plate Number')
  .parse(process.argv);

let inPlate = process.stdin;

if (flags.args.length > 0) {
  inPlate = flags.args[0];
}

if (flags.plate) {
  plateCheck.getInfo(inPlate);
}
