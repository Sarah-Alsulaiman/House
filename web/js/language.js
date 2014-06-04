//-------------------------------------------------------------------------
// roof
//-------------------------------------------------------------------------
Blockly.Language.roof = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .45, .65);
    this.appendValueInput("color")
        .setCheck([String, "var"])
        .appendTitle("Roof")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var thisBlock = this; 
    this.setTooltip( function() {
      					var color = Blockly.JavaScript.valueToCode(thisBlock, 'color', Blockly.JavaScript.ORDER_NONE) || '0';
      					if (color == '0')
      						return 'roof-red';
      					else {
      						color = color.replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "");
      						return 'roof-'+ color;
      					}
      				
    				}
				   );
  },
};


//-------------------------------------------------------------------------
// wall
//-------------------------------------------------------------------------
Blockly.Language.wall = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .45, .65);
    this.appendValueInput("color")
        .setCheck([String, "var"])
        .appendTitle("Wall")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var thisBlock = this; 
    this.setTooltip( function() {
      					var color = Blockly.JavaScript.valueToCode(thisBlock, 'color', Blockly.JavaScript.ORDER_NONE) || '0';
      					if (color == '0')
      						return 'wall-beige';
      					else {
      						color = color.replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "");
      						return 'wall-'+ color;
      					}
      				
    				}
				   );
  }
};

//-------------------------------------------------------------------------
// Door
//-------------------------------------------------------------------------
Blockly.Language.door = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .45, .65);
    this.appendValueInput("color")
        .setCheck([String, "var"])
        .appendTitle("Door")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var thisBlock = this; 
    this.setTooltip( function() {
      					var color = Blockly.JavaScript.valueToCode(thisBlock, 'color', Blockly.JavaScript.ORDER_NONE) || '0';
      					if (color == '0')
      						return 'door-red';
      					else {
      						color = color.replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "");
      						return 'door-'+ color;
      					}
      				
    				}
				   );
  }
};

//-------------------------------------------------------------------------
// Windows
//-------------------------------------------------------------------------
Blockly.Language.windows = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .45, .65);
    this.appendValueInput("color")
        .setCheck([String, "var"])
        .appendTitle("Windows")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var thisBlock = this; 
    this.setTooltip( function() {
      					var color = Blockly.JavaScript.valueToCode(thisBlock, 'color', Blockly.JavaScript.ORDER_NONE) || '0';
      					if (color == '0')
      						return 'windows-red';
      					else {
      						color = color.replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "");
      						return 'windows-'+ color;
      					}
      				
    				}
				   );
  }
};

//-------------------------------------------------------------------------
// lights
//-------------------------------------------------------------------------
Blockly.Language.lights = {
	helpUrl: 'http://www.example.com/',
	init: function() {
	 	this.setColour(260, .45, .65);
	    this.appendDummyInput()
        .appendTitle("lights")
        .appendTitle(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "lights");
        this.setPreviousStatement(true);
    	this.setNextStatement(true);
    	var thisBlock = this; 
	    this.setTooltip( function() {
	      					var state = thisBlock.getTitleValue('lights');
	      					if (state == 'on')
	      						return 'lights-on';
	      					else 
	      						return 'lights-off';
	    				}
					   );
  }
};

//-------------------------------------------------------------------------
// lights_on
//-------------------------------------------------------------------------
Blockly.Language.lights_on = {
	helpUrl: 'http://www.example.com/',
	init: function() {
	 	this.setColour(260, .45, .65);
	    this.appendDummyInput()
        .appendTitle("lights on");
        this.setPreviousStatement(true);
    	this.setNextStatement(true);
    	var thisBlock = this; 
	    this.setTooltip('lights-on');
  }
};


//-------------------------------------------------------------------------
// lights
//-------------------------------------------------------------------------
Blockly.Language.lights_off = {
	helpUrl: 'http://www.example.com/',
	init: function() {
	 	this.setColour(260, .45, .65);
	    this.appendDummyInput()
        .appendTitle("lights off");
        this.setPreviousStatement(true);
    	this.setNextStatement(true);
    	var thisBlock = this; 
	    this.setTooltip('lights-off');
  }
};
//-------------------------------------------------------------------------
// Red
//-------------------------------------------------------------------------

Blockly.Language.red = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(14, .95, .86);
    this.appendDummyInput()
        .appendTitle("Red");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};

//-------------------------------------------------------------------------
// Blue
//-------------------------------------------------------------------------

Blockly.Language.blue = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(230, .45, .65);
    this.appendDummyInput()
        .appendTitle("Blue");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};

//-------------------------------------------------------------------------
// Brown
//-------------------------------------------------------------------------

Blockly.Language.brown = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(34, .92, .33);
    this.appendDummyInput()
        .appendTitle("Brown");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};

//-------------------------------------------------------------------------
// Purple
//-------------------------------------------------------------------------

Blockly.Language.purple = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290, .45, .65);
    this.appendDummyInput()
        .appendTitle("Purple");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};

//-------------------------------------------------------------------------
// Beige
//-------------------------------------------------------------------------

Blockly.Language.beige = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(34, .33, .82);
    this.appendDummyInput()
        .appendTitle("Beige");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};

//-------------------------------------------------------------------------
// Black
//-------------------------------------------------------------------------

Blockly.Language.black = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    //this.setColour(112, .45, .65);
    this.appendDummyInput()
        .appendTitle("Black");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};

//-------------------------------------------------------------------------
// Gold
//-------------------------------------------------------------------------

Blockly.Language.gold = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(48, .97, .95);
    this.appendDummyInput()
        .appendTitle("Gold");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};

//-------------------------------------------------------------------------
// Pink
//-------------------------------------------------------------------------

Blockly.Language.pink = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .25, .92);
    this.appendDummyInput()
        .appendTitle("pink");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};

//-------------------------------------------------------------------------
// Silver
//-------------------------------------------------------------------------

Blockly.Language.silver = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(240, .10, .61);
    this.appendDummyInput()
        .appendTitle("Silver");
    this.setOutput(true, String);
    this.setTooltip('');
  },
  getName: function() {
  	"";
  },
};




Blockly.Language.control_repeat = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(76, .45, .65);
    this.appendDummyInput()
        .appendTitle("    REPEAT")
        .appendTitle(new Blockly.FieldTextInput("5"), "COUNT")
        .appendTitle("TIMES")
    this.appendStatementInput("DO");
    this.appendDummyInput();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


//--------------------------------------------------------------------------
// IF 
//--------------------------------------------------------------------------
Blockly.Language.control_if = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(34, .66, .95);
    this.appendValueInput("CONDITION")
        .setCheck(["drawing_for", "time_is"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("IF");
    this.appendDummyInput()
    this.appendStatementInput("THEN")
        .appendTitle("    THEN");
    this.appendDummyInput();
    this.appendStatementInput("ELSE")
        .appendTitle("    ELSE");
    this.appendDummyInput();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Language.time_is = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(34, .66, .95);
    this.appendDummyInput()
        .appendTitle("Time is")
        .appendTitle(new Blockly.FieldDropdown([["morning", "morning"], ["evening", "evening"]]), "time");
    this.setOutput(true, "time_is");
    this.setTooltip('');
  }
};


Blockly.Language.drawing_for = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(34, .66, .95);
    this.appendDummyInput()
        .appendTitle("Building in")
        .appendTitle(new Blockly.FieldDropdown([["Chicago", "Chicago"], ["Boston", "Boston"]]), "drawing_for");
    this.setOutput(true, "time_is");
    this.setTooltip('');
  }
};

//------------------------------------------------------------------------------------------------------------------------------------

'use strict';

Blockly.Language.procedures_defnoreturn = {
  // Define a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL,
  init: function() {
    this.setColour(230, .45, .65);
    var name = Blockly.Procedures.findLegalName(
        "Name", this);
    this.appendDummyInput()
    	.appendTitle("House name: ")
        .appendTitle(new Blockly.FieldTextInput(name,
        Blockly.Procedures.rename), 'NAME')
        .appendTitle('', 'PARAMS');
    this.appendStatementInput('STACK')
        .appendTitle("");
   // this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP);
    this.arguments_ = [];
  },
  updateParams_: function() {
    // Check for duplicated arguments.
    var badArg = false;
    var hash = {};
    for (var x = 0; x < this.arguments_.length; x++) {
      if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash['arg_' + this.arguments_[x].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText(Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING);
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    var paramString = this.arguments_.join(', ');
    this.setTitleValue(paramString, 'PARAMS');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
    }
    this.updateParams_();
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'procedures_mutatorcontainer');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.arguments_.length; x++) {
      var paramBlock = new Blockly.Block(workspace, 'procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setTitleValue(this.arguments_[x], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = x;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
                                     this.workspace, this.arguments_, null);
    return containerBlock;
  },
  compose: function(containerBlock) {
    this.arguments_ = [];
    this.paramIds_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.arguments_.push(paramBlock.getTitleValue('NAME'));
      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
        this.workspace, this.arguments_, this.paramIds_);
  },
  dispose: function() {
    // Dispose of any callers.
    var name = this.getTitleValue('NAME');
    Blockly.Procedures.disposeCallers(name, this.workspace);
    // Call parent's destructor.
    Blockly.Block.prototype.dispose.apply(this, arguments);
  },
  getProcedureDef: function() {
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES NOT have a return value.
    return [this.getTitleValue('NAME'), this.arguments_, false];
  },
  getVars: function() {
    return this.arguments_;
  },
  renameVar: function(oldName, newName) {
    var change = false;
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        change = true;
      }
    }
    if (change) {
      this.updateParams_();
      // Update the mutator's variables if the mutator is open.
      if (this.mutator.isVisible_()) {
        var blocks = this.mutator.workspace_.getAllBlocks();
        for (var x = 0, block; block = blocks[x]; x++) {
          if (block.type == 'procedures_mutatorarg' &&
              Blockly.Names.equals(oldName, block.getTitleValue('NAME'))) {
            block.setTitleValue(newName, 'NAME');
          }
        }
      }
    }
  },
  customContextMenu: function(options) {
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getTitleValue('NAME'); //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    option.text = "Create \"shortcut to: " + name + " \"" ;
    //option.text = Blockly.LANG_PROCEDURES_CREATE_DO.replace('%1', name);
  
    var xmlMutation = goog.dom.createDom('mutation');
    xmlMutation.setAttribute('name', name);
    for (var x = 0; x < this.arguments_.length; x++) {
      var xmlArg = goog.dom.createDom('arg');
      xmlArg.setAttribute('name', this.arguments_[x]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
    xmlBlock.setAttribute('type', this.callType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);

    options.push(option);
    // Add options to create getters for each parameter.
    for (var x = 0; x < this.arguments_.length; x++) {
      var option = {enabled: true};
      var name = this.arguments_[x];
      option.text = Blockly.LANG_VARIABLES_SET_CREATE_GET.replace('%1', name);
      var xmlTitle = goog.dom.createDom('title', null, name);
      xmlTitle.setAttribute('name', 'VAR');
      var xmlBlock = goog.dom.createDom('block', null, xmlTitle);
      xmlBlock.setAttribute('type', 'variables_get');
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
    }
  },
  callType_: 'procedures_callnoreturn'
};


Blockly.Language.procedures_mutatorcontainer = {
  // Procedure container (for mutator dialog).
  init: function() {
    this.setColour(34, .66, .95);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE);
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_mutatorarg = {
  // Procedure argument (for mutator dialog).
  init: function() {
    this.setColour(34, .66, .95);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_MUTATORARG_TITLE)
        .appendTitle(new Blockly.FieldTextInput('x', this.validator), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_mutatorarg.validator = function(newVar) {
  // Merge runs of whitespace.  Strip leading and trailing whitespace.
  // Beyond this, all names are legal.
  newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
  return newVar || null;
};

Blockly.Language.procedures_callnoreturn = {
  // Call a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL,
  init: function() {
    this.setColour(230, .45, .65);
    this.appendDummyInput()
        .appendTitle("shortcut to:")
        .appendTitle(Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE, 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP);
    this.arguments_ = [];
    this.quarkConnections_ = null;
    this.quarkArguments_ = null;
    this.linked_ = false;
  },
  setLinked: function () {
  	this.linked_ = true;
  },
  getProcedureCall: function() {
    return this.getTitleValue('NAME');
  },
  renameProcedure: function(oldName, newName) { //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  	if (this.linked_) {return;} 
    if (Blockly.Names.equals(oldName, this.getTitleValue('NAME'))) {
      this.setTitleValue(newName, 'NAME');
      //console.log("NAME CHANGED!!!!!");
    }
  },
  setProcedureParameters: function(paramNames, paramIds) {
    // Data structures for parameters on each call block:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // paramNames = ['x', 'y', 'z']
    //     New param names.
    // paramIds = ['piua', 'f8b_', 'oi.o']
    //     IDs of params (consistent for each parameter through the life of a
    //     mutator, regardless of param renaming).
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkArguments_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      this.quarkConnections_ = {};
      this.quarkArguments_ = null;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    if (!this.quarkArguments_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      if (paramNames.join('\n') == this.arguments_.join('\n')) {
        // No change to the parameters, allow quarkConnections_ to be
        // populated with the existing connections.
        this.quarkArguments_ = paramIds;
      } else {
        this.quarkArguments_ = [];
      }
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var x = this.arguments_.length - 1; x >= 0; x--) {
      var input = this.getInput('ARG' + x);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkArguments_[x]] = connection;
        // Disconnect all argument blocks and remove all inputs.
        this.removeInput('ARG' + x);
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.quarkArguments_ = paramIds;
    for (var x = 0; x < this.arguments_.length; x++) {
      var input = this.appendValueInput('ARG' + x)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendTitle(this.arguments_[x]);
      if (this.quarkArguments_) {
        // Reconnect any child blocks.
        var quarkName = this.quarkArguments_[x];
        if (quarkName in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkName];
          if (!connection || connection.targetConnection ||
              connection.sourceBlock_.workspace != this.workspace) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkName];
          } else {
            input.connection.connect(connection);
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  mutationToDom: function() {
    // Save the name and arguments (none of which are editable).
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getTitleValue('NAME'));
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the name and parameters.
    var name = xmlElement.getAttribute('name');
    this.setTitleValue(name, 'NAME');
    var def = Blockly.Procedures.getDefinition(name, this.workspace);
      this.arguments_ = [];
      for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
        if (childNode.nodeName.toLowerCase() == 'arg') {
          this.arguments_.push(childNode.getAttribute('name'));
        }
      }
      // For the second argument (paramIds) use the arguments list as a dummy
      // list.
      this.setProcedureParameters(this.arguments_, this.arguments_);
    
  },
  renameVar: function(oldName, newName) {
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        this.getInput('ARG' + x).titleRow[0].setText(newName);
      }
    }
  },
  customContextMenu: function(options) {
    // Add option to find caller.
    var option = {enabled: true};
    option.text = Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getTitleValue('NAME');
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  }
};

//--------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------
// star
//-------------------------------------------------------------------------
Blockly.Language.star = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .45, .65);
    this.appendValueInput("color")
        .setCheck([String, "var"])
        .appendTitle(" Star ")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },
};

//-------------------------------------------------------------------------
// Moon
//-------------------------------------------------------------------------
Blockly.Language.moon = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .45, .65);
    this.appendValueInput("color")
        .setCheck([String, "var"])
        .appendTitle(" Moon ")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },
};

//-------------------------------------------------------------------------
// sun
//-------------------------------------------------------------------------
Blockly.Language.sun = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .45, .65);
    this.appendValueInput("color")
        .setCheck([String, "var"])
        .appendTitle("  Sun  ")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },
};

//-------------------------------------------------------------------------
// heart
//-------------------------------------------------------------------------
Blockly.Language.heart = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330, .45, .65);
    this.appendValueInput("color")
        .setCheck([String, "var"])
        .appendTitle("Heart ")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },
};