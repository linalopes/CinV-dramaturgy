/// <reference types="vite/client" />

declare module 'vite-plugin-raw' {
  export function raw(options?: { include?: string[] }): any;
}
