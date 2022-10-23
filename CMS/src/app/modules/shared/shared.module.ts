import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  ToasterModule,
  ToasterService,
} from 'angular2-toaster/angular2-toaster';
import { TableModule } from 'primeng/table';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { IconRefreshComponent } from './components/icon-refresh/icon-refresh.component';
import { IconSortComponent } from './components/icon-sort/icon-sort.component';
import { IconEditComponent } from './components/icon-edit/icon-edit.component';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { IconRemoveComponent } from './components/icon-remove/icon-remove.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    NotAuthorizedComponent,
    IconRefreshComponent,
    IconSortComponent,
    IconEditComponent,
    IconListComponent,
    SearchBoxComponent,
    IconRemoveComponent,
    ConfirmModalComponent,
  ],
  exports: [
    SpinnerComponent,
    IconRefreshComponent,
    IconSortComponent,
    IconEditComponent,
    IconListComponent,
    SearchBoxComponent,
    ToasterModule,
    TooltipModule,
    IconRemoveComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ToasterModule,
    TableModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [ToasterService, DatePipe, DecimalPipe],
})
export class SharedModule {}
