import{n as e,t}from"./src-B4iLUjCT.js";function n(e){if(!e)return null;if(e instanceof Date)return isNaN(e.getTime())?null:e;let t=e.match(/^\s*(\d{1,2})[/-](\d{1,2})[/-](\d{4})\s*$/);if(t){let e=new Date(parseInt(t[3],10),parseInt(t[2],10)-1,parseInt(t[1],10));return e.setHours(0,0,0,0),isNaN(e.getTime())?null:e}let n=e.match(/^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/);if(n){let e=new Date(parseInt(n[1],10),parseInt(n[2],10)-1,parseInt(n[3],10));return e.setHours(0,0,0,0),isNaN(e.getTime())?null:e}let r=new Date(e);return r.setHours(0,0,0,0),isNaN(r.getTime())?null:r}function r(e){return[String(e.getDate()).padStart(2,`0`),String(e.getMonth()+1).padStart(2,`0`),e.getFullYear()].join(`/`)}function i(){let e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),n=new Date(e.getFullYear(),e.getMonth()+1,0);return{min:r(t),max:r(n)}}var a={title:`DCXLibrary/WebComponents/DatePicker`,component:`dcx-web-datepicker`,tags:[`autodocs`],render:r=>{let i=document.createElement(`div`),a=document.createElement(`dcx-web-datepicker`);e.forEach(e=>{a[e]=r[e]}),t.forEach(e=>{a[e]=n(r[e])}),a.selectedDates=r.selectedDates?r.selectedDates.map(n).filter(Boolean):[];let o=document.createElement(`div`);o.style.marginTop=`var(--sp-4, 16px)`,o.style.fontSize=`var(--fs-base, 14px)`;let s=e=>{let t=String(e.getDate()).padStart(2,`0`),n=String(e.getMonth()+1).padStart(2,`0`),r=e.getFullYear();return a.dateFormat===`MM/dd/yyyy`?`${n}/${t}/${r}`:`${t}/${n}/${r}`},c=()=>{let e=``,t=``;if(a.rangeSelect)e=`Rango seleccionado:`,t=!a.startDate&&!a.endDate?` ninguna`:a.startDate&&a.endDate?` ${s(a.startDate)} – ${s(a.endDate)}`:a.startDate?` ${s(a.startDate)} (selecciona fecha final)`:` ninguna`;else if(a.multiSelect){e=`Fechas seleccionadas:`;let n=a.selectedDates||[];t=n.length===0?` <div style="display:flex;flex-wrap:wrap;gap:var(--sp-1, 4px);margin-top:6px;min-height:28px;max-height:96px;overflow-y:auto;overflow-x:hidden;"><span style="color:var(--text-placeholder, #9ca3af);font-size:var(--fs-sm, 12px);">ninguna</span></div>`:` <div style="display:flex;flex-wrap:wrap;gap:var(--sp-1, 4px);margin-top:6px;min-height:28px;max-height:96px;overflow-y:auto;overflow-x:hidden;">${n.map(e=>`<span style="background:var(--color-info-bg, #eff6ff);color:var(--color-info, #0058ab);padding:2px 10px;border-radius:999px;font-size:var(--fs-sm, 12px);font-weight:var(--fw-semibold, 600);white-space:nowrap;border:1px solid var(--color-info-border, #bfdbfe);">${s(e)}</span>`).join(``)}</div>`}else e=`Fecha seleccionada:`,t=` ${a.selectedDate?s(a.selectedDate):`ninguna`}`;o.innerHTML=`<strong>${e}</strong>${a.multiSelect?t:`<span>${t}</span>`}`};return a.addEventListener(`selectedDateChange`,e=>{a.selectedDate=e.detail,c()}),a.addEventListener(`selectedDatesChange`,e=>{a.selectedDates=e.detail,c()}),a.addEventListener(`startDateChange`,e=>{a.startDate=e.detail,c()}),a.addEventListener(`endDateChange`,e=>{a.endDate=e.detail,c()}),c(),i.appendChild(a),i.appendChild(o),i},parameters:{controls:{expanded:!0},layout:`centered`,docs:{description:{component:`
DatePicker con estilos personalizados mediante clases CSS y tokens de diseño.
Incluye calendario popup, navegación por meses, validación de fechas min/max.

### Características
- Calendario interactivo con 42 días (6 semanas)
- Múltiples formatos de fecha (\`dd/MM/yyyy\`, \`MM/dd/yyyy\`)
- Validación de fechas mínimas y máximas
- Estado disabled
- Botón para limpiar selección
- Modo de selección simple, múltiple o por rango
        `}}},argTypes:{dateFormat:{name:`dateFormat`,control:`select`,options:[`dd/MM/yyyy`,`MM/dd/yyyy`],description:`Formato de visualización de la fecha`,table:{category:`Atributos`,type:{summary:`DateFormat`},defaultValue:{summary:`dd/MM/yyyy`}}},multiSelect:{name:`multiSelect`,control:`boolean`,description:`Activa el modo de selección múltiple`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},rangeSelect:{name:`rangeSelect`,control:`boolean`,description:`Activa el modo de selección de rango`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},selectedDate:{name:`selectedDate`,control:{type:`text`},description:`Fecha seleccionada (modo simple — dd/MM/yyyy o yyyy-MM-dd)`,table:{category:`Atributos`,type:{summary:`Date | null | string`},defaultValue:{summary:`null`}}},selectedDates:{name:`selectedDates`,control:`object`,description:`Fechas seleccionadas (modo múltiple)`,table:{category:`Atributos`,type:{summary:`Date[]`},defaultValue:{summary:`[]`}}},startDate:{name:`startDate`,control:{type:`text`},description:`Fecha de inicio del rango (modo rango — dd/MM/yyyy o yyyy-MM-dd)`,table:{category:`Atributos`,type:{summary:`Date | null | string`},defaultValue:{summary:`null`}}},endDate:{name:`endDate`,control:{type:`text`},description:`Fecha de fin del rango (modo rango — dd/MM/yyyy o yyyy-MM-dd)`,table:{category:`Atributos`,type:{summary:`Date | null | string`},defaultValue:{summary:`null`}}},minDate:{name:`minDate`,control:{type:`text`},description:`Fecha mínima seleccionable (dd/MM/yyyy o yyyy-MM-dd)`,table:{category:`Atributos`,type:{summary:`Date | null | string`},defaultValue:{summary:`null`}}},maxDate:{name:`maxDate`,control:{type:`text`},description:`Fecha máxima seleccionable (dd/MM/yyyy o yyyy-MM-dd)`,table:{category:`Atributos`,type:{summary:`Date | null | string`},defaultValue:{summary:`null`}}},placeholder:{name:`placeholder`,control:`text`,description:`Texto del placeholder`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Selecciona una fecha`}}},disabled:{name:`disabled`,control:`boolean`,description:`Estado deshabilitado`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},firstDayOfWeek:{name:`firstDayOfWeek`,control:`radio`,options:[`monday`,`sunday`],description:"Primer día de la semana. `monday` (estándar europeo/ISO) o `sunday` (anglosajón)",table:{category:`Atributos`,type:{summary:`'monday' | 'sunday'`},defaultValue:{summary:`monday`}}}}},{min:o,max:s}=i(),c={args:{selectedDate:null,selectedDates:[],multiSelect:!1,rangeSelect:!1,startDate:null,endDate:null,dateFormat:`dd/MM/yyyy`,placeholder:`dd/mm/yyyy`,disabled:!1,minDate:null,maxDate:null,firstDayOfWeek:`monday`}},l={args:{selectedDate:null,selectedDates:[],multiSelect:!1,rangeSelect:!1,startDate:null,endDate:null,dateFormat:`dd/MM/yyyy`,placeholder:`Selecciona una fecha`,disabled:!0,minDate:null,maxDate:null,firstDayOfWeek:`monday`}},u={args:{selectedDate:null,selectedDates:[],multiSelect:!1,rangeSelect:!1,startDate:null,endDate:null,dateFormat:`dd/MM/yyyy`,placeholder:`Selecciona una fecha`,disabled:!1,minDate:o,maxDate:s,firstDayOfWeek:`monday`},parameters:{docs:{description:{story:"\nRango restringido al **mes en curso**.\nPor defecto `minDate` es el primer día del mes y `maxDate` el último.\nPuedes editar los controles `minDate` y `maxDate` para cambiar el rango (formato `dd/MM/yyyy`).\n        "}}}},d={args:{selectedDate:null,selectedDates:[],multiSelect:!0,rangeSelect:!1,startDate:null,endDate:null,dateFormat:`dd/MM/yyyy`,placeholder:`Selecciona varias fechas`,disabled:!1,minDate:null,maxDate:null,firstDayOfWeek:`monday`}},f={args:{selectedDate:null,selectedDates:[],multiSelect:!1,rangeSelect:!0,startDate:null,endDate:null,dateFormat:`dd/MM/yyyy`,placeholder:`Selecciona un rango de fechas`,disabled:!1,minDate:null,maxDate:null,firstDayOfWeek:`monday`}},p={args:{selectedDate:null,selectedDates:[],multiSelect:!1,rangeSelect:!1,startDate:null,endDate:null,dateFormat:`MM/dd/yyyy`,placeholder:`MM/dd/yyyy`,disabled:!1,minDate:null,maxDate:null,firstDayOfWeek:`monday`}},m={args:{selectedDate:null,selectedDates:[],multiSelect:!1,rangeSelect:!0,startDate:`01/06/2026`,endDate:`15/06/2026`,dateFormat:`dd/MM/yyyy`,placeholder:`Selecciona un rango`,disabled:!1,minDate:null,maxDate:null,firstDayOfWeek:`monday`},parameters:{docs:{description:{story:`Rango de fechas con inicio y fin pre-seleccionados. Los días intermedios se muestran en azul claro (in-range).`}}}},h={args:{selectedDate:`15/06/2026`,selectedDates:[],multiSelect:!1,rangeSelect:!1,startDate:null,endDate:null,dateFormat:`dd/MM/yyyy`,placeholder:`dd/mm/yyyy`,disabled:!0,minDate:null,maxDate:null,firstDayOfWeek:`monday`},parameters:{docs:{description:{story:`Estado deshabilitado con una fecha ya seleccionada. El campo muestra el valor pero no puede abrirse.`}}}},g={args:{selectedDate:null,selectedDates:[],multiSelect:!1,rangeSelect:!1,startDate:null,endDate:null,dateFormat:`MM/dd/yyyy`,placeholder:`MM/dd/yyyy`,disabled:!1,minDate:null,maxDate:null,firstDayOfWeek:`sunday`},parameters:{docs:{description:{story:"\nCalendario **anglosajón**: la semana empieza en **domingo** (Dom → Sáb).\nEl formato de fecha también es `MM/dd/yyyy` para reflejar la convención norteamericana.\nCambia el control `firstDayOfWeek` a `monday` para volver al estándar europeo/ISO.\n        "}}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'dd/mm/yyyy',
    disabled: false,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona una fecha',
    disabled: true,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona una fecha',
    disabled: false,
    minDate: DEFAULT_MIN,
    maxDate: DEFAULT_MAX,
    firstDayOfWeek: 'monday'
  },
  parameters: {
    docs: {
      description: {
        story: \`
Rango restringido al **mes en curso**.
Por defecto \\\`minDate\\\` es el primer día del mes y \\\`maxDate\\\` el último.
Puedes editar los controles \\\`minDate\\\` y \\\`maxDate\\\` para cambiar el rango (formato \\\`dd/MM/yyyy\\\`).
        \`
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: true,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona varias fechas',
    disabled: false,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: true,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona un rango de fechas',
    disabled: false,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'MM/dd/yyyy',
    disabled: false,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: true,
    startDate: '01/06/2026',
    endDate: '15/06/2026',
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona un rango',
    disabled: false,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday'
  },
  parameters: {
    docs: {
      description: {
        story: 'Rango de fechas con inicio y fin pre-seleccionados. Los días intermedios se muestran en azul claro (in-range).'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: '15/06/2026',
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'dd/mm/yyyy',
    disabled: true,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday'
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado deshabilitado con una fecha ya seleccionada. El campo muestra el valor pero no puede abrirse.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'MM/dd/yyyy',
    disabled: false,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'sunday'
  },
  parameters: {
    docs: {
      description: {
        story: \`
Calendario **anglosajón**: la semana empieza en **domingo** (Dom → Sáb).
El formato de fecha también es \\\`MM/dd/yyyy\\\` para reflejar la convención norteamericana.
Cambia el control \\\`firstDayOfWeek\\\` a \\\`monday\\\` para volver al estándar europeo/ISO.
        \`
      }
    }
  }
}`,...g.parameters?.docs?.source}}};var _=[`Default`,`Disabled`,`WithMinAndMaxDate`,`MultiSelect`,`RangeSelect`,`FormatMMDDYYYY`,`RangeWithBothDatesSelected`,`DisabledWithSelectedDate`,`AngloSaxon`];export{g as AngloSaxon,c as Default,l as Disabled,h as DisabledWithSelectedDate,p as FormatMMDDYYYY,d as MultiSelect,f as RangeSelect,m as RangeWithBothDatesSelected,u as WithMinAndMaxDate,_ as __namedExportsOrder,a as default};