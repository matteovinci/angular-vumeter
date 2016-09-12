(function(window, angular, undefined) {
    'use strict';
    describe('angular-vumeter', function() {
        var $scope;

        beforeEach(module('angular-vumeter'));
        beforeEach(module('angular-vumeter.templates'));

        beforeEach(inject(function($rootScope) {
            $scope = $rootScope;
        }));

        describe('controller', function() {
            var ctrl, $element, $attrs;
            beforeEach(inject(function($controller) {
                $attrs = {};
                ctrl = $controller('VuMeterCtrl', {$scope: $scope, $attrs: $attrs});
            }));
        });

        describe('angular-vumeter', function() {
            var scope, $compile, $templateCache, element;

            beforeEach(inject(function($rootScope, _$compile_, _$templateCache_) {
                scope = $rootScope;
                $compile = _$compile_;
                $templateCache = _$templateCache_;
            }));

            it('should be a vu-meter element', function() {
                element = $compile('<vu-meter></vu-meter>')(scope);
                scope.$digest();
                var html = element.html();
                expect(html).toContain('class="vu-view"');
                expect(html).toContain('class="vu-case"');
            });

            describe('angular-vumeter-vuMeterConfig', function() {
                var vumeterConfigProvider, template;
                beforeEach(inject(function(_vumeterConfig_) {
                    vumeterConfigProvider = _vumeterConfig_;
                    template = vumeterConfigProvider._getTemplate('default');
                }));

                it('template should be defined', function() {
                    expect(template).toBeDefined();
                });

                it('template should have a path', function() {
                    expect(template.path).toBeDefined();
                    expect(template.path).not.toEqual('');
                });

                it('template should have a onDraw callback', function() {
                    expect(template.onDraw).toBeDefined();
                    expect(template.onDraw).toEqual(jasmine.any(Function));
                });

            });
        });
    });
})(window, window.angular);
