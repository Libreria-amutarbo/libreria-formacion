import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSliderComponent } from './dcx-ng-slider.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';


@Component({
    selector: 'test-slider-host',
    template: `
        <form [formGroup]="form">
            <dcx-ng-slider
                formControlName="slider"
                [step]="step"
                [vertical]="vertical"
                (valueChange)="onValueChange($event)"
            ></dcx-ng-slider>
        </form>
        <span class="test-slider-value">{{ form.get('slider')?.value }}</span>
    `,
    standalone: true,
    imports: [DcxNgSliderComponent, ReactiveFormsModule]
})
export class TestHostComponent {
    form = new FormGroup({ slider: new FormControl(0) });
    step = 1;
    vertical = false;
    onValueChange(val: number) {
    }
}

describe('DcxNgSliderComponent', () => {
    let host: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render the slider and value', () => {
        host.form.get('slider')?.setValue(42);
        fixture.detectChanges();
        const input = fixture.debugElement.query(By.css('input[type=range]'));
        const valueSpan = fixture.debugElement.query(By.css('.test-slider-value'));
        expect(input).toBeTruthy();
        expect(valueSpan.nativeElement.textContent).toContain('42');
    });

    it('should emit valueChange on input', () => {
        const spy = jest.spyOn(host, 'onValueChange');
        const input = fixture.debugElement.query(By.css('input[type=range]'));
        input.nativeElement.value = 55;
        input.triggerEventHandler('input', { target: input.nativeElement });
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(55);
    });

    it('should apply vertical class when vertical=true', () => {
        host.vertical = true;
        fixture.detectChanges();
        const wrapper = fixture.debugElement.query(By.css('.dcx-slider-wrapper'));
        expect(wrapper.nativeElement.classList).toContain('vertical');
    });

    it('should use step input', () => {
        host.step = 10;
        fixture.detectChanges();
        const input = fixture.debugElement.query(By.css('input[type=range]'));
        expect(input.nativeElement.step).toBe("10");
    });

    it('should update value when input changes', () => {
        const input = fixture.debugElement.query(By.css('input[type=range]'));
        input.nativeElement.value = 77;
        input.triggerEventHandler('input', { target: input.nativeElement });
        fixture.detectChanges();
        expect(host.form.get('slider')?.value).toBe(77);
        const valueSpan = fixture.debugElement.query(By.css('.test-slider-value'));
        expect(valueSpan.nativeElement.textContent).toContain('77');
    });
});
