import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductApiService } from '../../../../core/services/product-api.service';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, Observable, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product, ProductResponse } from '../../../../core/interface/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private _api = inject(ProductApiService);
  public dataSource$: Observable<Product[]> | undefined;
  public displayedColumns: string[] = ['product'];

  public searchControl = new FormControl<string>('');
  public order = signal<'asc' | 'desc'>('asc');
  public order$ = toObservable(this.order);


  public ngOnInit(): void {
    this.dataSource$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(250),
        distinctUntilChanged(),
        map((query) => query!.trim()),
        filter(query => query.length >= 3 || query.length === 0)
      ),
      this.order$
    ]).pipe(
      switchMap(([searchValue, order]) => {
        return this._api.getProducts$(searchValue).pipe(
          map((res: ProductResponse) => res.products)
        );
      })
    )
  }
}
