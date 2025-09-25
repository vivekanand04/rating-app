interface ErrorDisplayProps {
  errorMessage: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <p className="p-2 bg-muted rounded-md">{errorMessage}</p>
    </div>
  );
};

export default ErrorDisplay;
