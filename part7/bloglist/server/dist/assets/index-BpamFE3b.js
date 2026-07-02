var Yx = Object.defineProperty;
var Vx = (t, r, l) =>
  r in t
    ? Yx(t, r, { enumerable: !0, configurable: !0, writable: !0, value: l })
    : (t[r] = l);
var Qo = (t, r, l) => Vx(t, typeof r != "symbol" ? r + "" : r, l);
function Gx(t, r) {
  for (var l = 0; l < r.length; l++) {
    const o = r[l];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const s in o)
        if (s !== "default" && !(s in t)) {
          const c = Object.getOwnPropertyDescriptor(o, s);
          c &&
            Object.defineProperty(
              t,
              s,
              c.get ? c : { enumerable: !0, get: () => o[s] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) o(s);
  new MutationObserver((s) => {
    for (const c of s)
      if (c.type === "childList")
        for (const f of c.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && o(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(s) {
    const c = {};
    return (
      s.integrity && (c.integrity = s.integrity),
      s.referrerPolicy && (c.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (c.credentials = "omit")
          : (c.credentials = "same-origin"),
      c
    );
  }
  function o(s) {
    if (s.ep) return;
    s.ep = !0;
    const c = l(s);
    fetch(s.href, c);
  }
})();
function Nv(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var yd = { exports: {} },
  Zo = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ky;
function Kx() {
  if (ky) return Zo;
  ky = 1;
  var t = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.fragment");
  function l(o, s, c) {
    var f = null;
    if (
      (c !== void 0 && (f = "" + c),
      s.key !== void 0 && (f = "" + s.key),
      "key" in s)
    ) {
      c = {};
      for (var p in s) p !== "key" && (c[p] = s[p]);
    } else c = s;
    return (
      (s = c.ref),
      { $$typeof: t, type: o, key: f, ref: s !== void 0 ? s : null, props: c }
    );
  }
  return ((Zo.Fragment = r), (Zo.jsx = l), (Zo.jsxs = l), Zo);
}
var Uy;
function Xx() {
  return (Uy || ((Uy = 1), (yd.exports = Kx())), yd.exports);
}
var q = Xx(),
  vd = { exports: {} },
  Wo = {},
  bd = { exports: {} },
  Sd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ly;
function Qx() {
  return (
    Ly ||
      ((Ly = 1),
      (function (t) {
        function r(M, $) {
          var W = M.length;
          M.push($);
          e: for (; 0 < W;) {
            var se = (W - 1) >>> 1,
              N = M[se];
            if (0 < s(N, $)) ((M[se] = $), (M[W] = N), (W = se));
            else break e;
          }
        }
        function l(M) {
          return M.length === 0 ? null : M[0];
        }
        function o(M) {
          if (M.length === 0) return null;
          var $ = M[0],
            W = M.pop();
          if (W !== $) {
            M[0] = W;
            e: for (var se = 0, N = M.length, V = N >>> 1; se < V;) {
              var ne = 2 * (se + 1) - 1,
                ee = M[ne],
                oe = ne + 1,
                he = M[oe];
              if (0 > s(ee, W))
                oe < N && 0 > s(he, ee)
                  ? ((M[se] = he), (M[oe] = W), (se = oe))
                  : ((M[se] = ee), (M[ne] = W), (se = ne));
              else if (oe < N && 0 > s(he, W))
                ((M[se] = he), (M[oe] = W), (se = oe));
              else break e;
            }
          }
          return $;
        }
        function s(M, $) {
          var W = M.sortIndex - $.sortIndex;
          return W !== 0 ? W : M.id - $.id;
        }
        if (
          ((t.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var c = performance;
          t.unstable_now = function () {
            return c.now();
          };
        } else {
          var f = Date,
            p = f.now();
          t.unstable_now = function () {
            return f.now() - p;
          };
        }
        var m = [],
          h = [],
          g = 1,
          v = null,
          A = 3,
          x = !1,
          S = !1,
          E = !1,
          C = !1,
          B = typeof setTimeout == "function" ? setTimeout : null,
          D = typeof clearTimeout == "function" ? clearTimeout : null,
          w = typeof setImmediate < "u" ? setImmediate : null;
        function k(M) {
          for (var $ = l(h); $ !== null;) {
            if ($.callback === null) o(h);
            else if ($.startTime <= M)
              (o(h), ($.sortIndex = $.expirationTime), r(m, $));
            else break;
            $ = l(h);
          }
        }
        function O(M) {
          if (((E = !1), k(M), !S))
            if (l(m) !== null) ((S = !0), U || ((U = !0), R()));
            else {
              var $ = l(h);
              $ !== null && z(O, $.startTime - M);
            }
        }
        var U = !1,
          I = -1,
          X = 5,
          le = -1;
        function ue() {
          return C ? !0 : !(t.unstable_now() - le < X);
        }
        function Z() {
          if (((C = !1), U)) {
            var M = t.unstable_now();
            le = M;
            var $ = !0;
            try {
              e: {
                ((S = !1), E && ((E = !1), D(I), (I = -1)), (x = !0));
                var W = A;
                try {
                  t: {
                    for (
                      k(M), v = l(m);
                      v !== null && !(v.expirationTime > M && ue());
                    ) {
                      var se = v.callback;
                      if (typeof se == "function") {
                        ((v.callback = null), (A = v.priorityLevel));
                        var N = se(v.expirationTime <= M);
                        if (((M = t.unstable_now()), typeof N == "function")) {
                          ((v.callback = N), k(M), ($ = !0));
                          break t;
                        }
                        (v === l(m) && o(m), k(M));
                      } else o(m);
                      v = l(m);
                    }
                    if (v !== null) $ = !0;
                    else {
                      var V = l(h);
                      (V !== null && z(O, V.startTime - M), ($ = !1));
                    }
                  }
                  break e;
                } finally {
                  ((v = null), (A = W), (x = !1));
                }
                $ = void 0;
              }
            } finally {
              $ ? R() : (U = !1);
            }
          }
        }
        var R;
        if (typeof w == "function")
          R = function () {
            w(Z);
          };
        else if (typeof MessageChannel < "u") {
          var F = new MessageChannel(),
            L = F.port2;
          ((F.port1.onmessage = Z),
            (R = function () {
              L.postMessage(null);
            }));
        } else
          R = function () {
            B(Z, 0);
          };
        function z(M, $) {
          I = B(function () {
            M(t.unstable_now());
          }, $);
        }
        ((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (M) {
            M.callback = null;
          }),
          (t.unstable_forceFrameRate = function (M) {
            0 > M || 125 < M
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (X = 0 < M ? Math.floor(1e3 / M) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return A;
          }),
          (t.unstable_next = function (M) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var $ = 3;
                break;
              default:
                $ = A;
            }
            var W = A;
            A = $;
            try {
              return M();
            } finally {
              A = W;
            }
          }),
          (t.unstable_requestPaint = function () {
            C = !0;
          }),
          (t.unstable_runWithPriority = function (M, $) {
            switch (M) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                M = 3;
            }
            var W = A;
            A = M;
            try {
              return $();
            } finally {
              A = W;
            }
          }),
          (t.unstable_scheduleCallback = function (M, $, W) {
            var se = t.unstable_now();
            switch (
              (typeof W == "object" && W !== null
                ? ((W = W.delay),
                  (W = typeof W == "number" && 0 < W ? se + W : se))
                : (W = se),
              M)
            ) {
              case 1:
                var N = -1;
                break;
              case 2:
                N = 250;
                break;
              case 5:
                N = 1073741823;
                break;
              case 4:
                N = 1e4;
                break;
              default:
                N = 5e3;
            }
            return (
              (N = W + N),
              (M = {
                id: g++,
                callback: $,
                priorityLevel: M,
                startTime: W,
                expirationTime: N,
                sortIndex: -1,
              }),
              W > se
                ? ((M.sortIndex = W),
                  r(h, M),
                  l(m) === null &&
                    M === l(h) &&
                    (E ? (D(I), (I = -1)) : (E = !0), z(O, W - se)))
                : ((M.sortIndex = N),
                  r(m, M),
                  S || x || ((S = !0), U || ((U = !0), R()))),
              M
            );
          }),
          (t.unstable_shouldYield = ue),
          (t.unstable_wrapCallback = function (M) {
            var $ = A;
            return function () {
              var W = A;
              A = $;
              try {
                return M.apply(this, arguments);
              } finally {
                A = W;
              }
            };
          }));
      })(Sd)),
    Sd
  );
}
var jy;
function Zx() {
  return (jy || ((jy = 1), (bd.exports = Qx())), bd.exports);
}
var xd = { exports: {} },
  we = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $y;
function Wx() {
  if ($y) return we;
  $y = 1;
  var t = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.portal"),
    l = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    s = Symbol.for("react.profiler"),
    c = Symbol.for("react.consumer"),
    f = Symbol.for("react.context"),
    p = Symbol.for("react.forward_ref"),
    m = Symbol.for("react.suspense"),
    h = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    v = Symbol.iterator;
  function A(N) {
    return N === null || typeof N != "object"
      ? null
      : ((N = (v && N[v]) || N["@@iterator"]),
        typeof N == "function" ? N : null);
  }
  var x = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    S = Object.assign,
    E = {};
  function C(N, V, ne) {
    ((this.props = N),
      (this.context = V),
      (this.refs = E),
      (this.updater = ne || x));
  }
  ((C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (N, V) {
      if (typeof N != "object" && typeof N != "function" && N != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, N, V, "setState");
    }),
    (C.prototype.forceUpdate = function (N) {
      this.updater.enqueueForceUpdate(this, N, "forceUpdate");
    }));
  function B() {}
  B.prototype = C.prototype;
  function D(N, V, ne) {
    ((this.props = N),
      (this.context = V),
      (this.refs = E),
      (this.updater = ne || x));
  }
  var w = (D.prototype = new B());
  ((w.constructor = D), S(w, C.prototype), (w.isPureReactComponent = !0));
  var k = Array.isArray,
    O = { H: null, A: null, T: null, S: null, V: null },
    U = Object.prototype.hasOwnProperty;
  function I(N, V, ne, ee, oe, he) {
    return (
      (ne = he.ref),
      {
        $$typeof: t,
        type: N,
        key: V,
        ref: ne !== void 0 ? ne : null,
        props: he,
      }
    );
  }
  function X(N, V) {
    return I(N.type, V, void 0, void 0, void 0, N.props);
  }
  function le(N) {
    return typeof N == "object" && N !== null && N.$$typeof === t;
  }
  function ue(N) {
    var V = { "=": "=0", ":": "=2" };
    return (
      "$" +
      N.replace(/[=:]/g, function (ne) {
        return V[ne];
      })
    );
  }
  var Z = /\/+/g;
  function R(N, V) {
    return typeof N == "object" && N !== null && N.key != null
      ? ue("" + N.key)
      : V.toString(36);
  }
  function F() {}
  function L(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (
          (typeof N.status == "string"
            ? N.then(F, F)
            : ((N.status = "pending"),
              N.then(
                function (V) {
                  N.status === "pending" &&
                    ((N.status = "fulfilled"), (N.value = V));
                },
                function (V) {
                  N.status === "pending" &&
                    ((N.status = "rejected"), (N.reason = V));
                },
              )),
          N.status)
        ) {
          case "fulfilled":
            return N.value;
          case "rejected":
            throw N.reason;
        }
    }
    throw N;
  }
  function z(N, V, ne, ee, oe) {
    var he = typeof N;
    (he === "undefined" || he === "boolean") && (N = null);
    var ce = !1;
    if (N === null) ce = !0;
    else
      switch (he) {
        case "bigint":
        case "string":
        case "number":
          ce = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case t:
            case r:
              ce = !0;
              break;
            case g:
              return ((ce = N._init), z(ce(N._payload), V, ne, ee, oe));
          }
      }
    if (ce)
      return (
        (oe = oe(N)),
        (ce = ee === "" ? "." + R(N, 0) : ee),
        k(oe)
          ? ((ne = ""),
            ce != null && (ne = ce.replace(Z, "$&/") + "/"),
            z(oe, V, ne, "", function (Se) {
              return Se;
            }))
          : oe != null &&
            (le(oe) &&
              (oe = X(
                oe,
                ne +
                  (oe.key == null || (N && N.key === oe.key)
                    ? ""
                    : ("" + oe.key).replace(Z, "$&/") + "/") +
                  ce,
              )),
            V.push(oe)),
        1
      );
    ce = 0;
    var be = ee === "" ? "." : ee + ":";
    if (k(N))
      for (var fe = 0; fe < N.length; fe++)
        ((ee = N[fe]), (he = be + R(ee, fe)), (ce += z(ee, V, ne, he, oe)));
    else if (((fe = A(N)), typeof fe == "function"))
      for (N = fe.call(N), fe = 0; !(ee = N.next()).done;)
        ((ee = ee.value),
          (he = be + R(ee, fe++)),
          (ce += z(ee, V, ne, he, oe)));
    else if (he === "object") {
      if (typeof N.then == "function") return z(L(N), V, ne, ee, oe);
      throw (
        (V = String(N)),
        Error(
          "Objects are not valid as a React child (found: " +
            (V === "[object Object]"
              ? "object with keys {" + Object.keys(N).join(", ") + "}"
              : V) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return ce;
  }
  function M(N, V, ne) {
    if (N == null) return N;
    var ee = [],
      oe = 0;
    return (
      z(N, ee, "", "", function (he) {
        return V.call(ne, he, oe++);
      }),
      ee
    );
  }
  function $(N) {
    if (N._status === -1) {
      var V = N._result;
      ((V = V()),
        V.then(
          function (ne) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 1), (N._result = ne));
          },
          function (ne) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 2), (N._result = ne));
          },
        ),
        N._status === -1 && ((N._status = 0), (N._result = V)));
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var W =
    typeof reportError == "function"
      ? reportError
      : function (N) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var V = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof N == "object" &&
                N !== null &&
                typeof N.message == "string"
                  ? String(N.message)
                  : String(N),
              error: N,
            });
            if (!window.dispatchEvent(V)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", N);
            return;
          }
          console.error(N);
        };
  function se() {}
  return (
    (we.Children = {
      map: M,
      forEach: function (N, V, ne) {
        M(
          N,
          function () {
            V.apply(this, arguments);
          },
          ne,
        );
      },
      count: function (N) {
        var V = 0;
        return (
          M(N, function () {
            V++;
          }),
          V
        );
      },
      toArray: function (N) {
        return (
          M(N, function (V) {
            return V;
          }) || []
        );
      },
      only: function (N) {
        if (!le(N))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return N;
      },
    }),
    (we.Component = C),
    (we.Fragment = l),
    (we.Profiler = s),
    (we.PureComponent = D),
    (we.StrictMode = o),
    (we.Suspense = m),
    (we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O),
    (we.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (N) {
        return O.H.useMemoCache(N);
      },
    }),
    (we.cache = function (N) {
      return function () {
        return N.apply(null, arguments);
      };
    }),
    (we.cloneElement = function (N, V, ne) {
      if (N == null)
        throw Error(
          "The argument must be a React element, but you passed " + N + ".",
        );
      var ee = S({}, N.props),
        oe = N.key,
        he = void 0;
      if (V != null)
        for (ce in (V.ref !== void 0 && (he = void 0),
        V.key !== void 0 && (oe = "" + V.key),
        V))
          !U.call(V, ce) ||
            ce === "key" ||
            ce === "__self" ||
            ce === "__source" ||
            (ce === "ref" && V.ref === void 0) ||
            (ee[ce] = V[ce]);
      var ce = arguments.length - 2;
      if (ce === 1) ee.children = ne;
      else if (1 < ce) {
        for (var be = Array(ce), fe = 0; fe < ce; fe++)
          be[fe] = arguments[fe + 2];
        ee.children = be;
      }
      return I(N.type, oe, void 0, void 0, he, ee);
    }),
    (we.createContext = function (N) {
      return (
        (N = {
          $$typeof: f,
          _currentValue: N,
          _currentValue2: N,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (N.Provider = N),
        (N.Consumer = { $$typeof: c, _context: N }),
        N
      );
    }),
    (we.createElement = function (N, V, ne) {
      var ee,
        oe = {},
        he = null;
      if (V != null)
        for (ee in (V.key !== void 0 && (he = "" + V.key), V))
          U.call(V, ee) &&
            ee !== "key" &&
            ee !== "__self" &&
            ee !== "__source" &&
            (oe[ee] = V[ee]);
      var ce = arguments.length - 2;
      if (ce === 1) oe.children = ne;
      else if (1 < ce) {
        for (var be = Array(ce), fe = 0; fe < ce; fe++)
          be[fe] = arguments[fe + 2];
        oe.children = be;
      }
      if (N && N.defaultProps)
        for (ee in ((ce = N.defaultProps), ce))
          oe[ee] === void 0 && (oe[ee] = ce[ee]);
      return I(N, he, void 0, void 0, null, oe);
    }),
    (we.createRef = function () {
      return { current: null };
    }),
    (we.forwardRef = function (N) {
      return { $$typeof: p, render: N };
    }),
    (we.isValidElement = le),
    (we.lazy = function (N) {
      return { $$typeof: g, _payload: { _status: -1, _result: N }, _init: $ };
    }),
    (we.memo = function (N, V) {
      return { $$typeof: h, type: N, compare: V === void 0 ? null : V };
    }),
    (we.startTransition = function (N) {
      var V = O.T,
        ne = {};
      O.T = ne;
      try {
        var ee = N(),
          oe = O.S;
        (oe !== null && oe(ne, ee),
          typeof ee == "object" &&
            ee !== null &&
            typeof ee.then == "function" &&
            ee.then(se, W));
      } catch (he) {
        W(he);
      } finally {
        O.T = V;
      }
    }),
    (we.unstable_useCacheRefresh = function () {
      return O.H.useCacheRefresh();
    }),
    (we.use = function (N) {
      return O.H.use(N);
    }),
    (we.useActionState = function (N, V, ne) {
      return O.H.useActionState(N, V, ne);
    }),
    (we.useCallback = function (N, V) {
      return O.H.useCallback(N, V);
    }),
    (we.useContext = function (N) {
      return O.H.useContext(N);
    }),
    (we.useDebugValue = function () {}),
    (we.useDeferredValue = function (N, V) {
      return O.H.useDeferredValue(N, V);
    }),
    (we.useEffect = function (N, V, ne) {
      var ee = O.H;
      if (typeof ne == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return ee.useEffect(N, V);
    }),
    (we.useId = function () {
      return O.H.useId();
    }),
    (we.useImperativeHandle = function (N, V, ne) {
      return O.H.useImperativeHandle(N, V, ne);
    }),
    (we.useInsertionEffect = function (N, V) {
      return O.H.useInsertionEffect(N, V);
    }),
    (we.useLayoutEffect = function (N, V) {
      return O.H.useLayoutEffect(N, V);
    }),
    (we.useMemo = function (N, V) {
      return O.H.useMemo(N, V);
    }),
    (we.useOptimistic = function (N, V) {
      return O.H.useOptimistic(N, V);
    }),
    (we.useReducer = function (N, V, ne) {
      return O.H.useReducer(N, V, ne);
    }),
    (we.useRef = function (N) {
      return O.H.useRef(N);
    }),
    (we.useState = function (N) {
      return O.H.useState(N);
    }),
    (we.useSyncExternalStore = function (N, V, ne) {
      return O.H.useSyncExternalStore(N, V, ne);
    }),
    (we.useTransition = function () {
      return O.H.useTransition();
    }),
    (we.version = "19.1.1"),
    we
  );
}
var Hy;
function hp() {
  return (Hy || ((Hy = 1), (xd.exports = Wx())), xd.exports);
}
var Rd = { exports: {} },
  Qt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qy;
function Jx() {
  if (qy) return Qt;
  qy = 1;
  var t = hp();
  function r(m) {
    var h = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        h += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return (
      "Minified React error #" +
      m +
      "; visit " +
      h +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function l() {}
  var o = {
      d: {
        f: l,
        r: function () {
          throw Error(r(522));
        },
        D: l,
        C: l,
        L: l,
        m: l,
        X: l,
        S: l,
        M: l,
      },
      p: 0,
      findDOMNode: null,
    },
    s = Symbol.for("react.portal");
  function c(m, h, g) {
    var v =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: v == null ? null : "" + v,
      children: m,
      containerInfo: h,
      implementation: g,
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(m, h) {
    if (m === "font") return "";
    if (typeof h == "string") return h === "use-credentials" ? h : "";
  }
  return (
    (Qt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (Qt.createPortal = function (m, h) {
      var g =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11))
        throw Error(r(299));
      return c(m, h, null, g);
    }),
    (Qt.flushSync = function (m) {
      var h = f.T,
        g = o.p;
      try {
        if (((f.T = null), (o.p = 2), m)) return m();
      } finally {
        ((f.T = h), (o.p = g), o.d.f());
      }
    }),
    (Qt.preconnect = function (m, h) {
      typeof m == "string" &&
        (h
          ? ((h = h.crossOrigin),
            (h =
              typeof h == "string"
                ? h === "use-credentials"
                  ? h
                  : ""
                : void 0))
          : (h = null),
        o.d.C(m, h));
    }),
    (Qt.prefetchDNS = function (m) {
      typeof m == "string" && o.d.D(m);
    }),
    (Qt.preinit = function (m, h) {
      if (typeof m == "string" && h && typeof h.as == "string") {
        var g = h.as,
          v = p(g, h.crossOrigin),
          A = typeof h.integrity == "string" ? h.integrity : void 0,
          x = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        g === "style"
          ? o.d.S(m, typeof h.precedence == "string" ? h.precedence : void 0, {
              crossOrigin: v,
              integrity: A,
              fetchPriority: x,
            })
          : g === "script" &&
            o.d.X(m, {
              crossOrigin: v,
              integrity: A,
              fetchPriority: x,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
      }
    }),
    (Qt.preinitModule = function (m, h) {
      if (typeof m == "string")
        if (typeof h == "object" && h !== null) {
          if (h.as == null || h.as === "script") {
            var g = p(h.as, h.crossOrigin);
            o.d.M(m, {
              crossOrigin: g,
              integrity: typeof h.integrity == "string" ? h.integrity : void 0,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
          }
        } else h == null && o.d.M(m);
    }),
    (Qt.preload = function (m, h) {
      if (
        typeof m == "string" &&
        typeof h == "object" &&
        h !== null &&
        typeof h.as == "string"
      ) {
        var g = h.as,
          v = p(g, h.crossOrigin);
        o.d.L(m, g, {
          crossOrigin: v,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority:
            typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy:
            typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet:
            typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0,
        });
      }
    }),
    (Qt.preloadModule = function (m, h) {
      if (typeof m == "string")
        if (h) {
          var g = p(h.as, h.crossOrigin);
          o.d.m(m, {
            as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
            crossOrigin: g,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          });
        } else o.d.m(m);
    }),
    (Qt.requestFormReset = function (m) {
      o.d.r(m);
    }),
    (Qt.unstable_batchedUpdates = function (m, h) {
      return m(h);
    }),
    (Qt.useFormState = function (m, h, g) {
      return f.H.useFormState(m, h, g);
    }),
    (Qt.useFormStatus = function () {
      return f.H.useHostTransitionStatus();
    }),
    (Qt.version = "19.1.1"),
    Qt
  );
}
var Py;
function Bv() {
  if (Py) return Rd.exports;
  Py = 1;
  function t() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (r) {
        console.error(r);
      }
  }
  return (t(), (Rd.exports = Jx()), Rd.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Iy;
function eR() {
  if (Iy) return Wo;
  Iy = 1;
  var t = Zx(),
    r = hp(),
    l = Bv();
  function o(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        n += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function c(e) {
    var n = e,
      a = e;
    if (e.alternate) for (; n.return;) n = n.return;
    else {
      e = n;
      do ((n = e), (n.flags & 4098) !== 0 && (a = n.return), (e = n.return));
      while (e);
    }
    return n.tag === 3 ? a : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (
        (n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (c(e) !== e) throw Error(o(188));
  }
  function m(e) {
    var n = e.alternate;
    if (!n) {
      if (((n = c(e)), n === null)) throw Error(o(188));
      return n !== e ? null : e;
    }
    for (var a = e, i = n; ;) {
      var u = a.return;
      if (u === null) break;
      var d = u.alternate;
      if (d === null) {
        if (((i = u.return), i !== null)) {
          a = i;
          continue;
        }
        break;
      }
      if (u.child === d.child) {
        for (d = u.child; d;) {
          if (d === a) return (p(u), e);
          if (d === i) return (p(u), n);
          d = d.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== i.return) ((a = u), (i = d));
      else {
        for (var y = !1, T = u.child; T;) {
          if (T === a) {
            ((y = !0), (a = u), (i = d));
            break;
          }
          if (T === i) {
            ((y = !0), (i = u), (a = d));
            break;
          }
          T = T.sibling;
        }
        if (!y) {
          for (T = d.child; T;) {
            if (T === a) {
              ((y = !0), (a = d), (i = u));
              break;
            }
            if (T === i) {
              ((y = !0), (i = d), (a = u));
              break;
            }
            T = T.sibling;
          }
          if (!y) throw Error(o(189));
        }
      }
      if (a.alternate !== i) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? e : n;
  }
  function h(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null;) {
      if (((n = h(e)), n !== null)) return n;
      e = e.sibling;
    }
    return null;
  }
  var g = Object.assign,
    v = Symbol.for("react.element"),
    A = Symbol.for("react.transitional.element"),
    x = Symbol.for("react.portal"),
    S = Symbol.for("react.fragment"),
    E = Symbol.for("react.strict_mode"),
    C = Symbol.for("react.profiler"),
    B = Symbol.for("react.provider"),
    D = Symbol.for("react.consumer"),
    w = Symbol.for("react.context"),
    k = Symbol.for("react.forward_ref"),
    O = Symbol.for("react.suspense"),
    U = Symbol.for("react.suspense_list"),
    I = Symbol.for("react.memo"),
    X = Symbol.for("react.lazy"),
    le = Symbol.for("react.activity"),
    ue = Symbol.for("react.memo_cache_sentinel"),
    Z = Symbol.iterator;
  function R(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Z && e[Z]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var F = Symbol.for("react.client.reference");
  function L(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === F ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case S:
        return "Fragment";
      case C:
        return "Profiler";
      case E:
        return "StrictMode";
      case O:
        return "Suspense";
      case U:
        return "SuspenseList";
      case le:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case x:
          return "Portal";
        case w:
          return (e.displayName || "Context") + ".Provider";
        case D:
          return (e._context.displayName || "Context") + ".Consumer";
        case k:
          var n = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = n.displayName || n.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case I:
          return (
            (n = e.displayName || null),
            n !== null ? n : L(e.type) || "Memo"
          );
        case X:
          ((n = e._payload), (e = e._init));
          try {
            return L(e(n));
          } catch {}
      }
    return null;
  }
  var z = Array.isArray,
    M = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = { pending: !1, data: null, method: null, action: null },
    se = [],
    N = -1;
  function V(e) {
    return { current: e };
  }
  function ne(e) {
    0 > N || ((e.current = se[N]), (se[N] = null), N--);
  }
  function ee(e, n) {
    (N++, (se[N] = e.current), (e.current = n));
  }
  var oe = V(null),
    he = V(null),
    ce = V(null),
    be = V(null);
  function fe(e, n) {
    switch ((ee(ce, n), ee(he, e), ee(oe, null), n.nodeType)) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? uy(e) : 0;
        break;
      default:
        if (((e = n.tagName), (n = n.namespaceURI)))
          ((n = uy(n)), (e = cy(n, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (ne(oe), ee(oe, e));
  }
  function Se() {
    (ne(oe), ne(he), ne(ce));
  }
  function Oe(e) {
    e.memoizedState !== null && ee(be, e);
    var n = oe.current,
      a = cy(n, e.type);
    n !== a && (ee(he, e), ee(oe, a));
  }
  function rt(e) {
    (he.current === e && (ne(oe), ne(he)),
      be.current === e && (ne(be), (Yo._currentValue = W)));
  }
  var Ye = Object.prototype.hasOwnProperty,
    ze = t.unstable_scheduleCallback,
    Ee = t.unstable_cancelCallback,
    Et = t.unstable_shouldYield,
    Mt = t.unstable_requestPaint,
    ke = t.unstable_now,
    an = t.unstable_getCurrentPriorityLevel,
    ut = t.unstable_ImmediatePriority,
    Ln = t.unstable_UserBlockingPriority,
    En = t.unstable_NormalPriority,
    ur = t.unstable_LowPriority,
    qt = t.unstable_IdlePriority,
    ya = t.log,
    cr = t.unstable_setDisableYieldValue,
    Nt = null,
    Ue = null;
  function it(e) {
    if (
      (typeof ya == "function" && cr(e),
      Ue && typeof Ue.setStrictMode == "function")
    )
      try {
        Ue.setStrictMode(Nt, e);
      } catch {}
  }
  var vt = Math.clz32 ? Math.clz32 : kt,
    Me = Math.log,
    Pt = Math.LN2;
  function kt(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Me(e) / Pt) | 0)) | 0);
  }
  var Yn = 256,
    at = 4194304;
  function fr(e) {
    var n = e & 42;
    if (n !== 0) return n;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function $r(e, n, a) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var u = 0,
      d = e.suspendedLanes,
      y = e.pingedLanes;
    e = e.warmLanes;
    var T = i & 134217727;
    return (
      T !== 0
        ? ((i = T & ~d),
          i !== 0
            ? (u = fr(i))
            : ((y &= T),
              y !== 0
                ? (u = fr(y))
                : a || ((a = T & ~e), a !== 0 && (u = fr(a)))))
        : ((T = i & ~d),
          T !== 0
            ? (u = fr(T))
            : y !== 0
              ? (u = fr(y))
              : a || ((a = i & ~e), a !== 0 && (u = fr(a)))),
      u === 0
        ? 0
        : n !== 0 &&
            n !== u &&
            (n & d) === 0 &&
            ((d = u & -u),
            (a = n & -n),
            d >= a || (d === 32 && (a & 4194048) !== 0))
          ? n
          : u
    );
  }
  function va(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Hi(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function qi() {
    var e = Yn;
    return ((Yn <<= 1), (Yn & 4194048) === 0 && (Yn = 256), e);
  }
  function Pi() {
    var e = at;
    return ((at <<= 1), (at & 62914560) === 0 && (at = 4194304), e);
  }
  function eo(e) {
    for (var n = [], a = 0; 31 > a; a++) n.push(e);
    return n;
  }
  function ba(e, n) {
    ((e.pendingLanes |= n),
      n !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function uc(e, n, a, i, u, d) {
    var y = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var T = e.entanglements,
      _ = e.expirationTimes,
      Y = e.hiddenUpdates;
    for (a = y & ~a; 0 < a;) {
      var te = 31 - vt(a),
        ae = 1 << te;
      ((T[te] = 0), (_[te] = -1));
      var G = Y[te];
      if (G !== null)
        for (Y[te] = null, te = 0; te < G.length; te++) {
          var K = G[te];
          K !== null && (K.lane &= -536870913);
        }
      a &= ~ae;
    }
    (i !== 0 && Ii(e, i, 0),
      d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(y & ~n)));
  }
  function Ii(e, n, a) {
    ((e.pendingLanes |= n), (e.suspendedLanes &= ~n));
    var i = 31 - vt(n);
    ((e.entangledLanes |= n),
      (e.entanglements[i] = e.entanglements[i] | 1073741824 | (a & 4194090)));
  }
  function dr(e, n) {
    var a = (e.entangledLanes |= n);
    for (e = e.entanglements; a;) {
      var i = 31 - vt(a),
        u = 1 << i;
      ((u & n) | (e[i] & n) && (e[i] |= n), (a &= ~u));
    }
  }
  function Qa(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Hr(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Sa() {
    var e = $.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : My(e.type));
  }
  function Za(e, n) {
    var a = $.p;
    try {
      return (($.p = e), n());
    } finally {
      $.p = a;
    }
  }
  var Vn = Math.random().toString(36).slice(2),
    Bt = "__reactFiber$" + Vn,
    Ut = "__reactProps$" + Vn,
    qr = "__reactContainer$" + Vn,
    Gn = "__reactEvents$" + Vn,
    to = "__reactListeners$" + Vn,
    pr = "__reactHandles$" + Vn,
    Fi = "__reactResources$" + Vn,
    xa = "__reactMarker$" + Vn;
  function Wa(e) {
    (delete e[Bt], delete e[Ut], delete e[Gn], delete e[to], delete e[pr]);
  }
  function Pr(e) {
    var n = e[Bt];
    if (n) return n;
    for (var a = e.parentNode; a;) {
      if ((n = a[qr] || a[Bt])) {
        if (
          ((a = n.alternate),
          n.child !== null || (a !== null && a.child !== null))
        )
          for (e = hy(e); e !== null;) {
            if ((a = e[Bt])) return a;
            e = hy(e);
          }
        return n;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function hr(e) {
    if ((e = e[Bt] || e[qr])) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Ir(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(o(33));
  }
  function mr(e) {
    var n = e[Fi];
    return (
      n ||
        (n = e[Fi] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      n
    );
  }
  function bt(e) {
    e[xa] = !0;
  }
  var ie = new Set(),
    me = {};
  function Re(e, n) {
    (Ve(e, n), Ve(e + "Capture", n));
  }
  function Ve(e, n) {
    for (me[e] = n, e = 0; e < n.length; e++) ie.add(n[e]);
  }
  var It = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Ra = {},
    gr = {};
  function no(e) {
    return Ye.call(gr, e)
      ? !0
      : Ye.call(Ra, e)
        ? !1
        : It.test(e)
          ? (gr[e] = !0)
          : ((Ra[e] = !0), !1);
  }
  function Ea(e, n, a) {
    if (no(n))
      if (a === null) e.removeAttribute(n);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var i = n.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + a);
      }
  }
  function Fr(e, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + a);
    }
  }
  function yr(e, n, a, i) {
    if (i === null) e.removeAttribute(a);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(n, a, "" + i);
    }
  }
  var cc, nh;
  function Ja(e) {
    if (cc === void 0)
      try {
        throw Error();
      } catch (a) {
        var n = a.stack.trim().match(/\n( *(at )?)/);
        ((cc = (n && n[1]) || ""),
          (nh =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      cc +
      e +
      nh
    );
  }
  var fc = !1;
  function dc(e, n) {
    if (!e || fc) return "";
    fc = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function () {
          try {
            if (n) {
              var ae = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(ae.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(ae, []);
                } catch (K) {
                  var G = K;
                }
                Reflect.construct(e, [], ae);
              } else {
                try {
                  ae.call();
                } catch (K) {
                  G = K;
                }
                e.call(ae.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (K) {
                G = K;
              }
              (ae = e()) &&
                typeof ae.catch == "function" &&
                ae.catch(function () {});
            }
          } catch (K) {
            if (K && G && typeof K.stack == "string") return [K.stack, G.stack];
          }
          return [null, null];
        },
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var d = i.DetermineComponentFrameRoot(),
        y = d[0],
        T = d[1];
      if (y && T) {
        var _ = y.split(`
`),
          Y = T.split(`
`);
        for (
          u = i = 0;
          i < _.length && !_[i].includes("DetermineComponentFrameRoot");
        )
          i++;
        for (; u < Y.length && !Y[u].includes("DetermineComponentFrameRoot");)
          u++;
        if (i === _.length || u === Y.length)
          for (
            i = _.length - 1, u = Y.length - 1;
            1 <= i && 0 <= u && _[i] !== Y[u];
          )
            u--;
        for (; 1 <= i && 0 <= u; i--, u--)
          if (_[i] !== Y[u]) {
            if (i !== 1 || u !== 1)
              do
                if ((i--, u--, 0 > u || _[i] !== Y[u])) {
                  var te =
                    `
` + _[i].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      te.includes("<anonymous>") &&
                      (te = te.replace("<anonymous>", e.displayName)),
                    te
                  );
                }
              while (1 <= i && 0 <= u);
            break;
          }
      }
    } finally {
      ((fc = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : "") ? Ja(a) : "";
  }
  function $1(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ja(e.type);
      case 16:
        return Ja("Lazy");
      case 13:
        return Ja("Suspense");
      case 19:
        return Ja("SuspenseList");
      case 0:
      case 15:
        return dc(e.type, !1);
      case 11:
        return dc(e.type.render, !1);
      case 1:
        return dc(e.type, !0);
      case 31:
        return Ja("Activity");
      default:
        return "";
    }
  }
  function rh(e) {
    try {
      var n = "";
      do ((n += $1(e)), (e = e.return));
      while (e);
      return n;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  function Tn(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ah(e) {
    var n = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function H1(e) {
    var n = ah(e) ? "checked" : "value",
      a = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
      i = "" + e[n];
    if (
      !e.hasOwnProperty(n) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var u = a.get,
        d = a.set;
      return (
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (y) {
            ((i = "" + y), d.call(this, y));
          },
        }),
        Object.defineProperty(e, n, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return i;
          },
          setValue: function (y) {
            i = "" + y;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[n]);
          },
        }
      );
    }
  }
  function Yi(e) {
    e._valueTracker || (e._valueTracker = H1(e));
  }
  function lh(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var a = n.getValue(),
      i = "";
    return (
      e && (i = ah(e) ? (e.checked ? "true" : "false") : e.value),
      (e = i),
      e !== a ? (n.setValue(e), !0) : !1
    );
  }
  function Vi(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var q1 = /[\n"\\]/g;
  function Cn(e) {
    return e.replace(q1, function (n) {
      return "\\" + n.charCodeAt(0).toString(16) + " ";
    });
  }
  function pc(e, n, a, i, u, d, y, T) {
    ((e.name = ""),
      y != null &&
      typeof y != "function" &&
      typeof y != "symbol" &&
      typeof y != "boolean"
        ? (e.type = y)
        : e.removeAttribute("type"),
      n != null
        ? y === "number"
          ? ((n === 0 && e.value === "") || e.value != n) &&
            (e.value = "" + Tn(n))
          : e.value !== "" + Tn(n) && (e.value = "" + Tn(n))
        : (y !== "submit" && y !== "reset") || e.removeAttribute("value"),
      n != null
        ? hc(e, y, Tn(n))
        : a != null
          ? hc(e, y, Tn(a))
          : i != null && e.removeAttribute("value"),
      u == null && d != null && (e.defaultChecked = !!d),
      u != null &&
        (e.checked = u && typeof u != "function" && typeof u != "symbol"),
      T != null &&
      typeof T != "function" &&
      typeof T != "symbol" &&
      typeof T != "boolean"
        ? (e.name = "" + Tn(T))
        : e.removeAttribute("name"));
  }
  function oh(e, n, a, i, u, d, y, T) {
    if (
      (d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean" &&
        (e.type = d),
      n != null || a != null)
    ) {
      if (!((d !== "submit" && d !== "reset") || n != null)) return;
      ((a = a != null ? "" + Tn(a) : ""),
        (n = n != null ? "" + Tn(n) : a),
        T || n === e.value || (e.value = n),
        (e.defaultValue = n));
    }
    ((i = i ?? u),
      (i = typeof i != "function" && typeof i != "symbol" && !!i),
      (e.checked = T ? e.checked : !!i),
      (e.defaultChecked = !!i),
      y != null &&
        typeof y != "function" &&
        typeof y != "symbol" &&
        typeof y != "boolean" &&
        (e.name = y));
  }
  function hc(e, n, a) {
    (n === "number" && Vi(e.ownerDocument) === e) ||
      e.defaultValue === "" + a ||
      (e.defaultValue = "" + a);
  }
  function el(e, n, a, i) {
    if (((e = e.options), n)) {
      n = {};
      for (var u = 0; u < a.length; u++) n["$" + a[u]] = !0;
      for (a = 0; a < e.length; a++)
        ((u = n.hasOwnProperty("$" + e[a].value)),
          e[a].selected !== u && (e[a].selected = u),
          u && i && (e[a].defaultSelected = !0));
    } else {
      for (a = "" + Tn(a), n = null, u = 0; u < e.length; u++) {
        if (e[u].value === a) {
          ((e[u].selected = !0), i && (e[u].defaultSelected = !0));
          return;
        }
        n !== null || e[u].disabled || (n = e[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function ih(e, n, a) {
    if (
      n != null &&
      ((n = "" + Tn(n)), n !== e.value && (e.value = n), a == null)
    ) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = a != null ? "" + Tn(a) : "";
  }
  function sh(e, n, a, i) {
    if (n == null) {
      if (i != null) {
        if (a != null) throw Error(o(92));
        if (z(i)) {
          if (1 < i.length) throw Error(o(93));
          i = i[0];
        }
        a = i;
      }
      (a == null && (a = ""), (n = a));
    }
    ((a = Tn(n)),
      (e.defaultValue = a),
      (i = e.textContent),
      i === a && i !== "" && i !== null && (e.value = i));
  }
  function tl(e, n) {
    if (n) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var P1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function uh(e, n, a) {
    var i = n.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? i
        ? e.setProperty(n, "")
        : n === "float"
          ? (e.cssFloat = "")
          : (e[n] = "")
      : i
        ? e.setProperty(n, a)
        : typeof a != "number" || a === 0 || P1.has(n)
          ? n === "float"
            ? (e.cssFloat = a)
            : (e[n] = ("" + a).trim())
          : (e[n] = a + "px");
  }
  function ch(e, n, a) {
    if (n != null && typeof n != "object") throw Error(o(62));
    if (((e = e.style), a != null)) {
      for (var i in a)
        !a.hasOwnProperty(i) ||
          (n != null && n.hasOwnProperty(i)) ||
          (i.indexOf("--") === 0
            ? e.setProperty(i, "")
            : i === "float"
              ? (e.cssFloat = "")
              : (e[i] = ""));
      for (var u in n)
        ((i = n[u]), n.hasOwnProperty(u) && a[u] !== i && uh(e, u, i));
    } else for (var d in n) n.hasOwnProperty(d) && uh(e, d, n[d]);
  }
  function mc(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var I1 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    F1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Gi(e) {
    return F1.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var gc = null;
  function yc(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var nl = null,
    rl = null;
  function fh(e) {
    var n = hr(e);
    if (n && (e = n.stateNode)) {
      var a = e[Ut] || null;
      e: switch (((e = n.stateNode), n.type)) {
        case "input":
          if (
            (pc(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
            ),
            (n = a.name),
            a.type === "radio" && n != null)
          ) {
            for (a = e; a.parentNode;) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + Cn("" + n) + '"][type="radio"]',
              ),
                n = 0;
              n < a.length;
              n++
            ) {
              var i = a[n];
              if (i !== e && i.form === e.form) {
                var u = i[Ut] || null;
                if (!u) throw Error(o(90));
                pc(
                  i,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (n = 0; n < a.length; n++)
              ((i = a[n]), i.form === e.form && lh(i));
          }
          break e;
        case "textarea":
          ih(e, a.value, a.defaultValue);
          break e;
        case "select":
          ((n = a.value), n != null && el(e, !!a.multiple, n, !1));
      }
    }
  }
  var vc = !1;
  function dh(e, n, a) {
    if (vc) return e(n, a);
    vc = !0;
    try {
      var i = e(n);
      return i;
    } finally {
      if (
        ((vc = !1),
        (nl !== null || rl !== null) &&
          (_s(), nl && ((n = nl), (e = rl), (rl = nl = null), fh(n), e)))
      )
        for (n = 0; n < e.length; n++) fh(e[n]);
    }
  }
  function ro(e, n) {
    var a = e.stateNode;
    if (a === null) return null;
    var i = a[Ut] || null;
    if (i === null) return null;
    a = i[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((i = !i.disabled) ||
          ((e = e.type),
          (i = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !i));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function") throw Error(o(231, n, typeof a));
    return a;
  }
  var vr = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    bc = !1;
  if (vr)
    try {
      var ao = {};
      (Object.defineProperty(ao, "passive", {
        get: function () {
          bc = !0;
        },
      }),
        window.addEventListener("test", ao, ao),
        window.removeEventListener("test", ao, ao));
    } catch {
      bc = !1;
    }
  var Yr = null,
    Sc = null,
    Ki = null;
  function ph() {
    if (Ki) return Ki;
    var e,
      n = Sc,
      a = n.length,
      i,
      u = "value" in Yr ? Yr.value : Yr.textContent,
      d = u.length;
    for (e = 0; e < a && n[e] === u[e]; e++);
    var y = a - e;
    for (i = 1; i <= y && n[a - i] === u[d - i]; i++);
    return (Ki = u.slice(e, 1 < i ? 1 - i : void 0));
  }
  function Xi(e) {
    var n = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && n === 13 && (e = 13))
        : (e = n),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Qi() {
    return !0;
  }
  function hh() {
    return !1;
  }
  function ln(e) {
    function n(a, i, u, d, y) {
      ((this._reactName = a),
        (this._targetInst = u),
        (this.type = i),
        (this.nativeEvent = d),
        (this.target = y),
        (this.currentTarget = null));
      for (var T in e)
        e.hasOwnProperty(T) && ((a = e[T]), (this[T] = a ? a(d) : d[T]));
      return (
        (this.isDefaultPrevented = (
          d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1
        )
          ? Qi
          : hh),
        (this.isPropagationStopped = hh),
        this
      );
    }
    return (
      g(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = Qi));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = Qi));
        },
        persist: function () {},
        isPersistent: Qi,
      }),
      n
    );
  }
  var Ta = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Zi = ln(Ta),
    lo = g({}, Ta, { view: 0, detail: 0 }),
    Y1 = ln(lo),
    xc,
    Rc,
    oo,
    Wi = g({}, lo, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Tc,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== oo &&
              (oo && e.type === "mousemove"
                ? ((xc = e.screenX - oo.screenX), (Rc = e.screenY - oo.screenY))
                : (Rc = xc = 0),
              (oo = e)),
            xc);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Rc;
      },
    }),
    mh = ln(Wi),
    V1 = g({}, Wi, { dataTransfer: 0 }),
    G1 = ln(V1),
    K1 = g({}, lo, { relatedTarget: 0 }),
    Ec = ln(K1),
    X1 = g({}, Ta, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Q1 = ln(X1),
    Z1 = g({}, Ta, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    W1 = ln(Z1),
    J1 = g({}, Ta, { data: 0 }),
    gh = ln(J1),
    eS = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    tS = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    nS = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function rS(e) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(e)
      : (e = nS[e])
        ? !!n[e]
        : !1;
  }
  function Tc() {
    return rS;
  }
  var aS = g({}, lo, {
      key: function (e) {
        if (e.key) {
          var n = eS[e.key] || e.key;
          if (n !== "Unidentified") return n;
        }
        return e.type === "keypress"
          ? ((e = Xi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? tS[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Tc,
      charCode: function (e) {
        return e.type === "keypress" ? Xi(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Xi(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    lS = ln(aS),
    oS = g({}, Wi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    yh = ln(oS),
    iS = g({}, lo, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Tc,
    }),
    sS = ln(iS),
    uS = g({}, Ta, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    cS = ln(uS),
    fS = g({}, Wi, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    dS = ln(fS),
    pS = g({}, Ta, { newState: 0, oldState: 0 }),
    hS = ln(pS),
    mS = [9, 13, 27, 32],
    Cc = vr && "CompositionEvent" in window,
    io = null;
  vr && "documentMode" in document && (io = document.documentMode);
  var gS = vr && "TextEvent" in window && !io,
    vh = vr && (!Cc || (io && 8 < io && 11 >= io)),
    bh = " ",
    Sh = !1;
  function xh(e, n) {
    switch (e) {
      case "keyup":
        return mS.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Rh(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var al = !1;
  function yS(e, n) {
    switch (e) {
      case "compositionend":
        return Rh(n);
      case "keypress":
        return n.which !== 32 ? null : ((Sh = !0), bh);
      case "textInput":
        return ((e = n.data), e === bh && Sh ? null : e);
      default:
        return null;
    }
  }
  function vS(e, n) {
    if (al)
      return e === "compositionend" || (!Cc && xh(e, n))
        ? ((e = ph()), (Ki = Sc = Yr = null), (al = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return vh && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var bS = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Eh(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!bS[e.type] : n === "textarea";
  }
  function Th(e, n, a, i) {
    (nl ? (rl ? rl.push(i) : (rl = [i])) : (nl = i),
      (n = js(n, "onChange")),
      0 < n.length &&
        ((a = new Zi("onChange", "change", null, a, i)),
        e.push({ event: a, listeners: n })));
  }
  var so = null,
    uo = null;
  function SS(e) {
    ay(e, 0);
  }
  function Ji(e) {
    var n = Ir(e);
    if (lh(n)) return e;
  }
  function Ch(e, n) {
    if (e === "change") return n;
  }
  var Ah = !1;
  if (vr) {
    var Ac;
    if (vr) {
      var wc = "oninput" in document;
      if (!wc) {
        var wh = document.createElement("div");
        (wh.setAttribute("oninput", "return;"),
          (wc = typeof wh.oninput == "function"));
      }
      Ac = wc;
    } else Ac = !1;
    Ah = Ac && (!document.documentMode || 9 < document.documentMode);
  }
  function Oh() {
    so && (so.detachEvent("onpropertychange", Mh), (uo = so = null));
  }
  function Mh(e) {
    if (e.propertyName === "value" && Ji(uo)) {
      var n = [];
      (Th(n, uo, e, yc(e)), dh(SS, n));
    }
  }
  function xS(e, n, a) {
    e === "focusin"
      ? (Oh(), (so = n), (uo = a), so.attachEvent("onpropertychange", Mh))
      : e === "focusout" && Oh();
  }
  function RS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ji(uo);
  }
  function ES(e, n) {
    if (e === "click") return Ji(n);
  }
  function TS(e, n) {
    if (e === "input" || e === "change") return Ji(n);
  }
  function CS(e, n) {
    return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n);
  }
  var pn = typeof Object.is == "function" ? Object.is : CS;
  function co(e, n) {
    if (pn(e, n)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof n != "object" ||
      n === null
    )
      return !1;
    var a = Object.keys(e),
      i = Object.keys(n);
    if (a.length !== i.length) return !1;
    for (i = 0; i < a.length; i++) {
      var u = a[i];
      if (!Ye.call(n, u) || !pn(e[u], n[u])) return !1;
    }
    return !0;
  }
  function Nh(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e;
  }
  function Bh(e, n) {
    var a = Nh(e);
    e = 0;
    for (var i; a;) {
      if (a.nodeType === 3) {
        if (((i = e + a.textContent.length), e <= n && i >= n))
          return { node: a, offset: n - e };
        e = i;
      }
      e: {
        for (; a;) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Nh(a);
    }
  }
  function _h(e, n) {
    return e && n
      ? e === n
        ? !0
        : e && e.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? _h(e, n.parentNode)
            : "contains" in e
              ? e.contains(n)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function Dh(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var n = Vi(e.document); n instanceof e.HTMLIFrameElement;) {
      try {
        var a = typeof n.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = n.contentWindow;
      else break;
      n = Vi(e.document);
    }
    return n;
  }
  function Oc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        n === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var AS = vr && "documentMode" in document && 11 >= document.documentMode,
    ll = null,
    Mc = null,
    fo = null,
    Nc = !1;
  function zh(e, n, a) {
    var i =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Nc ||
      ll == null ||
      ll !== Vi(i) ||
      ((i = ll),
      "selectionStart" in i && Oc(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = (
            (i.ownerDocument && i.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset,
          })),
      (fo && co(fo, i)) ||
        ((fo = i),
        (i = js(Mc, "onSelect")),
        0 < i.length &&
          ((n = new Zi("onSelect", "select", null, n, a)),
          e.push({ event: n, listeners: i }),
          (n.target = ll))));
  }
  function Ca(e, n) {
    var a = {};
    return (
      (a[e.toLowerCase()] = n.toLowerCase()),
      (a["Webkit" + e] = "webkit" + n),
      (a["Moz" + e] = "moz" + n),
      a
    );
  }
  var ol = {
      animationend: Ca("Animation", "AnimationEnd"),
      animationiteration: Ca("Animation", "AnimationIteration"),
      animationstart: Ca("Animation", "AnimationStart"),
      transitionrun: Ca("Transition", "TransitionRun"),
      transitionstart: Ca("Transition", "TransitionStart"),
      transitioncancel: Ca("Transition", "TransitionCancel"),
      transitionend: Ca("Transition", "TransitionEnd"),
    },
    Bc = {},
    kh = {};
  vr &&
    ((kh = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ol.animationend.animation,
      delete ol.animationiteration.animation,
      delete ol.animationstart.animation),
    "TransitionEvent" in window || delete ol.transitionend.transition);
  function Aa(e) {
    if (Bc[e]) return Bc[e];
    if (!ol[e]) return e;
    var n = ol[e],
      a;
    for (a in n) if (n.hasOwnProperty(a) && a in kh) return (Bc[e] = n[a]);
    return e;
  }
  var Uh = Aa("animationend"),
    Lh = Aa("animationiteration"),
    jh = Aa("animationstart"),
    wS = Aa("transitionrun"),
    OS = Aa("transitionstart"),
    MS = Aa("transitioncancel"),
    $h = Aa("transitionend"),
    Hh = new Map(),
    _c =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  _c.push("scrollEnd");
  function jn(e, n) {
    (Hh.set(e, n), Re(n, [e]));
  }
  var qh = new WeakMap();
  function An(e, n) {
    if (typeof e == "object" && e !== null) {
      var a = qh.get(e);
      return a !== void 0
        ? a
        : ((n = { value: e, source: n, stack: rh(n) }), qh.set(e, n), n);
    }
    return { value: e, source: n, stack: rh(n) };
  }
  var wn = [],
    il = 0,
    Dc = 0;
  function es() {
    for (var e = il, n = (Dc = il = 0); n < e;) {
      var a = wn[n];
      wn[n++] = null;
      var i = wn[n];
      wn[n++] = null;
      var u = wn[n];
      wn[n++] = null;
      var d = wn[n];
      if (((wn[n++] = null), i !== null && u !== null)) {
        var y = i.pending;
        (y === null ? (u.next = u) : ((u.next = y.next), (y.next = u)),
          (i.pending = u));
      }
      d !== 0 && Ph(a, u, d);
    }
  }
  function ts(e, n, a, i) {
    ((wn[il++] = e),
      (wn[il++] = n),
      (wn[il++] = a),
      (wn[il++] = i),
      (Dc |= i),
      (e.lanes |= i),
      (e = e.alternate),
      e !== null && (e.lanes |= i));
  }
  function zc(e, n, a, i) {
    return (ts(e, n, a, i), ns(e));
  }
  function sl(e, n) {
    return (ts(e, null, null, n), ns(e));
  }
  function Ph(e, n, a) {
    e.lanes |= a;
    var i = e.alternate;
    i !== null && (i.lanes |= a);
    for (var u = !1, d = e.return; d !== null;)
      ((d.childLanes |= a),
        (i = d.alternate),
        i !== null && (i.childLanes |= a),
        d.tag === 22 &&
          ((e = d.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = d),
        (d = d.return));
    return e.tag === 3
      ? ((d = e.stateNode),
        u &&
          n !== null &&
          ((u = 31 - vt(a)),
          (e = d.hiddenUpdates),
          (i = e[u]),
          i === null ? (e[u] = [n]) : i.push(n),
          (n.lane = a | 536870912)),
        d)
      : null;
  }
  function ns(e) {
    if (50 < Lo) throw ((Lo = 0), (qf = null), Error(o(185)));
    for (var n = e.return; n !== null;) ((e = n), (n = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var ul = {};
  function NS(e, n, a, i) {
    ((this.tag = e),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = n),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function hn(e, n, a, i) {
    return new NS(e, n, a, i);
  }
  function kc(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function br(e, n) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = hn(e.tag, n, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = n),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (n = e.dependencies),
      (a.dependencies =
        n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function Ih(e, n) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = n),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (n = a.dependencies),
          (e.dependencies =
            n === null
              ? null
              : { lanes: n.lanes, firstContext: n.firstContext })),
      e
    );
  }
  function rs(e, n, a, i, u, d) {
    var y = 0;
    if (((i = e), typeof e == "function")) kc(e) && (y = 1);
    else if (typeof e == "string")
      y = _x(e, a, oe.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case le:
          return (
            (e = hn(31, a, n, u)),
            (e.elementType = le),
            (e.lanes = d),
            e
          );
        case S:
          return wa(a.children, u, d, n);
        case E:
          ((y = 8), (u |= 24));
          break;
        case C:
          return (
            (e = hn(12, a, n, u | 2)),
            (e.elementType = C),
            (e.lanes = d),
            e
          );
        case O:
          return ((e = hn(13, a, n, u)), (e.elementType = O), (e.lanes = d), e);
        case U:
          return ((e = hn(19, a, n, u)), (e.elementType = U), (e.lanes = d), e);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case B:
              case w:
                y = 10;
                break e;
              case D:
                y = 9;
                break e;
              case k:
                y = 11;
                break e;
              case I:
                y = 14;
                break e;
              case X:
                ((y = 16), (i = null));
                break e;
            }
          ((y = 29),
            (a = Error(o(130, e === null ? "null" : typeof e, ""))),
            (i = null));
      }
    return (
      (n = hn(y, a, n, u)),
      (n.elementType = e),
      (n.type = i),
      (n.lanes = d),
      n
    );
  }
  function wa(e, n, a, i) {
    return ((e = hn(7, e, i, n)), (e.lanes = a), e);
  }
  function Uc(e, n, a) {
    return ((e = hn(6, e, null, n)), (e.lanes = a), e);
  }
  function Lc(e, n, a) {
    return (
      (n = hn(4, e.children !== null ? e.children : [], e.key, n)),
      (n.lanes = a),
      (n.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      n
    );
  }
  var cl = [],
    fl = 0,
    as = null,
    ls = 0,
    On = [],
    Mn = 0,
    Oa = null,
    Sr = 1,
    xr = "";
  function Ma(e, n) {
    ((cl[fl++] = ls), (cl[fl++] = as), (as = e), (ls = n));
  }
  function Fh(e, n, a) {
    ((On[Mn++] = Sr), (On[Mn++] = xr), (On[Mn++] = Oa), (Oa = e));
    var i = Sr;
    e = xr;
    var u = 32 - vt(i) - 1;
    ((i &= ~(1 << u)), (a += 1));
    var d = 32 - vt(n) + u;
    if (30 < d) {
      var y = u - (u % 5);
      ((d = (i & ((1 << y) - 1)).toString(32)),
        (i >>= y),
        (u -= y),
        (Sr = (1 << (32 - vt(n) + u)) | (a << u) | i),
        (xr = d + e));
    } else ((Sr = (1 << d) | (a << u) | i), (xr = e));
  }
  function jc(e) {
    e.return !== null && (Ma(e, 1), Fh(e, 1, 0));
  }
  function $c(e) {
    for (; e === as;)
      ((as = cl[--fl]), (cl[fl] = null), (ls = cl[--fl]), (cl[fl] = null));
    for (; e === Oa;)
      ((Oa = On[--Mn]),
        (On[Mn] = null),
        (xr = On[--Mn]),
        (On[Mn] = null),
        (Sr = On[--Mn]),
        (On[Mn] = null));
  }
  var en = null,
    mt = null,
    qe = !1,
    Na = null,
    Kn = !1,
    Hc = Error(o(519));
  function Ba(e) {
    var n = Error(o(418, ""));
    throw (mo(An(n, e)), Hc);
  }
  function Yh(e) {
    var n = e.stateNode,
      a = e.type,
      i = e.memoizedProps;
    switch (((n[Bt] = e), (n[Ut] = i), a)) {
      case "dialog":
        (De("cancel", n), De("close", n));
        break;
      case "iframe":
      case "object":
      case "embed":
        De("load", n);
        break;
      case "video":
      case "audio":
        for (a = 0; a < $o.length; a++) De($o[a], n);
        break;
      case "source":
        De("error", n);
        break;
      case "img":
      case "image":
      case "link":
        (De("error", n), De("load", n));
        break;
      case "details":
        De("toggle", n);
        break;
      case "input":
        (De("invalid", n),
          oh(
            n,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0,
          ),
          Yi(n));
        break;
      case "select":
        De("invalid", n);
        break;
      case "textarea":
        (De("invalid", n), sh(n, i.value, i.defaultValue, i.children), Yi(n));
    }
    ((a = i.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      n.textContent === "" + a ||
      i.suppressHydrationWarning === !0 ||
      sy(n.textContent, a)
        ? (i.popover != null && (De("beforetoggle", n), De("toggle", n)),
          i.onScroll != null && De("scroll", n),
          i.onScrollEnd != null && De("scrollend", n),
          i.onClick != null && (n.onclick = $s),
          (n = !0))
        : (n = !1),
      n || Ba(e));
  }
  function Vh(e) {
    for (en = e.return; en;)
      switch (en.tag) {
        case 5:
        case 13:
          Kn = !1;
          return;
        case 27:
        case 3:
          Kn = !0;
          return;
        default:
          en = en.return;
      }
  }
  function po(e) {
    if (e !== en) return !1;
    if (!qe) return (Vh(e), (qe = !0), !1);
    var n = e.tag,
      a;
    if (
      ((a = n !== 3 && n !== 27) &&
        ((a = n === 5) &&
          ((a = e.type),
          (a =
            !(a !== "form" && a !== "button") || rd(e.type, e.memoizedProps))),
        (a = !a)),
      a && mt && Ba(e),
      Vh(e),
      n === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      e: {
        for (e = e.nextSibling, n = 0; e;) {
          if (e.nodeType === 8)
            if (((a = e.data), a === "/$")) {
              if (n === 0) {
                mt = Hn(e.nextSibling);
                break e;
              }
              n--;
            } else (a !== "$" && a !== "$!" && a !== "$?") || n++;
          e = e.nextSibling;
        }
        mt = null;
      }
    } else
      n === 27
        ? ((n = mt), ia(e.type) ? ((e = id), (id = null), (mt = e)) : (mt = n))
        : (mt = en ? Hn(e.stateNode.nextSibling) : null);
    return !0;
  }
  function ho() {
    ((mt = en = null), (qe = !1));
  }
  function Gh() {
    var e = Na;
    return (
      e !== null &&
        (un === null ? (un = e) : un.push.apply(un, e), (Na = null)),
      e
    );
  }
  function mo(e) {
    Na === null ? (Na = [e]) : Na.push(e);
  }
  var qc = V(null),
    _a = null,
    Rr = null;
  function Vr(e, n, a) {
    (ee(qc, n._currentValue), (n._currentValue = a));
  }
  function Er(e) {
    ((e._currentValue = qc.current), ne(qc));
  }
  function Pc(e, n, a) {
    for (; e !== null;) {
      var i = e.alternate;
      if (
        ((e.childLanes & n) !== n
          ? ((e.childLanes |= n), i !== null && (i.childLanes |= n))
          : i !== null && (i.childLanes & n) !== n && (i.childLanes |= n),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function Ic(e, n, a, i) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null;) {
      var d = u.dependencies;
      if (d !== null) {
        var y = u.child;
        d = d.firstContext;
        e: for (; d !== null;) {
          var T = d;
          d = u;
          for (var _ = 0; _ < n.length; _++)
            if (T.context === n[_]) {
              ((d.lanes |= a),
                (T = d.alternate),
                T !== null && (T.lanes |= a),
                Pc(d.return, a, e),
                i || (y = null));
              break e;
            }
          d = T.next;
        }
      } else if (u.tag === 18) {
        if (((y = u.return), y === null)) throw Error(o(341));
        ((y.lanes |= a),
          (d = y.alternate),
          d !== null && (d.lanes |= a),
          Pc(y, a, e),
          (y = null));
      } else y = u.child;
      if (y !== null) y.return = u;
      else
        for (y = u; y !== null;) {
          if (y === e) {
            y = null;
            break;
          }
          if (((u = y.sibling), u !== null)) {
            ((u.return = y.return), (y = u));
            break;
          }
          y = y.return;
        }
      u = y;
    }
  }
  function go(e, n, a, i) {
    e = null;
    for (var u = n, d = !1; u !== null;) {
      if (!d) {
        if ((u.flags & 524288) !== 0) d = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(o(387));
        if (((y = y.memoizedProps), y !== null)) {
          var T = u.type;
          pn(u.pendingProps.value, y.value) ||
            (e !== null ? e.push(T) : (e = [T]));
        }
      } else if (u === be.current) {
        if (((y = u.alternate), y === null)) throw Error(o(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push(Yo) : (e = [Yo]));
      }
      u = u.return;
    }
    (e !== null && Ic(n, e, a, i), (n.flags |= 262144));
  }
  function os(e) {
    for (e = e.firstContext; e !== null;) {
      if (!pn(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Da(e) {
    ((_a = e),
      (Rr = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function Xt(e) {
    return Kh(_a, e);
  }
  function is(e, n) {
    return (_a === null && Da(e), Kh(e, n));
  }
  function Kh(e, n) {
    var a = n._currentValue;
    if (((n = { context: n, memoizedValue: a, next: null }), Rr === null)) {
      if (e === null) throw Error(o(308));
      ((Rr = n),
        (e.dependencies = { lanes: 0, firstContext: n }),
        (e.flags |= 524288));
    } else Rr = Rr.next = n;
    return a;
  }
  var BS =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              n = (this.signal = {
                aborted: !1,
                addEventListener: function (a, i) {
                  e.push(i);
                },
              });
            this.abort = function () {
              ((n.aborted = !0),
                e.forEach(function (a) {
                  return a();
                }));
            };
          },
    _S = t.unstable_scheduleCallback,
    DS = t.unstable_NormalPriority,
    _t = {
      $$typeof: w,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Fc() {
    return { controller: new BS(), data: new Map(), refCount: 0 };
  }
  function yo(e) {
    (e.refCount--,
      e.refCount === 0 &&
        _S(DS, function () {
          e.controller.abort();
        }));
  }
  var vo = null,
    Yc = 0,
    dl = 0,
    pl = null;
  function zS(e, n) {
    if (vo === null) {
      var a = (vo = []);
      ((Yc = 0),
        (dl = Kf()),
        (pl = {
          status: "pending",
          value: void 0,
          then: function (i) {
            a.push(i);
          },
        }));
    }
    return (Yc++, n.then(Xh, Xh), n);
  }
  function Xh() {
    if (--Yc === 0 && vo !== null) {
      pl !== null && (pl.status = "fulfilled");
      var e = vo;
      ((vo = null), (dl = 0), (pl = null));
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function kS(e, n) {
    var a = [],
      i = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          a.push(u);
        },
      };
    return (
      e.then(
        function () {
          ((i.status = "fulfilled"), (i.value = n));
          for (var u = 0; u < a.length; u++) (0, a[u])(n);
        },
        function (u) {
          for (i.status = "rejected", i.reason = u, u = 0; u < a.length; u++)
            (0, a[u])(void 0);
        },
      ),
      i
    );
  }
  var Qh = M.S;
  M.S = function (e, n) {
    (typeof n == "object" &&
      n !== null &&
      typeof n.then == "function" &&
      zS(e, n),
      Qh !== null && Qh(e, n));
  };
  var za = V(null);
  function Vc() {
    var e = za.current;
    return e !== null ? e : st.pooledCache;
  }
  function ss(e, n) {
    n === null ? ee(za, za.current) : ee(za, n.pool);
  }
  function Zh() {
    var e = Vc();
    return e === null ? null : { parent: _t._currentValue, pool: e };
  }
  var bo = Error(o(460)),
    Wh = Error(o(474)),
    us = Error(o(542)),
    Gc = { then: function () {} };
  function Jh(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function cs() {}
  function em(e, n, a) {
    switch (
      ((a = e[a]),
      a === void 0 ? e.push(n) : a !== n && (n.then(cs, cs), (n = a)),
      n.status)
    ) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw ((e = n.reason), nm(e), e);
      default:
        if (typeof n.status == "string") n.then(cs, cs);
        else {
          if (((e = st), e !== null && 100 < e.shellSuspendCounter))
            throw Error(o(482));
          ((e = n),
            (e.status = "pending"),
            e.then(
              function (i) {
                if (n.status === "pending") {
                  var u = n;
                  ((u.status = "fulfilled"), (u.value = i));
                }
              },
              function (i) {
                if (n.status === "pending") {
                  var u = n;
                  ((u.status = "rejected"), (u.reason = i));
                }
              },
            ));
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw ((e = n.reason), nm(e), e);
        }
        throw ((So = n), bo);
    }
  }
  var So = null;
  function tm() {
    if (So === null) throw Error(o(459));
    var e = So;
    return ((So = null), e);
  }
  function nm(e) {
    if (e === bo || e === us) throw Error(o(483));
  }
  var Gr = !1;
  function Kc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Xc(e, n) {
    ((e = e.updateQueue),
      n.updateQueue === e &&
        (n.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function Kr(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Xr(e, n, a) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (((i = i.shared), (Xe & 2) !== 0)) {
      var u = i.pending;
      return (
        u === null ? (n.next = n) : ((n.next = u.next), (u.next = n)),
        (i.pending = n),
        (n = ns(e)),
        Ph(e, null, a),
        n
      );
    }
    return (ts(e, i, n, a), ns(e));
  }
  function xo(e, n, a) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (a & 4194048) !== 0))
    ) {
      var i = n.lanes;
      ((i &= e.pendingLanes), (a |= i), (n.lanes = a), dr(e, a));
    }
  }
  function Qc(e, n) {
    var a = e.updateQueue,
      i = e.alternate;
    if (i !== null && ((i = i.updateQueue), a === i)) {
      var u = null,
        d = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var y = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          (d === null ? (u = d = y) : (d = d.next = y), (a = a.next));
        } while (a !== null);
        d === null ? (u = d = n) : (d = d.next = n);
      } else u = d = n;
      ((a = {
        baseState: i.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: d,
        shared: i.shared,
        callbacks: i.callbacks,
      }),
        (e.updateQueue = a));
      return;
    }
    ((e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = n) : (e.next = n),
      (a.lastBaseUpdate = n));
  }
  var Zc = !1;
  function Ro() {
    if (Zc) {
      var e = pl;
      if (e !== null) throw e;
    }
  }
  function Eo(e, n, a, i) {
    Zc = !1;
    var u = e.updateQueue;
    Gr = !1;
    var d = u.firstBaseUpdate,
      y = u.lastBaseUpdate,
      T = u.shared.pending;
    if (T !== null) {
      u.shared.pending = null;
      var _ = T,
        Y = _.next;
      ((_.next = null), y === null ? (d = Y) : (y.next = Y), (y = _));
      var te = e.alternate;
      te !== null &&
        ((te = te.updateQueue),
        (T = te.lastBaseUpdate),
        T !== y &&
          (T === null ? (te.firstBaseUpdate = Y) : (T.next = Y),
          (te.lastBaseUpdate = _)));
    }
    if (d !== null) {
      var ae = u.baseState;
      ((y = 0), (te = Y = _ = null), (T = d));
      do {
        var G = T.lane & -536870913,
          K = G !== T.lane;
        if (K ? (Le & G) === G : (i & G) === G) {
          (G !== 0 && G === dl && (Zc = !0),
            te !== null &&
              (te = te.next =
                {
                  lane: 0,
                  tag: T.tag,
                  payload: T.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var xe = e,
              ye = T;
            G = n;
            var tt = a;
            switch (ye.tag) {
              case 1:
                if (((xe = ye.payload), typeof xe == "function")) {
                  ae = xe.call(tt, ae, G);
                  break e;
                }
                ae = xe;
                break e;
              case 3:
                xe.flags = (xe.flags & -65537) | 128;
              case 0:
                if (
                  ((xe = ye.payload),
                  (G = typeof xe == "function" ? xe.call(tt, ae, G) : xe),
                  G == null)
                )
                  break e;
                ae = g({}, ae, G);
                break e;
              case 2:
                Gr = !0;
            }
          }
          ((G = T.callback),
            G !== null &&
              ((e.flags |= 64),
              K && (e.flags |= 8192),
              (K = u.callbacks),
              K === null ? (u.callbacks = [G]) : K.push(G)));
        } else
          ((K = {
            lane: G,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null,
          }),
            te === null ? ((Y = te = K), (_ = ae)) : (te = te.next = K),
            (y |= G));
        if (((T = T.next), T === null)) {
          if (((T = u.shared.pending), T === null)) break;
          ((K = T),
            (T = K.next),
            (K.next = null),
            (u.lastBaseUpdate = K),
            (u.shared.pending = null));
        }
      } while (!0);
      (te === null && (_ = ae),
        (u.baseState = _),
        (u.firstBaseUpdate = Y),
        (u.lastBaseUpdate = te),
        d === null && (u.shared.lanes = 0),
        (ra |= y),
        (e.lanes = y),
        (e.memoizedState = ae));
    }
  }
  function rm(e, n) {
    if (typeof e != "function") throw Error(o(191, e));
    e.call(n);
  }
  function am(e, n) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++) rm(a[e], n);
  }
  var hl = V(null),
    fs = V(0);
  function lm(e, n) {
    ((e = Nr), ee(fs, e), ee(hl, n), (Nr = e | n.baseLanes));
  }
  function Wc() {
    (ee(fs, Nr), ee(hl, hl.current));
  }
  function Jc() {
    ((Nr = fs.current), ne(hl), ne(fs));
  }
  var Qr = 0,
    Ne = null,
    Je = null,
    Tt = null,
    ds = !1,
    ml = !1,
    ka = !1,
    ps = 0,
    To = 0,
    gl = null,
    US = 0;
  function St() {
    throw Error(o(321));
  }
  function ef(e, n) {
    if (n === null) return !1;
    for (var a = 0; a < n.length && a < e.length; a++)
      if (!pn(e[a], n[a])) return !1;
    return !0;
  }
  function tf(e, n, a, i, u, d) {
    return (
      (Qr = d),
      (Ne = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (M.H = e === null || e.memoizedState === null ? Pm : Im),
      (ka = !1),
      (d = a(i, u)),
      (ka = !1),
      ml && (d = im(n, a, i, u)),
      om(e),
      d
    );
  }
  function om(e) {
    M.H = bs;
    var n = Je !== null && Je.next !== null;
    if (((Qr = 0), (Tt = Je = Ne = null), (ds = !1), (To = 0), (gl = null), n))
      throw Error(o(300));
    e === null ||
      Lt ||
      ((e = e.dependencies), e !== null && os(e) && (Lt = !0));
  }
  function im(e, n, a, i) {
    Ne = e;
    var u = 0;
    do {
      if ((ml && (gl = null), (To = 0), (ml = !1), 25 <= u))
        throw Error(o(301));
      if (((u += 1), (Tt = Je = null), e.updateQueue != null)) {
        var d = e.updateQueue;
        ((d.lastEffect = null),
          (d.events = null),
          (d.stores = null),
          d.memoCache != null && (d.memoCache.index = 0));
      }
      ((M.H = IS), (d = n(a, i)));
    } while (ml);
    return d;
  }
  function LS() {
    var e = M.H,
      n = e.useState()[0];
    return (
      (n = typeof n.then == "function" ? Co(n) : n),
      (e = e.useState()[0]),
      (Je !== null ? Je.memoizedState : null) !== e && (Ne.flags |= 1024),
      n
    );
  }
  function nf() {
    var e = ps !== 0;
    return ((ps = 0), e);
  }
  function rf(e, n, a) {
    ((n.updateQueue = e.updateQueue), (n.flags &= -2053), (e.lanes &= ~a));
  }
  function af(e) {
    if (ds) {
      for (e = e.memoizedState; e !== null;) {
        var n = e.queue;
        (n !== null && (n.pending = null), (e = e.next));
      }
      ds = !1;
    }
    ((Qr = 0), (Tt = Je = Ne = null), (ml = !1), (To = ps = 0), (gl = null));
  }
  function on() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Tt === null ? (Ne.memoizedState = Tt = e) : (Tt = Tt.next = e), Tt);
  }
  function Ct() {
    if (Je === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Je.next;
    var n = Tt === null ? Ne.memoizedState : Tt.next;
    if (n !== null) ((Tt = n), (Je = e));
    else {
      if (e === null)
        throw Ne.alternate === null ? Error(o(467)) : Error(o(310));
      ((Je = e),
        (e = {
          memoizedState: Je.memoizedState,
          baseState: Je.baseState,
          baseQueue: Je.baseQueue,
          queue: Je.queue,
          next: null,
        }),
        Tt === null ? (Ne.memoizedState = Tt = e) : (Tt = Tt.next = e));
    }
    return Tt;
  }
  function lf() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Co(e) {
    var n = To;
    return (
      (To += 1),
      gl === null && (gl = []),
      (e = em(gl, e, n)),
      (n = Ne),
      (Tt === null ? n.memoizedState : Tt.next) === null &&
        ((n = n.alternate),
        (M.H = n === null || n.memoizedState === null ? Pm : Im)),
      e
    );
  }
  function hs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Co(e);
      if (e.$$typeof === w) return Xt(e);
    }
    throw Error(o(438, String(e)));
  }
  function of(e) {
    var n = null,
      a = Ne.updateQueue;
    if ((a !== null && (n = a.memoCache), n == null)) {
      var i = Ne.alternate;
      i !== null &&
        ((i = i.updateQueue),
        i !== null &&
          ((i = i.memoCache),
          i != null &&
            (n = {
              data: i.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (n == null && (n = { data: [], index: 0 }),
      a === null && ((a = lf()), (Ne.updateQueue = a)),
      (a.memoCache = n),
      (a = n.data[n.index]),
      a === void 0)
    )
      for (a = n.data[n.index] = Array(e), i = 0; i < e; i++) a[i] = ue;
    return (n.index++, a);
  }
  function Tr(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function ms(e) {
    var n = Ct();
    return sf(n, Je, e);
  }
  function sf(e, n, a) {
    var i = e.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = a;
    var u = e.baseQueue,
      d = i.pending;
    if (d !== null) {
      if (u !== null) {
        var y = u.next;
        ((u.next = d.next), (d.next = y));
      }
      ((n.baseQueue = u = d), (i.pending = null));
    }
    if (((d = e.baseState), u === null)) e.memoizedState = d;
    else {
      n = u.next;
      var T = (y = null),
        _ = null,
        Y = n,
        te = !1;
      do {
        var ae = Y.lane & -536870913;
        if (ae !== Y.lane ? (Le & ae) === ae : (Qr & ae) === ae) {
          var G = Y.revertLane;
          if (G === 0)
            (_ !== null &&
              (_ = _.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: Y.action,
                  hasEagerState: Y.hasEagerState,
                  eagerState: Y.eagerState,
                  next: null,
                }),
              ae === dl && (te = !0));
          else if ((Qr & G) === G) {
            ((Y = Y.next), G === dl && (te = !0));
            continue;
          } else
            ((ae = {
              lane: 0,
              revertLane: Y.revertLane,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null,
            }),
              _ === null ? ((T = _ = ae), (y = d)) : (_ = _.next = ae),
              (Ne.lanes |= G),
              (ra |= G));
          ((ae = Y.action),
            ka && a(d, ae),
            (d = Y.hasEagerState ? Y.eagerState : a(d, ae)));
        } else
          ((G = {
            lane: ae,
            revertLane: Y.revertLane,
            action: Y.action,
            hasEagerState: Y.hasEagerState,
            eagerState: Y.eagerState,
            next: null,
          }),
            _ === null ? ((T = _ = G), (y = d)) : (_ = _.next = G),
            (Ne.lanes |= ae),
            (ra |= ae));
        Y = Y.next;
      } while (Y !== null && Y !== n);
      if (
        (_ === null ? (y = d) : (_.next = T),
        !pn(d, e.memoizedState) && ((Lt = !0), te && ((a = pl), a !== null)))
      )
        throw a;
      ((e.memoizedState = d),
        (e.baseState = y),
        (e.baseQueue = _),
        (i.lastRenderedState = d));
    }
    return (u === null && (i.lanes = 0), [e.memoizedState, i.dispatch]);
  }
  function uf(e) {
    var n = Ct(),
      a = n.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var i = a.dispatch,
      u = a.pending,
      d = n.memoizedState;
    if (u !== null) {
      a.pending = null;
      var y = (u = u.next);
      do ((d = e(d, y.action)), (y = y.next));
      while (y !== u);
      (pn(d, n.memoizedState) || (Lt = !0),
        (n.memoizedState = d),
        n.baseQueue === null && (n.baseState = d),
        (a.lastRenderedState = d));
    }
    return [d, i];
  }
  function sm(e, n, a) {
    var i = Ne,
      u = Ct(),
      d = qe;
    if (d) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = n();
    var y = !pn((Je || u).memoizedState, a);
    (y && ((u.memoizedState = a), (Lt = !0)), (u = u.queue));
    var T = fm.bind(null, i, u, e);
    if (
      (Ao(2048, 8, T, [e]),
      u.getSnapshot !== n || y || (Tt !== null && Tt.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        yl(9, gs(), cm.bind(null, i, u, a, n), null),
        st === null)
      )
        throw Error(o(349));
      d || (Qr & 124) !== 0 || um(i, n, a);
    }
    return a;
  }
  function um(e, n, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: n, value: a }),
      (n = Ne.updateQueue),
      n === null
        ? ((n = lf()), (Ne.updateQueue = n), (n.stores = [e]))
        : ((a = n.stores), a === null ? (n.stores = [e]) : a.push(e)));
  }
  function cm(e, n, a, i) {
    ((n.value = a), (n.getSnapshot = i), dm(n) && pm(e));
  }
  function fm(e, n, a) {
    return a(function () {
      dm(n) && pm(e);
    });
  }
  function dm(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var a = n();
      return !pn(e, a);
    } catch {
      return !0;
    }
  }
  function pm(e) {
    var n = sl(e, 2);
    n !== null && bn(n, e, 2);
  }
  function cf(e) {
    var n = on();
    if (typeof e == "function") {
      var a = e;
      if (((e = a()), ka)) {
        it(!0);
        try {
          a();
        } finally {
          it(!1);
        }
      }
    }
    return (
      (n.memoizedState = n.baseState = e),
      (n.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tr,
        lastRenderedState: e,
      }),
      n
    );
  }
  function hm(e, n, a, i) {
    return ((e.baseState = a), sf(e, Je, typeof i == "function" ? i : Tr));
  }
  function jS(e, n, a, i, u) {
    if (vs(e)) throw Error(o(485));
    if (((e = n.action), e !== null)) {
      var d = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (y) {
          d.listeners.push(y);
        },
      };
      (M.T !== null ? a(!0) : (d.isTransition = !1),
        i(d),
        (a = n.pending),
        a === null
          ? ((d.next = n.pending = d), mm(n, d))
          : ((d.next = a.next), (n.pending = a.next = d)));
    }
  }
  function mm(e, n) {
    var a = n.action,
      i = n.payload,
      u = e.state;
    if (n.isTransition) {
      var d = M.T,
        y = {};
      M.T = y;
      try {
        var T = a(u, i),
          _ = M.S;
        (_ !== null && _(y, T), gm(e, n, T));
      } catch (Y) {
        ff(e, n, Y);
      } finally {
        M.T = d;
      }
    } else
      try {
        ((d = a(u, i)), gm(e, n, d));
      } catch (Y) {
        ff(e, n, Y);
      }
  }
  function gm(e, n, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (i) {
            ym(e, n, i);
          },
          function (i) {
            return ff(e, n, i);
          },
        )
      : ym(e, n, a);
  }
  function ym(e, n, a) {
    ((n.status = "fulfilled"),
      (n.value = a),
      vm(n),
      (e.state = a),
      (n = e.pending),
      n !== null &&
        ((a = n.next),
        a === n ? (e.pending = null) : ((a = a.next), (n.next = a), mm(e, a))));
  }
  function ff(e, n, a) {
    var i = e.pending;
    if (((e.pending = null), i !== null)) {
      i = i.next;
      do ((n.status = "rejected"), (n.reason = a), vm(n), (n = n.next));
      while (n !== i);
    }
    e.action = null;
  }
  function vm(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function bm(e, n) {
    return n;
  }
  function Sm(e, n) {
    if (qe) {
      var a = st.formState;
      if (a !== null) {
        e: {
          var i = Ne;
          if (qe) {
            if (mt) {
              t: {
                for (var u = mt, d = Kn; u.nodeType !== 8;) {
                  if (!d) {
                    u = null;
                    break t;
                  }
                  if (((u = Hn(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((d = u.data), (u = d === "F!" || d === "F" ? u : null));
              }
              if (u) {
                ((mt = Hn(u.nextSibling)), (i = u.data === "F!"));
                break e;
              }
            }
            Ba(i);
          }
          i = !1;
        }
        i && (n = a[0]);
      }
    }
    return (
      (a = on()),
      (a.memoizedState = a.baseState = n),
      (i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: bm,
        lastRenderedState: n,
      }),
      (a.queue = i),
      (a = $m.bind(null, Ne, i)),
      (i.dispatch = a),
      (i = cf(!1)),
      (d = gf.bind(null, Ne, !1, i.queue)),
      (i = on()),
      (u = { state: n, dispatch: null, action: e, pending: null }),
      (i.queue = u),
      (a = jS.bind(null, Ne, u, d, a)),
      (u.dispatch = a),
      (i.memoizedState = e),
      [n, a, !1]
    );
  }
  function xm(e) {
    var n = Ct();
    return Rm(n, Je, e);
  }
  function Rm(e, n, a) {
    if (
      ((n = sf(e, n, bm)[0]),
      (e = ms(Tr)[0]),
      typeof n == "object" && n !== null && typeof n.then == "function")
    )
      try {
        var i = Co(n);
      } catch (y) {
        throw y === bo ? us : y;
      }
    else i = n;
    n = Ct();
    var u = n.queue,
      d = u.dispatch;
    return (
      a !== n.memoizedState &&
        ((Ne.flags |= 2048), yl(9, gs(), $S.bind(null, u, a), null)),
      [i, d, e]
    );
  }
  function $S(e, n) {
    e.action = n;
  }
  function Em(e) {
    var n = Ct(),
      a = Je;
    if (a !== null) return Rm(n, a, e);
    (Ct(), (n = n.memoizedState), (a = Ct()));
    var i = a.queue.dispatch;
    return ((a.memoizedState = e), [n, i, !1]);
  }
  function yl(e, n, a, i) {
    return (
      (e = { tag: e, create: a, deps: i, inst: n, next: null }),
      (n = Ne.updateQueue),
      n === null && ((n = lf()), (Ne.updateQueue = n)),
      (a = n.lastEffect),
      a === null
        ? (n.lastEffect = e.next = e)
        : ((i = a.next), (a.next = e), (e.next = i), (n.lastEffect = e)),
      e
    );
  }
  function gs() {
    return { destroy: void 0, resource: void 0 };
  }
  function Tm() {
    return Ct().memoizedState;
  }
  function ys(e, n, a, i) {
    var u = on();
    ((i = i === void 0 ? null : i),
      (Ne.flags |= e),
      (u.memoizedState = yl(1 | n, gs(), a, i)));
  }
  function Ao(e, n, a, i) {
    var u = Ct();
    i = i === void 0 ? null : i;
    var d = u.memoizedState.inst;
    Je !== null && i !== null && ef(i, Je.memoizedState.deps)
      ? (u.memoizedState = yl(n, d, a, i))
      : ((Ne.flags |= e), (u.memoizedState = yl(1 | n, d, a, i)));
  }
  function Cm(e, n) {
    ys(8390656, 8, e, n);
  }
  function Am(e, n) {
    Ao(2048, 8, e, n);
  }
  function wm(e, n) {
    return Ao(4, 2, e, n);
  }
  function Om(e, n) {
    return Ao(4, 4, e, n);
  }
  function Mm(e, n) {
    if (typeof n == "function") {
      e = e();
      var a = n(e);
      return function () {
        typeof a == "function" ? a() : n(null);
      };
    }
    if (n != null)
      return (
        (e = e()),
        (n.current = e),
        function () {
          n.current = null;
        }
      );
  }
  function Nm(e, n, a) {
    ((a = a != null ? a.concat([e]) : null), Ao(4, 4, Mm.bind(null, n, e), a));
  }
  function df() {}
  function Bm(e, n) {
    var a = Ct();
    n = n === void 0 ? null : n;
    var i = a.memoizedState;
    return n !== null && ef(n, i[1]) ? i[0] : ((a.memoizedState = [e, n]), e);
  }
  function _m(e, n) {
    var a = Ct();
    n = n === void 0 ? null : n;
    var i = a.memoizedState;
    if (n !== null && ef(n, i[1])) return i[0];
    if (((i = e()), ka)) {
      it(!0);
      try {
        e();
      } finally {
        it(!1);
      }
    }
    return ((a.memoizedState = [i, n]), i);
  }
  function pf(e, n, a) {
    return a === void 0 || (Qr & 1073741824) !== 0
      ? (e.memoizedState = n)
      : ((e.memoizedState = a), (e = kg()), (Ne.lanes |= e), (ra |= e), a);
  }
  function Dm(e, n, a, i) {
    return pn(a, n)
      ? a
      : hl.current !== null
        ? ((e = pf(e, a, i)), pn(e, n) || (Lt = !0), e)
        : (Qr & 42) === 0
          ? ((Lt = !0), (e.memoizedState = a))
          : ((e = kg()), (Ne.lanes |= e), (ra |= e), n);
  }
  function zm(e, n, a, i, u) {
    var d = $.p;
    $.p = d !== 0 && 8 > d ? d : 8;
    var y = M.T,
      T = {};
    ((M.T = T), gf(e, !1, n, a));
    try {
      var _ = u(),
        Y = M.S;
      if (
        (Y !== null && Y(T, _),
        _ !== null && typeof _ == "object" && typeof _.then == "function")
      ) {
        var te = kS(_, i);
        wo(e, n, te, vn(e));
      } else wo(e, n, i, vn(e));
    } catch (ae) {
      wo(e, n, { then: function () {}, status: "rejected", reason: ae }, vn());
    } finally {
      (($.p = d), (M.T = y));
    }
  }
  function HS() {}
  function hf(e, n, a, i) {
    if (e.tag !== 5) throw Error(o(476));
    var u = km(e).queue;
    zm(
      e,
      u,
      n,
      W,
      a === null
        ? HS
        : function () {
            return (Um(e), a(i));
          },
    );
  }
  function km(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tr,
        lastRenderedState: W,
      },
      next: null,
    };
    var a = {};
    return (
      (n.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Tr,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = n),
      (e = e.alternate),
      e !== null && (e.memoizedState = n),
      n
    );
  }
  function Um(e) {
    var n = km(e).next.queue;
    wo(e, n, {}, vn());
  }
  function mf() {
    return Xt(Yo);
  }
  function Lm() {
    return Ct().memoizedState;
  }
  function jm() {
    return Ct().memoizedState;
  }
  function qS(e) {
    for (var n = e.return; n !== null;) {
      switch (n.tag) {
        case 24:
        case 3:
          var a = vn();
          e = Kr(a);
          var i = Xr(n, e, a);
          (i !== null && (bn(i, n, a), xo(i, n, a)),
            (n = { cache: Fc() }),
            (e.payload = n));
          return;
      }
      n = n.return;
    }
  }
  function PS(e, n, a) {
    var i = vn();
    ((a = {
      lane: i,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      vs(e)
        ? Hm(n, a)
        : ((a = zc(e, n, a, i)), a !== null && (bn(a, e, i), qm(a, n, i))));
  }
  function $m(e, n, a) {
    var i = vn();
    wo(e, n, a, i);
  }
  function wo(e, n, a, i) {
    var u = {
      lane: i,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (vs(e)) Hm(n, u);
    else {
      var d = e.alternate;
      if (
        e.lanes === 0 &&
        (d === null || d.lanes === 0) &&
        ((d = n.lastRenderedReducer), d !== null)
      )
        try {
          var y = n.lastRenderedState,
            T = d(y, a);
          if (((u.hasEagerState = !0), (u.eagerState = T), pn(T, y)))
            return (ts(e, n, u, 0), st === null && es(), !1);
        } catch {
        } finally {
        }
      if (((a = zc(e, n, u, i)), a !== null))
        return (bn(a, e, i), qm(a, n, i), !0);
    }
    return !1;
  }
  function gf(e, n, a, i) {
    if (
      ((i = {
        lane: 2,
        revertLane: Kf(),
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      vs(e))
    ) {
      if (n) throw Error(o(479));
    } else ((n = zc(e, a, i, 2)), n !== null && bn(n, e, 2));
  }
  function vs(e) {
    var n = e.alternate;
    return e === Ne || (n !== null && n === Ne);
  }
  function Hm(e, n) {
    ml = ds = !0;
    var a = e.pending;
    (a === null ? (n.next = n) : ((n.next = a.next), (a.next = n)),
      (e.pending = n));
  }
  function qm(e, n, a) {
    if ((a & 4194048) !== 0) {
      var i = n.lanes;
      ((i &= e.pendingLanes), (a |= i), (n.lanes = a), dr(e, a));
    }
  }
  var bs = {
      readContext: Xt,
      use: hs,
      useCallback: St,
      useContext: St,
      useEffect: St,
      useImperativeHandle: St,
      useLayoutEffect: St,
      useInsertionEffect: St,
      useMemo: St,
      useReducer: St,
      useRef: St,
      useState: St,
      useDebugValue: St,
      useDeferredValue: St,
      useTransition: St,
      useSyncExternalStore: St,
      useId: St,
      useHostTransitionStatus: St,
      useFormState: St,
      useActionState: St,
      useOptimistic: St,
      useMemoCache: St,
      useCacheRefresh: St,
    },
    Pm = {
      readContext: Xt,
      use: hs,
      useCallback: function (e, n) {
        return ((on().memoizedState = [e, n === void 0 ? null : n]), e);
      },
      useContext: Xt,
      useEffect: Cm,
      useImperativeHandle: function (e, n, a) {
        ((a = a != null ? a.concat([e]) : null),
          ys(4194308, 4, Mm.bind(null, n, e), a));
      },
      useLayoutEffect: function (e, n) {
        return ys(4194308, 4, e, n);
      },
      useInsertionEffect: function (e, n) {
        ys(4, 2, e, n);
      },
      useMemo: function (e, n) {
        var a = on();
        n = n === void 0 ? null : n;
        var i = e();
        if (ka) {
          it(!0);
          try {
            e();
          } finally {
            it(!1);
          }
        }
        return ((a.memoizedState = [i, n]), i);
      },
      useReducer: function (e, n, a) {
        var i = on();
        if (a !== void 0) {
          var u = a(n);
          if (ka) {
            it(!0);
            try {
              a(n);
            } finally {
              it(!1);
            }
          }
        } else u = n;
        return (
          (i.memoizedState = i.baseState = u),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: u,
          }),
          (i.queue = e),
          (e = e.dispatch = PS.bind(null, Ne, e)),
          [i.memoizedState, e]
        );
      },
      useRef: function (e) {
        var n = on();
        return ((e = { current: e }), (n.memoizedState = e));
      },
      useState: function (e) {
        e = cf(e);
        var n = e.queue,
          a = $m.bind(null, Ne, n);
        return ((n.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: df,
      useDeferredValue: function (e, n) {
        var a = on();
        return pf(a, e, n);
      },
      useTransition: function () {
        var e = cf(!1);
        return (
          (e = zm.bind(null, Ne, e.queue, !0, !1)),
          (on().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, n, a) {
        var i = Ne,
          u = on();
        if (qe) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = n()), st === null)) throw Error(o(349));
          (Le & 124) !== 0 || um(i, n, a);
        }
        u.memoizedState = a;
        var d = { value: a, getSnapshot: n };
        return (
          (u.queue = d),
          Cm(fm.bind(null, i, d, e), [e]),
          (i.flags |= 2048),
          yl(9, gs(), cm.bind(null, i, d, a, n), null),
          a
        );
      },
      useId: function () {
        var e = on(),
          n = st.identifierPrefix;
        if (qe) {
          var a = xr,
            i = Sr;
          ((a = (i & ~(1 << (32 - vt(i) - 1))).toString(32) + a),
            (n = "«" + n + "R" + a),
            (a = ps++),
            0 < a && (n += "H" + a.toString(32)),
            (n += "»"));
        } else ((a = US++), (n = "«" + n + "r" + a.toString(32) + "»"));
        return (e.memoizedState = n);
      },
      useHostTransitionStatus: mf,
      useFormState: Sm,
      useActionState: Sm,
      useOptimistic: function (e) {
        var n = on();
        n.memoizedState = n.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (n.queue = a),
          (n = gf.bind(null, Ne, !0, a)),
          (a.dispatch = n),
          [e, n]
        );
      },
      useMemoCache: of,
      useCacheRefresh: function () {
        return (on().memoizedState = qS.bind(null, Ne));
      },
    },
    Im = {
      readContext: Xt,
      use: hs,
      useCallback: Bm,
      useContext: Xt,
      useEffect: Am,
      useImperativeHandle: Nm,
      useInsertionEffect: wm,
      useLayoutEffect: Om,
      useMemo: _m,
      useReducer: ms,
      useRef: Tm,
      useState: function () {
        return ms(Tr);
      },
      useDebugValue: df,
      useDeferredValue: function (e, n) {
        var a = Ct();
        return Dm(a, Je.memoizedState, e, n);
      },
      useTransition: function () {
        var e = ms(Tr)[0],
          n = Ct().memoizedState;
        return [typeof e == "boolean" ? e : Co(e), n];
      },
      useSyncExternalStore: sm,
      useId: Lm,
      useHostTransitionStatus: mf,
      useFormState: xm,
      useActionState: xm,
      useOptimistic: function (e, n) {
        var a = Ct();
        return hm(a, Je, e, n);
      },
      useMemoCache: of,
      useCacheRefresh: jm,
    },
    IS = {
      readContext: Xt,
      use: hs,
      useCallback: Bm,
      useContext: Xt,
      useEffect: Am,
      useImperativeHandle: Nm,
      useInsertionEffect: wm,
      useLayoutEffect: Om,
      useMemo: _m,
      useReducer: uf,
      useRef: Tm,
      useState: function () {
        return uf(Tr);
      },
      useDebugValue: df,
      useDeferredValue: function (e, n) {
        var a = Ct();
        return Je === null ? pf(a, e, n) : Dm(a, Je.memoizedState, e, n);
      },
      useTransition: function () {
        var e = uf(Tr)[0],
          n = Ct().memoizedState;
        return [typeof e == "boolean" ? e : Co(e), n];
      },
      useSyncExternalStore: sm,
      useId: Lm,
      useHostTransitionStatus: mf,
      useFormState: Em,
      useActionState: Em,
      useOptimistic: function (e, n) {
        var a = Ct();
        return Je !== null
          ? hm(a, Je, e, n)
          : ((a.baseState = e), [e, a.queue.dispatch]);
      },
      useMemoCache: of,
      useCacheRefresh: jm,
    },
    vl = null,
    Oo = 0;
  function Ss(e) {
    var n = Oo;
    return ((Oo += 1), vl === null && (vl = []), em(vl, e, n));
  }
  function Mo(e, n) {
    ((n = n.props.ref), (e.ref = n !== void 0 ? n : null));
  }
  function xs(e, n) {
    throw n.$$typeof === v
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(n)),
        Error(
          o(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(n).join(", ") + "}"
              : e,
          ),
        ));
  }
  function Fm(e) {
    var n = e._init;
    return n(e._payload);
  }
  function Ym(e) {
    function n(H, j) {
      if (e) {
        var P = H.deletions;
        P === null ? ((H.deletions = [j]), (H.flags |= 16)) : P.push(j);
      }
    }
    function a(H, j) {
      if (!e) return null;
      for (; j !== null;) (n(H, j), (j = j.sibling));
      return null;
    }
    function i(H) {
      for (var j = new Map(); H !== null;)
        (H.key !== null ? j.set(H.key, H) : j.set(H.index, H), (H = H.sibling));
      return j;
    }
    function u(H, j) {
      return ((H = br(H, j)), (H.index = 0), (H.sibling = null), H);
    }
    function d(H, j, P) {
      return (
        (H.index = P),
        e
          ? ((P = H.alternate),
            P !== null
              ? ((P = P.index), P < j ? ((H.flags |= 67108866), j) : P)
              : ((H.flags |= 67108866), j))
          : ((H.flags |= 1048576), j)
      );
    }
    function y(H) {
      return (e && H.alternate === null && (H.flags |= 67108866), H);
    }
    function T(H, j, P, re) {
      return j === null || j.tag !== 6
        ? ((j = Uc(P, H.mode, re)), (j.return = H), j)
        : ((j = u(j, P)), (j.return = H), j);
    }
    function _(H, j, P, re) {
      var de = P.type;
      return de === S
        ? te(H, j, P.props.children, re, P.key)
        : j !== null &&
            (j.elementType === de ||
              (typeof de == "object" &&
                de !== null &&
                de.$$typeof === X &&
                Fm(de) === j.type))
          ? ((j = u(j, P.props)), Mo(j, P), (j.return = H), j)
          : ((j = rs(P.type, P.key, P.props, null, H.mode, re)),
            Mo(j, P),
            (j.return = H),
            j);
    }
    function Y(H, j, P, re) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== P.containerInfo ||
        j.stateNode.implementation !== P.implementation
        ? ((j = Lc(P, H.mode, re)), (j.return = H), j)
        : ((j = u(j, P.children || [])), (j.return = H), j);
    }
    function te(H, j, P, re, de) {
      return j === null || j.tag !== 7
        ? ((j = wa(P, H.mode, re, de)), (j.return = H), j)
        : ((j = u(j, P)), (j.return = H), j);
    }
    function ae(H, j, P) {
      if (
        (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
      )
        return ((j = Uc("" + j, H.mode, P)), (j.return = H), j);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case A:
            return (
              (P = rs(j.type, j.key, j.props, null, H.mode, P)),
              Mo(P, j),
              (P.return = H),
              P
            );
          case x:
            return ((j = Lc(j, H.mode, P)), (j.return = H), j);
          case X:
            var re = j._init;
            return ((j = re(j._payload)), ae(H, j, P));
        }
        if (z(j) || R(j))
          return ((j = wa(j, H.mode, P, null)), (j.return = H), j);
        if (typeof j.then == "function") return ae(H, Ss(j), P);
        if (j.$$typeof === w) return ae(H, is(H, j), P);
        xs(H, j);
      }
      return null;
    }
    function G(H, j, P, re) {
      var de = j !== null ? j.key : null;
      if (
        (typeof P == "string" && P !== "") ||
        typeof P == "number" ||
        typeof P == "bigint"
      )
        return de !== null ? null : T(H, j, "" + P, re);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case A:
            return P.key === de ? _(H, j, P, re) : null;
          case x:
            return P.key === de ? Y(H, j, P, re) : null;
          case X:
            return ((de = P._init), (P = de(P._payload)), G(H, j, P, re));
        }
        if (z(P) || R(P)) return de !== null ? null : te(H, j, P, re, null);
        if (typeof P.then == "function") return G(H, j, Ss(P), re);
        if (P.$$typeof === w) return G(H, j, is(H, P), re);
        xs(H, P);
      }
      return null;
    }
    function K(H, j, P, re, de) {
      if (
        (typeof re == "string" && re !== "") ||
        typeof re == "number" ||
        typeof re == "bigint"
      )
        return ((H = H.get(P) || null), T(j, H, "" + re, de));
      if (typeof re == "object" && re !== null) {
        switch (re.$$typeof) {
          case A:
            return (
              (H = H.get(re.key === null ? P : re.key) || null),
              _(j, H, re, de)
            );
          case x:
            return (
              (H = H.get(re.key === null ? P : re.key) || null),
              Y(j, H, re, de)
            );
          case X:
            var Be = re._init;
            return ((re = Be(re._payload)), K(H, j, P, re, de));
        }
        if (z(re) || R(re))
          return ((H = H.get(P) || null), te(j, H, re, de, null));
        if (typeof re.then == "function") return K(H, j, P, Ss(re), de);
        if (re.$$typeof === w) return K(H, j, P, is(j, re), de);
        xs(j, re);
      }
      return null;
    }
    function xe(H, j, P, re) {
      for (
        var de = null, Be = null, ge = j, ve = (j = 0), $t = null;
        ge !== null && ve < P.length;
        ve++
      ) {
        ge.index > ve ? (($t = ge), (ge = null)) : ($t = ge.sibling);
        var je = G(H, ge, P[ve], re);
        if (je === null) {
          ge === null && (ge = $t);
          break;
        }
        (e && ge && je.alternate === null && n(H, ge),
          (j = d(je, j, ve)),
          Be === null ? (de = je) : (Be.sibling = je),
          (Be = je),
          (ge = $t));
      }
      if (ve === P.length) return (a(H, ge), qe && Ma(H, ve), de);
      if (ge === null) {
        for (; ve < P.length; ve++)
          ((ge = ae(H, P[ve], re)),
            ge !== null &&
              ((j = d(ge, j, ve)),
              Be === null ? (de = ge) : (Be.sibling = ge),
              (Be = ge)));
        return (qe && Ma(H, ve), de);
      }
      for (ge = i(ge); ve < P.length; ve++)
        (($t = K(ge, H, ve, P[ve], re)),
          $t !== null &&
            (e &&
              $t.alternate !== null &&
              ge.delete($t.key === null ? ve : $t.key),
            (j = d($t, j, ve)),
            Be === null ? (de = $t) : (Be.sibling = $t),
            (Be = $t)));
      return (
        e &&
          ge.forEach(function (da) {
            return n(H, da);
          }),
        qe && Ma(H, ve),
        de
      );
    }
    function ye(H, j, P, re) {
      if (P == null) throw Error(o(151));
      for (
        var de = null,
          Be = null,
          ge = j,
          ve = (j = 0),
          $t = null,
          je = P.next();
        ge !== null && !je.done;
        ve++, je = P.next()
      ) {
        ge.index > ve ? (($t = ge), (ge = null)) : ($t = ge.sibling);
        var da = G(H, ge, je.value, re);
        if (da === null) {
          ge === null && (ge = $t);
          break;
        }
        (e && ge && da.alternate === null && n(H, ge),
          (j = d(da, j, ve)),
          Be === null ? (de = da) : (Be.sibling = da),
          (Be = da),
          (ge = $t));
      }
      if (je.done) return (a(H, ge), qe && Ma(H, ve), de);
      if (ge === null) {
        for (; !je.done; ve++, je = P.next())
          ((je = ae(H, je.value, re)),
            je !== null &&
              ((j = d(je, j, ve)),
              Be === null ? (de = je) : (Be.sibling = je),
              (Be = je)));
        return (qe && Ma(H, ve), de);
      }
      for (ge = i(ge); !je.done; ve++, je = P.next())
        ((je = K(ge, H, ve, je.value, re)),
          je !== null &&
            (e &&
              je.alternate !== null &&
              ge.delete(je.key === null ? ve : je.key),
            (j = d(je, j, ve)),
            Be === null ? (de = je) : (Be.sibling = je),
            (Be = je)));
      return (
        e &&
          ge.forEach(function (Fx) {
            return n(H, Fx);
          }),
        qe && Ma(H, ve),
        de
      );
    }
    function tt(H, j, P, re) {
      if (
        (typeof P == "object" &&
          P !== null &&
          P.type === S &&
          P.key === null &&
          (P = P.props.children),
        typeof P == "object" && P !== null)
      ) {
        switch (P.$$typeof) {
          case A:
            e: {
              for (var de = P.key; j !== null;) {
                if (j.key === de) {
                  if (((de = P.type), de === S)) {
                    if (j.tag === 7) {
                      (a(H, j.sibling),
                        (re = u(j, P.props.children)),
                        (re.return = H),
                        (H = re));
                      break e;
                    }
                  } else if (
                    j.elementType === de ||
                    (typeof de == "object" &&
                      de !== null &&
                      de.$$typeof === X &&
                      Fm(de) === j.type)
                  ) {
                    (a(H, j.sibling),
                      (re = u(j, P.props)),
                      Mo(re, P),
                      (re.return = H),
                      (H = re));
                    break e;
                  }
                  a(H, j);
                  break;
                } else n(H, j);
                j = j.sibling;
              }
              P.type === S
                ? ((re = wa(P.props.children, H.mode, re, P.key)),
                  (re.return = H),
                  (H = re))
                : ((re = rs(P.type, P.key, P.props, null, H.mode, re)),
                  Mo(re, P),
                  (re.return = H),
                  (H = re));
            }
            return y(H);
          case x:
            e: {
              for (de = P.key; j !== null;) {
                if (j.key === de)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === P.containerInfo &&
                    j.stateNode.implementation === P.implementation
                  ) {
                    (a(H, j.sibling),
                      (re = u(j, P.children || [])),
                      (re.return = H),
                      (H = re));
                    break e;
                  } else {
                    a(H, j);
                    break;
                  }
                else n(H, j);
                j = j.sibling;
              }
              ((re = Lc(P, H.mode, re)), (re.return = H), (H = re));
            }
            return y(H);
          case X:
            return ((de = P._init), (P = de(P._payload)), tt(H, j, P, re));
        }
        if (z(P)) return xe(H, j, P, re);
        if (R(P)) {
          if (((de = R(P)), typeof de != "function")) throw Error(o(150));
          return ((P = de.call(P)), ye(H, j, P, re));
        }
        if (typeof P.then == "function") return tt(H, j, Ss(P), re);
        if (P.$$typeof === w) return tt(H, j, is(H, P), re);
        xs(H, P);
      }
      return (typeof P == "string" && P !== "") ||
        typeof P == "number" ||
        typeof P == "bigint"
        ? ((P = "" + P),
          j !== null && j.tag === 6
            ? (a(H, j.sibling), (re = u(j, P)), (re.return = H), (H = re))
            : (a(H, j), (re = Uc(P, H.mode, re)), (re.return = H), (H = re)),
          y(H))
        : a(H, j);
    }
    return function (H, j, P, re) {
      try {
        Oo = 0;
        var de = tt(H, j, P, re);
        return ((vl = null), de);
      } catch (ge) {
        if (ge === bo || ge === us) throw ge;
        var Be = hn(29, ge, null, H.mode);
        return ((Be.lanes = re), (Be.return = H), Be);
      } finally {
      }
    };
  }
  var bl = Ym(!0),
    Vm = Ym(!1),
    Nn = V(null),
    Xn = null;
  function Zr(e) {
    var n = e.alternate;
    (ee(Dt, Dt.current & 1),
      ee(Nn, e),
      Xn === null &&
        (n === null || hl.current !== null || n.memoizedState !== null) &&
        (Xn = e));
  }
  function Gm(e) {
    if (e.tag === 22) {
      if ((ee(Dt, Dt.current), ee(Nn, e), Xn === null)) {
        var n = e.alternate;
        n !== null && n.memoizedState !== null && (Xn = e);
      }
    } else Wr();
  }
  function Wr() {
    (ee(Dt, Dt.current), ee(Nn, Nn.current));
  }
  function Cr(e) {
    (ne(Nn), Xn === e && (Xn = null), ne(Dt));
  }
  var Dt = V(0);
  function Rs(e) {
    for (var n = e; n !== null;) {
      if (n.tag === 13) {
        var a = n.memoizedState;
        if (
          a !== null &&
          ((a = a.dehydrated), a === null || a.data === "$?" || od(a))
        )
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null;) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
    return null;
  }
  function yf(e, n, a, i) {
    ((n = e.memoizedState),
      (a = a(i, n)),
      (a = a == null ? n : g({}, n, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var vf = {
    enqueueSetState: function (e, n, a) {
      e = e._reactInternals;
      var i = vn(),
        u = Kr(i);
      ((u.payload = n),
        a != null && (u.callback = a),
        (n = Xr(e, u, i)),
        n !== null && (bn(n, e, i), xo(n, e, i)));
    },
    enqueueReplaceState: function (e, n, a) {
      e = e._reactInternals;
      var i = vn(),
        u = Kr(i);
      ((u.tag = 1),
        (u.payload = n),
        a != null && (u.callback = a),
        (n = Xr(e, u, i)),
        n !== null && (bn(n, e, i), xo(n, e, i)));
    },
    enqueueForceUpdate: function (e, n) {
      e = e._reactInternals;
      var a = vn(),
        i = Kr(a);
      ((i.tag = 2),
        n != null && (i.callback = n),
        (n = Xr(e, i, a)),
        n !== null && (bn(n, e, a), xo(n, e, a)));
    },
  };
  function Km(e, n, a, i, u, d, y) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(i, d, y)
        : n.prototype && n.prototype.isPureReactComponent
          ? !co(a, i) || !co(u, d)
          : !0
    );
  }
  function Xm(e, n, a, i) {
    ((e = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(a, i),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(a, i),
      n.state !== e && vf.enqueueReplaceState(n, n.state, null));
  }
  function Ua(e, n) {
    var a = n;
    if ("ref" in n) {
      a = {};
      for (var i in n) i !== "ref" && (a[i] = n[i]);
    }
    if ((e = e.defaultProps)) {
      a === n && (a = g({}, a));
      for (var u in e) a[u] === void 0 && (a[u] = e[u]);
    }
    return a;
  }
  var Es =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var n = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(n)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Qm(e) {
    Es(e);
  }
  function Zm(e) {
    console.error(e);
  }
  function Wm(e) {
    Es(e);
  }
  function Ts(e, n) {
    try {
      var a = e.onUncaughtError;
      a(n.value, { componentStack: n.stack });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Jm(e, n, a) {
    try {
      var i = e.onCaughtError;
      i(a.value, {
        componentStack: a.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function bf(e, n, a) {
    return (
      (a = Kr(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Ts(e, n);
      }),
      a
    );
  }
  function eg(e) {
    return ((e = Kr(e)), (e.tag = 3), e);
  }
  function tg(e, n, a, i) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = i.value;
      ((e.payload = function () {
        return u(d);
      }),
        (e.callback = function () {
          Jm(n, a, i);
        }));
    }
    var y = a.stateNode;
    y !== null &&
      typeof y.componentDidCatch == "function" &&
      (e.callback = function () {
        (Jm(n, a, i),
          typeof u != "function" &&
            (aa === null ? (aa = new Set([this])) : aa.add(this)));
        var T = i.stack;
        this.componentDidCatch(i.value, {
          componentStack: T !== null ? T : "",
        });
      });
  }
  function FS(e, n, a, i, u) {
    if (
      ((a.flags |= 32768),
      i !== null && typeof i == "object" && typeof i.then == "function")
    ) {
      if (
        ((n = a.alternate),
        n !== null && go(n, a, u, !0),
        (a = Nn.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 13:
            return (
              Xn === null ? If() : a.alternate === null && gt === 0 && (gt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              i === Gc
                ? (a.flags |= 16384)
                : ((n = a.updateQueue),
                  n === null ? (a.updateQueue = new Set([i])) : n.add(i),
                  Yf(e, i, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              i === Gc
                ? (a.flags |= 16384)
                : ((n = a.updateQueue),
                  n === null
                    ? ((n = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([i]),
                      }),
                      (a.updateQueue = n))
                    : ((a = n.retryQueue),
                      a === null ? (n.retryQueue = new Set([i])) : a.add(i)),
                  Yf(e, i, u)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (Yf(e, i, u), If(), !1);
    }
    if (qe)
      return (
        (n = Nn.current),
        n !== null
          ? ((n.flags & 65536) === 0 && (n.flags |= 256),
            (n.flags |= 65536),
            (n.lanes = u),
            i !== Hc && ((e = Error(o(422), { cause: i })), mo(An(e, a))))
          : (i !== Hc && ((n = Error(o(423), { cause: i })), mo(An(n, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (i = An(i, a)),
            (u = bf(e.stateNode, i, u)),
            Qc(e, u),
            gt !== 4 && (gt = 2)),
        !1
      );
    var d = Error(o(520), { cause: i });
    if (
      ((d = An(d, a)),
      Uo === null ? (Uo = [d]) : Uo.push(d),
      gt !== 4 && (gt = 2),
      n === null)
    )
      return !0;
    ((i = An(i, a)), (a = n));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = u & -u),
            (a.lanes |= e),
            (e = bf(a.stateNode, i, e)),
            Qc(a, e),
            !1
          );
        case 1:
          if (
            ((n = a.type),
            (d = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof n.getDerivedStateFromError == "function" ||
                (d !== null &&
                  typeof d.componentDidCatch == "function" &&
                  (aa === null || !aa.has(d)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = eg(u)),
              tg(u, e, a, i),
              Qc(a, u),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var ng = Error(o(461)),
    Lt = !1;
  function Ft(e, n, a, i) {
    n.child = e === null ? Vm(n, null, a, i) : bl(n, e.child, a, i);
  }
  function rg(e, n, a, i, u) {
    a = a.render;
    var d = n.ref;
    if ("ref" in i) {
      var y = {};
      for (var T in i) T !== "ref" && (y[T] = i[T]);
    } else y = i;
    return (
      Da(n),
      (i = tf(e, n, a, y, d, u)),
      (T = nf()),
      e !== null && !Lt
        ? (rf(e, n, u), Ar(e, n, u))
        : (qe && T && jc(n), (n.flags |= 1), Ft(e, n, i, u), n.child)
    );
  }
  function ag(e, n, a, i, u) {
    if (e === null) {
      var d = a.type;
      return typeof d == "function" &&
        !kc(d) &&
        d.defaultProps === void 0 &&
        a.compare === null
        ? ((n.tag = 15), (n.type = d), lg(e, n, d, i, u))
        : ((e = rs(a.type, null, i, n, n.mode, u)),
          (e.ref = n.ref),
          (e.return = n),
          (n.child = e));
    }
    if (((d = e.child), !wf(e, u))) {
      var y = d.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : co), a(y, i) && e.ref === n.ref)
      )
        return Ar(e, n, u);
    }
    return (
      (n.flags |= 1),
      (e = br(d, i)),
      (e.ref = n.ref),
      (e.return = n),
      (n.child = e)
    );
  }
  function lg(e, n, a, i, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (co(d, i) && e.ref === n.ref)
        if (((Lt = !1), (n.pendingProps = i = d), wf(e, u)))
          (e.flags & 131072) !== 0 && (Lt = !0);
        else return ((n.lanes = e.lanes), Ar(e, n, u));
    }
    return Sf(e, n, a, i, u);
  }
  function og(e, n, a) {
    var i = n.pendingProps,
      u = i.children,
      d = e !== null ? e.memoizedState : null;
    if (i.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (((i = d !== null ? d.baseLanes | a : a), e !== null)) {
          for (u = n.child = e.child, d = 0; u !== null;)
            ((d = d | u.lanes | u.childLanes), (u = u.sibling));
          n.childLanes = d & ~i;
        } else ((n.childLanes = 0), (n.child = null));
        return ig(e, n, i, a);
      }
      if ((a & 536870912) !== 0)
        ((n.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && ss(n, d !== null ? d.cachePool : null),
          d !== null ? lm(n, d) : Wc(),
          Gm(n));
      else
        return (
          (n.lanes = n.childLanes = 536870912),
          ig(e, n, d !== null ? d.baseLanes | a : a, a)
        );
    } else
      d !== null
        ? (ss(n, d.cachePool), lm(n, d), Wr(), (n.memoizedState = null))
        : (e !== null && ss(n, null), Wc(), Wr());
    return (Ft(e, n, u, a), n.child);
  }
  function ig(e, n, a, i) {
    var u = Vc();
    return (
      (u = u === null ? null : { parent: _t._currentValue, pool: u }),
      (n.memoizedState = { baseLanes: a, cachePool: u }),
      e !== null && ss(n, null),
      Wc(),
      Gm(n),
      e !== null && go(e, n, i, !0),
      null
    );
  }
  function Cs(e, n) {
    var a = n.ref;
    if (a === null) e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(o(284));
      (e === null || e.ref !== a) && (n.flags |= 4194816);
    }
  }
  function Sf(e, n, a, i, u) {
    return (
      Da(n),
      (a = tf(e, n, a, i, void 0, u)),
      (i = nf()),
      e !== null && !Lt
        ? (rf(e, n, u), Ar(e, n, u))
        : (qe && i && jc(n), (n.flags |= 1), Ft(e, n, a, u), n.child)
    );
  }
  function sg(e, n, a, i, u, d) {
    return (
      Da(n),
      (n.updateQueue = null),
      (a = im(n, i, a, u)),
      om(e),
      (i = nf()),
      e !== null && !Lt
        ? (rf(e, n, d), Ar(e, n, d))
        : (qe && i && jc(n), (n.flags |= 1), Ft(e, n, a, d), n.child)
    );
  }
  function ug(e, n, a, i, u) {
    if ((Da(n), n.stateNode === null)) {
      var d = ul,
        y = a.contextType;
      (typeof y == "object" && y !== null && (d = Xt(y)),
        (d = new a(i, d)),
        (n.memoizedState =
          d.state !== null && d.state !== void 0 ? d.state : null),
        (d.updater = vf),
        (n.stateNode = d),
        (d._reactInternals = n),
        (d = n.stateNode),
        (d.props = i),
        (d.state = n.memoizedState),
        (d.refs = {}),
        Kc(n),
        (y = a.contextType),
        (d.context = typeof y == "object" && y !== null ? Xt(y) : ul),
        (d.state = n.memoizedState),
        (y = a.getDerivedStateFromProps),
        typeof y == "function" && (yf(n, a, y, i), (d.state = n.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function" ||
          (typeof d.UNSAFE_componentWillMount != "function" &&
            typeof d.componentWillMount != "function") ||
          ((y = d.state),
          typeof d.componentWillMount == "function" && d.componentWillMount(),
          typeof d.UNSAFE_componentWillMount == "function" &&
            d.UNSAFE_componentWillMount(),
          y !== d.state && vf.enqueueReplaceState(d, d.state, null),
          Eo(n, i, d, u),
          Ro(),
          (d.state = n.memoizedState)),
        typeof d.componentDidMount == "function" && (n.flags |= 4194308),
        (i = !0));
    } else if (e === null) {
      d = n.stateNode;
      var T = n.memoizedProps,
        _ = Ua(a, T);
      d.props = _;
      var Y = d.context,
        te = a.contextType;
      ((y = ul), typeof te == "object" && te !== null && (y = Xt(te)));
      var ae = a.getDerivedStateFromProps;
      ((te =
        typeof ae == "function" ||
        typeof d.getSnapshotBeforeUpdate == "function"),
        (T = n.pendingProps !== T),
        te ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((T || Y !== y) && Xm(n, d, i, y)),
        (Gr = !1));
      var G = n.memoizedState;
      ((d.state = G),
        Eo(n, i, d, u),
        Ro(),
        (Y = n.memoizedState),
        T || G !== Y || Gr
          ? (typeof ae == "function" &&
              (yf(n, a, ae, i), (Y = n.memoizedState)),
            (_ = Gr || Km(n, a, _, i, G, Y, y))
              ? (te ||
                  (typeof d.UNSAFE_componentWillMount != "function" &&
                    typeof d.componentWillMount != "function") ||
                  (typeof d.componentWillMount == "function" &&
                    d.componentWillMount(),
                  typeof d.UNSAFE_componentWillMount == "function" &&
                    d.UNSAFE_componentWillMount()),
                typeof d.componentDidMount == "function" &&
                  (n.flags |= 4194308))
              : (typeof d.componentDidMount == "function" &&
                  (n.flags |= 4194308),
                (n.memoizedProps = i),
                (n.memoizedState = Y)),
            (d.props = i),
            (d.state = Y),
            (d.context = y),
            (i = _))
          : (typeof d.componentDidMount == "function" && (n.flags |= 4194308),
            (i = !1)));
    } else {
      ((d = n.stateNode),
        Xc(e, n),
        (y = n.memoizedProps),
        (te = Ua(a, y)),
        (d.props = te),
        (ae = n.pendingProps),
        (G = d.context),
        (Y = a.contextType),
        (_ = ul),
        typeof Y == "object" && Y !== null && (_ = Xt(Y)),
        (T = a.getDerivedStateFromProps),
        (Y =
          typeof T == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function") ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((y !== ae || G !== _) && Xm(n, d, i, _)),
        (Gr = !1),
        (G = n.memoizedState),
        (d.state = G),
        Eo(n, i, d, u),
        Ro());
      var K = n.memoizedState;
      y !== ae ||
      G !== K ||
      Gr ||
      (e !== null && e.dependencies !== null && os(e.dependencies))
        ? (typeof T == "function" && (yf(n, a, T, i), (K = n.memoizedState)),
          (te =
            Gr ||
            Km(n, a, te, i, G, K, _) ||
            (e !== null && e.dependencies !== null && os(e.dependencies)))
            ? (Y ||
                (typeof d.UNSAFE_componentWillUpdate != "function" &&
                  typeof d.componentWillUpdate != "function") ||
                (typeof d.componentWillUpdate == "function" &&
                  d.componentWillUpdate(i, K, _),
                typeof d.UNSAFE_componentWillUpdate == "function" &&
                  d.UNSAFE_componentWillUpdate(i, K, _)),
              typeof d.componentDidUpdate == "function" && (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof d.componentDidUpdate != "function" ||
                (y === e.memoizedProps && G === e.memoizedState) ||
                (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate != "function" ||
                (y === e.memoizedProps && G === e.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = i),
              (n.memoizedState = K)),
          (d.props = i),
          (d.state = K),
          (d.context = _),
          (i = te))
        : (typeof d.componentDidUpdate != "function" ||
            (y === e.memoizedProps && G === e.memoizedState) ||
            (n.flags |= 4),
          typeof d.getSnapshotBeforeUpdate != "function" ||
            (y === e.memoizedProps && G === e.memoizedState) ||
            (n.flags |= 1024),
          (i = !1));
    }
    return (
      (d = i),
      Cs(e, n),
      (i = (n.flags & 128) !== 0),
      d || i
        ? ((d = n.stateNode),
          (a =
            i && typeof a.getDerivedStateFromError != "function"
              ? null
              : d.render()),
          (n.flags |= 1),
          e !== null && i
            ? ((n.child = bl(n, e.child, null, u)),
              (n.child = bl(n, null, a, u)))
            : Ft(e, n, a, u),
          (n.memoizedState = d.state),
          (e = n.child))
        : (e = Ar(e, n, u)),
      e
    );
  }
  function cg(e, n, a, i) {
    return (ho(), (n.flags |= 256), Ft(e, n, a, i), n.child);
  }
  var xf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Rf(e) {
    return { baseLanes: e, cachePool: Zh() };
  }
  function Ef(e, n, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), n && (e |= Bn), e);
  }
  function fg(e, n, a) {
    var i = n.pendingProps,
      u = !1,
      d = (n.flags & 128) !== 0,
      y;
    if (
      ((y = d) ||
        (y =
          e !== null && e.memoizedState === null ? !1 : (Dt.current & 2) !== 0),
      y && ((u = !0), (n.flags &= -129)),
      (y = (n.flags & 32) !== 0),
      (n.flags &= -33),
      e === null)
    ) {
      if (qe) {
        if ((u ? Zr(n) : Wr(), qe)) {
          var T = mt,
            _;
          if ((_ = T)) {
            e: {
              for (_ = T, T = Kn; _.nodeType !== 8;) {
                if (!T) {
                  T = null;
                  break e;
                }
                if (((_ = Hn(_.nextSibling)), _ === null)) {
                  T = null;
                  break e;
                }
              }
              T = _;
            }
            T !== null
              ? ((n.memoizedState = {
                  dehydrated: T,
                  treeContext: Oa !== null ? { id: Sr, overflow: xr } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (_ = hn(18, null, null, 0)),
                (_.stateNode = T),
                (_.return = n),
                (n.child = _),
                (en = n),
                (mt = null),
                (_ = !0))
              : (_ = !1);
          }
          _ || Ba(n);
        }
        if (
          ((T = n.memoizedState),
          T !== null && ((T = T.dehydrated), T !== null))
        )
          return (od(T) ? (n.lanes = 32) : (n.lanes = 536870912), null);
        Cr(n);
      }
      return (
        (T = i.children),
        (i = i.fallback),
        u
          ? (Wr(),
            (u = n.mode),
            (T = As({ mode: "hidden", children: T }, u)),
            (i = wa(i, u, a, null)),
            (T.return = n),
            (i.return = n),
            (T.sibling = i),
            (n.child = T),
            (u = n.child),
            (u.memoizedState = Rf(a)),
            (u.childLanes = Ef(e, y, a)),
            (n.memoizedState = xf),
            i)
          : (Zr(n), Tf(n, T))
      );
    }
    if (
      ((_ = e.memoizedState), _ !== null && ((T = _.dehydrated), T !== null))
    ) {
      if (d)
        n.flags & 256
          ? (Zr(n), (n.flags &= -257), (n = Cf(e, n, a)))
          : n.memoizedState !== null
            ? (Wr(), (n.child = e.child), (n.flags |= 128), (n = null))
            : (Wr(),
              (u = i.fallback),
              (T = n.mode),
              (i = As({ mode: "visible", children: i.children }, T)),
              (u = wa(u, T, a, null)),
              (u.flags |= 2),
              (i.return = n),
              (u.return = n),
              (i.sibling = u),
              (n.child = i),
              bl(n, e.child, null, a),
              (i = n.child),
              (i.memoizedState = Rf(a)),
              (i.childLanes = Ef(e, y, a)),
              (n.memoizedState = xf),
              (n = u));
      else if ((Zr(n), od(T))) {
        if (((y = T.nextSibling && T.nextSibling.dataset), y)) var Y = y.dgst;
        ((y = Y),
          (i = Error(o(419))),
          (i.stack = ""),
          (i.digest = y),
          mo({ value: i, source: null, stack: null }),
          (n = Cf(e, n, a)));
      } else if (
        (Lt || go(e, n, a, !1), (y = (a & e.childLanes) !== 0), Lt || y)
      ) {
        if (
          ((y = st),
          y !== null &&
            ((i = a & -a),
            (i = (i & 42) !== 0 ? 1 : Qa(i)),
            (i = (i & (y.suspendedLanes | a)) !== 0 ? 0 : i),
            i !== 0 && i !== _.retryLane))
        )
          throw ((_.retryLane = i), sl(e, i), bn(y, e, i), ng);
        (T.data === "$?" || If(), (n = Cf(e, n, a)));
      } else
        T.data === "$?"
          ? ((n.flags |= 192), (n.child = e.child), (n = null))
          : ((e = _.treeContext),
            (mt = Hn(T.nextSibling)),
            (en = n),
            (qe = !0),
            (Na = null),
            (Kn = !1),
            e !== null &&
              ((On[Mn++] = Sr),
              (On[Mn++] = xr),
              (On[Mn++] = Oa),
              (Sr = e.id),
              (xr = e.overflow),
              (Oa = n)),
            (n = Tf(n, i.children)),
            (n.flags |= 4096));
      return n;
    }
    return u
      ? (Wr(),
        (u = i.fallback),
        (T = n.mode),
        (_ = e.child),
        (Y = _.sibling),
        (i = br(_, { mode: "hidden", children: i.children })),
        (i.subtreeFlags = _.subtreeFlags & 65011712),
        Y !== null ? (u = br(Y, u)) : ((u = wa(u, T, a, null)), (u.flags |= 2)),
        (u.return = n),
        (i.return = n),
        (i.sibling = u),
        (n.child = i),
        (i = u),
        (u = n.child),
        (T = e.child.memoizedState),
        T === null
          ? (T = Rf(a))
          : ((_ = T.cachePool),
            _ !== null
              ? ((Y = _t._currentValue),
                (_ = _.parent !== Y ? { parent: Y, pool: Y } : _))
              : (_ = Zh()),
            (T = { baseLanes: T.baseLanes | a, cachePool: _ })),
        (u.memoizedState = T),
        (u.childLanes = Ef(e, y, a)),
        (n.memoizedState = xf),
        i)
      : (Zr(n),
        (a = e.child),
        (e = a.sibling),
        (a = br(a, { mode: "visible", children: i.children })),
        (a.return = n),
        (a.sibling = null),
        e !== null &&
          ((y = n.deletions),
          y === null ? ((n.deletions = [e]), (n.flags |= 16)) : y.push(e)),
        (n.child = a),
        (n.memoizedState = null),
        a);
  }
  function Tf(e, n) {
    return (
      (n = As({ mode: "visible", children: n }, e.mode)),
      (n.return = e),
      (e.child = n)
    );
  }
  function As(e, n) {
    return (
      (e = hn(22, e, null, n)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Cf(e, n, a) {
    return (
      bl(n, e.child, null, a),
      (e = Tf(n, n.pendingProps.children)),
      (e.flags |= 2),
      (n.memoizedState = null),
      e
    );
  }
  function dg(e, n, a) {
    e.lanes |= n;
    var i = e.alternate;
    (i !== null && (i.lanes |= n), Pc(e.return, n, a));
  }
  function Af(e, n, a, i, u) {
    var d = e.memoizedState;
    d === null
      ? (e.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: a,
          tailMode: u,
        })
      : ((d.isBackwards = n),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = i),
        (d.tail = a),
        (d.tailMode = u));
  }
  function pg(e, n, a) {
    var i = n.pendingProps,
      u = i.revealOrder,
      d = i.tail;
    if ((Ft(e, n, i.children, a), (i = Dt.current), (i & 2) !== 0))
      ((i = (i & 1) | 2), (n.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = n.child; e !== null;) {
          if (e.tag === 13) e.memoizedState !== null && dg(e, a, n);
          else if (e.tag === 19) dg(e, a, n);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === n) break e;
          for (; e.sibling === null;) {
            if (e.return === null || e.return === n) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      i &= 1;
    }
    switch ((ee(Dt, i), u)) {
      case "forwards":
        for (a = n.child, u = null; a !== null;)
          ((e = a.alternate),
            e !== null && Rs(e) === null && (u = a),
            (a = a.sibling));
        ((a = u),
          a === null
            ? ((u = n.child), (n.child = null))
            : ((u = a.sibling), (a.sibling = null)),
          Af(n, !1, u, a, d));
        break;
      case "backwards":
        for (a = null, u = n.child, n.child = null; u !== null;) {
          if (((e = u.alternate), e !== null && Rs(e) === null)) {
            n.child = u;
            break;
          }
          ((e = u.sibling), (u.sibling = a), (a = u), (u = e));
        }
        Af(n, !0, a, null, d);
        break;
      case "together":
        Af(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ar(e, n, a) {
    if (
      (e !== null && (n.dependencies = e.dependencies),
      (ra |= n.lanes),
      (a & n.childLanes) === 0)
    )
      if (e !== null) {
        if ((go(e, n, a, !1), (a & n.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && n.child !== e.child) throw Error(o(153));
    if (n.child !== null) {
      for (
        e = n.child, a = br(e, e.pendingProps), n.child = a, a.return = n;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (a = a.sibling = br(e, e.pendingProps)),
          (a.return = n));
      a.sibling = null;
    }
    return n.child;
  }
  function wf(e, n) {
    return (e.lanes & n) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && os(e)));
  }
  function YS(e, n, a) {
    switch (n.tag) {
      case 3:
        (fe(n, n.stateNode.containerInfo),
          Vr(n, _t, e.memoizedState.cache),
          ho());
        break;
      case 27:
      case 5:
        Oe(n);
        break;
      case 4:
        fe(n, n.stateNode.containerInfo);
        break;
      case 10:
        Vr(n, n.type, n.memoizedProps.value);
        break;
      case 13:
        var i = n.memoizedState;
        if (i !== null)
          return i.dehydrated !== null
            ? (Zr(n), (n.flags |= 128), null)
            : (a & n.child.childLanes) !== 0
              ? fg(e, n, a)
              : (Zr(n), (e = Ar(e, n, a)), e !== null ? e.sibling : null);
        Zr(n);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((i = (a & n.childLanes) !== 0),
          i || (go(e, n, a, !1), (i = (a & n.childLanes) !== 0)),
          u)
        ) {
          if (i) return pg(e, n, a);
          n.flags |= 128;
        }
        if (
          ((u = n.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          ee(Dt, Dt.current),
          i)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((n.lanes = 0), og(e, n, a));
      case 24:
        Vr(n, _t, e.memoizedState.cache);
    }
    return Ar(e, n, a);
  }
  function hg(e, n, a) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps) Lt = !0;
      else {
        if (!wf(e, a) && (n.flags & 128) === 0) return ((Lt = !1), YS(e, n, a));
        Lt = (e.flags & 131072) !== 0;
      }
    else ((Lt = !1), qe && (n.flags & 1048576) !== 0 && Fh(n, ls, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 16:
        e: {
          e = n.pendingProps;
          var i = n.elementType,
            u = i._init;
          if (((i = u(i._payload)), (n.type = i), typeof i == "function"))
            kc(i)
              ? ((e = Ua(i, e)), (n.tag = 1), (n = ug(null, n, i, e, a)))
              : ((n.tag = 0), (n = Sf(null, n, i, e, a)));
          else {
            if (i != null) {
              if (((u = i.$$typeof), u === k)) {
                ((n.tag = 11), (n = rg(null, n, i, e, a)));
                break e;
              } else if (u === I) {
                ((n.tag = 14), (n = ag(null, n, i, e, a)));
                break e;
              }
            }
            throw ((n = L(i) || i), Error(o(306, n, "")));
          }
        }
        return n;
      case 0:
        return Sf(e, n, n.type, n.pendingProps, a);
      case 1:
        return ((i = n.type), (u = Ua(i, n.pendingProps)), ug(e, n, i, u, a));
      case 3:
        e: {
          if ((fe(n, n.stateNode.containerInfo), e === null))
            throw Error(o(387));
          i = n.pendingProps;
          var d = n.memoizedState;
          ((u = d.element), Xc(e, n), Eo(n, i, null, a));
          var y = n.memoizedState;
          if (
            ((i = y.cache),
            Vr(n, _t, i),
            i !== d.cache && Ic(n, [_t], a, !0),
            Ro(),
            (i = y.element),
            d.isDehydrated)
          )
            if (
              ((d = { element: i, isDehydrated: !1, cache: y.cache }),
              (n.updateQueue.baseState = d),
              (n.memoizedState = d),
              n.flags & 256)
            ) {
              n = cg(e, n, i, a);
              break e;
            } else if (i !== u) {
              ((u = An(Error(o(424)), n)), mo(u), (n = cg(e, n, i, a)));
              break e;
            } else {
              switch (((e = n.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                mt = Hn(e.firstChild),
                  en = n,
                  qe = !0,
                  Na = null,
                  Kn = !0,
                  a = Vm(n, null, i, a),
                  n.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((ho(), i === u)) {
              n = Ar(e, n, a);
              break e;
            }
            Ft(e, n, i, a);
          }
          n = n.child;
        }
        return n;
      case 26:
        return (
          Cs(e, n),
          e === null
            ? (a = vy(n.type, null, n.pendingProps, null))
              ? (n.memoizedState = a)
              : qe ||
                ((a = n.type),
                (e = n.pendingProps),
                (i = Hs(ce.current).createElement(a)),
                (i[Bt] = n),
                (i[Ut] = e),
                Vt(i, a, e),
                bt(i),
                (n.stateNode = i))
            : (n.memoizedState = vy(
                n.type,
                e.memoizedProps,
                n.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Oe(n),
          e === null &&
            qe &&
            ((i = n.stateNode = my(n.type, n.pendingProps, ce.current)),
            (en = n),
            (Kn = !0),
            (u = mt),
            ia(n.type) ? ((id = u), (mt = Hn(i.firstChild))) : (mt = u)),
          Ft(e, n, n.pendingProps.children, a),
          Cs(e, n),
          e === null && (n.flags |= 4194304),
          n.child
        );
      case 5:
        return (
          e === null &&
            qe &&
            ((u = i = mt) &&
              ((i = bx(i, n.type, n.pendingProps, Kn)),
              i !== null
                ? ((n.stateNode = i),
                  (en = n),
                  (mt = Hn(i.firstChild)),
                  (Kn = !1),
                  (u = !0))
                : (u = !1)),
            u || Ba(n)),
          Oe(n),
          (u = n.type),
          (d = n.pendingProps),
          (y = e !== null ? e.memoizedProps : null),
          (i = d.children),
          rd(u, d) ? (i = null) : y !== null && rd(u, y) && (n.flags |= 32),
          n.memoizedState !== null &&
            ((u = tf(e, n, LS, null, null, a)), (Yo._currentValue = u)),
          Cs(e, n),
          Ft(e, n, i, a),
          n.child
        );
      case 6:
        return (
          e === null &&
            qe &&
            ((e = a = mt) &&
              ((a = Sx(a, n.pendingProps, Kn)),
              a !== null
                ? ((n.stateNode = a), (en = n), (mt = null), (e = !0))
                : (e = !1)),
            e || Ba(n)),
          null
        );
      case 13:
        return fg(e, n, a);
      case 4:
        return (
          fe(n, n.stateNode.containerInfo),
          (i = n.pendingProps),
          e === null ? (n.child = bl(n, null, i, a)) : Ft(e, n, i, a),
          n.child
        );
      case 11:
        return rg(e, n, n.type, n.pendingProps, a);
      case 7:
        return (Ft(e, n, n.pendingProps, a), n.child);
      case 8:
        return (Ft(e, n, n.pendingProps.children, a), n.child);
      case 12:
        return (Ft(e, n, n.pendingProps.children, a), n.child);
      case 10:
        return (
          (i = n.pendingProps),
          Vr(n, n.type, i.value),
          Ft(e, n, i.children, a),
          n.child
        );
      case 9:
        return (
          (u = n.type._context),
          (i = n.pendingProps.children),
          Da(n),
          (u = Xt(u)),
          (i = i(u)),
          (n.flags |= 1),
          Ft(e, n, i, a),
          n.child
        );
      case 14:
        return ag(e, n, n.type, n.pendingProps, a);
      case 15:
        return lg(e, n, n.type, n.pendingProps, a);
      case 19:
        return pg(e, n, a);
      case 31:
        return (
          (i = n.pendingProps),
          (a = n.mode),
          (i = { mode: i.mode, children: i.children }),
          e === null
            ? ((a = As(i, a)),
              (a.ref = n.ref),
              (n.child = a),
              (a.return = n),
              (n = a))
            : ((a = br(e.child, i)),
              (a.ref = n.ref),
              (n.child = a),
              (a.return = n),
              (n = a)),
          n
        );
      case 22:
        return og(e, n, a);
      case 24:
        return (
          Da(n),
          (i = Xt(_t)),
          e === null
            ? ((u = Vc()),
              u === null &&
                ((u = st),
                (d = Fc()),
                (u.pooledCache = d),
                d.refCount++,
                d !== null && (u.pooledCacheLanes |= a),
                (u = d)),
              (n.memoizedState = { parent: i, cache: u }),
              Kc(n),
              Vr(n, _t, u))
            : ((e.lanes & a) !== 0 && (Xc(e, n), Eo(n, null, null, a), Ro()),
              (u = e.memoizedState),
              (d = n.memoizedState),
              u.parent !== i
                ? ((u = { parent: i, cache: i }),
                  (n.memoizedState = u),
                  n.lanes === 0 &&
                    (n.memoizedState = n.updateQueue.baseState = u),
                  Vr(n, _t, i))
                : ((i = d.cache),
                  Vr(n, _t, i),
                  i !== u.cache && Ic(n, [_t], a, !0))),
          Ft(e, n, n.pendingProps.children, a),
          n.child
        );
      case 29:
        throw n.pendingProps;
    }
    throw Error(o(156, n.tag));
  }
  function wr(e) {
    e.flags |= 4;
  }
  function mg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Ey(n))) {
      if (
        ((n = Nn.current),
        n !== null &&
          ((Le & 4194048) === Le
            ? Xn !== null
            : ((Le & 62914560) !== Le && (Le & 536870912) === 0) || n !== Xn))
      )
        throw ((So = Gc), Wh);
      e.flags |= 8192;
    }
  }
  function ws(e, n) {
    (n !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((n = e.tag !== 22 ? Pi() : 536870912), (e.lanes |= n), (El |= n)));
  }
  function No(e, n) {
    if (!qe)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var a = null; n !== null;)
            (n.alternate !== null && (a = n), (n = n.sibling));
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = e.tail;
          for (var i = null; a !== null;)
            (a.alternate !== null && (i = a), (a = a.sibling));
          i === null
            ? n || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (i.sibling = null);
      }
  }
  function ht(e) {
    var n = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      i = 0;
    if (n)
      for (var u = e.child; u !== null;)
        ((a |= u.lanes | u.childLanes),
          (i |= u.subtreeFlags & 65011712),
          (i |= u.flags & 65011712),
          (u.return = e),
          (u = u.sibling));
    else
      for (u = e.child; u !== null;)
        ((a |= u.lanes | u.childLanes),
          (i |= u.subtreeFlags),
          (i |= u.flags),
          (u.return = e),
          (u = u.sibling));
    return ((e.subtreeFlags |= i), (e.childLanes = a), n);
  }
  function VS(e, n, a) {
    var i = n.pendingProps;
    switch (($c(n), n.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (ht(n), null);
      case 1:
        return (ht(n), null);
      case 3:
        return (
          (a = n.stateNode),
          (i = null),
          e !== null && (i = e.memoizedState.cache),
          n.memoizedState.cache !== i && (n.flags |= 2048),
          Er(_t),
          Se(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (po(n)
              ? wr(n)
              : e === null ||
                (e.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), Gh())),
          ht(n),
          null
        );
      case 26:
        return (
          (a = n.memoizedState),
          e === null
            ? (wr(n),
              a !== null ? (ht(n), mg(n, a)) : (ht(n), (n.flags &= -16777217)))
            : a
              ? a !== e.memoizedState
                ? (wr(n), ht(n), mg(n, a))
                : (ht(n), (n.flags &= -16777217))
              : (e.memoizedProps !== i && wr(n), ht(n), (n.flags &= -16777217)),
          null
        );
      case 27:
        (rt(n), (a = ce.current));
        var u = n.type;
        if (e !== null && n.stateNode != null) e.memoizedProps !== i && wr(n);
        else {
          if (!i) {
            if (n.stateNode === null) throw Error(o(166));
            return (ht(n), null);
          }
          ((e = oe.current),
            po(n) ? Yh(n) : ((e = my(u, i, a)), (n.stateNode = e), wr(n)));
        }
        return (ht(n), null);
      case 5:
        if ((rt(n), (a = n.type), e !== null && n.stateNode != null))
          e.memoizedProps !== i && wr(n);
        else {
          if (!i) {
            if (n.stateNode === null) throw Error(o(166));
            return (ht(n), null);
          }
          if (((e = oe.current), po(n))) Yh(n);
          else {
            switch (((u = Hs(ce.current)), e)) {
              case 1:
                e = u.createElementNS("http://www.w3.org/2000/svg", a);
                break;
              case 2:
                e = u.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                break;
              default:
                switch (a) {
                  case "svg":
                    e = u.createElementNS("http://www.w3.org/2000/svg", a);
                    break;
                  case "math":
                    e = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a,
                    );
                    break;
                  case "script":
                    ((e = u.createElement("div")),
                      (e.innerHTML = "<script><\/script>"),
                      (e = e.removeChild(e.firstChild)));
                    break;
                  case "select":
                    ((e =
                      typeof i.is == "string"
                        ? u.createElement("select", { is: i.is })
                        : u.createElement("select")),
                      i.multiple
                        ? (e.multiple = !0)
                        : i.size && (e.size = i.size));
                    break;
                  default:
                    e =
                      typeof i.is == "string"
                        ? u.createElement(a, { is: i.is })
                        : u.createElement(a);
                }
            }
            ((e[Bt] = n), (e[Ut] = i));
            e: for (u = n.child; u !== null;) {
              if (u.tag === 5 || u.tag === 6) e.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                ((u.child.return = u), (u = u.child));
                continue;
              }
              if (u === n) break e;
              for (; u.sibling === null;) {
                if (u.return === null || u.return === n) break e;
                u = u.return;
              }
              ((u.sibling.return = u.return), (u = u.sibling));
            }
            n.stateNode = e;
            e: switch ((Vt(e, a, i), a)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!i.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && wr(n);
          }
        }
        return (ht(n), (n.flags &= -16777217), null);
      case 6:
        if (e && n.stateNode != null) e.memoizedProps !== i && wr(n);
        else {
          if (typeof i != "string" && n.stateNode === null) throw Error(o(166));
          if (((e = ce.current), po(n))) {
            if (
              ((e = n.stateNode),
              (a = n.memoizedProps),
              (i = null),
              (u = en),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  i = u.memoizedProps;
              }
            ((e[Bt] = n),
              (e = !!(
                e.nodeValue === a ||
                (i !== null && i.suppressHydrationWarning === !0) ||
                sy(e.nodeValue, a)
              )),
              e || Ba(n));
          } else
            ((e = Hs(e).createTextNode(i)), (e[Bt] = n), (n.stateNode = e));
        }
        return (ht(n), null);
      case 13:
        if (
          ((i = n.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = po(n)), i !== null && i.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(o(318));
              if (
                ((u = n.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(o(317));
              u[Bt] = n;
            } else
              (ho(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (ht(n), (u = !1));
          } else
            ((u = Gh()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return n.flags & 256 ? (Cr(n), n) : (Cr(n), null);
        }
        if ((Cr(n), (n.flags & 128) !== 0)) return ((n.lanes = a), n);
        if (
          ((a = i !== null), (e = e !== null && e.memoizedState !== null), a)
        ) {
          ((i = n.child),
            (u = null),
            i.alternate !== null &&
              i.alternate.memoizedState !== null &&
              i.alternate.memoizedState.cachePool !== null &&
              (u = i.alternate.memoizedState.cachePool.pool));
          var d = null;
          (i.memoizedState !== null &&
            i.memoizedState.cachePool !== null &&
            (d = i.memoizedState.cachePool.pool),
            d !== u && (i.flags |= 2048));
        }
        return (
          a !== e && a && (n.child.flags |= 8192),
          ws(n, n.updateQueue),
          ht(n),
          null
        );
      case 4:
        return (Se(), e === null && Wf(n.stateNode.containerInfo), ht(n), null);
      case 10:
        return (Er(n.type), ht(n), null);
      case 19:
        if ((ne(Dt), (u = n.memoizedState), u === null)) return (ht(n), null);
        if (((i = (n.flags & 128) !== 0), (d = u.rendering), d === null))
          if (i) No(u, !1);
          else {
            if (gt !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = n.child; e !== null;) {
                if (((d = Rs(e)), d !== null)) {
                  for (
                    n.flags |= 128,
                      No(u, !1),
                      e = d.updateQueue,
                      n.updateQueue = e,
                      ws(n, e),
                      n.subtreeFlags = 0,
                      e = a,
                      a = n.child;
                    a !== null;
                  )
                    (Ih(a, e), (a = a.sibling));
                  return (ee(Dt, (Dt.current & 1) | 2), n.child);
                }
                e = e.sibling;
              }
            u.tail !== null &&
              ke() > Ns &&
              ((n.flags |= 128), (i = !0), No(u, !1), (n.lanes = 4194304));
          }
        else {
          if (!i)
            if (((e = Rs(d)), e !== null)) {
              if (
                ((n.flags |= 128),
                (i = !0),
                (e = e.updateQueue),
                (n.updateQueue = e),
                ws(n, e),
                No(u, !0),
                u.tail === null &&
                  u.tailMode === "hidden" &&
                  !d.alternate &&
                  !qe)
              )
                return (ht(n), null);
            } else
              2 * ke() - u.renderingStartTime > Ns &&
                a !== 536870912 &&
                ((n.flags |= 128), (i = !0), No(u, !1), (n.lanes = 4194304));
          u.isBackwards
            ? ((d.sibling = n.child), (n.child = d))
            : ((e = u.last),
              e !== null ? (e.sibling = d) : (n.child = d),
              (u.last = d));
        }
        return u.tail !== null
          ? ((n = u.tail),
            (u.rendering = n),
            (u.tail = n.sibling),
            (u.renderingStartTime = ke()),
            (n.sibling = null),
            (e = Dt.current),
            ee(Dt, i ? (e & 1) | 2 : e & 1),
            n)
          : (ht(n), null);
      case 22:
      case 23:
        return (
          Cr(n),
          Jc(),
          (i = n.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== i && (n.flags |= 8192)
            : i && (n.flags |= 8192),
          i
            ? (a & 536870912) !== 0 &&
              (n.flags & 128) === 0 &&
              (ht(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : ht(n),
          (a = n.updateQueue),
          a !== null && ws(n, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (i = null),
          n.memoizedState !== null &&
            n.memoizedState.cachePool !== null &&
            (i = n.memoizedState.cachePool.pool),
          i !== a && (n.flags |= 2048),
          e !== null && ne(za),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          n.memoizedState.cache !== a && (n.flags |= 2048),
          Er(_t),
          ht(n),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function GS(e, n) {
    switch (($c(n), n.tag)) {
      case 1:
        return (
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 3:
        return (
          Er(_t),
          Se(),
          (e = n.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((n.flags = (e & -65537) | 128), n)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (rt(n), null);
      case 13:
        if (
          (Cr(n), (e = n.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(o(340));
          ho();
        }
        return (
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 19:
        return (ne(Dt), null);
      case 4:
        return (Se(), null);
      case 10:
        return (Er(n.type), null);
      case 22:
      case 23:
        return (
          Cr(n),
          Jc(),
          e !== null && ne(za),
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 24:
        return (Er(_t), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function gg(e, n) {
    switch (($c(n), n.tag)) {
      case 3:
        (Er(_t), Se());
        break;
      case 26:
      case 27:
      case 5:
        rt(n);
        break;
      case 4:
        Se();
        break;
      case 13:
        Cr(n);
        break;
      case 19:
        ne(Dt);
        break;
      case 10:
        Er(n.type);
        break;
      case 22:
      case 23:
        (Cr(n), Jc(), e !== null && ne(za));
        break;
      case 24:
        Er(_t);
    }
  }
  function Bo(e, n) {
    try {
      var a = n.updateQueue,
        i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            i = void 0;
            var d = a.create,
              y = a.inst;
            ((i = d()), (y.destroy = i));
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (T) {
      lt(n, n.return, T);
    }
  }
  function Jr(e, n, a) {
    try {
      var i = n.updateQueue,
        u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var d = u.next;
        i = d;
        do {
          if ((i.tag & e) === e) {
            var y = i.inst,
              T = y.destroy;
            if (T !== void 0) {
              ((y.destroy = void 0), (u = n));
              var _ = a,
                Y = T;
              try {
                Y();
              } catch (te) {
                lt(u, _, te);
              }
            }
          }
          i = i.next;
        } while (i !== d);
      }
    } catch (te) {
      lt(n, n.return, te);
    }
  }
  function yg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var a = e.stateNode;
      try {
        am(n, a);
      } catch (i) {
        lt(e, e.return, i);
      }
    }
  }
  function vg(e, n, a) {
    ((a.props = Ua(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (i) {
      lt(e, n, i);
    }
  }
  function _o(e, n) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof a == "function" ? (e.refCleanup = a(i)) : (a.current = i);
      }
    } catch (u) {
      lt(e, n, u);
    }
  }
  function Qn(e, n) {
    var a = e.ref,
      i = e.refCleanup;
    if (a !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (u) {
          lt(e, n, u);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          lt(e, n, u);
        }
      else a.current = null;
  }
  function bg(e) {
    var n = e.type,
      a = e.memoizedProps,
      i = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && i.focus();
          break e;
        case "img":
          a.src ? (i.src = a.src) : a.srcSet && (i.srcset = a.srcSet);
      }
    } catch (u) {
      lt(e, e.return, u);
    }
  }
  function Of(e, n, a) {
    try {
      var i = e.stateNode;
      (hx(i, e.type, a, n), (i[Ut] = n));
    } catch (u) {
      lt(e, e.return, u);
    }
  }
  function Sg(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && ia(e.type)) ||
      e.tag === 4
    );
  }
  function Mf(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || Sg(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && ia(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Nf(e, n, a) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode),
        n
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a
            ).insertBefore(e, n)
          : ((n =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                  ? a.ownerDocument.body
                  : a),
            n.appendChild(e),
            (a = a._reactRootContainer),
            a != null || n.onclick !== null || (n.onclick = $s)));
    else if (
      i !== 4 &&
      (i === 27 && ia(e.type) && ((a = e.stateNode), (n = null)),
      (e = e.child),
      e !== null)
    )
      for (Nf(e, n, a), e = e.sibling; e !== null;)
        (Nf(e, n, a), (e = e.sibling));
  }
  function Os(e, n, a) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode), n ? a.insertBefore(e, n) : a.appendChild(e));
    else if (
      i !== 4 &&
      (i === 27 && ia(e.type) && (a = e.stateNode), (e = e.child), e !== null)
    )
      for (Os(e, n, a), e = e.sibling; e !== null;)
        (Os(e, n, a), (e = e.sibling));
  }
  function xg(e) {
    var n = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var i = e.type, u = n.attributes; u.length;)
        n.removeAttributeNode(u[0]);
      (Vt(n, i, a), (n[Bt] = e), (n[Ut] = a));
    } catch (d) {
      lt(e, e.return, d);
    }
  }
  var Or = !1,
    xt = !1,
    Bf = !1,
    Rg = typeof WeakSet == "function" ? WeakSet : Set,
    jt = null;
  function KS(e, n) {
    if (((e = e.containerInfo), (td = Vs), (e = Dh(e)), Oc(e))) {
      if ("selectionStart" in e)
        var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var i = a.getSelection && a.getSelection();
          if (i && i.rangeCount !== 0) {
            a = i.anchorNode;
            var u = i.anchorOffset,
              d = i.focusNode;
            i = i.focusOffset;
            try {
              (a.nodeType, d.nodeType);
            } catch {
              a = null;
              break e;
            }
            var y = 0,
              T = -1,
              _ = -1,
              Y = 0,
              te = 0,
              ae = e,
              G = null;
            t: for (;;) {
              for (
                var K;
                ae !== a || (u !== 0 && ae.nodeType !== 3) || (T = y + u),
                  ae !== d || (i !== 0 && ae.nodeType !== 3) || (_ = y + i),
                  ae.nodeType === 3 && (y += ae.nodeValue.length),
                  (K = ae.firstChild) !== null;
              )
                ((G = ae), (ae = K));
              for (;;) {
                if (ae === e) break t;
                if (
                  (G === a && ++Y === u && (T = y),
                  G === d && ++te === i && (_ = y),
                  (K = ae.nextSibling) !== null)
                )
                  break;
                ((ae = G), (G = ae.parentNode));
              }
              ae = K;
            }
            a = T === -1 || _ === -1 ? null : { start: T, end: _ };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      nd = { focusedElem: e, selectionRange: a }, Vs = !1, jt = n;
      jt !== null;
    )
      if (
        ((n = jt), (e = n.child), (n.subtreeFlags & 1024) !== 0 && e !== null)
      )
        ((e.return = n), (jt = e));
      else
        for (; jt !== null;) {
          switch (((n = jt), (d = n.alternate), (e = n.flags), n.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                ((e = void 0),
                  (a = n),
                  (u = d.memoizedProps),
                  (d = d.memoizedState),
                  (i = a.stateNode));
                try {
                  var xe = Ua(a.type, u, a.elementType === a.type);
                  ((e = i.getSnapshotBeforeUpdate(xe, d)),
                    (i.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ye) {
                  lt(a, a.return, ye);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = n.stateNode.containerInfo), (a = e.nodeType), a === 9)
                )
                  ld(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ld(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = n.sibling), e !== null)) {
            ((e.return = n.return), (jt = e));
            break;
          }
          jt = n.return;
        }
  }
  function Eg(e, n, a) {
    var i = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (ea(e, a), i & 4 && Bo(5, a));
        break;
      case 1:
        if ((ea(e, a), i & 4))
          if (((e = a.stateNode), n === null))
            try {
              e.componentDidMount();
            } catch (y) {
              lt(a, a.return, y);
            }
          else {
            var u = Ua(a.type, n.memoizedProps);
            n = n.memoizedState;
            try {
              e.componentDidUpdate(u, n, e.__reactInternalSnapshotBeforeUpdate);
            } catch (y) {
              lt(a, a.return, y);
            }
          }
        (i & 64 && yg(a), i & 512 && _o(a, a.return));
        break;
      case 3:
        if ((ea(e, a), i & 64 && ((e = a.updateQueue), e !== null))) {
          if (((n = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                n = a.child.stateNode;
                break;
              case 1:
                n = a.child.stateNode;
            }
          try {
            am(e, n);
          } catch (y) {
            lt(a, a.return, y);
          }
        }
        break;
      case 27:
        n === null && i & 4 && xg(a);
      case 26:
      case 5:
        (ea(e, a), n === null && i & 4 && bg(a), i & 512 && _o(a, a.return));
        break;
      case 12:
        ea(e, a);
        break;
      case 13:
        (ea(e, a),
          i & 4 && Ag(e, a),
          i & 64 &&
            ((e = a.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((a = rx.bind(null, a)), xx(e, a)))));
        break;
      case 22:
        if (((i = a.memoizedState !== null || Or), !i)) {
          ((n = (n !== null && n.memoizedState !== null) || xt), (u = Or));
          var d = xt;
          ((Or = i),
            (xt = n) && !d ? ta(e, a, (a.subtreeFlags & 8772) !== 0) : ea(e, a),
            (Or = u),
            (xt = d));
        }
        break;
      case 30:
        break;
      default:
        ea(e, a);
    }
  }
  function Tg(e) {
    var n = e.alternate;
    (n !== null && ((e.alternate = null), Tg(n)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((n = e.stateNode), n !== null && Wa(n)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var ft = null,
    sn = !1;
  function Mr(e, n, a) {
    for (a = a.child; a !== null;) (Cg(e, n, a), (a = a.sibling));
  }
  function Cg(e, n, a) {
    if (Ue && typeof Ue.onCommitFiberUnmount == "function")
      try {
        Ue.onCommitFiberUnmount(Nt, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (xt || Qn(a, n),
          Mr(e, n, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        xt || Qn(a, n);
        var i = ft,
          u = sn;
        (ia(a.type) && ((ft = a.stateNode), (sn = !1)),
          Mr(e, n, a),
          qo(a.stateNode),
          (ft = i),
          (sn = u));
        break;
      case 5:
        xt || Qn(a, n);
      case 6:
        if (
          ((i = ft),
          (u = sn),
          (ft = null),
          Mr(e, n, a),
          (ft = i),
          (sn = u),
          ft !== null)
        )
          if (sn)
            try {
              (ft.nodeType === 9
                ? ft.body
                : ft.nodeName === "HTML"
                  ? ft.ownerDocument.body
                  : ft
              ).removeChild(a.stateNode);
            } catch (d) {
              lt(a, n, d);
            }
          else
            try {
              ft.removeChild(a.stateNode);
            } catch (d) {
              lt(a, n, d);
            }
        break;
      case 18:
        ft !== null &&
          (sn
            ? ((e = ft),
              py(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                a.stateNode,
              ),
              Xo(e))
            : py(ft, a.stateNode));
        break;
      case 4:
        ((i = ft),
          (u = sn),
          (ft = a.stateNode.containerInfo),
          (sn = !0),
          Mr(e, n, a),
          (ft = i),
          (sn = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (xt || Jr(2, a, n), xt || Jr(4, a, n), Mr(e, n, a));
        break;
      case 1:
        (xt ||
          (Qn(a, n),
          (i = a.stateNode),
          typeof i.componentWillUnmount == "function" && vg(a, n, i)),
          Mr(e, n, a));
        break;
      case 21:
        Mr(e, n, a);
        break;
      case 22:
        ((xt = (i = xt) || a.memoizedState !== null), Mr(e, n, a), (xt = i));
        break;
      default:
        Mr(e, n, a);
    }
  }
  function Ag(e, n) {
    if (
      n.memoizedState === null &&
      ((e = n.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Xo(e);
      } catch (a) {
        lt(n, n.return, a);
      }
  }
  function XS(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var n = e.stateNode;
        return (n === null && (n = e.stateNode = new Rg()), n);
      case 22:
        return (
          (e = e.stateNode),
          (n = e._retryCache),
          n === null && (n = e._retryCache = new Rg()),
          n
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function _f(e, n) {
    var a = XS(e);
    n.forEach(function (i) {
      var u = ax.bind(null, e, i);
      a.has(i) || (a.add(i), i.then(u, u));
    });
  }
  function mn(e, n) {
    var a = n.deletions;
    if (a !== null)
      for (var i = 0; i < a.length; i++) {
        var u = a[i],
          d = e,
          y = n,
          T = y;
        e: for (; T !== null;) {
          switch (T.tag) {
            case 27:
              if (ia(T.type)) {
                ((ft = T.stateNode), (sn = !1));
                break e;
              }
              break;
            case 5:
              ((ft = T.stateNode), (sn = !1));
              break e;
            case 3:
            case 4:
              ((ft = T.stateNode.containerInfo), (sn = !0));
              break e;
          }
          T = T.return;
        }
        if (ft === null) throw Error(o(160));
        (Cg(d, y, u),
          (ft = null),
          (sn = !1),
          (d = u.alternate),
          d !== null && (d.return = null),
          (u.return = null));
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null;) (wg(n, e), (n = n.sibling));
  }
  var $n = null;
  function wg(e, n) {
    var a = e.alternate,
      i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (mn(n, e),
          gn(e),
          i & 4 && (Jr(3, e, e.return), Bo(3, e), Jr(5, e, e.return)));
        break;
      case 1:
        (mn(n, e),
          gn(e),
          i & 512 && (xt || a === null || Qn(a, a.return)),
          i & 64 &&
            Or &&
            ((e = e.updateQueue),
            e !== null &&
              ((i = e.callbacks),
              i !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? i : a.concat(i))))));
        break;
      case 26:
        var u = $n;
        if (
          (mn(n, e),
          gn(e),
          i & 512 && (xt || a === null || Qn(a, a.return)),
          i & 4)
        ) {
          var d = a !== null ? a.memoizedState : null;
          if (((i = e.memoizedState), a === null))
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  ((i = e.type),
                    (a = e.memoizedProps),
                    (u = u.ownerDocument || u));
                  t: switch (i) {
                    case "title":
                      ((d = u.getElementsByTagName("title")[0]),
                        (!d ||
                          d[xa] ||
                          d[Bt] ||
                          d.namespaceURI === "http://www.w3.org/2000/svg" ||
                          d.hasAttribute("itemprop")) &&
                          ((d = u.createElement(i)),
                          u.head.insertBefore(
                            d,
                            u.querySelector("head > title"),
                          )),
                        Vt(d, i, a),
                        (d[Bt] = e),
                        bt(d),
                        (i = d));
                      break e;
                    case "link":
                      var y = xy("link", "href", u).get(i + (a.href || ""));
                      if (y) {
                        for (var T = 0; T < y.length; T++)
                          if (
                            ((d = y[T]),
                            d.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              d.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              d.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              d.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            y.splice(T, 1);
                            break t;
                          }
                      }
                      ((d = u.createElement(i)),
                        Vt(d, i, a),
                        u.head.appendChild(d));
                      break;
                    case "meta":
                      if (
                        (y = xy("meta", "content", u).get(
                          i + (a.content || ""),
                        ))
                      ) {
                        for (T = 0; T < y.length; T++)
                          if (
                            ((d = y[T]),
                            d.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              d.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              d.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              d.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              d.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            y.splice(T, 1);
                            break t;
                          }
                      }
                      ((d = u.createElement(i)),
                        Vt(d, i, a),
                        u.head.appendChild(d));
                      break;
                    default:
                      throw Error(o(468, i));
                  }
                  ((d[Bt] = e), bt(d), (i = d));
                }
                e.stateNode = i;
              } else Ry(u, e.type, e.stateNode);
            else e.stateNode = Sy(u, i, e.memoizedProps);
          else
            d !== i
              ? (d === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : d.count--,
                i === null
                  ? Ry(u, e.type, e.stateNode)
                  : Sy(u, i, e.memoizedProps))
              : i === null &&
                e.stateNode !== null &&
                Of(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (mn(n, e),
          gn(e),
          i & 512 && (xt || a === null || Qn(a, a.return)),
          a !== null && i & 4 && Of(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if (
          (mn(n, e),
          gn(e),
          i & 512 && (xt || a === null || Qn(a, a.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            tl(u, "");
          } catch (K) {
            lt(e, e.return, K);
          }
        }
        (i & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), Of(e, u, a !== null ? a.memoizedProps : u)),
          i & 1024 && (Bf = !0));
        break;
      case 6:
        if ((mn(n, e), gn(e), i & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((i = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = i;
          } catch (K) {
            lt(e, e.return, K);
          }
        }
        break;
      case 3:
        if (
          ((Is = null),
          (u = $n),
          ($n = qs(n.containerInfo)),
          mn(n, e),
          ($n = u),
          gn(e),
          i & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Xo(n.containerInfo);
          } catch (K) {
            lt(e, e.return, K);
          }
        Bf && ((Bf = !1), Og(e));
        break;
      case 4:
        ((i = $n),
          ($n = qs(e.stateNode.containerInfo)),
          mn(n, e),
          gn(e),
          ($n = i));
        break;
      case 12:
        (mn(n, e), gn(e));
        break;
      case 13:
        (mn(n, e),
          gn(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (jf = ke()),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), _f(e, i))));
        break;
      case 22:
        u = e.memoizedState !== null;
        var _ = a !== null && a.memoizedState !== null,
          Y = Or,
          te = xt;
        if (
          ((Or = Y || u),
          (xt = te || _),
          mn(n, e),
          (xt = te),
          (Or = Y),
          gn(e),
          i & 8192)
        )
          e: for (
            n = e.stateNode,
              n._visibility = u ? n._visibility & -2 : n._visibility | 1,
              u && (a === null || _ || Or || xt || La(e)),
              a = null,
              n = e;
            ;
          ) {
            if (n.tag === 5 || n.tag === 26) {
              if (a === null) {
                _ = a = n;
                try {
                  if (((d = _.stateNode), u))
                    ((y = d.style),
                      typeof y.setProperty == "function"
                        ? y.setProperty("display", "none", "important")
                        : (y.display = "none"));
                  else {
                    T = _.stateNode;
                    var ae = _.memoizedProps.style,
                      G =
                        ae != null && ae.hasOwnProperty("display")
                          ? ae.display
                          : null;
                    T.style.display =
                      G == null || typeof G == "boolean" ? "" : ("" + G).trim();
                  }
                } catch (K) {
                  lt(_, _.return, K);
                }
              }
            } else if (n.tag === 6) {
              if (a === null) {
                _ = n;
                try {
                  _.stateNode.nodeValue = u ? "" : _.memoizedProps;
                } catch (K) {
                  lt(_, _.return, K);
                }
              }
            } else if (
              ((n.tag !== 22 && n.tag !== 23) ||
                n.memoizedState === null ||
                n === e) &&
              n.child !== null
            ) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null;) {
              if (n.return === null || n.return === e) break e;
              (a === n && (a = null), (n = n.return));
            }
            (a === n && (a = null),
              (n.sibling.return = n.return),
              (n = n.sibling));
          }
        i & 4 &&
          ((i = e.updateQueue),
          i !== null &&
            ((a = i.retryQueue),
            a !== null && ((i.retryQueue = null), _f(e, a))));
        break;
      case 19:
        (mn(n, e),
          gn(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), _f(e, i))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (mn(n, e), gn(e));
    }
  }
  function gn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var a, i = e.return; i !== null;) {
          if (Sg(i)) {
            a = i;
            break;
          }
          i = i.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode,
              d = Mf(e);
            Os(e, d, u);
            break;
          case 5:
            var y = a.stateNode;
            a.flags & 32 && (tl(y, ""), (a.flags &= -33));
            var T = Mf(e);
            Os(e, T, y);
            break;
          case 3:
          case 4:
            var _ = a.stateNode.containerInfo,
              Y = Mf(e);
            Nf(e, Y, _);
            break;
          default:
            throw Error(o(161));
        }
      } catch (te) {
        lt(e, e.return, te);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Og(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null;) {
        var n = e;
        (Og(n),
          n.tag === 5 && n.flags & 1024 && n.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function ea(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null;) (Eg(e, n.alternate, n), (n = n.sibling));
  }
  function La(e) {
    for (e = e.child; e !== null;) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Jr(4, n, n.return), La(n));
          break;
        case 1:
          Qn(n, n.return);
          var a = n.stateNode;
          (typeof a.componentWillUnmount == "function" && vg(n, n.return, a),
            La(n));
          break;
        case 27:
          qo(n.stateNode);
        case 26:
        case 5:
          (Qn(n, n.return), La(n));
          break;
        case 22:
          n.memoizedState === null && La(n);
          break;
        case 30:
          La(n);
          break;
        default:
          La(n);
      }
      e = e.sibling;
    }
  }
  function ta(e, n, a) {
    for (a = a && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null;) {
      var i = n.alternate,
        u = e,
        d = n,
        y = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (ta(u, d, a), Bo(4, d));
          break;
        case 1:
          if (
            (ta(u, d, a),
            (i = d),
            (u = i.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (Y) {
              lt(i, i.return, Y);
            }
          if (((i = d), (u = i.updateQueue), u !== null)) {
            var T = i.stateNode;
            try {
              var _ = u.shared.hiddenCallbacks;
              if (_ !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < _.length; u++)
                  rm(_[u], T);
            } catch (Y) {
              lt(i, i.return, Y);
            }
          }
          (a && y & 64 && yg(d), _o(d, d.return));
          break;
        case 27:
          xg(d);
        case 26:
        case 5:
          (ta(u, d, a), a && i === null && y & 4 && bg(d), _o(d, d.return));
          break;
        case 12:
          ta(u, d, a);
          break;
        case 13:
          (ta(u, d, a), a && y & 4 && Ag(u, d));
          break;
        case 22:
          (d.memoizedState === null && ta(u, d, a), _o(d, d.return));
          break;
        case 30:
          break;
        default:
          ta(u, d, a);
      }
      n = n.sibling;
    }
  }
  function Df(e, n) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      n.memoizedState !== null &&
        n.memoizedState.cachePool !== null &&
        (e = n.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && yo(a)));
  }
  function zf(e, n) {
    ((e = null),
      n.alternate !== null && (e = n.alternate.memoizedState.cache),
      (n = n.memoizedState.cache),
      n !== e && (n.refCount++, e != null && yo(e)));
  }
  function Zn(e, n, a, i) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null;) (Mg(e, n, a, i), (n = n.sibling));
  }
  function Mg(e, n, a, i) {
    var u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (Zn(e, n, a, i), u & 2048 && Bo(9, n));
        break;
      case 1:
        Zn(e, n, a, i);
        break;
      case 3:
        (Zn(e, n, a, i),
          u & 2048 &&
            ((e = null),
            n.alternate !== null && (e = n.alternate.memoizedState.cache),
            (n = n.memoizedState.cache),
            n !== e && (n.refCount++, e != null && yo(e))));
        break;
      case 12:
        if (u & 2048) {
          (Zn(e, n, a, i), (e = n.stateNode));
          try {
            var d = n.memoizedProps,
              y = d.id,
              T = d.onPostCommit;
            typeof T == "function" &&
              T(
                y,
                n.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (_) {
            lt(n, n.return, _);
          }
        } else Zn(e, n, a, i);
        break;
      case 13:
        Zn(e, n, a, i);
        break;
      case 23:
        break;
      case 22:
        ((d = n.stateNode),
          (y = n.alternate),
          n.memoizedState !== null
            ? d._visibility & 2
              ? Zn(e, n, a, i)
              : Do(e, n)
            : d._visibility & 2
              ? Zn(e, n, a, i)
              : ((d._visibility |= 2),
                Sl(e, n, a, i, (n.subtreeFlags & 10256) !== 0)),
          u & 2048 && Df(y, n));
        break;
      case 24:
        (Zn(e, n, a, i), u & 2048 && zf(n.alternate, n));
        break;
      default:
        Zn(e, n, a, i);
    }
  }
  function Sl(e, n, a, i, u) {
    for (u = u && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null;) {
      var d = e,
        y = n,
        T = a,
        _ = i,
        Y = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          (Sl(d, y, T, _, u), Bo(8, y));
          break;
        case 23:
          break;
        case 22:
          var te = y.stateNode;
          (y.memoizedState !== null
            ? te._visibility & 2
              ? Sl(d, y, T, _, u)
              : Do(d, y)
            : ((te._visibility |= 2), Sl(d, y, T, _, u)),
            u && Y & 2048 && Df(y.alternate, y));
          break;
        case 24:
          (Sl(d, y, T, _, u), u && Y & 2048 && zf(y.alternate, y));
          break;
        default:
          Sl(d, y, T, _, u);
      }
      n = n.sibling;
    }
  }
  function Do(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null;) {
        var a = e,
          i = n,
          u = i.flags;
        switch (i.tag) {
          case 22:
            (Do(a, i), u & 2048 && Df(i.alternate, i));
            break;
          case 24:
            (Do(a, i), u & 2048 && zf(i.alternate, i));
            break;
          default:
            Do(a, i);
        }
        n = n.sibling;
      }
  }
  var zo = 8192;
  function xl(e) {
    if (e.subtreeFlags & zo)
      for (e = e.child; e !== null;) (Ng(e), (e = e.sibling));
  }
  function Ng(e) {
    switch (e.tag) {
      case 26:
        (xl(e),
          e.flags & zo &&
            e.memoizedState !== null &&
            zx($n, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        xl(e);
        break;
      case 3:
      case 4:
        var n = $n;
        (($n = qs(e.stateNode.containerInfo)), xl(e), ($n = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = zo), (zo = 16777216), xl(e), (zo = n))
            : xl(e));
        break;
      default:
        xl(e);
    }
  }
  function Bg(e) {
    var n = e.alternate;
    if (n !== null && ((e = n.child), e !== null)) {
      n.child = null;
      do ((n = e.sibling), (e.sibling = null), (e = n));
      while (e !== null);
    }
  }
  function ko(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var i = n[a];
          ((jt = i), Dg(i, e));
        }
      Bg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null;) (_g(e), (e = e.sibling));
  }
  function _g(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ko(e), e.flags & 2048 && Jr(9, e, e.return));
        break;
      case 3:
        ko(e);
        break;
      case 12:
        ko(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null &&
        n._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((n._visibility &= -3), Ms(e))
          : ko(e);
        break;
      default:
        ko(e);
    }
  }
  function Ms(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var i = n[a];
          ((jt = i), Dg(i, e));
        }
      Bg(e);
    }
    for (e = e.child; e !== null;) {
      switch (((n = e), n.tag)) {
        case 0:
        case 11:
        case 15:
          (Jr(8, n, n.return), Ms(n));
          break;
        case 22:
          ((a = n.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), Ms(n)));
          break;
        default:
          Ms(n);
      }
      e = e.sibling;
    }
  }
  function Dg(e, n) {
    for (; jt !== null;) {
      var a = jt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Jr(8, a, n);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var i = a.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          yo(a.memoizedState.cache);
      }
      if (((i = a.child), i !== null)) ((i.return = a), (jt = i));
      else
        e: for (a = e; jt !== null;) {
          i = jt;
          var u = i.sibling,
            d = i.return;
          if ((Tg(i), i === a)) {
            jt = null;
            break e;
          }
          if (u !== null) {
            ((u.return = d), (jt = u));
            break e;
          }
          jt = d;
        }
    }
  }
  var QS = {
      getCacheForType: function (e) {
        var n = Xt(_t),
          a = n.data.get(e);
        return (a === void 0 && ((a = e()), n.data.set(e, a)), a);
      },
    },
    ZS = typeof WeakMap == "function" ? WeakMap : Map,
    Xe = 0,
    st = null,
    _e = null,
    Le = 0,
    Qe = 0,
    yn = null,
    na = !1,
    Rl = !1,
    kf = !1,
    Nr = 0,
    gt = 0,
    ra = 0,
    ja = 0,
    Uf = 0,
    Bn = 0,
    El = 0,
    Uo = null,
    un = null,
    Lf = !1,
    jf = 0,
    Ns = 1 / 0,
    Bs = null,
    aa = null,
    Yt = 0,
    la = null,
    Tl = null,
    Cl = 0,
    $f = 0,
    Hf = null,
    zg = null,
    Lo = 0,
    qf = null;
  function vn() {
    if ((Xe & 2) !== 0 && Le !== 0) return Le & -Le;
    if (M.T !== null) {
      var e = dl;
      return e !== 0 ? e : Kf();
    }
    return Sa();
  }
  function kg() {
    Bn === 0 && (Bn = (Le & 536870912) === 0 || qe ? qi() : 536870912);
    var e = Nn.current;
    return (e !== null && (e.flags |= 32), Bn);
  }
  function bn(e, n, a) {
    (((e === st && (Qe === 2 || Qe === 9)) || e.cancelPendingCommit !== null) &&
      (Al(e, 0), oa(e, Le, Bn, !1)),
      ba(e, a),
      ((Xe & 2) === 0 || e !== st) &&
        (e === st &&
          ((Xe & 2) === 0 && (ja |= a), gt === 4 && oa(e, Le, Bn, !1)),
        Wn(e)));
  }
  function Ug(e, n, a) {
    if ((Xe & 6) !== 0) throw Error(o(327));
    var i = (!a && (n & 124) === 0 && (n & e.expiredLanes) === 0) || va(e, n),
      u = i ? ex(e, n) : Ff(e, n, !0),
      d = i;
    do {
      if (u === 0) {
        Rl && !i && oa(e, n, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), d && !WS(a))) {
          ((u = Ff(e, n, !1)), (d = !1));
          continue;
        }
        if (u === 2) {
          if (((d = n), e.errorRecoveryDisabledLanes & d)) var y = 0;
          else
            ((y = e.pendingLanes & -536870913),
              (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
          if (y !== 0) {
            n = y;
            e: {
              var T = e;
              u = Uo;
              var _ = T.current.memoizedState.isDehydrated;
              if ((_ && (Al(T, y).flags |= 256), (y = Ff(T, y, !1)), y !== 2)) {
                if (kf && !_) {
                  ((T.errorRecoveryDisabledLanes |= d), (ja |= d), (u = 4));
                  break e;
                }
                ((d = un),
                  (un = u),
                  d !== null &&
                    (un === null ? (un = d) : un.push.apply(un, d)));
              }
              u = y;
            }
            if (((d = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Al(e, 0), oa(e, n, 0, !0));
          break;
        }
        e: {
          switch (((i = e), (d = u), d)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              oa(i, n, Bn, !na);
              break e;
            case 2:
              un = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((n & 62914560) === n && ((u = jf + 300 - ke()), 10 < u)) {
            if ((oa(i, n, Bn, !na), $r(i, 0, !0) !== 0)) break e;
            i.timeoutHandle = fy(
              Lg.bind(null, i, a, un, Bs, Lf, n, Bn, ja, El, na, d, 2, -0, 0),
              u,
            );
            break e;
          }
          Lg(i, a, un, Bs, Lf, n, Bn, ja, El, na, d, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Wn(e);
  }
  function Lg(e, n, a, i, u, d, y, T, _, Y, te, ae, G, K) {
    if (
      ((e.timeoutHandle = -1),
      (ae = n.subtreeFlags),
      (ae & 8192 || (ae & 16785408) === 16785408) &&
        ((Fo = { stylesheets: null, count: 0, unsuspend: Dx }),
        Ng(n),
        (ae = kx()),
        ae !== null))
    ) {
      ((e.cancelPendingCommit = ae(
        Fg.bind(null, e, n, d, a, i, u, y, T, _, te, 1, G, K),
      )),
        oa(e, d, y, !Y));
      return;
    }
    Fg(e, n, d, a, i, u, y, T, _);
  }
  function WS(e) {
    for (var n = e; ;) {
      var a = n.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        n.flags & 16384 &&
        ((a = n.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var i = 0; i < a.length; i++) {
          var u = a[i],
            d = u.getSnapshot;
          u = u.value;
          try {
            if (!pn(d(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = n.child), n.subtreeFlags & 16384 && a !== null))
        ((a.return = n), (n = a));
      else {
        if (n === e) break;
        for (; n.sibling === null;) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    }
    return !0;
  }
  function oa(e, n, a, i) {
    ((n &= ~Uf),
      (n &= ~ja),
      (e.suspendedLanes |= n),
      (e.pingedLanes &= ~n),
      i && (e.warmLanes |= n),
      (i = e.expirationTimes));
    for (var u = n; 0 < u;) {
      var d = 31 - vt(u),
        y = 1 << d;
      ((i[d] = -1), (u &= ~y));
    }
    a !== 0 && Ii(e, a, n);
  }
  function _s() {
    return (Xe & 6) === 0 ? (jo(0), !1) : !0;
  }
  function Pf() {
    if (_e !== null) {
      if (Qe === 0) var e = _e.return;
      else ((e = _e), (Rr = _a = null), af(e), (vl = null), (Oo = 0), (e = _e));
      for (; e !== null;) (gg(e.alternate, e), (e = e.return));
      _e = null;
    }
  }
  function Al(e, n) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), gx(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      Pf(),
      (st = e),
      (_e = a = br(e.current, null)),
      (Le = n),
      (Qe = 0),
      (yn = null),
      (na = !1),
      (Rl = va(e, n)),
      (kf = !1),
      (El = Bn = Uf = ja = ra = gt = 0),
      (un = Uo = null),
      (Lf = !1),
      (n & 8) !== 0 && (n |= n & 32));
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= n; 0 < i;) {
        var u = 31 - vt(i),
          d = 1 << u;
        ((n |= e[u]), (i &= ~d));
      }
    return ((Nr = n), es(), a);
  }
  function jg(e, n) {
    ((Ne = null),
      (M.H = bs),
      n === bo || n === us
        ? ((n = tm()), (Qe = 3))
        : n === Wh
          ? ((n = tm()), (Qe = 4))
          : (Qe =
              n === ng
                ? 8
                : n !== null &&
                    typeof n == "object" &&
                    typeof n.then == "function"
                  ? 6
                  : 1),
      (yn = n),
      _e === null && ((gt = 1), Ts(e, An(n, e.current))));
  }
  function $g() {
    var e = M.H;
    return ((M.H = bs), e === null ? bs : e);
  }
  function Hg() {
    var e = M.A;
    return ((M.A = QS), e);
  }
  function If() {
    ((gt = 4),
      na || ((Le & 4194048) !== Le && Nn.current !== null) || (Rl = !0),
      ((ra & 134217727) === 0 && (ja & 134217727) === 0) ||
        st === null ||
        oa(st, Le, Bn, !1));
  }
  function Ff(e, n, a) {
    var i = Xe;
    Xe |= 2;
    var u = $g(),
      d = Hg();
    ((st !== e || Le !== n) && ((Bs = null), Al(e, n)), (n = !1));
    var y = gt;
    e: do
      try {
        if (Qe !== 0 && _e !== null) {
          var T = _e,
            _ = yn;
          switch (Qe) {
            case 8:
              (Pf(), (y = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nn.current === null && (n = !0);
              var Y = Qe;
              if (((Qe = 0), (yn = null), wl(e, T, _, Y), a && Rl)) {
                y = 0;
                break e;
              }
              break;
            default:
              ((Y = Qe), (Qe = 0), (yn = null), wl(e, T, _, Y));
          }
        }
        (JS(), (y = gt));
        break;
      } catch (te) {
        jg(e, te);
      }
    while (!0);
    return (
      n && e.shellSuspendCounter++,
      (Rr = _a = null),
      (Xe = i),
      (M.H = u),
      (M.A = d),
      _e === null && ((st = null), (Le = 0), es()),
      y
    );
  }
  function JS() {
    for (; _e !== null;) qg(_e);
  }
  function ex(e, n) {
    var a = Xe;
    Xe |= 2;
    var i = $g(),
      u = Hg();
    st !== e || Le !== n
      ? ((Bs = null), (Ns = ke() + 500), Al(e, n))
      : (Rl = va(e, n));
    e: do
      try {
        if (Qe !== 0 && _e !== null) {
          n = _e;
          var d = yn;
          t: switch (Qe) {
            case 1:
              ((Qe = 0), (yn = null), wl(e, n, d, 1));
              break;
            case 2:
            case 9:
              if (Jh(d)) {
                ((Qe = 0), (yn = null), Pg(n));
                break;
              }
              ((n = function () {
                ((Qe !== 2 && Qe !== 9) || st !== e || (Qe = 7), Wn(e));
              }),
                d.then(n, n));
              break e;
            case 3:
              Qe = 7;
              break e;
            case 4:
              Qe = 5;
              break e;
            case 7:
              Jh(d)
                ? ((Qe = 0), (yn = null), Pg(n))
                : ((Qe = 0), (yn = null), wl(e, n, d, 7));
              break;
            case 5:
              var y = null;
              switch (_e.tag) {
                case 26:
                  y = _e.memoizedState;
                case 5:
                case 27:
                  var T = _e;
                  if (!y || Ey(y)) {
                    ((Qe = 0), (yn = null));
                    var _ = T.sibling;
                    if (_ !== null) _e = _;
                    else {
                      var Y = T.return;
                      Y !== null ? ((_e = Y), Ds(Y)) : (_e = null);
                    }
                    break t;
                  }
              }
              ((Qe = 0), (yn = null), wl(e, n, d, 5));
              break;
            case 6:
              ((Qe = 0), (yn = null), wl(e, n, d, 6));
              break;
            case 8:
              (Pf(), (gt = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        tx();
        break;
      } catch (te) {
        jg(e, te);
      }
    while (!0);
    return (
      (Rr = _a = null),
      (M.H = i),
      (M.A = u),
      (Xe = a),
      _e !== null ? 0 : ((st = null), (Le = 0), es(), gt)
    );
  }
  function tx() {
    for (; _e !== null && !Et();) qg(_e);
  }
  function qg(e) {
    var n = hg(e.alternate, e, Nr);
    ((e.memoizedProps = e.pendingProps), n === null ? Ds(e) : (_e = n));
  }
  function Pg(e) {
    var n = e,
      a = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = sg(a, n, n.pendingProps, n.type, void 0, Le);
        break;
      case 11:
        n = sg(a, n, n.pendingProps, n.type.render, n.ref, Le);
        break;
      case 5:
        af(n);
      default:
        (gg(a, n), (n = _e = Ih(n, Nr)), (n = hg(a, n, Nr)));
    }
    ((e.memoizedProps = e.pendingProps), n === null ? Ds(e) : (_e = n));
  }
  function wl(e, n, a, i) {
    ((Rr = _a = null), af(n), (vl = null), (Oo = 0));
    var u = n.return;
    try {
      if (FS(e, u, n, a, Le)) {
        ((gt = 1), Ts(e, An(a, e.current)), (_e = null));
        return;
      }
    } catch (d) {
      if (u !== null) throw ((_e = u), d);
      ((gt = 1), Ts(e, An(a, e.current)), (_e = null));
      return;
    }
    n.flags & 32768
      ? (qe || i === 1
          ? (e = !0)
          : Rl || (Le & 536870912) !== 0
            ? (e = !1)
            : ((na = e = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = Nn.current),
                i !== null && i.tag === 13 && (i.flags |= 16384))),
        Ig(n, e))
      : Ds(n);
  }
  function Ds(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Ig(n, na);
        return;
      }
      e = n.return;
      var a = VS(n.alternate, n, Nr);
      if (a !== null) {
        _e = a;
        return;
      }
      if (((n = n.sibling), n !== null)) {
        _e = n;
        return;
      }
      _e = n = e;
    } while (n !== null);
    gt === 0 && (gt = 5);
  }
  function Ig(e, n) {
    do {
      var a = GS(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (_e = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !n && ((e = e.sibling), e !== null))
      ) {
        _e = e;
        return;
      }
      _e = e = a;
    } while (e !== null);
    ((gt = 6), (_e = null));
  }
  function Fg(e, n, a, i, u, d, y, T, _) {
    e.cancelPendingCommit = null;
    do zs();
    while (Yt !== 0);
    if ((Xe & 6) !== 0) throw Error(o(327));
    if (n !== null) {
      if (n === e.current) throw Error(o(177));
      if (
        ((d = n.lanes | n.childLanes),
        (d |= Dc),
        uc(e, a, d, y, T, _),
        e === st && ((_e = st = null), (Le = 0)),
        (Tl = n),
        (la = e),
        (Cl = a),
        ($f = d),
        (Hf = u),
        (zg = i),
        (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            lx(En, function () {
              return (Xg(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (i = (n.flags & 13878) !== 0),
        (n.subtreeFlags & 13878) !== 0 || i)
      ) {
        ((i = M.T), (M.T = null), (u = $.p), ($.p = 2), (y = Xe), (Xe |= 4));
        try {
          KS(e, n, a);
        } finally {
          ((Xe = y), ($.p = u), (M.T = i));
        }
      }
      ((Yt = 1), Yg(), Vg(), Gg());
    }
  }
  function Yg() {
    if (Yt === 1) {
      Yt = 0;
      var e = la,
        n = Tl,
        a = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || a) {
        ((a = M.T), (M.T = null));
        var i = $.p;
        $.p = 2;
        var u = Xe;
        Xe |= 4;
        try {
          wg(n, e);
          var d = nd,
            y = Dh(e.containerInfo),
            T = d.focusedElem,
            _ = d.selectionRange;
          if (
            y !== T &&
            T &&
            T.ownerDocument &&
            _h(T.ownerDocument.documentElement, T)
          ) {
            if (_ !== null && Oc(T)) {
              var Y = _.start,
                te = _.end;
              if ((te === void 0 && (te = Y), "selectionStart" in T))
                ((T.selectionStart = Y),
                  (T.selectionEnd = Math.min(te, T.value.length)));
              else {
                var ae = T.ownerDocument || document,
                  G = (ae && ae.defaultView) || window;
                if (G.getSelection) {
                  var K = G.getSelection(),
                    xe = T.textContent.length,
                    ye = Math.min(_.start, xe),
                    tt = _.end === void 0 ? ye : Math.min(_.end, xe);
                  !K.extend && ye > tt && ((y = tt), (tt = ye), (ye = y));
                  var H = Bh(T, ye),
                    j = Bh(T, tt);
                  if (
                    H &&
                    j &&
                    (K.rangeCount !== 1 ||
                      K.anchorNode !== H.node ||
                      K.anchorOffset !== H.offset ||
                      K.focusNode !== j.node ||
                      K.focusOffset !== j.offset)
                  ) {
                    var P = ae.createRange();
                    (P.setStart(H.node, H.offset),
                      K.removeAllRanges(),
                      ye > tt
                        ? (K.addRange(P), K.extend(j.node, j.offset))
                        : (P.setEnd(j.node, j.offset), K.addRange(P)));
                  }
                }
              }
            }
            for (ae = [], K = T; (K = K.parentNode);)
              K.nodeType === 1 &&
                ae.push({ element: K, left: K.scrollLeft, top: K.scrollTop });
            for (
              typeof T.focus == "function" && T.focus(), T = 0;
              T < ae.length;
              T++
            ) {
              var re = ae[T];
              ((re.element.scrollLeft = re.left),
                (re.element.scrollTop = re.top));
            }
          }
          ((Vs = !!td), (nd = td = null));
        } finally {
          ((Xe = u), ($.p = i), (M.T = a));
        }
      }
      ((e.current = n), (Yt = 2));
    }
  }
  function Vg() {
    if (Yt === 2) {
      Yt = 0;
      var e = la,
        n = Tl,
        a = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || a) {
        ((a = M.T), (M.T = null));
        var i = $.p;
        $.p = 2;
        var u = Xe;
        Xe |= 4;
        try {
          Eg(e, n.alternate, n);
        } finally {
          ((Xe = u), ($.p = i), (M.T = a));
        }
      }
      Yt = 3;
    }
  }
  function Gg() {
    if (Yt === 4 || Yt === 3) {
      ((Yt = 0), Mt());
      var e = la,
        n = Tl,
        a = Cl,
        i = zg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
        ? (Yt = 5)
        : ((Yt = 0), (Tl = la = null), Kg(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (aa = null),
        Hr(a),
        (n = n.stateNode),
        Ue && typeof Ue.onCommitFiberRoot == "function")
      )
        try {
          Ue.onCommitFiberRoot(Nt, n, void 0, (n.current.flags & 128) === 128);
        } catch {}
      if (i !== null) {
        ((n = M.T), (u = $.p), ($.p = 2), (M.T = null));
        try {
          for (var d = e.onRecoverableError, y = 0; y < i.length; y++) {
            var T = i[y];
            d(T.value, { componentStack: T.stack });
          }
        } finally {
          ((M.T = n), ($.p = u));
        }
      }
      ((Cl & 3) !== 0 && zs(),
        Wn(e),
        (u = e.pendingLanes),
        (a & 4194090) !== 0 && (u & 42) !== 0
          ? e === qf
            ? Lo++
            : ((Lo = 0), (qf = e))
          : (Lo = 0),
        jo(0));
    }
  }
  function Kg(e, n) {
    (e.pooledCacheLanes &= n) === 0 &&
      ((n = e.pooledCache), n != null && ((e.pooledCache = null), yo(n)));
  }
  function zs(e) {
    return (Yg(), Vg(), Gg(), Xg());
  }
  function Xg() {
    if (Yt !== 5) return !1;
    var e = la,
      n = $f;
    $f = 0;
    var a = Hr(Cl),
      i = M.T,
      u = $.p;
    try {
      (($.p = 32 > a ? 32 : a), (M.T = null), (a = Hf), (Hf = null));
      var d = la,
        y = Cl;
      if (((Yt = 0), (Tl = la = null), (Cl = 0), (Xe & 6) !== 0))
        throw Error(o(331));
      var T = Xe;
      if (
        ((Xe |= 4),
        _g(d.current),
        Mg(d, d.current, y, a),
        (Xe = T),
        jo(0, !1),
        Ue && typeof Ue.onPostCommitFiberRoot == "function")
      )
        try {
          Ue.onPostCommitFiberRoot(Nt, d);
        } catch {}
      return !0;
    } finally {
      (($.p = u), (M.T = i), Kg(e, n));
    }
  }
  function Qg(e, n, a) {
    ((n = An(a, n)),
      (n = bf(e.stateNode, n, 2)),
      (e = Xr(e, n, 2)),
      e !== null && (ba(e, 2), Wn(e)));
  }
  function lt(e, n, a) {
    if (e.tag === 3) Qg(e, e, a);
    else
      for (; n !== null;) {
        if (n.tag === 3) {
          Qg(n, e, a);
          break;
        } else if (n.tag === 1) {
          var i = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof i.componentDidCatch == "function" &&
              (aa === null || !aa.has(i)))
          ) {
            ((e = An(a, e)),
              (a = eg(2)),
              (i = Xr(n, a, 2)),
              i !== null && (tg(a, i, n, e), ba(i, 2), Wn(i)));
            break;
          }
        }
        n = n.return;
      }
  }
  function Yf(e, n, a) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new ZS();
      var u = new Set();
      i.set(n, u);
    } else ((u = i.get(n)), u === void 0 && ((u = new Set()), i.set(n, u)));
    u.has(a) ||
      ((kf = !0), u.add(a), (e = nx.bind(null, e, n, a)), n.then(e, e));
  }
  function nx(e, n, a) {
    var i = e.pingCache;
    (i !== null && i.delete(n),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      st === e &&
        (Le & a) === a &&
        (gt === 4 || (gt === 3 && (Le & 62914560) === Le && 300 > ke() - jf)
          ? (Xe & 2) === 0 && Al(e, 0)
          : (Uf |= a),
        El === Le && (El = 0)),
      Wn(e));
  }
  function Zg(e, n) {
    (n === 0 && (n = Pi()), (e = sl(e, n)), e !== null && (ba(e, n), Wn(e)));
  }
  function rx(e) {
    var n = e.memoizedState,
      a = 0;
    (n !== null && (a = n.retryLane), Zg(e, a));
  }
  function ax(e, n) {
    var a = 0;
    switch (e.tag) {
      case 13:
        var i = e.stateNode,
          u = e.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (i !== null && i.delete(n), Zg(e, a));
  }
  function lx(e, n) {
    return ze(e, n);
  }
  var ks = null,
    Ol = null,
    Vf = !1,
    Us = !1,
    Gf = !1,
    $a = 0;
  function Wn(e) {
    (e !== Ol &&
      e.next === null &&
      (Ol === null ? (ks = Ol = e) : (Ol = Ol.next = e)),
      (Us = !0),
      Vf || ((Vf = !0), ix()));
  }
  function jo(e, n) {
    if (!Gf && Us) {
      Gf = !0;
      do
        for (var a = !1, i = ks; i !== null;) {
          if (e !== 0) {
            var u = i.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var y = i.suspendedLanes,
                T = i.pingedLanes;
              ((d = (1 << (31 - vt(42 | e) + 1)) - 1),
                (d &= u & ~(y & ~T)),
                (d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
            }
            d !== 0 && ((a = !0), ty(i, d));
          } else
            ((d = Le),
              (d = $r(
                i,
                i === st ? d : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== -1,
              )),
              (d & 3) === 0 || va(i, d) || ((a = !0), ty(i, d)));
          i = i.next;
        }
      while (a);
      Gf = !1;
    }
  }
  function ox() {
    Wg();
  }
  function Wg() {
    Us = Vf = !1;
    var e = 0;
    $a !== 0 && (mx() && (e = $a), ($a = 0));
    for (var n = ke(), a = null, i = ks; i !== null;) {
      var u = i.next,
        d = Jg(i, n);
      (d === 0
        ? ((i.next = null),
          a === null ? (ks = u) : (a.next = u),
          u === null && (Ol = a))
        : ((a = i), (e !== 0 || (d & 3) !== 0) && (Us = !0)),
        (i = u));
    }
    jo(e);
  }
  function Jg(e, n) {
    for (
      var a = e.suspendedLanes,
        i = e.pingedLanes,
        u = e.expirationTimes,
        d = e.pendingLanes & -62914561;
      0 < d;
    ) {
      var y = 31 - vt(d),
        T = 1 << y,
        _ = u[y];
      (_ === -1
        ? ((T & a) === 0 || (T & i) !== 0) && (u[y] = Hi(T, n))
        : _ <= n && (e.expiredLanes |= T),
        (d &= ~T));
    }
    if (
      ((n = st),
      (a = Le),
      (a = $r(
        e,
        e === n ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (i = e.callbackNode),
      a === 0 ||
        (e === n && (Qe === 2 || Qe === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        i !== null && i !== null && Ee(i),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((a & 3) === 0 || va(e, a)) {
      if (((n = a & -a), n === e.callbackPriority)) return n;
      switch ((i !== null && Ee(i), Hr(a))) {
        case 2:
        case 8:
          a = Ln;
          break;
        case 32:
          a = En;
          break;
        case 268435456:
          a = qt;
          break;
        default:
          a = En;
      }
      return (
        (i = ey.bind(null, e)),
        (a = ze(a, i)),
        (e.callbackPriority = n),
        (e.callbackNode = a),
        n
      );
    }
    return (
      i !== null && i !== null && Ee(i),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function ey(e, n) {
    if (Yt !== 0 && Yt !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (zs() && e.callbackNode !== a) return null;
    var i = Le;
    return (
      (i = $r(
        e,
        e === st ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      i === 0
        ? null
        : (Ug(e, i, n),
          Jg(e, ke()),
          e.callbackNode != null && e.callbackNode === a
            ? ey.bind(null, e)
            : null)
    );
  }
  function ty(e, n) {
    if (zs()) return null;
    Ug(e, n, !0);
  }
  function ix() {
    yx(function () {
      (Xe & 6) !== 0 ? ze(ut, ox) : Wg();
    });
  }
  function Kf() {
    return ($a === 0 && ($a = qi()), $a);
  }
  function ny(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Gi("" + e);
  }
  function ry(e, n) {
    var a = n.ownerDocument.createElement("input");
    return (
      (a.name = n.name),
      (a.value = n.value),
      e.id && a.setAttribute("form", e.id),
      n.parentNode.insertBefore(a, n),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function sx(e, n, a, i, u) {
    if (n === "submit" && a && a.stateNode === u) {
      var d = ny((u[Ut] || null).action),
        y = i.submitter;
      y &&
        ((n = (n = y[Ut] || null)
          ? ny(n.formAction)
          : y.getAttribute("formAction")),
        n !== null && ((d = n), (y = null)));
      var T = new Zi("action", "action", null, i, u);
      e.push({
        event: T,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if ($a !== 0) {
                  var _ = y ? ry(u, y) : new FormData(u);
                  hf(
                    a,
                    { pending: !0, data: _, method: u.method, action: d },
                    null,
                    _,
                  );
                }
              } else
                typeof d == "function" &&
                  (T.preventDefault(),
                  (_ = y ? ry(u, y) : new FormData(u)),
                  hf(
                    a,
                    { pending: !0, data: _, method: u.method, action: d },
                    d,
                    _,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Xf = 0; Xf < _c.length; Xf++) {
    var Qf = _c[Xf],
      ux = Qf.toLowerCase(),
      cx = Qf[0].toUpperCase() + Qf.slice(1);
    jn(ux, "on" + cx);
  }
  (jn(Uh, "onAnimationEnd"),
    jn(Lh, "onAnimationIteration"),
    jn(jh, "onAnimationStart"),
    jn("dblclick", "onDoubleClick"),
    jn("focusin", "onFocus"),
    jn("focusout", "onBlur"),
    jn(wS, "onTransitionRun"),
    jn(OS, "onTransitionStart"),
    jn(MS, "onTransitionCancel"),
    jn($h, "onTransitionEnd"),
    Ve("onMouseEnter", ["mouseout", "mouseover"]),
    Ve("onMouseLeave", ["mouseout", "mouseover"]),
    Ve("onPointerEnter", ["pointerout", "pointerover"]),
    Ve("onPointerLeave", ["pointerout", "pointerover"]),
    Re(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Re(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Re("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Re(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Re(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Re(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var $o =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    fx = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat($o),
    );
  function ay(e, n) {
    n = (n & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var i = e[a],
        u = i.event;
      i = i.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var y = i.length - 1; 0 <= y; y--) {
            var T = i[y],
              _ = T.instance,
              Y = T.currentTarget;
            if (((T = T.listener), _ !== d && u.isPropagationStopped()))
              break e;
            ((d = T), (u.currentTarget = Y));
            try {
              d(u);
            } catch (te) {
              Es(te);
            }
            ((u.currentTarget = null), (d = _));
          }
        else
          for (y = 0; y < i.length; y++) {
            if (
              ((T = i[y]),
              (_ = T.instance),
              (Y = T.currentTarget),
              (T = T.listener),
              _ !== d && u.isPropagationStopped())
            )
              break e;
            ((d = T), (u.currentTarget = Y));
            try {
              d(u);
            } catch (te) {
              Es(te);
            }
            ((u.currentTarget = null), (d = _));
          }
      }
    }
  }
  function De(e, n) {
    var a = n[Gn];
    a === void 0 && (a = n[Gn] = new Set());
    var i = e + "__bubble";
    a.has(i) || (ly(n, e, 2, !1), a.add(i));
  }
  function Zf(e, n, a) {
    var i = 0;
    (n && (i |= 4), ly(a, e, i, n));
  }
  var Ls = "_reactListening" + Math.random().toString(36).slice(2);
  function Wf(e) {
    if (!e[Ls]) {
      ((e[Ls] = !0),
        ie.forEach(function (a) {
          a !== "selectionchange" && (fx.has(a) || Zf(a, !1, e), Zf(a, !0, e));
        }));
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ls] || ((n[Ls] = !0), Zf("selectionchange", !1, n));
    }
  }
  function ly(e, n, a, i) {
    switch (My(n)) {
      case 2:
        var u = jx;
        break;
      case 8:
        u = $x;
        break;
      default:
        u = dd;
    }
    ((a = u.bind(null, n, a, e)),
      (u = void 0),
      !bc ||
        (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
        (u = !0),
      i
        ? u !== void 0
          ? e.addEventListener(n, a, { capture: !0, passive: u })
          : e.addEventListener(n, a, !0)
        : u !== void 0
          ? e.addEventListener(n, a, { passive: u })
          : e.addEventListener(n, a, !1));
  }
  function Jf(e, n, a, i, u) {
    var d = i;
    if ((n & 1) === 0 && (n & 2) === 0 && i !== null)
      e: for (;;) {
        if (i === null) return;
        var y = i.tag;
        if (y === 3 || y === 4) {
          var T = i.stateNode.containerInfo;
          if (T === u) break;
          if (y === 4)
            for (y = i.return; y !== null;) {
              var _ = y.tag;
              if ((_ === 3 || _ === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; T !== null;) {
            if (((y = Pr(T)), y === null)) return;
            if (((_ = y.tag), _ === 5 || _ === 6 || _ === 26 || _ === 27)) {
              i = d = y;
              continue e;
            }
            T = T.parentNode;
          }
        }
        i = i.return;
      }
    dh(function () {
      var Y = d,
        te = yc(a),
        ae = [];
      e: {
        var G = Hh.get(e);
        if (G !== void 0) {
          var K = Zi,
            xe = e;
          switch (e) {
            case "keypress":
              if (Xi(a) === 0) break e;
            case "keydown":
            case "keyup":
              K = lS;
              break;
            case "focusin":
              ((xe = "focus"), (K = Ec));
              break;
            case "focusout":
              ((xe = "blur"), (K = Ec));
              break;
            case "beforeblur":
            case "afterblur":
              K = Ec;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              K = mh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              K = G1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              K = sS;
              break;
            case Uh:
            case Lh:
            case jh:
              K = Q1;
              break;
            case $h:
              K = cS;
              break;
            case "scroll":
            case "scrollend":
              K = Y1;
              break;
            case "wheel":
              K = dS;
              break;
            case "copy":
            case "cut":
            case "paste":
              K = W1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              K = yh;
              break;
            case "toggle":
            case "beforetoggle":
              K = hS;
          }
          var ye = (n & 4) !== 0,
            tt = !ye && (e === "scroll" || e === "scrollend"),
            H = ye ? (G !== null ? G + "Capture" : null) : G;
          ye = [];
          for (var j = Y, P; j !== null;) {
            var re = j;
            if (
              ((P = re.stateNode),
              (re = re.tag),
              (re !== 5 && re !== 26 && re !== 27) ||
                P === null ||
                H === null ||
                ((re = ro(j, H)), re != null && ye.push(Ho(j, re, P))),
              tt)
            )
              break;
            j = j.return;
          }
          0 < ye.length &&
            ((G = new K(G, xe, null, a, te)),
            ae.push({ event: G, listeners: ye }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((G = e === "mouseover" || e === "pointerover"),
            (K = e === "mouseout" || e === "pointerout"),
            G &&
              a !== gc &&
              (xe = a.relatedTarget || a.fromElement) &&
              (Pr(xe) || xe[qr]))
          )
            break e;
          if (
            (K || G) &&
            ((G =
              te.window === te
                ? te
                : (G = te.ownerDocument)
                  ? G.defaultView || G.parentWindow
                  : window),
            K
              ? ((xe = a.relatedTarget || a.toElement),
                (K = Y),
                (xe = xe ? Pr(xe) : null),
                xe !== null &&
                  ((tt = c(xe)),
                  (ye = xe.tag),
                  xe !== tt || (ye !== 5 && ye !== 27 && ye !== 6)) &&
                  (xe = null))
              : ((K = null), (xe = Y)),
            K !== xe)
          ) {
            if (
              ((ye = mh),
              (re = "onMouseLeave"),
              (H = "onMouseEnter"),
              (j = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ye = yh),
                (re = "onPointerLeave"),
                (H = "onPointerEnter"),
                (j = "pointer")),
              (tt = K == null ? G : Ir(K)),
              (P = xe == null ? G : Ir(xe)),
              (G = new ye(re, j + "leave", K, a, te)),
              (G.target = tt),
              (G.relatedTarget = P),
              (re = null),
              Pr(te) === Y &&
                ((ye = new ye(H, j + "enter", xe, a, te)),
                (ye.target = P),
                (ye.relatedTarget = tt),
                (re = ye)),
              (tt = re),
              K && xe)
            )
              t: {
                for (ye = K, H = xe, j = 0, P = ye; P; P = Ml(P)) j++;
                for (P = 0, re = H; re; re = Ml(re)) P++;
                for (; 0 < j - P;) ((ye = Ml(ye)), j--);
                for (; 0 < P - j;) ((H = Ml(H)), P--);
                for (; j--;) {
                  if (ye === H || (H !== null && ye === H.alternate)) break t;
                  ((ye = Ml(ye)), (H = Ml(H)));
                }
                ye = null;
              }
            else ye = null;
            (K !== null && oy(ae, G, K, ye, !1),
              xe !== null && tt !== null && oy(ae, tt, xe, ye, !0));
          }
        }
        e: {
          if (
            ((G = Y ? Ir(Y) : window),
            (K = G.nodeName && G.nodeName.toLowerCase()),
            K === "select" || (K === "input" && G.type === "file"))
          )
            var de = Ch;
          else if (Eh(G))
            if (Ah) de = TS;
            else {
              de = RS;
              var Be = xS;
            }
          else
            ((K = G.nodeName),
              !K ||
              K.toLowerCase() !== "input" ||
              (G.type !== "checkbox" && G.type !== "radio")
                ? Y && mc(Y.elementType) && (de = Ch)
                : (de = ES));
          if (de && (de = de(e, Y))) {
            Th(ae, de, a, te);
            break e;
          }
          (Be && Be(e, G, Y),
            e === "focusout" &&
              Y &&
              G.type === "number" &&
              Y.memoizedProps.value != null &&
              hc(G, "number", G.value));
        }
        switch (((Be = Y ? Ir(Y) : window), e)) {
          case "focusin":
            (Eh(Be) || Be.contentEditable === "true") &&
              ((ll = Be), (Mc = Y), (fo = null));
            break;
          case "focusout":
            fo = Mc = ll = null;
            break;
          case "mousedown":
            Nc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Nc = !1), zh(ae, a, te));
            break;
          case "selectionchange":
            if (AS) break;
          case "keydown":
          case "keyup":
            zh(ae, a, te);
        }
        var ge;
        if (Cc)
          e: {
            switch (e) {
              case "compositionstart":
                var ve = "onCompositionStart";
                break e;
              case "compositionend":
                ve = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ve = "onCompositionUpdate";
                break e;
            }
            ve = void 0;
          }
        else
          al
            ? xh(e, a) && (ve = "onCompositionEnd")
            : e === "keydown" &&
              a.keyCode === 229 &&
              (ve = "onCompositionStart");
        (ve &&
          (vh &&
            a.locale !== "ko" &&
            (al || ve !== "onCompositionStart"
              ? ve === "onCompositionEnd" && al && (ge = ph())
              : ((Yr = te),
                (Sc = "value" in Yr ? Yr.value : Yr.textContent),
                (al = !0))),
          (Be = js(Y, ve)),
          0 < Be.length &&
            ((ve = new gh(ve, e, null, a, te)),
            ae.push({ event: ve, listeners: Be }),
            ge
              ? (ve.data = ge)
              : ((ge = Rh(a)), ge !== null && (ve.data = ge)))),
          (ge = gS ? yS(e, a) : vS(e, a)) &&
            ((ve = js(Y, "onBeforeInput")),
            0 < ve.length &&
              ((Be = new gh("onBeforeInput", "beforeinput", null, a, te)),
              ae.push({ event: Be, listeners: ve }),
              (Be.data = ge))),
          sx(ae, e, Y, a, te));
      }
      ay(ae, n);
    });
  }
  function Ho(e, n, a) {
    return { instance: e, listener: n, currentTarget: a };
  }
  function js(e, n) {
    for (var a = n + "Capture", i = []; e !== null;) {
      var u = e,
        d = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          d === null ||
          ((u = ro(e, a)),
          u != null && i.unshift(Ho(e, u, d)),
          (u = ro(e, n)),
          u != null && i.push(Ho(e, u, d))),
        e.tag === 3)
      )
        return i;
      e = e.return;
    }
    return [];
  }
  function Ml(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function oy(e, n, a, i, u) {
    for (var d = n._reactName, y = []; a !== null && a !== i;) {
      var T = a,
        _ = T.alternate,
        Y = T.stateNode;
      if (((T = T.tag), _ !== null && _ === i)) break;
      ((T !== 5 && T !== 26 && T !== 27) ||
        Y === null ||
        ((_ = Y),
        u
          ? ((Y = ro(a, d)), Y != null && y.unshift(Ho(a, Y, _)))
          : u || ((Y = ro(a, d)), Y != null && y.push(Ho(a, Y, _)))),
        (a = a.return));
    }
    y.length !== 0 && e.push({ event: n, listeners: y });
  }
  var dx = /\r\n?/g,
    px = /\u0000|\uFFFD/g;
  function iy(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        dx,
        `
`,
      )
      .replace(px, "");
  }
  function sy(e, n) {
    return ((n = iy(n)), iy(e) === n);
  }
  function $s() {}
  function et(e, n, a, i, u, d) {
    switch (a) {
      case "children":
        typeof i == "string"
          ? n === "body" || (n === "textarea" && i === "") || tl(e, i)
          : (typeof i == "number" || typeof i == "bigint") &&
            n !== "body" &&
            tl(e, "" + i);
        break;
      case "className":
        Fr(e, "class", i);
        break;
      case "tabIndex":
        Fr(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Fr(e, a, i);
        break;
      case "style":
        ch(e, i, d);
        break;
      case "data":
        if (n !== "object") {
          Fr(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (n !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (
          i == null ||
          typeof i == "function" ||
          typeof i == "symbol" ||
          typeof i == "boolean"
        ) {
          e.removeAttribute(a);
          break;
        }
        ((i = Gi("" + i)), e.setAttribute(a, i));
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof d == "function" &&
            (a === "formAction"
              ? (n !== "input" && et(e, n, "name", u.name, u, null),
                et(e, n, "formEncType", u.formEncType, u, null),
                et(e, n, "formMethod", u.formMethod, u, null),
                et(e, n, "formTarget", u.formTarget, u, null))
              : (et(e, n, "encType", u.encType, u, null),
                et(e, n, "method", u.method, u, null),
                et(e, n, "target", u.target, u, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(a);
          break;
        }
        ((i = Gi("" + i)), e.setAttribute(a, i));
        break;
      case "onClick":
        i != null && (e.onclick = $s);
        break;
      case "onScroll":
        i != null && De("scroll", e);
        break;
      case "onScrollEnd":
        i != null && De("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(o(61));
          if (((a = i.__html), a != null)) {
            if (u.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          i == null ||
          typeof i == "function" ||
          typeof i == "boolean" ||
          typeof i == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((a = Gi("" + i)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol"
          ? e.setAttribute(a, "" + i)
          : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol"
          ? e.setAttribute(a, "")
          : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        i === !0
          ? e.setAttribute(a, "")
          : i !== !1 &&
              i != null &&
              typeof i != "function" &&
              typeof i != "symbol"
            ? e.setAttribute(a, i)
            : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        !isNaN(i) &&
        1 <= i
          ? e.setAttribute(a, i)
          : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i)
          ? e.removeAttribute(a)
          : e.setAttribute(a, i);
        break;
      case "popover":
        (De("beforetoggle", e), De("toggle", e), Ea(e, "popover", i));
        break;
      case "xlinkActuate":
        yr(e, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        yr(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
        break;
      case "xlinkRole":
        yr(e, "http://www.w3.org/1999/xlink", "xlink:role", i);
        break;
      case "xlinkShow":
        yr(e, "http://www.w3.org/1999/xlink", "xlink:show", i);
        break;
      case "xlinkTitle":
        yr(e, "http://www.w3.org/1999/xlink", "xlink:title", i);
        break;
      case "xlinkType":
        yr(e, "http://www.w3.org/1999/xlink", "xlink:type", i);
        break;
      case "xmlBase":
        yr(e, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
        break;
      case "xmlLang":
        yr(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
        break;
      case "xmlSpace":
        yr(e, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
        break;
      case "is":
        Ea(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = I1.get(a) || a), Ea(e, a, i));
    }
  }
  function ed(e, n, a, i, u, d) {
    switch (a) {
      case "style":
        ch(e, i, d);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(o(61));
          if (((a = i.__html), a != null)) {
            if (u.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof i == "string"
          ? tl(e, i)
          : (typeof i == "number" || typeof i == "bigint") && tl(e, "" + i);
        break;
      case "onScroll":
        i != null && De("scroll", e);
        break;
      case "onScrollEnd":
        i != null && De("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = $s);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!me.hasOwnProperty(a))
          e: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (n = a.slice(2, u ? a.length - 7 : void 0)),
              (d = e[Ut] || null),
              (d = d != null ? d[a] : null),
              typeof d == "function" && e.removeEventListener(n, d, u),
              typeof i == "function")
            ) {
              (typeof d != "function" &&
                d !== null &&
                (a in e
                  ? (e[a] = null)
                  : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(n, i, u));
              break e;
            }
            a in e
              ? (e[a] = i)
              : i === !0
                ? e.setAttribute(a, "")
                : Ea(e, a, i);
          }
    }
  }
  function Vt(e, n, a) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (De("error", e), De("load", e));
        var i = !1,
          u = !1,
          d;
        for (d in a)
          if (a.hasOwnProperty(d)) {
            var y = a[d];
            if (y != null)
              switch (d) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, n));
                default:
                  et(e, n, d, y, a, null);
              }
          }
        (u && et(e, n, "srcSet", a.srcSet, a, null),
          i && et(e, n, "src", a.src, a, null));
        return;
      case "input":
        De("invalid", e);
        var T = (d = y = u = null),
          _ = null,
          Y = null;
        for (i in a)
          if (a.hasOwnProperty(i)) {
            var te = a[i];
            if (te != null)
              switch (i) {
                case "name":
                  u = te;
                  break;
                case "type":
                  y = te;
                  break;
                case "checked":
                  _ = te;
                  break;
                case "defaultChecked":
                  Y = te;
                  break;
                case "value":
                  d = te;
                  break;
                case "defaultValue":
                  T = te;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (te != null) throw Error(o(137, n));
                  break;
                default:
                  et(e, n, i, te, a, null);
              }
          }
        (oh(e, d, T, _, Y, y, u, !1), Yi(e));
        return;
      case "select":
        (De("invalid", e), (i = y = d = null));
        for (u in a)
          if (a.hasOwnProperty(u) && ((T = a[u]), T != null))
            switch (u) {
              case "value":
                d = T;
                break;
              case "defaultValue":
                y = T;
                break;
              case "multiple":
                i = T;
              default:
                et(e, n, u, T, a, null);
            }
        ((n = d),
          (a = y),
          (e.multiple = !!i),
          n != null ? el(e, !!i, n, !1) : a != null && el(e, !!i, a, !0));
        return;
      case "textarea":
        (De("invalid", e), (d = u = i = null));
        for (y in a)
          if (a.hasOwnProperty(y) && ((T = a[y]), T != null))
            switch (y) {
              case "value":
                i = T;
                break;
              case "defaultValue":
                u = T;
                break;
              case "children":
                d = T;
                break;
              case "dangerouslySetInnerHTML":
                if (T != null) throw Error(o(91));
                break;
              default:
                et(e, n, y, T, a, null);
            }
        (sh(e, i, u, d), Yi(e));
        return;
      case "option":
        for (_ in a)
          if (a.hasOwnProperty(_) && ((i = a[_]), i != null))
            switch (_) {
              case "selected":
                e.selected =
                  i && typeof i != "function" && typeof i != "symbol";
                break;
              default:
                et(e, n, _, i, a, null);
            }
        return;
      case "dialog":
        (De("beforetoggle", e),
          De("toggle", e),
          De("cancel", e),
          De("close", e));
        break;
      case "iframe":
      case "object":
        De("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < $o.length; i++) De($o[i], e);
        break;
      case "image":
        (De("error", e), De("load", e));
        break;
      case "details":
        De("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (De("error", e), De("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (Y in a)
          if (a.hasOwnProperty(Y) && ((i = a[Y]), i != null))
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, n));
              default:
                et(e, n, Y, i, a, null);
            }
        return;
      default:
        if (mc(n)) {
          for (te in a)
            a.hasOwnProperty(te) &&
              ((i = a[te]), i !== void 0 && ed(e, n, te, i, a, void 0));
          return;
        }
    }
    for (T in a)
      a.hasOwnProperty(T) && ((i = a[T]), i != null && et(e, n, T, i, a, null));
  }
  function hx(e, n, a, i) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          d = null,
          y = null,
          T = null,
          _ = null,
          Y = null,
          te = null;
        for (K in a) {
          var ae = a[K];
          if (a.hasOwnProperty(K) && ae != null)
            switch (K) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                _ = ae;
              default:
                i.hasOwnProperty(K) || et(e, n, K, null, i, ae);
            }
        }
        for (var G in i) {
          var K = i[G];
          if (((ae = a[G]), i.hasOwnProperty(G) && (K != null || ae != null)))
            switch (G) {
              case "type":
                d = K;
                break;
              case "name":
                u = K;
                break;
              case "checked":
                Y = K;
                break;
              case "defaultChecked":
                te = K;
                break;
              case "value":
                y = K;
                break;
              case "defaultValue":
                T = K;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null) throw Error(o(137, n));
                break;
              default:
                K !== ae && et(e, n, G, K, i, ae);
            }
        }
        pc(e, y, T, _, Y, te, d, u);
        return;
      case "select":
        K = y = T = G = null;
        for (d in a)
          if (((_ = a[d]), a.hasOwnProperty(d) && _ != null))
            switch (d) {
              case "value":
                break;
              case "multiple":
                K = _;
              default:
                i.hasOwnProperty(d) || et(e, n, d, null, i, _);
            }
        for (u in i)
          if (
            ((d = i[u]),
            (_ = a[u]),
            i.hasOwnProperty(u) && (d != null || _ != null))
          )
            switch (u) {
              case "value":
                G = d;
                break;
              case "defaultValue":
                T = d;
                break;
              case "multiple":
                y = d;
              default:
                d !== _ && et(e, n, u, d, i, _);
            }
        ((n = T),
          (a = y),
          (i = K),
          G != null
            ? el(e, !!a, G, !1)
            : !!i != !!a &&
              (n != null ? el(e, !!a, n, !0) : el(e, !!a, a ? [] : "", !1)));
        return;
      case "textarea":
        K = G = null;
        for (T in a)
          if (
            ((u = a[T]),
            a.hasOwnProperty(T) && u != null && !i.hasOwnProperty(T))
          )
            switch (T) {
              case "value":
                break;
              case "children":
                break;
              default:
                et(e, n, T, null, i, u);
            }
        for (y in i)
          if (
            ((u = i[y]),
            (d = a[y]),
            i.hasOwnProperty(y) && (u != null || d != null))
          )
            switch (y) {
              case "value":
                G = u;
                break;
              case "defaultValue":
                K = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== d && et(e, n, y, u, i, d);
            }
        ih(e, G, K);
        return;
      case "option":
        for (var xe in a)
          if (
            ((G = a[xe]),
            a.hasOwnProperty(xe) && G != null && !i.hasOwnProperty(xe))
          )
            switch (xe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                et(e, n, xe, null, i, G);
            }
        for (_ in i)
          if (
            ((G = i[_]),
            (K = a[_]),
            i.hasOwnProperty(_) && G !== K && (G != null || K != null))
          )
            switch (_) {
              case "selected":
                e.selected =
                  G && typeof G != "function" && typeof G != "symbol";
                break;
              default:
                et(e, n, _, G, i, K);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ye in a)
          ((G = a[ye]),
            a.hasOwnProperty(ye) &&
              G != null &&
              !i.hasOwnProperty(ye) &&
              et(e, n, ye, null, i, G));
        for (Y in i)
          if (
            ((G = i[Y]),
            (K = a[Y]),
            i.hasOwnProperty(Y) && G !== K && (G != null || K != null))
          )
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null) throw Error(o(137, n));
                break;
              default:
                et(e, n, Y, G, i, K);
            }
        return;
      default:
        if (mc(n)) {
          for (var tt in a)
            ((G = a[tt]),
              a.hasOwnProperty(tt) &&
                G !== void 0 &&
                !i.hasOwnProperty(tt) &&
                ed(e, n, tt, void 0, i, G));
          for (te in i)
            ((G = i[te]),
              (K = a[te]),
              !i.hasOwnProperty(te) ||
                G === K ||
                (G === void 0 && K === void 0) ||
                ed(e, n, te, G, i, K));
          return;
        }
    }
    for (var H in a)
      ((G = a[H]),
        a.hasOwnProperty(H) &&
          G != null &&
          !i.hasOwnProperty(H) &&
          et(e, n, H, null, i, G));
    for (ae in i)
      ((G = i[ae]),
        (K = a[ae]),
        !i.hasOwnProperty(ae) ||
          G === K ||
          (G == null && K == null) ||
          et(e, n, ae, G, i, K));
  }
  var td = null,
    nd = null;
  function Hs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function uy(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function cy(e, n) {
    if (e === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && n === "foreignObject" ? 0 : e;
  }
  function rd(e, n) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      typeof n.children == "bigint" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var ad = null;
  function mx() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === ad
        ? !1
        : ((ad = e), !0)
      : ((ad = null), !1);
  }
  var fy = typeof setTimeout == "function" ? setTimeout : void 0,
    gx = typeof clearTimeout == "function" ? clearTimeout : void 0,
    dy = typeof Promise == "function" ? Promise : void 0,
    yx =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof dy < "u"
          ? function (e) {
              return dy.resolve(null).then(e).catch(vx);
            }
          : fy;
  function vx(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function ia(e) {
    return e === "head";
  }
  function py(e, n) {
    var a = n,
      i = 0,
      u = 0;
    do {
      var d = a.nextSibling;
      if ((e.removeChild(a), d && d.nodeType === 8))
        if (((a = d.data), a === "/$")) {
          if (0 < i && 8 > i) {
            a = i;
            var y = e.ownerDocument;
            if ((a & 1 && qo(y.documentElement), a & 2 && qo(y.body), a & 4))
              for (a = y.head, qo(a), y = a.firstChild; y;) {
                var T = y.nextSibling,
                  _ = y.nodeName;
                (y[xa] ||
                  _ === "SCRIPT" ||
                  _ === "STYLE" ||
                  (_ === "LINK" && y.rel.toLowerCase() === "stylesheet") ||
                  a.removeChild(y),
                  (y = T));
              }
          }
          if (u === 0) {
            (e.removeChild(d), Xo(n));
            return;
          }
          u--;
        } else
          a === "$" || a === "$?" || a === "$!"
            ? u++
            : (i = a.charCodeAt(0) - 48);
      else i = 0;
      a = d;
    } while (a);
    Xo(n);
  }
  function ld(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n;) {
      var a = n;
      switch (((n = n.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (ld(a), Wa(a));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function bx(e, n, a, i) {
    for (; e.nodeType === 1;) {
      var u = a;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (i) {
        if (!e[xa])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((d = e.getAttribute("rel")),
                d === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                d !== u.rel ||
                e.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                e.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((d = e.getAttribute("src")),
                (d !== (u.src == null ? null : u.src) ||
                  e.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  e.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  d &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var d = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === d) return e;
      } else return e;
      if (((e = Hn(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Sx(e, n, a) {
    if (n === "") return null;
    for (; e.nodeType !== 3;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !a) ||
        ((e = Hn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function od(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function xx(e, n) {
    var a = e.ownerDocument;
    if (e.data !== "$?" || a.readyState === "complete") n();
    else {
      var i = function () {
        (n(), a.removeEventListener("DOMContentLoaded", i));
      };
      (a.addEventListener("DOMContentLoaded", i), (e._reactRetry = i));
    }
  }
  function Hn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (
          ((n = e.data),
          n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
        )
          break;
        if (n === "/$") return null;
      }
    }
    return e;
  }
  var id = null;
  function hy(e) {
    e = e.previousSibling;
    for (var n = 0; e;) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (n === 0) return e;
          n--;
        } else a === "/$" && n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function my(e, n, a) {
    switch (((n = Hs(a)), e)) {
      case "html":
        if (((e = n.documentElement), !e)) throw Error(o(452));
        return e;
      case "head":
        if (((e = n.head), !e)) throw Error(o(453));
        return e;
      case "body":
        if (((e = n.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function qo(e) {
    for (var n = e.attributes; n.length;) e.removeAttributeNode(n[0]);
    Wa(e);
  }
  var _n = new Map(),
    gy = new Set();
  function qs(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Br = $.d;
  $.d = { f: Rx, r: Ex, D: Tx, C: Cx, L: Ax, m: wx, X: Mx, S: Ox, M: Nx };
  function Rx() {
    var e = Br.f(),
      n = _s();
    return e || n;
  }
  function Ex(e) {
    var n = hr(e);
    n !== null && n.tag === 5 && n.type === "form" ? Um(n) : Br.r(e);
  }
  var Nl = typeof document > "u" ? null : document;
  function yy(e, n, a) {
    var i = Nl;
    if (i && typeof n == "string" && n) {
      var u = Cn(n);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        gy.has(u) ||
          (gy.add(u),
          (e = { rel: e, crossOrigin: a, href: n }),
          i.querySelector(u) === null &&
            ((n = i.createElement("link")),
            Vt(n, "link", e),
            bt(n),
            i.head.appendChild(n))));
    }
  }
  function Tx(e) {
    (Br.D(e), yy("dns-prefetch", e, null));
  }
  function Cx(e, n) {
    (Br.C(e, n), yy("preconnect", e, n));
  }
  function Ax(e, n, a) {
    Br.L(e, n, a);
    var i = Nl;
    if (i && e && n) {
      var u = 'link[rel="preload"][as="' + Cn(n) + '"]';
      n === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + Cn(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (u += '[imagesizes="' + Cn(a.imageSizes) + '"]'))
        : (u += '[href="' + Cn(e) + '"]');
      var d = u;
      switch (n) {
        case "style":
          d = Bl(e);
          break;
        case "script":
          d = _l(e);
      }
      _n.has(d) ||
        ((e = g(
          {
            rel: "preload",
            href: n === "image" && a && a.imageSrcSet ? void 0 : e,
            as: n,
          },
          a,
        )),
        _n.set(d, e),
        i.querySelector(u) !== null ||
          (n === "style" && i.querySelector(Po(d))) ||
          (n === "script" && i.querySelector(Io(d))) ||
          ((n = i.createElement("link")),
          Vt(n, "link", e),
          bt(n),
          i.head.appendChild(n)));
    }
  }
  function wx(e, n) {
    Br.m(e, n);
    var a = Nl;
    if (a && e) {
      var i = n && typeof n.as == "string" ? n.as : "script",
        u =
          'link[rel="modulepreload"][as="' + Cn(i) + '"][href="' + Cn(e) + '"]',
        d = u;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = _l(e);
      }
      if (
        !_n.has(d) &&
        ((e = g({ rel: "modulepreload", href: e }, n)),
        _n.set(d, e),
        a.querySelector(u) === null)
      ) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Io(d))) return;
        }
        ((i = a.createElement("link")),
          Vt(i, "link", e),
          bt(i),
          a.head.appendChild(i));
      }
    }
  }
  function Ox(e, n, a) {
    Br.S(e, n, a);
    var i = Nl;
    if (i && e) {
      var u = mr(i).hoistableStyles,
        d = Bl(e);
      n = n || "default";
      var y = u.get(d);
      if (!y) {
        var T = { loading: 0, preload: null };
        if ((y = i.querySelector(Po(d)))) T.loading = 5;
        else {
          ((e = g({ rel: "stylesheet", href: e, "data-precedence": n }, a)),
            (a = _n.get(d)) && sd(e, a));
          var _ = (y = i.createElement("link"));
          (bt(_),
            Vt(_, "link", e),
            (_._p = new Promise(function (Y, te) {
              ((_.onload = Y), (_.onerror = te));
            })),
            _.addEventListener("load", function () {
              T.loading |= 1;
            }),
            _.addEventListener("error", function () {
              T.loading |= 2;
            }),
            (T.loading |= 4),
            Ps(y, n, i));
        }
        ((y = { type: "stylesheet", instance: y, count: 1, state: T }),
          u.set(d, y));
      }
    }
  }
  function Mx(e, n) {
    Br.X(e, n);
    var a = Nl;
    if (a && e) {
      var i = mr(a).hoistableScripts,
        u = _l(e),
        d = i.get(u);
      d ||
        ((d = a.querySelector(Io(u))),
        d ||
          ((e = g({ src: e, async: !0 }, n)),
          (n = _n.get(u)) && ud(e, n),
          (d = a.createElement("script")),
          bt(d),
          Vt(d, "link", e),
          a.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        i.set(u, d));
    }
  }
  function Nx(e, n) {
    Br.M(e, n);
    var a = Nl;
    if (a && e) {
      var i = mr(a).hoistableScripts,
        u = _l(e),
        d = i.get(u);
      d ||
        ((d = a.querySelector(Io(u))),
        d ||
          ((e = g({ src: e, async: !0, type: "module" }, n)),
          (n = _n.get(u)) && ud(e, n),
          (d = a.createElement("script")),
          bt(d),
          Vt(d, "link", e),
          a.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        i.set(u, d));
    }
  }
  function vy(e, n, a, i) {
    var u = (u = ce.current) ? qs(u) : null;
    if (!u) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((n = Bl(a.href)),
            (a = mr(u).hoistableStyles),
            (i = a.get(n)),
            i ||
              ((i = { type: "style", instance: null, count: 0, state: null }),
              a.set(n, i)),
            i)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          e = Bl(a.href);
          var d = mr(u).hoistableStyles,
            y = d.get(e);
          if (
            (y ||
              ((u = u.ownerDocument || u),
              (y = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              d.set(e, y),
              (d = u.querySelector(Po(e))) &&
                !d._p &&
                ((y.instance = d), (y.state.loading = 5)),
              _n.has(e) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                _n.set(e, a),
                d || Bx(u, e, a, y.state))),
            n && i === null)
          )
            throw Error(o(528, ""));
          return y;
        }
        if (n && i !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (n = a.async),
          (a = a.src),
          typeof a == "string" &&
          n &&
          typeof n != "function" &&
          typeof n != "symbol"
            ? ((n = _l(a)),
              (a = mr(u).hoistableScripts),
              (i = a.get(n)),
              i ||
                ((i = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(n, i)),
              i)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Bl(e) {
    return 'href="' + Cn(e) + '"';
  }
  function Po(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function by(e) {
    return g({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function Bx(e, n, a, i) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]")
      ? (i.loading = 1)
      : ((n = e.createElement("link")),
        (i.preload = n),
        n.addEventListener("load", function () {
          return (i.loading |= 1);
        }),
        n.addEventListener("error", function () {
          return (i.loading |= 2);
        }),
        Vt(n, "link", a),
        bt(n),
        e.head.appendChild(n));
  }
  function _l(e) {
    return '[src="' + Cn(e) + '"]';
  }
  function Io(e) {
    return "script[async]" + e;
  }
  function Sy(e, n, a) {
    if ((n.count++, n.instance === null))
      switch (n.type) {
        case "style":
          var i = e.querySelector('style[data-href~="' + Cn(a.href) + '"]');
          if (i) return ((n.instance = i), bt(i), i);
          var u = g({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (i = (e.ownerDocument || e).createElement("style")),
            bt(i),
            Vt(i, "style", u),
            Ps(i, a.precedence, e),
            (n.instance = i)
          );
        case "stylesheet":
          u = Bl(a.href);
          var d = e.querySelector(Po(u));
          if (d) return ((n.state.loading |= 4), (n.instance = d), bt(d), d);
          ((i = by(a)),
            (u = _n.get(u)) && sd(i, u),
            (d = (e.ownerDocument || e).createElement("link")),
            bt(d));
          var y = d;
          return (
            (y._p = new Promise(function (T, _) {
              ((y.onload = T), (y.onerror = _));
            })),
            Vt(d, "link", i),
            (n.state.loading |= 4),
            Ps(d, a.precedence, e),
            (n.instance = d)
          );
        case "script":
          return (
            (d = _l(a.src)),
            (u = e.querySelector(Io(d)))
              ? ((n.instance = u), bt(u), u)
              : ((i = a),
                (u = _n.get(d)) && ((i = g({}, a)), ud(i, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement("script")),
                bt(u),
                Vt(u, "link", i),
                e.head.appendChild(u),
                (n.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, n.type));
      }
    else
      n.type === "stylesheet" &&
        (n.state.loading & 4) === 0 &&
        ((i = n.instance), (n.state.loading |= 4), Ps(i, a.precedence, e));
    return n.instance;
  }
  function Ps(e, n, a) {
    for (
      var i = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = i.length ? i[i.length - 1] : null,
        d = u,
        y = 0;
      y < i.length;
      y++
    ) {
      var T = i[y];
      if (T.dataset.precedence === n) d = T;
      else if (d !== u) break;
    }
    d
      ? d.parentNode.insertBefore(e, d.nextSibling)
      : ((n = a.nodeType === 9 ? a.head : a), n.insertBefore(e, n.firstChild));
  }
  function sd(e, n) {
    (e.crossOrigin == null && (e.crossOrigin = n.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy),
      e.title == null && (e.title = n.title));
  }
  function ud(e, n) {
    (e.crossOrigin == null && (e.crossOrigin = n.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy),
      e.integrity == null && (e.integrity = n.integrity));
  }
  var Is = null;
  function xy(e, n, a) {
    if (Is === null) {
      var i = new Map(),
        u = (Is = new Map());
      u.set(a, i);
    } else ((u = Is), (i = u.get(a)), i || ((i = new Map()), u.set(a, i)));
    if (i.has(e)) return i;
    for (
      i.set(e, null), a = a.getElementsByTagName(e), u = 0;
      u < a.length;
      u++
    ) {
      var d = a[u];
      if (
        !(
          d[xa] ||
          d[Bt] ||
          (e === "link" && d.getAttribute("rel") === "stylesheet")
        ) &&
        d.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var y = d.getAttribute(n) || "";
        y = e + y;
        var T = i.get(y);
        T ? T.push(d) : i.set(y, [d]);
      }
    }
    return i;
  }
  function Ry(e, n, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        a,
        n === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function _x(e, n, a) {
    if (a === 1 || n.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof n.precedence != "string" ||
          typeof n.href != "string" ||
          n.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof n.rel != "string" ||
          typeof n.href != "string" ||
          n.href === "" ||
          n.onLoad ||
          n.onError
        )
          break;
        switch (n.rel) {
          case "stylesheet":
            return (
              (e = n.disabled),
              typeof n.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          n.async &&
          typeof n.async != "function" &&
          typeof n.async != "symbol" &&
          !n.onLoad &&
          !n.onError &&
          n.src &&
          typeof n.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Ey(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Fo = null;
  function Dx() {}
  function zx(e, n, a) {
    if (Fo === null) throw Error(o(475));
    var i = Fo;
    if (
      n.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var u = Bl(a.href),
          d = e.querySelector(Po(u));
        if (d) {
          ((e = d._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (i.count++, (i = Fs.bind(i)), e.then(i, i)),
            (n.state.loading |= 4),
            (n.instance = d),
            bt(d));
          return;
        }
        ((d = e.ownerDocument || e),
          (a = by(a)),
          (u = _n.get(u)) && sd(a, u),
          (d = d.createElement("link")),
          bt(d));
        var y = d;
        ((y._p = new Promise(function (T, _) {
          ((y.onload = T), (y.onerror = _));
        })),
          Vt(d, "link", a),
          (n.instance = d));
      }
      (i.stylesheets === null && (i.stylesheets = new Map()),
        i.stylesheets.set(n, e),
        (e = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (i.count++,
          (n = Fs.bind(i)),
          e.addEventListener("load", n),
          e.addEventListener("error", n)));
    }
  }
  function kx() {
    if (Fo === null) throw Error(o(475));
    var e = Fo;
    return (
      e.stylesheets && e.count === 0 && cd(e, e.stylesheets),
      0 < e.count
        ? function (n) {
            var a = setTimeout(function () {
              if ((e.stylesheets && cd(e, e.stylesheets), e.unsuspend)) {
                var i = e.unsuspend;
                ((e.unsuspend = null), i());
              }
            }, 6e4);
            return (
              (e.unsuspend = n),
              function () {
                ((e.unsuspend = null), clearTimeout(a));
              }
            );
          }
        : null
    );
  }
  function Fs() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) cd(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Ys = null;
  function cd(e, n) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Ys = new Map()),
        n.forEach(Ux, e),
        (Ys = null),
        Fs.call(e)));
  }
  function Ux(e, n) {
    if (!(n.state.loading & 4)) {
      var a = Ys.get(e);
      if (a) var i = a.get(null);
      else {
        ((a = new Map()), Ys.set(e, a));
        for (
          var u = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            d = 0;
          d < u.length;
          d++
        ) {
          var y = u[d];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
            (a.set(y.dataset.precedence, y), (i = y));
        }
        i && a.set(null, i);
      }
      ((u = n.instance),
        (y = u.getAttribute("data-precedence")),
        (d = a.get(y) || i),
        d === i && a.set(null, u),
        a.set(y, u),
        this.count++,
        (i = Fs.bind(this)),
        u.addEventListener("load", i),
        u.addEventListener("error", i),
        d
          ? d.parentNode.insertBefore(u, d.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (n.state.loading |= 4));
    }
  }
  var Yo = {
    $$typeof: w,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0,
  };
  function Lx(e, n, a, i, u, d, y, T) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = eo(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = eo(0)),
      (this.hiddenUpdates = eo(null)),
      (this.identifierPrefix = i),
      (this.onUncaughtError = u),
      (this.onCaughtError = d),
      (this.onRecoverableError = y),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = T),
      (this.incompleteTransitions = new Map()));
  }
  function Ty(e, n, a, i, u, d, y, T, _, Y, te, ae) {
    return (
      (e = new Lx(e, n, a, y, T, _, Y, ae)),
      (n = 1),
      d === !0 && (n |= 24),
      (d = hn(3, null, null, n)),
      (e.current = d),
      (d.stateNode = e),
      (n = Fc()),
      n.refCount++,
      (e.pooledCache = n),
      n.refCount++,
      (d.memoizedState = { element: i, isDehydrated: a, cache: n }),
      Kc(d),
      e
    );
  }
  function Cy(e) {
    return e ? ((e = ul), e) : ul;
  }
  function Ay(e, n, a, i, u, d) {
    ((u = Cy(u)),
      i.context === null ? (i.context = u) : (i.pendingContext = u),
      (i = Kr(n)),
      (i.payload = { element: a }),
      (d = d === void 0 ? null : d),
      d !== null && (i.callback = d),
      (a = Xr(e, i, n)),
      a !== null && (bn(a, e, n), xo(a, e, n)));
  }
  function wy(e, n) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < n ? a : n;
    }
  }
  function fd(e, n) {
    (wy(e, n), (e = e.alternate) && wy(e, n));
  }
  function Oy(e) {
    if (e.tag === 13) {
      var n = sl(e, 67108864);
      (n !== null && bn(n, e, 67108864), fd(e, 67108864));
    }
  }
  var Vs = !0;
  function jx(e, n, a, i) {
    var u = M.T;
    M.T = null;
    var d = $.p;
    try {
      (($.p = 2), dd(e, n, a, i));
    } finally {
      (($.p = d), (M.T = u));
    }
  }
  function $x(e, n, a, i) {
    var u = M.T;
    M.T = null;
    var d = $.p;
    try {
      (($.p = 8), dd(e, n, a, i));
    } finally {
      (($.p = d), (M.T = u));
    }
  }
  function dd(e, n, a, i) {
    if (Vs) {
      var u = pd(i);
      if (u === null) (Jf(e, n, i, Gs, a), Ny(e, i));
      else if (qx(u, e, n, a, i)) i.stopPropagation();
      else if ((Ny(e, i), n & 4 && -1 < Hx.indexOf(e))) {
        for (; u !== null;) {
          var d = hr(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
                  var y = fr(d.pendingLanes);
                  if (y !== 0) {
                    var T = d;
                    for (T.pendingLanes |= 2, T.entangledLanes |= 2; y;) {
                      var _ = 1 << (31 - vt(y));
                      ((T.entanglements[1] |= _), (y &= ~_));
                    }
                    (Wn(d), (Xe & 6) === 0 && ((Ns = ke() + 500), jo(0)));
                  }
                }
                break;
              case 13:
                ((T = sl(d, 2)), T !== null && bn(T, d, 2), _s(), fd(d, 2));
            }
          if (((d = pd(i)), d === null && Jf(e, n, i, Gs, a), d === u)) break;
          u = d;
        }
        u !== null && i.stopPropagation();
      } else Jf(e, n, i, null, a);
    }
  }
  function pd(e) {
    return ((e = yc(e)), hd(e));
  }
  var Gs = null;
  function hd(e) {
    if (((Gs = null), (e = Pr(e)), e !== null)) {
      var n = c(e);
      if (n === null) e = null;
      else {
        var a = n.tag;
        if (a === 13) {
          if (((e = f(n)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return ((Gs = e), null);
  }
  function My(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (an()) {
          case ut:
            return 2;
          case Ln:
            return 8;
          case En:
          case ur:
            return 32;
          case qt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var md = !1,
    sa = null,
    ua = null,
    ca = null,
    Vo = new Map(),
    Go = new Map(),
    fa = [],
    Hx =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Ny(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        sa = null;
        break;
      case "dragenter":
      case "dragleave":
        ua = null;
        break;
      case "mouseover":
      case "mouseout":
        ca = null;
        break;
      case "pointerover":
      case "pointerout":
        Vo.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Go.delete(n.pointerId);
    }
  }
  function Ko(e, n, a, i, u, d) {
    return e === null || e.nativeEvent !== d
      ? ((e = {
          blockedOn: n,
          domEventName: a,
          eventSystemFlags: i,
          nativeEvent: d,
          targetContainers: [u],
        }),
        n !== null && ((n = hr(n)), n !== null && Oy(n)),
        e)
      : ((e.eventSystemFlags |= i),
        (n = e.targetContainers),
        u !== null && n.indexOf(u) === -1 && n.push(u),
        e);
  }
  function qx(e, n, a, i, u) {
    switch (n) {
      case "focusin":
        return ((sa = Ko(sa, e, n, a, i, u)), !0);
      case "dragenter":
        return ((ua = Ko(ua, e, n, a, i, u)), !0);
      case "mouseover":
        return ((ca = Ko(ca, e, n, a, i, u)), !0);
      case "pointerover":
        var d = u.pointerId;
        return (Vo.set(d, Ko(Vo.get(d) || null, e, n, a, i, u)), !0);
      case "gotpointercapture":
        return (
          (d = u.pointerId),
          Go.set(d, Ko(Go.get(d) || null, e, n, a, i, u)),
          !0
        );
    }
    return !1;
  }
  function By(e) {
    var n = Pr(e.target);
    if (n !== null) {
      var a = c(n);
      if (a !== null) {
        if (((n = a.tag), n === 13)) {
          if (((n = f(a)), n !== null)) {
            ((e.blockedOn = n),
              Za(e.priority, function () {
                if (a.tag === 13) {
                  var i = vn();
                  i = Qa(i);
                  var u = sl(a, i);
                  (u !== null && bn(u, a, i), fd(a, i));
                }
              }));
            return;
          }
        } else if (n === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ks(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length;) {
      var a = pd(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var i = new a.constructor(a.type, a);
        ((gc = i), a.target.dispatchEvent(i), (gc = null));
      } else return ((n = hr(a)), n !== null && Oy(n), (e.blockedOn = a), !1);
      n.shift();
    }
    return !0;
  }
  function _y(e, n, a) {
    Ks(e) && a.delete(n);
  }
  function Px() {
    ((md = !1),
      sa !== null && Ks(sa) && (sa = null),
      ua !== null && Ks(ua) && (ua = null),
      ca !== null && Ks(ca) && (ca = null),
      Vo.forEach(_y),
      Go.forEach(_y));
  }
  function Xs(e, n) {
    e.blockedOn === n &&
      ((e.blockedOn = null),
      md ||
        ((md = !0),
        t.unstable_scheduleCallback(t.unstable_NormalPriority, Px)));
  }
  var Qs = null;
  function Dy(e) {
    Qs !== e &&
      ((Qs = e),
      t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
        Qs === e && (Qs = null);
        for (var n = 0; n < e.length; n += 3) {
          var a = e[n],
            i = e[n + 1],
            u = e[n + 2];
          if (typeof i != "function") {
            if (hd(i || a) === null) continue;
            break;
          }
          var d = hr(a);
          d !== null &&
            (e.splice(n, 3),
            (n -= 3),
            hf(d, { pending: !0, data: u, method: a.method, action: i }, i, u));
        }
      }));
  }
  function Xo(e) {
    function n(_) {
      return Xs(_, e);
    }
    (sa !== null && Xs(sa, e),
      ua !== null && Xs(ua, e),
      ca !== null && Xs(ca, e),
      Vo.forEach(n),
      Go.forEach(n));
    for (var a = 0; a < fa.length; a++) {
      var i = fa[a];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < fa.length && ((a = fa[0]), a.blockedOn === null);)
      (By(a), a.blockedOn === null && fa.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (i = 0; i < a.length; i += 3) {
        var u = a[i],
          d = a[i + 1],
          y = u[Ut] || null;
        if (typeof d == "function") y || Dy(a);
        else if (y) {
          var T = null;
          if (d && d.hasAttribute("formAction")) {
            if (((u = d), (y = d[Ut] || null))) T = y.formAction;
            else if (hd(u) !== null) continue;
          } else T = y.action;
          (typeof T == "function" ? (a[i + 1] = T) : (a.splice(i, 3), (i -= 3)),
            Dy(a));
        }
      }
  }
  function gd(e) {
    this._internalRoot = e;
  }
  ((Zs.prototype.render = gd.prototype.render =
    function (e) {
      var n = this._internalRoot;
      if (n === null) throw Error(o(409));
      var a = n.current,
        i = vn();
      Ay(a, i, e, n, null, null);
    }),
    (Zs.prototype.unmount = gd.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var n = e.containerInfo;
          (Ay(e.current, 2, null, e, null, null), _s(), (n[qr] = null));
        }
      }));
  function Zs(e) {
    this._internalRoot = e;
  }
  Zs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var n = Sa();
      e = { blockedOn: null, target: e, priority: n };
      for (var a = 0; a < fa.length && n !== 0 && n < fa[a].priority; a++);
      (fa.splice(a, 0, e), a === 0 && By(e));
    }
  };
  var zy = r.version;
  if (zy !== "19.1.1") throw Error(o(527, zy, "19.1.1"));
  $.findDOMNode = function (e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function"
        ? Error(o(188))
        : ((e = Object.keys(e).join(",")), Error(o(268, e)));
    return (
      (e = m(n)),
      (e = e !== null ? h(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var Ix = {
    bundleType: 0,
    version: "19.1.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.1.1",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ws = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ws.isDisabled && Ws.supportsFiber)
      try {
        ((Nt = Ws.inject(Ix)), (Ue = Ws));
      } catch {}
  }
  return (
    (Wo.createRoot = function (e, n) {
      if (!s(e)) throw Error(o(299));
      var a = !1,
        i = "",
        u = Qm,
        d = Zm,
        y = Wm,
        T = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (a = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (u = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (y = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 &&
            (T = n.unstable_transitionCallbacks)),
        (n = Ty(e, 1, !1, null, null, a, i, u, d, y, T, null)),
        (e[qr] = n.current),
        Wf(e),
        new gd(n)
      );
    }),
    (Wo.hydrateRoot = function (e, n, a) {
      if (!s(e)) throw Error(o(299));
      var i = !1,
        u = "",
        d = Qm,
        y = Zm,
        T = Wm,
        _ = null,
        Y = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (i = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (d = a.onUncaughtError),
          a.onCaughtError !== void 0 && (y = a.onCaughtError),
          a.onRecoverableError !== void 0 && (T = a.onRecoverableError),
          a.unstable_transitionCallbacks !== void 0 &&
            (_ = a.unstable_transitionCallbacks),
          a.formState !== void 0 && (Y = a.formState)),
        (n = Ty(e, 1, !0, n, a ?? null, i, u, d, y, T, _, Y)),
        (n.context = Cy(null)),
        (a = n.current),
        (i = vn()),
        (i = Qa(i)),
        (u = Kr(i)),
        (u.callback = null),
        Xr(a, u, i),
        (a = i),
        (n.current.lanes = a),
        ba(n, a),
        Wn(n),
        (e[qr] = n.current),
        Wf(e),
        new Zs(n)
      );
    }),
    (Wo.version = "19.1.1"),
    Wo
  );
}
var Fy;
function tR() {
  if (Fy) return vd.exports;
  Fy = 1;
  function t() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (r) {
        console.error(r);
      }
  }
  return (t(), (vd.exports = eR()), vd.exports);
}
var nR = tR();
const rR = Nv(nR);
var b = hp();
const _v = Nv(b),
  Su = Gx({ __proto__: null, default: _v }, [b]);
/**
 * react-router v7.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var mp = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  Dv = /^[\\/]{2}/;
function aR(t, r) {
  return r + t.replace(/\\/g, "/");
}
var Yy = "popstate";
function Vy(t) {
  return (
    typeof t == "object" &&
    t != null &&
    "pathname" in t &&
    "search" in t &&
    "hash" in t &&
    "state" in t &&
    "key" in t
  );
}
function lR(t = {}) {
  function r(o, s) {
    var h;
    let c = (h = s.state) == null ? void 0 : h.masked,
      { pathname: f, search: p, hash: m } = c || o.location;
    return Pd(
      "",
      { pathname: f, search: p, hash: m },
      (s.state && s.state.usr) || null,
      (s.state && s.state.key) || "default",
      c
        ? {
            pathname: o.location.pathname,
            search: o.location.search,
            hash: o.location.hash,
          }
        : void 0,
    );
  }
  function l(o, s) {
    return typeof s == "string" ? s : mi(s);
  }
  return iR(r, l, null, t);
}
function pt(t, r) {
  if (t === !1 || t === null || typeof t > "u") throw new Error(r);
}
function or(t, r) {
  if (!t) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function oR() {
  return Math.random().toString(36).substring(2, 10);
}
function Gy(t, r) {
  return {
    usr: t.state,
    key: t.key,
    idx: r,
    masked: t.mask
      ? { pathname: t.pathname, search: t.search, hash: t.hash }
      : void 0,
  };
}
function Pd(t, r, l = null, o, s) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...(typeof r == "string" ? Vl(r) : r),
    state: l,
    key: (r && r.key) || o || oR(),
    mask: s,
  };
}
function mi({ pathname: t = "/", search: r = "", hash: l = "" }) {
  return (
    r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r),
    l && l !== "#" && (t += l.charAt(0) === "#" ? l : "#" + l),
    t
  );
}
function Vl(t) {
  let r = {};
  if (t) {
    let l = t.indexOf("#");
    l >= 0 && ((r.hash = t.substring(l)), (t = t.substring(0, l)));
    let o = t.indexOf("?");
    (o >= 0 && ((r.search = t.substring(o)), (t = t.substring(0, o))),
      t && (r.pathname = t));
  }
  return r;
}
function iR(t, r, l, o = {}) {
  let { window: s = document.defaultView, v5Compat: c = !1 } = o,
    f = s.history,
    p = "POP",
    m = null,
    h = g();
  h == null && ((h = 0), f.replaceState({ ...f.state, idx: h }, ""));
  function g() {
    return (f.state || { idx: null }).idx;
  }
  function v() {
    p = "POP";
    let C = g(),
      B = C == null ? null : C - h;
    ((h = C), m && m({ action: p, location: E.location, delta: B }));
  }
  function A(C, B) {
    p = "PUSH";
    let D = Vy(C) ? C : Pd(E.location, C, B);
    h = g() + 1;
    let w = Gy(D, h),
      k = E.createHref(D.mask || D);
    try {
      f.pushState(w, "", k);
    } catch (O) {
      if (O instanceof DOMException && O.name === "DataCloneError") throw O;
      s.location.assign(k);
    }
    c && m && m({ action: p, location: E.location, delta: 1 });
  }
  function x(C, B) {
    p = "REPLACE";
    let D = Vy(C) ? C : Pd(E.location, C, B);
    h = g();
    let w = Gy(D, h),
      k = E.createHref(D.mask || D);
    (f.replaceState(w, "", k),
      c && m && m({ action: p, location: E.location, delta: 0 }));
  }
  function S(C) {
    return sR(s, C);
  }
  let E = {
    get action() {
      return p;
    },
    get location() {
      return t(s, f);
    },
    listen(C) {
      if (m) throw new Error("A history only accepts one active listener");
      return (
        s.addEventListener(Yy, v),
        (m = C),
        () => {
          (s.removeEventListener(Yy, v), (m = null));
        }
      );
    },
    createHref(C) {
      return r(s, C);
    },
    createURL: S,
    encodeLocation(C) {
      let B = S(C);
      return { pathname: B.pathname, search: B.search, hash: B.hash };
    },
    push: A,
    replace: x,
    go(C) {
      return f.go(C);
    },
  };
  return E;
}
function sR(t, r, l = !1) {
  let o = "http://localhost";
  (t &&
    (o = t.location.origin !== "null" ? t.location.origin : t.location.href),
    pt(o, "No window.location.(origin|href) available to create URL"));
  let s = typeof r == "string" ? r : mi(r);
  return (
    (s = s.replace(/ $/, "%20")),
    !l && Dv.test(s) && (s = o + s),
    new URL(s, o)
  );
}
function zv(t, r, l = "/") {
  return uR(t, r, l, !1);
}
function uR(t, r, l, o, s) {
  let c = typeof r == "string" ? Vl(r) : r,
    f = Ur(c.pathname || "/", l);
  if (f == null) return null;
  let p = cR(t),
    m = null,
    h = $v(f);
  for (let g = 0; m == null && g < p.length; ++g) m = SR(p[g], h, o);
  return m;
}
function cR(t) {
  let r = kv(t);
  return (fR(r), r);
}
function kv(t, r = [], l = [], o = "", s = !1) {
  let c = (f, p, m = s, h) => {
    let g = {
      relativePath: h === void 0 ? f.path || "" : h,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: p,
      route: f,
    };
    if (g.relativePath.startsWith("/")) {
      if (!g.relativePath.startsWith(o) && m) return;
      (pt(
        g.relativePath.startsWith(o),
        `Absolute route path "${g.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (g.relativePath = g.relativePath.slice(o.length)));
    }
    let v = Pn([o, g.relativePath]),
      A = l.concat(g);
    (f.children &&
      f.children.length > 0 &&
      (pt(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${v}".`,
      ),
      kv(f.children, r, A, v, m)),
      !(f.path == null && !f.index) &&
        r.push({
          path: v,
          score: vR(v, f.index),
          routesMeta: A.map((x, S) => {
            let [E, C] = jv(
              x.relativePath,
              x.caseSensitive,
              S === A.length - 1,
            );
            return { ...x, matcher: E, compiledParams: C };
          }),
        }));
  };
  return (
    t.forEach((f, p) => {
      var m;
      if (f.path === "" || !((m = f.path) != null && m.includes("?"))) c(f, p);
      else for (let h of Uv(f.path)) c(f, p, !0, h);
    }),
    r
  );
}
function Uv(t) {
  let r = t.split("/");
  if (r.length === 0) return [];
  let [l, ...o] = r,
    s = l.endsWith("?"),
    c = l.replace(/\?$/, "");
  if (o.length === 0) return s ? [c, ""] : [c];
  let f = Uv(o.join("/")),
    p = [];
  return (
    p.push(...f.map((m) => (m === "" ? c : [c, m].join("/")))),
    s && p.push(...f),
    p.map((m) => (t.startsWith("/") && m === "" ? "/" : m))
  );
}
function fR(t) {
  t.sort((r, l) =>
    r.score !== l.score
      ? l.score - r.score
      : bR(
          r.routesMeta.map((o) => o.childrenIndex),
          l.routesMeta.map((o) => o.childrenIndex),
        ),
  );
}
var dR = /^:[\w-]+$/,
  pR = 3,
  hR = 2,
  mR = 1,
  gR = 10,
  yR = -2,
  Ky = (t) => t === "*";
function vR(t, r) {
  let l = t.split("/"),
    o = l.length;
  return (
    l.some(Ky) && (o += yR),
    r && (o += hR),
    l
      .filter((s) => !Ky(s))
      .reduce((s, c) => s + (dR.test(c) ? pR : c === "" ? mR : gR), o)
  );
}
function bR(t, r) {
  return t.length === r.length && t.slice(0, -1).every((o, s) => o === r[s])
    ? t[t.length - 1] - r[r.length - 1]
    : 0;
}
function SR(t, r, l = !1) {
  let { routesMeta: o } = t,
    s = {},
    c = "/",
    f = [];
  for (let p = 0; p < o.length; ++p) {
    let m = o[p],
      h = p === o.length - 1,
      g = c === "/" ? r : r.slice(c.length) || "/",
      v = { path: m.relativePath, caseSensitive: m.caseSensitive, end: h },
      A =
        m.matcher && m.compiledParams
          ? Lv(v, g, m.matcher, m.compiledParams)
          : gi(v, g),
      x = m.route;
    if (
      (!A &&
        h &&
        l &&
        !o[o.length - 1].route.index &&
        (A = gi(
          { path: m.relativePath, caseSensitive: m.caseSensitive, end: !1 },
          g,
        )),
      !A)
    )
      return null;
    (Object.assign(s, A.params),
      f.push({
        params: s,
        pathname: Pn([c, A.pathname]),
        pathnameBase: ER(Pn([c, A.pathnameBase])),
        route: x,
      }),
      A.pathnameBase !== "/" && (c = Pn([c, A.pathnameBase])));
  }
  return f;
}
function gi(t, r) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [l, o] = jv(t.path, t.caseSensitive, t.end);
  return Lv(t, r, l, o);
}
function Lv(t, r, l, o) {
  let s = r.match(l);
  if (!s) return null;
  let c = s[0],
    f = c.replace(/(.)\/+$/, "$1"),
    p = s.slice(1);
  return {
    params: o.reduce((h, { paramName: g, isOptional: v }, A) => {
      if (g === "*") {
        let S = p[A] || "";
        f = c.slice(0, c.length - S.length).replace(/(.)\/+$/, "$1");
      }
      const x = p[A];
      return (
        v && !x ? (h[g] = void 0) : (h[g] = (x || "").replace(/%2F/g, "/")),
        h
      );
    }, {}),
    pathname: c,
    pathnameBase: f,
    pattern: t,
  };
}
function jv(t, r = !1, l = !0) {
  or(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`,
  );
  let o = [],
    s =
      "^" +
      t
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (f, p, m, h, g) => {
          if ((o.push({ paramName: p, isOptional: m != null }), m)) {
            let v = g.charAt(h + f.length);
            return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    t.endsWith("*")
      ? (o.push({ paramName: "*" }),
        (s += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : l
        ? (s += "\\/*$")
        : t !== "" && t !== "/" && (s += "(?:(?=\\/|$))"),
    [new RegExp(s, r ? void 0 : "i"), o]
  );
}
function $v(t) {
  try {
    return t
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      or(
        !1,
        `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`,
      ),
      t
    );
  }
}
function Ur(t, r) {
  if (r === "/") return t;
  if (!t.toLowerCase().startsWith(r.toLowerCase())) return null;
  let l = r.endsWith("/") ? r.length - 1 : r.length,
    o = t.charAt(l);
  return o && o !== "/" ? null : t.slice(l) || "/";
}
function xR(t, r = "/") {
  let {
      pathname: l,
      search: o = "",
      hash: s = "",
    } = typeof t == "string" ? Vl(t) : t,
    c;
  return (
    l
      ? ((l = qv(l)),
        l.startsWith("/") ? (c = Xy(l.substring(1), "/")) : (c = Xy(l, r)))
      : (c = r),
    { pathname: c, search: TR(o), hash: CR(s) }
  );
}
function Xy(t, r) {
  let l = xu(r).split("/");
  return (
    t.split("/").forEach((s) => {
      s === ".." ? l.length > 1 && l.pop() : s !== "." && l.push(s);
    }),
    l.length > 1 ? l.join("/") : "/"
  );
}
function Ed(t, r, l, o) {
  return `Cannot include a '${t}' character in a manually specified \`to.${r}\` field [${JSON.stringify(o)}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function RR(t) {
  return t.filter(
    (r, l) => l === 0 || (r.route.path && r.route.path.length > 0),
  );
}
function Hv(t) {
  let r = RR(t);
  return r.map((l, o) => (o === r.length - 1 ? l.pathname : l.pathnameBase));
}
function gp(t, r, l, o = !1) {
  let s;
  typeof t == "string"
    ? (s = Vl(t))
    : ((s = { ...t }),
      pt(
        !s.pathname || !s.pathname.includes("?"),
        Ed("?", "pathname", "search", s),
      ),
      pt(
        !s.pathname || !s.pathname.includes("#"),
        Ed("#", "pathname", "hash", s),
      ),
      pt(!s.search || !s.search.includes("#"), Ed("#", "search", "hash", s)));
  let c = t === "" || s.pathname === "",
    f = c ? "/" : s.pathname,
    p;
  if (f == null) p = l;
  else {
    let v = r.length - 1;
    if (!o && f.startsWith("..")) {
      let A = f.split("/");
      for (; A[0] === "..";) (A.shift(), (v -= 1));
      s.pathname = A.join("/");
    }
    p = v >= 0 ? r[v] : "/";
  }
  let m = xR(s, p),
    h = f && f !== "/" && f.endsWith("/"),
    g = (c || f === ".") && l.endsWith("/");
  return (!m.pathname.endsWith("/") && (h || g) && (m.pathname += "/"), m);
}
var qv = (t) => t.replace(/[\\/]{2,}/g, "/"),
  Pn = (t) => qv(t.join("/")),
  xu = (t) => t.replace(/\/+$/, ""),
  ER = (t) => xu(t).replace(/^\/*/, "/"),
  TR = (t) => (!t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t),
  CR = (t) => (!t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t),
  AR = class {
    constructor(t, r, l, o = !1) {
      ((this.status = t),
        (this.statusText = r || ""),
        (this.internal = o),
        l instanceof Error
          ? ((this.data = l.toString()), (this.error = l))
          : (this.data = l));
    }
  };
function wR(t) {
  return (
    t != null &&
    typeof t.status == "number" &&
    typeof t.statusText == "string" &&
    typeof t.internal == "boolean" &&
    "data" in t
  );
}
function OR(t) {
  let r = t.map((l) => l.route.path).filter(Boolean);
  return Pn(r) || "/";
}
var Pv =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Iv(t, r) {
  let l = t;
  if (typeof l != "string" || !mp.test(l))
    return { absoluteURL: void 0, isExternal: !1, to: l };
  let o = l,
    s = !1;
  if (Pv)
    try {
      let c = new URL(window.location.href),
        f = Dv.test(l) ? new URL(aR(l, c.protocol)) : new URL(l),
        p = Ur(f.pathname, r);
      f.origin === c.origin && p != null
        ? (l = p + f.search + f.hash)
        : (s = !0);
    } catch {
      or(
        !1,
        `<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: o, isExternal: s, to: l };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Fv = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Fv);
var MR = ["GET", ...Fv];
new Set(MR);
var NR = [
  "about:",
  "blob:",
  "chrome:",
  "chrome-untrusted:",
  "content:",
  "data:",
  "devtools:",
  "file:",
  "filesystem:",
  "javascript:",
];
function BR(t) {
  try {
    return NR.includes(new URL(t).protocol);
  } catch {
    return !1;
  }
}
var Gl = b.createContext(null);
Gl.displayName = "DataRouter";
var _u = b.createContext(null);
_u.displayName = "DataRouterState";
var Yv = b.createContext(!1);
function _R() {
  return b.useContext(Yv);
}
var Vv = b.createContext({ isTransitioning: !1 });
Vv.displayName = "ViewTransition";
var DR = b.createContext(new Map());
DR.displayName = "Fetchers";
var zR = b.createContext(null);
zR.displayName = "Await";
var kn = b.createContext(null);
kn.displayName = "Navigation";
var wi = b.createContext(null);
wi.displayName = "Location";
var ir = b.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ir.displayName = "Route";
var yp = b.createContext(null);
yp.displayName = "RouteError";
var Gv = "REACT_ROUTER_ERROR",
  kR = "REDIRECT",
  UR = "ROUTE_ERROR_RESPONSE";
function LR(t) {
  if (t.startsWith(`${Gv}:${kR}:{`))
    try {
      let r = JSON.parse(t.slice(28));
      if (
        typeof r == "object" &&
        r &&
        typeof r.status == "number" &&
        typeof r.statusText == "string" &&
        typeof r.location == "string" &&
        typeof r.reloadDocument == "boolean" &&
        typeof r.replace == "boolean"
      )
        return r;
    } catch {}
}
function jR(t) {
  if (t.startsWith(`${Gv}:${UR}:{`))
    try {
      let r = JSON.parse(t.slice(40));
      if (
        typeof r == "object" &&
        r &&
        typeof r.status == "number" &&
        typeof r.statusText == "string"
      )
        return new AR(r.status, r.statusText, r.data);
    } catch {}
}
function $R(t, { relative: r } = {}) {
  pt(
    Kl(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: l, navigator: o } = b.useContext(kn),
    { hash: s, pathname: c, search: f } = Oi(t, { relative: r }),
    p = c;
  return (
    l !== "/" && (p = c === "/" ? l : Pn([l, c])),
    o.createHref({ pathname: p, search: f, hash: s })
  );
}
function Kl() {
  return b.useContext(wi) != null;
}
function sr() {
  return (
    pt(
      Kl(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    b.useContext(wi).location
  );
}
function HR(t) {
  pt(
    Kl(),
    "useMatch() may be used only in the context of a <Router> component.",
  );
  let { pathname: r } = sr();
  return b.useMemo(() => gi(t, $v(r)), [r, t]);
}
var Kv =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Xv(t) {
  b.useContext(kn).static || b.useLayoutEffect(t);
}
function vp() {
  let { isDataRoute: t } = b.useContext(ir);
  return t ? eE() : qR();
}
function qR() {
  pt(
    Kl(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let t = b.useContext(Gl),
    { basename: r, navigator: l } = b.useContext(kn),
    { matches: o } = b.useContext(ir),
    { pathname: s } = sr(),
    c = JSON.stringify(Hv(o)),
    f = b.useRef(!1);
  return (
    Xv(() => {
      f.current = !0;
    }),
    b.useCallback(
      (m, h = {}) => {
        if ((or(f.current, Kv), !f.current)) return;
        if (typeof m == "number") {
          l.go(m);
          return;
        }
        let g = gp(m, JSON.parse(c), s, h.relative === "path");
        (t == null &&
          r !== "/" &&
          (g.pathname = g.pathname === "/" ? r : Pn([r, g.pathname])),
          (h.replace ? l.replace : l.push)(g, h.state, h));
      },
      [r, l, c, s, t],
    )
  );
}
b.createContext(null);
function PR() {
  let { matches: t } = b.useContext(ir),
    r = t[t.length - 1];
  return (r == null ? void 0 : r.params) ?? {};
}
function Oi(t, { relative: r } = {}) {
  let { matches: l } = b.useContext(ir),
    { pathname: o } = sr(),
    s = JSON.stringify(Hv(l));
  return b.useMemo(() => gp(t, JSON.parse(s), o, r === "path"), [t, s, o, r]);
}
function IR(t, r) {
  return Qv(t, r);
}
function Qv(t, r, l) {
  var C;
  pt(
    Kl(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: o } = b.useContext(kn),
    { matches: s } = b.useContext(ir),
    c = s[s.length - 1],
    f = c ? c.params : {},
    p = c ? c.pathname : "/",
    m = c ? c.pathnameBase : "/",
    h = c && c.route;
  {
    let B = (h && h.path) || "";
    Wv(
      p,
      !h || B.endsWith("*") || B.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${B}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${B}"> to <Route path="${B === "/" ? "*" : `${B}/*`}">.`,
    );
  }
  let g = sr(),
    v;
  if (r) {
    let B = typeof r == "string" ? Vl(r) : r;
    (pt(
      m === "/" || ((C = B.pathname) == null ? void 0 : C.startsWith(m)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${B.pathname}" was given in the \`location\` prop.`,
    ),
      (v = B));
  } else v = g;
  let A = v.pathname || "/",
    x = A;
  if (m !== "/") {
    let B = m.replace(/^\//, "").split("/");
    x = "/" + A.replace(/^\//, "").split("/").slice(B.length).join("/");
  }
  let S =
    l && l.state.matches.length
      ? l.state.matches.map((B) =>
          Object.assign(B, { route: l.manifest[B.route.id] || B.route }),
        )
      : zv(t, { pathname: x });
  (or(
    h || S != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `,
  ),
    or(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let E = KR(
    S &&
      S.map((B) =>
        Object.assign({}, B, {
          params: Object.assign({}, f, B.params),
          pathname: Pn([
            m,
            o.encodeLocation
              ? o.encodeLocation(
                  B.pathname
                    .replace(/%/g, "%25")
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23"),
                ).pathname
              : B.pathname,
          ]),
          pathnameBase:
            B.pathnameBase === "/"
              ? m
              : Pn([
                  m,
                  o.encodeLocation
                    ? o.encodeLocation(
                        B.pathnameBase
                          .replace(/%/g, "%25")
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : B.pathnameBase,
                ]),
        }),
      ),
    s,
    l,
  );
  return r && E
    ? b.createElement(
        wi.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              mask: void 0,
              ...v,
            },
            navigationType: "POP",
          },
        },
        E,
      )
    : E;
}
function FR() {
  let t = JR(),
    r = wR(t)
      ? `${t.status} ${t.statusText}`
      : t instanceof Error
        ? t.message
        : JSON.stringify(t),
    l = t instanceof Error ? t.stack : null,
    o = "rgba(200,200,200, 0.5)",
    s = { padding: "0.5rem", backgroundColor: o },
    c = { padding: "2px 4px", backgroundColor: o },
    f = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", t),
    (f = b.createElement(
      b.Fragment,
      null,
      b.createElement("p", null, "💿 Hey developer 👋"),
      b.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        b.createElement("code", { style: c }, "ErrorBoundary"),
        " or",
        " ",
        b.createElement("code", { style: c }, "errorElement"),
        " prop on your route.",
      ),
    )),
    b.createElement(
      b.Fragment,
      null,
      b.createElement("h2", null, "Unexpected Application Error!"),
      b.createElement("h3", { style: { fontStyle: "italic" } }, r),
      l ? b.createElement("pre", { style: s }, l) : null,
      f,
    )
  );
}
var YR = b.createElement(FR, null),
  Zv = class extends b.Component {
    constructor(t) {
      (super(t),
        (this.state = {
          location: t.location,
          revalidation: t.revalidation,
          error: t.error,
        }));
    }
    static getDerivedStateFromError(t) {
      return { error: t };
    }
    static getDerivedStateFromProps(t, r) {
      return r.location !== t.location ||
        (r.revalidation !== "idle" && t.revalidation === "idle")
        ? { error: t.error, location: t.location, revalidation: t.revalidation }
        : {
            error: t.error !== void 0 ? t.error : r.error,
            location: r.location,
            revalidation: t.revalidation || r.revalidation,
          };
    }
    componentDidCatch(t, r) {
      this.props.onError
        ? this.props.onError(t, r)
        : console.error(
            "React Router caught the following error during render",
            t,
          );
    }
    render() {
      let t = this.state.error;
      if (
        this.context &&
        typeof t == "object" &&
        t &&
        "digest" in t &&
        typeof t.digest == "string"
      ) {
        const l = jR(t.digest);
        l && (t = l);
      }
      let r =
        t !== void 0
          ? b.createElement(
              ir.Provider,
              { value: this.props.routeContext },
              b.createElement(yp.Provider, {
                value: t,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? b.createElement(VR, { error: t }, r) : r;
    }
  };
Zv.contextType = Yv;
var Td = new WeakMap();
function VR({ children: t, error: r }) {
  let { basename: l } = b.useContext(kn);
  if (
    typeof r == "object" &&
    r &&
    "digest" in r &&
    typeof r.digest == "string"
  ) {
    let o = LR(r.digest);
    if (o) {
      let s = Td.get(r);
      if (s) throw s;
      let c = Iv(o.location, l),
        f = c.absoluteURL || c.to;
      if (BR(f)) throw new Error("Invalid redirect location");
      if (Pv && !Td.get(r))
        if (c.isExternal || o.reloadDocument) window.location.href = f;
        else {
          const p = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(c.to, {
              replace: o.replace,
            }),
          );
          throw (Td.set(r, p), p);
        }
      return b.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${f}`,
      });
    }
  }
  return t;
}
function GR({ routeContext: t, match: r, children: l }) {
  let o = b.useContext(Gl);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = r.route.id),
    b.createElement(ir.Provider, { value: t }, l)
  );
}
function KR(t, r = [], l) {
  let o = l == null ? void 0 : l.state;
  if (t == null) {
    if (!o) return null;
    if (o.errors) t = o.matches;
    else if (r.length === 0 && !o.initialized && o.matches.length > 0)
      t = o.matches;
    else return null;
  }
  let s = t,
    c = o == null ? void 0 : o.errors;
  if (c != null) {
    let g = s.findIndex(
      (v) => v.route.id && (c == null ? void 0 : c[v.route.id]) !== void 0,
    );
    (pt(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`,
    ),
      (s = s.slice(0, Math.min(s.length, g + 1))));
  }
  let f = !1,
    p = -1;
  if (l && o) {
    f = o.renderFallback;
    for (let g = 0; g < s.length; g++) {
      let v = s[g];
      if (
        ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (p = g),
        v.route.id)
      ) {
        let { loaderData: A, errors: x } = o,
          S =
            v.route.loader &&
            !A.hasOwnProperty(v.route.id) &&
            (!x || x[v.route.id] === void 0);
        if (v.route.lazy || S) {
          (l.isStatic && (f = !0),
            p >= 0 ? (s = s.slice(0, p + 1)) : (s = [s[0]]));
          break;
        }
      }
    }
  }
  let m = l == null ? void 0 : l.onError,
    h =
      o && m
        ? (g, v) => {
            var A, x;
            m(g, {
              location: o.location,
              params:
                ((x = (A = o.matches) == null ? void 0 : A[0]) == null
                  ? void 0
                  : x.params) ?? {},
              pattern: OR(o.matches),
              errorInfo: v,
            });
          }
        : void 0;
  return s.reduceRight((g, v, A) => {
    let x,
      S = !1,
      E = null,
      C = null;
    o &&
      ((x = c && v.route.id ? c[v.route.id] : void 0),
      (E = v.route.errorElement || YR),
      f &&
        (p < 0 && A === 0
          ? (Wv(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (S = !0),
            (C = null))
          : p === A &&
            ((S = !0), (C = v.route.hydrateFallbackElement || null))));
    let B = r.concat(s.slice(0, A + 1)),
      D = () => {
        let w;
        return (
          x
            ? (w = E)
            : S
              ? (w = C)
              : v.route.Component
                ? (w = b.createElement(v.route.Component, null))
                : v.route.element
                  ? (w = v.route.element)
                  : (w = g),
          b.createElement(GR, {
            match: v,
            routeContext: { outlet: g, matches: B, isDataRoute: o != null },
            children: w,
          })
        );
      };
    return o && (v.route.ErrorBoundary || v.route.errorElement || A === 0)
      ? b.createElement(Zv, {
          location: o.location,
          revalidation: o.revalidation,
          component: E,
          error: x,
          children: D(),
          routeContext: { outlet: null, matches: B, isDataRoute: !0 },
          onError: h,
        })
      : D();
  }, null);
}
function bp(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function XR(t) {
  let r = b.useContext(Gl);
  return (pt(r, bp(t)), r);
}
function QR(t) {
  let r = b.useContext(_u);
  return (pt(r, bp(t)), r);
}
function ZR(t) {
  let r = b.useContext(ir);
  return (pt(r, bp(t)), r);
}
function Sp(t) {
  let r = ZR(t),
    l = r.matches[r.matches.length - 1];
  return (
    pt(
      l.route.id,
      `${t} can only be used on routes that contain a unique "id"`,
    ),
    l.route.id
  );
}
function WR() {
  return Sp("useRouteId");
}
function JR() {
  var o;
  let t = b.useContext(yp),
    r = QR("useRouteError"),
    l = Sp("useRouteError");
  return t !== void 0 ? t : (o = r.errors) == null ? void 0 : o[l];
}
function eE() {
  let { router: t } = XR("useNavigate"),
    r = Sp("useNavigate"),
    l = b.useRef(!1);
  return (
    Xv(() => {
      l.current = !0;
    }),
    b.useCallback(
      async (s, c = {}) => {
        (or(l.current, Kv),
          l.current &&
            (typeof s == "number"
              ? await t.navigate(s)
              : await t.navigate(s, { fromRouteId: r, ...c })));
      },
      [t, r],
    )
  );
}
var Qy = {};
function Wv(t, r, l) {
  !r && !Qy[t] && ((Qy[t] = !0), or(!1, l));
}
b.memo(tE);
function tE({
  routes: t,
  manifest: r,
  future: l,
  state: o,
  isStatic: s,
  onError: c,
}) {
  return Qv(t, void 0, { manifest: r, state: o, isStatic: s, onError: c });
}
function oi(t) {
  pt(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function nE({
  basename: t = "/",
  children: r = null,
  location: l,
  navigationType: o = "POP",
  navigator: s,
  static: c = !1,
  useTransitions: f,
}) {
  pt(
    !Kl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let p = t.replace(/^\/*/, "/"),
    m = b.useMemo(
      () => ({
        basename: p,
        navigator: s,
        static: c,
        useTransitions: f,
        future: {},
      }),
      [p, s, c, f],
    );
  typeof l == "string" && (l = Vl(l));
  let {
      pathname: h = "/",
      search: g = "",
      hash: v = "",
      state: A = null,
      key: x = "default",
      mask: S,
    } = l,
    E = b.useMemo(() => {
      let C = Ur(h, p);
      return C == null
        ? null
        : {
            location: {
              pathname: C,
              search: g,
              hash: v,
              state: A,
              key: x,
              mask: S,
            },
            navigationType: o,
          };
    }, [p, h, g, v, A, x, o, S]);
  return (
    or(
      E != null,
      `<Router basename="${p}"> is not able to match the URL "${h}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    E == null
      ? null
      : b.createElement(
          kn.Provider,
          { value: m },
          b.createElement(wi.Provider, { children: r, value: E }),
        )
  );
}
function rE({ children: t, location: r }) {
  return IR(Id(t), r);
}
function Id(t, r = []) {
  let l = [];
  return (
    b.Children.forEach(t, (o, s) => {
      if (!b.isValidElement(o)) return;
      let c = [...r, s];
      if (o.type === b.Fragment) {
        l.push.apply(l, Id(o.props.children, c));
        return;
      }
      (pt(
        o.type === oi,
        `[${typeof o.type == "string" ? o.type : o.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        pt(
          !o.props.index || !o.props.children,
          "An index route cannot have child routes.",
        ));
      let f = {
        id: o.props.id || c.join("-"),
        caseSensitive: o.props.caseSensitive,
        element: o.props.element,
        Component: o.props.Component,
        index: o.props.index,
        path: o.props.path,
        middleware: o.props.middleware,
        loader: o.props.loader,
        action: o.props.action,
        hydrateFallbackElement: o.props.hydrateFallbackElement,
        HydrateFallback: o.props.HydrateFallback,
        errorElement: o.props.errorElement,
        ErrorBoundary: o.props.ErrorBoundary,
        hasErrorBoundary:
          o.props.hasErrorBoundary === !0 ||
          o.props.ErrorBoundary != null ||
          o.props.errorElement != null,
        shouldRevalidate: o.props.shouldRevalidate,
        handle: o.props.handle,
        lazy: o.props.lazy,
      };
      (o.props.children && (f.children = Id(o.props.children, c)), l.push(f));
    }),
    l
  );
}
var uu = "get",
  cu = "application/x-www-form-urlencoded";
function Du(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function aE(t) {
  return Du(t) && t.tagName.toLowerCase() === "button";
}
function lE(t) {
  return Du(t) && t.tagName.toLowerCase() === "form";
}
function oE(t) {
  return Du(t) && t.tagName.toLowerCase() === "input";
}
function iE(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function sE(t, r) {
  return t.button === 0 && (!r || r === "_self") && !iE(t);
}
var Js = null;
function uE() {
  if (Js === null)
    try {
      (new FormData(document.createElement("form"), 0), (Js = !1));
    } catch {
      Js = !0;
    }
  return Js;
}
var cE = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Cd(t) {
  return t != null && !cE.has(t)
    ? (or(
        !1,
        `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${cu}"`,
      ),
      null)
    : t;
}
function fE(t, r) {
  let l, o, s, c, f;
  if (lE(t)) {
    let p = t.getAttribute("action");
    ((o = p ? Ur(p, r) : null),
      (l = t.getAttribute("method") || uu),
      (s = Cd(t.getAttribute("enctype")) || cu),
      (c = new FormData(t)));
  } else if (aE(t) || (oE(t) && (t.type === "submit" || t.type === "image"))) {
    let p = t.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let m = t.getAttribute("formaction") || p.getAttribute("action");
    if (
      ((o = m ? Ur(m, r) : null),
      (l = t.getAttribute("formmethod") || p.getAttribute("method") || uu),
      (s =
        Cd(t.getAttribute("formenctype")) ||
        Cd(p.getAttribute("enctype")) ||
        cu),
      (c = new FormData(p, t)),
      !uE())
    ) {
      let { name: h, type: g, value: v } = t;
      if (g === "image") {
        let A = h ? `${h}.` : "";
        (c.append(`${A}x`, "0"), c.append(`${A}y`, "0"));
      } else h && c.append(h, v);
    }
  } else {
    if (Du(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((l = uu), (o = null), (s = cu), (f = t));
  }
  return (
    c && s === "text/plain" && ((f = c), (c = void 0)),
    { action: o, method: l.toLowerCase(), encType: s, formData: c, body: f }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function xp(t, r) {
  if (t === !1 || t === null || typeof t > "u") throw new Error(r);
}
function Jv(t, r, l, o) {
  let s =
    typeof t == "string"
      ? new URL(
          t,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : t;
  return (
    l
      ? s.pathname.endsWith("/")
        ? (s.pathname = `${s.pathname}_.${o}`)
        : (s.pathname = `${s.pathname}.${o}`)
      : s.pathname === "/"
        ? (s.pathname = `_root.${o}`)
        : r && Ur(s.pathname, r) === "/"
          ? (s.pathname = `${xu(r)}/_root.${o}`)
          : (s.pathname = `${xu(s.pathname)}.${o}`),
    s
  );
}
async function dE(t, r) {
  if (t.id in r) return r[t.id];
  try {
    let l = await import(t.module);
    return ((r[t.id] = l), l);
  } catch (l) {
    return (
      console.error(
        `Error loading route module \`${t.module}\`, reloading page...`,
      ),
      console.error(l),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function pE(t) {
  return t == null
    ? !1
    : t.href == null
      ? t.rel === "preload" &&
        typeof t.imageSrcSet == "string" &&
        typeof t.imageSizes == "string"
      : typeof t.rel == "string" && typeof t.href == "string";
}
async function hE(t, r, l) {
  let o = await Promise.all(
    t.map(async (s) => {
      let c = r.routes[s.route.id];
      if (c) {
        let f = await dE(c, l);
        return f.links ? f.links() : [];
      }
      return [];
    }),
  );
  return vE(
    o
      .flat(1)
      .filter(pE)
      .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
      .map((s) =>
        s.rel === "stylesheet"
          ? { ...s, rel: "prefetch", as: "style" }
          : { ...s, rel: "prefetch" },
      ),
  );
}
function Zy(t, r, l, o, s, c) {
  let f = (m, h) => (l[h] ? m.route.id !== l[h].route.id : !0),
    p = (m, h) => {
      var g;
      return (
        l[h].pathname !== m.pathname ||
        (((g = l[h].route.path) == null ? void 0 : g.endsWith("*")) &&
          l[h].params["*"] !== m.params["*"])
      );
    };
  return c === "assets"
    ? r.filter((m, h) => f(m, h) || p(m, h))
    : c === "data"
      ? r.filter((m, h) => {
          var v;
          let g = o.routes[m.route.id];
          if (!g || !g.hasLoader) return !1;
          if (f(m, h) || p(m, h)) return !0;
          if (m.route.shouldRevalidate) {
            let A = m.route.shouldRevalidate({
              currentUrl: new URL(
                s.pathname + s.search + s.hash,
                window.origin,
              ),
              currentParams: ((v = l[0]) == null ? void 0 : v.params) || {},
              nextUrl: new URL(t, window.origin),
              nextParams: m.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof A == "boolean") return A;
          }
          return !0;
        })
      : [];
}
function mE(t, r, { includeHydrateFallback: l } = {}) {
  return gE(
    t
      .map((o) => {
        let s = r.routes[o.route.id];
        if (!s) return [];
        let c = [s.module];
        return (
          s.clientActionModule && (c = c.concat(s.clientActionModule)),
          s.clientLoaderModule && (c = c.concat(s.clientLoaderModule)),
          l &&
            s.hydrateFallbackModule &&
            (c = c.concat(s.hydrateFallbackModule)),
          s.imports && (c = c.concat(s.imports)),
          c
        );
      })
      .flat(1),
  );
}
function gE(t) {
  return [...new Set(t)];
}
function yE(t) {
  let r = {},
    l = Object.keys(t).sort();
  for (let o of l) r[o] = t[o];
  return r;
}
function vE(t, r) {
  let l = new Set();
  return (
    new Set(r),
    t.reduce((o, s) => {
      let c = JSON.stringify(yE(s));
      return (l.has(c) || (l.add(c), o.push({ key: c, link: s })), o);
    }, [])
  );
}
function Rp() {
  let t = b.useContext(Gl);
  return (
    xp(
      t,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    t
  );
}
function bE() {
  let t = b.useContext(_u);
  return (
    xp(
      t,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    t
  );
}
var Ep = b.createContext(void 0);
Ep.displayName = "FrameworkContext";
function zu() {
  let t = b.useContext(Ep);
  return (
    xp(t, "You must render this element inside a <HydratedRouter> element"),
    t
  );
}
function SE(t, r) {
  let l = b.useContext(Ep),
    [o, s] = b.useState(!1),
    [c, f] = b.useState(!1),
    {
      onFocus: p,
      onBlur: m,
      onMouseEnter: h,
      onMouseLeave: g,
      onTouchStart: v,
    } = r,
    A = b.useRef(null);
  (b.useEffect(() => {
    if ((t === "render" && f(!0), t === "viewport")) {
      let E = (B) => {
          B.forEach((D) => {
            f(D.isIntersecting);
          });
        },
        C = new IntersectionObserver(E, { threshold: 0.5 });
      return (
        A.current && C.observe(A.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [t]),
    b.useEffect(() => {
      if (o) {
        let E = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(E);
        };
      }
    }, [o]));
  let x = () => {
      s(!0);
    },
    S = () => {
      (s(!1), f(!1));
    };
  return l
    ? t !== "intent"
      ? [c, A, {}]
      : [
          c,
          A,
          {
            onFocus: Jo(p, x),
            onBlur: Jo(m, S),
            onMouseEnter: Jo(h, x),
            onMouseLeave: Jo(g, S),
            onTouchStart: Jo(v, x),
          },
        ]
    : [!1, A, {}];
}
function Jo(t, r) {
  return (l) => {
    (t && t(l), l.defaultPrevented || r(l));
  };
}
function xE({ page: t, ...r }) {
  let l = _R(),
    { nonce: o } = zu(),
    { router: s } = Rp(),
    c = b.useMemo(() => zv(s.routes, t, s.basename), [s.routes, t, s.basename]);
  return c
    ? (r.nonce == null && o && (r = { ...r, nonce: o }),
      l
        ? b.createElement(EE, { page: t, matches: c, ...r })
        : b.createElement(TE, { page: t, matches: c, ...r }))
    : null;
}
function RE(t) {
  let { manifest: r, routeModules: l } = zu(),
    [o, s] = b.useState([]);
  return (
    b.useEffect(() => {
      let c = !1;
      return (
        hE(t, r, l).then((f) => {
          c || s(f);
        }),
        () => {
          c = !0;
        }
      );
    }, [t, r, l]),
    o
  );
}
function EE({ page: t, matches: r, ...l }) {
  let o = sr(),
    { future: s } = zu(),
    { basename: c } = Rp(),
    f = b.useMemo(() => {
      if (t === o.pathname + o.search + o.hash) return [];
      let p = Jv(t, c, s.v8_trailingSlashAwareDataRequests, "rsc"),
        m = !1,
        h = [];
      for (let g of r)
        typeof g.route.shouldRevalidate == "function"
          ? (m = !0)
          : h.push(g.route.id);
      return (
        m && h.length > 0 && p.searchParams.set("_routes", h.join(",")),
        [p.pathname + p.search]
      );
    }, [c, s.v8_trailingSlashAwareDataRequests, t, o, r]);
  return b.createElement(
    b.Fragment,
    null,
    f.map((p) =>
      b.createElement("link", {
        key: p,
        rel: "prefetch",
        as: "fetch",
        href: p,
        ...l,
      }),
    ),
  );
}
function TE({ page: t, matches: r, ...l }) {
  let o = sr(),
    { future: s, manifest: c, routeModules: f } = zu(),
    { basename: p } = Rp(),
    { loaderData: m, matches: h } = bE(),
    g = b.useMemo(() => Zy(t, r, h, c, o, "data"), [t, r, h, c, o]),
    v = b.useMemo(() => Zy(t, r, h, c, o, "assets"), [t, r, h, c, o]),
    A = b.useMemo(() => {
      if (t === o.pathname + o.search + o.hash) return [];
      let E = new Set(),
        C = !1;
      if (
        (r.forEach((D) => {
          var k;
          let w = c.routes[D.route.id];
          !w ||
            !w.hasLoader ||
            ((!g.some((O) => O.route.id === D.route.id) &&
              D.route.id in m &&
              (k = f[D.route.id]) != null &&
              k.shouldRevalidate) ||
            w.hasClientLoader
              ? (C = !0)
              : E.add(D.route.id));
        }),
        E.size === 0)
      )
        return [];
      let B = Jv(t, p, s.v8_trailingSlashAwareDataRequests, "data");
      return (
        C &&
          E.size > 0 &&
          B.searchParams.set(
            "_routes",
            r
              .filter((D) => E.has(D.route.id))
              .map((D) => D.route.id)
              .join(","),
          ),
        [B.pathname + B.search]
      );
    }, [p, s.v8_trailingSlashAwareDataRequests, m, o, c, g, r, t, f]),
    x = b.useMemo(() => mE(v, c), [v, c]),
    S = RE(v);
  return b.createElement(
    b.Fragment,
    null,
    A.map((E) =>
      b.createElement("link", {
        key: E,
        rel: "prefetch",
        as: "fetch",
        href: E,
        ...l,
      }),
    ),
    x.map((E) =>
      b.createElement("link", { key: E, rel: "modulepreload", href: E, ...l }),
    ),
    S.map(({ key: E, link: C }) =>
      b.createElement("link", {
        key: E,
        nonce: l.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? l.crossOrigin,
      }),
    ),
  );
}
function CE(...t) {
  return (r) => {
    t.forEach((l) => {
      typeof l == "function" ? l(r) : l != null && (l.current = r);
    });
  };
}
var AE =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  AE && (window.__reactRouterVersion = "7.18.0");
} catch {}
function wE({ basename: t, children: r, useTransitions: l, window: o }) {
  let s = b.useRef();
  s.current == null && (s.current = lR({ window: o, v5Compat: !0 }));
  let c = s.current,
    [f, p] = b.useState({ action: c.action, location: c.location }),
    m = b.useCallback(
      (h) => {
        l === !1 ? p(h) : b.startTransition(() => p(h));
      },
      [l],
    );
  return (
    b.useLayoutEffect(() => c.listen(m), [c, m]),
    b.createElement(nE, {
      basename: t,
      children: r,
      location: f.location,
      navigationType: f.action,
      navigator: c,
      useTransitions: l,
    })
  );
}
var jl = b.forwardRef(function (
  {
    onClick: r,
    discover: l = "render",
    prefetch: o = "none",
    relative: s,
    reloadDocument: c,
    replace: f,
    mask: p,
    state: m,
    target: h,
    to: g,
    preventScrollReset: v,
    viewTransition: A,
    defaultShouldRevalidate: x,
    ...S
  },
  E,
) {
  let { basename: C, navigator: B, useTransitions: D } = b.useContext(kn),
    w = typeof g == "string" && mp.test(g),
    k = Iv(g, C);
  g = k.to;
  let O = $R(g, { relative: s }),
    U = sr(),
    I = null;
  if (p) {
    let z = gp(p, [], U.mask ? U.mask.pathname : "/", !0);
    (C !== "/" && (z.pathname = z.pathname === "/" ? C : Pn([C, z.pathname])),
      (I = B.createHref(z)));
  }
  let [X, le, ue] = SE(o, S),
    Z = BE(g, {
      replace: f,
      mask: p,
      state: m,
      target: h,
      preventScrollReset: v,
      relative: s,
      viewTransition: A,
      defaultShouldRevalidate: x,
      useTransitions: D,
    });
  function R(z) {
    (r && r(z), z.defaultPrevented || Z(z));
  }
  let F = !(k.isExternal || c),
    L = b.createElement("a", {
      ...S,
      ...ue,
      href: (F ? I : void 0) || k.absoluteURL || O,
      onClick: F ? R : r,
      ref: CE(E, le),
      target: h,
      "data-discover": !w && l === "render" ? "true" : void 0,
    });
  return X && !w
    ? b.createElement(b.Fragment, null, L, b.createElement(xE, { page: O }))
    : L;
});
jl.displayName = "Link";
var OE = b.forwardRef(function (
  {
    "aria-current": r = "page",
    caseSensitive: l = !1,
    className: o = "",
    end: s = !1,
    style: c,
    to: f,
    viewTransition: p,
    children: m,
    ...h
  },
  g,
) {
  let v = Oi(f, { relative: h.relative }),
    A = sr(),
    x = b.useContext(_u),
    { navigator: S, basename: E } = b.useContext(kn),
    C = x != null && UE(v) && p === !0,
    B = S.encodeLocation ? S.encodeLocation(v).pathname : v.pathname,
    D = A.pathname,
    w =
      x && x.navigation && x.navigation.location
        ? x.navigation.location.pathname
        : null;
  (l ||
    ((D = D.toLowerCase()),
    (w = w ? w.toLowerCase() : null),
    (B = B.toLowerCase())),
    w && E && (w = Ur(w, E) || w));
  const k = B !== "/" && B.endsWith("/") ? B.length - 1 : B.length;
  let O = D === B || (!s && D.startsWith(B) && D.charAt(k) === "/"),
    U =
      w != null &&
      (w === B || (!s && w.startsWith(B) && w.charAt(B.length) === "/")),
    I = { isActive: O, isPending: U, isTransitioning: C },
    X = O ? r : void 0,
    le;
  typeof o == "function"
    ? (le = o(I))
    : (le = [
        o,
        O ? "active" : null,
        U ? "pending" : null,
        C ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let ue = typeof c == "function" ? c(I) : c;
  return b.createElement(
    jl,
    {
      ...h,
      "aria-current": X,
      className: le,
      ref: g,
      style: ue,
      to: f,
      viewTransition: p,
    },
    typeof m == "function" ? m(I) : m,
  );
});
OE.displayName = "NavLink";
var ME = b.forwardRef(
  (
    {
      discover: t = "render",
      fetcherKey: r,
      navigate: l,
      reloadDocument: o,
      replace: s,
      state: c,
      method: f = uu,
      action: p,
      onSubmit: m,
      relative: h,
      preventScrollReset: g,
      viewTransition: v,
      defaultShouldRevalidate: A,
      ...x
    },
    S,
  ) => {
    let { useTransitions: E } = b.useContext(kn),
      C = zE(),
      B = kE(p, { relative: h }),
      D = f.toLowerCase() === "get" ? "get" : "post",
      w = typeof p == "string" && mp.test(p),
      k = (O) => {
        if ((m && m(O), O.defaultPrevented)) return;
        O.preventDefault();
        let U = O.nativeEvent.submitter,
          I = (U == null ? void 0 : U.getAttribute("formmethod")) || f,
          X = () =>
            C(U || O.currentTarget, {
              fetcherKey: r,
              method: I,
              navigate: l,
              replace: s,
              state: c,
              relative: h,
              preventScrollReset: g,
              viewTransition: v,
              defaultShouldRevalidate: A,
            });
        E && l !== !1 ? b.startTransition(() => X()) : X();
      };
    return b.createElement("form", {
      ref: S,
      method: D,
      action: B,
      onSubmit: o ? m : k,
      ...x,
      "data-discover": !w && t === "render" ? "true" : void 0,
    });
  },
);
ME.displayName = "Form";
function NE(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function eb(t) {
  let r = b.useContext(Gl);
  return (pt(r, NE(t)), r);
}
function BE(
  t,
  {
    target: r,
    replace: l,
    mask: o,
    state: s,
    preventScrollReset: c,
    relative: f,
    viewTransition: p,
    defaultShouldRevalidate: m,
    useTransitions: h,
  } = {},
) {
  let g = vp(),
    v = sr(),
    A = Oi(t, { relative: f });
  return b.useCallback(
    (x) => {
      if (sE(x, r)) {
        x.preventDefault();
        let S = l !== void 0 ? l : mi(v) === mi(A),
          E = () =>
            g(t, {
              replace: S,
              mask: o,
              state: s,
              preventScrollReset: c,
              relative: f,
              viewTransition: p,
              defaultShouldRevalidate: m,
            });
        h ? b.startTransition(() => E()) : E();
      }
    },
    [v, g, A, l, o, s, r, t, c, f, p, m, h],
  );
}
var _E = 0,
  DE = () => `__${String(++_E)}__`;
function zE() {
  let { router: t } = eb("useSubmit"),
    { basename: r } = b.useContext(kn),
    l = WR(),
    o = t.fetch,
    s = t.navigate;
  return b.useCallback(
    async (c, f = {}) => {
      let { action: p, method: m, encType: h, formData: g, body: v } = fE(c, r);
      if (f.navigate === !1) {
        let A = f.fetcherKey || DE();
        await o(A, l, f.action || p, {
          defaultShouldRevalidate: f.defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: g,
          body: v,
          formMethod: f.method || m,
          formEncType: f.encType || h,
          flushSync: f.flushSync,
        });
      } else
        await s(f.action || p, {
          defaultShouldRevalidate: f.defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: g,
          body: v,
          formMethod: f.method || m,
          formEncType: f.encType || h,
          replace: f.replace,
          state: f.state,
          fromRouteId: l,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        });
    },
    [o, s, r, l],
  );
}
function kE(t, { relative: r } = {}) {
  let { basename: l } = b.useContext(kn),
    o = b.useContext(ir);
  pt(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1),
    c = { ...Oi(t || ".", { relative: r }) },
    f = sr();
  if (t == null) {
    c.search = f.search;
    let p = new URLSearchParams(c.search),
      m = p.getAll("index");
    if (m.some((g) => g === "")) {
      (p.delete("index"),
        m.filter((v) => v).forEach((v) => p.append("index", v)));
      let g = p.toString();
      c.search = g ? `?${g}` : "";
    }
  }
  return (
    (!t || t === ".") &&
      s.route.index &&
      (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"),
    l !== "/" && (c.pathname = c.pathname === "/" ? l : Pn([l, c.pathname])),
    mi(c)
  );
}
function UE(t, { relative: r } = {}) {
  let l = b.useContext(Vv);
  pt(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: o } = eb("useViewTransitionState"),
    s = Oi(t, { relative: r });
  if (!l.isTransitioning) return !1;
  let c = Ur(l.currentLocation.pathname, o) || l.currentLocation.pathname,
    f = Ur(l.nextLocation.pathname, o) || l.nextLocation.pathname;
  return gi(s.pathname, f) != null || gi(s.pathname, c) != null;
}
var LE = Bv();
function tb(t, r) {
  return function () {
    return t.apply(r, arguments);
  };
}
const { toString: jE } = Object.prototype,
  { getPrototypeOf: Tp } = Object,
  { iterator: ku, toStringTag: nb } = Symbol,
  Uu = ((t) => (r) => {
    const l = jE.call(r);
    return t[l] || (t[l] = l.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  In = (t) => ((t = t.toLowerCase()), (r) => Uu(r) === t),
  Lu = (t) => (r) => typeof r === t,
  { isArray: Xl } = Array,
  Pl = Lu("undefined");
function Mi(t) {
  return (
    t !== null &&
    !Pl(t) &&
    t.constructor !== null &&
    !Pl(t.constructor) &&
    cn(t.constructor.isBuffer) &&
    t.constructor.isBuffer(t)
  );
}
const rb = In("ArrayBuffer");
function $E(t) {
  let r;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (r = ArrayBuffer.isView(t))
      : (r = t && t.buffer && rb(t.buffer)),
    r
  );
}
const HE = Lu("string"),
  cn = Lu("function"),
  ab = Lu("number"),
  Ni = (t) => t !== null && typeof t == "object",
  qE = (t) => t === !0 || t === !1,
  fu = (t) => {
    if (Uu(t) !== "object") return !1;
    const r = Tp(t);
    return (
      (r === null ||
        r === Object.prototype ||
        Object.getPrototypeOf(r) === null) &&
      !(nb in t) &&
      !(ku in t)
    );
  },
  PE = (t) => {
    if (!Ni(t) || Mi(t)) return !1;
    try {
      return (
        Object.keys(t).length === 0 &&
        Object.getPrototypeOf(t) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  IE = In("Date"),
  FE = In("File"),
  YE = In("Blob"),
  VE = In("FileList"),
  GE = (t) => Ni(t) && cn(t.pipe),
  KE = (t) => {
    let r;
    return (
      t &&
      ((typeof FormData == "function" && t instanceof FormData) ||
        (cn(t.append) &&
          ((r = Uu(t)) === "formdata" ||
            (r === "object" &&
              cn(t.toString) &&
              t.toString() === "[object FormData]"))))
    );
  },
  XE = In("URLSearchParams"),
  [QE, ZE, WE, JE] = ["ReadableStream", "Request", "Response", "Headers"].map(
    In,
  ),
  eT = (t) =>
    t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Bi(t, r, { allOwnKeys: l = !1 } = {}) {
  if (t === null || typeof t > "u") return;
  let o, s;
  if ((typeof t != "object" && (t = [t]), Xl(t)))
    for (o = 0, s = t.length; o < s; o++) r.call(null, t[o], o, t);
  else {
    if (Mi(t)) return;
    const c = l ? Object.getOwnPropertyNames(t) : Object.keys(t),
      f = c.length;
    let p;
    for (o = 0; o < f; o++) ((p = c[o]), r.call(null, t[p], p, t));
  }
}
function lb(t, r) {
  if (Mi(t)) return null;
  r = r.toLowerCase();
  const l = Object.keys(t);
  let o = l.length,
    s;
  for (; o-- > 0;) if (((s = l[o]), r === s.toLowerCase())) return s;
  return null;
}
const Ya =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  ob = (t) => !Pl(t) && t !== Ya;
function Fd() {
  const { caseless: t, skipUndefined: r } = (ob(this) && this) || {},
    l = {},
    o = (s, c) => {
      const f = (t && lb(l, c)) || c;
      fu(l[f]) && fu(s)
        ? (l[f] = Fd(l[f], s))
        : fu(s)
          ? (l[f] = Fd({}, s))
          : Xl(s)
            ? (l[f] = s.slice())
            : (!r || !Pl(s)) && (l[f] = s);
    };
  for (let s = 0, c = arguments.length; s < c; s++)
    arguments[s] && Bi(arguments[s], o);
  return l;
}
const tT = (t, r, l, { allOwnKeys: o } = {}) => (
    Bi(
      r,
      (s, c) => {
        l && cn(s) ? (t[c] = tb(s, l)) : (t[c] = s);
      },
      { allOwnKeys: o },
    ),
    t
  ),
  nT = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t),
  rT = (t, r, l, o) => {
    ((t.prototype = Object.create(r.prototype, o)),
      (t.prototype.constructor = t),
      Object.defineProperty(t, "super", { value: r.prototype }),
      l && Object.assign(t.prototype, l));
  },
  aT = (t, r, l, o) => {
    let s, c, f;
    const p = {};
    if (((r = r || {}), t == null)) return r;
    do {
      for (s = Object.getOwnPropertyNames(t), c = s.length; c-- > 0;)
        ((f = s[c]),
          (!o || o(f, t, r)) && !p[f] && ((r[f] = t[f]), (p[f] = !0)));
      t = l !== !1 && Tp(t);
    } while (t && (!l || l(t, r)) && t !== Object.prototype);
    return r;
  },
  lT = (t, r, l) => {
    ((t = String(t)),
      (l === void 0 || l > t.length) && (l = t.length),
      (l -= r.length));
    const o = t.indexOf(r, l);
    return o !== -1 && o === l;
  },
  oT = (t) => {
    if (!t) return null;
    if (Xl(t)) return t;
    let r = t.length;
    if (!ab(r)) return null;
    const l = new Array(r);
    for (; r-- > 0;) l[r] = t[r];
    return l;
  },
  iT = (
    (t) => (r) =>
      t && r instanceof t
  )(typeof Uint8Array < "u" && Tp(Uint8Array)),
  sT = (t, r) => {
    const o = (t && t[ku]).call(t);
    let s;
    for (; (s = o.next()) && !s.done;) {
      const c = s.value;
      r.call(t, c[0], c[1]);
    }
  },
  uT = (t, r) => {
    let l;
    const o = [];
    for (; (l = t.exec(r)) !== null;) o.push(l);
    return o;
  },
  cT = In("HTMLFormElement"),
  fT = (t) =>
    t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (l, o, s) {
      return o.toUpperCase() + s;
    }),
  Wy = (
    ({ hasOwnProperty: t }) =>
    (r, l) =>
      t.call(r, l)
  )(Object.prototype),
  dT = In("RegExp"),
  ib = (t, r) => {
    const l = Object.getOwnPropertyDescriptors(t),
      o = {};
    (Bi(l, (s, c) => {
      let f;
      (f = r(s, c, t)) !== !1 && (o[c] = f || s);
    }),
      Object.defineProperties(t, o));
  },
  pT = (t) => {
    ib(t, (r, l) => {
      if (cn(t) && ["arguments", "caller", "callee"].indexOf(l) !== -1)
        return !1;
      const o = t[l];
      if (cn(o)) {
        if (((r.enumerable = !1), "writable" in r)) {
          r.writable = !1;
          return;
        }
        r.set ||
          (r.set = () => {
            throw Error("Can not rewrite read-only method '" + l + "'");
          });
      }
    });
  },
  hT = (t, r) => {
    const l = {},
      o = (s) => {
        s.forEach((c) => {
          l[c] = !0;
        });
      };
    return (Xl(t) ? o(t) : o(String(t).split(r)), l);
  },
  mT = () => {},
  gT = (t, r) => (t != null && Number.isFinite((t = +t)) ? t : r);
function yT(t) {
  return !!(t && cn(t.append) && t[nb] === "FormData" && t[ku]);
}
const vT = (t) => {
    const r = new Array(10),
      l = (o, s) => {
        if (Ni(o)) {
          if (r.indexOf(o) >= 0) return;
          if (Mi(o)) return o;
          if (!("toJSON" in o)) {
            r[s] = o;
            const c = Xl(o) ? [] : {};
            return (
              Bi(o, (f, p) => {
                const m = l(f, s + 1);
                !Pl(m) && (c[p] = m);
              }),
              (r[s] = void 0),
              c
            );
          }
        }
        return o;
      };
    return l(t, 0);
  },
  bT = In("AsyncFunction"),
  ST = (t) => t && (Ni(t) || cn(t)) && cn(t.then) && cn(t.catch),
  sb = ((t, r) =>
    t
      ? setImmediate
      : r
        ? ((l, o) => (
            Ya.addEventListener(
              "message",
              ({ source: s, data: c }) => {
                s === Ya && c === l && o.length && o.shift()();
              },
              !1,
            ),
            (s) => {
              (o.push(s), Ya.postMessage(l, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (l) => setTimeout(l))(
    typeof setImmediate == "function",
    cn(Ya.postMessage),
  ),
  xT =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Ya)
      : (typeof process < "u" && process.nextTick) || sb,
  RT = (t) => t != null && cn(t[ku]),
  Q = {
    isArray: Xl,
    isArrayBuffer: rb,
    isBuffer: Mi,
    isFormData: KE,
    isArrayBufferView: $E,
    isString: HE,
    isNumber: ab,
    isBoolean: qE,
    isObject: Ni,
    isPlainObject: fu,
    isEmptyObject: PE,
    isReadableStream: QE,
    isRequest: ZE,
    isResponse: WE,
    isHeaders: JE,
    isUndefined: Pl,
    isDate: IE,
    isFile: FE,
    isBlob: YE,
    isRegExp: dT,
    isFunction: cn,
    isStream: GE,
    isURLSearchParams: XE,
    isTypedArray: iT,
    isFileList: VE,
    forEach: Bi,
    merge: Fd,
    extend: tT,
    trim: eT,
    stripBOM: nT,
    inherits: rT,
    toFlatObject: aT,
    kindOf: Uu,
    kindOfTest: In,
    endsWith: lT,
    toArray: oT,
    forEachEntry: sT,
    matchAll: uT,
    isHTMLForm: cT,
    hasOwnProperty: Wy,
    hasOwnProp: Wy,
    reduceDescriptors: ib,
    freezeMethods: pT,
    toObjectSet: hT,
    toCamelCase: fT,
    noop: mT,
    toFiniteNumber: gT,
    findKey: lb,
    global: Ya,
    isContextDefined: ob,
    isSpecCompliantForm: yT,
    toJSONObject: vT,
    isAsyncFn: bT,
    isThenable: ST,
    setImmediate: sb,
    asap: xT,
    isIterable: RT,
  };
function Ce(t, r, l, o, s) {
  (Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = t),
    (this.name = "AxiosError"),
    r && (this.code = r),
    l && (this.config = l),
    o && (this.request = o),
    s && ((this.response = s), (this.status = s.status ? s.status : null)));
}
Q.inherits(Ce, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: Q.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const ub = Ce.prototype,
  cb = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((t) => {
  cb[t] = { value: t };
});
Object.defineProperties(Ce, cb);
Object.defineProperty(ub, "isAxiosError", { value: !0 });
Ce.from = (t, r, l, o, s, c) => {
  const f = Object.create(ub);
  Q.toFlatObject(
    t,
    f,
    function (g) {
      return g !== Error.prototype;
    },
    (h) => h !== "isAxiosError",
  );
  const p = t && t.message ? t.message : "Error",
    m = r == null && t ? t.code : r;
  return (
    Ce.call(f, p, m, l, o, s),
    t &&
      f.cause == null &&
      Object.defineProperty(f, "cause", { value: t, configurable: !0 }),
    (f.name = (t && t.name) || "Error"),
    c && Object.assign(f, c),
    f
  );
};
const ET = null;
function Yd(t) {
  return Q.isPlainObject(t) || Q.isArray(t);
}
function fb(t) {
  return Q.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Jy(t, r, l) {
  return t
    ? t
        .concat(r)
        .map(function (s, c) {
          return ((s = fb(s)), !l && c ? "[" + s + "]" : s);
        })
        .join(l ? "." : "")
    : r;
}
function TT(t) {
  return Q.isArray(t) && !t.some(Yd);
}
const CT = Q.toFlatObject(Q, {}, null, function (r) {
  return /^is[A-Z]/.test(r);
});
function ju(t, r, l) {
  if (!Q.isObject(t)) throw new TypeError("target must be an object");
  ((r = r || new FormData()),
    (l = Q.toFlatObject(
      l,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (E, C) {
        return !Q.isUndefined(C[E]);
      },
    )));
  const o = l.metaTokens,
    s = l.visitor || g,
    c = l.dots,
    f = l.indexes,
    m = (l.Blob || (typeof Blob < "u" && Blob)) && Q.isSpecCompliantForm(r);
  if (!Q.isFunction(s)) throw new TypeError("visitor must be a function");
  function h(S) {
    if (S === null) return "";
    if (Q.isDate(S)) return S.toISOString();
    if (Q.isBoolean(S)) return S.toString();
    if (!m && Q.isBlob(S))
      throw new Ce("Blob is not supported. Use a Buffer instead.");
    return Q.isArrayBuffer(S) || Q.isTypedArray(S)
      ? m && typeof Blob == "function"
        ? new Blob([S])
        : Buffer.from(S)
      : S;
  }
  function g(S, E, C) {
    let B = S;
    if (S && !C && typeof S == "object") {
      if (Q.endsWith(E, "{}"))
        ((E = o ? E : E.slice(0, -2)), (S = JSON.stringify(S)));
      else if (
        (Q.isArray(S) && TT(S)) ||
        ((Q.isFileList(S) || Q.endsWith(E, "[]")) && (B = Q.toArray(S)))
      )
        return (
          (E = fb(E)),
          B.forEach(function (w, k) {
            !(Q.isUndefined(w) || w === null) &&
              r.append(
                f === !0 ? Jy([E], k, c) : f === null ? E : E + "[]",
                h(w),
              );
          }),
          !1
        );
    }
    return Yd(S) ? !0 : (r.append(Jy(C, E, c), h(S)), !1);
  }
  const v = [],
    A = Object.assign(CT, {
      defaultVisitor: g,
      convertValue: h,
      isVisitable: Yd,
    });
  function x(S, E) {
    if (!Q.isUndefined(S)) {
      if (v.indexOf(S) !== -1)
        throw Error("Circular reference detected in " + E.join("."));
      (v.push(S),
        Q.forEach(S, function (B, D) {
          (!(Q.isUndefined(B) || B === null) &&
            s.call(r, B, Q.isString(D) ? D.trim() : D, E, A)) === !0 &&
            x(B, E ? E.concat(D) : [D]);
        }),
        v.pop());
    }
  }
  if (!Q.isObject(t)) throw new TypeError("data must be an object");
  return (x(t), r);
}
function e0(t) {
  const r = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function (o) {
    return r[o];
  });
}
function Cp(t, r) {
  ((this._pairs = []), t && ju(t, this, r));
}
const db = Cp.prototype;
db.append = function (r, l) {
  this._pairs.push([r, l]);
};
db.toString = function (r) {
  const l = r
    ? function (o) {
        return r.call(this, o, e0);
      }
    : e0;
  return this._pairs
    .map(function (s) {
      return l(s[0]) + "=" + l(s[1]);
    }, "")
    .join("&");
};
function AT(t) {
  return encodeURIComponent(t)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function pb(t, r, l) {
  if (!r) return t;
  const o = (l && l.encode) || AT;
  Q.isFunction(l) && (l = { serialize: l });
  const s = l && l.serialize;
  let c;
  if (
    (s
      ? (c = s(r, l))
      : (c = Q.isURLSearchParams(r) ? r.toString() : new Cp(r, l).toString(o)),
    c)
  ) {
    const f = t.indexOf("#");
    (f !== -1 && (t = t.slice(0, f)),
      (t += (t.indexOf("?") === -1 ? "?" : "&") + c));
  }
  return t;
}
class t0 {
  constructor() {
    this.handlers = [];
  }
  use(r, l, o) {
    return (
      this.handlers.push({
        fulfilled: r,
        rejected: l,
        synchronous: o ? o.synchronous : !1,
        runWhen: o ? o.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(r) {
    this.handlers[r] && (this.handlers[r] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(r) {
    Q.forEach(this.handlers, function (o) {
      o !== null && r(o);
    });
  }
}
const hb = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  wT = typeof URLSearchParams < "u" ? URLSearchParams : Cp,
  OT = typeof FormData < "u" ? FormData : null,
  MT = typeof Blob < "u" ? Blob : null,
  NT = {
    isBrowser: !0,
    classes: { URLSearchParams: wT, FormData: OT, Blob: MT },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Ap = typeof window < "u" && typeof document < "u",
  Vd = (typeof navigator == "object" && navigator) || void 0,
  BT =
    Ap &&
    (!Vd || ["ReactNative", "NativeScript", "NS"].indexOf(Vd.product) < 0),
  _T =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  DT = (Ap && window.location.href) || "http://localhost",
  zT = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Ap,
        hasStandardBrowserEnv: BT,
        hasStandardBrowserWebWorkerEnv: _T,
        navigator: Vd,
        origin: DT,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Wt = { ...zT, ...NT };
function kT(t, r) {
  return ju(t, new Wt.classes.URLSearchParams(), {
    visitor: function (l, o, s, c) {
      return Wt.isNode && Q.isBuffer(l)
        ? (this.append(o, l.toString("base64")), !1)
        : c.defaultVisitor.apply(this, arguments);
    },
    ...r,
  });
}
function UT(t) {
  return Q.matchAll(/\w+|\[(\w*)]/g, t).map((r) =>
    r[0] === "[]" ? "" : r[1] || r[0],
  );
}
function LT(t) {
  const r = {},
    l = Object.keys(t);
  let o;
  const s = l.length;
  let c;
  for (o = 0; o < s; o++) ((c = l[o]), (r[c] = t[c]));
  return r;
}
function mb(t) {
  function r(l, o, s, c) {
    let f = l[c++];
    if (f === "__proto__") return !0;
    const p = Number.isFinite(+f),
      m = c >= l.length;
    return (
      (f = !f && Q.isArray(s) ? s.length : f),
      m
        ? (Q.hasOwnProp(s, f) ? (s[f] = [s[f], o]) : (s[f] = o), !p)
        : ((!s[f] || !Q.isObject(s[f])) && (s[f] = []),
          r(l, o, s[f], c) && Q.isArray(s[f]) && (s[f] = LT(s[f])),
          !p)
    );
  }
  if (Q.isFormData(t) && Q.isFunction(t.entries)) {
    const l = {};
    return (
      Q.forEachEntry(t, (o, s) => {
        r(UT(o), s, l, 0);
      }),
      l
    );
  }
  return null;
}
function jT(t, r, l) {
  if (Q.isString(t))
    try {
      return ((r || JSON.parse)(t), Q.trim(t));
    } catch (o) {
      if (o.name !== "SyntaxError") throw o;
    }
  return (l || JSON.stringify)(t);
}
const _i = {
  transitional: hb,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (r, l) {
      const o = l.getContentType() || "",
        s = o.indexOf("application/json") > -1,
        c = Q.isObject(r);
      if ((c && Q.isHTMLForm(r) && (r = new FormData(r)), Q.isFormData(r)))
        return s ? JSON.stringify(mb(r)) : r;
      if (
        Q.isArrayBuffer(r) ||
        Q.isBuffer(r) ||
        Q.isStream(r) ||
        Q.isFile(r) ||
        Q.isBlob(r) ||
        Q.isReadableStream(r)
      )
        return r;
      if (Q.isArrayBufferView(r)) return r.buffer;
      if (Q.isURLSearchParams(r))
        return (
          l.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          r.toString()
        );
      let p;
      if (c) {
        if (o.indexOf("application/x-www-form-urlencoded") > -1)
          return kT(r, this.formSerializer).toString();
        if ((p = Q.isFileList(r)) || o.indexOf("multipart/form-data") > -1) {
          const m = this.env && this.env.FormData;
          return ju(
            p ? { "files[]": r } : r,
            m && new m(),
            this.formSerializer,
          );
        }
      }
      return c || s ? (l.setContentType("application/json", !1), jT(r)) : r;
    },
  ],
  transformResponse: [
    function (r) {
      const l = this.transitional || _i.transitional,
        o = l && l.forcedJSONParsing,
        s = this.responseType === "json";
      if (Q.isResponse(r) || Q.isReadableStream(r)) return r;
      if (r && Q.isString(r) && ((o && !this.responseType) || s)) {
        const f = !(l && l.silentJSONParsing) && s;
        try {
          return JSON.parse(r, this.parseReviver);
        } catch (p) {
          if (f)
            throw p.name === "SyntaxError"
              ? Ce.from(p, Ce.ERR_BAD_RESPONSE, this, null, this.response)
              : p;
        }
      }
      return r;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Wt.classes.FormData, Blob: Wt.classes.Blob },
  validateStatus: function (r) {
    return r >= 200 && r < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
Q.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  _i.headers[t] = {};
});
const $T = Q.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  HT = (t) => {
    const r = {};
    let l, o, s;
    return (
      t &&
        t
          .split(
            `
`,
          )
          .forEach(function (f) {
            ((s = f.indexOf(":")),
              (l = f.substring(0, s).trim().toLowerCase()),
              (o = f.substring(s + 1).trim()),
              !(!l || (r[l] && $T[l])) &&
                (l === "set-cookie"
                  ? r[l]
                    ? r[l].push(o)
                    : (r[l] = [o])
                  : (r[l] = r[l] ? r[l] + ", " + o : o)));
          }),
      r
    );
  },
  n0 = Symbol("internals");
function ei(t) {
  return t && String(t).trim().toLowerCase();
}
function du(t) {
  return t === !1 || t == null ? t : Q.isArray(t) ? t.map(du) : String(t);
}
function qT(t) {
  const r = Object.create(null),
    l = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; (o = l.exec(t));) r[o[1]] = o[2];
  return r;
}
const PT = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Ad(t, r, l, o, s) {
  if (Q.isFunction(o)) return o.call(this, r, l);
  if ((s && (r = l), !!Q.isString(r))) {
    if (Q.isString(o)) return r.indexOf(o) !== -1;
    if (Q.isRegExp(o)) return o.test(r);
  }
}
function IT(t) {
  return t
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (r, l, o) => l.toUpperCase() + o);
}
function FT(t, r) {
  const l = Q.toCamelCase(" " + r);
  ["get", "set", "has"].forEach((o) => {
    Object.defineProperty(t, o + l, {
      value: function (s, c, f) {
        return this[o].call(this, r, s, c, f);
      },
      configurable: !0,
    });
  });
}
let fn = class {
  constructor(r) {
    r && this.set(r);
  }
  set(r, l, o) {
    const s = this;
    function c(p, m, h) {
      const g = ei(m);
      if (!g) throw new Error("header name must be a non-empty string");
      const v = Q.findKey(s, g);
      (!v || s[v] === void 0 || h === !0 || (h === void 0 && s[v] !== !1)) &&
        (s[v || m] = du(p));
    }
    const f = (p, m) => Q.forEach(p, (h, g) => c(h, g, m));
    if (Q.isPlainObject(r) || r instanceof this.constructor) f(r, l);
    else if (Q.isString(r) && (r = r.trim()) && !PT(r)) f(HT(r), l);
    else if (Q.isObject(r) && Q.isIterable(r)) {
      let p = {},
        m,
        h;
      for (const g of r) {
        if (!Q.isArray(g))
          throw TypeError("Object iterator must return a key-value pair");
        p[(h = g[0])] = (m = p[h])
          ? Q.isArray(m)
            ? [...m, g[1]]
            : [m, g[1]]
          : g[1];
      }
      f(p, l);
    } else r != null && c(l, r, o);
    return this;
  }
  get(r, l) {
    if (((r = ei(r)), r)) {
      const o = Q.findKey(this, r);
      if (o) {
        const s = this[o];
        if (!l) return s;
        if (l === !0) return qT(s);
        if (Q.isFunction(l)) return l.call(this, s, o);
        if (Q.isRegExp(l)) return l.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(r, l) {
    if (((r = ei(r)), r)) {
      const o = Q.findKey(this, r);
      return !!(o && this[o] !== void 0 && (!l || Ad(this, this[o], o, l)));
    }
    return !1;
  }
  delete(r, l) {
    const o = this;
    let s = !1;
    function c(f) {
      if (((f = ei(f)), f)) {
        const p = Q.findKey(o, f);
        p && (!l || Ad(o, o[p], p, l)) && (delete o[p], (s = !0));
      }
    }
    return (Q.isArray(r) ? r.forEach(c) : c(r), s);
  }
  clear(r) {
    const l = Object.keys(this);
    let o = l.length,
      s = !1;
    for (; o--;) {
      const c = l[o];
      (!r || Ad(this, this[c], c, r, !0)) && (delete this[c], (s = !0));
    }
    return s;
  }
  normalize(r) {
    const l = this,
      o = {};
    return (
      Q.forEach(this, (s, c) => {
        const f = Q.findKey(o, c);
        if (f) {
          ((l[f] = du(s)), delete l[c]);
          return;
        }
        const p = r ? IT(c) : String(c).trim();
        (p !== c && delete l[c], (l[p] = du(s)), (o[p] = !0));
      }),
      this
    );
  }
  concat(...r) {
    return this.constructor.concat(this, ...r);
  }
  toJSON(r) {
    const l = Object.create(null);
    return (
      Q.forEach(this, (o, s) => {
        o != null && o !== !1 && (l[s] = r && Q.isArray(o) ? o.join(", ") : o);
      }),
      l
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([r, l]) => r + ": " + l).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(r) {
    return r instanceof this ? r : new this(r);
  }
  static concat(r, ...l) {
    const o = new this(r);
    return (l.forEach((s) => o.set(s)), o);
  }
  static accessor(r) {
    const o = (this[n0] = this[n0] = { accessors: {} }).accessors,
      s = this.prototype;
    function c(f) {
      const p = ei(f);
      o[p] || (FT(s, f), (o[p] = !0));
    }
    return (Q.isArray(r) ? r.forEach(c) : c(r), this);
  }
};
fn.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
Q.reduceDescriptors(fn.prototype, ({ value: t }, r) => {
  let l = r[0].toUpperCase() + r.slice(1);
  return {
    get: () => t,
    set(o) {
      this[l] = o;
    },
  };
});
Q.freezeMethods(fn);
function wd(t, r) {
  const l = this || _i,
    o = r || l,
    s = fn.from(o.headers);
  let c = o.data;
  return (
    Q.forEach(t, function (p) {
      c = p.call(l, c, s.normalize(), r ? r.status : void 0);
    }),
    s.normalize(),
    c
  );
}
function gb(t) {
  return !!(t && t.__CANCEL__);
}
function Ql(t, r, l) {
  (Ce.call(this, t ?? "canceled", Ce.ERR_CANCELED, r, l),
    (this.name = "CanceledError"));
}
Q.inherits(Ql, Ce, { __CANCEL__: !0 });
function yb(t, r, l) {
  const o = l.config.validateStatus;
  !l.status || !o || o(l.status)
    ? t(l)
    : r(
        new Ce(
          "Request failed with status code " + l.status,
          [Ce.ERR_BAD_REQUEST, Ce.ERR_BAD_RESPONSE][
            Math.floor(l.status / 100) - 4
          ],
          l.config,
          l.request,
          l,
        ),
      );
}
function YT(t) {
  const r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return (r && r[1]) || "";
}
function VT(t, r) {
  t = t || 10;
  const l = new Array(t),
    o = new Array(t);
  let s = 0,
    c = 0,
    f;
  return (
    (r = r !== void 0 ? r : 1e3),
    function (m) {
      const h = Date.now(),
        g = o[c];
      (f || (f = h), (l[s] = m), (o[s] = h));
      let v = c,
        A = 0;
      for (; v !== s;) ((A += l[v++]), (v = v % t));
      if (((s = (s + 1) % t), s === c && (c = (c + 1) % t), h - f < r)) return;
      const x = g && h - g;
      return x ? Math.round((A * 1e3) / x) : void 0;
    }
  );
}
function GT(t, r) {
  let l = 0,
    o = 1e3 / r,
    s,
    c;
  const f = (h, g = Date.now()) => {
    ((l = g), (s = null), c && (clearTimeout(c), (c = null)), t(...h));
  };
  return [
    (...h) => {
      const g = Date.now(),
        v = g - l;
      v >= o
        ? f(h, g)
        : ((s = h),
          c ||
            (c = setTimeout(() => {
              ((c = null), f(s));
            }, o - v)));
    },
    () => s && f(s),
  ];
}
const Ru = (t, r, l = 3) => {
    let o = 0;
    const s = VT(50, 250);
    return GT((c) => {
      const f = c.loaded,
        p = c.lengthComputable ? c.total : void 0,
        m = f - o,
        h = s(m),
        g = f <= p;
      o = f;
      const v = {
        loaded: f,
        total: p,
        progress: p ? f / p : void 0,
        bytes: m,
        rate: h || void 0,
        estimated: h && p && g ? (p - f) / h : void 0,
        event: c,
        lengthComputable: p != null,
        [r ? "download" : "upload"]: !0,
      };
      t(v);
    }, l);
  },
  r0 = (t, r) => {
    const l = t != null;
    return [(o) => r[0]({ lengthComputable: l, total: t, loaded: o }), r[1]];
  },
  a0 =
    (t) =>
    (...r) =>
      Q.asap(() => t(...r)),
  KT = Wt.hasStandardBrowserEnv
    ? ((t, r) => (l) => (
        (l = new URL(l, Wt.origin)),
        t.protocol === l.protocol &&
          t.host === l.host &&
          (r || t.port === l.port)
      ))(
        new URL(Wt.origin),
        Wt.navigator && /(msie|trident)/i.test(Wt.navigator.userAgent),
      )
    : () => !0,
  XT = Wt.hasStandardBrowserEnv
    ? {
        write(t, r, l, o, s, c) {
          const f = [t + "=" + encodeURIComponent(r)];
          (Q.isNumber(l) && f.push("expires=" + new Date(l).toGMTString()),
            Q.isString(o) && f.push("path=" + o),
            Q.isString(s) && f.push("domain=" + s),
            c === !0 && f.push("secure"),
            (document.cookie = f.join("; ")));
        },
        read(t) {
          const r = document.cookie.match(
            new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"),
          );
          return r ? decodeURIComponent(r[3]) : null;
        },
        remove(t) {
          this.write(t, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function QT(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function ZT(t, r) {
  return r ? t.replace(/\/?\/$/, "") + "/" + r.replace(/^\/+/, "") : t;
}
function vb(t, r, l) {
  let o = !QT(r);
  return t && (o || l == !1) ? ZT(t, r) : r;
}
const l0 = (t) => (t instanceof fn ? { ...t } : t);
function Ka(t, r) {
  r = r || {};
  const l = {};
  function o(h, g, v, A) {
    return Q.isPlainObject(h) && Q.isPlainObject(g)
      ? Q.merge.call({ caseless: A }, h, g)
      : Q.isPlainObject(g)
        ? Q.merge({}, g)
        : Q.isArray(g)
          ? g.slice()
          : g;
  }
  function s(h, g, v, A) {
    if (Q.isUndefined(g)) {
      if (!Q.isUndefined(h)) return o(void 0, h, v, A);
    } else return o(h, g, v, A);
  }
  function c(h, g) {
    if (!Q.isUndefined(g)) return o(void 0, g);
  }
  function f(h, g) {
    if (Q.isUndefined(g)) {
      if (!Q.isUndefined(h)) return o(void 0, h);
    } else return o(void 0, g);
  }
  function p(h, g, v) {
    if (v in r) return o(h, g);
    if (v in t) return o(void 0, h);
  }
  const m = {
    url: c,
    method: c,
    data: c,
    baseURL: f,
    transformRequest: f,
    transformResponse: f,
    paramsSerializer: f,
    timeout: f,
    timeoutMessage: f,
    withCredentials: f,
    withXSRFToken: f,
    adapter: f,
    responseType: f,
    xsrfCookieName: f,
    xsrfHeaderName: f,
    onUploadProgress: f,
    onDownloadProgress: f,
    decompress: f,
    maxContentLength: f,
    maxBodyLength: f,
    beforeRedirect: f,
    transport: f,
    httpAgent: f,
    httpsAgent: f,
    cancelToken: f,
    socketPath: f,
    responseEncoding: f,
    validateStatus: p,
    headers: (h, g, v) => s(l0(h), l0(g), v, !0),
  };
  return (
    Q.forEach(Object.keys({ ...t, ...r }), function (g) {
      const v = m[g] || s,
        A = v(t[g], r[g], g);
      (Q.isUndefined(A) && v !== p) || (l[g] = A);
    }),
    l
  );
}
const bb = (t) => {
    const r = Ka({}, t);
    let {
      data: l,
      withXSRFToken: o,
      xsrfHeaderName: s,
      xsrfCookieName: c,
      headers: f,
      auth: p,
    } = r;
    if (
      ((r.headers = f = fn.from(f)),
      (r.url = pb(
        vb(r.baseURL, r.url, r.allowAbsoluteUrls),
        t.params,
        t.paramsSerializer,
      )),
      p &&
        f.set(
          "Authorization",
          "Basic " +
            btoa(
              (p.username || "") +
                ":" +
                (p.password ? unescape(encodeURIComponent(p.password)) : ""),
            ),
        ),
      Q.isFormData(l))
    ) {
      if (Wt.hasStandardBrowserEnv || Wt.hasStandardBrowserWebWorkerEnv)
        f.setContentType(void 0);
      else if (Q.isFunction(l.getHeaders)) {
        const m = l.getHeaders(),
          h = ["content-type", "content-length"];
        Object.entries(m).forEach(([g, v]) => {
          h.includes(g.toLowerCase()) && f.set(g, v);
        });
      }
    }
    if (
      Wt.hasStandardBrowserEnv &&
      (o && Q.isFunction(o) && (o = o(r)), o || (o !== !1 && KT(r.url)))
    ) {
      const m = s && c && XT.read(c);
      m && f.set(s, m);
    }
    return r;
  },
  WT = typeof XMLHttpRequest < "u",
  JT =
    WT &&
    function (t) {
      return new Promise(function (l, o) {
        const s = bb(t);
        let c = s.data;
        const f = fn.from(s.headers).normalize();
        let { responseType: p, onUploadProgress: m, onDownloadProgress: h } = s,
          g,
          v,
          A,
          x,
          S;
        function E() {
          (x && x(),
            S && S(),
            s.cancelToken && s.cancelToken.unsubscribe(g),
            s.signal && s.signal.removeEventListener("abort", g));
        }
        let C = new XMLHttpRequest();
        (C.open(s.method.toUpperCase(), s.url, !0), (C.timeout = s.timeout));
        function B() {
          if (!C) return;
          const w = fn.from(
              "getAllResponseHeaders" in C && C.getAllResponseHeaders(),
            ),
            O = {
              data:
                !p || p === "text" || p === "json"
                  ? C.responseText
                  : C.response,
              status: C.status,
              statusText: C.statusText,
              headers: w,
              config: t,
              request: C,
            };
          (yb(
            function (I) {
              (l(I), E());
            },
            function (I) {
              (o(I), E());
            },
            O,
          ),
            (C = null));
        }
        ("onloadend" in C
          ? (C.onloadend = B)
          : (C.onreadystatechange = function () {
              !C ||
                C.readyState !== 4 ||
                (C.status === 0 &&
                  !(C.responseURL && C.responseURL.indexOf("file:") === 0)) ||
                setTimeout(B);
            }),
          (C.onabort = function () {
            C &&
              (o(new Ce("Request aborted", Ce.ECONNABORTED, t, C)), (C = null));
          }),
          (C.onerror = function (k) {
            const O = k && k.message ? k.message : "Network Error",
              U = new Ce(O, Ce.ERR_NETWORK, t, C);
            ((U.event = k || null), o(U), (C = null));
          }),
          (C.ontimeout = function () {
            let k = s.timeout
              ? "timeout of " + s.timeout + "ms exceeded"
              : "timeout exceeded";
            const O = s.transitional || hb;
            (s.timeoutErrorMessage && (k = s.timeoutErrorMessage),
              o(
                new Ce(
                  k,
                  O.clarifyTimeoutError ? Ce.ETIMEDOUT : Ce.ECONNABORTED,
                  t,
                  C,
                ),
              ),
              (C = null));
          }),
          c === void 0 && f.setContentType(null),
          "setRequestHeader" in C &&
            Q.forEach(f.toJSON(), function (k, O) {
              C.setRequestHeader(O, k);
            }),
          Q.isUndefined(s.withCredentials) ||
            (C.withCredentials = !!s.withCredentials),
          p && p !== "json" && (C.responseType = s.responseType),
          h && (([A, S] = Ru(h, !0)), C.addEventListener("progress", A)),
          m &&
            C.upload &&
            (([v, x] = Ru(m)),
            C.upload.addEventListener("progress", v),
            C.upload.addEventListener("loadend", x)),
          (s.cancelToken || s.signal) &&
            ((g = (w) => {
              C &&
                (o(!w || w.type ? new Ql(null, t, C) : w),
                C.abort(),
                (C = null));
            }),
            s.cancelToken && s.cancelToken.subscribe(g),
            s.signal &&
              (s.signal.aborted
                ? g()
                : s.signal.addEventListener("abort", g))));
        const D = YT(s.url);
        if (D && Wt.protocols.indexOf(D) === -1) {
          o(new Ce("Unsupported protocol " + D + ":", Ce.ERR_BAD_REQUEST, t));
          return;
        }
        C.send(c || null);
      });
    },
  e2 = (t, r) => {
    const { length: l } = (t = t ? t.filter(Boolean) : []);
    if (r || l) {
      let o = new AbortController(),
        s;
      const c = function (h) {
        if (!s) {
          ((s = !0), p());
          const g = h instanceof Error ? h : this.reason;
          o.abort(
            g instanceof Ce ? g : new Ql(g instanceof Error ? g.message : g),
          );
        }
      };
      let f =
        r &&
        setTimeout(() => {
          ((f = null), c(new Ce(`timeout ${r} of ms exceeded`, Ce.ETIMEDOUT)));
        }, r);
      const p = () => {
        t &&
          (f && clearTimeout(f),
          (f = null),
          t.forEach((h) => {
            h.unsubscribe
              ? h.unsubscribe(c)
              : h.removeEventListener("abort", c);
          }),
          (t = null));
      };
      t.forEach((h) => h.addEventListener("abort", c));
      const { signal: m } = o;
      return ((m.unsubscribe = () => Q.asap(p)), m);
    }
  },
  t2 = function* (t, r) {
    let l = t.byteLength;
    if (l < r) {
      yield t;
      return;
    }
    let o = 0,
      s;
    for (; o < l;) ((s = o + r), yield t.slice(o, s), (o = s));
  },
  n2 = async function* (t, r) {
    for await (const l of r2(t)) yield* t2(l, r);
  },
  r2 = async function* (t) {
    if (t[Symbol.asyncIterator]) {
      yield* t;
      return;
    }
    const r = t.getReader();
    try {
      for (;;) {
        const { done: l, value: o } = await r.read();
        if (l) break;
        yield o;
      }
    } finally {
      await r.cancel();
    }
  },
  o0 = (t, r, l, o) => {
    const s = n2(t, r);
    let c = 0,
      f,
      p = (m) => {
        f || ((f = !0), o && o(m));
      };
    return new ReadableStream(
      {
        async pull(m) {
          try {
            const { done: h, value: g } = await s.next();
            if (h) {
              (p(), m.close());
              return;
            }
            let v = g.byteLength;
            if (l) {
              let A = (c += v);
              l(A);
            }
            m.enqueue(new Uint8Array(g));
          } catch (h) {
            throw (p(h), h);
          }
        },
        cancel(m) {
          return (p(m), s.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  i0 = 64 * 1024,
  { isFunction: eu } = Q,
  Sb = (({ fetch: t, Request: r, Response: l }) => ({
    fetch: t,
    Request: r,
    Response: l,
  }))(Q.global),
  { ReadableStream: s0, TextEncoder: u0 } = Q.global,
  c0 = (t, ...r) => {
    try {
      return !!t(...r);
    } catch {
      return !1;
    }
  },
  a2 = (t) => {
    const { fetch: r, Request: l, Response: o } = Object.assign({}, Sb, t),
      s = eu(r),
      c = eu(l),
      f = eu(o);
    if (!s) return !1;
    const p = s && eu(s0),
      m =
        s &&
        (typeof u0 == "function"
          ? (
              (S) => (E) =>
                S.encode(E)
            )(new u0())
          : async (S) => new Uint8Array(await new l(S).arrayBuffer())),
      h =
        c &&
        p &&
        c0(() => {
          let S = !1;
          const E = new l(Wt.origin, {
            body: new s0(),
            method: "POST",
            get duplex() {
              return ((S = !0), "half");
            },
          }).headers.has("Content-Type");
          return S && !E;
        }),
      g = f && p && c0(() => Q.isReadableStream(new o("").body)),
      v = { stream: g && ((S) => S.body) };
    s &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((S) => {
        !v[S] &&
          (v[S] = (E, C) => {
            let B = E && E[S];
            if (B) return B.call(E);
            throw new Ce(
              `Response type '${S}' is not supported`,
              Ce.ERR_NOT_SUPPORT,
              C,
            );
          });
      });
    const A = async (S) => {
        if (S == null) return 0;
        if (Q.isBlob(S)) return S.size;
        if (Q.isSpecCompliantForm(S))
          return (
            await new l(Wt.origin, { method: "POST", body: S }).arrayBuffer()
          ).byteLength;
        if (Q.isArrayBufferView(S) || Q.isArrayBuffer(S)) return S.byteLength;
        if ((Q.isURLSearchParams(S) && (S = S + ""), Q.isString(S)))
          return (await m(S)).byteLength;
      },
      x = async (S, E) => {
        const C = Q.toFiniteNumber(S.getContentLength());
        return C ?? A(E);
      };
    return async (S) => {
      let {
        url: E,
        method: C,
        data: B,
        signal: D,
        cancelToken: w,
        timeout: k,
        onDownloadProgress: O,
        onUploadProgress: U,
        responseType: I,
        headers: X,
        withCredentials: le = "same-origin",
        fetchOptions: ue,
      } = bb(S);
      I = I ? (I + "").toLowerCase() : "text";
      let Z = e2([D, w && w.toAbortSignal()], k),
        R = null;
      const F =
        Z &&
        Z.unsubscribe &&
        (() => {
          Z.unsubscribe();
        });
      let L;
      try {
        if (
          U &&
          h &&
          C !== "get" &&
          C !== "head" &&
          (L = await x(X, B)) !== 0
        ) {
          let N = new l(E, { method: "POST", body: B, duplex: "half" }),
            V;
          if (
            (Q.isFormData(B) &&
              (V = N.headers.get("content-type")) &&
              X.setContentType(V),
            N.body)
          ) {
            const [ne, ee] = r0(L, Ru(a0(U)));
            B = o0(N.body, i0, ne, ee);
          }
        }
        Q.isString(le) || (le = le ? "include" : "omit");
        const z = c && "credentials" in l.prototype,
          M = {
            ...ue,
            signal: Z,
            method: C.toUpperCase(),
            headers: X.normalize().toJSON(),
            body: B,
            duplex: "half",
            credentials: z ? le : void 0,
          };
        R = c && new l(E, M);
        let $ = await (c ? r(R, ue) : r(E, M));
        const W = g && (I === "stream" || I === "response");
        if (g && (O || (W && F))) {
          const N = {};
          ["status", "statusText", "headers"].forEach((oe) => {
            N[oe] = $[oe];
          });
          const V = Q.toFiniteNumber($.headers.get("content-length")),
            [ne, ee] = (O && r0(V, Ru(a0(O), !0))) || [];
          $ = new o(
            o0($.body, i0, ne, () => {
              (ee && ee(), F && F());
            }),
            N,
          );
        }
        I = I || "text";
        let se = await v[Q.findKey(v, I) || "text"]($, S);
        return (
          !W && F && F(),
          await new Promise((N, V) => {
            yb(N, V, {
              data: se,
              headers: fn.from($.headers),
              status: $.status,
              statusText: $.statusText,
              config: S,
              request: R,
            });
          })
        );
      } catch (z) {
        throw (
          F && F(),
          z && z.name === "TypeError" && /Load failed|fetch/i.test(z.message)
            ? Object.assign(new Ce("Network Error", Ce.ERR_NETWORK, S, R), {
                cause: z.cause || z,
              })
            : Ce.from(z, z && z.code, S, R)
        );
      }
    };
  },
  l2 = new Map(),
  xb = (t) => {
    let r = Q.merge.call({ skipUndefined: !0 }, Sb, t ? t.env : null);
    const { fetch: l, Request: o, Response: s } = r,
      c = [o, s, l];
    let f = c.length,
      p = f,
      m,
      h,
      g = l2;
    for (; p--;)
      ((m = c[p]),
        (h = g.get(m)),
        h === void 0 && g.set(m, (h = p ? new Map() : a2(r))),
        (g = h));
    return h;
  };
xb();
const Gd = { http: ET, xhr: JT, fetch: { get: xb } };
Q.forEach(Gd, (t, r) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: r });
    } catch {}
    Object.defineProperty(t, "adapterName", { value: r });
  }
});
const f0 = (t) => `- ${t}`,
  o2 = (t) => Q.isFunction(t) || t === null || t === !1,
  Rb = {
    getAdapter: (t, r) => {
      t = Q.isArray(t) ? t : [t];
      const { length: l } = t;
      let o, s;
      const c = {};
      for (let f = 0; f < l; f++) {
        o = t[f];
        let p;
        if (
          ((s = o),
          !o2(o) && ((s = Gd[(p = String(o)).toLowerCase()]), s === void 0))
        )
          throw new Ce(`Unknown adapter '${p}'`);
        if (s && (Q.isFunction(s) || (s = s.get(r)))) break;
        c[p || "#" + f] = s;
      }
      if (!s) {
        const f = Object.entries(c).map(
          ([m, h]) =>
            `adapter ${m} ` +
            (h === !1
              ? "is not supported by the environment"
              : "is not available in the build"),
        );
        let p = l
          ? f.length > 1
            ? `since :
` +
              f.map(f0).join(`
`)
            : " " + f0(f[0])
          : "as no adapter specified";
        throw new Ce(
          "There is no suitable adapter to dispatch the request " + p,
          "ERR_NOT_SUPPORT",
        );
      }
      return s;
    },
    adapters: Gd,
  };
function Od(t) {
  if (
    (t.cancelToken && t.cancelToken.throwIfRequested(),
    t.signal && t.signal.aborted)
  )
    throw new Ql(null, t);
}
function d0(t) {
  return (
    Od(t),
    (t.headers = fn.from(t.headers)),
    (t.data = wd.call(t, t.transformRequest)),
    ["post", "put", "patch"].indexOf(t.method) !== -1 &&
      t.headers.setContentType("application/x-www-form-urlencoded", !1),
    Rb.getAdapter(
      t.adapter || _i.adapter,
      t,
    )(t).then(
      function (o) {
        return (
          Od(t),
          (o.data = wd.call(t, t.transformResponse, o)),
          (o.headers = fn.from(o.headers)),
          o
        );
      },
      function (o) {
        return (
          gb(o) ||
            (Od(t),
            o &&
              o.response &&
              ((o.response.data = wd.call(t, t.transformResponse, o.response)),
              (o.response.headers = fn.from(o.response.headers)))),
          Promise.reject(o)
        );
      },
    )
  );
}
const Eb = "1.12.1",
  $u = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (t, r) => {
    $u[t] = function (o) {
      return typeof o === t || "a" + (r < 1 ? "n " : " ") + t;
    };
  },
);
const p0 = {};
$u.transitional = function (r, l, o) {
  function s(c, f) {
    return (
      "[Axios v" +
      Eb +
      "] Transitional option '" +
      c +
      "'" +
      f +
      (o ? ". " + o : "")
    );
  }
  return (c, f, p) => {
    if (r === !1)
      throw new Ce(
        s(f, " has been removed" + (l ? " in " + l : "")),
        Ce.ERR_DEPRECATED,
      );
    return (
      l &&
        !p0[f] &&
        ((p0[f] = !0),
        console.warn(
          s(
            f,
            " has been deprecated since v" +
              l +
              " and will be removed in the near future",
          ),
        )),
      r ? r(c, f, p) : !0
    );
  };
};
$u.spelling = function (r) {
  return (l, o) => (console.warn(`${o} is likely a misspelling of ${r}`), !0);
};
function i2(t, r, l) {
  if (typeof t != "object")
    throw new Ce("options must be an object", Ce.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(t);
  let s = o.length;
  for (; s-- > 0;) {
    const c = o[s],
      f = r[c];
    if (f) {
      const p = t[c],
        m = p === void 0 || f(p, c, t);
      if (m !== !0)
        throw new Ce("option " + c + " must be " + m, Ce.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (l !== !0) throw new Ce("Unknown option " + c, Ce.ERR_BAD_OPTION);
  }
}
const pu = { assertOptions: i2, validators: $u },
  Jn = pu.validators;
let Ga = class {
  constructor(r) {
    ((this.defaults = r || {}),
      (this.interceptors = { request: new t0(), response: new t0() }));
  }
  async request(r, l) {
    try {
      return await this._request(r, l);
    } catch (o) {
      if (o instanceof Error) {
        let s = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(s)
          : (s = new Error());
        const c = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          o.stack
            ? c &&
              !String(o.stack).endsWith(c.replace(/^.+\n.+\n/, "")) &&
              (o.stack +=
                `
` + c)
            : (o.stack = c);
        } catch {}
      }
      throw o;
    }
  }
  _request(r, l) {
    (typeof r == "string" ? ((l = l || {}), (l.url = r)) : (l = r || {}),
      (l = Ka(this.defaults, l)));
    const { transitional: o, paramsSerializer: s, headers: c } = l;
    (o !== void 0 &&
      pu.assertOptions(
        o,
        {
          silentJSONParsing: Jn.transitional(Jn.boolean),
          forcedJSONParsing: Jn.transitional(Jn.boolean),
          clarifyTimeoutError: Jn.transitional(Jn.boolean),
        },
        !1,
      ),
      s != null &&
        (Q.isFunction(s)
          ? (l.paramsSerializer = { serialize: s })
          : pu.assertOptions(
              s,
              { encode: Jn.function, serialize: Jn.function },
              !0,
            )),
      l.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (l.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (l.allowAbsoluteUrls = !0)),
      pu.assertOptions(
        l,
        {
          baseUrl: Jn.spelling("baseURL"),
          withXsrfToken: Jn.spelling("withXSRFToken"),
        },
        !0,
      ),
      (l.method = (l.method || this.defaults.method || "get").toLowerCase()));
    let f = c && Q.merge(c.common, c[l.method]);
    (c &&
      Q.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (S) => {
          delete c[S];
        },
      ),
      (l.headers = fn.concat(f, c)));
    const p = [];
    let m = !0;
    this.interceptors.request.forEach(function (E) {
      (typeof E.runWhen == "function" && E.runWhen(l) === !1) ||
        ((m = m && E.synchronous), p.unshift(E.fulfilled, E.rejected));
    });
    const h = [];
    this.interceptors.response.forEach(function (E) {
      h.push(E.fulfilled, E.rejected);
    });
    let g,
      v = 0,
      A;
    if (!m) {
      const S = [d0.bind(this), void 0];
      for (
        S.unshift(...p), S.push(...h), A = S.length, g = Promise.resolve(l);
        v < A;
      )
        g = g.then(S[v++], S[v++]);
      return g;
    }
    A = p.length;
    let x = l;
    for (v = 0; v < A;) {
      const S = p[v++],
        E = p[v++];
      try {
        x = S(x);
      } catch (C) {
        E.call(this, C);
        break;
      }
    }
    try {
      g = d0.call(this, x);
    } catch (S) {
      return Promise.reject(S);
    }
    for (v = 0, A = h.length; v < A;) g = g.then(h[v++], h[v++]);
    return g;
  }
  getUri(r) {
    r = Ka(this.defaults, r);
    const l = vb(r.baseURL, r.url, r.allowAbsoluteUrls);
    return pb(l, r.params, r.paramsSerializer);
  }
};
Q.forEach(["delete", "get", "head", "options"], function (r) {
  Ga.prototype[r] = function (l, o) {
    return this.request(
      Ka(o || {}, { method: r, url: l, data: (o || {}).data }),
    );
  };
});
Q.forEach(["post", "put", "patch"], function (r) {
  function l(o) {
    return function (c, f, p) {
      return this.request(
        Ka(p || {}, {
          method: r,
          headers: o ? { "Content-Type": "multipart/form-data" } : {},
          url: c,
          data: f,
        }),
      );
    };
  }
  ((Ga.prototype[r] = l()), (Ga.prototype[r + "Form"] = l(!0)));
});
let s2 = class Tb {
  constructor(r) {
    if (typeof r != "function")
      throw new TypeError("executor must be a function.");
    let l;
    this.promise = new Promise(function (c) {
      l = c;
    });
    const o = this;
    (this.promise.then((s) => {
      if (!o._listeners) return;
      let c = o._listeners.length;
      for (; c-- > 0;) o._listeners[c](s);
      o._listeners = null;
    }),
      (this.promise.then = (s) => {
        let c;
        const f = new Promise((p) => {
          (o.subscribe(p), (c = p));
        }).then(s);
        return (
          (f.cancel = function () {
            o.unsubscribe(c);
          }),
          f
        );
      }),
      r(function (c, f, p) {
        o.reason || ((o.reason = new Ql(c, f, p)), l(o.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(r) {
    if (this.reason) {
      r(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(r) : (this._listeners = [r]);
  }
  unsubscribe(r) {
    if (!this._listeners) return;
    const l = this._listeners.indexOf(r);
    l !== -1 && this._listeners.splice(l, 1);
  }
  toAbortSignal() {
    const r = new AbortController(),
      l = (o) => {
        r.abort(o);
      };
    return (
      this.subscribe(l),
      (r.signal.unsubscribe = () => this.unsubscribe(l)),
      r.signal
    );
  }
  static source() {
    let r;
    return {
      token: new Tb(function (s) {
        r = s;
      }),
      cancel: r,
    };
  }
};
function u2(t) {
  return function (l) {
    return t.apply(null, l);
  };
}
function c2(t) {
  return Q.isObject(t) && t.isAxiosError === !0;
}
const Kd = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Kd).forEach(([t, r]) => {
  Kd[r] = t;
});
function Cb(t) {
  const r = new Ga(t),
    l = tb(Ga.prototype.request, r);
  return (
    Q.extend(l, Ga.prototype, r, { allOwnKeys: !0 }),
    Q.extend(l, r, null, { allOwnKeys: !0 }),
    (l.create = function (s) {
      return Cb(Ka(t, s));
    }),
    l
  );
}
const ct = Cb(_i);
ct.Axios = Ga;
ct.CanceledError = Ql;
ct.CancelToken = s2;
ct.isCancel = gb;
ct.VERSION = Eb;
ct.toFormData = ju;
ct.AxiosError = Ce;
ct.Cancel = ct.CanceledError;
ct.all = function (r) {
  return Promise.all(r);
};
ct.spread = u2;
ct.isAxiosError = c2;
ct.mergeConfig = Ka;
ct.AxiosHeaders = fn;
ct.formToJSON = (t) => mb(Q.isHTMLForm(t) ? new FormData(t) : t);
ct.getAdapter = Rb.getAdapter;
ct.HttpStatusCode = Kd;
ct.default = ct;
const {
    Axios: B4,
    AxiosError: _4,
    CanceledError: D4,
    isCancel: z4,
    CancelToken: k4,
    VERSION: U4,
    all: L4,
    Cancel: j4,
    isAxiosError: $4,
    spread: H4,
    toFormData: q4,
    AxiosHeaders: P4,
    HttpStatusCode: I4,
    formToJSON: F4,
    getAdapter: Y4,
    mergeConfig: V4,
  } = ct,
  Hu = "/api/blogs";
let qu = null;
const f2 = (t) => {
    qu = `Bearer ${t}`;
  },
  d2 = () => ct.get(Hu).then((r) => r.data),
  p2 = async (t) => {
    const r = { headers: { Authorization: qu } };
    return (await ct.post(Hu, t, r)).data;
  },
  h2 = async (t, r) => {
    const l = { headers: { Authorization: qu } };
    return (await ct.put(`${Hu}/${t}`, r, l)).data;
  },
  m2 = async (t) => {
    const r = { headers: { Authorization: qu } };
    return (await ct.delete(`${Hu}/${t}`, r)).data;
  },
  ti = { getAll: d2, create: p2, setToken: f2, update: h2, remove: m2 },
  g2 = "/api/login",
  y2 = async (t) => (await ct.post(g2, t)).data,
  v2 = { login: y2 },
  yi = { black: "#000", white: "#fff" },
  Dl = {
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336",
    700: "#d32f2f",
    800: "#c62828",
  },
  zl = {
    50: "#f3e5f5",
    200: "#ce93d8",
    300: "#ba68c8",
    400: "#ab47bc",
    500: "#9c27b0",
    700: "#7b1fa2",
  },
  kl = {
    50: "#e3f2fd",
    200: "#90caf9",
    400: "#42a5f5",
    700: "#1976d2",
    800: "#1565c0",
  },
  Ul = {
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4",
    700: "#0288d1",
    900: "#01579b",
  },
  Ll = {
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
  },
  ni = {
    300: "#ffb74d",
    400: "#ffa726",
    500: "#ff9800",
    700: "#f57c00",
    900: "#e65100",
  },
  b2 = {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    A100: "#f5f5f5",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161",
  };
function Lr(t, ...r) {
  const l = new URL(`https://mui.com/production-error/?code=${t}`);
  return (
    r.forEach((o) => l.searchParams.append("args[]", o)),
    `Minified MUI error #${t}; visit ${l} for the full message.`
  );
}
const wp = "$$material";
function Xd() {
  return (
    (Xd = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var r = 1; r < arguments.length; r++) {
            var l = arguments[r];
            for (var o in l) ({}).hasOwnProperty.call(l, o) && (t[o] = l[o]);
          }
          return t;
        }),
    Xd.apply(null, arguments)
  );
}
function S2(t) {
  if (t.sheet) return t.sheet;
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === t) return document.styleSheets[r];
}
function x2(t) {
  var r = document.createElement("style");
  return (
    r.setAttribute("data-emotion", t.key),
    t.nonce !== void 0 && r.setAttribute("nonce", t.nonce),
    r.appendChild(document.createTextNode("")),
    r.setAttribute("data-s", ""),
    r
  );
}
var R2 = (function () {
    function t(l) {
      var o = this;
      ((this._insertTag = function (s) {
        var c;
        (o.tags.length === 0
          ? o.insertionPoint
            ? (c = o.insertionPoint.nextSibling)
            : o.prepend
              ? (c = o.container.firstChild)
              : (c = o.before)
          : (c = o.tags[o.tags.length - 1].nextSibling),
          o.container.insertBefore(s, c),
          o.tags.push(s));
      }),
        (this.isSpeedy = l.speedy === void 0 ? !0 : l.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = l.nonce),
        (this.key = l.key),
        (this.container = l.container),
        (this.prepend = l.prepend),
        (this.insertionPoint = l.insertionPoint),
        (this.before = null));
    }
    var r = t.prototype;
    return (
      (r.hydrate = function (o) {
        o.forEach(this._insertTag);
      }),
      (r.insert = function (o) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 &&
          this._insertTag(x2(this));
        var s = this.tags[this.tags.length - 1];
        if (this.isSpeedy) {
          var c = S2(s);
          try {
            c.insertRule(o, c.cssRules.length);
          } catch {}
        } else s.appendChild(document.createTextNode(o));
        this.ctr++;
      }),
      (r.flush = function () {
        (this.tags.forEach(function (o) {
          var s;
          return (s = o.parentNode) == null ? void 0 : s.removeChild(o);
        }),
          (this.tags = []),
          (this.ctr = 0));
      }),
      t
    );
  })(),
  Zt = "-ms-",
  Eu = "-moz-",
  Pe = "-webkit-",
  Ab = "comm",
  Op = "rule",
  Mp = "decl",
  E2 = "@import",
  wb = "@keyframes",
  T2 = "@layer",
  C2 = Math.abs,
  Pu = String.fromCharCode,
  A2 = Object.assign;
function w2(t, r) {
  return Gt(t, 0) ^ 45
    ? (((((((r << 2) ^ Gt(t, 0)) << 2) ^ Gt(t, 1)) << 2) ^ Gt(t, 2)) << 2) ^
        Gt(t, 3)
    : 0;
}
function Ob(t) {
  return t.trim();
}
function O2(t, r) {
  return (t = r.exec(t)) ? t[0] : t;
}
function Ie(t, r, l) {
  return t.replace(r, l);
}
function Qd(t, r) {
  return t.indexOf(r);
}
function Gt(t, r) {
  return t.charCodeAt(r) | 0;
}
function vi(t, r, l) {
  return t.slice(r, l);
}
function nr(t) {
  return t.length;
}
function Np(t) {
  return t.length;
}
function tu(t, r) {
  return (r.push(t), t);
}
function M2(t, r) {
  return t.map(r).join("");
}
var Iu = 1,
  Il = 1,
  Mb = 0,
  dn = 0,
  Ot = 0,
  Zl = "";
function Fu(t, r, l, o, s, c, f) {
  return {
    value: t,
    root: r,
    parent: l,
    type: o,
    props: s,
    children: c,
    line: Iu,
    column: Il,
    length: f,
    return: "",
  };
}
function ri(t, r) {
  return A2(Fu("", null, null, "", null, null, 0), t, { length: -t.length }, r);
}
function N2() {
  return Ot;
}
function B2() {
  return (
    (Ot = dn > 0 ? Gt(Zl, --dn) : 0),
    Il--,
    Ot === 10 && ((Il = 1), Iu--),
    Ot
  );
}
function xn() {
  return (
    (Ot = dn < Mb ? Gt(Zl, dn++) : 0),
    Il++,
    Ot === 10 && ((Il = 1), Iu++),
    Ot
  );
}
function lr() {
  return Gt(Zl, dn);
}
function hu() {
  return dn;
}
function Di(t, r) {
  return vi(Zl, t, r);
}
function bi(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Nb(t) {
  return ((Iu = Il = 1), (Mb = nr((Zl = t))), (dn = 0), []);
}
function Bb(t) {
  return ((Zl = ""), t);
}
function mu(t) {
  return Ob(Di(dn - 1, Zd(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function _2(t) {
  for (; (Ot = lr()) && Ot < 33;) xn();
  return bi(t) > 2 || bi(Ot) > 3 ? "" : " ";
}
function D2(t, r) {
  for (
    ;
    --r &&
    xn() &&
    !(Ot < 48 || Ot > 102 || (Ot > 57 && Ot < 65) || (Ot > 70 && Ot < 97));
  );
  return Di(t, hu() + (r < 6 && lr() == 32 && xn() == 32));
}
function Zd(t) {
  for (; xn();)
    switch (Ot) {
      case t:
        return dn;
      case 34:
      case 39:
        t !== 34 && t !== 39 && Zd(Ot);
        break;
      case 40:
        t === 41 && Zd(t);
        break;
      case 92:
        xn();
        break;
    }
  return dn;
}
function z2(t, r) {
  for (; xn() && t + Ot !== 57;) if (t + Ot === 84 && lr() === 47) break;
  return "/*" + Di(r, dn - 1) + "*" + Pu(t === 47 ? t : xn());
}
function k2(t) {
  for (; !bi(lr());) xn();
  return Di(t, dn);
}
function U2(t) {
  return Bb(gu("", null, null, null, [""], (t = Nb(t)), 0, [0], t));
}
function gu(t, r, l, o, s, c, f, p, m) {
  for (
    var h = 0,
      g = 0,
      v = f,
      A = 0,
      x = 0,
      S = 0,
      E = 1,
      C = 1,
      B = 1,
      D = 0,
      w = "",
      k = s,
      O = c,
      U = o,
      I = w;
    C;
  )
    switch (((S = D), (D = xn()))) {
      case 40:
        if (S != 108 && Gt(I, v - 1) == 58) {
          Qd((I += Ie(mu(D), "&", "&\f")), "&\f") != -1 && (B = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        I += mu(D);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        I += _2(S);
        break;
      case 92:
        I += D2(hu() - 1, 7);
        continue;
      case 47:
        switch (lr()) {
          case 42:
          case 47:
            tu(L2(z2(xn(), hu()), r, l), m);
            break;
          default:
            I += "/";
        }
        break;
      case 123 * E:
        p[h++] = nr(I) * B;
      case 125 * E:
      case 59:
      case 0:
        switch (D) {
          case 0:
          case 125:
            C = 0;
          case 59 + g:
            (B == -1 && (I = Ie(I, /\f/g, "")),
              x > 0 &&
                nr(I) - v &&
                tu(
                  x > 32
                    ? m0(I + ";", o, l, v - 1)
                    : m0(Ie(I, " ", "") + ";", o, l, v - 2),
                  m,
                ));
            break;
          case 59:
            I += ";";
          default:
            if (
              (tu((U = h0(I, r, l, h, g, s, p, w, (k = []), (O = []), v)), c),
              D === 123)
            )
              if (g === 0) gu(I, r, U, U, k, c, v, p, O);
              else
                switch (A === 99 && Gt(I, 3) === 110 ? 100 : A) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    gu(
                      t,
                      U,
                      U,
                      o && tu(h0(t, U, U, 0, 0, s, p, w, s, (k = []), v), O),
                      s,
                      O,
                      v,
                      p,
                      o ? k : O,
                    );
                    break;
                  default:
                    gu(I, U, U, U, [""], O, 0, p, O);
                }
        }
        ((h = g = x = 0), (E = B = 1), (w = I = ""), (v = f));
        break;
      case 58:
        ((v = 1 + nr(I)), (x = S));
      default:
        if (E < 1) {
          if (D == 123) --E;
          else if (D == 125 && E++ == 0 && B2() == 125) continue;
        }
        switch (((I += Pu(D)), D * E)) {
          case 38:
            B = g > 0 ? 1 : ((I += "\f"), -1);
            break;
          case 44:
            ((p[h++] = (nr(I) - 1) * B), (B = 1));
            break;
          case 64:
            (lr() === 45 && (I += mu(xn())),
              (A = lr()),
              (g = v = nr((w = I += k2(hu())))),
              D++);
            break;
          case 45:
            S === 45 && nr(I) == 2 && (E = 0);
        }
    }
  return c;
}
function h0(t, r, l, o, s, c, f, p, m, h, g) {
  for (
    var v = s - 1, A = s === 0 ? c : [""], x = Np(A), S = 0, E = 0, C = 0;
    S < o;
    ++S
  )
    for (var B = 0, D = vi(t, v + 1, (v = C2((E = f[S])))), w = t; B < x; ++B)
      (w = Ob(E > 0 ? A[B] + " " + D : Ie(D, /&\f/g, A[B]))) && (m[C++] = w);
  return Fu(t, r, l, s === 0 ? Op : p, m, h, g);
}
function L2(t, r, l) {
  return Fu(t, r, l, Ab, Pu(N2()), vi(t, 2, -2), 0);
}
function m0(t, r, l, o) {
  return Fu(t, r, l, Mp, vi(t, 0, o), vi(t, o + 1, -1), o);
}
function $l(t, r) {
  for (var l = "", o = Np(t), s = 0; s < o; s++) l += r(t[s], s, t, r) || "";
  return l;
}
function j2(t, r, l, o) {
  switch (t.type) {
    case T2:
      if (t.children.length) break;
    case E2:
    case Mp:
      return (t.return = t.return || t.value);
    case Ab:
      return "";
    case wb:
      return (t.return = t.value + "{" + $l(t.children, o) + "}");
    case Op:
      t.value = t.props.join(",");
  }
  return nr((l = $l(t.children, o)))
    ? (t.return = t.value + "{" + l + "}")
    : "";
}
function $2(t) {
  var r = Np(t);
  return function (l, o, s, c) {
    for (var f = "", p = 0; p < r; p++) f += t[p](l, o, s, c) || "";
    return f;
  };
}
function H2(t) {
  return function (r) {
    r.root || ((r = r.return) && t(r));
  };
}
function _b(t) {
  var r = Object.create(null);
  return function (l) {
    return (r[l] === void 0 && (r[l] = t(l)), r[l]);
  };
}
var q2 = function (r, l, o) {
    for (
      var s = 0, c = 0;
      (s = c), (c = lr()), s === 38 && c === 12 && (l[o] = 1), !bi(c);
    )
      xn();
    return Di(r, dn);
  },
  P2 = function (r, l) {
    var o = -1,
      s = 44;
    do
      switch (bi(s)) {
        case 0:
          (s === 38 && lr() === 12 && (l[o] = 1), (r[o] += q2(dn - 1, l, o)));
          break;
        case 2:
          r[o] += mu(s);
          break;
        case 4:
          if (s === 44) {
            ((r[++o] = lr() === 58 ? "&\f" : ""), (l[o] = r[o].length));
            break;
          }
        default:
          r[o] += Pu(s);
      }
    while ((s = xn()));
    return r;
  },
  I2 = function (r, l) {
    return Bb(P2(Nb(r), l));
  },
  g0 = new WeakMap(),
  F2 = function (r) {
    if (!(r.type !== "rule" || !r.parent || r.length < 1)) {
      for (
        var l = r.value,
          o = r.parent,
          s = r.column === o.column && r.line === o.line;
        o.type !== "rule";
      )
        if (((o = o.parent), !o)) return;
      if (
        !(r.props.length === 1 && l.charCodeAt(0) !== 58 && !g0.get(o)) &&
        !s
      ) {
        g0.set(r, !0);
        for (
          var c = [], f = I2(l, c), p = o.props, m = 0, h = 0;
          m < f.length;
          m++
        )
          for (var g = 0; g < p.length; g++, h++)
            r.props[h] = c[m] ? f[m].replace(/&\f/g, p[g]) : p[g] + " " + f[m];
      }
    }
  },
  Y2 = function (r) {
    if (r.type === "decl") {
      var l = r.value;
      l.charCodeAt(0) === 108 &&
        l.charCodeAt(2) === 98 &&
        ((r.return = ""), (r.value = ""));
    }
  };
function Db(t, r) {
  switch (w2(t, r)) {
    case 5103:
      return Pe + "print-" + t + t;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Pe + t + t;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Pe + t + Eu + t + Zt + t + t;
    case 6828:
    case 4268:
      return Pe + t + Zt + t + t;
    case 6165:
      return Pe + t + Zt + "flex-" + t + t;
    case 5187:
      return (
        Pe + t + Ie(t, /(\w+).+(:[^]+)/, Pe + "box-$1$2" + Zt + "flex-$1$2") + t
      );
    case 5443:
      return Pe + t + Zt + "flex-item-" + Ie(t, /flex-|-self/, "") + t;
    case 4675:
      return (
        Pe +
        t +
        Zt +
        "flex-line-pack" +
        Ie(t, /align-content|flex-|-self/, "") +
        t
      );
    case 5548:
      return Pe + t + Zt + Ie(t, "shrink", "negative") + t;
    case 5292:
      return Pe + t + Zt + Ie(t, "basis", "preferred-size") + t;
    case 6060:
      return (
        Pe +
        "box-" +
        Ie(t, "-grow", "") +
        Pe +
        t +
        Zt +
        Ie(t, "grow", "positive") +
        t
      );
    case 4554:
      return Pe + Ie(t, /([^-])(transform)/g, "$1" + Pe + "$2") + t;
    case 6187:
      return (
        Ie(
          Ie(Ie(t, /(zoom-|grab)/, Pe + "$1"), /(image-set)/, Pe + "$1"),
          t,
          "",
        ) + t
      );
    case 5495:
    case 3959:
      return Ie(t, /(image-set\([^]*)/, Pe + "$1$`$1");
    case 4968:
      return (
        Ie(
          Ie(t, /(.+:)(flex-)?(.*)/, Pe + "box-pack:$3" + Zt + "flex-pack:$3"),
          /s.+-b[^;]+/,
          "justify",
        ) +
        Pe +
        t +
        t
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Ie(t, /(.+)-inline(.+)/, Pe + "$1$2") + t;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (nr(t) - 1 - r > 6)
        switch (Gt(t, r + 1)) {
          case 109:
            if (Gt(t, r + 4) !== 45) break;
          case 102:
            return (
              Ie(
                t,
                /(.+:)(.+)-([^]+)/,
                "$1" +
                  Pe +
                  "$2-$3$1" +
                  Eu +
                  (Gt(t, r + 3) == 108 ? "$3" : "$2-$3"),
              ) + t
            );
          case 115:
            return ~Qd(t, "stretch")
              ? Db(Ie(t, "stretch", "fill-available"), r) + t
              : t;
        }
      break;
    case 4949:
      if (Gt(t, r + 1) !== 115) break;
    case 6444:
      switch (Gt(t, nr(t) - 3 - (~Qd(t, "!important") && 10))) {
        case 107:
          return Ie(t, ":", ":" + Pe) + t;
        case 101:
          return (
            Ie(
              t,
              /(.+:)([^;!]+)(;|!.+)?/,
              "$1" +
                Pe +
                (Gt(t, 14) === 45 ? "inline-" : "") +
                "box$3$1" +
                Pe +
                "$2$3$1" +
                Zt +
                "$2box$3",
            ) + t
          );
      }
      break;
    case 5936:
      switch (Gt(t, r + 11)) {
        case 114:
          return Pe + t + Zt + Ie(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        case 108:
          return Pe + t + Zt + Ie(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        case 45:
          return Pe + t + Zt + Ie(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
      return Pe + t + Zt + t + t;
  }
  return t;
}
var V2 = function (r, l, o, s) {
    if (r.length > -1 && !r.return)
      switch (r.type) {
        case Mp:
          r.return = Db(r.value, r.length);
          break;
        case wb:
          return $l([ri(r, { value: Ie(r.value, "@", "@" + Pe) })], s);
        case Op:
          if (r.length)
            return M2(r.props, function (c) {
              switch (O2(c, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return $l(
                    [ri(r, { props: [Ie(c, /:(read-\w+)/, ":" + Eu + "$1")] })],
                    s,
                  );
                case "::placeholder":
                  return $l(
                    [
                      ri(r, {
                        props: [Ie(c, /:(plac\w+)/, ":" + Pe + "input-$1")],
                      }),
                      ri(r, { props: [Ie(c, /:(plac\w+)/, ":" + Eu + "$1")] }),
                      ri(r, { props: [Ie(c, /:(plac\w+)/, Zt + "input-$1")] }),
                    ],
                    s,
                  );
              }
              return "";
            });
      }
  },
  G2 = [V2],
  K2 = function (r) {
    var l = r.key;
    if (l === "css") {
      var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
      Array.prototype.forEach.call(o, function (E) {
        var C = E.getAttribute("data-emotion");
        C.indexOf(" ") !== -1 &&
          (document.head.appendChild(E), E.setAttribute("data-s", ""));
      });
    }
    var s = r.stylisPlugins || G2,
      c = {},
      f,
      p = [];
    ((f = r.container || document.head),
      Array.prototype.forEach.call(
        document.querySelectorAll('style[data-emotion^="' + l + ' "]'),
        function (E) {
          for (
            var C = E.getAttribute("data-emotion").split(" "), B = 1;
            B < C.length;
            B++
          )
            c[C[B]] = !0;
          p.push(E);
        },
      ));
    var m,
      h = [F2, Y2];
    {
      var g,
        v = [
          j2,
          H2(function (E) {
            g.insert(E);
          }),
        ],
        A = $2(h.concat(s, v)),
        x = function (C) {
          return $l(U2(C), A);
        };
      m = function (C, B, D, w) {
        ((g = D),
          x(C ? C + "{" + B.styles + "}" : B.styles),
          w && (S.inserted[B.name] = !0));
      };
    }
    var S = {
      key: l,
      sheet: new R2({
        key: l,
        container: f,
        nonce: r.nonce,
        speedy: r.speedy,
        prepend: r.prepend,
        insertionPoint: r.insertionPoint,
      }),
      nonce: r.nonce,
      inserted: c,
      registered: {},
      insert: m,
    };
    return (S.sheet.hydrate(p), S);
  },
  Md = { exports: {} },
  Ge = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var y0;
function X2() {
  if (y0) return Ge;
  y0 = 1;
  var t = typeof Symbol == "function" && Symbol.for,
    r = t ? Symbol.for("react.element") : 60103,
    l = t ? Symbol.for("react.portal") : 60106,
    o = t ? Symbol.for("react.fragment") : 60107,
    s = t ? Symbol.for("react.strict_mode") : 60108,
    c = t ? Symbol.for("react.profiler") : 60114,
    f = t ? Symbol.for("react.provider") : 60109,
    p = t ? Symbol.for("react.context") : 60110,
    m = t ? Symbol.for("react.async_mode") : 60111,
    h = t ? Symbol.for("react.concurrent_mode") : 60111,
    g = t ? Symbol.for("react.forward_ref") : 60112,
    v = t ? Symbol.for("react.suspense") : 60113,
    A = t ? Symbol.for("react.suspense_list") : 60120,
    x = t ? Symbol.for("react.memo") : 60115,
    S = t ? Symbol.for("react.lazy") : 60116,
    E = t ? Symbol.for("react.block") : 60121,
    C = t ? Symbol.for("react.fundamental") : 60117,
    B = t ? Symbol.for("react.responder") : 60118,
    D = t ? Symbol.for("react.scope") : 60119;
  function w(O) {
    if (typeof O == "object" && O !== null) {
      var U = O.$$typeof;
      switch (U) {
        case r:
          switch (((O = O.type), O)) {
            case m:
            case h:
            case o:
            case c:
            case s:
            case v:
              return O;
            default:
              switch (((O = O && O.$$typeof), O)) {
                case p:
                case g:
                case S:
                case x:
                case f:
                  return O;
                default:
                  return U;
              }
          }
        case l:
          return U;
      }
    }
  }
  function k(O) {
    return w(O) === h;
  }
  return (
    (Ge.AsyncMode = m),
    (Ge.ConcurrentMode = h),
    (Ge.ContextConsumer = p),
    (Ge.ContextProvider = f),
    (Ge.Element = r),
    (Ge.ForwardRef = g),
    (Ge.Fragment = o),
    (Ge.Lazy = S),
    (Ge.Memo = x),
    (Ge.Portal = l),
    (Ge.Profiler = c),
    (Ge.StrictMode = s),
    (Ge.Suspense = v),
    (Ge.isAsyncMode = function (O) {
      return k(O) || w(O) === m;
    }),
    (Ge.isConcurrentMode = k),
    (Ge.isContextConsumer = function (O) {
      return w(O) === p;
    }),
    (Ge.isContextProvider = function (O) {
      return w(O) === f;
    }),
    (Ge.isElement = function (O) {
      return typeof O == "object" && O !== null && O.$$typeof === r;
    }),
    (Ge.isForwardRef = function (O) {
      return w(O) === g;
    }),
    (Ge.isFragment = function (O) {
      return w(O) === o;
    }),
    (Ge.isLazy = function (O) {
      return w(O) === S;
    }),
    (Ge.isMemo = function (O) {
      return w(O) === x;
    }),
    (Ge.isPortal = function (O) {
      return w(O) === l;
    }),
    (Ge.isProfiler = function (O) {
      return w(O) === c;
    }),
    (Ge.isStrictMode = function (O) {
      return w(O) === s;
    }),
    (Ge.isSuspense = function (O) {
      return w(O) === v;
    }),
    (Ge.isValidElementType = function (O) {
      return (
        typeof O == "string" ||
        typeof O == "function" ||
        O === o ||
        O === h ||
        O === c ||
        O === s ||
        O === v ||
        O === A ||
        (typeof O == "object" &&
          O !== null &&
          (O.$$typeof === S ||
            O.$$typeof === x ||
            O.$$typeof === f ||
            O.$$typeof === p ||
            O.$$typeof === g ||
            O.$$typeof === C ||
            O.$$typeof === B ||
            O.$$typeof === D ||
            O.$$typeof === E))
      );
    }),
    (Ge.typeOf = w),
    Ge
  );
}
var v0;
function Q2() {
  return (v0 || ((v0 = 1), (Md.exports = X2())), Md.exports);
}
var Nd, b0;
function Z2() {
  if (b0) return Nd;
  b0 = 1;
  var t = Q2(),
    r = {
      childContextTypes: !0,
      contextType: !0,
      contextTypes: !0,
      defaultProps: !0,
      displayName: !0,
      getDefaultProps: !0,
      getDerivedStateFromError: !0,
      getDerivedStateFromProps: !0,
      mixins: !0,
      propTypes: !0,
      type: !0,
    },
    l = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    o = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
    },
    s = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    c = {};
  ((c[t.ForwardRef] = o), (c[t.Memo] = s));
  function f(S) {
    return t.isMemo(S) ? s : c[S.$$typeof] || r;
  }
  var p = Object.defineProperty,
    m = Object.getOwnPropertyNames,
    h = Object.getOwnPropertySymbols,
    g = Object.getOwnPropertyDescriptor,
    v = Object.getPrototypeOf,
    A = Object.prototype;
  function x(S, E, C) {
    if (typeof E != "string") {
      if (A) {
        var B = v(E);
        B && B !== A && x(S, B, C);
      }
      var D = m(E);
      h && (D = D.concat(h(E)));
      for (var w = f(S), k = f(E), O = 0; O < D.length; ++O) {
        var U = D[O];
        if (!l[U] && !(C && C[U]) && !(k && k[U]) && !(w && w[U])) {
          var I = g(E, U);
          try {
            p(S, U, I);
          } catch {}
        }
      }
    }
    return S;
  }
  return ((Nd = x), Nd);
}
Z2();
var W2 = !0;
function zb(t, r, l) {
  var o = "";
  return (
    l.split(" ").forEach(function (s) {
      t[s] !== void 0 ? r.push(t[s] + ";") : s && (o += s + " ");
    }),
    o
  );
}
var Bp = function (r, l, o) {
    var s = r.key + "-" + l.name;
    (o === !1 || W2 === !1) &&
      r.registered[s] === void 0 &&
      (r.registered[s] = l.styles);
  },
  _p = function (r, l, o) {
    Bp(r, l, o);
    var s = r.key + "-" + l.name;
    if (r.inserted[l.name] === void 0) {
      var c = l;
      do (r.insert(l === c ? "." + s : "", c, r.sheet, !0), (c = c.next));
      while (c !== void 0);
    }
  };
function J2(t) {
  for (var r = 0, l, o = 0, s = t.length; s >= 4; ++o, s -= 4)
    ((l =
      (t.charCodeAt(o) & 255) |
      ((t.charCodeAt(++o) & 255) << 8) |
      ((t.charCodeAt(++o) & 255) << 16) |
      ((t.charCodeAt(++o) & 255) << 24)),
      (l = (l & 65535) * 1540483477 + (((l >>> 16) * 59797) << 16)),
      (l ^= l >>> 24),
      (r =
        ((l & 65535) * 1540483477 + (((l >>> 16) * 59797) << 16)) ^
        ((r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16))));
  switch (s) {
    case 3:
      r ^= (t.charCodeAt(o + 2) & 255) << 16;
    case 2:
      r ^= (t.charCodeAt(o + 1) & 255) << 8;
    case 1:
      ((r ^= t.charCodeAt(o) & 255),
        (r = (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)));
  }
  return (
    (r ^= r >>> 13),
    (r = (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)),
    ((r ^ (r >>> 15)) >>> 0).toString(36)
  );
}
var eC = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    scale: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  tC = /[A-Z]|^ms/g,
  nC = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  kb = function (r) {
    return r.charCodeAt(1) === 45;
  },
  S0 = function (r) {
    return r != null && typeof r != "boolean";
  },
  Bd = _b(function (t) {
    return kb(t) ? t : t.replace(tC, "-$&").toLowerCase();
  }),
  x0 = function (r, l) {
    switch (r) {
      case "animation":
      case "animationName":
        if (typeof l == "string")
          return l.replace(nC, function (o, s, c) {
            return ((rr = { name: s, styles: c, next: rr }), s);
          });
    }
    return eC[r] !== 1 && !kb(r) && typeof l == "number" && l !== 0
      ? l + "px"
      : l;
  };
function Si(t, r, l) {
  if (l == null) return "";
  var o = l;
  if (o.__emotion_styles !== void 0) return o;
  switch (typeof l) {
    case "boolean":
      return "";
    case "object": {
      var s = l;
      if (s.anim === 1)
        return ((rr = { name: s.name, styles: s.styles, next: rr }), s.name);
      var c = l;
      if (c.styles !== void 0) {
        var f = c.next;
        if (f !== void 0)
          for (; f !== void 0;)
            ((rr = { name: f.name, styles: f.styles, next: rr }), (f = f.next));
        var p = c.styles + ";";
        return p;
      }
      return rC(t, r, l);
    }
    case "function": {
      if (t !== void 0) {
        var m = rr,
          h = l(t);
        return ((rr = m), Si(t, r, h));
      }
      break;
    }
  }
  var g = l;
  if (r == null) return g;
  var v = r[g];
  return v !== void 0 ? v : g;
}
function rC(t, r, l) {
  var o = "";
  if (Array.isArray(l))
    for (var s = 0; s < l.length; s++) o += Si(t, r, l[s]) + ";";
  else
    for (var c in l) {
      var f = l[c];
      if (typeof f != "object") {
        var p = f;
        r != null && r[p] !== void 0
          ? (o += c + "{" + r[p] + "}")
          : S0(p) && (o += Bd(c) + ":" + x0(c, p) + ";");
      } else if (
        Array.isArray(f) &&
        typeof f[0] == "string" &&
        (r == null || r[f[0]] === void 0)
      )
        for (var m = 0; m < f.length; m++)
          S0(f[m]) && (o += Bd(c) + ":" + x0(c, f[m]) + ";");
      else {
        var h = Si(t, r, f);
        switch (c) {
          case "animation":
          case "animationName": {
            o += Bd(c) + ":" + h + ";";
            break;
          }
          default:
            o += c + "{" + h + "}";
        }
      }
    }
  return o;
}
var R0 = /label:\s*([^\s;{]+)\s*(;|$)/g,
  rr;
function zi(t, r, l) {
  if (
    t.length === 1 &&
    typeof t[0] == "object" &&
    t[0] !== null &&
    t[0].styles !== void 0
  )
    return t[0];
  var o = !0,
    s = "";
  rr = void 0;
  var c = t[0];
  if (c == null || c.raw === void 0) ((o = !1), (s += Si(l, r, c)));
  else {
    var f = c;
    s += f[0];
  }
  for (var p = 1; p < t.length; p++)
    if (((s += Si(l, r, t[p])), o)) {
      var m = c;
      s += m[p];
    }
  R0.lastIndex = 0;
  for (var h = "", g; (g = R0.exec(s)) !== null;) h += "-" + g[1];
  var v = J2(s) + h;
  return { name: v, styles: s, next: rr };
}
var aC = function (r) {
    return r();
  },
  Ub = Su.useInsertionEffect ? Su.useInsertionEffect : !1,
  Lb = Ub || aC,
  E0 = Ub || b.useLayoutEffect,
  jb = b.createContext(typeof HTMLElement < "u" ? K2({ key: "css" }) : null);
jb.Provider;
var Dp = function (r) {
    return b.forwardRef(function (l, o) {
      var s = b.useContext(jb);
      return r(l, s, o);
    });
  },
  Yu = b.createContext({}),
  zp = {}.hasOwnProperty,
  Wd = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__",
  lC = function (r, l) {
    var o = {};
    for (var s in l) zp.call(l, s) && (o[s] = l[s]);
    return ((o[Wd] = r), o);
  },
  oC = function (r) {
    var l = r.cache,
      o = r.serialized,
      s = r.isStringTag;
    return (
      Bp(l, o, s),
      Lb(function () {
        return _p(l, o, s);
      }),
      null
    );
  },
  iC = Dp(function (t, r, l) {
    var o = t.css;
    typeof o == "string" && r.registered[o] !== void 0 && (o = r.registered[o]);
    var s = t[Wd],
      c = [o],
      f = "";
    typeof t.className == "string"
      ? (f = zb(r.registered, c, t.className))
      : t.className != null && (f = t.className + " ");
    var p = zi(c, void 0, b.useContext(Yu));
    f += r.key + "-" + p.name;
    var m = {};
    for (var h in t) zp.call(t, h) && h !== "css" && h !== Wd && (m[h] = t[h]);
    return (
      (m.className = f),
      l && (m.ref = l),
      b.createElement(
        b.Fragment,
        null,
        b.createElement(oC, {
          cache: r,
          serialized: p,
          isStringTag: typeof s == "string",
        }),
        b.createElement(s, m),
      )
    );
  }),
  sC = iC,
  T0 = function (r, l) {
    var o = arguments;
    if (l == null || !zp.call(l, "css"))
      return b.createElement.apply(void 0, o);
    var s = o.length,
      c = new Array(s);
    ((c[0] = sC), (c[1] = lC(r, l)));
    for (var f = 2; f < s; f++) c[f] = o[f];
    return b.createElement.apply(null, c);
  };
(function (t) {
  var r;
  r || (r = t.JSX || (t.JSX = {}));
})(T0 || (T0 = {}));
var uC = Dp(function (t, r) {
  var l = t.styles,
    o = zi([l], void 0, b.useContext(Yu)),
    s = b.useRef();
  return (
    E0(
      function () {
        var c = r.key + "-global",
          f = new r.sheet.constructor({
            key: c,
            nonce: r.sheet.nonce,
            container: r.sheet.container,
            speedy: r.sheet.isSpeedy,
          }),
          p = !1,
          m = document.querySelector(
            'style[data-emotion="' + c + " " + o.name + '"]',
          );
        return (
          r.sheet.tags.length && (f.before = r.sheet.tags[0]),
          m !== null &&
            ((p = !0), m.setAttribute("data-emotion", c), f.hydrate([m])),
          (s.current = [f, p]),
          function () {
            f.flush();
          }
        );
      },
      [r],
    ),
    E0(
      function () {
        var c = s.current,
          f = c[0],
          p = c[1];
        if (p) {
          c[1] = !1;
          return;
        }
        if ((o.next !== void 0 && _p(r, o.next, !0), f.tags.length)) {
          var m = f.tags[f.tags.length - 1].nextElementSibling;
          ((f.before = m), f.flush());
        }
        r.insert("", o, f, !1);
      },
      [r, o.name],
    ),
    null
  );
});
function xi() {
  for (var t = arguments.length, r = new Array(t), l = 0; l < t; l++)
    r[l] = arguments[l];
  return zi(r);
}
function ki() {
  var t = xi.apply(void 0, arguments),
    r = "animation-" + t.name;
  return {
    name: r,
    styles: "@keyframes " + r + "{" + t.styles + "}",
    anim: 1,
    toString: function () {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    },
  };
}
var cC =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  fC = _b(function (t) {
    return (
      cC.test(t) ||
      (t.charCodeAt(0) === 111 &&
        t.charCodeAt(1) === 110 &&
        t.charCodeAt(2) < 91)
    );
  }),
  dC = fC,
  pC = function (r) {
    return r !== "theme";
  },
  C0 = function (r) {
    return typeof r == "string" && r.charCodeAt(0) > 96 ? dC : pC;
  },
  A0 = function (r, l, o) {
    var s;
    if (l) {
      var c = l.shouldForwardProp;
      s =
        r.__emotion_forwardProp && c
          ? function (f) {
              return r.__emotion_forwardProp(f) && c(f);
            }
          : c;
    }
    return (typeof s != "function" && o && (s = r.__emotion_forwardProp), s);
  },
  hC = function (r) {
    var l = r.cache,
      o = r.serialized,
      s = r.isStringTag;
    return (
      Bp(l, o, s),
      Lb(function () {
        return _p(l, o, s);
      }),
      null
    );
  },
  mC = function t(r, l) {
    var o = r.__emotion_real === r,
      s = (o && r.__emotion_base) || r,
      c,
      f;
    l !== void 0 && ((c = l.label), (f = l.target));
    var p = A0(r, l, o),
      m = p || C0(s),
      h = !m("as");
    return function () {
      var g = arguments,
        v =
          o && r.__emotion_styles !== void 0 ? r.__emotion_styles.slice(0) : [];
      if (
        (c !== void 0 && v.push("label:" + c + ";"),
        g[0] == null || g[0].raw === void 0)
      )
        v.push.apply(v, g);
      else {
        var A = g[0];
        v.push(A[0]);
        for (var x = g.length, S = 1; S < x; S++) v.push(g[S], A[S]);
      }
      var E = Dp(function (C, B, D) {
        var w = (h && C.as) || s,
          k = "",
          O = [],
          U = C;
        if (C.theme == null) {
          U = {};
          for (var I in C) U[I] = C[I];
          U.theme = b.useContext(Yu);
        }
        typeof C.className == "string"
          ? (k = zb(B.registered, O, C.className))
          : C.className != null && (k = C.className + " ");
        var X = zi(v.concat(O), B.registered, U);
        ((k += B.key + "-" + X.name), f !== void 0 && (k += " " + f));
        var le = h && p === void 0 ? C0(w) : m,
          ue = {};
        for (var Z in C) (h && Z === "as") || (le(Z) && (ue[Z] = C[Z]));
        return (
          (ue.className = k),
          D && (ue.ref = D),
          b.createElement(
            b.Fragment,
            null,
            b.createElement(hC, {
              cache: B,
              serialized: X,
              isStringTag: typeof w == "string",
            }),
            b.createElement(w, ue),
          )
        );
      });
      return (
        (E.displayName =
          c !== void 0
            ? c
            : "Styled(" +
              (typeof s == "string"
                ? s
                : s.displayName || s.name || "Component") +
              ")"),
        (E.defaultProps = r.defaultProps),
        (E.__emotion_real = E),
        (E.__emotion_base = s),
        (E.__emotion_styles = v),
        (E.__emotion_forwardProp = p),
        Object.defineProperty(E, "toString", {
          value: function () {
            return "." + f;
          },
        }),
        (E.withComponent = function (C, B) {
          var D = t(C, Xd({}, l, B, { shouldForwardProp: A0(E, B, !0) }));
          return D.apply(void 0, v);
        }),
        E
      );
    };
  },
  gC = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan",
  ],
  Jd = mC.bind(null);
gC.forEach(function (t) {
  Jd[t] = Jd(t);
});
function yC(t) {
  return t == null || Object.keys(t).length === 0;
}
function vC(t) {
  const { styles: r, defaultTheme: l = {} } = t,
    o = typeof r == "function" ? (s) => r(yC(s) ? l : s) : r;
  return q.jsx(uC, { styles: o });
}
function bC(t, r) {
  return Jd(t, r);
}
function SC(t, r) {
  Array.isArray(t.__emotion_styles) &&
    (t.__emotion_styles = r(t.__emotion_styles));
}
const w0 = [];
function ha(t) {
  return ((w0[0] = t), zi(w0));
}
var _d = { exports: {} },
  nt = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var O0;
function xC() {
  if (O0) return nt;
  O0 = 1;
  var t = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.portal"),
    l = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    s = Symbol.for("react.profiler"),
    c = Symbol.for("react.consumer"),
    f = Symbol.for("react.context"),
    p = Symbol.for("react.forward_ref"),
    m = Symbol.for("react.suspense"),
    h = Symbol.for("react.suspense_list"),
    g = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    A = Symbol.for("react.view_transition"),
    x = Symbol.for("react.client.reference");
  function S(E) {
    if (typeof E == "object" && E !== null) {
      var C = E.$$typeof;
      switch (C) {
        case t:
          switch (((E = E.type), E)) {
            case l:
            case s:
            case o:
            case m:
            case h:
            case A:
              return E;
            default:
              switch (((E = E && E.$$typeof), E)) {
                case f:
                case p:
                case v:
                case g:
                  return E;
                case c:
                  return E;
                default:
                  return C;
              }
          }
        case r:
          return C;
      }
    }
  }
  return (
    (nt.ContextConsumer = c),
    (nt.ContextProvider = f),
    (nt.Element = t),
    (nt.ForwardRef = p),
    (nt.Fragment = l),
    (nt.Lazy = v),
    (nt.Memo = g),
    (nt.Portal = r),
    (nt.Profiler = s),
    (nt.StrictMode = o),
    (nt.Suspense = m),
    (nt.SuspenseList = h),
    (nt.isContextConsumer = function (E) {
      return S(E) === c;
    }),
    (nt.isContextProvider = function (E) {
      return S(E) === f;
    }),
    (nt.isElement = function (E) {
      return typeof E == "object" && E !== null && E.$$typeof === t;
    }),
    (nt.isForwardRef = function (E) {
      return S(E) === p;
    }),
    (nt.isFragment = function (E) {
      return S(E) === l;
    }),
    (nt.isLazy = function (E) {
      return S(E) === v;
    }),
    (nt.isMemo = function (E) {
      return S(E) === g;
    }),
    (nt.isPortal = function (E) {
      return S(E) === r;
    }),
    (nt.isProfiler = function (E) {
      return S(E) === s;
    }),
    (nt.isStrictMode = function (E) {
      return S(E) === o;
    }),
    (nt.isSuspense = function (E) {
      return S(E) === m;
    }),
    (nt.isSuspenseList = function (E) {
      return S(E) === h;
    }),
    (nt.isValidElementType = function (E) {
      return (
        typeof E == "string" ||
        typeof E == "function" ||
        E === l ||
        E === s ||
        E === o ||
        E === m ||
        E === h ||
        (typeof E == "object" &&
          E !== null &&
          (E.$$typeof === v ||
            E.$$typeof === g ||
            E.$$typeof === f ||
            E.$$typeof === c ||
            E.$$typeof === p ||
            E.$$typeof === x ||
            E.getModuleId !== void 0))
      );
    }),
    (nt.typeOf = S),
    nt
  );
}
var M0;
function RC() {
  return (M0 || ((M0 = 1), (_d.exports = xC())), _d.exports);
}
var $b = RC();
function zr(t) {
  if (typeof t != "object" || t === null) return !1;
  const r = Object.getPrototypeOf(t);
  return (
    (r === null ||
      r === Object.prototype ||
      Object.getPrototypeOf(r) === null) &&
    !(Symbol.toStringTag in t) &&
    !(Symbol.iterator in t)
  );
}
function Hb(t) {
  if (b.isValidElement(t) || $b.isValidElementType(t) || !zr(t)) return t;
  const r = {};
  return (
    Object.keys(t).forEach((l) => {
      r[l] = Hb(t[l]);
    }),
    r
  );
}
function Kt(t, r, l = { clone: !0 }) {
  const o = l.clone ? { ...t } : t;
  return (
    zr(t) &&
      zr(r) &&
      Object.keys(r).forEach((s) => {
        b.isValidElement(r[s]) || $b.isValidElementType(r[s])
          ? (o[s] = r[s])
          : zr(r[s]) && Object.prototype.hasOwnProperty.call(t, s) && zr(t[s])
            ? (o[s] = Kt(t[s], r[s], l))
            : l.clone
              ? (o[s] = zr(r[s]) ? Hb(r[s]) : r[s])
              : (o[s] = r[s]);
      }),
    o
  );
}
const EC = (t) => {
  const r = Object.keys(t).map((l) => ({ key: l, val: t[l] })) || [];
  return (
    r.sort((l, o) => l.val - o.val),
    r.reduce((l, o) => ({ ...l, [o.key]: o.val }), {})
  );
};
function qb(t) {
  const {
      values: r = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: l = "px",
      step: o = 5,
      ...s
    } = t,
    c = EC(r),
    f = Object.keys(c);
  function p(x) {
    return `@media (min-width:${typeof r[x] == "number" ? r[x] : x}${l})`;
  }
  function m(x) {
    return `@media (max-width:${(typeof r[x] == "number" ? r[x] : x) - o / 100}${l})`;
  }
  function h(x, S) {
    const E = f.indexOf(S);
    return `@media (min-width:${typeof r[x] == "number" ? r[x] : x}${l}) and (max-width:${(E !== -1 && typeof r[f[E]] == "number" ? r[f[E]] : S) - o / 100}${l})`;
  }
  function g(x) {
    return f.indexOf(x) + 1 < f.length ? h(x, f[f.indexOf(x) + 1]) : p(x);
  }
  function v(x) {
    const S = f.indexOf(x);
    return S === 0
      ? p(f[1])
      : S === f.length - 1
        ? m(f[S])
        : h(x, f[f.indexOf(x) + 1]).replace("@media", "@media not all and");
  }
  const A = [];
  for (let x = 0; x < f.length; x += 1) A.push(p(f[x]));
  return {
    keys: f,
    values: c,
    up: p,
    down: m,
    between: h,
    only: g,
    not: v,
    unit: l,
    internal_mediaKeys: A,
    ...s,
  };
}
const N0 = /min-width:\s*([0-9.]+)/;
function B0(t, r) {
  if (!t.containerQueries || !TC(r)) return r;
  const l = [];
  for (const s in r) s.startsWith("@container") && l.push(s);
  l.sort((s, c) => {
    var f, p;
    return (
      +(((f = s.match(N0)) == null ? void 0 : f[1]) || 0) -
      +(((p = c.match(N0)) == null ? void 0 : p[1]) || 0)
    );
  });
  const o = r;
  for (let s = 0; s < l.length; s += 1) {
    const c = l[s],
      f = o[c];
    (delete o[c], (o[c] = f));
  }
  return o;
}
function TC(t) {
  for (const r in t) if (r.startsWith("@container")) return !0;
  return !1;
}
function Pb(t, r) {
  return (
    r === "@" ||
    (r.startsWith("@") &&
      (t.some((l) => r.startsWith(`@${l}`)) || !!r.match(/^@\d/)))
  );
}
function CC(t, r) {
  const l = r.match(/^@([^/]+)?\/?(.+)?$/);
  if (!l) return null;
  const [, o, s] = l,
    c = Number.isNaN(+o) ? o || 0 : +o;
  return t.containerQueries(s).up(c);
}
function AC(t) {
  const r = (c, f) => c.replace("@media", f ? `@container ${f}` : "@container");
  function l(c, f) {
    ((c.up = (...p) => r(t.breakpoints.up(...p), f)),
      (c.down = (...p) => r(t.breakpoints.down(...p), f)),
      (c.between = (...p) => r(t.breakpoints.between(...p), f)),
      (c.only = (...p) => r(t.breakpoints.only(...p), f)),
      (c.not = (...p) => {
        const m = r(t.breakpoints.not(...p), f);
        return m.includes("not all and")
          ? m
              .replace("not all and ", "")
              .replace("min-width:", "width<")
              .replace("max-width:", "width>")
              .replace("and", "or")
          : m;
      }));
  }
  const o = {},
    s = (c) => (l(o, c), o);
  return (l(s), { ...t, containerQueries: s });
}
const wC = { borderRadius: 4 };
function Ib(t) {
  if (t == null) return !0;
  for (const r in t) return !1;
  return !0;
}
function Hl(t, r) {
  const l = Array.isArray(r),
    o = Array.isArray(t);
  return _C(r)
    ? r
    : DC(t)
      ? Fl(r)
      : l && o
        ? NC(t, r)
        : l !== o
          ? Fl(r)
          : zC(t, r);
}
function OC(t) {
  let r = 0;
  const l = t.length,
    o = new Array(l);
  for (r = 0; r < l; r += 1) o[r] = Fl(t[r]);
  return o;
}
function MC(t) {
  const r = {};
  for (const l in t)
    l === "__proto__" ||
      l === "constructor" ||
      l === "prototype" ||
      (r[l] = Fl(t[l]));
  return r;
}
function NC(t, r) {
  const l = t.length;
  for (let o = 0; o < r.length; o += 1) t[l + o] = Fl(r[o]);
  return t;
}
function BC(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    !(t instanceof RegExp) &&
    !(t instanceof Date)
  );
}
function _C(t) {
  return typeof t != "object" || t === null;
}
function DC(t) {
  return (
    typeof t != "object" ||
    t === null ||
    t instanceof RegExp ||
    t instanceof Date
  );
}
function Fl(t) {
  return BC(t) ? (Array.isArray(t) ? OC(t) : MC(t)) : t;
}
function zC(t, r) {
  for (const l in r)
    l === "__proto__" ||
      l === "constructor" ||
      l === "prototype" ||
      (l in t ? (t[l] = Hl(t[l], r[l])) : (t[l] = Fl(r[l])));
  return t;
}
const kC = {},
  Vu = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  Tu = qb({ values: Vu }),
  UC = {
    containerQueries: (t) => ({
      up: (r) => {
        let l = typeof r == "number" ? r : Vu[r] || r;
        return (
          typeof l == "number" && (l = `${l}px`),
          t ? `@container ${t} (min-width:${l})` : `@container (min-width:${l})`
        );
      },
    }),
  };
function ma(t, r, l) {
  const o = {};
  return Gu(o, t.theme, r, (s, c, f) => {
    const p = l(c, f);
    s ? (o[s] = p) : Hl(o, p);
  });
}
function Gu(t, r, l, o) {
  if ((r ?? (r = kC), Array.isArray(l))) {
    const s = r.breakpoints ?? Tu;
    for (let c = 0; c < l.length; c += 1)
      Dd(t, s.up(s.keys[c]), l[c], void 0, o);
    return t;
  }
  if (typeof l == "object") {
    const s = r.breakpoints ?? Tu,
      c = s.values ?? Vu;
    for (const f in l)
      if (Pb(s.keys, f)) {
        const p = CC(r.containerQueries ? r : UC, f);
        p && Dd(t, p, l[f], f, o);
      } else if (f in c) {
        const p = s.up(f);
        Dd(t, p, l[f], f, o);
      } else {
        const p = f;
        t[p] = l[p];
      }
    return t;
  }
  return (o(void 0, l), t);
}
function Dd(t, r, l, o, s) {
  (t[r] ?? (t[r] = {}), s(r, l, o));
}
function Fb(t = Tu) {
  const { internal_mediaKeys: r } = t,
    l = {};
  for (let o = 0; o < r.length; o += 1) l[r[o]] = {};
  return l;
}
function ep(t, r) {
  const l = t.internal_mediaKeys;
  for (let o = 0; o < l.length; o += 1) {
    const s = l[o];
    Ib(r[s]) && delete r[s];
  }
  return r;
}
function LC(t, ...r) {
  const o = [Fb(t), ...r].reduce((s, c) => Kt(s, c), {});
  return ep(t, o);
}
function jC(t, r) {
  if (typeof t != "object") return {};
  const l = {},
    o = Object.keys(r);
  return (
    Array.isArray(t)
      ? o.forEach((s, c) => {
          c < t.length && (l[s] = !0);
        })
      : o.forEach((s) => {
          t[s] != null && (l[s] = !0);
        }),
    l
  );
}
function zd(t) {
  const { values: r, breakpoints: l, base: o } = t,
    s = o || jC(r, l),
    c = Object.keys(s);
  if (c.length === 0) return r;
  let f;
  return c.reduce((p, m, h) => {
    if (Array.isArray(r)) ((p[m] = r[h] != null ? r[h] : r[f]), (f = h));
    else if (typeof r == "object" && r) {
      const g = r;
      ((p[m] = g[m] != null ? g[m] : g[f]), (f = m));
    } else p[m] = r;
    return p;
  }, {});
}
function $C(t, r) {
  if (Array.isArray(r)) return !0;
  if (typeof r == "object" && r !== null) {
    for (let o = 0; o < t.keys.length; o += 1) if (t.keys[o] in r) return !0;
    const l = Object.keys(r);
    for (let o = 0; o < l.length; o += 1) if (Pb(t.keys, l[o])) return !0;
  }
  return !1;
}
function Ae(t) {
  if (typeof t != "string") throw new Error(Lr(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Yb(t, r, l, o) {
  let s;
  return (
    typeof t == "function"
      ? (s = t(l))
      : Array.isArray(t)
        ? (s = t[l] || l)
        : typeof l == "string"
          ? (s = ar(t, l, !0, o) || l)
          : (s = l),
    r && (s = r(s, l, t)),
    s
  );
}
function ar(t, r, l = !0, o = void 0) {
  if (!t || !r) return null;
  const s = r.split(".");
  if (t.vars && l) {
    const c = _0(t.vars, s, o);
    if (c != null) return c;
  }
  return _0(t, s, o);
}
function _0(t, r, l = void 0) {
  let o,
    s = t,
    c = 0;
  for (; c < r.length;) {
    if (s == null) return s;
    ((o = s), (s = s[r[c]]), (c += 1));
  }
  if (l && s === void 0) {
    const f = r[r.length - 1],
      p = `${l}${f === "default" ? "" : Ae(f)}`;
    return o == null ? void 0 : o[p];
  }
  return s;
}
function Rt(t) {
  const { prop: r, cssProperty: l = t.prop, themeKey: o, transform: s } = t,
    c = (f) => {
      if (f[r] == null) return null;
      const p = f[r],
        m = f.theme,
        h = ar(m, o) || {};
      return ma(f, p, (v) => {
        const A = Yb(h, s, v, r);
        return l === !1 ? A : { [l]: A };
      });
    };
  return ((c.propTypes = {}), (c.filterProps = [r]), c);
}
const HC = { internal_cache: {} },
  Cu = { m: "margin", p: "padding" },
  D0 = {
    t: "Top",
    r: "Right",
    b: "Bottom",
    l: "Left",
    x: ["Left", "Right"],
    y: ["Top", "Bottom"],
  },
  z0 = { marginX: "mx", marginY: "my", paddingX: "px", paddingY: "py" },
  Ri = {};
for (const t in Cu) Ri[t] = [Cu[t]];
for (const t in Cu)
  for (const r in D0) {
    const l = Cu[t],
      o = D0[r],
      s = Array.isArray(o) ? o.map((c) => l + c) : [l + o];
    Ri[t + r] = s;
  }
for (const t in z0) Ri[t] = Ri[z0[t]];
const kp = new Set([
    "m",
    "mt",
    "mr",
    "mb",
    "ml",
    "mx",
    "my",
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "marginX",
    "marginY",
    "marginInline",
    "marginInlineStart",
    "marginInlineEnd",
    "marginBlock",
    "marginBlockStart",
    "marginBlockEnd",
  ]),
  Up = new Set([
    "p",
    "pt",
    "pr",
    "pb",
    "pl",
    "px",
    "py",
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "paddingX",
    "paddingY",
    "paddingInline",
    "paddingInlineStart",
    "paddingInlineEnd",
    "paddingBlock",
    "paddingBlockStart",
    "paddingBlockEnd",
  ]);
[...kp, ...Up];
function Ui(t, r, l, o) {
  const s = ar(t, r, !0) ?? l;
  return typeof s == "number" || typeof s == "string"
    ? (c) =>
        typeof c == "string"
          ? c
          : typeof s == "string"
            ? s.startsWith("var(") && c === 0
              ? 0
              : s.startsWith("var(") && c === 1
                ? s
                : `calc(${c} * ${s})`
            : s * c
    : Array.isArray(s)
      ? (c) => {
          if (typeof c == "string") return c;
          const f = Math.abs(c),
            p = s[f];
          return c >= 0
            ? p
            : typeof p == "number"
              ? -p
              : typeof p == "string" && p.startsWith("var(")
                ? `calc(-1 * ${p})`
                : `-${p}`;
        }
      : typeof s == "function"
        ? s
        : () => {};
}
function Ku(t) {
  return Ui(t, "spacing", 8);
}
function Xa(t, r) {
  return typeof r == "string" || r == null ? r : t(r);
}
const k0 = [""];
function Vb(t, r) {
  var c;
  const l = t.theme ?? HC,
    o =
      ((c = l == null ? void 0 : l.internal_cache) == null
        ? void 0
        : c.unarySpacing) ?? Ku(l),
    s = {};
  for (const f in t) {
    if (!r.has(f)) continue;
    const p = Ri[f] ?? ((k0[0] = f), k0),
      m = t[f];
    Gu(s, t.theme, m, (h, g) => {
      const v = h ? s[h] : s;
      for (let A = 0; A < p.length; A += 1) v[p[A]] = Xa(o, g);
    });
  }
  return s;
}
function Lp(t) {
  return Vb(t, kp);
}
Lp.propTypes = {};
Lp.filterProps = kp;
const At = Lp;
function jp(t) {
  return Vb(t, Up);
}
jp.propTypes = {};
jp.filterProps = Up;
const wt = jp;
function Gb(t = 8, r = Ku({ spacing: t })) {
  if (t.mui) return t;
  const l = (...o) =>
    (o.length === 0 ? [1] : o)
      .map((c) => {
        const f = r(c);
        return typeof f == "number" ? `${f}px` : f;
      })
      .join(" ");
  return ((l.mui = !0), l);
}
function Xu(...t) {
  const r = t.reduce(
      (o, s) => (
        s.filterProps.forEach((c) => {
          o[c] = s;
        }),
        o
      ),
      {},
    ),
    l = (o) => {
      const s = {};
      for (const c in o) r[c] && Hl(s, r[c](o));
      return s;
    };
  return (
    (l.propTypes = {}),
    (l.filterProps = t.reduce((o, s) => o.concat(s.filterProps), [])),
    l
  );
}
function Dn(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Un(t, r) {
  return Rt({ prop: t, themeKey: "borders", transform: r });
}
const qC = Un("border", Dn),
  PC = Un("borderTop", Dn),
  IC = Un("borderRight", Dn),
  FC = Un("borderBottom", Dn),
  YC = Un("borderLeft", Dn),
  VC = Un("borderColor"),
  GC = Un("borderTopColor"),
  KC = Un("borderRightColor"),
  XC = Un("borderBottomColor"),
  QC = Un("borderLeftColor"),
  ZC = Un("outline", Dn),
  WC = Un("outlineColor"),
  Qu = (t) => {
    if (t.borderRadius !== void 0 && t.borderRadius !== null) {
      const r = Ui(t.theme, "shape.borderRadius", 4),
        l = (o) => ({ borderRadius: Xa(r, o) });
      return ma(t, t.borderRadius, l);
    }
    return null;
  };
Qu.propTypes = {};
Qu.filterProps = ["borderRadius"];
Xu(qC, PC, IC, FC, YC, VC, GC, KC, XC, QC, Qu, ZC, WC);
const Zu = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const r = Ui(t.theme, "spacing", 8),
      l = (o) => ({ gap: Xa(r, o) });
    return ma(t, t.gap, l);
  }
  return null;
};
Zu.propTypes = {};
Zu.filterProps = ["gap"];
const Wu = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const r = Ui(t.theme, "spacing", 8),
      l = (o) => ({ columnGap: Xa(r, o) });
    return ma(t, t.columnGap, l);
  }
  return null;
};
Wu.propTypes = {};
Wu.filterProps = ["columnGap"];
const Ju = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const r = Ui(t.theme, "spacing", 8),
      l = (o) => ({ rowGap: Xa(r, o) });
    return ma(t, t.rowGap, l);
  }
  return null;
};
Ju.propTypes = {};
Ju.filterProps = ["rowGap"];
const JC = Rt({ prop: "gridColumn" }),
  eA = Rt({ prop: "gridRow" }),
  tA = Rt({ prop: "gridAutoFlow" }),
  nA = Rt({ prop: "gridAutoColumns" }),
  rA = Rt({ prop: "gridAutoRows" }),
  aA = Rt({ prop: "gridTemplateColumns" }),
  lA = Rt({ prop: "gridTemplateRows" }),
  oA = Rt({ prop: "gridTemplateAreas" }),
  iA = Rt({ prop: "gridArea" });
Xu(Zu, Wu, Ju, JC, eA, tA, nA, rA, aA, lA, oA, iA);
function ql(t, r) {
  return r === "grey" ? r : t;
}
const sA = Rt({ prop: "color", themeKey: "palette", transform: ql }),
  uA = Rt({
    prop: "bgcolor",
    cssProperty: "backgroundColor",
    themeKey: "palette",
    transform: ql,
  }),
  cA = Rt({ prop: "backgroundColor", themeKey: "palette", transform: ql });
Xu(sA, uA, cA);
const fA = Vu;
function Sn(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const dA = Rt({ prop: "width", transform: Sn }),
  $p = (t) => {
    if (t.maxWidth !== void 0 && t.maxWidth !== null) {
      const r = (l) => {
        var s, c, f, p, m;
        const o =
          ((f =
            (c = (s = t.theme) == null ? void 0 : s.breakpoints) == null
              ? void 0
              : c.values) == null
            ? void 0
            : f[l]) || fA[l];
        return o
          ? ((m = (p = t.theme) == null ? void 0 : p.breakpoints) == null
              ? void 0
              : m.unit) !== "px"
            ? { maxWidth: `${o}${t.theme.breakpoints.unit}` }
            : { maxWidth: o }
          : { maxWidth: Sn(l) };
      };
      return ma(t, t.maxWidth, r);
    }
    return null;
  };
$p.filterProps = ["maxWidth"];
const pA = Rt({ prop: "minWidth", transform: Sn }),
  hA = Rt({ prop: "height", transform: Sn }),
  mA = Rt({ prop: "maxHeight", transform: Sn }),
  gA = Rt({ prop: "minHeight", transform: Sn });
Rt({ prop: "size", cssProperty: "width", transform: Sn });
Rt({ prop: "size", cssProperty: "height", transform: Sn });
const yA = Rt({ prop: "boxSizing" });
Xu(dA, $p, pA, hA, mA, gA, yA);
const ec = {
    border: { themeKey: "borders", transform: Dn },
    borderTop: { themeKey: "borders", transform: Dn },
    borderRight: { themeKey: "borders", transform: Dn },
    borderBottom: { themeKey: "borders", transform: Dn },
    borderLeft: { themeKey: "borders", transform: Dn },
    borderColor: { themeKey: "palette" },
    borderTopColor: { themeKey: "palette" },
    borderRightColor: { themeKey: "palette" },
    borderBottomColor: { themeKey: "palette" },
    borderLeftColor: { themeKey: "palette" },
    outline: { themeKey: "borders", transform: Dn },
    outlineColor: { themeKey: "palette" },
    borderRadius: { themeKey: "shape.borderRadius", style: Qu },
    color: { themeKey: "palette", transform: ql },
    bgcolor: {
      themeKey: "palette",
      cssProperty: "backgroundColor",
      transform: ql,
    },
    backgroundColor: { themeKey: "palette", transform: ql },
    p: { style: wt },
    pt: { style: wt },
    pr: { style: wt },
    pb: { style: wt },
    pl: { style: wt },
    px: { style: wt },
    py: { style: wt },
    padding: { style: wt },
    paddingTop: { style: wt },
    paddingRight: { style: wt },
    paddingBottom: { style: wt },
    paddingLeft: { style: wt },
    paddingX: { style: wt },
    paddingY: { style: wt },
    paddingInline: { style: wt },
    paddingInlineStart: { style: wt },
    paddingInlineEnd: { style: wt },
    paddingBlock: { style: wt },
    paddingBlockStart: { style: wt },
    paddingBlockEnd: { style: wt },
    m: { style: At },
    mt: { style: At },
    mr: { style: At },
    mb: { style: At },
    ml: { style: At },
    mx: { style: At },
    my: { style: At },
    margin: { style: At },
    marginTop: { style: At },
    marginRight: { style: At },
    marginBottom: { style: At },
    marginLeft: { style: At },
    marginX: { style: At },
    marginY: { style: At },
    marginInline: { style: At },
    marginInlineStart: { style: At },
    marginInlineEnd: { style: At },
    marginBlock: { style: At },
    marginBlockStart: { style: At },
    marginBlockEnd: { style: At },
    displayPrint: {
      cssProperty: !1,
      transform: (t) => ({ "@media print": { display: t } }),
    },
    display: {},
    overflow: {},
    textOverflow: {},
    visibility: {},
    whiteSpace: {},
    flexBasis: {},
    flexDirection: {},
    flexWrap: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    order: {},
    flex: {},
    flexGrow: {},
    flexShrink: {},
    alignSelf: {},
    justifyItems: {},
    justifySelf: {},
    gap: { style: Zu },
    rowGap: { style: Ju },
    columnGap: { style: Wu },
    gridColumn: {},
    gridRow: {},
    gridAutoFlow: {},
    gridAutoColumns: {},
    gridAutoRows: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {},
    gridArea: {},
    position: {},
    zIndex: { themeKey: "zIndex" },
    top: {},
    right: {},
    bottom: {},
    left: {},
    boxShadow: { themeKey: "shadows" },
    width: { transform: Sn },
    maxWidth: { style: $p },
    minWidth: { transform: Sn },
    height: { transform: Sn },
    maxHeight: { transform: Sn },
    minHeight: { transform: Sn },
    boxSizing: {},
    font: { themeKey: "font" },
    fontFamily: { themeKey: "typography" },
    fontSize: { themeKey: "typography" },
    fontStyle: { themeKey: "typography" },
    fontWeight: { themeKey: "typography" },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: { cssProperty: !1, themeKey: "typography" },
  },
  vA = {};
function bA() {
  function t(r) {
    if (!r.sx) return null;
    const { sx: l, theme: o = vA, nested: s } = r,
      c = o.unstable_sxConfig ?? ec,
      f = { sx: null, theme: o, nested: !0 };
    function p(m) {
      let h = m;
      if (typeof m == "function") h = m(o);
      else if (typeof m != "object") return m;
      if (!h) return null;
      const g = o.breakpoints ?? Tu,
        v = Fb(g);
      for (const A in h) {
        const x = SA(h[A], o);
        if (x != null) {
          if (typeof x != "object") {
            U0(v, A, x, o, c);
            continue;
          }
          if (c[A]) {
            U0(v, A, x, o, c);
            continue;
          }
          $C(g, x)
            ? Gu(v, r.theme, x, (S, E) => {
                v[S][A] = E;
              })
            : ((f.sx = x), (v[A] = t(f)));
        }
      }
      return !s && o.modularCssLayers
        ? { "@layer sx": B0(o, ep(g, v)) }
        : B0(o, ep(g, v));
    }
    return Array.isArray(l) ? l.map(p) : p(l);
  }
  return ((t.filterProps = ["sx"]), t);
}
const Ei = bA();
function U0(t, r, l, o, s) {
  const c = s[r];
  if (!c) {
    t[r] = l;
    return;
  }
  if (l == null) return;
  const { themeKey: f } = c;
  if (f === "typography" && l === "inherit") {
    t[r] = l;
    return;
  }
  const { style: p } = c;
  if (p) {
    Hl(t, p({ [r]: l, theme: o }));
    return;
  }
  const { cssProperty: m = r, transform: h } = c,
    g = ar(o, f);
  Gu(t, o, l, (v, A) => {
    const x = Yb(g, h, A, r);
    m === !1 ? Hl(v ? t[v] : t, x) : v ? (t[v][m] = x) : (t[m] = x);
  });
}
function SA(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function xA(t, r) {
  var o;
  const l = this;
  if (l.vars) {
    if (
      !((o = l.colorSchemes) != null && o[t]) ||
      typeof l.getColorSchemeSelector != "function"
    )
      return {};
    let s = l.getColorSchemeSelector(t);
    return s === "&"
      ? r
      : ((s.includes("data-") || s.includes(".")) &&
          (s = `*:where(${s.replace(/\s*&$/, "")}) &`),
        { [s]: r });
  }
  return l.palette.mode === t ? r : {};
}
function Li(t = {}, ...r) {
  const {
      breakpoints: l = {},
      palette: o = {},
      spacing: s,
      shape: c = {},
      ...f
    } = t,
    p = qb(l),
    m = Gb(s);
  let h = Kt(
    {
      breakpoints: p,
      direction: "ltr",
      components: {},
      palette: { mode: "light", ...o },
      spacing: m,
      shape: { ...wC, ...c },
    },
    f,
  );
  return (
    (h = AC(h)),
    (h.applyStyles = xA),
    (h = r.reduce((g, v) => Kt(g, v), h)),
    (h.unstable_sxConfig = {
      ...ec,
      ...(f == null ? void 0 : f.unstable_sxConfig),
    }),
    (h.unstable_sx = function (v) {
      return Ei({ sx: v, theme: this });
    }),
    (h.internal_cache = {}),
    h
  );
}
function RA(t) {
  return Object.keys(t).length === 0;
}
function EA(t = null) {
  const r = b.useContext(Yu);
  return !r || RA(r) ? t : r;
}
const TA = Li();
function Hp(t = TA) {
  return EA(t);
}
function kd(t) {
  const r = ha(t);
  return t !== r && r.styles
    ? (r.styles.match(/^@layer\s+[^{]*$/) ||
        (r.styles = `@layer global{${r.styles}}`),
      r)
    : t;
}
function CA({ styles: t, themeId: r, defaultTheme: l = {} }) {
  const o = Hp(l),
    s = (r && o[r]) || o;
  let c = typeof t == "function" ? t(s) : t;
  return (
    s.modularCssLayers &&
      (Array.isArray(c)
        ? (c = c.map((f) => kd(typeof f == "function" ? f(s) : f)))
        : (c = kd(c))),
    q.jsx(vC, { styles: c })
  );
}
const L0 = (t) => t,
  AA = () => {
    let t = L0;
    return {
      configure(r) {
        t = r;
      },
      generate(r) {
        return t(r);
      },
      reset() {
        t = L0;
      },
    };
  },
  wA = AA();
function Kb(t) {
  var r,
    l,
    o = "";
  if (typeof t == "string" || typeof t == "number") o += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var s = t.length;
      for (r = 0; r < s; r++)
        t[r] && (l = Kb(t[r])) && (o && (o += " "), (o += l));
    } else for (l in t) t[l] && (o && (o += " "), (o += l));
  return o;
}
function Te() {
  for (var t, r, l = 0, o = "", s = arguments.length; l < s; l++)
    (t = arguments[l]) && (r = Kb(t)) && (o && (o += " "), (o += r));
  return o;
}
const OA = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected",
};
function $e(t, r, l = "Mui") {
  const o = OA[r];
  return o ? `${l}-${o}` : `${wA.generate(t)}-${r}`;
}
function Ke(t, r, l = "Mui") {
  const o = {};
  return (
    r.forEach((s) => {
      o[s] = $e(t, s, l);
    }),
    o
  );
}
function Xb(t) {
  const { variants: r, ...l } = t,
    o = { variants: r, style: ha(l), isProcessed: !0 };
  return (
    o.style === l ||
      (r &&
        r.forEach((s) => {
          typeof s.style != "function" && (s.style = ha(s.style));
        })),
    o
  );
}
const MA = Li();
function Ud(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
function Va(t, r) {
  return (
    r &&
      t &&
      typeof t == "object" &&
      t.styles &&
      !t.styles.startsWith("@layer") &&
      (t.styles = `@layer ${r}{${String(t.styles)}}`),
    t
  );
}
function NA(t) {
  return t ? (r, l) => l[t] : null;
}
function BA(t, r, l) {
  t.theme = Ib(t.theme) ? l : t.theme[r] || t.theme;
}
function yu(t, r, l) {
  const o = typeof r == "function" ? r(t) : r;
  if (Array.isArray(o)) return o.flatMap((s) => yu(t, s, l));
  if (Array.isArray(o == null ? void 0 : o.variants)) {
    let s;
    if (o.isProcessed) s = l ? Va(o.style, l) : o.style;
    else {
      const { variants: c, ...f } = o;
      s = l ? Va(ha(f), l) : f;
    }
    return Qb(t, o.variants, [s], l);
  }
  return o != null && o.isProcessed
    ? l
      ? Va(ha(o.style), l)
      : o.style
    : l
      ? Va(ha(o), l)
      : o;
}
function Qb(t, r, l = [], o = void 0) {
  var c;
  let s;
  e: for (let f = 0; f < r.length; f += 1) {
    const p = r[f];
    if (typeof p.props == "function") {
      if (
        (s ?? (s = { ...t, ...t.ownerState, ownerState: t.ownerState }),
        !p.props(s))
      )
        continue;
    } else
      for (const m in p.props)
        if (
          t[m] !== p.props[m] &&
          ((c = t.ownerState) == null ? void 0 : c[m]) !== p.props[m]
        )
          continue e;
    typeof p.style == "function"
      ? (s ?? (s = { ...t, ...t.ownerState, ownerState: t.ownerState }),
        l.push(o ? Va(ha(p.style(s)), o) : p.style(s)))
      : l.push(o ? Va(ha(p.style), o) : p.style);
  }
  return l;
}
function Zb(t = {}) {
  const {
    themeId: r,
    defaultTheme: l = MA,
    rootShouldForwardProp: o = Ud,
    slotShouldForwardProp: s = Ud,
  } = t;
  function c(p) {
    BA(p, r, l);
  }
  return (p, m = {}) => {
    SC(p, (U) => U.filter((I) => I !== Ei));
    const {
        name: h,
        slot: g,
        skipVariantsResolver: v,
        skipSx: A,
        overridesResolver: x = NA(zA(g)),
        ...S
      } = m,
      E = (h && h.startsWith("Mui")) || g ? "components" : "custom",
      C = v !== void 0 ? v : (g && g !== "Root" && g !== "root") || !1,
      B = A || !1;
    let D = Ud;
    g === "Root" || g === "root"
      ? (D = o)
      : g
        ? (D = s)
        : DA(p) && (D = void 0);
    const w = bC(p, { shouldForwardProp: D, label: _A(), ...S }),
      k = (U) => {
        if (U.__emotion_real === U) return U;
        if (typeof U == "function")
          return function (X) {
            return yu(X, U, X.theme.modularCssLayers ? E : void 0);
          };
        if (zr(U)) {
          const I = Xb(U);
          return function (le) {
            return I.variants
              ? yu(le, I, le.theme.modularCssLayers ? E : void 0)
              : le.theme.modularCssLayers
                ? Va(I.style, E)
                : I.style;
          };
        }
        return U;
      },
      O = (...U) => {
        const I = [],
          X = U.map(k),
          le = [];
        if (
          (I.push(c),
          h &&
            x &&
            le.push(function (F) {
              var $, W;
              const z =
                (W = ($ = F.theme.components) == null ? void 0 : $[h]) == null
                  ? void 0
                  : W.styleOverrides;
              if (!z) return null;
              const M = {};
              for (const se in z)
                M[se] = yu(
                  F,
                  z[se],
                  F.theme.modularCssLayers ? "theme" : void 0,
                );
              return x(F, M);
            }),
          h &&
            !C &&
            le.push(function (F) {
              var M, $;
              const L = F.theme,
                z =
                  ($ =
                    (M = L == null ? void 0 : L.components) == null
                      ? void 0
                      : M[h]) == null
                    ? void 0
                    : $.variants;
              return z
                ? Qb(F, z, [], F.theme.modularCssLayers ? "theme" : void 0)
                : null;
            }),
          B || le.push(Ei),
          Array.isArray(X[0]))
        ) {
          const R = X.shift(),
            F = new Array(I.length).fill(""),
            L = new Array(le.length).fill("");
          let z;
          ((z = [...F, ...R, ...L]),
            (z.raw = [...F, ...R.raw, ...L]),
            I.unshift(z));
        }
        const ue = [...I, ...X, ...le],
          Z = w(...ue);
        return (p.muiName && (Z.muiName = p.muiName), Z);
      };
    return (w.withConfig && (O.withConfig = w.withConfig), O);
  };
}
function _A(t, r) {
  return void 0;
}
function DA(t) {
  return typeof t == "string" && t.charCodeAt(0) > 96;
}
function zA(t) {
  return t && t.charAt(0).toLowerCase() + t.slice(1);
}
const Wb = Zb();
function Ti(t, r, l = !1) {
  const o = { ...r };
  for (const s in t)
    if (Object.prototype.hasOwnProperty.call(t, s)) {
      const c = s;
      if (c === "components" || c === "slots") o[c] = { ...t[c], ...o[c] };
      else if (c === "componentsProps" || c === "slotProps") {
        const f = t[c],
          p = r[c];
        if (!p) o[c] = f || {};
        else if (!f) o[c] = p;
        else {
          o[c] = { ...p };
          for (const m in f)
            if (Object.prototype.hasOwnProperty.call(f, m)) {
              const h = m;
              o[c][h] = Ti(f[h], p[h], l);
            }
        }
      } else
        c === "className" && l && r.className !== void 0
          ? (o.className = Te(
              t == null ? void 0 : t.className,
              r == null ? void 0 : r.className,
            ))
          : c === "style" && l && r.style
            ? (o.style = {
                ...(t == null ? void 0 : t.style),
                ...(r == null ? void 0 : r.style),
              })
            : o[c] === void 0 && (o[c] = t[c]);
    }
  return o;
}
function kA(t) {
  const { theme: r, name: l, props: o } = t;
  return !r ||
    !r.components ||
    !r.components[l] ||
    !r.components[l].defaultProps
    ? o
    : Ti(r.components[l].defaultProps, o);
}
function Jb(t) {
  const { props: r, name: l, defaultTheme: o, themeId: s } = t;
  let c = Hp(o);
  return (s && (c = c[s] || c), kA({ theme: c, name: l, props: r }));
}
const nn = typeof window < "u" ? b.useLayoutEffect : b.useEffect;
function UA(t, r = Number.MIN_SAFE_INTEGER, l = Number.MAX_SAFE_INTEGER) {
  return Math.max(r, Math.min(t, l));
}
function qp(t, r = 0, l = 1) {
  return UA(t, r, l);
}
function LA(t) {
  t = t.slice(1);
  const r = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let l = t.match(r);
  return (
    l && l[0].length === 1 && (l = l.map((o) => o + o)),
    l
      ? `rgb${l.length === 4 ? "a" : ""}(${l.map((o, s) => (s < 3 ? parseInt(o, 16) : Math.round((parseInt(o, 16) / 255) * 1e3) / 1e3)).join(", ")})`
      : ""
  );
}
function ga(t) {
  if (t.type) return t;
  if (t.charAt(0) === "#") return ga(LA(t));
  const r = t.indexOf("("),
    l = t.substring(0, r);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(l))
    throw new Error(Lr(9, t));
  let o = t.substring(r + 1, t.length - 1),
    s;
  if (l === "color") {
    if (
      ((o = o.split(" ")),
      (s = o.shift()),
      o.length === 4 && o[3].charAt(0) === "/" && (o[3] = o[3].slice(1)),
      !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(
        s,
      ))
    )
      throw new Error(Lr(10, s));
  } else o = o.split(",");
  return (
    (o = o.map((c) => parseFloat(c))),
    { type: l, values: o, colorSpace: s }
  );
}
const jA = (t) => {
    const r = ga(t);
    return r.values
      .slice(0, 3)
      .map((l, o) => (r.type.includes("hsl") && o !== 0 ? `${l}%` : l))
      .join(" ");
  },
  ii = (t, r) => {
    try {
      return jA(t);
    } catch {
      return t;
    }
  };
function tc(t) {
  const { type: r, colorSpace: l } = t;
  let { values: o } = t;
  return (
    r.includes("rgb")
      ? (o = o.map((s, c) => (c < 3 ? parseInt(s, 10) : s)))
      : r.includes("hsl") && ((o[1] = `${o[1]}%`), (o[2] = `${o[2]}%`)),
    r.includes("color") ? (o = `${l} ${o.join(" ")}`) : (o = `${o.join(", ")}`),
    `${r}(${o})`
  );
}
function e1(t) {
  t = ga(t);
  const { values: r } = t,
    l = r[0],
    o = r[1] / 100,
    s = r[2] / 100,
    c = o * Math.min(s, 1 - s),
    f = (h, g = (h + l / 30) % 12) =>
      s - c * Math.max(Math.min(g - 3, 9 - g, 1), -1);
  let p = "rgb";
  const m = [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];
  return (
    t.type === "hsla" && ((p += "a"), m.push(r[3])),
    tc({ type: p, values: m })
  );
}
function tp(t) {
  t = ga(t);
  let r = t.type === "hsl" || t.type === "hsla" ? ga(e1(t)).values : t.values;
  return (
    (r = r.map(
      (l) => (
        t.type !== "color" && (l /= 255),
        l <= 0.03928 ? l / 12.92 : ((l + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3))
  );
}
function $A(t, r) {
  const l = tp(t),
    o = tp(r);
  return (Math.max(l, o) + 0.05) / (Math.min(l, o) + 0.05);
}
function Ci(t, r) {
  return (
    (t = ga(t)),
    (r = qp(r)),
    (t.type === "rgb" || t.type === "hsl") && (t.type += "a"),
    t.type === "color" ? (t.values[3] = `/${r}`) : (t.values[3] = r),
    tc(t)
  );
}
function Ha(t, r, l) {
  try {
    return Ci(t, r);
  } catch {
    return t;
  }
}
function nc(t, r) {
  if (((t = ga(t)), (r = qp(r)), t.type.includes("hsl"))) t.values[2] *= 1 - r;
  else if (t.type.includes("rgb") || t.type.includes("color"))
    for (let l = 0; l < 3; l += 1) t.values[l] *= 1 - r;
  return tc(t);
}
function Ze(t, r, l) {
  try {
    return nc(t, r);
  } catch {
    return t;
  }
}
function rc(t, r) {
  if (((t = ga(t)), (r = qp(r)), t.type.includes("hsl")))
    t.values[2] += (100 - t.values[2]) * r;
  else if (t.type.includes("rgb"))
    for (let l = 0; l < 3; l += 1) t.values[l] += (255 - t.values[l]) * r;
  else if (t.type.includes("color"))
    for (let l = 0; l < 3; l += 1) t.values[l] += (1 - t.values[l]) * r;
  return tc(t);
}
function We(t, r, l) {
  try {
    return rc(t, r);
  } catch {
    return t;
  }
}
function HA(t, r = 0.15) {
  return tp(t) > 0.5 ? nc(t, r) : rc(t, r);
}
function nu(t, r, l) {
  try {
    return HA(t, r);
  } catch {
    return t;
  }
}
const qA = b.createContext(),
  PA = () => b.useContext(qA) ?? !1,
  IA = b.createContext(void 0);
function FA(t) {
  const { theme: r, name: l, props: o } = t;
  if (!r || !r.components || !r.components[l]) return o;
  const s = r.components[l];
  return s.defaultProps
    ? Ti(s.defaultProps, o, r.components.mergeClassNameAndStyle)
    : !s.styleOverrides && !s.variants
      ? Ti(s, o, r.components.mergeClassNameAndStyle)
      : o;
}
function YA({ props: t, name: r }) {
  const l = b.useContext(IA);
  return FA({ props: t, name: r, theme: { components: l } });
}
let j0 = 0;
function VA(t) {
  const [r, l] = b.useState(t),
    o = t || r;
  return (
    b.useEffect(() => {
      r == null && ((j0 += 1), l(`mui-${j0}`));
    }, [r]),
    o
  );
}
const GA = { ...Su },
  $0 = GA.useId;
function Ai(t) {
  if ($0 !== void 0) {
    const r = $0();
    return t ?? r;
  }
  return VA(t);
}
const H0 = { theme: void 0 };
function KA(t) {
  let r, l;
  return function (s) {
    let c = r;
    return (
      (c === void 0 || s.theme !== l) &&
        ((H0.theme = s.theme), (c = Xb(t(H0))), (r = c), (l = s.theme)),
      c
    );
  };
}
function XA(t = "") {
  function r(...o) {
    if (!o.length) return "";
    const s = o[0];
    return typeof s == "string" &&
      !s.match(
        /(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/,
      )
      ? `, var(--${t ? `${t}-` : ""}${s}${r(...o.slice(1))})`
      : `, ${s}`;
  }
  return (o, ...s) => `var(--${t ? `${t}-` : ""}${o}${r(...s)})`;
}
const q0 = (t, r, l, o = []) => {
    let s = t;
    r.forEach((c, f) => {
      f === r.length - 1
        ? Array.isArray(s)
          ? (s[Number(c)] = l)
          : s && typeof s == "object" && (s[c] = l)
        : s &&
          typeof s == "object" &&
          (s[c] || (s[c] = o.includes(c) ? [] : {}), (s = s[c]));
    });
  },
  QA = (t, r, l) => {
    function o(s, c = [], f = []) {
      Object.entries(s).forEach(([p, m]) => {
        (!l || (l && !l([...c, p]))) &&
          m != null &&
          (typeof m == "object" && Object.keys(m).length > 0
            ? o(m, [...c, p], Array.isArray(m) ? [...f, p] : f)
            : r([...c, p], m, f));
      });
    }
    o(t);
  },
  ZA = (t, r) =>
    typeof r == "number"
      ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((o) =>
          t.includes(o),
        ) || t[t.length - 1].toLowerCase().includes("opacity")
        ? r
        : `${r}px`
      : r;
function Ld(t, r) {
  const { prefix: l, shouldSkipGeneratingVar: o } = r || {},
    s = {},
    c = {},
    f = {};
  return (
    QA(
      t,
      (p, m, h) => {
        if (
          (typeof m == "string" || typeof m == "number") &&
          (!o || !o(p, m))
        ) {
          const g = `--${l ? `${l}-` : ""}${p.join("-")}`,
            v = ZA(p, m);
          (Object.assign(s, { [g]: v }),
            q0(c, p, `var(${g})`, h),
            q0(f, p, `var(${g}, ${v})`, h));
        }
      },
      (p) => p[0] === "vars",
    ),
    { css: s, vars: c, varsWithDefaults: f }
  );
}
function WA(t, r = {}) {
  const {
      getSelector: l = B,
      disableCssColorScheme: o,
      colorSchemeSelector: s,
      enableContrastVars: c,
    } = r,
    {
      colorSchemes: f = {},
      components: p,
      defaultColorScheme: m = "light",
      ...h
    } = t,
    { vars: g, css: v, varsWithDefaults: A } = Ld(h, r);
  let x = A;
  const S = {},
    { [m]: E, ...C } = f;
  if (
    (Object.entries(C || {}).forEach(([k, O]) => {
      const { vars: U, css: I, varsWithDefaults: X } = Ld(O, r);
      ((x = Kt(x, X)), (S[k] = { css: I, vars: U }));
    }),
    E)
  ) {
    const { css: k, vars: O, varsWithDefaults: U } = Ld(E, r);
    ((x = Kt(x, U)), (S[m] = { css: k, vars: O }));
  }
  function B(k, O) {
    var I, X;
    let U = s;
    if (
      (s === "class" && (U = ".%s"),
      s === "data" && (U = "[data-%s]"),
      s != null &&
        s.startsWith("data-") &&
        !s.includes("%s") &&
        (U = `[${s}="%s"]`),
      k)
    ) {
      if (U === "media")
        return t.defaultColorScheme === k
          ? ":root"
          : {
              [`@media (prefers-color-scheme: ${((X = (I = f[k]) == null ? void 0 : I.palette) == null ? void 0 : X.mode) || k})`]:
                { ":root": O },
            };
      if (U)
        return t.defaultColorScheme === k
          ? `:root, ${U.replace("%s", String(k))}`
          : U.replace("%s", String(k));
    }
    return ":root";
  }
  return {
    vars: x,
    generateThemeVars: () => {
      let k = { ...g };
      return (
        Object.entries(S).forEach(([, { vars: O }]) => {
          k = Kt(k, O);
        }),
        k
      );
    },
    generateStyleSheets: () => {
      var le, ue;
      const k = [],
        O = t.defaultColorScheme || "light";
      function U(Z, R) {
        Object.keys(R).length &&
          k.push(typeof Z == "string" ? { [Z]: { ...R } } : Z);
      }
      U(l(void 0, { ...v }), v);
      const { [O]: I, ...X } = S;
      if (I) {
        const { css: Z } = I,
          R =
            (ue = (le = f[O]) == null ? void 0 : le.palette) == null
              ? void 0
              : ue.mode,
          F = !o && R ? { colorScheme: R, ...Z } : { ...Z };
        U(l(O, { ...F }), F);
      }
      return (
        Object.entries(X).forEach(([Z, { css: R }]) => {
          var z, M;
          const F =
              (M = (z = f[Z]) == null ? void 0 : z.palette) == null
                ? void 0
                : M.mode,
            L = !o && F ? { colorScheme: F, ...R } : { ...R };
          U(l(Z, { ...L }), L);
        }),
        c &&
          k.push({
            ":root": {
              "--__l-threshold": "0.7",
              "--__l":
                "clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)",
              "--__a":
                "clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)",
            },
          }),
        k
      );
    },
  };
}
function JA(t) {
  return function (l) {
    return t === "media"
      ? `@media (prefers-color-scheme: ${l})`
      : t
        ? t.startsWith("data-") && !t.includes("%s")
          ? `[${t}="${l}"] &`
          : t === "class"
            ? `.${l} &`
            : t === "data"
              ? `[data-${l}] &`
              : `${t.replace("%s", l)} &`
        : "&";
  };
}
function He(t, r, l = void 0) {
  const o = {};
  for (const s in t) {
    const c = t[s];
    let f = "",
      p = !0;
    for (let m = 0; m < c.length; m += 1) {
      const h = c[m];
      h &&
        ((f += (p === !0 ? "" : " ") + r(h)),
        (p = !1),
        l && l[h] && (f += " " + l[h]));
    }
    o[s] = f;
  }
  return o;
}
const ew = Li(),
  tw = Wb("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        r[`maxWidth${Ae(String(l.maxWidth))}`],
        l.fixed && r.fixed,
        l.disableGutters && r.disableGutters,
      ];
    },
  }),
  nw = (t) => Jb({ props: t, name: "MuiContainer", defaultTheme: ew }),
  rw = (t, r) => {
    const l = (m) => $e(r, m),
      { classes: o, fixed: s, disableGutters: c, maxWidth: f } = t,
      p = {
        root: [
          "root",
          f && `maxWidth${Ae(String(f))}`,
          s && "fixed",
          c && "disableGutters",
        ],
      };
    return He(p, l, o);
  };
function aw(t = {}) {
  const {
      createStyledComponent: r = tw,
      useThemeProps: l = nw,
      componentName: o = "MuiContainer",
    } = t,
    s = r(
      ({ theme: f, ownerState: p }) => ({
        width: "100%",
        marginLeft: "auto",
        boxSizing: "border-box",
        marginRight: "auto",
        ...(!p.disableGutters && {
          paddingLeft: f.spacing(2),
          paddingRight: f.spacing(2),
          [f.breakpoints.up("sm")]: {
            paddingLeft: f.spacing(3),
            paddingRight: f.spacing(3),
          },
        }),
      }),
      ({ theme: f, ownerState: p }) =>
        p.fixed &&
        Object.keys(f.breakpoints.values).reduce((m, h) => {
          const g = h,
            v = f.breakpoints.values[g];
          return (
            v !== 0 &&
              (m[f.breakpoints.up(g)] = {
                maxWidth: `${v}${f.breakpoints.unit}`,
              }),
            m
          );
        }, {}),
      ({ theme: f, ownerState: p }) => ({
        ...(p.maxWidth === "xs" && {
          [f.breakpoints.up("xs")]: {
            maxWidth: Math.max(f.breakpoints.values.xs, 444),
          },
        }),
        ...(p.maxWidth &&
          p.maxWidth !== "xs" && {
            [f.breakpoints.up(p.maxWidth)]: {
              maxWidth: `${f.breakpoints.values[p.maxWidth]}${f.breakpoints.unit}`,
            },
          }),
      }),
    );
  return b.forwardRef(function (p, m) {
    const h = l(p),
      {
        className: g,
        component: v = "div",
        disableGutters: A = !1,
        fixed: x = !1,
        maxWidth: S = "lg",
        classes: E,
        ...C
      } = h,
      B = { ...h, component: v, disableGutters: A, fixed: x, maxWidth: S },
      D = rw(B, o);
    return q.jsx(s, {
      as: v,
      ownerState: B,
      className: Te(D.root, g),
      ref: m,
      ...C,
    });
  });
}
function jd(t, r) {
  var l, o, s;
  return (
    b.isValidElement(t) &&
    r.indexOf(
      t.type.muiName ??
        ((s =
          (o = (l = t.type) == null ? void 0 : l._payload) == null
            ? void 0
            : o.value) == null
          ? void 0
          : s.muiName),
    ) !== -1
  );
}
const lw = Li(),
  ow = Wb("div", { name: "MuiStack", slot: "Root" });
function iw(t) {
  return Jb({ props: t, name: "MuiStack", defaultTheme: lw });
}
function sw(t, r) {
  const l = b.Children.toArray(t).filter(Boolean);
  return l.reduce(
    (o, s, c) => (
      o.push(s),
      c < l.length - 1 && o.push(b.cloneElement(r, { key: `separator-${c}` })),
      o
    ),
    [],
  );
}
const uw = (t) =>
    ({
      row: "Left",
      "row-reverse": "Right",
      column: "Top",
      "column-reverse": "Bottom",
    })[t],
  cw = ({ ownerState: t, theme: r }) => {
    let l = {
      display: "flex",
      flexDirection: "column",
      ...ma(
        { theme: r },
        zd({ values: t.direction, breakpoints: r.breakpoints.values }),
        (o) => ({ flexDirection: o }),
      ),
    };
    if (t.spacing) {
      const o = Ku(r),
        s = Object.keys(r.breakpoints.values).reduce(
          (m, h) => (
            ((typeof t.spacing == "object" && t.spacing[h] != null) ||
              (typeof t.direction == "object" && t.direction[h] != null)) &&
              (m[h] = !0),
            m
          ),
          {},
        ),
        c = zd({ values: t.direction, base: s }),
        f = zd({ values: t.spacing, base: s });
      (typeof c == "object" &&
        Object.keys(c).forEach((m, h, g) => {
          if (!c[m]) {
            const A = h > 0 ? c[g[h - 1]] : "column";
            c[m] = A;
          }
        }),
        (l = Kt(
          l,
          ma({ theme: r }, f, (m, h) =>
            t.useFlexGap
              ? { gap: Xa(o, m) }
              : {
                  "& > :not(style):not(style)": { margin: 0 },
                  "& > :not(style) ~ :not(style)": {
                    [`margin${uw(h ? c[h] : t.direction)}`]: Xa(o, m),
                  },
                },
          ),
        )));
    }
    return ((l = LC(r.breakpoints, l)), l);
  };
function fw(t = {}) {
  const {
      createStyledComponent: r = ow,
      useThemeProps: l = iw,
      componentName: o = "MuiStack",
    } = t,
    s = () => He({ root: ["root"] }, (m) => $e(o, m), {}),
    c = r(cw);
  return b.forwardRef(function (m, h) {
    const g = l(m),
      {
        component: v = "div",
        direction: A = "column",
        spacing: x = 0,
        divider: S,
        children: E,
        className: C,
        useFlexGap: B = !1,
        ...D
      } = g,
      w = { direction: A, spacing: x, useFlexGap: B },
      k = s();
    return q.jsx(c, {
      as: v,
      ownerState: w,
      ref: h,
      className: Te(k.root, C),
      ...D,
      children: S ? sw(E, S) : E,
    });
  });
}
function t1() {
  return {
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: { paper: yi.white, default: yi.white },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  };
}
const n1 = t1();
function r1() {
  return {
    text: {
      primary: yi.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: { paper: "#121212", default: "#121212" },
    action: {
      active: yi.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  };
}
const np = r1();
function P0(t, r, l, o) {
  const s = o.light || o,
    c = o.dark || o * 1.5;
  t[r] ||
    (t.hasOwnProperty(l)
      ? (t[r] = t[l])
      : r === "light"
        ? (t.light = rc(t.main, s))
        : r === "dark" && (t.dark = nc(t.main, c)));
}
function I0(t, r, l, o, s) {
  const c = s.light || s,
    f = s.dark || s * 1.5;
  r[l] ||
    (r.hasOwnProperty(o)
      ? (r[l] = r[o])
      : l === "light"
        ? (r.light = `color-mix(in ${t}, ${r.main}, #fff ${(c * 100).toFixed(0)}%)`)
        : l === "dark" &&
          (r.dark = `color-mix(in ${t}, ${r.main}, #000 ${(f * 100).toFixed(0)}%)`));
}
function dw(t = "light") {
  return t === "dark"
    ? { main: kl[200], light: kl[50], dark: kl[400] }
    : { main: kl[700], light: kl[400], dark: kl[800] };
}
function pw(t = "light") {
  return t === "dark"
    ? { main: zl[200], light: zl[50], dark: zl[400] }
    : { main: zl[500], light: zl[300], dark: zl[700] };
}
function hw(t = "light") {
  return t === "dark"
    ? { main: Dl[500], light: Dl[300], dark: Dl[700] }
    : { main: Dl[700], light: Dl[400], dark: Dl[800] };
}
function mw(t = "light") {
  return t === "dark"
    ? { main: Ul[400], light: Ul[300], dark: Ul[700] }
    : { main: Ul[700], light: Ul[500], dark: Ul[900] };
}
function gw(t = "light") {
  return t === "dark"
    ? { main: Ll[400], light: Ll[300], dark: Ll[700] }
    : { main: Ll[800], light: Ll[500], dark: Ll[900] };
}
function yw(t = "light") {
  return t === "dark"
    ? { main: ni[400], light: ni[300], dark: ni[700] }
    : { main: "#ed6c02", light: ni[500], dark: ni[900] };
}
function vw(t) {
  return `oklch(from ${t} var(--__l) 0 h / var(--__a))`;
}
function Pp(t) {
  const {
      mode: r = "light",
      contrastThreshold: l = 3,
      tonalOffset: o = 0.2,
      colorSpace: s,
      ...c
    } = t,
    f = t.primary || dw(r),
    p = t.secondary || pw(r),
    m = t.error || hw(r),
    h = t.info || mw(r),
    g = t.success || gw(r),
    v = t.warning || yw(r);
  function A(C) {
    return s
      ? vw(C)
      : $A(C, np.text.primary) >= l
        ? np.text.primary
        : n1.text.primary;
  }
  const x = ({
    color: C,
    name: B,
    mainShade: D = 500,
    lightShade: w = 300,
    darkShade: k = 700,
  }) => {
    if (
      ((C = { ...C }),
      !C.main && C[D] && (C.main = C[D]),
      !C.hasOwnProperty("main"))
    )
      throw new Error(Lr(11, B ? ` (${B})` : "", D));
    if (typeof C.main != "string")
      throw new Error(Lr(12, B ? ` (${B})` : "", JSON.stringify(C.main)));
    return (
      s
        ? (I0(s, C, "light", w, o), I0(s, C, "dark", k, o))
        : (P0(C, "light", w, o), P0(C, "dark", k, o)),
      C.contrastText || (C.contrastText = A(C.main)),
      C
    );
  };
  let S;
  return (
    r === "light" ? (S = t1()) : r === "dark" && (S = r1()),
    Kt(
      {
        common: { ...yi },
        mode: r,
        primary: x({ color: f, name: "primary" }),
        secondary: x({
          color: p,
          name: "secondary",
          mainShade: "A400",
          lightShade: "A200",
          darkShade: "A700",
        }),
        error: x({ color: m, name: "error" }),
        warning: x({ color: v, name: "warning" }),
        info: x({ color: h, name: "info" }),
        success: x({ color: g, name: "success" }),
        grey: b2,
        contrastThreshold: l,
        getContrastText: A,
        augmentColor: x,
        tonalOffset: o,
        ...S,
      },
      c,
    )
  );
}
function bw(t) {
  const r = {};
  return (
    Object.entries(t).forEach((o) => {
      const [s, c] = o;
      typeof c == "object" &&
        (r[s] =
          `${c.fontStyle ? `${c.fontStyle} ` : ""}${c.fontVariant ? `${c.fontVariant} ` : ""}${c.fontWeight ? `${c.fontWeight} ` : ""}${c.fontStretch ? `${c.fontStretch} ` : ""}${c.fontSize || ""}${c.lineHeight ? `/${c.lineHeight} ` : ""}${c.fontFamily || ""}`);
    }),
    r
  );
}
function Sw(t, r) {
  return {
    toolbar: {
      minHeight: 56,
      [t.up("xs")]: { "@media (orientation: landscape)": { minHeight: 48 } },
      [t.up("sm")]: { minHeight: 64 },
    },
    ...r,
  };
}
function xw(t) {
  return Math.round(t * 1e5) / 1e5;
}
const F0 = { textTransform: "uppercase" },
  Y0 = '"Roboto", "Helvetica", "Arial", sans-serif';
function Rw(t, r) {
  const {
      fontFamily: l = Y0,
      fontSize: o = 14,
      fontWeightLight: s = 300,
      fontWeightRegular: c = 400,
      fontWeightMedium: f = 500,
      fontWeightBold: p = 700,
      htmlFontSize: m = 16,
      allVariants: h,
      pxToRem: g,
      ...v
    } = typeof r == "function" ? r(t) : r,
    A = o / 14,
    x = g || ((C) => `${(C / m) * A}rem`),
    S = (C, B, D, w, k) => ({
      fontFamily: l,
      fontWeight: C,
      fontSize: x(B),
      lineHeight: D,
      ...(l === Y0 ? { letterSpacing: `${xw(w / B)}em` } : {}),
      ...k,
      ...h,
    }),
    E = {
      h1: S(s, 96, 1.167, -1.5),
      h2: S(s, 60, 1.2, -0.5),
      h3: S(c, 48, 1.167, 0),
      h4: S(c, 34, 1.235, 0.25),
      h5: S(c, 24, 1.334, 0),
      h6: S(f, 20, 1.6, 0.15),
      subtitle1: S(c, 16, 1.75, 0.15),
      subtitle2: S(f, 14, 1.57, 0.1),
      body1: S(c, 16, 1.5, 0.15),
      body2: S(c, 14, 1.43, 0.15),
      button: S(f, 14, 1.75, 0.4, F0),
      caption: S(c, 12, 1.66, 0.4),
      overline: S(c, 12, 2.66, 1, F0),
      inherit: {
        fontFamily: "inherit",
        fontWeight: "inherit",
        fontSize: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit",
      },
    };
  return Kt(
    {
      htmlFontSize: m,
      pxToRem: x,
      fontFamily: l,
      fontSize: o,
      fontWeightLight: s,
      fontWeightRegular: c,
      fontWeightMedium: f,
      fontWeightBold: p,
      ...E,
    },
    v,
    { clone: !1 },
  );
}
const Ew = 0.2,
  Tw = 0.14,
  Cw = 0.12;
function dt(...t) {
  return [
    `${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${Ew})`,
    `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${Tw})`,
    `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${Cw})`,
  ].join(",");
}
const Aw = [
    "none",
    dt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    dt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    dt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    dt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    dt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    dt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    dt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    dt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    dt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    dt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    dt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    dt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    dt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    dt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    dt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    dt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    dt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    dt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    dt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    dt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    dt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    dt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    dt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    dt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  ww = ["all"],
  Ow = {},
  Mw = {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  },
  Nw = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  };
function V0(t) {
  return `${Math.round(t)}ms`;
}
function Bw(t) {
  if (!t) return 0;
  const r = t / 36;
  return Math.min(Math.round((4 + 15 * r ** 0.25 + r / 5) * 10), 3e3);
}
function _w(t) {
  const r = { ...t };
  delete r.reducedMotion;
  const l = { ...Mw, ...r.easing },
    o = { ...Nw, ...r.duration },
    s = (f = ww, p = Ow) => {
      const {
        duration: m = o.standard,
        easing: h = l.easeInOut,
        delay: g = 0,
        ...v
      } = p;
      return (Array.isArray(f) ? f : [f])
        .map(
          (A) =>
            `${A} ${typeof m == "string" ? m : V0(m)} ${h} ${typeof g == "string" ? g : V0(g)}`,
        )
        .join(",");
    },
    c = r.create ?? s;
  return { getAutoHeightDuration: Bw, create: c, ...r, easing: l, duration: o };
}
const Dw = {};
function zw(t = Dw) {
  return { reducedMotion: "never", ...t };
}
const kw = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};
function Uw(t) {
  return (
    zr(t) ||
    typeof t > "u" ||
    typeof t == "string" ||
    typeof t == "boolean" ||
    typeof t == "number" ||
    Array.isArray(t)
  );
}
function a1(t = {}) {
  const r = { ...t };
  function l(o) {
    const s = Object.entries(o);
    for (let c = 0; c < s.length; c++) {
      const [f, p] = s[c];
      !Uw(p) || f.startsWith("unstable_") || f.startsWith("internal_")
        ? delete o[f]
        : zr(p) && ((o[f] = { ...p }), l(o[f]));
    }
  }
  return (
    l(r),
    `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(r, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`
  );
}
function G0(t) {
  return typeof t == "number"
    ? `${(t * 100).toFixed(0)}%`
    : `calc((${t}) * 100%)`;
}
const Lw = (t) => {
  if (!Number.isNaN(+t)) return +t;
  const r = t.match(/\d*\.?\d+/g);
  if (!r) return 0;
  let l = 0;
  for (let o = 0; o < r.length; o += 1) l += +r[o];
  return l;
};
function jw(t) {
  Object.assign(t, {
    alpha(r, l) {
      const o = this || t;
      return o.colorSpace
        ? `oklch(from ${r} l c h / ${typeof l == "string" ? `calc(${l})` : l})`
        : o.vars
          ? `rgba(${r.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof l == "string" ? `calc(${l})` : l})`
          : Ci(r, Lw(l));
    },
    lighten(r, l) {
      const o = this || t;
      return o.colorSpace
        ? `color-mix(in ${o.colorSpace}, ${r}, #fff ${G0(l)})`
        : rc(r, l);
    },
    darken(r, l) {
      const o = this || t;
      return o.colorSpace
        ? `color-mix(in ${o.colorSpace}, ${r}, #000 ${G0(l)})`
        : nc(r, l);
    },
  });
}
function rp(t = {}, ...r) {
  const {
    breakpoints: l,
    mixins: o = {},
    spacing: s,
    palette: c = {},
    motion: f = {},
    transitions: p = {},
    typography: m = {},
    shape: h,
    colorSpace: g,
    ...v
  } = t;
  if (t.vars && t.generateThemeVars === void 0) throw new Error(Lr(22));
  const A = Pp({ ...c, colorSpace: g }),
    x = Li(t);
  let S = Kt(x, {
    mixins: Sw(x.breakpoints, o),
    palette: A,
    shadows: Aw.slice(),
    typography: Rw(A, m),
    motion: zw(f),
    transitions: _w(p),
    zIndex: { ...kw },
  });
  return (
    (S = Kt(S, v)),
    (S = r.reduce((E, C) => Kt(E, C), S)),
    delete S.transitions.reducedMotion,
    (S.unstable_sxConfig = {
      ...ec,
      ...(v == null ? void 0 : v.unstable_sxConfig),
    }),
    (S.unstable_sx = function (C) {
      return Ei({ sx: C, theme: this });
    }),
    (S.toRuntimeSource = a1),
    jw(S),
    S
  );
}
function ap(t) {
  let r;
  return (
    t < 1 ? (r = 5.11916 * t ** 2) : (r = 4.5 * Math.log(t + 1) + 2),
    Math.round(r * 10) / 1e3
  );
}
const $w = [...Array(25)].map((t, r) => {
  if (r === 0) return "none";
  const l = ap(r);
  return `linear-gradient(rgba(255 255 255 / ${l}), rgba(255 255 255 / ${l}))`;
});
function l1(t) {
  return {
    inputPlaceholder: t === "dark" ? 0.5 : 0.42,
    inputUnderline: t === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: t === "dark" ? 0.2 : 0.12,
    switchTrack: t === "dark" ? 0.3 : 0.38,
  };
}
function o1(t) {
  return t === "dark" ? $w : [];
}
function Hw(t) {
  const {
      palette: r = { mode: "light" },
      opacity: l,
      overlays: o,
      colorSpace: s,
      ...c
    } = t,
    f = Pp({ ...r, colorSpace: s });
  return {
    palette: f,
    opacity: { ...l1(f.mode), ...l },
    overlays: o || o1(f.mode),
    ...c,
  };
}
function qw(t) {
  var r;
  return (
    t[0] === "motion" ||
    !!t[0].match(
      /(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/,
    ) ||
    !!t[0].match(/sxConfig$/) ||
    (t[0] === "palette" &&
      !!((r = t[1]) != null && r.match(/(mode|contrastThreshold|tonalOffset)/)))
  );
}
const Pw = (t) => [
    ...[...Array(25)].map((r, l) => `--${t ? `${t}-` : ""}overlays-${l}`),
    `--${t ? `${t}-` : ""}palette-AppBar-darkBg`,
    `--${t ? `${t}-` : ""}palette-AppBar-darkColor`,
  ],
  Iw = (t) => (r, l) => {
    const o = t.rootSelector || ":root",
      s = t.colorSchemeSelector;
    let c = s;
    if (
      (s === "class" && (c = ".%s"),
      s === "data" && (c = "[data-%s]"),
      s != null &&
        s.startsWith("data-") &&
        !s.includes("%s") &&
        (c = `[${s}="%s"]`),
      t.defaultColorScheme === r)
    ) {
      if (r === "dark") {
        const f = {};
        return (
          Pw(t.cssVarPrefix).forEach((p) => {
            ((f[p] = l[p]), delete l[p]);
          }),
          c === "media"
            ? { [o]: l, "@media (prefers-color-scheme: dark)": { [o]: f } }
            : c
              ? { [c.replace("%s", r)]: f, [`${o}, ${c.replace("%s", r)}`]: l }
              : { [o]: { ...l, ...f } }
        );
      }
      if (c && c !== "media") return `${o}, ${c.replace("%s", String(r))}`;
    } else if (r) {
      if (c === "media")
        return { [`@media (prefers-color-scheme: ${String(r)})`]: { [o]: l } };
      if (c) return c.replace("%s", String(r));
    }
    return o;
  };
function Fw(t, r) {
  r.forEach((l) => {
    t[l] || (t[l] = {});
  });
}
function J(t, r, l) {
  !t[r] && l && (t[r] = l);
}
function si(t) {
  return typeof t != "string" || !t.startsWith("hsl") ? t : e1(t);
}
function _r(t, r) {
  `${r}Channel` in t || (t[`${r}Channel`] = ii(si(t[r])));
}
function Yw(t) {
  return typeof t == "number"
    ? `${t}px`
    : typeof t == "string" || typeof t == "function" || Array.isArray(t)
      ? t
      : "8px";
}
const er = (t) => {
    try {
      return t();
    } catch {}
  },
  Vw = (t = "mui") => XA(t);
function $d(t, r, l, o, s) {
  if (!l) return;
  l = l === !0 ? {} : l;
  const c = s === "dark" ? "dark" : "light";
  if (!o) {
    r[s] = Hw({
      ...l,
      palette: { mode: c, ...(l == null ? void 0 : l.palette) },
      colorSpace: t,
    });
    return;
  }
  const { palette: f, ...p } = rp({
    ...o,
    palette: { mode: c, ...(l == null ? void 0 : l.palette) },
    colorSpace: t,
  });
  return (
    (r[s] = {
      ...l,
      palette: f,
      opacity: { ...l1(c), ...(l == null ? void 0 : l.opacity) },
      overlays: (l == null ? void 0 : l.overlays) || o1(c),
    }),
    p
  );
}
function Gw(t = {}, ...r) {
  const {
      colorSchemes: l = { light: !0 },
      defaultColorScheme: o,
      disableCssColorScheme: s = !1,
      cssVarPrefix: c = "mui",
      nativeColor: f = !1,
      shouldSkipGeneratingVar: p = qw,
      colorSchemeSelector: m = l.light && l.dark ? "media" : void 0,
      rootSelector: h = ":root",
      ...g
    } = t,
    v = Object.keys(l)[0],
    A = o || (l.light && v !== "light" ? "light" : v),
    x = Vw(c),
    { [A]: S, light: E, dark: C, ...B } = l,
    D = { ...B };
  let w = S;
  if (
    (((A === "dark" && !("dark" in l)) || (A === "light" && !("light" in l))) &&
      (w = !0),
    !w)
  )
    throw new Error(Lr(21, A));
  let k;
  f && (k = "oklch");
  const O = $d(k, D, w, g, A);
  (E && !D.light && $d(k, D, E, void 0, "light"),
    C && !D.dark && $d(k, D, C, void 0, "dark"));
  let U = {
    defaultColorScheme: A,
    ...O,
    cssVarPrefix: c,
    colorSchemeSelector: m,
    rootSelector: h,
    getCssVar: x,
    colorSchemes: D,
    font: { ...bw(O.typography), ...O.font },
    spacing: Yw(g.spacing),
  };
  (Object.keys(U.colorSchemes).forEach((Z) => {
    const R = U.colorSchemes[Z].palette,
      F = (z) => {
        const M = z.split("-"),
          $ = M[1],
          W = M[2];
        return x(z, R[$][W]);
      };
    (R.mode === "light" &&
      (J(R.common, "background", "#fff"), J(R.common, "onBackground", "#000")),
      R.mode === "dark" &&
        (J(R.common, "background", "#000"),
        J(R.common, "onBackground", "#fff")));
    function L(z, M, $) {
      if (k) {
        let W;
        return (
          z === Ha && (W = `transparent ${((1 - $) * 100).toFixed(0)}%`),
          z === Ze && (W = `#000 ${($ * 100).toFixed(0)}%`),
          z === We && (W = `#fff ${($ * 100).toFixed(0)}%`),
          `color-mix(in ${k}, ${M}, ${W})`
        );
      }
      return z(M, $);
    }
    if (
      (Fw(R, [
        "Alert",
        "AppBar",
        "Avatar",
        "Button",
        "Chip",
        "FilledInput",
        "LinearProgress",
        "Skeleton",
        "Slider",
        "SnackbarContent",
        "SpeedDialAction",
        "StepConnector",
        "StepContent",
        "Switch",
        "TableCell",
        "Tooltip",
      ]),
      R.mode === "light")
    ) {
      (J(
        R.Alert,
        "errorColor",
        L(Ze, f ? x("palette-error-light") : R.error.light, 0.6),
      ),
        J(
          R.Alert,
          "infoColor",
          L(Ze, f ? x("palette-info-light") : R.info.light, 0.6),
        ),
        J(
          R.Alert,
          "successColor",
          L(Ze, f ? x("palette-success-light") : R.success.light, 0.6),
        ),
        J(
          R.Alert,
          "warningColor",
          L(Ze, f ? x("palette-warning-light") : R.warning.light, 0.6),
        ),
        J(R.Alert, "errorFilledBg", F("palette-error-main")),
        J(R.Alert, "infoFilledBg", F("palette-info-main")),
        J(R.Alert, "successFilledBg", F("palette-success-main")),
        J(R.Alert, "warningFilledBg", F("palette-warning-main")),
        J(
          R.Alert,
          "errorFilledColor",
          er(() => R.getContrastText(R.error.main)),
        ),
        J(
          R.Alert,
          "infoFilledColor",
          er(() => R.getContrastText(R.info.main)),
        ),
        J(
          R.Alert,
          "successFilledColor",
          er(() => R.getContrastText(R.success.main)),
        ),
        J(
          R.Alert,
          "warningFilledColor",
          er(() => R.getContrastText(R.warning.main)),
        ),
        J(
          R.Alert,
          "errorStandardBg",
          L(We, f ? x("palette-error-light") : R.error.light, 0.9),
        ),
        J(
          R.Alert,
          "infoStandardBg",
          L(We, f ? x("palette-info-light") : R.info.light, 0.9),
        ),
        J(
          R.Alert,
          "successStandardBg",
          L(We, f ? x("palette-success-light") : R.success.light, 0.9),
        ),
        J(
          R.Alert,
          "warningStandardBg",
          L(We, f ? x("palette-warning-light") : R.warning.light, 0.9),
        ),
        J(R.Alert, "errorIconColor", F("palette-error-main")),
        J(R.Alert, "infoIconColor", F("palette-info-main")),
        J(R.Alert, "successIconColor", F("palette-success-main")),
        J(R.Alert, "warningIconColor", F("palette-warning-main")),
        J(R.AppBar, "defaultBg", F("palette-grey-100")),
        J(R.Avatar, "defaultBg", F("palette-grey-400")),
        J(R.Button, "inheritContainedBg", F("palette-grey-300")),
        J(R.Button, "inheritContainedHoverBg", F("palette-grey-A100")),
        J(R.Chip, "defaultBorder", F("palette-grey-400")),
        J(R.Chip, "defaultAvatarColor", F("palette-grey-700")),
        J(R.Chip, "defaultIconColor", F("palette-grey-700")),
        J(R.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"),
        J(R.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"),
        J(R.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"),
        J(
          R.LinearProgress,
          "primaryBg",
          L(We, f ? x("palette-primary-main") : R.primary.main, 0.62),
        ),
        J(
          R.LinearProgress,
          "secondaryBg",
          L(We, f ? x("palette-secondary-main") : R.secondary.main, 0.62),
        ),
        J(
          R.LinearProgress,
          "errorBg",
          L(We, f ? x("palette-error-main") : R.error.main, 0.62),
        ),
        J(
          R.LinearProgress,
          "infoBg",
          L(We, f ? x("palette-info-main") : R.info.main, 0.62),
        ),
        J(
          R.LinearProgress,
          "successBg",
          L(We, f ? x("palette-success-main") : R.success.main, 0.62),
        ),
        J(
          R.LinearProgress,
          "warningBg",
          L(We, f ? x("palette-warning-light") : R.warning.main, 0.62),
        ),
        J(
          R.Skeleton,
          "bg",
          k
            ? L(Ha, f ? x("palette-text-primary") : R.text.primary, 0.11)
            : `rgba(${F("palette-text-primaryChannel")} / 0.11)`,
        ),
        J(
          R.Slider,
          "primaryTrack",
          L(We, f ? x("palette-primary-main") : R.primary.main, 0.62),
        ),
        J(
          R.Slider,
          "secondaryTrack",
          L(We, f ? x("palette-secondary-main") : R.secondary.main, 0.62),
        ),
        J(
          R.Slider,
          "errorTrack",
          L(We, f ? x("palette-error-main") : R.error.main, 0.62),
        ),
        J(
          R.Slider,
          "infoTrack",
          L(We, f ? x("palette-info-main") : R.info.main, 0.62),
        ),
        J(
          R.Slider,
          "successTrack",
          L(We, f ? x("palette-success-main") : R.success.main, 0.62),
        ),
        J(
          R.Slider,
          "warningTrack",
          L(We, f ? x("palette-warning-main") : R.warning.main, 0.62),
        ));
      const z = k
        ? L(
            Ze,
            f ? x("palette-background-default") : R.background.default,
            0.6825,
          )
        : nu(R.background.default, 0.8);
      (J(R.SnackbarContent, "bg", z),
        J(
          R.SnackbarContent,
          "color",
          er(() => (k ? np.text.primary : R.getContrastText(z))),
        ),
        J(R.SpeedDialAction, "fabHoverBg", nu(R.background.paper, 0.15)),
        J(R.StepConnector, "border", F("palette-grey-400")),
        J(R.StepContent, "border", F("palette-grey-400")),
        J(R.Switch, "defaultColor", F("palette-common-white")),
        J(R.Switch, "defaultDisabledColor", F("palette-grey-100")),
        J(
          R.Switch,
          "primaryDisabledColor",
          L(We, f ? x("palette-primary-main") : R.primary.main, 0.62),
        ),
        J(
          R.Switch,
          "secondaryDisabledColor",
          L(We, f ? x("palette-secondary-main") : R.secondary.main, 0.62),
        ),
        J(
          R.Switch,
          "errorDisabledColor",
          L(We, f ? x("palette-error-main") : R.error.main, 0.62),
        ),
        J(
          R.Switch,
          "infoDisabledColor",
          L(We, f ? x("palette-info-main") : R.info.main, 0.62),
        ),
        J(
          R.Switch,
          "successDisabledColor",
          L(We, f ? x("palette-success-main") : R.success.main, 0.62),
        ),
        J(
          R.Switch,
          "warningDisabledColor",
          L(We, f ? x("palette-warning-main") : R.warning.main, 0.62),
        ),
        J(
          R.TableCell,
          "border",
          L(We, Ha(f ? x("palette-divider") : R.divider, 1), 0.88),
        ),
        J(
          R.Tooltip,
          "bg",
          L(Ha, f ? x("palette-grey-700") : R.grey[700], 0.92),
        ));
    }
    if (R.mode === "dark") {
      (J(
        R.Alert,
        "errorColor",
        L(We, f ? x("palette-error-light") : R.error.light, 0.6),
      ),
        J(
          R.Alert,
          "infoColor",
          L(We, f ? x("palette-info-light") : R.info.light, 0.6),
        ),
        J(
          R.Alert,
          "successColor",
          L(We, f ? x("palette-success-light") : R.success.light, 0.6),
        ),
        J(
          R.Alert,
          "warningColor",
          L(We, f ? x("palette-warning-light") : R.warning.light, 0.6),
        ),
        J(R.Alert, "errorFilledBg", F("palette-error-dark")),
        J(R.Alert, "infoFilledBg", F("palette-info-dark")),
        J(R.Alert, "successFilledBg", F("palette-success-dark")),
        J(R.Alert, "warningFilledBg", F("palette-warning-dark")),
        J(
          R.Alert,
          "errorFilledColor",
          er(() => R.getContrastText(R.error.dark)),
        ),
        J(
          R.Alert,
          "infoFilledColor",
          er(() => R.getContrastText(R.info.dark)),
        ),
        J(
          R.Alert,
          "successFilledColor",
          er(() => R.getContrastText(R.success.dark)),
        ),
        J(
          R.Alert,
          "warningFilledColor",
          er(() => R.getContrastText(R.warning.dark)),
        ),
        J(
          R.Alert,
          "errorStandardBg",
          L(Ze, f ? x("palette-error-light") : R.error.light, 0.9),
        ),
        J(
          R.Alert,
          "infoStandardBg",
          L(Ze, f ? x("palette-info-light") : R.info.light, 0.9),
        ),
        J(
          R.Alert,
          "successStandardBg",
          L(Ze, f ? x("palette-success-light") : R.success.light, 0.9),
        ),
        J(
          R.Alert,
          "warningStandardBg",
          L(Ze, f ? x("palette-warning-light") : R.warning.light, 0.9),
        ),
        J(R.Alert, "errorIconColor", F("palette-error-main")),
        J(R.Alert, "infoIconColor", F("palette-info-main")),
        J(R.Alert, "successIconColor", F("palette-success-main")),
        J(R.Alert, "warningIconColor", F("palette-warning-main")),
        J(R.AppBar, "defaultBg", F("palette-grey-900")),
        J(R.AppBar, "darkBg", F("palette-background-paper")),
        J(R.AppBar, "darkColor", F("palette-text-primary")),
        J(R.Avatar, "defaultBg", F("palette-grey-600")),
        J(R.Button, "inheritContainedBg", F("palette-grey-800")),
        J(R.Button, "inheritContainedHoverBg", F("palette-grey-700")),
        J(R.Chip, "defaultBorder", F("palette-grey-700")),
        J(R.Chip, "defaultAvatarColor", F("palette-grey-300")),
        J(R.Chip, "defaultIconColor", F("palette-grey-300")),
        J(R.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"),
        J(R.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"),
        J(R.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"),
        J(
          R.LinearProgress,
          "primaryBg",
          L(Ze, f ? x("palette-primary-main") : R.primary.main, 0.5),
        ),
        J(
          R.LinearProgress,
          "secondaryBg",
          L(Ze, f ? x("palette-secondary-main") : R.secondary.main, 0.5),
        ),
        J(
          R.LinearProgress,
          "errorBg",
          L(Ze, f ? x("palette-error-main") : R.error.main, 0.5),
        ),
        J(
          R.LinearProgress,
          "infoBg",
          L(Ze, f ? x("palette-info-main") : R.info.main, 0.5),
        ),
        J(
          R.LinearProgress,
          "successBg",
          L(Ze, f ? x("palette-success-main") : R.success.main, 0.5),
        ),
        J(
          R.LinearProgress,
          "warningBg",
          L(Ze, f ? x("palette-warning-main") : R.warning.main, 0.5),
        ),
        J(
          R.Skeleton,
          "bg",
          k
            ? L(Ha, f ? x("palette-text-primary") : R.text.primary, 0.13)
            : `rgba(${F("palette-text-primaryChannel")} / 0.13)`,
        ),
        J(
          R.Slider,
          "primaryTrack",
          L(Ze, f ? x("palette-primary-main") : R.primary.main, 0.5),
        ),
        J(
          R.Slider,
          "secondaryTrack",
          L(Ze, f ? x("palette-secondary-main") : R.secondary.main, 0.5),
        ),
        J(
          R.Slider,
          "errorTrack",
          L(Ze, f ? x("palette-error-main") : R.error.main, 0.5),
        ),
        J(
          R.Slider,
          "infoTrack",
          L(Ze, f ? x("palette-info-main") : R.info.main, 0.5),
        ),
        J(
          R.Slider,
          "successTrack",
          L(Ze, f ? x("palette-success-main") : R.success.main, 0.5),
        ),
        J(
          R.Slider,
          "warningTrack",
          L(Ze, f ? x("palette-warning-light") : R.warning.main, 0.5),
        ));
      const z = k
        ? L(
            We,
            f ? x("palette-background-default") : R.background.default,
            0.985,
          )
        : nu(R.background.default, 0.98);
      (J(R.SnackbarContent, "bg", z),
        J(
          R.SnackbarContent,
          "color",
          er(() => (k ? n1.text.primary : R.getContrastText(z))),
        ),
        J(R.SpeedDialAction, "fabHoverBg", nu(R.background.paper, 0.15)),
        J(R.StepConnector, "border", F("palette-grey-600")),
        J(R.StepContent, "border", F("palette-grey-600")),
        J(R.Switch, "defaultColor", F("palette-grey-300")),
        J(R.Switch, "defaultDisabledColor", F("palette-grey-600")),
        J(
          R.Switch,
          "primaryDisabledColor",
          L(Ze, f ? x("palette-primary-main") : R.primary.main, 0.55),
        ),
        J(
          R.Switch,
          "secondaryDisabledColor",
          L(Ze, f ? x("palette-secondary-main") : R.secondary.main, 0.55),
        ),
        J(
          R.Switch,
          "errorDisabledColor",
          L(Ze, f ? x("palette-error-main") : R.error.main, 0.55),
        ),
        J(
          R.Switch,
          "infoDisabledColor",
          L(Ze, f ? x("palette-info-main") : R.info.main, 0.55),
        ),
        J(
          R.Switch,
          "successDisabledColor",
          L(Ze, f ? x("palette-success-main") : R.success.main, 0.55),
        ),
        J(
          R.Switch,
          "warningDisabledColor",
          L(Ze, f ? x("palette-warning-light") : R.warning.main, 0.55),
        ),
        J(
          R.TableCell,
          "border",
          L(Ze, Ha(f ? x("palette-divider") : R.divider, 1), 0.68),
        ),
        J(
          R.Tooltip,
          "bg",
          L(Ha, f ? x("palette-grey-700") : R.grey[700], 0.92),
        ));
    }
    (f ||
      (_r(R.background, "default"),
      _r(R.background, "paper"),
      _r(R.common, "background"),
      _r(R.common, "onBackground"),
      _r(R, "divider")),
      Object.keys(R).forEach((z) => {
        const M = R[z];
        z !== "tonalOffset" &&
          !f &&
          M &&
          typeof M == "object" &&
          (M.main && J(R[z], "mainChannel", ii(si(M.main))),
          M.light && J(R[z], "lightChannel", ii(si(M.light))),
          M.dark && J(R[z], "darkChannel", ii(si(M.dark))),
          M.contrastText &&
            J(R[z], "contrastTextChannel", ii(si(M.contrastText))),
          z === "text" && (_r(R[z], "primary"), _r(R[z], "secondary")),
          z === "action" &&
            (M.active && _r(R[z], "active"),
            M.selected && _r(R[z], "selected")));
      }));
  }),
    (U = r.reduce((Z, R) => Kt(Z, R), U)));
  const I = {
      prefix: c,
      disableCssColorScheme: s,
      shouldSkipGeneratingVar: p,
      getSelector: Iw(U),
      enableContrastVars: f,
    },
    { vars: X, generateThemeVars: le, generateStyleSheets: ue } = WA(U, I);
  return (
    (U.vars = X),
    Object.entries(U.colorSchemes[U.defaultColorScheme]).forEach(([Z, R]) => {
      U[Z] = R;
    }),
    (U.generateThemeVars = le),
    (U.generateStyleSheets = ue),
    (U.generateSpacing = function () {
      return Gb(g.spacing, Ku(this));
    }),
    (U.getColorSchemeSelector = JA(m)),
    (U.spacing = U.generateSpacing()),
    (U.shouldSkipGeneratingVar = p),
    (U.unstable_sxConfig = {
      ...ec,
      ...(g == null ? void 0 : g.unstable_sxConfig),
    }),
    (U.unstable_sx = function (R) {
      return Ei({ sx: R, theme: this });
    }),
    (U.internal_cache = {}),
    (U.toRuntimeSource = a1),
    U
  );
}
function K0(t, r, l) {
  t.colorSchemes &&
    l &&
    (t.colorSchemes[r] = {
      ...(l !== !0 && l),
      palette: Pp({ ...(l === !0 ? {} : l.palette), mode: r }),
    });
}
function Kw(t = {}, ...r) {
  const {
      palette: l,
      cssVariables: o = !1,
      colorSchemes: s = l ? void 0 : { light: !0 },
      defaultColorScheme: c = l == null ? void 0 : l.mode,
      ...f
    } = t,
    p = c || "light",
    m = s == null ? void 0 : s[p],
    h = {
      ...s,
      ...(l
        ? { [p]: { ...(typeof m != "boolean" && m), palette: l } }
        : void 0),
    };
  if (o === !1) {
    if (!("colorSchemes" in t)) return rp(t, ...r);
    let g = l;
    "palette" in t ||
      (h[p] &&
        (h[p] !== !0
          ? (g = h[p].palette)
          : p === "dark" && (g = { mode: "dark" })));
    const v = rp({ ...t, palette: g }, ...r);
    return (
      (v.defaultColorScheme = p),
      (v.colorSchemes = h),
      v.palette.mode === "light" &&
        ((v.colorSchemes.light = {
          ...(h.light !== !0 && h.light),
          palette: v.palette,
        }),
        K0(v, "dark", h.dark)),
      v.palette.mode === "dark" &&
        ((v.colorSchemes.dark = {
          ...(h.dark !== !0 && h.dark),
          palette: v.palette,
        }),
        K0(v, "light", h.light)),
      v
    );
  }
  return (
    !l && !("light" in h) && p === "light" && (h.light = !0),
    Gw(
      {
        ...f,
        colorSchemes: h,
        defaultColorScheme: p,
        ...(typeof o != "boolean" && o),
      },
      ...r,
    )
  );
}
function Au(t) {
  return typeof t == "string";
}
function i1(t, r = 166) {
  let l;
  function o(...s) {
    const c = () => {
      t.apply(this, s);
    };
    (clearTimeout(l), (l = setTimeout(c, r)));
  }
  return (
    (o.clear = () => {
      clearTimeout(l);
    }),
    o
  );
}
function rn(...t) {
  const r = b.useRef(void 0),
    l = b.useCallback((o) => {
      const s = t.map((c) => {
        if (c == null) return null;
        if (typeof c == "function") {
          const f = c,
            p = f(o);
          return typeof p == "function"
            ? p
            : () => {
                f(null);
              };
        }
        return (
          (c.current = o),
          () => {
            c.current = null;
          }
        );
      });
      return () => {
        s.forEach((c) => (c == null ? void 0 : c()));
      };
    }, t);
  return b.useMemo(
    () =>
      t.every((o) => o == null)
        ? null
        : (o) => {
            (r.current && (r.current(), (r.current = void 0)),
              o != null && (r.current = l(o)));
          },
    t,
  );
}
function Ht(t) {
  const r = b.useRef(t);
  return (
    nn(() => {
      r.current = t;
    }),
    b.useRef((...l) => (0, r.current)(...l)).current
  );
}
function Jt(t) {
  return (t && t.ownerDocument) || document;
}
function jr(t) {
  return Jt(t).defaultView || window;
}
function ru(t) {
  return parseInt(t, 10) || 0;
}
const Xw = {
  shadow: {
    visibility: "hidden",
    position: "absolute",
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    transform: "translateZ(0)",
  },
};
function Qw(t) {
  for (const r in t) return !1;
  return !0;
}
function X0(t) {
  return Qw(t) || (t.outerHeightStyle === 0 && !t.overflowing);
}
const Zw = b.forwardRef(function (r, l) {
    const {
        onChange: o,
        maxRows: s,
        minRows: c = 1,
        style: f,
        value: p,
        ...m
      } = r,
      { current: h } = b.useRef(p != null),
      g = b.useRef(null),
      v = rn(l, g),
      A = b.useRef(null),
      x = b.useRef(null),
      S = b.useCallback(() => {
        const w = g.current,
          k = x.current;
        if (!w || !k) return;
        const U = jr(w).getComputedStyle(w);
        if (U.width === "0px") return { outerHeightStyle: 0, overflowing: !1 };
        ((k.style.width = U.width),
          (k.value = w.value || r.placeholder || "x"),
          k.value.slice(-1) ===
            `
` && (k.value += " "));
        const I = U.boxSizing,
          X = ru(U.paddingBottom) + ru(U.paddingTop),
          le = ru(U.borderBottomWidth) + ru(U.borderTopWidth),
          ue = k.scrollHeight;
        k.value = "x";
        const Z = k.scrollHeight;
        let R = ue;
        (c && (R = Math.max(Number(c) * Z, R)),
          s && (R = Math.min(Number(s) * Z, R)),
          (R = Math.max(R, Z)));
        const F = R + (I === "border-box" ? X + le : 0),
          L = Math.abs(R - ue) <= 1;
        return { outerHeightStyle: F, overflowing: L };
      }, [s, c, r.placeholder]),
      E = Ht(() => {
        const w = g.current,
          k = S();
        if (!w || !k || X0(k)) return !1;
        const O = k.outerHeightStyle;
        return A.current != null && A.current !== O;
      }),
      C = b.useCallback(() => {
        const w = g.current,
          k = S();
        if (!w || !k || X0(k)) return;
        const O = k.outerHeightStyle;
        (A.current !== O && ((A.current = O), (w.style.height = `${O}px`)),
          (w.style.overflow = k.overflowing ? "hidden" : ""));
      }, [S]),
      B = b.useRef(-1);
    (nn(() => {
      const w = i1(C),
        k = g == null ? void 0 : g.current;
      if (!k) return;
      const O = jr(k);
      O.addEventListener("resize", w);
      let U;
      return (
        typeof ResizeObserver < "u" &&
          ((U = new ResizeObserver(() => {
            E() &&
              (U.unobserve(k),
              cancelAnimationFrame(B.current),
              C(),
              (B.current = requestAnimationFrame(() => {
                U.observe(k);
              })));
          })),
          U.observe(k)),
        () => {
          (w.clear(),
            cancelAnimationFrame(B.current),
            O.removeEventListener("resize", w),
            U && U.disconnect());
        }
      );
    }, [S, C, E]),
      nn(() => {
        C();
      }));
    const D = (w) => {
      h || C();
      const k = w.target,
        O = k.value.length,
        U = k.value.endsWith(`
`),
        I = k.selectionStart === O;
      (U && I && k.setSelectionRange(O, O), o && o(w));
    };
    return q.jsxs(b.Fragment, {
      children: [
        q.jsx("textarea", {
          value: p,
          onChange: D,
          ref: v,
          rows: c,
          style: f,
          ...m,
        }),
        q.jsx("textarea", {
          "aria-hidden": !0,
          className: r.className,
          readOnly: !0,
          ref: x,
          tabIndex: -1,
          style: { ...Xw.shadow, ...f, paddingTop: 0, paddingBottom: 0 },
        }),
      ],
    });
  }),
  Ip = b.createContext(void 0);
function Wl({ props: t, states: r }) {
  const l = b.useContext(Ip),
    o = {};
  return (
    r.forEach((s) => {
      const c = t[s];
      o[s] = c === void 0 && l ? l[s] : c;
    }),
    [o, l]
  );
}
const Fp = Kw();
function ji() {
  const t = Hp(Fp);
  return t[wp] || t;
}
function Ww(t) {
  return q.jsx(CA, { ...t, defaultTheme: Fp, themeId: wp });
}
function s1(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const Fn = (t) => s1(t) && t !== "classes",
  pe = Zb({ themeId: wp, defaultTheme: Fp, rootShouldForwardProp: Fn });
function Jw(t) {
  return function (l) {
    return q.jsx(Ww, {
      styles: typeof t == "function" ? (o) => t({ theme: o, ...l }) : t,
    });
  };
}
const ot = KA;
function Fe(t) {
  return YA(t);
}
function kr(t) {
  var l;
  let r = t.activeElement;
  for (
    ;
    ((l = r == null ? void 0 : r.shadowRoot) == null
      ? void 0
      : l.activeElement) != null;
  )
    r = r.shadowRoot.activeElement;
  return r;
}
function Q0(t) {
  return t != null && !(Array.isArray(t) && t.length === 0);
}
function wu(t, r = !1) {
  return (
    t &&
    ((Q0(t.value) && t.value !== "") ||
      (r && Q0(t.defaultValue) && t.defaultValue !== ""))
  );
}
function eO(t) {
  return t.startAdornment;
}
function tO(t) {
  return $e("MuiInputBase", t);
}
const Yl = Ke("MuiInputBase", [
    "root",
    "formControl",
    "focused",
    "disabled",
    "adornedStart",
    "adornedEnd",
    "error",
    "sizeSmall",
    "multiline",
    "colorSecondary",
    "fullWidth",
    "hiddenLabel",
    "readOnly",
    "input",
    "inputTypeSearch",
  ]),
  nO = { transition: "none" };
function rO(t, r) {
  return t === "always"
    ? r
    : t === "system"
      ? { "@media (prefers-reduced-motion: reduce)": r }
      : null;
}
const Yp = (t) => t.scrollTop,
  u1 = {},
  aO = ["all"],
  lO = {};
function zn(t, r) {
  return (l) => {
    if (r) {
      const o = t.current;
      l === void 0 ? r(o) : r(o, l);
    }
  };
}
function c1(t, r, l, o, s, c) {
  const f = t === "exited" && !r ? o : l[t] || l.exited;
  return s || c ? { ...f, ...s, ...c } : f;
}
function Ou(t, r) {
  const { timeout: l, easing: o, style: s = u1 } = t;
  return {
    duration:
      s.transitionDuration ?? (typeof l == "number" ? l : l[r.mode] || 0),
    easing:
      s.transitionTimingFunction ?? (typeof o == "object" ? o[r.mode] : o),
    delay: s.transitionDelay,
  };
}
function Vp(t, r) {
  var o;
  const l = r ?? nO;
  return rO((o = t.motion) == null ? void 0 : o.reducedMotion, l);
}
function zt(t, r = aO, l = lO) {
  var f, p;
  const o =
      (p = (f = t.transitions) == null ? void 0 : f.create) == null
        ? void 0
        : p.call(f, r, l),
    s = Vp(t);
  if (o === void 0) return s ?? u1;
  const c = { transition: o };
  return s ? { ...c, ...s } : c;
}
var Z0;
const lp = "mui-auto-fill",
  Mu = "mui-auto-fill-cancel",
  ac = (t, r) => {
    const { ownerState: l } = t;
    return [
      r.root,
      l.formControl && r.formControl,
      l.startAdornment && r.adornedStart,
      l.endAdornment && r.adornedEnd,
      l.error && r.error,
      l.size === "small" && r.sizeSmall,
      l.multiline && r.multiline,
      l.color && r[`color${Ae(l.color)}`],
      l.fullWidth && r.fullWidth,
      l.hiddenLabel && r.hiddenLabel,
    ];
  },
  lc = (t, r) => {
    const { ownerState: l } = t;
    return [r.input, l.type === "search" && r.inputTypeSearch];
  },
  oO = (t) => {
    const {
        classes: r,
        color: l,
        disabled: o,
        error: s,
        endAdornment: c,
        focused: f,
        formControl: p,
        fullWidth: m,
        hiddenLabel: h,
        multiline: g,
        readOnly: v,
        size: A,
        startAdornment: x,
        type: S,
      } = t,
      E = {
        root: [
          "root",
          `color${Ae(l)}`,
          o && "disabled",
          s && "error",
          m && "fullWidth",
          f && "focused",
          p && "formControl",
          A && A !== "medium" && `size${Ae(A)}`,
          g && "multiline",
          x && "adornedStart",
          c && "adornedEnd",
          h && "hiddenLabel",
          v && "readOnly",
        ],
        input: [
          "input",
          o && "disabled",
          S === "search" && "inputTypeSearch",
          v && "readOnly",
        ],
      };
    return He(E, tO, r);
  },
  oc = pe("div", { name: "MuiInputBase", slot: "Root", overridesResolver: ac })(
    ot(({ theme: t }) => ({
      ...t.typography.body1,
      color: (t.vars || t).palette.text.primary,
      lineHeight: "1.4375em",
      boxSizing: "border-box",
      position: "relative",
      cursor: "text",
      display: "inline-flex",
      alignItems: "center",
      [`&.${Yl.disabled}`]: {
        color: (t.vars || t).palette.text.disabled,
        cursor: "default",
      },
      variants: [
        {
          props: ({ ownerState: r }) => r.multiline,
          style: { padding: "4px 0 5px" },
        },
        {
          props: ({ ownerState: r, size: l }) => r.multiline && l === "small",
          style: { paddingTop: 1 },
        },
        { props: ({ ownerState: r }) => r.fullWidth, style: { width: "100%" } },
      ],
    })),
  ),
  ic = pe("input", {
    name: "MuiInputBase",
    slot: "Input",
    overridesResolver: lc,
  })(
    ot(({ theme: t }) => {
      const r = t.palette.mode === "light",
        l = {
          color: "currentColor",
          ...(t.vars
            ? { opacity: t.vars.opacity.inputPlaceholder }
            : { opacity: r ? 0.42 : 0.5 }),
          ...zt(t, "opacity", { duration: t.transitions.duration.shorter }),
        },
        o = { opacity: "0 !important" },
        s = t.vars
          ? { opacity: t.vars.opacity.inputPlaceholder }
          : { opacity: r ? 0.42 : 0.5 };
      return {
        font: "inherit",
        letterSpacing: "inherit",
        color: "currentColor",
        padding: "4px 0 5px",
        border: 0,
        boxSizing: "content-box",
        background: "none",
        height: "1.4375em",
        margin: 0,
        WebkitTapHighlightColor: "transparent",
        display: "block",
        minWidth: 0,
        width: "100%",
        "&::-webkit-input-placeholder": l,
        "&::-moz-placeholder": l,
        "&::-ms-input-placeholder": l,
        "&:focus": { outline: 0 },
        "&:invalid": { boxShadow: "none" },
        "&::-webkit-search-decoration": { WebkitAppearance: "none" },
        [`label[data-shrink=false] + .${Yl.formControl} &`]: {
          "&::-webkit-input-placeholder": o,
          "&::-moz-placeholder": o,
          "&::-ms-input-placeholder": o,
          "&:focus::-webkit-input-placeholder": s,
          "&:focus::-moz-placeholder": s,
          "&:focus::-ms-input-placeholder": s,
        },
        [`&.${Yl.disabled}`]: {
          opacity: 1,
          WebkitTextFillColor: (t.vars || t).palette.text.disabled,
        },
        variants: [
          {
            props: ({ ownerState: c }) => !c.disableInjectingGlobalStyles,
            style: {
              animationName: Mu,
              animationDuration: "10ms",
              "&:-webkit-autofill": {
                animationDuration: "5000s",
                animationName: lp,
              },
            },
          },
          { props: { size: "small" }, style: { paddingTop: 1 } },
          {
            props: ({ ownerState: c }) => c.multiline,
            style: {
              height: "auto",
              resize: "none",
              padding: 0,
              paddingTop: 0,
            },
          },
          { props: { type: "search" }, style: { MozAppearance: "textfield" } },
        ],
      };
    }),
  ),
  W0 = Jw({
    [`@keyframes ${lp}`]: { from: { animationName: lp } },
    [`@keyframes ${Mu}`]: { from: { animationName: Mu } },
  }),
  Gp = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiInputBase" }),
      {
        "aria-describedby": s,
        "aria-label": c,
        autoComplete: f,
        autoFocus: p,
        className: m,
        color: h,
        defaultValue: g,
        disabled: v,
        disableInjectingGlobalStyles: A,
        endAdornment: x,
        error: S,
        fullWidth: E = !1,
        id: C,
        inputComponent: B = "input",
        inputProps: D = {},
        inputRef: w,
        margin: k,
        maxRows: O,
        minRows: U,
        multiline: I = !1,
        name: X,
        onBlur: le,
        onChange: ue,
        onClick: Z,
        onFocus: R,
        onKeyDown: F,
        onKeyUp: L,
        placeholder: z,
        readOnly: M,
        renderSuffix: $,
        rows: W,
        size: se,
        slotProps: N = {},
        slots: V = {},
        startAdornment: ne,
        type: ee = "text",
        value: oe,
        ...he
      } = o,
      ce = D.value != null ? D.value : oe,
      { current: be } = b.useRef(ce != null),
      fe = b.useRef(),
      Se = b.useCallback((Me) => {}, []),
      Oe = rn(fe, w, D.ref, Se),
      [rt, Ye] = b.useState(!1),
      [ze, Ee] = Wl({
        props: o,
        states: [
          "color",
          "disabled",
          "error",
          "hiddenLabel",
          "size",
          "required",
          "filled",
        ],
      });
    ((ze.focused = Ee ? Ee.focused : rt),
      b.useEffect(() => {
        !Ee && v && rt && (Ye(!1), le && le());
      }, [Ee, v, rt, le]));
    const Et = Ee && Ee.onFilled,
      Mt = Ee && Ee.onEmpty,
      ke = b.useCallback(
        (Me) => {
          wu(Me) ? Et && Et() : Mt && Mt();
        },
        [Et, Mt],
      );
    (nn(() => {
      be && ke({ value: ce });
    }, [ce, ke, be]),
      nn(() => {
        if (!p) return;
        const Me = fe.current;
        if (!Me) return;
        const Pt = Jt(Me),
          kt = kr(Pt),
          Yn = kt == null || kt === Pt.body || kt === Pt.documentElement;
        Me === kt
          ? Ee && Ee.onFocus
            ? Ee.onFocus()
            : Ye(!0)
          : Yn && Me.focus();
      }, [p]));
    const an = (Me) => {
        (R && R(Me),
          D.onFocus && D.onFocus(Me),
          Ee && Ee.onFocus ? Ee.onFocus(Me) : Ye(!0));
      },
      ut = (Me) => {
        (le && le(Me),
          D.onBlur && D.onBlur(Me),
          Ee && Ee.onBlur ? Ee.onBlur(Me) : Ye(!1));
      },
      Ln = (Me, ...Pt) => {
        if (!be) {
          const kt = Me.target || fe.current;
          if (kt == null) throw new Error(Lr(1));
          ke({ value: kt.value });
        }
        (D.onChange && D.onChange(Me, ...Pt), ue && ue(Me, ...Pt));
      };
    b.useEffect(() => {
      ke(fe.current);
    }, []);
    const En = (Me) => {
      (fe.current && Me.currentTarget === Me.target && fe.current.focus(),
        Z && Z(Me));
    };
    let ur = B,
      qt = D;
    I &&
      ur === "input" &&
      (W
        ? (qt = { type: void 0, minRows: W, maxRows: W, ...qt })
        : (qt = { type: void 0, maxRows: O, minRows: U, ...qt }),
      (ur = Zw));
    const ya = (Me) => {
      ke(Me.animationName === Mu ? fe.current : { value: "x" });
    };
    b.useEffect(() => {
      Ee && Ee.setAdornedStart(!!ne);
    }, [Ee, ne]);
    const cr = {
        ...o,
        color: ze.color || "primary",
        disabled: ze.disabled,
        endAdornment: x,
        error: ze.error,
        focused: ze.focused,
        formControl: Ee,
        fullWidth: E,
        hiddenLabel: ze.hiddenLabel,
        multiline: I,
        size: ze.size,
        startAdornment: ne,
        type: ee,
      },
      Nt = oO(cr),
      Ue = V.root || oc,
      it = N.root || {},
      vt = V.input || ic;
    return (
      (qt = { ...qt, ...N.input }),
      q.jsxs(b.Fragment, {
        children: [
          !A && typeof W0 == "function" && (Z0 || (Z0 = q.jsx(W0, {}))),
          q.jsxs(Ue, {
            ...it,
            ref: l,
            onClick: En,
            ...he,
            ...(!Au(Ue) && { ownerState: { ...cr, ...it.ownerState } }),
            className: Te(
              Nt.root,
              it.className,
              m,
              M && "MuiInputBase-readOnly",
            ),
            children: [
              ne,
              q.jsx(Ip.Provider, {
                value: null,
                children: q.jsx(vt, {
                  "aria-invalid": ze.error,
                  "aria-describedby": s,
                  "aria-label": c,
                  autoComplete: f,
                  autoFocus: p,
                  defaultValue: g,
                  disabled: ze.disabled,
                  id: C,
                  onAnimationStart: ya,
                  name: X,
                  placeholder: z,
                  readOnly: M,
                  required: ze.required,
                  rows: W,
                  value: ce,
                  onKeyDown: F,
                  onKeyUp: L,
                  type: ee,
                  ...qt,
                  ...(!Au(vt) && {
                    as: ur,
                    ownerState: { ...cr, ...qt.ownerState },
                  }),
                  ref: Oe,
                  className: Te(
                    Nt.input,
                    qt.className,
                    M && "MuiInputBase-readOnly",
                  ),
                  onBlur: ut,
                  onChange: Ln,
                  onFocus: an,
                }),
              }),
              x,
              $ ? $({ ...ze, startAdornment: ne }) : null,
            ],
          }),
        ],
      })
    );
  });
function iO(t) {
  return $e("MuiFilledInput", t);
}
const qa = {
  ...Yl,
  ...Ke("MuiFilledInput", [
    "root",
    "underline",
    "input",
    "adornedStart",
    "adornedEnd",
    "sizeSmall",
    "multiline",
    "hiddenLabel",
  ]),
};
function sO(t) {
  return $e("MuiFormHelperText", t);
}
const J0 = Ke("MuiFormHelperText", [
  "root",
  "error",
  "disabled",
  "sizeSmall",
  "sizeMedium",
  "contained",
  "focused",
  "filled",
  "required",
]);
function uO(t) {
  return $e("MuiFormLabel", t);
}
const ui = Ke("MuiFormLabel", [
  "root",
  "colorSecondary",
  "focused",
  "disabled",
  "error",
  "filled",
  "required",
  "asterisk",
]);
function cO(t) {
  return $e("MuiInput", t);
}
const ai = { ...Yl, ...Ke("MuiInput", ["root", "underline", "input"]) };
function fO(t) {
  return $e("MuiNativeSelect", t);
}
const Kp = Ke("MuiNativeSelect", [
  "root",
  "select",
  "multiple",
  "filled",
  "outlined",
  "standard",
  "disabled",
  "icon",
  "iconOpen",
  "iconFilled",
  "iconOutlined",
  "iconStandard",
  "nativeInput",
  "error",
]);
function dO(t) {
  return $e("MuiOutlinedInput", t);
}
const tr = {
  ...Yl,
  ...Ke("MuiOutlinedInput", ["root", "notchedOutline", "input"]),
};
function ev(...t) {
  return t.reduce(
    (r, l) =>
      l == null
        ? r
        : function (...s) {
            (r.apply(this, s), l.apply(this, s));
          },
    () => {},
  );
}
function pO(t) {
  return $e("MuiSvgIcon", t);
}
Ke("MuiSvgIcon", [
  "root",
  "colorPrimary",
  "colorSecondary",
  "colorAction",
  "colorError",
  "colorDisabled",
  "fontSizeInherit",
  "fontSizeSmall",
  "fontSizeMedium",
  "fontSizeLarge",
]);
const hO = (t) => {
    const { color: r, fontSize: l, classes: o } = t,
      s = {
        root: ["root", r !== "inherit" && `color${Ae(r)}`, `fontSize${Ae(l)}`],
      };
    return He(s, pO, o);
  },
  mO = pe("svg", {
    name: "MuiSvgIcon",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        l.color !== "inherit" && r[`color${Ae(l.color)}`],
        r[`fontSize${Ae(l.fontSize)}`],
      ];
    },
  })(
    ot(({ theme: t }) => {
      var r, l, o, s, c, f, p, m, h, g, v, A;
      return {
        userSelect: "none",
        width: "1em",
        height: "1em",
        display: "inline-block",
        flexShrink: 0,
        ...zt(t, "fill", {
          duration:
            (l =
              (r = (t.vars ?? t).transitions) == null ? void 0 : r.duration) ==
            null
              ? void 0
              : l.shorter,
        }),
        variants: [
          { props: (x) => !x.hasSvgAsChild, style: { fill: "currentColor" } },
          { props: { fontSize: "inherit" }, style: { fontSize: "inherit" } },
          {
            props: { fontSize: "small" },
            style: {
              fontSize:
                ((s = (o = t.typography) == null ? void 0 : o.pxToRem) == null
                  ? void 0
                  : s.call(o, 20)) || "1.25rem",
            },
          },
          {
            props: { fontSize: "medium" },
            style: {
              fontSize:
                ((f = (c = t.typography) == null ? void 0 : c.pxToRem) == null
                  ? void 0
                  : f.call(c, 24)) || "1.5rem",
            },
          },
          {
            props: { fontSize: "large" },
            style: {
              fontSize:
                ((m = (p = t.typography) == null ? void 0 : p.pxToRem) == null
                  ? void 0
                  : m.call(p, 35)) || "2.1875rem",
            },
          },
          ...Object.entries((t.vars ?? t).palette)
            .filter(([, x]) => x && x.main)
            .map(([x]) => {
              var S, E;
              return {
                props: { color: x },
                style: {
                  color:
                    (E = (S = (t.vars ?? t).palette) == null ? void 0 : S[x]) ==
                    null
                      ? void 0
                      : E.main,
                },
              };
            }),
          {
            props: { color: "action" },
            style: {
              color:
                (g = (h = (t.vars ?? t).palette) == null ? void 0 : h.action) ==
                null
                  ? void 0
                  : g.active,
            },
          },
          {
            props: { color: "disabled" },
            style: {
              color:
                (A = (v = (t.vars ?? t).palette) == null ? void 0 : v.action) ==
                null
                  ? void 0
                  : A.disabled,
            },
          },
          { props: { color: "inherit" }, style: { color: void 0 } },
        ],
      };
    }),
  ),
  op = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiSvgIcon" }),
      {
        children: s,
        className: c,
        color: f = "inherit",
        component: p = "svg",
        fontSize: m = "medium",
        htmlColor: h,
        inheritViewBox: g = !1,
        titleAccess: v,
        viewBox: A = "0 0 24 24",
        ...x
      } = o,
      S = b.isValidElement(s) && s.type === "svg",
      E = {
        ...o,
        color: f,
        component: p,
        fontSize: m,
        instanceFontSize: r.fontSize,
        inheritViewBox: g,
        viewBox: A,
        hasSvgAsChild: S,
      },
      C = {};
    g || (C.viewBox = A);
    const B = hO(E);
    return q.jsxs(mO, {
      as: p,
      className: Te(B.root, c),
      focusable: "false",
      color: h,
      "aria-hidden": v ? void 0 : !0,
      role: v ? "img" : void 0,
      ref: l,
      ...C,
      ...x,
      ...(S && s.props),
      ownerState: E,
      children: [
        S ? s.props.children : s,
        v ? q.jsx("title", { children: v }) : null,
      ],
    });
  });
op.muiName = "SvgIcon";
function Jl(t, r) {
  function l(o, s) {
    return q.jsx(op, { "data-testid": void 0, ref: s, ...o, children: t });
  }
  return ((l.muiName = op.muiName), b.memo(b.forwardRef(l)));
}
function ip(t, r) {
  typeof t == "function" ? t(r) : t && (t.current = r);
}
function tv(t) {
  const { controlled: r, default: l, name: o, state: s = "value" } = t,
    { current: c } = b.useRef(r !== void 0),
    [f, p] = b.useState(l),
    m = c ? r : f,
    h = b.useCallback((g) => {
      c || p(g);
    }, []);
  return [m, h];
}
function f1(t, r) {
  const l = t.charCodeAt(2);
  return (
    t[0] === "o" && t[1] === "n" && l >= 65 && l <= 90 && typeof r == "function"
  );
}
function gO(t, r) {
  if (!t) return r;
  function l(f, p) {
    const m = {};
    return (
      Object.keys(p).forEach((h) => {
        f1(h, p[h]) &&
          typeof f[h] == "function" &&
          (m[h] = (...g) => {
            (f[h](...g), p[h](...g));
          });
      }),
      m
    );
  }
  if (typeof t == "function" || typeof r == "function")
    return (f) => {
      const p = typeof r == "function" ? r(f) : r,
        m = typeof t == "function" ? t({ ...f, ...p }) : t,
        h = Te(
          f == null ? void 0 : f.className,
          p == null ? void 0 : p.className,
          m == null ? void 0 : m.className,
        ),
        g = l(m, p);
      return {
        ...p,
        ...m,
        ...g,
        ...(!!h && { className: h }),
        ...((p == null ? void 0 : p.style) &&
          (m == null ? void 0 : m.style) && {
            style: { ...p.style, ...m.style },
          }),
        ...((p == null ? void 0 : p.sx) &&
          (m == null ? void 0 : m.sx) && {
            sx: [
              ...(Array.isArray(p.sx) ? p.sx : [p.sx]),
              ...(Array.isArray(m.sx) ? m.sx : [m.sx]),
            ],
          }),
      };
    };
  const o = r,
    s = l(t, o),
    c = Te(o == null ? void 0 : o.className, t == null ? void 0 : t.className);
  return {
    ...r,
    ...t,
    ...s,
    ...(!!c && { className: c }),
    ...((o == null ? void 0 : o.style) &&
      (t == null ? void 0 : t.style) && { style: { ...o.style, ...t.style } }),
    ...((o == null ? void 0 : o.sx) &&
      (t == null ? void 0 : t.sx) && {
        sx: [
          ...(Array.isArray(o.sx) ? o.sx : [o.sx]),
          ...(Array.isArray(t.sx) ? t.sx : [t.sx]),
        ],
      }),
  };
}
const nv = {};
function Xp(t, r) {
  const l = b.useRef(nv);
  return (l.current === nv && (l.current = t(r)), l);
}
function yO(t) {
  const r = Xp(() => vO(t)).current;
  return ((r.next = t), nn(r.effect), r);
}
function vO(t) {
  const r = {
    current: t,
    next: t,
    effect: () => {
      r.current = r.next;
    },
  };
  return r;
}
const rv = _v.createContext(null);
function bO(t) {
  if (t == null) return { appear: void 0, enter: void 0, exit: void 0 };
  if (typeof t == "number") return { appear: t, enter: t, exit: t };
  const r = t.enter,
    l = t.exit;
  return { appear: t.appear !== void 0 ? t.appear : r, enter: r, exit: l };
}
function SO(t) {
  if (t.autoTimeout != null) return t.autoTimeout;
  const r = bO(t.timeout);
  return t.currentStatus === "entering"
    ? t.isAppearing
      ? (r.appear ?? r.enter ?? null)
      : (r.enter ?? null)
    : (r.exit ?? null);
}
function d1(t) {
  const {
      in: r = !1,
      appear: l = !1,
      enter: o = !0,
      exit: s = !0,
      mountOnEnter: c = !1,
      unmountOnExit: f = !1,
      timeout: p,
      addEndListener: m,
      reduceMotion: h = !1,
      getAutoTimeout: g,
      nodeRef: v,
      onEnter: A,
      onEntering: x,
      onEntered: S,
      onExit: E,
      onExiting: C,
      onExited: B,
      children: D,
      ...w
    } = t,
    k = b.useContext(rv),
    O = k && !k.isMounting ? o : l,
    [U, I] = b.useState(() =>
      r ? (O ? "exited" : "entered") : c || f ? "unmounted" : "exited",
    ),
    X = b.useRef(U);
  ((X.current = U),
    r && U === "unmounted" && ((X.current = "exited"), I("exited")));
  const le = b.useRef(r && O),
    ue = b.useRef(!1),
    Z = b.useRef(null),
    R = b.useRef(U),
    F = b.useRef(!1),
    L = b.useRef(h),
    z = yO({
      timeout: p,
      addEndListener: m,
      reduceMotion: h,
      getAutoTimeout: g,
      onEnter: A,
      onEntering: x,
      onEntered: S,
      onExit: E,
      onExiting: C,
      onExited: B,
      enter: o,
      exit: s,
      mountOnEnter: c,
      unmountOnExit: f,
      nodeRef: v,
      parentGroup: k,
    }),
    M = b.useCallback(() => {
      Z.current !== null && (Z.current.cancel(), (Z.current = null));
    }, []),
    $ = b.useCallback((ne) => {
      let ee = !0;
      const oe = () => {
        ee && ((ee = !1), (Z.current = null), ne());
      };
      return (
        (oe.cancel = () => {
          ee = !1;
        }),
        (Z.current = oe),
        oe
      );
    }, []),
    W = b.useCallback(
      (ne, ee) => {
        var Mt, ke;
        let oe;
        const he = () => {
            oe !== void 0 && (clearTimeout(oe), (oe = void 0));
          },
          ce = $(() => {
            (he(), (X.current = ne), I(ne));
          }),
          be = ce.cancel;
        ce.cancel = () => {
          (he(), be());
        };
        const fe = z.current.nodeRef.current,
          Se = z.current.addEndListener,
          Oe = z.current.getAutoTimeout !== void 0,
          rt =
            (ke = (Mt = z.current).getAutoTimeout) == null
              ? void 0
              : ke.call(Mt),
          Ye = SO({
            currentStatus: ee,
            isAppearing: F.current,
            timeout: z.current.timeout,
            autoTimeout: rt,
          }),
          ze = L.current,
          Ee = Ye ?? (ze && Oe ? 0 : null),
          Et = (an) => {
            oe = setTimeout(ce, an);
          };
        if (!fe) {
          Et(0);
          return;
        }
        if (Se) {
          (Ee != null && Et(ze ? 0 : Ee), Se.length >= 2 ? Se(fe, ce) : Se(ce));
          return;
        }
        Et(ze ? 0 : (Ye ?? 0));
      },
      [$, z],
    ),
    se = b.useCallback(
      (ne) => {
        var he;
        const ee = z.current,
          oe = ee.parentGroup ? ee.parentGroup.isMounting : ne;
        if (((F.current = oe), !ne && !ee.enter)) {
          ((X.current = "entered"), I("entered"));
          return;
        }
        ((L.current = ee.reduceMotion),
          (he = ee.onEnter) == null || he.call(ee, oe),
          (X.current = "entering"),
          I("entering"));
      },
      [z],
    ),
    N = b.useCallback(() => {
      var ee;
      const ne = z.current;
      if (!ne.exit) {
        ((X.current = "exited"), I("exited"));
        return;
      }
      ((L.current = ne.reduceMotion),
        (ee = ne.onExit) == null || ee.call(ne),
        (X.current = "exiting"),
        I("exiting"));
    }, [z]),
    V = b.useCallback(
      (ne, ee) => {
        if ((M(), ee === "entering")) {
          const oe = z.current;
          if (oe.mountOnEnter || oe.unmountOnExit) {
            const he = oe.nodeRef.current;
            he && Yp(he);
          }
          se(ne);
        } else N();
      },
      [M, se, N, z],
    );
  return (
    nn(
      () => (
        (ue.current = !0),
        le.current && ((le.current = !1), V(!0, "entering")),
        () => {
          ((ue.current = !1), M());
        }
      ),
      [M, V],
    ),
    nn(() => {
      if (!ue.current) return;
      const ne = X.current;
      r
        ? ne !== "entering" && ne !== "entered" && V(!1, "entering")
        : ne === "entering" || ne === "entered"
          ? V(!1, "exiting")
          : ne === "exited" && f && ((X.current = "unmounted"), I("unmounted"));
    }, [r, U, f, V]),
    nn(() => {
      var oe, he, ce, be;
      if (U === "unmounted" || R.current === "unmounted") {
        R.current = U;
        return;
      }
      if (R.current === U) return;
      R.current = U;
      const ee = z.current;
      U === "entering"
        ? ((oe = ee.onEntering) == null || oe.call(ee, F.current),
          W("entered", "entering"))
        : U === "exiting"
          ? ((he = ee.onExiting) == null || he.call(ee), W("exited", "exiting"))
          : U === "entered"
            ? (ce = ee.onEntered) == null || ce.call(ee, F.current)
            : U === "exited" && ((be = ee.onExited) == null || be.call(ee));
    }, [z, W, U]),
    U === "unmounted"
      ? null
      : q.jsx(rv.Provider, { value: null, children: D(U, w) })
  );
}
const p1 = "(prefers-reduced-motion: reduce)",
  xO = 0,
  RO = "0ms",
  EO = () => {},
  av = () => !1,
  TO = () => !0,
  CO = () => EO;
function AO(t) {
  const [r, l] = b.useState(() => ({ enabled: t, matches: t ? null : !1 }));
  let o = r.matches;
  return (
    r.enabled !== t && ((o = null), t || (o = !1)),
    nn(() => {
      const s = (p) => {
        l((m) =>
          m.enabled === t && m.matches === p ? m : { enabled: t, matches: p },
        );
      };
      if (!t) {
        r.enabled && s(!1);
        return;
      }
      if (typeof window > "u" || typeof window.matchMedia != "function") {
        s(!1);
        return;
      }
      const c = window.matchMedia(p1),
        f = () => {
          s(c.matches);
        };
      return (
        f(),
        c.addEventListener("change", f),
        () => {
          c.removeEventListener("change", f);
        }
      );
    }, [t, r.enabled]),
    o
  );
}
const wO = { ...Su },
  h1 = wO.useSyncExternalStore;
function OO(t) {
  const r = t ? TO : av,
    [l, o] = b.useMemo(() => {
      if (!t || typeof window > "u" || typeof window.matchMedia != "function")
        return [av, CO];
      const s = window.matchMedia(p1);
      return [
        () => s.matches,
        (c) => (
          s.addEventListener("change", c),
          () => {
            s.removeEventListener("change", c);
          }
        ),
      ];
    }, [t]);
  return h1(o, l, r);
}
const MO = h1 !== void 0 ? OO : AO;
function Qp(t, r) {
  const l = MO(!r && t === "system"),
    o = !r && (t === "always" || (t === "system" && l !== !1));
  return b.useMemo(
    () => ({
      shouldReduceMotion: o,
      getTransitionTiming(s) {
        return o ? { duration: xO, delay: RO } : s;
      },
    }),
    [o],
  );
}
function m1(t, r, l) {
  return t === void 0 || Au(t)
    ? r
    : { ...r, ownerState: { ...r.ownerState, ...l } };
}
function g1(t, r, l) {
  return typeof t == "function" ? t(r, l) : t;
}
function y1(t) {
  if (t === void 0) return {};
  const r = {};
  for (const l of Object.keys(t)) f1(l, t[l]) && (r[l] = t[l]);
  return r;
}
function lv(t) {
  if (t === void 0) return {};
  const r = {};
  return (
    Object.keys(t)
      .filter((l) => !(l.match(/^on[A-Z]/) && typeof t[l] == "function"))
      .forEach((l) => {
        r[l] = t[l];
      }),
    r
  );
}
function v1(t) {
  const {
    getSlotProps: r,
    additionalProps: l,
    externalSlotProps: o,
    externalForwardedProps: s,
    className: c,
  } = t;
  if (!r) {
    const x = Te(
        l == null ? void 0 : l.className,
        c,
        s == null ? void 0 : s.className,
        o == null ? void 0 : o.className,
      ),
      S = {
        ...(l == null ? void 0 : l.style),
        ...(s == null ? void 0 : s.style),
        ...(o == null ? void 0 : o.style),
      },
      E = { ...l, ...s, ...o };
    return (
      x.length > 0 && (E.className = x),
      Object.keys(S).length > 0 && (E.style = S),
      { props: E, internalRef: void 0 }
    );
  }
  const f = y1({ ...s, ...o }),
    p = lv(o),
    m = lv(s),
    h = r(f),
    g = Te(
      h == null ? void 0 : h.className,
      l == null ? void 0 : l.className,
      c,
      s == null ? void 0 : s.className,
      o == null ? void 0 : o.className,
    ),
    v = {
      ...(h == null ? void 0 : h.style),
      ...(l == null ? void 0 : l.style),
      ...(s == null ? void 0 : s.style),
      ...(o == null ? void 0 : o.style),
    },
    A = { ...h, ...l, ...m, ...p };
  return (
    g.length > 0 && (A.className = g),
    Object.keys(v).length > 0 && (A.style = v),
    { props: A, internalRef: h.ref }
  );
}
function yt(t, r) {
  const {
      className: l,
      elementType: o,
      ownerState: s,
      externalForwardedProps: c,
      internalForwardedProps: f,
      shouldForwardComponentProp: p = !1,
      ...m
    } = r,
    {
      component: h,
      slots: g = { [t]: void 0 },
      slotProps: v = { [t]: void 0 },
      ...A
    } = c,
    x = g[t] || o,
    S = g1(v[t], s),
    {
      props: { component: E, ...C },
      internalRef: B,
    } = v1({
      className: l,
      ...m,
      externalForwardedProps: t === "root" ? A : void 0,
      externalSlotProps: S,
    }),
    D = rn(B, S == null ? void 0 : S.ref, r.ref),
    w = t === "root" ? E || h : E,
    k = m1(
      x,
      {
        ...(t === "root" && !h && !g[t] && f),
        ...(t !== "root" && !g[t] && f),
        ...C,
        ...(w && !p && { as: w }),
        ...(w && p && { component: w }),
        ref: D,
      },
      s,
    );
  return [x, k];
}
function NO(t) {
  return $e("MuiPaper", t);
}
Ke("MuiPaper", [
  "root",
  "rounded",
  "outlined",
  "elevation",
  "elevation0",
  "elevation1",
  "elevation2",
  "elevation3",
  "elevation4",
  "elevation5",
  "elevation6",
  "elevation7",
  "elevation8",
  "elevation9",
  "elevation10",
  "elevation11",
  "elevation12",
  "elevation13",
  "elevation14",
  "elevation15",
  "elevation16",
  "elevation17",
  "elevation18",
  "elevation19",
  "elevation20",
  "elevation21",
  "elevation22",
  "elevation23",
  "elevation24",
]);
const BO = (t) => {
    const { square: r, elevation: l, variant: o, classes: s } = t,
      c = {
        root: [
          "root",
          o,
          !r && "rounded",
          o === "elevation" && `elevation${l}`,
        ],
      };
    return He(c, NO, s);
  },
  _O = pe("div", {
    name: "MuiPaper",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        r[l.variant],
        !l.square && r.rounded,
        l.variant === "elevation" && r[`elevation${l.elevation}`],
      ];
    },
  })(
    ot(({ theme: t }) => ({
      backgroundColor: (t.vars || t).palette.background.paper,
      color: (t.vars || t).palette.text.primary,
      ...zt(t, "box-shadow"),
      variants: [
        {
          props: ({ ownerState: r }) => !r.square,
          style: { borderRadius: t.shape.borderRadius },
        },
        {
          props: { variant: "outlined" },
          style: { border: `1px solid ${(t.vars || t).palette.divider}` },
        },
        {
          props: { variant: "elevation" },
          style: {
            boxShadow: "var(--Paper-shadow)",
            backgroundImage: "var(--Paper-overlay)",
          },
        },
      ],
    })),
  ),
  sc = b.forwardRef(function (r, l) {
    var x;
    const o = Fe({ props: r, name: "MuiPaper" }),
      s = ji(),
      {
        className: c,
        component: f = "div",
        elevation: p = 1,
        square: m = !1,
        variant: h = "elevation",
        ...g
      } = o,
      v = { ...o, component: f, elevation: p, square: m, variant: h },
      A = BO(v);
    return q.jsx(_O, {
      as: f,
      ownerState: v,
      className: Te(A.root, c),
      ref: l,
      ...g,
      style: {
        ...(h === "elevation" && {
          "--Paper-shadow": (s.vars || s).shadows[p],
          ...(s.vars && {
            "--Paper-overlay": (x = s.vars.overlays) == null ? void 0 : x[p],
          }),
          ...(!s.vars &&
            s.palette.mode === "dark" && {
              "--Paper-overlay": `linear-gradient(${Ci("#fff", ap(p))}, ${Ci("#fff", ap(p))})`,
            }),
        }),
        ...g.style,
      },
    });
  });
function Nu(t) {
  try {
    return t.matches(":focus-visible");
  } catch {}
  return !1;
}
function DO(t) {
  const {
      focusableWhenDisabled: r,
      disabled: l,
      composite: o = !1,
      tabIndex: s = 0,
      isNativeButton: c,
    } = t,
    f = o && r !== !1,
    p = o && r === !1;
  return b.useMemo(() => {
    const h = {
      onKeyDown(g) {
        l && r && g.key !== "Tab" && g.preventDefault();
      },
    };
    return (
      o || ((h.tabIndex = s), !c && l && (h.tabIndex = r ? s : -1)),
      ((c && (r || f)) || (!c && l)) && (h["aria-disabled"] = l),
      c && (!r || p) && (h.disabled = l),
      h
    );
  }, [o, l, r, f, p, c, s]);
}
const zO = {};
function kO(t) {
  const {
      nativeButton: r,
      disabled: l,
      type: o,
      hasFormAction: s = !1,
      tabIndex: c = 0,
      focusableWhenDisabled: f,
      stopEventPropagation: p = !1,
      onBeforeKeyDown: m,
      onBeforeKeyUp: h,
    } = t,
    g = b.useRef(null),
    v = f === !0,
    A = DO({
      focusableWhenDisabled: v,
      disabled: l,
      isNativeButton: r,
      tabIndex: c,
    }),
    x = b.useCallback(() => {
      const C = g.current;
      return C == null
        ? r
        : C.tagName === "BUTTON"
          ? !0
          : !!(C.tagName === "A" && C.href);
    }, [r]),
    S = b.useMemo(() => {
      const C = v ? {} : { tabIndex: l ? -1 : c };
      return (
        r
          ? ((C.type = o === void 0 && !s ? "button" : o),
            v || (C.disabled = l))
          : ((C.role = "button"), !v && l && (C["aria-disabled"] = l)),
        v ? { ...C, ...A } : C
      );
    }, [l, v, A, s, r, c, o]);
  return {
    getButtonProps: b.useCallback(
      (C = zO) => {
        const { onClick: B, onKeyDown: D, onKeyUp: w, ...k } = C;
        return {
          ...S,
          ...k,
          onClick: (X) => {
            if ((p && X.stopPropagation(), l)) {
              X.preventDefault();
              return;
            }
            B == null || B(X);
          },
          onKeyDown: (X) => {
            if (
              (v && A.onKeyDown(X),
              !l &&
                (m == null || m(X),
                D == null || D(X),
                !(X.target !== X.currentTarget || x())))
            ) {
              if (X.key === " ") {
                X.preventDefault();
                return;
              }
              X.key === "Enter" &&
                (X.preventDefault(), X.currentTarget.click());
            }
          },
          onKeyUp: (X) => {
            l ||
              (h == null || h(X),
              w == null || w(X),
              X.target === X.currentTarget &&
                !x() &&
                X.key === " " &&
                !X.defaultPrevented &&
                X.currentTarget.click());
          },
        };
      },
      [S, l, v, A, x, m, h, p],
    ),
    rootRef: g,
  };
}
class Bu {
  constructor() {
    Qo(this, "mountEffect", () => {
      this.shouldMount &&
        !this.didMount &&
        this.ref.current !== null &&
        ((this.didMount = !0), this.mounted.resolve());
    });
    ((this.ref = { current: null }),
      (this.mounted = null),
      (this.didMount = !1),
      (this.shouldMount = !1),
      (this.setShouldMount = null));
  }
  static create() {
    return new Bu();
  }
  static use() {
    const r = Xp(Bu.create).current,
      [l, o] = b.useState(!1);
    return (
      (r.shouldMount = l),
      (r.setShouldMount = o),
      b.useEffect(r.mountEffect, [l]),
      r
    );
  }
  mount() {
    return (
      this.mounted ||
        ((this.mounted = LO()),
        (this.shouldMount = !0),
        this.setShouldMount(this.shouldMount)),
      this.mounted
    );
  }
  start(...r) {
    this.mount().then(() => {
      var l;
      return (l = this.ref.current) == null ? void 0 : l.start(...r);
    });
  }
  stop(...r) {
    this.mount().then(() => {
      var l;
      return (l = this.ref.current) == null ? void 0 : l.stop(...r);
    });
  }
  pulsate(...r) {
    this.mount().then(() => {
      var l;
      return (l = this.ref.current) == null ? void 0 : l.pulsate(...r);
    });
  }
}
function UO() {
  return Bu.use();
}
function LO() {
  let t, r;
  const l = new Promise((o, s) => {
    ((t = o), (r = s));
  });
  return ((l.resolve = t), (l.reject = r), l);
}
const jO = [];
function b1(t) {
  b.useEffect(t, jO);
}
class Zp {
  constructor() {
    Qo(this, "currentId", null);
    Qo(this, "clear", () => {
      this.currentId !== null &&
        (clearTimeout(this.currentId), (this.currentId = null));
    });
    Qo(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new Zp();
  }
  start(r, l) {
    (this.clear(),
      (this.currentId = setTimeout(() => {
        ((this.currentId = null), l());
      }, r)));
  }
}
function ci() {
  const t = Xp(Zp.create).current;
  return (b1(t.disposeEffect), t);
}
function $O(t) {
  const {
      className: r,
      classes: l,
      pulsate: o = !1,
      rippleX: s,
      rippleY: c,
      rippleSize: f,
      in: p,
      onExited: m,
      timeout: h,
    } = t,
    [g, v] = b.useState(!1),
    A = ci(),
    x = b.useRef(!1),
    S = b.useRef(m);
  S.current = m;
  const E = m != null,
    C = Te(r, l.ripple, l.rippleVisible, o && l.ripplePulsate),
    B = { width: f, height: f, top: -(f / 2) + c, left: -(f / 2) + s },
    D = Te(l.child, g && l.childLeaving, o && l.childPulsate);
  return (
    !p && !g && v(!0),
    b.useEffect(() => {
      !p && E
        ? x.current ||
          ((x.current = !0),
          A.start(h, () => {
            var w;
            ((x.current = !1), (w = S.current) == null || w.call(S));
          }))
        : ((x.current = !1), A.clear());
    }, [A, E, p, h]),
    q.jsx("span", {
      className: C,
      style: B,
      children: q.jsx("span", { className: D }),
    })
  );
}
const tn = Ke("MuiTouchRipple", [
    "root",
    "ripple",
    "rippleVisible",
    "ripplePulsate",
    "child",
    "childLeaving",
    "childPulsate",
  ]),
  sp = 550,
  HO = 80,
  au = {},
  ov = [],
  qO = () => {};
function Hd(t, r) {
  const l = new Set(r),
    o = new Map();
  let s = [];
  for (const f of t)
    l.has(f) ? s.length > 0 && (o.set(f, s), (s = [])) : s.push(f);
  const c = [];
  for (const f of r) {
    const p = o.get(f);
    (p && c.push(...p), c.push(f));
  }
  return (c.push(...s), c);
}
function PO({ event: t, element: r, center: l }) {
  const o = r
    ? r.getBoundingClientRect()
    : { width: 0, height: 0, left: 0, top: 0 };
  let s, c;
  if (
    l ||
    t === void 0 ||
    (t.clientX === 0 && t.clientY === 0) ||
    (!t.clientX && !t.touches)
  )
    ((s = Math.round(o.width / 2)), (c = Math.round(o.height / 2)));
  else {
    const { clientX: p, clientY: m } =
      t.touches && t.touches.length > 0 ? t.touches[0] : t;
    ((s = Math.round(p - o.left)), (c = Math.round(m - o.top)));
  }
  let f;
  if (l)
    ((f = Math.sqrt((2 * o.width ** 2 + o.height ** 2) / 3)),
      f % 2 === 0 && (f += 1));
  else {
    const p = Math.max(Math.abs((r ? r.clientWidth : 0) - s), s) * 2 + 2,
      m = Math.max(Math.abs((r ? r.clientHeight : 0) - c), c) * 2 + 2;
    f = Math.sqrt(p ** 2 + m ** 2);
  }
  return { rippleX: s, rippleY: c, rippleSize: f };
}
const IO = ki`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,
  FO = ki`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,
  YO = ki`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
function VO(t) {
  if (t.motion.reducedMotion === "always") return null;
  const r = xi`
    &.${tn.rippleVisible} {
      animation-name: ${IO};
      animation-duration: ${sp}ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
    }

    &.${tn.ripplePulsate} {
      animation-duration: ${t.transitions.duration.shorter}ms;
    }

    & .${tn.childLeaving} {
      animation-name: ${FO};
      animation-duration: ${sp}ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
    }

    & .${tn.childPulsate} {
      animation-name: ${YO};
      animation-duration: 2500ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;
  return t.motion.reducedMotion === "system"
    ? xi`
      @media (prefers-reduced-motion: no-preference) {
        ${r}
      }
    `
    : r;
}
const GO = pe("span", { name: "MuiTouchRipple", slot: "Root" })({
    overflow: "hidden",
    pointerEvents: "none",
    position: "absolute",
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: "inherit",
  }),
  KO = pe($O, { name: "MuiTouchRipple", slot: "Ripple" })`
  opacity: 0;
  position: absolute;

  &.${tn.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${tn.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${tn.childLeaving} {
    opacity: 0;
  }

  & .${tn.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({ theme: t }) => VO(t)}
`,
  XO = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiTouchRipple" }),
      s = ji(),
      c = Qp(s.motion.reducedMotion, !1),
      { center: f = !1, classes: p = au, className: m, ...h } = o,
      [g, v] = b.useState({ items: ov, order: ov }),
      A = g.items,
      x = b.useRef(0),
      S = b.useRef(null),
      E = b.useRef(!1);
    (b1(
      () => (
        (E.current = !0),
        () => {
          E.current = !1;
        }
      ),
    ),
      b.useEffect(() => {
        S.current && (S.current(), (S.current = null));
      }, [A]));
    const C = b.useRef(!1),
      B = ci(),
      D = b.useRef(null),
      w = b.useRef(null),
      k = Ht((Z) => {
        E.current &&
          v((R) => {
            const F = R.items.filter((z) => z.key !== Z),
              L = Hd(
                R.order.filter((z) => z !== Z),
                F.filter((z) => !z.exiting).map((z) => z.key),
              );
            return { items: F, order: L };
          });
      }),
      O = Ht((Z) => {
        const { pulsate: R, rippleX: F, rippleY: L, rippleSize: z, cb: M } = Z,
          $ = x.current;
        ((x.current += 1),
          v((W) => {
            const se = [
              ...W.items,
              {
                key: $,
                pulsate: R,
                rippleX: F,
                rippleY: L,
                rippleSize: z,
                exiting: !1,
              },
            ];
            return {
              items: se,
              order: Hd(
                W.order,
                se.filter((N) => !N.exiting).map((N) => N.key),
              ),
            };
          }),
          (S.current = M));
      }),
      U = Ht((Z = au, R = au, F = qO) => {
        const {
          pulsate: L = !1,
          center: z = f || R.pulsate,
          fakeElement: M = !1,
        } = R;
        if ((Z == null ? void 0 : Z.type) === "mousedown" && C.current) {
          C.current = !1;
          return;
        }
        (Z == null ? void 0 : Z.type) === "touchstart" && (C.current = !0);
        const $ = M ? null : w.current,
          {
            rippleX: W,
            rippleY: se,
            rippleSize: N,
          } = PO({ event: Z, element: $, center: z });
        Z != null && Z.touches
          ? D.current === null &&
            ((D.current = () => {
              O({ pulsate: L, rippleX: W, rippleY: se, rippleSize: N, cb: F });
            }),
            B.start(HO, () => {
              D.current && (D.current(), (D.current = null));
            }))
          : O({ pulsate: L, rippleX: W, rippleY: se, rippleSize: N, cb: F });
      }),
      I = Ht(() => {
        U(au, { pulsate: !0 });
      }),
      X = Ht((Z, R) => {
        if (
          (B.clear(), (Z == null ? void 0 : Z.type) === "touchend" && D.current)
        ) {
          (D.current(),
            (D.current = null),
            B.start(0, () => {
              X(Z, R);
            }));
          return;
        }
        ((D.current = null),
          v((F) => {
            const L = F.items.findIndex((M) => !M.exiting);
            if (L === -1) return F;
            const z = F.items.slice();
            return (
              (z[L] = { ...z[L], exiting: !0 }),
              {
                items: z,
                order: Hd(
                  F.order,
                  z.filter((M) => !M.exiting).map((M) => M.key),
                ),
              }
            );
          }),
          (S.current = R));
      });
    b.useImperativeHandle(l, () => ({ pulsate: I, start: U, stop: X }), [
      I,
      U,
      X,
    ]);
    const le = new Map(A.map((Z) => [Z.key, Z])),
      ue = g.order.map((Z) => le.get(Z)).filter(Boolean);
    return q.jsx(GO, {
      className: Te(tn.root, p.root, m),
      ref: w,
      ...h,
      children: ue.map((Z) =>
        q.jsx(
          KO,
          {
            classes: {
              ripple: Te(p.ripple, tn.ripple),
              rippleVisible: Te(p.rippleVisible, tn.rippleVisible),
              ripplePulsate: Te(p.ripplePulsate, tn.ripplePulsate),
              child: Te(p.child, tn.child),
              childLeaving: Te(p.childLeaving, tn.childLeaving),
              childPulsate: Te(p.childPulsate, tn.childPulsate),
            },
            timeout: c.shouldReduceMotion ? 0 : sp,
            pulsate: Z.pulsate,
            rippleX: Z.rippleX,
            rippleY: Z.rippleY,
            rippleSize: Z.rippleSize,
            in: !Z.exiting,
            onExited: () => k(Z.key),
          },
          Z.key,
        ),
      ),
    });
  });
function QO(t) {
  return $e("MuiButtonBase", t);
}
const ZO = Ke("MuiButtonBase", ["root", "disabled", "focusVisible"]),
  WO = (t) => {
    const {
        disabled: r,
        focusVisible: l,
        focusVisibleClassName: o,
        suppressFocusVisible: s,
        classes: c,
      } = t,
      p = He(
        { root: ["root", r && "disabled", l && !s && "focusVisible"] },
        QO,
        c,
      );
    return (l && !s && o && (p.root += ` ${o}`), p);
  },
  JO = pe("button", { name: "MuiButtonBase", slot: "Root" })({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    WebkitTapHighlightColor: "transparent",
    backgroundColor: "transparent",
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    MozAppearance: "none",
    WebkitAppearance: "none",
    textDecoration: "none",
    color: "inherit",
    "&::-moz-focus-inner": { borderStyle: "none" },
    [`&.${ZO.disabled}`]: { pointerEvents: "none", cursor: "default" },
    "@media print": { colorAdjust: "exact" },
  }),
  S1 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiButtonBase" }),
      {
        action: s,
        centerRipple: c = !1,
        children: f,
        className: p,
        component: m = "button",
        disabled: h = !1,
        disableRipple: g = !1,
        disableTouchRipple: v = !1,
        focusRipple: A = !1,
        focusVisibleClassName: x,
        focusableWhenDisabled: S,
        suppressFocusVisible: E = !1,
        internalNativeButton: C,
        LinkComponent: B = "a",
        nativeButton: D,
        onBlur: w,
        onClick: k,
        onContextMenu: O,
        onDragLeave: U,
        onFocus: I,
        onFocusVisible: X,
        onKeyDown: le,
        onKeyUp: ue,
        onMouseDown: Z,
        onMouseLeave: R,
        onMouseUp: F,
        onTouchEnd: L,
        onTouchMove: z,
        onTouchStart: M,
        tabIndex: $ = 0,
        TouchRippleProps: W,
        touchRippleRef: se,
        type: N,
        ...V
      } = o,
      ne = !!(V.href || V.to),
      ee = !!V.formAction;
    let oe = m;
    oe === "button" && ne && (oe = B);
    const ce = D ?? (typeof oe == "string" ? oe === "button" : (C ?? !1)),
      be = UO(),
      fe = rn(be.ref, se),
      [Se, Oe] = b.useState(!1);
    (h || E) && Se && Oe(!1);
    const rt = Ht((at) => {
        A &&
          !at.repeat &&
          Se &&
          at.key === " " &&
          be.stop(at, () => {
            be.start(at);
          });
      }),
      Ye = Ht((at) => {
        A &&
          at.key === " " &&
          Se &&
          !at.defaultPrevented &&
          be.stop(at, () => {
            be.pulsate(at);
          });
      }),
      { getButtonProps: ze, rootRef: Ee } = kO({
        nativeButton: ce,
        disabled: h,
        type: N,
        hasFormAction: ee,
        tabIndex: $,
        onBeforeKeyDown: rt,
        onBeforeKeyUp: Ye,
      }),
      {
        onClick: Et,
        onKeyDown: Mt,
        onKeyUp: ke,
        ...an
      } = ze({ onClick: k, onKeyDown: le, onKeyUp: ue });
    b.useImperativeHandle(
      s,
      () => ({
        focusVisible: () => {
          (Oe(!0), Ee.current.focus());
        },
      }),
      [Ee],
    );
    const ut = be.shouldMount && !g && !h;
    b.useEffect(() => {
      Se && A && !g && be.pulsate();
    }, [g, A, Se, be]);
    const Ln = Dr(be, "start", Z, v),
      En = Dr(be, "stop", O, v),
      ur = Dr(be, "stop", U, v),
      qt = Dr(be, "stop", F, v),
      ya = Dr(
        be,
        "stop",
        (at) => {
          (Se && at.preventDefault(), R && R(at));
        },
        v,
      ),
      cr = Dr(be, "start", M, v),
      Nt = Dr(be, "stop", L, v),
      Ue = Dr(be, "stop", z, v),
      it = Dr(
        be,
        "stop",
        (at) => {
          (Nu(at.target) || Oe(!1), w && w(at));
        },
        !1,
      ),
      vt = Ht((at) => {
        (Ee.current || (Ee.current = at.currentTarget),
          !E && Nu(at.target) && (Oe(!0), X && X(at)),
          I && I(at));
      }),
      Me = {};
    ne &&
      ((Me.tabIndex = h ? -1 : $),
      h && (Me["aria-disabled"] = h),
      (Me.type = N));
    const Pt = rn(l, Ee),
      kt = {
        ...o,
        centerRipple: c,
        component: m,
        disabled: h,
        disableRipple: g,
        disableTouchRipple: v,
        focusRipple: A,
        suppressFocusVisible: E,
        tabIndex: $,
        focusVisible: Se,
      },
      Yn = WO(kt);
    return q.jsxs(JO, {
      as: oe,
      className: Te(Yn.root, p),
      ownerState: kt,
      onBlur: it,
      onClick: Et,
      onContextMenu: En,
      onFocus: vt,
      onKeyDown: Mt,
      onKeyUp: ke,
      onMouseDown: Ln,
      onMouseLeave: ya,
      onMouseUp: qt,
      onDragLeave: ur,
      onTouchEnd: Nt,
      onTouchMove: Ue,
      onTouchStart: cr,
      ref: Pt,
      ...(ne ? Me : an),
      ...V,
      children: [f, ut ? q.jsx(XO, { ref: fe, center: c, ...W }) : null],
    });
  });
function Dr(t, r, l, o = !1) {
  return Ht((s) => (l && l(s), o || t[r](s), !0));
}
function eM(t) {
  return typeof t.main == "string";
}
function tM(t, r = []) {
  if (!eM(t)) return !1;
  for (const l of r)
    if (!t.hasOwnProperty(l) || typeof t[l] != "string") return !1;
  return !0;
}
function Rn(t = []) {
  return ([, r]) => r && tM(r, t);
}
function nM(t) {
  return $e("MuiAlert", t);
}
const iv = Ke("MuiAlert", [
  "root",
  "action",
  "icon",
  "message",
  "filled",
  "colorSuccess",
  "colorInfo",
  "colorWarning",
  "colorError",
  "outlined",
  "standard",
]);
function rM(t) {
  return $e("MuiCircularProgress", t);
}
Ke("MuiCircularProgress", [
  "root",
  "determinate",
  "indeterminate",
  "colorPrimary",
  "colorSecondary",
  "svg",
  "track",
  "circle",
  "circleDisableShrink",
]);
const qn = 44,
  up = ki`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,
  cp = ki`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,
  aM =
    typeof up != "string"
      ? xi`
        animation: ${up} 1.4s linear infinite;
      `
      : null,
  lM =
    typeof cp != "string"
      ? xi`
        animation: ${cp} 1.4s ease-in-out infinite;
      `
      : null,
  oM = (t) => {
    const { classes: r, variant: l, color: o, disableShrink: s } = t,
      c = {
        root: ["root", l, `color${Ae(o)}`],
        svg: ["svg"],
        track: ["track"],
        circle: ["circle", s && "circleDisableShrink"],
      };
    return He(c, rM, r);
  },
  iM = pe("span", {
    name: "MuiCircularProgress",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.root, r[l.variant], r[`color${Ae(l.color)}`]];
    },
  })(
    ot(({ theme: t }) => {
      const r = Vp(t, { animation: "none" });
      return {
        display: "inline-block",
        variants: [
          {
            props: { variant: "determinate" },
            style: { ...zt(t, "transform") },
          },
          {
            props: { variant: "indeterminate" },
            style: aM || { animation: `${up} 1.4s linear infinite` },
          },
          ...(r ? [{ props: { variant: "indeterminate" }, style: r }] : []),
          ...Object.entries(t.palette)
            .filter(Rn())
            .map(([l]) => ({
              props: { color: l },
              style: { color: (t.vars || t).palette[l].main },
            })),
        ],
      };
    }),
  ),
  sM = pe("svg", { name: "MuiCircularProgress", slot: "Svg" })({
    display: "block",
  }),
  uM = pe("circle", {
    name: "MuiCircularProgress",
    slot: "Circle",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.circle, l.disableShrink && r.circleDisableShrink];
    },
  })(
    ot(({ theme: t }) => {
      const r = Vp(t, { animation: "none" });
      return {
        stroke: "currentColor",
        variants: [
          {
            props: { variant: "determinate" },
            style: { ...zt(t, "stroke-dashoffset") },
          },
          {
            props: { variant: "indeterminate" },
            style: { strokeDasharray: "80px, 200px", strokeDashoffset: 0 },
          },
          {
            props: ({ ownerState: l }) =>
              l.variant === "indeterminate" && !l.disableShrink,
            style: lM || { animation: `${cp} 1.4s ease-in-out infinite` },
          },
          ...(r
            ? [
                {
                  props: ({ ownerState: l }) =>
                    l.variant === "indeterminate" && !l.disableShrink,
                  style: r,
                },
              ]
            : []),
        ],
      };
    }),
  ),
  cM = pe("circle", { name: "MuiCircularProgress", slot: "Track" })(
    ot(({ theme: t }) => ({
      stroke: "currentColor",
      opacity: (t.vars || t).palette.action.activatedOpacity,
    })),
  ),
  x1 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiCircularProgress" }),
      {
        className: s,
        color: c = "primary",
        disableShrink: f = !1,
        enableTrackSlot: p = !1,
        min: m,
        max: h,
        size: g = 40,
        style: v,
        thickness: A = 3.6,
        value: x = o.min ?? 0,
        variant: S = "indeterminate",
        ...E
      } = o,
      C = m ?? 0,
      B = h ?? 100,
      D = {
        ...o,
        color: c,
        disableShrink: f,
        size: g,
        thickness: A,
        value: x,
        variant: S,
        enableTrackSlot: p,
      },
      w = oM(D),
      k = {},
      O = {},
      U = {};
    if (S === "determinate") {
      const I = 2 * Math.PI * ((qn - A) / 2),
        X = B - C;
      ((k.strokeDasharray = I.toFixed(3)),
        (k.strokeDashoffset =
          X > 0 ? `${(((B - x) / X) * I).toFixed(3)}px` : `${I.toFixed(3)}px`),
        (O.transform = "rotate(-90deg)"),
        (U["aria-valuenow"] = x),
        (U["aria-valuemin"] = C),
        (U["aria-valuemax"] = B));
    }
    return q.jsx(iM, {
      className: Te(w.root, s),
      style: { width: g, height: g, ...O, ...v },
      ownerState: D,
      ref: l,
      role: "progressbar",
      ...U,
      ...E,
      children: q.jsxs(sM, {
        className: w.svg,
        ownerState: D,
        viewBox: `${qn / 2} ${qn / 2} ${qn} ${qn}`,
        children: [
          p
            ? q.jsx(cM, {
                className: w.track,
                ownerState: D,
                cx: qn,
                cy: qn,
                r: (qn - A) / 2,
                fill: "none",
                strokeWidth: A,
                "aria-hidden": "true",
              })
            : null,
          q.jsx(uM, {
            className: w.circle,
            style: k,
            ownerState: D,
            cx: qn,
            cy: qn,
            r: (qn - A) / 2,
            fill: "none",
            strokeWidth: A,
          }),
        ],
      }),
    });
  });
function fM(t) {
  return $e("MuiIconButton", t);
}
const sv = Ke("MuiIconButton", [
    "root",
    "disabled",
    "colorInherit",
    "colorPrimary",
    "colorSecondary",
    "colorError",
    "colorInfo",
    "colorSuccess",
    "colorWarning",
    "edgeStart",
    "edgeEnd",
    "sizeSmall",
    "sizeMedium",
    "sizeLarge",
    "loading",
    "loadingIndicator",
    "loadingWrapper",
  ]),
  dM = (t) => {
    const {
        classes: r,
        disabled: l,
        color: o,
        edge: s,
        size: c,
        loading: f,
      } = t,
      p = {
        root: [
          "root",
          f && "loading",
          l && "disabled",
          o !== "default" && `color${Ae(o)}`,
          s && `edge${Ae(s)}`,
          `size${Ae(c)}`,
        ],
        loadingIndicator: ["loadingIndicator"],
        loadingWrapper: ["loadingWrapper"],
      };
    return He(p, fM, r);
  },
  pM = pe(S1, {
    name: "MuiIconButton",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        l.loading && r.loading,
        l.color !== "default" && r[`color${Ae(l.color)}`],
        l.edge && r[`edge${Ae(l.edge)}`],
        r[`size${Ae(l.size)}`],
      ];
    },
  })(
    ot(({ theme: t }) => ({
      textAlign: "center",
      flex: "0 0 auto",
      fontSize: t.typography.pxToRem(24),
      padding: 8,
      borderRadius: "50%",
      color: (t.vars || t).palette.action.active,
      ...zt(t, "background-color", {
        duration: t.transitions.duration.shortest,
      }),
      variants: [
        {
          props: (r) => !r.disableRipple,
          style: {
            "--IconButton-hoverBg": t.alpha(
              (t.vars || t).palette.action.active,
              (t.vars || t).palette.action.hoverOpacity,
            ),
            "&:hover": {
              backgroundColor: "var(--IconButton-hoverBg)",
              "@media (hover: none)": { backgroundColor: "transparent" },
            },
          },
        },
        { props: { edge: "start" }, style: { marginLeft: -12 } },
        { props: { edge: "start", size: "small" }, style: { marginLeft: -3 } },
        { props: { edge: "end" }, style: { marginRight: -12 } },
        { props: { edge: "end", size: "small" }, style: { marginRight: -3 } },
      ],
    })),
    ot(({ theme: t }) => ({
      variants: [
        { props: { color: "inherit" }, style: { color: "inherit" } },
        ...Object.entries(t.palette)
          .filter(Rn())
          .map(([r]) => ({
            props: { color: r },
            style: {
              color: (t.vars || t).palette[r].main,
              "--IconButton-hoverBg": t.alpha(
                (t.vars || t).palette[r].main,
                (t.vars || t).palette.action.hoverOpacity,
              ),
            },
          })),
        {
          props: { size: "small" },
          style: { padding: 5, fontSize: t.typography.pxToRem(18) },
        },
        {
          props: { size: "large" },
          style: { padding: 12, fontSize: t.typography.pxToRem(28) },
        },
      ],
      [`&.${sv.disabled}`]: {
        backgroundColor: "transparent",
        color: (t.vars || t).palette.action.disabled,
      },
      [`&.${sv.loading}`]: { color: "transparent" },
    })),
  ),
  hM = pe("span", { name: "MuiIconButton", slot: "LoadingIndicator" })(
    ({ theme: t }) => ({
      display: "none",
      position: "absolute",
      visibility: "visible",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: (t.vars || t).palette.action.disabled,
      variants: [{ props: { loading: !0 }, style: { display: "flex" } }],
    }),
  ),
  mM = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiIconButton" }),
      {
        edge: s = !1,
        children: c,
        className: f,
        color: p = "default",
        disabled: m = !1,
        disableFocusRipple: h = !1,
        size: g = "medium",
        id: v,
        loading: A = null,
        loadingIndicator: x,
        ...S
      } = o,
      E = Ai(v),
      C = x ?? q.jsx(x1, { "aria-labelledby": E, color: "inherit", size: 16 }),
      B = {
        ...o,
        edge: s,
        color: p,
        disabled: m,
        disableFocusRipple: h,
        loading: A,
        loadingIndicator: C,
        size: g,
      },
      D = dM(B);
    return q.jsxs(pM, {
      id: A ? E : v,
      className: Te(D.root, f),
      centerRipple: !0,
      internalNativeButton: !0,
      focusRipple: !h,
      disabled: m || A,
      ref: l,
      ...S,
      ownerState: B,
      children: [
        typeof A == "boolean" &&
          q.jsx("span", {
            className: D.loadingWrapper,
            style: { display: "contents" },
            children: q.jsx(hM, {
              className: D.loadingIndicator,
              ownerState: B,
              children: A && C,
            }),
          }),
        c,
      ],
    });
  }),
  gM = Jl(
    q.jsx("path", {
      d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z",
    }),
  ),
  yM = Jl(
    q.jsx("path", {
      d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z",
    }),
  ),
  vM = Jl(
    q.jsx("path", {
      d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
    }),
  ),
  bM = Jl(
    q.jsx("path", {
      d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z",
    }),
  ),
  SM = Jl(
    q.jsx("path", {
      d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    }),
  ),
  xM = (t) => {
    const { variant: r, color: l, severity: o, classes: s } = t,
      c = {
        root: ["root", `color${Ae(l || o)}`, `${r}`],
        icon: ["icon"],
        message: ["message"],
        action: ["action"],
      };
    return He(c, nM, s);
  },
  RM = pe(sc, {
    name: "MuiAlert",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.root, r[l.variant]];
    },
  })(
    ot(({ theme: t }) => {
      const r = t.palette.mode === "light" ? t.darken : t.lighten,
        l = t.palette.mode === "light" ? t.lighten : t.darken;
      return {
        ...t.typography.body2,
        backgroundColor: "transparent",
        display: "flex",
        padding: "6px 16px",
        variants: [
          ...Object.entries(t.palette)
            .filter(Rn(["light"]))
            .map(([o]) => ({
              props: { colorSeverity: o, variant: "standard" },
              style: {
                color: t.vars
                  ? t.vars.palette.Alert[`${o}Color`]
                  : r(t.palette[o].light, 0.6),
                backgroundColor: t.vars
                  ? t.vars.palette.Alert[`${o}StandardBg`]
                  : l(t.palette[o].light, 0.9),
                [`& .${iv.icon}`]: t.vars
                  ? { color: t.vars.palette.Alert[`${o}IconColor`] }
                  : { color: t.palette[o].main },
              },
            })),
          ...Object.entries(t.palette)
            .filter(Rn(["light"]))
            .map(([o]) => ({
              props: { colorSeverity: o, variant: "outlined" },
              style: {
                color: t.vars
                  ? t.vars.palette.Alert[`${o}Color`]
                  : r(t.palette[o].light, 0.6),
                border: `1px solid ${(t.vars || t).palette[o].light}`,
                [`& .${iv.icon}`]: t.vars
                  ? { color: t.vars.palette.Alert[`${o}IconColor`] }
                  : { color: t.palette[o].main },
              },
            })),
          ...Object.entries(t.palette)
            .filter(Rn(["dark"]))
            .map(([o]) => ({
              props: { colorSeverity: o, variant: "filled" },
              style: {
                fontWeight: t.typography.fontWeightMedium,
                ...(t.vars
                  ? {
                      color: t.vars.palette.Alert[`${o}FilledColor`],
                      backgroundColor: t.vars.palette.Alert[`${o}FilledBg`],
                    }
                  : {
                      backgroundColor:
                        t.palette.mode === "dark"
                          ? t.palette[o].dark
                          : t.palette[o].main,
                      color: t.palette.getContrastText(t.palette[o].main),
                    }),
              },
            })),
        ],
      };
    }),
  ),
  EM = pe("div", { name: "MuiAlert", slot: "Icon" })({
    marginRight: 12,
    padding: "7px 0",
    display: "flex",
    fontSize: 22,
    opacity: 0.9,
  }),
  TM = pe("div", { name: "MuiAlert", slot: "Message" })({
    padding: "8px 0",
    minWidth: 0,
    overflow: "auto",
  }),
  CM = pe("div", { name: "MuiAlert", slot: "Action" })({
    display: "flex",
    alignItems: "flex-start",
    padding: "4px 0 0 16px",
    marginLeft: "auto",
    marginRight: -8,
  }),
  uv = {
    success: q.jsx(gM, { fontSize: "inherit" }),
    warning: q.jsx(yM, { fontSize: "inherit" }),
    error: q.jsx(vM, { fontSize: "inherit" }),
    info: q.jsx(bM, { fontSize: "inherit" }),
  },
  AM = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiAlert" }),
      {
        action: s,
        children: c,
        className: f,
        closeText: p = "Close",
        color: m,
        icon: h,
        iconMapping: g = uv,
        onClose: v,
        role: A = "alert",
        severity: x = "success",
        slotProps: S = {},
        slots: E = {},
        variant: C = "standard",
        ...B
      } = o,
      D = { ...o, color: m, severity: x, variant: C, colorSeverity: m || x },
      w = xM(D),
      k = { slots: E, slotProps: S },
      [O, U] = yt("root", {
        ref: l,
        shouldForwardComponentProp: !0,
        className: Te(w.root, f),
        elementType: RM,
        externalForwardedProps: { ...k, ...B },
        ownerState: D,
        additionalProps: { role: A, elevation: 0 },
      }),
      [I, X] = yt("icon", {
        className: w.icon,
        elementType: EM,
        externalForwardedProps: k,
        ownerState: D,
      }),
      [le, ue] = yt("message", {
        className: w.message,
        elementType: TM,
        externalForwardedProps: k,
        ownerState: D,
      }),
      [Z, R] = yt("action", {
        className: w.action,
        elementType: CM,
        externalForwardedProps: k,
        ownerState: D,
      }),
      [F, L] = yt("closeButton", {
        elementType: mM,
        externalForwardedProps: k,
        ownerState: D,
      }),
      [z, M] = yt("closeIcon", {
        elementType: SM,
        externalForwardedProps: k,
        ownerState: D,
      });
    return q.jsxs(O, {
      ...U,
      children: [
        h !== !1 ? q.jsx(I, { ...X, children: h || g[x] || uv[x] }) : null,
        q.jsx(le, { ...ue, children: c }),
        s != null ? q.jsx(Z, { ...R, children: s }) : null,
        s == null && v
          ? q.jsx(Z, {
              ...R,
              children: q.jsx(F, {
                size: "small",
                "aria-label": p,
                title: p,
                color: "inherit",
                onClick: v,
                ...L,
                children: q.jsx(z, { fontSize: "small", ...M }),
              }),
            })
          : null,
      ],
    });
  });
function wM(t) {
  return $e("MuiTypography", t);
}
Ke("MuiTypography", [
  "root",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "inherit",
  "button",
  "caption",
  "overline",
  "alignLeft",
  "alignRight",
  "alignCenter",
  "alignJustify",
  "noWrap",
  "gutterBottom",
]);
const OM = (t) => {
    const { align: r, gutterBottom: l, noWrap: o, variant: s, classes: c } = t,
      f = {
        root: [
          "root",
          s,
          t.align !== "inherit" && `align${Ae(r)}`,
          l && "gutterBottom",
          o && "noWrap",
        ],
      };
    return He(f, wM, c);
  },
  MM = pe("span", {
    name: "MuiTypography",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        l.variant && r[l.variant],
        l.align !== "inherit" && r[`align${Ae(l.align)}`],
        l.noWrap && r.noWrap,
        l.gutterBottom && r.gutterBottom,
      ];
    },
  })(
    ot(({ theme: t }) => {
      var r;
      return {
        margin: 0,
        variants: [
          {
            props: { variant: "inherit" },
            style: {
              font: "inherit",
              lineHeight: "inherit",
              letterSpacing: "inherit",
            },
          },
          ...Object.entries(t.typography)
            .filter(([l, o]) => l !== "inherit" && o && typeof o == "object")
            .map(([l, o]) => ({ props: { variant: l }, style: o })),
          ...Object.entries(t.palette)
            .filter(Rn())
            .map(([l]) => ({
              props: { color: l },
              style: { color: (t.vars || t).palette[l].main },
            })),
          ...Object.entries(((r = t.palette) == null ? void 0 : r.text) || {})
            .filter(([, l]) => typeof l == "string")
            .map(([l]) => ({
              props: { color: `text${Ae(l)}` },
              style: { color: (t.vars || t).palette.text[l] },
            })),
          {
            props: ({ ownerState: l }) => l.align !== "inherit",
            style: { textAlign: "var(--Typography-textAlign)" },
          },
          {
            props: ({ ownerState: l }) => l.noWrap,
            style: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          },
          {
            props: ({ ownerState: l }) => l.gutterBottom,
            style: { marginBottom: "0.35em" },
          },
        ],
      };
    }),
  ),
  cv = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subtitle1: "h6",
    subtitle2: "h6",
    body1: "p",
    body2: "p",
    inherit: "p",
  },
  Fa = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiTypography" }),
      {
        color: s,
        align: c = "inherit",
        className: f,
        component: p,
        gutterBottom: m = !1,
        noWrap: h = !1,
        variant: g = "body1",
        variantMapping: v = cv,
        ...A
      } = o,
      x = {
        ...o,
        align: c,
        color: s,
        className: f,
        component: p,
        gutterBottom: m,
        noWrap: h,
        variant: g,
        variantMapping: v,
      },
      S = p || v[g] || cv[g] || "span",
      E = OM(x);
    return q.jsx(MM, {
      as: S,
      ref: l,
      className: Te(E.root, f),
      ...A,
      ownerState: x,
      style: {
        ...(c !== "inherit" && { "--Typography-textAlign": c }),
        ...A.style,
      },
    });
  });
function NM(t) {
  return $e("MuiAppBar", t);
}
Ke("MuiAppBar", [
  "root",
  "positionFixed",
  "positionAbsolute",
  "positionSticky",
  "positionStatic",
  "positionRelative",
  "colorDefault",
  "colorPrimary",
  "colorSecondary",
  "colorInherit",
  "colorTransparent",
  "colorError",
  "colorInfo",
  "colorSuccess",
  "colorWarning",
]);
const BM = (t) => {
    const { color: r, position: l, classes: o } = t,
      s = { root: ["root", `color${Ae(r)}`, `position${Ae(l)}`] };
    return He(s, NM, o);
  },
  fv = (t, r) => (t ? `${t.replace(")", "")}, ${r})` : r),
  _M = pe(sc, {
    name: "MuiAppBar",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.root, r[`position${Ae(l.position)}`], r[`color${Ae(l.color)}`]];
    },
  })(
    ot(({ theme: t }) => ({
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      flexShrink: 0,
      variants: [
        {
          props: { position: "fixed" },
          style: {
            position: "fixed",
            zIndex: (t.vars || t).zIndex.appBar,
            top: 0,
            left: "auto",
            right: 0,
            "@media print": { position: "absolute" },
          },
        },
        {
          props: { position: "absolute" },
          style: {
            position: "absolute",
            zIndex: (t.vars || t).zIndex.appBar,
            top: 0,
            left: "auto",
            right: 0,
          },
        },
        {
          props: { position: "sticky" },
          style: {
            position: "sticky",
            zIndex: (t.vars || t).zIndex.appBar,
            top: 0,
            left: "auto",
            right: 0,
          },
        },
        { props: { position: "static" }, style: { position: "static" } },
        { props: { position: "relative" }, style: { position: "relative" } },
        {
          props: { color: "inherit" },
          style: { "--AppBar-color": "inherit", color: "var(--AppBar-color)" },
        },
        {
          props: { color: "default" },
          style: {
            "--AppBar-background": t.vars
              ? t.vars.palette.AppBar.defaultBg
              : t.palette.grey[100],
            "--AppBar-color": t.vars
              ? t.vars.palette.text.primary
              : t.palette.getContrastText(t.palette.grey[100]),
            ...t.applyStyles("dark", {
              "--AppBar-background": t.vars
                ? t.vars.palette.AppBar.defaultBg
                : t.palette.grey[900],
              "--AppBar-color": t.vars
                ? t.vars.palette.text.primary
                : t.palette.getContrastText(t.palette.grey[900]),
            }),
          },
        },
        ...Object.entries(t.palette)
          .filter(Rn(["contrastText"]))
          .map(([r]) => ({
            props: { color: r },
            style: {
              "--AppBar-background": (t.vars ?? t).palette[r].main,
              "--AppBar-color": (t.vars ?? t).palette[r].contrastText,
            },
          })),
        {
          props: (r) =>
            r.enableColorOnDark === !0 &&
            !["inherit", "transparent"].includes(r.color),
          style: {
            backgroundColor: "var(--AppBar-background)",
            color: "var(--AppBar-color)",
          },
        },
        {
          props: (r) =>
            r.enableColorOnDark === !1 &&
            !["inherit", "transparent"].includes(r.color),
          style: {
            backgroundColor: "var(--AppBar-background)",
            color: "var(--AppBar-color)",
            ...t.applyStyles("dark", {
              backgroundColor: t.vars
                ? fv(t.vars.palette.AppBar.darkBg, "var(--AppBar-background)")
                : null,
              color: t.vars
                ? fv(t.vars.palette.AppBar.darkColor, "var(--AppBar-color)")
                : null,
            }),
          },
        },
        {
          props: { color: "transparent" },
          style: {
            "--AppBar-background": "transparent",
            "--AppBar-color": "inherit",
            backgroundColor: "var(--AppBar-background)",
            color: "var(--AppBar-color)",
            ...t.applyStyles("dark", { backgroundImage: "none" }),
          },
        },
      ],
    })),
  ),
  DM = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiAppBar" }),
      {
        className: s,
        color: c = "primary",
        enableColorOnDark: f = !1,
        position: p = "fixed",
        ...m
      } = o,
      h = { ...o, color: c, position: p, enableColorOnDark: f },
      g = BM(h);
    return q.jsx(_M, {
      square: !0,
      component: "header",
      ownerState: h,
      elevation: 4,
      className: Te(g.root, s, p === "fixed" && "mui-fixed"),
      ref: l,
      ...m,
    });
  });
function vu(t, r) {
  var o;
  if (!t || !r) return !1;
  if (t.contains(r)) return !0;
  const l = (o = r.getRootNode) == null ? void 0 : o.call(r);
  if (l && l instanceof ShadowRoot) {
    let s = r;
    for (; s;) {
      if (t === s) return !0;
      s = s.parentNode ?? s.host ?? null;
    }
  }
  return !1;
}
function zM(t) {
  var v;
  const {
      elementType: r,
      externalSlotProps: l,
      ownerState: o,
      skipResolvingSlotProps: s = !1,
      ...c
    } = t,
    f = s ? {} : g1(l, o),
    { props: p, internalRef: m } = v1({ ...c, externalSlotProps: f }),
    h = rn(
      m,
      f == null ? void 0 : f.ref,
      (v = t.additionalProps) == null ? void 0 : v.ref,
    );
  return m1(r, { ...p, ref: h }, o);
}
function $i(t) {
  var r;
  return parseInt(b.version, 10) >= 19
    ? ((r = t == null ? void 0 : t.props) == null ? void 0 : r.ref) || null
    : (t == null ? void 0 : t.ref) || null;
}
function kM(t) {
  return typeof t == "function" ? t() : t;
}
const UM = b.forwardRef(function (r, l) {
    const { children: o, container: s, disablePortal: c = !1 } = r,
      [f, p] = b.useState(null),
      m = rn(b.isValidElement(o) ? $i(o) : null, l);
    if (
      (nn(() => {
        c || p(kM(s) || document.body);
      }, [s, c]),
      nn(() => {
        if (f && !c)
          return (
            ip(l, f),
            () => {
              ip(l, null);
            }
          );
      }, [l, f, c]),
      c)
    ) {
      if (b.isValidElement(o)) {
        const h = { ref: m };
        return b.cloneElement(o, h);
      }
      return o;
    }
    return f && LE.createPortal(o, f);
  }),
  LM = Jl(q.jsx("path", { d: "M7 10l5 5 5-5z" })),
  jM = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  },
  $M = { opacity: 0, visibility: "hidden" },
  HM = b.forwardRef(function (r, l) {
    const o = ji(),
      s = {
        enter: o.transitions.duration.enteringScreen,
        exit: o.transitions.duration.leavingScreen,
      },
      {
        addEndListener: c,
        appear: f = !0,
        children: p,
        disablePrefersReducedMotion: m = !1,
        easing: h,
        in: g,
        onEnter: v,
        onEntered: A,
        onEntering: x,
        onExit: S,
        onExited: E,
        onExiting: C,
        style: B,
        timeout: D = s,
        ...w
      } = r,
      k = Qp(o.motion.reducedMotion, m),
      O = b.useRef(null),
      U = rn(O, $i(p), l),
      I = zn(O, x),
      X = zn(O, (L, z) => {
        k.shouldReduceMotion || Yp(L);
        const M = Ou({ style: B, timeout: D, easing: h }, { mode: "enter" }),
          $ = k.getTransitionTiming({ duration: M.duration, delay: M.delay });
        ((L.style.transition = o.transitions.create("opacity", {
          duration: $.duration,
          easing: M.easing,
          delay: $.delay,
        })),
          v && v(L, z));
      }),
      le = zn(O, A),
      ue = zn(O, C),
      Z = zn(O, (L) => {
        const z = Ou({ style: B, timeout: D, easing: h }, { mode: "exit" }),
          M = k.getTransitionTiming({ duration: z.duration, delay: z.delay });
        ((L.style.transition = o.transitions.create("opacity", {
          duration: M.duration,
          easing: z.easing,
          delay: M.delay,
        })),
          S && S(L));
      }),
      R = zn(O, (L) => {
        ((L.style.transition = ""), E && E(L));
      }),
      F = c
        ? (L) => {
            c(O.current, L);
          }
        : void 0;
    return q.jsx(d1, {
      appear: f,
      in: g,
      nodeRef: O,
      onEnter: X,
      onEntered: le,
      onEntering: I,
      onExit: Z,
      onExited: R,
      onExiting: ue,
      addEndListener: F,
      reduceMotion: k.shouldReduceMotion,
      timeout: D,
      ...w,
      children: (L, { ownerState: z, ...M }) => {
        const $ = c1(L, g, jM, $M, B, p.props.style);
        return b.cloneElement(p, { style: $, ref: U, ...M });
      },
    });
  });
function qM(t) {
  return $e("MuiBackdrop", t);
}
Ke("MuiBackdrop", ["root", "invisible"]);
const PM = (t) => {
    const { classes: r, invisible: l } = t;
    return He({ root: ["root", l && "invisible"] }, qM, r);
  },
  IM = pe("div", {
    name: "MuiBackdrop",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.root, l.invisible && r.invisible];
    },
  })({
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    WebkitTapHighlightColor: "transparent",
    variants: [
      { props: { invisible: !0 }, style: { backgroundColor: "transparent" } },
    ],
  }),
  FM = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiBackdrop" }),
      {
        children: s,
        className: c,
        component: f = "div",
        invisible: p = !1,
        open: m,
        slotProps: h = {},
        slots: g = {},
        transitionDuration: v,
        ...A
      } = o,
      x = { ...o, component: f, invisible: p },
      S = PM(x),
      E = { component: f, slots: g, slotProps: h },
      [C, B] = yt("root", {
        elementType: IM,
        externalForwardedProps: E,
        className: Te(S.root, c),
        ownerState: x,
      }),
      [D, w] = yt("transition", {
        elementType: HM,
        externalForwardedProps: E,
        ownerState: x,
      });
    return q.jsx(D, {
      in: m,
      timeout: v,
      ...A,
      ...w,
      children: q.jsx(C, { ...B, ref: l, children: s }),
    });
  });
function YM(t) {
  return $e("MuiButton", t);
}
const Pa = Ke("MuiButton", [
    "root",
    "text",
    "outlined",
    "contained",
    "disableElevation",
    "focusVisible",
    "disabled",
    "colorInherit",
    "colorPrimary",
    "colorSecondary",
    "colorSuccess",
    "colorError",
    "colorInfo",
    "colorWarning",
    "sizeMedium",
    "sizeSmall",
    "sizeLarge",
    "fullWidth",
    "startIcon",
    "endIcon",
    "icon",
    "loading",
    "loadingWrapper",
    "loadingIconPlaceholder",
    "loadingIndicator",
    "loadingPositionCenter",
    "loadingPositionStart",
    "loadingPositionEnd",
  ]),
  VM = b.createContext({}),
  GM = b.createContext(void 0),
  KM = (t) => {
    const {
        color: r,
        disableElevation: l,
        fullWidth: o,
        size: s,
        variant: c,
        loading: f,
        loadingPosition: p,
        classes: m,
      } = t,
      h = {
        root: [
          "root",
          f && "loading",
          c,
          `size${Ae(s)}`,
          `color${Ae(r)}`,
          l && "disableElevation",
          o && "fullWidth",
          f && `loadingPosition${Ae(p)}`,
        ],
        startIcon: ["icon", "startIcon"],
        endIcon: ["icon", "endIcon"],
        loadingIndicator: ["loadingIndicator"],
        loadingWrapper: ["loadingWrapper"],
      },
      g = He(h, YM, m);
    return { ...m, ...g };
  },
  R1 = [
    {
      props: { size: "small" },
      style: { "& > *:nth-of-type(1)": { fontSize: 18 } },
    },
    {
      props: { size: "medium" },
      style: { "& > *:nth-of-type(1)": { fontSize: 20 } },
    },
    {
      props: { size: "large" },
      style: { "& > *:nth-of-type(1)": { fontSize: 22 } },
    },
  ],
  XM = pe(S1, {
    shouldForwardProp: (t) => Fn(t) || t === "classes",
    name: "MuiButton",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        r[l.variant],
        r[`size${Ae(l.size)}`],
        l.color === "inherit" && r.colorInherit,
        l.disableElevation && r.disableElevation,
        l.fullWidth && r.fullWidth,
        l.loading && r.loading,
      ];
    },
  })(
    ot(({ theme: t }) => {
      const r =
          t.palette.mode === "light"
            ? t.palette.grey[300]
            : t.palette.grey[800],
        l =
          t.palette.mode === "light"
            ? t.palette.grey.A100
            : t.palette.grey[700];
      return {
        ...t.typography.button,
        minWidth: 64,
        padding: "6px 16px",
        border: 0,
        borderRadius: (t.vars || t).shape.borderRadius,
        ...zt(t, ["background-color", "box-shadow", "border-color", "color"], {
          duration: t.transitions.duration.short,
        }),
        "&:hover": { textDecoration: "none" },
        [`&.${Pa.disabled}`]: { color: (t.vars || t).palette.action.disabled },
        variants: [
          {
            props: { variant: "contained" },
            style: {
              color: "var(--variant-containedColor)",
              backgroundColor: "var(--variant-containedBg)",
              boxShadow: (t.vars || t).shadows[2],
              "&:hover": {
                boxShadow: (t.vars || t).shadows[4],
                "@media (hover: none)": { boxShadow: (t.vars || t).shadows[2] },
              },
              "&:active": { boxShadow: (t.vars || t).shadows[8] },
              [`&.${Pa.focusVisible}`]: { boxShadow: (t.vars || t).shadows[6] },
              [`&.${Pa.disabled}`]: {
                color: (t.vars || t).palette.action.disabled,
                boxShadow: (t.vars || t).shadows[0],
                backgroundColor: (t.vars || t).palette.action
                  .disabledBackground,
              },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              padding: "5px 15px",
              border: "1px solid currentColor",
              borderColor: "var(--variant-outlinedBorder, currentColor)",
              backgroundColor: "var(--variant-outlinedBg)",
              color: "var(--variant-outlinedColor)",
              [`&.${Pa.disabled}`]: {
                border: `1px solid ${(t.vars || t).palette.action.disabledBackground}`,
              },
            },
          },
          {
            props: { variant: "text" },
            style: {
              padding: "6px 8px",
              color: "var(--variant-textColor)",
              backgroundColor: "var(--variant-textBg)",
            },
          },
          ...Object.entries(t.palette)
            .filter(Rn())
            .map(([o]) => ({
              props: { color: o },
              style: {
                "--variant-textColor": (t.vars || t).palette[o].main,
                "--variant-outlinedColor": (t.vars || t).palette[o].main,
                "--variant-outlinedBorder": t.alpha(
                  (t.vars || t).palette[o].main,
                  0.5,
                ),
                "--variant-containedColor": (t.vars || t).palette[o]
                  .contrastText,
                "--variant-containedBg": (t.vars || t).palette[o].main,
                "@media (hover: hover)": {
                  "&:hover": {
                    "--variant-containedBg": (t.vars || t).palette[o].dark,
                    "--variant-textBg": t.alpha(
                      (t.vars || t).palette[o].main,
                      (t.vars || t).palette.action.hoverOpacity,
                    ),
                    "--variant-outlinedBorder": (t.vars || t).palette[o].main,
                    "--variant-outlinedBg": t.alpha(
                      (t.vars || t).palette[o].main,
                      (t.vars || t).palette.action.hoverOpacity,
                    ),
                  },
                },
              },
            })),
          {
            props: { color: "inherit" },
            style: {
              color: "inherit",
              borderColor: "currentColor",
              "--variant-containedBg": t.vars
                ? t.vars.palette.Button.inheritContainedBg
                : r,
              "@media (hover: hover)": {
                "&:hover": {
                  "--variant-containedBg": t.vars
                    ? t.vars.palette.Button.inheritContainedHoverBg
                    : l,
                  "--variant-textBg": t.alpha(
                    (t.vars || t).palette.text.primary,
                    (t.vars || t).palette.action.hoverOpacity,
                  ),
                  "--variant-outlinedBg": t.alpha(
                    (t.vars || t).palette.text.primary,
                    (t.vars || t).palette.action.hoverOpacity,
                  ),
                },
              },
            },
          },
          {
            props: { size: "small", variant: "text" },
            style: { padding: "4px 5px", fontSize: t.typography.pxToRem(13) },
          },
          {
            props: { size: "large", variant: "text" },
            style: { padding: "8px 11px", fontSize: t.typography.pxToRem(15) },
          },
          {
            props: { size: "small", variant: "outlined" },
            style: { padding: "3px 9px", fontSize: t.typography.pxToRem(13) },
          },
          {
            props: { size: "large", variant: "outlined" },
            style: { padding: "7px 21px", fontSize: t.typography.pxToRem(15) },
          },
          {
            props: { size: "small", variant: "contained" },
            style: { padding: "4px 10px", fontSize: t.typography.pxToRem(13) },
          },
          {
            props: { size: "large", variant: "contained" },
            style: { padding: "8px 22px", fontSize: t.typography.pxToRem(15) },
          },
          {
            props: { disableElevation: !0 },
            style: {
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
              [`&.${Pa.focusVisible}`]: { boxShadow: "none" },
              "&:active": { boxShadow: "none" },
              [`&.${Pa.disabled}`]: { boxShadow: "none" },
            },
          },
          { props: { fullWidth: !0 }, style: { width: "100%" } },
          {
            props: { loadingPosition: "center" },
            style: {
              ...zt(t, ["background-color", "box-shadow", "border-color"], {
                duration: t.transitions.duration.short,
              }),
              [`&.${Pa.loading}`]: { color: "transparent" },
            },
          },
        ],
      };
    }),
  ),
  QM = pe("span", {
    name: "MuiButton",
    slot: "StartIcon",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.startIcon, l.loading && r.startIconLoadingStart];
    },
  })(({ theme: t }) => ({
    display: "inherit",
    alignItems: "center",
    marginRight: 8,
    marginLeft: -4,
    "&::before": { content: '"\\200b"', width: 0, overflow: "hidden" },
    variants: [
      { props: { size: "small" }, style: { marginLeft: -2 } },
      {
        props: { loadingPosition: "start", loading: !0 },
        style: {
          ...zt(t, ["opacity"], { duration: t.transitions.duration.short }),
          opacity: 0,
        },
      },
      {
        props: { loadingPosition: "start", loading: !0, fullWidth: !0 },
        style: { marginRight: -8 },
      },
      ...R1,
    ],
  })),
  ZM = pe("span", {
    name: "MuiButton",
    slot: "EndIcon",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.endIcon, l.loading && r.endIconLoadingEnd];
    },
  })(({ theme: t }) => ({
    display: "inherit",
    marginRight: -4,
    marginLeft: 8,
    variants: [
      { props: { size: "small" }, style: { marginRight: -2 } },
      {
        props: { loadingPosition: "end", loading: !0 },
        style: {
          ...zt(t, ["opacity"], { duration: t.transitions.duration.short }),
          opacity: 0,
        },
      },
      {
        props: { loadingPosition: "end", loading: !0, fullWidth: !0 },
        style: { marginLeft: -8 },
      },
      ...R1,
    ],
  })),
  WM = pe("span", { name: "MuiButton", slot: "LoadingIndicator" })(
    ({ theme: t }) => ({
      display: "none",
      position: "absolute",
      visibility: "visible",
      variants: [
        { props: { loading: !0 }, style: { display: "flex" } },
        { props: { loadingPosition: "start" }, style: { left: 14 } },
        {
          props: { loadingPosition: "start", size: "small" },
          style: { left: 10 },
        },
        {
          props: { variant: "text", loadingPosition: "start" },
          style: { left: 6 },
        },
        {
          props: { loadingPosition: "center" },
          style: {
            left: "50%",
            transform: "translate(-50%)",
            color: (t.vars || t).palette.action.disabled,
          },
        },
        { props: { loadingPosition: "end" }, style: { right: 14 } },
        {
          props: { loadingPosition: "end", size: "small" },
          style: { right: 10 },
        },
        {
          props: { variant: "text", loadingPosition: "end" },
          style: { right: 6 },
        },
        {
          props: { loadingPosition: "start", fullWidth: !0 },
          style: { position: "relative", left: -10 },
        },
        {
          props: { loadingPosition: "end", fullWidth: !0 },
          style: { position: "relative", right: -10 },
        },
      ],
    }),
  ),
  dv = pe("span", { name: "MuiButton", slot: "LoadingIconPlaceholder" })({
    display: "inline-block",
    width: "1em",
    height: "1em",
  }),
  pa = b.forwardRef(function (r, l) {
    const o = b.useContext(VM),
      s = b.useContext(GM),
      c = Ti(o, r),
      f = Fe({ props: c, name: "MuiButton" }),
      {
        children: p,
        color: m = "primary",
        component: h = "button",
        className: g,
        disabled: v = !1,
        disableElevation: A = !1,
        disableFocusRipple: x = !1,
        endIcon: S,
        focusVisibleClassName: E,
        fullWidth: C = !1,
        id: B,
        loading: D = null,
        loadingIndicator: w,
        loadingPosition: k = "center",
        size: O = "medium",
        startIcon: U,
        type: I,
        variant: X = "text",
        ...le
      } = f,
      ue = Ai(B),
      Z = w ?? q.jsx(x1, { "aria-labelledby": ue, color: "inherit", size: 16 }),
      R = {
        ...f,
        color: m,
        component: h,
        disabled: v,
        disableElevation: A,
        disableFocusRipple: x,
        fullWidth: C,
        loading: D,
        loadingIndicator: Z,
        loadingPosition: k,
        size: O,
        type: I,
        variant: X,
      },
      F = KM(R),
      L =
        (U || (D && k === "start")) &&
        q.jsx(QM, {
          className: F.startIcon,
          ownerState: R,
          children:
            U ||
            q.jsx(dv, { className: F.loadingIconPlaceholder, ownerState: R }),
        }),
      z =
        (S || (D && k === "end")) &&
        q.jsx(ZM, {
          className: F.endIcon,
          ownerState: R,
          children:
            S ||
            q.jsx(dv, { className: F.loadingIconPlaceholder, ownerState: R }),
        }),
      M = s || "",
      $ =
        typeof D == "boolean"
          ? q.jsx("span", {
              className: F.loadingWrapper,
              style: { display: "contents" },
              children:
                D &&
                q.jsx(WM, {
                  className: F.loadingIndicator,
                  ownerState: R,
                  children: Z,
                }),
            })
          : null,
      { root: W, ...se } = F;
    return q.jsxs(XM, {
      ownerState: R,
      className: Te(o.className, F.root, g, M),
      component: h,
      disabled: v || D,
      focusRipple: !x,
      focusVisibleClassName: Te(F.focusVisible, E),
      ref: l,
      internalNativeButton: !0,
      type: I,
      id: D ? ue : B,
      ...le,
      classes: se,
      children: [L, k !== "end" && $, p, k === "end" && $, z],
    });
  });
function JM(t) {
  return $e("MuiCard", t);
}
Ke("MuiCard", ["root"]);
const e5 = (t) => {
    const { classes: r } = t;
    return He({ root: ["root"] }, JM, r);
  },
  t5 = pe(sc, { name: "MuiCard", slot: "Root" })({ overflow: "hidden" }),
  n5 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiCard" }),
      { className: s, raised: c = !1, ...f } = o,
      p = { ...o, raised: c },
      m = e5(p);
    return q.jsx(t5, {
      className: Te(m.root, s),
      elevation: c ? 8 : void 0,
      ref: l,
      ownerState: p,
      ...f,
    });
  });
function r5(t) {
  return $e("MuiCardContent", t);
}
Ke("MuiCardContent", ["root"]);
const a5 = (t) => {
    const { classes: r } = t;
    return He({ root: ["root"] }, r5, r);
  },
  l5 = pe("div", { name: "MuiCardContent", slot: "Root" })({
    padding: 16,
    "&:last-child": { paddingBottom: 24 },
  }),
  o5 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiCardContent" }),
      { className: s, component: c = "div", ...f } = o,
      p = { ...o, component: c },
      m = a5(p);
    return q.jsx(l5, {
      as: c,
      className: Te(m.root, s),
      ownerState: p,
      ref: l,
      ...f,
    });
  }),
  i5 = aw({
    createStyledComponent: pe("div", {
      name: "MuiContainer",
      slot: "Root",
      overridesResolver: (t, r) => {
        const { ownerState: l } = t;
        return [
          r.root,
          r[`maxWidth${Ae(String(l.maxWidth))}`],
          l.fixed && r.fixed,
          l.disableGutters && r.disableGutters,
        ];
      },
    }),
    useThemeProps: (t) => Fe({ props: t, name: "MuiContainer" }),
  });
function E1(t = window) {
  const r = t.document.documentElement.clientWidth;
  return t.innerWidth - r;
}
function s5(t) {
  const r = Jt(t);
  return r.body === t
    ? jr(t).innerWidth > r.documentElement.clientWidth
    : t.scrollHeight > t.clientHeight;
}
function fi(t, r) {
  r ? t.setAttribute("aria-hidden", "true") : t.removeAttribute("aria-hidden");
}
function pv(t) {
  return parseFloat(jr(t).getComputedStyle(t).paddingRight) || 0;
}
function u5(t) {
  const l = [
      "TEMPLATE",
      "SCRIPT",
      "STYLE",
      "LINK",
      "MAP",
      "META",
      "NOSCRIPT",
      "PICTURE",
      "COL",
      "COLGROUP",
      "PARAM",
      "SLOT",
      "SOURCE",
      "TRACK",
    ].includes(t.tagName),
    o = t.tagName === "INPUT" && t.getAttribute("type") === "hidden";
  return l || o;
}
function hv(t, r, l, o, s) {
  const c = [r, l, ...o];
  [].forEach.call(t.children, (f) => {
    const p = !c.includes(f),
      m = !u5(f);
    p && m && fi(f, s);
  });
}
function qd(t, r) {
  let l = -1;
  return (t.some((o, s) => (r(o) ? ((l = s), !0) : !1)), l);
}
function c5(t, r) {
  const l = [],
    o = t.container;
  if (!r.disableScrollLock) {
    if (s5(o)) {
      const f = E1(jr(o));
      (l.push({
        value: o.style.paddingRight,
        property: "padding-right",
        el: o,
      }),
        (o.style.paddingRight = `${pv(o) + f}px`));
      const p = Jt(o).querySelectorAll(".mui-fixed");
      [].forEach.call(p, (m) => {
        (l.push({
          value: m.style.paddingRight,
          property: "padding-right",
          el: m,
        }),
          (m.style.paddingRight = `${pv(m) + f}px`));
      });
    }
    let c;
    if (o.parentNode instanceof DocumentFragment) c = Jt(o).body;
    else {
      const f = o.parentElement,
        p = jr(o);
      c =
        (f == null ? void 0 : f.nodeName) === "HTML" &&
        p.getComputedStyle(f).overflowY === "scroll"
          ? f
          : o;
    }
    (l.push(
      { value: c.style.overflow, property: "overflow", el: c },
      { value: c.style.overflowX, property: "overflow-x", el: c },
      { value: c.style.overflowY, property: "overflow-y", el: c },
    ),
      (c.style.overflow = "hidden"));
  }
  return () => {
    l.forEach(({ value: c, el: f, property: p }) => {
      c ? f.style.setProperty(p, c) : f.style.removeProperty(p);
    });
  };
}
function f5(t) {
  const r = [];
  return (
    [].forEach.call(t.children, (l) => {
      l.getAttribute("aria-hidden") === "true" && r.push(l);
    }),
    r
  );
}
class d5 {
  constructor() {
    ((this.modals = []), (this.containers = []));
  }
  add(r, l) {
    let o = this.modals.indexOf(r);
    if (o !== -1) return o;
    ((o = this.modals.length),
      this.modals.push(r),
      r.modalRef && fi(r.modalRef, !1));
    const s = f5(l);
    hv(l, r.mount, r.modalRef, s, !0);
    const c = qd(this.containers, (f) => f.container === l);
    return c !== -1
      ? (this.containers[c].modals.push(r), o)
      : (this.containers.push({
          modals: [r],
          container: l,
          restore: null,
          hiddenSiblings: s,
        }),
        o);
  }
  mount(r, l) {
    const o = qd(this.containers, (c) => c.modals.includes(r)),
      s = this.containers[o];
    s.restore || (s.restore = c5(s, l));
  }
  remove(r, l = !0) {
    const o = this.modals.indexOf(r);
    if (o === -1) return o;
    const s = qd(this.containers, (f) => f.modals.includes(r)),
      c = this.containers[s];
    if (
      (c.modals.splice(c.modals.indexOf(r), 1),
      this.modals.splice(o, 1),
      c.modals.length === 0)
    )
      (c.restore && c.restore(),
        r.modalRef && fi(r.modalRef, l),
        hv(c.container, r.mount, r.modalRef, c.hiddenSiblings, !1),
        this.containers.splice(s, 1));
    else {
      const f = c.modals[c.modals.length - 1];
      f.modalRef && fi(f.modalRef, !1);
    }
    return o;
  }
  isTopModal(r) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === r;
  }
}
const mv = "data-mui-focusable";
function gv(t) {
  return t ? (t.hasAttribute(mv) ? t : t.querySelector(`[${mv}]`)) : null;
}
const p5 = [
  "input",
  "select",
  "textarea",
  "a[href]",
  "button",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
].join(",");
function T1(t) {
  const r = parseInt(t.getAttribute("tabindex") || "", 10);
  return Number.isNaN(r)
    ? t.contentEditable === "true" ||
      ((t.nodeName === "AUDIO" ||
        t.nodeName === "VIDEO" ||
        t.nodeName === "DETAILS") &&
        t.getAttribute("tabindex") === null)
      ? 0
      : t.tabIndex
    : r;
}
function h5(t) {
  if (t.tagName !== "INPUT" || t.type !== "radio" || !t.name) return !1;
  const r = (o) => t.ownerDocument.querySelector(`input[type="radio"]${o}`);
  let l = r(`[name="${t.name}"]:checked`);
  return (l || (l = r(`[name="${t.name}"]`)), l !== t);
}
function m5(t) {
  return !(
    t.disabled ||
    (t.tagName === "INPUT" && t.type === "hidden") ||
    h5(t)
  );
}
function g5(t) {
  const r = [],
    l = [];
  return (
    Array.from(t.querySelectorAll(p5)).forEach((o, s) => {
      const c = T1(o);
      c === -1 ||
        !m5(o) ||
        (c === 0
          ? r.push(o)
          : l.push({ documentOrder: s, tabIndex: c, node: o }));
    }),
    l
      .sort((o, s) =>
        o.tabIndex === s.tabIndex
          ? o.documentOrder - s.documentOrder
          : o.tabIndex - s.tabIndex,
      )
      .map((o) => o.node)
      .concat(r)
  );
}
function y5() {
  return !0;
}
function v5(t) {
  const {
      children: r,
      disableAutoFocus: l = !1,
      disableEnforceFocus: o = !1,
      disableRestoreFocus: s = !1,
      getTabbable: c = g5,
      isEnabled: f = y5,
      open: p,
    } = t,
    m = b.useRef(!1),
    h = b.useRef(null),
    g = b.useRef(null),
    v = b.useRef(null),
    A = b.useRef(null),
    x = b.useRef(!1),
    S = b.useRef(null),
    E = rn($i(r), S),
    C = b.useRef(null);
  (b.useEffect(() => {
    !p || !S.current || (x.current = !l);
  }, [l, p]),
    b.useEffect(() => {
      if (((m.current = !1), !p || !S.current)) return;
      const w = Jt(S.current),
        k = kr(w),
        O = gv(S.current) ?? S.current;
      return (
        vu(S.current, k) ||
          (O.hasAttribute("tabIndex") || O.setAttribute("tabIndex", "-1"),
          x.current && O.focus()),
        () => {
          !s &&
            v.current &&
            ((m.current = !0), v.current.focus(), (v.current = null));
        }
      );
    }, [p]),
    b.useEffect(() => {
      if (!p || !S.current) return;
      const w = Jt(S.current),
        k = (I) => {
          if (((C.current = I), o || !f() || I.key !== "Tab")) return;
          const X = S.current,
            le = kr(w);
          if (X === null) return;
          const ue = gv(X);
          if (le === X || le === ue) {
            const R = c(X);
            if (R.length === 0) return;
            (I.preventDefault(),
              I.shiftKey ? R[R.length - 1].focus() : R[0].focus());
            return;
          }
          if (vu(X, le)) {
            const R = c(X),
              F = R.indexOf(le);
            if (F === -1 || !R.some((M) => T1(M) > 0)) return;
            I.preventDefault();
            let z = 0;
            (I.shiftKey
              ? (z = F <= 0 ? R.length - 1 : F - 1)
              : (z = F === R.length - 1 ? 0 : F + 1),
              R[z].focus());
          }
        },
        O = () => {
          var ue, Z;
          const I = S.current;
          if (I === null) return;
          const X = kr(w);
          if (!w.hasFocus() || !f() || m.current) {
            m.current = !1;
            return;
          }
          if (vu(I, X) || (o && X !== h.current && X !== g.current)) return;
          if (X !== A.current) A.current = null;
          else if (A.current !== null) return;
          if (!x.current) return;
          let le = [];
          if (
            ((X === h.current || X === g.current) && (le = c(S.current)),
            le.length > 0)
          ) {
            const R = !!(
                (ue = C.current) != null &&
                ue.shiftKey &&
                ((Z = C.current) == null ? void 0 : Z.key) === "Tab"
              ),
              F = le[0],
              L = le[le.length - 1];
            typeof F != "string" &&
              typeof L != "string" &&
              (R ? L.focus() : F.focus());
          } else I.focus();
        };
      (w.addEventListener("focusin", O), w.addEventListener("keydown", k, !0));
      const U = setInterval(() => {
        const I = kr(w);
        I && I.tagName === "BODY" && O();
      }, 50);
      return () => {
        (clearInterval(U),
          w.removeEventListener("focusin", O),
          w.removeEventListener("keydown", k, !0));
      };
    }, [l, o, s, f, p, c]));
  const B = (w) => {
      (v.current === null && (v.current = w.relatedTarget),
        (x.current = !0),
        (A.current = w.target));
      const k = r.props.onFocus;
      k && k(w);
    },
    D = (w) => {
      (v.current === null && (v.current = w.relatedTarget), (x.current = !0));
    };
  return q.jsxs(b.Fragment, {
    children: [
      q.jsx("div", {
        tabIndex: p ? 0 : -1,
        onFocus: D,
        ref: h,
        "data-testid": "sentinelStart",
      }),
      b.cloneElement(r, { ref: E, onFocus: B }),
      q.jsx("div", {
        tabIndex: p ? 0 : -1,
        onFocus: D,
        ref: g,
        "data-testid": "sentinelEnd",
      }),
    ],
  });
}
function b5(t) {
  return typeof t == "function" ? t() : t;
}
function S5(t) {
  return t ? t.props.hasOwnProperty("in") : !1;
}
const yv = () => {},
  lu = new d5();
function x5(t) {
  const {
      container: r,
      disableScrollLock: l = !1,
      closeAfterTransition: o = !1,
      onTransitionEnter: s,
      onTransitionExited: c,
      children: f,
      onClose: p,
      open: m,
      rootRef: h,
    } = t,
    g = b.useRef({}),
    v = b.useRef(null),
    A = b.useRef(null),
    x = rn(A, h),
    [S, E] = b.useState(!m),
    C = S5(f);
  let B = !0;
  (t["aria-hidden"] === "false" || t["aria-hidden"] === !1) && (B = !1);
  const D = () => Jt(v.current),
    w = () => (
      (g.current.modalRef = A.current),
      (g.current.mount = v.current),
      g.current
    ),
    k = () => {
      (lu.mount(w(), { disableScrollLock: l }),
        A.current && (A.current.scrollTop = 0));
    },
    O = Ht(() => {
      const L = b5(r) || D().body;
      (lu.add(w(), L), A.current && k());
    }),
    U = () => lu.isTopModal(w()),
    I = Ht((L) => {
      ((v.current = L), L && (m && U() ? k() : A.current && fi(A.current, B)));
    }),
    X = b.useCallback(() => {
      lu.remove(w(), B);
    }, [B]);
  (b.useEffect(
    () => () => {
      X();
    },
    [X],
  ),
    b.useEffect(() => {
      m ? O() : (!C || !o) && X();
    }, [m, X, C, o, O]));
  const le = (L) => (z) => {
      var M;
      ((M = L.onKeyDown) == null || M.call(L, z),
        !(z.key !== "Escape" || z.which === 229 || !U()) &&
          (z.stopPropagation(), p && p(z, "escapeKeyDown")));
    },
    ue = (L) => (z) => {
      var M;
      ((M = L.onClick) == null || M.call(L, z),
        z.target === z.currentTarget && p && p(z, "backdropClick"));
    };
  return {
    getRootProps: (L = {}) => {
      const z = y1(t);
      (delete z.onTransitionEnter, delete z.onTransitionExited);
      const M = { ...z, ...L };
      return { role: "presentation", ...M, onKeyDown: le(M), ref: x };
    },
    getBackdropProps: (L = {}) => {
      const z = L;
      return { "aria-hidden": !0, ...z, onClick: ue(z), open: m };
    },
    getTransitionProps: () => {
      const L = () => {
          (E(!1), s && s());
        },
        z = () => {
          (E(!0), c && c(), o && X());
        };
      return {
        onEnter: ev(L, (f == null ? void 0 : f.props.onEnter) ?? yv),
        onExited: ev(z, (f == null ? void 0 : f.props.onExited) ?? yv),
      };
    },
    rootRef: x,
    portalRef: I,
    isTopModal: U,
    exited: S,
    hasTransition: C,
  };
}
function R5(t) {
  return $e("MuiModal", t);
}
Ke("MuiModal", ["root", "hidden", "backdrop"]);
const E5 = (t) => {
    const { open: r, exited: l, classes: o } = t;
    return He(
      { root: ["root", !r && l && "hidden"], backdrop: ["backdrop"] },
      R5,
      o,
    );
  },
  T5 = pe("div", {
    name: "MuiModal",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.root, !l.open && l.exited && r.hidden];
    },
  })(
    ot(({ theme: t }) => ({
      position: "fixed",
      zIndex: (t.vars || t).zIndex.modal,
      right: 0,
      bottom: 0,
      top: 0,
      left: 0,
      variants: [
        {
          props: ({ ownerState: r }) => !r.open && r.exited,
          style: { visibility: "hidden" },
        },
      ],
    })),
  ),
  C5 = pe(FM, { name: "MuiModal", slot: "Backdrop" })({ zIndex: -1 }),
  A5 = b.forwardRef(function (r, l) {
    const o = Fe({ name: "MuiModal", props: r }),
      {
        classes: s,
        className: c,
        closeAfterTransition: f = !1,
        children: p,
        container: m,
        component: h,
        disableAutoFocus: g = !1,
        disableEnforceFocus: v = !1,
        disablePortal: A = !1,
        disableRestoreFocus: x = !1,
        disableScrollLock: S = !1,
        hideBackdrop: E = !1,
        keepMounted: C = !1,
        onClose: B,
        onTransitionEnter: D,
        onTransitionExited: w,
        open: k,
        slotProps: O = {},
        slots: U = {},
        theme: I,
        ...X
      } = o,
      le = {
        ...o,
        closeAfterTransition: f,
        disableAutoFocus: g,
        disableEnforceFocus: v,
        disablePortal: A,
        disableRestoreFocus: x,
        disableScrollLock: S,
        hideBackdrop: E,
        keepMounted: C,
      },
      {
        getRootProps: ue,
        getBackdropProps: Z,
        getTransitionProps: R,
        portalRef: F,
        isTopModal: L,
        exited: z,
        hasTransition: M,
      } = x5({ ...le, rootRef: l }),
      $ = { ...le, exited: z },
      W = E5($),
      se = {};
    if ((p.props.tabIndex === void 0 && (se.tabIndex = "-1"), M)) {
      const { onEnter: he, onExited: ce } = R();
      ((se.onEnter = he), (se.onExited = ce));
    }
    const N = { slots: U, slotProps: O },
      [V, ne] = yt("root", {
        ref: l,
        elementType: T5,
        externalForwardedProps: { ...N, ...X, component: h },
        getSlotProps: ue,
        ownerState: $,
        className: Te(
          c,
          W == null ? void 0 : W.root,
          !$.open && $.exited && (W == null ? void 0 : W.hidden),
        ),
      }),
      [ee, oe] = yt("backdrop", {
        elementType: C5,
        externalForwardedProps: N,
        shouldForwardComponentProp: !0,
        getSlotProps: (he) =>
          Z({
            ...he,
            onClick: (ce) => {
              he != null && he.onClick && he.onClick(ce);
            },
          }),
        className: W == null ? void 0 : W.backdrop,
        ownerState: $,
      });
    return !C && !k && (!M || z)
      ? null
      : q.jsx(UM, {
          ref: F,
          container: m,
          disablePortal: A,
          children: q.jsxs(V, {
            ...ne,
            children: [
              E ? null : q.jsx(ee, { ...oe }),
              q.jsx(v5, {
                disableEnforceFocus: v,
                disableAutoFocus: g,
                disableRestoreFocus: x,
                isEnabled: L,
                open: k,
                children: b.cloneElement(p, se),
              }),
            ],
          }),
        });
  }),
  w5 = (t) => {
    const {
        classes: r,
        disableUnderline: l,
        startAdornment: o,
        endAdornment: s,
        size: c,
        hiddenLabel: f,
        multiline: p,
      } = t,
      m = {
        root: [
          "root",
          !l && "underline",
          o && "adornedStart",
          s && "adornedEnd",
          c === "small" && `size${Ae(c)}`,
          f && "hiddenLabel",
          p && "multiline",
        ],
        input: ["input"],
      },
      h = He(m, iO, r);
    return { ...r, ...h };
  },
  O5 = pe(oc, {
    shouldForwardProp: (t) => Fn(t) || t === "classes",
    name: "MuiFilledInput",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [...ac(t, r), !l.disableUnderline && r.underline];
    },
  })(
    ot(({ theme: t }) => {
      const r = t.palette.mode === "light",
        l = r ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)",
        o = r ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)",
        s = r ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)",
        c = r ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
      return {
        position: "relative",
        backgroundColor: t.vars ? t.vars.palette.FilledInput.bg : o,
        borderTopLeftRadius: (t.vars || t).shape.borderRadius,
        borderTopRightRadius: (t.vars || t).shape.borderRadius,
        ...zt(t, "background-color", {
          duration: t.transitions.duration.shorter,
          easing: t.transitions.easing.easeOut,
        }),
        "&:hover": {
          backgroundColor: t.vars ? t.vars.palette.FilledInput.hoverBg : s,
          "@media (hover: none)": {
            backgroundColor: t.vars ? t.vars.palette.FilledInput.bg : o,
          },
        },
        [`&.${qa.focused}`]: {
          backgroundColor: t.vars ? t.vars.palette.FilledInput.bg : o,
        },
        [`&.${qa.disabled}`]: {
          backgroundColor: t.vars ? t.vars.palette.FilledInput.disabledBg : c,
        },
        variants: [
          {
            props: ({ ownerState: f }) => !f.disableUnderline,
            style: {
              "&::after": {
                left: 0,
                bottom: 0,
                content: '""',
                position: "absolute",
                right: 0,
                transform: "scaleX(0)",
                ...zt(t, "transform", {
                  duration: t.transitions.duration.shorter,
                  easing: t.transitions.easing.easeOut,
                }),
                pointerEvents: "none",
              },
              [`&.${qa.focused}:after`]: {
                transform: "scaleX(1) translateX(0)",
              },
              [`&.${qa.error}`]: {
                "&::before, &::after": {
                  borderBottomColor: (t.vars || t).palette.error.main,
                },
              },
              "&::before": {
                borderBottom: `1px solid ${t.vars ? t.alpha(t.vars.palette.common.onBackground, t.vars.opacity.inputUnderline) : l}`,
                left: 0,
                bottom: 0,
                content: '""',
                position: "absolute",
                right: 0,
                ...zt(t, "border-bottom-color", {
                  duration: t.transitions.duration.shorter,
                }),
                pointerEvents: "none",
              },
              [`&:hover:not(.${qa.disabled}, .${qa.error}):before`]: {
                borderBottom: `1px solid ${(t.vars || t).palette.text.primary}`,
              },
              [`&.${qa.disabled}:before`]: { borderBottomStyle: "dotted" },
            },
          },
          ...Object.entries(t.palette)
            .filter(Rn())
            .map(([f]) => {
              var p;
              return {
                props: { disableUnderline: !1, color: f },
                style: {
                  "&::after": {
                    borderBottom: `2px solid ${(p = (t.vars || t).palette[f]) == null ? void 0 : p.main}`,
                  },
                },
              };
            }),
          {
            props: ({ ownerState: f }) => f.startAdornment,
            style: { paddingLeft: 12 },
          },
          {
            props: ({ ownerState: f }) => f.endAdornment,
            style: { paddingRight: 12 },
          },
          {
            props: ({ ownerState: f }) => f.multiline,
            style: { padding: "25px 12px 8px" },
          },
          {
            props: ({ ownerState: f, size: p }) => f.multiline && p === "small",
            style: { paddingTop: 21, paddingBottom: 4 },
          },
          {
            props: ({ ownerState: f }) => f.multiline && f.hiddenLabel,
            style: { paddingTop: 16, paddingBottom: 17 },
          },
          {
            props: ({ ownerState: f }) =>
              f.multiline && f.hiddenLabel && f.size === "small",
            style: { paddingTop: 8, paddingBottom: 9 },
          },
        ],
      };
    }),
  ),
  M5 = pe(ic, { name: "MuiFilledInput", slot: "Input", overridesResolver: lc })(
    ot(({ theme: t }) => ({
      paddingTop: 25,
      paddingRight: 12,
      paddingBottom: 8,
      paddingLeft: 12,
      "&:-webkit-autofill": {
        ...(!t.vars && {
          WebkitBoxShadow:
            t.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
          WebkitTextFillColor: t.palette.mode === "light" ? null : "#fff",
          caretColor: t.palette.mode === "light" ? null : "#fff",
        }),
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: "inherit",
        ...(t.vars &&
          t.applyStyles("dark", {
            WebkitBoxShadow: "0 0 0 100px #266798 inset",
            WebkitTextFillColor: "#fff",
            caretColor: "#fff",
          })),
      },
      variants: [
        {
          props: { size: "small" },
          style: { paddingTop: 21, paddingBottom: 4 },
        },
        {
          props: ({ ownerState: r }) => r.hiddenLabel,
          style: { paddingTop: 16, paddingBottom: 17 },
        },
        {
          props: ({ ownerState: r }) => r.startAdornment,
          style: { paddingLeft: 0 },
        },
        {
          props: ({ ownerState: r }) => r.endAdornment,
          style: { paddingRight: 0 },
        },
        {
          props: ({ ownerState: r }) => r.hiddenLabel && r.size === "small",
          style: { paddingTop: 8, paddingBottom: 9 },
        },
        {
          props: ({ ownerState: r }) => r.multiline,
          style: {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      ],
    })),
  ),
  Wp = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiFilledInput" }),
      {
        disableUnderline: s = !1,
        fullWidth: c = !1,
        hiddenLabel: f,
        inputComponent: p = "input",
        multiline: m = !1,
        notched: h,
        slotProps: g,
        slots: v = {},
        type: A = "text",
        ...x
      } = o,
      S = {
        ...o,
        disableUnderline: s,
        fullWidth: c,
        inputComponent: p,
        multiline: m,
        type: A,
      },
      E = w5(o),
      C = { root: { ownerState: S }, input: { ownerState: S } },
      B = g ? Kt(C, g) : C,
      D = v.root ?? O5,
      w = v.input ?? M5;
    return q.jsx(Gp, {
      slots: { root: D, input: w },
      slotProps: B,
      fullWidth: c,
      inputComponent: p,
      multiline: m,
      ref: l,
      type: A,
      ...x,
      classes: E,
    });
  });
Wp.muiName = "Input";
function N5(t) {
  return $e("MuiFormControl", t);
}
Ke("MuiFormControl", [
  "root",
  "marginNone",
  "marginNormal",
  "marginDense",
  "fullWidth",
  "disabled",
]);
const B5 = (t) => {
    const { classes: r, margin: l, fullWidth: o } = t,
      s = {
        root: ["root", l !== "none" && `margin${Ae(l)}`, o && "fullWidth"],
      };
    return He(s, N5, r);
  },
  _5 = pe("div", {
    name: "MuiFormControl",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.root, r[`margin${Ae(l.margin)}`], l.fullWidth && r.fullWidth];
    },
  })({
    display: "inline-flex",
    flexDirection: "column",
    position: "relative",
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: "top",
    variants: [
      {
        props: { margin: "normal" },
        style: { marginTop: 16, marginBottom: 8 },
      },
      { props: { margin: "dense" }, style: { marginTop: 8, marginBottom: 4 } },
      { props: { fullWidth: !0 }, style: { width: "100%" } },
    ],
  }),
  D5 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiFormControl" }),
      {
        children: s,
        className: c,
        color: f = "primary",
        component: p = "div",
        disabled: m = !1,
        error: h = !1,
        focused: g,
        fullWidth: v = !1,
        hiddenLabel: A = !1,
        margin: x = "none",
        required: S = !1,
        size: E = "medium",
        variant: C = "outlined",
        ...B
      } = o,
      D = {
        ...o,
        color: f,
        component: p,
        disabled: m,
        error: h,
        fullWidth: v,
        hiddenLabel: A,
        margin: x,
        required: S,
        size: E,
        variant: C,
      },
      w = B5(D),
      [k, O] = b.useState(() => {
        let z = !1;
        return (
          s &&
            b.Children.forEach(s, (M) => {
              if (!jd(M, ["Input", "Select"])) return;
              const $ = jd(M, ["Select"]) ? M.props.input : M;
              $ && eO($.props) && (z = !0);
            }),
          z
        );
      }),
      [U, I] = b.useState(() => {
        let z = !1;
        return (
          s &&
            b.Children.forEach(s, (M) => {
              jd(M, ["Input", "Select"]) &&
                (wu(M.props, !0) || wu(M.props.inputProps, !0)) &&
                (z = !0);
            }),
          z
        );
      }),
      [X, le] = b.useState(!1);
    m && X && le(!1);
    const ue = g !== void 0 && !m ? g : X;
    let Z;
    b.useRef(!1);
    const R = b.useCallback(() => {
        I(!0);
      }, []),
      F = b.useCallback(() => {
        I(!1);
      }, []),
      L = b.useMemo(
        () => ({
          adornedStart: k,
          setAdornedStart: O,
          color: f,
          disabled: m,
          error: h,
          filled: U,
          focused: ue,
          fullWidth: v,
          hiddenLabel: A,
          size: E,
          onBlur: () => {
            le(!1);
          },
          onFocus: () => {
            le(!0);
          },
          onEmpty: F,
          onFilled: R,
          registerEffect: Z,
          required: S,
          variant: C,
        }),
        [k, f, m, h, U, ue, v, A, Z, F, R, S, E, C],
      );
    return q.jsx(Ip.Provider, {
      value: L,
      children: q.jsx(_5, {
        as: p,
        ownerState: D,
        className: Te(w.root, c),
        ref: l,
        ...B,
        children: s,
      }),
    });
  });
var vv;
const z5 = (t) => {
    const {
        classes: r,
        contained: l,
        size: o,
        disabled: s,
        error: c,
        filled: f,
        focused: p,
        required: m,
      } = t,
      h = {
        root: [
          "root",
          s && "disabled",
          c && "error",
          o && `size${Ae(o)}`,
          l && "contained",
          p && "focused",
          f && "filled",
          m && "required",
        ],
      };
    return He(h, sO, r);
  },
  k5 = pe("p", {
    name: "MuiFormHelperText",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        l.size && r[`size${Ae(l.size)}`],
        l.contained && r.contained,
        l.filled && r.filled,
      ];
    },
  })(
    ot(({ theme: t }) => ({
      color: (t.vars || t).palette.text.secondary,
      ...t.typography.caption,
      textAlign: "left",
      marginTop: 3,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      [`&.${J0.disabled}`]: { color: (t.vars || t).palette.text.disabled },
      [`&.${J0.error}`]: { color: (t.vars || t).palette.error.main },
      variants: [
        { props: { size: "small" }, style: { marginTop: 4 } },
        {
          props: ({ ownerState: r }) => r.contained,
          style: { marginLeft: 14, marginRight: 14 },
        },
      ],
    })),
  ),
  U5 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiFormHelperText" }),
      {
        children: s,
        className: c,
        component: f = "p",
        disabled: p,
        error: m,
        filled: h,
        focused: g,
        margin: v,
        required: A,
        variant: x,
        ...S
      } = o,
      [E] = Wl({
        props: o,
        states: [
          "variant",
          "size",
          "disabled",
          "error",
          "filled",
          "focused",
          "required",
        ],
      }),
      C = {
        ...o,
        component: f,
        contained: E.variant === "filled" || E.variant === "outlined",
        variant: E.variant,
        size: E.size,
        disabled: E.disabled,
        error: E.error,
        filled: E.filled,
        focused: E.focused,
        required: E.required,
      };
    delete C.ownerState;
    const B = z5(C);
    return q.jsx(k5, {
      as: f,
      className: Te(B.root, c),
      ref: l,
      ...S,
      ownerState: C,
      children:
        s === " "
          ? vv ||
            (vv = q.jsx("span", {
              className: "notranslate",
              "aria-hidden": !0,
              children: "​",
            }))
          : s,
    });
  }),
  L5 = (t) => {
    const {
        classes: r,
        color: l,
        focused: o,
        disabled: s,
        error: c,
        filled: f,
        required: p,
      } = t,
      m = {
        root: [
          "root",
          `color${Ae(l)}`,
          s && "disabled",
          c && "error",
          f && "filled",
          o && "focused",
          p && "required",
        ],
        asterisk: ["asterisk", c && "error"],
      };
    return He(m, uO, r);
  },
  j5 = pe("label", {
    name: "MuiFormLabel",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        l.color === "secondary" && r.colorSecondary,
        l.filled && r.filled,
      ];
    },
  })(
    ot(({ theme: t }) => ({
      color: (t.vars || t).palette.text.secondary,
      ...t.typography.body1,
      lineHeight: "1.4375em",
      padding: 0,
      position: "relative",
      variants: [
        ...Object.entries(t.palette)
          .filter(Rn())
          .map(([r]) => ({
            props: { color: r },
            style: {
              [`&.${ui.focused}`]: { color: (t.vars || t).palette[r].main },
            },
          })),
        {
          props: {},
          style: {
            [`&.${ui.disabled}`]: {
              color: (t.vars || t).palette.text.disabled,
            },
            [`&.${ui.error}`]: { color: (t.vars || t).palette.error.main },
          },
        },
      ],
    })),
  ),
  $5 = pe("span", { name: "MuiFormLabel", slot: "Asterisk" })(
    ot(({ theme: t }) => ({
      [`&.${ui.error}`]: { color: (t.vars || t).palette.error.main },
    })),
  ),
  H5 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiFormLabel" }),
      {
        children: s,
        className: c,
        color: f,
        component: p = "label",
        disabled: m,
        error: h,
        filled: g,
        focused: v,
        required: A,
        ...x
      } = o,
      [S] = Wl({
        props: o,
        states: ["color", "required", "focused", "disabled", "error", "filled"],
      }),
      E = {
        ...o,
        color: S.color || "primary",
        component: p,
        disabled: S.disabled,
        error: S.error,
        filled: S.filled,
        focused: S.focused,
        required: S.required,
      },
      C = L5(E);
    return q.jsxs(j5, {
      as: p,
      ownerState: E,
      className: Te(C.root, c),
      ref: l,
      ...x,
      children: [
        s,
        S.required &&
          q.jsxs($5, {
            ownerState: E,
            "aria-hidden": !0,
            className: C.asterisk,
            children: [" ", "*"],
          }),
      ],
    });
  });
function di(t) {
  return `scale(${t}, ${t ** 2})`;
}
const q5 = {
    entering: { opacity: 1, transform: di(1) },
    entered: { opacity: 1, transform: "none" },
    exiting: { opacity: 0, transform: di(0.75) },
    exited: { opacity: 0, transform: di(0.75) },
  },
  P5 = { opacity: 0, transform: di(0.75), visibility: "hidden" },
  fp = b.forwardRef(function (r, l) {
    const {
        addEndListener: o,
        appear: s = !0,
        children: c,
        disablePrefersReducedMotion: f = !1,
        easing: p,
        in: m,
        onEnter: h,
        onEntered: g,
        onEntering: v,
        onExit: A,
        onExited: x,
        onExiting: S,
        style: E,
        timeout: C = "auto",
        ...B
      } = r,
      D = b.useRef(null),
      w = ji(),
      k = Qp(w.motion.reducedMotion, f),
      O = b.useRef(null),
      U = rn(O, $i(c), l),
      I = zn(O, v),
      X = zn(O, (L, z) => {
        k.shouldReduceMotion || Yp(L);
        const {
          duration: M,
          delay: $,
          easing: W,
        } = Ou({ style: E, timeout: C, easing: p }, { mode: "enter" });
        let se;
        C === "auto" && !k.shouldReduceMotion
          ? ((se = w.transitions.getAutoHeightDuration(L.clientHeight)),
            (D.current = se))
          : ((se = M), (D.current = null));
        const N = k.getTransitionTiming({ duration: se, delay: $ });
        ((L.style.transition = [
          w.transitions.create("opacity", {
            duration: N.duration,
            delay: N.delay,
          }),
          w.transitions.create("transform", {
            duration:
              typeof N.duration == "string" ? N.duration : N.duration * 0.666,
            delay: N.delay,
            easing: W,
          }),
        ].join(",")),
          h && h(L, z));
      }),
      le = zn(O, g),
      ue = zn(O, S),
      Z = zn(O, (L) => {
        const {
          duration: z,
          delay: M,
          easing: $,
        } = Ou({ style: E, timeout: C, easing: p }, { mode: "exit" });
        let W;
        C === "auto" && !k.shouldReduceMotion
          ? ((W = w.transitions.getAutoHeightDuration(L.clientHeight)),
            (D.current = W))
          : ((W = z), (D.current = null));
        const se = k.getTransitionTiming({ duration: W, delay: M });
        ((L.style.transition = [
          w.transitions.create("opacity", {
            duration: se.duration,
            delay: se.delay,
          }),
          w.transitions.create("transform", {
            duration:
              typeof se.duration == "string"
                ? se.duration
                : se.duration * 0.666,
            delay:
              se.delay ||
              (typeof se.duration == "string"
                ? se.duration
                : se.duration * 0.333),
            easing: $,
          }),
        ].join(",")),
          (L.style.opacity = 0),
          (L.style.transform = di(0.75)),
          A && A(L));
      }),
      R = zn(O, (L) => {
        ((L.style.transition = ""), x && x(L));
      }),
      F = o
        ? (L) => {
            o(O.current, L);
          }
        : void 0;
    return q.jsx(d1, {
      appear: s,
      in: m,
      nodeRef: O,
      onEnter: X,
      onEntered: le,
      onEntering: I,
      onExit: Z,
      onExited: R,
      onExiting: ue,
      addEndListener: F,
      getAutoTimeout: C === "auto" ? () => D.current : void 0,
      reduceMotion: k.shouldReduceMotion,
      timeout: C === "auto" ? null : C,
      ...B,
      children: (L, { ownerState: z, ...M }) => {
        const $ = c1(L, m, q5, P5, E, c.props.style);
        return b.cloneElement(c, { style: $, ref: U, ...M });
      },
    });
  });
fp && (fp.muiSupportAuto = !0);
function I5(t) {
  return $e("MuiInputLabel", t);
}
const F5 = Ke("MuiInputLabel", [
    "root",
    "focused",
    "disabled",
    "error",
    "required",
    "asterisk",
    "formControl",
    "sizeSmall",
    "shrink",
    "animated",
    "standard",
    "filled",
    "outlined",
  ]),
  Y5 = (t) => {
    const { classes: r, disableUnderline: l } = t,
      s = He({ root: ["root", !l && "underline"], input: ["input"] }, cO, r);
    return { ...r, ...s };
  },
  V5 = pe(oc, {
    shouldForwardProp: (t) => Fn(t) || t === "classes",
    name: "MuiInput",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [...ac(t, r), !l.disableUnderline && r.underline];
    },
  })(
    ot(({ theme: t }) => {
      let l =
        t.palette.mode === "light"
          ? "rgba(0, 0, 0, 0.42)"
          : "rgba(255, 255, 255, 0.7)";
      return (
        t.vars &&
          (l = t.alpha(
            t.vars.palette.common.onBackground,
            t.vars.opacity.inputUnderline,
          )),
        {
          position: "relative",
          variants: [
            {
              props: ({ ownerState: o }) => o.formControl,
              style: { [`label + &, .${F5.root} + &`]: { marginTop: 16 } },
            },
            {
              props: ({ ownerState: o }) => !o.disableUnderline,
              style: {
                "&::after": {
                  left: 0,
                  bottom: 0,
                  content: '""',
                  position: "absolute",
                  right: 0,
                  transform: "scaleX(0)",
                  ...zt(t, "transform", {
                    duration: t.transitions.duration.shorter,
                    easing: t.transitions.easing.easeOut,
                  }),
                  pointerEvents: "none",
                },
                [`&.${ai.focused}:after`]: {
                  transform: "scaleX(1) translateX(0)",
                },
                [`&.${ai.error}`]: {
                  "&::before, &::after": {
                    borderBottomColor: (t.vars || t).palette.error.main,
                  },
                },
                "&::before": {
                  borderBottom: `1px solid ${l}`,
                  left: 0,
                  bottom: 0,
                  content: '""',
                  position: "absolute",
                  right: 0,
                  ...zt(t, "border-bottom-color", {
                    duration: t.transitions.duration.shorter,
                  }),
                  pointerEvents: "none",
                },
                [`&:hover:not(.${ai.disabled}, .${ai.error}):before`]: {
                  borderBottom: `2px solid ${(t.vars || t).palette.text.primary}`,
                  "@media (hover: none)": { borderBottom: `1px solid ${l}` },
                },
                [`&.${ai.disabled}:before`]: { borderBottomStyle: "dotted" },
              },
            },
            ...Object.entries(t.palette)
              .filter(Rn())
              .map(([o]) => ({
                props: { color: o, disableUnderline: !1 },
                style: {
                  "&::after": {
                    borderBottom: `2px solid ${(t.vars || t).palette[o].main}`,
                  },
                },
              })),
          ],
        }
      );
    }),
  ),
  G5 = pe(ic, { name: "MuiInput", slot: "Input", overridesResolver: lc })({}),
  Jp = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiInput" }),
      {
        disableUnderline: s = !1,
        fullWidth: c = !1,
        inputComponent: f = "input",
        multiline: p = !1,
        notched: m,
        slotProps: h,
        slots: g = {},
        type: v = "text",
        ...A
      } = o,
      x = Y5(o),
      E = { root: { ownerState: { disableUnderline: s } } },
      C = h ? Kt(h, E) : E,
      B = g.root ?? V5,
      D = g.input ?? G5;
    return q.jsx(Gp, {
      slots: { root: B, input: D },
      slotProps: C,
      fullWidth: c,
      inputComponent: f,
      multiline: p,
      ref: l,
      type: v,
      ...A,
      classes: x,
    });
  });
Jp.muiName = "Input";
const K5 = (t) => {
    const {
        classes: r,
        formControl: l,
        size: o,
        shrink: s,
        disableAnimation: c,
        variant: f,
        required: p,
      } = t,
      m = {
        root: [
          "root",
          l && "formControl",
          !c && "animated",
          s && "shrink",
          o && o !== "medium" && `size${Ae(o)}`,
          f,
        ],
        asterisk: [p && "asterisk"],
      },
      h = He(m, I5, r);
    return { ...r, ...h };
  },
  X5 = pe(H5, {
    shouldForwardProp: (t) => Fn(t) || t === "classes",
    name: "MuiInputLabel",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        { [`& .${ui.asterisk}`]: r.asterisk },
        r.root,
        l.formControl && r.formControl,
        l.size === "small" && r.sizeSmall,
        l.shrink && r.shrink,
        !l.disableAnimation && r.animated,
        l.focused && r.focused,
        r[l.variant],
      ];
    },
  })(
    ot(({ theme: t }) => ({
      display: "block",
      transformOrigin: "top left",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      variants: [
        {
          props: ({ ownerState: r }) => r.formControl,
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            transform: "translate(0, 20px) scale(1)",
          },
        },
        {
          props: { size: "small" },
          style: { transform: "translate(0, 17px) scale(1)" },
        },
        {
          props: ({ ownerState: r }) => r.shrink,
          style: {
            transform: "translate(0, -1.5px) scale(0.75)",
            transformOrigin: "top left",
            maxWidth: "133%",
          },
        },
        {
          props: ({ ownerState: r }) => !r.disableAnimation,
          style: {
            ...zt(t, ["color", "transform", "max-width"], {
              duration: t.transitions.duration.shorter,
              easing: t.transitions.easing.easeOut,
            }),
          },
        },
        {
          props: { variant: "filled" },
          style: {
            zIndex: 1,
            pointerEvents: "none",
            transform: "translate(12px, 16px) scale(1)",
            maxWidth: "calc(100% - 24px)",
          },
        },
        {
          props: { variant: "filled", size: "small" },
          style: { transform: "translate(12px, 13px) scale(1)" },
        },
        {
          props: ({ variant: r, ownerState: l }) => r === "filled" && l.shrink,
          style: {
            userSelect: "none",
            pointerEvents: "auto",
            transform: "translate(12px, 7px) scale(0.75)",
            maxWidth: "calc(133% - 24px)",
          },
        },
        {
          props: ({ variant: r, ownerState: l, size: o }) =>
            r === "filled" && l.shrink && o === "small",
          style: { transform: "translate(12px, 4px) scale(0.75)" },
        },
        {
          props: { variant: "outlined" },
          style: {
            zIndex: 1,
            pointerEvents: "none",
            transform: "translate(14px, 16px) scale(1)",
            maxWidth: "calc(100% - 24px)",
          },
        },
        {
          props: { variant: "outlined", size: "small" },
          style: { transform: "translate(14px, 9px) scale(1)" },
        },
        {
          props: ({ variant: r, ownerState: l }) =>
            r === "outlined" && l.shrink,
          style: {
            userSelect: "none",
            pointerEvents: "auto",
            maxWidth: "calc(133% - 32px)",
            transform: "translate(14px, -9px) scale(0.75)",
          },
        },
      ],
    })),
  ),
  Q5 = b.forwardRef(function (r, l) {
    const o = Fe({ name: "MuiInputLabel", props: r }),
      {
        disableAnimation: s = !1,
        margin: c,
        shrink: f,
        variant: p,
        className: m,
        ...h
      } = o,
      [g, v] = Wl({
        props: o,
        states: ["size", "variant", "required", "focused"],
      });
    let A = f;
    typeof A > "u" && v && (A = v.filled || v.focused || v.adornedStart);
    const x = {
        ...o,
        disableAnimation: s,
        formControl: v,
        shrink: A,
        size: g.size,
        variant: g.variant,
        required: g.required,
        focused: g.focused,
      },
      S = K5(x);
    return q.jsx(X5, {
      "data-shrink": A,
      ref: l,
      className: Te(S.root, m),
      ...h,
      ownerState: x,
      classes: S,
    });
  });
function Z5(t) {
  return $e("MuiLink", t);
}
const W5 = Ke("MuiLink", [
    "root",
    "underlineNone",
    "underlineHover",
    "underlineAlways",
    "button",
    "focusVisible",
  ]),
  J5 = ({ theme: t, ownerState: r }) => {
    const l = r.color;
    if ("colorSpace" in t && t.colorSpace) {
      const c = ar(t, `palette.${l}.main`) || ar(t, `palette.${l}`) || r.color;
      return t.alpha(c, 0.4);
    }
    const o =
        ar(t, `palette.${l}.main`, !1) || ar(t, `palette.${l}`, !1) || r.color,
      s = ar(t, `palette.${l}.mainChannel`) || ar(t, `palette.${l}Channel`);
    return "vars" in t && s ? `rgba(${s} / 0.4)` : Ci(o, 0.4);
  },
  bv = {
    primary: !0,
    secondary: !0,
    error: !0,
    info: !0,
    success: !0,
    warning: !0,
    textPrimary: !0,
    textSecondary: !0,
    textDisabled: !0,
  },
  e3 = (t) => {
    const { classes: r, component: l, focusVisible: o, underline: s } = t,
      c = {
        root: [
          "root",
          `underline${Ae(s)}`,
          l === "button" && "button",
          o && "focusVisible",
        ],
      };
    return He(c, Z5, r);
  },
  t3 = pe(Fa, {
    name: "MuiLink",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        r[`underline${Ae(l.underline)}`],
        l.component === "button" && r.button,
      ];
    },
  })(
    ot(({ theme: t }) => ({
      variants: [
        { props: { underline: "none" }, style: { textDecoration: "none" } },
        {
          props: { underline: "hover" },
          style: {
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          },
        },
        {
          props: { underline: "always" },
          style: {
            textDecoration: "underline",
            "&:hover": { textDecorationColor: "inherit" },
          },
        },
        {
          props: ({ underline: r, ownerState: l }) =>
            r === "always" && l.color !== "inherit",
          style: { textDecorationColor: "var(--Link-underlineColor)" },
        },
        {
          props: ({ underline: r, ownerState: l }) =>
            r === "always" && l.color === "inherit",
          style: t.colorSpace
            ? { textDecorationColor: t.alpha("currentColor", 0.4) }
            : null,
        },
        ...Object.entries(t.palette)
          .filter(Rn())
          .map(([r]) => ({
            props: { underline: "always", color: r },
            style: {
              "--Link-underlineColor": t.alpha(
                (t.vars || t).palette[r].main,
                0.4,
              ),
            },
          })),
        {
          props: { underline: "always", color: "textPrimary" },
          style: {
            "--Link-underlineColor": t.alpha(
              (t.vars || t).palette.text.primary,
              0.4,
            ),
          },
        },
        {
          props: { underline: "always", color: "textSecondary" },
          style: {
            "--Link-underlineColor": t.alpha(
              (t.vars || t).palette.text.secondary,
              0.4,
            ),
          },
        },
        {
          props: { underline: "always", color: "textDisabled" },
          style: {
            "--Link-underlineColor": (t.vars || t).palette.text.disabled,
          },
        },
        {
          props: { component: "button" },
          style: {
            position: "relative",
            WebkitTapHighlightColor: "transparent",
            backgroundColor: "transparent",
            outline: 0,
            border: 0,
            margin: 0,
            borderRadius: 0,
            padding: 0,
            cursor: "pointer",
            userSelect: "none",
            verticalAlign: "middle",
            MozAppearance: "none",
            WebkitAppearance: "none",
            "&::-moz-focus-inner": { borderStyle: "none" },
            [`&.${W5.focusVisible}`]: { outline: "auto" },
          },
        },
      ],
    })),
  ),
  n3 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiLink" }),
      s = ji(),
      {
        className: c,
        color: f = "primary",
        component: p = "a",
        onBlur: m,
        onFocus: h,
        TypographyClasses: g,
        underline: v = "always",
        variant: A = "inherit",
        sx: x,
        ...S
      } = o,
      [E, C] = b.useState(!1),
      B = (O) => {
        (Nu(O.target) || C(!1), m && m(O));
      },
      D = (O) => {
        (Nu(O.target) && C(!0), h && h(O));
      },
      w = {
        ...o,
        color: f,
        component: p,
        focusVisible: E,
        underline: v,
        variant: A,
      },
      k = e3(w);
    return q.jsx(t3, {
      color: f,
      className: Te(k.root, c),
      classes: g,
      component: p,
      onBlur: B,
      onFocus: D,
      ref: l,
      ownerState: w,
      variant: A,
      ...S,
      sx: [
        ...(bv[f] === void 0 ? [{ color: f }] : []),
        ...(Array.isArray(x) ? x : [x]),
      ],
      style: {
        ...S.style,
        ...(v === "always" &&
          f !== "inherit" &&
          !bv[f] && {
            "--Link-underlineColor": J5({ theme: s, ownerState: w }),
          }),
      },
    });
  }),
  r3 = b.createContext({});
function a3(t) {
  return $e("MuiList", t);
}
Ke("MuiList", ["root", "padding", "dense", "subheader"]);
const l3 = (t) => {
    const { classes: r, disablePadding: l, dense: o, subheader: s } = t;
    return He(
      { root: ["root", !l && "padding", o && "dense", s && "subheader"] },
      a3,
      r,
    );
  },
  o3 = pe("ul", {
    name: "MuiList",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.root,
        !l.disablePadding && r.padding,
        l.dense && r.dense,
        l.subheader && r.subheader,
      ];
    },
  })({
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: "relative",
    variants: [
      {
        props: ({ ownerState: t }) => !t.disablePadding,
        style: { paddingTop: 8, paddingBottom: 8 },
      },
      {
        props: ({ ownerState: t }) => t.subheader,
        style: { paddingTop: 0, isolation: "isolate" },
      },
    ],
  }),
  i3 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiList" }),
      {
        children: s,
        className: c,
        component: f = "ul",
        dense: p = !1,
        disablePadding: m = !1,
        subheader: h,
        ...g
      } = o,
      v = b.useMemo(() => ({ dense: p }), [p]),
      A = { ...o, component: f, dense: p, disablePadding: m },
      x = l3(A);
    return q.jsx(r3.Provider, {
      value: v,
      children: q.jsxs(o3, {
        as: f,
        className: Te(x.root, c),
        ref: l,
        ownerState: A,
        ...g,
        children: [h, s],
      }),
    });
  }),
  s3 = b.createContext(void 0),
  u3 = Object.is;
function c3(t, r) {
  if (t === r) return !0;
  if (!(t instanceof Object) || !(r instanceof Object)) return !1;
  let l = 0,
    o = 0;
  for (const s in t) if (((l += 1), !u3(t[s], r[s]) || !(s in r))) return !1;
  for (const s in r) o += 1;
  return l === o;
}
const f3 = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"];
function d3(t) {
  const {
      activeItemId: r,
      getDefaultActiveItemId: l,
      orientation: o,
      isRtl: s = !1,
      isItemFocusable: c = pi,
      wrap: f = !0,
    } = t,
    [p, m] = b.useState(r),
    [h, g] = b.useState(r);
  let v = p;
  r !== h && (g(r), r !== void 0 && r !== p && ((v = r), m(r)));
  const A = b.useRef(null),
    x = b.useRef(new Map()),
    [S, E] = b.useState(0),
    C = b.useMemo(() => dp(x.current), [S]),
    B = Sv(v, C, c, l),
    D = b.useRef(B);
  D.current = B;
  const w = b.useCallback(() => {
      const R = dp(x.current),
        F = Sv(D.current, R, c, l);
      return w1(R, F);
    }, [l, c]),
    k = b.useCallback(() => x.current, []),
    O = Ht((R) => {
      const F = x.current.get(R.id);
      c3(F ?? null, R) || (x.current.set(R.id, R), E((L) => L + 1));
    }),
    U = Ht((R) => {
      x.current.delete(R) && E((F) => F + 1);
    }),
    I = Ht((R) => {
      m(R);
    }),
    X = b.useCallback((R) => D.current === R, []),
    le = b.useCallback(
      (R, F, L, z) => {
        var W;
        const M = ou(x.current),
          $ = C1(M, R, F, L, z ?? c);
        return $ ? ((W = $.element) == null || W.focus(), m($.id), $) : null;
      },
      [c],
    ),
    ue = b.useCallback(
      (R) => ({
        onFocus: (z) => {
          const M = ou(x.current),
            $ = M1(M, z.target);
          $ !== -1 && m(M[$].id);
        },
        onKeyDown: (z) => {
          if (
            z.altKey ||
            z.shiftKey ||
            z.ctrlKey ||
            z.metaKey ||
            !f3.includes(z.key)
          )
            return;
          let M = o === "horizontal" ? "ArrowLeft" : "ArrowUp",
            $ = o === "horizontal" ? "ArrowRight" : "ArrowDown";
          o === "horizontal" && s && ((M = "ArrowRight"), ($ = "ArrowLeft"));
          const W = ou(x.current),
            se = kr(Jt(A.current)),
            N = se === A.current;
          let V = xv(W, se, D.current),
            ne = "next";
          switch (z.key) {
            case M:
              ((ne = "previous"), z.preventDefault(), N && (V = W.length));
              break;
            case $:
              (z.preventDefault(), N && (V = -1));
              break;
            case "Home":
              (z.preventDefault(), (V = -1));
              break;
            case "End":
              (z.preventDefault(), (ne = "previous"), (V = W.length));
              break;
            default:
              return;
          }
          le(V, ne, f);
        },
        ref: g3(R, (z) => {
          A.current = z;
        }),
      }),
      [le, s, o, f],
    ),
    Z = b.useCallback(
      (R) => {
        var $;
        const F = ou(x.current),
          L = kr(Jt(A.current)),
          M = L === A.current ? -1 : xv(F, L, D.current);
        return (($ = le(M, "next", !0, R)) == null ? void 0 : $.id) ?? null;
      },
      [le],
    );
  return b.useMemo(
    () => ({
      activeItemId: B,
      focusNext: Z,
      getActiveItem: w,
      getContainerProps: ue,
      getItemMap: k,
      isItemActive: X,
      registerItem: O,
      setActiveItemId: I,
      unregisterItem: U,
    }),
    [B, Z, w, ue, k, X, O, I, U],
  );
}
function Sv(t, r, l, o) {
  return t != null ? p3(t, r, l) : h3(r, l, o);
}
function p3(t, r, l) {
  var s;
  const o = O1(r, t);
  return o === -1
    ? A1(r, l)
    : l(r[o])
      ? r[o].id
      : (((s = C1(r, o, "next", !1, l)) == null ? void 0 : s.id) ?? null);
}
function h3(t, r, l) {
  const o = l == null ? void 0 : l(t);
  if (o != null) {
    const s = w1(t, o);
    if (s && r(s)) return s.id;
  }
  return A1(t, r);
}
function xv(t, r, l) {
  if (r) {
    const o = M1(t, r);
    if (o !== -1) return o;
  }
  return O1(t, l);
}
function C1(t, r, l, o, s) {
  const c = t.length - 1;
  if (c === -1) return null;
  let f = !1,
    p = Rv(r, c, l, o);
  const m = p;
  for (; p !== -1;) {
    if (p === m) {
      if (f) return null;
      f = !0;
    }
    const h = t[p];
    if (!h || !s(h)) p = Rv(p, c, l, o);
    else return h;
  }
  return null;
}
function A1(t, r) {
  var l;
  return ((l = t.find((o) => r(o))) == null ? void 0 : l.id) ?? null;
}
function w1(t, r) {
  return r == null ? null : (t.find((l) => l.id === r) ?? null);
}
function O1(t, r) {
  return r == null ? -1 : t.findIndex((l) => l.id === r);
}
function M1(t, r) {
  return r
    ? t.findIndex((l) => {
        var o;
        return (
          l.element === r || ((o = l.element) == null ? void 0 : o.contains(r))
        );
      })
    : -1;
}
function dp(t) {
  const r = Array.from(t.values());
  if (r.every((s) => s.element == null)) return r;
  const l = r.filter(pp).sort((s, c) => m3(s.element, c.element)),
    o = r.filter((s) => !pp(s));
  return [...l, ...o];
}
function ou(t) {
  return dp(t).filter(pp);
}
function Rv(t, r, l, o = !0) {
  return l === "next"
    ? t === r
      ? o
        ? 0
        : -1
      : t + 1
    : t === 0
      ? o
        ? r
        : -1
      : t - 1;
}
function pi(t) {
  return t.element
    ? t.focusableWhenDisabled
      ? !0
      : !t.disabled &&
        !t.element.hasAttribute("disabled") &&
        t.element.getAttribute("aria-disabled") !== "true" &&
        t.element.hasAttribute("tabindex")
    : !1;
}
function pp(t) {
  return t.element != null && t.element.isConnected;
}
function m3(t, r) {
  if (t === r) return 0;
  const l = t.compareDocumentPosition(r);
  return l & Node.DOCUMENT_POSITION_FOLLOWING ||
    l & Node.DOCUMENT_POSITION_CONTAINED_BY
    ? -1
    : l & Node.DOCUMENT_POSITION_PRECEDING ||
        l & Node.DOCUMENT_POSITION_CONTAINS
      ? 1
      : 0;
}
function g3(...t) {
  return (r) => {
    t.forEach((l) => {
      ip(l ?? null, r);
    });
  };
}
function y3(t, r) {
  if (r == null) {
    t.focus();
    return;
  }
  try {
    t.focus({ focusVisible: r === "keyboard" });
  } catch {
    t.focus();
  }
}
function v3(t) {
  return t
    ? t.type === "mousedown" ||
      t.type === "pointerdown" ||
      t.type === "touchstart"
      ? "pointer"
      : t.type === "keydown" || (t.type === "click" && t.detail === 0)
        ? "keyboard"
        : null
    : null;
}
function b3(t) {
  return t == null || (typeof t == "string" && !t.trim());
}
function bu(t, r) {
  return typeof r == "object" && r !== null ? t === r : String(t) === String(r);
}
const N1 = b.createContext(null);
function S3() {
  return b.useContext(N1);
}
const x3 = N1.Provider,
  R3 = b.createContext(void 0);
function E3(t) {
  const r = (t == null ? void 0 : t.element) ?? t;
  if (!r) return "";
  if ((t == null ? void 0 : t.textValue) !== void 0) return t.textValue;
  let l = r.innerText;
  return (l === void 0 && (l = r.textContent), l ?? "");
}
function B1(t, r) {
  if (r === void 0) return !0;
  let l = E3(t);
  return (
    (l = l.trim().toLowerCase()),
    l.length === 0
      ? !1
      : r.repeating
        ? l[0] === r.keys[0]
        : l.startsWith(r.keys.join(""))
  );
}
function T3(t, r) {
  return B1(t, r) ? pi(t) : !1;
}
function C3(t, r) {
  y3(t, r);
}
const A3 = b.forwardRef(function (r, l) {
  const {
      actions: o,
      autoFocus: s = !1,
      autoFocusItem: c = !1,
      children: f,
      className: p,
      disabledItemsFocusable: m = !1,
      disableListWrap: h = !1,
      onKeyDown: g,
      variant: v = "selectedMenu",
      ...A
    } = r,
    x = b.useRef(null),
    S = b.useRef(!1),
    [E, C] = b.useState(!1),
    B = S3(),
    D = b.useRef({
      keys: [],
      repeating: !0,
      previousKeyMatched: !0,
      lastTime: null,
    }),
    w = b.useCallback(
      (z) => {
        var M, $, W;
        return v === "selectedMenu"
          ? (((M = z.find((se) => se.selected && pi(se))) == null
              ? void 0
              : M.id) ??
              (($ = z.find((se) => pi(se))) == null ? void 0 : $.id) ??
              null)
          : (((W = z.find((se) => pi(se))) == null ? void 0 : W.id) ?? null);
      },
      [v],
    ),
    k = d3({
      activeItemId: void 0,
      getDefaultActiveItemId: w,
      orientation: "vertical",
      wrap: !h,
    }),
    {
      activeItemId: O,
      focusNext: U,
      getActiveItem: I,
      getContainerProps: X,
      getItemMap: le,
    } = k,
    ue = Ht((z = !1) => {
      if (!x.current || (!z && S.current)) return null;
      if (c) {
        const M = I();
        if (M != null && M.element) {
          const $ = Array.from(le().values()).some((se) => se.selected),
            W = v === "menu" && $ && !M.selected && B == null;
          return (C(W), C3(M.element, B), (S.current = !0), M.element);
        }
        return s ? (C(!1), x.current.focus(), x.current) : null;
      }
      return s
        ? (C(!1), x.current.focus(), (S.current = !0), x.current)
        : (C(!1), null);
    });
  (nn(() => {
    if (!s && !c) {
      ((S.current = !1), C(!1));
      return;
    }
    ue();
  }, [O, c, s, ue]),
    b.useImperativeHandle(
      o,
      () => ({
        adjustStyleForScrollbar: (z, { direction: M }) => {
          const $ = !x.current.style.width;
          if (z.clientHeight < x.current.clientHeight && $) {
            const W = `${E1(jr(z))}px`;
            ((x.current.style[M === "rtl" ? "paddingLeft" : "paddingRight"] =
              W),
              (x.current.style.width = `calc(100% + ${W})`));
          }
          return x.current;
        },
        focusInitialTarget: () => {
          if (!x.current) return null;
          const z = kr(Jt(x.current));
          return z && vu(x.current, z) ? z : ue(!0);
        },
      }),
      [ue],
    ));
  const Z = X(),
    R = rn(x, Z.ref, l),
    F = b.useMemo(
      () => ({
        itemsFocusableWhenDisabled: m,
        suppressInitialFocusVisible: E,
        variant: v,
      }),
      [m, E, v],
    ),
    L = Ht((z) => {
      if ((E && C(!1), (z.ctrlKey || z.metaKey || z.altKey) && g)) {
        g(z);
        return;
      }
      if ((Z.onKeyDown(z), z.key.length === 1)) {
        const $ = D.current,
          W = z.key.toLowerCase(),
          se = performance.now();
        ($.keys.length > 0 &&
          (se - $.lastTime > 500
            ? (($.keys = []), ($.repeating = !0), ($.previousKeyMatched = !0))
            : $.repeating && W !== $.keys[0] && ($.repeating = !1)),
          ($.lastTime = se),
          $.keys.push(W));
        const N = kr(Jt(x.current)),
          V = N && !$.repeating && B1(N, $);
        $.previousKeyMatched && (V || U((ne) => T3(ne, $)) != null)
          ? z.preventDefault()
          : ($.previousKeyMatched = !1);
      }
      g && g(z);
    });
  return q.jsx(i3, {
    role: "menu",
    ref: R,
    className: p,
    onKeyDown: L,
    onFocus: Z.onFocus,
    tabIndex: -1,
    ...A,
    children: q.jsx(R3.Provider, {
      value: F,
      children: q.jsx(s3.Provider, { value: k, children: f }),
    }),
  });
});
function w3(t) {
  return $e("MuiPopover", t);
}
Ke("MuiPopover", ["root", "paper"]);
function Ev(t, r) {
  let l = 0;
  return (
    typeof r == "number"
      ? (l = r)
      : r === "center"
        ? (l = t.height / 2)
        : r === "bottom" && (l = t.height),
    l
  );
}
function Tv(t, r) {
  let l = 0;
  return (
    typeof r == "number"
      ? (l = r)
      : r === "center"
        ? (l = t.width / 2)
        : r === "right" && (l = t.width),
    l
  );
}
function Cv(t) {
  return [t.horizontal, t.vertical]
    .map((r) => (typeof r == "number" ? `${r}px` : r))
    .join(" ");
}
function iu(t) {
  return typeof t == "function" ? t() : t;
}
const O3 = (t) => {
    const { classes: r } = t;
    return He({ root: ["root"], paper: ["paper"] }, w3, r);
  },
  M3 = pe(A5, { name: "MuiPopover", slot: "Root" })({}),
  _1 = pe(sc, { name: "MuiPopover", slot: "Paper" })({
    position: "absolute",
    overflowY: "auto",
    overflowX: "hidden",
    minWidth: 16,
    minHeight: 16,
    maxWidth: "calc(100% - 32px)",
    maxHeight: "calc(100% - 32px)",
    outline: 0,
  }),
  N3 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiPopover" }),
      {
        action: s,
        anchorEl: c,
        anchorOrigin: f = { vertical: "top", horizontal: "left" },
        anchorPosition: p,
        anchorReference: m = "anchorEl",
        children: h,
        className: g,
        container: v,
        disableAutoFocus: A = !1,
        elevation: x = 8,
        marginThreshold: S = 16,
        open: E,
        slots: C = {},
        slotProps: B = {},
        transformOrigin: D = { vertical: "top", horizontal: "left" },
        transitionDuration: w = "auto",
        disableScrollLock: k = !1,
        ...O
      } = o,
      U = b.useRef(),
      I = {
        ...o,
        anchorOrigin: f,
        anchorReference: m,
        elevation: x,
        marginThreshold: S,
        transformOrigin: D,
        transitionDuration: w,
      },
      X = O3(I),
      le = b.useCallback(() => {
        if (m === "anchorPosition") return p;
        const fe = iu(c),
          Oe = (
            fe && fe.nodeType === 1 ? fe : Jt(U.current).body
          ).getBoundingClientRect();
        return {
          top: Oe.top + Ev(Oe, f.vertical),
          left: Oe.left + Tv(Oe, f.horizontal),
        };
      }, [c, f.horizontal, f.vertical, p, m]),
      ue = b.useCallback(
        (fe) => ({
          vertical: Ev(fe, D.vertical),
          horizontal: Tv(fe, D.horizontal),
        }),
        [D.horizontal, D.vertical],
      ),
      Z = b.useCallback(
        (fe) => {
          const Se = { width: fe.offsetWidth, height: fe.offsetHeight },
            Oe = ue(Se);
          if (m === "none")
            return { top: null, left: null, transformOrigin: Cv(Oe) };
          const rt = le();
          let Ye = rt.top - Oe.vertical,
            ze = rt.left - Oe.horizontal;
          const Ee = Ye + Se.height,
            Et = ze + Se.width,
            Mt = jr(iu(c)),
            ke = Mt.innerHeight - S,
            an = Mt.innerWidth - S;
          if (S != null && Ye < S) {
            const ut = Ye - S;
            ((Ye -= ut), (Oe.vertical += ut));
          } else if (S != null && Ee > ke) {
            const ut = Ee - ke;
            ((Ye -= ut), (Oe.vertical += ut));
          }
          if (S != null && ze < S) {
            const ut = ze - S;
            ((ze -= ut), (Oe.horizontal += ut));
          } else if (Et > an) {
            const ut = Et - an;
            ((ze -= ut), (Oe.horizontal += ut));
          }
          return {
            top: `${Math.round(Ye)}px`,
            left: `${Math.round(ze)}px`,
            transformOrigin: Cv(Oe),
          };
        },
        [c, m, le, ue, S],
      ),
      [R, F] = b.useState(E),
      L = b.useCallback(() => {
        const fe = U.current;
        if (!fe) return;
        const Se = Z(fe);
        (Se.top != null && fe.style.setProperty("top", Se.top),
          Se.left != null && (fe.style.left = Se.left),
          (fe.style.transformOrigin = Se.transformOrigin),
          F(!0));
      }, [Z]);
    b.useEffect(
      () => (
        k && window.addEventListener("scroll", L),
        () => window.removeEventListener("scroll", L)
      ),
      [c, k, L],
    );
    const z = () => {
        L();
      },
      M = () => {
        F(!1);
      };
    (b.useEffect(() => {
      E && L();
    }),
      b.useImperativeHandle(
        s,
        () =>
          E
            ? {
                updatePosition: () => {
                  L();
                },
              }
            : null,
        [E, L],
      ),
      b.useEffect(() => {
        if (!E) return;
        const fe = i1(() => {
            L();
          }),
          Se = jr(iu(c));
        return (
          Se.addEventListener("resize", fe),
          () => {
            (fe.clear(), Se.removeEventListener("resize", fe));
          }
        );
      }, [c, E, L]));
    let $ = w;
    const W = { slots: C, slotProps: B },
      [se, N] = yt("transition", {
        elementType: fp,
        externalForwardedProps: W,
        ownerState: I,
        getSlotProps: (fe) => ({
          ...fe,
          onEntering: (Se, Oe) => {
            var rt;
            ((rt = fe.onEntering) == null || rt.call(fe, Se, Oe), z());
          },
          onExited: (Se) => {
            var Oe;
            ((Oe = fe.onExited) == null || Oe.call(fe, Se), M());
          },
        }),
        additionalProps: { appear: !0, in: E },
      });
    w === "auto" && !se.muiSupportAuto && ($ = void 0);
    const V = v || (c ? Jt(iu(c)).body : void 0),
      [ne, { slots: ee, slotProps: oe, ...he }] = yt("root", {
        ref: l,
        elementType: M3,
        externalForwardedProps: { ...W, ...O },
        shouldForwardComponentProp: !0,
        additionalProps: {
          slots: { backdrop: C.backdrop },
          slotProps: {
            backdrop: gO(
              typeof B.backdrop == "function" ? B.backdrop(I) : B.backdrop,
              { invisible: !0 },
            ),
          },
          container: V,
          open: E,
        },
        ownerState: I,
        className: Te(X.root, g),
      }),
      [ce, be] = yt("paper", {
        ref: U,
        className: X.paper,
        elementType: _1,
        externalForwardedProps: W,
        shouldForwardComponentProp: !0,
        additionalProps: { elevation: x, style: R ? void 0 : { opacity: 0 } },
        ownerState: I,
      });
    return q.jsx(ne, {
      ...he,
      ...(!Au(ne) && {
        slots: ee,
        slotProps: oe,
        disableAutoFocus: A,
        disableScrollLock: k,
      }),
      children: q.jsx(se, {
        ...N,
        timeout: $,
        children: q.jsx(ce, { ...be, children: h }),
      }),
    });
  });
function B3(t) {
  return $e("MuiMenu", t);
}
Ke("MuiMenu", ["root", "paper", "list"]);
const _3 = { vertical: "top", horizontal: "right" },
  D3 = { vertical: "top", horizontal: "left" },
  z3 = (t) => {
    const { classes: r } = t;
    return He({ root: ["root"], paper: ["paper"], list: ["list"] }, B3, r);
  },
  k3 = pe(N3, {
    shouldForwardProp: (t) => Fn(t) || t === "classes",
    name: "MuiMenu",
    slot: "Root",
  })({}),
  U3 = pe(_1, { name: "MuiMenu", slot: "Paper" })({
    maxHeight: "calc(100% - 96px)",
    WebkitOverflowScrolling: "touch",
  }),
  L3 = pe(A3, { name: "MuiMenu", slot: "List" })({ outline: 0 }),
  j3 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiMenu" }),
      {
        autoFocus: s = !0,
        children: c,
        className: f,
        disableAutoFocusItem: p = !1,
        onClose: m,
        open: h,
        PopoverClasses: g,
        transitionDuration: v = "auto",
        variant: A = "selectedMenu",
        slots: x = {},
        slotProps: S = {},
        ...E
      } = o,
      C = PA(),
      B = {
        ...o,
        autoFocus: s,
        disableAutoFocusItem: p,
        transitionDuration: v,
        variant: A,
      },
      D = z3(B),
      w = s && h,
      k = w && !p,
      O = b.useRef(null),
      U = (z, M) => {
        var $, W;
        O.current &&
          (O.current.adjustStyleForScrollbar(z, {
            direction: C ? "rtl" : "ltr",
          }),
          w && ((W = ($ = O.current).focusInitialTarget) == null || W.call($)));
      },
      I = (z) => {
        z.key === "Tab" && (z.preventDefault(), m && m(z, "tabKeyDown"));
      },
      X = { slots: x, slotProps: S },
      le = zM({
        elementType: x.root,
        externalSlotProps: S.root,
        ownerState: B,
        className: [D.root, f],
      }),
      [ue, Z] = yt("paper", {
        className: D.paper,
        elementType: U3,
        externalForwardedProps: X,
        shouldForwardComponentProp: !0,
        ownerState: B,
      }),
      [R, F] = yt("list", {
        className: D.list,
        elementType: L3,
        shouldForwardComponentProp: !0,
        externalForwardedProps: X,
        getSlotProps: (z) => ({
          ...z,
          onKeyDown: (M) => {
            var $;
            (I(M), ($ = z.onKeyDown) == null || $.call(z, M));
          },
        }),
        ownerState: B,
      }),
      L = typeof S.transition == "function" ? S.transition(B) : S.transition;
    return q.jsx(k3, {
      disableAutoFocus: s,
      onClose: m,
      anchorOrigin: { vertical: "bottom", horizontal: C ? "right" : "left" },
      transformOrigin: C ? _3 : D3,
      slots: {
        root: x.root,
        paper: ue,
        backdrop: x.backdrop,
        transition: x.transition,
      },
      slotProps: {
        root: le,
        paper: Z,
        backdrop: typeof S.backdrop == "function" ? S.backdrop(B) : S.backdrop,
        transition: {
          ...L,
          onEntering: (...z) => {
            var M;
            (U(...z),
              (M = L == null ? void 0 : L.onEntering) == null ||
                M.call(L, ...z));
          },
        },
      },
      open: h,
      ref: l,
      transitionDuration: v,
      ownerState: B,
      ...E,
      classes: g,
      children: q.jsx(R, {
        actions: O,
        autoFocus: w,
        autoFocusItem: k,
        variant: A,
        ...F,
        children: c,
      }),
    });
  }),
  $3 = (t) => {
    const {
        classes: r,
        variant: l,
        disabled: o,
        multiple: s,
        open: c,
        error: f,
      } = t,
      p = {
        select: ["select", l, o && "disabled", s && "multiple", f && "error"],
        icon: ["icon", `icon${Ae(l)}`, c && "iconOpen", o && "disabled"],
      };
    return He(p, fO, r);
  },
  D1 = pe("select", { name: "MuiNativeSelect" })(({ theme: t }) => ({
    MozAppearance: "none",
    WebkitAppearance: "none",
    userSelect: "none",
    borderRadius: 0,
    cursor: "pointer",
    "&:focus": { borderRadius: 0 },
    [`&.${Kp.disabled}`]: { cursor: "default" },
    "&[multiple]": { height: "auto" },
    "&:not([multiple]) option, &:not([multiple]) optgroup": {
      backgroundColor: (t.vars || t).palette.background.paper,
    },
    variants: [
      {
        props: ({ ownerState: r }) =>
          r.variant !== "filled" && r.variant !== "outlined",
        style: { "&&&": { paddingRight: 24, minWidth: 16 } },
      },
      { props: { variant: "filled" }, style: { "&&&": { paddingRight: 32 } } },
      {
        props: { variant: "outlined" },
        style: {
          borderRadius: (t.vars || t).shape.borderRadius,
          "&:focus": { borderRadius: (t.vars || t).shape.borderRadius },
          "&&&": { paddingRight: 32 },
        },
      },
    ],
  })),
  H3 = pe(D1, {
    name: "MuiNativeSelect",
    slot: "Select",
    shouldForwardProp: Fn,
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.select,
        r[l.variant],
        l.error && r.error,
        { [`&.${Kp.multiple}`]: r.multiple },
      ];
    },
  })({}),
  z1 = pe("svg", { name: "MuiNativeSelect" })(({ theme: t }) => ({
    position: "absolute",
    right: 0,
    top: "calc(50% - .5em)",
    pointerEvents: "none",
    color: (t.vars || t).palette.action.active,
    [`&.${Kp.disabled}`]: { color: (t.vars || t).palette.action.disabled },
    variants: [
      {
        props: ({ ownerState: r }) => r.open,
        style: { transform: "rotate(180deg)" },
      },
      { props: { variant: "filled" }, style: { right: 7 } },
      { props: { variant: "outlined" }, style: { right: 7 } },
    ],
  })),
  q3 = pe(z1, {
    name: "MuiNativeSelect",
    slot: "Icon",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        r.icon,
        l.variant && r[`icon${Ae(l.variant)}`],
        l.open && r.iconOpen,
      ];
    },
  })({}),
  P3 = b.forwardRef(function (r, l) {
    const {
        className: o,
        disabled: s,
        error: c,
        IconComponent: f,
        inputRef: p,
        variant: m = "standard",
        ...h
      } = r,
      g = { ...r, disabled: s, variant: m, error: c },
      v = $3(g);
    return q.jsxs(b.Fragment, {
      children: [
        q.jsx(H3, {
          ownerState: g,
          className: Te(v.select, o),
          disabled: s,
          ref: p || l,
          ...h,
        }),
        r.multiple
          ? null
          : q.jsx(q3, { as: f, ownerState: g, className: v.icon }),
      ],
    });
  });
var Av;
const I3 = pe("fieldset", {
    name: "MuiNotchedOutlined",
    shouldForwardProp: Fn,
  })({
    textAlign: "left",
    position: "absolute",
    bottom: 0,
    right: 0,
    top: -5,
    left: 0,
    margin: 0,
    padding: "0 8px",
    pointerEvents: "none",
    borderRadius: "inherit",
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
    minWidth: "0%",
  }),
  F3 = pe("legend", { name: "MuiNotchedOutlined", shouldForwardProp: Fn })(
    ot(({ theme: t }) => ({
      float: "unset",
      width: "auto",
      overflow: "hidden",
      variants: [
        {
          props: ({ ownerState: r }) => !r.withLabel,
          style: {
            padding: 0,
            lineHeight: "11px",
            ...zt(t, "width", {
              duration: 150,
              easing: t.transitions.easing.easeOut,
            }),
          },
        },
        {
          props: ({ ownerState: r }) => r.withLabel,
          style: {
            display: "block",
            padding: 0,
            height: 11,
            fontSize: "0.75em",
            visibility: "hidden",
            maxWidth: 0.01,
            ...zt(t, "max-width", {
              duration: 50,
              easing: t.transitions.easing.easeOut,
            }),
            whiteSpace: "nowrap",
            "& > span": {
              paddingLeft: 5,
              paddingRight: 5,
              display: "inline-block",
              opacity: 0,
              visibility: "visible",
            },
          },
        },
        {
          props: ({ ownerState: r }) => r.withLabel && r.notched,
          style: {
            maxWidth: "100%",
            ...zt(t, "max-width", {
              duration: 100,
              easing: t.transitions.easing.easeOut,
              delay: 50,
            }),
          },
        },
      ],
    })),
  );
function Y3(t) {
  const {
      children: r,
      classes: l,
      className: o,
      label: s,
      notched: c,
      ...f
    } = t,
    p = s != null && s !== "",
    m = { ...t, notched: c, withLabel: p };
  return q.jsx(I3, {
    "aria-hidden": !0,
    className: o,
    ownerState: m,
    ...f,
    children: q.jsx(F3, {
      ownerState: m,
      children: p
        ? q.jsx("span", { children: s })
        : Av ||
          (Av = q.jsx("span", {
            className: "notranslate",
            "aria-hidden": !0,
            children: "​",
          })),
    }),
  });
}
const V3 = (t) => {
    const { classes: r } = t,
      o = He(
        {
          root: ["root"],
          notchedOutline: ["notchedOutline"],
          input: ["input"],
        },
        dO,
        r,
      );
    return { ...r, ...o };
  },
  G3 = pe(oc, {
    shouldForwardProp: (t) => Fn(t) || t === "classes",
    name: "MuiOutlinedInput",
    slot: "Root",
    overridesResolver: ac,
  })(
    ot(({ theme: t }) => {
      const r =
        t.palette.mode === "light"
          ? "rgba(0, 0, 0, 0.23)"
          : "rgba(255, 255, 255, 0.23)";
      return {
        position: "relative",
        borderRadius: (t.vars || t).shape.borderRadius,
        [`&:hover .${tr.notchedOutline}`]: {
          borderColor: (t.vars || t).palette.text.primary,
        },
        "@media (hover: none)": {
          [`&:hover .${tr.notchedOutline}`]: {
            borderColor: t.vars
              ? t.alpha(t.vars.palette.common.onBackground, 0.23)
              : r,
          },
        },
        [`&.${tr.focused} .${tr.notchedOutline}`]: { borderWidth: 2 },
        variants: [
          ...Object.entries(t.palette)
            .filter(Rn())
            .map(([l]) => ({
              props: { color: l },
              style: {
                [`&.${tr.focused} .${tr.notchedOutline}`]: {
                  borderColor: (t.vars || t).palette[l].main,
                },
              },
            })),
          {
            props: {},
            style: {
              [`&.${tr.error} .${tr.notchedOutline}`]: {
                borderColor: (t.vars || t).palette.error.main,
              },
              [`&.${tr.disabled} .${tr.notchedOutline}`]: {
                borderColor: (t.vars || t).palette.action.disabled,
              },
            },
          },
          {
            props: ({ ownerState: l }) => l.startAdornment,
            style: { paddingLeft: 14 },
          },
          {
            props: ({ ownerState: l }) => l.endAdornment,
            style: { paddingRight: 14 },
          },
          {
            props: ({ ownerState: l }) => l.multiline,
            style: { padding: "16.5px 14px" },
          },
          {
            props: ({ ownerState: l, size: o }) => l.multiline && o === "small",
            style: { padding: "8.5px 14px" },
          },
        ],
      };
    }),
  ),
  K3 = pe(Y3, { name: "MuiOutlinedInput", slot: "NotchedOutline" })(
    ot(({ theme: t }) => {
      const r =
        t.palette.mode === "light"
          ? "rgba(0, 0, 0, 0.23)"
          : "rgba(255, 255, 255, 0.23)";
      return {
        borderColor: t.vars
          ? t.alpha(t.vars.palette.common.onBackground, 0.23)
          : r,
      };
    }),
  ),
  X3 = pe(ic, {
    name: "MuiOutlinedInput",
    slot: "Input",
    overridesResolver: lc,
  })(
    ot(({ theme: t }) => ({
      padding: "16.5px 14px",
      "&:-webkit-autofill": {
        ...(!t.vars && {
          WebkitBoxShadow:
            t.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
          WebkitTextFillColor: t.palette.mode === "light" ? null : "#fff",
          caretColor: t.palette.mode === "light" ? null : "#fff",
        }),
        borderRadius: "inherit",
        ...(t.vars &&
          t.applyStyles("dark", {
            WebkitBoxShadow: "0 0 0 100px #266798 inset",
            WebkitTextFillColor: "#fff",
            caretColor: "#fff",
          })),
      },
      variants: [
        { props: { size: "small" }, style: { padding: "8.5px 14px" } },
        { props: ({ ownerState: r }) => r.multiline, style: { padding: 0 } },
        {
          props: ({ ownerState: r }) => r.startAdornment,
          style: { paddingLeft: 0 },
        },
        {
          props: ({ ownerState: r }) => r.endAdornment,
          style: { paddingRight: 0 },
        },
      ],
    })),
  ),
  eh = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiOutlinedInput" }),
      {
        fullWidth: s = !1,
        inputComponent: c = "input",
        label: f,
        multiline: p = !1,
        notched: m,
        slots: h = {},
        slotProps: g = {},
        type: v = "text",
        ...A
      } = o,
      x = V3(o),
      [S, E] = Wl({
        props: o,
        states: [
          "color",
          "disabled",
          "error",
          "focused",
          "hiddenLabel",
          "size",
          "required",
        ],
      }),
      C = {
        ...o,
        color: S.color || "primary",
        disabled: S.disabled,
        error: S.error,
        focused: S.focused,
        formControl: E,
        fullWidth: s,
        hiddenLabel: S.hiddenLabel,
        multiline: p,
        size: S.size,
        type: v,
      },
      B = h.root ?? G3,
      D = h.input ?? X3,
      [w, k] = yt("notchedOutline", {
        elementType: K3,
        className: x.notchedOutline,
        shouldForwardComponentProp: !0,
        ownerState: C,
        externalForwardedProps: { slots: h, slotProps: g },
        additionalProps: {
          label:
            f != null && f !== "" && S.required
              ? q.jsxs(b.Fragment, { children: [f, " ", "*"] })
              : f,
        },
      });
    return q.jsx(Gp, {
      slots: { root: B, input: D },
      slotProps: g,
      renderSuffix: (O) =>
        q.jsx(w, {
          ...k,
          notched:
            typeof m < "u" ? m : !!(O.startAdornment || O.filled || O.focused),
        }),
      fullWidth: s,
      inputComponent: c,
      multiline: p,
      ref: l,
      type: v,
      ...A,
      classes: { ...x, notchedOutline: null },
    });
  });
eh.muiName = "Input";
function k1(t) {
  return $e("MuiSelect", t);
}
const li = Ke("MuiSelect", [
  "root",
  "select",
  "multiple",
  "filled",
  "outlined",
  "standard",
  "disabled",
  "focused",
  "icon",
  "iconOpen",
  "nativeInput",
  "error",
]);
function Q3(t) {
  return Object.prototype.hasOwnProperty.call(t.props, "value");
}
function U1(t) {
  if (typeof t == "string" || typeof t == "number") return String(t);
  let r = "";
  return (
    b.Children.forEach(t, (l) => {
      typeof l == "string" || typeof l == "number"
        ? (r += String(l))
        : b.isValidElement(l) && (r += U1(l.props.children));
    }),
    r
  );
}
function Z3(t, r, l = 0) {
  if (t.length === 0) return -1;
  const o = ((l % t.length) + t.length) % t.length;
  for (let s = 0; s < t.length; s += 1) {
    const c = (o + s) % t.length;
    if (t[c].label.startsWith(r)) return c;
  }
  return -1;
}
function W3(t, r) {
  return !t.some((l) => l.label[0] === r && l.label[1] === r);
}
function J3(t, r) {
  const l = [];
  let o = -1;
  for (let s = 0; s < t.length; s += 1) {
    const c = t[s];
    if (!b.isValidElement(c) || !Q3(c) || c.props.disabled) continue;
    const f = U1(c.props.children).trim().toLowerCase();
    f !== "" &&
      (o === -1 && bu(r, c.props.value) && (o = l.length),
      l.push({ child: c, label: f, value: c.props.value }));
  }
  return { options: l, selectedIndex: o };
}
var wv;
const su = 2,
  e4 = 400,
  Ov = 200,
  t4 = 750,
  Ia = " ",
  n4 = "ArrowUp",
  r4 = "ArrowDown",
  a4 = "Enter";
function Mv(t, r) {
  var s;
  if (!r) return !1;
  if (
    t.composedPath().includes(r) ||
    ((s = t.target) != null && s.nodeType && r.contains(t.target))
  )
    return !0;
  const o = r.getBoundingClientRect();
  return o.width === 0 && o.height === 0
    ? !1
    : t.clientX >= o.left - su &&
        t.clientX <= o.right + su &&
        t.clientY >= o.top - su &&
        t.clientY <= o.bottom + su;
}
const l4 = pe(D1, {
    name: "MuiSelect",
    slot: "Select",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [
        { [`&.${li.select}`]: r.select },
        { [`&.${li.select}`]: r[l.variant] },
        { [`&.${li.error}`]: r.error },
        { [`&.${li.multiple}`]: r.multiple },
      ];
    },
  })({
    [`&.${li.select}`]: {
      height: "auto",
      minHeight: "1.4375em",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  }),
  o4 = pe(z1, {
    name: "MuiSelect",
    slot: "Icon",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.icon, l.open && r.iconOpen];
    },
  })({}),
  i4 = pe("input", {
    shouldForwardProp: (t) => s1(t) && t !== "classes",
    name: "MuiSelect",
    slot: "NativeInput",
  })({
    bottom: 0,
    left: 0,
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
    width: "100%",
    boxSizing: "border-box",
  }),
  s4 = (t) => {
    const {
      classes: r,
      variant: l,
      disabled: o,
      multiple: s,
      open: c,
      error: f,
    } = t;
    return He(
      {
        select: ["select", l, o && "disabled", s && "multiple", f && "error"],
        icon: ["icon", c && "iconOpen", o && "disabled"],
        nativeInput: ["nativeInput"],
      },
      k1,
      r,
    );
  },
  u4 = b.forwardRef(function (r, l) {
    var hr, Ir, mr, bt;
    const {
        "aria-describedby": o,
        "aria-label": s,
        autoFocus: c,
        autoWidth: f,
        children: p,
        className: m,
        defaultOpen: h,
        defaultValue: g,
        disabled: v,
        displayEmpty: A,
        error: x = !1,
        IconComponent: S,
        inputRef: E,
        labelId: C,
        MenuProps: B = {},
        multiple: D,
        name: w,
        onBlur: k,
        onChange: O,
        onClose: U,
        onFocus: I,
        onKeyDown: X,
        onMouseDown: le,
        onOpen: ue,
        open: Z,
        readOnly: R,
        renderValue: F,
        required: L,
        SelectDisplayProps: z = {},
        tabIndex: M,
        type: $,
        value: W,
        variant: se = "standard",
        ...N
      } = r,
      [V, ne] = tv({ controlled: W, default: g, name: "Select" }),
      [ee, oe] = tv({ controlled: Z, default: h, name: "Select" }),
      he = b.useRef(null),
      ce = b.useRef(null),
      be = b.useRef(null),
      fe = b.useRef(!1),
      Se = b.useRef(!1),
      Oe = b.useRef(null),
      rt = b.useRef(!1),
      Ye = b.useRef({ allowSelectedMouseUp: !1, allowUnselectedMouseUp: !1 }),
      ze = b.useRef({
        buffer: "",
        previousSearchIndex: null,
        matchedIndex: null,
      }),
      Ee = ci(),
      Et = ci(),
      Mt = ci(),
      [ke, an] = b.useState(null),
      { current: ut } = b.useRef(Z != null),
      [Ln, En] = b.useState(),
      [ur, qt] = b.useState(null),
      ya = rn(l, E),
      cr = b.useCallback((ie) => {
        ((ce.current = ie), ie && an(ie));
      }, []),
      Nt = ke == null ? void 0 : ke.parentNode;
    b.useImperativeHandle(
      ya,
      () => ({
        focus: () => {
          ce.current.focus();
        },
        node: he.current,
        value: V,
      }),
      [V],
    );
    const Ue = ke !== null && ee,
      it = b.useCallback(() => {
        (Mt.clear(),
          (ze.current.buffer = ""),
          (ze.current.previousSearchIndex = null),
          (ze.current.matchedIndex = null));
      }, [Mt]);
    nn(() => {
      ((fe.current = Ue), Ue && it());
    }, [Ue, it]);
    const vt = b.useCallback(() => {
        (Ee.clear(), Et.clear());
      }, [Ee, Et]),
      Me = b.useCallback(() => {
        (vt(),
          (rt.current = !1),
          (Ye.current = {
            allowSelectedMouseUp: !1,
            allowUnselectedMouseUp: !1,
          }));
      }, [vt]),
      Pt = b.useCallback(() => {
        Oe.current && (Oe.current(), (Oe.current = null));
      }, []);
    (b.useEffect(() => {
      Ue || (Me(), Pt());
    }, [Ue, Me, Pt]),
      b.useEffect(
        () => () => {
          (Me(), Pt(), it());
        },
        [Me, Pt, it],
      ),
      b.useEffect(() => {
        if (!Ue || !Nt || f || typeof ResizeObserver > "u") return;
        const ie = new ResizeObserver(() => {
          En(Nt.clientWidth);
        });
        return (
          ie.observe(Nt),
          () => {
            ie.disconnect();
          }
        );
      }, [Ue, Nt, f]),
      b.useEffect(() => {
        h &&
          ee &&
          ke &&
          !ut &&
          (En(f ? null : Nt.clientWidth), ce.current.focus());
      }, [ke, f]),
      b.useEffect(() => {
        c && ce.current.focus();
      }, [c]),
      b.useEffect(() => {
        if (!C) return;
        const ie = Jt(ce.current).getElementById(C);
        if (ie) {
          const me = () => {
            getSelection().isCollapsed && ce.current.focus();
          };
          return (
            ie.addEventListener("click", me),
            () => {
              ie.removeEventListener("click", me);
            }
          );
        }
      }, [C]));
    const kt = Ht((ie, me) => {
        (ie || (Me(), Pt()),
          ie ? (it(), qt(v3(me)), ue && ue(me)) : (qt(null), U && U(me)),
          ut || ((fe.current = ie), En(f ? null : Nt.clientWidth), oe(ie)));
      }),
      Yn = () => {
        (Me(),
          Se.current
            ? Et.start(Ov, () => {
                ((Ye.current.allowUnselectedMouseUp = !0),
                  Ee.start(Ov, () => {
                    Ye.current.allowSelectedMouseUp = !0;
                  }));
              })
            : Ee.start(e4, () => {
                ((Ye.current.allowSelectedMouseUp = !0),
                  (Ye.current.allowUnselectedMouseUp = !0));
              }));
      },
      at = (ie) => {
        if ((le == null || le(ie), ie.button !== 0)) return;
        (ie.preventDefault(), ce.current.focus());
        const me = Jt(ie.currentTarget);
        (Yn(), Pt());
        const Re = (Ve) => {
          ((Oe.current = null),
            ce.current &&
              (Mv(Ve, ce.current) ||
                Mv(Ve, be.current) ||
                (!fe.current && ut) ||
                kt(!1, Ve)));
        };
        (me.addEventListener("mouseup", Re, { capture: !0, once: !0 }),
          (Oe.current = () => {
            me.removeEventListener("mouseup", Re, !0);
          }),
          kt(!0, ie));
      },
      fr = (ie) => {
        kt(!1, ie);
      },
      $r = b.Children.toArray(p),
      va = (ie) => {
        const me = $r.find((Re) => Re.props.value === ie.target.value);
        me !== void 0 && (ne(me.props.value), O && O(ie, me));
      },
      Hi = (ie, me, Re) => {
        if ((ne(Re), O)) {
          const Ve = ie.nativeEvent || ie,
            It = new Ve.constructor(Ve.type, Ve);
          (Object.defineProperty(It, "target", {
            writable: !0,
            value: { value: Re, name: w },
          }),
            O(It, me));
        }
      },
      qi = (ie) => (me) => {
        rt.current = !1;
        let Re;
        if (me.currentTarget.hasAttribute("tabindex")) {
          if (D) {
            Re = Array.isArray(V) ? V.slice() : [];
            const Ve = V.indexOf(ie.props.value);
            Ve === -1 ? Re.push(ie.props.value) : Re.splice(Ve, 1);
          } else Re = ie.props.value;
          (ie.props.onClick && ie.props.onClick(me),
            V !== Re && Hi(me, ie, Re),
            D || kt(!1, me));
        }
      },
      Pi = (ie, me) => (Re) => {
        var Ra, gr;
        if (
          ((gr = (Ra = ie.props).onMouseUp) == null || gr.call(Ra, Re),
          rt.current)
        ) {
          rt.current = !1;
          return;
        }
        const Ve = !Ye.current.allowSelectedMouseUp && me,
          It = !Ye.current.allowUnselectedMouseUp && !me;
        Ve || It || Re.currentTarget.click();
      },
      eo = (ie) => {
        var Ea;
        const me = ze.current,
          Re = me.buffer !== "";
        if (
          Ue ||
          D ||
          v ||
          ie.defaultPrevented ||
          ((Ea = ie.nativeEvent) != null && Ea.isComposing) ||
          ie.key.length !== 1 ||
          ie.ctrlKey ||
          ie.metaKey ||
          ie.altKey ||
          (ie.key === Ia && !Re)
        )
          return !1;
        ie.key === Ia && ie.preventDefault();
        const Ve = me.buffer === "",
          { options: It, selectedIndex: Ra } = J3($r, V);
        if (It.length === 0) return (ie.key !== Ia && it(), !0);
        Ve && (me.previousSearchIndex = Ra);
        const gr = ie.key.toLowerCase();
        (me.buffer === gr &&
          W3(It, gr) &&
          ((me.buffer = ""), (me.previousSearchIndex = me.matchedIndex)),
          (me.buffer += gr),
          Mt.start(t4, it));
        const no = Z3(It, me.buffer, (me.previousSearchIndex ?? -1) + 1);
        if (no !== -1) {
          const Fr = It[no];
          return (
            (me.matchedIndex = no),
            bu(V, Fr.value) || Hi(ie, Fr.child, Fr.value),
            !0
          );
        }
        return (ie.key !== Ia && it(), !0);
      },
      ba = (ie) => {
        if (!R) {
          const me = eo(ie),
            Re =
              ie.key === Ia || ie.key === n4 || ie.key === r4 || ie.key === a4;
          (!me && Re && (ie.preventDefault(), kt(!0, ie)), X == null || X(ie));
        }
      },
      uc = (ie) => {
        (it(),
          !Ue &&
            k &&
            (Object.defineProperty(ie, "target", {
              writable: !0,
              value: { value: V, name: w },
            }),
            k(ie)));
      },
      Ii = (ie) => (me) => {
        var Re, Ve;
        ((Ve =
          (Re = ie == null ? void 0 : ie.props) == null
            ? void 0
            : Re.onKeyDown) == null || Ve.call(Re, me),
          me.key === Ia &&
            me.target === me.currentTarget &&
            !me.defaultPrevented &&
            (me.preventDefault(), me.repeat || me.currentTarget.click()));
      };
    delete N["aria-invalid"];
    let dr, Qa;
    const Hr = [];
    let Sa = !1,
      Za = !1;
    (wu({ value: V }) || A) && (F ? (dr = F(V)) : (Sa = !0));
    const Vn = $r.map((ie) => {
      if (!b.isValidElement(ie)) return null;
      let me;
      if (D) {
        if (!Array.isArray(V)) throw new Error(Lr(2));
        ((me = V.some((Re) => bu(Re, ie.props.value))),
          me && Sa && Hr.push(ie.props.children));
      } else
        ((me = bu(V, ie.props.value)), me && Sa && (Qa = ie.props.children));
      return (
        me && (Za = !0),
        b.cloneElement(ie, {
          "aria-selected": me ? "true" : "false",
          onMouseDown: (Re) => {
            var Ve, It;
            ((rt.current = !0),
              (It = (Ve = ie.props).onMouseDown) == null || It.call(Ve, Re));
          },
          onPointerDown: (Re) => {
            var Ve, It;
            ((rt.current = !0),
              (It = (Ve = ie.props).onPointerDown) == null || It.call(Ve, Re));
          },
          onClick: qi(ie),
          onMouseUp: Pi(ie, me),
          onKeyUp: (Re) => {
            (Re.key === Ia && Re.preventDefault(),
              ie.props.onKeyUp && ie.props.onKeyUp(Re));
          },
          onKeyDown: Ii(ie),
          role: "option",
          selected: me,
          value: void 0,
          "data-value": ie.props.value,
        })
      );
    });
    (nn(() => {
      ((Se.current = Za), !Ue && !D && !Za && it());
    }, [Za, D, Ue, it]),
      Sa &&
        (D
          ? Hr.length === 0
            ? (dr = null)
            : (dr = Hr.reduce(
                (ie, me, Re) => (
                  ie.push(me),
                  Re < Hr.length - 1 && ie.push(", "),
                  ie
                ),
                [],
              ))
          : (dr = Qa)));
    let Bt = Ln;
    !f && ut && ke && (Bt = Nt.clientWidth);
    let Ut;
    typeof M < "u" ? (Ut = M) : (Ut = v ? null : 0);
    const qr = z.id || (w ? `mui-component-select-${w}` : void 0),
      Gn = { ...r, variant: se, value: V, open: Ue, error: x },
      to = s4(Gn),
      pr =
        typeof ((hr = B.slotProps) == null ? void 0 : hr.paper) == "function"
          ? B.slotProps.paper(Gn)
          : (Ir = B.slotProps) == null
            ? void 0
            : Ir.paper,
      Fi = rn(pr == null ? void 0 : pr.ref, be),
      xa =
        typeof ((mr = B.slotProps) == null ? void 0 : mr.list) == "function"
          ? B.slotProps.list(Gn)
          : (bt = B.slotProps) == null
            ? void 0
            : bt.list,
      Wa = Ai(),
      Pr = Ai();
    return q.jsxs(b.Fragment, {
      children: [
        q.jsx(l4, {
          as: "div",
          ref: cr,
          tabIndex: Ut,
          role: "combobox",
          "aria-controls": Ue ? Wa : void 0,
          "aria-disabled": v ? "true" : void 0,
          "aria-expanded": Ue ? "true" : "false",
          "aria-haspopup": "listbox",
          "aria-readonly": R ? "true" : void 0,
          "aria-label": s,
          "aria-labelledby": C,
          "aria-describedby": o,
          "aria-required": L ? "true" : void 0,
          "aria-invalid": x ? "true" : void 0,
          onKeyDown: ba,
          onMouseDown: v || R ? null : at,
          onBlur: uc,
          onFocus: I,
          ...z,
          ownerState: Gn,
          className: Te(z.className, to.select, m),
          id: qr,
          children: b3(dr)
            ? wv ||
              (wv = q.jsx("span", {
                className: "notranslate",
                "aria-hidden": !0,
                children: "​",
              }))
            : dr,
        }),
        q.jsx(i4, {
          "aria-invalid": x,
          value: Array.isArray(V) ? V.join(",") : V,
          name: w,
          ref: he,
          "aria-hidden": !0,
          onChange: va,
          tabIndex: -1,
          disabled: v,
          readOnly: R,
          className: to.nativeInput,
          autoFocus: c,
          required: L,
          ...N,
          id: N.id ?? Pr,
          ownerState: Gn,
        }),
        q.jsx(o4, { as: S, className: to.icon, ownerState: Gn }),
        q.jsx(x3, {
          value: ur,
          children: q.jsx(j3, {
            id: `menu-${w || ""}`,
            anchorEl: Nt,
            open: Ue,
            onClose: fr,
            anchorOrigin: { vertical: "bottom", horizontal: "center" },
            transformOrigin: { vertical: "top", horizontal: "center" },
            ...B,
            slotProps: {
              ...B.slotProps,
              list: {
                "aria-labelledby": C,
                role: "listbox",
                "aria-multiselectable": D ? "true" : void 0,
                disableListWrap: !0,
                id: Wa,
                ...xa,
              },
              paper: {
                ...pr,
                ref: Fi,
                style: { minWidth: Bt, ...(pr == null ? void 0 : pr.style) },
              },
            },
            children: Vn,
          }),
        }),
      ],
    });
  }),
  c4 = (t) => {
    const { classes: r } = t,
      o = He({ root: ["root"] }, k1, r);
    return { ...r, ...o };
  },
  th = {
    name: "MuiSelect",
    slot: "Root",
    shouldForwardProp: (t) => Fn(t) && t !== "variant",
  },
  f4 = pe(Jp, th)(""),
  d4 = pe(eh, th)(""),
  p4 = pe(Wp, th)(""),
  L1 = b.forwardRef(function (r, l) {
    const o = Fe({ name: "MuiSelect", props: r }),
      {
        autoWidth: s = !1,
        children: c,
        classes: f = {},
        className: p,
        defaultOpen: m = !1,
        displayEmpty: h = !1,
        IconComponent: g = LM,
        id: v,
        input: A,
        inputProps: x,
        label: S,
        labelId: E,
        MenuProps: C,
        multiple: B = !1,
        native: D = !1,
        onClose: w,
        onOpen: k,
        open: O,
        renderValue: U,
        SelectDisplayProps: I,
        variant: X = "outlined",
        ...le
      } = o,
      ue = D ? P3 : u4,
      [Z] = Wl({ props: o, states: ["variant", "error"] }),
      R = Z.variant || X,
      F = { ...o, variant: R, classes: f },
      L = c4(F),
      { root: z, ...M } = L,
      $ =
        A ||
        {
          standard: q.jsx(f4, { ownerState: F }),
          outlined: q.jsx(d4, { label: S, ownerState: F }),
          filled: q.jsx(p4, { ownerState: F }),
        }[R],
      W = rn(l, $i($));
    return q.jsx(b.Fragment, {
      children: b.cloneElement($, {
        inputComponent: ue,
        inputProps: {
          children: c,
          error: Z.error,
          IconComponent: g,
          variant: R,
          type: void 0,
          multiple: B,
          ...(D
            ? { id: v }
            : {
                autoWidth: s,
                defaultOpen: m,
                displayEmpty: h,
                labelId: E,
                MenuProps: C,
                onClose: w,
                onOpen: k,
                open: O,
                renderValue: U,
                SelectDisplayProps: { id: v, ...I },
              }),
          ...x,
          classes: x ? Kt(M, x.classes) : M,
          ...(A ? A.props.inputProps : {}),
        },
        ...(((B && D) || h) && R === "outlined" ? { notched: !0 } : {}),
        ref: W,
        className: Te($.props.className, p, L.root),
        ...(!A && { variant: R }),
        ...le,
      }),
    });
  });
L1.muiName = "Select";
const h4 = fw({
  createStyledComponent: pe("div", { name: "MuiStack", slot: "Root" }),
  useThemeProps: (t) => Fe({ props: t, name: "MuiStack" }),
});
function m4(t) {
  return $e("MuiToolbar", t);
}
Ke("MuiToolbar", ["root", "gutters", "regular", "dense"]);
const g4 = (t) => {
    const { classes: r, disableGutters: l, variant: o } = t;
    return He({ root: ["root", !l && "gutters", o] }, m4, r);
  },
  y4 = pe("div", {
    name: "MuiToolbar",
    slot: "Root",
    overridesResolver: (t, r) => {
      const { ownerState: l } = t;
      return [r.root, !l.disableGutters && r.gutters, r[l.variant]];
    },
  })(
    ot(({ theme: t }) => ({
      position: "relative",
      display: "flex",
      alignItems: "center",
      variants: [
        {
          props: ({ ownerState: r }) => !r.disableGutters,
          style: {
            paddingLeft: t.spacing(2),
            paddingRight: t.spacing(2),
            [t.breakpoints.up("sm")]: {
              paddingLeft: t.spacing(3),
              paddingRight: t.spacing(3),
            },
          },
        },
        { props: { variant: "dense" }, style: { minHeight: 48 } },
        { props: { variant: "regular" }, style: t.mixins.toolbar },
      ],
    })),
  ),
  v4 = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiToolbar" }),
      {
        className: s,
        component: c = "div",
        disableGutters: f = !1,
        variant: p = "regular",
        ...m
      } = o,
      h = { ...o, component: c, disableGutters: f, variant: p },
      g = g4(h);
    return q.jsx(y4, {
      as: c,
      className: Te(g.root, s),
      ref: l,
      ownerState: h,
      ...m,
    });
  });
function b4(t) {
  return $e("MuiTextField", t);
}
Ke("MuiTextField", ["root"]);
const S4 = { standard: Jp, filled: Wp, outlined: eh },
  x4 = (t) => {
    const { classes: r } = t;
    return He({ root: ["root"] }, b4, r);
  },
  R4 = pe(D5, { name: "MuiTextField", slot: "Root" })({}),
  hi = b.forwardRef(function (r, l) {
    const o = Fe({ props: r, name: "MuiTextField" }),
      {
        autoComplete: s,
        autoFocus: c = !1,
        children: f,
        className: p,
        color: m = "primary",
        defaultValue: h,
        disabled: g = !1,
        error: v = !1,
        fullWidth: A = !1,
        helperText: x,
        id: S,
        inputRef: E,
        label: C,
        maxRows: B,
        minRows: D,
        multiline: w = !1,
        name: k,
        onBlur: O,
        onChange: U,
        onFocus: I,
        placeholder: X,
        required: le = !1,
        rows: ue,
        select: Z = !1,
        slots: R = {},
        slotProps: F = {},
        type: L,
        value: z,
        variant: M = "outlined",
        ...$
      } = o,
      W = {
        ...o,
        autoFocus: c,
        color: m,
        disabled: g,
        error: v,
        fullWidth: A,
        multiline: w,
        required: le,
        select: Z,
        variant: M,
      },
      se = x4(W),
      N = Ai(S),
      V = x && N ? `${N}-helper-text` : void 0,
      ne = C && N ? `${N}-label` : void 0,
      ee = S4[M],
      oe = { slots: R, slotProps: F },
      [he, ce] = yt("select", {
        elementType: L1,
        externalForwardedProps: oe,
        ownerState: W,
      }),
      be = Z && ce.native,
      fe = {},
      Se = oe.slotProps.inputLabel;
    (M === "outlined" &&
      (Se && typeof Se.shrink < "u" && (fe.notched = Se.shrink),
      (fe.label = C)),
      Z && (be || (fe.id = void 0), (fe["aria-describedby"] = void 0)));
    const [Oe, rt] = yt("root", {
        elementType: R4,
        shouldForwardComponentProp: !0,
        externalForwardedProps: { ...oe, ...$ },
        ownerState: W,
        className: Te(se.root, p),
        ref: l,
        additionalProps: {
          disabled: g,
          error: v,
          fullWidth: A,
          required: le,
          color: m,
          variant: M,
        },
      }),
      [Ye, ze] = yt("input", {
        elementType: ee,
        externalForwardedProps: oe,
        additionalProps: fe,
        ownerState: W,
      }),
      [Ee, Et] = yt("inputLabel", {
        elementType: Q5,
        externalForwardedProps: oe,
        ownerState: W,
      }),
      [Mt, ke] = yt("htmlInput", {
        elementType: "input",
        externalForwardedProps: oe,
        ownerState: W,
      }),
      [an, ut] = yt("formHelperText", {
        elementType: U5,
        externalForwardedProps: oe,
        ownerState: W,
      }),
      Ln = q.jsx(Ye, {
        "aria-describedby": V,
        autoComplete: s,
        autoFocus: c,
        defaultValue: h,
        fullWidth: A,
        multiline: w,
        name: k,
        rows: ue,
        maxRows: B,
        minRows: D,
        type: L,
        value: z,
        id: N,
        inputRef: E,
        onBlur: O,
        onChange: U,
        onFocus: I,
        placeholder: X,
        inputProps: ke,
        slots: { input: R.htmlInput ? Mt : void 0 },
        ...ze,
      });
    return q.jsxs(Oe, {
      ...rt,
      children: [
        C != null &&
          C !== "" &&
          q.jsx(Ee, {
            htmlFor: Z && !be ? void 0 : N,
            id: ne,
            ...(Z && !be && { component: "div" }),
            ...Et,
            children: C,
          }),
        Z
          ? q.jsx(he, {
              "aria-describedby": V,
              id: N,
              labelId: ne,
              value: z,
              input: Ln,
              ...ce,
              children: f,
            })
          : Ln,
        x && q.jsx(an, { id: V, ...ut, children: x }),
      ],
    });
  }),
  j1 = ({ notification: t }) =>
    t
      ? q.jsx(AM, {
          style: { marginTop: 10, marginBottom: 10 },
          severity: t.type,
          children: t.text,
        })
      : null,
  E4 = ({
    handleLogin: t,
    username: r,
    setUsername: l,
    password: o,
    setPassword: s,
    notification: c,
  }) =>
    q.jsxs("div", {
      children: [
        q.jsx("h2", { children: "Log in to application" }),
        q.jsxs("form", {
          onSubmit: t,
          children: [
            q.jsx(hi, {
              label: "username",
              value: r,
              onChange: ({ target: f }) => l(f.value),
              variant: "standard",
            }),
            q.jsx("br", {}),
            q.jsx(hi, {
              label: "password",
              type: "password",
              value: o,
              onChange: ({ target: f }) => s(f.value),
              variant: "standard",
              style: { marginTop: 10 },
            }),
            q.jsx("div", {
              children: q.jsx(pa, {
                type: "submit",
                variant: "contained",
                style: { marginTop: 10 },
                children: "login",
              }),
            }),
          ],
        }),
      ],
    }),
  T4 = ({ blog: t, user: r, updateBlog: l, deleteBlog: o }) => {
    PR().id;
    const s = vp(),
      [c, f] = b.useState(!1),
      p = () => {
        l({ ...t, likes: t.likes + 1 });
      },
      m = () => {
        (o(t), s("/"));
      };
    return q.jsx(n5, {
      sx: { mb: 2 },
      children: q.jsxs(o5, {
        children: [
          q.jsx(Fa, { variant: "h5", children: t.title }),
          q.jsxs(Fa, { sx: { mt: 1 }, children: ["by ", t.author] }),
          q.jsx(n3, {
            href: t.url,
            target: "_blank",
            rel: "noopener noreferrer",
            children: q.jsx(Fa, { sx: { mt: 1 }, children: t.url }),
          }),
          q.jsxs(Fa, { sx: { mt: 1 }, children: ["Added by ", t.user.name] }),
          q.jsxs(h4, {
            direction: "row",
            spacing: 1,
            alignItems: "center",
            sx: { mt: 1 },
            children: [
              q.jsxs(Fa, { children: [t.likes, " likes"] }),
              r !== null &&
                q.jsx(pa, {
                  size: "small",
                  variant: "outlined",
                  onClick: p,
                  children: "like",
                }),
              r !== null &&
                r.username === t.user.username &&
                q.jsx(pa, {
                  color: "error",
                  variant: "outlined",
                  size: "small",
                  onClick: m,
                  children: "remove",
                }),
            ],
          }),
        ],
      }),
    });
  },
  C4 = ({ createBlog: t, notification: r }) => {
    const [l, o] = b.useState(""),
      [s, c] = b.useState(""),
      [f, p] = b.useState(""),
      m = (h) => {
        (h.preventDefault(),
          t({ title: l, author: s, url: f }),
          o(""),
          c(""),
          p(""));
      };
    return q.jsxs("div", {
      children: [
        q.jsx("h2", { children: "create new" }),
        q.jsxs("form", {
          onSubmit: m,
          children: [
            q.jsx(hi, {
              label: "title",
              value: l,
              style: { marginTop: 10, width: 300 },
              onChange: (h) => o(h.target.value),
              size: "small",
              fullWidth: "true",
            }),
            q.jsx("br", {}),
            q.jsx(hi, {
              label: "author",
              value: s,
              style: { marginTop: 10, width: 300 },
              size: "small",
              onChange: (h) => c(h.target.value),
            }),
            q.jsx("br", {}),
            q.jsx(hi, {
              label: "url",
              value: f,
              style: { marginTop: 10, width: 300 },
              size: "small",
              onChange: (h) => p(h.target.value),
            }),
            q.jsx("br", {}),
            q.jsx("div", {
              children: q.jsx(pa, {
                type: "submit",
                variant: "contained",
                style: { marginTop: 10 },
                children: "create",
              }),
            }),
          ],
        }),
      ],
    });
  },
  A4 = ({
    blogs: t,
    user: r,
    handleLogout: l,
    notificationMsg: o,
    error: s,
    addBlog: c,
    updateBlog: f,
    deleteBlog: p,
  }) =>
    q.jsxs("div", {
      children: [
        q.jsx("h2", { children: "blogs" }),
        q.jsx(j1, { message: o, error: s }),
        q.jsx("ul", {
          className: "blog-list",
          children: t.map((m) =>
            q.jsx(
              "li",
              {
                children: q.jsx(jl, {
                  to: `/blogs/${m.id}`,
                  children: `${m.title} by ${m.author}`,
                }),
              },
              m.id,
            ),
          ),
        }),
      ],
    }),
  w4 = () => {
    const [t, r] = b.useState([]),
      [l, o] = b.useState(null),
      [s, c] = b.useState(""),
      [f, p] = b.useState(""),
      [m, h] = b.useState(null),
      g = vp();
    (b.useEffect(() => {
      ti.getAll().then((w) => r(w));
    }, []),
      b.useEffect(() => {
        const w = window.localStorage.getItem("loggedBlogListUser");
        if (w) {
          const k = JSON.parse(w);
          h(k);
        }
      }, []));
    const v = async (w) => {
        w.preventDefault();
        try {
          const k = await v2.login({ username: s, password: f });
          (window.localStorage.setItem("loggedBlogListUser", JSON.stringify(k)),
            ti.setToken(k.token),
            h(k),
            c(""),
            p(""),
            g("/"));
        } catch {
          (s.trim() === "" || f.trim() === ""
            ? o({
                text: "username and password must not be empty",
                type: "error",
              })
            : o({ text: "wrong username or password", type: "error" }),
            setTimeout(() => {
              o(null);
            }, 5e3));
        }
      },
      A = (w) => {
        (w.preventDefault(),
          window.localStorage.removeItem("loggedBlogListUser"),
          h(null),
          g("/"));
      },
      x = async (w) => {
        console.log("addBlog data:", w);
        try {
          const k = await ti.create(w);
          (r(t.concat(k)),
            g("/"),
            o({
              text: `a new blog ${w.title} by ${w.author} added!`,
              type: "success",
            }),
            setTimeout(() => {
              o(null);
            }, 5e3));
        } catch {
          (o({ text: "failed to create blog", type: "error" }),
            setTimeout(() => {
              o(null);
            }, 5e3));
        }
      },
      S = async (w) => {
        try {
          const k = await ti.update(w.id, w);
          r((O) => O.map((U) => (U.id === k.id ? k : U)));
        } catch {
          (o({ text: "failed to update blog", type: "error" }),
            setTimeout(() => {
              o(null);
            }, 5e3));
        }
      },
      E = async (w) => {
        if (window.confirm(`Remove blog ${w.title} by ${w.author}`))
          try {
            (await ti.remove(w.id), r((O) => O.filter((U) => U.id !== w.id)));
          } catch (O) {
            let U;
            (O.response.status === 403
              ? (U = "you are not authorized to delete this blog")
              : (U = "failed to delete blog"),
              o({ text: U, type: "error" }),
              setTimeout(() => {
                o(null);
              }, 5e3));
          }
      },
      C = HR("/blogs/:id"),
      B = C ? t.find((w) => w.id === C.params.id) : null,
      D = t.sort((w, k) => k.likes - w.likes);
    return q.jsxs(i5, {
      children: [
        q.jsx(DM, {
          position: "static",
          children: q.jsxs(v4, {
            children: [
              q.jsx(Fa, {
                variant: "h6",
                component: "div",
                sx: { flexGrow: 1 },
                children: "Blog App",
              }),
              q.jsx(pa, {
                color: "inherit",
                component: jl,
                to: "/",
                children: "blogs",
              }),
              q.jsx(pa, {
                color: "inherit",
                component: jl,
                to: "/create",
                children: "new blog",
              }),
              m
                ? q.jsx(pa, {
                    color: "inherit",
                    onClick: A,
                    children: "logout",
                  })
                : q.jsx(pa, {
                    color: "inherit",
                    component: jl,
                    to: "/login",
                    children: "login",
                  }),
            ],
          }),
        }),
        q.jsx(j1, { notification: l }),
        q.jsxs(rE, {
          children: [
            q.jsx(oi, {
              path: "/blogs/:id",
              element: q.jsx(T4, {
                blog: B,
                user: m,
                updateBlog: S,
                deleteBlog: E,
              }),
            }),
            q.jsx(oi, {
              path: "/",
              element: q.jsx(A4, {
                blogs: D,
                user: m,
                handleLogout: A,
                addBlog: x,
                updateBlog: S,
                deleteBlog: E,
              }),
            }),
            q.jsx(oi, {
              path: "/create",
              element: q.jsx(C4, { createBlog: x, notification: l }),
            }),
            !m &&
              q.jsx(oi, {
                path: "/login",
                element: q.jsx(E4, {
                  handleLogin: v,
                  username: s,
                  setUsername: c,
                  password: f,
                  setPassword: p,
                  notification: l,
                }),
              }),
          ],
        }),
      ],
    });
  };
rR.createRoot(document.getElementById("root")).render(
  q.jsx(wE, { children: q.jsx(w4, {}) }),
);
