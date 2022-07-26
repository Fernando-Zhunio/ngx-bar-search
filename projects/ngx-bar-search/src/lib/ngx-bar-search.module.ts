import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxBarSearchComponent } from './ngx-bar-search.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxBarSearchService } from './ngx-bar-search.service';
export class AppConfig {
  serverUrl?: string;
}

@NgModule({
  declarations: [
    NgxBarSearchComponent
  ],
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
  ],
  exports: [
    NgxBarSearchComponent
  ]
})
export class NgxBarSearchModule {
  static forRoot(conf?: AppConfig): ModuleWithProviders<NgxBarSearchModule> {
    return {
      ngModule: NgxBarSearchModule,
      providers: [NgxBarSearchService, { provide: AppConfig, useValue: conf }]
    }
  }
}
