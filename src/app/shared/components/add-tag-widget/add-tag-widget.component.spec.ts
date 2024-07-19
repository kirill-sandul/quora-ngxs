import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagWidgetComponent } from './add-tag-widget.component';

describe('AddTagWidgetComponent', () => {
  let component: AddTagWidgetComponent;
  let fixture: ComponentFixture<AddTagWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTagWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTagWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
