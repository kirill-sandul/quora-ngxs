import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsBlockComponent } from './qs-block.component';

describe('QsBlockComponent', () => {
  let component: QsBlockComponent;
  let fixture: ComponentFixture<QsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
