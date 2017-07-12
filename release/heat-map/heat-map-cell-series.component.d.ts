import { SimpleChanges, EventEmitter, OnChanges, OnInit, TemplateRef } from '@angular/core';
export declare class HeatCellSeriesComponent implements OnChanges, OnInit {
    data: any;
    colors: any;
    xScale: any;
    yScale: any;
    showText: boolean;
    gradient: boolean;
    tooltipDisabled: boolean;
    tooltipText: any;
    tooltipTemplate: TemplateRef<any>;
    select: EventEmitter<{}>;
    cells: any[];
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCells(): any[];
    getTooltipText({label, data, series}: {
        label: any;
        data: any;
        series: any;
    }): string;
    trackBy(index: any, item: any): string;
    onClick(value: any, label: any, series: any): void;
}
