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
 * @fileoverview Generating NetLogo for logic blocks.
 * @author dweintrop@u.northwestern.edu
 */
'use strict';

goog.provide('Blockly.NetLogo.logic');

goog.require('Blockly.NetLogo');

// Blockly.JavaScript['controls_if'] = function(block) {
//   // If/elseif/else condition.
//   var n = 0;
//   var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
//       Blockly.JavaScript.ORDER_NONE) || 'false';
//   var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
//   var code = 'if (' + argument + ') {\n' + branch + '}';
//   for (n = 1; n <= block.elseifCount_; n++) {
//     argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
//         Blockly.JavaScript.ORDER_NONE) || 'false';
//     branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
//     code += ' else if (' + argument + ') {\n' + branch + '}';
//   }
//   if (block.elseCount_) {
//     branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
//     code += ' else {\n' + branch + '}';
//   }
//   return code + '\n';
// };

Blockly.NetLogo['netlogo_controls_if'] = function(block) {
  // If condition.
  var n = 0;
  var argument = Blockly.NetLogo.valueToCode(block, 'IF' + n,
      Blockly.NetLogo.ORDER_NONE) || 'false';
  var branch = Blockly.NetLogo.statementToCode(block, 'DO' + n) || '  \n';
  var code = 'if ' + argument + '\n  [ ' + branch + '  ]';
  if (block.elseCount_) {
    branch = Blockly.NetLogo.statementToCode(block, 'ELSE') || '  \n';
    code += '\n  [' + branch + '  ]';
  }
  return code;
};

Blockly.NetLogo['netlogo_controls_if_else'] = function(block) {
  // If/else condition.
  var n = 0;
  var argument = Blockly.NetLogo.valueToCode(block, 'IF' + n,
      Blockly.NetLogo.ORDER_NONE) || 'false';
  var branch = Blockly.NetLogo.statementToCode(block, 'DO' + n) || '  \n';
  var code = 'ifelse ' + argument + '\n  [ ' + branch + '  ]';
  branch = Blockly.NetLogo.statementToCode(block, 'ELSE') || '  \n';
  code += '\n  [' + branch + '  ]';
  return code;
};

Blockly.NetLogo['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '=',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.NetLogo.ORDER_RELATIONAL;
  var argument0 = Blockly.NetLogo.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.NetLogo.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.NetLogo['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.NetLogo.ORDER_LOGICAL_AND :
      Blockly.NetLogo.ORDER_LOGICAL_OR;
  var argument0 = Blockly.NetLogo.valueToCode(block, 'A', order);
  var argument1 = Blockly.NetLogo.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'False';
    argument1 = 'False';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == 'and') ? 'True' : 'False';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.NetLogo['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.NetLogo.valueToCode(block, 'BOOL',
      Blockly.NetLogo.ORDER_LOGICAL_NOT) || 'True';
  var code = 'not ' + argument0;
  return [code, Blockly.NetLogo.ORDER_LOGICAL_NOT];
};

Blockly.NetLogo['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.NetLogo.ORDER_ATOMIC];
};

Blockly.NetLogo['logic_null'] = function(block) {
  // Null data type.
  return ['None', Blockly.NetLogo.ORDER_ATOMIC];
};

Blockly.NetLogo['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.NetLogo.valueToCode(block, 'IF',
      Blockly.NetLogo.ORDER_CONDITIONAL) || 'False';
  var value_then = Blockly.NetLogo.valueToCode(block, 'THEN',
      Blockly.NetLogo.ORDER_CONDITIONAL) || 'None';
  var value_else = Blockly.NetLogo.valueToCode(block, 'ELSE',
      Blockly.NetLogo.ORDER_CONDITIONAL) || 'None';
  var code = 'ifelse-value (' + value_if + ') [' + value_then + '] [' + value_else + ']';
  return [code, Blockly.NetLogo.ORDER_CONDITIONAL];
};
