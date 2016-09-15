### angular-vumeter - [AngularJS](http://angularjs.org/) directive representing a VU meter
[![npm version](https://badge.fury.io/js/angular-vumeter.svg)](https://badge.fury.io/js/angular-vumeter)
[![Bower version](https://badge.fury.io/bo/angular-vumeter.svg)](https://badge.fury.io/bo/angular-vumeter)
[![Build Status](https://travis-ci.org/matteovinci/angular-vumeter.svg?branch=master)](https://travis-ci.org/matteovinci/angular-vumeter)

![VU meter demo preview](https://matteovinci.github.io/angular-vumeter/demo/assets/vu-meter-demo-preview.png)

### Quick links
- [Demo](#demo)
- [Getting started](#installation)
    - [NPM](#install-with-npm)
    - [Bower](#install-with-bower)
    - [Adding dependency to your project](#adding-dependency-to-your-project)
    - [VU meter using the microphone input](#vu-meter-using-the-microphone-input)
    - [VU meter using an audio source](#vu-meter-using-an-audio-source)
    - [Custom templates](#custom-templates)
- [Support](#support)
    - [Documentation](#documentation)
    - [Supported browsers](#supported-browsers)
    - [Found a bug?](#found-a-bug)


# Demo

Do you want to see directives in action? Check out the [demo page](https://matteovinci.github.io/angular-vumeter/demo/app/)!

# Getting started

## Install with NPM

```sh
$ npm install angular-vumeter
```

This will install angular-vumeter NPM package.

## Install with Bower

```sh
$ bower install angular-vumeter
```

## Adding dependency to your project

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `angular-vumeter` module:

```js
angular.module('myModule', ['angular-vumeter']);
```

## Including js and css

```js
<script src="../node_modules/angular-vumeter/dist/angular-vumeter.min.js"></script>
<link href="../node_modules/angular-vumeter/dist/angular-vumeter.min.css" rel="stylesheet" type="text/css">
```

## VU meter using the microphone input

By default the vumeter will be active as soon as the page is loaded and it will use microphone as default input.
You can activate/deactivate VU meter defining the `isActive` attribute:
```js
<vu-meter is-active="isActive"></vu-meter>
```

## VU meter using an audio source

```js
<vu-meter is-active="isActive" source-id="mySong"></vu-meter>
<audio id="mySong" controls="true">
    <source src="./assets/kevin_MacLeod-Slow_Burn.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
```

## Custom templates

By default the directive will show an svg template. This is inspired to the old analogic VU meter by TEAC corporation.
You can download the original illustrator file of the svg template and customize it (<a href="https://matteovinci.github.io/angular-vumeter/demo/assets/vumeter.ai">vumeter.ai</a>)

Using `vuMeterConfig` provider you can register a new template with you own logic:

```js
vuMeterConfig.registerTemplate('myCustomTemplate', {
    path: 'path/to/html/or/svg/template',
    /**
    * Optional: This method is run only once. Function to find
    * elements before execution of the onDraw function.
    * It can be useful to find elements of the template that
    * need to be accessed multiple times during onDraw
    */
    getTemplateElements: function($element) {
        return [];
    },
    /**
    * Required: This method is run every 1024 audio samples.
    * Any manipolation of DOM to show audio visualization should be included here
    */
    onDraw: function($element, volume, templateElements) {}
}
```

This is the implementation for the default template:
```js
{
    path: 'angular-vumeter/template/angular-vumeter.svg',
    getTemplateElements: function($element) {
        // let's find motion elements in svg knowing their types and ids
        function findElementInSVG(type, id) {
            var elements = $element.find(type);
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                if (el.id === id) {
                    return el;
                }
            }
        }
        // trigger is a g element
        var trigger = findElementInSVG('g', 'trigger');
        // peak is a ellipse element
        var peak = findElementInSVG('ellipse', 'peak');
        return [angular.element(trigger), angular.element(peak)];
    },
    onDraw: function($element, volume, templateElements) {
        // this is relative to the original system of coordinates of the template
        var rotationPivot = {
            x: 292,
            y: 331
        };

        // Let's get template elements calculated only once (not on every onDraw iteration)
        var trigger = templateElements[0];
        var led = templateElements[1];

        var minAngle = 65, maxAngle = 100;
        // Transform volume in a visual data
        var deg = Math.min((minAngle * volume) / 100, maxAngle);
        // Trigger rotation
        trigger.attr('transform', 'rotate(' + deg + ' ' + rotationPivot.x + ' ' + rotationPivot.y + ')');
        // Led blinking
        led.attr('fill', volume > 100 ? '#ea2b2c' : '#992B2C');
    }
}
```

You can create simpler or more complex audio visualization using html or svg templates

# Support

## Documentation
Check out angular-vumeter documentation [here](https://matteovinci.github.io/angular-vumeter/docs/build/)

## Supported browsers

Directives from this repository are automatically tested with the following browsers:
* Chrome
* Firefox
* Edge
* Opera

angular-vumeter uses getUserMediaStream API (check its global support [here](http://caniuse.com/#feat=stream))

Modern mobile browsers should work without problems.

## Found a bug?
Please submit your issue [here](https://github.com/matteovinci/angular-vumeter/issues/new).


----
