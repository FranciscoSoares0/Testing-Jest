import { Directive, ElementRef, inject, input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightDirective]'
})
export class HighlightDirectiveDirective implements OnChanges{

  public highlightColor = input('');

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnChanges(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.highlightColor()
    )
  }

}
