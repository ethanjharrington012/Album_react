import 'styled-components';
import { Theme } from '@mui/material/styles';

declare module 'style-components' {
    export interface DefaultTheme extends Theme {}
}

