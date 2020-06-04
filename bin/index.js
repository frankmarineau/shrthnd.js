#!/usr/bin/env node

'use strict'

var fs = require('fs')
var file = process.argv[2]
var shrthnd = require('..')

var content = fs.readFileSync(file, {encoding: 'utf8'})
process.stdout.write(shrthnd(content).string)
