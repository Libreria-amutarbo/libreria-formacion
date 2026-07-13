import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { DcxSpinnerSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-spinner',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-spinner.component.html',
  styleUrl: './dcx-ng-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--dcx-spinner-delay]': 'delay() + "ms"',
    '[style.--dcx-spinner-color]': 'color() || null',
  },
})
export class DcxNgSpinnerComponent implements OnDestroy {
  // Inputs
  readonly size = input<DcxSpinnerSize>('m');
  readonly wrapper = input<boolean>(false);
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly delay = input<number>(1300);
  readonly color = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  // Computed classes
  readonly spinnerClasses = computed<string>(() => {
    const base = 'dcx-ng-spinner';
    const sizeValue = this.size();
    const wrapperValue = this.wrapper();

    return [
      base,
      `${base}--${sizeValue}`,
      wrapperValue ? `${base}--wrapper` : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly computedAriaLabel = computed<string>(() => {
    return this.ariaLabel() || this.title() || 'Cargando…';
  });

  readonly hasContent = computed<boolean>(() => {
    return !!(this.title() || this.description());
  });

  // Visibilidad retrasada: evita el parpadeo del spinner en operaciones muy
  // rápidas. delay() <= 0 se muestra de forma síncrona, sin pasar por timer.
  readonly visible = signal(false);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  private readonly _delayEffect = effect(() => {
    const ms = this.delay();

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (ms <= 0) {
      this.visible.set(true);
      return;
    }

    this.visible.set(false);
    this.timeoutId = setTimeout(() => this.visible.set(true), ms);
  });

  ngOnDestroy(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }
}
