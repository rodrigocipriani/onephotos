import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
// import { useDebouncedCallback } from "use-debounce";

const DEFAULT_CONFIG = {
  toolbar: {
    items: [
      "heading",
      "bold",
      "italic",
      "link",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "blockQuote",
      "|",
      "undo",
      "redo",
      "|",
      "mediaEmbed",
      "insertTable",
      "tableColumn",
      "tableRow",
      "mergeTableCells"
      // "imageStyle:full",
      // "imageStyle:side",
      // "ckfinder",
      // "imageUpload",
      // "imageTextAlternative",
    ],
    viewportTopOffset: 75,
    shouldNotGroupWhenFull: false
  },
  heading: {
    options: [
      {
        model: "paragraph",
        title: "Parágrafo",
        class: "ck-heading_paragraph"
      },
      {
        model: "heading1",
        view: "h1",
        title: "Título 1",
        class: "ck-heading_heading1"
      },
      {
        model: "heading2",
        view: "h2",
        title: "Título 2",
        class: "ck-heading_heading2"
      }
    ]
  }
};

//console.log(Array.from(editor.ui.componentFactory.names()));
//https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html#member-toolbar
const EditorCustom = ({
  config,
  editor,
  disabled,
  onInit,
  onChange,
  onFocus,
  onBlur,
  data
}) => {
  // const [debouncedRemeasure] = useDebouncedCallback(width => {
  //   console.log("vaiiiiiiiii 2222222222222");
  //   toolbarContainer.current.style.width = `${width}px`;
  // }, 500);

  useEffect(() => {
    if (theEditor) {
      theEditor.setData(data);
    }
  }, [data]);

  useEffect(() => {
    // window.addEventListener("resize", remeasure);
    _initializeEditor();

    return () => {
      _destroyEditor();
      // window.removeEventListener("resize", remeasure);
    };
  }, []);

  let editorConfig = { ...DEFAULT_CONFIG, ...config };

  // After mounting the editor, the variable will contain a reference to the created editor.
  // @see: https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
  const [theEditor, setTheEditor] = useState(null);
  const domContainer = useRef();
  const toolbarContainer = useRef();

  const _initializeEditor = () => {
    // const width = toolbarContainer.current.parentElement.clientWidth;
    editor
      .create(domContainer.current, editorConfig)
      .then(editor => {
        setTheEditor(editor);

        // to prevent some erros
        // setTimeout(() => {
        //   console.log("dinovo");
        //   remeasure();
        // }, 3000);

        toolbarContainer.current.appendChild(editor.ui.view.toolbar.element);

        // toolbarContainer.current.style.width = `${width}px`;
        toolbarContainer.current.style["max-width"] = `400px`;

        // console.log(Array.from(editor.ui.componentFactory.names()));

        if (disabled) {
          editor.isReadOnly = disabled;
        }

        if (onInit) {
          onInit(editor);
        }

        const modelDocument = editor.model.document;
        const viewDocument = editor.editing.view.document;

        modelDocument.on("change:data", event => {
          /* istanbul ignore else */
          if (onChange) {
            onChange(event, editor);
          }
        });

        viewDocument.on("focus", event => {
          /* istanbul ignore else */
          if (onFocus) {
            onFocus(event, editor);
          }
        });

        viewDocument.on("blur", event => {
          /* istanbul ignore else */
          if (onBlur) {
            onBlur(event, editor);
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const _destroyEditor = () => {
    if (theEditor) {
      theEditor.destroy().then(() => {
        theEditor = null;
      });
    }
  };

  // const remeasure = () => {
  //   console.log("vaiiiiiiiii");
  //   toolbarContainer.current.style.width = `0px`;
  //   const width = toolbarContainer.current.parentElement.clientWidth;
  //   debouncedRemeasure(width);
  // };

  // Render a <div> element which will be replaced by CKEditor.

  // We need to inject initial data to the container where the editable will be enabled. Using `editor.setData()`
  // is a bad practice because it initializes the data after every new connection (in case of collaboration usage).
  // It leads to reset the entire content. See: #68
  return (
    // <div
    //   ref={domContainer}
    //   dangerouslySetInnerHTML={{ __html: data || "" }}
    // ></div>
    <div style={{ width: "100%" }}>
      <div
        style={{ width: "100%" }}
        ref={toolbarContainer}
        id="toolbar-container"
      ></div>
      <div
        style={{ width: "100%" }}
        ref={domContainer}
        id="editor"
        dangerouslySetInnerHTML={{ __html: data || "" }}
      ></div>
    </div>
  );
};

// Properties definition.
EditorCustom.propTypes = {
  editor: PropTypes.func.isRequired,
  data: PropTypes.string,
  config: PropTypes.object,
  onChange: PropTypes.func,
  onInit: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool
};

// Default values for non-required properties.
EditorCustom.defaultProps = {
  config: {}
};

export default EditorCustom;
