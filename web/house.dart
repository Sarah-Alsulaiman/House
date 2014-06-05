import 'dart:html';
import 'dart:convert';
import 'dart:async';
import 'dart:math';


/** Global list of compiled outfits sequence **/
List outfits = new List(); 

/** Global list of procedures created by the user **/
List subroutines;

/** Global list of commands created by the user **/
List commands;

/** Timer to call display periodically **/
Timer timer;

/** Random CITY **/
String CURRENT_CITY;
String CURRENT_TIME;

/** Colors available for each outfit **/
List colors = ['red', 'blue', 'gold', 'lime', 'black', 'pink', 'orange' , 'purple', 'silver'];

List parts;

bool consider = true;
bool check_input = false;
bool LIGHTS_CHECK = false;
bool REPEAT_LIGHT_ON = false;
bool REPEAT_LIGHT_OFF = false;


//format [ [blockName, value, levels] ]
List blocks = [  ['repeat', false, 3],  ['lights', false, 2], ['lights_on', false, 2],
                 ['roof', false, 1,2,3,4,5,6], ['windows', false, 1,2,3,4,5,6], ['door', false, 1,2,3,4,5,6], ['wall', false, 1,2,3,4,5,6],
                 ['abstraction', false, 5, 6], ['call', false, 5, 6], ['func', false, 5, 6],
                 ['other', false, 4, 6], ['then', false, 4, 6],
                 ['time', false, 4], ['drawing', false, 6], ['if', false, 4, 6],
                  
              ];


var CURRENT_LEVEL = 1;

String ERR_MSG = '';

int LIGHTS_ON_COUNT = 0;
int LIGHTS_OFF_COUNT = 0;

var CURRENT_PERSON;

String CURRENT_BLOCK = '';
String CHECK_AGAINST = '';

String ERROR_THEN = '';
String ERROR_OTHER = '';

bool procedure_riyadh;
// write blocks[top] = true and then another map uses[top] = levels...
Map block_name = new Map <String, int>();
Map text = new Map <String, String> ();

//----------------------------------------------------------------------
// Main function
//----------------------------------------------------------------------
void main() {
  window.onMessage.listen((evt) {
    String msg = "${evt.data}";
    if (msg.startsWith("@dart")) {
       CURRENT_LEVEL = msg.substring(5,6);
       text['if'] = (CURRENT_LEVEL == "4") ? "You need to account for lights depending on the time" : "You need to account for a house in Chicago and another in Boston";
       parts = msg.split("#");
       randomize();
       compile(parts[1]);
       
       if (outfits.length != 0) { Timer.run(() => display()); }
        
       timer = new Timer.periodic(new Duration(milliseconds: 1000), (Timer t) {
       if (outfits.length == 0) {
        timer.cancel();
        if (check_input) { sendMessage("DONE!"); }
        else { sendMessage("error#" + text[ERR_MSG] + '#' + ERR_MSG); }
       }
       else { display(); }
       });
       sendMessage("GOT IT!"); 
    }
  
  });
  
  block_name['repeat'] = 0;
  
  block_name['lights'] = 1;
  block_name['lights_on'] = 2;
  
  block_name['roof'] = 3;
  block_name['windows'] = 4;
  block_name['door'] = 5;
  block_name['wall'] = 6;
 
  
  block_name['abstraction'] = 7;
  block_name['call'] = 8;
  block_name['func'] = 9;
  
  block_name['other'] = 10;
  block_name['then'] = 11;
  block_name['time'] = 12;
  block_name['drawing'] = 13;
  block_name['if'] = 14;
 
  
  text['repeat'] = "The lights should go on and off repeatedly, <br> choose a block to repeat over and over again<br>";
  
  text['lights'] = "Remember, you should specify the lights status";
  
  text['lights_on'] = "Remember, you should turn the lights on!";
  
  text['roof'] = "Make sure you add a roof to your house!";
  text['wall'] = "Make sure you add a wall to your house!";
  text['door'] = "Make sure you add a door to your house!";
  text['windows'] = "Make sure you add windows to your house!";
  
  text['other'] = "Make sure you choose a house for each case";
  text['then'] = "Make sure you choose a house for each case";
  text['time'] = "Remember, it might be a morning or evening";
  text['drawing'] = "Remember, there are two cases";
   
  text['abstraction'] = "Make sure you fill the definition";
  text['call'] = "You created a definition but didn't use it!";
  text['func'] = "Outfit definitions menu help you create a shortcut";
  text['city'] = "Remember, you need to build your favorite house in Chicago!";
  
  text['count'] = "Remember, you need to turn the lights on and off 6 times in a row!";
  
  text['repeat_stack'] = "You didn't choose anything to repeat, please place the blocks you want to repeat inside the repeat block";
  text['repeat_light_on'] = "Remember, the 'lights on' block needs to be repeated!"; 
  text['repeat_light_off'] = "Remember, the 'lights off' block needs to be repeated!"; 
  
  text['manual_repeat'] = "Remember, you need to turn the lights on and off three times in a row!";
}

//--------------------------------------------------------------------------
// Compile user program
//--------------------------------------------------------------------------
void compile(String json) {
  outfits.clear();
  clearBlocks();
  procedure_riyadh = false;
  ERR_MSG = '';
  LIGHTS_ON_COUNT = 0;
  LIGHTS_OFF_COUNT = 0;
  
  check_input = true;
  
  var function_begin = json.indexOf('{');
  var function_end = json.lastIndexOf('}');
  
  if (function_end != -1 && function_begin != -1 ) {
    blocks[block_name['func']][1] = true; //print("FUNC FOUND");
    var functionsLine = json.substring(function_begin, function_end+1);
    functionsLine = (((functionsLine.replaceAll('{', '')).replaceAll('}', ''))
                      .replaceAll('\n', '')).replaceAll('][', '], [');
    
    subroutines = parseCode(functionsLine);
  }
  
  var scriptIndex = (function_end+1 == -1) ? 0 : function_end+1;
  var script = json.substring(scriptIndex);
  
  commands = parseCode(script);
  //print(commands);
  
  interpret(commands, true);
  
  // Validate user answers here...
  //format blocks = [ [blockName, value, levels] ]
  
  if (ERR_MSG.isEmpty) {
    validate(); //make sure all blocks needed are found
    if (check_input) {
      if (CURRENT_LEVEL == "2") {
        if (LIGHTS_ON_COUNT.toString() != "3" || LIGHTS_OFF_COUNT.toString() != "3") {
          ERR_MSG = 'manual_repeat';
          check_input = false;
        }
      }
      if (ERROR_THEN.isNotEmpty) {
        ERR_MSG = ERROR_THEN;
        check_input = false;
      } 
      if (ERROR_OTHER.isNotEmpty) {
        ERR_MSG = ERROR_OTHER;
        check_input = false;
      }
      if (CURRENT_LEVEL == "6" && ! procedure_riyadh) {
        ERR_MSG = 'city';
        check_input = false;
      }
    }  
  }
  else
    check_input = false;
}


void validate() {
  for (var i= (blocks.length) - 1; i >= 0 ; i--) {
    var num_level = (blocks[i].length); 
    //print("NUM LEVEL = " + num_level.toString());
    for (var j=2; j< num_level; j++) { // first two elements are not levels
      if (blocks[i][j].toString() == CURRENT_LEVEL ) { // if current level needs this block
        //print("CURRENT LEVEL NEEDS " + blocks[i][0]);
        if (! blocks[i][1]) {
          //print( blocks[i][1].toString());
          ERR_MSG = blocks[i][0];
          break;
        }
        
      }
    }
    if (! ERR_MSG.isEmpty) {
      print (ERR_MSG + " NOT FOUND");
      check_input = false;
      break;
    }
      
  }
}

//--------------------------------------------------------------------------
// Parse JSON returned from the program
//--------------------------------------------------------------------------
List parseCode(code) {
  code = code.split('\n');
  List parsedCode;
  //print(code);
  
  for (int i=0; i<code.length; i++) {
    String f = '[ ${code[i]} ]';
    parsedCode = JSON.decode(f);
  }
  
  return parsedCode;
}

//--------------------------------------------------------------------------
// Display outfits from user's program 
//--------------------------------------------------------------------------
void display() {
  
  String outfit = outfits[0]; //print("current = $outfit");
  sendMessage("outfit#" + outfit);
  outfits.removeAt(0);
}


//--------------------------------------------------------------------------
// Interpret the user program
//--------------------------------------------------------------------------
void interpret (List commands, bool consider) {
  for (int j=0; j<commands.length; j++) {
    if (commands[j] is !List || commands[j][0] == "GET") { //ensure output blocks are connected
      break;
    }
    else {
      List nested = commands[j] as List;
      //print("inner = ${nested.length} ");
      
      if (nested[0] == "if") {processIf(nested, consider);}
      else if (nested[0] == "repeat") {processRepeat(nested, consider);}
      else if (nested[0] == "CALL") {processCall(nested, consider);}
      else { //not a block
        var part = nested[0];
        var color = nested[1];
        var id = nested[2];
        var outfit = part+color+'#'+id.toString();
        
        if (part.startsWith("roof") && consider) { 
          blocks[block_name['roof']][1]= true; 
        }
          
        else if (part.startsWith("wall") && consider) { 
          blocks[block_name['wall']][1]= true; 
        }
        
        else if (part.startsWith("door") && consider) { 
          blocks[block_name['door']][1]= true;  
        }
        
        else if (part.startsWith("windows") && consider) { 
          blocks[block_name['windows']][1]= true;
        }
        
        else if (part.startsWith("lights") && consider) { 
          blocks[block_name['lights']][1]= true; 
          if (color == "on") {
            blocks[block_name['lights_on']][1]= true;
            LIGHTS_ON_COUNT += 1;
            if (LIGHTS_CHECK) { //came from repeat processing
              REPEAT_LIGHT_ON = true;
            }
          }
          else {
            LIGHTS_OFF_COUNT += 1;
            if (LIGHTS_CHECK) { //came from repeat processing
              REPEAT_LIGHT_OFF = true;
            }
          }
        }
        
        if (CURRENT_LEVEL == "4" && color == "on") {
          if (CHECK_AGAINST == "morning") {
            CURRENT_BLOCK == "then" ? ERROR_THEN = 'lights_on_mismatch' : ERROR_OTHER = '';
            
            /*if (CURRENT_BLOCK == "then") {
              ERROR_THEN = 'lights_on_mismatch';
            }
            else { //current is other
             ERROR_OTHER = '';
            }*/
            
          }
          
          else { //check against is evening 
            CURRENT_BLOCK == "then" ? ERROR_THEN = '' : ERROR_OTHER = 'lights_on_mismatch';
            /*if (CURRENT_BLOCK == "then") {
              ERROR_THEN = '';
            }
            else { //current is other
              ERROR_OTHER = 'lights_on_mismatch';
            }*/
          }
          
        }
        
        else if (CURRENT_LEVEL == "4" && color == "off") {
          if (CHECK_AGAINST == "morning") {
            CURRENT_BLOCK == "then" ? ERROR_THEN = '' : ERROR_OTHER = 'lights_off_mismatch';
            /*if (CURRENT_BLOCK == "then") {
              ERROR_THEN = '';
            }
            else { //current is other
              ERROR_OTHER = 'lights_off_mismatch';
            }*/
            
          }
          
          else { //check against is evening 
            CURRENT_BLOCK == "then" ? ERROR_THEN = 'lights_off_mismatch' : ERROR_OTHER = '';
            /*if (CURRENT_BLOCK == "then") {
              ERROR_THEN = 'lights_off_mismatch'; 
            }
            else { //current is other
              ERROR_OTHER = '';
            }*/
          }
          
        }
        if (consider) {
          outfits.add(outfit);
          //print(outfit + " ADDED!");
        }
      
      }
    }
   }
    
}


//--------------------------------------------------------------------------
// Repeat block
//--------------------------------------------------------------------------
void processRepeat(List nested, bool consider) {
  var id = nested[1];
  var count = nested[2];
  List block = nested[3];
  var outfit;
  
  blocks[block_name['repeat']][1] = true; //print("repeat FOUND");
  
  if (count != 6 && CURRENT_LEVEL == "3") {
    ERR_MSG = 'count';
  }
  
  //verify loop has lights inside
  //print(block.length);
  for (var i=0; i < count; i++) {
    LIGHTS_CHECK = true;
    if (consider) {
      var call = "REPEAT#" + id.toString() + "#" + (i+1).toString() + "#" + count.toString();
      outfits.add(call);
    }
    
    interpret(block, consider);
    LIGHTS_CHECK = false;
  }
  
  if (CURRENT_LEVEL == "3") {
    if (!REPEAT_LIGHT_ON) { //didn't encounter lights block inside repeat
        ERR_MSG = 'repeat_light_on';  
    }
    if (!REPEAT_LIGHT_OFF) {
      ERR_MSG = 'repeat_light_off';
    }
  }
  if (block.length < 1 && CURRENT_LEVEL == "3") {
      ERR_MSG = 'repeat_stack';
    }
  
}


//--------------------------------------------------------------------------
// CallFunction block
//--------------------------------------------------------------------------
void processCall(List nested, bool consider) {
  var funcName = nested[1];
  var id = nested[2];
  var block;
  var outfit;
  
  blocks[block_name['call']][1] = true; //print("CALL FOUND");
  
  if (CURRENT_LEVEL == "6") {
    if (CHECK_AGAINST == "Chicago") {
      if (CURRENT_BLOCK == "then") {
        procedure_riyadh = true;
      }
      
    }
    else if (CHECK_AGAINST == "Boston") {
      if (CURRENT_BLOCK =="other") {
        procedure_riyadh = true;
      }
    }
    
  }
  for (int i=0; i < subroutines.length; i++) {
    if (funcName == subroutines[i][0]) {
      block = subroutines[i][1];
      if (block.length >= 1) {blocks[block_name['abstraction']][1] = true;}
      if (consider) {
        var call = "CALL#" + id.toString();
        outfits.add(call);
      }
      interpret(block, consider);
    }
  }
   
}


//--------------------------------------------------------------------------
// IF block
//--------------------------------------------------------------------------
void processIf(List nested, bool consider) {
  var condition = nested [1][0];
  var id = nested[1][2];
  var then = nested[2];
  var other = nested[3];
  List result;
  var outfit;
  
  blocks[block_name['if']][1] = true;
  
  if (then.length >= 1 ) {blocks[block_name['then']][1] = true; print("THEN POPULATED");}
  if (other.length >= 1) {blocks[block_name['other']][1] = true; print("OTHER POPULATED");}
  
  if (condition != 0) {
    var call = "CALL#" + id.toString();
    outfits.add(call);
    
    if (condition == "Drawing") { //DRAWING FOR block is connected to IF block
      blocks[block_name['drawing']][1] = true;
      CHECK_AGAINST = (nested[1][1] == "Chicago")? "Chicago" : "Boston";
      outfits.add(CURRENT_CITY);
      
      if (CHECK_AGAINST == CURRENT_CITY) {
        CURRENT_BLOCK = 'then';
        interpret(then, true);
        CURRENT_BLOCK = 'other';
        interpret(other, false);
      }
      
      else {
        CURRENT_BLOCK = 'other';
        interpret(other, true);
        CURRENT_BLOCK = 'then';
        interpret(then, false);
      }    
    }
      
     
    if (condition == "Time")  {  //TIME CONDITION
      blocks[block_name['time']][1] = true;
      CHECK_AGAINST = (nested[1][1] == "morning")? "morning" : "evening";
      outfits.add(CURRENT_TIME);
      if (CHECK_AGAINST == CURRENT_TIME) {
        CURRENT_BLOCK = 'then';
        interpret(then, true);
        CURRENT_BLOCK = 'other';
        interpret(other, false);
      }
      
      else {
        CURRENT_BLOCK = 'other';
        interpret(other, true);
        CURRENT_BLOCK = 'then';
        interpret(then, false);
      } 
    }
  }
  else { //nothing is connected to if statement
    interpret(then, false);
    interpret(other, true);  
  }
}
//--------------------------------------------------------------------------
// Generate random place and color
//--------------------------------------------------------------------------
void randomize() {
  
  Random rnd = new Random();
  var x = rnd.nextInt(2);
  
  var city = ['Chicago', 'Boston'];
  rnd = new Random();
  x = rnd.nextInt(2);
  
  CURRENT_CITY = city[x];
  
  
  var time = ['morning', 'evening'];
  rnd = new Random();
  x = rnd.nextInt(2);
  
  CURRENT_TIME = time[x];
  
  text['lights_on_mismatch'] = "When it's morning, Let's save energy and always turn the lights off!";
  text['lights_off_mismatch'] = "When it's dark outside, Let's switch the lights on!";
  
}



//--------------------------------------------------------------------------
// Clear blocks
//--------------------------------------------------------------------------
void clearBlocks() {
  
  blocks[block_name['repeat']][1] = false;
  blocks[block_name['lights']][1] = false;
  blocks[block_name['lights_on']][1] = false;
  blocks[block_name['roof']][1] = false;
  blocks[block_name['wall']][1] = false;
  blocks[block_name['door']][1] = false;
  blocks[block_name['windows']][1] = false;
  
  blocks[block_name['if']][1] = false;
  blocks[block_name['then']][1] = false;
  blocks[block_name['other']][1] = false;
  blocks[block_name['drawing']][1] = false;
  blocks[block_name['time']][1] = false;
  
  blocks[block_name['func']][1] = false;
  blocks[block_name['call']][1] = false;
  blocks[block_name['abstraction']][1] = false;
  
}  

//--------------------------------------------------------------------------
// Send a message to the javascript blockly window
//--------------------------------------------------------------------------
void sendMessage(String message) {
  var msg = "@blockly#$message";
  var origin = window.location.protocol + "//" + window.location.host;
  window.postMessage(msg, origin);
  }

