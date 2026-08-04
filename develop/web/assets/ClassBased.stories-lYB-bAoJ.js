import{a as e}from"./lit-LoFRC6vp.js";import"./src-C889WF8u.js";var t=[`horizontal`,`vertical`],n=[`default`,`dot`,`dash`],r=[`s`,`m`,`l`,`xl`,`auto`],i={primary:{100:`#e6f0fa`,200:`#b3d4f0`,300:`#88b6e6`,400:`#4d9cd8`,500:`#0058ab`,600:`#004080`,700:`#121a38`},grey:{100:`#f7f8fa`,200:`#e1e3e6`,300:`#c8cdcd`,400:`#a9adb3`,500:`#696e75`,600:`#4f545a`,700:`#2a2e33`},base:{white:`#ffffff`},semantic:{"light-blue-700":`#1d88f2`,"red-800":`#b00020`,"red-700":`#b91c1c`,"red-300":`#fee2e2`}},a={text:{title:i.grey[700],body:i.grey[700],"label-default":i.grey[700],"label-base":i.base.white,disabled:i.grey[500],"disabled-dark":i.grey[600],error:i.semantic[`red-800`]},background:{default:i.base.white,primary:i.primary[500],"primary-hover":i.primary[600],"primary-pressed":i.primary[700],secondary:i.grey[700],"secondary-light":i.grey[400],pressed:i.grey[200],disabled:i.grey[200],hover:i.grey[100],error:i.semantic[`red-300`]},content:{"default-white":i.base.white,"default-dark":i.grey[700],primary:i.primary[500],hover:i.grey[400],terciary:i.grey[200],disabled:i.grey[500],"disabled-dark":i.grey[600],"error-text":i.semantic[`red-800`],error:i.semantic[`red-700`]},border:{primary:i.primary[500],default:i.grey[700],hover:i.grey[200],terciary:i.grey[200],disabled:i.primary[400],focus:i.semantic[`light-blue-700`],error:i.semantic[`red-700`]}},o={title:`DCXLibrary/WebComponents/Divider`,component:`dcx-web-divider`,tags:[`autodocs`],parameters:{controls:{expanded:!0},docs:{description:{component:"`dcx-web-divider` es un separador visual flexible para estructurar contenido. Soporta orientación horizontal y vertical, tamaños predefinidos (`s`, `m`, `l`, `xl`, `auto`), estilos de línea sólida, punteada y discontinua, y personalización completa de color y grosor. Los divisores sin `label` ni `aria-label` se ocultan automáticamente a los lectores de pantalla."}}},argTypes:{orientation:{control:`select`,options:t,description:`Dirección del divisor.`,table:{category:`Atributos`}},size:{control:`select`,options:r,description:"Longitud del divisor. `auto` rellena el contenedor padre.",table:{category:`Atributos`}},type:{control:`select`,options:n,description:`Estilo visual de la línea: sólida, punteada o discontinua.`,table:{category:`Atributos`}},thickness:{control:{type:`number`,min:0,max:2,step:.2},description:"Grosor de la línea en unidades `rem`.",table:{category:`Atributos`}},color:{control:`color`,description:`Color de la línea.`,table:{category:`Atributos`}},label:{control:`text`,description:`Texto visible centrado entre dos líneas. Cuando se establece, el divisor cambia a la variante con etiqueta.`,table:{category:`Atributos`}},"aria-label":{control:`text`,description:`Etiqueta accesible utilizada por lectores de pantalla cuando el divisor no tiene label visible.`,table:{category:`Accesibilidad`}}},args:{size:`auto`,orientation:`horizontal`,type:`default`,color:`#d1d5db`,thickness:.25,label:``,"aria-label":``},render:t=>e`
    <dcx-web-divider
      orientation=${t.orientation}
      size=${t.size}
      type=${t.type}
      thickness=${t.thickness}
      color=${t.color}
      label=${t.label||``}
      aria-label=${t[`aria-label`]||``}
    ></dcx-web-divider>
  `},s={name:`Default`,parameters:{docs:{description:{story:`Usa el panel de controles para configurar interactivamente orientación, tamaño, color, grosor y tipo.`}}}},c={name:`Horizontal — Todos los tamaños`,parameters:{docs:{description:{story:"Divisores horizontales en todos los tamaños disponibles: `s` (5rem), `m` (15rem), `l` (30rem), `xl` (35rem) y `auto` (ancho del contenedor)."}}},render:()=>e`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <span style="font-size:12px;color:#888">size="s"</span>
      <dcx-web-divider size="s" color="${a.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="m"</span>
      <dcx-web-divider size="m" color="${a.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="l"</span>
      <dcx-web-divider size="l" color="${a.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="xl"</span>
      <dcx-web-divider size="xl" color="${a.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="auto"</span>
      <dcx-web-divider size="auto" color="${a.background.primary}"></dcx-web-divider>
    </div>
  `},l={name:`Vertical — Todos los tamaños`,parameters:{docs:{description:{story:`Divisores verticales en todos los tamaños. El contenedor padre debe tener altura definida.`}}},render:()=>e`
    <div style="display:flex;flex-direction:row;align-items:flex-end;gap:48px;padding:16px;height:600px;">
  
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">s (5rem)</span>
      <dcx-web-divider size="s" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">m (15rem)</span>
      <dcx-web-divider size="m" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">l (30rem)</span>
      <dcx-web-divider size="l" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">xl (35rem)</span>
      <dcx-web-divider size="xl" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">auto</span>
      <dcx-web-divider size="auto" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
    </div>

  </div>

  `},u={name:`Todos los tipos`,parameters:{docs:{description:{story:"Los tres estilos de línea disponibles: `default` (sólida), `dot` (punteada) y `dash` (discontinua)."}}},render:()=>e`
    <div style="display:flex;flex-direction:column;gap:24px;padding:16px;">
      <span style="font-size:12px;color:#888">type="default" — sólida</span>
      <dcx-web-divider type="default" color="${a.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">type="dot" — punteada</span>
      <dcx-web-divider type="dot" color="${a.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">type="dash" — discontinua</span>
      <dcx-web-divider type="dash" color="${a.background.primary}"></dcx-web-divider>
    </div>
  `},d={name:`Variantes de grosor`,parameters:{docs:{description:{story:"El input `thickness` controla el grosor en `rem`. Se muestran ejemplos en horizontal y vertical."}}},render:()=>e`
    <div style="display:flex;gap:48px;padding:16px;">
      
      <div style="display:flex;flex-direction:column;gap:20px;flex:1;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em">
          Horizontal
        </span>

        <span style="font-size:12px;color:#888">thickness=0.1</span>
        <dcx-web-divider thickness="0.1" color="${a.background.primary}"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.25</span>
        <dcx-web-divider thickness="0.25" color="${a.background.primary}"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.4</span>
        <dcx-web-divider thickness="0.4" color="${a.background.primary}"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.8</span>
        <dcx-web-divider thickness="0.8" color="${a.background.primary}"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:row;gap:32px;height:200px;align-items:stretch;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em;writing-mode:vertical-rl;align-self:center;">
          Vertical
        </span>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.1</span>
          <dcx-web-divider thickness="0.1" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.25</span>
          <dcx-web-divider thickness="0.25" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.4</span>
          <dcx-web-divider thickness="0.4" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.8</span>
          <dcx-web-divider thickness="0.8" orientation="vertical" color="${a.background.primary}"></dcx-web-divider>
        </div>

      </div>

    </div>
  `},f={name:`Variantes de color`,parameters:{docs:{description:{story:"El input `color` acepta cualquier valor CSS. Los divisores sin label son decorativos."}}},render:()=>e`
    <div style="display:flex;gap:32px;padding:16px;">
      
      <div style="display:flex;flex-direction:column;gap:12px;flex:1;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em">
          Horizontal
        </span>

        <dcx-web-divider color="#e6f0ff"></dcx-web-divider>
        <dcx-web-divider color="#cfe0ff"></dcx-web-divider>
        <dcx-web-divider color="#b8d1ff"></dcx-web-divider>
        <dcx-web-divider color="#8ab1ff"></dcx-web-divider>
        <dcx-web-divider color="#5c8fff"></dcx-web-divider>
        <dcx-web-divider color="#2e6fff"></dcx-web-divider>
        <dcx-web-divider color="#155fff"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:row;gap:12px;height:180px;align-items:stretch;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em;writing-mode:vertical-rl;align-self:center;">
          Vertical
        </span>

        <dcx-web-divider orientation="vertical" color="#e6f0ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#cfe0ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#b8d1ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#8ab1ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#5c8fff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#2e6fff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#155fff"></dcx-web-divider>
      </div>
    </div>
  `},p={name:`Con etiqueta — Horizontal y Vertical`,parameters:{docs:{description:{story:`Divisores con etiqueta centrada. En vertical, la etiqueta se rota y se mantiene centrada.`}}},render:()=>e`
    <div style="display:flex;flex-direction:column;gap:48px;padding:24px;">
      
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:12px;color:#888">
          orientation="horizontal"
        </span>
        <dcx-web-divider label="Título de sección" color="${a.background.primary}"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:12px;color:#888">
          orientation="vertical" (altura acotada por el padre)
        </span>

        <div style="display:flex;height:200px;gap:16px;">
          <p style="margin:0;align-self:center;">Contenido izquierdo</p>
          <dcx-web-divider orientation="vertical" label="o" color="${a.background.primary}"></dcx-web-divider>
          <p style="margin:0;align-self:center;">Contenido derecho</p>
        </div>
      </div>

    </div>
  `};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Usa el panel de controles para configurar interactivamente orientación, tamaño, color, grosor y tipo.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Horizontal — Todos los tamaños',
  parameters: {
    docs: {
      description: {
        story: 'Divisores horizontales en todos los tamaños disponibles: \`s\` (5rem), \`m\` (15rem), \`l\` (30rem), \`xl\` (35rem) y \`auto\` (ancho del contenedor).'
      }
    }
  },
  render: () => html\`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <span style="font-size:12px;color:#888">size="s"</span>
      <dcx-web-divider size="s" color="\${tokens.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="m"</span>
      <dcx-web-divider size="m" color="\${tokens.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="l"</span>
      <dcx-web-divider size="l" color="\${tokens.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="xl"</span>
      <dcx-web-divider size="xl" color="\${tokens.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">size="auto"</span>
      <dcx-web-divider size="auto" color="\${tokens.background.primary}"></dcx-web-divider>
    </div>
  \`
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Vertical — Todos los tamaños',
  parameters: {
    docs: {
      description: {
        story: 'Divisores verticales en todos los tamaños. El contenedor padre debe tener altura definida.'
      }
    }
  },
  render: () => html\`
    <div style="display:flex;flex-direction:row;align-items:flex-end;gap:48px;padding:16px;height:600px;">
  
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">s (5rem)</span>
      <dcx-web-divider size="s" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">m (15rem)</span>
      <dcx-web-divider size="m" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">l (30rem)</span>
      <dcx-web-divider size="l" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">xl (35rem)</span>
      <dcx-web-divider size="xl" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;">
      <span style="font-size:12px;color:#888">auto</span>
      <dcx-web-divider size="auto" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
    </div>

  </div>

  \`
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Todos los tipos',
  parameters: {
    docs: {
      description: {
        story: 'Los tres estilos de línea disponibles: \`default\` (sólida), \`dot\` (punteada) y \`dash\` (discontinua).'
      }
    }
  },
  render: () => html\`
    <div style="display:flex;flex-direction:column;gap:24px;padding:16px;">
      <span style="font-size:12px;color:#888">type="default" — sólida</span>
      <dcx-web-divider type="default" color="\${tokens.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">type="dot" — punteada</span>
      <dcx-web-divider type="dot" color="\${tokens.background.primary}"></dcx-web-divider>

      <span style="font-size:12px;color:#888">type="dash" — discontinua</span>
      <dcx-web-divider type="dash" color="\${tokens.background.primary}"></dcx-web-divider>
    </div>
  \`
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Variantes de grosor',
  parameters: {
    docs: {
      description: {
        story: 'El input \`thickness\` controla el grosor en \`rem\`. Se muestran ejemplos en horizontal y vertical.'
      }
    }
  },
  render: () => html\`
    <div style="display:flex;gap:48px;padding:16px;">
      
      <div style="display:flex;flex-direction:column;gap:20px;flex:1;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em">
          Horizontal
        </span>

        <span style="font-size:12px;color:#888">thickness=0.1</span>
        <dcx-web-divider thickness="0.1" color="\${tokens.background.primary}"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.25</span>
        <dcx-web-divider thickness="0.25" color="\${tokens.background.primary}"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.4</span>
        <dcx-web-divider thickness="0.4" color="\${tokens.background.primary}"></dcx-web-divider>

        <span style="font-size:12px;color:#888">thickness=0.8</span>
        <dcx-web-divider thickness="0.8" color="\${tokens.background.primary}"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:row;gap:32px;height:200px;align-items:stretch;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em;writing-mode:vertical-rl;align-self:center;">
          Vertical
        </span>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.1</span>
          <dcx-web-divider thickness="0.1" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.25</span>
          <dcx-web-divider thickness="0.25" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.4</span>
          <dcx-web-divider thickness="0.4" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:12px;color:#888">0.8</span>
          <dcx-web-divider thickness="0.8" orientation="vertical" color="\${tokens.background.primary}"></dcx-web-divider>
        </div>

      </div>

    </div>
  \`
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Variantes de color',
  parameters: {
    docs: {
      description: {
        story: 'El input \`color\` acepta cualquier valor CSS. Los divisores sin label son decorativos.'
      }
    }
  },
  render: () => html\`
    <div style="display:flex;gap:32px;padding:16px;">
      
      <div style="display:flex;flex-direction:column;gap:12px;flex:1;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em">
          Horizontal
        </span>

        <dcx-web-divider color="#e6f0ff"></dcx-web-divider>
        <dcx-web-divider color="#cfe0ff"></dcx-web-divider>
        <dcx-web-divider color="#b8d1ff"></dcx-web-divider>
        <dcx-web-divider color="#8ab1ff"></dcx-web-divider>
        <dcx-web-divider color="#5c8fff"></dcx-web-divider>
        <dcx-web-divider color="#2e6fff"></dcx-web-divider>
        <dcx-web-divider color="#155fff"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:row;gap:12px;height:180px;align-items:stretch;">
        <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.08em;writing-mode:vertical-rl;align-self:center;">
          Vertical
        </span>

        <dcx-web-divider orientation="vertical" color="#e6f0ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#cfe0ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#b8d1ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#8ab1ff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#5c8fff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#2e6fff"></dcx-web-divider>
        <dcx-web-divider orientation="vertical" color="#155fff"></dcx-web-divider>
      </div>
    </div>
  \`
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Con etiqueta — Horizontal y Vertical',
  parameters: {
    docs: {
      description: {
        story: 'Divisores con etiqueta centrada. En vertical, la etiqueta se rota y se mantiene centrada.'
      }
    }
  },
  render: () => html\`
    <div style="display:flex;flex-direction:column;gap:48px;padding:24px;">
      
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:12px;color:#888">
          orientation="horizontal"
        </span>
        <dcx-web-divider label="Título de sección" color="\${tokens.background.primary}"></dcx-web-divider>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-size:12px;color:#888">
          orientation="vertical" (altura acotada por el padre)
        </span>

        <div style="display:flex;height:200px;gap:16px;">
          <p style="margin:0;align-self:center;">Contenido izquierdo</p>
          <dcx-web-divider orientation="vertical" label="o" color="\${tokens.background.primary}"></dcx-web-divider>
          <p style="margin:0;align-self:center;">Contenido derecho</p>
        </div>
      </div>

    </div>
  \`
}`,...p.parameters?.docs?.source}}};var m=[`Default`,`HorizontalSizes`,`VerticalSizes`,`AllTypes`,`ThicknessVariants`,`ColorVariants`,`LabeledDividers`];export{u as AllTypes,f as ColorVariants,s as Default,c as HorizontalSizes,p as LabeledDividers,d as ThicknessVariants,l as VerticalSizes,m as __namedExportsOrder,o as default};