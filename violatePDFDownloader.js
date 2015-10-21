const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var plugin = document.createElement("div"),
year = document.createElement("input"),
month = document.createElement("input"),
date = document.createElement("input"),
download = document.createElement("input");
year.placeholder = "年(西元)";
month.placeholder = "月";
date.placeholder = "日";
download.type = "button";
download.value = "批量下載";
download.onclick = function() {
  var a = document.createElement("a"),
  curMonth = (new Date).getMonth + 1,
  tarMonth = month.value;
  for(var b = curMonth; b <= tarMonth; b++) {
    var max = date.value;
    if(tarMonth > curMonth) max = days[curMonth - 1]
    for(var c = (new Date).getDate(); c < max; c++) {
      a.href = `http://activity.ncue.edu.tw/~eoffice/area/violate_pdf.php?date=${year.value}-${b}-${c}`;
      a.download = `${year.value}-${b}-${c}.pdf`;
      console.log(`${year.value}-${b}-${c}.pdf`);
      //a.click();
    }
  }
}
plugin.appendChild(year);
plugin.appendChild(month);
plugin.appendChild(date);
plugin.appendChild(download);

document.querySelector("body > center").appendChild(plugin);
