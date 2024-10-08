import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenationComponent } from './pagenation.component';

describe('PagenationComponent', () => {
  let component: PagenationComponent;
  let fixture: ComponentFixture<PagenationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagenationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagenationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
