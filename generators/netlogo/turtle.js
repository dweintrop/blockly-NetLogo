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
 * @fileoverview Generating NetLogo Turtle blocks.
 * @author dweintrop@u.northwestern.edu (David Weintrop)
 */
'use strict';

goog.provide('Blockly.NetLogo.turtle');

goog.require('Blockly.NetLogo');

Blockly.NetLogo['draw_move'] = function(block) {
  var value =  Blockly.NetLogo.valueToCode(this, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var stmt = this.getFieldValue('DIR') == 'moveForward' ? 'forward' : 'back';
  return stmt + ' ' + value + '\n';
}

Blockly.NetLogo['draw_turn'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var stmt = block.getFieldValue('DIR') == 'turnRight' ? 'right' : 'left';
  return stmt + ' ' + value + '\n';
};


Blockly.NetLogo['draw_width'] = function(block) {
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';

  return 'set pen-size ' + width + '\n';
};

Blockly.NetLogo['draw_pen'] = function(block) {
	return 'penUp' == (block.getFieldValue('PEN') ? 'pen-up' : 'pen-down') + '\n';
};

Blockly.NetLogo['draw_colour'] = function(block) {
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'set color ' + colour + '\n';
};

Blockly.NetLogo['turtle_visibility'] = function(block) {
  return ('showTurtle' == block.getFieldValue('VISIBILITY') ? 'show-turtle' : 'hide-turtle') + '\n';
};

// No clear NetLogo analog
// Blockly.JavaScript['draw_print'] = function(block) {
//   var argument0 = String(Blockly.JavaScript.valueToCode(block, 'TEXT',
//       Blockly.JavaScript.ORDER_NONE) || '\'\'');
//   return 'Turtle.drawPrint(' + argument0 + ', \'block_id_' +
//       block.id + '\');\n';
// };

// No clear NetLogo analog
// Blockly.JavaScript['draw_font'] = function(block) {
//   return 'Turtle.drawFont(\'' + block.getFieldValue('FONT') + '\',' +
//       Number(block.getFieldValue('FONTSIZE')) + ',\'' +
//       block.getFieldValue('FONTSTYLE') + '\', \'block_id_' +
//       block.id + '\');\n';
// };