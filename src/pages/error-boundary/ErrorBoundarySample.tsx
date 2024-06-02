import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../components/atoms/ErrorComponent";
import { ErrorFallback } from "../../components/organisms/ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import SampleList from "./SampleList";

const ErrorBoundarySample = () => {
  return (
    <>
      <div>
        {/*
        <ErrorBoundary
          FallbackComponent={(errorProps) => (
            <ErrorFallback label="TEST" {...errorProps} />
          )}
          onReset={() => {
            console.log("onReset");
          }}
        >
          <ErrorComponent />
        </ErrorBoundary>
                */}
      </div>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
            <SampleList />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};

export default ErrorBoundarySample;
