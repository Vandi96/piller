import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductApiService } from '../../../../core/services/product-api.service';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, Observable, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductResponse } from '../../../../core/interface/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { ProductOrder } from '../../interface/product-order.type';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorSource } from '../../interface/paginator-source.type';
import { MatIcon } from '@angular/material/icon';
import { ViewType, viewType } from '../../interface/view.type';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent, ReactiveFormsModule, MatMenuModule, MatButtonModule, MatPaginatorModule, MatIcon],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private _api = inject(ProductApiService);
  public dataSource$: Observable<ProductResponse> | undefined;
  public viewMode = viewType;

  public searchControl = new FormControl<string>('');
  public order = signal<ProductOrder>({ id: '0', label: 'Title Ascending', sortBy: 'title', order: 'asc' });
  public order$ = toObservable(this.order);
  public sortData: ProductOrder[] = [
    { id: '0', label: 'Title Ascending', sortBy: 'title', order: 'asc' },
    { id: '1', label: 'Title Descending', sortBy: 'title', order: 'desc' },
    { id: '2', label: 'Price lowest first', sortBy: 'price', order: 'asc' },
    { id: '3', label: 'Price highest first', sortBy: 'price', order: 'desc' }
  ];
  public paginatorSource = signal<PaginatorSource>({ limit: 25, skip: 0 });
  public paginatorSource$ = toObservable(this.paginatorSource);
  public gridMode = signal<boolean>(true);

  public ngOnInit(): void {
    this.dataSource$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(250),
        distinctUntilChanged(),
        map((query) => query!.trim()),
        filter(query => query.length >= 3 || query.length === 0)
      ),
      this.order$,
      this.paginatorSource$
    ]).pipe(
      switchMap(([searchValue, order, pagination]) => {
        return this._api.getProducts$(searchValue, pagination.limit, pagination.skip, order.sortBy, order.order);
      })
    )
  }

  public sortList(data: ProductOrder): void {
    this.order.set(data);
  }

  public pagination(data: PageEvent): void {
    this.paginatorSource.set({total: data.length, limit: data.pageSize, skip: data.pageIndex * data.pageSize});
  }

  public setView(viewType: ViewType): void {
    this.gridMode.set(viewType === this.viewMode.GRID);
  }
}
