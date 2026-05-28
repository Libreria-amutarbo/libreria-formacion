import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNgDrawerComponent } from '../../dcx-ng-components/dcx-ng-drawer/dcx-ng-drawer.component';
import { DcxNgButtonComponent } from '../../dcx-ng-components/dcx-ng-button/dcx-ng-button.component';
import { DRAWER_DEFAULT_ARGS } from '../../core/defaults/drawer';
import { POSITION_LIST } from '../../core/defaults/generic';

const actionsData = {
  visibleChange: fn(),
  show: fn(),
  hide: fn(),
};

const meta: Meta<DcxNgDrawerComponent> = {
  title: 'DCXLibrary/Components/Drawer',
  component: DcxNgDrawerComponent,
  tags: ['autodocs'],
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  decorators: [
    moduleMetadata({
      imports: [DcxNgButtonComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '`dcx-ng-drawer` muestra un panel lateral/superior/inferior con comportamiento modal opcional. ' +
          'Soporta cierre por máscara, tecla ESC, botón de cierre y control externo de visibilidad con `visible` + `visibleChange`.',
      },
    },
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description:
        'Controla si el drawer está abierto (`true`) o cerrado (`false`).',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: 'select',
      options: POSITION_LIST,
      description:
        'Define desde qué lado aparece el drawer: `left`, `right`, `top` o `bottom`.',
      table: {
        category: 'Appearance',
        type: { summary: "'left' | 'right' | 'top' | 'bottom'" },
        defaultValue: { summary: 'left' },
      },
    },
    modal: {
      control: 'boolean',
      description:
        'Cuando está activo, muestra máscara de fondo y comporta el drawer como modal.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    dismissible: {
      control: 'boolean',
      description:
        'Permite cerrar el drawer al hacer click en la máscara (solo aplica en modo modal).',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showCloseIcon: {
      control: 'boolean',
      description:
        'Muestra u oculta el botón de cierre en el header del drawer.',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Permite cerrar el drawer al pulsar la tecla `Escape`.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    blockScroll: {
      control: 'boolean',
      description:
        'Bloquea el scroll del `body` mientras el drawer modal está abierto.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    fullScreen: {
      control: 'boolean',
      description: 'Hace que el drawer ocupe toda la pantalla.',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    header: {
      control: 'text',
      description:
        'Texto del título en el header. Si se proyecta `#drawerHeader`, este valor se reemplaza.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    footer: {
      control: 'text',
      description:
        'Texto del footer. Si se proyecta `#drawerFooter`, el template reemplaza este valor.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    size: {
      control: 'text',
      description:
        'Tamaño del drawer (`width` en `left/right` y `height` en `top/bottom`). Ejemplo: `22rem`, `320px`, `40%`.',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: '22rem' },
      },
    },
    baseZIndex: {
      control: 'number',
      description:
        'Z-index base para máscara y panel. Si `autoZIndex=false`, se usa exactamente este valor.',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '1000' },
      },
    },
    autoZIndex: {
      control: 'boolean',
      description:
        'Si está activo, el componente incrementa el z-index al abrir para quedar sobre overlays previos con la misma base.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    visibleChange: {
      action: 'visibleChange',
      description:
        'Evento emitido cuando el drawer solicita cambio de visibilidad (ideal para two-way binding).',
      table: {
        category: 'Events',
        type: { summary: '(visible: boolean) => void' },
      },
    },
    show: {
      action: 'show',
      description: 'Evento emitido cuando el drawer termina de abrirse.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    hide: {
      action: 'hide',
      description: 'Evento emitido cuando el drawer se cierra.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgDrawerComponent>;

export const Default: Story = {
  args: {
    visible: false,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: args.visible,
      openDrawer() {
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
        actionsData.visibleChange(next);
      },
      onShow() {
        actionsData.show();
      },
      onHide() {
        actionsData.hide();
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 280px; background: var(--bg-surface, #f4f5f7);">
        <dcx-ng-button label="Abrir drawer" variant="primary" (buttonClick)="openDrawer()" />

        <dcx-ng-drawer
          [visible]="localVisible"
          [position]="position"
          [modal]="modal"
          [dismissible]="dismissible"
          [showCloseIcon]="showCloseIcon"
          [closeOnEscape]="closeOnEscape"
          [blockScroll]="blockScroll"
          [fullScreen]="fullScreen"
          [size]="size"
          [baseZIndex]="baseZIndex"
          [autoZIndex]="autoZIndex"
          [header]="header"
          [footer]="footer"
          (visibleChange)="onVisibleChange($event)"
          (show)="onShow()"
          (hide)="onHide()"
        >
          <p>Contenido del drawer con componentes de la librería.</p>
          <div style="display:flex; gap: 8px; margin-top: 12px;">
            <dcx-ng-button label="Aplicar" variant="primary" (buttonClick)="onVisibleChange(false)" />
            <dcx-ng-button label="Cancelar" variant="secondary" (buttonClick)="onVisibleChange(false)" />
          </div>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const Positions: Story = {
  parameters: {
    docs: {
      story: {
        height: '520px',
      },
    },
  },
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: false,
      localPosition: 'left',
      localSize: '22rem',
      openAt(position: string) {
        this['localPosition'] = position;
        this['localSize'] =
          position === 'top' || position === 'bottom' ? '14rem' : '22rem';
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
        actionsData.visibleChange(next);
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 420px; background: var(--bg-surface, #f4f5f7);">
        <p style="margin: 0 0 10px 0;">Selecciona una posición para abrir el drawer:</p>
        <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
          <dcx-ng-button label="Left" variant="secondary" (buttonClick)="openAt('left')" />
          <dcx-ng-button label="Right" variant="secondary" (buttonClick)="openAt('right')" />
          <dcx-ng-button label="Top" variant="secondary" (buttonClick)="openAt('top')" />
          <dcx-ng-button label="Bottom" variant="secondary" (buttonClick)="openAt('bottom')" />
        </div>

        <p style="margin: 0; color: var(--text-muted, #696e75);">
          Posición actual: <strong>{{ localPosition }}</strong> · Size: <strong>{{ localSize }}</strong>
        </p>

        <dcx-ng-drawer
          [visible]="localVisible"
          [position]="localPosition"
          [modal]="true"
          [dismissible]="true"
          [showCloseIcon]="true"
          [closeOnEscape]="true"
          [blockScroll]="false"
          [fullScreen]="false"
          header="Drawer por posición"
          (visibleChange)="onVisibleChange($event)"
        >
          <ng-template #drawerFooter>
            <dcx-ng-button
              label="Cerrar sesión"
              variant="secondary"
              [icon]="true"
              iconName="box-arrow-right"
              iconPosition="left"
              (buttonClick)="onVisibleChange(false)"
            />
          </ng-template>

          <p>Drawer abierto en <strong>{{ localPosition }}</strong>.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const CloseOnEscapeDisabled: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: args.visible,
      openDrawer() {
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 280px;">
        <dcx-ng-button label="Abrir (ESC deshabilitado)" variant="secondary" (buttonClick)="openDrawer()" />

        <dcx-ng-drawer
          [visible]="localVisible"
          position="right"
          [modal]="true"
          [dismissible]="true"
          [showCloseIcon]="true"
          [closeOnEscape]="false"
          [blockScroll]="false"
          [fullScreen]="false"
          size="22rem"
          header="CloseOnEscape deshabilitado"
          (visibleChange)="onVisibleChange($event)"
        >
          <p>Con <strong>closeOnEscape=false</strong>, la tecla Escape no cierra el drawer.</p>
          <p>Puedes cerrarlo con máscara o con el ícono de cierre.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const NonModal: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: args.visible,
      openDrawer() {
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 280px;">
        <dcx-ng-button label="Abrir no modal" variant="secondary" (buttonClick)="openDrawer()" />

        <dcx-ng-drawer
          [visible]="localVisible"
          position="left"
          [modal]="false"
          [dismissible]="true"
          [showCloseIcon]="true"
          [closeOnEscape]="true"
          [blockScroll]="false"
          [fullScreen]="false"
          size="22rem"
          header="Drawer no modal"
          (visibleChange)="onVisibleChange($event)"
        >
          <p>No se renderiza máscara porque <strong>modal=false</strong>.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const NonDismissible: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: args.visible,
      openDrawer() {
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 280px;">
        <dcx-ng-button label="Abrir drawer" variant="primary" (buttonClick)="openDrawer()" />

        <dcx-ng-drawer
          [visible]="localVisible"
          position="right"
          [modal]="true"
          [dismissible]="false"
          [showCloseIcon]="true"
          [closeOnEscape]="true"
          [blockScroll]="false"
          [fullScreen]="false"
          size="22rem"
          header="No dismissible"
          (visibleChange)="onVisibleChange($event)"
        >
          <p>El click en la máscara no cierra el drawer porque <strong>dismissible=false</strong>.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const CloseOnEscapeEnabled: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: args.visible,
      openDrawer() {
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 280px;">
        <dcx-ng-button label="Abrir (ESC habilitado)" variant="primary" (buttonClick)="openDrawer()" />

        <dcx-ng-drawer
          [visible]="localVisible"
          position="right"
          [modal]="true"
          [dismissible]="false"
          [showCloseIcon]="false"
          [closeOnEscape]="true"
          [blockScroll]="false"
          [fullScreen]="false"
          size="22rem"
          header="CloseOnEscape activo"
          (visibleChange)="onVisibleChange($event)"
        >
          <p>Pulsa <strong>Escape</strong> para cerrarlo.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const CloseOnlyWithIcon: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: args.visible,
      openDrawer() {
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 280px;">
        <dcx-ng-button label="Abrir (solo ícono)" variant="secondary" (buttonClick)="openDrawer()" />

        <dcx-ng-drawer
          [visible]="localVisible"
          position="right"
          [modal]="true"
          [dismissible]="false"
          [showCloseIcon]="true"
          [closeOnEscape]="false"
          [blockScroll]="false"
          [fullScreen]="false"
          size="22rem"
          header="Solo cierre por ícono"
          (visibleChange)="onVisibleChange($event)"
        >
          <p>En este caso no cierra con máscara ni con Escape; solo con el ícono de cerrar.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const TopAndBottomSizes: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: false,
      localPosition: 'top',
      localSize: '12rem',
      openTop() {
        this['localPosition'] = 'top';
        this['localSize'] = '12rem';
        this['localVisible'] = true;
      },
      openBottom() {
        this['localPosition'] = 'bottom';
        this['localSize'] = '30vh';
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
      },
    },
    template: `
      <div style="padding: 1rem; display:flex; gap: 8px; flex-wrap: wrap; min-height: 280px;">
        <dcx-ng-button label="Top 12rem" variant="secondary" (buttonClick)="openTop()" />
        <dcx-ng-button label="Bottom 30vh" variant="secondary" (buttonClick)="openBottom()" />

        <dcx-ng-drawer
          [visible]="localVisible"
          [position]="localPosition"
          [modal]="true"
          [dismissible]="true"
          [showCloseIcon]="true"
          [closeOnEscape]="true"
          [blockScroll]="false"
          [fullScreen]="false"
          [size]="localSize"
          [header]="'Drawer ' + localPosition"
          (visibleChange)="onVisibleChange($event)"
        >
          <p>Se está aplicando <strong>{{ localSize }}</strong> como altura.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const FullScreenOpen: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
  },
  render: args => ({
    props: {
      ...args,
      localVisible: args.visible,
      openFullscreen() {
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 500px; overflow: hidden;">
        <dcx-ng-button label="Abrir fullscreen" variant="primary" (buttonClick)="openFullscreen()" />
        <p>El drawer fullscreen se abre por botón y mantiene scroll de página porque <strong>blockScroll=false</strong> y se cierra mediante el botón 'Esc'.</p>

        <dcx-ng-drawer
        [visible]="localVisible"
        position="right"
        [modal]="true"
        [dismissible]="true"
        [showCloseIcon]="true"
        [closeOnEscape]="true"
        [blockScroll]="false"
        [fullScreen]="true"
        size="22rem"
        header="Drawer fullscreen"
        (visibleChange)="onVisibleChange($event)"
        >
          <p>Contenido fullscreen.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const BlockScrollTrue: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
    blockScroll: true,
    modal: true,
    dismissible: true,
    closeOnEscape: true,
    showCloseIcon: true,
    header: 'Block scroll activo',
    visible: false,
    position: 'right',
    size: '24rem',
  },
  render: args => ({
    props: {
      ...args,
      localVisible: args.visible,
      openDrawer() {
        this['localVisible'] = true;
      },
      onVisibleChange(next: boolean) {
        this['localVisible'] = next;
      },
    },
    template: `
      <div style="min-height: 500px; padding: 1rem; background: var(--bg-surface, #f4f5f7);">
        <dcx-ng-button label="Abrir con blockScroll=true" variant="danger" (buttonClick)="openDrawer()" />
        <p style="margin-top: 10px;">
          Cuando se abre este drawer, no podrás hacer scroll en la página.
          <strong>Hasta que no lo cierres, el scroll seguirá bloqueado.</strong>
        </p>

        <dcx-ng-drawer
          [visible]="localVisible"
          position="right"
          [modal]="true"
          [dismissible]="true"
          [showCloseIcon]="true"
          [closeOnEscape]="true"
          [blockScroll]="true"
          [fullScreen]="false"
          size="24rem"
          header="Block scroll activo"
          footer="Acción"
          (visibleChange)="onVisibleChange($event)"
        >
          <ng-template #drawerFooter>
            <dcx-ng-button
              label="Cerrar sesión"
              variant="secondary"
              [icon]="true"
              iconName="box-arrow-right"
              iconPosition="left"
              (buttonClick)="onVisibleChange(false)"
            />
          </ng-template>

          <p>Ejemplo para validar bloqueo de scroll del body, si se quiere hacer scroll cerrar el drawer.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};

export const ZIndexExample: Story = {
  args: {
    ...DRAWER_DEFAULT_ARGS,
    visible: false,
  },
  render: args => ({
    props: {
      ...args,
      visibleManual: false,
      visibleAuto: false,
      visibleTop: false,
      openManual() {
        this['visibleManual'] = true;
      },
      openAuto() {
        this['visibleAuto'] = true;
      },
      openTop() {
        this['visibleTop'] = true;
      },
      openAll() {
        this['visibleManual'] = true;
        setTimeout(() => {
          this['visibleAuto'] = true;
        }, 60);
        setTimeout(() => {
          this['visibleTop'] = true;
        }, 120);
      },
      onManualChange(next: boolean) {
        this['visibleManual'] = next;
      },
      onAutoChange(next: boolean) {
        this['visibleAuto'] = next;
      },
      onTopChange(next: boolean) {
        this['visibleTop'] = next;
      },
    },
    template: `
      <div style="padding: 1rem; min-height: 340px; background: var(--bg-surface, #f4f5f7);">
        <p style="margin-top: 0; color: var(--text-muted, #696e75);">
          Orden esperado: Manual 2000 < Auto (base 2000 + incremento) < Manual 2600.
        </p>

        <div style="display:flex; gap: 8px; flex-wrap: wrap;">
          <dcx-ng-button label="Manual 2000" variant="secondary" (buttonClick)="openManual()" />
          <dcx-ng-button label="Auto 2000" variant="primary" (buttonClick)="openAuto()" />
          <dcx-ng-button label="Manual 2600" variant="secondary" (buttonClick)="openTop()" />
          <dcx-ng-button label="Abrir los 3" variant="primary" (buttonClick)="openAll()" />
        </div>

        <dcx-ng-drawer
          [visible]="visibleManual"
          position="right"
          [modal]="true"
          [dismissible]="true"
          [showCloseIcon]="true"
          [closeOnEscape]="true"
          [blockScroll]="false"
          [fullScreen]="false"
          size="24rem"
          [baseZIndex]="2000"
          [autoZIndex]="false"
          header="Manual 2000"
          (visibleChange)="onManualChange($event)"
        >
          <p><strong>autoZIndex=false</strong>: usa exactamente <strong>baseZIndex=2000</strong>.</p>
        </dcx-ng-drawer>

        <dcx-ng-drawer
          [visible]="visibleAuto"
          position="right"
          [modal]="true"
          [dismissible]="true"
          [showCloseIcon]="true"
          [closeOnEscape]="true"
          [blockScroll]="false"
          [fullScreen]="false"
          size="22rem"
          [baseZIndex]="2000"
          [autoZIndex]="true"
          header="Auto 2000"
          (visibleChange)="onAutoChange($event)"
        >
          <p><strong>autoZIndex=true</strong>: incrementa al abrir y queda por encima del manual de 2000.</p>
        </dcx-ng-drawer>

        <dcx-ng-drawer
          [visible]="visibleTop"
          position="right"
          [modal]="true"
          [dismissible]="true"
          [showCloseIcon]="true"
          [closeOnEscape]="true"
          [blockScroll]="false"
          [fullScreen]="false"
          size="20rem"
          [baseZIndex]="2600"
          [autoZIndex]="false"
          header="Manual 2600"
          (visibleChange)="onTopChange($event)"
        >
          <p>Con <strong>baseZIndex=2600</strong> y <strong>autoZIndex=false</strong>, este siempre debe quedar arriba.</p>
        </dcx-ng-drawer>
      </div>
    `,
  }),
};
