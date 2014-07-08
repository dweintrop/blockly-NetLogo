/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating NetLogo for colour blocks.
 * @author dweintrop@u.northwestern.edu
 */
'use strict';

goog.provide('Blockly.NetLogo.colour');

goog.require('Blockly.NetLogo');

Blockly.NetLogo['colour_picker'] = function(block) {
  // Colour picker.
  var hex = block.getFieldValue('COLOUR');

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  var elements = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var stmt = 'rgb ' + parseInt(elements[1], 16) + ' ' + parseInt(elements[2], 16) + ' ' + parseInt(elements[3], 16);

  return [stmt, Blockly.NetLogo.ORDER_ATOMIC];
};

Blockly.NetLogo['colour_random'] = function(block) {
  return ['rgb random 255 random 255 random 255', Blockly.NetLogo.ORDER_ATOMIC];
};

Blockly.NetLogo['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var r = Blockly.NetLogo.valueToCode(block, 'RED', Blockly.NetLogo.ORDER_NONE) || 0;
  var g = Blockly.NetLogo.valueToCode(block, 'GREEN', Blockly.NetLogo.ORDER_NONE) || 0;
  var b = Blockly.NetLogo.valueToCode(block, 'BLUE', Blockly.NetLogo.ORDER_NONE) || 0;
  var code = 'rgb ' + r + ' ' + g + ' ' + b;
  return [code, Blockly.NetLogo.ORDER_ATOMIC];
};

