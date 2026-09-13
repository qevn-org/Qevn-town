// Decoupled telemetry abstraction for QEVN Town

export type AnalyticsEventType =
  | 'town_loaded'
  | 'intro_completed'
  | 'location_entered'
  | 'project_opened'
  | 'service_opened'
  | 'secret_found'
  | 'contact_started'
  | 'contact_submitted'
  | 'teleport_used'
  | 'time_toggled';

export function trackEvent(eventName: AnalyticsEventType, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // Log in development or pipe to analytics provider if configured
  if (process.env.NODE_ENV !== 'production') {
    // console.log(`[QEVN_TELEMETRY] ${eventName}`, properties || {});
  }

  // Hook for window custom events or external SDKs
  window.dispatchEvent(
    new CustomEvent('qevn:analytics', {
      detail: { eventName, properties, timestamp: Date.now() },
    })
  );
}
