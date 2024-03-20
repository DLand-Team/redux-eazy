import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import { j as jsxRuntimeExports } from '../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js';
import '../../utils/highlight.js';
import '../../node_modules/.pnpm/react-quill@2.0.0_react-dom@18.2.0_react@18.2.0/node_modules/react-quill/dist/quill.snow.css.js';
import ReactQuill from '../../node_modules/.pnpm/react-quill@2.0.0_react-dom@18.2.0_react@18.2.0/node_modules/react-quill/lib/index.js';
import { StyledEditor } from './styles.js';
import Toolbar, { formats } from './toolbar.js';
import { alpha } from '@mui/system';

var _excluded = ["id", "error", "simple", "helperText", "sx"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// ----------------------------------------------------------------------
function Editor(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? "minimal-quill" : _ref$id,
    error = _ref.error,
    _ref$simple = _ref.simple,
    simple = _ref$simple === void 0 ? false : _ref$simple,
    helperText = _ref.helperText,
    sx = _ref.sx,
    other = _objectWithoutProperties(_ref, _excluded);
  var modules = {
    toolbar: {
      container: "#".concat(id)
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    syntax: true,
    clipboard: {
      matchVisual: false
    }
  };
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [jsxRuntimeExports.jsxs(StyledEditor, {
      sx: _objectSpread(_objectSpread({}, error && {
        border: function border(theme) {
          return "solid 1px ".concat(theme.palette.error.main);
        },
        "& .ql-editor": {
          bgcolor: function bgcolor(theme) {
            return alpha(theme.palette.error.main, 0.08);
          }
        }
      }), sx),
      children: [jsxRuntimeExports.jsx(Toolbar, {
        id: id,
        isSimple: simple
      }), jsxRuntimeExports.jsx(ReactQuill, _objectSpread({
        modules: modules,
        formats: formats,
        placeholder: "Write something awesome..."
      }, other))]
    }), helperText && helperText]
  });
}

export { Editor as default };
