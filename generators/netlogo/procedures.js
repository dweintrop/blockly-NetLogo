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
 * @fileoverview Generating NetLogo for procedure blocks.
 * @author dweintrop@u.northwestern.edu
 */
'use strict';

goog.provide('Blockly.NetLogo.procedures');

goog.require('Blockly.NetLogo');


Blockly.NetLogo['procedures_defreturn'] = function(block) {
  procedure_body(block, true)
  return null;
}

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.NetLogo['procedures_defnoreturn'] = function(block) {
  procedure_body(block, false);
  return null;
}

function procedure_body(block, is_reporter) {
  // Define a procedure with a return value.
  // First, add a 'global' statement for every variable that is assigned.
  var globals = Blockly.Variables.allVariables(block);
  for (var i = globals.length - 1; i >= 0; i--) {
    var varName = globals[i];
    if (block.arguments_.indexOf(varName) == -1) {
      globals[i] = Blockly.NetLogo.variableDB_.getName(varName,
          Blockly.Variables.NAME_TYPE);
    } else {
      // This variable is actually a parameter name.  Do not include it in
      // the list of globals, thus allowing it be of local scope.
      globals.splice(i, 1);
    }
  }
  globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
  var funcName = Blockly.NetLogo.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.NetLogo.statementToCode(block, 'STACK');
  if (Blockly.NetLogo.INFINITE_LOOP_TRAP) {
    branch = Blockly.NetLogo.INFINITE_LOOP_TRAP.replace(/%1/g,
        '"' + block.id + '"') + branch;
  }

  var code = (is_reporter ? 'to-report ' : 'to ');

  var returnValue = Blockly.NetLogo.valueToCode(block, 'RETURN',
      Blockly.NetLogo.ORDER_NONE) || 'False';
  if (is_reporter) {
    returnValue = '  report ' + returnValue + '\nend\n';
  } else {
    returnValue = 'end\n';
  }
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.NetLogo.variableDB_.getName(block.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  code = code + funcName;
  if (args.length > 0) {
    code = code + ' [' + args.join(' ') + ']';
  }  
  code = code + '\n' + globals + branch + returnValue;
  code = Blockly.NetLogo.scrub_(block, code);
  Blockly.NetLogo.definitions_[funcName] = code;
  return null;
};

Blockly.NetLogo['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.NetLogo.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.NetLogo.valueToCode(block, 'ARG' + x,
        Blockly.NetLogo.ORDER_NONE) || 'False';
  }
  var code = funcName + ' ' + args.join(' ');
  return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
};

Blockly.NetLogo['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.NetLogo.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.NetLogo.valueToCode(block, 'ARG' + x,
        Blockly.NetLogo.ORDER_NONE) || 'False';
  }
  var code = funcName + ' ' + args.join(', ') + '\n';
  return code;
};

Blockly.NetLogo['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.NetLogo.valueToCode(block, 'CONDITION',
      Blockly.NetLogo.ORDER_NONE) || 'False';
  var code = 'if ' + condition + '\n';
  if (block.hasReturnValue_) {
    var value = Blockly.NetLogo.valueToCode(block, 'VALUE',
        Blockly.NetLogo.ORDER_NONE) || 'False';
    code += '  [ report ' + value + ' ]\n';
  } else {
    code += '  [ stop ]\n';
  }
  return code;
};
