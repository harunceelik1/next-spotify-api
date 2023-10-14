"use client";

export const error = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return <button onClick={reset}>TRY AGAIN</button>;
};
