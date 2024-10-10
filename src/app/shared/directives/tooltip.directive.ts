import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { createPopper, Instance, Placement } from '@popperjs/core';

@Directive({
  selector: '[ttTooltip]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('ttTooltip') tooltipContent: string;
  @Input() placement: Placement = 'bottom';

  private tooltipElement: HTMLElement;
  private popperInstance: Instance | null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.createTooltip();
    this.renderer.listen(this.el.nativeElement, 'mouseenter', () =>
      this.showTooltip(),
    );
    this.renderer.listen(this.el.nativeElement, 'mouseleave', () =>
      this.hideTooltip(),
    );
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }

  private createTooltip(): void {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipContent),
    );
    this.renderer.appendChild(document.body, this.tooltipElement);
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }

  private showTooltip(): void {
    this.renderer.setStyle(this.tooltipElement, 'display', 'block');
    this.popperInstance = createPopper(
      this.el.nativeElement,
      this.tooltipElement,
      {
        placement: this.placement,
      },
    );
  }

  private hideTooltip(): void {
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  private destroyTooltip(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
    }
  }
}
