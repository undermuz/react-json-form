import * as React from 'react';
import { q as JsonFormUi, n as JsonFormComponents } from './types-f66b7c24.js';
import '@undermuz/use-form/build/types/useForm';
import '@undermuz/use-form/build/types/useForm/reducer';

declare const UiContext: React.Context<JsonFormUi | null>;
declare const useJsonFormUi: () => JsonFormUi;
declare const useJsonFormComponents: () => JsonFormComponents;

export { UiContext as default, useJsonFormComponents, useJsonFormUi };
