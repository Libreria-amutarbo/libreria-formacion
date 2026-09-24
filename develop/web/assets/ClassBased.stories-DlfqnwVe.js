import{a as e,l as t,n,t as r}from"./lit-C11zoK0j.js";import{c as i,l as a,n as o,r as s,u as c}from"./dcx-web-button.component-DgDUViKA.js";import"./src-C8W-Yn-o.js";import{f as l}from"./defaults-DBXV-fV-.js";import"./dcx-web-picklist.component-B2R037-M.js";var u=[`small`,`large`],d=t`
  :host {
    display: block;
    width: 100%;
  }

  .dcx-file-upload {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--sp-2, 8px);
    font-family: var(--ff-base, 'Inter', sans-serif);
    width: 100%;
  }

  .dcx-file-upload__validation-message {
    width: 100%;
  }

  .dcx-file-upload__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-2, 8px);
    width: 100%;
    min-width: 0;
  }

  .dcx-file-upload__actions {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-3, 12px);
    flex-wrap: wrap;
  }

  .dcx-file-upload__zone {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--border-default, #d1d5db);
    border-radius: var(--r-md, 6px);
    background: var(--bg-default, #ffffff);
    padding: var(--sp-2, 8px) 10px;
    cursor: pointer;
    transition: border-color 0.12s, background 0.12s;
    width: 100%;
    min-width: 0;
  }

  .dcx-file-upload__zone:not(.dcx-file-upload__zone--disabled):hover {
    border-color: var(--border-hover, #9ca3af);
    background: #fafafa;
  }

  .dcx-file-upload__zone--disabled {
    background: var(--bg-disabled, #f3f4f6);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .dcx-file-upload__zone--error {
    border-color: var(--color-danger, #dc2626);
  }

  .dcx-file-upload__zone-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    padding: 5px var(--sp-3, 12px);
    border-radius: var(--r-sm, 4px);
    border: 1px solid var(--border-default, #d1d5db);
    background: var(--bg-default, #ffffff);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #111827);
    cursor: pointer;
    font-family: var(--ff-base, 'Inter', sans-serif);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .dcx-file-upload__zone-btn dcx-web-icon {
    display: inline-flex;
    line-height: 0;
  }

  .dcx-file-upload__zone-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .dcx-file-upload__dropzone {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: var(--sp-8, 32px);
    padding: var(--sp-2, 8px) 10px;
    border: 1px dashed var(--border-light, #d1d5db);
    border-radius: var(--r-md, 6px);
    background: var(--bg-default, #ffffff);
    width: 100%;
    transition: border-color 0.12s, background 0.12s;
    min-width: 0;
  }

  .dcx-file-upload__dropzone--small {
    display: flex;
    align-items: center;
  }

  .dcx-file-upload__dropzone--large {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--sp-2, 8px);
    width: min(100%, 28rem);
    min-height: 12rem;
    padding: 1.25rem;
  }

  .dcx-file-upload__dropzone--drag-over {
    border-color: var(--bg-primary, #0058ab);
    border-style: dashed;
    background: color-mix(
      in srgb,
      var(--bg-primary, #0058ab) 10%,
      var(--bg-default, #ffffff)
    );
  }

  .dcx-file-upload__dropzone--disabled {
    opacity: 0.6;
  }

  .dcx-file-upload__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .dcx-file-upload__placeholder {
    font-size: var(--fs-sm, 12px);
    color: var(--text-disabled, #696e75);
    flex: 1;
  }

  .dcx-file-upload__file-name {
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #111827);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  .dcx-file-upload__file-item .dcx-file-upload__file-name {
    flex: 1;
  }

  .dcx-file-upload__file-list {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .dcx-file-upload__file-item {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    width: 100%;
    background: #f9fafb;
    border: 1px solid var(--bg-disabled, #f3f4f6);
    border-radius: var(--r-sm, 4px);
    padding: 6px 10px;
    box-sizing: border-box;
  }

  .dcx-file-upload__file-icon {
    flex-shrink: 0;
    color: var(--text-muted, #6b7280);
    line-height: 0;
  }

  .dcx-file-upload__file-size {
    font-size: var(--fs-sm, 12px);
    color: var(--text-disabled, #696e75);
    white-space: nowrap;
    margin-left: auto;
  }

  .dcx-file-upload__remove-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: var(--r-sm, 4px);
    background: transparent;
    color: var(--text-muted, #6b7280);
    cursor: pointer;
    flex-shrink: 0;
  }

  .dcx-file-upload__remove-btn dcx-web-icon {
    display: inline-flex;
    line-height: 0;
  }

  .dcx-file-upload__remove-btn:hover:not(:disabled) {
    background: var(--bg-hover, #f3f4f6);
    color: var(--text-dark, #111827);
  }

  .dcx-file-upload__remove-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dcx-file-upload__drop-hint {
    color: var(--text-disabled, #696e75);
    font-size: var(--fs-base, 14px);
  }

  .dcx-file-upload__zone,
    .dcx-file-upload__dropzone,
    .dcx-file-upload__file-list,
    .dcx-file-upload__file-item {
    box-sizing: border-box;
  }
`,f=t=>e`
    <div class="dcx-file-upload">
      ${t.validationError?e`
            <dcx-web-message
              class="dcx-file-upload__validation-message"
              type="error"
              .body="${t.validationErrorMessage}"
              .icon="${!0}"
              iconName="exclamation-circle"
            ></dcx-web-message>
          `:n}

      <div class="dcx-file-upload__content">
        <dcx-web-input
          class="dcx-file-upload__input"
          .type="${l.FILE}"
          accept="${t.accept||n}"
          .ariaLabel="${t.label}"
          ?multiple="${t.multiple}"
          ?disabled="${t.isDisabled}"
        ></dcx-web-input>

        ${t.dragAndDrop?e`
              <div
                class="${t.dropzoneClasses}"
                role="region"
                aria-label="Zona de arrastre de archivos"
                @dragover="${t.onDragOver}"
                @dragleave="${t.onDragLeave}"
                @drop="${t.onDrop}"
              >
                <button
                  class="dcx-file-upload__zone-btn"
                  type="button"
                  ?disabled="${t.isDisabled}"
                  @click="${t.openFilePicker}"
                >
                  <dcx-web-icon name="upload" size="m" aria-hidden="true"></dcx-web-icon>
                  <span>${t.label}</span>
                </button>

                ${!t.multiple&&t.hasSelectedFileItems&&!t.isLargeDropzone?e`
                      <span class="dcx-file-upload__file-name">${t.selectedFileItems[0].name}</span>
                      <button
                        class="dcx-file-upload__remove-btn"
                        type="button"
                        aria-label="Remove ${t.selectedFileItems[0].name}"
                        ?disabled="${t.isDisabled}"
                        @click="${()=>t.removeFile(t.selectedFileItems[0].file)}"
                      >
                        <dcx-web-icon name="x" size="m" aria-hidden="true"></dcx-web-icon>
                      </button>
                    `:t.hasSelectedFileItems?n:e`
                      <span class="dcx-file-upload__placeholder">${t.placeholder}</span>
                      ${t.isLargeDropzone?n:e`<span class="dcx-file-upload__drop-hint">Drag and drop a file here</span>`}
                    `}
              </div>
            `:e`
              <div
                class="dcx-file-upload__zone ${t.isDisabled?`dcx-file-upload__zone--disabled`:``} ${t.validationError?`dcx-file-upload__zone--error`:``}"
              >
                <button
                  class="dcx-file-upload__zone-btn"
                  type="button"
                  ?disabled="${t.isDisabled}"
                  @click="${t.openFilePicker}"
                >
                  <dcx-web-icon name="upload" size="m" aria-hidden="true"></dcx-web-icon>
                  <span>${t.label}</span>
                </button>

                ${!t.multiple&&t.hasSelectedFileItems&&!t.isLargeDropzone?e`
                      <span class="dcx-file-upload__file-name">${t.selectedFileItems[0].name}</span>
                      <button
                        class="dcx-file-upload__remove-btn"
                        type="button"
                        aria-label="Remove ${t.selectedFileItems[0].name}"
                        ?disabled="${t.isDisabled}"
                        @click="${()=>t.removeFile(t.selectedFileItems[0].file)}"
                      >
                        <dcx-web-icon name="x" size="m" aria-hidden="true"></dcx-web-icon>
                      </button>
                    `:t.hasSelectedFileItems?n:e`<span class="dcx-file-upload__placeholder">${t.placeholder}</span>`}
              </div>
            `}

        ${t.hasSelectedFileItems&&(t.multiple||t.isLargeDropzone)?e`
              <ul role="list" class="dcx-file-upload__file-list">
                ${t.selectedFileItems.map(n=>e`
                    <li class="dcx-file-upload__file-item">
                      <dcx-web-icon
                        name="file-earmark"
                        size="m"
                        aria-hidden="true"
                        class="dcx-file-upload__file-icon"
                      ></dcx-web-icon>
                      <span class="dcx-file-upload__file-name">${n.name}</span>
                      <span class="dcx-file-upload__file-size">${t.formatFileSize(n.size)}</span>
                      <button
                        class="dcx-file-upload__remove-btn"
                        type="button"
                        aria-label="Remove ${n.name}"
                        ?disabled="${t.isDisabled}"
                        @click="${()=>t.removeFile(n.file)}"
                      >
                        <dcx-web-icon name="x" size="m" aria-hidden="true"></dcx-web-icon>
                      </button>
                    </li>
                  `)}
              </ul>
            `:n}

        ${!t.autoUpload||t.multiple||t.loading?e`
              <div class="dcx-file-upload__actions">
                ${t.loading?e`
                      <dcx-web-spinner size="s" title="Subiendo archivo..." .delay="${0}"></dcx-web-spinner>
                    `:e`
                      ${t.autoUpload?n:e`
                            <dcx-web-button
                              label="Upload"
                              variant="secondary"
                              type="button"
                              ?disabled="${t.isDisabled||!t.hasSelectedFileItems||!!t.validationError}"
                              @buttonClick="${t.onUploadClick}"
                              class="dcx-file-upload__upload-button"
                            ></dcx-web-button>
                          `}
                      ${t.multiple?e`
                            <dcx-web-button
                              label="Cancel"
                              variant="danger"
                              type="button"
                              ?disabled="${t.isDisabled||!t.hasSelectedFileItems}"
                              @buttonClick="${t.onCancelClick}"
                              class="dcx-file-upload__cancel-button"
                            ></dcx-web-button>
                          `:n}
                    `}
              </div>
            `:n}
      </div>
    </div>
  `,p=class extends r{#e=`Choose file`;get label(){return this.#e}set label(e){this.#e=e}#t=``;get accept(){return this.#t}set accept(e){this.#t=e}#n=!1;get disabled(){return this.#n}set disabled(e){this.#n=e}#r=!1;get loading(){return this.#r}set loading(e){this.#r=e}#i=`No file selected`;get placeholder(){return this.#i}set placeholder(e){this.#i=e}#a=!1;get dragAndDrop(){return this.#a}set dragAndDrop(e){this.#a=e}#o=`small`;get dropzoneSize(){return this.#o}set dropzoneSize(e){this.#o=e}#s=!1;get multiple(){return this.#s}set multiple(e){this.#s=e}#c=!1;get autoUpload(){return this.#c}set autoUpload(e){this.#c=e}#l=null;get selectedFile(){return this.#l}set selectedFile(e){this.#l=e}#u=[];get selectedFiles(){return this.#u}set selectedFiles(e){this.#u=e}#d=null;get validationError(){return this.#d}set validationError(e){this.#d=e}#f=!1;get isDragOver(){return this.#f}set isDragOver(e){this.#f=e}static styles=d;_attachedNativeInput=null;_nativeChangeHandler=e=>this.onFileChange(e);firstUpdated(){this.attachNativeInputListener()}disconnectedCallback(){this._attachedNativeInput&&=(this._attachedNativeInput.removeEventListener(`change`,this._nativeChangeHandler),null),super.disconnectedCallback()}get selectedFileItems(){return this.selectedFiles.map(e=>({file:e,name:e.name,size:e.size,type:e.type,lastModified:e.lastModified}))}get isLargeDropzone(){return this.dropzoneSize===`large`}get hasSelectedFileItems(){return this.selectedFileItems.length>0}get validationErrorMessage(){return this.validationError||``}get isDisabled(){return this.disabled||this.loading}get dropzoneClasses(){let e=this.dropzoneSize;return[`dcx-file-upload__dropzone`,e===`small`?`dcx-file-upload__dropzone--small`:e===`large`?`dcx-file-upload__dropzone--large`:``,this.isDragOver?`dcx-file-upload__dropzone--drag-over`:``,this.isDisabled?`dcx-file-upload__dropzone--disabled`:``].filter(Boolean).join(` `)}formatFileSize=e=>e===0?`0 B`:e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:`${(e/1048576).toFixed(1)} MB`;getNativeFileInput(){let e=this.shadowRoot?.querySelector(`dcx-web-input`);return e&&(e.shadowRoot?.querySelector(`input[type="file"]`)||e.querySelector(`input[type="file"]`))||null}openFilePicker=()=>{if(this.isDisabled)return;let e=this.getNativeFileInput();e&&(this.accept?e.setAttribute(`accept`,this.accept):e.removeAttribute(`accept`),this.attachNativeInputListener(),e.click())};attachNativeInputListener(){let e=this.getNativeFileInput();e&&this._attachedNativeInput!==e&&(this._attachedNativeInput&&this._attachedNativeInput.removeEventListener(`change`,this._nativeChangeHandler),e.addEventListener(`change`,this._nativeChangeHandler),this._attachedNativeInput=e)}onFileChange=e=>{let t=e.composedPath?.()[0],n=t&&`files`in t&&t.files?t:e.target?.shadowRoot?.querySelector(`input[type="file"]`)||e.target,r=Array.from(n?.files??[]),i=this.filterAcceptedFiles(r);if(i.length===0&&r.length>0)return;let a=this.multiple?this.mergeUniqueFiles(this.selectedFiles,i):i.slice(0,1);this.setSelectedFiles(a)};onDragOver=e=>{!this.isDisabled&&this.dragAndDrop&&(e.preventDefault(),this.isDragOver=!0)};onDragLeave=e=>{!this.isDisabled&&this.dragAndDrop&&(e.preventDefault(),this.isDragOver=!1)};onDrop=e=>{if(this.isDisabled||!this.dragAndDrop)return;e.preventDefault(),this.isDragOver=!1;let t=Array.from(e.dataTransfer?.files??[]),n=this.filterAcceptedFiles(t);if(n.length===0&&t.length>0)return;let r=this.multiple?this.mergeUniqueFiles(this.selectedFiles,n):n.slice(0,1);this.setSelectedFiles(r)};mergeUniqueFiles=(e,t)=>[...e,...t].filter((e,t,n)=>n.findIndex(t=>t.name===e.name&&t.size===e.size&&t.lastModified===e.lastModified)===t);filterAcceptedFiles=e=>{let t=this.accept.trim();if(!t)return this.validationError=null,e;let n=e.filter(e=>this.isFileAccepted(e,t));return this.validationError=e.filter(e=>!this.isFileAccepted(e,t)).length>0?`Invalid file type. Allowed types: ${t}`:null,n};isFileAccepted=(e,t)=>{let n=t.split(`,`).map(e=>e.trim().toLowerCase()).filter(Boolean);if(n.length===0)return!0;let r=e.name.toLowerCase(),i=e.type.toLowerCase();return n.some(e=>{if(e.startsWith(`.`))return r.endsWith(e);if(e.endsWith(`/*`)){let t=e.slice(0,-1);return i.startsWith(t)}return i===e})};setSelectedFiles=e=>{let t=this.getNativeFileInput();t&&(t.value=``),this.selectedFiles=e,this.selectedFile=e[0]??null;let n=this.multiple?e:e[0]??null;this.dispatchEvent(new CustomEvent(`fileSelected`,{detail:n,bubbles:!0,composed:!0})),this.autoUpload&&e.length>0&&!this.isDisabled&&!this.validationError&&(this.dispatchEvent(new CustomEvent(`uploadClicked`,{detail:n,bubbles:!0,composed:!0})),this.setSelectedFiles([]))};onUploadClick=()=>{if(this.isDisabled||this.selectedFiles.length===0)return;let e=this.multiple?this.selectedFiles:this.selectedFiles[0]??null;this.dispatchEvent(new CustomEvent(`uploadClicked`,{detail:e,bubbles:!0,composed:!0})),this.setSelectedFiles([])};onCancelClick=()=>{this.isDisabled||this.setSelectedFiles([])};removeFile=e=>{if(this.isDisabled)return;let t=this.selectedFiles.filter(t=>t!==e);this.setSelectedFiles(t)};render(){return f(this)}};o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`label`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`accept`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`disabled`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`loading`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`placeholder`,null),o([a({type:Boolean,attribute:`drag-and-drop`}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`dragAndDrop`,null),o([a({type:String,attribute:`dropzone-size`,reflect:!0}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`dropzoneSize`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`multiple`,null),o([a({type:Boolean,attribute:`auto-upload`}),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`autoUpload`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`selectedFile`,null),o([i(),s(`design:type`,Array),s(`design:paramtypes`,[])],p.prototype,`selectedFiles`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`validationError`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],p.prototype,`isDragOver`,null),p=o([c(`dcx-web-file-upload`)],p);var m={title:`DCXLibrary/WebComponents/FileUpload`,component:`dcx-web-file-upload`,tags:[`autodocs`],parameters:{controls:{expanded:!0},docs:{description:{component:`Campo de selección de archivos con soporte de botón clásico y zona de arrastre. Admite filtrado por tipo, selección múltiple y subida automática. Implementa validación de tipo MIME/extensión con mensaje de error.`}}},argTypes:{label:{control:`text`,description:`Texto del botón para abrir el selector de archivos.`,table:{category:`Atributos`}},accept:{control:`text`,description:`Tipos de archivo permitidos (ejemplo: .pdf,.doc,image/*). Vacío significa que se aceptan todos.`,table:{category:`Atributos`}},disabled:{control:`boolean`,description:`Deshabilita la selección de archivos y la subida.`,table:{category:`Atributos`}},placeholder:{control:`text`,description:`Texto mostrado cuando no hay archivo seleccionado.`,table:{category:`Atributos`}},dragAndDrop:{control:`boolean`,description:`Activa la zona de arrastre de archivos.`,table:{category:`Atributos`}},dropzoneSize:{control:`select`,options:u,description:`Tamaño visual de la zona de arrastre.`,table:{category:`Atributos`}},multiple:{control:`boolean`,description:`Permite seleccionar varios archivos.`,table:{category:`Atributos`}},autoUpload:{control:`boolean`,description:`Emite uploadClicked automáticamente al seleccionar el archivo.`,table:{category:`Atributos`}},fileSelected:{action:`fileSelected`,description:`Se emite al seleccionar o limpiar un archivo.`,table:{category:`Eventos`}},uploadClicked:{action:`uploadClicked`,description:`Se emite al pulsar el botón Upload o cuando autoUpload está activo.`,table:{category:`Eventos`}},loading:{control:`boolean`,description:`Muestra el estado de carga y deshabilita las acciones del componente.`,table:{category:`Atributos`}}},args:{label:`Choose file`,accept:``,disabled:!1,dragAndDrop:!1,dropzoneSize:`small`,multiple:!1,autoUpload:!1,placeholder:`No file selected`,loading:!1},render:t=>e`
    <dcx-web-file-upload
      label=${t.label}
      accept=${t.accept}
      placeholder=${t.placeholder}
      .dropzoneSize=${t.dropzoneSize}
      .dragAndDrop=${t.dragAndDrop}
      .autoUpload=${t.autoUpload}
      .loading=${t.loading}
      ?disabled=${t.disabled}
      ?multiple=${t.multiple}

    >
    </dcx-web-file-upload>
  `},h={},g={args:{label:`Select image`,accept:`image/*`,placeholder:`No image selected`},parameters:{docs:{description:{story:`Filtra la selección para aceptar únicamente imágenes. Si se elige un archivo no permitido, se muestra un mensaje de error.`}}}},_={args:{label:`Browse`,autoUpload:!0,dragAndDrop:!1,dropzoneSize:`small`,placeholder:``},parameters:{docs:{description:{story:"Al seleccionar archivo, se emite `uploadClicked` automáticamente sin usar el botón manual."}}}},v={args:{label:`Choose file`,dragAndDrop:!0,dropzoneSize:`small`},parameters:{docs:{description:{story:`Activa la zona de arrastre compacta. El componente detecta el estado drag-over y muestra el nombre del archivo seleccionado.`}}}},y={args:{label:`Choose file`,dragAndDrop:!0,dropzoneSize:`large`,placeholder:`No file selected`},parameters:{docs:{description:{story:`Activa la zona de arrastre grande. El componente detecta el estado drag-over y muestra el nombre del archivo seleccionado.`}}}},b={args:{label:`Choose files`,multiple:!0,dragAndDrop:!0,dropzoneSize:`large`,placeholder:`No files selected`},parameters:{docs:{description:{story:`Permite seleccionar o arrastrar varios archivos y muestra todos los nombres en el componente.`}}}},x={args:{disabled:!0},parameters:{docs:{description:{story:`Estado deshabilitado: el botón y la zona de arrastre no responden a la interacción.`}}}},S={args:{label:`Select image`,accept:`image/*`,dragAndDrop:!0,dropzoneSize:`large`,placeholder:`No image selected`},parameters:{docs:{description:{story:`Para ver el error de validación, arrastra o selecciona un archivo con formato no permitido (por ejemplo un PDF). El componente rechaza el archivo y muestra el mensaje de error.`}}}},C={args:{loading:!0,label:`Choose file`,dragAndDrop:!1},parameters:{docs:{description:{story:`Muestra el estado de carga mientras se procesa o sube un archivo.`}}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Select image',
    accept: 'image/*',
    placeholder: 'No image selected'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtra la selección para aceptar únicamente imágenes. Si se elige un archivo no permitido, se muestra un mensaje de error.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Browse',
    autoUpload: true,
    dragAndDrop: false,
    dropzoneSize: 'small',
    placeholder: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Al seleccionar archivo, se emite \`uploadClicked\` automáticamente sin usar el botón manual.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Choose file',
    dragAndDrop: true,
    dropzoneSize: 'small'
  },
  parameters: {
    docs: {
      description: {
        story: 'Activa la zona de arrastre compacta. El componente detecta el estado drag-over y muestra el nombre del archivo seleccionado.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Choose file',
    dragAndDrop: true,
    dropzoneSize: 'large',
    placeholder: 'No file selected'
  },
  parameters: {
    docs: {
      description: {
        story: 'Activa la zona de arrastre grande. El componente detecta el estado drag-over y muestra el nombre del archivo seleccionado.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Choose files',
    multiple: true,
    dragAndDrop: true,
    dropzoneSize: 'large',
    placeholder: 'No files selected'
  },
  parameters: {
    docs: {
      description: {
        story: 'Permite seleccionar o arrastrar varios archivos y muestra todos los nombres en el componente.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado deshabilitado: el botón y la zona de arrastre no responden a la interacción.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Select image',
    accept: 'image/*',
    dragAndDrop: true,
    dropzoneSize: 'large',
    placeholder: 'No image selected'
  },
  parameters: {
    docs: {
      description: {
        story: 'Para ver el error de validación, arrastra o selecciona un archivo con formato no permitido (por ejemplo un PDF). El componente rechaza el archivo y muestra el mensaje de error.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    label: 'Choose file',
    dragAndDrop: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado de carga mientras se procesa o sube un archivo.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}};var w=[`Default`,`AcceptImagesOnly`,`AutoUpload`,`DragAndDrop`,`LargeDropzone`,`MultipleFiles`,`Disabled`,`WithValidationError`,`Loading`];export{g as AcceptImagesOnly,_ as AutoUpload,h as Default,x as Disabled,v as DragAndDrop,y as LargeDropzone,C as Loading,b as MultipleFiles,S as WithValidationError,w as __namedExportsOrder,m as default};