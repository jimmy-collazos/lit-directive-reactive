![](./header.webp)
<sup>_Social Media Photo by [Ryan Stone](https://unsplash.com/@rstone_design) on [Unsplash](https://unsplash.com/photos/OlxJVn9fxz4)_</sup>

# :twisted_rightwards_arrows: Directiva `lit-html` para la programación rectiva

<p align="center">
  <img alt="Formato de exportación: ESM" src="https://img.shields.io/badge/fomat-esm-yellowgreen" />
  <img alt="Distribución: Npm, Unpackage" src="https://img.shields.io/badge/%F0%9F%93%A6-npm%20unpk-yellowgreen" />
  <img alt="Licencia: GPL 3.0" src="https://img.shields.io/badge/GPL 3.0-license-yellowgreen" />
</p>

This [lit-html directive](https://lit-html.polymer-project.org/api/modules/_lit_html_.html#directive) is for use some parts of your templates like an observable (Reactive programming).

Use with [RxJs](https://rxjs.dev/guide/overview), [most.js](https://github.com/cujojs/most) and [xstream](https://github.com/staltz/xstream) or wharever library with Observable and Subject implementation.

[See the demo with example](https://stackblitz.com/edit/lit-directive-reactive?file=index.js).

## Installation

Install from [NPM](https://www.npmjs.com/package/lit-directive-reactive) or use from [Unpkg](https://unpkg.com/lit-directive-reactive) CDN

**Npm**
```sh
npm install --save lit-directive-reactive
```

**Unpkg**
```javascript
import {subscribeDirective, toSubjectDirective} from 'https://unpkg.com/lit-directive-reactive?module'
```
## API

## # subscribe(observable)
> *Support for [AttributePart](https://lit-html.polymer-project.org/api/classes/_lit_html_.attributepart.html), [BooleanAttributePart](https://lit-html.polymer-project.org/api/classes/_lit_html_.booleanattributepart.html), [EventPart](https://lit-html.polymer-project.org/api/classes/_lit_html_.eventpart.html), [NodePart](https://lit-html.polymer-project.org/api/classes/_lit_html_.nodepart.html), [PropertyPart](https://lit-html.polymer-project.org/api/classes/_lit_html_.propertypart.html)*

Update template [Part](https://lit-html.polymer-project.org/api/interfaces/_lit_html_.part.html) value with received value on Observable (next method)

### _Parameters_
* **observable**: Observable object to subscribe

### _Return value_

return template [Part](https://lit-html.polymer-project.org/api/interfaces/_lit_html_.part.html) of [lit-html](https://lit-html.polymer-project.org/)

### _Example_
```javascript
import {render, html} from 'lit-html'
import {subscribeDirective} from 'lit-directive-reactive';
import { Observable } from 'rxjs';

const counterObservable = new Observable(subscriber => {
  let count = 0;
  subscriber.next(count);
  setTimeout(() => {
    subscriber.next(++count);
  }, 1000);
});

render(html`
      <span> ${subscribeDirective(counterObservable)} </span>
      <input value="${subscribeDirective(counterObservable)}" />
      `, window.container);

```

## # toSubject(subject)
> *Currently support for [EventPart](https://lit-html.polymer-project.org/api/classes/_lit_html_.eventpart.html)*

Emit event value to [Subject](http://reactivex.io/documentation/subject.html)

### _Parameters_
* **subject**: [Subject](http://reactivex.io/documentation/subject.html) to emit event value

### _Return value_

return template [Part](https://lit-html.polymer-project.org/api/interfaces/_lit_html_.part.html) of [lit-html](https://lit-html.polymer-project.org/)

### _Example_
```javascript
import {render, html} from 'lit-html'
import {toSubjectDirective} from 'lit-directive-reactive';
import { Subject } from 'rxjs';

const subject = new Subject();

subject.subscribe(ev => console.log(ev));

render(html`
      <button @click=${toSubject(subject)}> +1 </button>
      `, window.container);
```