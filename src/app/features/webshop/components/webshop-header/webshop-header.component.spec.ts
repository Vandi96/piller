import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshopHeaderComponent } from './webshop-header.component';

describe('WebshopHeaderComponent', () => {
  let component: WebshopHeaderComponent;
  let fixture: ComponentFixture<WebshopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebshopHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebshopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
