var t = {
    d: (e, r) => {
      for (var o in r)
        t.o(r, o) &&
          !t.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: r[o] });
    },
    o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
  },
  e = {};
t.d(e, {
  x$: () => X,
  nd: () => Y,
  yF: () => tt,
  fi: () => z,
  Be: () => Z,
  ih: () => K,
  KJ: () => rt,
  Q4: () => et,
  WP: () => nt,
  w0: () => ot,
});
const r = [],
  o = [],
  n = [];
function a(t) {
  var e;
  (null === (e = t.options) || void 0 === e ? void 0 : e.newQueue) ||
  0 === n.length
    ? 1 === n.push([t]) && (s(!0), i())
    : n[0].push(t);
}
function i() {
  if (0 === n.length) return void s(!1);
  if (0 === n[0].length) return n.shift(), void i();
  const { requestType: t, body: e, options: o } = n[0][0];
  !(function (t, e, o, n) {
    const a = b(t);
    let i;
    "get" !== t && (i = e || {});
    const s = "get" === t ? "GET" : "POST",
      d = o.info || {},
      l = "firstComplete" in o ? [o.firstComplete] : [],
      f = { requestType: t, endpoint: a, requestBody: i, info: d },
      p = [];
    if (
      (r.forEach((e) => {
        try {
          e({ requestType: t, endpoint: a, info: d, requestBody: i }, (t) => {
            l.push(t);
          });
        } catch (t) {
          console.error(
            "Liquid Ajax Cart: Error during Ajax request subscriber callback in ajax-api"
          ),
            console.error(t);
        }
      }),
      "lastComplete" in o && l.push(o.lastComplete),
      d.cancel)
    )
      return void c(l, n, f);
    if (void 0 !== i) {
      let t;
      if (
        (i instanceof FormData || i instanceof URLSearchParams
          ? i.has("sections") && (t = i.get("sections").toString())
          : (t = i.sections),
        "string" == typeof t || t instanceof String || Array.isArray(t))
      ) {
        const e = [];
        if (
          (Array.isArray(t) ? e.push(...t) : e.push(...t.split(",")),
          e.length > 5)
        ) {
          p.push(...e.slice(5));
          const t = e.slice(0, 5).join(",");
          i instanceof FormData || i instanceof URLSearchParams
            ? i.set("sections", t)
            : (i.sections = t);
        }
      } else
        null != t &&
          console.error(
            `Liquid Ajax Cart: "sections" parameter in a Cart Ajax API request must be a string or an array. Now it is ${t}`
          );
    }
    const m = { method: s };
    "get" !== t &&
      (i instanceof FormData || i instanceof URLSearchParams
        ? ((m.body = i), (m.headers = { "x-requested-with": "XMLHttpRequest" }))
        : ((m.body = JSON.stringify(i)),
          (m.headers = { "Content-Type": "application/json" }))),
      fetch(a, m)
        .then((t) =>
          t.json().then((e) => ({ ok: t.ok, status: t.status, body: e }))
        )
        .then(
          (e) => (
            (f.responseData = e),
            ("add" !== t && 0 === p.length) || !f.responseData.ok
              ? f
              : u(p).then((t) => ((f.extraResponseData = t), f))
          )
        )
        .catch((t) => {
          console.error(
            "Liquid Ajax Cart: Error while performing cart Ajax request"
          ),
            console.error(t),
            (f.fetchError = t);
        })
        .finally(() => {
          c(l, n, f);
        });
  })(t, e, o, () => {
    n[0].shift(), i();
  });
}
function s(t) {
  o.forEach((e) => {
    try {
      e(t);
    } catch (t) {
      console.error(
        "Liquid Ajax Cart: Error during queues subscriber callback in ajax-api"
      ),
        console.error(t);
    }
  });
}
function c(t, e, r) {
  if (
    (t.forEach((t) => {
      try {
        t(r);
      } catch (t) {
        console.error(
          "Liquid Ajax Cart: Error during Ajax request result callback in ajax-api"
        ),
          console.error(t);
      }
    }),
    e)
  )
    try {
      e();
    } catch (t) {
      console.error(
        "Liquid Ajax Cart: Error during Ajax request final internal callback in ajax-api"
      ),
        console.error(t);
    }
}
function u(t = []) {
  const e = {};
  return (
    t.length > 0 && (e.sections = t.slice(0, 5).join(",")),
    fetch(b("update"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    }).then((e) =>
      e.json().then((r) => {
        const o = { ok: e.ok, status: e.status, body: r };
        return t.length < 6
          ? o
          : u(t.slice(5)).then((t) => {
              var e;
              return (
                t.ok &&
                  (null === (e = t.body) || void 0 === e
                    ? void 0
                    : e.sections) &&
                  "object" == typeof t.body.sections &&
                  ("sections" in o.body || (o.body.sections = {}),
                  (o.body.sections = Object.assign(
                    Object.assign({}, o.body.sections),
                    t.body.sections
                  ))),
                o
              );
            });
      })
    )
  );
}
function d(t = {}) {
  a({ requestType: "get", body: void 0, options: t });
}
function l(t = {}, e = {}) {
  a({ requestType: "add", body: t, options: e });
}
function f(t = {}, e = {}) {
  a({ requestType: "change", body: t, options: e });
}
function p(t = {}, e = {}) {
  a({ requestType: "update", body: t, options: e });
}
function m(t = {}, e = {}) {
  a({ requestType: "clear", body: t, options: e });
}
function y(t) {
  r.push(t);
}
function b(t) {
  switch (t) {
    case "add":
      return "/cart/add.js";
    case "change":
      return "/cart/change.js";
    case "get":
      return "/cart.js";
    case "clear":
      return "/cart/clear.js";
    case "update":
      return "/cart/update.js";
    default:
      return;
  }
}
const h = [];
let g,
  q = null,
  A = { requestInProgress: !1, cartStateSet: !1 };
function C(t) {
  const { attributes: e, items: r, item_count: o } = t;
  if (null == e || "object" != typeof e) return null;
  if ("number" != typeof o && !(o instanceof Number)) return null;
  if (!Array.isArray(r)) return null;
  const n = [];
  for (let t = 0; t < r.length; t++) {
    const e = r[t];
    if ("number" != typeof e.id && !(e.id instanceof Number)) return null;
    if ("string" != typeof e.key && !(e.key instanceof String)) return null;
    if ("number" != typeof e.quantity && !(e.quantity instanceof Number))
      return null;
    if (!("properties" in e)) return null;
    n.push(
      Object.assign(Object.assign({}, e), {
        id: e.id,
        key: e.key,
        quantity: e.quantity,
        properties: e.properties,
      })
    );
  }
  return Object.assign(Object.assign({}, t), {
    attributes: e,
    items: n,
    item_count: o,
  });
}
function j(t) {
  h.push(t);
}
function S() {
  return { cart: q, status: A, previousCart: g };
}
const x = (t) => {
  h.forEach((e) => {
    try {
      e(S(), t);
    } catch (t) {
      console.error(
        "Liquid Ajax Cart: Error during a call of a cart state update subscriber"
      ),
        console.error(t);
    }
  });
};
function w(t) {
  const { binderAttribute: e } = $.computed;
  t.status.cartStateSet &&
    document.querySelectorAll(`[${e}]`).forEach((t) => {
      const r = t.getAttribute(e);
      t.textContent = (function (t) {
        const { stateBinderFormatters: e } = $,
          { binderAttribute: r } = $.computed,
          [o, ...n] = t.split("|");
        let a = v(o, S());
        return (
          n.forEach((t) => {
            const r = t.trim();
            "" !== r &&
              ("object" == typeof e && r in e
                ? (a = e[r](a))
                : r in L
                ? (a = L[r](a))
                : console.warn(
                    `Liquid Ajax Cart: the "${r}" formatter is not found`
                  ));
          }),
          "string" == typeof a ||
          a instanceof String ||
          "number" == typeof a ||
          a instanceof Number
            ? a.toString()
            : (console.error(
                `Liquid Ajax Cart: the calculated value for the ${r}="${t}" element must be string or number. But the value is`,
                a
              ),
              "")
        );
      })(r);
    });
}
function v(t, e) {
  const r = t.split("."),
    o = r.shift().trim();
  return "" !== o && o in e && r.length > 0 ? v(r.join("."), e[o]) : e[o];
}
const L = {
    money_with_currency: (t) => {
      var e;
      const r = S();
      if ("number" != typeof t && !(t instanceof Number))
        return (
          console.error(
            "Liquid Ajax Cart: the 'money_with_currency' formatter is not applied because the value is not a number. The value is ",
            t
          ),
          t
        );
      const o = t / 100;
      return "Intl" in window &&
        (null === (e = window.Shopify) || void 0 === e ? void 0 : e.locale)
        ? Intl.NumberFormat(window.Shopify.locale, {
            style: "currency",
            currency: r.cart.currency,
          }).format(o)
        : `${o.toFixed(2)} ${r.cart.currency}`;
    },
  },
  $ = {
    productFormsFilter: (t) => !0,
    messageBuilder: (t) => {
      let e = "";
      return (
        t.forEach((t) => {
          e += `<div class="js-ajax-cart-message js-ajax-cart-message--${t.type}">${t.text}</div>`;
        }),
        e
      );
    },
    stateBinderFormatters: {},
    addToCartCssClass: "",
    lineItemQuantityErrorText: "You can't add more of this item to your cart",
    requestErrorText:
      "There was an error while updating your cart. Please try again.",
    updateOnWindowFocus: !0,
    computed: {
      productFormsErrorsAttribute: "data-ajax-cart-form-error",
      sectionsAttribute: "data-ajax-cart-section",
      staticElementAttribute: "data-ajax-cart-static-element",
      binderAttribute: "data-ajax-cart-bind-state",
      requestButtonAttribute: "data-ajax-cart-request-button",
      toggleClassButtonAttribute: "data-ajax-cart-toggle-class-button",
      initialStateAttribute: "data-ajax-cart-initial-state",
      sectionScrollAreaAttribute: "data-ajax-cart-section-scroll",
      quantityInputAttribute: "data-ajax-cart-quantity-input",
      propertyInputAttribute: "data-ajax-cart-property-input",
      messagesAttribute: "data-ajax-cart-messages",
      configurationAttribute: "data-ajax-cart-configuration",
      cartStateSetBodyClass: "js-ajax-cart-set",
      requestInProgressBodyClass: "js-ajax-cart-request-in-progress",
      emptyCartBodyClass: "js-ajax-cart-empty",
      notEmptyCartBodyClass: "js-ajax-cart-not-empty",
      productFormsProcessingClass: "js-ajax-cart-form-in-progress",
    },
  };
function E(t, e) {
  t in $ && "computed" !== t
    ? (($[t] = e), "stateBinderFormatters" === t && w(S()))
    : console.error(`Liquid Ajax Cart: unknown configuration parameter "${t}"`);
}
const T = [];
function k(t, e) {
  const { requestButtonAttribute: r } = $.computed;
  let o;
  const n = ["/cart/change", "/cart/add", "/cart/clear", "/cart/update"];
  if (!t.hasAttribute(r)) return;
  const a = t.getAttribute(r);
  if (a) {
    let t;
    try {
      if (((t = new URL(a, window.location.origin)), !n.includes(t.pathname)))
        throw "URL should be one of the following: /cart/change, /cart/add, /cart/update, /cart/clear";
      o = t;
    } catch (t) {
      console.error(
        `Liquid Ajax Cart: ${r} contains an invalid URL as a parameter.`,
        t
      );
    }
  } else if (t instanceof HTMLAnchorElement && t.hasAttribute("href")) {
    const e = new URL(t.href);
    n.includes(e.pathname)
      ? (o = e)
      : t.hasAttribute(r) &&
        console.error(
          `Liquid Ajax Cart: a link with the ${r} contains an invalid href URL.`,
          "URL should be one of the following: /cart/change, /cart/add, /cart/update, /cart/clear"
        );
  }
  if (void 0 === o)
    return void console.error(
      `Liquid Ajax Cart: a ${r} element doesn't have a valid URL`
    );
  if ((e && e.preventDefault(), S().status.requestInProgress)) return;
  const i = new FormData();
  switch (
    (o.searchParams.forEach((t, e) => {
      i.append(e, t);
    }),
    o.pathname)
  ) {
    case "/cart/add":
      l(i, { newQueue: !0, info: { initiator: t } });
      break;
    case "/cart/change":
      f(i, { newQueue: !0, info: { initiator: t } });
      break;
    case "/cart/update":
      p(i, { newQueue: !0, info: { initiator: t } });
      break;
    case "/cart/clear":
      m({}, { newQueue: !0, info: { initiator: t } });
  }
}
function B(t, e) {
  let r, o;
  return (
    e.status.cartStateSet &&
      (t.length > 3
        ? ((r = e.cart.items.find((e) => e.key === t)), (o = "id"))
        : ((r = e.cart.items[Number(t) - 1]), (o = "line")),
      void 0 === r &&
        ((r = null),
        console.error(
          `Liquid Ajax Cart: line item with ${o}="${t}" not found`
        ))),
    [r, o]
  );
}
function R(t) {
  const { quantityInputAttribute: e } = $.computed;
  return (
    !!t.hasAttribute(e) &&
    ((t instanceof HTMLInputElement &&
      ("text" === t.type || "number" === t.type)) ||
      (console.error(
        `Liquid Ajax Cart: the ${e} attribute supports "input" elements only with the "text" and the "number" types`
      ),
      !1))
  );
}
function D(t) {
  const { quantityInputAttribute: e } = $.computed;
  t.status.requestInProgress
    ? document.querySelectorAll(`input[${e}]`).forEach((t) => {
        R(t) && (t.disabled = !0);
      })
    : document.querySelectorAll(`input[${e}]`).forEach((r) => {
        if (!R(r)) return;
        const o = r.getAttribute(e).trim(),
          [n] = B(o, t);
        n ? (r.value = n.quantity.toString()) : null === n && (r.value = "0"),
          (r.disabled = !1);
      });
}
function F(t, e) {
  const { quantityInputAttribute: r } = $.computed;
  if (!R(t)) return;
  if ((e && e.preventDefault(), S().status.requestInProgress)) return;
  let o = Number(t.value.trim());
  const n = t.getAttribute(r).trim();
  if (isNaN(o))
    return void console.error(
      "Liquid Ajax Cart: input value of a data-ajax-cart-quantity-input must be an Integer number"
    );
  if ((o < 1 && (o = 0), !n))
    return void console.error(
      "Liquid Ajax Cart: attribute value of a data-ajax-cart-quantity-input must be an item key or an item index"
    );
  const a = n.length > 3 ? "id" : "line",
    i = new FormData();
  i.set(a, n),
    i.set("quantity", o.toString()),
    f(i, { newQueue: !0, info: { initiator: t } }),
    t.blur();
}
function N(t) {
  const { propertyInputAttribute: e } = $.computed,
    r = t.getAttribute(e),
    o = t.getAttribute("name");
  console.error(
    `Liquid Ajax Cart: the element [${e}="${r}"]${
      o ? `[name="${o}"]` : ""
    } has wrong attributes.`
  );
}
function I(t) {
  const { propertyInputAttribute: e } = $.computed;
  return (
    !!t.hasAttribute(e) &&
    ((t instanceof HTMLInputElement && "hidden" !== t.type) ||
      t instanceof HTMLTextAreaElement ||
      t instanceof HTMLSelectElement)
  );
}
function P(t) {
  const { propertyInputAttribute: e } = $.computed,
    r = { objectCode: void 0, propertyName: void 0, attributeValue: void 0 };
  if (!t.hasAttribute(e)) return r;
  let o = t.getAttribute(e).trim();
  if (!o) {
    const e = t.getAttribute("name").trim();
    e && (o = e);
  }
  if (!o) return N(t), r;
  if (((r.attributeValue = o), "note" === o)) return (r.objectCode = "note"), r;
  let [n, ...a] = o.trim().split("[");
  return !a ||
    1 !== a.length ||
    a[0].length < 2 ||
    a[0].indexOf("]") !== a[0].length - 1
    ? (N(t), r)
    : ((r.objectCode = n), (r.propertyName = a[0].replace("]", "")), r);
}
function O(t) {
  const { propertyInputAttribute: e } = $.computed;
  t.status.requestInProgress
    ? document.querySelectorAll(`[${e}]`).forEach((t) => {
        I(t) && (t.disabled = !0);
      })
    : document.querySelectorAll(`[${e}]`).forEach((r) => {
        if (!I(r)) return;
        const { objectCode: o, propertyName: n, attributeValue: a } = P(r);
        if (!o) return;
        if (!t.status.cartStateSet) return;
        let i,
          s = !1;
        if ("note" === o) i = t.cart.note;
        else if ("attributes" === o) i = t.cart.attributes[n];
        else {
          const [r, c] = B(o, t);
          r && (i = r.properties[n]),
            null === r &&
              (console.error(
                `Liquid Ajax Cart: line item with ${c}="${o}" was not found when the [${e}] element with "${a}" value tried to get updated from the State`
              ),
              (s = !0));
        }
        r instanceof HTMLInputElement &&
        ("checkbox" === r.type || "radio" === r.type)
          ? r.value === i
            ? (r.checked = !0)
            : (r.checked = !1)
          : ("string" == typeof i ||
              i instanceof String ||
              "number" == typeof i ||
              i instanceof Number ||
              (Array.isArray(i) || i instanceof Object
                ? ((i = JSON.stringify(i)),
                  console.warn(
                    `Liquid Ajax Cart: the ${e} with the "${a}" value is bound to the ${n} ${
                      "attributes" === o ? "attribute" : "property"
                    } that is not string or number: ${i}`
                  ))
                : (i = "")),
            (r.value = i)),
          s || (r.disabled = !1);
      });
}
function U(t, e) {
  const { propertyInputAttribute: r } = $.computed;
  if (!I(t)) return;
  e && e.preventDefault(), t.blur();
  const o = S();
  if (!o.status.cartStateSet) return;
  if (o.status.requestInProgress) return;
  const { objectCode: n, propertyName: a, attributeValue: i } = P(t);
  if (!n) return;
  let s = t.value;
  if (t instanceof HTMLInputElement && "checkbox" === t.type && !t.checked) {
    let t = document.querySelector(`input[type="hidden"][${r}="${i}"]`);
    t ||
      ("note" !== n && "attributes" !== n) ||
      (t = document.querySelector(`input[type="hidden"][${r}][name="${i}"]`)),
      (s = t ? t.value : "");
  }
  if ("note" === n) {
    const e = new FormData();
    e.set("note", s), p(e, { newQueue: !0, info: { initiator: t } });
  } else if ("attributes" === n) {
    const e = new FormData();
    e.set(`attributes[${a}]`, s),
      p(e, { newQueue: !0, info: { initiator: t } });
  } else {
    const [e, c] = B(n, o);
    if (
      (null === e &&
        console.error(
          `Liquid Ajax Cart: line item with ${c}="${n}" was not found when the [${r}] element with "${i}" value tried to update the cart`
        ),
      !e)
    )
      return;
    const u = Object.assign({}, e.properties);
    u[a] = s;
    const d = new FormData();
    let l = d;
    d.set(c, n), d.set("quantity", e.quantity.toString());
    for (let t in u) {
      const r = u[t];
      "string" == typeof r || r instanceof String
        ? d.set(`properties[${t}]`, u[t])
        : (l = { [c]: n, quantity: e.quantity, properties: u });
    }
    f(l, { newQueue: !0, info: { initiator: t } });
  }
}
function M(t, e) {
  const { toggleClassButtonAttribute: r } = $.computed;
  if (!t.hasAttribute(r)) return;
  e && e.preventDefault();
  const o = t.getAttribute(r).split("|");
  if (!o)
    return void console.error(
      "Liquid Ajax Cart: Error while toggling body class"
    );
  const n = o[0].trim();
  let a = o[1] ? o[1].trim() : "toggle";
  if (("add" !== a && "remove" !== a && (a = "toggle"), n))
    try {
      "add" === a
        ? document.body.classList.add(n)
        : "remove" === a
        ? document.body.classList.remove(n)
        : document.body.classList.toggle(n);
    } catch (e) {
      console.error("Liquid Ajax Cart: Error while toggling body class:", n),
        console.error(e);
    }
}
const H = new WeakMap();
function _(t) {
  const e = H.get(t);
  $.computed.productFormsProcessingClass &&
    (e > 0
      ? t.classList.add($.computed.productFormsProcessingClass)
      : t.classList.remove($.computed.productFormsProcessingClass));
}
const Q = (t, e) => {
    e((t) => {
      var e, r;
      const { messagesAttribute: o } = $.computed,
        { lineItemQuantityErrorText: n, messageBuilder: a } = $;
      if (t.info.cancel) return;
      const i = S();
      let s,
        c,
        u,
        d,
        l = 1,
        f = [];
      if (
        (t.requestBody instanceof FormData ||
        t.requestBody instanceof URLSearchParams
          ? (t.requestBody.has("line") &&
              (c = t.requestBody.get("line").toString()),
            t.requestBody.has("id") && (s = t.requestBody.get("id").toString()))
          : ("line" in t.requestBody && (c = String(t.requestBody.line)),
            "id" in t.requestBody && (s = String(t.requestBody.id))),
        c)
      ) {
        const t = Number(c);
        t > 0 &&
          i.status.cartStateSet &&
          ((u = t - 1),
          (s =
            null === (e = i.cart.items[u]) || void 0 === e ? void 0 : e.key));
      }
      if (
        (s &&
          (s.indexOf(":") > -1
            ? (d = document.querySelectorAll(`[${o}="${s}"]`))
            : i.status.cartStateSet &&
              (d = document.querySelectorAll(
                i.cart.items
                  .reduce(
                    (t, e) => (
                      (e.key !== s && e.id !== Number(s)) ||
                        t.push(`[${o}="${e.key}"]`),
                      t
                    ),
                    []
                  )
                  .join(",")
              )),
          d.length > 0 &&
            d.forEach((t) => {
              t.innerHTML = "";
            })),
        null === (r = t.responseData) || void 0 === r ? void 0 : r.ok)
      ) {
        if (!i.previousCart) return;
        (t.requestBody instanceof FormData ||
          t.requestBody instanceof URLSearchParams) &&
        t.requestBody.has("quantity")
          ? (l = Number(t.requestBody.get("quantity").toString()))
          : "quantity" in t.requestBody && (l = Number(t.requestBody.quantity)),
          s &&
            (f = t.responseData.body.items.reduce(
              (t, e) => ((e.key !== s && e.id != Number(s)) || t.push(e), t),
              []
            )),
          f.forEach((e) => {
            !isNaN(l) &&
              e.quantity < l &&
              i.previousCart.item_count === t.responseData.body.item_count &&
              d.forEach((r) => {
                r.getAttribute(o) === e.key &&
                  (r.innerHTML = a([
                    {
                      type: "error",
                      text: n,
                      code: "line_item_quantity_error",
                      requestState: t,
                    },
                  ]));
              });
          });
      } else {
        const e = W(t);
        d &&
          d.length > 0 &&
          d.forEach((t) => {
            t.innerHTML = a([e]);
          });
      }
    });
  },
  J = (t, e) => {
    var r;
    const o = null === (r = t.info) || void 0 === r ? void 0 : r.initiator;
    let n;
    o instanceof HTMLFormElement &&
      ((n = o.querySelectorAll(`[${$.computed.messagesAttribute}="form"]`)),
      n.length > 0 &&
        n.forEach((t) => {
          t.innerHTML = "";
        })),
      e((t) => {
        if (t.info.cancel) return;
        const { messageBuilder: e } = $,
          r = W(t);
        r &&
          n &&
          n.forEach((t) => {
            t.innerHTML = e([r]);
          });
      });
  };
function W(t) {
  var e;
  const { requestErrorText: r } = $;
  if (!(null === (e = t.responseData) || void 0 === e ? void 0 : e.ok)) {
    if ("responseData" in t) {
      if ("description" in t.responseData.body)
        return {
          type: "error",
          text: t.responseData.body.description,
          code: "shopify_error",
          requestState: t,
        };
      if ("message" in t.responseData.body)
        return {
          type: "error",
          text: t.responseData.body.message,
          code: "shopify_error",
          requestState: t,
        };
    }
    return { type: "error", text: r, code: "request_error", requestState: t };
  }
}
function G(t) {
  const {
    cartStateSetBodyClass: e,
    requestInProgressBodyClass: r,
    emptyCartBodyClass: o,
    notEmptyCartBodyClass: n,
  } = $.computed;
  e &&
    (t.status.cartStateSet
      ? document.body.classList.add(e)
      : document.body.classList.remove(e)),
    r &&
      (t.status.requestInProgress
        ? document.body.classList.add(r)
        : document.body.classList.remove(r)),
    o &&
      (t.status.cartStateSet && 0 === t.cart.item_count
        ? document.body.classList.add(o)
        : document.body.classList.remove(o)),
    n &&
      (t.status.cartStateSet && 0 === t.cart.item_count
        ? document.body.classList.remove(n)
        : document.body.classList.add(n));
}
let V;
"liquidAjaxCart" in window ||
  ((function () {
    try {
      if (!("fetch" in window)) return !1;
      if (!("Promise" in window)) return !1;
      if (!("FormData" in window)) return !1;
      if (!("WeakMap" in window)) return !1;
      if (!("DOMParser" in window)) return !1;
      const t = { foo: "barbar" };
      let { foo: e } = t;
      if ("barbar" !== e) return !1;
      const r = new WeakMap();
      if ((r.set(t, "foo"), (e = r.get(t)), !e)) return !1;
      const o = new FormData();
      return o.set("foo", "bar"), (e = o.get("foo").toString()), !!e;
    } catch (t) {
      return console.error(t), !1;
    }
  })()
    ? ((function () {
        const t = document.querySelector(
          `[${$.computed.configurationAttribute}]`
        );
        if (t)
          try {
            const e = JSON.parse(t.textContent),
              r = ["productFormsFilter", "messageBuilder"];
            for (let t in e)
              r.includes(t)
                ? console.error(
                    `Liquid Ajax Cart: the "${t}" parameter is not supported inside the "${$.computed.configurationAttribute}" script — use the "configureCart" function for it`
                  )
                : E(t, e[t]);
          } catch (t) {
            console.error(
              `Liquid Ajax Cart: can't parse configuration JSON from the "${$.computed.configurationAttribute}" script`
            ),
              console.error(t);
          }
      })(),
      document.addEventListener("submit", (t) => {
        const e = t.target;
        let r;
        if ("/cart/add" !== new URL(e.action).pathname) return;
        if ("productFormsFilter" in $ && !$.productFormsFilter(e)) return;
        if ((t.preventDefault(), (r = H.get(e)), r > 0 || (r = 0), r > 0))
          return;
        const o = new FormData(e);
        H.set(e, r + 1),
          _(e),
          l(o, {
            lastComplete: (t) => {
              const r = H.get(e);
              r > 0 && H.set(e, r - 1), _(e);
            },
            newQueue: !0,
            info: { initiator: e },
          });
      }),
      y((t, e) => {
        const {
          sectionsAttribute: r,
          staticElementAttribute: o,
          sectionScrollAreaAttribute: n,
        } = $.computed;
        if (void 0 !== t.requestBody) {
          const e = [];
          if (
            (document.querySelectorAll(`[${r}]`).forEach((t) => {
              const o = t.closest('[id^="shopify-section-"]');
              if (o) {
                const t = o.id.replace("shopify-section-", "");
                -1 === e.indexOf(t) && e.push(t);
              } else
                console.error(
                  `Liquid Ajax Cart: there is a ${r} element that is not inside a Shopify section. All the ${r} elements must be inside Shopify sections.`
                );
            }),
            e.length)
          ) {
            let r,
              o = e.join(",");
            t.requestBody instanceof FormData ||
            t.requestBody instanceof URLSearchParams
              ? t.requestBody.has("sections") &&
                (r = t.requestBody.get("sections").toString())
              : (r = t.requestBody.sections),
              ((("string" == typeof r || r instanceof String) && "" !== r) ||
                (Array.isArray(r) && r.length > 0)) &&
                (o = `${r.toString()},${o}`),
              t.requestBody instanceof FormData ||
              t.requestBody instanceof URLSearchParams
                ? t.requestBody.set("sections", o)
                : (t.requestBody.sections = o);
          }
        }
        e((t) => {
          var e, r, n;
          const { sectionsAttribute: a, sectionScrollAreaAttribute: i } =
              $.computed,
            s = new DOMParser(),
            c = [];
          if (
            (null === (e = t.responseData) || void 0 === e ? void 0 : e.ok) &&
            "sections" in t.responseData.body
          ) {
            let e = t.responseData.body.sections;
            (null ===
              (n =
                null === (r = t.extraResponseData) || void 0 === r
                  ? void 0
                  : r.body) || void 0 === n
              ? void 0
              : n.sections) &&
              (e = Object.assign(
                Object.assign({}, e),
                t.extraResponseData.body.sections
              ));
            for (let r in e)
              e[r]
                ? document
                    .querySelectorAll(`#shopify-section-${r}`)
                    .forEach((n) => {
                      let u = [];
                      const d = "__noId__",
                        l = {};
                      n.querySelectorAll(` [${i}] `).forEach((t) => {
                        let e = t.getAttribute(i).toString().trim();
                        "" === e && (e = d),
                          e in l || (l[e] = []),
                          l[e].push({
                            scroll: t.scrollTop,
                            height: t.scrollHeight,
                          });
                      });
                      const f = {},
                        p = n.querySelectorAll(`[${o}]`);
                      p &&
                        p.forEach((t) => {
                          let e = t.getAttribute(o).toString().trim();
                          "" === e && (e = d),
                            e in f || (f[e] = []),
                            f[e].push(t);
                        });
                      const m = n.querySelectorAll(`[${a}]`);
                      if (m) {
                        const t = s.parseFromString(e[r], "text/html");
                        for (let e in f)
                          t.querySelectorAll(
                            ` [${o}="${e.replace(d, "")}"] `
                          ).forEach((t, r) => {
                            r + 1 <= f[e].length &&
                              (t.before(f[e][r]),
                              t.parentElement.removeChild(t));
                          });
                        const i = t.querySelectorAll(`[${a}]`);
                        if (m.length !== i.length) {
                          console.error(
                            `Liquid Ajax Cart: the received HTML for the "${r}" section has a different quantity of the "${a}" containers. The section will be updated completely.`
                          );
                          const e = t.querySelector(`#shopify-section-${r}`);
                          if (e) {
                            for (n.innerHTML = ""; e.childNodes.length; )
                              n.appendChild(e.firstChild);
                            u.push(n);
                          }
                        } else
                          m.forEach((t, e) => {
                            t.before(i[e]),
                              t.parentElement.removeChild(t),
                              u.push(i[e]);
                          });
                      }
                      for (let e in l)
                        n.querySelectorAll(
                          ` [${i}="${e.replace(d, "")}"] `
                        ).forEach((r, o) => {
                          o + 1 <= l[e].length &&
                            ("add" !== t.requestType ||
                              l[e][o].height >= r.scrollHeight) &&
                            (r.scrollTop = l[e][o].scroll);
                        });
                      u.length > 0 && c.push({ id: r, elements: u });
                    })
                : console.error(
                    `Liquid Ajax Cart: the HTML for the "${r}" section was requested but the response is ${e[r]}`
                  );
          }
          c.length > 0 &&
            T.length > 0 &&
            T.forEach((t) => {
              try {
                t(c);
              } catch (t) {
                console.error(
                  "Liquid Ajax Cart: Error during a call of a sections update subscriber"
                ),
                  console.error(t);
              }
            });
        });
      }),
      (function () {
        var t;
        (t = (t) => {
          (A.requestInProgress = t), x(!1);
        }),
          o.push(t),
          y((t, e) => {
            e((t) => {
              var e, r;
              let o;
              (null === (e = t.extraResponseData) || void 0 === e
                ? void 0
                : e.ok) && (o = C(t.extraResponseData.body)),
                !o &&
                  (null === (r = t.responseData) || void 0 === r
                    ? void 0
                    : r.ok) &&
                  ("add" === t.requestType
                    ? p()
                    : (o = C(t.responseData.body))),
                o
                  ? ((g = q), (q = o), (A.cartStateSet = !0), x(!0))
                  : null === o &&
                    console.error(
                      "Liquid Ajax Cart: expected to receive the updated cart state but the object is not recognized. The request state:",
                      t
                    );
            });
          });
        const e = document.querySelector(
          `[${$.computed.initialStateAttribute}]`
        );
        if (e)
          try {
            const t = JSON.parse(e.textContent);
            if (((q = C(t)), null === q))
              throw `JSON from ${$.computed.initialStateAttribute} script is not correct cart object`;
            (A.cartStateSet = !0), x(!0);
          } catch (t) {
            console.error(
              `Liquid Ajax Cart: can't parse cart JSON from the "${$.computed.initialStateAttribute}" script. A /cart.js request will be performed to receive the cart state`
            ),
              console.error(t),
              d();
          }
        else d();
      })(),
      j(w),
      w(S()),
      document.addEventListener(
        "click",
        function (t) {
          for (
            let e = t.target;
            e && e != document.documentElement;
            e = e.parentElement
          )
            k(e, t);
        },
        !1
      ),
      document.addEventListener(
        "change",
        function (t) {
          U(t.target, t);
        },
        !1
      ),
      document.addEventListener(
        "keydown",
        function (t) {
          const e = t.target;
          "Enter" === t.key &&
            ((e instanceof HTMLTextAreaElement && !t.ctrlKey) || U(e, t)),
            "Escape" === t.key &&
              (function (t) {
                if (!I(t)) return;
                if (
                  !(
                    t instanceof HTMLInputElement ||
                    t instanceof HTMLTextAreaElement
                  )
                )
                  return;
                if (
                  t instanceof HTMLInputElement &&
                  ("checkbox" === t.type || "radio" === t.type)
                )
                  return;
                const e = S();
                if (!e.status.cartStateSet) return void t.blur();
                const { objectCode: r, propertyName: o } = P(t);
                if (!r) return;
                let n;
                if ("note" === r) n = e.cart.note;
                else if ("attributes" === r) n = e.cart.attributes[o];
                else {
                  const [t] = B(r, e);
                  t && (n = t.properties[o]);
                }
                void 0 !== n &&
                  (n || "string" == typeof n || n instanceof String || (n = ""),
                  (t.value = String(n))),
                  t.blur();
              })(e);
        },
        !1
      ),
      j(O),
      O(S()),
      document.addEventListener(
        "change",
        function (t) {
          F(t.target, t);
        },
        !1
      ),
      document.addEventListener(
        "keydown",
        function (t) {
          "Enter" === t.key && F(t.target, t),
            "Escape" === t.key &&
              (function (t) {
                const { quantityInputAttribute: e } = $.computed;
                if (!R(t)) return;
                const r = t.getAttribute(e).trim();
                let o;
                const n = S();
                if (n.status.cartStateSet) {
                  if (r.length > 3) o = n.cart.items.find((t) => t.key === r);
                  else {
                    const t = Number(r) - 1;
                    o = n.cart.items[t];
                  }
                  o && (t.value = o.quantity.toString());
                }
                t.blur();
              })(t.target);
        },
        !1
      ),
      j(D),
      D(S()),
      document.addEventListener(
        "click",
        function (t) {
          for (
            let e = t.target;
            e && e != document.documentElement;
            e = e.parentElement
          )
            M(e, t);
        },
        !1
      ),
      j(G),
      G(S()),
      y((t, e) => {
        "add" === t.requestType &&
          e((t) => {
            var e;
            if (null === (e = t.responseData) || void 0 === e ? void 0 : e.ok) {
              const { addToCartCssClass: t } = $;
              let e = "",
                r = 0;
              if (
                ("string" == typeof t || t instanceof String
                  ? (e = t)
                  : Array.isArray(t) &&
                    2 === t.length &&
                    ("string" == typeof t[0] || t[0] instanceof String) &&
                    ("number" == typeof t[1] || t[1] instanceof Number)
                  ? ((e = t[0]),
                    t[1] > 0
                      ? (r = t[1])
                      : console.error(
                          `Liquid Ajax Cart: the addToCartCssClass[1] value must be a positive integer. Now it is ${t[1]}`
                        ))
                  : console.error(
                      'Liquid Ajax Cart: the "addToCartCssClass" configuration parameter must be a string or a [string, number] array'
                    ),
                "" !== e)
              ) {
                try {
                  document.body.classList.add(e);
                } catch (t) {
                  console.error(
                    `Liquid Ajax Cart: error while adding the "${e}" CSS class from the addToCartCssClass parameter to the body tag`
                  ),
                    console.error(t);
                }
                r > 0 &&
                  (void 0 !== V && clearTimeout(V),
                  (V = setTimeout(() => {
                    document.body.classList.remove(e);
                  }, r)));
              }
            }
          });
      }),
      y((t, e) => {
        const r = {};
        (r.add = J),
          (r.change = Q),
          t.requestType in r && r[t.requestType](t, e);
      }),
      (window.liquidAjaxCart = {
        configureCart: E,
        cartRequestGet: d,
        cartRequestAdd: l,
        cartRequestChange: f,
        cartRequestUpdate: p,
        cartRequestClear: m,
        subscribeToCartAjaxRequests: y,
        getCartState: S,
        subscribeToCartStateUpdate: j,
        subscribeToCartSectionsUpdate: function (t) {
          T.push(t);
        },
      }),
      window.addEventListener("focus", () => {
        $.updateOnWindowFocus && p({}, {});
      }))
    : (console.warn("Liquid Ajax Cart is not supported by this browser"),
      (document.body.className += " js-ajax-cart-not-compatible"),
      (window.liquidAjaxCart = {
        configureCart: function () {},
        cartRequestGet: function () {},
        cartRequestAdd: function () {},
        cartRequestChange: function () {},
        cartRequestUpdate: function () {},
        cartRequestClear: function () {},
        subscribeToCartAjaxRequests: function () {},
        getCartState: S,
        subscribeToCartStateUpdate: function () {},
        subscribeToCartSectionsUpdate: function () {},
      })));
const K = window.liquidAjaxCart.configureCart,
  z = window.liquidAjaxCart.cartRequestGet,
  X = window.liquidAjaxCart.cartRequestAdd,
  Y = window.liquidAjaxCart.cartRequestChange,
  Z = window.liquidAjaxCart.cartRequestUpdate,
  tt = window.liquidAjaxCart.cartRequestClear,
  et = window.liquidAjaxCart.subscribeToCartAjaxRequests,
  rt = window.liquidAjaxCart.getCartState,
  ot = window.liquidAjaxCart.subscribeToCartStateUpdate,
  nt = window.liquidAjaxCart.subscribeToCartSectionsUpdate;
var at = e.x$,
  it = e.nd,
  st = e.yF,
  ct = e.fi,
  ut = e.Be,
  dt = e.ih,
  lt = e.KJ,
  ft = e.Q4,
  pt = e.WP,
  mt = e.w0;
export {
  at as cartRequestAdd,
  it as cartRequestChange,
  st as cartRequestClear,
  ct as cartRequestGet,
  ut as cartRequestUpdate,
  dt as configureCart,
  lt as getCartState,
  ft as subscribeToCartAjaxRequests,
  pt as subscribeToCartSectionsUpdate,
  mt as subscribeToCartStateUpdate,
};
