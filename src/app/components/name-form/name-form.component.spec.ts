import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NameFormComponent } from './name-form.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddressFormComponent', () => {
  let component: NameFormComponent;
  let fixture: ComponentFixture<NameFormComponent>;
  let submitFormSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NameFormComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NameFormComponent);
    component = fixture.componentInstance;
    submitFormSpy = spyOn(component.submitForm, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error messages for invalid postal code and house number', fakeAsync(() => {
    component.nameForm.controls['name'].setValue('');
    fixture.detectChanges();

    tick(); // Simulate the passage of time until all pending asynchronous activities finish

    const nameInput: DebugElement = fixture.debugElement.query(By.css('#name'));

    const submitButton: DebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    // Ensure that the elements are found before accessing their properties
    expect(nameInput).toBeTruthy();

    submitButton.nativeElement.click();

    fixture.detectChanges();

    const nameError: DebugElement = fixture.debugElement.query(
      By.css('#name-error')
    );

    expect(nameError.nativeElement.textContent).toContain('Name is required');
  }));

  it('should emit submitForm event when form is submitted with valid values', fakeAsync(() => {
    component.nameForm.controls['name'].setValue('de Vries');
    fixture.detectChanges();

    const submitButton: DebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    submitButton.nativeElement.click();
    tick(); // Simulate the passage of time until all pending asynchronous activities finish

    fixture.detectChanges();

    expect(submitFormSpy).toHaveBeenCalledWith({
      surname: 'de Vries',
    });
  }));
});
