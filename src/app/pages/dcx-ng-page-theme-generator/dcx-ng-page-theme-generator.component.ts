import { Component } from '@angular/core';
import { DcxNgThemeGeneratorComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-theme-generator',
  standalone: true,
  imports: [DcxNgThemeGeneratorComponent],
  templateUrl: './dcx-ng-page-theme-generator.component.html',
  styleUrls: ['./dcx-ng-page-theme-generator.component.scss'],
})
export class DcxNgPageThemeGeneratorComponent {}
