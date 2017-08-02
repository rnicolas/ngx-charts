import { EventEmitter, SimpleChanges, ElementRef, OnChanges, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
export declare class HeatMapCellComponent implements OnChanges, OnInit {
    private location;
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    data: any;
    magnitude: any;
    label: any;
    gradient: boolean;
    showValue: boolean;
    select: EventEmitter<{}>;
    element: HTMLElement;
    transform: string;
    activeRange: any[];
    startOpacity: number;
    gradientId: string;
    gradientUrl: string;
    gradientStops: any[];
    textPositionY: number;
    textPositionX: number;
    constructor(element: ElementRef, location: LocationStrategy);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getGradientStops(): {
        offset: number;
        color: any;
        opacity: number;
    }[];
    loadAnimation(): void;
    animateToCurrentForm(): void;
    onClick(): void;
}
