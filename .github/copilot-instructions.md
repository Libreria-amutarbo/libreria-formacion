# GitHub Copilot Instructions — DCX NG Library

## Metodología: Spec Driven Development (SDD)

**Antes de escribir cualquier código de implementación**, hay que escribir una especificación y obtener aprobación del equipo.

### Flujo obligatorio

```
1. Spec  →  2. Aprobación  →  3. Implementación
```

1. **Crear el spec** en `specs/{nombre-kebab-case}.spec.md` con:
   - Overview (qué y por qué)
   - Acceptance Criteria (checklist de condiciones)
   - API: inputs/outputs del componente
   - Estados y variantes visuales
   - Tokens SCSS a usar o crear
   - Casos de test
   - Plan de implementación
2. **Esperar aprobación explícita** del equipo antes de tocar código de producción.
3. **Implementar** siguiendo el spec. Si hay desviaciones, actualizar el spec.

> Para bug fixes simples el spec puede ser mínimo (Overview + Acceptance Criteria + Tests).

---

## Stack

- **Angular 20** — standalone components, Signals API (`input()`, `output()`, `signal()`, `computed()`, `effect()`)
- **Nx** — monorepo y build system
- **SCSS** — estilos con variables/tokens CSS
- **Storybook** — documentación interactiva de componentes
- **Jest** — tests unitarios
- **ESLint + Prettier** — linting y formateo (via Husky pre-commit)

---

## Estructura del monorepo

```
libs/dcx-ng-lib/src/lib/
  dcx-ng-components/        # Componentes de la librería
    dcx-ng-{name}/
      dcx-ng-{name}.component.ts
      dcx-ng-{name}.component.html
      dcx-ng-{name}.component.scss
      dcx-ng-{name}.component.spec.ts
  core/
    interfaces/             # Tipos e interfaces compartidas
    mock/                   # Mock data (usada en tests y stories)
  stories/
    {Name}/
      ClassBased.stories.ts
      Documentation.mdx

src/app/
  pages/                    # Páginas del showcase (una por componente)
  core/constants/           # app-routes.ts, route-icons.ts, etc.
  app.routes.ts
  app.component.ts          # Shell: navbar + router-outlet
```

---

## Componentes Angular — Convenciones

### Anatomía de un componente

```typescript
@Component({
  selector: 'dcx-ng-{name}',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-{name}.component.html',
  styleUrls: ['./dcx-ng-{name}.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNg{Name}Component {
  // Inputs con signals
  readonly label = input<string>('');
  readonly disabled = input<boolean>(false);

  // Outputs con signals
  readonly clicked = output<void>();

  // Estado interno privado
  private readonly _open = signal(false);

  // Valores derivados
  readonly isVisible = computed(() => !this.disabled());

  // Effects fuera del constructor
  readonly _logEffect = effect(() => {
    console.log(this.label());
  });
}
```

### Reglas de código

- **Siempre arrow functions**: `() => {}`
- **Early return** en vez de if-else anidados
- **Sin constructor** para lógica; usar `effect()` fuera del constructor
- **Siempre desuscribirse**: usar `takeUntilDestroyed()` o `DestroyRef`
- **Control flow moderno en templates**: `@if`, `@for`, `@switch` (no `*ngIf`, `*ngFor`)
- **Sin `console.log`** en código comiteado

### Naming

| Artefacto         | Convención                 | Ejemplo                 |
| ----------------- | -------------------------- | ----------------------- |
| Selector          | `dcx-ng-{kebab}`           | `dcx-ng-button`         |
| Clase             | `DcxNg{Pascal}Component`   | `DcxNgButtonComponent`  |
| Clase CSS raíz    | `.dcx-{kebab}`             | `.dcx-button`           |
| Modificadores BEM | `.dcx-{kebab}--{state}`    | `.dcx-button--disabled` |
| Interfaces        | `Dcx{Pascal}Options`       | `DcxButtonOptions`      |
| Rutas             | snake_case en `APP_ROUTES` | `BUTTON: 'button'`      |

---

## SCSS y Tokens

Usar siempre las variables CSS de la librería. Fallback a valores concretos solo si el token no existe aún.

```scss
.dcx-button {
  background: var(--background-primary, #0058ab);
  color: var(--content-on-primary, #ffffff);
  border-radius: var(--border-radius-md, 6px);
  font-family: var(--font-family-primary, 'Inter', sans-serif);

  &--disabled {
    opacity: 0.4;
    pointer-events: none;
  }
}
```

Tokens principales: `--color-primary`, `--background-primary`, `--background-primary-hover`, `--content-default`, `--content-subtle`, `--border-default`, `--color-surface`, `--font-family-primary`, `--border-radius-*`, `--shadow-*`.

---

## Testing

- Framework: **Jest**
- Fixtures en: `libs/dcx-ng-lib/src/lib/core/fixtures/{name}.ts` (nunca inline en el spec)
- Exportar fixtures desde `core/fixtures/index.ts` para que sean reutilizables en stories y tests
- Cobertura mínima: **80%**
- Patrón: Arrange / Act / Assert

```typescript
it('should emit clicked when button is pressed', () => {
  // Arrange
  const emitSpy = jest.spyOn(component.clicked, 'emit');
  // Act
  fixture.debugElement.nativeElement.querySelector('button').click();
  // Assert
  expect(emitSpy).toHaveBeenCalled();
});
```

---

## Storybook

- Stories en: `libs/dcx-ng-lib/src/lib/stories/{Name}/ClassBased.stories.ts`
- Documentación en: `libs/dcx-ng-lib/src/lib/stories/{Name}/Documentation.mdx`
- Título meta: `'DCXLibrary/Components/{Name}'`
- Título docs: `'DCXLibrary/{Name}/Documentation'`
- Mínimo **3 stories** por componente: `Default`, una variante/estado, `Interactive`
- Importar mocks y tipos desde `@dcx-ng-components/dcx-ng-lib` (nunca rutas relativas)
- Usar `fn()` de `@storybook/test` para todos los outputs

---

## Checklist pre-commit

- [ ] Spec en `specs/` creado y aprobado
- [ ] Componente standalone con `ChangeDetectionStrategy.OnPush`
- [ ] Signals API: `input()`, `output()`, `signal()`
- [ ] Sin `console.log`
- [ ] Tests unitarios (>80% cobertura)
- [ ] Stories con ≥3 casos y documentación MDX
- [ ] Fixtures en `core/fixtures/` (no inline)
- [ ] Lint sin errores (`npm run lint`)
- [ ] Build sin errores (`npx nx build dcx-ng-components`)

---

## Comandos clave

```bash
npx nx serve dcx-ng-components   # Dev server
npm run start-storybook           # Storybook
npm test                          # Tests con cobertura
npm run lint                      # Lint
npm run lint-fix                  # Lint + autofix
npx nx build dcx-ng-components   # Build producción
```

---

## Links

- Storybook develop: https://libreria-amutarbo.github.io/libreria-formacion/develop/
- Storybook main: https://libreria-amutarbo.github.io/libreria-formacion/main/
