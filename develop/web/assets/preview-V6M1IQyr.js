var{STORY_CHANGED:e}=__STORYBOOK_MODULE_CORE_EVENTS__,{addons:t}=__STORYBOOK_MODULE_PREVIEW_API__,{global:n}=__STORYBOOK_MODULE_GLOBAL__,r=`storybook/highlight`,i=`storybookHighlight`,a=`${r}/add`,o=`${r}/reset`,{document:s}=n,c=(e=`#FF4785`,t=`dashed`)=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,l=t.getChannel(),u=e=>{let t=i;d();let n=Array.from(new Set(e.elements)),r=s.createElement(`style`);r.setAttribute(`id`,t),r.innerHTML=n.map(t=>`${t}{
          ${c(e.color,e.style)}
         }`).join(` `),s.head.appendChild(r)},d=()=>{let e=i,t=s.getElementById(e);t&&t.parentNode?.removeChild(t)};l.on(e,d),l.on(o,d),l.on(a,u);