//-------------------------------------------------------------------------------------
// Returns an array of toolboxes for all levels
//-------------------------------------------------------------------------------------
function getToolbox() {
	var toolbox = [];

	var toolbox1 = '<xml> <category></category> ';
	toolbox1 += '  <category name="+ Building Blocks"> <block type="wall"></block> <block type="roof"></block> <block type="door"></block> <block type="windows"></block>';
	toolbox1 += '</category> <category> </category>'; //close building blocks
     
     
     toolbox1 += '<category name="+ Coloring"> <block type="red"></block> <block type="brown"></block>' + 
                   '<block type="black"></block> <block type="pink"></block> <block type="purple"></block> <block type="blue"></block><block type="silver"></block> ' +
                   '<block type="beige"></block> <block type="gold"></block> ' ;
     toolbox1 += '</category> <category> </category>'; //close coloring
     
    
     toolbox1 += '</xml>';
     
     //------------------------------------------------------------------------------
     var toolbox2 = '<xml> <category></category> ';
     
     toolbox2 += '  <category name="+ Lights"> <block type="lights_on"></block> <block type="lights_off"></block>';
     toolbox2 += '</category> <category> </category>'; //close lights
     
     
     toolbox2 += '<category name="+ Building Blocks">  <block type="wall"></block> <block type="roof"></block> <block type="door"></block> <block type="windows"></block> ';
     toolbox2 += '</category> <category> </category>'; //close building blocks
     
     
     toolbox2 += '<category name="+ Coloring"> <block type="red"></block> <block type="brown"></block>' + 
                   '<block type="black"></block> <block type="pink"></block> <block type="purple"></block> <block type="blue"></block><block type="silver"></block> ' +
                   '<block type="beige"></block> <block type="gold"></block> ' ;
     toolbox2 += '</category> <category> </category>'; //close coloring
     
     
     toolbox2+= '</xml>';
     
     //------------------------------------------------------------------------------
     var toolbox4 = '<xml> <category></category> ';
     
     toolbox4 += '<category name = "+ Controls"> <block type = "control_if"> <value name = "CONDITION"> <block type="time_is"></block> </value> </block>';
     toolbox4 += '</category> <category> </category>'; //close controls
     
     toolbox4 += '  <category name="+ Lights"> <block type="lights_on"></block> <block type="lights_off"></block>';
     toolbox4 += '</category> <category> </category>'; //close lights
     
     toolbox4 += '<category name="+ Coloring"> <block type="red"></block> <block type="brown"></block>' + 
                   '<block type="black"></block> <block type="pink"></block> <block type="purple"></block> <block type="blue"></block><block type="silver"></block> ' +
                   '<block type="beige"></block> <block type="gold"></block> ' ;
     toolbox4 += '</category> <category> </category>'; //close coloring
     
     
     toolbox4 += '</xml>';
     
     //------------------------------------------------------------------------------
     var toolbox5 = '<xml> <category></category> ';
     
     toolbox5 += '  <category name="+ Lights"> <block type="lights_on"></block> <block type="lights_off"></block>';
     toolbox5 += '</category> <category> </category>'; //close lights
     
     toolbox5 += '<category name="+ Coloring"> <block type="red"></block> <block type="brown"></block>' + 
                   '<block type="black"></block> <block type="pink"></block> <block type="purple"></block> <block type="blue"></block><block type="silver"></block> ' +
                   '<block type="beige"></block> <block type="gold"></block> ' ;
     toolbox5 += '</category> <category> </category>'; //close coloring
    
     toolbox5 += '</xml>';
     
     //------------------------------------------------------------------------------
     
     var toolbox6 = '<xml> <category></category> ';
     
     toolbox6 += '<category name = "+ Home Definitions" custom="PROCEDURE">';
     toolbox6 += '</category> <category> </category>'; //close definitions
     
     toolbox6 += '<category name = "+ Controls"> <block type = "control_if"> <value name = "CONDITION"> <block type="drawing_for"></block> </value> </block> ';
     toolbox6 += '</category> <category> </category>'; //close controls
     
     toolbox6 += '  <category name="+ Lights"> <block type="lights_on"></block> <block type="lights_off"></block>';
     toolbox6 += '</category> <category> </category>'; //close lights
     
     toolbox6 += '  <category name="+ Building Blocks"> <block type="wall"></block> <block type="roof"></block>  <block type="door"></block> <block type="windows"></block> ';
     toolbox6 += '</category> <category> </category>'; //close building blocks
     
     
     toolbox6 += '<category name="+ Coloring"> <block type="red"></block> <block type="brown"></block>' + 
                   '<block type="black"></block> <block type="pink"></block> <block type="purple"></block> <block type="blue"></block><block type="silver"></block> ' +
                   '<block type="beige"></block> <block type="gold"></block> ' ;
     toolbox6 += '</category> <category> </category>'; //close coloring
     
     
     toolbox6 += '</xml>';
     
     //------------------------------------------------------------------------------
     var toolbox3 = '<xml> <category></category> ';
     
     toolbox3 += '<category name = "+ Repeat">  <block type="control_repeat"></block>';
     toolbox3 += '</category> <category> </category>'; //close repeat
     
     toolbox3 += '<category name = "+ Home Definitions" custom="PROCEDURE">';
     toolbox3 += '</category> <category> </category>'; //close definitions
     
     toolbox3 += '  <category name="+ Lights"> <block type="lights_on"></block> <block type="lights_off"></block>';
     toolbox3 += '</category> <category> </category>'; //close lights
     
     toolbox3 += '<category name="+ Building Blocks"> <block type="wall"></block>  <block type="roof"></block> <block type="door"></block> <block type="windows"></block>';
     toolbox3 += '</category> <category> </category>'; //close building blocks
     
     toolbox3 += '<category name="+ Coloring"> <block type="red"></block> <block type="brown"></block>' + 
                   '<block type="black"></block> <block type="pink"></block> <block type="purple"></block> <block type="blue"></block><block type="silver"></block> ' +
                   '<block type="beige"></block> <block type="gold"></block> ' ;
     toolbox3 += '</category> <category> </category>'; //close coloring
     
     toolbox3 += '</xml>';
     
     //------------------------------------------------------------------------------
    
     var toolbox7 = '<xml> <category></category> ';
     
     toolbox7 += '<category name = "+ Repeat">  <block type="control_repeat"></block>';
     toolbox7 += '</category> <category> </category>'; //close repeat
     
     toolbox7 += '<category name = "+ Home Definitions" custom="PROCEDURE">';
     toolbox7 += '</category> <category> </category>'; //close definitions
     
     toolbox7 += '<category name = "+ Controls"> <block type = "control_if"></block> <block type="drawing_for"></block> <block type="time_is"></block> ';
     toolbox7 += '</category> <category> </category>'; //close controls
     
     toolbox7 += '  <category name="+ Lights"> <block type="lights_on"></block> <block type="lights_off"></block>';
     toolbox7 += '</category> <category> </category>'; //close lights
     
     toolbox7 += '<category name="+ Building Blocks">  <block type="wall"></block> <block type="roof"></block> <block type="door"></block> <block type="windows"></block>';
     toolbox7 += '</category> <category> </category>'; //close building blocks
     
     
     toolbox7 += '<category name="+ Coloring"> <block type="red"></block> <block type="brown"></block>' + 
                   '<block type="black"></block> <block type="pink"></block> <block type="purple"></block> <block type="blue"></block><block type="silver"></block> ' +
                   '<block type="beige"></block> <block type="gold"></block> ' ;
     toolbox7 += '</category> <category> </category>'; //close coloring
     
     toolbox7 += '</xml>';
     
    toolbox[0] = toolbox1;
    toolbox[1] = toolbox2;
    toolbox[2] = toolbox3;
    toolbox[3] = toolbox4;
    toolbox[4] = toolbox5;
    toolbox[5] = toolbox6;
    toolbox[6] = toolbox7;
    
    return toolbox;
     
     
}