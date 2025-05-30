import { createRenderEffect } from "solid-js";


export function model(el : HTMLInputElement, value: () => any) {
  const [field, setField] = value();
  createRenderEffect(() => (el.value = field()));
  el.addEventListener("input", (e: Event) => setField((e.target as HTMLInputElement).value));
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any];
    }
  }
}
