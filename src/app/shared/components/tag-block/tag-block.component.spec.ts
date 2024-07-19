import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagBlockComponent } from './tag-block.component';

describe('TagBlockComponent', () => {
  let component: TagBlockComponent;
  let fixture: ComponentFixture<TagBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
