// side-by-side-table.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'merge-app-side-by-side-table',
  template: `
    <div class="table-wrapper">
      <div class="config-table">
        <h3>Previous Config</h3>
        <table>
          <tr *ngFor="let row of combinedTable">
            <td class="key">{{ row.key }}</td>
            <td class="value" [class.diff-row]="row.highlight">{{ row.value1 }}</td>
          </tr>
        </table>
      </div>
      <div class="config-table">
        <h3>Current Config</h3>
        <table>
          <tr *ngFor="let row of combinedTable">
            <td class="key">{{ row.key }}</td>
            <td class="value" [class.diff-row]="row.highlight">{{ row.value2 }}</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .table-wrapper {
      display: flex;
      gap: 2rem;
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
  standalone: false
})
export class MergeSideBySideTableComponent implements OnInit {
  @Input() obj1: any;
  @Input() obj2: any;

  combinedTable: { key: string, value1: any, value2: any, highlight: boolean }[] = [];

  ngOnInit(): void {
    const table1 = this.flattenKeyValue(this.obj1);
    const table2 = this.flattenKeyValue(this.obj2);

    const keyMap = new Map<string, { value1?: any, value2?: any }>();

    for (const row of table1) {
      keyMap.set(row.key, { value1: row.value });
    }
    for (const row of table2) {
      if (keyMap.has(row.key)) {
        keyMap.get(row.key)!.value2 = row.value;
      } else {
        keyMap.set(row.key, { value2: row.value });
      }
    }

    this.combinedTable = Array.from(keyMap.entries()).map(([key, values]) => ({
      key,
      value1: values.value1 ?? '-',
      value2: values.value2 ?? '-',
      highlight: values.value1 !== values.value2
    }));
  }

  flattenKeyValue(obj: any): { key: string, value: any }[] {
    const result: { key: string, value: any }[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          result.push({ key: 'Task ' + (index + 1), value: '' });
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