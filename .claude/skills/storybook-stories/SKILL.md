---
name: storybook-stories
description: Generates Storybook stories for DCX NG Library Angular components. Use when the user asks to create, generate, or add stories for a component in the dcx-ng-lib.
---

When generating Storybook stories for a component:

## Step 1 — Gather context

1. Identify the component name from the user's request (e.g. "Button", "Accordion", "Select").
2. Find the component file:
   - Look in `libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-[name]/dcx-ng-[name].component.ts`
3. Read the component file to extract:
   - Class name (`DcxNg[Name]Component`)
   - All `input()` signals — name, type, default value
   - All `output()` signals — name, emitted type
   - Selector (`dcx-ng-[name]`)
4. Check the public library exports to find re-exported constants, types, and lists:
   - `libs/dcx-ng-lib/src/index.ts`
5. Check if a stories folder already exists:
   - `libs/dcx-ng-lib/src/lib/stories/[Name]/`
6. Check if fixture data already exists:
   - `libs/dcx-ng-lib/src/lib/core/fixtures/[name].ts`

## Step 2 — Create fixture data in `core/fixtures`

If the component accepts arrays or objects as inputs, create (or update) the fixture file:
`libs/dcx-ng-lib/src/lib/core/fixtures/[name].ts`

- Name constants with the component prefix to avoid collisions (e.g. `navbarItems`, `navbarDefaultBrand`)
- Import types from `@dcx-ng-components/dcx-ng-lib`
- Export all constants so they can be reused in unit tests

Then add the export to `libs/dcx-ng-lib/src/lib/core/fixtures/index.ts`:

```typescript
export * from './[name]';
```

The stories file must import mocks from `@dcx-ng-components/dcx-ng-lib`, **never define mock data inline**.

## Step 3 — Generate `ClassBased.stories.ts`

Create the file at `libs/dcx-ng-lib/src/lib/stories/[Name]/ClassBased.stories.ts`.

Follow this structure strictly:

```typescript
import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { DcxNg[Name]Component } from '@dcx-ng-components/dcx-ng-lib';
// Import mock data and type lists from the lib
import { [mockConstant], [TypeList] } from '@dcx-ng-components/dcx-ng-lib';

// Actions — one fn() per output()
const ActionsData = {
  [outputName]: fn(),
};

const meta: Meta<DcxNg[Name]Component> = {
  title: 'DCXLibrary/Components/[Name]',
  component: DcxNg[Name]Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    // One entry per input()
    [inputName]: {
      control: { type: 'text' | 'boolean' | 'select' | 'object' | 'number' },
      options: [/* only for select controls — use imported list if available */],
      description: 'Clear description of the input',
      table: {
        category: 'Attributes',
        type: { summary: 'TypeScriptType' },
        defaultValue: { summary: 'defaultValue' },
      },
    },
    // One entry per output()
    [outputName]: {
      action: '[outputName]',
      description: 'Emitted when ...',
      table: {
        category: 'Events',
        type: { summary: 'EventType' },
      },
    },
  },
  args: {
    // Sensible defaults — use imported mock constants
  },
};

export default meta;
type Story = StoryObj<DcxNg[Name]Component>;

// Minimum 3 stories covering: basic usage, key variants/states, interactive/complex case

export const Default: Story = {
  args: {
    // minimal required args using mock constants
  },
};

export const [VariantOrState]: Story = {
  args: {
    // args that showcase this variant
  },
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      [outputName]: ActionsData.[outputName],
    },
    template: `
      <dcx-ng-[name]
        [inputProp]="inputProp"
        (outputEvent)="outputEvent($event)"
      ></dcx-ng-[name]>
    `,
  }),
};
```

### Control type mapping

- `string` input → `control: 'text'`
- `boolean` input → `control: 'boolean'`
- union/enum with imported list → `control: 'select'`, `options: IMPORTED_LIST`
- `number` → `control: 'number'`
- array/object → `control: { type: 'object' }`

### Special cases

- If the component requires `moduleMetadata` (uses other DCX components in its template), add:
  ```typescript
  import { moduleMetadata } from '@storybook/angular';
  // in meta:
  decorators: [moduleMetadata({ imports: [DcxNg[Dependency]Component] })]
  ```
- If the component is complex and needs internal state (e.g. open/close toggle), use a `render` function with stateful props.

## Step 4 — Generate `Documentation.mdx`

Create the file at `libs/dcx-ng-lib/src/lib/stories/[Name]/Documentation.mdx`.

````mdx
import { Meta, Canvas } from '@storybook/blocks';
import * as [Name]Stories from './ClassBased.stories';

<Meta title="DCXLibrary/[Name]/Documentation" />

# [Name]

Brief description of what the component does and its main characteristics.

---

## Class-Based Demo

<Canvas of={[Name]Stories.Default} />

---

## Props

- `propName: Type` — Description
- `anotherProp: Type` — Description

---

## Uso básico

```html
<dcx-ng-[name]
  [prop]="value"
  (event)="handler($event)"
></dcx-ng-[name]>
````

## Estados y variantes

<Canvas of={[Name]Stories.[VariantOrState]} />
<Canvas of={[Name]Stories.Interactive} />
```

## Step 5 — Checklist before finishing

Verify that:

- [ ] Fixture data is in `core/fixtures/[name].ts` and exported from `core/fixtures/index.ts`
- [ ] `ClassBased.stories.ts` imports all mocks from `@dcx-ng-components/dcx-ng-lib` (no inline data)
- [ ] `ClassBased.stories.ts` has at least 3 stories
- [ ] All `input()` signals have an `argType` with control, description, and table
- [ ] All `output()` signals have an `argType` with `action` and `table: { category: 'Events' }`
- [ ] `Documentation.mdx` references the correct story exports
- [ ] No `console.log` left in stories
- [ ] If types/lists are exported from the lib, they are imported from `@dcx-ng-components/dcx-ng-lib`

## Conventions

- Title format: `'DCXLibrary/Components/[Name]'` — no añadir "Class based" ni subpaths extra
- Documentation title: `'DCXLibrary/[Name]/Documentation'` — sin "Components/"
- Story names: PascalCase, descriptive (`Default`, `Disabled`, `WithIcon`, `Interactive`)
- Inputs category: `'Attributes'`
- Outputs category: `'Events'`
- Use `fn()` from `@storybook/test` for all output actions
- Import component types from `@dcx-ng-components/dcx-ng-lib`, not from relative paths — unless the component doesn't re-export from index yet
- Mock constant names must be prefixed with the component name in camelCase (e.g. `navbarItems`, `buttonVariants`) to avoid collisions across mock files
