import { Component } from '@angular/core';
import { HighlightDirectiveDirective } from './highlight-directive.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<span appHighlightDirective [highlightColor]="colorName"> Text </span>`,
  standalone: true,
  imports: [HighlightDirectiveDirective]
})
class TestHostComponent{
  colorName= 'red';
}

describe('HighlightDirectiveDirective', () => {

  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance of Host Component', () => {
    expect(component).toBeTruthy();
  });

  it('should change background color based on directive param', () => {

    const expectedColor = 'red';
    component.colorName = expectedColor;

    fixture.detectChanges();

    const elementDirective = fixture.debugElement.query(By.css('span')).nativeElement as HTMLElement;
    expect(elementDirective.style.backgroundColor).toBe(expectedColor);
  });
  
});
