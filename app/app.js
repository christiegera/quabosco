(function(){
var NAMES={michael:"Michael",peter:"Peter"};
var SCOUT=(new URLSearchParams(location.search).get("scout")||"").toLowerCase();
var NAME=NAMES[SCOUT]||"";
var KEY="quabosco-scout-v2"+(SCOUT?"-"+SCOUT:"");
var S={st:{},nt:{},dt:{},hours:[],mom:false,pin:null,open:{}};
try{var saved=JSON.parse(localStorage.getItem(KEY));if(saved)for(var k in saved)S[k]=saved[k];}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}

// Scout-facing summaries (the desktop tracker's notes are written for the counselor)
var KID={
 movie:"Your camp promo video IS this badge. Plan it properly and almost everything here gets done.",
 dt:"The website, photos, QR code, and voiceover cover a lot. The knowledge pieces are separate.",
 comm:"Eagle-required. The website, your pitch, and the camp director interview count. The speech, public meeting, and court of honor are separate.",
 ga:"Design the camp flyer with a QR code to the booking page, then print 50 copies.",
 citc:"Eagle-required. Your volunteer hours for the American Legion count. Log them in the Hours tab."
};
var TAG={P:"Camp project",T:"Tie-in",O:"Outside"};
var LBL={todo:"To do",doing:"Working on it",ready:"Ready for review",signed:"Signed off ✓"};

function key(b,it){return b.id+"__"+it[0];}
function st(b,it){return S.st[key(b,it)]||"todo";}
function done(s){return s==="ready"||s==="signed";}
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function toast(m){var t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("on");},1800);}
function itemText(g,it){return it[1]||g.h;}

// A "Do ONE/TWO/THREE" group counts as `pick` units; other groups count every item.
function units(b){
  var need=0,got=0;
  b.reqs.forEach(function(g){
    var d=g.items.filter(function(it){return done(st(b,it));}).length;
    if(g.pick){need+=g.pick;got+=Math.min(d,g.pick);}else{need+=g.items.length;got+=d;}
  });
  return {need:need,got:got};
}
function badgePct(b){var u=units(b);return Math.round(u.got/u.need*100);}

function ring(pct,size){
  var r=size/2-5,C=2*Math.PI*r;
  return "<svg class='mini' viewBox='0 0 "+size+" "+size+"'><circle cx='"+size/2+"' cy='"+size/2+"' r='"+r+"' fill='none' stroke='#e3dac4' stroke-width='5'/>"+
    "<circle cx='"+size/2+"' cy='"+size/2+"' r='"+r+"' fill='none' stroke='#d9622b' stroke-width='5' stroke-linecap='round' stroke-dasharray='"+(C*pct/100)+" "+C+"' transform='rotate(-90 "+size/2+" "+size/2+")'/>"+
    "<text x='50%' y='57%' text-anchor='middle' font-size='"+(size/4)+"' font-family='Georgia,serif' font-weight='700' fill='#244a35'>"+pct+"</text></svg>";
}

// ---------- Today ----------
function renderHome(){
  var tot=0,d=0,c={doing:0,ready:0,signed:0};
  BADGES.forEach(function(b){var u=units(b);tot+=u.need;d+=u.got;
    b.reqs.forEach(function(g){g.items.forEach(function(it){var s=st(b,it);if(c[s]!==undefined)c[s]++;});});});
  var pct=tot?Math.round(d/tot*100):0;
  $("hArc").setAttribute("stroke-dasharray",(264*pct/100)+" 264");
  $("hPct").textContent=pct+"%";
  $("hTitle").textContent=pct===0?"Let's get started":pct<50?"Nice progress":pct<100?"Over halfway!":"All done!";
  $("hSub").textContent=d+" of "+tot+" required pieces done across "+BADGES.length+" badges";
  $("cDoing").textContent=c.doing;$("cReady").textContent=c.ready;$("cSigned").textContent=c.signed;

  var nxt=[];
  ["doing","todo"].forEach(function(want){
    BADGES.forEach(function(b){b.reqs.forEach(function(g){g.items.forEach(function(it){
      if(it[2]==="P"&&st(b,it)===want&&nxt.length<4)nxt.push([b,g,it]);});});});
  });
  $("nextList").innerHTML=nxt.length?nxt.map(function(x){
    var t=itemText(x[1],x[2]);if(t.length>150)t=t.slice(0,147)+"…";
    return "<div class='next' data-b='"+x[0].id+"'><div><b>"+esc(x[0].name)+" · "+esc(x[2][0])+(st(x[0],x[2])==="doing"?" · working on it":"")+"</b><p>"+esc(t)+"</p></div></div>";
  }).join(""):"<div class='empty'>Every camp-project requirement is done or waiting for Mrs. Gera. 🎉</div>";

  var close=BADGES.slice().sort(function(a,b){return badgePct(b)-badgePct(a);}).slice(0,3);
  $("closeList").innerHTML=close.map(function(b){
    return "<div class='card' data-b='"+b.id+"'><div class='brow'>"+ring(badgePct(b),44)+"<div class='nm'><b>"+esc(b.name)+"</b><small>"+esc(b.fit)+"</small></div><span class='chev'>›</span></div></div>";
  }).join("");
  document.querySelectorAll("#v-home [data-b]").forEach(function(el){
    el.addEventListener("click",function(){S.tab=el.getAttribute("data-b");save();go("badges");
      setTimeout(function(){var t=document.querySelector("#badgeList [data-id='"+el.getAttribute("data-b")+"']");if(t)t.scrollIntoView({behavior:"smooth",block:"start"});},60);});
  });
}

// ---------- Badges ----------
var filter="all";
function renderTabs(){
  var bar=$("btabs");bar.innerHTML="";
  BADGES.forEach(function(b){
    var p=badgePct(b);
    var t=document.createElement("button");
    t.className="btab"+(b.id===S.tab?" on":"");
    t.innerHTML=ring(p,34)+"<span>"+esc(b.name)+"</span>";
    t.addEventListener("click",function(){S.tab=b.id;save();renderBadges();window.scrollTo(0,0);});
    bar.appendChild(t);
  });
  var on=bar.querySelector(".on");if(on&&on.scrollIntoView)on.scrollIntoView({block:"nearest",inline:"center"});
}
function renderBadges(){
  if(!BADGES.some(function(b){return b.id===S.tab;}))S.tab=BADGES[0].id;
  renderTabs();
  var list=$("badgeList");list.innerHTML="";
  BADGES.filter(function(b){return b.id===S.tab;}).forEach(function(b){
    var groups=b.reqs.map(function(g){
      return {g:g,items:g.items.filter(function(it){
        if(filter==="all")return true;
        if(filter==="open")return !done(st(b,it));
        return it[2]===filter;})};
    }).filter(function(x){return x.items.length;});
    var card=document.createElement("div");
    card.className="card open solo";card.setAttribute("data-id",b.id);
    var u=units(b);
    var html="<div class='brow'>"+ring(badgePct(b),44)+"<div class='nm'><b>"+esc(b.name)+(b.eagle?"<span class='eagle'>EAGLE</span>":"")+"</b><small>"+esc(b.fit)+" · "+u.got+" of "+u.need+" done</small></div><span class='chev'>›</span></div><div class='reqs'><p class='blurb'>"+esc(KID[b.id]||"")+"</p>";
    groups.forEach(function(x){
      var g=x.g,single=g.items.length===1&&!g.items[0][1];
      var pickedN=g.pick?g.items.filter(function(it){return done(st(b,it));}).length:0;
      html+="<div class='grp'><div class='ghead'><span class='gnum'>"+esc(g.n)+".</span><div>"+esc(g.h)+
        (g.pick?"<div class='gpick'>Choose "+g.pick+" · "+Math.min(pickedN,g.pick)+" of "+g.pick+" done</div>":"")+"</div></div>";
      x.items.forEach(function(it){
        var k=key(b,it),s=st(b,it),n=S.nt[k]||"";
        html+="<div class='req' data-k='"+k+"'>"+
          (single?"":"<div class='rtop'><span class='rid'>("+esc(it[0].replace(/^\d+/,""))+")</span><div class='rtx'>"+esc(it[1])+"</div></div>")+
          "<div class='rmeta'><span class='tag "+it[2]+"'>"+TAG[it[2]]+"</span>"+(it[3]?"<span class='tipx'>💡 "+esc(it[3])+"</span>":"")+"</div>"+
          "<div class='ctl'><button class='st "+s+"' data-act='st'>"+LBL[s]+"</button><button class='nbtn"+(n?" has":"")+"' data-act='nt'>"+(n?"✎ Note":"+ Note")+"</button>"+
          (S.mom&&s==="signed"?"<input type='date' data-act='dt' value='"+(S.dt[k]||"")+"' style='width:auto;padding:6px 8px;font-size:14px'>":"")+"</div>"+
          "<div class='note'><textarea rows='3' placeholder='What did you do? Where is the proof (file name, link, photo)?'>"+esc(n)+"</textarea><small>Saves automatically</small></div></div>";
      });
      html+="</div>";
    });
    if(!groups.length)html+="<div class='empty'>Nothing in this filter for "+esc(b.name)+". Try All.</div>";
    html+="<a class='src' href='"+b.link+"' target='_blank' rel='noopener'>Official requirements on scouting.org ↗</a></div>";
    card.innerHTML=html;
    card.querySelectorAll(".req").forEach(function(row){
      var k=row.getAttribute("data-k");
      row.querySelector("[data-act=st]").addEventListener("click",function(){
        var order=S.mom?["todo","doing","ready","signed"]:["todo","doing","ready"];
        var cur=S.st[k]||"todo";
        if(!S.mom&&cur==="signed"){toast("Only Mrs. Gera can change a signed-off item");return;}
        var nx=order[(order.indexOf(cur)+1)%order.length];
        S.st[k]=nx;
        if(nx==="signed"&&!S.dt[k])S.dt[k]=new Date().toISOString().slice(0,10);
        save();
        if(nx==="ready")toast("Nice! Tell Mrs. Gera it's ready to review");
        if(nx==="signed")toast("Signed off ✓");
        renderBadges();renderHome();
      });
      row.querySelector("[data-act=nt]").addEventListener("click",function(){row.querySelector(".note").classList.toggle("on");});
      var ta=row.querySelector("textarea");
      ta.addEventListener("input",function(){S.nt[k]=ta.value;save();var nb=row.querySelector("[data-act=nt]");nb.classList.toggle("has",!!ta.value);nb.textContent=ta.value?"✎ Note":"+ Note";});
      var di=row.querySelector("[data-act=dt]");
      if(di)di.addEventListener("change",function(){S.dt[k]=di.value;save();});
    });
    list.appendChild(card);
  });
  if(!list.children.length)list.innerHTML="<div class='empty'>Nothing here. Everything in this filter is done.</div>";
}
document.querySelectorAll("#chips button").forEach(function(btn){
  btn.addEventListener("click",function(){
    filter=btn.getAttribute("data-f");
    document.querySelectorAll("#chips button").forEach(function(x){x.classList.toggle("on",x===btn);});
    renderBadges();
  });
});

// ---------- Hours ----------
function renderHours(){
  var tot=S.hours.reduce(function(a,h){return a+(+h.hrs||0);},0);
  $("hrBar").style.width=Math.min(100,tot/8*100)+"%";
  $("hrTotal").textContent=(Math.round(tot*100)/100)+" of 8 hours"+(tot>=8?" ✓ Goal met. Show Mrs. Gera your log.":"");
  var list=S.hours.slice().sort(function(a,b){return a.date<b.date?1:-1;});
  $("hrList").innerHTML=list.length?list.map(function(h){
    return "<div class='entry'><div class='h'>"+h.hrs+"</div><div class='d'>"+esc(h.task)+"<small>"+esc(h.date)+(h.who?" · initialed by "+esc(h.who):" · ⚠ needs initials")+"</small></div><button data-id='"+h.id+"' aria-label='Delete'>×</button></div>";
  }).join(""):"<div class='empty'>No sessions yet.</div>";
  document.querySelectorAll("#hrList button").forEach(function(b){
    b.addEventListener("click",function(){if(!confirm("Delete this session?"))return;var id=b.getAttribute("data-id");S.hours=S.hours.filter(function(h){return String(h.id)!==id;});save();renderHours();});
  });
}
$("hrDate").value=new Date().toISOString().slice(0,10);
$("hrForm").addEventListener("submit",function(e){
  e.preventDefault();
  S.hours.push({id:Date.now(),task:$("hrTask").value.trim(),date:$("hrDate").value,hrs:+$("hrHrs").value,who:$("hrWho").value.trim()});
  save();$("hrTask").value="";$("hrHrs").value="";$("hrWho").value="";
  renderHours();toast("Session logged");
});

// ---------- Guide: counselor mode + backup ----------
function momLabel(){var b=$("momBtn");b.textContent=S.mom?"Counselor mode is ON. Tap to turn off.":"Turn on counselor mode";b.classList.toggle("on",S.mom);}
$("momBtn").addEventListener("click",function(){
  if(S.mom){S.mom=false;save();momLabel();renderBadges();toast("Counselor mode off");return;}
  if(!S.pin){var p=prompt("Mrs. Gera: set a 4-digit PIN for counselor mode");if(!p||!/^\d{4}$/.test(p)){toast("PIN must be 4 digits");return;}S.pin=p;}
  else{var q=prompt("Counselor PIN");if(q!==S.pin){toast("Wrong PIN");return;}}
  S.mom=true;save();momLabel();renderBadges();toast("Counselor mode on");
});
$("expBtn").addEventListener("click",function(){
  var data=JSON.stringify({v:2,st:S.st,nt:S.nt,dt:S.dt,hours:S.hours});
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(data).then(function(){toast("Backup copied. Paste it in a text to yourself.");},function(){prompt("Copy this backup:",data);});}
  else prompt("Copy this backup:",data);
});
$("impBtn").addEventListener("click",function(){
  var t=prompt("Paste a backup here. This replaces what's on this phone.");if(!t)return;
  try{var d=JSON.parse(t);if(d.v===2){["st","nt","dt"].forEach(function(k){if(d[k])S[k]=d[k];});}if(d.hours)S.hours=d.hours;save();renderAll();toast("Backup restored");}
  catch(e){toast("That backup didn't work");}
});

// ---------- Nav ----------
// Progress code the Scout texts to the counselor; the hub's progress page reads it.
function progressCode(){
  var data={v:1,scout:SCOUT,at:new Date().toISOString(),st:S.st,nt:S.nt,dt:S.dt,hours:S.hours};
  return "QBP1."+btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}
$("sendBtn").addEventListener("click",function(){
  if(!SCOUT){toast("Open your own link (Michael or Peter) first");return;}
  var code=progressCode(),msg=NAME+"'s badge progress (paste into the hub):\n"+code;
  if(navigator.share){navigator.share({text:msg}).catch(function(){});}
  else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(msg).then(function(){toast("Copied. Paste it in a text to Mrs. Gera.");},function(){prompt("Copy this and text it to Mrs. Gera:",msg);});}
  else prompt("Copy this and text it to Mrs. Gera:",msg);
});
var TITLES={home:["Camp Quabosco project",NAME?NAME+"'s badges":"My badges"],badges:["Official requirements","All badges"],hours:["Citizenship in the Community 7c","Volunteer hours"],info:["Rules & settings","Guide"]};
function go(v){
  document.querySelectorAll(".view").forEach(function(x){x.classList.toggle("on",x.id==="v-"+v);});
  document.querySelectorAll("#nav button").forEach(function(x){x.classList.toggle("on",x.getAttribute("data-v")===v);});
  $("topK").textContent=TITLES[v][0];$("topH").textContent=TITLES[v][1];
  if(v==="home")renderHome();if(v==="badges")renderBadges();if(v==="hours")renderHours();
  window.scrollTo(0,0);
}
document.querySelectorAll("#nav button").forEach(function(b){b.addEventListener("click",function(){go(b.getAttribute("data-v"));});});

function renderAll(){renderHome();renderBadges();renderHours();momLabel();}
renderAll();

if("serviceWorker" in navigator){try{navigator.serviceWorker.register("sw.js").catch(function(){});}catch(e){}}
})();
