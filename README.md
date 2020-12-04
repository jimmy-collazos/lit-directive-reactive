![](./header.png)
<sup>_Social Media Photo by [Ryan Stone](https://unsplash.com/@rstone_design) on [Unsplash](https://unsplash.com/photos/OlxJVn9fxz4)_</sup>

# :twisted_rightwards_arrows: Directiva `lit-html` para la programación rectiva

<p align="center">
  <img alt="Formato de exportación: ESM" src="https://img.shields.io/badge/fomat-esm-yellowgreen" />
  <img alt="Distribución: Npm, Unpackage" src="https://img.shields.io/badge/%F0%9F%93%A6-npm%20unpk-yellowgreen" />
  <img alt="Licencia: GPL 3.0" src="https://img.shields.io/badge/GPL 3.0-license-yellowgreen" />
</p>

Esta directiva([lit-html directive](https://lit-html.polymer-project.org/api/modules/_lit_html_.html#directive)) permite enlazar objetos de la programación reactiva (Observable, Subject) en partes del rendirzado de [lit-html](https://lit-html.polymer-project.org/)

Se puede utilizar junto a librerías como [RxJs](https://rxjs.dev/guide/overview), [most.js](https://github.com/cujojs/most) y [xstream](https://github.com/staltz/xstream). En general con cualquier librería que implemente Observable y Subject

[Ver demo con ejemplos de uso](https://stackblitz.com/edit/lit-directive-reactive?file=index.js).

## Uso / Instalación

Esta herramienta se exporta en los formatos [ESM](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/M%C3%B3dulos). Puedes descargarlo o instalarlo a través de [NPM](https://www.npmjs.com/) o desde [Unpkg](https://unpkg.com/).

**Npm**
```sh
npm install --save lit-directive-reactive
```

**Unpkg**
```javascript
import {subscribeDirective, toSubjectDirective} from 'https://unpkg.com/lit-directive-reactive?module'
```

## # subscribe(observable)
> *Soporte para [AttributePart](https://lit-html.polymer-project.org/api/classes/_lit_html_.attributepart.html), [BooleanAttributePart](https://lit-html.polymer-project.org/api/classes/_lit_html_.booleanattributepart.html), [EventPart](https://lit-html.polymer-project.org/api/classes/_lit_html_.eventpart.html), [NodePart](https://lit-html.polymer-project.org/api/classes/_lit_html_.nodepart.html), [PropertyPart](https://lit-html.polymer-project.org/api/classes/_lit_html_.propertypart.html)*

Asigna el valor recibido, en el observable, a la parte ([Part](https://lit-html.polymer-project.org/api/interfaces/_lit_html_.part.html)) definida. 

### _Parámentros_
* **observable**: Valor observable

### _Valor Devuelto_

Devuelve un [Part](https://lit-html.polymer-project.org/api/interfaces/_lit_html_.part.html) de [lit-html](https://lit-html.polymer-project.org/)

### _Ejemplo_
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
> *Actualmente sólo da soporte para [EventPart](https://lit-html.polymer-project.org/api/classes/_lit_html_.eventpart.html)*

Se suscribe al evento y emite en el [Subject](http://reactivex.io/documentation/subject.html) definido.

### _Parámentros_
* **subject**: [Subject](http://reactivex.io/documentation/subject.html) to emit event value

### _Valor Devuelto_

Devuelve un [Part](https://lit-html.polymer-project.org/api/interfaces/_lit_html_.part.html) de [lit-html](https://lit-html.polymer-project.org/)

### _Ejemplo_
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