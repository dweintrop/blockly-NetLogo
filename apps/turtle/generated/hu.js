// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">egy vizuális programozási környezet</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">A JavaScript forráskód megtekintése.</span><span id="linkTooltip">Hivatkozás létrehozása</span><span id="runTooltip">Program futtatása.</span><span id="runProgram">Program futtatása</span><span id="resetProgram">Alaphelyzet</span><span id="dialogOk">Elolvastam</span><span id="dialogCancel">Mégsem</span><span id="catLogic">Logikai műveletek</span><span id="catLoops">Ciklusok</span><span id="catMath">Matematikai műveletek</span><span id="catText">Sztring műveletek</span><span id="catLists">Listakezelés</span><span id="catColour">Színek</span><span id="catVariables">Változók</span><span id="catProcedures">Eljárások</span><span id="httpRequestError">A kéréssel kapcsolatban probléma merült fel.</span><span id="linkAlert">Ezzel a hivatkozással tudod megosztani a programodat:\n\n%1</span><span id="hashError">Sajnos a \'%1\' hivatkozás nem tartozik egyetlen programhoz sem.</span><span id="xmlError">A programodat nem lehet betölteni.  Elképzelhető, hogy a Blockly egy másik verziójában készült?</span><span id="listVariable">lista</span><span id="textVariable">szöveg</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">Elolvastam</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Turtle_moveTooltip">A teknőcöt mozgatja előre, vagy hátra a pixelben megadott értékkel.</span><span id="Turtle_moveForward">Menj előre (pixel)</span><span id="Turtle_moveBackward">Menj hátra (pixel)</span><span id="Turtle_turnTooltip">A teknőcöt jobbra, vagy balra fordítja a fokban megadott értékkel.</span><span id="Turtle_turnRight">Fordulj jobbra (fok)</span><span id="Turtle_turnLeft">Fordulj balra (fok)</span><span id="Turtle_widthTooltip">Vonalvastagság beállítása.</span><span id="Turtle_setWidth">Vonalvastagság</span><span id="Turtle_colourTooltip">A rajzolás színének változtatása.</span><span id="Turtle_setColour">Rajzolás színe</span><span id="Turtle_penTooltip">Toll felemelése letevése, attól függően, hogy elkezdjük vagy befejezzük a rajzolást.</span><span id="Turtle_penUp">Tollat fel</span><span id="Turtle_penDown">Tollat le</span><span id="Turtle_turtleVisibilityTooltip">A teknőc (kör és nyíl) láthatóvá tétele, vagy elrejtése.</span><span id="Turtle_hideTurtle">Teknőc elrejtése</span><span id="Turtle_showTurtle">Teknőc felfedése</span><span id="Turtle_printHelpUrl">https://en.wikipedia.org/wiki/Printing</span><span id="Turtle_printTooltip">Üzenetet ír a teknőc irányában a helyétől.</span><span id="Turtle_print">Üzenet</span><span id="Turtle_fontHelpUrl">https://hu.wikipedia.org/wiki/Bet%C5%B1k%C3%A9p</span><span id="Turtle_fontTooltip">Beállítja az üzenet betűtípusát.</span><span id="Turtle_font">Betűtípus</span><span id="Turtle_fontSize">Betűméret</span><span id="Turtle_fontNormal">normál</span><span id="Turtle_fontBold">félkövér</span><span id="Turtle_fontItalic">dőlt</span><span id="Turtle_unloadWarning">Az oldal elhagyása a munkád elvesztését eredményezi.</span></div>';
};


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return turtlepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">Blockly</a> : Teknőc Grafika</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr></table><div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><script type="text/javascript" src="../slider.js"><\/script><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><!-- Extra SVG is temporary hack to fix bug #349701 in Chrome 34. --><!-- Harmless for other browsers. --><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /></svg><!-- Fast icon. --><!-- Extra SVG is temporary hack to fix bug #349701 in Chrome 34. --><!-- Harmless for other browsers. --><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></svg></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td style="width: 190px; text-align: center"><button id="runButton" class="primary" title="A teknőc végrehajtja a blokkokkal megadott programot."><img src="../../media/1x1.gif" class="run icon21">Program futtatása</button><button id="resetButton" class="primary" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Alaphelyzet</button></td></tr></table><div id="toolbarDiv"><button id="codeButton" class="notext" title="A JavaScript forráskód megtekintése."><img src=\'../../media/1x1.gif\' class="code icon21"></button><button id="linkButton" class="notext" title="Hivatkozás létrehozása"><img src=\'../../media/1x1.gif\' class="link icon21"></button><button class="notext" id="captureButton" title="Rajz mentése."><img src=\'../../media/1x1.gif\' class="img icon21"></button><a id="downloadImageLink" download="rajz.png"></a></div><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../blocks_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Teknőc"><block type="draw_move"><value name="VALUE"><block type="math_number"><field name="NUM">10</field></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value></block><block type="draw_width"><value name="WIDTH"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="draw_pen"></block><block type="turtle_visibility"></block><block type="draw_print"><value name="TEXT"><block type="text"></block></value></block><block type="draw_font"></block></category><category name="Színek"><block type="draw_colour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block><block type="colour_blend"></block></category><category name="Logikai műveletek"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Ciklusok"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Matematikai műveletek"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><field name="NUM">1</field></block></value><value name="HIGH"><block type="math_number"><field name="NUM">100</field></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">100</field></block></value></block><block type="math_random_float"></block></category><category name="Listakezelés"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><field name="NUM">5</field></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">lista</field></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><field name="VAR">lista</field></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><field name="VAR">lista</field></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><field name="VAR">lista</field></block></value></block></category><category name="Változók" custom="VARIABLE"></category><category name="Eljárások" custom="PROCEDURE"></category></xml>';
};
