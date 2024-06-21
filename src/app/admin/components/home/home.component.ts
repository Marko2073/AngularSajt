import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TablesService} from "../../buissnes-logic-api/tables.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tableData: any[] = [];
  tableColumns: string[] = [];
  tableName: string | null = null;

  constructor(
    private tableService: TablesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tableName = params.get('imeTabele');
      if (this.tableName) {
        this.fetchTableColumns(this.tableName);
        this.fetchTableData(this.tableName)
      }
    });
  }

  fetchTableColumns(tableName: string): void {
    this.tableService.getTableColumns(tableName).subscribe(data=>{
      this.tableColumns = data;
      console.log(this.tableColumns);
    })
  }
  fetchTableData(tableName: string): void {

    this.tableService.getTableData(tableName).subscribe(data => {
      this.tableData = data;
      if (this.tableData.length > 0) {
        this.tableColumns = Object.keys(this.tableData[0]).filter(column => column !== 'CreatedAt' && column !== 'UpdatedAt');
      }
      console.log(this.tableData);
    });
  }
}
