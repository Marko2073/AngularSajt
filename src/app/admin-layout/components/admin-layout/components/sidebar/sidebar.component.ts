import { Component, OnInit } from '@angular/core';
import { TablesService } from "../../../../../admin/buissnes-logic-api/tables.service";

export interface Table {
  name: string;
  // dodajte ostale potrebne atribute
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  tables: Table[] = [];
  excludedTables: string[] = ['UserCarts', 'ErrorLogs', 'UseCaseLogs', 'UserUseCases', 'Purchases', "ModelVersionSpecifications", "Specifications", "Roles", "Users"];

  constructor(private tablesService: TablesService) { }

  ngOnInit(): void {
    this.tablesService.getTables().subscribe({
      next: (data: Table[]) => {
        this.tables = data.filter((table: Table) => !this.excludedTables.includes(table.name));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
