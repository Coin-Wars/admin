import React from 'react'
import { ToastContext } from 'providers/ToastProvider'

export class ErrorBoundary extends React.Component {
  state = {
    error: null,
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    return (
      <ToastContext.Consumer>
        {(toast) => (
          <>
            {this.state.error &&
              toast({
                title: this.state.error,
                isClosable: true,
                status: 'error',
              })}
            {this.props.children}
          </>
        )}
      </ToastContext.Consumer>
    )
  }
}
