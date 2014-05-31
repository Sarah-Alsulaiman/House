Blockly.JavaScript.roof = function() {
	var color = Blockly.JavaScript.valueToCode(this, 'color', Blockly.JavaScript.ORDER_NONE) || '0';
	if (color == '0') {
		return '[ "roof-", "red", ' + this.id + ']';
	}
	else {
		return '[ "roof-",' + color + ', ' + this.id + ' ]';
	}
};

Blockly.JavaScript.wall = function() {
  var color = Blockly.JavaScript.valueToCode(this, 'color', Blockly.JavaScript.ORDER_NONE) || '0';
	if (color == '0') {
		return '[ "wall-", "beige", ' + this.id +  ' ]';
	}
	else {
		return '[ "wall-",' + color + ', ' + this.id + ' ]';
	}
};

Blockly.JavaScript.door = function() {
	var color = Blockly.JavaScript.valueToCode(this, 'color', Blockly.JavaScript.ORDER_NONE) || '0';
	if (color == '0') {
		return '[ "door-", "red", ' + this.id +  ' ]';
	}
	else {
		return '[ "door-",' + color + ', ' + this.id + ' ]';
	}
};

Blockly.JavaScript.windows = function() {
	var color = Blockly.JavaScript.valueToCode(this, 'color', Blockly.JavaScript.ORDER_NONE) || '0';
	if (color == '0') {
		return '[ "windows-", "red", ' + this.id +  ' ]';
	}
	else {
		return '[ "windows-",' + color + ', ' + this.id + ' ]';
	}
};


Blockly.JavaScript.lights = function() {
	var state = this.getTitleValue('lights');
	
	return '[ "lights-", "' + state + '", ' + this.id + '  ]';
};


Blockly.JavaScript.lights_on = function() {
	return '[ "lights-", "on", ' + this.id + '  ]';
};


Blockly.JavaScript.lights_off = function() {
	return '[ "lights-", "off", ' + this.id + '  ]';
};



Blockly.JavaScript.get_color_input = function() {
	var part = this.getTitleValue('part');
	var color = Blockly.JavaScript.valueToCode(this, 'GET', Blockly.JavaScript.ORDER_NONE) || '0';
	var code = '["GET", [ "' + part + '", ' + color + ' ]  ]';
	
	return [code, Blockly.JavaScript.ORDER_NONE];	
};

Blockly.JavaScript.get_color_var = function() {
	var code = '"current_color"';
	
	return [code, Blockly.JavaScript.ORDER_NONE];	
};


Blockly.JavaScript.red = function() {
	var color = '"red"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};

Blockly.JavaScript.blue = function() {
	color = '"blue"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};

Blockly.JavaScript.black = function() {
	color = '"black"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};

Blockly.JavaScript.pink = function() {
	color = '"pink"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};

Blockly.JavaScript.silver = function() {
	color = '"silver"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};

Blockly.JavaScript.gold = function() {
	color = '"gold"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};

Blockly.JavaScript.brown = function() {
	color = '"brown"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};

Blockly.JavaScript.purple = function() {
	color = '"purple"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};

Blockly.JavaScript.beige = function() {
	color = '"beige"';
	return [color, Blockly.JavaScript.ORDER_NONE];
		
};



Blockly.JavaScript.time_is = function() {
	var time = this.getTitleValue('time');
	var code = '"Time", "' + time + '" , ' + this.id;
	
	return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript.drawing_for = function() {
	var city = this.getTitleValue('drawing_for');
	var code = '"Drawing", "' + city + '" , ' + this.id;
	
	return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript.control_repeat = function() {
  var count = this.getTitleValue('COUNT') || '50';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  
  return '[ "repeat", ' + this.id + ', ' + count + ', [ ' + branch + '] ]';
};



Blockly.JavaScript.control_if = function() {
  var condition = Blockly.JavaScript.valueToCode(this, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || '0';
  var then = Blockly.JavaScript.statementToCode(this, 'THEN');
  var other = Blockly.JavaScript.statementToCode(this, 'ELSE');
  
  code = '["if", [' + condition + '], [ ' + then + ' ], [' + other + '] ]';
  
 
  return code ;
};


'use strict';

goog.provide('Blockly.JavaScript.procedures');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.JavaScript.statementToCode(this, 'STACK');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  //var code = 'function ' + funcName + '() {\n' +
      //branch + '}';
  //code = Blockly.JavaScript.scrub_(this, code);
  var code = '{[ "' + funcName + '", [' + branch + ' ]]}';//++
  Blockly.JavaScript.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.JavaScript.procedures_defnoreturn =
    Blockly.JavaScript.procedures_defreturn;



Blockly.JavaScript.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('NAME'), Blockly.Procedures.NAME_TYPE);
  
  //var code = funcName + '( );\n';
  var code = '["CALL",  "' + funcName + '", ' + this.id + ' ]';
  return code;
};
