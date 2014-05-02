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
 * @fileoverview Helper functions for generating NetLogo for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.NetLogo');

goog.require('Blockly.Generator');


Blockly.NetLogo = new Blockly.Generator('NetLogo');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.NetLogo.addReservedWords(

  //Keywords from NetLogo Dictionary: http://ccl.northwestern.edu/netlogo/docs/

  // turtle keywords
  'back,bk,<breeds>-at,<breeds>-here,<breeds>-on,can-move?,clear-turtles,ct,create-<breeds>,create-ordered-<breeds>,create-ordered-turtles,cro,create-turtles,crt,die,distance,distancexy,downhill,downhill4,dx,dy,face,facexy,forward,fd,hatch,hatch-<breeds>,hide-turtle,ht,home,inspect,is-<breed>?,is-turtle?,jump,layout-circle,left,lt,move-to,myself,nobody,no-turtles,of,other,patch-ahead,patch-at,patch-at-heading-and-distance,patch-here,patch-left-and-ahead,patch-right-and-ahead,pen-down,pd,pen-erase,pe,pen-up,pu,random-xcor,random-ycor,right,rt,self,set-default-shape,__set-line-thickness,setxy,shapes,show-turtle,st,sprout,sprout-<breeds>,stamp,stamp-erase,subject,subtract-headings,tie,towards,towardsxy,turtle,turtle-set,turtles,turtles-at,turtles-here,turtles-on,turtles-own,untie,uphill,uphill4'+

  // patch keywords
  'clear-patches,cp,diffuse,diffuse4,distance,distancexy,import-pcolors,import-pcolors-rgb,inspect,is-patch?,myself,neighbors,neighbors4,nobody,no-patches,of,other,patch,patch-at,patch-ahead,patch-at-heading-and-distance,patch-here,patch-left-and-ahead,patch-right-and-ahead,patch-set,patches,patches-own,random-pxcor,random-pycor,self,sprout,sprout-<breeds>,subject,turtles-here' +

  // agentset keywords
  'all?,any?,ask,ask-concurrent,at-points,<breeds>-at,<breeds>-here,<breeds>-on,count,in-cone,in-radius,is-agent?,is-agentset?,is-patch-set?,is-turtle-set?,link-set,max-n-of,max-one-of,member?,min-n-of,min-one-of,n-of,neighbors,neighbors4,no-links,no-patches,no-turtles,of,one-of,other,patch-set,patches,sort,sort-by,sort-on,turtle-set,turtles,turtles-at,turtles-here,turtles-on,with,with-max,with-min' +

  // color keywords
  'approximate-hsb,approximate-rgb,base-colors,color,extract-hsb,extract-rgb,hsb,import-pcolors,import-pcolors-rgb,pcolor,rgb,scale-color,shade-of?,wrap-color' + 

  // control flow and logic
  'and,ask,ask-concurrent,carefully,end,error,error-message,every,if,ifelse,ifelse-value,let,loop,not,or,repeat,report,run,runresult,;,(semicolon),set,stop,startup,to,to-report,wait,while,with-local-randomness,without-interruption,xor' +
 
  // Task keywords
  'filter,foreach,is-command-task?,is-reporter-task?,map,n-values,reduce,run,runresult,sort-by,task' + 

  // World keywords
  'clear-all,ca,clear-drawing,cd,clear-patches,cp,clear-ticks,clear-turtles,ct,display,import-drawing,import-pcolors,import-pcolors-rgb,no-display,max-pxcor,max-pycor,min-pxcor,min-pycor,patch-size,reset-ticks,resize-world,set-patch-size,tick,tick-advance,ticks,world-width,world-height' +

  // Perspective keywords
  'follow,follow-me,reset-perspective,rp,ride,ride-me,subject,watch,watch-me' +

  // Input/output keywords
  'beep,clear-output,date-and-time,export-view,export-interface,export-output,export-plot,export-all-plots,export-world,import-drawing,import-pcolors,import-pcolors-rgb,import-world,mouse-down?,mouse-inside?,mouse-xcor,mouse-ycor,output-print,output-show,output-type,output-write,print,read-from-string,reset-timer,set-current-directory,show,timer,type,user-directory,user-file,user-new-file,user-input,user-message,user-one-of,user-yes-or-no?,write' + 

  // File keywords
  'file-at-end?,file-close,file-close-all,file-delete,file-exists?,file-flush,file-open,file-print,file-read,file-read-characters,file-read-line,file-show,file-type,file-write,user-directory,user-file,user-new-file' + 

  // List keywords
  'but-first,but-last,empty?,filter,first,foreach,fput,histogram,is-list?,item,last,length,list,lput,map,member?,modes,n-of,n-values,of,position,one-of,reduce,remove,remove-duplicates,remove-item,replace-item,reverse,sentence,shuffle,sort,sort-by,sort-on,sublist' + 

  // String keywords
  //Operators (<, >, =, !=, <=, >=) 
  'but-first,but-last,empty?,first,is-string?,item,last,length,member?,position,remove,remove-item,read-from-string,replace-item,reverse,substring,word' + 

  // Mathematical keywords
  // Arithmetic Operators (+, *, -, /, ^, <, >, =, !=, <=, >=) 
  'abs,acos,asin,atan,ceiling,cos,e,exp,floor,int,is-number?,ln,log,max,mean,median,min,mod,modes,new-seed,pi,precision,random,random-exponential,random-float,random-gamma,random-normal,random-poisson,random-seed,remainder,round,sin,sqrt,standard-deviation,subtract-headings,sum,tan,variance' + 

  // Plotting keywods
  'autoplot?,auto-plot-off,auto-plot-on,clear-all-plots,clear-plot,create-temporary-plot-pen,export-plot,export-all-plots,histogram,plot,plot-name,plot-pen-exists?,plot-pen-down,plot-pen-reset,plot-pen-up,plot-x-max,plot-x-min,plot-y-max,plot-y-min,plotxy,set-current-plot,set-current-plot-pen,set-histogram-num-bars,set-plot-pen-color,set-plot-pen-interval,set-plot-pen-mode,set-plot-x-range,set-plot-y-range,setup-plots,update-plots' + 

  // Links keywords
  'both-ends,clear-links,create-<breed>-from,create-<breeds>-from,create-<breed>-to,create-<breeds>-to,create-<breed>-with,create-<breeds>-with,create-link-from,create-links-from,create-link-to,create-links-to,create-link-with,create-links-with,die,hide-link,in-<breed>-neighbor?,in-<breed>-neighbors,in-<breed>-from,in-link-neighbor?,in-link-neighbors,in-link-from,is-directed-link?,is-link?,is-link-set?,is-undirected-link?,layout-radial,layout-spring,layout-tutte,<breed>-neighbor?,<breed>-neighbors,<breed>-with,link-heading,link-length,link-neighbor?,link,links,links-own,<link-breeds>-own,link-neighbors,link-with,my-<breeds>,my-in-<breeds>,my-in-links,my-links,my-out-<breeds>,my-out-links,no-links,other-end,out-<breed>-neighbor?,out-<breed>-neighbors,out-<breed>-to,out-link-neighbor?,out-link-neighbors,out-link-to,show-link,tie,untie' + 

  // Movie keywords
  'movie-cancel,movie-close,movie-grab-view,movie-grab-interface,movie-set-frame-rate,movie-start,movie-status' + 

  // BehaviorSpace keywods
  'behaviorspace-run-number' + 

  // System keywords
  'netlogo-applet?,netlogo-version');


/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
Blockly.NetLogo.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.NetLogo.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.NetLogo.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.NetLogo.ORDER_MEMBER = 2;            // . []
Blockly.NetLogo.ORDER_FUNCTION_CALL = 2;     // ()
Blockly.NetLogo.ORDER_EXPONENTIATION = 3;    // **
Blockly.NetLogo.ORDER_UNARY_SIGN = 4;        // + -
Blockly.NetLogo.ORDER_BITWISE_NOT = 4;       // ~
Blockly.NetLogo.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.NetLogo.ORDER_ADDITIVE = 6;          // + -
Blockly.NetLogo.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.NetLogo.ORDER_BITWISE_AND = 8;       // &
Blockly.NetLogo.ORDER_BITWISE_XOR = 9;       // ^
Blockly.NetLogo.ORDER_BITWISE_OR = 10;       // |
Blockly.NetLogo.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
Blockly.NetLogo.ORDER_LOGICAL_NOT = 12;      // not
Blockly.NetLogo.ORDER_LOGICAL_AND = 13;      // and
Blockly.NetLogo.ORDER_LOGICAL_OR = 14;       // or
Blockly.NetLogo.ORDER_CONDITIONAL = 15;      // if else
Blockly.NetLogo.ORDER_LAMBDA = 16;           // lambda
Blockly.NetLogo.ORDER_NONE = 99;             // (...)

/**
 * Arbitrary code to inject into locations that risk causing infinite loops.
 * Any instances of '%1' will be replaced by the block ID that failed.
 * E.g. '  checkTimeout(%1)\n'
 * @type ?string
 */
Blockly.NetLogo.INFINITE_LOOP_TRAP = null;

/**
 * Initialise the database of variable names.
 */
Blockly.NetLogo.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.NetLogo.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.NetLogo.functionNames_ = Object.create(null);

  if (Blockly.Variables) {
    if (!Blockly.NetLogo.variableDB_) {
      Blockly.NetLogo.variableDB_ =
          new Blockly.Names(Blockly.NetLogo.RESERVED_WORDS_);
    } else {
      Blockly.NetLogo.variableDB_.reset();
    }

    var defvars = [];
    var variables = Blockly.Variables.allVariables();
    for (var x = 0; x < variables.length; x++) {
      defvars[x] = Blockly.NetLogo.variableDB_.getName(variables[x],
          Blockly.Variables.NAME_TYPE) + ' = None';
    }
    Blockly.NetLogo.definitions_['variables'] = defvars.join('\n');
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.NetLogo.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.NetLogo.definitions_) {
    var def = Blockly.NetLogo.definitions_[name];
    if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.NetLogo.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.NetLogo.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\%/g, '\\%')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.NetLogo.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, ';; ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, ';; ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
