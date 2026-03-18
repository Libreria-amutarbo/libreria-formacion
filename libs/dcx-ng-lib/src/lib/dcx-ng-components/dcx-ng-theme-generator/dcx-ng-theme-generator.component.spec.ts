import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CAPGEMINI_THEME_TOKENS, DcxNgThemeGeneratorComponent, ThemeToken } from '@dcx-ng-components/dcx-ng-lib';


describe('DcxNgThemeGeneratorComponent', () => {
  let component: DcxNgThemeGeneratorComponent;
  let fixture: ComponentFixture<DcxNgThemeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgThemeGeneratorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgThemeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all color tokens from default mock', () => {
    expect(component._tokens().length).toBe(CAPGEMINI_THEME_TOKENS.length);
  });

  it('should start with "background" as active group', () => {
    expect(component.activeGroup()).toBe('background');
  });

  it('should show only tokens for the active group', () => {
    component.setGroup('text');
    const tokens = component.tokensForActiveGroup();
    expect(tokens.every(t => t.group === 'text')).toBe(true);
  });

  it('should update a token value when updateToken is called', () => {
    const tokenName = '--bg-primary';
    component.updateToken(tokenName, '#ff0000');
    const updated = component._tokens().find(t => t.name === tokenName);
    expect(updated?.value).toBe('#ff0000');
  });

  it('should mark token as modified when its value differs from default', () => {
    component.updateToken('--bg-primary', '#ff0000');
    const token = component._tokens().find(t => t.name === '--bg-primary')!;
    expect(component.isModified(token)).toBe(true);
  });

  it('should not mark token as modified when value matches default', () => {
    const token = component._tokens().find(t => t.name === '--bg-primary')!;
    expect(component.isModified(token)).toBe(false);
  });

  it('should have hasChanges = false initially', () => {
    expect(component.hasChanges()).toBe(false);
  });

  it('should have hasChanges = true after modifying a token', () => {
    component.updateToken('--bg-primary', '#ff0000');
    expect(component.hasChanges()).toBe(true);
  });

  it('should emit themeChanged when a token is updated', () => {
    const spy = jest.fn();
    component.themeChanged.subscribe(spy);
    component.updateToken('--bg-primary', '#ff0000');
    expect(spy).toHaveBeenCalledWith(component._tokens());
  });

  it('should reset a single token to its default value', () => {
    component.updateToken('--bg-primary', '#ff0000');
    component.resetToken('--bg-primary');
    const token = component._tokens().find(t => t.name === '--bg-primary')!;
    expect(token.value).toBe(token.defaultValue);
  });

  it('should reset all tokens to default when resetAll is called', () => {
    component.updateToken('--bg-primary', '#ff0000');
    component.updateToken('--text-dark', '#aabbcc');
    component.resetAll();
    const allMatch = component._tokens().every(t => t.value === t.defaultValue);
    expect(allMatch).toBe(true);
  });

  it('should generate CSS with only modified tokens', () => {
    component.updateToken('--bg-primary', '#ff0000');
    const css = component.generatedCss();
    expect(css).toContain('--bg-primary: #ff0000;');
    expect(css).not.toContain('--text-dark');
  });

  it('should return empty string from generatedCss when no tokens are modified', () => {
    expect(component.generatedCss()).toBe('');
  });

  it('should count modified tokens per group', () => {
    component.updateToken('--bg-primary', '#ff0000');
    component.updateToken('--bg-hover', '#eeeeee');
    expect(component.modifiedCountByGroup()['background']).toBe(2);
  });

  it('should not render preview section when showPreview is false', () => {
    fixture.componentRef.setInput('showPreview', false);
    fixture.detectChanges();
    const preview = fixture.nativeElement.querySelector(
      '.theme-generator__preview',
    );
    expect(preview).toBeNull();
  });

  it('should use downloadFileName input for file download', () => {
    fixture.componentRef.setInput('downloadFileName', 'custom-theme.css');
    fixture.detectChanges();
    expect(component.downloadFileName()).toBe('custom-theme.css');
  });

  it('should emit cssGenerated when copyCss is called with modified tokens', () => {
    const spy = jest.fn();
    component.cssGenerated.subscribe(spy);
    component.updateToken('--bg-primary', '#ff0000');

    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });

    component.copyCss();
    expect(spy).toHaveBeenCalledWith(component.generatedCss());
  });

  it('should accept custom tokens via input', () => {
    const customTokens: ThemeToken[] = [
      {
        name: '--custom-color',
        value: '#123456',
        defaultValue: '#123456',
        label: 'Custom',
        group: 'background',
      },
    ];
    fixture.componentRef.setInput('tokens', customTokens);
    fixture.detectChanges();
    expect(component._tokens().length).toBe(1);
    expect(component._tokens()[0].name).toBe('--custom-color');
  });
});
