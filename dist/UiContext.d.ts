import * as React from 'react';
import { q as JsonFormUi, n as JsonFormComponents } from './types-9dff5d46.js';
import '@undermuz/use-form';

declare const UiContext: React.Context<JsonFormUi | null>;
declare const useJsonFormUi: () => JsonFormUi;
declare const useJsonFormComponents: () => JsonFormComponents;

export { UiContext as default, useJsonFormComponents, useJsonFormUi };
