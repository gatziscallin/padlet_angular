import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrieListComponent } from './entrie-list.component';

describe('EntrieListComponent', () => {
  let component: EntrieListComponent;
  let fixture: ComponentFixture<EntrieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrieListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
