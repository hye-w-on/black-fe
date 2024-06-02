import { FallbackProps } from "react-error-boundary";

interface ErrorFallbackProps extends FallbackProps {
  label?: string;
}
export const ErrorFallback = (props: ErrorFallbackProps) => {
  return (
    <div>
      <div>{props.label}</div>
      <div>{props.error.message}</div>
      <button onClick={() => props.resetErrorBoundary()}>reset</button>
    </div>
  );
};
