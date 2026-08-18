import{a as e}from"./lit-C11zoK0j.js";import"./src-m3A1U2e8.js";import{n as t,r as n}from"./dist-C_OGQ9pp.js";var r=[{label:`Inicio`,href:`/`,disabled:!1},{label:`Catálogo`,href:`/catalogo`,disabled:!1},{label:`Portátiles`,disabled:!1}],i=[{label:`Inicio`,href:`/`,icon:`house`,disabled:!1},{label:`Catálogo`,href:`/catalogo`,icon:`grid`,disabled:!0},{label:`Portátiles`,icon:`laptop`,disabled:!1}],a=[{label:`Inicio`,href:`/`,disabled:!0},{label:`Catálogo`,href:`/catalogo`,disabled:!0},{label:`Portátiles`,disabled:!0}],o=[{label:`Inicio`,href:`/`,disabled:!1},{label:`Documentación`,href:`/docs`,disabled:!1},{label:`Breadcrumb`,disabled:!1}],s=[{label:`Inicio`,href:`/`,disabled:!1},{label:`Electrónica`,href:`/electronica`,disabled:!1},{label:`Ordenadores`,href:`/ordenadores`,disabled:!1},{label:`Portátiles`,href:`/portatiles`,disabled:!1},{label:`Gaming`,disabled:!1}],c=`slash-lg`,l=`arrow-right-short`,u=`chevron-right`,d=[`slash-lg`,`arrow-right-short`,`chevron-right`],f=e=>e.map(e=>({...e,href:e.href?`#`:void 0})),p=t(e=>{alert(`Navegando a: ${e.label}`)}),m={title:`DCXLibrary/WebComponents/Breadcrumb`,component:`dcx-web-breadcrumb`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{items:{name:`items`,control:{type:`object`},table:{category:`Atributos`,type:{summary:`DcxBreadcrumbItem[]`},defaultValue:{summary:`DcxBreadCrumbItemDefault`}}},iconSeparator:{name:`iconSeparator`,control:`select`,options:d,table:{category:`Atributos`,type:{summary:`DcxBreadCrumbSeparatorIcons (string)`},defaultValue:{summary:c}}},itemSelected:{name:`itemSelected`,action:`itemSelected`,table:{category:`Eventos`,type:{summary:`(item: DcxBreadcrumbItem) => void`},defaultValue:{summary:`-`}}}},args:{items:f(r),iconSeparator:c,itemSelected:p},render:t=>e`
    <dcx-web-breadcrumb
      .items="${t.items}"
      icon-separator="${t.iconSeparator}"
      @itemSelected="${t.itemSelected}"
    ></dcx-web-breadcrumb>
  `},h={args:{itemSelected:p}},g={args:{items:f(i),iconSeparator:c,itemSelected:p}},_={args:{items:f(a),iconSeparator:c,itemSelected:p}},v={args:{items:f(r),iconSeparator:l,itemSelected:p}},y={args:{items:f(r),iconSeparator:u,itemSelected:p}},b={args:{items:f(o),iconSeparator:c,itemSelected:p}},x={args:{items:f(s),iconSeparator:c,itemSelected:p},parameters:{layout:`fullscreen`},play:async({canvasElement:e})=>{let t=e.querySelector(`dcx-web-breadcrumb`)?.shadowRoot?.querySelector(`.dcx-bc__ellipsis-btn`);t&&await n.click(t)}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    itemSelected: onItemSelected
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    items: keepSamePage(DcxBreadCrumbItemWithIcon),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    items: keepSamePage(DcxBreadCrumbDisabled),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    items: keepSamePage(DcxBreadCrumbItemDefault),
    iconSeparator: DcxBreadCrumbArrowhIcon,
    itemSelected: onItemSelected
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    items: keepSamePage(DcxBreadCrumbItemDefault),
    iconSeparator: DcxBreadChevronSlashIcon,
    itemSelected: onItemSelected
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    items: keepSamePage(DcxBreadCrumbCurrentPage),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    items: keepSamePage(DcxBreadCrumbOverflow),
    iconSeparator: DcxBreadCrumbSlashIcon,
    itemSelected: onItemSelected
  },
  parameters: {
    layout: 'fullscreen'
  },
  play: async ({
    canvasElement
  }) => {
    const breadcrumb = canvasElement.querySelector('dcx-web-breadcrumb');
    const ellipsisButton = breadcrumb?.shadowRoot?.querySelector('.dcx-bc__ellipsis-btn') as HTMLElement;
    if (ellipsisButton) {
      await userEvent.click(ellipsisButton);
    }
  }
}`,...x.parameters?.docs?.source}}};var S=[`ClassBased`,`WithIconInText`,`Disabled`,`ArrowIcon`,`ChevronIcon`,`CurrentPage`,`OverflowMenu`];export{v as ArrowIcon,y as ChevronIcon,h as ClassBased,b as CurrentPage,_ as Disabled,x as OverflowMenu,g as WithIconInText,S as __namedExportsOrder,m as default};