import { FallbackProps } from 'react-error-boundary';

declare function ErrorFallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element;

export { ErrorFallback as default };
