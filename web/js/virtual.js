/**
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Object representing a trash can icon.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Virtual');

goog.require('goog.Timer');


/**
 * Class for a trash can.
 * @param {!Blockly.Workspace} workspace The workspace to sit in.
 * @constructor
 */
Blockly.Virtual = function(workspace) {
  this.workspace_ = workspace;
};

/**
 * URL of the trashcan image (minus lid).
 * @type {string}
 * @private
 */
Blockly.Virtual.prototype.BODY_URL_ = '../images/virtualSep.png';

/**
 * URL of the lid image.
 * @type {string}
 * @private
 */
//Blockly.Trashcan.prototype.LID_URL_ = 'media/trashlid.png';

/**
 * Width of both the trash can and lid images.
 * @type {number}
 * @private
 */
Blockly.Virtual.prototype.WIDTH_ = 270;

/**
 * Height of the trashcan image (minus lid).
 * @type {number}
 * @private
 */
Blockly.Virtual.prototype.BODY_HEIGHT_ = 570;

/**
 * Height of the lid image.
 * @type {number}
 * @private
 */
//Blockly.Trashcan.prototype.LID_HEIGHT_ = 15;

/**
 * Distance between trashcan and bottom edge of workspace.
 * @type {number}
 * @private
 */
//Blockly.Trashcan.prototype.MARGIN_BOTTOM_ = 35;

/**
 * Distance between trashcan and right edge of workspace.
 * @type {number}
 * @private
 */
Blockly.Virtual.prototype.MARGIN_SIDE_ = 35;

/**
 * Current open/close state of the lid.
 * @type {boolean}
 */
//Blockly.Trashcan.prototype.isOpen = false;

/**
 * The SVG group containing the trash can.
 * @type {Element}
 * @private
 */
Blockly.Virtual.prototype.svgGroup_ = null;

/**
 * The SVG image element of the trash can body.
 * @type {Element}
 * @private
 */
Blockly.Virtual.prototype.svgBody_ = null;

/**
 * The SVG image element of the trash can lid.
 * @type {Element}
 * @private
 */
//Blockly.Trashcan.prototype.svgLid_ = null;

/**
 * Task ID of opening/closing animation.
 * @type {number}
 * @private
 */
//Blockly.Trashcan.prototype.lidTask_ = 0;

/**
 * Current angle of the lid.
 * @type {number}
 * @private
 */
//Blockly.Trashcan.prototype.lidAngle_ = 0;

/**
 * Left coordinate of the trash can.
 * @type {number}
 * @private
 */
Blockly.Virtual.prototype.left_ = 0;

/**
 * Top coordinate of the trash can.
 * @type {number}
 * @private
 */
Blockly.Virtual.prototype.top_ = 0;

/**
 * Create the trash can elements.
 * @return {!Element} The trash can's SVG group.
 */
Blockly.Virtual.prototype.createDom = function() {
  this.svgGroup_ = Blockly.createSvgElement('g',
      {'filter': 'url(#blocklyTrashcanShadowFilter)'}, null);
  this.svgBody_ = Blockly.createSvgElement('image',
      {'width': this.WIDTH_, 'height': this.BODY_HEIGHT_},
      this.svgGroup_);
  this.svgBody_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
      Blockly.pathToBlockly + this.BODY_URL_);
  this.svgBody_.setAttribute('y', 30);
  this.svgBody_.setAttribute('x', 600);
  //this.svgLid_ = Blockly.createSvgElement('image',
  //    {'width': this.WIDTH_, 'height': this.LID_HEIGHT_},
  //    this.svgGroup_);
  //this.svgLid_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
  //    Blockly.pathToBlockly + this.LID_URL_);
  return this.svgGroup_;
};

/**
 * Initialize the trash can.
 */
Blockly.Virtual.prototype.init = function() {
  //this.setOpen_(false);
  //this.position_();
  // If the document resizes, reposition the trash can.
  Blockly.bindEvent_(window, 'resize', this, this.position_);
};

/**
 * Dispose of this trash can.
 * Unlink from all DOM elements to prevent memory leaks.
 */
Blockly.Virtual.prototype.dispose = function() {
  if (this.svgGroup_) {
    goog.dom.removeNode(this.svgGroup_);
    this.svgGroup_ = null;
  }
  this.svgBody_ = null;
  //this.svgLid_ = null;
  this.workspace_ = null;
  //goog.Timer.clear(this.lidTask_);
};

/**
 * Move the trash can to the bottom-right corner.
 * @private
 */
Blockly.Virtual.prototype.position_ = function() {
  var metrics = this.workspace_.getMetrics();
  if (!metrics) {
    // There are no metrics available (workspace is probably not visible).
    return;
  }
  if (Blockly.RTL) {
    this.left_ = this.MARGIN_SIDE_;
  } else {
    this.left_ = metrics.viewWidth + metrics.absoluteLeft -
        this.WIDTH_ - this.MARGIN_SIDE_;
  }
  this.top_ = metrics.viewHeight + metrics.absoluteTop -
      (this.BODY_HEIGHT_ ) - this.MARGIN_BOTTOM_;
  this.svgGroup_.setAttribute('transform',
      'translate(' + this.left_ + ',' + this.top_ + ')');
};