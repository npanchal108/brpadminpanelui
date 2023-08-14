import { Injectable } from '@angular/core';

@Injectable()
export class CsvGeneratorService {
  constructor() { }

  generateCsv(data: any[], filename: string) {
    const csvContent = this.generateCsvContent(data);
    this.downloadCsv(csvContent, filename);
  }

  private generateCsvContent(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return header + '\n' + rows.join('\n');
  }

  private downloadCsv(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}