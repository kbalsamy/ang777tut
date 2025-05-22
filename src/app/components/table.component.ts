// side-by-side-table.component.ts

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-by-side-table',
  template: `
    <div class="table-wrapper">
      <div class="config-table">
        <h3>Previous Config</h3>
        <table>
          <tr *ngFor="let row of table1">
            <td class="key">{{ row.key }}</td>
            <td class="value">{{ row.value }}</td>
          </tr>
        </table>
      </div>
      <div class="config-table">
        <h3>Current Config</h3>
        <table>
          <tr *ngFor="let row of table2">
            <td class="key">{{ row.key }}</td>
            <td class="value">{{ row.value }}</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .table-wrapper {
      display: flex;
      
    }
    .config-table {
      flex: 1;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td {
      padding: 8px 12px;
      border: 1px solid #ccc;
    }
    .key {
      font-weight: bold;
      background-color: #f4f4f4;
      width: 40%;
    }
    .value {
      width: 60%;
    }
    h3 {
      margin-bottom: 0.5rem;
    }
  `],
    standalone: false,
  

})
export class SideBySideTableComponent implements OnInit {
  @Input() obj1: any;
  @Input() obj2: any;

  table1: { key: string, value: any }[] = [];
  table2: { key: string, value: any }[] = [];

  ngOnInit(): void {
    this.table1 = this.flattenKeyValue(this.obj1);
    this.table2 = this.flattenKeyValue(this.obj2);
    const maxLength = Math.max(this.table1.length, this.table2.length);
    this.padTables(maxLength);
  }

  flattenKeyValue(obj: any): { key: string, value: any }[] {
    const result: { key: string, value: any }[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          result.push({ key: `Task ${index + 1}`, value:''  });
          for (const [subKey, subVal] of Object.entries(item)) {
            if (subKey === 'config') {
              for (const [confKey, confVal] of Object.entries(subVal? subVal : {})) {
                result.push({ key: confKey, value: Array.isArray(confVal) ? JSON.stringify(confVal) : confVal });
              }
            } else {
              result.push({ key: subKey, value: Array.isArray(subVal) ? JSON.stringify(subVal) : subVal });
            }
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        for (const [subKey, subVal] of Object.entries(value)) {
          result.push({ key: subKey, value: subVal });
        }
      } else {
        result.push({ key, value });
      }
    }

    return result;
  }

  padTables(length: number) {
    while (this.table1.length < length) {
      this.table1.push({ key: '-', value: '-' });
    }
    while (this.table2.length < length) {
      this.table2.push({ key: '-', value: '-' });
    }
  }
}
