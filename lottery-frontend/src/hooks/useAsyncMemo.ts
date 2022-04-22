import { DependencyList, useEffect, useState } from "react";

type PromiseFunction = (...args: any[]) => Promise<any>;
type PromiseReturn<T extends PromiseFunction> = T extends (
  ...args: any[]
) => Promise<infer U>
  ? U
  : any;

function useAsyncMemo<T extends PromiseFunction, V>(
  fn: T,
  initialValue: V,
  deps?: DependencyList
) {
  const [value, setValue] = useState<V | PromiseReturn<T>>(initialValue);
  useEffect(() => {
    fn().then(setValue);
  }, deps);
  return value;
}

export default useAsyncMemo;
