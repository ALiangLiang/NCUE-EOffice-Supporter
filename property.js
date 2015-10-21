var a = document.querySelector("body > center > form > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)");
var type = ["文具", "食物", "器材"];
for (var i = 0; i < type.length; i++) {
  var btn = document.createElement("button");
	btn.innerText = type[i];
	btn.type = "button";
	btn.onclick = function () {
		a.children[0].children[0].value = this.innerText + "-";
	}
	a.appendChild(btn);
}

document.querySelector("#owner").value = "周旭恩";