import{a as e}from"./lit-LoFRC6vp.js";import{_ as t,g as n}from"./src-DGtfoAnf.js";var r=[{id:`1`,label:`Datos personales`,description:`Introduce tus datos`},{id:`2`,label:`Dirección`,description:`Confirma tu dirección`},{id:`3`,label:`Revisión`,description:`Revisa tu información`}],i=[{id:`1`,label:`Datos personales`,completed:!0},{id:`2`,label:`Dirección`,completed:!0},{id:`3`,label:`Revisión`},{id:`4`,label:`Pago`}],a=[{id:`1`,label:`Paso 1`},{id:`2`,label:`Paso 2 (deshabilitado)`,disabled:!0},{id:`3`,label:`Paso 3`}],o=[{id:`1`,label:`Paso 1`,completed:!0},{id:`2`,label:`Paso 2 (error)`,error:!0},{id:`3`,label:`Paso 3`}],s=[{id:`1`,label:`Paso obligatorio`,description:`Este paso es obligatorio`},{id:`2`,label:`Paso opcional`,description:`Este paso se puede omitir`,optional:!0},{id:`3`,label:`Paso obligatorio`,description:`Otro paso obligatorio`}],c=[{id:`1`,label:`Inicio`,icon:`house`},{id:`2`,label:`Ajustes`,icon:`gear`},{id:`3`,label:`Usuarios`,icon:`people`}],l={title:`DCXLibrary/WebComponents/Stepper`,component:`dcx-web-stepper`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{steps:{control:`object`,description:`Array de pasos del stepper.`,table:{category:`Atributos`}},activeStepId:{control:`text`,description:`Id del paso activo.`,table:{category:`Atributos`}},orientation:{control:`select`,options:n,description:`Orientación del stepper.`,table:{category:`Atributos`}},linear:{control:`boolean`,description:`Activa navegación secuencial.`,table:{category:`Atributos`}},showStepNumbers:{control:`boolean`,description:`Muestra números de paso.`,table:{category:`Atributos`}},size:{control:`select`,options:t,description:`Tamaño del componente.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Nombre accesible del landmark.`,table:{category:`Atributos`}},stepClick:{action:`stepClick`,description:`Emitido cuando se hace click sobre un paso.`,table:{category:`Eventos`}},stepChange:{action:`stepChange`,description:`Emitido cuando cambia el paso activo.`,table:{category:`Eventos`}}},args:{steps:r,activeStepId:`1`,orientation:`horizontal`,linear:!1,showStepNumbers:!0,size:`m`,ariaLabel:``},render:t=>e`
    <dcx-web-stepper
      .steps=${t.steps}
      .activeStepId=${t.activeStepId}
      orientation=${t.orientation}
      ?linear=${t.linear}
      .showStepNumbers=${t.showStepNumbers}
      size=${t.size}
      aria-label=${t.ariaLabel}
    >
    </dcx-web-stepper>
  `},u={},d={args:{orientation:`vertical`}},f={args:{linear:!0}},p={name:`Con pasos completados`,args:{steps:i,activeStepId:`3`}},m={name:`Con pasos deshabilitados`,args:{steps:a}},h={name:`Con estado de error`,args:{steps:o,activeStepId:`2`}},g={name:`Con paso opcional`,args:{steps:s}},_={name:`Pequeño`,args:{size:`s`}},v={name:`Grande`,args:{size:`l`}},y={name:`Extra grande`,args:{size:`xl`}},b={name:`Sin números (con iconos)`,args:{showStepNumbers:!1,steps:c}},x={name:`Con contenido por paso`,render:()=>e`
    <dcx-web-stepper
      .steps=${[{id:`1`,label:`Datos personales`,description:`Completado`,completed:!0},{id:`2`,label:`Dirección de envío`,description:`Introduce tu dirección`,contentTpl:`slot`},{id:`3`,label:`Método de pago`,description:`Pendiente`}]}
      activeStepId="2"
      orientation="vertical"
      aria-label="Proceso de compra"
    >
      <div slot="step-content">
        <p style="margin:0 0 var(--sp-2, 8px);font-weight: var(--fw-semibold, 600);">
          Dirección de envío
        </p>

        <p
          style="
            margin:0;
            color:var(--text-muted,#696e75);
            font-size:var(--fs-base, 13px);
          "
        >
          Calle Ejemplo, 42 · 28001 Madrid · España
        </p>
      </div>
    </dcx-web-stepper>
  `,parameters:{controls:{disable:!0}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    linear: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Con pasos completados',
  args: {
    steps: STEPPER_WITH_COMPLETED,
    activeStepId: '3'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Con pasos deshabilitados',
  args: {
    steps: STEPPER_WITH_DISABLED
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Con estado de error',
  args: {
    steps: STEPPER_WITH_ERROR,
    activeStepId: '2'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Con paso opcional',
  args: {
    steps: STEPPER_WITH_OPTIONAL
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Pequeño',
  args: {
    size: 's'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Grande',
  args: {
    size: 'l'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Extra grande',
  args: {
    size: 'xl'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Sin números (con iconos)',
  args: {
    showStepNumbers: false,
    steps: STEPPER_WITH_ICONS
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Con contenido por paso',
  render: () => html\`
    <dcx-web-stepper
      .steps=\${[{
    id: '1',
    label: 'Datos personales',
    description: 'Completado',
    completed: true
  }, {
    id: '2',
    label: 'Dirección de envío',
    description: 'Introduce tu dirección',
    contentTpl: 'slot'
  }, {
    id: '3',
    label: 'Método de pago',
    description: 'Pendiente'
  }]}
      activeStepId="2"
      orientation="vertical"
      aria-label="Proceso de compra"
    >
      <div slot="step-content">
        <p style="margin:0 0 var(--sp-2, 8px);font-weight: var(--fw-semibold, 600);">
          Dirección de envío
        </p>

        <p
          style="
            margin:0;
            color:var(--text-muted,#696e75);
            font-size:var(--fs-base, 13px);
          "
        >
          Calle Ejemplo, 42 · 28001 Madrid · España
        </p>
      </div>
    </dcx-web-stepper>
  \`,
  parameters: {
    controls: {
      disable: true
    }
  }
}`,...x.parameters?.docs?.source}}};var S=[`Default`,`Vertical`,`Linear`,`WithCompletedSteps`,`WithDisabledSteps`,`WithErrorSteps`,`WithOptionalSteps`,`Small`,`Large`,`ExtraLarge`,`WithoutNumbers`,`WithContent`];export{u as Default,y as ExtraLarge,v as Large,f as Linear,_ as Small,d as Vertical,p as WithCompletedSteps,x as WithContent,m as WithDisabledSteps,h as WithErrorSteps,g as WithOptionalSteps,b as WithoutNumbers,S as __namedExportsOrder,l as default};