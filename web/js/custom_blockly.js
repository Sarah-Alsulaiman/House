goog.provide('Blockly.Virtual');

function UpdateBlocklyCode() {
	
	Blockly.Trashcan.prototype.MARGIN_HOTSPOTX_ = 50;
	Blockly.Trashcan.prototype.MARGIN_HOTSPOTY_ = 30;
	
	Blockly.Trashcan.prototype.myDispose = function(blockHW, blockXY) {
	  if (!this.svgGroup_) {
	    return;
	  }
	  var trashXY = Blockly.getAbsoluteXY_(this.svgGroup_);
	  var intersectX = blockXY.x + blockHW.width + 150;
	  var intersectY = blockXY.y + blockHW.height + 150;
	  var over = 0; 
	  if (intersectX > trashXY.x - this.MARGIN_HOTSPOTX_ && intersectY > trashXY.y - this.MARGIN_HOTSPOTX_) {
	  	over = 1;
	  }
	  // For bonus points we might want to match the trapezoidal outline.
	  if (this.isOpen != over) {
	    this.setOpen_(over);
	  }
	  return over;
	};
	
	Blockly.BlockSvg.SEP_SPACE_X = 15;
	Blockly.BlockSvg.SEP_SPACE_Y = 30;
	Blockly.BlockSvg.MIN_BLOCK_Y = 35;
	Blockly.BlockSvg.TAB_HEIGHT = 20;
	Blockly.BlockSvg.TAB_WIDTH = 8;
	//Blockly.BlockSvg.NOTCH_WIDTH = 40;
	Blockly.BlockSvg.TITLE_HEIGHT = 23;
	Blockly.BlockSvg.CORNER_RADIUS = 8;
    
    Blockly.BlockSvg.connectionUiStep_ = function(ripple) {
	  var ms = (new Date()) - ripple.startDate_;
	  var percent = ms / 150;
	  if (percent > 1) {
	    goog.dom.removeNode(ripple);
	  } else {
	    ripple.setAttribute('r', percent * 40);
	    ripple.style.opacity = 1 - percent;
	    var closure = function() {
	      Blockly.BlockSvg.connectionUiStep_(ripple);
	    };
	    window.setTimeout(closure, 10);
	  }
	};

	Blockly.SNAP_RADIUS = 30;
	
	
    
    //****************************************************************************************************************************************
    
	Blockly.Virtual.Width = 310;
	Blockly.Virtual.Height = 680;
	Blockly.Virtual.X = 580;
	Blockly.Virtual.Y = 15;
		
	Blockly.Css.CONTENT2 = [
		  '.blocklySelected>.blocklyPath {',
		  '  stroke-width: 4px;',
		  '  stroke: #fc3;',
		  '}',
		  '.blocklyTooltipBackground {',
		  '  fill: #ffffe1;',
		  '  stroke-width: 1px;',
		  '  stroke: #d8d8d8;',
		  '	 fill-opacity: 0.8;',
		  '}',
		  '.blocklyTooltipText {',
		  '  font-family: sans-serif;',
		  '  font-size: 16pt;',
		  '  fill: #000;',
		  '}',
		  '.blocklyEditableText: hover>rect {',
		  '  stroke-width: 2;',
		  '  stroke: #fff;',
		  '}',
		  '.blocklyEditableText2>rect {',
		  '  stroke-width: 2;',
		  '  stroke: #fff;',
		  '}',
		  ''
		];
		
		Blockly.Css.inject = function() {
		  var text = Blockly.Css.CONTENT.join('\n');
		  // Strip off any trailing slash (either Unix or Windows).
		  var path = Blockly.pathToBlockly.replace(/[\\\/]$/, '');
		  text = text.replace(/<<<PATH>>>/g, path);
		  goog.cssom.addCssText(text);
		  
		  var text2 = Blockly.Css.CONTENT2.join('\n');
		  goog.cssom.addCssText(text2);
		};


/**
 * Height of this block, not including any statement blocks above or below.
 */
Blockly.BlockSvg.prototype.height = 0;
/**
 * Width of this block, including any connected value blocks.
 */
Blockly.BlockSvg.prototype.width = 0;

/**
 * Render the top edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Array.<string>} highlightSteps Path of block highlights.
 * @param {!Object} connectionsXY Location of block.
 * @param {number} rightEdge Minimum width of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawTop_ =
    function(steps, highlightSteps, connectionsXY, rightEdge) {
  // Position the cursor at the top-left starting point.
  if (this.squareTopLeftCorner_) {
    steps.push('m 0,0');
    highlightSteps.push('m 1,1');
  } else {
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START);
    highlightSteps.push(Blockly.RTL ?
        Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL :
        Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR);
    // Top-left rounded corner.
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER);
    highlightSteps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT);
  }

  // Top edge.
  if (this.block_.previousConnection) {
    steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 15);
    highlightSteps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 15);
    steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
    highlightSteps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT);
    // Create previous block connection.
    var connectionX = connectionsXY.x + (Blockly.RTL ?
        -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH);
    var connectionY = connectionsXY.y;
    this.block_.previousConnection.moveTo(connectionX, connectionY);
    // This connection will be tightened when the parent renders.
  }
  steps.push('H', rightEdge);
  highlightSteps.push('H', rightEdge + (Blockly.RTL ? -1 : 0));
  this.width = rightEdge;
};


/**
 * Render the bottom edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Array.<string>} highlightSteps Path of block highlights.
 * @param {!Object} connectionsXY Location of block.
 * @param {number} cursorY Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawBottom_ = function(steps, highlightSteps,
                                                     connectionsXY, cursorY) {
  this.height = cursorY + 1;  // Add one for the shadow.
  if (this.block_.nextConnection) {
    steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH + ' ' +
        Blockly.BlockSvg.NOTCH_PATH_RIGHT);
    // Create next block connection.
    var connectionX;
    if (Blockly.RTL) {
      connectionX = connectionsXY.x - Blockly.BlockSvg.NOTCH_WIDTH;
    } else {
      connectionX = connectionsXY.x + Blockly.BlockSvg.NOTCH_WIDTH;
    }
    var connectionY = connectionsXY.y + cursorY + 1;
    this.block_.nextConnection.moveTo(connectionX, connectionY);
    if (this.block_.nextConnection.targetConnection) {
      this.block_.nextConnection.tighten_();
    }
    this.height += 4;  // Height of tab.
  }

  // Should the bottom-left corner be rounded or square?
  if (this.squareBottomLeftCorner_) {
    steps.push('H 0');
    if (!Blockly.RTL) {
      highlightSteps.push('M', '1,' + cursorY);
    }
  } else {
    steps.push('H', Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
    if (!Blockly.RTL) {
      highlightSteps.push('M', Blockly.BlockSvg.DISTANCE_45_INSIDE + ',' +
          (cursorY - Blockly.BlockSvg.DISTANCE_45_INSIDE));
      highlightSteps.push('A', (Blockly.BlockSvg.CORNER_RADIUS - 1) + ',' +
          (Blockly.BlockSvg.CORNER_RADIUS - 1) + ' 0 0,1 ' +
          '1,' + (cursorY - Blockly.BlockSvg.CORNER_RADIUS));
    }
  }
};

Blockly.BlockSvg.prototype.renderDrawRight_ = function(steps, highlightSteps,
    inlineSteps, highlightInlineSteps, connectionsXY, inputRows, iconWidth) {
  var cursorX;
  var cursorY = 0;
  var connectionX, connectionY;
  for (var y = 0, row; row = inputRows[y]; y++) {
    cursorX = Blockly.BlockSvg.SEP_SPACE_X;
    if (y == 0) {
      cursorX += Blockly.RTL ? -iconWidth : iconWidth;
    }
    highlightSteps.push('M', (inputRows.rightEdge - 1) + ',' + (cursorY + 1));
    if (row.type == Blockly.BlockSvg.INLINE) {
      // Inline inputs and/or dummy inputs.
      for (var x = 0, input; input = row[x]; x++) {
        var titleX = cursorX;
        var titleY = cursorY + Blockly.BlockSvg.TITLE_HEIGHT;
        if (row.thicker) {
          // Lower the title slightly.
          titleY += Blockly.BlockSvg.INLINE_PADDING_Y;
        }
        // TODO: Align inline title rows (left/right/centre).
        cursorX = this.renderTitles_(input.titleRow, titleX, titleY);
        if (input.type != Blockly.DUMMY_INPUT) {
          cursorX += input.renderWidth + Blockly.BlockSvg.SEP_SPACE_X;
        }
        if (input.type == Blockly.INPUT_VALUE) {
          inlineSteps.push('M', (cursorX - Blockly.BlockSvg.SEP_SPACE_X) +
                           ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y));
          inlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH - 2 - input.renderWidth);
          inlineSteps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
          inlineSteps.push('v', input.renderHeight + 1 -
                                Blockly.BlockSvg.TAB_HEIGHT);
          inlineSteps.push('h', input.renderWidth + 2 - Blockly.BlockSvg.TAB_WIDTH);
          inlineSteps.push('z');
          if (Blockly.RTL) {
            // Highlight right edge, around back of tab, and bottom.
            highlightInlineSteps.push('M',
                (cursorX - Blockly.BlockSvg.SEP_SPACE_X +
                 Blockly.BlockSvg.TAB_WIDTH - input.renderWidth - 1) + ',' +
                (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 1));
            highlightInlineSteps.push(
                Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL);
            highlightInlineSteps.push('v',
                input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 2);
            highlightInlineSteps.push('h',
                input.renderWidth - Blockly.BlockSvg.TAB_WIDTH);
          } else {
            // Highlight right edge, bottom, and glint at bottom of tab.
            highlightInlineSteps.push('M',
                (cursorX - Blockly.BlockSvg.SEP_SPACE_X + 1) + ',' +
                (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 1));
            highlightInlineSteps.push('v', input.renderHeight + 1);
            highlightInlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH - 2 - 
                                           input.renderWidth);
            highlightInlineSteps.push('M',
                (cursorX - input.renderWidth - Blockly.BlockSvg.SEP_SPACE_X +
                 0.8) + ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y +
                 Blockly.BlockSvg.TAB_HEIGHT - 0.4));
            highlightInlineSteps.push('l',
                (Blockly.BlockSvg.TAB_WIDTH * 0.42) + ',-1.8');
          }
          // Create inline input connection.
          if (Blockly.RTL) {
            connectionX = connectionsXY.x - cursorX -
                Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X +
                input.renderWidth - 1;
          } else {
            connectionX = connectionsXY.x + cursorX +
                Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X -
                input.renderWidth - 1;
          }
          connectionY = connectionsXY.y + cursorY +
              Blockly.BlockSvg.INLINE_PADDING_Y + 1;
          input.connection.moveTo(connectionX, connectionY);
          if (input.connection.targetConnection) {
            input.connection.tighten_();
          }
        }
      }

      cursorX = Math.max(cursorX, inputRows.rightEdge);
      this.width = Math.max(this.width, cursorX);
      steps.push('H', cursorX);
      highlightSteps.push('H', cursorX + (Blockly.RTL ? -1 : 0));
      steps.push('v', row.height);
      if (Blockly.RTL) {
        highlightSteps.push('v', row.height - 2);
      }
    } else if (row.type == Blockly.INPUT_VALUE) {
      // External input.
      var input = row[0];
      var titleX = cursorX;
      var titleY = cursorY + Blockly.BlockSvg.TITLE_HEIGHT;
      if (input.align != Blockly.ALIGN_LEFT) {
        var titleRightX = inputRows.rightEdge - input.titleWidth -
            Blockly.BlockSvg.TAB_WIDTH - 2 * Blockly.BlockSvg.SEP_SPACE_X;
        if (input.align == Blockly.ALIGN_RIGHT) {
          titleX += titleRightX;
        } else if (input.align == Blockly.ALIGN_CENTRE) {
          titleX += (titleRightX + titleX) / 2;
        }
      }
      this.renderTitles_(input.titleRow, titleX, titleY);
      steps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
      steps.push('v', row.height - Blockly.BlockSvg.TAB_HEIGHT);
      if (Blockly.RTL) {
        // Highlight around back of tab.
        highlightSteps.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL);
        highlightSteps.push('v', row.height - Blockly.BlockSvg.TAB_HEIGHT);
      } else {
        // Short highlight glint at bottom of tab.
        highlightSteps.push('M', (inputRows.rightEdge - 4.2) + ',' +
            (cursorY + Blockly.BlockSvg.TAB_HEIGHT - 0.4));
        highlightSteps.push('l', (Blockly.BlockSvg.TAB_WIDTH * 0.42) +
            ',-1.8');
      }
      // Create external input connection.
      connectionX = connectionsXY.x +
          (Blockly.RTL ? -inputRows.rightEdge - 1 : inputRows.rightEdge + 1);
      connectionY = connectionsXY.y + cursorY;
      input.connection.moveTo(connectionX, connectionY);
      if (input.connection.targetConnection) {
        input.connection.tighten_();
      }
    } else if (row.type == Blockly.DUMMY_INPUT) {
      // External naked title.
      var input = row[0];
      var titleX = cursorX;
      var titleY = cursorY + Blockly.BlockSvg.TITLE_HEIGHT;
      if (input.align != Blockly.ALIGN_LEFT) {
        var titleRightX = inputRows.rightEdge - input.titleWidth -
            2 * Blockly.BlockSvg.SEP_SPACE_X;
        if (inputRows.hasValue) {
          titleRightX -= Blockly.BlockSvg.TAB_WIDTH;
        }
        if (input.align == Blockly.ALIGN_RIGHT) {
          titleX += titleRightX;
        } else if (input.align == Blockly.ALIGN_CENTRE) {
          titleX += (titleRightX + titleX) / 2;
        }
      }
      this.renderTitles_(input.titleRow, titleX, titleY);
      steps.push('v', row.height);
      if (Blockly.RTL) {
        highlightSteps.push('v', row.height - 2);
      }
    } else if (row.type == Blockly.NEXT_STATEMENT) {
      // Nested statement.
      var input = row[0];
      if (y == 0) {
        // If the first input is a statement stack, add a small row on top.
        steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y);
        if (Blockly.RTL) {
          highlightSteps.push('v', Blockly.BlockSvg.SEP_SPACE_Y - 1);
        }
        cursorY += Blockly.BlockSvg.SEP_SPACE_Y;
      }
      var titleX = cursorX;
      var titleY = cursorY + Blockly.BlockSvg.TITLE_HEIGHT;
      if (input.align != Blockly.ALIGN_LEFT) {
        var titleRightX = inputRows.statementEdge - input.titleWidth -
            2 * Blockly.BlockSvg.SEP_SPACE_X;
        if (input.align == Blockly.ALIGN_RIGHT) {
          titleX += titleRightX;
        } else if (input.align == Blockly.ALIGN_CENTRE) {
          titleX += (titleRightX + titleX) / 2;
        }
      }
      this.renderTitles_(input.titleRow, titleX, titleY);
      cursorX = inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH;
      steps.push('H', cursorX);
      steps.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER);
      steps.push('v', row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS);
      steps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER);
      steps.push('H', inputRows.rightEdge);
      if (Blockly.RTL) {
        highlightSteps.push('M',
            (cursorX - Blockly.BlockSvg.NOTCH_WIDTH +
             Blockly.BlockSvg.DISTANCE_45_OUTSIDE) +
            ',' + (cursorY + Blockly.BlockSvg.DISTANCE_45_OUTSIDE));
        highlightSteps.push(
            Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL);
        highlightSteps.push('v',
            row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS);
        highlightSteps.push(
            Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL);
        highlightSteps.push('H', inputRows.rightEdge - 1);
      } else {
        highlightSteps.push('M',
            (cursorX - Blockly.BlockSvg.NOTCH_WIDTH +
             Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + ',' +
            (cursorY + row.height - Blockly.BlockSvg.DISTANCE_45_OUTSIDE));
        highlightSteps.push(
            Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR);
        highlightSteps.push('H', inputRows.rightEdge);
      }
      // Create statement connection.
      connectionX = connectionsXY.x + (Blockly.RTL ? -cursorX : cursorX);
      connectionY = connectionsXY.y + cursorY + 1;
      input.connection.moveTo(connectionX, connectionY);
      if (input.connection.targetConnection) {
        input.connection.tighten_();
      }
      if (y == inputRows.length - 1 ||
          inputRows[y + 1].type == Blockly.NEXT_STATEMENT) {
        // If the final input is a statement stack, add a small row underneath.
        // Consecutive statement stacks are also separated by a small divider.
        steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y);
        if (Blockly.RTL) {
          highlightSteps.push('v', Blockly.BlockSvg.SEP_SPACE_Y - 1);
        }
        cursorY += Blockly.BlockSvg.SEP_SPACE_Y;
      }
    }
    cursorY += row.height;
  }
  if (!inputRows.length) {
    if (this.block_.collapsed) {
      steps.push(Blockly.BlockSvg.JAGGED_TEETH);
      if (Blockly.RTL) {
        highlightSteps.push('l 8,0 0,3.8 7,3.2 m -14.5,9 l 8,4');
      } else {
        highlightSteps.push('h 8');
      }
    }
    cursorY = Blockly.BlockSvg.MIN_BLOCK_Y;
    steps.push('V', cursorY);
    if (Blockly.RTL) {
      highlightSteps.push('V', cursorY - 1);
    }
  }
  return cursorY;
};


/**
 * Render the left edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Array.<string>} highlightSteps Path of block highlights.
 * @param {!Object} connectionsXY Location of block.
 * @param {number} cursorY Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawLeft_ = function(steps, highlightSteps,
                                                      connectionsXY, cursorY) {
  if (this.block_.outputConnection) {
    // Create output connection.
    this.block_.outputConnection.moveTo(connectionsXY.x, connectionsXY.y);
    // This connection will be tightened when the parent renders.
    steps.push('V', Blockly.BlockSvg.TAB_HEIGHT);
    steps.push('c 0,-10 -' + Blockly.BlockSvg.TAB_WIDTH + ',8 -' +
        Blockly.BlockSvg.TAB_WIDTH + ',-7.5 s ' + Blockly.BlockSvg.TAB_WIDTH +
        ',2.5 ' + Blockly.BlockSvg.TAB_WIDTH + ',-7.5');
    if (Blockly.RTL) {
      highlightSteps.push('M', (Blockly.BlockSvg.TAB_WIDTH * -0.3) + ',8.9');
      highlightSteps.push('l', (Blockly.BlockSvg.TAB_WIDTH * -0.45) + ',-2.1');
    } else {
      highlightSteps.push('V', Blockly.BlockSvg.TAB_HEIGHT - 1);
      highlightSteps.push('m', (Blockly.BlockSvg.TAB_WIDTH * -0.92) +
                          ',-1 q ' + (Blockly.BlockSvg.TAB_WIDTH * -0.19) +
                          ',-5.5 0,-11');
      highlightSteps.push('m', (Blockly.BlockSvg.TAB_WIDTH * 0.92) +
                          ',1 V 1 H 2');
    }
    this.width += Blockly.BlockSvg.TAB_WIDTH;
  } else if (!Blockly.RTL) {
    if (this.squareTopLeftCorner_) {
      highlightSteps.push('V', 1);
    } else {
      highlightSteps.push('V', Blockly.BlockSvg.CORNER_RADIUS);
    }
  }
  steps.push('z');
};
/**************************************************************************************
		 * Return the next statement block directly connected to this block.
		 * @return {Blockly.Block} The next statement block or null.
		 **************************************************************************************/
		Blockly.Block.prototype.getNextBlock = function() {
		  return this.nextConnection && this.nextConnection.targetBlock();
		};
		/**
		 * Returns a bounding box describing the dimensions of this block
		 * and any blocks stacked below it.
		 * @return {!Object} Object with height and width properties.
		 */
		Blockly.Block.prototype.getHeightWidth = function() {
		  var height = this.svg_.height;
		  var width = this.svg_.width;
		  // Recursively add size of subsequent blocks.
		  var nextBlock = this.getNextBlock();
		  if (nextBlock) {
		    var nextHeightWidth = nextBlock.getHeightWidth();
		    height += nextHeightWidth.height - 4;  // Height of tab.
		    width = Math.max(width, nextHeightWidth.width);
		  }
		  return {height: height, width: width};
		};
		//******************************************************************************************
		
		/**
		 * Constrain the knob's position within the minimum (0) and maximum
		 * (length of scrollbar) values allowed for the scrollbar.
		 * @param {number} value Value that is potentially out of bounds.
		 * @return {number} Constrained value.
		 * @private
		 */
		Blockly.ScrollbarSvg.prototype.constrainKnob_ = function(value) {
		  if (value <= 0 || isNaN(value)) {
		    value = 0;
		  } else {
		    var axis = this.horizontal_ ? 'width' : 'height';
		    var barLength = parseFloat(this.svgBackground_.getAttribute(axis));
		    var knobLength = parseFloat(this.svgKnob_.getAttribute(axis));
		    //console.log("VALUE = " + value);
		    value = Math.min(value, barLength - knobLength);
		  }
		  return value;
		};
		
		/********************************************************************************************
		 * Initialize Blockly with various handlers.
		 * @private
		 ********************************************************************************************/
		Blockly.init_ = function() {
		  // Bind events for scrolling the workspace.
		  // Most of these events should be bound to the SVG's surface.
		  // However, 'mouseup' has to be on the whole document so that a block dragged
		  // out of bounds and released will know that it has been released.
		  // Also, 'keydown' has to be on the whole document since the browser doesn't
		  // understand a concept of focus on the SVG image.
		  Blockly.bindEvent_(Blockly.svg, 'mousedown', null, Blockly.onMouseDown_);
		  Blockly.bindEvent_(Blockly.svg, 'mousemove', null, Blockly.onMouseMove_);
		  Blockly.bindEvent_(Blockly.svg, 'contextmenu', null, Blockly.onContextMenu_);
		
		  if (!Blockly.documentEventsBound_) {
		    // Only bind the window/document events once.
		    // Destroying and reinjecting Blockly should not bind again.
		    Blockly.bindEvent_(window, 'resize', document, Blockly.svgResize);
		    Blockly.bindEvent_(document, 'mouseup', null, Blockly.onMouseUp_);
		    Blockly.bindEvent_(document, 'keydown', null, Blockly.onKeyDown_);
		    Blockly.documentEventsBound_ = true;
		  }
		
		  var addScrollbars = false;
		  if (Blockly.languageTree) {
		    if (Blockly.Toolbox) {
		      Blockly.Toolbox.init();
		    } else if (Blockly.Flyout) {
		      // Build a fixed flyout with the root blocks.
		      Blockly.mainWorkspace.flyout_.init(Blockly.mainWorkspace,
		          Blockly.getMainWorkspaceMetrics, true);
		      Blockly.mainWorkspace.flyout_.show(Blockly.languageTree.childNodes);
		      // Translate the workspace sideways to avoid the fixed flyout.
		      Blockly.mainWorkspace.scrollX = Blockly.mainWorkspace.flyout_.width_;
		      var translation = 'translate(' + Blockly.mainWorkspace.scrollX + ', 0)';
		      Blockly.mainWorkspace.getCanvas().setAttribute('transform', translation);
		      Blockly.mainWorkspace.getBubbleCanvas().setAttribute('transform',
		                                                           translation);
		      addScrollbars = false;
		    }
		  }
		  if (addScrollbars) {
		    Blockly.mainWorkspace.scrollbar = new Blockly.ScrollbarPair(
		        Blockly.mainWorkspace.getBubbleCanvas(),
		        Blockly.getMainWorkspaceMetrics, Blockly.setMainWorkspaceMetrics);
		  }
		
		  Blockly.mainWorkspace.addTrashcan(Blockly.getMainWorkspaceMetrics);
		
		  // Load the sounds.
		  Blockly.loadAudio_('media/click.wav', 'click');
		  Blockly.loadAudio_('media/delete.wav', 'delete');
		};
		
		/************************************************************************************************
		 * Handle a mouse-down on SVG drawing surface.
		 * @param {!Event} e Mouse down event.
		 * @private
		 ***********************************************************************************************/
		Blockly.onMouseDown_ = function(e) {
		  Blockly.Block.terminateDrag_(); // In case mouse-up event was lost.
		  Blockly.hideChaff();
		  var isTargetSvg = e.target && e.target.nodeName &&
		      e.target.nodeName.toLowerCase() == 'svg';
		  if (Blockly.selected && isTargetSvg) {
		    // Clicking on the document clears the selection.
		    Blockly.selected.unselect();
		  }
		  if (Blockly.isRightButton(e)) {
		    // Right-click.
		    if (Blockly.ContextMenu) {
		      Blockly.showContextMenu_(e.clientX, e.clientY);
		    }
		  } else if ((!Blockly.editable || isTargetSvg) &&
		             Blockly.mainWorkspace.scrollbar) {
		    // If the workspace is editable, only allow dragging when gripping empty
		    // space.  Otherwise, allow dragging when gripping anywhere.
		    //Blockly.mainWorkspace.dragMode = true;//++++++++++++++++++++++++++++++++++++++ COMMENT TO TURN OFF DRAGGING MODE+++++++++++++++++++++++//
		    // Record the current mouse position.
		    Blockly.mainWorkspace.startDragMouseX = e.clientX;
		    Blockly.mainWorkspace.startDragMouseY = e.clientY;
		    Blockly.mainWorkspace.startDragMetrics =
		        Blockly.getMainWorkspaceMetrics();
		    Blockly.mainWorkspace.startScrollX = Blockly.mainWorkspace.scrollX;
		    Blockly.mainWorkspace.startScrollY = Blockly.mainWorkspace.scrollY;
		  }
		};
		/*******************************************************************************************
		 * Highlight a block in the workspace.
		 * @param {?string} id ID of block to find.
		 *******************************************************************************************/
		Blockly.Workspace.prototype.highlightBlock2 = function(id, pCall) {
		 // if (!this.traceOn_) {
		   // return;
		  //}
		  var block = null;
		  if (id) {
		    block = this.getBlockById(id);
		    
		    if (!block) {
		      return;
		    }
		  }
		  // Temporary turn off the listener for selection changes, so that we don't
		  // trip the monitor for detecting user activity.
		  this.traceOn(false);
		  // Select the current block.
		  if (block) {
		    block.select();
		  } else if (Blockly.selected) {
		    Blockly.selected.unselect();
		  }
		  // Restore the monitor for user activity.
		  this.traceOn(true);
		};
		
		
		/**********************************************************************************************
 		* Add a virtual seperator
 		***********************************************************************************************/
		Blockly.Workspace.prototype.addVirtual = function() {
		    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			var svgNS = svg.namespaceURI;
			
			var rect = document.createElementNS(svgNS,'rect');
		    rect.setAttribute('x',Blockly.Virtual.X);
		    rect.setAttribute('y',Blockly.Virtual.Y);
		    rect.setAttribute('width',Blockly.Virtual.Width);
		    rect.setAttribute('height',Blockly.Virtual.Height);
		    rect.setAttribute('fill','#95B3D7');
		    rect.setAttribute('stroke', '#000080');
		    rect.setAttribute('stroke-width', 5);
		    svg.appendChild(rect);
		    
		    var text = document.createElementNS(svgNS, 'text');
			text.setAttribute('x', Blockly.Virtual.X + 50);
			text.setAttribute('y', Blockly.Virtual.Y + 50);
			text.setAttribute('fill', '#999999');
			text.setAttribute('stroke', '#000000');
			text.setAttribute('font-size', '40px');
			text.textContent = 'Definitions';
			svg.appendChild(text);
		    
		    this.svgGroup_.insertBefore(svg, this.svgBlockCanvas_);//*/
		};
		
		Blockly.Workspace.prototype.dispose = function() {
			  if (this.svgGroup_) {
			    goog.dom.removeNode(this.svgGroup_);
			    this.svgGroup_ = null;
			  }
			  this.svgBlockCanvas_ = null;
			  this.svgBubbleCanvas_ = null;
			  if (this.trashcan) {
			    this.trashcan.dispose();
			    this.trashcan = null;
			  }
			  if(this.virtual) {
			  	this.virtual.dispose();
			  	this.virtual = null;
			  }
		};
		
		Blockly.Workspace.prototype.disposeVirtual = function() {
		  if (this.virtual) {
		    this.virtual.dispose();
		    this.virtual = null;
		  }
		};
		
	
		
      //***********************************************************************************************
      Blockly.makeColour = function(hue, sat, val) {
		  return goog.color.hsvToHex(hue, sat,
		      val * 256);
		};
      //***********************************************************************************************
      Blockly.Block.prototype.setColour = function(colourHue, colourSat, colourVal) {
		  this.colourHue_ = colourHue;
		  this.colourSat_ = colourSat;
		  this.colourVal_ = colourVal;
		  
		  if (this.svg_) {
		    this.svg_.updateColour();
		  }
		  if (this.mutator) {
		    this.mutator.updateColour();
		  }
		  if (this.comment) {
		    this.comment.updateColour();
		  }
		  if (this.warning) {
		    this.warning.updateColour();
		  }
		  if (this.rendered) {
		    // Bump every dropdown to change its colour.
		    for (var x = 0, input; input = this.inputList[x]; x++) {
		      for (var y = 0, title; title = input.titleRow[y]; y++) {
		        title.setText(null);
		      }
		    }
		    this.render();
		  }
		};
		
		//***********************************************************************************************
		/**
		 * Change the colour of a block.
		 */
		Blockly.BlockSvg.prototype.updateColour = function() {
		  var hexColour = Blockly.makeColour(this.block_.getColourH(), this.block_.getColourS(), this.block_.getColourV());
		  var rgb = goog.color.hexToRgb(hexColour);
		  var rgbLight = goog.color.lighten(rgb, 0.3);
		  var rgbDark = goog.color.darken(rgb, 0.4);
		  this.svgPathLight_.setAttribute('stroke', goog.color.rgbArrayToHex(rgbLight));
		  this.svgPathDark_.setAttribute('fill', goog.color.rgbArrayToHex(rgbDark));
		  this.svgPath_.setAttribute('fill', hexColour);
		};
		//************************************************************************************************
		Blockly.Block.prototype.getColourH = function() {
		  return this.colourHue_;
		};
		//************************************************************************************************
		Blockly.Block.prototype.getColourS = function() {
		  return this.colourSat_;
		};
		//*************************************************************************************************
		Blockly.Block.prototype.getColourV = function() {
		  return this.colourVal_;
		};
		//*************************************************************************************************
      
	       Blockly.FieldDropdown.prototype.showEditor_ = function() {
		  var svgGroup = Blockly.FieldDropdown.svgGroup_;
		  var svgOptions = Blockly.FieldDropdown.svgOptions_;
		  var svgBackground = Blockly.FieldDropdown.svgBackground_;
		  var svgShadow = Blockly.FieldDropdown.svgShadow_;
		  // Erase all existing options.
		  goog.dom.removeChildren(svgOptions);
		  // The menu must be made visible early since otherwise BBox and
		  // getComputedTextLength will return 0.
		  Blockly.removeClass_(svgGroup, 'blocklyHidden');
		  Blockly.FieldDropdown.openDropdown_ = this;
		
		  function callbackFactory(value) {
		    return function(e) {
		      if (this.changeHandler_) {
		        // Call any change handler, and allow it to override.
		        var override = this.changeHandler_(value);
		        if (override !== undefined) {
		          value = override;
		        }
		      }
		      if (value !== null) {
		        this.setValue(value);
		      }
		      // This mouse click has been handled, don't bubble up to document.
		      e.stopPropagation();
		    };
		  }
		
		  var maxWidth = 0;
		  var resizeList = [];
		  var checkElement = null;
		  var options = this.getOptions_();
		  for (var x = 0; x < options.length; x++) {
		    var text = options[x][0];  // Human-readable text.
		    var value = options[x][1]; // Language-neutral value.
		    var gElement = Blockly.ContextMenu.optionToDom(text);
		    var rectElement = /** @type {SVGRectElement} */ (gElement.firstChild);
		    var textElement = /** @type {SVGTextElement} */ (gElement.lastChild);
		    svgOptions.appendChild(gElement);
		    // Add a checkmark next to the current item.
		    if (!checkElement && value == this.value_) {
		      checkElement = Blockly.createSvgElement('text',
		          {'class': 'blocklyMenuText', 'y': 15}, null);
		      // Insert the checkmark between the rect and text, thus preserving the
		      // ability to reference them as firstChild and lastChild respectively.
		      gElement.insertBefore(checkElement, textElement);
		      checkElement.appendChild(document.createTextNode('\u2713'));
		    }
		
		    gElement.setAttribute('transform',
		        'translate(0, ' + (x * Blockly.ContextMenu.Y_HEIGHT) + ')');
		    resizeList.push(rectElement);
		    Blockly.bindEvent_(gElement, 'mousedown', null, Blockly.noEvent);
		    Blockly.bindEvent_(gElement, 'mouseup', this, callbackFactory(value));
		    Blockly.bindEvent_(gElement, 'mouseup', null,
		                       Blockly.FieldDropdown.hide);
		    // Compute the length of the longest text length.
		    maxWidth = Math.max(maxWidth, textElement.getComputedTextLength());
		  }
		  // Run a second pass to resize all options to the required width.
		  maxWidth += Blockly.ContextMenu.X_PADDING * 2;
		  for (var x = 0; x < resizeList.length; x++) {
		    resizeList[x].setAttribute('width', maxWidth);
		  }
		  if (Blockly.RTL) {
		    // Right-align the text.
		    for (var x = 0, gElement; gElement = svgOptions.childNodes[x]; x++) {
		      var textElement = gElement.lastChild;
		      textElement.setAttribute('text-anchor', 'end');
		      textElement.setAttribute('x', maxWidth - Blockly.ContextMenu.X_PADDING);
		    }
		  }
		  if (checkElement) {
		    if (Blockly.RTL) {
		      // Research indicates that RTL checkmarks are supposed to be drawn the
		      // same in the same direction as LTR checkmarks.  It's only the alignment
		      // that needs to change.
		      checkElement.setAttribute('text-anchor', 'end');
		      checkElement.setAttribute('x', maxWidth - 5);
		    } else {
		      checkElement.setAttribute('x', 5);
		    }
		  }
		  var width = maxWidth + Blockly.FieldDropdown.CORNER_RADIUS * 2;
		  var height = options.length * Blockly.ContextMenu.Y_HEIGHT +
		               Blockly.FieldDropdown.CORNER_RADIUS + 1;
		  svgShadow.setAttribute('width', width);
		  svgShadow.setAttribute('height', height);
		  svgBackground.setAttribute('width', width);
		  svgBackground.setAttribute('height', height);
		  //var hexColour = Blockly.makeColour(this.block_.getColourH(), this.block_.getColourS(), this.block_.getColourV());
		  var hexColour = Blockly.makeColour(this.sourceBlock_.getColourH(), this.sourceBlock_.getColourS(), this.sourceBlock_.getColourV());
		  svgBackground.setAttribute('fill', hexColour);
		  // Position the dropdown to line up with the field.
		  var xy = Blockly.getSvgXY_(/** @type {!Element} */ (this.borderRect_));
		  var borderBBox = this.borderRect_.getBBox();
		  var x;
		  if (Blockly.RTL) {
		    x = xy.x - maxWidth + Blockly.ContextMenu.X_PADDING + borderBBox.width -
		        Blockly.BlockSvg.SEP_SPACE_X / 2;
		  } else {
		    x = xy.x - Blockly.ContextMenu.X_PADDING + Blockly.BlockSvg.SEP_SPACE_X / 2;
		  }
		  svgGroup.setAttribute('transform',
		      'translate(' + x + ', ' + (xy.y + borderBBox.height) + ')');
		};
	       //**********************************************************************************************************************
	      
	      
	      Blockly.FieldDropdown.prototype.setText = function(text) {
	  if (this.sourceBlock_) {
	    // Update arrow's colour.
	     //var hexColour = Blockly.makeColour(this.block_.getColourH(), this.block_.getColourS(), this.block_.getColourV());
	    this.arrow_.style.fill = Blockly.makeColour(this.sourceBlock_.getColourH(), this.sourceBlock_.getColourS(), this.sourceBlock_.getColourV());
	  }
	  if (text === null) {
	    // No change if null.
	    return;
	  }
	  this.text_ = text;
	  // Empty the text element.
	  goog.dom.removeChildren(/** @type {!Element} */ (this.textElement_));
	  // Replace whitespace with non-breaking spaces so the text doesn't collapse.
	  text = text.replace(/\s/g, Blockly.Field.NBSP);
	  if (!text) {
	    // Prevent the field from disappearing if empty.
	    text = Blockly.Field.NBSP;
	  }
	  var textNode = document.createTextNode(text);
	  this.textElement_.appendChild(textNode);
	
	  // Insert dropdown arrow.
	  if (Blockly.RTL) {
	    this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild);
	  } else {
	    this.textElement_.appendChild(this.arrow_);
	  }
	
	  // Cached width is obsolete.  Clear it.
	  this.size_.width = 0;
	
	  if (this.sourceBlock_ && this.sourceBlock_.rendered) {
	    this.sourceBlock_.render();
	    this.sourceBlock_.bumpNeighbours_();
	    this.sourceBlock_.workspace.fireChangeEvent();
	  }
	};
      
      //***********************************************************************************************************************
     
     var default_procedure = false;
/**
 * Ensure two identically-named procedures don't exist.
 * @param {string} name Proposed procedure name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.Procedures.findLegalName = function(name, block) {
  if (block.isInFlyout) {
    // Flyouts can have multiple procedures called 'procedure'.
    return name;
  }
  while (!Blockly.Procedures.isLegalName(name, block.workspace, block)) {
    // Collision with another procedure.
    var r = name.match(/^(.*?)(\d+)$/);
    if (!r) {
      if (default_procedure) { name+= 'name'; default_procedure = false;}
      name += '2';
    } else {
      name = r[1] + (parseInt(r[2], 10) + 1);
    }
  }
  return name;
};
      
      
      /**
 * Does this procedure have a legal name?  Illegal names include names of
 * procedures already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 */
Blockly.Procedures.isLegalName = function(name, workspace, opt_exclude) {
	if (name === "") { default_procedure = true; return false;}
  var blocks = workspace.getAllBlocks();
  // Iterate through every block and check the name.
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x] == opt_exclude) {
      continue;
    }
    var func = blocks[x].getProcedureDef;
    if (func) {
      var procName = func.call(blocks[x]);
      if (Blockly.Names.equals(procName[0], name)) {
        return false;
      }
    }
  }
  return true;
};


/**
 * Handle a mouse-down on an SVG block.
 * @param {!Event} e Mouse down event.
 * @private
 */
Blockly.Block.prototype.onMouseDown_ = function(e) {
  if (this.isInFlyout) {
    return;
  }
  // Update Blockly's knowledge of its own location.
  Blockly.svgResize();
  Blockly.Block.terminateDrag_();
  this.select();
  Blockly.hideChaff();
  if (Blockly.isRightButton(e)) {
    // Right-click.
    if (Blockly.ContextMenu) {
      this.showContextMenu_(e.clientX, e.clientY);
    }
  } else if (!this.movable) {
    // Allow unmovable blocks to be selected and context menued, but not
    // dragged.  Let this event bubble up to document, so the workspace may be
    // dragged instead.
    //var x = this.startDragX + dx;
    //var y = this.startDragY + dy;
    
    var x = 450;
    var y = 100;
    this.svg_.getRootElement().setAttribute('transform',
        'translate(' + x + ', ' + y + ')');
    // Drag all the nested bubbles.
    /*for (var i = 0; i < this.draggedBubbles_.length; i++) {
      var commentData = this.draggedBubbles_[i];
      commentData.bubble.setIconLocation(commentData.x + dx,
                                         commentData.y + dy);
    }*/
    return;
  } else {
    // Left-click (or middle click)
    Blockly.removeAllRanges();
    Blockly.setCursorHand_(true);
    // Look up the current translation and record it.
    var xy = this.getRelativeToSurfaceXY();
    this.startDragX = xy.x;
    this.startDragY = xy.y;
    // Record the current mouse position.
    this.startDragMouseX = e.clientX;
    this.startDragMouseY = e.clientY;
    Blockly.Block.dragMode_ = 1;
    Blockly.Block.onMouseUpWrapper_ = Blockly.bindEvent_(document,
        'mouseup', this, this.onMouseUp_);
    Blockly.Block.onMouseMoveWrapper_ = Blockly.bindEvent_(document,
        'mousemove', this, this.onMouseMove_);
    // Build a list of comments that need to be moved and where they started.
    this.draggedBubbles_ = [];
    var descendants = this.getDescendants();
    for (var x = 0, descendant; descendant = descendants[x]; x++) {
      if (descendant.mutator) {
        var data = descendant.mutator.getIconLocation();
        data.bubble = descendant.mutator;
        this.draggedBubbles_.push(data);
      }
      if (descendant.comment) {
        var data = descendant.comment.getIconLocation();
        data.bubble = descendant.comment;
        this.draggedBubbles_.push(data);
      }
      if (descendant.warning) {
        var data = descendant.warning.getIconLocation();
        data.bubble = descendant.warning;
        this.draggedBubbles_.push(data);
      }
    }
  }
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
};


}



//-------------------------------------------------------------------------------------
// Control Tooltip code2
//-------------------------------------------------------------------------------------
function controlTooltip2() {
	Blockly.Tooltip.svgImg_ = null;  
	Blockly.Tooltip.svgBody_ = null;
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
  if (!Blockly.Tooltip.element_ || !Blockly.Tooltip.element_.tooltip) {
    // No tooltip here to show.
 	 return;
  } else if ((Blockly.ContextMenu && Blockly.ContextMenu.visible) || Blockly.Block.dragMode_ != 0 ) {
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
  
  var line = "Preview";
  
  var tspanElement = Blockly.createSvgElement('tspan',
        {'dy': '2em', 'x': 25}, Blockly.Tooltip.svgText_);
  var textNode = document.createTextNode(line);
  tspanElement.appendChild(textNode);
 
  
  // Display the tooltip.
  
  Blockly.Tooltip.svgOutfit_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/'+ tipImg + '.png');
  Blockly.Tooltip.visible = true;
  Blockly.Tooltip.svgGroup_.style.display = 'block';
  // Resize the background and shadow to fit.
  var bBox = Blockly.Tooltip.svgImg_.getBBox();
  var width = 0.2 * Blockly.Tooltip.MARGINS + bBox.width;
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


Blockly.Tooltip.createDom = function() {
  /*
  <g class="blocklyHidden">
    <rect class="blocklyTooltipShadow" x="2" y="2"/>
    <rect class="blocklyTooltipBackground"/>
    <text class="blocklyTooltipText"></text>
  </g>
  */
  var svgGroup = /** @type {!SVGGElement} */ (
      Blockly.createSvgElement('g', {'class': 'blocklyHidden'}, null));
      
  Blockly.Tooltip.svgGroup_ = svgGroup;
  Blockly.Tooltip.svgShadow_ = /** @type {!SVGRectElement} */ (
      Blockly.createSvgElement(
          'rect', {'class': 'blocklyTooltipShadow', 'x': 2, 'y': 2}, svgGroup));
  Blockly.Tooltip.svgBackground_ = /** @type {!SVGRectElement} */ (
      Blockly.createSvgElement(
          'rect', {'class': 'blocklyTooltipBackground'}, svgGroup));
  Blockly.Tooltip.svgText_ = /** @type {!SVGTextElement} */ (
      Blockly.createSvgElement(
          'text', {'class': 'blocklyTooltipText'}, svgGroup));
          
  //Blockly.Tooltip.svgText_.setAttributeNS('http://www.w3.org/1999/xlink', '', 'Preview');
  
  Blockly.Tooltip.svgImg_ = /** @type {!SVGTextElement} */ (
      Blockly.createSvgElement(
          'image',{'width': 300, 'height': 400} , svgGroup));
  
  //Blockly.Tooltip.svgImg_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/rosie.png');
    
  Blockly.Tooltip.svgOutfit_ = /** @type {!SVGTextElement} */ (
      Blockly.createSvgElement(
          'image',{'width': 300, 'height': 400} , svgGroup));
          
  
          
  
  return svgGroup;
};
}