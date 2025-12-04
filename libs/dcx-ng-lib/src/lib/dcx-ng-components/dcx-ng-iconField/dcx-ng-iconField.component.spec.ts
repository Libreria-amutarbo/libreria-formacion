import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgIconFieldComponent } from './dcx-ng-iconField.component';

describe('DcxNgIconFieldComponent', () => {
    let component: DcxNgIconFieldComponent;
    let fixture: ComponentFixture<DcxNgIconFieldComponent>;
    let inputElement: HTMLInputElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DcxNgIconFieldComponent, DcxNgIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DcxNgIconFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.css('.dcx-icon-field-input')).nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Tests for Input Properties
    describe('Input Properties', () => {
        it('should set default values correctly', () => {
            expect(component.placeholder).toBe('');
            expect(component.iconLeft).toBe('')
            expect(component.iconSize).toBe('m');
            expect(component.disabled).toBe(false);
            expect(component.value).toBe('');
        });

        it('should update placeholder', () => {
            const placeholder = 'Test placeholder';
            component.placeholder = placeholder;
            fixture.detectChanges();
            expect(inputElement.placeholder).toBe(placeholder);
        });

        it('should handle disabled state', () => {
            component.disabled = true;
            fixture.detectChanges();
            expect(inputElement.disabled).toBe(true);
        });

        it('should show left icon when iconLeft is set', () => {
            component.iconLeft = 'search';
            fixture.detectChanges();

            const leftIconContainer = fixture.debugElement.query(By.css('.dcx-icon-left'));
            expect(leftIconContainer).toBeTruthy();

            const iconComponent = leftIconContainer.query(By.css('dcx-ng-icon'));
            expect(iconComponent).toBeTruthy();
        });

        it('should not show icons when not set', () => {
            component.iconLeft = '';
            fixture.detectChanges();

            const leftIconContainer = fixture.debugElement.query(By.css('.dcx-icon-left'));
            const rightIconContainer = fixture.debugElement.query(By.css('.dcx-icon-right'));

            expect(leftIconContainer).toBeFalsy();
            expect(rightIconContainer).toBeFalsy();
        });

        it('should pass iconSize to icon components', () => {
            component.iconLeft = 'search';
            component.iconSize = 'l';
            fixture.detectChanges();

            const iconComponent = fixture.debugElement.query(By.css('dcx-ng-icon'));
            expect(iconComponent.componentInstance.size).toBe('l');
        });
    });

    // Tests for Event Handlers
    describe('Event Handlers', () => {
        it('should emit valueChange on input', () => {
            const emitSpy = jest.spyOn(component.valueChange, 'emit');
            const testValue = 'test input';

            inputElement.value = testValue;
            inputElement.dispatchEvent(new Event('input'));

            expect(component.value).toBe(testValue);
            expect(emitSpy).toHaveBeenCalledWith(testValue);
        });

        it('should emit focus event on input focus', () => {
            const focusSpy = jest.spyOn(component.focus, 'emit');

            inputElement.dispatchEvent(new Event('focus'));

            expect(focusSpy).toHaveBeenCalled();
        });

        it('should emit blur event on input blur', () => {
            const blurSpy = jest.spyOn(component.blur, 'emit');

            inputElement.dispatchEvent(new Event('blur'));

            expect(blurSpy).toHaveBeenCalled();
        });

        it('should update component value when input changes', () => {
            const testValue = 'new value';

            inputElement.value = testValue;
            inputElement.dispatchEvent(new Event('input'));

            expect(component.value).toBe(testValue);
        });
    });

    // Tests for Component Structure
    describe('Component Structure', () => {
        it('should have correct wrapper structure', () => {
            const wrapper = fixture.debugElement.query(By.css('.dcx-icon-field-wrapper'));
            const container = fixture.debugElement.query(By.css('.dcx-icon-field-container'));

            expect(wrapper).toBeTruthy();
            expect(container).toBeTruthy();
        });

        it('should have input with correct class', () => {
            expect(inputElement.classList.contains('dcx-icon-field-input')).toBe(true);
        })
        // Tests for Accessibility
        describe('Accessibility', () => {
            it('should be focusable when not disabled', () => {
                expect(inputElement.tabIndex).not.toBe(-1);
                expect(inputElement.disabled).toBe(false);
            });

            it('should not be focusable when disabled', () => {
                component.disabled = true;
                fixture.detectChanges();

                expect(inputElement.disabled).toBe(true);
            });

            it('should have proper input type', () => {
                expect(inputElement.type).toBe('text');
            });
        });

        // Tests for Edge Cases
        describe('Edge Cases', () => {
            it('should handle empty string input', () => {
                const emitSpy = jest.spyOn(component.valueChange, 'emit');

                inputElement.value = '';
                inputElement.dispatchEvent(new Event('input'));

                expect(component.value).toBe('');
                expect(emitSpy).toHaveBeenCalledWith('');
            });

            it('should handle special characters in input', () => {
                const specialValue = '!@#$%^&*()';
                const emitSpy = jest.spyOn(component.valueChange, 'emit');

                inputElement.value = specialValue;
                inputElement.dispatchEvent(new Event('input'));

                expect(component.value).toBe(specialValue);
                expect(emitSpy).toHaveBeenCalledWith(specialValue);
            });

            it('should handle unicode characters', () => {
                const unicodeValue = 'búsqueda';
                const emitSpy = jest.spyOn(component.valueChange, 'emit');

                inputElement.value = unicodeValue;
                inputElement.dispatchEvent(new Event('input'));

                expect(component.value).toBe(unicodeValue);
                expect(emitSpy).toHaveBeenCalledWith(unicodeValue);
            });

            it('should handle rapid input changes', () => {
                const values = ['a', 'ab', 'abc', 'abcd'];
                const emitSpy = jest.spyOn(component.valueChange, 'emit');

                values.forEach(value => {
                    inputElement.value = value;
                    inputElement.dispatchEvent(new Event('input'));
                });

                expect(component.value).toBe('abcd');
                expect(emitSpy).toHaveBeenCalledTimes(4);
            });
        });

        // Tests for Icon Size Validation
        describe('Icon Size Validation', () => {
            const validSizes: ('s' | 'm' | 'l' | 'xl')[] = ['s', 'm', 'l', 'xl'];

            validSizes.forEach(size => {
                it(`should accept ${size} as valid icon size`, () => {
                    component.iconSize = size;
                    component.iconLeft = 'search';
                    fixture.detectChanges();

                    const iconComponent = fixture.debugElement.query(By.css('dcx-ng-icon'));
                    expect(iconComponent.componentInstance.size).toBe(size);
                });
            });
        });

        // Tests for Performance
        describe('Performance', () => {
            it('should not recreate icon components unnecessarily', () => {
                component.iconLeft = 'search';
                fixture.detectChanges();

                const initialIcon = fixture.debugElement.query(By.css('dcx-ng-icon'));

                // Change a non-icon property
                component.placeholder = 'new placeholder';
                fixture.detectChanges();

                const afterIcon = fixture.debugElement.query(By.css('dcx-ng-icon'));
                expect(afterIcon.componentInstance).toBe(initialIcon.componentInstance);
            });
        });

        // Tests for Integration
        describe('Integration', () => {
            it('should work as a search field', () => {
                component.iconLeft = 'search';
                component.placeholder = 'Search...';
                fixture.detectChanges();

                expect(inputElement.placeholder).toBe('Search...');
                expect(fixture.debugElement.query(By.css('.dcx-icon-left'))).toBeTruthy();
            });

            it('should work with both search and clear icons', () => {
                component.iconLeft = 'search';
                component.placeholder = 'Search and clear...';
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.dcx-icon-left'))).toBeTruthy();
                expect(inputElement.placeholder).toBe('Search and clear...');
            });
        });
    });
});
