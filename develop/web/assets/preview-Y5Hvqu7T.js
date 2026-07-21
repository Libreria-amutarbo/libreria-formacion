import{t as e}from"./esm-BicNcPT8.js";var{useEffect:t,useMemo:n}=__STORYBOOK_MODULE_PREVIEW_API__,{global:r}=__STORYBOOK_MODULE_GLOBAL__,{logger:i}=__STORYBOOK_MODULE_CLIENT_LOGGER__,a=`backgrounds`,o={light:{name:`light`,value:`#F8F8F8`},dark:{name:`dark`,value:`#333`}},{document:s,window:c}=r,l=()=>!!c?.matchMedia(`(prefers-reduced-motion: reduce)`)?.matches,u=e=>{(Array.isArray(e)?e:[e]).forEach(d)},d=e=>{let t=s.getElementById(e);t&&t.parentElement?.removeChild(t)},f=(e,t)=>{let n=s.getElementById(e);if(n)n.innerHTML!==t&&(n.innerHTML=t);else{let n=s.createElement(`style`);n.setAttribute(`id`,e),n.innerHTML=t,s.head.appendChild(n)}},p=(e,t,n)=>{let r=s.getElementById(e);if(r)r.innerHTML!==t&&(r.innerHTML=t);else{let r=s.createElement(`style`);r.setAttribute(`id`,e),r.innerHTML=t;let i=`addon-backgrounds-grid${n?`-docs-${n}`:``}`,a=s.getElementById(i);a?a.parentElement?.insertBefore(r,a):s.head.appendChild(r)}},m={cellSize:100,cellAmount:10,opacity:.8},h=`addon-backgrounds`,g=`addon-backgrounds-grid`,_=l()?``:`transition: background-color 0.3s;`,v=(e,n)=>{let{globals:r,parameters:i,viewMode:s,id:c}=n,{options:l=o,disable:d,grid:v=m}=i[a]||{},y=r[a]||{},b=y.value,x=b?l[b]:void 0,S=x?.value||`transparent`,C=y.grid||!1,w=!!x&&!d,T=s===`docs`?`#anchor--${c} .docs-story`:`.sb-show-main`,E=s===`docs`?`#anchor--${c} .docs-story`:`.sb-show-main`,D=i.layout===void 0||i.layout===`padded`,O=s===`docs`?20:D?16:0,{cellAmount:k,cellSize:A,opacity:j,offsetX:M=O,offsetY:N=O}=v,P=s===`docs`?`${h}-docs-${c}`:`${h}-color`,F=s===`docs`?c:null;t(()=>{let e=`
    ${T} {
      background: ${S} !important;
      ${_}
      }`;if(!w){u(P);return}p(P,e,F)},[T,P,F,w,S]);let I=s===`docs`?`${g}-docs-${c}`:`${g}`;return t(()=>{if(!C){u(I);return}let e=[`${A*k}px ${A*k}px`,`${A*k}px ${A*k}px`,`${A}px ${A}px`,`${A}px ${A}px`].join(`, `),t=`
        ${E} {
          background-size: ${e} !important;
          background-position: ${M}px ${N}px, ${M}px ${N}px, ${M}px ${N}px, ${M}px ${N}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${j}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${j}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${j/2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${j/2}) 1px, transparent 1px) !important;
        }
      `;f(I,t)},[k,A,E,I,C,M,N,j]),e()},y=(t,n=[],r)=>{if(t===`transparent`)return`transparent`;if(n.find(e=>e.value===t)||t)return t;let a=n.find(e=>e.name===r);if(a)return a.value;if(r){let t=n.map(e=>e.name).join(`, `);i.warn(e`
        Backgrounds Addon: could not find the default color "${r}".
        These are the available colors for your story based on your configuration:
        ${t}.
      `)}return`transparent`},b=globalThis.FEATURES?.backgroundsStoryGlobals?[v]:[(e,r)=>{let{globals:i,parameters:o}=r,s=o[a].grid,c=i[a]?.grid===!0&&s.disable!==!0,{cellAmount:l,cellSize:d,opacity:p}=s,m=r.viewMode===`docs`,h=o.layout===void 0||o.layout===`padded`?16:0,g=s.offsetX??(m?20:h),_=s.offsetY??(m?20:h),v=n(()=>`
      ${r.viewMode===`docs`?`#anchor--${r.id} .docs-story`:`.sb-show-main`} {
        background-size: ${[`${d*l}px ${d*l}px`,`${d*l}px ${d*l}px`,`${d}px ${d}px`,`${d}px ${d}px`].join(`, `)} !important;
        background-position: ${g}px ${_}px, ${g}px ${_}px, ${g}px ${_}px, ${g}px ${_}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${p}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${p}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${p/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${p/2}) 1px, transparent 1px) !important;
      }
    `,[d]);return t(()=>{let e=r.viewMode===`docs`?`addon-backgrounds-grid-docs-${r.id}`:`addon-backgrounds-grid`;if(!c){u(e);return}f(e,v)},[c,v,r]),e()},(e,r)=>{let{globals:i,parameters:o}=r,s=i[a]?.value,c=o[a],d=n(()=>c.disable?`transparent`:y(s,c.values,c.default),[c,s]),f=n(()=>d&&d!==`transparent`,[d]),m=r.viewMode===`docs`?`#anchor--${r.id} .docs-story`:`.sb-show-main`,h=n(()=>`
      ${m} {
        background: ${d} !important;
        ${l()?``:`transition: background-color 0.3s;`}
      }
    `,[d,m]);return t(()=>{let e=r.viewMode===`docs`?`addon-backgrounds-docs-${r.id}`:`addon-backgrounds-color`;if(!f){u(e);return}p(e,h,r.viewMode===`docs`?r.id:null)},[f,h,r]),e()}],x={[a]:{grid:{cellSize:20,opacity:.5,cellAmount:5},disable:!1,...!globalThis.FEATURES?.backgroundsStoryGlobals&&{values:Object.values(o)}}},S={[a]:{value:void 0,grid:!1}},C=globalThis.FEATURES?.backgroundsStoryGlobals?S:{[a]:null};export{b as decorators,C as initialGlobals,x as parameters};