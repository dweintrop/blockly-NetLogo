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
 * @fileoverview Generating Python for list blocks.
 * @author dweintrop@u.northwestern.edu
 */
'use strict';

goog.provide('Blockly.NetLogo.lists');

goog.require('Blockly.NetLogo');


Blockly.NetLogo['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.NetLogo.ORDER_ATOMIC];
};

Blockly.NetLogo['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var code = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    code[n] = Blockly.NetLogo.valueToCode(block, 'ADD' + n,
        Blockly.NetLogo.ORDER_NONE) || '';
  }
  code = '[' + code.join(' ') + ']';
  return [code, Blockly.NetLogo.ORDER_ATOMIC];
};

Blockly.NetLogo['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var argument0 = Blockly.NetLogo.valueToCode(block, 'ITEM',
      Blockly.NetLogo.ORDER_NONE) || '';
  var argument1 = Blockly.NetLogo.valueToCode(block, 'NUM',
      Blockly.NetLogo.ORDER_MULTIPLICATIVE) || '0';
  var code = '[' 
  for (var n = 0; n < argument1; n++) {
    code += ' ' + argument0
  }
  code += ']';
  return [code, Blockly.NetLogo.ORDER_MULTIPLICATIVE];
};

Blockly.NetLogo['lists_length'] = function(block) {
  // List length.
  var argument0 = Blockly.NetLogo.valueToCode(block, 'VALUE',
      Blockly.NetLogo.ORDER_NONE) || '[]';
  return ['length ' + argument0 , Blockly.NetLogo.ORDER_FUNCTION_CALL];
};

Blockly.NetLogo['lists_isEmpty'] = function(block) {
  // Is the list empty?
  var argument0 = Blockly.NetLogo.valueToCode(block, 'VALUE',
      Blockly.NetLogo.ORDER_NONE) || '[]';
  var code = 'empty? ' + argument0;
  return [code, Blockly.NetLogo.ORDER_LOGICAL_NOT];
};

Blockly.NetLogo['lists_indexOf'] = function(block) {
  // Find an item in the list.
  var argument0 = Blockly.NetLogo.valueToCode(block, 'FIND',
      Blockly.NetLogo.ORDER_NONE) || '';
  var argument1 = Blockly.NetLogo.valueToCode(block, 'VALUE',
      Blockly.NetLogo.ORDER_MEMBER) || '[]';
  var code = 'position ' + argument0 + ' ' + argument1;
  return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
};

Blockly.NetLogo['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.NetLogo.valueToCode(block, 'AT',
      Blockly.NetLogo.ORDER_UNARY_SIGN) || '1';
  var list = Blockly.NetLogo.valueToCode(block, 'VALUE',
      Blockly.NetLogo.ORDER_MEMBER) || '[]';

  if (where == 'FIRST') {
    if (mode == 'GET') {
      var code = 'first ' + list;
      return [code, Blockly.NetLogo.ORDER_MEMBER];
    } else {
      var code = list + '.pop(0)';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  } else if (where == 'LAST') {
    if (mode == 'GET') {
      var code = 'last ' + list;
      return [code, Blockly.NetLogo.ORDER_MEMBER];
    } else {
      var code = list + '.pop()';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  } else if (where == 'FROM_START') {
    // Blockly uses one-based indicies.
    if (Blockly.isNumber(at)) {
      // If the index is a naked number, decrement it right now.
      at = parseInt(at, 10) - 1;
    } else {
      // If the index is dynamic, decrement it in code.
      at = 'int(' + at + ' - 1)';
    }
    if (mode == 'GET') {
      var code = list + '[' + at + ']';
      return [code, Blockly.NetLogo.ORDER_MEMBER];
    } else {
      var code = list + '.pop(' + at + ')';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  } else if (where == 'FROM_END') {
    if (mode == 'GET') {
      var code = list + '[-' + at + ']';
      return [code, Blockly.NetLogo.ORDER_MEMBER];
    } else {
      var code = list + '.pop(-' + at + ')';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  } else if (where == 'RANDOM') {
    if (mode == 'GET') {
      code = 'one-of ' + list;
      return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
    } else {
      var functionName = Blockly.NetLogo.provideFunction_(
          'lists_remove_random_item',
          ['def ' + Blockly.NetLogo.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
           '  x = int(random.random() * len(myList))',
           '  return myList.pop(x)']);
      code = functionName + '(' + list + ')';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  }
  throw 'Unhandled combination (lists_getIndex).';
};

Blockly.NetLogo['lists_setIndex'] = function(block) {
  // Set element at index.
  // Note: Until February 2013 this block did not have MODE or WHERE inputs.
  var list = Blockly.NetLogo.valueToCode(block, 'LIST',
      Blockly.NetLogo.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.NetLogo.valueToCode(block, 'AT',
      Blockly.NetLogo.ORDER_NONE) || '1';
  var value = Blockly.NetLogo.valueToCode(block, 'TO',
      Blockly.NetLogo.ORDER_NONE) || 'None';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  // Closure, which accesses and modifies 'list'.
  function cacheList() {
    if (list.match(/^\w+$/)) {
      return '';
    }
    var listVar = Blockly.NetLogo.variableDB_.getDistinctName(
        'tmp_list', Blockly.Variables.NAME_TYPE);
    var code = listVar + ' = ' + list + '\n';
    list = listVar;
    return code;
  }
  if (where == 'FIRST') {
    if (mode == 'SET') {
      return list + '[0] = ' + value + '\n';
    } else if (mode == 'INSERT') {
      return list + '.insert(0, ' + value + ')\n';
    }
  } else if (where == 'LAST') {
    if (mode == 'SET') {
      return list + '[-1] = ' + value + '\n';
    } else if (mode == 'INSERT') {
      return list + '.append(' + value + ')\n';
    }
  } else if (where == 'FROM_START') {
    // Blockly uses one-based indicies.
    if (Blockly.isNumber(at)) {
      // If the index is a naked number, decrement it right now.
      at = parseInt(at, 10) - 1;
    } else {
      // If the index is dynamic, decrement it in code.
      at = 'int(' + at + ' - 1)';
    }
    if (mode == 'SET') {
      return list + '[' + at + '] = ' + value + '\n';
    } else if (mode == 'INSERT') {
      return list + '.insert(' + at + ', ' + value + ')\n';
    }
  } else if (where == 'FROM_END') {
    if (mode == 'SET') {
      return list + '[-' + at + '] = ' + value + '\n';
    } else if (mode == 'INSERT') {
      return list + '.insert(-' + at + ', ' + value + ')\n';
    }
  } else if (where == 'RANDOM') {
    Blockly.NetLogo.definitions_['import_random'] = 'import random';
    var code = cacheList();
    var xVar = Blockly.NetLogo.variableDB_.getDistinctName(
        'tmp_x', Blockly.Variables.NAME_TYPE);
    code += xVar + ' = int(random.random() * len(' + list + '))\n';
    if (mode == 'SET') {
      code += list + '[' + xVar + '] = ' + value + '\n';
      return code;
    } else if (mode == 'INSERT') {
      code += list + '.insert(' + xVar + ', ' + value + ')\n';
      return code;
    }
  }
  throw 'Unhandled combination (lists_setIndex).';
};

Blockly.NetLogo['lists_getSublist'] = function(block) {
  // Get sublist.
  var list = Blockly.NetLogo.valueToCode(block, 'LIST',
      Blockly.NetLogo.ORDER_MEMBER) || '[]';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var at1 = Blockly.NetLogo.valueToCode(block, 'AT1',
      Blockly.NetLogo.ORDER_ADDITIVE) || '1';
  var at2 = Blockly.NetLogo.valueToCode(block, 'AT2',
      Blockly.NetLogo.ORDER_ADDITIVE) || '1';
  if (where1 == 'FIRST' || (where1 == 'FROM_START' && at1 == '1')) {
    at1 = '';
  } else if (where1 == 'FROM_START') {
    // Blockly uses one-based indicies.
    if (Blockly.isNumber(at1)) {
      // If the index is a naked number, decrement it right now.
      at1 = parseInt(at1, 10) - 1;
    } else {
      // If the index is dynamic, decrement it in code.
      at1 = 'int(' + at1 + ' - 1)';
    }
  } else if (where1 == 'FROM_END') {
    if (Blockly.isNumber(at1)) {
      at1 = -parseInt(at1, 10);
    } else {
      at1 = '-int(' + at1 + ')';
    }
  }
  if (where2 == 'LAST' || (where2 == 'FROM_END' && at2 == '1')) {
    at2 = '';
  } else if (where1 == 'FROM_START') {
    if (Blockly.isNumber(at2)) {
      at2 = parseInt(at2, 10);
    } else {
      at2 = 'int(' + at2 + ')';
    }
  } else if (where1 == 'FROM_END') {
    if (Blockly.isNumber(at2)) {
      // If the index is a naked number, increment it right now.
      // Add special case for -0.
      at2 = 1 - parseInt(at2, 10);
      if (at2 == 0) {
        at2 = '';
      }
    } else {
      // If the index is dynamic, increment it in code.
      Blockly.NetLogo.definitions_['import_sys'] = 'import sys';
      at2 = 'int(1 - ' + at2 + ') or sys.maxsize';
    }
  }
  var code = list + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.NetLogo.ORDER_MEMBER];
};
