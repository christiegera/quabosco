// Shared helpers for every hub page. Counselor data lives in this browser only.
(function(){
var KEY="quabosco-hub-v1";
var H={};
try{H=JSON.parse(localStorage.getItem(KEY))||{};}catch(e){H={};}
H.sign=H.sign||{michael:{},peter:{}};   // counselor sign-offs: scout -> reqKey -> date
H.chk=H.chk||{};                        // checklist ticks: listId -> {index:true}
H.notes=H.notes||{};                    // free text: id -> string
H.imports=H.imports||{};                // scout -> last progress code they sent
function save(){try{localStorage.setItem(KEY,JSON.stringify(H));}catch(e){}}

var SCOUTS=[{id:"michael",name:"Michael"},{id:"peter",name:"Peter"}];
var BY={};
(window.BADGES||[]).forEach(function(b){b.reqs.forEach(function(g){g.items.forEach(function(it){
  BY[b.id+"__"+it[0]]={b:b,g:g,it:it,code:shortName(b.id)+" "+it[0],text:it[1]||g.h};});});});
function shortName(id){return {movie:"MM",dt:"DT",comm:"COM",ga:"GA",citc:"CitC"}[id]||id;}

function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

// Progress for one scout on one badge. "Do ONE/TWO" groups count only the number required.
function units(b,isDone){
  var need=0,got=0;
  b.reqs.forEach(function(g){
    var d=g.items.filter(function(it){return isDone(b.id+"__"+it[0]);}).length;
    if(g.pick){need+=g.pick;got+=Math.min(d,g.pick);}else{need+=g.items.length;got+=d;}
  });
  return {need:need,got:got,pct:need?Math.round(got/need*100):0};
}
function signed(scout){return function(k){return !!H.sign[scout][k];};}

function readCode(code){
  var m=String(code).match(/QBP1\.([A-Za-z0-9+\/=]+)/);
  if(!m)throw new Error("No progress code found");
  return JSON.parse(decodeURIComponent(escape(atob(m[1]))));
}

function ring(pct,size,stroke,label){
  var r=size/2-stroke,C=2*Math.PI*r;
  return "<svg class='ring' width='"+size+"' height='"+size+"' viewBox='0 0 "+size+" "+size+"'><circle cx='"+size/2+"' cy='"+size/2+"' r='"+r+"' fill='none' stroke='#e5dcc6' stroke-width='"+stroke+"'/>"+
   "<circle cx='"+size/2+"' cy='"+size/2+"' r='"+r+"' fill='none' stroke='#d65f27' stroke-width='"+stroke+"' stroke-linecap='round' stroke-dasharray='"+(C*pct/100)+" "+C+"' transform='rotate(-90 "+size/2+" "+size/2+")'/>"+
   "<text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Georgia,serif' font-weight='700' font-size='"+(size/4.2)+"' fill='#23472f'>"+(label!=null?label:pct+"%")+"</text></svg>";
}

// Turn a <ul class="check" data-list="id"> of <li> items into saved, tappable checkboxes.
var TICK="<span class='box'><svg viewBox='0 0 24 24'><path d='M5 12.5l4.5 4.5L19 7.5'/></svg></span>";
function wireChecklists(root,onChange){
  (root||document).querySelectorAll("ul.check[data-list]").forEach(function(ul){
    var id=ul.getAttribute("data-list");H.chk[id]=H.chk[id]||{};
    ul.querySelectorAll("li").forEach(function(li,i){
      if(!li.querySelector(".box"))li.innerHTML=TICK+"<span class='txt'>"+li.innerHTML+"</span>";
      if(H.chk[id][i])li.classList.add("done");
      li.addEventListener("click",function(e){
        if(e.target.closest("a,button,input"))return;
        var on=!li.classList.contains("done");
        li.classList.toggle("done",on);li.classList.remove("pop");void li.offsetWidth;if(on)li.classList.add("pop");
        if(on)H.chk[id][i]=true;else delete H.chk[id][i];save();
        updateCounts(root);if(onChange)onChange();
      });
    });
  });
  updateCounts(root);
}
function updateCounts(root){
  (root||document).querySelectorAll("[data-count-for]").forEach(function(el){
    var ul=document.querySelector("ul.check[data-list='"+el.getAttribute("data-count-for")+"']");if(!ul)return;
    var n=ul.querySelectorAll("li").length,d=ul.querySelectorAll("li.done").length;
    el.textContent=d+"/"+n+(d===n&&n?" ✓":"");
  });
}
function listPct(id,n){var c=H.chk[id]||{};return n?Math.round(Object.keys(c).length/n*100):0;}

function toast(m){var t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t);}
  t.textContent=m;t.classList.add("on");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("on");},1900);}

function nav(active){
  var links=[["index.html","Hub","hub"],["counselor.html","Counselor's Guide","counselor"],["scout.html","Scout's Guide","scout"],["progress.html","Progress","progress"]];
  var el=document.getElementById("topbar");if(!el)return;
  el.innerHTML="<div class='wrap'><a class='brand' href='index.html'><span class='knot'></span>Camp Quabosco Badges</a><nav class='nav'>"+
    links.map(function(l){return "<a href='"+l[0]+"'"+(l[2]===active?" class='on'":"")+">"+l[1]+"</a>";}).join("")+"</nav></div>";
}

window.HUB={H:H,save:save,SCOUTS:SCOUTS,BY:BY,esc:esc,units:units,signed:signed,readCode:readCode,ring:ring,
  wireChecklists:wireChecklists,listPct:listPct,toast:toast,nav:nav,shortName:shortName};
})();
