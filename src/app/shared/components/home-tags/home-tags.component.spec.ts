import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTagsComponent } from './home-tags.component';

describe('HomeTagsComponent', () => {
  let component: HomeTagsComponent;
  let fixture: ComponentFixture<HomeTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
