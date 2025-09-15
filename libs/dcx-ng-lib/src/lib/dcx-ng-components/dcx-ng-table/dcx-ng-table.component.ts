import { Component, Input } from '@angular/core';

interface headerData {
  name: string;
  icon?: string;
  action?: any;
}

interface bodyData {
  value: any[];
}
interface tableData {
  headers: headerData[];
  body: bodyData;
}

@Component({
  selector: 'dcx-ng-table',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-table.component.html',
  styleUrl: './dcx-ng-table.component.css',
})
export class DcxNgTableComponent {
  @Input() data: tableData = {
    headers: [
      {
        name: 'Position',
      },
      {
        name: 'Name',
      },
      {
        name: 'Symbol',
      },
    ],
    body: {
      value: [
        { position: 1, name: 'Hydrogen', symbol: 'H' },
        { position: 2, name: 'Helium', symbol: 'He' },
        { position: 3, name: 'Lithium', symbol: 'Li' },
        { position: 4, name: 'Beryllium', symbol: 'Be' },
        { position: 5, name: 'Boron', symbol: 'B' },
        { position: 6, name: 'Carbon', symbol: 'C' },
        { position: 7, name: 'Nitrogen', symbol: 'N' },
        { position: 8, name: 'Oxygen', symbol: 'O' },
        { position: 9, name: 'Fluorine', symbol: 'F' },
        { position: 10, name: 'Neon', symbol: 'Ne' },
      ],
    },
  };
}
