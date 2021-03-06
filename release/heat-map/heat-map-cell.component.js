import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { select } from 'd3-selection';
import { id } from '../utils/id';
var HeatMapCellComponent = (function () {
    function HeatMapCellComponent(element, location) {
        this.location = location;
        this.gradient = false;
        this.showValue = false;
        this.select = new EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnInit = function () {
        if (this.showValue) {
            this.textPositionY = this.height / 2;
            this.textPositionX = this.width / 2;
        }
    };
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        if (this.showValue) {
            this.textPositionY = this.height / 2;
            this.textPositionX = this.width / 2;
        }
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        var pageUrl = this.location instanceof PathLocationStrategy
            ? this.location.path()
            : '';
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
        this.loadAnimation();
    };
    HeatMapCellComponent.prototype.getGradientStops = function () {
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
            }
        ];
    };
    HeatMapCellComponent.prototype.loadAnimation = function () {
        var node = select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    HeatMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    return HeatMapCellComponent;
}());
export { HeatMapCellComponent };
HeatMapCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-heat-map-cell]',
                template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n\t  <svg:text *ngIf=\"showValue\"\n\t\t  text-anchor=\"middle\"\n\t\t  [attr.x]=\"textPositionX\"\n\t\t  [attr.y]=\"textPositionY\"\n\t\t  [attr.width]=\"width\"\n\t\t  [attr.height]=\"height\"\n\t\t  >\n\t  {{data}} {{magnitude}}\n\t  </svg:text>\n    </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
HeatMapCellComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: LocationStrategy, },
]; };
HeatMapCellComponent.propDecorators = {
    'fill': [{ type: Input },],
    'x': [{ type: Input },],
    'y': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'data': [{ type: Input },],
    'magnitude': [{ type: Input },],
    'label': [{ type: Input },],
    'gradient': [{ type: Input },],
    'showValue': [{ type: Input },],
    'select': [{ type: Output },],
};
//# sourceMappingURL=heat-map-cell.component.js.map