import 'styled-components'
import { defaultTheme } from '../styles/theme/default'
import type { CSSProp } from 'styled-components'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    css?: CSSProp
  }
}
