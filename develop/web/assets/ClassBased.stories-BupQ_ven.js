import{a as e}from"./lit-C11zoK0j.js";import"./src-hmMJswT-.js";import"./defaults-BS9BWamO.js";var t={title:`DCXLibrary/WebComponents/Spinner`,component:`dcx-web-spinner`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{size:{control:`select`,options:[`s`,`m`,`l`,`xl`],description:`Tamaño del spinner`,table:{category:`Atributos`}},wrapper:{control:`boolean`,description:`Activa el modo overlay sobre contenido proyectado.`,table:{category:`Atributos`}},delay:{control:`number`,description:`Milisegundos de espera antes de mostrar el spinner.`,table:{category:`Atributos`}},title:{control:`text`,description:`Texto principal mostrado por el spinner.`,table:{category:`Atributos`}},description:{control:`text`,description:`Texto secundario mostrado bajo el título.`,table:{category:`Atributos`}},color:{control:`color`,description:`Color personalizado para el arco activo.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Texto anunciado por lectores de pantalla.`,table:{category:`Atributos`}}},args:{size:`m`,title:`Cargando…`,description:`Esto puede tardar unos segundos`,wrapper:!1,delay:0,color:null,ariaLabel:null},render:t=>e`
    <div
      style="
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:180px;
      "
    >
      <dcx-web-spinner
        size=${t.size}
        .wrapper=${t.wrapper}
        .delay=${t.delay}
        title=${t.title}
        description=${t.description}
        .color=${t.color}
        .ariaLabel=${t.ariaLabel}
      >
      </dcx-web-spinner>
    </div>
  `},n={},r={render:()=>e`
    <div
      style="
        display:flex;
        align-items:center;
        gap: var(--sp-8, 32px);
        flex-wrap:wrap;
      "
    >
      <dcx-web-spinner
        size="s"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="m"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="xl"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>
    </div>
  `},i={name:`Color personalizado`,render:()=>e`
    <div
      style="
        display:flex;
        align-items:center;
        gap: var(--sp-8, 32px);
      "
    >
      <dcx-web-spinner
        size="l"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=${0}
        color="#7c3aed"
        aria-label="Cargando"
      ></dcx-web-spinner>
    </div>
  `},a={name:`Con título y descripción`,render:()=>e`
    <div
      style="
        display:flex;
        gap: var(--sp-16, 64px);
        flex-wrap:wrap;
        padding: var(--sp-6, 24px);
      "
    >
      <dcx-web-spinner
        size="l"
        .delay=${0}
        title="Cargando…"
      >
      </dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=${0}
        title="Procesando"
        description="Por favor, espera"
      >
      </dcx-web-spinner>
    </div>
  `},o={name:`Con delay`,args:{title:`Cargando con retraso…`,description:`Este spinner solo aparece pasado 1 segundo`,delay:1e3},render:t=>e`
    <div
      style="
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:220px;
      "
    >
      <dcx-web-spinner
        size=${t.size}
        .delay=${t.delay}
        title=${t.title}
        description=${t.description}
        .color=${t.color}
      >
      </dcx-web-spinner>
    </div>
  `},s={name:`Modo wrapper (overlay)`,args:{title:`Cargando contenido…`,wrapper:!0,delay:0},render:t=>e`
    <div
      style="
        display:flex;
        justify-content:center;
        padding: var(--sp-6, 24px);
      "
    >
      <div
        style="
          max-width:384px;
          width:100%;
          border:1px dashed var(--border-light, #d1d5db);
          border-radius:var(--r-md, 6px);
          overflow:hidden;
        "
      >
        <dcx-web-spinner
          size=${t.size}
          .wrapper=${t.wrapper}
          .delay=${t.delay}
          title=${t.title}
        >
          <div
            style="
              padding:var(--sp-4, 16px);
            "
          >
            <h4>Contenido</h4>

            <p>
              Este es un ejemplo del contenido
              que se muestra bajo el spinner
              en modo wrapper.
            </p>

            <p>
              El spinner se superpone a este
              contenido como un overlay.
            </p>
          </div>
        </dcx-web-spinner>
      </div>
    </div>
  `};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        align-items:center;
        gap: var(--sp-8, 32px);
        flex-wrap:wrap;
      "
    >
      <dcx-web-spinner
        size="s"
        .delay=\${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="m"
        .delay=\${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=\${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="xl"
        .delay=\${0}
        aria-label="Cargando"
      ></dcx-web-spinner>
    </div>
  \`
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Color personalizado',
  render: () => html\`
    <div
      style="
        display:flex;
        align-items:center;
        gap: var(--sp-8, 32px);
      "
    >
      <dcx-web-spinner
        size="l"
        .delay=\${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=\${0}
        color="#7c3aed"
        aria-label="Cargando"
      ></dcx-web-spinner>
    </div>
  \`
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Con título y descripción',
  render: () => html\`
    <div
      style="
        display:flex;
        gap: var(--sp-16, 64px);
        flex-wrap:wrap;
        padding: var(--sp-6, 24px);
      "
    >
      <dcx-web-spinner
        size="l"
        .delay=\${0}
        title="Cargando…"
      >
      </dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=\${0}
        title="Procesando"
        description="Por favor, espera"
      >
      </dcx-web-spinner>
    </div>
  \`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Con delay',
  args: {
    title: 'Cargando con retraso…',
    description: 'Este spinner solo aparece pasado 1 segundo',
    delay: 1000
  },
  render: args => html\`
    <div
      style="
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:220px;
      "
    >
      <dcx-web-spinner
        size=\${args.size}
        .delay=\${args.delay}
        title=\${args.title}
        description=\${args.description}
        .color=\${args.color}
      >
      </dcx-web-spinner>
    </div>
  \`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Modo wrapper (overlay)',
  args: {
    title: 'Cargando contenido…',
    wrapper: true,
    delay: 0
  },
  render: args => html\`
    <div
      style="
        display:flex;
        justify-content:center;
        padding: var(--sp-6, 24px);
      "
    >
      <div
        style="
          max-width:384px;
          width:100%;
          border:1px dashed var(--border-light, #d1d5db);
          border-radius:var(--r-md, 6px);
          overflow:hidden;
        "
      >
        <dcx-web-spinner
          size=\${args.size}
          .wrapper=\${args.wrapper}
          .delay=\${args.delay}
          title=\${args.title}
        >
          <div
            style="
              padding:var(--sp-4, 16px);
            "
          >
            <h4>Contenido</h4>

            <p>
              Este es un ejemplo del contenido
              que se muestra bajo el spinner
              en modo wrapper.
            </p>

            <p>
              El spinner se superpone a este
              contenido como un overlay.
            </p>
          </div>
        </dcx-web-spinner>
      </div>
    </div>
  \`
}`,...s.parameters?.docs?.source}}};var c=[`Default`,`Sizes`,`CustomColor`,`WithText`,`SpinnerDelayShowcase`,`SpinnerWrapperShowcase`];export{i as CustomColor,n as Default,r as Sizes,o as SpinnerDelayShowcase,s as SpinnerWrapperShowcase,a as WithText,c as __namedExportsOrder,t as default};