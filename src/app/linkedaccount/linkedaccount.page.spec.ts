import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkedaccountPage } from './linkedaccount.page';

describe('LinkedaccountPage', () => {
  let component: LinkedaccountPage;
  let fixture: ComponentFixture<LinkedaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
