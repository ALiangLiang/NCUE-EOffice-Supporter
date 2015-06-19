//修復KEY IN 表單的按鈕
var cssQuerys = ["body > center > form > center > button", "body > center > form > table:nth-child(3) > tbody > tr > td > button"];
var btns = document.querySelectorAll(cssQuerys.join());
for (var i = 0; i < btns.length; i++) {
	btns[i].type = "button";
}

//複製貼上
var rightClickTarget;
document.querySelector("body > center > form > table:nth-child(3) > tbody").oncontextmenu = function (e) {
	rightClickTarget = e.path;
}
context.init({
	preventDoubleContext : false
});
context.attach('body > center > form > table:nth-child(3) > tbody > tr:not(.title) > td > acronym', [{
			header : 'Action'
		}, {
			text : 'Copy',
			action : function (e) {
				console.log(e);
				localStorage["clipboard"] = JSON.stringify(copy());
			}
		}
	]);
context.attach('body > center > form > table:nth-child(3) > tbody > tr:not(.title) > td:nth-child(2)', [{
			header : 'Action'
		}, {
			text : 'Paste',
			action : function (e) {
				paste();
				location.reload();
			}
		}
	]);
function copy() {
	var data;
	var timeRangeString = rightClickTarget[0].previousSibling.innerText,
	values = rightClickTarget[0].previousSibling.value.split("."),
	id = values[0],
	area = values[1],
	day = values[2].split("-"),
	times = rightClickTarget[0].innerText.match(/\d\d\:\d\d~\d\d\:\d\d/)[0].split("~"),
	startTime = times[0].split(":"),
	endTime = times[1].split(":"),
	a = day[0], //year
	b = day[1], //month
	c = day[2], //date
	d = startTime[0], //hour
	e = startTime[1], //min
	i = endTime[0], //hour
	j = endTime[1], //min
	reason = rightClickTarget[0].title;
	data = {
		"activity" : 2, // add
		"subtype" : id,
		"area[0]" : area,
		"a[0]" : a,
		"b[0]" : b,
		"c[0]" : c,
		"d[0]" : d,
		"e[0]" : e,
		"i[0]" : i,
		"j[0]" : j,
		"reason" : reason,
		"submit" : "確　　定"
	}
	return data;
}
function paste() {
	console.log(rightClickTarget[0]);
	var area;
	switch (rightClickTarget[0].previousSibling.innerText) {
	case "廣場":
		area = 1;
		break;
	case "階梯":
		area = 2;
		break;
	case "一廣":
		area = 3;
		break;
	case "二廣":
		area = 4;
		break;
	case "三廣":
		area = 5;
		break;
	case "才中":
		area = 6;
		break;
	case "演講廳":
		area = 7;
		break;
	case "202":
		area = 8;
		break;
	case "205":
		area = 9;
		break;
	case "307":
		area = 10;
		break;
	case "412":
		area = 11;
		break;
	case "頂樓":
		area = 12;
		break;
	}
	var data = JSON.parse(localStorage["clipboard"]);
	var days = document.querySelector("body > center > form > table:nth-child(3) > tbody > tr.title > td:nth-child(2) > div").innerText.match(/\d\d\/\d\d/)[0].split("/");
	data["area[0]"] = area;
	data["b[0]"] = Number(days[0]);
	data["c[0]"] = Number(days[1]);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://activity.ncue.edu.tw/~eoffice/area/reserve_m.php");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(JSON2URL(data));
}
function JSON2URL(JSON) {
	var URL = "",
	first = true;
	for (var i in JSON) {
		if (first)
			URL += i + "=" + JSON[i];
		else
			URL += "&" + i + "=" + JSON[i];
		first = false;
	}
	return URL;
}

//double click select
var acronyms = document.body.querySelectorAll("body > center > form > table:nth-child(3) > tbody > tr > td > acronym");
for (var i = 0; i < acronyms.length; i++) {
	acronyms[i].ondblclick = function (e) {
		this.previousSibling.checked = !this.previousSibling.checked;
		e.preventDefault();
	}
}

//multiple range
NodeList.prototype.split = function (cut) {
	var result = new Array();
	var temp = new Array();
	if (cut instanceof Node)
		cut = cut.nodeName;
	for (var i = 0; i < this.length; i++) {
		if (this[i].nodeName === cut.toUpperCase()) {
			result.push(temp);
			temp = new Array();
		} else
			temp.push(this[i]);
	}
	result.push(temp);
	return result;
}
var rangeTargets = document.querySelectorAll("body > center > form > table:nth-child(3) > tbody > tr > td:nth-child(2):not(:empty)");
var changedBars = {};
for (var i = 1; i < rangeTargets.length; i++) {
	var rangeTarget = rangeTargets[i];
	var children = rangeTarget.childNodes.split("BR");
	for (var t = 0; t < children.length; t++) {
		var bar = new RangeBar({
				values : (function () {
					var array = new Array();
					var times = children[t][1].innerText.match(/\d\d\:\d\d~\d\d\:\d\d/)[0].split("~");
					var startTime = times[0].split(":"),
					endTime = times[1].split(":");
					array.push(Array(Number(startTime[0]) + Number(startTime[1]) / 60, Number(endTime[0]) + Number(endTime[1]) / 60));
					return array;
				})(),
				readonly : false,
				min : 7,
				max : 23.5,
				valueFormat : function (a) {
					return a;
				},
				valueParse : function (a) {
					return a;
				},
				snap : 0.5,
				minSize : 0,
				maxRanges : 1,
				indicator : null,
				allowDelete : false,
				deleteTimeout : 5000,
				vertical : false,
				label : function (value) {
					var startTime = Math.floor(value[0] * 10) / 10,
					endTime = Math.floor(value[1] * 10) / 10;
					return "【" + startTime + " ~ " + endTime + "】 " + (endTime - startTime) + "h";
				},
				bounds : null,
				htmlLabel : false,
				allowSwap : true,
				barClass : 'progress',
				rangeClass : 'bar'
			});
		bar.$el[0].setAttribute("data-id", i + "-" + t);
		$(children[t][3]).after(bar.$el);
		bar.on('change', function (e, values, range) {
      var input = range[0].parentElement.previousSibling.previousSibling.previousSibling.previousSibling
			if(values[0][0] >= values[0][1]) input.checked = true;
      else input.checked = false;
			var id = range[0].parentElement.getAttribute("data-id");
			changedBars[id] = values[0];
		});
	}
}
var submit = document.createElement("button");
submit.innerText = "修改時間";
submit.type = "button";
submit.onclick = function () {
	for (var t in changedBars) {
    var bar = document.body.querySelector("[data-id='" + t + "']");
    var btn = bar.previousSibling.previousSibling.previousSibling;
		var values = btn.previousSibling.value.split(".");
    var reason = btn.title,
    id = values[0],
    date = values[2],
    old_start = btn.innerText.match(/\d\d\:\d\d~\d\d\:\d\d/)[0].split("~")[0] + ":00",
    old_deadline = btn.innerText.match(/\d\d\:\d\d~\d\d\:\d\d/)[0].split("~")[1] + ":00",
    old_area = values[1],
    d = Math.floor(changedBars[t][0]),
    e = min2string(changedBars[t][0]),
    i = Math.floor(changedBars[t][1]),
    j = min2string(changedBars[t][1]);
		var data;
    if(changedBars[t][0] < changedBars[t][1])
      data = {
        "activity" : 2, // add
        "subtype" : id,
        "area" : old_area,
        "d" : d,
        "e" : e,
        "i" : i,
        "j" : j,
        "reason" : reason,
        "submit" : "確　　定",
        "serial" : id,
        "date" : date,
        "old_start" : old_start,
        "old_deadline" : old_deadline,
        "old_area" : old_area
      };
     else
       data = {
        "del[]" : (function(){return document.body.querySelector("[name='del[]']").value})(), 
        "submit" : "刪除",
        "value" : (function(){return document.body.querySelector("[name=value]").value})(),
        "date" : (function(){return document.body.querySelector("[name=date]").value})()
      };
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://activity.ncue.edu.tw/~eoffice/area/edit_m.php");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log(data);
    console.log(JSON2URL(data));
		xhr.send(JSON2URL(data));
	}
  setTimeout(function(){document.forms[0].submit.click();}, 1000);
}
document.querySelector("body > center > form > p:nth-child(4)").appendChild(submit);
var btn = document.createElement("button");
btn.type = "button";
btn.innerText = "隱藏 Range Bar";
btn.setAttribute("data-hide", "false");
btn.onclick = function(){
  var bars = document.body.querySelectorAll("[data-id]");
  for(var i = 0; i < bars.length; i++) {
    if(JSON.parse(this.getAttribute("data-hide"))) bars[i].style["display"] = "block";
    else bars[i].style["display"] = "none";
  }
  console.log(JSON.parse(this.getAttribute("data-hide")));
  if(JSON.parse(this.getAttribute("data-hide"))) {
    this.setAttribute("data-hide", "false");
    this.innerText = "隱藏 Range Bar";
  } else {
    this.setAttribute("data-hide", "true");
    this.innerText = "顯示 Range Bar";
  }
}
document.querySelector("body > center > form > p:nth-child(4)").appendChild(submit);
document.querySelector("body > center > form > p:nth-child(4)").appendChild(btn);
function min2string(min) {
  switch(min % 1) {
    case 0.5: return "30";
    case 0: return "00";
    default: console.error("wrong minute");break;
  }
}