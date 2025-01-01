import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string,
    boxColor: string,
    textColor: string,
    accentColor: string,
  }
}