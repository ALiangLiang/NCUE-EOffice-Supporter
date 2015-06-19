//新增一個按鈕，將社團設為農服
var target = document.querySelector("body > center > form > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)")
, form = document.querySelector("body > center > form")
, btn = document.createElement("button")
, td = document.createElement("button");
btn.innerText = "農服";
btn.type = "button";
btn.onclick = function(e){
  form.subtype.options[0] = new Option("農村服務社","5");
  form.subtype.value = "5";
}
target.appendChild(btn);

//新增一個按鈕，可以將時間設為0700~2330
var target = document.querySelector("body > center > form > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)")
, btn = document.createElement("button");
btn.innerText = "0700~2330";
btn.type = "button";
btn.onclick = function(e){
  var td = this.parentElement;
  td.querySelector("[name='d[0]'][id='d[0]'] > [value='7']").selected = true;
  td.querySelector("[name='e[0]'][id='e[0]'] > [value='0']").selected = true;
  td.querySelector("[name='i[0]'][id='i[0]'] > [value='23']").selected = true;
  td.querySelector("[name='j[0]'][id='j[0]'] > [value='30']").selected = true;
}
target.appendChild(btn);

//新增一個按鈕，可以將時間設為~2330
var target = document.querySelector("body > center > form > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)")
, btn = document.createElement("button");
btn.innerText = "2330";
btn.type = "button";
btn.onclick = function(e){
  var td = this.parentElement;
  td.querySelector("[name='i[0]'][id='i[0]'] > [value='23']").selected = true;
  td.querySelector("[name='j[0]'][id='j[0]'] > [value='30']").selected = true;
}
target.appendChild(btn);