import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from 'src/environments/environment';

export class DataTable {
  limit = environment.paging;
  count = 0;
  offset = 0;
  orderBy = 'id';
  orderDir = -1;
  search = '';

  nextPage(event: LazyLoadEvent): void {
    this.offset = event.first == 0 ? 0 : event.first / event.rows;
    this.orderBy = event.sortField ? event.sortField : 'id';
    this.orderDir = event.sortOrder;
    this.limit = event.rows;
  }

  searchAction(search: string): void {
    this.offset = 0;
    this.count = 0;
    this.search = search;
  }

  getHttpParams(): HttpParams {
    return new HttpParams()
      .set('orderColumn', `${this.orderBy}`)
      .set('orderDir', `${this.orderDir}`)
      .set('pageNumber', `${this.offset}`)
      .set('pageSize', `${this.limit}`)
      .set('search', `${this.search}`);
  }
}

export class PropertiesDataTable extends DataTable {
  type = 0;
}

export class NotificationsDataTable extends DataTable {
  notificationType = -1;
  sendStatus = -1;
}

export class ContractsDataTable extends DataTable {
  status = -1;
  rentCurrency = -1;
  rentCycle = -1;
}

export class TransfersDataTable extends DataTable {
  days = 30;
}

export class PaidInvoicesDataTable extends DataTable {
  selectedBankId = 0;
  customerPayoutId = 0;
  bankInfo?: boolean = null;
}

export class AllInvoicesDataTable extends DataTable {
  status = 0;
}

export class TransferPayoutsDataTable extends DataTable {
  transferId = 0;
}

export class NotificationTemplatesDataTable extends DataTable {
  notificationType = -1;
}

export class TrainersDataTable extends DataTable {
  status = 0;
}

export class OrderDataTable extends DataTable {
  paymentStatus = 0;
}
export class CustomerSurveyDataTable extends DataTable {
  surveyId = 0;
}
export class AuditTrailsDataTable extends DataTable {
  createdBy = '';
}
