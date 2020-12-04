import { directive, nothing } from "lit-html";

// support to RxJs, most.js and xstream
export const subscribeDirective = directive((observable) => (part) => {
  observable.subscribe({
    next: value => (part.setValue(value), part.commit())
  });
});

export const toSubjectDirective = directive((subject) => (part) => {
  part.setValue(ev => subject.next(ev));
});

//https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader
export const read = directive((stream) => (part) => {
  part.setValue(nothing);
  const reader = stream.getReader();
  reader.read().then(function watch({done, value}) {
    if(done) {
      return;
    }
    part.setValue(value);
    part.commit();
    reader.read().then(watch);
  });
});