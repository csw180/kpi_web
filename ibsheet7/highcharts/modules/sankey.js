/*
 Highcharts JS v7.2.1 (2019-10-31)

 Sankey diagram module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/sankey",["highcharts"],function(r){b(r);b.Highcharts=r;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function r(g,b,w,I){g.hasOwnProperty(b)||(g[b]=I.apply(null,w))}b=b?b._modules:{};r(b,"mixins/nodes.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(g,b){var w=b.defined,p=b.extend,t=b.pick,m=g.Point;g.NodesMixin=
{createNode:function(b){function l(a,c){return g.find(a,function(a){return a.id===c})}var a=l(this.nodes,b),q=this.pointClass;if(!a){var d=this.options.nodes&&l(this.options.nodes,b);a=(new q).init(this,p({className:"highcharts-node",isNode:!0,id:b,y:1},d));a.linksTo=[];a.linksFrom=[];a.formatPrefix="node";a.name=a.name||a.options.id;a.mass=t(a.options.mass,a.options.marker&&a.options.marker.radius,this.options.marker&&this.options.marker.radius,4);a.getSum=function(){var d=0,c=0;a.linksTo.forEach(function(a){d+=
a.weight});a.linksFrom.forEach(function(a){c+=a.weight});return Math.max(d,c)};a.offset=function(d,c){for(var k=0,e=0;e<a[c].length;e++){if(a[c][e]===d)return k;k+=a[c][e].weight}};a.hasShape=function(){var d=0;a.linksTo.forEach(function(a){a.outgoing&&d++});return!a.linksTo.length||d!==a.linksTo.length};this.nodes.push(a)}return a},generatePoints:function(){var b=this.chart,l={};g.Series.prototype.generatePoints.call(this);this.nodes||(this.nodes=[]);this.colorCounter=0;this.nodes.forEach(function(a){a.linksFrom.length=
0;a.linksTo.length=0;a.level=void 0});this.points.forEach(function(a){w(a.from)&&(l[a.from]||(l[a.from]=this.createNode(a.from)),l[a.from].linksFrom.push(a),a.fromNode=l[a.from],b.styledMode?a.colorIndex=t(a.options.colorIndex,l[a.from].colorIndex):a.color=a.options.color||l[a.from].color);w(a.to)&&(l[a.to]||(l[a.to]=this.createNode(a.to)),l[a.to].linksTo.push(a),a.toNode=l[a.to]);a.name=a.name||a.id},this);this.nodeLookup=l},setData:function(){this.nodes&&(this.nodes.forEach(function(b){b.destroy()}),
this.nodes.length=0);g.Series.prototype.setData.apply(this,arguments)},destroy:function(){this.data=[].concat(this.points||[],this.nodes);return g.Series.prototype.destroy.apply(this,arguments)},setNodeState:function(b){var g=arguments,a=this.isNode?this.linksTo.concat(this.linksFrom):[this.fromNode,this.toNode];"select"!==b&&a.forEach(function(a){a.series&&(m.prototype.setState.apply(a,g),a.isNode||(a.fromNode.graphic&&m.prototype.setState.apply(a.fromNode,g),a.toNode.graphic&&m.prototype.setState.apply(a.toNode,
g)))});m.prototype.setState.apply(this,g)}}});r(b,"mixins/tree-series.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,p){var g=p.extend,r=p.isArray,t=p.isNumber,m=p.isObject,v=p.pick,l=b.merge;return{getColor:function(a,q){var d=q.index,k=q.mapOptionsToLevel,c=q.parentColor,u=q.parentColorIndex,e=q.series,h=q.colors,n=q.siblings,f=e.points,g=e.chart.options.chart,x;if(a){f=f[a.i];a=k[a.level]||{};if(k=f&&a.colorByPoint){var l=f.index%(h?h.length:g.colorCount);var m=h&&h[l]}if(!e.chart.styledMode){h=
f&&f.options.color;g=a&&a.color;if(x=c)x=(x=a&&a.colorVariation)&&"brightness"===x.key?b.color(c).brighten(d/n*x.to).get():c;x=v(h,g,m,x,e.color)}var p=v(f&&f.options.colorIndex,a&&a.colorIndex,l,u,q.colorIndex)}return{color:x,colorIndex:p}},getLevelOptions:function(a){var b=null;if(m(a)){b={};var d=t(a.from)?a.from:1;var k=a.levels;var c={};var u=m(a.defaults)?a.defaults:{};r(k)&&(c=k.reduce(function(a,c){if(m(c)&&t(c.level)){var e=l({},c);var f="boolean"===typeof e.levelIsConstant?e.levelIsConstant:
u.levelIsConstant;delete e.levelIsConstant;delete e.level;c=c.level+(f?0:d-1);m(a[c])?g(a[c],e):a[c]=e}return a},{}));k=t(a.to)?a.to:1;for(a=0;a<=k;a++)b[a]=l({},u,m(c[a])?c[a]:{})}return b},setTreeValues:function k(b,d){var c=d.before,u=d.idRoot,e=d.mapIdToNode[u],h=d.points[b.i],n=h&&h.options||{},f=0,D=[];g(b,{levelDynamic:b.level-(("boolean"===typeof d.levelIsConstant?d.levelIsConstant:1)?0:e.level),name:v(h&&h.name,""),visible:u===b.id||("boolean"===typeof d.visible?d.visible:!1)});"function"===
typeof c&&(b=c(b,d));b.children.forEach(function(c,e){var u=g({},d);g(u,{index:e,siblings:b.children.length,visible:b.visible});c=k(c,u);D.push(c);c.visible&&(f+=c.val)});b.visible=0<f||b.visible;c=v(n.value,f);g(b,{children:D,childrenTotal:f,isLeaf:b.visible&&!f,val:c});return b},updateRootId:function(b){if(m(b)){var d=m(b.options)?b.options:{};d=v(b.rootNode,d.rootId,"");m(b.userOptions)&&(b.userOptions.rootId=d);b.rootNode=d}return d}}});r(b,"modules/sankey.src.js",[b["parts/Globals.js"],b["parts/Utilities.js"],
b["mixins/tree-series.js"]],function(b,p,r){var g=p.defined,t=p.isObject,m=p.pick,v=r.getLevelOptions,l=b.find,a=b.merge;p=b.seriesType;var q=b.Point;p("sankey","column",{borderWidth:0,colorByPoint:!0,curveFactor:.33,dataLabels:{enabled:!0,backgroundColor:"none",crop:!1,nodeFormat:void 0,nodeFormatter:function(){return this.point.name},format:void 0,formatter:function(){},inside:!0},inactiveOtherPoints:!0,linkOpacity:.5,minLinkWidth:0,nodeWidth:20,nodePadding:10,showInLegend:!1,states:{hover:{linkOpacity:1},
inactive:{linkOpacity:.1,opacity:.1,animation:{duration:50}}},tooltip:{followPointer:!0,headerFormat:'<span style="font-size: 10px">{series.name}</span><br/>',pointFormat:"{point.fromNode.name} \u2192 {point.toNode.name}: <b>{point.weight}</b><br/>",nodeFormat:"{point.name}: <b>{point.sum}</b><br/>"}},{isCartesian:!1,invertable:!0,forceDL:!0,orderNodes:!0,pointArrayMap:["from","to"],createNode:b.NodesMixin.createNode,setData:b.NodesMixin.setData,destroy:b.NodesMixin.destroy,getNodePadding:function(){return this.options.nodePadding},
createNodeColumn:function(){var a=this.chart,k=[],c=this.getNodePadding();k.sum=function(){return this.reduce(function(a,c){return a+c.getSum()},0)};k.offset=function(a,d){for(var e=0,u,f=0;f<k.length;f++){u=k[f].getSum()*d+c;if(k[f]===a)return{relativeTop:e+b.relativeLength(a.options.offset||0,u)};e+=u}};k.top=function(d){var b=this.reduce(function(a,b){0<a&&(a+=c);return a+=b.getSum()*d},0);return(a.plotSizeY-b)/2};return k},createNodeColumns:function(){var a=[];this.nodes.forEach(function(c){var b=
-1,d;if(!g(c.options.column))if(0===c.linksTo.length)c.column=0;else{for(d=0;d<c.linksTo.length;d++){var k=c.linksTo[0];if(k.fromNode.column>b){var n=k.fromNode;b=n.column}}c.column=b+1;n&&"hanging"===n.options.layout&&(c.hangsFrom=n,d=-1,l(n.linksFrom,function(a,b){(a=a.toNode===c)&&(d=b);return a}),c.column+=d)}a[c.column]||(a[c.column]=this.createNodeColumn());a[c.column].push(c)},this);for(var b=0;b<a.length;b++)void 0===a[b]&&(a[b]=this.createNodeColumn());return a},hasData:function(){return!!this.processedXData.length},
pointAttribs:function(a,k){var c=this,d=c.mapOptionsToLevel[(a.isNode?a.level:a.fromNode.level)||0]||{},e=a.options,h=d.states&&d.states[k]||{};k=["colorByPoint","borderColor","borderWidth","linkOpacity"].reduce(function(a,b){a[b]=m(h[b],e[b],d[b],c.options[b]);return a},{});var n=m(h.color,e.color,k.colorByPoint?a.color:d.color);return a.isNode?{fill:n,stroke:k.borderColor,"stroke-width":k.borderWidth}:{fill:b.color(n).setOpacity(k.linkOpacity).get()}},generatePoints:function(){function a(b,c){void 0===
b.level&&(b.level=c,b.linksFrom.forEach(function(b){a(b.toNode,c+1)}))}b.NodesMixin.generatePoints.apply(this,arguments);this.orderNodes&&(this.nodes.filter(function(a){return 0===a.linksTo.length}).forEach(function(b){a(b,0)}),b.stableSort(this.nodes,function(a,b){return a.level-b.level}))},translateNode:function(b,k){var c=this.translationFactor,d=this.chart,e=this.options,h=b.getSum(),n=Math.round(h*c),f=Math.round(e.borderWidth)%2/2,g=k.offset(b,c);k=Math.floor(m(g.absoluteTop,k.top(c)+g.relativeTop))+
f;f=Math.floor(this.colDistance*b.column+e.borderWidth/2)+f;f=d.inverted?d.plotSizeX-f:f;c=Math.round(this.nodeWidth);b.sum=h;b.shapeType="rect";b.nodeX=f;b.nodeY=k;b.shapeArgs=d.inverted?{x:f-c,y:d.plotSizeY-k-n,width:b.options.height||e.height||c,height:b.options.width||e.width||n}:{x:f,y:k,width:b.options.width||e.width||c,height:b.options.height||e.height||n};b.shapeArgs.display=b.hasShape()?"":"none";d=this.mapOptionsToLevel[b.level];e=b.options;e=t(e)?e.dataLabels:{};d=t(d)?d.dataLabels:{};
d=a({style:{}},d,e);b.dlOptions=d;b.plotY=1},translateLink:function(a){var b=a.fromNode,c=a.toNode,d=this.chart,e=this.translationFactor,h=Math.max(a.weight*e,this.options.minLinkWidth),n=this.options,f=b.offset(a,"linksFrom")*e,g=(d.inverted?-this.colDistance:this.colDistance)*n.curveFactor;f=b.nodeY+f;n=b.nodeX;e=this.nodeColumns[c.column].top(e)+c.offset(a,"linksTo")*e+this.nodeColumns[c.column].offset(c,e).relativeTop;var l=this.nodeWidth;c=c.column*this.colDistance;var m=a.outgoing,p=c>n;d.inverted&&
(f=d.plotSizeY-f,e=d.plotSizeY-e,c=d.plotSizeX-c,l=-l,h=-h,p=n>c);a.shapeType="path";a.linkBase=[f,f+h,e,e+h];if(p)a.shapeArgs={d:["M",n+l,f,"C",n+l+g,f,c-g,e,c,e,"L",c+(m?l:0),e+h/2,"L",c,e+h,"C",c-g,e+h,n+l+g,f+h,n+l,f+h,"z"]};else{g=c-20-h;m=c-20;p=c;var q=n+l,r=q+20,t=r+h,v=f,z=f+h,w=z+20;d=w+(d.plotHeight-f-h);var y=d+20,B=y+h,C=e,A=C+h,E=A+20,F=y+.7*h,G=p-.7*h,H=q+.7*h;a.shapeArgs={d:["M",q,v,"C",H,v,t,z-.7*h,t,w,"L",t,d,"C",t,F,H,B,q,B,"L",p,B,"C",G,B,g,F,g,d,"L",g,E,"C",g,A-.7*h,G,C,p,C,"L",
p,A,"C",m,A,m,A,m,E,"L",m,d,"C",m,y,m,y,p,y,"L",q,y,"C",r,y,r,y,r,d,"L",r,w,"C",r,z,r,z,q,z,"z"]}}a.dlBox={x:n+(c-n+l)/2,y:f+(e-f)/2,height:h,width:0};a.y=a.plotY=1;a.color||(a.color=b.color)},translate:function(){this.processedXData||this.processData();this.generatePoints();this.nodeColumns=this.createNodeColumns();this.nodeWidth=b.relativeLength(this.options.nodeWidth,this.chart.plotSizeX);var a=this,k=this.chart,c=this.options,g=this.nodeWidth,e=this.nodeColumns,h=this.getNodePadding();this.translationFactor=
e.reduce(function(a,b){return Math.min(a,(k.plotSizeY-c.borderWidth-(b.length-1)*h)/b.sum())},Infinity);this.colDistance=(k.plotSizeX-g-c.borderWidth)/Math.max(1,e.length-1);a.mapOptionsToLevel=v({from:1,levels:c.levels,to:e.length-1,defaults:{borderColor:c.borderColor,borderRadius:c.borderRadius,borderWidth:c.borderWidth,color:a.color,colorByPoint:c.colorByPoint,levelIsConstant:!0,linkColor:c.linkColor,linkLineWidth:c.linkLineWidth,linkOpacity:c.linkOpacity,states:c.states}});e.forEach(function(b){b.forEach(function(c){a.translateNode(c,
b)})},this);this.nodes.forEach(function(b){b.linksFrom.forEach(function(b){a.translateLink(b);b.allowShadow=!1})})},render:function(){var a=this.points;this.points=this.points.concat(this.nodes||[]);b.seriesTypes.column.prototype.render.call(this);this.points=a},animate:b.Series.prototype.animate},{applyOptions:function(a,b){q.prototype.applyOptions.call(this,a,b);g(this.options.level)&&(this.options.column=this.column=this.options.level);return this},setState:b.NodesMixin.setNodeState,getClassName:function(){return(this.isNode?
"highcharts-node ":"highcharts-link ")+q.prototype.getClassName.call(this)},isValid:function(){return this.isNode||"number"===typeof this.weight}});""});r(b,"masters/modules/sankey.src.js",[],function(){})});
//# sourceMappingURL=sankey.js.map