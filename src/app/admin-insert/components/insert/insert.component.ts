import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../../admin/buissnes-logic-api/tables.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  koloneZaIspis: { [key: string]: any[] } = {};
  tableColumns: string[] = [];
  tableName: string | null = null;
  formData: any = {}; // Objekat za skladištenje forme
  tabela:string=""

  constructor(
    private tableService: TablesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tableName = params.get('imeTabele');
      if (this.tableName) {
        this.fetchTableColumns(this.tableName);
      }
    });
  }

  fetchTableColumns(tableName: string): void {
    this.tableService.getTableColumns(tableName).subscribe(data => {
      this.tableColumns = data.filter(column => !['Id', 'CreatedAt', 'UpdatedAt'].includes(column));
      for (let column of this.tableColumns) {
        if (column.endsWith('Id')) {
          if (column !== "ModelVersionId") {
            this.tabela=column.slice(0, -2) + 's'
            this.tableService.getTableData(this.tabela ).subscribe(data => {
              console.log(this.tabela)
              this.koloneZaIspis[this.tabela] = data;
            });
          } else {
            this.tableService.getTableData('ModelVersions').subscribe(data => {
              this.koloneZaIspis['ModelVersions'] = data;
            });
          }
        }
      }
    });
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.formData.PicturePath = file;
  }

  onSubmit(): void {
  console.log('Form data', this.formData);
    this.tableService.insertData(this.tableName!, this.formData).subscribe(
      (response: any) => {

        this.router.navigate(['/admin/home', this.tableName]);

      },
      (error: any) => {
        console.error('Error inserting data', error);
      }
    );
  }
}
