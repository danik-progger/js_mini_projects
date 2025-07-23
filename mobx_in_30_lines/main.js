const readObservables = new Set()
export const observable = (value) => ({
    value,
    observers: new Set(), // callbacks
    subscribe(observer) {
        this.observers.add(observer);
    },
    unsubscribe(observer) {
        this.observers.delete(observer);
    },
    get() {
        readObservables.add(this);
        return this.value;
    },
    set(value) {
        this.value = value;
        this.observers.forEach((notify) => notify());
    },
});

export const autorun = (fn) => {
  readObservables.clear()
  fn()
  readObservables.forEach((observable) => observable.subscribe(fn))

  return () => readObservables.forEach((observable) => observable.unsubscribe(fn))
}
