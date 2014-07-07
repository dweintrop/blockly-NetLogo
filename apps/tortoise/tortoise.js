/**
 * @fileoverview Core JavaScript library for Tortoise feature of Blockly.
 * @author dweintrop@u.northwestern.edu (David Weintrop)
 */
'use strict';

// Top level object for Tortoise.
goog.provide('Tortoise');

// Closure dependencies.
goog.require('goog.cssom');
goog.require('goog.dom');
goog.require('goog.events');

Tortoise.updater = null;

Tortoise.init = function() {
	Tortoise.updater = Tortoise.updateNetLogo;
}

Tortoise.update = function() {
	Tortoise.updater();
}

Tortoise.resize = function(parentBlock) {
	var TortoiseDiv = document.getElementById('tortoise');

  TortoiseDiv.style.cssText = parentBlock.style.cssText;
  TortoiseDiv.style.top = (parentBlock.scrollHeight + 70) + 'px';
  TortoiseDiv.style.overflow = 'auto';

	var parentbBox = BlocklyApps.getBBox_(parentBlock);
  for (var x in Tortoise.code.TABS_) {
    var el = document.getElementById('content_' + Tortoise.code.TABS_[x]);
    if (el) {

      // el.style.top = '28px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.

      el.style.height = parentbBox.height + 10 + 'px';
      el.style.height = (2 * parentbBox.height - el.offsetHeight) + 'px';
      el.style.width = parentbBox.width + 15 + 'px';
      el.style.width = (2 * parentbBox.width - el.offsetWidth) + 'px';
    }
  }
}

Tortoise.updatePrettyJS = function () {
	Tortoise.updater = Tortoise.updatePrettyJS;
	var outputDiv = document.getElementById('content_javascript')
	var code = Blockly.JavaScript.workspaceToCode();
	var prettyCode = BlocklyApps.stripCode(code);
	if (typeof prettyPrintOne == 'function') {
    prettyCode = prettyPrintOne(prettyCode, 'js');
  } 
  outputDiv.innerHTML = prettyCode;
}

// CODE MIRROR TAB
Tortoise.JScodeMirror = null;
Tortoise.NLcodeMirror = null;

Tortoise.updateJSCodeMirror = function () {
  Tortoise.updater = Tortoise.updateJSCodeMirror;
  if (Tortoise.JScodeMirror == null) {
    var cmTextArea = document.getElementById('codeMirror-textArea');
    cmTextArea.value = code;
    Tortoise.JScodeMirror = CodeMirror.fromTextArea(cmTextArea, 
    {
      mode: "javascript",
      lineNumbers: true,
      tabSize: 2
    });
  }
	
  var code = Blockly.JavaScript.workspaceToCode();
  var prettyCode = BlocklyApps.stripCode(code);
	Tortoise.JScodeMirror.setValue(prettyCode);
}

Tortoise.updateNetLogo = function() {
  Tortoise.updater = Tortoise.updateNetLogo;
  if (Tortoise.NLcodeMirror == null) {
    var nlTextArea = document.getElementById('netLogo-textArea');
    Tortoise.NLcodeMirror = CodeMirror.fromTextArea(nlTextArea, 
      {
        mode: "javascript",
        lineNumbers: true,
        tabSize: 2
      });
  }
  
  var code = Blockly.NetLogo.workspaceToCode();
  Tortoise.NLcodeMirror.setValue(code);
}

Tortoise.parseJS = function() {
  Tortoise.Syntax.BlocksFromText(Tortoise.codeMirror.getValue());
}

Tortoise.updatePython = function () {
	Tortoise.updater = Tortoise.updatePython;
	var outputDiv = document.getElementById('content_python')
  var code = Blockly.Python.workspaceToCode();
  var prettyCode = BlocklyApps.stripCode(code);
  outputDiv.textContent = prettyCode;
  if (typeof prettyPrintOne == 'function') {
    prettyCode = outputDiv.innerHTML;
    prettyCode = prettyPrintOne(prettyCode, 'py');
    outputDiv.innerHTML = prettyCode;
  }
}

Tortoise.codeMirrorXml = null;

Tortoise.updateXml = function () {
	Tortoise.updater = Tortoise.updateXml;
  if (Tortoise.codeMirrorXml == null) {
    var cmTextArea = document.getElementById('codeMirror_xml');
    Tortoise.codeMirrorXml = CodeMirror.fromTextArea(cmTextArea, 
    {
      mode: "xml",
      lineNumbers: true,
      tabSize: 2
    });
  }
	// var xmlTextarea = document.getElementById('content_xml');
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  Tortoise.codeMirrorXml.setValue(xmlText);
  // xmlTextarea.value = xmlText;
  // xmlTextarea.focus();
}


// THIS IS A TRIMMED DOWN VERION OF THE CODE APP TAB UI
/**
 * Create a namespace for the application.
 */
Tortoise.code = {};

/**
 * List of tab names.
 * @private
 */
Tortoise.code.TABS_ = ['javascript', 'netLogo', 'codeMirror', 'python', 'xml'];

Tortoise.code.selected = 'netLogo';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
Tortoise.code.tabClick = function(id) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlText = Tortoise.codeMirrorXml.getValue();
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(BlocklyApps.getMsg('Code_badXml').replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }

  // Deselect all tabs and hide all panes.
  for (var x in Tortoise.code.TABS_) {
    var name = Tortoise.code.TABS_[x];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Tortoise.code.selected = id.replace('tab_', '');
  document.getElementById(id).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + Tortoise.code.selected).style.visibility =
      'visible';
  Tortoise.code.renderContent();
  Blockly.fireUiEvent(window, 'resize');
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Tortoise.code.renderContent = function() {
  var content = document.getElementById('content_' + Tortoise.code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
  	Tortoise.updateXml();
  } else if (content.id == 'content_javascript') {
  	Tortoise.updatePrettyJS();
  } else if (content.id == 'content_netLogo') {
  	Tortoise.updateNetLogo();
  } else if (content.id == 'content_codeMirror') {
  	Tortoise.updateJSCodeMirror();
  } else if (content.id == 'content_python') {
  	Tortoise.updatePython();
  }
};

/**
 * Initialize Blockly.  Called on page load.
 */
Tortoise.code.init = function() {
  // Add to reserved word list: Local variables in execution evironment (runJS)
  // and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  var hasTabs = document.getElementById('tabTable');
  
  if (hasTabs) {
    Tortoise.code.tabClick('tab_' + Tortoise.code.selected);
  } else {
    Tortoise.updateNetLogo();
  }
};

if (window.location.pathname.match(/readonly.html$/)) {
  window.addEventListener('load', BlocklyApps.initReadonly);
} else {
  window.addEventListener('load', Tortoise.code.init);
}



