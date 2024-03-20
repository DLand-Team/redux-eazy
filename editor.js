import { j as jsxRuntimeExports } from '../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js';
import '../../utils/highlight.js';
import '../../node_modules/.pnpm/react-quill@2.0.0_react-dom@18.2.0_react@18.2.0/node_modules/react-quill/dist/quill.snow.css.js';
import ReactQuill from '../../node_modules/.pnpm/react-quill@2.0.0_react-dom@18.2.0_react@18.2.0/node_modules/react-quill/lib/index.js';
import { StyledEditor } from './styles.js';
import Toolbar, { formats } from './toolbar.js';
import { alpha } from '@mui/system';

// ----------------------------------------------------------------------
function Editor({ id = "minimal-quill", error, simple = false, helperText, sx, ...other }) {
    const modules = {
        toolbar: {
            container: `#${id}`,
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
        syntax: true,
        clipboard: {
            matchVisual: false,
        },
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(StyledEditor, { sx: {
                    ...(error && {
                        border: (theme) => `solid 1px ${theme.palette.error.main}`,
                        "& .ql-editor": {
                            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                        },
                    }),
                    ...sx,
                }, children: [jsxRuntimeExports.jsx(Toolbar, { id: id, isSimple: simple }), jsxRuntimeExports.jsx(ReactQuill, { modules: modules, formats: formats, placeholder: "Write something awesome...", ...other })] }), helperText && helperText] }));
}

export { Editor as default };
