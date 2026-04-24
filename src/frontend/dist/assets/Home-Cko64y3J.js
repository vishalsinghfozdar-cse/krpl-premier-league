var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { S as Subscribable, s as shallowEqualObjects, h as hashKey, g as getDefaultState, n as notifyManager, u as useQueryClient, r as reactExports, a as noop, b as shouldThrowError, j as jsxRuntimeExports, L as Link } from "./index-B55sed_M.js";
import { u as useActor, c as createActor } from "./backend-C3dt9Jv2.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function useRegisterTeam() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor)
        throw new Error("बैकएंड से कनेक्शन नहीं हो पाया। कृपया पुनः प्रयास करें।");
      return actor.registerTeam(
        data.teamName,
        data.captainName,
        data.villageName,
        data.phone,
        data.playerCount
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    }
  });
}
const TOURNAMENT_DATE = (/* @__PURE__ */ new Date("April 28, 2026 00:00:00")).getTime();
function useCountdown() {
  const [timeLeft, setTimeLeft] = reactExports.useState("");
  reactExports.useEffect(() => {
    const tick = () => {
      const distance = TOURNAMENT_DATE - Date.now();
      if (distance <= 0) {
        setTimeLeft("टूर्नामेंट शुरू हो चुका है!");
        return;
      }
      const d = Math.floor(distance / 864e5);
      const h = Math.floor(distance % 864e5 / 36e5);
      const m = Math.floor(distance % 36e5 / 6e4);
      const s = Math.floor(distance % 6e4 / 1e3);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1e3);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}
const RULES = [
  "सभी खिलाड़ी एक ही गाँव के होना अनिवार्य हैं (ID जरूरी)।",
  "नगरपालिका में केवल 2 वार्ड के खिलाड़ी खेल सकते हैं।",
  "प्रत्येक मैच में 'मैन ऑफ द मैच' शिल्ड।",
  "मैच 8-8 ओवर के होंगे (पावर प्ले 2 ओवर)।",
  "एक बॉलर अधिकतम 2 ओवर डाल सकता है।",
  "बाहरी खिलाड़ी पाए जाने पर टीम डिस्क्वालीफाई।",
  "हैट्रिक (विकेट/छक्के) पर ₹ 151 नकद।",
  "फन्टी बैट अलाऊ है। निविया बॉल का उपयोग।"
];
const CONTACTS = [
  { name: "रामवीर", phone: "9116892312" },
  { name: "विष्णु", phone: "8104646750" },
  { name: "मनीष", phone: "8058500561" }
];
const EMPTY_FORM = {
  teamName: "",
  captainName: "",
  villageName: "",
  phone: "",
  playerCount: "11 Players"
};
function RegistrationModal({ onClose, onSuccess }) {
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const { mutate: registerTeam, isPending, isError, error } = useRegisterTeam();
  const overlayRef = reactExports.useRef(null);
  const teamId = reactExports.useId();
  const captainId = reactExports.useId();
  const villageId = reactExports.useId();
  const phoneId = reactExports.useId();
  const playerCountId = reactExports.useId();
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  function handleSubmit(e) {
    e.preventDefault();
    registerTeam(form, {
      onSuccess: () => {
        const name = form.teamName;
        setForm(EMPTY_FORM);
        onClose();
        onSuccess(name);
      }
    });
  }
  const inputClass = "w-full px-3 py-2.5 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";
  const inputStyle = {
    background: "rgba(0,0,0,0.3)",
    border: "1px solid #444",
    color: "white"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: overlayRef,
      "data-ocid": "home.register.dialog",
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4",
      onClick: (e) => {
        if (e.target === overlayRef.current) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "dialog",
        {
          open: true,
          className: "relative w-full max-w-md rounded-3xl p-7 text-foreground bg-transparent border-0 m-0",
          style: {
            background: "oklch(0.10 0.05 270)",
            border: "3px solid var(--gold)",
            animation: "modal-slide 0.4s ease both",
            borderRadius: "1.5rem",
            maxWidth: "28rem",
            width: "100%"
          },
          "aria-labelledby": "modal-title",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                "data-ocid": "home.register.close_button",
                type: "button",
                "aria-label": "बंद करें",
                className: "absolute top-4 right-5 text-3xl leading-none cursor-pointer transition-smooth hover:text-white border-0 bg-transparent",
                style: { color: "#aaa" },
                onClick: onClose,
                children: "×"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "modal-title",
                className: "font-display font-bold text-xl pb-3 mb-5",
                style: {
                  color: "var(--gold)",
                  borderBottom: "2px solid var(--gold)"
                },
                children: "टीम रजिस्ट्रेशन फॉर्म"
              }
            ),
            isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "home.register.error_state",
                className: "rounded-lg px-4 py-3 mb-4 text-sm font-medium",
                style: {
                  background: "rgba(255,50,50,0.15)",
                  border: "1px solid rgba(255,80,80,0.4)",
                  color: "#ff8888"
                },
                children: [
                  "⚠️ ",
                  (error == null ? void 0 : error.message) ?? "रजिस्ट्रेशन में समस्या आई। कृपया पुनः प्रयास करें।"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                "data-ocid": "home.register.form",
                onSubmit: handleSubmit,
                className: "flex flex-col gap-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: teamId,
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--gold)" },
                        children: "टीम का नाम (Team Name)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: teamId,
                        "data-ocid": "home.register.teamname.input",
                        type: "text",
                        required: true,
                        placeholder: "जैसे: Kherli Warriors",
                        value: form.teamName,
                        onChange: (e) => setForm({ ...form, teamName: e.target.value }),
                        className: inputClass,
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: captainId,
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--gold)" },
                        children: "कप्तान का नाम (Captain Name)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: captainId,
                        "data-ocid": "home.register.captainname.input",
                        type: "text",
                        required: true,
                        placeholder: "कप्तान का नाम",
                        value: form.captainName,
                        onChange: (e) => setForm({ ...form, captainName: e.target.value }),
                        className: inputClass,
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: villageId,
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--gold)" },
                        children: "गाँव/वार्ड का नाम (Village/Ward)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: villageId,
                        "data-ocid": "home.register.villagename.input",
                        type: "text",
                        required: true,
                        placeholder: "नियम के अनुसार गाँव का नाम",
                        value: form.villageName,
                        onChange: (e) => setForm({ ...form, villageName: e.target.value }),
                        className: inputClass,
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: phoneId,
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--gold)" },
                        children: "मोबाइल नंबर (WhatsApp No.)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: phoneId,
                        "data-ocid": "home.register.phone.input",
                        type: "tel",
                        required: true,
                        pattern: "[0-9]{10}",
                        placeholder: "10 अंकों का नंबर",
                        value: form.phone,
                        onChange: (e) => setForm({ ...form, phone: e.target.value }),
                        className: inputClass,
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: playerCountId,
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--gold)" },
                        children: "खिलाड़ियों की संख्या"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: playerCountId,
                        "data-ocid": "home.register.playercount.select",
                        value: form.playerCount,
                        onChange: (e) => setForm({ ...form, playerCount: e.target.value }),
                        className: inputClass,
                        style: inputStyle,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "11 Players", children: "11 Players" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "12 Players (+Sub)", children: "12 Players (+Sub)" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: "#aaa" }, children: "* फॉर्म जमा करने के बाद कमेटी आपसे एंट्री फीस जमा करने के लिए संपर्क करेगी." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      "data-ocid": "home.register.submit_button",
                      type: "submit",
                      disabled: isPending,
                      className: "w-full font-display font-bold text-lg py-4 rounded-full cursor-pointer transition-smooth hover:scale-105 border-0 mt-1",
                      style: {
                        background: "linear-gradient(90deg, var(--gold), #ff8c00)",
                        color: "#000",
                        boxShadow: "var(--shadow-gold)",
                        opacity: isPending ? 0.7 : 1
                      },
                      children: isPending ? "जमा हो रहा है..." : "रजिस्ट्रेशन जमा करें"
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function Home() {
  const countdown = useCountdown();
  const [showModal, setShowModal] = reactExports.useState(false);
  const [successTeam, setSuccessTeam] = reactExports.useState(null);
  function handleSuccess(teamName) {
    setSuccessTeam(teamName);
    setTimeout(() => setSuccessTeam(null), 4e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-4xl mx-auto px-4 py-6", children: [
    successTeam && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "home.register.success_state",
        role: "alert",
        "aria-live": "assertive",
        className: "fixed top-5 right-5 z-[2000] rounded-xl px-6 py-4 text-base font-bold text-white shadow-lg",
        style: {
          background: "#4CAF50",
          animation: "fadeInDown 0.3s ease both"
        },
        children: [
          "🎉 टीम “",
          successTeam,
          "” रजिस्टर हो गई है! धन्यवाद."
        ]
      }
    ),
    showModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegistrationModal,
      {
        onClose: () => setShowModal(false),
        onSuccess: handleSuccess
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "home.page",
        className: "shine-container relative rounded-3xl p-6 md:p-10 text-center",
        style: {
          background: "rgba(10, 15, 40, 0.92)",
          border: "4px solid var(--gold)",
          boxShadow: "var(--container-glow)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display font-bold text-lg",
              style: { color: "var(--gold)" },
              children: "।। जय श्री श्याम ।।"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display font-black tracking-widest mt-2 text-gold-gradient",
              style: {
                fontSize: "clamp(2rem, 8vw, 3.5rem)",
                lineHeight: 1.1,
                textShadow: "0px 4px 0px rgba(0,0,0,0.5)"
              },
              children: "KRPL PREMIER LEAGUE"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg", style: { color: "#ddd" }, children: "खेरली तर्फ रेला, कठूमर (अलवर)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xl font-display", children: [
            "क्रिकेट प्रतियोगिता -",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block font-bold text-lg px-4 py-1 rounded-md",
                style: { background: "var(--ipl-red)", color: "#fff" },
                children: "रात्रि कालीन"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "home.prize.section",
              className: "flex flex-col sm:flex-row gap-5 my-10 justify-center",
              children: [
                {
                  label: "प्रथम पुरस्कार",
                  amount: "₹ 51,000",
                  ocid: "home.prize.card.1"
                },
                {
                  label: "द्वितीय पुरस्कार",
                  amount: "₹ 21,000",
                  ocid: "home.prize.card.2"
                }
              ].map((prize) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": prize.ocid,
                  className: "prize-card flex-1 p-6 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "text-sm font-medium",
                        style: { color: "#aaa", margin: 0 },
                        children: prize.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "font-display font-bold mt-1",
                        style: {
                          fontSize: "2.6rem",
                          color: "var(--gold)",
                          textShadow: "0 0 10px oklch(0.82 0.18 65 / 0.5)"
                        },
                        children: prize.amount
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", style: { color: "#888" }, children: "+ ट्रॉफी" })
                  ]
                },
                prize.ocid
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "home.entry_fee",
              className: "inline-block font-display font-bold text-2xl px-12 py-4 rounded-full transition-smooth hover:scale-105",
              style: {
                background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
                color: "white",
                boxShadow: "0 5px 20px rgba(255, 75, 43, 0.4)"
              },
              children: "एंट्री फीस: ₹ 2,100/-"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "home.countdown",
              className: "mt-6 rounded-2xl p-4",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #333"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: { color: "#aaa", margin: "0 0 8px 0", fontSize: "0.95rem" },
                    children: "टूर्नामेंट शुरू होने में समय शेष:"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "font-display font-bold tracking-widest",
                    style: {
                      fontSize: "1.8rem",
                      color: "var(--gold)",
                      letterSpacing: "2px"
                    },
                    "aria-live": "polite",
                    children: countdown || "Loading..."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-bold text-foreground", children: "📅 28 अप्रैल 2026" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "home.rules.panel",
              className: "rounded-2xl p-6 text-left mt-8",
              style: {
                background: "rgba(255,255,255,0.03)",
                border: "1px solid #222"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display font-bold text-xl pb-3 mb-4",
                    style: { color: "var(--gold)", borderBottom: "1px solid #444" },
                    children: "📋 मुख्य नियम व शर्तें"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: RULES.map((rule) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    "data-ocid": `home.rules.item.${RULES.indexOf(rule) + 1}`,
                    className: "relative pl-8 text-sm leading-relaxed text-foreground",
                    style: { margin: "6px 0" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0", "aria-hidden": "true", children: "🏏" }),
                      rule
                    ]
                  },
                  rule
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              "data-ocid": "home.register.open_modal_button",
              type: "button",
              className: "font-display font-bold text-xl px-10 py-4 rounded-full cursor-pointer transition-smooth hover:scale-110 mt-8 border-0",
              style: {
                background: "linear-gradient(90deg, var(--gold), #ff8c00)",
                color: "#000",
                boxShadow: "var(--shadow-gold)"
              },
              onClick: () => setShowModal(true),
              onMouseEnter: (e) => {
                e.currentTarget.style.boxShadow = "0 0 25px oklch(0.82 0.18 65 / 0.8)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-gold)";
              },
              children: "अपनी टीम रजिस्टर करें"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "home.contact.panel",
              className: "rounded-2xl p-6 text-left mt-8",
              style: {
                background: "rgba(255,255,255,0.03)",
                border: "1px solid #222"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display font-bold text-lg pb-3 mb-4",
                    style: { color: "var(--gold)", borderBottom: "1px solid #444" },
                    children: "📞 सम्पर्क सूत्र (संपर्क करें)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: CONTACTS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    "data-ocid": `home.contact.card.${CONTACTS.indexOf(c) + 1}`,
                    href: `tel:${c.phone}`,
                    className: "bg-foreground rounded-xl p-4 font-bold text-center transition-smooth hover:scale-105 block",
                    style: { color: "#333" },
                    children: [
                      c.name,
                      ": ",
                      c.phone
                    ]
                  },
                  c.phone
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mt-8 pt-6 flex justify-center",
              style: { borderTop: "1px solid rgba(253,187,45,0.3)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/admin",
                  "data-ocid": "home.admin.link",
                  className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-smooth hover:scale-105 hover:brightness-110",
                  style: {
                    background: "rgba(253,187,45,0.12)",
                    border: "1.5px solid rgba(253,187,45,0.7)",
                    color: "var(--gold)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📋" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "एडमिन पैनल — रजिस्ट्रेशन लिस्ट देखें" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "→" })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-8", style: { color: "#888", fontSize: "0.85rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "विनीत: समस्त ग्रामवासी, रेला खेड़ली, कठूमर (अलवर) राज." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ". Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "transition-smooth hover:text-primary underline",
                  children: "caffeine.ai"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  Home as default
};
