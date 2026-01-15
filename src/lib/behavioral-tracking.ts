/**
 * ARCHETYPES BEHAVIORAL TRACKING V8.0
 * Système de tracking comportemental complet
 * Compatible avec Sofa Chatbot + Express Server
 */

const SERVER_URL = 'https://nine-humans-take.lindy.site';
// ============================================
// TYPES & INTERFACES
// ============================================

export interface VisitorProfile {
  visitor_id: string;
  session_id: string;
  first_visit: string;
  last_visit: string;
  total_visits: number;
  total_pages_viewed: number;
  total_time_spent: number;
  device_info: DeviceInfo;
  utm_params: UTMParams;
}

export interface DeviceInfo {
  user_agent: string;
  screen_width: number;
  screen_height: number;
  viewport_width: number;
  viewport_height: number;
  device_type: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
  language: string;
  timezone: string;
  connection_type: string;
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface PageViewEvent {
  event_type: 'page_view';
  visitor_id: string;
  session_id: string;
  page_url: string;
  page_title: string;
  referrer: string;
  previous_page?: string;
  timestamp: string;
  page_load_time: number;
  scroll_depth_max: number;
}

export interface ScrollEvent {
  event_type: 'scroll';
  visitor_id: string;
  session_id: string;
  page_url: string;
  scroll_depth: number;
  scroll_direction: 'up' | 'down';
  timestamp: string;
}

export interface ClickEvent {
  event_type: 'click';
  visitor_id: string;
  session_id: string;
  page_url: string;
  element_type: string;
  element_id?: string;
  element_class?: string;
  element_text?: string;
  element_href?: string;
  click_x: number;
  click_y: number;
  timestamp: string;
}

export interface FormEvent {
  event_type: 'form_interaction';
  visitor_id: string;
  session_id: string;
  page_url: string;
  form_id?: string;
  field_name?: string;
  field_type?: string;
  action: 'focus' | 'blur' | 'change' | 'submit';
  timestamp: string;
}

export interface HoverEvent {
  event_type: 'hover';
  visitor_id: string;
  session_id: string;
  page_url: string;
  element_type: string;
  element_id?: string;
  element_text?: string;
  hover_duration: number;
  timestamp: string;
}

export interface ChatEvent {
  event_type: 'chat_opened' | 'chat_closed' | 'chat_minimized' | 'user_message_sent' | 'ai_message_received' | 'typing_started' | 'typing_stopped';
  visitor_id: string;
  session_id: string;
  page_url: string;
  message_preview?: string;
  message_length?: number;
  response_time?: number;
  chat_duration?: number;
  messages_count?: number;
  timestamp: string;
}

export interface ProductEvent {
  event_type: 'product_viewed' | 'product_hover' | 'product_click' | 'add_to_cart' | 'remove_from_cart' | 'wishlist_add';
  visitor_id: string;
  session_id: string;
  page_url: string;
  product: ProductInfo;
  view_duration?: number;
  timestamp: string;
}

export interface ProductInfo {
  id: number | string;
  name: string;
  price: number;
  category?: string;
  collection?: string;
  variant?: string;
  quantity?: number;
}

export interface PaymentEvent {
  event_type: 'payment_card_shown' | 'payment_link_clicked' | 'checkout_started' | 'checkout_completed' | 'checkout_abandoned';
  visitor_id: string;
  session_id: string;
  page_url: string;
  product?: ProductInfo;
  payment_url?: string;
  cart_value?: number;
  timestamp: string;
}

export interface ErrorEvent {
  event_type: 'js_error' | 'api_error' | 'network_error';
  visitor_id: string;
  session_id: string;
  page_url: string;
  error_message: string;
  error_stack?: string;
  error_source?: string;
  timestamp: string;
}

export interface EngagementMetrics {
  visitor_id: string;
  session_id: string;
  page_url: string;
  time_on_page: number;
  scroll_depth_max: number;
  clicks_count: number;
  hovers_count: number;
  mouse_distance: number;
  idle_time: number;
  engagement_score: number;
  timestamp: string;
}

export interface SessionSummary {
  visitor_id: string;
  session_id: string;
  session_start: string;
  session_end: string;
  total_duration: number;
  pages_viewed: string[];
  total_clicks: number;
  total_scrolls: number;
  chat_interactions: number;
  products_viewed: ProductInfo[];
  cart_actions: number;
  conversion_events: string[];
  exit_page: string;
  bounce: boolean;
}

type TrackingEvent = PageViewEvent | ScrollEvent | ClickEvent | FormEvent | 
  HoverEvent | ChatEvent | ProductEvent | PaymentEvent | ErrorEvent | EngagementMetrics;

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEYS = {
  visitorId: 'archetypes_visitor_id',
  visitorProfile: 'archetypes_visitor_profile',
  sessionId: 'archetypes_session_id',
  sessionStart: 'archetypes_session_start',
  pageHistory: 'archetypes_page_history',
  eventsQueue: 'archetypes_events_queue',
};

// ============================================
// TRACKER CLASS
// ============================================

class BehavioralTracker {
  private visitorId: string;
  private sessionId: string;
  private sessionStart: number;
  private currentPage: string;
  private pageStartTime: number;
  private eventsQueue: TrackingEvent[] = [];
  private scrollDepthMax: number = 0;
  private clicksCount: number = 0;
  private hoversCount: number = 0;
  private mouseDistance: number = 0;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;
  private lastActivityTime: number = Date.now();
  private idleThreshold: number = 30000; // 30 seconds
  private flushInterval: number = 5000; // 5 seconds
  private hoverStartTime: Map<Element, number> = new Map();
  private productViewTimes: Map<string, number> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    this.visitorId = this.getOrCreateVisitorId();
    this.sessionId = this.getOrCreateSessionId();
    this.sessionStart = Date.now();
    this.currentPage = window.location.href;
    this.pageStartTime = Date.now();
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  public init(): void {
    if (this.isInitialized) return;
    
    this.setupEventListeners();
    this.setupPeriodicFlush();
    this.setupBeforeUnload();
    this.setupErrorTracking();
    this.trackPageView();
    this.updateVisitorProfile();
    
    this.isInitialized = true;
    console.log('[Tracking V8.0] Initialized', { visitorId: this.visitorId, sessionId: this.sessionId });
  }

  // ============================================
  // ID MANAGEMENT
  // ============================================

  private getOrCreateVisitorId(): string {
    let id = localStorage.getItem(STORAGE_KEYS.visitorId);
    if (!id) {
      id = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
      localStorage.setItem(STORAGE_KEYS.visitorId, id);
    }
    return id;
  }

  private getOrCreateSessionId(): string {
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes
    const storedSession = sessionStorage.getItem(STORAGE_KEYS.sessionId);
    const storedStart = sessionStorage.getItem(STORAGE_KEYS.sessionStart);
    
    if (storedSession && storedStart) {
      const elapsed = Date.now() - parseInt(storedStart);
      if (elapsed < sessionTimeout) {
        return storedSession;
      }
    }
    
    const newSession = 's_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
    sessionStorage.setItem(STORAGE_KEYS.sessionId, newSession);
    sessionStorage.setItem(STORAGE_KEYS.sessionStart, Date.now().toString());
    return newSession;
  }

  public getVisitorId(): string {
    return this.visitorId;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  // ============================================
  // DEVICE & UTM INFO
  // ============================================

  private getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (/Mobi|Android/i.test(ua)) deviceType = 'mobile';
    else if (/Tablet|iPad/i.test(ua)) deviceType = 'tablet';

    let browser = 'unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    let os = 'unknown';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'MacOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || ua.includes('iPhone')) os = 'iOS';

    const connection = (navigator as any).connection;

    return {
      user_agent: ua,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_type: deviceType,
      browser,
      os,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connection_type: connection?.effectiveType || 'unknown',
    };
  }

  private getUTMParams(): UTMParams {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_term: params.get('utm_term') || undefined,
      utm_content: params.get('utm_content') || undefined,
    };
  }

  private updateVisitorProfile(): void {
    const existing = localStorage.getItem(STORAGE_KEYS.visitorProfile);
    const profile: VisitorProfile = existing ? JSON.parse(existing) : {
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      first_visit: new Date().toISOString(),
      last_visit: new Date().toISOString(),
      total_visits: 0,
      total_pages_viewed: 0,
      total_time_spent: 0,
      device_info: this.getDeviceInfo(),
      utm_params: this.getUTMParams(),
    };

    profile.last_visit = new Date().toISOString();
    profile.total_visits += 1;
    profile.session_id = this.sessionId;
    
    localStorage.setItem(STORAGE_KEYS.visitorProfile, JSON.stringify(profile));
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  private setupEventListeners(): void {
    // Scroll tracking
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      this.lastActivityTime = Date.now();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => this.trackScroll(), 150);
    }, { passive: true });

    // Click tracking
    document.addEventListener('click', (e) => this.trackClick(e), true);

    // Mouse movement tracking
    let mouseTimeout: NodeJS.Timeout;
    document.addEventListener('mousemove', (e) => {
      this.lastActivityTime = Date.now();
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => this.trackMouseMove(e), 100);
    }, { passive: true });

    // Hover tracking
    document.addEventListener('mouseenter', (e) => this.handleHoverStart(e), true);
    document.addEventListener('mouseleave', (e) => this.handleHoverEnd(e), true);

    // Form tracking
    document.addEventListener('focus', (e) => this.trackFormInteraction(e, 'focus'), true);
    document.addEventListener('blur', (e) => this.trackFormInteraction(e, 'blur'), true);
    document.addEventListener('change', (e) => this.trackFormInteraction(e, 'change'), true);
    document.addEventListener('submit', (e) => this.trackFormInteraction(e, 'submit'), true);

    // Visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flushEvents();
      }
    });

    // Navigation tracking (SPA)
    window.addEventListener('popstate', () => this.handleNavigation());
    
    // Override pushState for SPA navigation
    const originalPushState = history.pushState.bind(history);
    history.pushState = (...args) => {
      originalPushState(...args);
      setTimeout(() => this.handleNavigation(), 0);
    };
  }

  private setupPeriodicFlush(): void {
    setInterval(() => {
      this.flushEvents();
      this.trackEngagement();
    }, this.flushInterval);
  }

  private setupBeforeUnload(): void {
    window.addEventListener('beforeunload', () => {
      this.trackPageExit();
      this.flushEvents(true);
    });
  }

  private setupErrorTracking(): void {
    window.addEventListener('error', (e) => {
      this.trackError('js_error', e.message, e.error?.stack, e.filename);
    });

    window.addEventListener('unhandledrejection', (e) => {
      this.trackError('js_error', e.reason?.message || 'Unhandled Promise Rejection', e.reason?.stack);
    });
  }

  // ============================================
  // PAGE TRACKING
  // ============================================

  public trackPageView(): void {
    const previousPage = this.currentPage;
    this.currentPage = window.location.href;
    this.pageStartTime = Date.now();
    this.scrollDepthMax = 0;
    this.clicksCount = 0;

    const pageLoadTime = performance.now();

    const event: PageViewEvent = {
      event_type: 'page_view',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      page_title: document.title,
      referrer: document.referrer,
      previous_page: previousPage !== this.currentPage ? previousPage : undefined,
      timestamp: new Date().toISOString(),
      page_load_time: Math.round(pageLoadTime),
      scroll_depth_max: 0,
    };

    this.queueEvent(event);
    this.updatePageHistory();
  }

  private handleNavigation(): void {
    if (window.location.href !== this.currentPage) {
      this.trackPageExit();
      this.trackPageView();
    }
  }

  private trackPageExit(): void {
    const timeOnPage = Date.now() - this.pageStartTime;
    this.trackEngagement();
  }

  private updatePageHistory(): void {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.pageHistory) || '[]');
    history.push({
      url: this.currentPage,
      timestamp: new Date().toISOString(),
    });
    // Keep last 50 pages
    if (history.length > 50) history.shift();
    localStorage.setItem(STORAGE_KEYS.pageHistory, JSON.stringify(history));
  }

  // ============================================
  // SCROLL TRACKING
  // ============================================

  private trackScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    
    const direction = scrollPercent > this.scrollDepthMax ? 'down' : 'up';
    
    if (scrollPercent > this.scrollDepthMax) {
      this.scrollDepthMax = scrollPercent;
    }

    // Only track significant scroll milestones (25%, 50%, 75%, 100%)
    const milestones = [25, 50, 75, 100];
    if (milestones.includes(scrollPercent)) {
      const event: ScrollEvent = {
        event_type: 'scroll',
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        page_url: this.currentPage,
        scroll_depth: scrollPercent,
        scroll_direction: direction,
        timestamp: new Date().toISOString(),
      };
      this.queueEvent(event);
    }
  }

  // ============================================
  // CLICK TRACKING
  // ============================================

  private trackClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target) return;

    this.clicksCount++;
    this.lastActivityTime = Date.now();

    const event: ClickEvent = {
      event_type: 'click',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      element_type: target.tagName.toLowerCase(),
      element_id: target.id || undefined,
      element_class: target.className || undefined,
      element_text: target.textContent?.substring(0, 50) || undefined,
      element_href: (target as HTMLAnchorElement).href || undefined,
      click_x: e.clientX,
      click_y: e.clientY,
      timestamp: new Date().toISOString(),
    };

    this.queueEvent(event);

    // Check for product clicks
    this.checkProductInteraction(target, 'product_click');
  }

  // ============================================
  // MOUSE TRACKING
  // ============================================

  private trackMouseMove(e: MouseEvent): void {
    const dx = Math.abs(e.clientX - this.lastMouseX);
    const dy = Math.abs(e.clientY - this.lastMouseY);
    this.mouseDistance += Math.sqrt(dx * dx + dy * dy);
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  }

  // ============================================
  // HOVER TRACKING
  // ============================================

  private handleHoverStart(e: Event): void {
    const target = e.target as HTMLElement;
    if (!target || !this.isTrackableElement(target)) return;
    
    this.hoverStartTime.set(target, Date.now());
  }

  private handleHoverEnd(e: Event): void {
    const target = e.target as HTMLElement;
    if (!target) return;

    const startTime = this.hoverStartTime.get(target);
    if (startTime) {
      const duration = Date.now() - startTime;
      this.hoverStartTime.delete(target);

      // Only track hovers > 500ms
      if (duration > 500) {
        this.hoversCount++;
        const event: HoverEvent = {
          event_type: 'hover',
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          page_url: this.currentPage,
          element_type: target.tagName.toLowerCase(),
          element_id: target.id || undefined,
          element_text: target.textContent?.substring(0, 50) || undefined,
          hover_duration: duration,
          timestamp: new Date().toISOString(),
        };
        this.queueEvent(event);

        // Check for product hovers
        this.checkProductInteraction(target, 'product_hover');
      }
    }
  }

  private isTrackableElement(el: HTMLElement): boolean {
    const trackableTags = ['A', 'BUTTON', 'IMG', 'INPUT', 'SELECT', 'TEXTAREA'];
    return trackableTags.includes(el.tagName) || 
           el.hasAttribute('data-track') ||
           el.closest('[data-product-id]') !== null;
  }

  // ============================================
  // FORM TRACKING
  // ============================================

  private trackFormInteraction(e: Event, action: 'focus' | 'blur' | 'change' | 'submit'): void {
    const target = e.target as HTMLElement;
    if (!target || !['INPUT', 'SELECT', 'TEXTAREA', 'FORM'].includes(target.tagName)) return;

    const event: FormEvent = {
      event_type: 'form_interaction',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      form_id: target.closest('form')?.id || undefined,
      field_name: (target as HTMLInputElement).name || undefined,
      field_type: (target as HTMLInputElement).type || target.tagName.toLowerCase(),
      action,
      timestamp: new Date().toISOString(),
    };

    this.queueEvent(event);
  }

  // ============================================
  // CHAT TRACKING
  // ============================================

  public trackChatOpened(pageUrl?: string): void {
    const event: ChatEvent = {
      event_type: 'chat_opened',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: pageUrl || this.currentPage,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackChatClosed(duration: number, messagesCount: number): void {
    const event: ChatEvent = {
      event_type: 'chat_closed',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      chat_duration: duration,
      messages_count: messagesCount,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackChatMinimized(): void {
    const event: ChatEvent = {
      event_type: 'chat_minimized',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
  }

  public trackUserMessageSent(message: string): void {
    const event: ChatEvent = {
      event_type: 'user_message_sent',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      message_preview: message.substring(0, 100),
      message_length: message.length,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackAIMessageReceived(responseTime?: number): void {
    const event: ChatEvent = {
      event_type: 'ai_message_received',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      response_time: responseTime,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
  }

  public trackTypingStarted(): void {
    const event: ChatEvent = {
      event_type: 'typing_started',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
  }

  public trackTypingStopped(): void {
    const event: ChatEvent = {
      event_type: 'typing_stopped',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
  }

  // ============================================
  // PRODUCT TRACKING
  // ============================================

  public trackProductViewed(product: ProductInfo): void {
    this.productViewTimes.set(String(product.id), Date.now());
    
    const event: ProductEvent = {
      event_type: 'product_viewed',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      product,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackProductViewEnded(product: ProductInfo): void {
    const startTime = this.productViewTimes.get(String(product.id));
    if (startTime) {
      const viewDuration = Date.now() - startTime;
      this.productViewTimes.delete(String(product.id));

      const event: ProductEvent = {
        event_type: 'product_viewed',
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        page_url: this.currentPage,
        product,
        view_duration: viewDuration,
        timestamp: new Date().toISOString(),
      };
      this.queueEvent(event);
    }
  }

  public trackAddToCart(product: ProductInfo): void {
    const event: ProductEvent = {
      event_type: 'add_to_cart',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      product,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackRemoveFromCart(product: ProductInfo): void {
    const event: ProductEvent = {
      event_type: 'remove_from_cart',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      product,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
  }

  private checkProductInteraction(target: HTMLElement, eventType: 'product_click' | 'product_hover'): void {
    const productElement = target.closest('[data-product-id]');
    if (productElement) {
      const productId = productElement.getAttribute('data-product-id');
      const productName = productElement.getAttribute('data-product-name') || '';
      const productPrice = parseFloat(productElement.getAttribute('data-product-price') || '0');
      
      const event: ProductEvent = {
        event_type: eventType,
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        page_url: this.currentPage,
        product: {
          id: productId || '',
          name: productName,
          price: productPrice,
        },
        timestamp: new Date().toISOString(),
      };
      this.queueEvent(event);
    }
  }

  // ============================================
  // PAYMENT TRACKING
  // ============================================

  public trackPaymentCardShown(product: ProductInfo): void {
    const event: PaymentEvent = {
      event_type: 'payment_card_shown',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      product,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackPaymentLinkClicked(product: ProductInfo, paymentUrl: string): void {
    const event: PaymentEvent = {
      event_type: 'payment_link_clicked',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      product,
      payment_url: paymentUrl,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackCheckoutStarted(cartValue: number): void {
    const event: PaymentEvent = {
      event_type: 'checkout_started',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      cart_value: cartValue,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackCheckoutCompleted(cartValue: number): void {
    const event: PaymentEvent = {
      event_type: 'checkout_completed',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      cart_value: cartValue,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  public trackCheckoutAbandoned(cartValue: number): void {
    const event: PaymentEvent = {
      event_type: 'checkout_abandoned',
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      cart_value: cartValue,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  // ============================================
  // ERROR TRACKING
  // ============================================

  public trackError(type: 'js_error' | 'api_error' | 'network_error', message: string, stack?: string, source?: string): void {
    const event: ErrorEvent = {
      event_type: type,
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      error_message: message,
      error_stack: stack,
      error_source: source,
      timestamp: new Date().toISOString(),
    };
    this.queueEvent(event);
    this.sendImmediately(event);
  }

  // ============================================
  // ENGAGEMENT TRACKING
  // ============================================

  private trackEngagement(): void {
    const timeOnPage = Date.now() - this.pageStartTime;
    const idleTime = Date.now() - this.lastActivityTime;
    
    // Calculate engagement score (0-100)
    const scrollScore = Math.min(this.scrollDepthMax, 100) * 0.3;
    const clickScore = Math.min(this.clicksCount * 5, 30);
    const timeScore = Math.min(timeOnPage / 60000 * 20, 20); // Max 20 for 1 min+
    const hoverScore = Math.min(this.hoversCount * 2, 10);
    const activityScore = idleTime < this.idleThreshold ? 10 : 0;
    
    const engagementScore = Math.round(scrollScore + clickScore + timeScore + hoverScore + activityScore);

    const metrics: EngagementMetrics = {
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      page_url: this.currentPage,
      time_on_page: timeOnPage,
      scroll_depth_max: this.scrollDepthMax,
      clicks_count: this.clicksCount,
      hovers_count: this.hoversCount,
      mouse_distance: Math.round(this.mouseDistance),
      idle_time: idleTime,
      engagement_score: engagementScore,
      timestamp: new Date().toISOString(),
    };

    this.queueEvent(metrics);
  }

  // ============================================
  // EVENT QUEUE & SENDING
  // ============================================

  private queueEvent(event: TrackingEvent): void {
    this.eventsQueue.push(event);
    
    // Flush if queue is getting large
    if (this.eventsQueue.length >= 20) {
      this.flushEvents();
    }
  }

  private async sendImmediately(event: TrackingEvent): Promise<void> {
    try {
      await fetch(`${SERVER_URL}/api/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('[Tracking V8.0] Send error:', error);
    }
  }

  private async flushEvents(sync: boolean = false): Promise<void> {
    if (this.eventsQueue.length === 0) return;

    const events = [...this.eventsQueue];
    this.eventsQueue = [];

    const payload = {
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      events,
      timestamp: new Date().toISOString(),
    };

    try {
      if (sync && navigator.sendBeacon) {
        navigator.sendBeacon(
          `${SERVER_URL}/api/analytics/batch`,
          JSON.stringify(payload)
        );
      } else {
        await fetch(`${SERVER_URL}/api/analytics/batch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      }
    } catch (error) {
      console.error('[Tracking V8.0] Flush error:', error);
      // Re-queue failed events
      this.eventsQueue = [...events, ...this.eventsQueue];
    }
  }

  // ============================================
  // PUBLIC UTILITIES
  // ============================================

  public getVisitorProfile(): VisitorProfile | null {
    const stored = localStorage.getItem(STORAGE_KEYS.visitorProfile);
    return stored ? JSON.parse(stored) : null;
  }

  public getPageHistory(): { url: string; timestamp: string }[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.pageHistory) || '[]');
  }

  public getSessionDuration(): number {
    return Date.now() - this.sessionStart;
  }

  public getCurrentEngagementScore(): number {
    const timeOnPage = Date.now() - this.pageStartTime;
    const idleTime = Date.now() - this.lastActivityTime;
    
    const scrollScore = Math.min(this.scrollDepthMax, 100) * 0.3;
    const clickScore = Math.min(this.clicksCount * 5, 30);
    const timeScore = Math.min(timeOnPage / 60000 * 20, 20);
    const hoverScore = Math.min(this.hoversCount * 2, 10);
    const activityScore = idleTime < this.idleThreshold ? 10 : 0;
    
    return Math.round(scrollScore + clickScore + timeScore + hoverScore + activityScore);
  }
}

// ============================================
// SINGLETON EXPORT
// ============================================

export const tracker = new BehavioralTracker();

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => tracker.init());
  } else {
    tracker.init();
  }
}

// Export individual functions for convenience
export const trackChatOpened = (pageUrl?: string) => tracker.trackChatOpened(pageUrl);
export const trackChatClosed = (duration: number, messagesCount: number) => tracker.trackChatClosed(duration, messagesCount);
export const trackUserMessageSent = (message: string) => tracker.trackUserMessageSent(message);
export const trackAIMessageReceived = (responseTime?: number) => tracker.trackAIMessageReceived(responseTime);
export const trackProductViewed = (product: ProductInfo) => tracker.trackProductViewed(product);
export const trackAddToCart = (product: ProductInfo) => tracker.trackAddToCart(product);
export const trackPaymentCardShown = (product: ProductInfo) => tracker.trackPaymentCardShown(product);
export const trackPaymentLinkClicked = (product: ProductInfo, paymentUrl: string) => tracker.trackPaymentLinkClicked(product, paymentUrl);
export const trackCheckoutStarted = (cartValue: number) => tracker.trackCheckoutStarted(cartValue);
export const trackError = (type: 'js_error' | 'api_error' | 'network_error', message: string) => tracker.trackError(type, message);
export const getVisitorId = () => tracker.getVisitorId();
export const getSessionId = () => tracker.getSessionId();
