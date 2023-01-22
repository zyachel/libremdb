import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorInfoComponent from './ErrorInfo';

type Props = {
  children: ReactNode;
};
type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  resetError() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError)
      return (
        <ErrorInfoComponent
          message='Something weird happened on your browser.'
          misc={{
            subtext: 'Check console for more information.',
            buttonClickHandler: this.resetError.bind(this),
            buttonText: 'Reload Page',
          }}
        />
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
