import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ElementRef,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { select } from 'd3-selection';

import { id } from '../utils/id';

@Component({
  selector: 'g[ngx-charts-heat-map-cell]',
  template: `
    <svg:g [attr.transform]="transform" class="cell">
      <defs *ngIf="gradient">
        <svg:g ngx-charts-svg-linear-gradient
          orientation="vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        rx="3"
        [attr.width]="width"
        [attr.height]="height"
        class="cell"
        style="cursor: pointer"
        (click)="onClick()"
      />
	  <svg:text *ngIf="showValue"
		  text-anchor="middle"
		  [attr.x]="textPositionX"
		  [attr.y]="textPositionY"
		  [attr.width]="width"
		  [attr.height]="height"
		  >
	  {{data}} {{magnitude}}
	  </svg:text>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatMapCellComponent implements OnChanges, OnInit {

  @Input() fill;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() data;
  @Input() magnitude;
  @Input() label;
  @Input() gradient: boolean = false;
  @Input() showValue: boolean = false;

  @Output() select = new EventEmitter();

  element: HTMLElement;
  transform: string;
  activeRange: any[];
  startOpacity: number;
  gradientId: string;
  gradientUrl: string;
  gradientStops: any[];
  textPositionY: number;
  textPositionX: number;

  constructor(element: ElementRef, private location: LocationStrategy) {
    this.element = element.nativeElement;
  }

  ngOnInit(): void {
	  if (this.showValue) {
		  this.textPositionY = this.height/2;
		  this.textPositionX = this.width/2;
	  }
  }

  ngOnChanges(changes: SimpleChanges): void {
	  if (this.showValue) {
		  this.textPositionY = this.height/2;
		  this.textPositionX = this.width/2;
	  }

    this.transform = `translate(${this.x} , ${this.y})`;

    const pageUrl = this.location instanceof PathLocationStrategy
      ? this.location.path()
      : '';

    this.startOpacity = 0.3;
    this.gradientId = 'grad' + id().toString();
    this.gradientUrl = `url(${pageUrl}#${this.gradientId})`;
    this.gradientStops = this.getGradientStops();

    this.loadAnimation();
  }

  getGradientStops() {
    return [
      {
        offset: 0,
        color: this.fill,
        opacity: this.startOpacity
      },
      {
        offset: 100,
        color: this.fill,
        opacity: 1
    }];
  }

  loadAnimation(): void {
    const node = select(this.element).select('.cell');
    node.attr('opacity', 0);
    this.animateToCurrentForm();
  }

  animateToCurrentForm(): void {
    const node = select(this.element).select('.cell');

    node.transition().duration(750)
      .attr('opacity', 1);
  }

  onClick() {
    this.select.emit(this.data);
  }

}
