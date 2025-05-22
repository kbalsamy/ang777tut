// side-by-side-table.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'diff-side-by-side-table',
  template: `
    <div class="table-wrapper">
      <div class="config-table">
        <h3>Previous Config</h3>
        <table>
          <tr *ngFor="let row of combinedTable" [class.diff-row]="row.highlight">
            <td class="key">{{ row.key1 }}</td>
            <td class="value">{{ row.value1 }}</td>
          </tr>
        </table>
      </div>
      <div class="config-table">
        <h3>Current Config</h3>
        <table>
          <tr *ngFor="let row of combinedTable" [class.diff-row]="row.highlight">
            <td class="key">{{ row.key2 }}</td>
            <td class="value">{{ row.value2 }}</td>
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
    .diff-row {
      background-color: #fff3cd;
    }
  `],
    standalone: false,
})
export class DiffSideBySideTableComponent implements OnInit {
  @Input() obj1: any;
  @Input() obj2: any;

  combinedTable: { key1: string, value1: any, key2: string, value2: any, highlight: boolean }[] = [];

  ngOnInit(): void {
    const table1 = this.flattenKeyValue(this.obj1);
    const table2 = this.flattenKeyValue(this.obj2);
    const maxLength = Math.max(table1.length, table2.length);

    while (table1.length < maxLength) table1.push({ key: '-', value: '-' });
    while (table2.length < maxLength) table2.push({ key: '-', value: '-' });

    this.combinedTable = table1.map((row1, i) => {
      const row2 = table2[i];
      return {
        key1: row1.key,
        value1: row1.value,
        key2: row2.key,
        value2: row2.value,
        highlight: row1.value !== row2.value
      };
    });
  }

  flattenKeyValue(obj: any): { key: string, value: any }[] {
    const result: { key: string, value: any }[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          result.push({ key: '---', value: `Task ${index + 1}` });
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
} 