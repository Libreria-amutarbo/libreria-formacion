import{a as e}from"./lit-C11zoK0j.js";import"./src-DoNJey08.js";import{n as t}from"./dist-D-WY45sR.js";var n={title:`DCXLibrary/WebComponents/Chip`,component:`dcx-web-chip`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},args:{variant:`choice`,color:`primary`,label:`Chip por defecto`,icon:``,image:``,removable:!1},argTypes:{label:{control:{type:`text`},description:`Texto del chip (obligatorio)`,table:{type:{summary:`string`},category:`Atributos`,defaultValue:{summary:`""`}}},color:{control:{type:`select`},options:[`primary`,`secondary`,`success`,`warning`,`error`,`info`,`gray`],description:`Color del chip según el sistema de diseño`,table:{type:{summary:`string`},category:`Atributos`,defaultValue:{summary:`primary`}}},variant:{control:{type:`select`},options:[`choice`,`filter`],description:"Variante del chip: `choice` (no removible) o `filter` (muestra botón de eliminar)",table:{type:{summary:`"choice" | "filter"`},category:`Atributos`,defaultValue:{summary:`choice`}}},icon:{control:{type:`select`},options:[``,`house`,`person`,`gear`,`star`,`code-slash`,`terminal`,`palette`,`book`,`bug`],description:`Icono de Bootstrap (opcional)`,table:{type:{summary:`string`},category:`Atributos`,defaultValue:{summary:``}}},image:{control:`text`,type:{name:`string`},description:`URL de imagen para mostrar en el chip (opcional)`,table:{type:{summary:`string`},category:`Atributos`,defaultValue:{summary:`""`}}},removable:{control:{type:`boolean`},description:'Muestra el botón de eliminar independientemente de la variante. Alternativa a `variant="filter"`.',table:{type:{summary:`boolean`},category:`Atributos`,defaultValue:{summary:`false`}}}},render:n=>e`
    <dcx-web-chip
      label=${n.label}
      color=${n.color}
      variant=${n.variant}
      ?removable=${n.removable}
      icon=${n.icon}
      image=${n.image}
      @dcx-chip-remove=${t()}
    ></dcx-web-chip>
  `},r={args:{label:`Chip por defecto`,color:`primary`,variant:`choice`}},i={args:{label:`Chip primario`,color:`primary`}},a={args:{label:`Con icono`,icon:`house`,color:`primary`}},o={args:{label:`Con imagen`,image:`https://picsum.photos/360/240`,color:`secondary`}},s={args:{label:`Removible`,color:`warning`,variant:`filter`}},c={args:{label:`Angular`,icon:`code-slash`,color:`error`,variant:`filter`}},l={args:{label:`Usuario`,image:`https://picsum.photos/360/240`,color:`success`,variant:`filter`}},u={render:()=>e`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip label="Primary" color="primary"></dcx-web-chip>
      <dcx-web-chip label="Secondary" color="secondary"></dcx-web-chip>
      <dcx-web-chip label="Success" color="success"></dcx-web-chip>
      <dcx-web-chip label="Warning" color="warning"></dcx-web-chip>
      <dcx-web-chip label="Error" color="error"></dcx-web-chip>
      <dcx-web-chip label="Info" color="info"></dcx-web-chip>
      <dcx-web-chip label="Gray" color="gray"></dcx-web-chip>
    </div>
  `,parameters:{docs:{description:{story:`Muestra todos los colores disponibles del sistema de diseño.`}}}},d={render:()=>e`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip label="Home" icon="house" color="primary"></dcx-web-chip>
      <dcx-web-chip label="Usuario" icon="person" color="secondary"></dcx-web-chip>
      <dcx-web-chip label="Configuración" icon="gear" color="success"></dcx-web-chip>
      <dcx-web-chip label="Favorito" icon="star" color="warning"></dcx-web-chip>
      <dcx-web-chip label="Eliminar" icon="trash" color="error"></dcx-web-chip>
    </div>
  `,parameters:{docs:{description:{story:`Chips con diferentes iconos Bootstrap Icons.`}}}},f={render:()=>e`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip 
        label="Avatar 1" 
        image="https://picsum.photos/seed/a1/360/240" 
        color="primary">
      </dcx-web-chip>
      <dcx-web-chip 
        label="Avatar 2" 
        image="https://picsum.photos/seed/a2/360/240" 
        color="secondary">
      </dcx-web-chip>
      <dcx-web-chip 
        label="Avatar 3" 
        image="https://picsum.photos/seed/a3/360/240" 
        color="success">
      </dcx-web-chip>
    </div>
  `,parameters:{docs:{description:{story:`Chips con imágenes placeholder que simulan avatares de usuario.`}}}},p={render:()=>e`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip
        label="Removible"
        color="primary"
        variant="filter"
        @dcx-chip-remove=${()=>{}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Con icono"
        icon="star"
        color="warning"
        variant="filter"
        @dcx-chip-remove=${()=>{}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Con imagen"
        image="https://picsum.photos/seed/rm/360/240"
        color="error"
        variant="filter"
        @dcx-chip-remove=${()=>{}}
      ></dcx-web-chip>
    </div>
  `,parameters:{docs:{description:{story:`Chips removibles con diferentes configuraciones.`}}}},m={render:()=>e`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip
        label="Angular"
        icon="code-slash"
        color="error"
        variant="filter"
        @dcx-chip-remove=${()=>{}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="TypeScript"
        icon="terminal"
        color="primary"
        variant="filter"
        @dcx-chip-remove=${()=>{}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="SCSS"
        icon="palette"
        color="secondary"
        variant="filter"
        @dcx-chip-remove=${()=>{}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Storybook"
        icon="book"
        color="success"
        variant="filter"
        @dcx-chip-remove=${()=>{}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Jest"
        icon="bug"
        color="warning"
        variant="filter"
        @dcx-chip-remove=${()=>{}}
      ></dcx-web-chip>
    </div>
  `,parameters:{docs:{description:{story:`Ejemplo temático con tecnologías. Perfecto para filtros o tags de selección.`}}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Chip por defecto',
    color: 'primary',
    variant: 'choice'
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Chip primario',
    color: 'primary'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Con icono',
    icon: 'house',
    color: 'primary'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Con imagen',
    image: 'https://picsum.photos/360/240',
    color: 'secondary'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Removible',
    color: 'warning',
    variant: 'filter'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Angular',
    icon: 'code-slash',
    color: 'error',
    variant: 'filter'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Usuario',
    image: 'https://picsum.photos/360/240',
    color: 'success',
    variant: 'filter'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip label="Primary" color="primary"></dcx-web-chip>
      <dcx-web-chip label="Secondary" color="secondary"></dcx-web-chip>
      <dcx-web-chip label="Success" color="success"></dcx-web-chip>
      <dcx-web-chip label="Warning" color="warning"></dcx-web-chip>
      <dcx-web-chip label="Error" color="error"></dcx-web-chip>
      <dcx-web-chip label="Info" color="info"></dcx-web-chip>
      <dcx-web-chip label="Gray" color="gray"></dcx-web-chip>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Muestra todos los colores disponibles del sistema de diseño.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip label="Home" icon="house" color="primary"></dcx-web-chip>
      <dcx-web-chip label="Usuario" icon="person" color="secondary"></dcx-web-chip>
      <dcx-web-chip label="Configuración" icon="gear" color="success"></dcx-web-chip>
      <dcx-web-chip label="Favorito" icon="star" color="warning"></dcx-web-chip>
      <dcx-web-chip label="Eliminar" icon="trash" color="error"></dcx-web-chip>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Chips con diferentes iconos Bootstrap Icons.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip 
        label="Avatar 1" 
        image="https://picsum.photos/seed/a1/360/240" 
        color="primary">
      </dcx-web-chip>
      <dcx-web-chip 
        label="Avatar 2" 
        image="https://picsum.photos/seed/a2/360/240" 
        color="secondary">
      </dcx-web-chip>
      <dcx-web-chip 
        label="Avatar 3" 
        image="https://picsum.photos/seed/a3/360/240" 
        color="success">
      </dcx-web-chip>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Chips con imágenes placeholder que simulan avatares de usuario.'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip
        label="Removible"
        color="primary"
        variant="filter"
        @dcx-chip-remove=\${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Con icono"
        icon="star"
        color="warning"
        variant="filter"
        @dcx-chip-remove=\${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Con imagen"
        image="https://picsum.photos/seed/rm/360/240"
        color="error"
        variant="filter"
        @dcx-chip-remove=\${() => {}}
      ></dcx-web-chip>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Chips removibles con diferentes configuraciones.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip
        label="Angular"
        icon="code-slash"
        color="error"
        variant="filter"
        @dcx-chip-remove=\${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="TypeScript"
        icon="terminal"
        color="primary"
        variant="filter"
        @dcx-chip-remove=\${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="SCSS"
        icon="palette"
        color="secondary"
        variant="filter"
        @dcx-chip-remove=\${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Storybook"
        icon="book"
        color="success"
        variant="filter"
        @dcx-chip-remove=\${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Jest"
        icon="bug"
        color="warning"
        variant="filter"
        @dcx-chip-remove=\${() => {}}
      ></dcx-web-chip>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo temático con tecnologías. Perfecto para filtros o tags de selección.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}};var h=[`Default`,`Primary`,`WithIcon`,`WithImage`,`Removable`,`RemovableWithIcon`,`RemovableWithImage`,`AllColors`,`WithIcons`,`WithImages`,`RemovableChips`,`TechnologyTags`];export{u as AllColors,r as Default,i as Primary,s as Removable,p as RemovableChips,c as RemovableWithIcon,l as RemovableWithImage,m as TechnologyTags,a as WithIcon,d as WithIcons,o as WithImage,f as WithImages,h as __namedExportsOrder,n as default};