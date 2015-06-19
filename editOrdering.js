//新增一個按鈕，可以將時間設為0700~2330
var target = document.querySelector("body > center > form > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)")
, btn = document.createElement("button");
btn.innerText = "0700~2330";
btn.type = "button";
btn.onclick = function(e){
  var td = this.parentElement;
  td.querySelector("[name='d'] > [value='7']").selected = true;
  td.querySelector("[name='e'] > [value='0']").selected = true;
  td.querySelector("[name='i'] > [value='23']").selected = true;
  td.querySelector("[name='j'] > [value='30']").selected = true;
}
target.appendChild(btn);

//新增一個按鈕，可以將時間設為~2330
var target = document.querySelector("body > center > form > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)")
, btn = document.createElement("button");
btn.innerText = "2330";
btn.type = "button";
btn.onclick = function(e){
  var td = this.parentElement;
  td.querySelector("[name='i'] > [value='23']").selected = true;
  td.querySelector("[name='j'] > [value='30']").selected = true;
}
target.appendChild(btn);