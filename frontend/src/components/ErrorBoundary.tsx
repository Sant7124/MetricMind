import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-background text-foreground">
          <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            An unexpected error occurred in this module. The application state has been preserved.
          </p>
          <div className="bg-secondary/50 p-4 rounded-lg font-mono text-xs text-left mb-8 max-w-2xl w-full overflow-auto">
            {this.state.errorMsg}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            <RefreshCcw size={16} /> Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
