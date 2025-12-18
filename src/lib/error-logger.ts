type LogLevel = 'info' | 'warn' | 'error'

type LogContext = {
  component?: string
  action?: string
  userId?: string
  metadata?: Record<string, unknown>
}

type LogEntry = {
  level: LogLevel
  message: string
  timestamp: string
  context?: LogContext
  error?: Error
}

class ErrorLogger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry

    let formatted = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (context) {
      formatted += `\nContext: ${JSON.stringify(context, null, 2)}`
    }

    if (error) {
      formatted += `\nError: ${error.message}`
      if (error.stack && this.isDevelopment) {
        formatted += `\n${error.stack}`
      }
    }

    return formatted
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    }
  }

  info(message: string, context?: LogContext): void {
    const entry = this.createLogEntry('info', message, context)

    if (this.isDevelopment) {
      console.info(this.formatLog(entry))
    }

    // TODO: Send to observability platform (Sentry, LogRocket, etc.)
    this.sendToObservability(entry)
  }

  warn(message: string, context?: LogContext): void {
    const entry = this.createLogEntry('warn', message, context)

    if (this.isDevelopment) {
      console.warn(this.formatLog(entry))
    }

    this.sendToObservability(entry)
  }

  error(message: string, error?: Error, context?: LogContext): void {
    const entry = this.createLogEntry('error', message, context, error)

    console.error(this.formatLog(entry))

    this.sendToObservability(entry)
  }

  private sendToObservability(entry: LogEntry): void {
    // TODO: Integrate with observability platform
    // Example integrations:
    // - Sentry.captureException(entry.error)
    // - LogRocket.captureMessage(entry.message)
    // - Custom analytics endpoint

    // For now, only log in development
    if (this.isDevelopment && entry.level === 'error') {
      // Could send to a local monitoring endpoint
    }
  }
}

export const logger = new ErrorLogger()

export function logError(error: unknown, context?: LogContext): void {
  const errorInstance = error instanceof Error ? error : new Error(String(error))
  logger.error(errorInstance.message, errorInstance, context)
}

export function handleAsyncError<T>(
  promise: Promise<T>,
  context?: LogContext
): Promise<T | null> {
  return promise.catch((error) => {
    logger.error('Async operation failed', error, context)
    return null
  })
}

export function withErrorBoundary<T extends unknown[], R>(
  fn: (...args: T) => R,
  context?: LogContext
): (...args: T) => R | null {
  return (...args: T) => {
    try {
      return fn(...args)
    } catch (error) {
      logger.error('Function execution failed', error as Error, context)
      return null
    }
  }
}
