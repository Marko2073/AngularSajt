import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../../admin/buissnes-logic-api/tables.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  koloneZaIspis: { [key: string]: any[] } = {};
  tableColumns: string[] = [];
  tableName: string | null = null;
  modifiedColumn:string="";
  tableData:any[]=[];


  constructor(
    private tableService: TablesService,
    private route: ActivatedRoute,
    private tablesService: TablesService
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
      console.log(this.tableColumns);
      for (let i of this.tableColumns){
        const idColumn = i.endsWith('Id')
        if (idColumn) {
          if(i!="ParentId"){
            this.modifiedColumn = i.slice(0, -2) + 's';
          }
          else {
            this.modifiedColumn = "Specifications";
          }


          this.tableService.getTableData(this.modifiedColumn).subscribe(data => {
            this.tableData = data;
            this.koloneZaIspis[this.modifiedColumn]=this.tableData
            console.log(this.koloneZaIspis["Specifications"])

          });
        }

      }


    });
  }

}
