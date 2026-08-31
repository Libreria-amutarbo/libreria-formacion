import{a as e}from"./lit-C11zoK0j.js";import"./src-DBHVDizf.js";var t={title:`DCXLibrary/WebComponents/Paginator`,component:`dcx-web-paginator`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{paginator:{control:`object`,description:`Configuración del paginador.`,table:{category:`Atributos`}},limitedButtons:{control:`boolean`,description:`Muestra botones de primera y última página.`,table:{category:`Atributos`}},showItemsPerPageInfo:{control:`boolean`,description:`Muestra selector de items por página y rango.`,table:{category:`Atributos`}},showPageInfo:{control:`boolean`,description:`Muestra "Página X de Y".`,table:{category:`Atributos`}},pageSizeOptions:{control:`object`,description:`Opciones disponibles para items por página.`,table:{category:`Atributos`}},pageChange:{action:`pageChange`,description:`Se emite al cambiar de página.`,table:{category:`Eventos`}},totalPagesChange:{action:`totalPagesChange`,description:`Se emite cuando cambia el total de páginas.`,table:{category:`Eventos`}},itemsPerPageChange:{action:`itemsPerPageChange`,description:`Se emite al cambiar items por página.`,table:{category:`Eventos`}}},args:{paginator:{totalItems:100,itemsPerPage:10,currentPage:1},limitedButtons:!1,showItemsPerPageInfo:!1,showPageInfo:!1,pageSizeOptions:[5,10,20]},render:t=>e`
    <dcx-web-paginator
      .paginator=${t.paginator}
      .pageSizeOptions=${t.pageSizeOptions}
      ?limitedButtons=${t.limitedButtons}
      ?showItemsPerPageInfo=${t.showItemsPerPageInfo}
      ?showPageInfo=${t.showPageInfo}
    >
    </dcx-web-paginator>
  `},n={parameters:{docs:{description:{story:`Ejemplo 1 - Paginator por defecto.`}}}},r={args:{paginator:{totalItems:21,itemsPerPage:5,currentPage:1},showItemsPerPageInfo:!0},parameters:{docs:{description:{story:`Ejemplo 2 - Paginator con selector de elementos por página.`}}}},i={args:{paginator:{totalItems:100,itemsPerPage:10,currentPage:1},limitedButtons:!0},parameters:{docs:{description:{story:`Ejemplo 3 - Paginator con navegación a la primera y última posición.`}}}},a={args:{paginator:{totalItems:100,itemsPerPage:10,currentPage:2},showPageInfo:!0},parameters:{docs:{description:{story:`Ejemplo 4 - Conociendo la página del total seleccionada.`}}}},o={args:{paginator:{totalItems:120,itemsPerPage:10,currentPage:1},limitedButtons:!1},parameters:{docs:{description:{story:`Estado inicial: primera página activa y flecha izquierda deshabilitada.`}}}},s={args:{paginator:{totalItems:300,itemsPerPage:10,currentPage:12},limitedButtons:!0},parameters:{docs:{description:{story:`Estado intermedio con elipsis y navegación extendida.`}}}},c={args:{paginator:{totalItems:120,itemsPerPage:10,currentPage:12},limitedButtons:!1},parameters:{docs:{description:{story:`Estado final: última página activa y flecha derecha deshabilitada.`}}}},l={args:{paginator:{totalItems:500,itemsPerPage:25,currentPage:1},showItemsPerPageInfo:!0,pageSizeOptions:[10,25,50,100]},parameters:{docs:{description:{story:`Ejemplo 5 - Paginator con opciones de tamaño de página personalizadas.`}}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 1 - Paginator por defecto.'
      }
    }
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    paginator: {
      totalItems: 21,
      itemsPerPage: 5,
      currentPage: 1
    },
    showItemsPerPageInfo: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 2 - Paginator con selector de elementos por página.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    paginator: {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 1
    },
    limitedButtons: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 3 - Paginator con navegación a la primera y última posición.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    paginator: {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 2
    },
    showPageInfo: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 4 - Conociendo la página del total seleccionada.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    paginator: {
      totalItems: 120,
      itemsPerPage: 10,
      currentPage: 1
    },
    limitedButtons: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial: primera página activa y flecha izquierda deshabilitada.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    paginator: {
      totalItems: 300,
      itemsPerPage: 10,
      currentPage: 12
    },
    limitedButtons: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado intermedio con elipsis y navegación extendida.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    paginator: {
      totalItems: 120,
      itemsPerPage: 10,
      currentPage: 12
    },
    limitedButtons: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado final: última página activa y flecha derecha deshabilitada.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    paginator: {
      totalItems: 500,
      itemsPerPage: 25,
      currentPage: 1
    },
    showItemsPerPageInfo: true,
    pageSizeOptions: [10, 25, 50, 100]
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 5 - Paginator con opciones de tamaño de página personalizadas.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};var u=[`Default`,`WithSelector`,`LimitedButtons`,`WithPageInfo`,`FirstPageState`,`MiddleWithEllipsis`,`LastPageState`,`CustomPageSizes`];export{l as CustomPageSizes,n as Default,o as FirstPageState,c as LastPageState,i as LimitedButtons,s as MiddleWithEllipsis,a as WithPageInfo,r as WithSelector,u as __namedExportsOrder,t as default};