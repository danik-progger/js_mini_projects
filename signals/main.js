let ACTIVE_EFFECT = null

function createState(value) {
    return { value, subscribers: new Set() }
}

function effect(fn) {
    ACTIVE_EFFECT = fn
    fn()
}

function get(signal) {
    if (ACTIVE_EFFECT) {
        signal.subscribers.add(ACTIVE_EFFECT)
    }
    
    return signal.value
}

function set(signal, value) {
    signal.value = value
    signal.subscribers.forEach((effect) => effect())
}

function derived(fn) {
    const value = state(fn)
    effect(() => set(value, fn()))
    return value
}
