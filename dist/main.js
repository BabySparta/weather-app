(()=>{"use strict";async function e(e){const t=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e}&APPID=07d6d743abf155d07011e87ead210d57`,{mode:"cors"});return await t.json()}function t(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function n(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function r(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function o(e,o){const c=function(e){return t(1,arguments),n(1e3*r(e))}(e+o).toUTCString();return c}function c(e){const t=e.split(" ")[4].split(":"),n=t[0]+":"+t[1];return t[0]<13?"00"===t[0]?"12:"+t[1]+" AM":t[0]<10?t[0].charAt(1)+":"+t[1]+" AM":n+" AM":t[0]-12+":"+t[1]+" PM"}function a(e,t){const n=document.querySelector(".futureContainer");n.textContent="",i(24,n);const r=Array.from(document.querySelectorAll(".cell"));r.forEach((n=>{!function(e,t,n,r){const a=n.children,i=c(o(t.hourly[e].dt,t.timezone_offset));a.item(0).textContent=i;const s=t.hourly[e].weather[0].icon,l=`http://openweathermap.org/img/wn/${s}@2x.png`;a.item(1).alt=s,a.item(1).src=l;let u="°F";u="metric"===r?"°C":"°F";const d=t.hourly[e].temp,m=String(d).split(".")[0];a.item(2).textContent=m+u;const p=t.hourly[e].pop,y=Math.round(p);a.item(3).textContent=y+"%"}(r.indexOf(n),e,n,t)}))}function i(e,t){for(let n=0;n<e;n++){const e=document.createElement("div");e.classList.add("cell");const n=document.createElement("div");n.classList.add("cellTxt");const r=document.createElement("img");r.classList.add("weatherIcon");const o=document.createElement("div");o.classList.add("cellTxt");const c=document.createElement("div");c.classList.add("cellTxt"),e.appendChild(n),e.appendChild(r),e.appendChild(o),e.appendChild(c),t.appendChild(e)}}let s="imperial",l="New+York,US";async function u(t,n){try{const r=await async function(t,n){const r=await e(t);return await async function(e,t,n){const r=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${e}&lon=${t}&exclude=minutely,alerts&units=${n}&appid=07d6d743abf155d07011e87ead210d57`);return await r.json()}(r.coord.lat,r.coord.lon,n)}(t,n),s=await e(t);(function(e,t,n){const r=document.querySelector(".city"),a=document.querySelector(".temp"),i=document.querySelector(".feelsLike"),s=document.querySelector(".humidity"),l=document.querySelector(".windSpeed"),u=document.querySelector(".weather"),d=document.querySelector(".date"),m=document.querySelector(".time"),p=document.querySelector(".pop"),y=document.querySelector(".weatherDesc"),h=document.querySelector(".sunrise"),f=document.querySelector(".sunset"),g=document.querySelector(".comp"),S=document.querySelector(".high"),w=document.querySelector(".low"),x=e.current,C=x.weather[0];!function(e){const t=document.querySelector(".current"),n=e.id,r=parseInt(n.toString()[0]);2===r&&(t.style.backgroundImage="url(./resources/thunderstorm.png)"),3!==r&&5!==r||(t.style.backgroundImage="url(./resources/rainy.jpg)"),6===r&&(t.style.backgroundImage="url(./resources/snowy.jpg)"),800===n&&(t.style.backgroundImage="url(./resources/clear.jpg)"),801!==n&&802!==n||(t.style.backgroundImage="url(./resources/partly-cloudy.jpg)"),803!==n&&804!==n||(t.style.backgroundImage="url(./resources/cloudy.jpg)")}(C);const q=o(x.dt,e.timezone_offset),b=String(x.temp).split(".")[0],v=String(x.feels_like).split(".")[0];let A=Math.round(x.wind_speed),k="°F",E="m/h";"metric"===n?(k="°C",E="km/h",A=Math.round(3.6*A)):(k="°F",E="m/h"),r.textContent=t,a.textContent=b+k,i.textContent=v+k,s.textContent=x.humidity+"%",l.textContent=A+E,u.textContent=C.main,y.textContent="The weather is: "+C.description,d.textContent=function(e){const t=e.split(" ");let n=t[1];return n<10&&(n=n.charAt(1)),1===n.charAt(-1)&&(n+="st"),2===n.charAt(-1)&&(n+="nd"),3===n.charAt(-1)?n+="rd":n+="th",t[0]+" "+t[2]+" "+n+" "+t[3]}(q),m.textContent=c(q),p.textContent=e.daily[0].pop+"%",h.textContent=c(o(x.sunrise,e.timezone_offset)),f.textContent=c(o(x.sunset,e.timezone_offset)),g.textContent="Temperature tommorrow will be "+function(e){const t=e.daily[0].temp.day,n=e.daily[1].temp.day;return Math.abs(t-n)<=5?"similar to today":t>n?"colder than today":"warmer than today"}(e),S.textContent=String(e.daily[0].temp.max).split(".")[0],w.textContent=String(e.daily[0].temp.min).split(".")[0]})(r,s.name,n),a(r,n),p.addEventListener("click",(()=>{d(p),a(r,n)})),y.addEventListener("click",(()=>{d(y),function(e){const t=document.querySelector(".futureContainer");t.textContent="",i(7,t);const n=Array.from(document.querySelectorAll(".cell"));n.forEach((t=>{!function(e,t,n){const r=n.children,c=o(t.daily[e].dt,t.timezone_offset).split(",")[0];r.item(0).textContent=function(e){return"Sun"===e||"Mon"===e||"Fri"===e?e+"day":"Tue"===e?e+"sday":"Wed"===e?e+"nesday":"Thu"===e?e+"rsday":"Sat"===e?e+"urday":void 0}(c);const a=t.daily[e].weather[0].icon,i=`http://openweathermap.org/img/wn/${a}@2x.png`;r.item(1).alt=a,r.item(1).src=i;const s=t.daily[e].temp.max,l=t.daily[e].temp.min,u=String(s).split(".")[0],d=String(l).split(".")[0];r.item(2).textContent=d+"° | "+u+"°";const m=t.daily[e].pop,p=Math.round(m);r.item(3).textContent=p+"%"}(n.indexOf(t),e,t)}))}(r)})),document.querySelector(".error-message").style.visibility="hidden",document.querySelector(".loadWrap").style.display="none"}catch(e){document.querySelector(".error-message").style.visibility="visible"}}function d(e){p.classList.remove("active"),y.classList.remove("active"),e.classList.add("active")}const m=Array.from(document.querySelectorAll(".tab")),p=m[0],y=m[1];document.querySelector(".checkbox").addEventListener("change",(()=>{s="imperial"===s?"metric":"imperial",document.querySelector(".loadWrap").style.display="flex",u(l,s)}));const h=document.querySelector("form");h.addEventListener("submit",(()=>{event.preventDefault(),document.querySelector(".loadWrap").style.display="flex";const e=function(e){let t=document.querySelector(".search").value.trim();return t=t.replace(/\s*,\s*/g,","),t=t.replace(" ","+"),t}();l=e,u(e,s),h.reset()})),u(l,s)})();