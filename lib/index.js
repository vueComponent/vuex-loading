"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var createLoadingPlugin = function createLoadingPlugin() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$namespace = _ref.namespace,
    NAMESPACE = _ref$namespace === void 0 ? "loading" : _ref$namespace;

  var SHOW = "@@ANTDV_LOADING/SHOW";
  var HIDE = "@@ANTDV_LOADING/HIDE";
  return function(store) {
    var _mutations;

    if (store.state[NAMESPACE]) {
      throw new Error(
        "createLoadingPlugin: ".concat(NAMESPACE, " exited in current store")
      );
    }

    store.registerModule(NAMESPACE, {
      namespaced: true,
      state: {
        global: false,
        models: {},
        effects: {}
      },
      mutations:
        ((_mutations = {}),
        _defineProperty(_mutations, SHOW, function(state, _ref2) {
          var actionType = _ref2.payload.actionType;
          state.global = true;
          var _namespace = actionType.split("/")[0];
          state.models = _defineProperty({ ...state.models }, _namespace, true);
          state.effects = _defineProperty(
            { ...state.effects },
            actionType,
            true
          );
        }),
        _defineProperty(_mutations, HIDE, function(state, _ref3) {
          var actionType = _ref3.payload.actionType;
          state.global = false;
          var _namespace = actionType.split("/")[0];
          state.models = _defineProperty(
            { ...state.models },
            _namespace,
            false
          );
          state.effects = _defineProperty(
            { ...state.effects },
            actionType,
            false
          );
        }),
        _mutations)
    });
    store.subscribeAction({
      before: function before(action) {
        store.commit(
          {
            type: "".concat(NAMESPACE, "/").concat(SHOW),
            payload: {
              actionType: action.type
            }
          },
          {
            root: true
          }
        );
      },
      after: function after(action) {
        store.commit(
          {
            type: "".concat(NAMESPACE, "/").concat(HIDE),
            payload: {
              actionType: action.type
            }
          },
          {
            root: true
          }
        );
      }
    });
  };
};

var _default = createLoadingPlugin;
exports.default = _default;
