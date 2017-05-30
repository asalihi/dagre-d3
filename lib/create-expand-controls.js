"use strict";

var d3 = require("./d3");

module.exports = addExpandControl;

function addExpandControl(root, node, type) {
  var expandControlSvg = root.append("g");
  appendExpandControlHtml(expandControlSvg, node, type);
  var expandControlBBox = expandControlSvg.node().getBBox();
  var y;
  switch(type) {
    case 'up':
      y = (-node.height/2) - expandControlBBox.height;
      break;
    case 'down':
      y = ((+node.height + (node.expandUpHeight || 0))/2) - (node.expandUpHeight || 0);
      break;
  }
  expandControlSvg.attr("transform", "translate(" + (-expandControlBBox.width / 2) + "," + y + ")");
  return expandControlSvg;
}

function appendExpandControlHtml(root, node, type) {
  var fo = root.append("foreignObject")
               .attr("width", "100000");

  var div = fo.append("xhtml:div");

  div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  div.html('<a class=\"btn btn-default btn-sm\" style=\"padding: 0px\"><i class=\"fa fa-caret-square-o-' + type + ' fa-2x\"></i></a>');
  div.style("display", "inline-block");
  // Fix for firefox
  div.style("white-space", "nowrap");

  var client = div._groups[0][0].getBoundingClientRect();
  fo.attr("width", client.width)
    .attr("height", client.height);
}
