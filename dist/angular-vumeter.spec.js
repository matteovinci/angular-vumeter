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
            var scope, $compile, $templateCache, directiveEl;

            beforeEach(inject(function($rootScope, _$compile_, _$templateCache_) {
                scope = $rootScope;
                $compile = _$compile_;
                $templateCache = _$templateCache_;
            }));

            it('should be a vu-meter directiveEl', function() {
                directiveEl = $compile('<vu-meter></vu-meter>')(scope);
                scope.$digest();
                var html = directiveEl.html();
                expect(html).toContain('class="vu-view"');
                expect(html).toContain('class="vu-case"');
            });

            it('isActive on isolated scope should be two-way bound', function(){
                scope.isActive = true;
                directiveEl = $compile('<vu-meter is-active="isActive"></vu-meter>')(scope);
                scope.$digest();
                var isolatedScope = directiveEl.isolateScope();
                expect(isolatedScope.isActive).toEqual(true);
                scope.isActive = false;
                scope.$digest();
                expect(isolatedScope.isActive).toEqual(false);
            });

            it('templateId on isolated scope should be one-way bound', function(){
                scope.templateId = 'myTemplate';
                directiveEl = $compile('<vu-meter template-id="{{ templateId }}"></vu-meter>')(scope);
                scope.$digest();
                var isolatedScope = directiveEl.isolateScope();
                expect(isolatedScope.templateId).toEqual(scope.templateId);
                isolatedScope.templateId = 'anotherTemplate';
                scope.$digest();
                expect(scope.templateId).toEqual('myTemplate');
            });

            it('sourceId on isolated scope should be one-way bound', function(){
                scope.sourceId = 'mySong';
                directiveEl = $compile('<vu-meter source-id="{{ sourceId }}"></vu-meter>')(scope);
                scope.$digest();
                var isolatedScope = directiveEl.isolateScope();
                expect(isolatedScope.sourceId).toEqual(scope.sourceId);
                isolatedScope.sourceId = 'anotherSong';
                scope.$digest();
                expect(scope.sourceId).toEqual('mySong');
            });

            describe('angular-vumeter-vuMeterConfig', function() {
                var vumeterConfigProvider, template, templateObj, templateId;
                beforeEach(inject(function(_vumeterConfig_) {
                    vumeterConfigProvider = _vumeterConfig_;

                    templateObj = {
                        path: 'my/custom/path',
                        onUpdate: function($element, volume, templateElements) {
                            return templateElements;
                        }
                    };
                    templateId = 'customTemplate';
                    vumeterConfigProvider.registerTemplate(templateId, templateObj);
                    template = vumeterConfigProvider._getTemplate(templateId);
                }));

                it('templateObject should be defined', function() {
                    expect(template).toBeDefined();
                });

                it('templateObject should have a path', function() {
                    expect(template.path).toBeDefined();
                    expect(template.path).not.toEqual('');
                });

                it('templateObject should have a onUpdate callback', function() {
                    expect(template.onUpdate).toBeDefined();
                    expect(template.onUpdate).toEqual(jasmine.any(Function));
                });

                it('templateObject should not have getTemplateElements if not defined', function() {
                    expect(template.getTemplateElements).toBeUndefined();
                });

                it('templateObject should have getTemplateElements if defined', function() {
                    templateObj.getTemplateElements = function($element) {
                        return [1, 2, 3];
                    };
                    vumeterConfigProvider.registerTemplate(templateId, templateObj);
                    template = vumeterConfigProvider._getTemplate(templateId);

                    expect(template.getTemplateElements).toBeDefined();
                });

                it('setFFTSize should work correctly', function() {
                    vumeterConfigProvider.setFFTSize(1024);
                    expect(vumeterConfigProvider.fftSize).toEqual(1024);
                });

                it('showCredits should work correctly', function() {
                    vumeterConfigProvider.showCredits(false);
                    expect(vumeterConfigProvider.credits).toEqual(false);
                });

            });
        });
    });
})(window, window.angular);
