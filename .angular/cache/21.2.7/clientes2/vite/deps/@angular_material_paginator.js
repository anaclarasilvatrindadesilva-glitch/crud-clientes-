import {
  ErrorStateMatcher,
  _ErrorStateTracker
} from "./chunk-AHHZW556.js";
import {
  FormGroupDirective,
  NgControl,
  NgForm,
  Validators
} from "./chunk-GH23N6WR.js";
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  CdkScrollableModule,
  ComponentPortal,
  OVERLAY_DEFAULT_CONFIG,
  OverlayModule,
  ScrollDispatcher,
  ViewportRuler,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy
} from "./chunk-UFMOV4AH.js";
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule
} from "./chunk-2SHABDHY.js";
import {
  A,
  A11yModule,
  ActiveDescendantKeyManager,
  AriaDescriber,
  DOWN_ARROW,
  ENTER,
  ESCAPE,
  FocusMonitor,
  LEFT_ARROW,
  LiveAnnouncer,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
  _IdGenerator,
  _getEventTarget,
  addAriaReferencedId,
  coerceBooleanProperty,
  hasModifierKey,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader,
  normalizePassiveListenerOptions,
  removeAriaReferencedId
} from "./chunk-7PY44RQP.js";
import {
  MediaMatcher,
  _animationsDisabled
} from "./chunk-6F4547TL.js";
import {
  coerceElement,
  coerceNumberProperty
} from "./chunk-OFELZQSR.js";
import {
  Platform
} from "./chunk-5OBD4RIS.js";
import {
  _VisuallyHiddenLoader
} from "./chunk-ZVBFOOEM.js";
import "./chunk-EOXI4YRU.js";
import {
  BidiModule,
  Directionality
} from "./chunk-2CBQDRU5.js";
import {
  _CdkPrivateStyleLoader
} from "./chunk-YMXKS367.js";
import "./chunk-CI546F5V.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  HostAttributeToken,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  RendererFactory2,
  ReplaySubject,
  Subject,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  __spreadValues,
  afterNextRender,
  booleanAttribute,
  defer,
  filter,
  inject,
  isSignal,
  map,
  merge,
  numberAttribute,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  take,
  takeUntil,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-6VYNFR6O.js";

// node_modules/@angular/cdk/fesm2022/_selection-model-chunk.mjs
var SelectionModel = class {
  _multiple;
  _emitChanges;
  compareWith;
  _selection = /* @__PURE__ */ new Set();
  _deselectedToEmit = [];
  _selectedToEmit = [];
  _selected = null;
  get selected() {
    if (!this._selected) {
      this._selected = Array.from(this._selection.values());
    }
    return this._selected;
  }
  changed = new Subject();
  constructor(_multiple = false, initiallySelectedValues, _emitChanges = true, compareWith) {
    this._multiple = _multiple;
    this._emitChanges = _emitChanges;
    this.compareWith = compareWith;
    if (initiallySelectedValues && initiallySelectedValues.length) {
      if (_multiple) {
        initiallySelectedValues.forEach((value) => this._markSelected(value));
      } else {
        this._markSelected(initiallySelectedValues[0]);
      }
      this._selectedToEmit.length = 0;
    }
  }
  select(...values) {
    this._verifyValueAssignment(values);
    values.forEach((value) => this._markSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  deselect(...values) {
    this._verifyValueAssignment(values);
    values.forEach((value) => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  setSelection(...values) {
    this._verifyValueAssignment(values);
    const oldValues = this.selected;
    const newSelectedSet = new Set(values.map((value) => this._getConcreteValue(value)));
    values.forEach((value) => this._markSelected(value));
    oldValues.filter((value) => !newSelectedSet.has(this._getConcreteValue(value, newSelectedSet))).forEach((value) => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  toggle(value) {
    return this.isSelected(value) ? this.deselect(value) : this.select(value);
  }
  clear(flushEvent = true) {
    this._unmarkAll();
    const changed = this._hasQueuedChanges();
    if (flushEvent) {
      this._emitChangeEvent();
    }
    return changed;
  }
  isSelected(value) {
    return this._selection.has(this._getConcreteValue(value));
  }
  isEmpty() {
    return this._selection.size === 0;
  }
  hasValue() {
    return !this.isEmpty();
  }
  sort(predicate) {
    if (this._multiple && this.selected) {
      this._selected.sort(predicate);
    }
  }
  isMultipleSelection() {
    return this._multiple;
  }
  _emitChangeEvent() {
    this._selected = null;
    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      this.changed.next({
        source: this,
        added: this._selectedToEmit,
        removed: this._deselectedToEmit
      });
      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }
  }
  _markSelected(value) {
    value = this._getConcreteValue(value);
    if (!this.isSelected(value)) {
      if (!this._multiple) {
        this._unmarkAll();
      }
      if (!this.isSelected(value)) {
        this._selection.add(value);
      }
      if (this._emitChanges) {
        this._selectedToEmit.push(value);
      }
    }
  }
  _unmarkSelected(value) {
    value = this._getConcreteValue(value);
    if (this.isSelected(value)) {
      this._selection.delete(value);
      if (this._emitChanges) {
        this._deselectedToEmit.push(value);
      }
    }
  }
  _unmarkAll() {
    if (!this.isEmpty()) {
      this._selection.forEach((value) => this._unmarkSelected(value));
    }
  }
  _verifyValueAssignment(values) {
    if (values.length > 1 && !this._multiple && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMultipleValuesInSingleSelectionError();
    }
  }
  _hasQueuedChanges() {
    return !!(this._deselectedToEmit.length || this._selectedToEmit.length);
  }
  _getConcreteValue(inputValue, selection) {
    if (!this.compareWith) {
      return inputValue;
    } else {
      selection = selection ?? this._selection;
      for (let selectedValue of selection) {
        if (this.compareWith(inputValue, selectedValue)) {
          return selectedValue;
        }
      }
      return inputValue;
    }
  }
};
function getMultipleValuesInSingleSelectionError() {
  return Error("Cannot pass multiple values into SelectionModel with single-value mode.");
}

// node_modules/@angular/cdk/fesm2022/_unique-selection-dispatcher-chunk.mjs
var UniqueSelectionDispatcher = class _UniqueSelectionDispatcher {
  _listeners = [];
  notify(id, name) {
    for (let listener of this._listeners) {
      listener(id, name);
    }
  }
  listen(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((registered) => {
        return listener !== registered;
      });
    };
  }
  ngOnDestroy() {
    this._listeners = [];
  }
  static ɵfac = function UniqueSelectionDispatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UniqueSelectionDispatcher)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _UniqueSelectionDispatcher,
    factory: _UniqueSelectionDispatcher.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UniqueSelectionDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_ripple-chunk.mjs
var RippleState;
(function(RippleState2) {
  RippleState2[RippleState2["FADING_IN"] = 0] = "FADING_IN";
  RippleState2[RippleState2["VISIBLE"] = 1] = "VISIBLE";
  RippleState2[RippleState2["FADING_OUT"] = 2] = "FADING_OUT";
  RippleState2[RippleState2["HIDDEN"] = 3] = "HIDDEN";
})(RippleState || (RippleState = {}));
var RippleRef = class {
  _renderer;
  element;
  config;
  _animationForciblyDisabledThroughCss;
  state = RippleState.HIDDEN;
  constructor(_renderer, element, config, _animationForciblyDisabledThroughCss = false) {
    this._renderer = _renderer;
    this.element = element;
    this.config = config;
    this._animationForciblyDisabledThroughCss = _animationForciblyDisabledThroughCss;
  }
  fadeOut() {
    this._renderer.fadeOutRipple(this);
  }
};
var passiveCapturingEventOptions$1 = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var RippleEventManager = class {
  _events = /* @__PURE__ */ new Map();
  addHandler(ngZone, name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (handlersForEvent) {
      const handlersForElement = handlersForEvent.get(element);
      if (handlersForElement) {
        handlersForElement.add(handler);
      } else {
        handlersForEvent.set(element, /* @__PURE__ */ new Set([handler]));
      }
    } else {
      this._events.set(name, /* @__PURE__ */ new Map([[element, /* @__PURE__ */ new Set([handler])]]));
      ngZone.runOutsideAngular(() => {
        document.addEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
      });
    }
  }
  removeHandler(name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (!handlersForEvent) {
      return;
    }
    const handlersForElement = handlersForEvent.get(element);
    if (!handlersForElement) {
      return;
    }
    handlersForElement.delete(handler);
    if (handlersForElement.size === 0) {
      handlersForEvent.delete(element);
    }
    if (handlersForEvent.size === 0) {
      this._events.delete(name);
      document.removeEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
    }
  }
  _delegateEventHandler = (event) => {
    const target = _getEventTarget(event);
    if (target) {
      this._events.get(event.type)?.forEach((handlers, element) => {
        if (element === target || element.contains(target)) {
          handlers.forEach((handler) => handler.handleEvent(event));
        }
      });
    }
  };
};
var defaultRippleAnimationConfig = {
  enterDuration: 225,
  exitDuration: 150
};
var ignoreMouseEventsTimeout = 800;
var passiveCapturingEventOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var pointerDownEvents = ["mousedown", "touchstart"];
var pointerUpEvents = ["mouseup", "mouseleave", "touchend", "touchcancel"];
var _MatRippleStylesLoader = class __MatRippleStylesLoader {
  static ɵfac = function _MatRippleStylesLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __MatRippleStylesLoader)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: __MatRippleStylesLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["mat-ripple-style-loader", ""],
    decls: 0,
    vars: 0,
    template: function _MatRippleStylesLoader_Template(rf, ctx) {
    },
    styles: [".mat-ripple {\n  overflow: hidden;\n  position: relative;\n}\n.mat-ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible;\n}\n\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transform: scale3d(0, 0, 0);\n  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-ripple-element {\n    display: none;\n  }\n}\n.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {\n  display: none;\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatRippleStylesLoader, [{
    type: Component,
    args: [{
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "mat-ripple-style-loader": ""
      },
      styles: [".mat-ripple {\n  overflow: hidden;\n  position: relative;\n}\n.mat-ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible;\n}\n\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transform: scale3d(0, 0, 0);\n  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-ripple-element {\n    display: none;\n  }\n}\n.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {\n  display: none;\n}\n"]
    }]
  }], null, null);
})();
var RippleRenderer = class _RippleRenderer {
  _target;
  _ngZone;
  _platform;
  _containerElement;
  _triggerElement = null;
  _isPointerDown = false;
  _activeRipples = /* @__PURE__ */ new Map();
  _mostRecentTransientRipple = null;
  _lastTouchStartEvent;
  _pointerUpEventsRegistered = false;
  _containerRect = null;
  static _eventManager = new RippleEventManager();
  constructor(_target, _ngZone, elementOrElementRef, _platform, injector) {
    this._target = _target;
    this._ngZone = _ngZone;
    this._platform = _platform;
    if (_platform.isBrowser) {
      this._containerElement = coerceElement(elementOrElementRef);
    }
    if (injector) {
      injector.get(_CdkPrivateStyleLoader).load(_MatRippleStylesLoader);
    }
  }
  fadeInRipple(x, y, config = {}) {
    const containerRect = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect();
    const animationConfig = __spreadValues(__spreadValues({}, defaultRippleAnimationConfig), config.animation);
    if (config.centered) {
      x = containerRect.left + containerRect.width / 2;
      y = containerRect.top + containerRect.height / 2;
    }
    const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const enterDuration = animationConfig.enterDuration;
    const ripple = document.createElement("div");
    ripple.classList.add("mat-ripple-element");
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;
    if (config.color != null) {
      ripple.style.backgroundColor = config.color;
    }
    ripple.style.transitionDuration = `${enterDuration}ms`;
    this._containerElement.appendChild(ripple);
    const computedStyles = window.getComputedStyle(ripple);
    const userTransitionProperty = computedStyles.transitionProperty;
    const userTransitionDuration = computedStyles.transitionDuration;
    const animationForciblyDisabledThroughCss = userTransitionProperty === "none" || userTransitionDuration === "0s" || userTransitionDuration === "0s, 0s" || containerRect.width === 0 && containerRect.height === 0;
    const rippleRef = new RippleRef(this, ripple, config, animationForciblyDisabledThroughCss);
    ripple.style.transform = "scale3d(1, 1, 1)";
    rippleRef.state = RippleState.FADING_IN;
    if (!config.persistent) {
      this._mostRecentTransientRipple = rippleRef;
    }
    let eventListeners = null;
    if (!animationForciblyDisabledThroughCss && (enterDuration || animationConfig.exitDuration)) {
      this._ngZone.runOutsideAngular(() => {
        const onTransitionEnd = () => {
          if (eventListeners) {
            eventListeners.fallbackTimer = null;
          }
          clearTimeout(fallbackTimer);
          this._finishRippleTransition(rippleRef);
        };
        const onTransitionCancel = () => this._destroyRipple(rippleRef);
        const fallbackTimer = setTimeout(onTransitionCancel, enterDuration + 100);
        ripple.addEventListener("transitionend", onTransitionEnd);
        ripple.addEventListener("transitioncancel", onTransitionCancel);
        eventListeners = {
          onTransitionEnd,
          onTransitionCancel,
          fallbackTimer
        };
      });
    }
    this._activeRipples.set(rippleRef, eventListeners);
    if (animationForciblyDisabledThroughCss || !enterDuration) {
      this._finishRippleTransition(rippleRef);
    }
    return rippleRef;
  }
  fadeOutRipple(rippleRef) {
    if (rippleRef.state === RippleState.FADING_OUT || rippleRef.state === RippleState.HIDDEN) {
      return;
    }
    const rippleEl = rippleRef.element;
    const animationConfig = __spreadValues(__spreadValues({}, defaultRippleAnimationConfig), rippleRef.config.animation);
    rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
    rippleEl.style.opacity = "0";
    rippleRef.state = RippleState.FADING_OUT;
    if (rippleRef._animationForciblyDisabledThroughCss || !animationConfig.exitDuration) {
      this._finishRippleTransition(rippleRef);
    }
  }
  fadeOutAll() {
    this._getActiveRipples().forEach((ripple) => ripple.fadeOut());
  }
  fadeOutAllNonPersistent() {
    this._getActiveRipples().forEach((ripple) => {
      if (!ripple.config.persistent) {
        ripple.fadeOut();
      }
    });
  }
  setupTriggerEvents(elementOrElementRef) {
    const element = coerceElement(elementOrElementRef);
    if (!this._platform.isBrowser || !element || element === this._triggerElement) {
      return;
    }
    this._removeTriggerEvents();
    this._triggerElement = element;
    pointerDownEvents.forEach((type) => {
      _RippleRenderer._eventManager.addHandler(this._ngZone, type, element, this);
    });
  }
  handleEvent(event) {
    if (event.type === "mousedown") {
      this._onMousedown(event);
    } else if (event.type === "touchstart") {
      this._onTouchStart(event);
    } else {
      this._onPointerUp();
    }
    if (!this._pointerUpEventsRegistered) {
      this._ngZone.runOutsideAngular(() => {
        pointerUpEvents.forEach((type) => {
          this._triggerElement.addEventListener(type, this, passiveCapturingEventOptions);
        });
      });
      this._pointerUpEventsRegistered = true;
    }
  }
  _finishRippleTransition(rippleRef) {
    if (rippleRef.state === RippleState.FADING_IN) {
      this._startFadeOutTransition(rippleRef);
    } else if (rippleRef.state === RippleState.FADING_OUT) {
      this._destroyRipple(rippleRef);
    }
  }
  _startFadeOutTransition(rippleRef) {
    const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
    const {
      persistent
    } = rippleRef.config;
    rippleRef.state = RippleState.VISIBLE;
    if (!persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
      rippleRef.fadeOut();
    }
  }
  _destroyRipple(rippleRef) {
    const eventListeners = this._activeRipples.get(rippleRef) ?? null;
    this._activeRipples.delete(rippleRef);
    if (!this._activeRipples.size) {
      this._containerRect = null;
    }
    if (rippleRef === this._mostRecentTransientRipple) {
      this._mostRecentTransientRipple = null;
    }
    rippleRef.state = RippleState.HIDDEN;
    if (eventListeners !== null) {
      rippleRef.element.removeEventListener("transitionend", eventListeners.onTransitionEnd);
      rippleRef.element.removeEventListener("transitioncancel", eventListeners.onTransitionCancel);
      if (eventListeners.fallbackTimer !== null) {
        clearTimeout(eventListeners.fallbackTimer);
      }
    }
    rippleRef.element.remove();
  }
  _onMousedown(event) {
    const isFakeMousedown = isFakeMousedownFromScreenReader(event);
    const isSyntheticEvent = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
    if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
      this._isPointerDown = true;
      this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
    }
  }
  _onTouchStart(event) {
    if (!this._target.rippleDisabled && !isFakeTouchstartFromScreenReader(event)) {
      this._lastTouchStartEvent = Date.now();
      this._isPointerDown = true;
      const touches = event.changedTouches;
      if (touches) {
        for (let i = 0; i < touches.length; i++) {
          this.fadeInRipple(touches[i].clientX, touches[i].clientY, this._target.rippleConfig);
        }
      }
    }
  }
  _onPointerUp() {
    if (!this._isPointerDown) {
      return;
    }
    this._isPointerDown = false;
    this._getActiveRipples().forEach((ripple) => {
      const isVisible = ripple.state === RippleState.VISIBLE || ripple.config.terminateOnPointerUp && ripple.state === RippleState.FADING_IN;
      if (!ripple.config.persistent && isVisible) {
        ripple.fadeOut();
      }
    });
  }
  _getActiveRipples() {
    return Array.from(this._activeRipples.keys());
  }
  _removeTriggerEvents() {
    const trigger = this._triggerElement;
    if (trigger) {
      pointerDownEvents.forEach((type) => _RippleRenderer._eventManager.removeHandler(type, trigger, this));
      if (this._pointerUpEventsRegistered) {
        pointerUpEvents.forEach((type) => trigger.removeEventListener(type, this, passiveCapturingEventOptions));
        this._pointerUpEventsRegistered = false;
      }
    }
  }
};
function distanceToFurthestCorner(x, y, rect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}
var MAT_RIPPLE_GLOBAL_OPTIONS = new InjectionToken("mat-ripple-global-options");
var MatRipple = class _MatRipple {
  _elementRef = inject(ElementRef);
  _animationsDisabled = _animationsDisabled();
  color;
  unbounded = false;
  centered = false;
  radius = 0;
  animation;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    if (value) {
      this.fadeOutAllNonPersistent();
    }
    this._disabled = value;
    this._setupTriggerEventsIfEnabled();
  }
  _disabled = false;
  get trigger() {
    return this._trigger || this._elementRef.nativeElement;
  }
  set trigger(trigger) {
    this._trigger = trigger;
    this._setupTriggerEventsIfEnabled();
  }
  _trigger;
  _rippleRenderer;
  _globalOptions;
  _isInitialized = false;
  constructor() {
    const ngZone = inject(NgZone);
    const platform = inject(Platform);
    const globalOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
      optional: true
    });
    const injector = inject(Injector);
    this._globalOptions = globalOptions || {};
    this._rippleRenderer = new RippleRenderer(this, ngZone, this._elementRef, platform, injector);
  }
  ngOnInit() {
    this._isInitialized = true;
    this._setupTriggerEventsIfEnabled();
  }
  ngOnDestroy() {
    this._rippleRenderer._removeTriggerEvents();
  }
  fadeOutAll() {
    this._rippleRenderer.fadeOutAll();
  }
  fadeOutAllNonPersistent() {
    this._rippleRenderer.fadeOutAllNonPersistent();
  }
  get rippleConfig() {
    return {
      centered: this.centered,
      radius: this.radius,
      color: this.color,
      animation: __spreadValues(__spreadValues(__spreadValues({}, this._globalOptions.animation), this._animationsDisabled ? {
        enterDuration: 0,
        exitDuration: 0
      } : {}), this.animation),
      terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
    };
  }
  get rippleDisabled() {
    return this.disabled || !!this._globalOptions.disabled;
  }
  _setupTriggerEventsIfEnabled() {
    if (!this.disabled && this._isInitialized) {
      this._rippleRenderer.setupTriggerEvents(this.trigger);
    }
  }
  launch(configOrX, y = 0, config) {
    if (typeof configOrX === "number") {
      return this._rippleRenderer.fadeInRipple(configOrX, y, __spreadValues(__spreadValues({}, this.rippleConfig), config));
    } else {
      return this._rippleRenderer.fadeInRipple(0, 0, __spreadValues(__spreadValues({}, this.rippleConfig), configOrX));
    }
  }
  static ɵfac = function MatRipple_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRipple)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatRipple,
    selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
    hostAttrs: [1, "mat-ripple"],
    hostVars: 2,
    hostBindings: function MatRipple_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mat-ripple-unbounded", ctx.unbounded);
      }
    },
    inputs: {
      color: [0, "matRippleColor", "color"],
      unbounded: [0, "matRippleUnbounded", "unbounded"],
      centered: [0, "matRippleCentered", "centered"],
      radius: [0, "matRippleRadius", "radius"],
      animation: [0, "matRippleAnimation", "animation"],
      disabled: [0, "matRippleDisabled", "disabled"],
      trigger: [0, "matRippleTrigger", "trigger"]
    },
    exportAs: ["matRipple"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRipple, [{
    type: Directive,
    args: [{
      selector: "[mat-ripple], [matRipple]",
      exportAs: "matRipple",
      host: {
        "class": "mat-ripple",
        "[class.mat-ripple-unbounded]": "unbounded"
      }
    }]
  }], () => [], {
    color: [{
      type: Input,
      args: ["matRippleColor"]
    }],
    unbounded: [{
      type: Input,
      args: ["matRippleUnbounded"]
    }],
    centered: [{
      type: Input,
      args: ["matRippleCentered"]
    }],
    radius: [{
      type: Input,
      args: ["matRippleRadius"]
    }],
    animation: [{
      type: Input,
      args: ["matRippleAnimation"]
    }],
    disabled: [{
      type: Input,
      args: ["matRippleDisabled"]
    }],
    trigger: [{
      type: Input,
      args: ["matRippleTrigger"]
    }]
  });
})();

// node_modules/@angular/material/fesm2022/_pseudo-checkbox-chunk.mjs
var MatPseudoCheckbox = class _MatPseudoCheckbox {
  _animationsDisabled = _animationsDisabled();
  state = "unchecked";
  disabled = false;
  appearance = "full";
  constructor() {
  }
  static ɵfac = function MatPseudoCheckbox_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPseudoCheckbox)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatPseudoCheckbox,
    selectors: [["mat-pseudo-checkbox"]],
    hostAttrs: [1, "mat-pseudo-checkbox"],
    hostVars: 12,
    hostBindings: function MatPseudoCheckbox_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mat-pseudo-checkbox-indeterminate", ctx.state === "indeterminate")("mat-pseudo-checkbox-checked", ctx.state === "checked")("mat-pseudo-checkbox-disabled", ctx.disabled)("mat-pseudo-checkbox-minimal", ctx.appearance === "minimal")("mat-pseudo-checkbox-full", ctx.appearance === "full")("_mat-animation-noopable", ctx._animationsDisabled);
      }
    },
    inputs: {
      state: "state",
      disabled: "disabled",
      appearance: "appearance"
    },
    decls: 0,
    vars: 0,
    template: function MatPseudoCheckbox_Template(rf, ctx) {
    },
    styles: ['.mat-pseudo-checkbox {\n  border-radius: 2px;\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n  box-sizing: border-box;\n  position: relative;\n  flex-shrink: 0;\n  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);\n}\n.mat-pseudo-checkbox::after {\n  position: absolute;\n  opacity: 0;\n  content: "";\n  border-bottom: 2px solid currentColor;\n  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);\n}\n.mat-pseudo-checkbox._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-pseudo-checkbox._mat-animation-noopable::after {\n  transition: none;\n}\n\n.mat-pseudo-checkbox-disabled {\n  cursor: default;\n}\n\n.mat-pseudo-checkbox-indeterminate::after {\n  left: 1px;\n  opacity: 1;\n  border-radius: 2px;\n}\n\n.mat-pseudo-checkbox-checked::after {\n  left: 1px;\n  border-left: 2px solid currentColor;\n  transform: rotate(-45deg);\n  opacity: 1;\n  box-sizing: content-box;\n}\n\n.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {\n  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));\n}\n.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {\n  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-pseudo-checkbox-full {\n  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));\n  border-width: 2px;\n  border-style: solid;\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {\n  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {\n  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));\n  border-color: transparent;\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {\n  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {\n  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));\n}\n\n.mat-pseudo-checkbox {\n  width: 18px;\n  height: 18px;\n}\n\n.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {\n  width: 14px;\n  height: 6px;\n  transform-origin: center;\n  top: -4.2426406871px;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n}\n.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {\n  top: 8px;\n  width: 16px;\n}\n\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {\n  width: 10px;\n  height: 4px;\n  transform-origin: center;\n  top: -2.8284271247px;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {\n  top: 6px;\n  width: 12px;\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPseudoCheckbox, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "mat-pseudo-checkbox",
      template: "",
      host: {
        "class": "mat-pseudo-checkbox",
        "[class.mat-pseudo-checkbox-indeterminate]": 'state === "indeterminate"',
        "[class.mat-pseudo-checkbox-checked]": 'state === "checked"',
        "[class.mat-pseudo-checkbox-disabled]": "disabled",
        "[class.mat-pseudo-checkbox-minimal]": 'appearance === "minimal"',
        "[class.mat-pseudo-checkbox-full]": 'appearance === "full"',
        "[class._mat-animation-noopable]": "_animationsDisabled"
      },
      styles: ['.mat-pseudo-checkbox {\n  border-radius: 2px;\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n  box-sizing: border-box;\n  position: relative;\n  flex-shrink: 0;\n  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);\n}\n.mat-pseudo-checkbox::after {\n  position: absolute;\n  opacity: 0;\n  content: "";\n  border-bottom: 2px solid currentColor;\n  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);\n}\n.mat-pseudo-checkbox._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-pseudo-checkbox._mat-animation-noopable::after {\n  transition: none;\n}\n\n.mat-pseudo-checkbox-disabled {\n  cursor: default;\n}\n\n.mat-pseudo-checkbox-indeterminate::after {\n  left: 1px;\n  opacity: 1;\n  border-radius: 2px;\n}\n\n.mat-pseudo-checkbox-checked::after {\n  left: 1px;\n  border-left: 2px solid currentColor;\n  transform: rotate(-45deg);\n  opacity: 1;\n  box-sizing: content-box;\n}\n\n.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {\n  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));\n}\n.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {\n  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-pseudo-checkbox-full {\n  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));\n  border-width: 2px;\n  border-style: solid;\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {\n  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {\n  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));\n  border-color: transparent;\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {\n  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {\n  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));\n}\n\n.mat-pseudo-checkbox {\n  width: 18px;\n  height: 18px;\n}\n\n.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {\n  width: 14px;\n  height: 6px;\n  transform-origin: center;\n  top: -4.2426406871px;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n}\n.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {\n  top: 8px;\n  width: 16px;\n}\n\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {\n  width: 10px;\n  height: 4px;\n  transform-origin: center;\n  top: -2.8284271247px;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  margin: auto;\n}\n.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {\n  top: 6px;\n  width: 12px;\n}\n']
    }]
  }], () => [], {
    state: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    appearance: [{
      type: Input
    }]
  });
})();

// node_modules/@angular/material/fesm2022/_structural-styles-chunk.mjs
var _StructuralStylesLoader = class __StructuralStylesLoader {
  static ɵfac = function _StructuralStylesLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __StructuralStylesLoader)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: __StructuralStylesLoader,
    selectors: [["structural-styles"]],
    decls: 0,
    vars: 0,
    template: function _StructuralStylesLoader_Template(rf, ctx) {
    },
    styles: ['.mat-focus-indicator {\n  position: relative;\n}\n.mat-focus-indicator::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  box-sizing: border-box;\n  pointer-events: none;\n  display: var(--mat-focus-indicator-display, none);\n  border-width: var(--mat-focus-indicator-border-width, 3px);\n  border-style: var(--mat-focus-indicator-border-style, solid);\n  border-color: var(--mat-focus-indicator-border-color, transparent);\n  border-radius: var(--mat-focus-indicator-border-radius, 4px);\n}\n.mat-focus-indicator:focus-visible::before {\n  content: "";\n}\n\n@media (forced-colors: active) {\n  html {\n    --mat-focus-indicator-display: block;\n  }\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_StructuralStylesLoader, [{
    type: Component,
    args: [{
      selector: "structural-styles",
      encapsulation: ViewEncapsulation.None,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: ['.mat-focus-indicator {\n  position: relative;\n}\n.mat-focus-indicator::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  box-sizing: border-box;\n  pointer-events: none;\n  display: var(--mat-focus-indicator-display, none);\n  border-width: var(--mat-focus-indicator-border-width, 3px);\n  border-style: var(--mat-focus-indicator-border-style, solid);\n  border-color: var(--mat-focus-indicator-border-color, transparent);\n  border-radius: var(--mat-focus-indicator-border-radius, 4px);\n}\n.mat-focus-indicator:focus-visible::before {\n  content: "";\n}\n\n@media (forced-colors: active) {\n  html {\n    --mat-focus-indicator-display: block;\n  }\n}\n']
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_option-chunk.mjs
var _c0 = ["*", [["mat-option"], ["ng-container"]]];
var _c1 = ["*", "mat-option, ng-container"];
var _c2 = ["text"];
var _c3 = [[["mat-icon"]], "*"];
var _c4 = ["mat-icon", "*"];
function MatOption_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "mat-pseudo-checkbox", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("disabled", ctx_r0.disabled)("state", ctx_r0.selected ? "checked" : "unchecked");
  }
}
function MatOption_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "mat-pseudo-checkbox", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("disabled", ctx_r0.disabled);
  }
}
function MatOption_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1("(", ctx_r0.group.label, ")");
  }
}
var MAT_OPTION_PARENT_COMPONENT = new InjectionToken("MAT_OPTION_PARENT_COMPONENT");
var MAT_OPTGROUP = new InjectionToken("MatOptgroup");
var MatOptgroup = class _MatOptgroup {
  label;
  disabled = false;
  _labelId = inject(_IdGenerator).getId("mat-optgroup-label-");
  _inert;
  constructor() {
    const parent = inject(MAT_OPTION_PARENT_COMPONENT, {
      optional: true
    });
    this._inert = parent?.inertGroups ?? false;
  }
  static ɵfac = function MatOptgroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatOptgroup)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatOptgroup,
    selectors: [["mat-optgroup"]],
    hostAttrs: [1, "mat-mdc-optgroup"],
    hostVars: 3,
    hostBindings: function MatOptgroup_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("role", ctx._inert ? null : "group")("aria-disabled", ctx._inert ? null : ctx.disabled.toString())("aria-labelledby", ctx._inert ? null : ctx._labelId);
      }
    },
    inputs: {
      label: "label",
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    exportAs: ["matOptgroup"],
    features: [ɵɵProvidersFeature([{
      provide: MAT_OPTGROUP,
      useExisting: _MatOptgroup
    }])],
    ngContentSelectors: _c1,
    decls: 5,
    vars: 4,
    consts: [["role", "presentation", 1, "mat-mdc-optgroup-label", 3, "id"], [1, "mdc-list-item__primary-text"]],
    template: function MatOptgroup_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c0);
        ɵɵdomElementStart(0, "span", 0)(1, "span", 1);
        ɵɵtext(2);
        ɵɵprojection(3);
        ɵɵdomElementEnd()();
        ɵɵprojection(4, 1);
      }
      if (rf & 2) {
        ɵɵclassProp("mdc-list-item--disabled", ctx.disabled);
        ɵɵdomProperty("id", ctx._labelId);
        ɵɵadvance(2);
        ɵɵtextInterpolate1("", ctx.label, " ");
      }
    },
    styles: [".mat-mdc-optgroup {\n  color: var(--mat-optgroup-label-text-color, var(--mat-sys-on-surface-variant));\n  font-family: var(--mat-optgroup-label-text-font, var(--mat-sys-title-small-font));\n  line-height: var(--mat-optgroup-label-text-line-height, var(--mat-sys-title-small-line-height));\n  font-size: var(--mat-optgroup-label-text-size, var(--mat-sys-title-small-size));\n  letter-spacing: var(--mat-optgroup-label-text-tracking, var(--mat-sys-title-small-tracking));\n  font-weight: var(--mat-optgroup-label-text-weight, var(--mat-sys-title-small-weight));\n}\n\n.mat-mdc-optgroup-label {\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: flex-start;\n  overflow: hidden;\n  min-height: 48px;\n  padding: 0 16px;\n  outline: none;\n}\n.mat-mdc-optgroup-label.mdc-list-item--disabled {\n  opacity: 0.38;\n}\n.mat-mdc-optgroup-label .mdc-list-item__primary-text {\n  font-size: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  line-height: inherit;\n  font-family: inherit;\n  text-decoration: inherit;\n  text-transform: inherit;\n  white-space: normal;\n  color: inherit;\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatOptgroup, [{
    type: Component,
    args: [{
      selector: "mat-optgroup",
      exportAs: "matOptgroup",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-optgroup",
        "[attr.role]": '_inert ? null : "group"',
        "[attr.aria-disabled]": "_inert ? null : disabled.toString()",
        "[attr.aria-labelledby]": "_inert ? null : _labelId"
      },
      providers: [{
        provide: MAT_OPTGROUP,
        useExisting: MatOptgroup
      }],
      template: '<span\n  class="mat-mdc-optgroup-label"\n  role="presentation"\n  [class.mdc-list-item--disabled]="disabled"\n  [id]="_labelId">\n  <span class="mdc-list-item__primary-text">{{ label }} <ng-content></ng-content></span>\n</span>\n\n<ng-content select="mat-option, ng-container"></ng-content>\n',
      styles: [".mat-mdc-optgroup {\n  color: var(--mat-optgroup-label-text-color, var(--mat-sys-on-surface-variant));\n  font-family: var(--mat-optgroup-label-text-font, var(--mat-sys-title-small-font));\n  line-height: var(--mat-optgroup-label-text-line-height, var(--mat-sys-title-small-line-height));\n  font-size: var(--mat-optgroup-label-text-size, var(--mat-sys-title-small-size));\n  letter-spacing: var(--mat-optgroup-label-text-tracking, var(--mat-sys-title-small-tracking));\n  font-weight: var(--mat-optgroup-label-text-weight, var(--mat-sys-title-small-weight));\n}\n\n.mat-mdc-optgroup-label {\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: flex-start;\n  overflow: hidden;\n  min-height: 48px;\n  padding: 0 16px;\n  outline: none;\n}\n.mat-mdc-optgroup-label.mdc-list-item--disabled {\n  opacity: 0.38;\n}\n.mat-mdc-optgroup-label .mdc-list-item__primary-text {\n  font-size: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  line-height: inherit;\n  font-family: inherit;\n  text-decoration: inherit;\n  text-transform: inherit;\n  white-space: normal;\n  color: inherit;\n}\n"]
    }]
  }], () => [], {
    label: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatOptionSelectionChange = class {
  source;
  isUserInput;
  constructor(source, isUserInput = false) {
    this.source = source;
    this.isUserInput = isUserInput;
  }
};
var MatOption = class _MatOption {
  _element = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _parent = inject(MAT_OPTION_PARENT_COMPONENT, {
    optional: true
  });
  group = inject(MAT_OPTGROUP, {
    optional: true
  });
  _signalDisableRipple = false;
  _selected = false;
  _active = false;
  _mostRecentViewValue = "";
  get multiple() {
    return this._parent && this._parent.multiple;
  }
  get selected() {
    return this._selected;
  }
  value;
  id = inject(_IdGenerator).getId("mat-option-");
  get disabled() {
    return this.group && this.group.disabled || this._disabled();
  }
  set disabled(value) {
    this._disabled.set(value);
  }
  _disabled = signal(false, ...ngDevMode ? [{
    debugName: "_disabled"
  }] : []);
  get disableRipple() {
    return this._signalDisableRipple ? this._parent.disableRipple() : !!this._parent?.disableRipple;
  }
  get hideSingleSelectionIndicator() {
    return !!(this._parent && this._parent.hideSingleSelectionIndicator);
  }
  onSelectionChange = new EventEmitter();
  _text;
  _stateChanges = new Subject();
  constructor() {
    const styleLoader = inject(_CdkPrivateStyleLoader);
    styleLoader.load(_StructuralStylesLoader);
    styleLoader.load(_VisuallyHiddenLoader);
    this._signalDisableRipple = !!this._parent && isSignal(this._parent.disableRipple);
  }
  get active() {
    return this._active;
  }
  get viewValue() {
    return (this._text?.nativeElement.textContent || "").trim();
  }
  select(emitEvent = true) {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      if (emitEvent) {
        this._emitSelectionChangeEvent();
      }
    }
  }
  deselect(emitEvent = true) {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();
      if (emitEvent) {
        this._emitSelectionChangeEvent();
      }
    }
  }
  focus(_origin, options) {
    const element = this._getHostElement();
    if (typeof element.focus === "function") {
      element.focus(options);
    }
  }
  setActiveStyles() {
    if (!this._active) {
      this._active = true;
      this._changeDetectorRef.markForCheck();
    }
  }
  setInactiveStyles() {
    if (this._active) {
      this._active = false;
      this._changeDetectorRef.markForCheck();
    }
  }
  getLabel() {
    return this.viewValue;
  }
  _handleKeydown(event) {
    if ((event.keyCode === ENTER || event.keyCode === SPACE) && !hasModifierKey(event)) {
      this._selectViaInteraction();
      event.preventDefault();
    }
  }
  _selectViaInteraction() {
    if (!this.disabled) {
      this._selected = this.multiple ? !this._selected : true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }
  _getTabIndex() {
    return this.disabled ? "-1" : "0";
  }
  _getHostElement() {
    return this._element.nativeElement;
  }
  ngAfterViewChecked() {
    if (this._selected) {
      const viewValue = this.viewValue;
      if (viewValue !== this._mostRecentViewValue) {
        if (this._mostRecentViewValue) {
          this._stateChanges.next();
        }
        this._mostRecentViewValue = viewValue;
      }
    }
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
  _emitSelectionChangeEvent(isUserInput = false) {
    this.onSelectionChange.emit(new MatOptionSelectionChange(this, isUserInput));
  }
  static ɵfac = function MatOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatOption)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatOption,
    selectors: [["mat-option"]],
    viewQuery: function MatOption_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c2, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._text = _t.first);
      }
    },
    hostAttrs: ["role", "option", 1, "mat-mdc-option", "mdc-list-item"],
    hostVars: 11,
    hostBindings: function MatOption_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function MatOption_click_HostBindingHandler() {
          return ctx._selectViaInteraction();
        })("keydown", function MatOption_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
      if (rf & 2) {
        ɵɵdomProperty("id", ctx.id);
        ɵɵattribute("aria-selected", ctx.selected)("aria-disabled", ctx.disabled.toString());
        ɵɵclassProp("mdc-list-item--selected", ctx.selected)("mat-mdc-option-multiple", ctx.multiple)("mat-mdc-option-active", ctx.active)("mdc-list-item--disabled", ctx.disabled);
      }
    },
    inputs: {
      value: "value",
      id: "id",
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      onSelectionChange: "onSelectionChange"
    },
    exportAs: ["matOption"],
    ngContentSelectors: _c4,
    decls: 8,
    vars: 5,
    consts: [["text", ""], ["aria-hidden", "true", 1, "mat-mdc-option-pseudo-checkbox", 3, "disabled", "state"], [1, "mdc-list-item__primary-text"], ["state", "checked", "aria-hidden", "true", "appearance", "minimal", 1, "mat-mdc-option-pseudo-checkbox", 3, "disabled"], [1, "cdk-visually-hidden"], ["aria-hidden", "true", "mat-ripple", "", 1, "mat-mdc-option-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled"]],
    template: function MatOption_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c3);
        ɵɵconditionalCreate(0, MatOption_Conditional_0_Template, 1, 2, "mat-pseudo-checkbox", 1);
        ɵɵprojection(1);
        ɵɵelementStart(2, "span", 2, 0);
        ɵɵprojection(4, 1);
        ɵɵelementEnd();
        ɵɵconditionalCreate(5, MatOption_Conditional_5_Template, 1, 1, "mat-pseudo-checkbox", 3);
        ɵɵconditionalCreate(6, MatOption_Conditional_6_Template, 2, 1, "span", 4);
        ɵɵelement(7, "div", 5);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.multiple ? 0 : -1);
        ɵɵadvance(5);
        ɵɵconditional(!ctx.multiple && ctx.selected && !ctx.hideSingleSelectionIndicator ? 5 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.group && ctx.group._inert ? 6 : -1);
        ɵɵadvance();
        ɵɵproperty("matRippleTrigger", ctx._getHostElement())("matRippleDisabled", ctx.disabled || ctx.disableRipple);
      }
    },
    dependencies: [MatPseudoCheckbox, MatRipple],
    styles: ['.mat-mdc-option {\n  -webkit-user-select: none;\n  user-select: none;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: flex-start;\n  overflow: hidden;\n  min-height: 48px;\n  padding: 0 16px;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));\n  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));\n  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));\n  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));\n  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));\n  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));\n}\n.mat-mdc-option:hover:not(.mdc-list-item--disabled) {\n  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {\n  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));\n  outline: 0;\n}\n.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {\n  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));\n}\n.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {\n  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-option .mat-pseudo-checkbox {\n  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-option.mdc-list-item {\n  align-items: center;\n  background: transparent;\n}\n.mat-mdc-option.mdc-list-item--disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {\n  opacity: 0.38;\n}\n.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {\n  padding-left: 32px;\n}\n[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {\n  padding-left: 16px;\n  padding-right: 32px;\n}\n.mat-mdc-option .mat-icon,\n.mat-mdc-option .mat-pseudo-checkbox-full {\n  margin-right: 16px;\n  flex-shrink: 0;\n}\n[dir=rtl] .mat-mdc-option .mat-icon,\n[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {\n  margin-right: 0;\n  margin-left: 16px;\n}\n.mat-mdc-option .mat-pseudo-checkbox-minimal {\n  margin-left: 16px;\n  flex-shrink: 0;\n}\n[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {\n  margin-right: 16px;\n  margin-left: 0;\n}\n.mat-mdc-option .mat-mdc-option-ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n}\n.mat-mdc-option .mdc-list-item__primary-text {\n  white-space: normal;\n  font-size: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  line-height: inherit;\n  font-family: inherit;\n  text-decoration: inherit;\n  text-transform: inherit;\n  margin-right: auto;\n}\n[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {\n  margin-right: 0;\n  margin-left: auto;\n}\n@media (forced-colors: active) {\n  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {\n    content: "";\n    position: absolute;\n    top: 50%;\n    right: 16px;\n    transform: translateY(-50%);\n    width: 10px;\n    height: 0;\n    border-bottom: solid 10px;\n    border-radius: 10px;\n  }\n  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {\n    right: auto;\n    left: 16px;\n  }\n}\n\n.mat-mdc-option-multiple {\n  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);\n}\n\n.mat-mdc-option-active .mat-focus-indicator::before {\n  content: "";\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatOption, [{
    type: Component,
    args: [{
      selector: "mat-option",
      exportAs: "matOption",
      host: {
        "role": "option",
        "[class.mdc-list-item--selected]": "selected",
        "[class.mat-mdc-option-multiple]": "multiple",
        "[class.mat-mdc-option-active]": "active",
        "[class.mdc-list-item--disabled]": "disabled",
        "[id]": "id",
        "[attr.aria-selected]": "selected",
        "[attr.aria-disabled]": "disabled.toString()",
        "(click)": "_selectViaInteraction()",
        "(keydown)": "_handleKeydown($event)",
        "class": "mat-mdc-option mdc-list-item"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [MatPseudoCheckbox, MatRipple],
      template: `<!-- Set aria-hidden="true" to this DOM node and other decorative nodes in this file. This might
 be contributing to issue where sometimes VoiceOver focuses on a TextNode in the a11y tree instead
 of the Option node (#23202). Most assistive technology will generally ignore non-role,
 non-text-content elements. Adding aria-hidden seems to make VoiceOver behave more consistently. -->
@if (multiple) {
    <mat-pseudo-checkbox
        class="mat-mdc-option-pseudo-checkbox"
        [disabled]="disabled"
        [state]="selected ? 'checked' : 'unchecked'"
        aria-hidden="true"></mat-pseudo-checkbox>
}

<ng-content select="mat-icon"></ng-content>

<span class="mdc-list-item__primary-text" #text><ng-content></ng-content></span>

<!-- Render checkmark at the end for single-selection. -->
@if (!multiple && selected && !hideSingleSelectionIndicator) {
    <mat-pseudo-checkbox
        class="mat-mdc-option-pseudo-checkbox"
        [disabled]="disabled"
        state="checked"
        aria-hidden="true"
        appearance="minimal"></mat-pseudo-checkbox>
}

<!-- See a11y notes inside optgroup.ts for context behind this element. -->
@if (group && group._inert) {
    <span class="cdk-visually-hidden">({{ group.label }})</span>
}

<div class="mat-mdc-option-ripple mat-focus-indicator" aria-hidden="true" mat-ripple
     [matRippleTrigger]="_getHostElement()" [matRippleDisabled]="disabled || disableRipple">
</div>
`,
      styles: ['.mat-mdc-option {\n  -webkit-user-select: none;\n  user-select: none;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: flex-start;\n  overflow: hidden;\n  min-height: 48px;\n  padding: 0 16px;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));\n  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));\n  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));\n  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));\n  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));\n  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));\n}\n.mat-mdc-option:hover:not(.mdc-list-item--disabled) {\n  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {\n  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));\n  outline: 0;\n}\n.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {\n  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));\n}\n.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {\n  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-option .mat-pseudo-checkbox {\n  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-option.mdc-list-item {\n  align-items: center;\n  background: transparent;\n}\n.mat-mdc-option.mdc-list-item--disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {\n  opacity: 0.38;\n}\n.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {\n  padding-left: 32px;\n}\n[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {\n  padding-left: 16px;\n  padding-right: 32px;\n}\n.mat-mdc-option .mat-icon,\n.mat-mdc-option .mat-pseudo-checkbox-full {\n  margin-right: 16px;\n  flex-shrink: 0;\n}\n[dir=rtl] .mat-mdc-option .mat-icon,\n[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {\n  margin-right: 0;\n  margin-left: 16px;\n}\n.mat-mdc-option .mat-pseudo-checkbox-minimal {\n  margin-left: 16px;\n  flex-shrink: 0;\n}\n[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {\n  margin-right: 16px;\n  margin-left: 0;\n}\n.mat-mdc-option .mat-mdc-option-ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n}\n.mat-mdc-option .mdc-list-item__primary-text {\n  white-space: normal;\n  font-size: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  line-height: inherit;\n  font-family: inherit;\n  text-decoration: inherit;\n  text-transform: inherit;\n  margin-right: auto;\n}\n[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {\n  margin-right: 0;\n  margin-left: auto;\n}\n@media (forced-colors: active) {\n  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {\n    content: "";\n    position: absolute;\n    top: 50%;\n    right: 16px;\n    transform: translateY(-50%);\n    width: 10px;\n    height: 0;\n    border-bottom: solid 10px;\n    border-radius: 10px;\n  }\n  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {\n    right: auto;\n    left: 16px;\n  }\n}\n\n.mat-mdc-option-multiple {\n  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);\n}\n\n.mat-mdc-option-active .mat-focus-indicator::before {\n  content: "";\n}\n']
    }]
  }], () => [], {
    value: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onSelectionChange: [{
      type: Output
    }],
    _text: [{
      type: ViewChild,
      args: ["text", {
        static: true
      }]
    }]
  });
})();
function _countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
  if (optionGroups.length) {
    let optionsArray = options.toArray();
    let groups = optionGroups.toArray();
    let groupCounter = 0;
    for (let i = 0; i < optionIndex + 1; i++) {
      if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
        groupCounter++;
      }
    }
    return groupCounter;
  }
  return 0;
}
function _getOptionScrollPosition(optionOffset, optionHeight, currentScrollPosition, panelHeight) {
  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }
  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }
  return currentScrollPosition;
}

// node_modules/@angular/material/fesm2022/_ripple-module-chunk.mjs
var MatRippleModule = class _MatRippleModule {
  static ɵfac = function MatRippleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRippleModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatRippleModule,
    imports: [MatRipple],
    exports: [MatRipple, BidiModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleModule, [{
    type: NgModule,
    args: [{
      imports: [MatRipple],
      exports: [MatRipple, BidiModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_pseudo-checkbox-module-chunk.mjs
var MatPseudoCheckboxModule = class _MatPseudoCheckboxModule {
  static ɵfac = function MatPseudoCheckboxModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPseudoCheckboxModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatPseudoCheckboxModule,
    imports: [MatPseudoCheckbox],
    exports: [MatPseudoCheckbox, BidiModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPseudoCheckboxModule, [{
    type: NgModule,
    args: [{
      imports: [MatPseudoCheckbox],
      exports: [MatPseudoCheckbox, BidiModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_option-module-chunk.mjs
var MatOptionModule = class _MatOptionModule {
  static ɵfac = function MatOptionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatOptionModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatOptionModule,
    imports: [MatRippleModule, MatPseudoCheckboxModule, MatOption, MatOptgroup],
    exports: [MatOption, MatOptgroup, BidiModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MatRippleModule, MatPseudoCheckboxModule, MatOption, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatOptionModule, [{
    type: NgModule,
    args: [{
      imports: [MatRippleModule, MatPseudoCheckboxModule, MatOption, MatOptgroup],
      exports: [MatOption, MatOptgroup, BidiModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/select.mjs
var _c02 = ["trigger"];
var _c12 = ["panel"];
var _c22 = [[["mat-select-trigger"]], "*"];
var _c32 = ["mat-select-trigger", "*"];
function MatSelect_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.placeholder);
  }
}
function MatSelect_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function MatSelect_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 11);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.triggerValue);
  }
}
function MatSelect_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵconditionalCreate(1, MatSelect_Conditional_5_Conditional_1_Template, 1, 0)(2, MatSelect_Conditional_5_Conditional_2_Template, 2, 1, "span", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.customTrigger ? 1 : 2);
  }
}
function MatSelect_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 12, 1);
    ɵɵlistener("keydown", function MatSelect_ng_template_10_Template_div_keydown_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._handleKeydown($event));
    });
    ɵɵprojection(2, 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.panelClass);
    ɵɵclassProp("mat-select-panel-animations-enabled", !ctx_r0._animationsDisabled)("mat-primary", (ctx_r0._parentFormField == null ? null : ctx_r0._parentFormField.color) === "primary")("mat-accent", (ctx_r0._parentFormField == null ? null : ctx_r0._parentFormField.color) === "accent")("mat-warn", (ctx_r0._parentFormField == null ? null : ctx_r0._parentFormField.color) === "warn")("mat-undefined", !(ctx_r0._parentFormField == null ? null : ctx_r0._parentFormField.color));
    ɵɵattribute("id", ctx_r0.id + "-panel")("aria-multiselectable", ctx_r0.multiple)("aria-label", ctx_r0.ariaLabel || null)("aria-labelledby", ctx_r0._getPanelAriaLabelledby());
  }
}
function getMatSelectDynamicMultipleError() {
  return Error("Cannot change `multiple` mode of select after initialization.");
}
function getMatSelectNonArrayValueError() {
  return Error("Value must be an array in multiple-selection mode.");
}
function getMatSelectNonFunctionValueError() {
  return Error("`compareWith` must be a function.");
}
var MAT_SELECT_SCROLL_STRATEGY = new InjectionToken("mat-select-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector);
  }
});
var MAT_SELECT_CONFIG = new InjectionToken("MAT_SELECT_CONFIG");
var MAT_SELECT_TRIGGER = new InjectionToken("MatSelectTrigger");
var MatSelectChange = class {
  source;
  value;
  constructor(source, value) {
    this.source = source;
    this.value = value;
  }
};
var MatSelect = class _MatSelect {
  _viewportRuler = inject(ViewportRuler);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _dir = inject(Directionality, {
    optional: true
  });
  _idGenerator = inject(_IdGenerator);
  _renderer = inject(Renderer2);
  _parentFormField = inject(MAT_FORM_FIELD, {
    optional: true
  });
  ngControl = inject(NgControl, {
    self: true,
    optional: true
  });
  _liveAnnouncer = inject(LiveAnnouncer);
  _defaultOptions = inject(MAT_SELECT_CONFIG, {
    optional: true
  });
  _animationsDisabled = _animationsDisabled();
  _popoverLocation;
  _initialized = new Subject();
  _cleanupDetach;
  options;
  optionGroups;
  customTrigger;
  _positions = [{
    originX: "start",
    originY: "bottom",
    overlayX: "start",
    overlayY: "top"
  }, {
    originX: "end",
    originY: "bottom",
    overlayX: "end",
    overlayY: "top"
  }, {
    originX: "start",
    originY: "top",
    overlayX: "start",
    overlayY: "bottom",
    panelClass: "mat-mdc-select-panel-above"
  }, {
    originX: "end",
    originY: "top",
    overlayX: "end",
    overlayY: "bottom",
    panelClass: "mat-mdc-select-panel-above"
  }];
  _scrollOptionIntoView(index) {
    const option = this.options.toArray()[index];
    if (option) {
      const panel = this.panel.nativeElement;
      const labelCount = _countGroupLabelsBeforeOption(index, this.options, this.optionGroups);
      const element = option._getHostElement();
      if (index === 0 && labelCount === 1) {
        panel.scrollTop = 0;
      } else {
        panel.scrollTop = _getOptionScrollPosition(element.offsetTop, element.offsetHeight, panel.scrollTop, panel.offsetHeight);
      }
    }
  }
  _positioningSettled() {
    this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
  }
  _getChangeEvent(value) {
    return new MatSelectChange(this, value);
  }
  _scrollStrategyFactory = inject(MAT_SELECT_SCROLL_STRATEGY);
  _panelOpen = false;
  _compareWith = (o1, o2) => o1 === o2;
  _uid = this._idGenerator.getId("mat-select-");
  _triggerAriaLabelledBy = null;
  _previousControl;
  _destroy = new Subject();
  _errorStateTracker;
  stateChanges = new Subject();
  disableAutomaticLabeling = true;
  userAriaDescribedBy;
  _selectionModel;
  _keyManager;
  _preferredOverlayOrigin;
  _overlayWidth;
  _onChange = () => {
  };
  _onTouched = () => {
  };
  _valueId = this._idGenerator.getId("mat-select-value-");
  _scrollStrategy;
  _overlayPanelClass = this._defaultOptions?.overlayPanelClass || "";
  get focused() {
    return this._focused || this._panelOpen;
  }
  _focused = false;
  controlType = "mat-select";
  trigger;
  panel;
  _overlayDir;
  panelClass;
  disabled = false;
  get disableRipple() {
    return this._disableRipple();
  }
  set disableRipple(value) {
    this._disableRipple.set(value);
  }
  _disableRipple = signal(false, ...ngDevMode ? [{
    debugName: "_disableRipple"
  }] : []);
  tabIndex = 0;
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = value;
    this._syncParentProperties();
  }
  _hideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? false;
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  _placeholder;
  get required() {
    return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }
  set required(value) {
    this._required = value;
    this.stateChanges.next();
  }
  _required;
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    if (this._selectionModel && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatSelectDynamicMultipleError();
    }
    this._multiple = value;
  }
  _multiple = false;
  disableOptionCentering = this._defaultOptions?.disableOptionCentering ?? false;
  get compareWith() {
    return this._compareWith;
  }
  set compareWith(fn) {
    if (typeof fn !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatSelectNonFunctionValueError();
    }
    this._compareWith = fn;
    if (this._selectionModel) {
      this._initializeSelection();
    }
  }
  get value() {
    return this._value;
  }
  set value(newValue) {
    const hasAssigned = this._assignValue(newValue);
    if (hasAssigned) {
      this._onChange(newValue);
    }
  }
  _value;
  ariaLabel = "";
  ariaLabelledby;
  get errorStateMatcher() {
    return this._errorStateTracker.matcher;
  }
  set errorStateMatcher(value) {
    this._errorStateTracker.matcher = value;
  }
  typeaheadDebounceInterval;
  sortComparator;
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value || this._uid;
    this.stateChanges.next();
  }
  _id;
  get errorState() {
    return this._errorStateTracker.errorState;
  }
  set errorState(value) {
    this._errorStateTracker.errorState = value;
  }
  panelWidth = this._defaultOptions && typeof this._defaultOptions.panelWidth !== "undefined" ? this._defaultOptions.panelWidth : "auto";
  canSelectNullableOptions = this._defaultOptions?.canSelectNullableOptions ?? false;
  optionSelectionChanges = defer(() => {
    const options = this.options;
    if (options) {
      return options.changes.pipe(startWith(options), switchMap(() => merge(...options.map((option) => option.onSelectionChange))));
    }
    return this._initialized.pipe(switchMap(() => this.optionSelectionChanges));
  });
  openedChange = new EventEmitter();
  _openedStream = this.openedChange.pipe(filter((o) => o), map(() => {
  }));
  _closedStream = this.openedChange.pipe(filter((o) => !o), map(() => {
  }));
  selectionChange = new EventEmitter();
  valueChange = new EventEmitter();
  constructor() {
    const defaultErrorStateMatcher = inject(ErrorStateMatcher);
    const parentForm = inject(NgForm, {
      optional: true
    });
    const parentFormGroup = inject(FormGroupDirective, {
      optional: true
    });
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    const defaultPopoverConfig = inject(OVERLAY_DEFAULT_CONFIG, {
      optional: true
    });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    if (this._defaultOptions?.typeaheadDebounceInterval != null) {
      this.typeaheadDebounceInterval = this._defaultOptions.typeaheadDebounceInterval;
    }
    this._errorStateTracker = new _ErrorStateTracker(defaultErrorStateMatcher, this.ngControl, parentFormGroup, parentForm, this.stateChanges);
    this._scrollStrategy = this._scrollStrategyFactory();
    this.tabIndex = tabIndex == null ? 0 : parseInt(tabIndex) || 0;
    this._popoverLocation = defaultPopoverConfig?.usePopover === false ? null : "inline";
    this.id = this.id;
  }
  ngOnInit() {
    this._selectionModel = new SelectionModel(this.multiple);
    this.stateChanges.next();
    this._viewportRuler.change().pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this.panelOpen) {
        this._overlayWidth = this._getOverlayWidth(this._preferredOverlayOrigin);
        this._changeDetectorRef.detectChanges();
      }
    });
  }
  ngAfterContentInit() {
    this._initialized.next();
    this._initialized.complete();
    this._initKeyManager();
    this._selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe((event) => {
      event.added.forEach((option) => option.select());
      event.removed.forEach((option) => option.deselect());
    });
    this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._initializeSelection();
    });
  }
  ngDoCheck() {
    const newAriaLabelledby = this._getTriggerAriaLabelledby();
    const ngControl = this.ngControl;
    if (newAriaLabelledby !== this._triggerAriaLabelledBy) {
      const element = this._elementRef.nativeElement;
      this._triggerAriaLabelledBy = newAriaLabelledby;
      if (newAriaLabelledby) {
        element.setAttribute("aria-labelledby", newAriaLabelledby);
      } else {
        element.removeAttribute("aria-labelledby");
      }
    }
    if (ngControl) {
      if (this._previousControl !== ngControl.control) {
        if (this._previousControl !== void 0 && ngControl.disabled !== null && ngControl.disabled !== this.disabled) {
          this.disabled = ngControl.disabled;
        }
        this._previousControl = ngControl.control;
      }
      this.updateErrorState();
    }
  }
  ngOnChanges(changes) {
    if (changes["disabled"] || changes["userAriaDescribedBy"]) {
      this.stateChanges.next();
    }
    if (changes["typeaheadDebounceInterval"] && this._keyManager) {
      this._keyManager.withTypeAhead(this.typeaheadDebounceInterval);
    }
    if (changes["panelClass"] && this.panelClass instanceof Set) {
      this.panelClass = Array.from(this.panelClass);
    }
  }
  ngOnDestroy() {
    this._cleanupDetach?.();
    this._keyManager?.destroy();
    this._destroy.next();
    this._destroy.complete();
    this.stateChanges.complete();
    this._clearFromModal();
  }
  toggle() {
    this.panelOpen ? this.close() : this.open();
  }
  open() {
    if (!this._canOpen()) {
      return;
    }
    if (this._parentFormField) {
      this._preferredOverlayOrigin = this._parentFormField.getConnectedOverlayOrigin();
    }
    this._cleanupDetach?.();
    this._overlayWidth = this._getOverlayWidth(this._preferredOverlayOrigin);
    this._applyModalPanelOwnership();
    this._panelOpen = true;
    this._overlayDir.positionChange.pipe(take(1)).subscribe(() => {
      this._changeDetectorRef.detectChanges();
      this._positioningSettled();
    });
    this._overlayDir.attachOverlay();
    this._keyManager.withHorizontalOrientation(null);
    this._highlightCorrectOption();
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
    Promise.resolve().then(() => this.openedChange.emit(true));
  }
  _trackedModal = null;
  _applyModalPanelOwnership() {
    const modal = this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');
    if (!modal) {
      return;
    }
    const panelId = `${this.id}-panel`;
    if (this._trackedModal) {
      removeAriaReferencedId(this._trackedModal, "aria-owns", panelId);
    }
    addAriaReferencedId(modal, "aria-owns", panelId);
    this._trackedModal = modal;
  }
  _clearFromModal() {
    if (!this._trackedModal) {
      return;
    }
    const panelId = `${this.id}-panel`;
    removeAriaReferencedId(this._trackedModal, "aria-owns", panelId);
    this._trackedModal = null;
  }
  close() {
    if (this._panelOpen) {
      this._panelOpen = false;
      this._exitAndDetach();
      this._keyManager.withHorizontalOrientation(this._isRtl() ? "rtl" : "ltr");
      this._changeDetectorRef.markForCheck();
      this._onTouched();
      this.stateChanges.next();
      Promise.resolve().then(() => this.openedChange.emit(false));
    }
  }
  _exitAndDetach() {
    if (this._animationsDisabled || !this.panel) {
      this._detachOverlay();
      return;
    }
    this._cleanupDetach?.();
    this._cleanupDetach = () => {
      cleanupEvent();
      clearTimeout(exitFallbackTimer);
      this._cleanupDetach = void 0;
    };
    const panel = this.panel.nativeElement;
    const cleanupEvent = this._renderer.listen(panel, "animationend", (event) => {
      if (event.animationName === "_mat-select-exit") {
        this._cleanupDetach?.();
        this._detachOverlay();
      }
    });
    const exitFallbackTimer = setTimeout(() => {
      this._cleanupDetach?.();
      this._detachOverlay();
    }, 200);
    panel.classList.add("mat-select-panel-exit");
  }
  _detachOverlay() {
    this._overlayDir.detachOverlay();
    this._changeDetectorRef.markForCheck();
  }
  writeValue(value) {
    this._assignValue(value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }
  get panelOpen() {
    return this._panelOpen;
  }
  get selected() {
    return this.multiple ? this._selectionModel?.selected || [] : this._selectionModel?.selected[0];
  }
  get triggerValue() {
    if (this.empty) {
      return "";
    }
    if (this._multiple) {
      const selectedOptions = this._selectionModel.selected.map((option) => option.viewValue);
      if (this._isRtl()) {
        selectedOptions.reverse();
      }
      return selectedOptions.join(", ");
    }
    return this._selectionModel.selected[0].viewValue;
  }
  updateErrorState() {
    this._errorStateTracker.updateErrorState();
  }
  _isRtl() {
    return this._dir ? this._dir.value === "rtl" : false;
  }
  _handleKeydown(event) {
    if (!this.disabled) {
      this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
    }
  }
  _handleClosedKeydown(event) {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
    const isOpenKey = keyCode === ENTER || keyCode === SPACE;
    const manager = this._keyManager;
    if (!manager.isTyping() && isOpenKey && !hasModifierKey(event) || (this.multiple || event.altKey) && isArrowKey) {
      event.preventDefault();
      this.open();
    } else if (!this.multiple) {
      const previouslySelectedOption = this.selected;
      manager.onKeydown(event);
      const selectedOption = this.selected;
      if (selectedOption && previouslySelectedOption !== selectedOption) {
        this._liveAnnouncer.announce(selectedOption.viewValue, 1e4);
      }
    }
  }
  _handleOpenKeydown(event) {
    const manager = this._keyManager;
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const isTyping = manager.isTyping();
    if (isArrowKey && event.altKey) {
      event.preventDefault();
      this.close();
    } else if (!isTyping && (keyCode === ENTER || keyCode === SPACE) && manager.activeItem && !hasModifierKey(event)) {
      event.preventDefault();
      manager.activeItem._selectViaInteraction();
    } else if (!isTyping && this._multiple && keyCode === A && event.ctrlKey) {
      event.preventDefault();
      const hasDeselectedOptions = this.options.some((opt) => !opt.disabled && !opt.selected);
      this.options.forEach((option) => {
        if (!option.disabled) {
          hasDeselectedOptions ? option.select() : option.deselect();
        }
      });
    } else {
      const previouslyFocusedIndex = manager.activeItemIndex;
      manager.onKeydown(event);
      if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem && manager.activeItemIndex !== previouslyFocusedIndex) {
        manager.activeItem._selectViaInteraction();
      }
    }
  }
  _handleOverlayKeydown(event) {
    if (event.keyCode === ESCAPE && !hasModifierKey(event)) {
      event.preventDefault();
      this.close();
    }
  }
  _onFocus() {
    if (!this.disabled) {
      this._focused = true;
      this.stateChanges.next();
    }
  }
  _onBlur() {
    this._focused = false;
    this._keyManager?.cancelTypeahead();
    if (!this.disabled && !this.panelOpen) {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
      this.stateChanges.next();
    }
  }
  get empty() {
    return !this._selectionModel || this._selectionModel.isEmpty();
  }
  _initializeSelection() {
    Promise.resolve().then(() => {
      if (this.ngControl) {
        this._value = this.ngControl.value;
      }
      this._setSelectionByValue(this._value);
      this.stateChanges.next();
    });
  }
  _setSelectionByValue(value) {
    this.options.forEach((option) => option.setInactiveStyles());
    this._selectionModel.clear();
    if (this.multiple && value) {
      if (!Array.isArray(value) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw getMatSelectNonArrayValueError();
      }
      value.forEach((currentValue) => this._selectOptionByValue(currentValue));
      this._sortValues();
    } else {
      const correspondingOption = this._selectOptionByValue(value);
      if (correspondingOption) {
        this._keyManager.updateActiveItem(correspondingOption);
      } else if (!this.panelOpen) {
        this._keyManager.updateActiveItem(-1);
      }
    }
    this._changeDetectorRef.markForCheck();
  }
  _selectOptionByValue(value) {
    const correspondingOption = this.options.find((option) => {
      if (this._selectionModel.isSelected(option)) {
        return false;
      }
      try {
        return (option.value != null || this.canSelectNullableOptions) && this._compareWith(option.value, value);
      } catch (error) {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          console.warn(error);
        }
        return false;
      }
    });
    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }
    return correspondingOption;
  }
  _assignValue(newValue) {
    if (newValue !== this._value || this._multiple && Array.isArray(newValue)) {
      if (this.options) {
        this._setSelectionByValue(newValue);
      }
      this._value = newValue;
      return true;
    }
    return false;
  }
  _skipPredicate = (option) => {
    if (this.panelOpen) {
      return false;
    }
    return option.disabled;
  };
  _getOverlayWidth(preferredOrigin) {
    if (this.panelWidth === "auto") {
      const refToMeasure = preferredOrigin instanceof CdkOverlayOrigin ? preferredOrigin.elementRef : preferredOrigin || this._elementRef;
      return refToMeasure.nativeElement.getBoundingClientRect().width;
    }
    return this.panelWidth === null ? "" : this.panelWidth;
  }
  _syncParentProperties() {
    if (this.options) {
      for (const option of this.options) {
        option._changeDetectorRef.markForCheck();
      }
    }
  }
  _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl() ? "rtl" : "ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate);
    this._keyManager.tabOut.subscribe(() => {
      if (this.panelOpen) {
        if (!this.multiple && this._keyManager.activeItem) {
          this._keyManager.activeItem._selectViaInteraction();
        }
        this.focus();
        this.close();
      }
    });
    this._keyManager.change.subscribe(() => {
      if (this._panelOpen && this.panel) {
        this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
      } else if (!this._panelOpen && !this.multiple && this._keyManager.activeItem) {
        this._keyManager.activeItem._selectViaInteraction();
      }
    });
  }
  _resetOptions() {
    const changedOrDestroyed = merge(this.options.changes, this._destroy);
    this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed)).subscribe((event) => {
      this._onSelect(event.source, event.isUserInput);
      if (event.isUserInput && !this.multiple && this._panelOpen) {
        this.close();
        this.focus();
      }
    });
    merge(...this.options.map((option) => option._stateChanges)).pipe(takeUntil(changedOrDestroyed)).subscribe(() => {
      this._changeDetectorRef.detectChanges();
      this.stateChanges.next();
    });
  }
  _onSelect(option, isUserInput) {
    const wasSelected = this._selectionModel.isSelected(option);
    if (!this.canSelectNullableOptions && option.value == null && !this._multiple) {
      option.deselect();
      this._selectionModel.clear();
      if (this.value != null) {
        this._propagateChanges(option.value);
      }
    } else {
      if (wasSelected !== option.selected) {
        option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
      }
      if (isUserInput) {
        this._keyManager.setActiveItem(option);
      }
      if (this.multiple) {
        this._sortValues();
        if (isUserInput) {
          this.focus();
        }
      }
    }
    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }
    this.stateChanges.next();
  }
  _sortValues() {
    if (this.multiple) {
      const options = this.options.toArray();
      this._selectionModel.sort((a, b) => {
        return this.sortComparator ? this.sortComparator(a, b, options) : options.indexOf(a) - options.indexOf(b);
      });
      this.stateChanges.next();
    }
  }
  _propagateChanges(fallbackValue) {
    let valueToEmit;
    if (this.multiple) {
      valueToEmit = this.selected.map((option) => option.value);
    } else {
      valueToEmit = this.selected ? this.selected.value : fallbackValue;
    }
    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(this._getChangeEvent(valueToEmit));
    this._changeDetectorRef.markForCheck();
  }
  _highlightCorrectOption() {
    if (this._keyManager) {
      if (this.empty) {
        let firstEnabledOptionIndex = -1;
        for (let index = 0; index < this.options.length; index++) {
          const option = this.options.get(index);
          if (!option.disabled) {
            firstEnabledOptionIndex = index;
            break;
          }
        }
        this._keyManager.setActiveItem(firstEnabledOptionIndex);
      } else {
        this._keyManager.setActiveItem(this._selectionModel.selected[0]);
      }
    }
  }
  _canOpen() {
    return !this._panelOpen && !this.disabled && this.options?.length > 0 && !!this._overlayDir;
  }
  focus(options) {
    this._elementRef.nativeElement.focus(options);
  }
  _getPanelAriaLabelledby() {
    if (this.ariaLabel) {
      return null;
    }
    const labelId = this._parentFormField?.getLabelId() || null;
    const labelExpression = labelId ? labelId + " " : "";
    return this.ariaLabelledby ? labelExpression + this.ariaLabelledby : labelId;
  }
  _getAriaActiveDescendant() {
    if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
      return this._keyManager.activeItem.id;
    }
    return null;
  }
  _getTriggerAriaLabelledby() {
    if (this.ariaLabel) {
      return null;
    }
    let value = this._parentFormField?.getLabelId() || "";
    if (this.ariaLabelledby) {
      value += " " + this.ariaLabelledby;
    }
    if (!value) {
      value = this._valueId;
    }
    return value;
  }
  get describedByIds() {
    const element = this._elementRef.nativeElement;
    const existingDescribedBy = element.getAttribute("aria-describedby");
    return existingDescribedBy?.split(" ") || [];
  }
  setDescribedByIds(ids) {
    const element = this._elementRef.nativeElement;
    if (ids.length) {
      element.setAttribute("aria-describedby", ids.join(" "));
    } else {
      element.removeAttribute("aria-describedby");
    }
  }
  onContainerClick(event) {
    const target = _getEventTarget(event);
    if (target && (target.tagName === "MAT-OPTION" || target.classList.contains("cdk-overlay-backdrop") || target.closest(".mat-mdc-select-panel"))) {
      return;
    }
    this.focus();
    this.open();
  }
  get shouldLabelFloat() {
    return this.panelOpen || !this.empty || this.focused && !!this.placeholder;
  }
  static ɵfac = function MatSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSelect)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatSelect,
    selectors: [["mat-select"]],
    contentQueries: function MatSelect_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MAT_SELECT_TRIGGER, 5)(dirIndex, MatOption, 5)(dirIndex, MAT_OPTGROUP, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customTrigger = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.options = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.optionGroups = _t);
      }
    },
    viewQuery: function MatSelect_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c02, 5)(_c12, 5)(CdkConnectedOverlay, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.trigger = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.panel = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._overlayDir = _t.first);
      }
    },
    hostAttrs: ["role", "combobox", "aria-haspopup", "listbox", 1, "mat-mdc-select"],
    hostVars: 21,
    hostBindings: function MatSelect_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown", function MatSelect_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        })("focus", function MatSelect_focus_HostBindingHandler() {
          return ctx._onFocus();
        })("blur", function MatSelect_blur_HostBindingHandler() {
          return ctx._onBlur();
        });
      }
      if (rf & 2) {
        ɵɵattribute("id", ctx.id)("tabindex", ctx.disabled ? -1 : ctx.tabIndex)("aria-controls", ctx.panelOpen ? ctx.id + "-panel" : null)("aria-expanded", ctx.panelOpen)("aria-label", ctx.ariaLabel || null)("aria-required", ctx.required.toString())("aria-disabled", ctx.disabled.toString())("aria-invalid", ctx.errorState)("aria-activedescendant", ctx._getAriaActiveDescendant());
        ɵɵclassProp("mat-mdc-select-disabled", ctx.disabled)("mat-mdc-select-invalid", ctx.errorState)("mat-mdc-select-required", ctx.required)("mat-mdc-select-empty", ctx.empty)("mat-mdc-select-multiple", ctx.multiple)("mat-select-open", ctx.panelOpen);
      }
    },
    inputs: {
      userAriaDescribedBy: [0, "aria-describedby", "userAriaDescribedBy"],
      panelClass: "panelClass",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
      hideSingleSelectionIndicator: [2, "hideSingleSelectionIndicator", "hideSingleSelectionIndicator", booleanAttribute],
      placeholder: "placeholder",
      required: [2, "required", "required", booleanAttribute],
      multiple: [2, "multiple", "multiple", booleanAttribute],
      disableOptionCentering: [2, "disableOptionCentering", "disableOptionCentering", booleanAttribute],
      compareWith: "compareWith",
      value: "value",
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      errorStateMatcher: "errorStateMatcher",
      typeaheadDebounceInterval: [2, "typeaheadDebounceInterval", "typeaheadDebounceInterval", numberAttribute],
      sortComparator: "sortComparator",
      id: "id",
      panelWidth: "panelWidth",
      canSelectNullableOptions: [2, "canSelectNullableOptions", "canSelectNullableOptions", booleanAttribute]
    },
    outputs: {
      openedChange: "openedChange",
      _openedStream: "opened",
      _closedStream: "closed",
      selectionChange: "selectionChange",
      valueChange: "valueChange"
    },
    exportAs: ["matSelect"],
    features: [ɵɵProvidersFeature([{
      provide: MatFormFieldControl,
      useExisting: _MatSelect
    }, {
      provide: MAT_OPTION_PARENT_COMPONENT,
      useExisting: _MatSelect
    }]), ɵɵNgOnChangesFeature],
    ngContentSelectors: _c32,
    decls: 11,
    vars: 10,
    consts: [["fallbackOverlayOrigin", "cdkOverlayOrigin", "trigger", ""], ["panel", ""], ["cdk-overlay-origin", "", 1, "mat-mdc-select-trigger", 3, "click"], [1, "mat-mdc-select-value"], [1, "mat-mdc-select-placeholder", "mat-mdc-select-min-line"], [1, "mat-mdc-select-value-text"], [1, "mat-mdc-select-arrow-wrapper"], [1, "mat-mdc-select-arrow"], ["viewBox", "0 0 24 24", "width", "24px", "height", "24px", "focusable", "false", "aria-hidden", "true"], ["d", "M7 10l5 5 5-5z"], ["cdk-connected-overlay", "", "cdkConnectedOverlayHasBackdrop", "", "cdkConnectedOverlayBackdropClass", "cdk-overlay-transparent-backdrop", 3, "detach", "backdropClick", "overlayKeydown", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayWidth", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayUsePopover"], [1, "mat-mdc-select-min-line"], ["role", "listbox", "tabindex", "-1", 1, "mat-mdc-select-panel", "mdc-menu-surface", "mdc-menu-surface--open", 3, "keydown"]],
    template: function MatSelect_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c22);
        ɵɵelementStart(0, "div", 2, 0);
        ɵɵlistener("click", function MatSelect_Template_div_click_0_listener() {
          return ctx.open();
        });
        ɵɵelementStart(3, "div", 3);
        ɵɵconditionalCreate(4, MatSelect_Conditional_4_Template, 2, 1, "span", 4)(5, MatSelect_Conditional_5_Template, 3, 1, "span", 5);
        ɵɵelementEnd();
        ɵɵelementStart(6, "div", 6)(7, "div", 7);
        ɵɵnamespaceSVG();
        ɵɵelementStart(8, "svg", 8);
        ɵɵelement(9, "path", 9);
        ɵɵelementEnd()()()();
        ɵɵtemplate(10, MatSelect_ng_template_10_Template, 3, 16, "ng-template", 10);
        ɵɵlistener("detach", function MatSelect_Template_ng_template_detach_10_listener() {
          return ctx.close();
        })("backdropClick", function MatSelect_Template_ng_template_backdropClick_10_listener() {
          return ctx.close();
        })("overlayKeydown", function MatSelect_Template_ng_template_overlayKeydown_10_listener($event) {
          return ctx._handleOverlayKeydown($event);
        });
      }
      if (rf & 2) {
        const fallbackOverlayOrigin_r3 = ɵɵreference(1);
        ɵɵadvance(3);
        ɵɵattribute("id", ctx._valueId);
        ɵɵadvance();
        ɵɵconditional(ctx.empty ? 4 : 5);
        ɵɵadvance(6);
        ɵɵproperty("cdkConnectedOverlayDisableClose", true)("cdkConnectedOverlayPanelClass", ctx._overlayPanelClass)("cdkConnectedOverlayScrollStrategy", ctx._scrollStrategy)("cdkConnectedOverlayOrigin", ctx._preferredOverlayOrigin || fallbackOverlayOrigin_r3)("cdkConnectedOverlayPositions", ctx._positions)("cdkConnectedOverlayWidth", ctx._overlayWidth)("cdkConnectedOverlayFlexibleDimensions", true)("cdkConnectedOverlayUsePopover", ctx._popoverLocation);
      }
    },
    dependencies: [CdkOverlayOrigin, CdkConnectedOverlay],
    styles: ['@keyframes _mat-select-enter {\n  from {\n    opacity: 0;\n    transform: scaleY(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _mat-select-exit {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mat-mdc-select {\n  display: inline-block;\n  width: 100%;\n  outline: none;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));\n  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));\n  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));\n  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));\n  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));\n  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));\n}\n\ndiv.mat-mdc-select-panel {\n  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));\n}\n\n.mat-mdc-select-disabled {\n  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-select-disabled .mat-mdc-select-placeholder {\n  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-select-trigger {\n  display: inline-flex;\n  align-items: center;\n  cursor: pointer;\n  position: relative;\n  box-sizing: border-box;\n  width: 100%;\n}\n.mat-mdc-select-disabled .mat-mdc-select-trigger {\n  -webkit-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n\n.mat-mdc-select-value {\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.mat-mdc-select-value-text {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-mdc-select-arrow-wrapper {\n  height: 24px;\n  flex-shrink: 0;\n  display: inline-flex;\n  align-items: center;\n}\n.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {\n  transform: none;\n}\n\n.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,\n.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {\n  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));\n}\n\n.mat-mdc-select-arrow {\n  width: 10px;\n  height: 5px;\n  position: relative;\n  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {\n  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));\n}\n.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {\n  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-select-open .mat-mdc-select-arrow {\n  transform: rotate(180deg);\n}\n.mat-form-field-animations-enabled .mat-mdc-select-arrow {\n  transition: transform 80ms linear;\n}\n.mat-mdc-select-arrow svg {\n  fill: currentColor;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n@media (forced-colors: active) {\n  .mat-mdc-select-arrow svg {\n    fill: CanvasText;\n  }\n  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {\n    fill: GrayText;\n  }\n}\n\ndiv.mat-mdc-select-panel {\n  width: 100%;\n  max-height: 275px;\n  outline: 0;\n  overflow: auto;\n  padding: 8px 0;\n  box-sizing: border-box;\n  transform-origin: top center;\n  border-radius: 0 0 4px 4px;\n  position: relative;\n  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));\n}\n.mat-mdc-select-panel-above div.mat-mdc-select-panel {\n  border-radius: 4px 4px 0 0;\n  transform-origin: bottom center;\n}\n@media (forced-colors: active) {\n  div.mat-mdc-select-panel {\n    outline: solid 1px;\n  }\n}\n\n.mat-select-panel-animations-enabled {\n  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mat-select-panel-animations-enabled.mat-select-panel-exit {\n  animation: _mat-select-exit 100ms linear;\n}\n\n.mat-mdc-select-placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {\n  transition: none;\n}\n.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n  display: block;\n}\n\n.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {\n  cursor: pointer;\n}\n.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {\n  max-width: calc(100% - 18px);\n}\n.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {\n  max-width: calc(100% / 0.75 - 24px);\n}\n.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {\n  max-width: calc(100% - 60px);\n}\n.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {\n  max-width: calc(100% - 24px);\n}\n\n.mat-mdc-select-min-line:empty::before {\n  content: " ";\n  white-space: pre;\n  width: 1px;\n  display: inline-block;\n  visibility: hidden;\n}\n\n.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {\n  transform: var(--mat-select-arrow-transform, translateY(-8px));\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSelect, [{
    type: Component,
    args: [{
      selector: "mat-select",
      exportAs: "matSelect",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "role": "combobox",
        "aria-haspopup": "listbox",
        "class": "mat-mdc-select",
        "[attr.id]": "id",
        "[attr.tabindex]": "disabled ? -1 : tabIndex",
        "[attr.aria-controls]": 'panelOpen ? id + "-panel" : null',
        "[attr.aria-expanded]": "panelOpen",
        "[attr.aria-label]": "ariaLabel || null",
        "[attr.aria-required]": "required.toString()",
        "[attr.aria-disabled]": "disabled.toString()",
        "[attr.aria-invalid]": "errorState",
        "[attr.aria-activedescendant]": "_getAriaActiveDescendant()",
        "[class.mat-mdc-select-disabled]": "disabled",
        "[class.mat-mdc-select-invalid]": "errorState",
        "[class.mat-mdc-select-required]": "required",
        "[class.mat-mdc-select-empty]": "empty",
        "[class.mat-mdc-select-multiple]": "multiple",
        "[class.mat-select-open]": "panelOpen",
        "(keydown)": "_handleKeydown($event)",
        "(focus)": "_onFocus()",
        "(blur)": "_onBlur()"
      },
      providers: [{
        provide: MatFormFieldControl,
        useExisting: MatSelect
      }, {
        provide: MAT_OPTION_PARENT_COMPONENT,
        useExisting: MatSelect
      }],
      imports: [CdkOverlayOrigin, CdkConnectedOverlay],
      template: `<div
  cdk-overlay-origin
  class="mat-mdc-select-trigger"
  (click)="open()"
  #fallbackOverlayOrigin="cdkOverlayOrigin"
  #trigger
>
  <div class="mat-mdc-select-value" [attr.id]="_valueId">
    @if (empty) {
      <span class="mat-mdc-select-placeholder mat-mdc-select-min-line">{{placeholder}}</span>
    } @else {
      <span class="mat-mdc-select-value-text">
        @if (customTrigger) {
          <ng-content select="mat-select-trigger"></ng-content>
        } @else {
          <span class="mat-mdc-select-min-line">{{triggerValue}}</span>
        }
      </span>
    }
  </div>

  <div class="mat-mdc-select-arrow-wrapper">
    <div class="mat-mdc-select-arrow">
      <!-- Use an inline SVG, because it works better than a CSS triangle in high contrast mode. -->
      <svg viewBox="0 0 24 24" width="24px" height="24px" focusable="false" aria-hidden="true">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
  </div>
</div>

<ng-template
  cdk-connected-overlay
  cdkConnectedOverlayHasBackdrop
  cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
  [cdkConnectedOverlayDisableClose]="true"
  [cdkConnectedOverlayPanelClass]="_overlayPanelClass"
  [cdkConnectedOverlayScrollStrategy]="_scrollStrategy"
  [cdkConnectedOverlayOrigin]="_preferredOverlayOrigin || fallbackOverlayOrigin"
  [cdkConnectedOverlayPositions]="_positions"
  [cdkConnectedOverlayWidth]="_overlayWidth"
  [cdkConnectedOverlayFlexibleDimensions]="true"
  [cdkConnectedOverlayUsePopover]="_popoverLocation"
  (detach)="close()"
  (backdropClick)="close()"
  (overlayKeydown)="_handleOverlayKeydown($event)">
  <!-- \`mat-undefined\` is weird, but we were using it internally -->
  <div
    #panel
    role="listbox"
    tabindex="-1"
    class="mat-mdc-select-panel mdc-menu-surface mdc-menu-surface--open"
    [class]="panelClass"
    [class.mat-select-panel-animations-enabled]="!_animationsDisabled"
    [class.mat-primary]="_parentFormField?.color === 'primary'"
    [class.mat-accent]="_parentFormField?.color === 'accent'"
    [class.mat-warn]="_parentFormField?.color === 'warn'"
    [class.mat-undefined]="!_parentFormField?.color"
    [attr.id]="id + '-panel'"
    [attr.aria-multiselectable]="multiple"
    [attr.aria-label]="ariaLabel || null"
    [attr.aria-labelledby]="_getPanelAriaLabelledby()"
    (keydown)="_handleKeydown($event)">
    <ng-content></ng-content>
  </div>
</ng-template>
`,
      styles: ['@keyframes _mat-select-enter {\n  from {\n    opacity: 0;\n    transform: scaleY(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _mat-select-exit {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mat-mdc-select {\n  display: inline-block;\n  width: 100%;\n  outline: none;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));\n  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));\n  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));\n  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));\n  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));\n  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));\n}\n\ndiv.mat-mdc-select-panel {\n  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));\n}\n\n.mat-mdc-select-disabled {\n  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-select-disabled .mat-mdc-select-placeholder {\n  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-select-trigger {\n  display: inline-flex;\n  align-items: center;\n  cursor: pointer;\n  position: relative;\n  box-sizing: border-box;\n  width: 100%;\n}\n.mat-mdc-select-disabled .mat-mdc-select-trigger {\n  -webkit-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n\n.mat-mdc-select-value {\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.mat-mdc-select-value-text {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-mdc-select-arrow-wrapper {\n  height: 24px;\n  flex-shrink: 0;\n  display: inline-flex;\n  align-items: center;\n}\n.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {\n  transform: none;\n}\n\n.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,\n.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {\n  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));\n}\n\n.mat-mdc-select-arrow {\n  width: 10px;\n  height: 5px;\n  position: relative;\n  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {\n  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));\n}\n.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {\n  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-select-open .mat-mdc-select-arrow {\n  transform: rotate(180deg);\n}\n.mat-form-field-animations-enabled .mat-mdc-select-arrow {\n  transition: transform 80ms linear;\n}\n.mat-mdc-select-arrow svg {\n  fill: currentColor;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n@media (forced-colors: active) {\n  .mat-mdc-select-arrow svg {\n    fill: CanvasText;\n  }\n  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {\n    fill: GrayText;\n  }\n}\n\ndiv.mat-mdc-select-panel {\n  width: 100%;\n  max-height: 275px;\n  outline: 0;\n  overflow: auto;\n  padding: 8px 0;\n  box-sizing: border-box;\n  transform-origin: top center;\n  border-radius: 0 0 4px 4px;\n  position: relative;\n  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));\n}\n.mat-mdc-select-panel-above div.mat-mdc-select-panel {\n  border-radius: 4px 4px 0 0;\n  transform-origin: bottom center;\n}\n@media (forced-colors: active) {\n  div.mat-mdc-select-panel {\n    outline: solid 1px;\n  }\n}\n\n.mat-select-panel-animations-enabled {\n  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mat-select-panel-animations-enabled.mat-select-panel-exit {\n  animation: _mat-select-exit 100ms linear;\n}\n\n.mat-mdc-select-placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {\n  transition: none;\n}\n.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n  display: block;\n}\n\n.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {\n  cursor: pointer;\n}\n.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {\n  max-width: calc(100% - 18px);\n}\n.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {\n  max-width: calc(100% / 0.75 - 24px);\n}\n.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {\n  max-width: calc(100% - 60px);\n}\n.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {\n  max-width: calc(100% - 24px);\n}\n\n.mat-mdc-select-min-line:empty::before {\n  content: " ";\n  white-space: pre;\n  width: 1px;\n  display: inline-block;\n  visibility: hidden;\n}\n\n.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {\n  transform: var(--mat-select-arrow-transform, translateY(-8px));\n}\n']
    }]
  }], () => [], {
    options: [{
      type: ContentChildren,
      args: [MatOption, {
        descendants: true
      }]
    }],
    optionGroups: [{
      type: ContentChildren,
      args: [MAT_OPTGROUP, {
        descendants: true
      }]
    }],
    customTrigger: [{
      type: ContentChild,
      args: [MAT_SELECT_TRIGGER]
    }],
    userAriaDescribedBy: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    trigger: [{
      type: ViewChild,
      args: ["trigger"]
    }],
    panel: [{
      type: ViewChild,
      args: ["panel"]
    }],
    _overlayDir: [{
      type: ViewChild,
      args: [CdkConnectedOverlay]
    }],
    panelClass: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    hideSingleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    placeholder: [{
      type: Input
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    multiple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableOptionCentering: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    compareWith: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    errorStateMatcher: [{
      type: Input
    }],
    typeaheadDebounceInterval: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    sortComparator: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    panelWidth: [{
      type: Input
    }],
    canSelectNullableOptions: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    openedChange: [{
      type: Output
    }],
    _openedStream: [{
      type: Output,
      args: ["opened"]
    }],
    _closedStream: [{
      type: Output,
      args: ["closed"]
    }],
    selectionChange: [{
      type: Output
    }],
    valueChange: [{
      type: Output
    }]
  });
})();
var MatSelectTrigger = class _MatSelectTrigger {
  static ɵfac = function MatSelectTrigger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSelectTrigger)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatSelectTrigger,
    selectors: [["mat-select-trigger"]],
    features: [ɵɵProvidersFeature([{
      provide: MAT_SELECT_TRIGGER,
      useExisting: _MatSelectTrigger
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSelectTrigger, [{
    type: Directive,
    args: [{
      selector: "mat-select-trigger",
      providers: [{
        provide: MAT_SELECT_TRIGGER,
        useExisting: MatSelectTrigger
      }]
    }]
  }], null, null);
})();
var MatSelectModule = class _MatSelectModule {
  static ɵfac = function MatSelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatSelectModule,
    imports: [OverlayModule, MatOptionModule, MatSelect, MatSelectTrigger],
    exports: [BidiModule, CdkScrollableModule, MatFormFieldModule, MatSelect, MatSelectTrigger, MatOptionModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [OverlayModule, MatOptionModule, BidiModule, CdkScrollableModule, MatFormFieldModule, MatOptionModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSelectModule, [{
    type: NgModule,
    args: [{
      imports: [OverlayModule, MatOptionModule, MatSelect, MatSelectTrigger],
      exports: [BidiModule, CdkScrollableModule, MatFormFieldModule, MatSelect, MatSelectTrigger, MatOptionModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_ripple-loader-chunk.mjs
var eventListenerOptions = {
  capture: true
};
var rippleInteractionEvents = ["focus", "mousedown", "mouseenter", "touchstart"];
var matRippleUninitialized = "mat-ripple-loader-uninitialized";
var matRippleClassName = "mat-ripple-loader-class-name";
var matRippleCentered = "mat-ripple-loader-centered";
var matRippleDisabled = "mat-ripple-loader-disabled";
var MatRippleLoader = class _MatRippleLoader {
  _document = inject(DOCUMENT);
  _animationsDisabled = _animationsDisabled();
  _globalRippleOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
    optional: true
  });
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _injector = inject(Injector);
  _eventCleanups;
  _hosts = /* @__PURE__ */ new Map();
  constructor() {
    const renderer = inject(RendererFactory2).createRenderer(null, null);
    this._eventCleanups = this._ngZone.runOutsideAngular(() => rippleInteractionEvents.map((name) => renderer.listen(this._document, name, this._onInteraction, eventListenerOptions)));
  }
  ngOnDestroy() {
    const hosts = this._hosts.keys();
    for (const host of hosts) {
      this.destroyRipple(host);
    }
    this._eventCleanups.forEach((cleanup) => cleanup());
  }
  configureRipple(host, config) {
    host.setAttribute(matRippleUninitialized, this._globalRippleOptions?.namespace ?? "");
    if (config.className || !host.hasAttribute(matRippleClassName)) {
      host.setAttribute(matRippleClassName, config.className || "");
    }
    if (config.centered) {
      host.setAttribute(matRippleCentered, "");
    }
    if (config.disabled) {
      host.setAttribute(matRippleDisabled, "");
    }
  }
  setDisabled(host, disabled) {
    const ripple = this._hosts.get(host);
    if (ripple) {
      ripple.target.rippleDisabled = disabled;
      if (!disabled && !ripple.hasSetUpEvents) {
        ripple.hasSetUpEvents = true;
        ripple.renderer.setupTriggerEvents(host);
      }
    } else if (disabled) {
      host.setAttribute(matRippleDisabled, "");
    } else {
      host.removeAttribute(matRippleDisabled);
    }
  }
  _onInteraction = (event) => {
    const eventTarget = _getEventTarget(event);
    if (eventTarget instanceof HTMLElement) {
      const element = eventTarget.closest(`[${matRippleUninitialized}="${this._globalRippleOptions?.namespace ?? ""}"]`);
      if (element) {
        this._createRipple(element);
      }
    }
  };
  _createRipple(host) {
    if (!this._document || this._hosts.has(host)) {
      return;
    }
    host.querySelector(".mat-ripple")?.remove();
    const rippleEl = this._document.createElement("span");
    rippleEl.classList.add("mat-ripple", host.getAttribute(matRippleClassName));
    host.append(rippleEl);
    const globalOptions = this._globalRippleOptions;
    const enterDuration = this._animationsDisabled ? 0 : globalOptions?.animation?.enterDuration ?? defaultRippleAnimationConfig.enterDuration;
    const exitDuration = this._animationsDisabled ? 0 : globalOptions?.animation?.exitDuration ?? defaultRippleAnimationConfig.exitDuration;
    const target = {
      rippleDisabled: this._animationsDisabled || globalOptions?.disabled || host.hasAttribute(matRippleDisabled),
      rippleConfig: {
        centered: host.hasAttribute(matRippleCentered),
        terminateOnPointerUp: globalOptions?.terminateOnPointerUp,
        animation: {
          enterDuration,
          exitDuration
        }
      }
    };
    const renderer = new RippleRenderer(target, this._ngZone, rippleEl, this._platform, this._injector);
    const hasSetUpEvents = !target.rippleDisabled;
    if (hasSetUpEvents) {
      renderer.setupTriggerEvents(host);
    }
    this._hosts.set(host, {
      target,
      renderer,
      hasSetUpEvents
    });
    host.removeAttribute(matRippleUninitialized);
  }
  destroyRipple(host) {
    const ripple = this._hosts.get(host);
    if (ripple) {
      ripple.renderer._removeTriggerEvents();
      this._hosts.delete(host);
    }
  }
  static ɵfac = function MatRippleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRippleLoader)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MatRippleLoader,
    factory: _MatRippleLoader.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleLoader, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/_icon-button-chunk.mjs
var _c03 = ["mat-icon-button", ""];
var _c13 = ["*"];
var MAT_BUTTON_CONFIG = new InjectionToken("MAT_BUTTON_CONFIG");
function transformTabIndex(value) {
  return value == null ? void 0 : numberAttribute(value);
}
var MatButtonBase = class _MatButtonBase {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _animationsDisabled = _animationsDisabled();
  _config = inject(MAT_BUTTON_CONFIG, {
    optional: true
  });
  _focusMonitor = inject(FocusMonitor);
  _cleanupClick;
  _renderer = inject(Renderer2);
  _rippleLoader = inject(MatRippleLoader);
  _isAnchor;
  _isFab = false;
  color;
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = value;
    this._updateRippleDisabled();
  }
  _disableRipple = false;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._updateRippleDisabled();
  }
  _disabled = false;
  ariaDisabled;
  disabledInteractive;
  tabIndex;
  set _tabindex(value) {
    this.tabIndex = value;
  }
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const element = this._elementRef.nativeElement;
    this._isAnchor = element.tagName === "A";
    this.disabledInteractive = this._config?.disabledInteractive ?? false;
    this.color = this._config?.color ?? null;
    this._rippleLoader?.configureRipple(element, {
      className: "mat-mdc-button-ripple"
    });
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
    if (this._isAnchor) {
      this._setupAsAnchor();
    }
  }
  ngOnDestroy() {
    this._cleanupClick?.();
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);
  }
  focus(origin = "program", options) {
    if (origin) {
      this._focusMonitor.focusVia(this._elementRef.nativeElement, origin, options);
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }
  _getAriaDisabled() {
    if (this.ariaDisabled != null) {
      return this.ariaDisabled;
    }
    if (this._isAnchor) {
      return this.disabled || null;
    }
    return this.disabled && this.disabledInteractive ? true : null;
  }
  _getDisabledAttribute() {
    return this.disabledInteractive || !this.disabled ? null : true;
  }
  _updateRippleDisabled() {
    this._rippleLoader?.setDisabled(this._elementRef.nativeElement, this.disableRipple || this.disabled);
  }
  _getTabIndex() {
    if (this._isAnchor) {
      return this.disabled && !this.disabledInteractive ? -1 : this.tabIndex;
    }
    return this.tabIndex;
  }
  _setupAsAnchor() {
    this._cleanupClick = this._ngZone.runOutsideAngular(() => this._renderer.listen(this._elementRef.nativeElement, "click", (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }));
  }
  static ɵfac = function MatButtonBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButtonBase)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatButtonBase,
    hostAttrs: [1, "mat-mdc-button-base"],
    hostVars: 13,
    hostBindings: function MatButtonBase_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("disabled", ctx._getDisabledAttribute())("aria-disabled", ctx._getAriaDisabled())("tabindex", ctx._getTabIndex());
        ɵɵclassMap(ctx.color ? "mat-" + ctx.color : "");
        ɵɵclassProp("mat-mdc-button-disabled", ctx.disabled)("mat-mdc-button-disabled-interactive", ctx.disabledInteractive)("mat-unthemed", !ctx.color)("_mat-animation-noopable", ctx._animationsDisabled);
      }
    },
    inputs: {
      color: "color",
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      ariaDisabled: [2, "aria-disabled", "ariaDisabled", booleanAttribute],
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", transformTabIndex],
      _tabindex: [2, "tabindex", "_tabindex", transformTabIndex]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonBase, [{
    type: Directive,
    args: [{
      host: {
        "class": "mat-mdc-button-base",
        "[class]": 'color ? "mat-" + color : ""',
        "[attr.disabled]": "_getDisabledAttribute()",
        "[attr.aria-disabled]": "_getAriaDisabled()",
        "[attr.tabindex]": "_getTabIndex()",
        "[class.mat-mdc-button-disabled]": "disabled",
        "[class.mat-mdc-button-disabled-interactive]": "disabledInteractive",
        "[class.mat-unthemed]": "!color",
        "[class._mat-animation-noopable]": "_animationsDisabled"
      }
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ariaDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute,
        alias: "aria-disabled"
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: transformTabIndex
      }]
    }],
    _tabindex: [{
      type: Input,
      args: [{
        alias: "tabindex",
        transform: transformTabIndex
      }]
    }]
  });
})();
var MatIconButton = class _MatIconButton extends MatButtonBase {
  constructor() {
    super();
    this._rippleLoader.configureRipple(this._elementRef.nativeElement, {
      centered: true
    });
  }
  static ɵfac = function MatIconButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatIconButton)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatIconButton,
    selectors: [["button", "mat-icon-button", ""], ["a", "mat-icon-button", ""], ["button", "matIconButton", ""], ["a", "matIconButton", ""]],
    hostAttrs: [1, "mdc-icon-button", "mat-mdc-icon-button"],
    exportAs: ["matButton", "matAnchor"],
    features: [ɵɵInheritDefinitionFeature],
    attrs: _c03,
    ngContentSelectors: _c13,
    decls: 4,
    vars: 0,
    consts: [[1, "mat-mdc-button-persistent-ripple", "mdc-icon-button__ripple"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function MatIconButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵdomElement(0, "span", 0);
        ɵɵprojection(1);
        ɵɵdomElement(2, "span", 1)(3, "span", 2);
      }
    },
    styles: ['.mat-mdc-icon-button {\n  -webkit-user-select: none;\n  user-select: none;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n  flex-shrink: 0;\n  text-align: center;\n  width: var(--mat-icon-button-state-layer-size, 40px);\n  height: var(--mat-icon-button-state-layer-size, 40px);\n  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);\n  font-size: var(--mat-icon-button-icon-size, 24px);\n  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-icon-button .mdc-button__label,\n.mat-mdc-icon-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-icon-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {\n  content: "";\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-ripple-element {\n  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-icon-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-icon-button-touch-target-size, 48px);\n  display: var(--mat-icon-button-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-icon-button-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-icon-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-icon-button img,\n.mat-mdc-icon-button svg {\n  width: var(--mat-icon-button-icon-size, 24px);\n  height: var(--mat-icon-button-icon-size, 24px);\n  vertical-align: baseline;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n}\n.mat-mdc-icon-button[hidden] {\n  display: none;\n}\n.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {\n  background: transparent;\n  opacity: 1;\n}\n', "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatIconButton, [{
    type: Component,
    args: [{
      selector: `button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]`,
      host: {
        "class": "mdc-icon-button mat-mdc-icon-button"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span>

<ng-content></ng-content>

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-icon-button {\n  -webkit-user-select: none;\n  user-select: none;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n  flex-shrink: 0;\n  text-align: center;\n  width: var(--mat-icon-button-state-layer-size, 40px);\n  height: var(--mat-icon-button-state-layer-size, 40px);\n  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);\n  font-size: var(--mat-icon-button-icon-size, 24px);\n  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-icon-button .mdc-button__label,\n.mat-mdc-icon-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-icon-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {\n  content: "";\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-ripple-element {\n  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-icon-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-icon-button-touch-target-size, 48px);\n  display: var(--mat-icon-button-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-icon-button-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-icon-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-icon-button img,\n.mat-mdc-icon-button svg {\n  width: var(--mat-icon-button-icon-size, 24px);\n  height: var(--mat-icon-button-icon-size, 24px);\n  vertical-align: baseline;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n}\n.mat-mdc-icon-button[hidden] {\n  display: none;\n}\n.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {\n  background: transparent;\n  opacity: 1;\n}\n', "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"]
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/_tooltip-chunk.mjs
var _c04 = ["tooltip"];
var SCROLL_THROTTLE_MS = 20;
function getMatTooltipInvalidPositionError(position) {
  return Error(`Tooltip position "${position}" is invalid.`);
}
var MAT_TOOLTIP_SCROLL_STRATEGY = new InjectionToken("mat-tooltip-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector, {
      scrollThrottle: SCROLL_THROTTLE_MS
    });
  }
});
var MAT_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken("mat-tooltip-default-options", {
  providedIn: "root",
  factory: () => ({
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500
  })
});
var PANEL_CLASS = "tooltip-panel";
var passiveListenerOptions = {
  passive: true
};
var MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
var UNBOUNDED_ANCHOR_GAP = 8;
var MIN_HEIGHT = 24;
var MAX_WIDTH = 200;
var MatTooltip = class _MatTooltip {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _ariaDescriber = inject(AriaDescriber);
  _focusMonitor = inject(FocusMonitor);
  _dir = inject(Directionality);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _mediaMatcher = inject(MediaMatcher);
  _document = inject(DOCUMENT);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _defaultOptions = inject(MAT_TOOLTIP_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef = null;
  _tooltipInstance = null;
  _overlayPanelClass;
  _portal;
  _position = "below";
  _positionAtOrigin = false;
  _disabled = false;
  _tooltipClass;
  _viewInitialized = false;
  _pointerExitEventsInitialized = false;
  _tooltipComponent = TooltipComponent;
  _viewportMargin = 8;
  _currentPosition;
  _cssClassPrefix = "mat-mdc";
  _ariaDescriptionPending = false;
  _dirSubscribed = false;
  get position() {
    return this._position;
  }
  set position(value) {
    if (value !== this._position) {
      this._position = value;
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
        this._tooltipInstance?.show(0);
        this._overlayRef.updatePosition();
      }
    }
  }
  get positionAtOrigin() {
    return this._positionAtOrigin;
  }
  set positionAtOrigin(value) {
    this._positionAtOrigin = coerceBooleanProperty(value);
    this._detach();
    this._overlayRef = null;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    const isDisabled = coerceBooleanProperty(value);
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;
      if (isDisabled) {
        this.hide(0);
      } else {
        this._setupPointerEnterEventsIfNeeded();
      }
      this._syncAriaDescription(this.message);
    }
  }
  get showDelay() {
    return this._showDelay;
  }
  set showDelay(value) {
    this._showDelay = coerceNumberProperty(value);
  }
  _showDelay;
  get hideDelay() {
    return this._hideDelay;
  }
  set hideDelay(value) {
    this._hideDelay = coerceNumberProperty(value);
    if (this._tooltipInstance) {
      this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
    }
  }
  _hideDelay;
  touchGestures = "auto";
  get message() {
    return this._message;
  }
  set message(value) {
    const oldMessage = this._message;
    this._message = value != null ? String(value).trim() : "";
    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
      this._updateTooltipMessage();
    }
    this._syncAriaDescription(oldMessage);
  }
  _message = "";
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value) {
    this._tooltipClass = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }
  _eventCleanups = [];
  _touchstartTimeout = null;
  _destroyed = new Subject();
  _isDestroyed = false;
  constructor() {
    const defaultOptions = this._defaultOptions;
    if (defaultOptions) {
      this._showDelay = defaultOptions.showDelay;
      this._hideDelay = defaultOptions.hideDelay;
      if (defaultOptions.position) {
        this.position = defaultOptions.position;
      }
      if (defaultOptions.positionAtOrigin) {
        this.positionAtOrigin = defaultOptions.positionAtOrigin;
      }
      if (defaultOptions.touchGestures) {
        this.touchGestures = defaultOptions.touchGestures;
      }
      if (defaultOptions.tooltipClass) {
        this.tooltipClass = defaultOptions.tooltipClass;
      }
    }
    this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
  }
  ngAfterViewInit() {
    this._viewInitialized = true;
    this._setupPointerEnterEventsIfNeeded();
    this._focusMonitor.monitor(this._elementRef).pipe(takeUntil(this._destroyed)).subscribe((origin) => {
      if (!origin) {
        this._ngZone.run(() => this.hide(0));
      } else if (origin === "keyboard") {
        this._ngZone.run(() => this.show());
      }
    });
  }
  ngOnDestroy() {
    const nativeElement = this._elementRef.nativeElement;
    if (this._touchstartTimeout) {
      clearTimeout(this._touchstartTimeout);
    }
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }
    this._eventCleanups.forEach((cleanup) => cleanup());
    this._eventCleanups.length = 0;
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
    this._ariaDescriber.removeDescription(nativeElement, this.message, "tooltip");
    this._focusMonitor.stopMonitoring(nativeElement);
  }
  show(delay = this.showDelay, origin) {
    if (this.disabled || !this.message || this._isTooltipVisible()) {
      this._tooltipInstance?._cancelPendingAnimations();
      return;
    }
    const overlayRef = this._createOverlay(origin);
    this._detach();
    this._portal = this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    const instance = this._tooltipInstance = overlayRef.attach(this._portal).instance;
    instance._triggerElement = this._elementRef.nativeElement;
    instance._mouseLeaveHideDelay = this._hideDelay;
    instance.afterHidden().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._setTooltipClass(this._tooltipClass);
    this._updateTooltipMessage();
    instance.show(delay);
  }
  hide(delay = this.hideDelay) {
    const instance = this._tooltipInstance;
    if (instance) {
      if (instance.isVisible()) {
        instance.hide(delay);
      } else {
        instance._cancelPendingAnimations();
        this._detach();
      }
    }
  }
  toggle(origin) {
    this._isTooltipVisible() ? this.hide() : this.show(void 0, origin);
  }
  _isTooltipVisible() {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }
  _createOverlay(origin) {
    if (this._overlayRef) {
      const existingStrategy = this._overlayRef.getConfig().positionStrategy;
      if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof ElementRef) {
        return this._overlayRef;
      }
      this._detach();
    }
    const scrollableAncestors = this._injector.get(ScrollDispatcher).getAncestorScrollContainers(this._elementRef);
    const panelClass = `${this._cssClassPrefix}-${PANEL_CLASS}`;
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this.positionAtOrigin ? origin || this._elementRef : this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors).withPopoverLocation("global");
    strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe((change) => {
      this._updateCurrentPositionClass(change.connectionPair);
      if (this._tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          this._ngZone.run(() => this.hide(0));
        }
      }
    });
    this._overlayRef = createOverlayRef(this._injector, {
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: this._overlayPanelClass ? [...this._overlayPanelClass, panelClass] : panelClass,
      scrollStrategy: this._injector.get(MAT_TOOLTIP_SCROLL_STRATEGY)(),
      disableAnimations: this._animationsDisabled,
      eventPredicate: this._overlayEventPredicate
    });
    this._updatePosition(this._overlayRef);
    this._overlayRef.detachments().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._overlayRef.outsidePointerEvents().pipe(takeUntil(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());
    this._overlayRef.keydownEvents().pipe(takeUntil(this._destroyed)).subscribe((event) => {
      event.preventDefault();
      event.stopPropagation();
      this._ngZone.run(() => this.hide(0));
    });
    if (this._defaultOptions?.disableTooltipInteractivity) {
      this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
    }
    if (!this._dirSubscribed) {
      this._dirSubscribed = true;
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
        if (this._overlayRef) {
          this._updatePosition(this._overlayRef);
        }
      });
    }
    return this._overlayRef;
  }
  _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._tooltipInstance = null;
  }
  _updatePosition(overlayRef) {
    const position = overlayRef.getConfig().positionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();
    position.withPositions([this._addOffset(__spreadValues(__spreadValues({}, origin.main), overlay.main)), this._addOffset(__spreadValues(__spreadValues({}, origin.fallback), overlay.fallback))]);
  }
  _addOffset(position) {
    const offset = UNBOUNDED_ANCHOR_GAP;
    const isLtr = !this._dir || this._dir.value == "ltr";
    if (position.originY === "top") {
      position.offsetY = -offset;
    } else if (position.originY === "bottom") {
      position.offsetY = offset;
    } else if (position.originX === "start") {
      position.offsetX = isLtr ? -offset : offset;
    } else if (position.originX === "end") {
      position.offsetX = isLtr ? offset : -offset;
    }
    return position;
  }
  _getOrigin() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let originPosition;
    if (position == "above" || position == "below") {
      originPosition = {
        originX: "center",
        originY: position == "above" ? "top" : "bottom"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      originPosition = {
        originX: "start",
        originY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      originPosition = {
        originX: "end",
        originY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(originPosition.originX, originPosition.originY);
    return {
      main: originPosition,
      fallback: {
        originX: x,
        originY: y
      }
    };
  }
  _getOverlayPosition() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let overlayPosition;
    if (position == "above") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "bottom"
      };
    } else if (position == "below") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "top"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      overlayPosition = {
        overlayX: "end",
        overlayY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      overlayPosition = {
        overlayX: "start",
        overlayY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
    return {
      main: overlayPosition,
      fallback: {
        overlayX: x,
        overlayY: y
      }
    };
  }
  _updateTooltipMessage() {
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;
      this._tooltipInstance._markForCheck();
      afterNextRender(() => {
        if (this._tooltipInstance) {
          this._overlayRef.updatePosition();
        }
      }, {
        injector: this._injector
      });
    }
  }
  _setTooltipClass(tooltipClass) {
    if (this._tooltipInstance) {
      this._tooltipInstance.tooltipClass = tooltipClass instanceof Set ? Array.from(tooltipClass) : tooltipClass;
      this._tooltipInstance._markForCheck();
    }
  }
  _invertPosition(x, y) {
    if (this.position === "above" || this.position === "below") {
      if (y === "top") {
        y = "bottom";
      } else if (y === "bottom") {
        y = "top";
      }
    } else {
      if (x === "end") {
        x = "start";
      } else if (x === "start") {
        x = "end";
      }
    }
    return {
      x,
      y
    };
  }
  _updateCurrentPositionClass(connectionPair) {
    const {
      overlayY,
      originX,
      originY
    } = connectionPair;
    let newPosition;
    if (overlayY === "center") {
      if (this._dir && this._dir.value === "rtl") {
        newPosition = originX === "end" ? "left" : "right";
      } else {
        newPosition = originX === "start" ? "left" : "right";
      }
    } else {
      newPosition = overlayY === "bottom" && originY === "top" ? "above" : "below";
    }
    if (newPosition !== this._currentPosition) {
      const overlayRef = this._overlayRef;
      if (overlayRef) {
        const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
        overlayRef.removePanelClass(classPrefix + this._currentPosition);
        overlayRef.addPanelClass(classPrefix + newPosition);
      }
      this._currentPosition = newPosition;
    }
  }
  _setupPointerEnterEventsIfNeeded() {
    if (this._disabled || !this.message || !this._viewInitialized || this._eventCleanups.length) {
      return;
    }
    if (!this._isTouchPlatform()) {
      this._addListener("mouseenter", (event) => {
        this._setupPointerExitEventsIfNeeded();
        let point = void 0;
        if (event.x !== void 0 && event.y !== void 0) {
          point = event;
        }
        this.show(void 0, point);
      });
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      this._addListener("touchstart", (event) => {
        const touch = event.targetTouches?.[0];
        const origin = touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : void 0;
        this._setupPointerExitEventsIfNeeded();
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        const DEFAULT_LONGPRESS_DELAY = 500;
        this._touchstartTimeout = setTimeout(() => {
          this._touchstartTimeout = null;
          this.show(void 0, origin);
        }, this._defaultOptions?.touchLongPressShowDelay ?? DEFAULT_LONGPRESS_DELAY);
      });
    }
  }
  _setupPointerExitEventsIfNeeded() {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;
    if (!this._isTouchPlatform()) {
      this._addListener("mouseleave", (event) => {
        const newTarget = event.relatedTarget;
        if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
          this.hide();
        }
      });
      this._addListener("wheel", (event) => {
        if (this._isTooltipVisible()) {
          const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
          const element = this._elementRef.nativeElement;
          if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
            this.hide();
          }
        }
      });
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        this.hide(this._defaultOptions?.touchendHideDelay);
      };
      this._addListener("touchend", touchendListener);
      this._addListener("touchcancel", touchendListener);
    }
  }
  _addListener(name, listener) {
    this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement, name, listener, passiveListenerOptions));
  }
  _isTouchPlatform() {
    const detectHoverCapability = this._defaultOptions?.detectHoverCapability;
    if (typeof detectHoverCapability === "function") {
      return !detectHoverCapability();
    }
    if (this._platform.IOS || this._platform.ANDROID) {
      return true;
    } else if (!this._platform.isBrowser) {
      return false;
    }
    return !!detectHoverCapability && this._mediaMatcher.matchMedia("(any-hover: none)").matches;
  }
  _disableNativeGesturesIfNecessary() {
    const gestures = this.touchGestures;
    if (gestures !== "off") {
      const element = this._elementRef.nativeElement;
      const style = element.style;
      if (gestures === "on" || element.nodeName !== "INPUT" && element.nodeName !== "TEXTAREA") {
        style["userSelect"] = style["msUserSelect"] = style["webkitUserSelect"] = style["MozUserSelect"] = "none";
      }
      if (gestures === "on" || !element.draggable) {
        style["webkitUserDrag"] = "none";
      }
      style["touchAction"] = "none";
      style["webkitTapHighlightColor"] = "transparent";
    }
  }
  _syncAriaDescription(oldMessage) {
    if (this._ariaDescriptionPending) {
      return;
    }
    this._ariaDescriptionPending = true;
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, oldMessage, "tooltip");
    if (!this._isDestroyed) {
      afterNextRender({
        write: () => {
          this._ariaDescriptionPending = false;
          if (this.message && !this.disabled) {
            this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, "tooltip");
          }
        }
      }, {
        injector: this._injector
      });
    }
  }
  _overlayEventPredicate = (event) => {
    if (event.type === "keydown") {
      return this._isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event);
    }
    return true;
  };
  static ɵfac = function MatTooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltip)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatTooltip,
    selectors: [["", "matTooltip", ""]],
    hostAttrs: [1, "mat-mdc-tooltip-trigger"],
    hostVars: 2,
    hostBindings: function MatTooltip_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mat-mdc-tooltip-disabled", ctx.disabled);
      }
    },
    inputs: {
      position: [0, "matTooltipPosition", "position"],
      positionAtOrigin: [0, "matTooltipPositionAtOrigin", "positionAtOrigin"],
      disabled: [0, "matTooltipDisabled", "disabled"],
      showDelay: [0, "matTooltipShowDelay", "showDelay"],
      hideDelay: [0, "matTooltipHideDelay", "hideDelay"],
      touchGestures: [0, "matTooltipTouchGestures", "touchGestures"],
      message: [0, "matTooltip", "message"],
      tooltipClass: [0, "matTooltipClass", "tooltipClass"]
    },
    exportAs: ["matTooltip"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltip, [{
    type: Directive,
    args: [{
      selector: "[matTooltip]",
      exportAs: "matTooltip",
      host: {
        "class": "mat-mdc-tooltip-trigger",
        "[class.mat-mdc-tooltip-disabled]": "disabled"
      }
    }]
  }], () => [], {
    position: [{
      type: Input,
      args: ["matTooltipPosition"]
    }],
    positionAtOrigin: [{
      type: Input,
      args: ["matTooltipPositionAtOrigin"]
    }],
    disabled: [{
      type: Input,
      args: ["matTooltipDisabled"]
    }],
    showDelay: [{
      type: Input,
      args: ["matTooltipShowDelay"]
    }],
    hideDelay: [{
      type: Input,
      args: ["matTooltipHideDelay"]
    }],
    touchGestures: [{
      type: Input,
      args: ["matTooltipTouchGestures"]
    }],
    message: [{
      type: Input,
      args: ["matTooltip"]
    }],
    tooltipClass: [{
      type: Input,
      args: ["matTooltipClass"]
    }]
  });
})();
var TooltipComponent = class _TooltipComponent {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _isMultiline = false;
  message;
  tooltipClass;
  _showTimeoutId;
  _hideTimeoutId;
  _triggerElement;
  _mouseLeaveHideDelay;
  _animationsDisabled = _animationsDisabled();
  _tooltip;
  _closeOnInteraction = false;
  _isVisible = false;
  _onHide = new Subject();
  _showAnimation = "mat-mdc-tooltip-show";
  _hideAnimation = "mat-mdc-tooltip-hide";
  constructor() {
  }
  show(delay) {
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = setTimeout(() => {
      this._toggleVisibility(true);
      this._showTimeoutId = void 0;
    }, delay);
  }
  hide(delay) {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    this._hideTimeoutId = setTimeout(() => {
      this._toggleVisibility(false);
      this._hideTimeoutId = void 0;
    }, delay);
  }
  afterHidden() {
    return this._onHide;
  }
  isVisible() {
    return this._isVisible;
  }
  ngOnDestroy() {
    this._cancelPendingAnimations();
    this._onHide.complete();
    this._triggerElement = null;
  }
  _handleBodyInteraction() {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  _handleMouseLeave({
    relatedTarget
  }) {
    if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
      if (this.isVisible()) {
        this.hide(this._mouseLeaveHideDelay);
      } else {
        this._finalizeAnimation(false);
      }
    }
  }
  _onShow() {
    this._isMultiline = this._isTooltipMultiline();
    this._markForCheck();
  }
  _isTooltipMultiline() {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
  }
  _handleAnimationEnd({
    animationName
  }) {
    if (animationName === this._showAnimation || animationName === this._hideAnimation) {
      this._finalizeAnimation(animationName === this._showAnimation);
    }
  }
  _cancelPendingAnimations() {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = this._hideTimeoutId = void 0;
  }
  _finalizeAnimation(toVisible) {
    if (toVisible) {
      this._closeOnInteraction = true;
    } else if (!this.isVisible()) {
      this._onHide.next();
    }
  }
  _toggleVisibility(isVisible) {
    const tooltip = this._tooltip.nativeElement;
    const showClass = this._showAnimation;
    const hideClass = this._hideAnimation;
    tooltip.classList.remove(isVisible ? hideClass : showClass);
    tooltip.classList.add(isVisible ? showClass : hideClass);
    if (this._isVisible !== isVisible) {
      this._isVisible = isVisible;
      this._changeDetectorRef.markForCheck();
    }
    if (isVisible && !this._animationsDisabled && typeof getComputedStyle === "function") {
      const styles = getComputedStyle(tooltip);
      if (styles.getPropertyValue("animation-duration") === "0s" || styles.getPropertyValue("animation-name") === "none") {
        this._animationsDisabled = true;
      }
    }
    if (isVisible) {
      this._onShow();
    }
    if (this._animationsDisabled) {
      tooltip.classList.add("_mat-animation-noopable");
      this._finalizeAnimation(isVisible);
    }
  }
  static ɵfac = function TooltipComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _TooltipComponent,
    selectors: [["mat-tooltip-component"]],
    viewQuery: function TooltipComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c04, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._tooltip = _t.first);
      }
    },
    hostAttrs: ["aria-hidden", "true"],
    hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("mouseleave", function TooltipComponent_mouseleave_HostBindingHandler($event) {
          return ctx._handleMouseLeave($event);
        });
      }
    },
    decls: 4,
    vars: 5,
    consts: [["tooltip", ""], [1, "mdc-tooltip", "mat-mdc-tooltip", 3, "animationend"], [1, "mat-mdc-tooltip-surface", "mdc-tooltip__surface"]],
    template: function TooltipComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵdomElementStart(0, "div", 1, 0);
        ɵɵdomListener("animationend", function TooltipComponent_Template_div_animationend_0_listener($event) {
          return ctx._handleAnimationEnd($event);
        });
        ɵɵdomElementStart(2, "div", 2);
        ɵɵtext(3);
        ɵɵdomElementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.tooltipClass);
        ɵɵclassProp("mdc-tooltip--multiline", ctx._isMultiline);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ctx.message);
      }
    },
    styles: ['.mat-mdc-tooltip {\n  position: relative;\n  transform: scale(0);\n  display: inline-flex;\n}\n.mat-mdc-tooltip::before {\n  content: "";\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n  position: absolute;\n}\n.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {\n  top: -8px;\n}\n.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {\n  bottom: -8px;\n}\n.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {\n  left: -8px;\n}\n.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {\n  right: -8px;\n}\n.mat-mdc-tooltip._mat-animation-noopable {\n  animation: none;\n  transform: scale(1);\n}\n\n.mat-mdc-tooltip-surface {\n  word-break: normal;\n  overflow-wrap: anywhere;\n  padding: 4px 8px;\n  min-width: 40px;\n  max-width: 200px;\n  min-height: 24px;\n  max-height: 40vh;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-align: center;\n  will-change: transform, opacity;\n  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));\n  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));\n  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));\n  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));\n  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));\n  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));\n  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));\n}\n.mat-mdc-tooltip-surface::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: left;\n}\n[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: right;\n}\n\n.mat-mdc-tooltip-panel {\n  line-height: normal;\n}\n.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {\n  pointer-events: none;\n}\n\n@keyframes mat-mdc-tooltip-show {\n  0% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes mat-mdc-tooltip-hide {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n}\n.mat-mdc-tooltip-show {\n  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;\n}\n\n.mat-mdc-tooltip-hide {\n  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{
      selector: "mat-tooltip-component",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "(mouseleave)": "_handleMouseLeave($event)",
        "aria-hidden": "true"
      },
      template: '<div\n  #tooltip\n  class="mdc-tooltip mat-mdc-tooltip"\n  [class]="tooltipClass"\n  (animationend)="_handleAnimationEnd($event)"\n  [class.mdc-tooltip--multiline]="_isMultiline">\n  <div class="mat-mdc-tooltip-surface mdc-tooltip__surface">{{message}}</div>\n</div>\n',
      styles: ['.mat-mdc-tooltip {\n  position: relative;\n  transform: scale(0);\n  display: inline-flex;\n}\n.mat-mdc-tooltip::before {\n  content: "";\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n  position: absolute;\n}\n.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {\n  top: -8px;\n}\n.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {\n  bottom: -8px;\n}\n.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {\n  left: -8px;\n}\n.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {\n  right: -8px;\n}\n.mat-mdc-tooltip._mat-animation-noopable {\n  animation: none;\n  transform: scale(1);\n}\n\n.mat-mdc-tooltip-surface {\n  word-break: normal;\n  overflow-wrap: anywhere;\n  padding: 4px 8px;\n  min-width: 40px;\n  max-width: 200px;\n  min-height: 24px;\n  max-height: 40vh;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-align: center;\n  will-change: transform, opacity;\n  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));\n  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));\n  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));\n  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));\n  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));\n  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));\n  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));\n}\n.mat-mdc-tooltip-surface::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: left;\n}\n[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: right;\n}\n\n.mat-mdc-tooltip-panel {\n  line-height: normal;\n}\n.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {\n  pointer-events: none;\n}\n\n@keyframes mat-mdc-tooltip-show {\n  0% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes mat-mdc-tooltip-hide {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n}\n.mat-mdc-tooltip-show {\n  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;\n}\n\n.mat-mdc-tooltip-hide {\n  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;\n}\n']
    }]
  }], () => [], {
    _tooltip: [{
      type: ViewChild,
      args: ["tooltip", {
        static: true
      }]
    }]
  });
})();

// node_modules/@angular/material/fesm2022/tooltip.mjs
var MatTooltipModule = class _MatTooltipModule {
  static ɵfac = function MatTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltipModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatTooltipModule,
    imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
    exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [A11yModule, OverlayModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/button.mjs
var _c05 = ["matButton", ""];
var _c14 = [[["", 8, "material-icons", 3, "iconPositionEnd", ""], ["mat-icon", 3, "iconPositionEnd", ""], ["", "matButtonIcon", "", 3, "iconPositionEnd", ""]], "*", [["", "iconPositionEnd", "", 8, "material-icons"], ["mat-icon", "iconPositionEnd", ""], ["", "matButtonIcon", "", "iconPositionEnd", ""]]];
var _c23 = [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];
var _c33 = ["mat-fab", ""];
var _c42 = ["mat-mini-fab", ""];
var _c5 = '.mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: "";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));\n  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-touch-target-size, 48px);\n  display: var(--mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));\n  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-small-touch-target-size, 48px);\n  display: var(--mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));\n  height: var(--mat-fab-extended-container-height, 56px);\n  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));\n  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n';
var APPEARANCE_CLASSES = /* @__PURE__ */ new Map([["text", ["mat-mdc-button"]], ["filled", ["mdc-button--unelevated", "mat-mdc-unelevated-button"]], ["elevated", ["mdc-button--raised", "mat-mdc-raised-button"]], ["outlined", ["mdc-button--outlined", "mat-mdc-outlined-button"]], ["tonal", ["mat-tonal-button"]]]);
var MatButton = class _MatButton extends MatButtonBase {
  get appearance() {
    return this._appearance;
  }
  set appearance(value) {
    this.setAppearance(value || this._config?.defaultAppearance || "text");
  }
  _appearance = null;
  constructor() {
    super();
    const inferredAppearance = _inferAppearance(this._elementRef.nativeElement);
    if (inferredAppearance) {
      this.setAppearance(inferredAppearance);
    }
  }
  setAppearance(appearance) {
    if (appearance === this._appearance) {
      return;
    }
    const classList = this._elementRef.nativeElement.classList;
    const previousClasses = this._appearance ? APPEARANCE_CLASSES.get(this._appearance) : null;
    const newClasses = APPEARANCE_CLASSES.get(appearance);
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !newClasses) {
      throw new Error(`Unsupported MatButton appearance "${appearance}"`);
    }
    if (previousClasses) {
      classList.remove(...previousClasses);
    }
    classList.add(...newClasses);
    this._appearance = appearance;
  }
  static ɵfac = function MatButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButton)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatButton,
    selectors: [["button", "matButton", ""], ["a", "matButton", ""], ["button", "mat-button", ""], ["button", "mat-raised-button", ""], ["button", "mat-flat-button", ""], ["button", "mat-stroked-button", ""], ["a", "mat-button", ""], ["a", "mat-raised-button", ""], ["a", "mat-flat-button", ""], ["a", "mat-stroked-button", ""]],
    hostAttrs: [1, "mdc-button"],
    inputs: {
      appearance: [0, "matButton", "appearance"]
    },
    exportAs: ["matButton", "matAnchor"],
    features: [ɵɵInheritDefinitionFeature],
    attrs: _c05,
    ngContentSelectors: _c23,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function MatButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c14);
        ɵɵdomElement(0, "span", 0);
        ɵɵprojection(1);
        ɵɵdomElementStart(2, "span", 1);
        ɵɵprojection(3, 1);
        ɵɵdomElementEnd();
        ɵɵprojection(4, 2);
        ɵɵdomElement(5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        ɵɵclassProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: ['.mat-mdc-button-base {\n  text-decoration: none;\n}\n.mat-mdc-button-base .mat-icon {\n  min-height: fit-content;\n  flex-shrink: 0;\n}\n@media (hover: none) {\n  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {\n    opacity: 0;\n  }\n}\n\n.mdc-button {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  border: none;\n  outline: none;\n  line-height: inherit;\n  -webkit-appearance: none;\n  overflow: visible;\n  vertical-align: middle;\n  background: transparent;\n  padding: 0 8px;\n}\n.mdc-button::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mdc-button:active {\n  outline: none;\n}\n.mdc-button:hover {\n  cursor: pointer;\n}\n.mdc-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-button[hidden] {\n  display: none;\n}\n.mdc-button .mdc-button__label {\n  position: relative;\n}\n\n.mat-mdc-button {\n  padding: 0 var(--mat-button-text-horizontal-padding, 12px);\n  height: var(--mat-button-text-container-height, 40px);\n  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-text-label-text-transform);\n  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));\n}\n.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {\n  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));\n}\n.mat-mdc-button:not(:disabled) {\n  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));\n}\n.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {\n  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);\n}\n.mat-mdc-button > .mat-icon {\n  margin-right: var(--mat-button-text-icon-spacing, 8px);\n  margin-left: var(--mat-button-text-icon-offset, -4px);\n}\n[dir=rtl] .mat-mdc-button > .mat-icon {\n  margin-right: var(--mat-button-text-icon-offset, -4px);\n  margin-left: var(--mat-button-text-icon-spacing, 8px);\n}\n.mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-text-icon-offset, -4px);\n  margin-left: var(--mat-button-text-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-text-icon-spacing, 8px);\n  margin-left: var(--mat-button-text-icon-offset, -4px);\n}\n.mat-mdc-button .mat-ripple-element {\n  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-text-touch-target-size, 48px);\n  display: var(--mat-button-text-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-unelevated-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-filled-container-height, 40px);\n  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-filled-label-text-transform);\n  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);\n}\n.mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--mat-button-filled-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--mat-button-filled-icon-offset, -8px);\n  margin-left: var(--mat-button-filled-icon-spacing, 8px);\n}\n.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-filled-icon-offset, -8px);\n  margin-left: var(--mat-button-filled-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--mat-button-filled-icon-offset, -8px);\n}\n.mat-mdc-unelevated-button .mat-ripple-element {\n  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-filled-touch-target-size, 48px);\n  display: var(--mat-button-filled-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-unelevated-button:not(:disabled) {\n  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));\n  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));\n}\n.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {\n  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));\n}\n.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-raised-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));\n  height: var(--mat-button-protected-container-height, 40px);\n  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-protected-label-text-transform);\n  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);\n}\n.mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--mat-button-protected-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--mat-button-protected-icon-offset, -8px);\n  margin-left: var(--mat-button-protected-icon-spacing, 8px);\n}\n.mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-protected-icon-offset, -8px);\n  margin-left: var(--mat-button-protected-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--mat-button-protected-icon-offset, -8px);\n}\n.mat-mdc-raised-button .mat-ripple-element {\n  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-raised-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-protected-touch-target-size, 48px);\n  display: var(--mat-button-protected-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-raised-button:not(:disabled) {\n  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));\n  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));\n}\n.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {\n  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));\n}\n@media (hover: hover) {\n  .mat-mdc-raised-button:hover {\n    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));\n  }\n}\n.mat-mdc-raised-button:focus {\n  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));\n}\n.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {\n  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));\n}\n.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {\n  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-outlined-button {\n  border-style: solid;\n  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-outlined-container-height, 40px);\n  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-outlined-label-text-transform);\n  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));\n  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));\n  border-width: var(--mat-button-outlined-outline-width, 1px);\n  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);\n}\n.mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--mat-button-outlined-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--mat-button-outlined-icon-spacing, 8px);\n}\n.mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--mat-button-outlined-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--mat-button-outlined-icon-offset, -8px);\n}\n.mat-mdc-outlined-button .mat-ripple-element {\n  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-outlined-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-outlined-touch-target-size, 48px);\n  display: var(--mat-button-outlined-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-outlined-button:not(:disabled) {\n  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));\n  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));\n}\n.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-tonal-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-tonal-container-height, 40px);\n  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-tonal-label-text-transform);\n  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);\n}\n.mat-tonal-button:not(:disabled) {\n  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));\n  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));\n}\n.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {\n  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));\n}\n.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-tonal-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-tonal-button > .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--mat-button-tonal-icon-offset, -8px);\n}\n[dir=rtl] .mat-tonal-button > .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--mat-button-tonal-icon-spacing, 8px);\n}\n.mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--mat-button-tonal-icon-spacing, 8px);\n}\n[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--mat-button-tonal-icon-offset, -8px);\n}\n.mat-tonal-button .mat-ripple-element {\n  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-tonal-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-tonal-touch-target-size, 48px);\n  display: var(--mat-button-tonal-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-button,\n.mat-mdc-unelevated-button,\n.mat-mdc-raised-button,\n.mat-mdc-outlined-button,\n.mat-tonal-button {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-button .mdc-button__label,\n.mat-mdc-button .mat-icon,\n.mat-mdc-unelevated-button .mdc-button__label,\n.mat-mdc-unelevated-button .mat-icon,\n.mat-mdc-raised-button .mdc-button__label,\n.mat-mdc-raised-button .mat-icon,\n.mat-mdc-outlined-button .mdc-button__label,\n.mat-mdc-outlined-button .mat-icon,\n.mat-tonal-button .mdc-button__label,\n.mat-tonal-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-button .mat-focus-indicator,\n.mat-mdc-unelevated-button .mat-focus-indicator,\n.mat-mdc-raised-button .mat-focus-indicator,\n.mat-mdc-outlined-button .mat-focus-indicator,\n.mat-tonal-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,\n.mat-tonal-button:focus-visible > .mat-focus-indicator::before {\n  content: "";\n  border-radius: inherit;\n}\n.mat-mdc-button._mat-animation-noopable,\n.mat-mdc-unelevated-button._mat-animation-noopable,\n.mat-mdc-raised-button._mat-animation-noopable,\n.mat-mdc-outlined-button._mat-animation-noopable,\n.mat-tonal-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-button > .mat-icon,\n.mat-mdc-unelevated-button > .mat-icon,\n.mat-mdc-raised-button > .mat-icon,\n.mat-mdc-outlined-button > .mat-icon,\n.mat-tonal-button > .mat-icon {\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n  font-size: 1.125rem;\n  height: 1.125rem;\n  width: 1.125rem;\n}\n\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mdc-button__ripple {\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n}\n\n.mat-mdc-unelevated-button .mat-focus-indicator::before,\n.mat-tonal-button .mat-focus-indicator::before,\n.mat-mdc-raised-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-outlined-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);\n}\n', "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButton, [{
    type: Component,
    args: [{
      selector: `
    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],
    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],
    a[mat-flat-button], a[mat-stroked-button]
  `,
      host: {
        "class": "mdc-button"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<span
    class="mat-mdc-button-persistent-ripple"
    [class.mdc-button__ripple]="!_isFab"
    [class.mdc-fab__ripple]="_isFab"></span>

<ng-content select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])">
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]">
</ng-content>

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-button-base {\n  text-decoration: none;\n}\n.mat-mdc-button-base .mat-icon {\n  min-height: fit-content;\n  flex-shrink: 0;\n}\n@media (hover: none) {\n  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {\n    opacity: 0;\n  }\n}\n\n.mdc-button {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  border: none;\n  outline: none;\n  line-height: inherit;\n  -webkit-appearance: none;\n  overflow: visible;\n  vertical-align: middle;\n  background: transparent;\n  padding: 0 8px;\n}\n.mdc-button::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mdc-button:active {\n  outline: none;\n}\n.mdc-button:hover {\n  cursor: pointer;\n}\n.mdc-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-button[hidden] {\n  display: none;\n}\n.mdc-button .mdc-button__label {\n  position: relative;\n}\n\n.mat-mdc-button {\n  padding: 0 var(--mat-button-text-horizontal-padding, 12px);\n  height: var(--mat-button-text-container-height, 40px);\n  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-text-label-text-transform);\n  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));\n}\n.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {\n  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));\n}\n.mat-mdc-button:not(:disabled) {\n  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));\n}\n.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {\n  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);\n}\n.mat-mdc-button > .mat-icon {\n  margin-right: var(--mat-button-text-icon-spacing, 8px);\n  margin-left: var(--mat-button-text-icon-offset, -4px);\n}\n[dir=rtl] .mat-mdc-button > .mat-icon {\n  margin-right: var(--mat-button-text-icon-offset, -4px);\n  margin-left: var(--mat-button-text-icon-spacing, 8px);\n}\n.mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-text-icon-offset, -4px);\n  margin-left: var(--mat-button-text-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-text-icon-spacing, 8px);\n  margin-left: var(--mat-button-text-icon-offset, -4px);\n}\n.mat-mdc-button .mat-ripple-element {\n  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-text-touch-target-size, 48px);\n  display: var(--mat-button-text-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-unelevated-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-filled-container-height, 40px);\n  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-filled-label-text-transform);\n  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);\n}\n.mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--mat-button-filled-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--mat-button-filled-icon-offset, -8px);\n  margin-left: var(--mat-button-filled-icon-spacing, 8px);\n}\n.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-filled-icon-offset, -8px);\n  margin-left: var(--mat-button-filled-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--mat-button-filled-icon-offset, -8px);\n}\n.mat-mdc-unelevated-button .mat-ripple-element {\n  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-filled-touch-target-size, 48px);\n  display: var(--mat-button-filled-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-unelevated-button:not(:disabled) {\n  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));\n  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));\n}\n.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {\n  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));\n}\n.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-raised-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));\n  height: var(--mat-button-protected-container-height, 40px);\n  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-protected-label-text-transform);\n  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);\n}\n.mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--mat-button-protected-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--mat-button-protected-icon-offset, -8px);\n  margin-left: var(--mat-button-protected-icon-spacing, 8px);\n}\n.mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-protected-icon-offset, -8px);\n  margin-left: var(--mat-button-protected-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--mat-button-protected-icon-offset, -8px);\n}\n.mat-mdc-raised-button .mat-ripple-element {\n  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-raised-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-protected-touch-target-size, 48px);\n  display: var(--mat-button-protected-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-raised-button:not(:disabled) {\n  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));\n  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));\n}\n.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {\n  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));\n}\n@media (hover: hover) {\n  .mat-mdc-raised-button:hover {\n    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));\n  }\n}\n.mat-mdc-raised-button:focus {\n  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));\n}\n.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {\n  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));\n}\n.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {\n  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-outlined-button {\n  border-style: solid;\n  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-outlined-container-height, 40px);\n  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-outlined-label-text-transform);\n  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));\n  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));\n  border-width: var(--mat-button-outlined-outline-width, 1px);\n  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);\n}\n.mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--mat-button-outlined-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--mat-button-outlined-icon-spacing, 8px);\n}\n.mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--mat-button-outlined-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--mat-button-outlined-icon-offset, -8px);\n}\n.mat-mdc-outlined-button .mat-ripple-element {\n  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-outlined-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-outlined-touch-target-size, 48px);\n  display: var(--mat-button-outlined-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-outlined-button:not(:disabled) {\n  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));\n  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));\n}\n.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-tonal-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-tonal-container-height, 40px);\n  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-tonal-label-text-transform);\n  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);\n}\n.mat-tonal-button:not(:disabled) {\n  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));\n  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));\n}\n.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {\n  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));\n}\n.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-tonal-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-tonal-button > .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--mat-button-tonal-icon-offset, -8px);\n}\n[dir=rtl] .mat-tonal-button > .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--mat-button-tonal-icon-spacing, 8px);\n}\n.mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--mat-button-tonal-icon-spacing, 8px);\n}\n[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--mat-button-tonal-icon-offset, -8px);\n}\n.mat-tonal-button .mat-ripple-element {\n  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-tonal-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-tonal-touch-target-size, 48px);\n  display: var(--mat-button-tonal-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-button,\n.mat-mdc-unelevated-button,\n.mat-mdc-raised-button,\n.mat-mdc-outlined-button,\n.mat-tonal-button {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-button .mdc-button__label,\n.mat-mdc-button .mat-icon,\n.mat-mdc-unelevated-button .mdc-button__label,\n.mat-mdc-unelevated-button .mat-icon,\n.mat-mdc-raised-button .mdc-button__label,\n.mat-mdc-raised-button .mat-icon,\n.mat-mdc-outlined-button .mdc-button__label,\n.mat-mdc-outlined-button .mat-icon,\n.mat-tonal-button .mdc-button__label,\n.mat-tonal-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-button .mat-focus-indicator,\n.mat-mdc-unelevated-button .mat-focus-indicator,\n.mat-mdc-raised-button .mat-focus-indicator,\n.mat-mdc-outlined-button .mat-focus-indicator,\n.mat-tonal-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,\n.mat-tonal-button:focus-visible > .mat-focus-indicator::before {\n  content: "";\n  border-radius: inherit;\n}\n.mat-mdc-button._mat-animation-noopable,\n.mat-mdc-unelevated-button._mat-animation-noopable,\n.mat-mdc-raised-button._mat-animation-noopable,\n.mat-mdc-outlined-button._mat-animation-noopable,\n.mat-tonal-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-button > .mat-icon,\n.mat-mdc-unelevated-button > .mat-icon,\n.mat-mdc-raised-button > .mat-icon,\n.mat-mdc-outlined-button > .mat-icon,\n.mat-tonal-button > .mat-icon {\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n  font-size: 1.125rem;\n  height: 1.125rem;\n  width: 1.125rem;\n}\n\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mdc-button__ripple {\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n}\n\n.mat-mdc-unelevated-button .mat-focus-indicator::before,\n.mat-tonal-button .mat-focus-indicator::before,\n.mat-mdc-raised-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-outlined-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);\n}\n', "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"]
    }]
  }], () => [], {
    appearance: [{
      type: Input,
      args: ["matButton"]
    }]
  });
})();
function _inferAppearance(button) {
  if (button.hasAttribute("mat-raised-button")) {
    return "elevated";
  }
  if (button.hasAttribute("mat-stroked-button")) {
    return "outlined";
  }
  if (button.hasAttribute("mat-flat-button")) {
    return "filled";
  }
  if (button.hasAttribute("mat-button")) {
    return "text";
  }
  return null;
}
var MAT_FAB_DEFAULT_OPTIONS = new InjectionToken("mat-mdc-fab-default-options", {
  providedIn: "root",
  factory: () => defaults
});
var defaults = {
  color: "accent"
};
var MatFabButton = class _MatFabButton extends MatButtonBase {
  _options = inject(MAT_FAB_DEFAULT_OPTIONS, {
    optional: true
  });
  _isFab = true;
  extended = false;
  constructor() {
    super();
    this._options = this._options || defaults;
    this.color = this._options.color || defaults.color;
  }
  static ɵfac = function MatFabButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFabButton)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatFabButton,
    selectors: [["button", "mat-fab", ""], ["a", "mat-fab", ""], ["button", "matFab", ""], ["a", "matFab", ""]],
    hostAttrs: [1, "mdc-fab", "mat-mdc-fab-base", "mat-mdc-fab"],
    hostVars: 4,
    hostBindings: function MatFabButton_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mdc-fab--extended", ctx.extended)("mat-mdc-extended-fab", ctx.extended);
      }
    },
    inputs: {
      extended: [2, "extended", "extended", booleanAttribute]
    },
    exportAs: ["matButton", "matAnchor"],
    features: [ɵɵInheritDefinitionFeature],
    attrs: _c33,
    ngContentSelectors: _c23,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function MatFabButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c14);
        ɵɵdomElement(0, "span", 0);
        ɵɵprojection(1);
        ɵɵdomElementStart(2, "span", 1);
        ɵɵprojection(3, 1);
        ɵɵdomElementEnd();
        ɵɵprojection(4, 2);
        ɵɵdomElement(5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        ɵɵclassProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: ['.mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: "";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));\n  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-touch-target-size, 48px);\n  display: var(--mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));\n  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-small-touch-target-size, 48px);\n  display: var(--mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));\n  height: var(--mat-fab-extended-container-height, 56px);\n  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));\n  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFabButton, [{
    type: Component,
    args: [{
      selector: `button[mat-fab], a[mat-fab], button[matFab], a[matFab]`,
      host: {
        "class": "mdc-fab mat-mdc-fab-base mat-mdc-fab",
        "[class.mdc-fab--extended]": "extended",
        "[class.mat-mdc-extended-fab]": "extended"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<span
    class="mat-mdc-button-persistent-ripple"
    [class.mdc-button__ripple]="!_isFab"
    [class.mdc-fab__ripple]="_isFab"></span>

<ng-content select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])">
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]">
</ng-content>

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: "";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));\n  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-touch-target-size, 48px);\n  display: var(--mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));\n  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-small-touch-target-size, 48px);\n  display: var(--mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));\n  height: var(--mat-fab-extended-container-height, 56px);\n  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));\n  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n']
    }]
  }], () => [], {
    extended: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatMiniFabButton = class _MatMiniFabButton extends MatButtonBase {
  _options = inject(MAT_FAB_DEFAULT_OPTIONS, {
    optional: true
  });
  _isFab = true;
  constructor() {
    super();
    this._options = this._options || defaults;
    this.color = this._options.color || defaults.color;
  }
  static ɵfac = function MatMiniFabButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMiniFabButton)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatMiniFabButton,
    selectors: [["button", "mat-mini-fab", ""], ["a", "mat-mini-fab", ""], ["button", "matMiniFab", ""], ["a", "matMiniFab", ""]],
    hostAttrs: [1, "mdc-fab", "mat-mdc-fab-base", "mdc-fab--mini", "mat-mdc-mini-fab"],
    exportAs: ["matButton", "matAnchor"],
    features: [ɵɵInheritDefinitionFeature],
    attrs: _c42,
    ngContentSelectors: _c23,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function MatMiniFabButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c14);
        ɵɵdomElement(0, "span", 0);
        ɵɵprojection(1);
        ɵɵdomElementStart(2, "span", 1);
        ɵɵprojection(3, 1);
        ɵɵdomElementEnd();
        ɵɵprojection(4, 2);
        ɵɵdomElement(5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        ɵɵclassProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [_c5],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMiniFabButton, [{
    type: Component,
    args: [{
      selector: `button[mat-mini-fab], a[mat-mini-fab], button[matMiniFab], a[matMiniFab]`,
      host: {
        "class": "mdc-fab mat-mdc-fab-base mdc-fab--mini mat-mdc-mini-fab"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<span
    class="mat-mdc-button-persistent-ripple"
    [class.mdc-button__ripple]="!_isFab"
    [class.mdc-fab__ripple]="_isFab"></span>

<ng-content select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])">
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]">
</ng-content>

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: "";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));\n  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-touch-target-size, 48px);\n  display: var(--mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));\n  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-small-touch-target-size, 48px);\n  display: var(--mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));\n  height: var(--mat-fab-extended-container-height, 56px);\n  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));\n  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n']
    }]
  }], () => [], null);
})();
var MatButtonModule = class _MatButtonModule {
  static ɵfac = function MatButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButtonModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatButtonModule,
    imports: [MatRippleModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton],
    exports: [BidiModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MatRippleModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonModule, [{
    type: NgModule,
    args: [{
      imports: [MatRippleModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton],
      exports: [BidiModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/paginator.mjs
function MatPaginator_Conditional_2_Conditional_3_For_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-option", 17);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const pageSizeOption_r3 = ctx.$implicit;
    ɵɵproperty("value", pageSizeOption_r3);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", pageSizeOption_r3, " ");
  }
}
function MatPaginator_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-form-field", 14)(1, "mat-select", 16, 0);
    ɵɵlistener("selectionChange", function MatPaginator_Conditional_2_Conditional_3_Template_mat_select_selectionChange_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1._changePageSize($event.value));
    });
    ɵɵrepeaterCreate(3, MatPaginator_Conditional_2_Conditional_3_For_4_Template, 2, 2, "mat-option", 17, ɵɵrepeaterTrackByIdentity);
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 18);
    ɵɵlistener("click", function MatPaginator_Conditional_2_Conditional_3_Template_div_click_5_listener() {
      ɵɵrestoreView(_r1);
      const selectRef_r4 = ɵɵreference(2);
      return ɵɵresetView(selectRef_r4.open());
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("appearance", ctx_r1._formFieldAppearance)("color", ctx_r1.color);
    ɵɵadvance();
    ɵɵproperty("value", ctx_r1.pageSize)("disabled", ctx_r1.disabled);
    ɵɵariaProperty("aria-labelledby", ctx_r1._pageSizeLabelId);
    ɵɵproperty("panelClass", ctx_r1.selectConfig.panelClass || "")("disableOptionCentering", ctx_r1.selectConfig.disableOptionCentering);
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r1._displayedPageSizeOptions);
  }
}
function MatPaginator_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.pageSize);
  }
}
function MatPaginator_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3)(1, "div", 13);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵconditionalCreate(3, MatPaginator_Conditional_2_Conditional_3_Template, 6, 7, "mat-form-field", 14);
    ɵɵconditionalCreate(4, MatPaginator_Conditional_2_Conditional_4_Template, 2, 1, "div", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵattribute("id", ctx_r1._pageSizeLabelId);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1._intl.itemsPerPageLabel, " ");
    ɵɵadvance();
    ɵɵconditional(ctx_r1._displayedPageSizeOptions.length > 1 ? 3 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1._displayedPageSizeOptions.length <= 1 ? 4 : -1);
  }
}
function MatPaginator_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 19);
    ɵɵlistener("click", function MatPaginator_Conditional_6_Template_button_click_0_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._buttonClicked(0, ctx_r1._previousButtonsDisabled()));
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 8);
    ɵɵelement(2, "path", 20);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("matTooltip", ctx_r1._intl.firstPageLabel)("matTooltipDisabled", ctx_r1._previousButtonsDisabled())("disabled", ctx_r1._previousButtonsDisabled())("tabindex", ctx_r1._previousButtonsDisabled() ? -1 : null);
    ɵɵattribute("aria-label", ctx_r1._intl.firstPageLabel);
  }
}
function MatPaginator_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 21);
    ɵɵlistener("click", function MatPaginator_Conditional_13_Template_button_click_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._buttonClicked(ctx_r1.getNumberOfPages() - 1, ctx_r1._nextButtonsDisabled()));
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 8);
    ɵɵelement(2, "path", 22);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("matTooltip", ctx_r1._intl.lastPageLabel)("matTooltipDisabled", ctx_r1._nextButtonsDisabled())("disabled", ctx_r1._nextButtonsDisabled())("tabindex", ctx_r1._nextButtonsDisabled() ? -1 : null);
    ɵɵattribute("aria-label", ctx_r1._intl.lastPageLabel);
  }
}
var MatPaginatorIntl = class _MatPaginatorIntl {
  changes = new Subject();
  itemsPerPageLabel = "Items per page:";
  nextPageLabel = "Next page";
  previousPageLabel = "Previous page";
  firstPageLabel = "First page";
  lastPageLabel = "Last page";
  getRangeLabel = (page, pageSize, length) => {
    if (length == 0 || pageSize == 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} of ${length}`;
  };
  static ɵfac = function MatPaginatorIntl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatorIntl)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MatPaginatorIntl,
    factory: _MatPaginatorIntl.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorIntl, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DEFAULT_PAGE_SIZE = 50;
var PageEvent = class {
  pageIndex;
  previousPageIndex;
  pageSize;
  length;
};
var MAT_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken("MAT_PAGINATOR_DEFAULT_OPTIONS");
var MatPaginator = class _MatPaginator {
  _intl = inject(MatPaginatorIntl);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _formFieldAppearance;
  _pageSizeLabelId = inject(_IdGenerator).getId("mat-paginator-page-size-label-");
  _intlChanges;
  _isInitialized = false;
  _initializedStream = new ReplaySubject(1);
  color;
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value) {
    this._pageIndex = Math.max(value || 0, 0);
    this._changeDetectorRef.markForCheck();
  }
  _pageIndex = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value || 0;
    this._changeDetectorRef.markForCheck();
  }
  _length = 0;
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value) {
    this._pageSize = Math.max(value || 0, 0);
    this._updateDisplayedPageSizeOptions();
  }
  _pageSize;
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value) {
    this._pageSizeOptions = (value || []).map((p) => numberAttribute(p, 0));
    this._updateDisplayedPageSizeOptions();
  }
  _pageSizeOptions = [];
  hidePageSize = false;
  showFirstLastButtons = false;
  selectConfig = {};
  disabled = false;
  page = new EventEmitter();
  _displayedPageSizeOptions;
  initialized = this._initializedStream;
  constructor() {
    const _intl = this._intl;
    const defaults2 = inject(MAT_PAGINATOR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
    if (defaults2) {
      const {
        pageSize,
        pageSizeOptions,
        hidePageSize,
        showFirstLastButtons
      } = defaults2;
      if (pageSize != null) {
        this._pageSize = pageSize;
      }
      if (pageSizeOptions != null) {
        this._pageSizeOptions = pageSizeOptions;
      }
      if (hidePageSize != null) {
        this.hidePageSize = hidePageSize;
      }
      if (showFirstLastButtons != null) {
        this.showFirstLastButtons = showFirstLastButtons;
      }
    }
    this._formFieldAppearance = defaults2?.formFieldAppearance || "outline";
  }
  ngOnInit() {
    this._isInitialized = true;
    this._updateDisplayedPageSizeOptions();
    this._initializedStream.next();
  }
  ngOnDestroy() {
    this._initializedStream.complete();
    this._intlChanges.unsubscribe();
  }
  nextPage() {
    if (this.hasNextPage()) {
      this._navigate(this.pageIndex + 1);
    }
  }
  previousPage() {
    if (this.hasPreviousPage()) {
      this._navigate(this.pageIndex - 1);
    }
  }
  firstPage() {
    if (this.hasPreviousPage()) {
      this._navigate(0);
    }
  }
  lastPage() {
    if (this.hasNextPage()) {
      this._navigate(this.getNumberOfPages() - 1);
    }
  }
  hasPreviousPage() {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }
  hasNextPage() {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }
  getNumberOfPages() {
    if (!this.pageSize) {
      return 0;
    }
    return Math.ceil(this.length / this.pageSize);
  }
  _changePageSize(pageSize) {
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;
    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }
  _nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }
  _previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }
  _updateDisplayedPageSizeOptions() {
    if (!this._isInitialized) {
      return;
    }
    if (!this.pageSize) {
      this._pageSize = this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }
    this._displayedPageSizeOptions = this.pageSizeOptions.slice();
    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }
    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();
  }
  _emitPageEvent(previousPageIndex) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
  _navigate(index) {
    const previousIndex = this.pageIndex;
    if (index !== previousIndex) {
      this.pageIndex = index;
      this._emitPageEvent(previousIndex);
    }
  }
  _buttonClicked(targetIndex, isDisabled) {
    if (!isDisabled) {
      this._navigate(targetIndex);
    }
  }
  static ɵfac = function MatPaginator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginator)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatPaginator,
    selectors: [["mat-paginator"]],
    hostAttrs: ["role", "group", 1, "mat-mdc-paginator"],
    inputs: {
      color: "color",
      pageIndex: [2, "pageIndex", "pageIndex", numberAttribute],
      length: [2, "length", "length", numberAttribute],
      pageSize: [2, "pageSize", "pageSize", numberAttribute],
      pageSizeOptions: "pageSizeOptions",
      hidePageSize: [2, "hidePageSize", "hidePageSize", booleanAttribute],
      showFirstLastButtons: [2, "showFirstLastButtons", "showFirstLastButtons", booleanAttribute],
      selectConfig: "selectConfig",
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      page: "page"
    },
    exportAs: ["matPaginator"],
    decls: 14,
    vars: 14,
    consts: [["selectRef", ""], [1, "mat-mdc-paginator-outer-container"], [1, "mat-mdc-paginator-container"], [1, "mat-mdc-paginator-page-size"], [1, "mat-mdc-paginator-range-actions"], ["aria-atomic", "true", "aria-live", "polite", "role", "status", 1, "mat-mdc-paginator-range-label"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-first", 3, "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-previous", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["viewBox", "0 0 24 24", "focusable", "false", "aria-hidden", "true", 1, "mat-mdc-paginator-icon"], ["d", "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-next", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-last", 3, "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["aria-hidden", "true", 1, "mat-mdc-paginator-page-size-label"], [1, "mat-mdc-paginator-page-size-select", 3, "appearance", "color"], [1, "mat-mdc-paginator-page-size-value"], ["hideSingleSelectionIndicator", "", 3, "selectionChange", "value", "disabled", "aria-labelledby", "panelClass", "disableOptionCentering"], [3, "value"], [1, "mat-mdc-paginator-touch-target", 3, "click"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-first", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-last", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],
    template: function MatPaginator_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 1)(1, "div", 2);
        ɵɵconditionalCreate(2, MatPaginator_Conditional_2_Template, 5, 4, "div", 3);
        ɵɵelementStart(3, "div", 4)(4, "div", 5);
        ɵɵtext(5);
        ɵɵelementEnd();
        ɵɵconditionalCreate(6, MatPaginator_Conditional_6_Template, 3, 5, "button", 6);
        ɵɵelementStart(7, "button", 7);
        ɵɵlistener("click", function MatPaginator_Template_button_click_7_listener() {
          return ctx._buttonClicked(ctx.pageIndex - 1, ctx._previousButtonsDisabled());
        });
        ɵɵnamespaceSVG();
        ɵɵelementStart(8, "svg", 8);
        ɵɵelement(9, "path", 9);
        ɵɵelementEnd()();
        ɵɵnamespaceHTML();
        ɵɵelementStart(10, "button", 10);
        ɵɵlistener("click", function MatPaginator_Template_button_click_10_listener() {
          return ctx._buttonClicked(ctx.pageIndex + 1, ctx._nextButtonsDisabled());
        });
        ɵɵnamespaceSVG();
        ɵɵelementStart(11, "svg", 8);
        ɵɵelement(12, "path", 11);
        ɵɵelementEnd()();
        ɵɵconditionalCreate(13, MatPaginator_Conditional_13_Template, 3, 5, "button", 12);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵconditional(!ctx.hidePageSize ? 2 : -1);
        ɵɵadvance(3);
        ɵɵtextInterpolate1(" ", ctx._intl.getRangeLabel(ctx.pageIndex, ctx.pageSize, ctx.length), " ");
        ɵɵadvance();
        ɵɵconditional(ctx.showFirstLastButtons ? 6 : -1);
        ɵɵadvance();
        ɵɵproperty("matTooltip", ctx._intl.previousPageLabel)("matTooltipDisabled", ctx._previousButtonsDisabled())("disabled", ctx._previousButtonsDisabled())("tabindex", ctx._previousButtonsDisabled() ? -1 : null);
        ɵɵattribute("aria-label", ctx._intl.previousPageLabel);
        ɵɵadvance(3);
        ɵɵproperty("matTooltip", ctx._intl.nextPageLabel)("matTooltipDisabled", ctx._nextButtonsDisabled())("disabled", ctx._nextButtonsDisabled())("tabindex", ctx._nextButtonsDisabled() ? -1 : null);
        ɵɵattribute("aria-label", ctx._intl.nextPageLabel);
        ɵɵadvance(3);
        ɵɵconditional(ctx.showFirstLastButtons ? 13 : -1);
      }
    },
    dependencies: [MatFormField, MatSelect, MatOption, MatIconButton, MatTooltip],
    styles: [".mat-mdc-paginator {\n  display: block;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));\n  background-color: var(--mat-paginator-container-background-color, var(--mat-sys-surface));\n  font-family: var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));\n  line-height: var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));\n  font-size: var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));\n  letter-spacing: var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));\n  --mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);\n  --mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px);\n}\n.mat-mdc-paginator .mat-mdc-select-value {\n  font-size: var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size));\n}\n.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.mat-mdc-paginator .mat-mdc-select {\n  line-height: 1.5;\n}\n\n.mat-mdc-paginator-outer-container {\n  display: flex;\n}\n\n.mat-mdc-paginator-container {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 8px;\n  flex-wrap: wrap;\n  width: 100%;\n  min-height: var(--mat-paginator-container-size, 56px);\n}\n\n.mat-mdc-paginator-page-size {\n  display: flex;\n  align-items: baseline;\n  margin-right: 8px;\n}\n[dir=rtl] .mat-mdc-paginator-page-size {\n  margin-right: 0;\n  margin-left: 8px;\n}\n\n.mat-mdc-paginator-page-size-label {\n  margin: 0 4px;\n}\n\n.mat-mdc-paginator-page-size-select {\n  margin: 0 4px;\n  width: var(--mat-paginator-page-size-select-width, 84px);\n}\n\n.mat-mdc-paginator-range-label {\n  margin: 0 32px 0 24px;\n}\n\n.mat-mdc-paginator-range-actions {\n  display: flex;\n  align-items: center;\n}\n\n.mat-mdc-paginator-icon {\n  display: inline-block;\n  width: 28px;\n  fill: var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {\n  fill: var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n[dir=rtl] .mat-mdc-paginator-icon {\n  transform: rotate(180deg);\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,\n  .mat-mdc-paginator-icon {\n    fill: currentColor;\n  }\n  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {\n    outline: solid 1px;\n  }\n  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {\n    color: GrayText;\n  }\n}\n.mat-mdc-paginator-touch-target {\n  display: var(--mat-paginator-touch-target-display, block);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: var(--mat-paginator-page-size-select-width, 84px);\n  height: var(--mat-paginator-page-size-select-touch-target-height, 48px);\n  background-color: transparent;\n  transform: translate(-50%, -50%);\n  cursor: pointer;\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginator, [{
    type: Component,
    args: [{
      selector: "mat-paginator",
      exportAs: "matPaginator",
      host: {
        "class": "mat-mdc-paginator",
        "role": "group"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [MatFormField, MatSelect, MatOption, MatIconButton, MatTooltip],
      template: '<div class="mat-mdc-paginator-outer-container">\n  <div class="mat-mdc-paginator-container">\n    @if (!hidePageSize) {\n      <div class="mat-mdc-paginator-page-size">\n        <div class="mat-mdc-paginator-page-size-label" [attr.id]="_pageSizeLabelId" aria-hidden="true">\n          {{_intl.itemsPerPageLabel}}\n        </div>\n\n        @if (_displayedPageSizeOptions.length > 1) {\n          <mat-form-field\n            [appearance]="_formFieldAppearance!"\n            [color]="color"\n            class="mat-mdc-paginator-page-size-select">\n            <mat-select\n              #selectRef\n              [value]="pageSize"\n              [disabled]="disabled"\n              [aria-labelledby]="_pageSizeLabelId"\n              [panelClass]="selectConfig.panelClass || \'\'"\n              [disableOptionCentering]="selectConfig.disableOptionCentering"\n              (selectionChange)="_changePageSize($event.value)"\n              hideSingleSelectionIndicator>\n              @for (pageSizeOption of _displayedPageSizeOptions; track pageSizeOption) {\n                <mat-option [value]="pageSizeOption">\n                  {{pageSizeOption}}\n                </mat-option>\n              }\n            </mat-select>\n          <div class="mat-mdc-paginator-touch-target" (click)="selectRef.open()"></div>\n          </mat-form-field>\n        }\n\n        @if (_displayedPageSizeOptions.length <= 1) {\n          <div class="mat-mdc-paginator-page-size-value">{{pageSize}}</div>\n        }\n      </div>\n    }\n\n    <div class="mat-mdc-paginator-range-actions">\n      <div class="mat-mdc-paginator-range-label" aria-atomic="true" aria-live="polite" role="status">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <!--\n      The buttons use `disabledInteractive` so that they can retain focus if they become disabled,\n      otherwise focus is moved to the document body. However, users should not be able to navigate\n      into these buttons, so `tabindex` is set to -1 when disabled.\n      -->\n\n      @if (showFirstLastButtons) {\n        <button matIconButton type="button"\n                class="mat-mdc-paginator-navigation-first"\n                (click)="_buttonClicked(0, _previousButtonsDisabled())"\n                [attr.aria-label]="_intl.firstPageLabel"\n                [matTooltip]="_intl.firstPageLabel"\n                [matTooltipDisabled]="_previousButtonsDisabled()"\n                matTooltipPosition="above"\n                [disabled]="_previousButtonsDisabled()"\n                [tabindex]="_previousButtonsDisabled() ? -1 : null"\n                disabledInteractive>\n          <svg class="mat-mdc-paginator-icon"\n              viewBox="0 0 24 24"\n              focusable="false"\n              aria-hidden="true">\n            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>\n          </svg>\n        </button>\n      }\n      <button matIconButton type="button"\n              class="mat-mdc-paginator-navigation-previous"\n              (click)="_buttonClicked(pageIndex - 1, _previousButtonsDisabled())"\n              [attr.aria-label]="_intl.previousPageLabel"\n              [matTooltip]="_intl.previousPageLabel"\n              [matTooltipDisabled]="_previousButtonsDisabled()"\n              matTooltipPosition="above"\n              [disabled]="_previousButtonsDisabled()"\n              [tabindex]="_previousButtonsDisabled() ? -1 : null"\n              disabledInteractive>\n        <svg class="mat-mdc-paginator-icon"\n             viewBox="0 0 24 24"\n             focusable="false"\n             aria-hidden="true">\n          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n        </svg>\n      </button>\n      <button matIconButton type="button"\n              class="mat-mdc-paginator-navigation-next"\n              (click)="_buttonClicked(pageIndex + 1, _nextButtonsDisabled())"\n              [attr.aria-label]="_intl.nextPageLabel"\n              [matTooltip]="_intl.nextPageLabel"\n              [matTooltipDisabled]="_nextButtonsDisabled()"\n              matTooltipPosition="above"\n              [disabled]="_nextButtonsDisabled()"\n              [tabindex]="_nextButtonsDisabled() ? -1 : null"\n              disabledInteractive>\n        <svg class="mat-mdc-paginator-icon"\n             viewBox="0 0 24 24"\n             focusable="false"\n             aria-hidden="true">\n          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n        </svg>\n      </button>\n      @if (showFirstLastButtons) {\n        <button matIconButton type="button"\n                class="mat-mdc-paginator-navigation-last"\n                (click)="_buttonClicked(getNumberOfPages() - 1, _nextButtonsDisabled())"\n                [attr.aria-label]="_intl.lastPageLabel"\n                [matTooltip]="_intl.lastPageLabel"\n                [matTooltipDisabled]="_nextButtonsDisabled()"\n                matTooltipPosition="above"\n                [disabled]="_nextButtonsDisabled()"\n                [tabindex]="_nextButtonsDisabled() ? -1 : null"\n                disabledInteractive>\n          <svg class="mat-mdc-paginator-icon"\n              viewBox="0 0 24 24"\n              focusable="false"\n              aria-hidden="true">\n            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>\n          </svg>\n        </button>\n      }\n    </div>\n  </div>\n</div>\n',
      styles: [".mat-mdc-paginator {\n  display: block;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));\n  background-color: var(--mat-paginator-container-background-color, var(--mat-sys-surface));\n  font-family: var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));\n  line-height: var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));\n  font-size: var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));\n  letter-spacing: var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));\n  --mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);\n  --mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px);\n}\n.mat-mdc-paginator .mat-mdc-select-value {\n  font-size: var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size));\n}\n.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.mat-mdc-paginator .mat-mdc-select {\n  line-height: 1.5;\n}\n\n.mat-mdc-paginator-outer-container {\n  display: flex;\n}\n\n.mat-mdc-paginator-container {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 8px;\n  flex-wrap: wrap;\n  width: 100%;\n  min-height: var(--mat-paginator-container-size, 56px);\n}\n\n.mat-mdc-paginator-page-size {\n  display: flex;\n  align-items: baseline;\n  margin-right: 8px;\n}\n[dir=rtl] .mat-mdc-paginator-page-size {\n  margin-right: 0;\n  margin-left: 8px;\n}\n\n.mat-mdc-paginator-page-size-label {\n  margin: 0 4px;\n}\n\n.mat-mdc-paginator-page-size-select {\n  margin: 0 4px;\n  width: var(--mat-paginator-page-size-select-width, 84px);\n}\n\n.mat-mdc-paginator-range-label {\n  margin: 0 32px 0 24px;\n}\n\n.mat-mdc-paginator-range-actions {\n  display: flex;\n  align-items: center;\n}\n\n.mat-mdc-paginator-icon {\n  display: inline-block;\n  width: 28px;\n  fill: var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {\n  fill: var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n[dir=rtl] .mat-mdc-paginator-icon {\n  transform: rotate(180deg);\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,\n  .mat-mdc-paginator-icon {\n    fill: currentColor;\n  }\n  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {\n    outline: solid 1px;\n  }\n  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {\n    color: GrayText;\n  }\n}\n.mat-mdc-paginator-touch-target {\n  display: var(--mat-paginator-touch-target-display, block);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: var(--mat-paginator-page-size-select-width, 84px);\n  height: var(--mat-paginator-page-size-select-touch-target-height, 48px);\n  background-color: transparent;\n  transform: translate(-50%, -50%);\n  cursor: pointer;\n}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    pageIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    length: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageSizeOptions: [{
      type: Input
    }],
    hidePageSize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showFirstLastButtons: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectConfig: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    page: [{
      type: Output
    }]
  });
})();
var MatPaginatorModule = class _MatPaginatorModule {
  static ɵfac = function MatPaginatorModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatorModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatPaginatorModule,
    imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator],
    exports: [MatPaginator]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator],
      exports: [MatPaginator]
    }]
  }], null, null);
})();
export {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent
};
//# sourceMappingURL=@angular_material_paginator.js.map
