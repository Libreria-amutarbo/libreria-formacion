import{a as e}from"./lit-LoFRC6vp.js";import"./src-C-ciJ0Zm.js";var t={title:`DCXLibrary/WebComponents/Progressbar`,component:`dcx-web-progressbar`,tags:[`autodocs`],parameters:{controls:{expanded:!0},docs:{description:{component:"`dcx-web-progressbar` es un componente versátil para mostrar el progreso de tareas o guiar al usuario a través de pasos. Soporta tres variantes: barra de progreso simple (default), barra segmentada con animación (segmented) y stepper con pasos numerados o checkmarks (stepper)."}}},argTypes:{variant:{control:`select`,options:[`default`,`segmented`,`stepper`],description:`Variante del progressbar.`,table:{category:`Atributos`}},value:{control:{type:`range`,min:0,max:100,step:5},description:`Porcentaje de progreso para variantes default y segmented.`,table:{category:`Atributos`}},label:{control:`text`,description:`Texto visible de la cabecera.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Nombre accesible cuando no existe cabecera visible.`,table:{category:`Atributos`}},showLabel:{control:`boolean`,description:`Muestra cabecera con etiqueta y porcentaje.`,table:{category:`Atributos`}},showTooltip:{control:`boolean`,description:`Muestra tooltip con el porcentaje.`,table:{category:`Atributos`}},steps:{control:`object`,description:`Array de pasos para la variante stepper.`,table:{category:`Atributos`}},currentStep:{control:{type:`number`,min:1,max:10},description:`Paso activo actual.`,table:{category:`Atributos`}},showCheckmarks:{control:`boolean`,description:`Muestra iconos check en pasos completados.`,table:{category:`Atributos`}},segments:{control:{type:`number`,min:1,max:20},description:`Número de segmentos visibles.`,table:{category:`Atributos`}}},args:{variant:`default`,value:60,label:``,ariaLabel:`Progreso`,showLabel:!1,showTooltip:!1,steps:[{label:`Paso 1`},{label:`Paso 2`},{label:`Paso 3`}],currentStep:1,showCheckmarks:!1,segments:5},render:t=>e`
    <dcx-web-progressbar
      variant=${t.variant}
      .value=${t.value}
      label=${t.label}
      aria-label=${t.ariaLabel}
      ?showLabel=${t.showLabel}
      ?showTooltip=${t.showTooltip}
      .steps=${t.steps}
      .currentStep=${t.currentStep}
      ?showCheckmarks=${t.showCheckmarks}
      .segments=${t.segments}
    >
    </dcx-web-progressbar>
  `},n={},r={args:{variant:`segmented`,value:70,segments:5}},i={args:{value:75,showTooltip:!0}},a={args:{value:82,label:`Progreso`,showLabel:!0}},o={args:{value:0,label:`Progreso`,showLabel:!0}},s={args:{value:100,label:`Progreso`,showLabel:!0}},c={args:{variant:`stepper`,steps:[{label:`Step 1`},{label:`Step 2`},{label:`Step 3`},{label:`Step 4`}],currentStep:3,showCheckmarks:!1}},l={args:{variant:`stepper`,steps:[{label:`Completado`},{label:`Completado`},{label:`En proceso`},{label:`Pendiente`}],currentStep:3,showCheckmarks:!0}},u={args:{variant:`stepper`,steps:[{label:`Carrito`},{label:`Envío`},{label:`Revisión`},{label:`Pago`}],currentStep:3}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'segmented',
    value: 70,
    segments: 5
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    value: 75,
    showTooltip: true
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    value: 82,
    label: 'Progreso',
    showLabel: true
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: 0,
    label: 'Progreso',
    showLabel: true
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: 100,
    label: 'Progreso',
    showLabel: true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'stepper',
    steps: [{
      label: 'Step 1'
    }, {
      label: 'Step 2'
    }, {
      label: 'Step 3'
    }, {
      label: 'Step 4'
    }],
    currentStep: 3,
    showCheckmarks: false
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'stepper',
    steps: [{
      label: 'Completado'
    }, {
      label: 'Completado'
    }, {
      label: 'En proceso'
    }, {
      label: 'Pendiente'
    }],
    currentStep: 3,
    showCheckmarks: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'stepper',
    steps: [{
      label: 'Carrito'
    }, {
      label: 'Envío'
    }, {
      label: 'Revisión'
    }, {
      label: 'Pago'
    }],
    currentStep: 3
  }
}`,...u.parameters?.docs?.source}}};var d=[`Default`,`Segmented`,`WithTooltip`,`WithHeaderLabel`,`Zero`,`Complete`,`StepperNumbered`,`StepperCheckmarks`,`StepperProcess`];export{s as Complete,n as Default,r as Segmented,l as StepperCheckmarks,c as StepperNumbered,u as StepperProcess,a as WithHeaderLabel,i as WithTooltip,o as Zero,d as __namedExportsOrder,t as default};