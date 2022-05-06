export type VoidFunc = () => void;
export type BasicConsumer<T> = (consume: T) => void;
export type BiConsumer<T1, T2> = (consume1: T1, consume2: T2) => void;
export type BasicSupplier<T> = () => T;
export type BasicMutator<T> = (oldValue: T) => T;
export type BasicMapper<O, R> = (value: O) => R;
