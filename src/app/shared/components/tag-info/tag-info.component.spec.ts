import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QInfoComponent } from './tag-info.component';

describe('QInfoComponent', () => {
  let component: QInfoComponent;
  let fixture: ComponentFixture<QInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
