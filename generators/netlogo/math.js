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
 * @fileoverview Generating NetLogo for math blocks.
 * @author dweintrop@u.northwestern.edu
 */
'use strict';

goog.provide('Blockly.NetLogo.math');

goog.require('Blockly.NetLogo');


// If any new block imports any library, add that library name here.
Blockly.NetLogo.addReservedWords('random');

Blockly.NetLogo['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code < 0 ? Blockly.NetLogo.ORDER_UNARY_SIGN :
              Blockly.NetLogo.ORDER_ATOMIC;
  return [code, order];
};

Blockly.NetLogo['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.NetLogo.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.NetLogo.ORDER_ADDITIVE],
    'MULTIPLY': [' * ', Blockly.NetLogo.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Blockly.NetLogo.ORDER_MULTIPLICATIVE],
    'POWER': [' ^ ', Blockly.NetLogo.ORDER_EXPONENTIATION]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.NetLogo.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.NetLogo.valueToCode(block, 'B', order) || '0';
  var code = argument0 + operator + argument1;
  return [code, order];
  // In case of 'DIVIDE', division between integers returns different results
  // in Python 2 and 3. However, is not an issue since Blockly does not
  // guarantee identical results in all languages.  To do otherwise would
  // require every operator to be wrapped in a function call.  This would kill
  // legibility of the generated code.  See:
  // http://code.google.com/p/blockly/wiki/Language
};

Blockly.NetLogo['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    var code = Blockly.NetLogo.valueToCode(block, 'NUM',
        Blockly.NetLogo.ORDER_UNARY_SIGN) || '0';
    return ['-' + code, Blockly.NetLogo.ORDER_UNARY_SIGN];
  }
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.NetLogo.valueToCode(block, 'NUM',
        Blockly.NetLogo.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = Blockly.NetLogo.valueToCode(block, 'NUM',
        Blockly.NetLogo.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'abs ' + arg;
      break;
    case 'ROOT':
      code = 'sqrt ' + arg;
      break;
    case 'LN':
      code = 'ln ' + arg;
      break;
    case 'LOG10':
      code = 'log ' + arg;
      break;
    case 'EXP':
      code = 'exp ' + arg;
      break;
    case 'POW10':
      code = '10 ^ ' + arg;
      break;
    case 'ROUND':
      code = 'round ' + arg;
      break;
    case 'ROUNDUP':
      code = 'ceiling ' + arg;
      break;
    case 'ROUNDDOWN':
      code = 'floor ' + arg;
      break;
    case 'SIN':
      code = 'sin ' + arg;
      break;
    case 'COS':
      code = 'cos ' + arg ;
      break;
    case 'TAN':
      code = 'tan ' + arg;
      break;
  }
  if (code) {
    return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ASIN':
      code = 'asin ' + arg;
      break;
    case 'ACOS':
      code = 'acos ' + arg;
      break;
    case 'ATAN':
      code = 'atan ' + arg;
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.NetLogo.ORDER_MULTIPLICATIVE];
};

Blockly.NetLogo['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['pi', Blockly.NetLogo.ORDER_MEMBER],
    'E': ['e', Blockly.NetLogo.ORDER_MEMBER],
    'GOLDEN_RATIO': ['(1 + sqrt 5 ) / 2', Blockly.NetLogo.ORDER_MULTIPLICATIVE],
    'SQRT2': ['sqrt 2', Blockly.NetLogo.ORDER_MEMBER],
    'SQRT1_2': ['sqrt .5', Blockly.NetLogo.ORDER_MEMBER]
  };
  var constant = block.getFieldValue('CONSTANT');
  return CONSTANTS[constant];
};

Blockly.NetLogo['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.NetLogo.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.NetLogo.ORDER_MULTIPLICATIVE) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' mod 2 = 0';
      break;
    case 'ODD':
      code = number_to_check + ' mod 2 = 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' mod 1 = 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.NetLogo.valueToCode(block, 'DIVISOR', Blockly.NetLogo.ORDER_MULTIPLICATIVE);
      code = number_to_check + ' mod ' + divisor + ' = 0';
      break;
  }
  return [code, Blockly.NetLogo.ORDER_RELATIONAL];
};

// Rounding functions have a single operand.
Blockly.NetLogo['math_round'] = Blockly.NetLogo['math_single'];
// Trigonometry functions have a single operand.
Blockly.NetLogo['math_trig'] = Blockly.NetLogo['math_single'];

Blockly.NetLogo['math_on_list'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list = Blockly.NetLogo.valueToCode(block, 'LIST',
      Blockly.NetLogo.ORDER_NONE) || '[]';
  var code;
  switch (func) {
    case 'SUM':
      code = 'sum ' + list;
      break;
    case 'MIN':
      code = 'min ' + list;
      break;
    case 'MAX':
      code = 'max ' + list;
      break;
    case 'AVERAGE':
      code = 'mean' + list;
      break;
    case 'MEDIAN':
      code = 'meadian' + list;
      break;
    case 'MODE':
      code = 'modes' + list;
      break;
    case 'STD_DEV':
      code = 'standard-deviation' + list;
      break;
    case 'RANDOM':
      code = 'one-of ' + list;
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
};

Blockly.NetLogo['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.NetLogo.valueToCode(block, 'DIVIDEND',
      Blockly.NetLogo.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.NetLogo.valueToCode(block, 'DIVISOR',
      Blockly.NetLogo.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0 + ' mod ' + argument1;
  return [code, Blockly.NetLogo.ORDER_MULTIPLICATIVE];
};

Blockly.NetLogo['math_random'] = function(block) {
  var num = Blockly.NetLogo.valueToCode(block, 'NUM', Blockly.NetLogo.ORDER_NONE) || '0';
  var dropdown_property = block.getFieldValue('OP');
  var code = 'random' + ((dropdown_property == 'RANDOM' ) ? ' ' : '-float ') + num;
  return [code, Blockly.NetLogo.ORDER_FUNCTION_CALL];
};

