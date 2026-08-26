import{a as e}from"./lit-C11zoK0j.js";import"./src-DoNJey08.js";var t={title:`DCXLibrary/WebComponents/Textarea`,component:`dcx-web-textarea`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{value:{control:`text`,description:`Valor del textarea.`,table:{category:`Atributos`}},label:{control:`text`,description:`Etiqueta visible asociada al textarea.`,table:{category:`Atributos`}},rows:{control:`number`,description:`Número de filas visibles.`,table:{category:`Atributos`}},cols:{control:`number`,description:`Número de columnas visibles.`,table:{category:`Atributos`}},placeholder:{control:`text`,description:`Placeholder del textarea.`,table:{category:`Atributos`}},autoResize:{control:`boolean`,description:`Ajusta automáticamente la altura según el contenido.`,table:{category:`Atributos`}},floatLabel:{control:`select`,options:[`over`,`in`,`on`,`ifta`],description:`Variante de etiqueta flotante.`,table:{category:`Atributos`}},size:{control:`select`,options:[`small`,`normal`,`large`],description:`Tamaño del textarea.`,table:{category:`Atributos`}},fluid:{control:`boolean`,table:{category:`Atributos`}},filled:{control:`boolean`,table:{category:`Atributos`}},disabled:{control:`boolean`,table:{category:`Atributos`}},readonly:{control:`boolean`,table:{category:`Atributos`}},invalid:{control:`boolean`,table:{category:`Atributos`}},errorMessage:{control:`text`,table:{category:`Atributos`}},required:{control:`boolean`,table:{category:`Atributos`}},hint:{control:`text`,table:{category:`Atributos`}},maxLength:{control:`number`,table:{category:`Atributos`}},resizable:{control:`boolean`,table:{category:`Atributos`}},valueChange:{action:`valueChange`,description:`Emitido cuando cambia el valor.`,table:{category:`Eventos`}}},args:{value:``,label:`Comentarios`,rows:5,cols:30,placeholder:`Escribe aquí...`,autoResize:!1,size:`normal`,fluid:!1,filled:!1,disabled:!1,readonly:!1,invalid:!1,errorMessage:``,required:!1,hint:``,resizable:!0},render:t=>e`
    <dcx-web-textarea
      .value=${t.value}
      .rows=${t.rows}
      .cols=${t.cols}
      label=${t.label}
      placeholder=${t.placeholder}
      ?disabled=${t.disabled}
      ?readonly=${t.readonly}
      ?autoResize=${t.autoResize}
      floatLabel=${t.floatLabel??``}
      size=${t.size}
      ?fluid=${t.fluid}
      ?filled=${t.filled}
      ?invalid=${t.invalid}
      errorMessage=${t.errorMessage}
      ?required=${t.required}
      hint=${t.hint}
      .maxLength=${t.maxLength}
      ?resizable=${t.resizable}
    >
    </dcx-web-textarea>
  `},n={},r={args:{autoResize:!0,value:`Añade más líneas para ver cómo crece.`},parameters:{docs:{description:{story:`La propiedad autoResize permite que el textarea ajuste su altura automáticamente según el contenido.`}}}},i={render:()=>e`
    <div
      style="
        display:flex;
        gap: var(--sp-8, 32px);
        flex-wrap:wrap;
      "
    >
      <dcx-web-textarea
        floatLabel="over"
        label="Over Label"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        floatLabel="in"
        label="In Label"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        floatLabel="on"
        label="On Label"
      >
      </dcx-web-textarea>
    </div>
  `},a={args:{floatLabel:`ifta`,label:`Description`},parameters:{docs:{description:{story:`El estilo IFTA (In-Field Text Area) es una variante de etiqueta flotante que se muestra dentro del área de texto cuando el campo está vacío.`}}}},o={render:()=>e`
    <div
      style="
        display:flex;
        gap: var(--sp-8, 32px);
        flex-wrap:wrap;
      "
    >
      <dcx-web-textarea
        size="small"
        placeholder="Small"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        placeholder="Normal"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        size="large"
        placeholder="Large"
      >
      </dcx-web-textarea>
    </div>
  `},s={args:{fluid:!0,label:`Descripción`,placeholder:`Fluid textarea`},parameters:{docs:{description:{story:`La propiedad fluid hace que el textarea ocupe el 100% del ancho de su contenedor, adaptándose a diferentes tamaños de pantalla y diseños.`}}}},c={args:{filled:!0,placeholder:`Filled textarea`},parameters:{docs:{description:{story:`El estilo filled se activa con la propiedad filled, que aplica un fondo relleno al textarea para diferenciarlo visualmente.`}}}},l={args:{disabled:!0,placeholder:`Disabled textarea`},parameters:{docs:{description:{story:`El estado deshabilitado se aplica usando la propiedad disabled, que bloquea la interacción y aplica estilos visuales para indicar que el textarea no está activo.`}}}},u={args:{label:`Descripción`,required:!0,invalid:!0,errorMessage:`Este campo es obligatorio`},parameters:{docs:{description:{story:`El estado inválido se activa con la propiedad invalid, que aplica estilos de error al textarea y al label, y muestra el asterisco de campo obligatorio si required es true. El mensaje de error se anuncia con role="alert".`}}}},d={args:{label:`Notas`,filled:!0,hint:`Max. 500 caracteres`,maxLength:500},parameters:{docs:{description:{story:`La propiedad hint muestra un texto de ayuda bajo el campo (se oculta automáticamente si hay un error visible). maxLength aplica el atributo maxlength nativo.`}}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    autoResize: true,
    value: 'Añade más líneas para ver cómo crece.'
  },
  parameters: {
    docs: {
      description: {
        story: 'La propiedad autoResize permite que el textarea ajuste su altura automáticamente según el contenido.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        gap: var(--sp-8, 32px);
        flex-wrap:wrap;
      "
    >
      <dcx-web-textarea
        floatLabel="over"
        label="Over Label"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        floatLabel="in"
        label="In Label"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        floatLabel="on"
        label="On Label"
      >
      </dcx-web-textarea>
    </div>
  \`
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    floatLabel: 'ifta',
    label: 'Description'
  },
  parameters: {
    docs: {
      description: {
        story: 'El estilo IFTA (In-Field Text Area) es una variante de etiqueta flotante que se muestra dentro del área de texto cuando el campo está vacío.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        gap: var(--sp-8, 32px);
        flex-wrap:wrap;
      "
    >
      <dcx-web-textarea
        size="small"
        placeholder="Small"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        placeholder="Normal"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        size="large"
        placeholder="Large"
      >
      </dcx-web-textarea>
    </div>
  \`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    fluid: true,
    label: 'Descripción',
    placeholder: 'Fluid textarea'
  },
  parameters: {
    docs: {
      description: {
        story: 'La propiedad fluid hace que el textarea ocupe el 100% del ancho de su contenedor, adaptándose a diferentes tamaños de pantalla y diseños.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    filled: true,
    placeholder: 'Filled textarea'
  },
  parameters: {
    docs: {
      description: {
        story: 'El estilo filled se activa con la propiedad filled, que aplica un fondo relleno al textarea para diferenciarlo visualmente.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled textarea'
  },
  parameters: {
    docs: {
      description: {
        story: 'El estado deshabilitado se aplica usando la propiedad disabled, que bloquea la interacción y aplica estilos visuales para indicar que el textarea no está activo.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Descripción',
    required: true,
    invalid: true,
    errorMessage: 'Este campo es obligatorio'
  },
  parameters: {
    docs: {
      description: {
        story: 'El estado inválido se activa con la propiedad invalid, que aplica estilos de error al textarea y al label, y muestra el asterisco de campo obligatorio si required es true. El mensaje de error se anuncia con role="alert".'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Notas',
    filled: true,
    hint: 'Max. 500 caracteres',
    maxLength: 500
  },
  parameters: {
    docs: {
      description: {
        story: 'La propiedad hint muestra un texto de ayuda bajo el campo (se oculta automáticamente si hay un error visible). maxLength aplica el atributo maxlength nativo.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};var f=[`Default`,`AutoResize`,`FloatLabelVariants`,`IftaLabel`,`Sizes`,`Fluid`,`Filled`,`Disabled`,`Invalid`,`WithHint`];export{r as AutoResize,n as Default,l as Disabled,c as Filled,i as FloatLabelVariants,s as Fluid,a as IftaLabel,u as Invalid,o as Sizes,d as WithHint,f as __namedExportsOrder,t as default};