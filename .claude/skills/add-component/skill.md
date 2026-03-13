---
name: add-component
description: Scaffolds a new component in the lib AND its showcase page. Creates the lib component, the page component, registers the route and exports. Use when a developer wants to add a new component (e.g. /add-component badge).
tools: read, edit, write, search, execute
---

You are adding a new component to the Angular component library and its showcase app.

The component name is: **$ARGUMENTS**

## Naming derivations

From the input name (e.g. `badge` or `date-picker`), derive:

| Variable           | Rule                                    | Example (`badge`)             | Example (`date-picker`)          |
|--------------------|-----------------------------------------|-------------------------------|----------------------------------|
| `ROUTE_KEY`        | SCREAMING_SNAKE_CASE                    | `BADGE`                       | `DATE_PICKER`                    |
| `route_path`       | kebab-case as-is                        | `badge`                       | `date-picker`                    |
| `lib_folder`       | `dcx-ng-{route_path}`                   | `dcx-ng-badge`                | `dcx-ng-date-picker`             |
| `lib_selector`     | `dcx-ng-{route_path}`                   | `dcx-ng-badge`                | `dcx-ng-date-picker`             |
| `lib_class`        | `DcxNg{PascalCase}Component`            | `DcxNgBadgeComponent`         | `DcxNgDatePickerComponent`       |
| `lib_file_prefix`  | `dcx-ng-{route_path}`                   | `dcx-ng-badge`                | `dcx-ng-date-picker`             |
| `page_folder`      | `dcx-ng-page-{route_path}`              | `dcx-ng-page-badge`           | `dcx-ng-page-date-picker`        |
| `page_class`       | `DcxNgPage{PascalCase}Component`        | `DcxNgPageBadgeComponent`     | `DcxNgPageDatePickerComponent`   |
| `page_selector`    | `dcx-ng-page-{route_path}`              | `dcx-ng-page-badge`           | `dcx-ng-page-date-picker`        |
| `page_file_prefix` | `dcx-ng-page-{route_path}`              | `dcx-ng-page-badge`           | `dcx-ng-page-date-picker`        |

---

## Step 1 — Create the lib component

Create the folder `libs/dcx-ng-lib/src/lib/dcx-ng-components/{lib_folder}/` with these 4 files:

**`{lib_file_prefix}.component.ts`**
```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib_selector',
  standalone: true,
  imports: [],
  templateUrl: './{lib_file_prefix}.component.html',
  styleUrls: ['./{lib_file_prefix}.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class lib_class {}
```

**`{lib_file_prefix}.component.html`**
```html
<div class="lib_selector">
  <!-- TODO: implement lib_class -->
</div>
```

**`{lib_file_prefix}.component.scss`**
```scss
.lib_selector {
  // TODO: styles for lib_class
}
```

**`{lib_file_prefix}.component.spec.ts`**
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { lib_class } from './{lib_file_prefix}.component';

describe('lib_class', () => {
  let component: lib_class;
  let fixture: ComponentFixture<lib_class>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [lib_class],
    }).compileComponents();

    fixture = TestBed.createComponent(lib_class);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Step 2 — Export from index.ts

Read `libs/dcx-ng-lib/src/index.ts` and add the export at the end:

```ts
export * from './lib/dcx-ng-components/{lib_folder}/{lib_file_prefix}.component';
```

---

## Step 3 — Add the route constant

Read `src/app/core/constants/app-routes.ts` and add a new entry inside `APP_ROUTES`:

```ts
ROUTE_KEY: 'route_path',
```

---

## Step 4 — Create the showcase page

Create the folder `src/app/pages/{page_folder}/` with these 4 files:

**`{page_file_prefix}.component.ts`**
```ts
import { Component } from '@angular/core';
import { lib_class } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'page_selector',
  standalone: true,
  imports: [lib_class],
  templateUrl: './{page_file_prefix}.component.html',
  styleUrls: ['./{page_file_prefix}.component.scss'],
})
export class page_class {}
```

**`{page_file_prefix}.component.html`**
```html
<section>
  <h2 class="example-title">Ejemplo 1 - TODO</h2>
  <!-- Add lib_selector examples here -->
</section>
```

**`{page_file_prefix}.component.scss`**
```scss
// Styles for page_class examples
```

**`{page_file_prefix}.component.spec.ts`**
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { page_class } from './{page_file_prefix}.component';

describe('page_class', () => {
  let component: page_class;
  let fixture: ComponentFixture<page_class>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [page_class],
    }).compileComponents();

    fixture = TestBed.createComponent(page_class);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Step 5 — Register the route in app.routes.ts

Read `src/app/app.routes.ts` and:

1. Add the import with the other page imports:
```ts
import { page_class } from './pages/{page_folder}/{page_file_prefix}.component';
```

2. Add the route entry inside `appRoutes`:
```ts
{
  path: APP_ROUTES.ROUTE_KEY,
  component: page_class,
},
```

---

## Validation summary

After all changes, confirm to the user:

- ✓ Lib component created: `libs/dcx-ng-lib/src/lib/dcx-ng-components/{lib_folder}/`
- ✓ Exported from `libs/dcx-ng-lib/src/index.ts`
- ✓ Route constant `APP_ROUTES.ROUTE_KEY` added to `app-routes.ts`
- ✓ Showcase page created: `src/app/pages/{page_folder}/`
- ✓ Route registered in `app.routes.ts`
- ✓ Component will appear automatically in the sidebar navigation
