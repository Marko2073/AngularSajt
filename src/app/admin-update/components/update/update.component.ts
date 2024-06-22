import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../../admin/buissnes-logic-api/tables.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  koloneZaIspis: { [key: string]: any[] } = {};
  tableColumns: string[] = [];
  tableName: string | null = null;
  formData: any = {}; // Object to store form data
  recordId: string | null = null; // ID of the record to update
  tabela: string = "";

  constructor(
    private tableService: TablesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tableName = params.get('imeTabele');
      this.recordId = params.get('id'); // Assuming you have an 'id' parameter in your route
      if (this.tableName && this.recordId) {
        this.fetchTableColumns(this.tableName);
        this.fetchRecordDetails(this.tableName, this.recordId);

      }
    });
    console.log(this.tableColumns);
  }

  fetchTableColumns(tableName: string): void {
    this.tableService.getTableColumns(tableName).subscribe(data => {
      this.tableColumns = data.filter(column => !['Id', 'CreatedAt', 'UpdatedAt'].includes(column));
      for (let column of this.tableColumns) {
        if (column.endsWith('Id')) {
          if (column !== "ModelVersionId") {
            this.tabela = column.slice(0, -2) + 's';
            this.tableService.getTableData(this.tabela).subscribe(data => {
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

  fetchRecordDetails(tableName: string, recordId: string): void {
    this.tableService.getRecordById(tableName, recordId).subscribe(
      (data: any) => {
        // Assign fetched data to formData
        this.formData = data;
        console.log('Record details', this.formData);
      },
      (error: any) => {
        console.error('Error fetching record details', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.formData.PicturePath = file;
  }

  onSubmit(): void {
    console.log('Form data for update', this.formData);
    this.tableService.updateData(this.tableName!, this.recordId!, this.formData).subscribe(
      (response: any) => {
        this.router.navigate(['/admin/home', this.tableName]);
        // Optionally navigate to another page or handle success
      },
      (error: any) => {
        console.error('Error updating data', error);
      }
    );
  }
}
