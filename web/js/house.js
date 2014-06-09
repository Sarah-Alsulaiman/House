//----------------------------------------------------------------------------------------
// Initialization
//----------------------------------------------------------------------------------------
function init() {  
	//1. Initialize parse SDK      
	Parse.initialize("RJEiBPKVjPzf1ZBxPONTEUQb6geoVp3OEcm62kew","4161hv8HeBBtUsdjSRg1lQTGELzXXad0vlJeqcMk");
	
	// 2. Apply some changes to core Blockly code [in custom_blockly.js]
	UpdateBlocklyCode();
	
	// 2. Populate required images
	populate();
	
	// 3. Inject Blockly
	//controlTooltip();
	controlTooltip2();
	inject();     
}

//-----------------------------------------------------------------------------------------
// Saving log data on Parse                                                                   
//------------------------------------------------------------------------------------------
function logParse(type, key, comment) {
	var Post = Parse.Object.extend("blockly");
	var myPost = new Post();
	
	myPost.set("TYPE", type);
	myPost.set("KEY", key);
	myPost.set("LEVEL", getLevel() );
	myPost.set("XML", workspaceToText() );
	myPost.set("COMMENT", comment);
	myPost.set("USER", "TODO");
	
	myPost.save();
	//console.log("Saved on Parse!");
}

//-----------------------------------------------------------------------------------------
// Global Level variables                                                                   
//------------------------------------------------------------------------------------------
   var MAX_LEVEL = 7;
   var MIN_LEVEL = 1;
   var CURRENT_LEVEL = getLevel();
   var LEVELS_MSG = ["<br>In general, a house consist of a wall, roof, door, windows and lights. Can you build a house using these blocks<br>",
                       "<br>Can you to build a house with different colors and turn the lights on and then off 3 times in a row? <br><br>",
                       "A flashing house will keep turning the lights on and off over and over again. Can you build a flashing house that will keep turning the lights on and off 6 times in a row using only seven blocks?<br>",
                       "<br>Can you program a house so that when it is daytime, the lights are switched off and when it is night time, it will be switched on?",
                       "<br>Now, instead of building a new house each level, you can create a shortcut to a house and use it in later levels. You can change the colors of this house and give it a name and you'll be able to use it later<br> ",
                       "<br>Can you build a house so that when the city is Chicago, the house \"<p>" + sessionStorage.UserHouse + " </p> \" will be built, otherwise, a different house will be built",
                     "<br>Now, you can play with the blocks as you like!",
                    ];
  
   var COLORS = ['red', 'blue', 'brown', 'beige', 'pink', 'purple', 'silver', 'gold', 'black'];
   var Playing = false;
   
   var BlocksTotal = 0;
   
   var Xposition = 30;
   var Yposition = 70;
   var tipImg;
   var originalRoof;
   var originalDoor;
   var originalWall;
   var originalWindows;
   var originalLights;
   var originalZindex;
   
   var tempImg;
   var Zindex = 4;
   var CURRENT_BG = 'blank';
   
   var dafault_procedure = false;
   var LogRequest = false;
   
   var UserHouse = '';
   var maxBlocks = ["infinity", "infinity", "7", "infinity", "infinity", "infinity", "infinity"];

//-------------------------------------------------------------------------------------
// Convert Workspace to text
//-------------------------------------------------------------------------------------
function workspaceToText () {
	var current_xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var current_xml_text = Blockly.Xml.domToText(current_xml);
	
	return current_xml_text;
} 

//------------------------------------------------------------------------------------------
//  Add Event Listener
//------------------------------------------------------------------------------------------
   
window.addEventListener("message", processEvent, false);
   
//---------------------------------------------------------------------------
//  Get level number from URL
//---------------------------------------------------------------------------
function getLevel () {
	var val = window.location.search.match(new RegExp('[?&]level=(\\d+)'));
	val = val ? val[1] : MIN_LEVEL;
	val = Math.min(Math.max(MIN_LEVEL, val), MAX_LEVEL);
    return val;
   }
   
//---------------------------------------------------------------------------
// Redirect to the next level
//---------------------------------------------------------------------------
function advanceLevel () {
	storeProcedure();
	if (CURRENT_LEVEL < MAX_LEVEL - 1) {
   		$.jqDialog.confirm("Wonderful! Now you have more options to use inside the menues!<BR/> <BR/>Would you like to continue? ".replace('%1', CURRENT_LEVEL + 1),
   		function() { window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + '?level=' + (CURRENT_LEVEL + 1); },    // callback function for 'YES' button
   		function() {  }    // callback function for 'NO' button
   		);  
	}
     
	else if (CURRENT_LEVEL == MAX_LEVEL - 1) {
   		$.jqDialog.alert("<center> Congratulations! <br> You finished all activities <br> <br>Now, you can play with all blocks as you like</center>", 
        function() { window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + '?level=' + (CURRENT_LEVEL + 1);  }); // callback function for 'OK' button
	}   
}

//---------------------------------------------------------------------------
// Show error message
//---------------------------------------------------------------------------
function showError (msg) {
	$.jqDialog.alert("Are you missing something?<br><br>" + msg, function() { }); // callback function for 'OK' button
}

//---------------------------------------------------------------------------
// Populate images
//---------------------------------------------------------------------------
function populate() {
	for (var j=0; j < COLORS.length; j++ ) {
		appendImg('wall', COLORS[j]);
		appendImg('roof', COLORS[j]);
		appendImg('door', COLORS[j]);
		appendImg('windows', COLORS[j]);
    }
    appendImg('lights', 'on');
    appendImg('lights', 'off');                     
}

//-----------------------------------------------------------------------------------------
// Append images                                                                 
//------------------------------------------------------------------------------------------
function appendImg (type, color) {
	var img= document.createElement("img");
    img.src = 'images/' + type + '-' + color + '.png';
    img.id = '' + type + '-' + color;
    img.className = '' + type;
    document.getElementById("images").appendChild(img);
    //console.log("IMG: " + img.src + " added");
}

//---------------------------------------------------------------------------------------
// Utility functions                                                                                   
//---------------------------------------------------------------------------------------
function setHtmlVisibility(id, visible) {
	var el = document.getElementById(String(id));
	var item = id.split("-");
	switch (item[0]) {
		case 'roof':
			originalRoof = id;
			break;
	
		case 'wall':
			originalWall = id;
			break;
	
		case 'windows':
			originalWindows = id;
			break;
	
		case 'door':
			originalDoor = id;
			break;
	
		case 'lights':
			originalLights = id;
			break;
	
		default:
			item[0] = 'background';
			break;
	}
	
	hideVariations(item[0]);
	
	if (el) {
		if (item[0] != "background") {
     		el.style.visibility = visible ? "visible" : "hidden";
     	 	el.style.zIndex = Zindex++;
     	} else {
     	 	var bg = document.getElementById("rosie-output");
     	 	bg.style.background = "url(\'images/" + id + ".png\')";
     	 	CURRENT_BG = id;
     	}
    }
}

function hideVariations (variation) {
	if (variation == "roof" || variation == "wall" || variation == "door" || variation == "windows") {
		for (var j=0; j < COLORS.length; j++) {
			var item = variation.concat("-",COLORS[j].toString());
			item = document.getElementById(item);
           	item.style.visibility = "hidden";        	
		}  	
	}
  	
   	else if (variation == "lights") {
   		var item = variation.concat("-", "on");
   		item = document.getElementById(item);
       	item.style.visibility = "hidden";
    	   
       	var item2 = variation.concat("-","off");
       	item2 = document.getElementById(item2);
       	item2.style.visibility = "hidden";
   	}
}
  
function hideAll() {
	hideVariations("roof");
   	hideVariations("wall");
   	hideVariations("door");
   	hideVariations("windows");
   	hideVariations("lights");
}
   
function setHtmlOpacity(id, opacity) {
	var el = document.getElementById(id);
    if (el) {
    	if (opacity > 0) {
     		el.style.zIndex = 100;
        } else {
           	el.style.zIndex = -1; }
       	el.style.opacity = opacity;
    }
}
   
function fadeOutAfterDelay(id, delay) {
	window.setTimeout(function() { setHtmlOpacity(id, 0.0); }, delay);
}
   
//---------------------------------------------------------------------------
// Process dart event
//---------------------------------------------------------------------------
function processEvent(event) {
	var event = event.data;
    var msgPart = event.split('#');
    
    if ( msgPart[0] == "@blockly" ) {
    	//console.log("HTML received message from dart " + event);
     	
     	if (msgPart[1] == "error") {
     		Playing = false;
     	 	var msg = msgPart[2];
     	 	var key = msgPart[3];
     	 	showError(msg);
     	 	if(LogRequest) { logParse("postError", key, msg); }
     	}
     	
     	else if (msgPart[1] == "DONE!") {
       		Playing = false;
       		if (LogRequest) { logParse("Success", "2", ""); }
       		window.setTimeout(function() { advanceLevel(); }, 500);
     	}
     	
     	else if (msgPart[1] == "outfit"){	 // received an outfit to display
     		var outfit = msgPart[2];
     		setHtmlVisibility(outfit, true);
     		Blockly.mainWorkspace.highlightBlock2(msgPart[3], true);
     		if (outfit == "REPEAT") {
     			popUpHint(msgPart); 
     	 	}
     	}
    }	
}

//---------------------------------------------------------------------------------------
// Return coordinates of the WorkSpace
//---------------------------------------------------------------------------------------
function getWorkSpacePosition() {
	var cumulativeOffset = function(element) {
	var top = 0, left = 0;
	do {
		top += element.offsetTop  || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while(element);		
	return {
		top: top,
		left: left };
	};
	
	var wsPosition = cumulativeOffset(document.getElementById('rosie-code'));
	return wsPosition;
}

//---------------------------------------------------------------------------------------
// Pop up repeat hint
//---------------------------------------------------------------------------------------
function popUpHint(parts) {
	var wsPosition = getWorkSpacePosition();
  	var block = Blockly.mainWorkspace.getBlockById(parts[3]);
	
	var blockHW = block.getHeightWidth();
	var blockXY = block.getRelativeToSurfaceXY();
	var x = blockXY.x + blockHW.width + wsPosition.left + 10;
	var y = blockXY.y + wsPosition.top;
	
  	var id = "repeat_hint";
  	var el = document.getElementById(id);
  	el.innerHTML= 'ROUND <p>' + parts[4] + '</p> out of ' + parts[5];
  	el.style.top =  y + "px";
  	el.style.left = x + "px";
  	setHtmlOpacity("repeat_hint", 1.0);
	fadeOutAfterDelay("repeat_hint", 1000);
}
  
//---------------------------------------------------------------------------------------
//  Check if blocks are connected (procedures are special case)                                                                               
//---------------------------------------------------------------------------------------
function checkConnections(code) {
	var connected = true;
    var start = 0;
    var newLine = 0;
    var length = code.length;
    var amount = 0;
    while (start < code.length && start != -1) {
    	newLine = code.indexOf("\n",start);
       	var curlyBrace = code.indexOf("}" ,start);
       	if ( newLine > 0 ) {
       		if ( curlyBrace > 0) {
       	 		if ( newLine -1 != curlyBrace ) {
           	 		connected = false;
           	 		break;
         	 	}
         	 	else { start = newLine+3; amount += (curlyBrace - amount) ; length -= Math.abs(amount) } //++ for multiple procedures...
       		}
       		else { connected = false; break; } ///++++++
     	}
     	else { break; } 
    } 
    return connected;
}

//-----------------------------------------------------------------------------------------------
// Build a sample house
//------------------------------------------------------------------------------------------------
function buildHouse() {
	setHtmlVisibility("wall-beige", true);
    setHtmlVisibility("roof-red", true);
    setHtmlVisibility("door-red", true);
    setHtmlVisibility("windows-red", true);
}

//-----------------------------------------------------------------------------------------------
// Change in Workspace
//------------------------------------------------------------------------------------------------
function workspaceChange() {
	//console.log("CHANGE");
	var procedureNames = [[]];
	var callNames = [];
	var a = []; var b = []; var diff = [];
	var topBlocks = Blockly.mainWorkspace.getTopBlocks(false); //+++ ALL OR TOP ONLY?
	if (topBlocks.length > BlocksTotal) { //new blocks added
		//console.log("new block added");
		BlocksTotal = topBlocks.length;
		procedureNames.length = 0; //clear the list
		callNames.length = 0;
		a.length = 0; b.length = 0; diff.length = 0;
		
		for (var j = 0; j < topBlocks.length; j++) {
   	 		if (topBlocks[j].type == 'procedures_defnoreturn') {
   	 			var name = topBlocks[j].getProcedureDef();
   	 			procedureNames.push(name[0]);
     	 		//console.log("procedure " + name[0] + " FOUND");
     	 		//var callers = Blockly.Procedures.getCallers(name, Blockly.mainWorkspace);
     	 		//console.log(callers.length);
   	 		}
   		
   	 		else if (topBlocks[j].type == 'procedures_callnoreturn') {
   	 			var name = topBlocks[j].getProcedureCall();
   	 			//console.log("CALL " + name + " FOUND");
   	 			callNames.push(name);
   	 		}
 	 	}
 		
 	 	//console.log("procedures found are: " + procedureNames.length + " " + procedureNames);
 	 	//console.log("CALLs found are: " + callNames.length + " " + callNames);
 		
 	 	a = procedureNames.slice().sort();
 	 	b = callNames.slice().sort();
 		
 	 	Array.prototype.diff = function(a) { return this.filter(function(i) {return a.indexOf(i) < 0;}); };
	
		diff = a.diff(b);
		//console.log("diff length = " + diff.length + " with name = " + diff[0]);
		if (diff.length != 0) createCallers(diff);
 		
	}
	else { return; } 
}

//---------------------------------------------------------------------------------------
// Create callers for procedures in the workspace
//---------------------------------------------------------------------------------------
function createCallers(diff) {
	var name = diff[0];
	var rand = Math.floor((Math.random() * 50) + 1);
	
	var xmlMutation = goog.dom.createDom('mutation');
   	xmlMutation.setAttribute('name', name);
   	
   	var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
   	xmlBlock.setAttribute('type', 'procedures_callnoreturn');
   	xmlBlock.setAttribute('x' , Xposition + Blockly.Toolbox.width);
   	xmlBlock.setAttribute('y' , Yposition + rand);
   	//Xposition += 30;
   	Yposition += 50;
   	
   	var text = '<xml> ';
   	text += Blockly.Xml.domToText(xmlBlock);
   	text += ' </xml>';
   	console.log("CALLER CREATED: " + text);
   	
   	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(text));
   	BlocksTotal += 1;
   	return;
}

//---------------------------------------------------------------------------------------
//  Send the generated Javascript code to dart for processing                                                                                  
//---------------------------------------------------------------------------------------
function sendBlocklyCode(log) {
	LogRequest = log ? true : false;
	if (!Playing) {
    	var code = Blockly.Generator.workspaceToCode('JavaScript');
       	//alert(code);
       	//--------------------------------------------------
       	// error 1: no blocks on the screen
       	//--------------------------------------------------
       	if (code.length == 0) {
        	setHtmlOpacity("hint1", 1.0);
         	fadeOutAfterDelay("hint1", 5000);
         	if(LogRequest) { logParse("preError", "10", "No blocks");}
       	}
       	
       	else {
        	var connected = checkConnections(code);
         	
         	//--------------------------------------------------
         	// error 2: blocks aren't connected
         	//--------------------------------------------------
         	if (!connected) {
           		setHtmlOpacity("hint2", 1.0);
           		fadeOutAfterDelay("hint2", 5000);
           		if(LogRequest) { logParse("preError", "11", "blocks not connected");}
         	}
         	
         	else {
         		hideAll();
         		var json = cleanCode(code);
           		var origin = window.location.protocol + "//" + window.location.host;
  				window.postMessage(json, origin);
           		tempImg = '';
           		Playing = true;
           		
           		if (CURRENT_BG != 'blank') {
             		var bg = document.getElementById("rosie-output");	
     	 			bg.style.background = "url(\'images/blank.png\')";
           		}
        	}
    	}
     
    }
    else {
    	if(LogRequest) { logParse("preError", "12", "still executing prior command"); }
     	alert("still generating previous house");
    }
}

//---------------------------------------------------------------------------------------
//  Clean generated JSON and append required information                                                                               
//---------------------------------------------------------------------------------------
function cleanCode(code) {
	code = code.replace(/\]\[/g, '], [');
	code = (code.replace(/\)/g, '')).replace(/\(/g, '');
	code = code.replace(/\;/g, '');
    code = '@dart'+ CURRENT_LEVEL + '#' + code;
    
    return code;
}

//---------------------------------------------------------------------------------------
//  Inject Blockly                                                                                
//---------------------------------------------------------------------------------------
function inject() {
	var toolbox = getToolbox();
	Blockly.inject(document.getElementById('rosie-code'), {path: 'blockly/', toolbox: toolbox[CURRENT_LEVEL - 1], collapse: false, maxBlocks: maxBlocks[CURRENT_LEVEL - 1] } );
   	
     
	switch(CURRENT_LEVEL) {
    	case 1:
    		setHtmlOpacity("hint1", 1.0);
         	fadeOutAfterDelay("hint1", 5000);
         	break;
       	
       	case 4:
        	buildHouse();
         	loadBlocks(CURRENT_LEVEL);
         	break;
     	
     	case 5:
       		buildHouse();
     		loadBlocks(CURRENT_LEVEL);
         	break; 
       		
    }
    if (CURRENT_LEVEL >= 5) {
    	restoreProcedures();
     	// in LEVEL 5, start listenning to events & add virtual seperator
     	Blockly.mainWorkspace.traceOn();
     	Blockly.mainWorkspace.getCanvas().addEventListener('blocklyWorkspaceChange', workspaceChange, false);
     	Blockly.mainWorkspace.addVirtual();
    }
   	Blockly.addChangeListener(bumpBackBlocks);
    document.getElementById('full_text_div').innerHTML= LEVELS_MSG[CURRENT_LEVEL - 1];
}

//---------------------------------------------------------------------------------------------
// Load the editor with some blocks                                                                
//---------------------------------------------------------------------------------------------  
function loadBlocks (level) {
	var xml;
	if (level == 4) {
		xml = Blockly.Xml.textToDom(      
			'<xml>' +    
			'  <block type="wall"> <next> <block type="roof"> <next> <block type="door"> <next> <block type="windows"></block> </next> </block> </next> </block> </next> </block>' +
			'</xml>');
	} else if(level == 5) {
		xml = Blockly.Xml.textToDom(      
			'<xml>' +    
			'  <block type="procedures_defnoreturn" x="' + Blockly.Virtual.X + '" y="' + Blockly.Virtual.Y + '">' +
			' <mutation></mutation> ' +
			'   <field name="NAME">Name</field> ' +
			'	<statement name="STACK"> ' +
			'     <block type="wall"> <next> <block type="roof"> <next> <block type="door"> <next> <block type="windows"></block> </next> </block> </next> </block> </next> </block> ' +
			'   </statement> '+
			'  </block>' +
			
			'</xml>');
	}

	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
}  
//-----------------------------------------------------------------------------------------
// store procedures in session storage	                                                                 
//------------------------------------------------------------------------------------------  
function storeProcedure () {
	var saved_procedure = '';
   	
   	var current_xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
   	curret_xml_text = Blockly.Xml.domToText(current_xml);
   	//console.log( curret_xml_text );
   	xmlDoc = loadXMLString(curret_xml_text);
   	
   	x = xmlDoc.getElementsByTagName('block');
   	for (i=0; i < x.length; i++) {
 	 	att = x.item(i).attributes.getNamedItem("type");
 	 	if ( att.value == 'procedures_defnoreturn' || att.value == 'procedures_callnoreturn') {
 	 		cloneNode=x[i].cloneNode(true);
 	 		saved_procedure += Blockly.Xml.domToText(cloneNode);
 	 		saved_procedure += "#";
 	 	}
 	}
 	
 	sessionStorage.procedure = saved_procedure;
   	
 	var topBlocks = Blockly.mainWorkspace.getTopBlocks(false);
		for (var j = 0; j < topBlocks.length; j++) {
			if (topBlocks[j].type == 'procedures_defnoreturn') {
				if (CURRENT_LEVEL == 5) {
					var name = topBlocks[j].getProcedureDef();
					sessionStorage.UserHouse = name[0];
					console.log("UserHouse = " + name[0]);
				}
			}
        }
}

//-------------------------------------------------------------------------------------
// Restore created procedures from session storage
//-------------------------------------------------------------------------------------  
function restoreProcedures() {
	if ('sessionStorage' in window ) {
    	var saved_xml = '<xml>';
     	if (sessionStorage.procedure) {
     		var pArr = (sessionStorage.procedure).split('#');
     	 	for ( x=0; x < pArr.length; x++) {
     	 		saved_xml += pArr[x];
     	 	}
     	//saved_xml += sessionStorage.procedure;
     	saved_xml += '</xml>';	
     	var xml = Blockly.Xml.textToDom(saved_xml);
     	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
     	//window.setTimeout(BlocklyStorage.restoreBlocks, 0);
     	}
    }
}

//---------------------------------------------------------------------------------------
// Bump back blocks that are dragged outside workspace metrics
//---------------------------------------------------------------------------------------
function bumpBackBlocks () {
	if (Blockly.Block.dragMode_ == 0) {
		var topBlocks = Blockly.mainWorkspace.getTopBlocks(false);
		for (var j = 0; j < topBlocks.length; j++) {
			if (topBlocks[j].type == 'procedures_defnoreturn') {
				restrictBoundry(topBlocks[j]);
			}
        }
        
		var metrics = Blockly.getMainWorkspaceMetrics();
      	if (metrics.contentTop < 0 ||
        	metrics.contentTop + metrics.contentHeight > metrics.viewHeight + metrics.viewTop ||
        	metrics.contentLeft < (Blockly.RTL ? metrics.viewLeft : 0) ||
          	metrics.contentLeft + metrics.contentWidth > (Blockly.RTL ? metrics.viewWidth : metrics.viewWidth + metrics.viewLeft)) {
        	// One or more blocks is out of bounds.  Bump them back in.
      		var MARGIN = 5;
        	var ToolboxWidth = Blockly.Toolbox.width;
        	var blocks = Blockly.mainWorkspace.getTopBlocks(false);
        	for (var b = 0, block; block = blocks[b]; b++) {
          		var blockXY = block.getRelativeToSurfaceXY();
          		var blockHW = block.getHeightWidth();
          		
          		// Bump any block that's above the top back inside.
          		var overflow = metrics.viewTop + MARGIN - blockHW.height - blockXY.y + blockHW.height;
          		if (overflow > 0) {
            		block.moveBy(0, overflow);
          		}
          		// Bump any block that's below the bottom back inside.
          		var overflow = metrics.viewTop + metrics.viewHeight - MARGIN -
              	blockXY.y - blockHW.height;
          		if (overflow < 0) {
            		block.moveBy(0, overflow);
          		}
          		// Bump any block that's off the left back inside.
          		var overflow = MARGIN + ToolboxWidth + metrics.viewLeft - blockXY.x - 0; //(Blockly.RTL ? 0 : blockHW.width);
          		if (overflow > 0) {
            		block.moveBy(overflow + 30, 0);
          		}
          		// Bump any block that's off the right back inside.
          		var overflow = metrics.viewLeft + metrics.viewWidth - MARGIN -blockXY.x + (Blockly.RTL ? blockHW.width : 0);
          		if (overflow < 0) {
            		block.moveBy(overflow + 30, 0);
          		}
        	}
		}//*/
    }
}

//---------------------------------------------------------------------------------------
// Bump back procedure blocks outside virtual metrics
//---------------------------------------------------------------------------------------
function restrictBoundry(block) {
	var blockXY = block.getRelativeToSurfaceXY();
    var blockHW = block.getHeightWidth();
	var textHeight = 50;
	var rand = Math.floor((Math.random() * 70) + 1);
	var MARGIN = 10;
	
	// off the right
	var overflow = blockXY.x + blockHW.width - Blockly.Virtual.X - Blockly.Virtual.Width + MARGIN;
	if (overflow > 0) {
		block.moveBy(-overflow - rand, 0 );
	}
	
	// off the left
	var overflow = blockXY.x - Blockly.Virtual.X - MARGIN;
	if (overflow < 0) {
		block.moveBy(overflow * -1 + rand, 0 );
	}
	
	// off the top
	var overflow = blockXY.y - Blockly.Virtual.Y  - textHeight - MARGIN;
	if (overflow < 0) {
		block.moveBy(0, overflow * -1 + rand - textHeight/2);
	}
	
	// off the bottom
	var overflow = blockXY.y + blockHW.height - Blockly.Virtual.Y - Blockly.Virtual.Height + MARGIN;
	if (overflow > 0) {
		block.moveBy(0, -overflow - rand );
	}
}


//-------------------------------------------------------------------------------------
// Control Tooltip code
//-------------------------------------------------------------------------------------
function controlTooltip() {
	Blockly.Tooltip.svgImg_ = null;  
/**
 * Delay before tooltip appears.
 */
Blockly.Tooltip.HOVER_MS = 100;
      

/**
 * When hovering over an element, schedule a tooltip to be shown.  If a tooltip
 * is already visible, hide it if the mouse strays out of a certain radius.
 * @param {!Event} e Mouse event.
 * @private
 */
Blockly.Tooltip.onMouseMove_ = function(e) {
 // if (!Blockly.Tooltip.element_ || !Blockly.Tooltip.element_.tooltip) {
    // No tooltip here to show.
   // return;
  //} //else 
   if ((Blockly.ContextMenu && Blockly.ContextMenu.visible) ||Blockly.Block.dragMode_ != 0 ) {
    // Don't display a tooltip when a context menu is active, or during a drag.
    return;
  }
  if (Blockly.Tooltip.poisonedElement_ != Blockly.Tooltip.element_) {
    // The mouse moved, clear any previously scheduled tooltip.
    window.clearTimeout(Blockly.Tooltip.showPid_);
    // Maybe this time the mouse will stay put.  Schedule showing of tooltip.
    Blockly.Tooltip.lastX_ = e.clientX;
    Blockly.Tooltip.lastY_ = e.clientY;
    Blockly.Tooltip.showPid_ =
        window.setTimeout(Blockly.Tooltip.show_, Blockly.Tooltip.HOVER_MS);
  }
};

 
 /**
 * Hide the tooltip.
 */
Blockly.Tooltip.hide = function() {
	var preview = document.getElementById('preview');
  	preview.style.visibility = "hidden";
  		
	var imgNode = document.getElementById(tipImg);
	if (imgNode) {
		if (tipImg != originalRoof && tipImg != originalWall && tipImg != originalDoor && tipImg != originalWindows && tipImg != originalLights) {
		imgNode.style.visibility = "hidden";
		imgNode.style.border = "none";
  		imgNode.style.background = "none";
		}
	}
	
	//restore original image (if any) after preview
	imgNode = document.getElementById(tempImg);
	if (imgNode) {
	imgNode.style.visibility = "visible";
	imgNode.style.zIndex = originalZindex;
	imgNode.style.border = "none";
  	imgNode.style.background = "none";
	}
  	
  if (Blockly.Tooltip.visible) {
    Blockly.Tooltip.visible = false;
    
    
    if (Blockly.Tooltip.svgGroup_) {
      Blockly.Tooltip.svgGroup_.style.display = 'none';
    }
  }
  window.clearTimeout(Blockly.Tooltip.showPid_);
};
 
      
      
/**
 * Create the tooltip and show it.
 * @private
 */
Blockly.Tooltip.show_ = function() {
  Blockly.Tooltip.poisonedElement_ = Blockly.Tooltip.element_;
  if (!Blockly.Tooltip.svgGroup_) {
    return;
  }
  // Erase all existing text.
  goog.dom.removeChildren(
      /** @type {!Element} */ (Blockly.Tooltip.svgText_));
  // Create new text, line by line.
  var tip = Blockly.Tooltip.element_.tooltip;
  if (goog.isFunction(tip)) {
    tip = tip();
    //console.log ("TIP = " + tip);
  }
  
  tipImg = tip;
 var type = tipImg.split("-");
 if (type[0] == "roof")
 	tempImg = originalRoof;
 else if (type[0] == "wall")
 	tempImg = originalWall;
 else if (type[0] == "door")
 	tempImg = originalDoor;
 else if (type[0] == "windows")
 	tempImg = originalWindows;
 else if (type[0] == "lights")
 	tempImg = originalLights;
 else
 	tempImg = '';
  	
  
  var imgNode = document.getElementById(tempImg);
  if (imgNode) {
  	imgNode.style.visibility = "hidden";
  	originalZindex = imgNode.style.zIndex;
  }
  
  imgNode = document.getElementById(tipImg);
  if (imgNode) {
  	imgNode.style.visibility = "visible";
  	imgNode.style.zIndex = Zindex++;
  	imgNode.style.border = "2px solid purple";
  	imgNode.style.background = "rgba(255, 192, 203, 0.4)";
  	var preview = document.getElementById('preview');
  	preview.style.visibility = "visible";
  }
  
  
  
  // Display the tooltip.
  Blockly.Tooltip.visible = true;
  Blockly.Tooltip.svgGroup_.style.display = 'block';
  // Resize the background and shadow to fit.
  var bBox = Blockly.Tooltip.svgText_.getBBox();
  var width = 2 * Blockly.Tooltip.MARGINS + bBox.width;
  var height = bBox.height;
  Blockly.Tooltip.svgBackground_.setAttribute('width', width);
  Blockly.Tooltip.svgBackground_.setAttribute('height', height);
  Blockly.Tooltip.svgShadow_.setAttribute('width', width);
  Blockly.Tooltip.svgShadow_.setAttribute('height', height);
  if (Blockly.RTL) {
    // Right-align the paragraph.
    // This cannot be done until the tooltip is rendered on screen.
    var maxWidth = bBox.width;
    for (var x = 0, textElement;
         textElement = Blockly.Tooltip.svgText_.childNodes[x]; x++) {
      textElement.setAttribute('text-anchor', 'end');
      textElement.setAttribute('x', maxWidth + Blockly.Tooltip.MARGINS);
    }
  }
  // Move the tooltip to just below the cursor.
  var anchorX = Blockly.Tooltip.lastX_;
  if (Blockly.RTL) {
    anchorX -= Blockly.Tooltip.OFFSET_X + width;
  } else {
    anchorX += Blockly.Tooltip.OFFSET_X;
  }
  var anchorY = Blockly.Tooltip.lastY_ + Blockly.Tooltip.OFFSET_Y;

  // Convert the mouse coordinates into SVG coordinates.
  var xy = Blockly.convertCoordinates(anchorX, anchorY, true);
  anchorX = xy.x;
  anchorY = xy.y;

  var svgSize = Blockly.svgSize();
  if (anchorY + bBox.height > svgSize.height) {
    // Falling off the bottom of the screen; shift the tooltip up.
    anchorY -= bBox.height + 2 * Blockly.Tooltip.OFFSET_Y;
  }
  if (Blockly.RTL) {
    // Prevent falling off left edge in RTL mode.
    anchorX = Math.max(Blockly.Tooltip.MARGINS, anchorX);
  } else {
    if (anchorX + bBox.width > svgSize.width - 2 * Blockly.Tooltip.MARGINS) {
      // Falling off the right edge of the screen;
      // clamp the tooltip on the edge.
      anchorX = svgSize.width - bBox.width - 2 * Blockly.Tooltip.MARGINS;
    }
  }
  Blockly.Tooltip.svgGroup_.setAttribute('transform',
      'translate(' + anchorX + ',' + anchorY + ')');
};
      
      //***********************************************************************************************************************
      
    /**
 * Show the context menu for this block.
 * @param {number} x X-coordinate of mouse click.
 * @param {number} y Y-coordinate of mouse click.
 * @private
 */
Blockly.Block.prototype.showContextMenu_ = function(x, y) {
  if (!this.contextMenu) {
    return;
  }
  // Save the current block in a variable for use in closures.
  var block = this;
  var options = [];

  if (this.deletable) {
    // Option to duplicate this block.
    var duplicateOption = {
      text: Blockly.MSG_DUPLICATE_BLOCK,
      enabled: true,
      callback: function() {
        block.duplicate_();
      }
    };
    if (this.getDescendants().length > this.workspace.remainingCapacity()) {
      duplicateOption.enabled = false;
    }
    options.push(duplicateOption);

    // Option to delete this block.
    // Count the number of blocks that are nested in this block.
    var descendantCount = this.getDescendants().length;
    if (block.nextConnection && block.nextConnection.targetConnection) {
      // Blocks in the current stack would survive this block's deletion.
      descendantCount -= this.nextConnection.targetBlock().
          getDescendants().length;
    }
    var deleteOption = {
      text: descendantCount == 1 ? Blockly.MSG_DELETE_BLOCK :
          Blockly.MSG_DELETE_X_BLOCKS.replace('%1', descendantCount),
      enabled: true,
      callback: function() {
        block.dispose(true, true);
      }
    };
    options.push(deleteOption);
  }

  // Option to get help.
  var url = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
  var helpOption = {enabled: !!url};
  helpOption.text = Blockly.MSG_HELP;
  helpOption.callback = function() {
    block.showHelp_();
  };
  options.push(helpOption);

  // Allow the block to add or modify options.
  if (this.customContextMenu) {
    this.customContextMenu(options);
  }

  Blockly.ContextMenu.show(x, y, options);
};
}
