import{a as e}from"./lit-LoFRC6vp.js";import"./src-W4DUSJtk.js";var t={title:`DCXLibrary/WebComponents/Message`,component:`dcx-web-message`,tags:[`autodocs`],parameters:{layout:`centered`,controls:{expanded:!0}},argTypes:{body:{control:`text`,description:`Texto principal del mensaje.`,table:{category:`Atributos`}},type:{control:`select`,options:[`notification`,`success`,`warning`,`error`],description:`Severidad del mensaje.`,table:{category:`Atributos`}},title:{control:`text`,description:`Título opcional del mensaje.`,table:{category:`Atributos`}},link:{control:`text`,description:`URL opcional mostrada como enlace.`,table:{category:`Atributos`}},icon:{control:`boolean`,description:`Muestra icono asociado a la severidad.`,table:{category:`Atributos`}},iconName:{control:`text`,description:`Sobrescribe el icono por defecto.`,table:{category:`Atributos`}},showClose:{control:`boolean`,description:`Muestra botón de cierre.`,table:{category:`Atributos`}},announce:{control:`boolean`,description:`Activa role y aria-live para lectores de pantalla.`,table:{category:`Atributos`}},closed:{action:`closed`,description:`Emitido al cerrar el mensaje.`,table:{category:`Eventos`}}},args:{body:`Este es un mensaje de ejemplo`,type:`notification`,title:``,link:``,icon:!1,iconName:``,showClose:!1,announce:!0},render:t=>e`
    <dcx-web-message
      body=${t.body}
      type=${t.type}
      title=${t.title}
      link=${t.link}
      iconName=${t.iconName}
      ?icon=${t.icon}
      ?showClose=${t.showClose}
      ?announce=${t.announce}
    >
    </dcx-web-message>
  `},n={args:{body:`Este es un mensaje de notificación por defecto.`}},r={args:{type:`notification`,title:`Información`,body:`Esta es una notificación informativa para el usuario.`,icon:!0}},i={args:{type:`success`,title:`¡Éxito!`,body:`La operación se ha completado exitosamente.`,icon:!0}},a={args:{type:`warning`,title:`Advertencia`,body:`Esta acción no se puede deshacer.`,icon:!0}},o={args:{type:`error`,title:`Error`,body:`Ha ocurrido un error al procesar tu solicitud.`,icon:!0,showClose:!0}},s={args:{type:`notification`,title:`Información adicional`,body:`Consulta la documentación para conocer todos los detalles.`,link:`https://ejemplo.com/docs`,icon:!0}},c={args:{type:`success`,title:`Guardado`,body:`Pulsa la X para cerrar este mensaje.`,icon:!0,showClose:!0}},l={args:{body:`Experimenta con todas las propiedades del componente.`,type:`notification`,title:`Playground`,link:`https://ejemplo.com`,icon:!0,showClose:!0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    body: 'Este es un mensaje de notificación por defecto.'
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'notification',
    title: 'Información',
    body: 'Esta es una notificación informativa para el usuario.',
    icon: true
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'success',
    title: '¡Éxito!',
    body: 'La operación se ha completado exitosamente.',
    icon: true
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'warning',
    title: 'Advertencia',
    body: 'Esta acción no se puede deshacer.',
    icon: true
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'error',
    title: 'Error',
    body: 'Ha ocurrido un error al procesar tu solicitud.',
    icon: true,
    showClose: true
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'notification',
    title: 'Información adicional',
    body: 'Consulta la documentación para conocer todos los detalles.',
    link: 'https://ejemplo.com/docs',
    icon: true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'success',
    title: 'Guardado',
    body: 'Pulsa la X para cerrar este mensaje.',
    icon: true,
    showClose: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    body: 'Experimenta con todas las propiedades del componente.',
    type: 'notification',
    title: 'Playground',
    link: 'https://ejemplo.com',
    icon: true,
    showClose: true
  }
}`,...l.parameters?.docs?.source}}};var u=[`Default`,`Notification`,`Success`,`Warning`,`Error`,`WithLink`,`Closable`,`Playground`];export{c as Closable,n as Default,o as Error,r as Notification,l as Playground,i as Success,a as Warning,s as WithLink,u as __namedExportsOrder,t as default};