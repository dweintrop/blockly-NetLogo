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
 * @fileoverview Generating JavaScript for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.NetLogo.loops');

goog.require('Blockly.NetLogo');

Blockly.NetLogo['controls_repeat_ext'] = function(block) {
  // Repeat n times (internal number).
  var repeats = Blockly.NetLogo.valueToCode(this, 'TIMES',
      Blockly.NetLogo.ORDER_NONE) || '0';
  var branch = Blockly.NetLogo.statementToCode(block, 'DO');
  return "repeat " + repeats + " [\n" + branch + "]\n";
};

Blockly.NetLogo['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.NetLogo.valueToCode(block, 'BOOL',
      until ? Blockly.NetLogo.ORDER_LOGICAL_NOT :
      Blockly.NetLogo.ORDER_NONE) || 'false';
  var branch = Blockly.NetLogo.statementToCode(block, 'DO');
  // if (Blockly.NetLogo.INFINITE_LOOP_TRAP) {
  //   branch = Blockly.NetLogo.INFINITE_LOOP_TRAP.replace(/%1/g,
  //       '\'' + block.id + '\'') + branch;
  // }
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while [' + argument0 + '] [\n' + branch + ']\n';
};

Blockly.NetLogo['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.NetLogo.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.NetLogo.valueToCode(block, 'LIST',
      Blockly.NetLogo.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.NetLogo.statementToCode(block, 'DO');
  if (Blockly.NetLogo.INFINITE_LOOP_TRAP) {
    branch = Blockly.NetLogo.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var indexVar = Blockly.NetLogo.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  branch = Blockly.NetLogo.INDENT + variable0 + ' = ' + argument0 + '[' + indexVar + '];\n' +
      branch;
  var code = 'for (var ' + indexVar + ' in  ' + argument0 + ') {\n' +
      branch + '}\n';
  return code;
};

Blockly.NetLogo['controls_flow_statements'] = function(block) {
  return 'stop\n';
};
