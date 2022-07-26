# NgxBarSearch

# Usage

1. Firstly, import `NgxSearchBarModule` in your app module (or any other proper angular module):

   ```typescript
   import { NgxSearchBarModule } from "ngx-search-bar";
   import { FormsModule } from "@angular/forms";
   import { MatBadgeModule } from "@angular/material/badge";
   import { MatButtonModule } from "@angular/material/button";
   import { MatChipsModule } from "@angular/material/chips";
   import { MatIconModule } from "@angular/material/icon";
   import { MatMenuModule } from "@angular/material/menu";
   @NgModule({
     imports: [
       CommonModule,
       FormsModule,
       RouterModule,
       HttpClientModule,
       MatIconModule,
       MatChipsModule,
       MatBadgeModule,
       MatMenuModule,
       MatButtonModule,
       NgxSearchBarModule.forRoot({
         serverUrl: "http://localhost:8080/api/",
       }),
     ],
   })
   export class AppModule {}
   ```

# In the template

1. Add the `ngx-search-bar` component to your template:

   ```html
   <ngx-search-bar
     [filter_data]="filters"
     [placeholder]="'#, ci, cliente, email'"
     [active_filters_menu]="true"
     [title]="'Ordenes'"
     [url]="url"
     (products)="getData($event)"
     (isLoading)="isLoading = $event"
   >
     <ng-container menuBar>
       <mat-chip-list class="mx-1">
         <mat-chip>
           <mat-select
             [(ngModel)]="workspaceSelect"
             (selectionChange)="changeWorkspaces($event)"
             placeholder="Espacio de trabajo"
           >
             <mat-option
               *ngFor="let workspace of workspaces"
               [value]="workspace.id"
             >
               {{ workspace.name }}
             </mat-option>
           </mat-select>
         </mat-chip>
         <mat-chip
           *ngxPermissionsOnly="permissions.create"
           [routerLink]="['./create']"
           class="ml-1 mat-btn-add"
         >
           <mat-icon>add</mat-icon>
           Nueva
         </mat-chip>
       </mat-chip-list>
     </ng-container>
     <ng-container filterMenu>
       <div
         mat-menu-item
         [disableRipple]="true"
         (click)="$event.stopPropagation()"
         (keydown)="$event.stopPropagation()"
       >
         <mat-form-field class="w-100">
           <mat-label>Estados</mat-label>
           <mat-select [(ngModel)]="filters.status">
             <mat-option value="">Todos los estados</mat-option>
             <mat-option *ngFor="let status of statuses" [value]="status">
               {{ status | translatefz: "orders" }}
             </mat-option>
           </mat-select>
         </mat-form-field>
       </div>
       <div
         mat-menu-item
         [disableRipple]="true"
         (click)="$event.stopPropagation()"
         (keydown)="$event.stopPropagation()"
       >
         <mat-form-field class="w-100">
           <mat-label>Tipos</mat-label>
           <mat-select [(ngModel)]="filters.type">
             <mat-option value="">Todos los tipos</mat-option>
             <mat-option *ngFor="let type of types" [value]="type"
               >{{ type | translatefz: "orders" }}</mat-option
             >
           </mat-select>
         </mat-form-field>
       </div>
       <div
         mat-menu-item
         style="text-overflow: initial"
         [disableRipple]="true"
         (click)="$event.stopPropagation()"
         (keydown)="$event.stopPropagation()"
       >
         <mat-form-field class="w-50">
           <input
             readonly
             style="font-size: 11px"
             #filterOrderMin
             [(ngModel)]="filters.min"
             matInput
             placeholder="Fecha inicial"
           />
         </mat-form-field>
         <mat-form-field class="w-50">
           <input
             readonly
             style="font-size: 11px"
             #filterOrderMax
             [(ngModel)]="filters.max"
             matInput
             placeholder="Fecha final"
           />
         </mat-form-field>
       </div>

       <div
         mat-menu-item
         [disableRipple]="true"
         (click)="$event.stopPropagation()"
         (keydown)="$event.stopPropagation()"
       >
         <mat-form-field class="w-100">
           <mat-label>Transferencias</mat-label>
           <mat-select [(ngModel)]="filters.hasMbaTransfers">
             <mat-option value="">Todos</mat-option>
             <mat-option value="1">Con transferencias</mat-option>
             <mat-option value="0">Sin transferencias</mat-option>
           </mat-select>
         </mat-form-field>
       </div>

       <div
         mat-menu-item
         [disableRipple]="true"
         (click)="$event.stopPropagation()"
         (keydown)="$event.stopPropagation()"
       >
         <mat-form-field class="w-100">
           <mat-label>Anticipos</mat-label>
           <mat-select [(ngModel)]="filters.hasMbaPayments">
             <mat-option value="">Todos</mat-option>
             <mat-option value="1">Con anticipos</mat-option>
             <mat-option value="0">Sin anticipos</mat-option>
           </mat-select>
         </mat-form-field>
       </div>

       <div
         mat-menu-item
         [disableRipple]="true"
         (click)="$event.stopPropagation()"
         (keydown)="$event.stopPropagation()"
       >
         <mat-form-field class="w-100">
           <mat-label>Facturas</mat-label>
           <mat-select [(ngModel)]="filters.hasMbaInvoices">
             <mat-option value="">Todos</mat-option>
             <mat-option value="1">Con facturas</mat-option>
             <mat-option value="0">Sin facturas</mat-option>
           </mat-select>
         </mat-form-field>
       </div>

       <div
         mat-menu-item
         [disableRipple]="true"
         (click)="$event.stopPropagation()"
         (keydown)="$event.stopPropagation()"
       >
         <mat-form-field class="w-100">
           <mat-label>Retenciones confirmadas</mat-label>
           <mat-select [(ngModel)]="filters.hasConfirmedRetention">
             <mat-option value="">Todos</mat-option>
             <mat-option value="1">Con retenciones</mat-option>
             <mat-option value="0">Sin retenciones</mat-option>
           </mat-select>
         </mat-form-field>
       </div>
       <div
         mat-menu-item
         [disableRipple]="true"
         (click)="$event.stopPropagation()"
         (keydown)="$event.stopPropagation()"
       >
         <mat-form-field class="w-100">
           <input
             matInput
             [(ngModel)]="filters.paymentDocCode"
             placeholder="Código de documento"
             value="value"
           />
         </mat-form-field>
       </div>
     </ng-container>
   </ngx-search-bar>
   ```

   2. In your component.

   ```typescript
   filters = {
   status: '',
   min: null,
   max: null,
   type: '',
   orderBy: null,
   orderByColumn: null,
   hasMbaTransfers: null,
   hasMbaPayments: null,
   hasMbaInvoices: null,
   hasConfirmedRetention: null,
   paymentDocCode: null,
   // workspace_id: null
   };
   getData($event): void {
    /*The data of server*/
   }
   ```

# It supports following inputs:

| Input                   | Type    | Default | Description                                                              |
| ----------------------- | ------- | ------- | ------------------------------------------------------------------------ |
| `[filters]`             | object  | null    | Object with data that will be sent as query params in the search request |
| `[active_filters_menu]` | boolean | false   | Fade in or out filter button                                             |
| `[title]`               | string  | 'Page'  | Page title                                                               |
| `[url]`                 | string  | null    | path after server path                                                   |

# It supports following outputs:

| outputs       | Type    | Description                     |
| ------------- | ------- | ------------------------------- |
| `(data)`      | object  | server response data            |
| `(isLoading)` | boolean | event when data is being loaded |

# It supports following seletors:

| outputs      | Description                          |
| ------------ | ------------------------------------ |
| `filterMenu` | Filter template projection           |
| `menuBar`    | Template projection for more buttons |

by Fernando Zhunio
