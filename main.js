import{inspectGRS,formatReport}from"./grs-parser.js";import{makeTestPdf}from"./pdf-writer.js";
const d=document.querySelector("#drop"),i=document.querySelector("#file"),b=document.querySelector("#inspect"),p=document.querySelector("#pdf"),o=document.querySelector("#output");let f;
function pick(x){if(!x)return;if(!x.name.toLowerCase().endsWith(".grs")){o.textContent="Please choose a .GRS file.";return}f=x;b.disabled=p.disabled=false;o.textContent=`Selected ${x.name} (${x.size.toLocaleString()} bytes).`}
d.onclick=()=>i.click();d.onkeydown=e=>{if(e.key==="Enter"||e.key===" ")i.click()};i.onchange=()=>pick(i.files[0]);d.ondragover=e=>{e.preventDefault();d.classList.add("drag")};d.ondragleave=()=>d.classList.remove("drag");d.ondrop=e=>{e.preventDefault();d.classList.remove("drag");pick(e.dataTransfer.files[0])};
b.onclick=async()=>{o.textContent="Reading locally…";o.textContent=formatReport(inspectGRS(await f.arrayBuffer(),f.name))};
p.onclick=()=>{const u=URL.createObjectURL(makeTestPdf(f.name)),a=document.createElement("a");a.href=u;a.download=f.name.replace(/\.grs$/i,"")+"-test.pdf";a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
