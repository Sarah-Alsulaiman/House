function UpdateBlocklyCode() {
	Blockly.Css.CONTENT2 = [
		  '.blocklySelected>.blocklyPath {',
		  '  stroke-width: 4px;',
		  '  stroke: #fc3;',
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
		
		  var addScrollbars = true;
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
		  //if (Blockly.hasVirtual ) {
		    this.virtual = new Blockly.Virtual(this);
		    var svgVirtual = this.virtual.createDom();
		    this.svgGroup_.insertBefore(svgVirtual, this.svgBlockCanvas_);
		    //this.virtual.init();
		  //}
		  
		  //else {
		  	//console.log("NONONONONO!!!!");
		  //}
		  
		  /*var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute('style', 'border: 10px solid black');
			svg.setAttribute('width', '600');
			svg.setAttribute('height', '250');
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
			//document.body.appendChild(svg);
			
			this.svgGroup_.insertBefore(svg, this.svgBlockCanvas_);*/
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
      name += '1';
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


}
