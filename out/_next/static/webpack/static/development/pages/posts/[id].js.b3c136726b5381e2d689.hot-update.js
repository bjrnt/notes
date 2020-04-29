webpackHotUpdate("static/development/pages/posts/[id].js",{

/***/ "./pages/posts/[id].tsx":
/*!******************************!*\
  !*** ./pages/posts/[id].tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSG", function() { return __N_SSG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Post; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/layout */ "./components/layout.tsx");
/* harmony import */ var unified__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! unified */ "./node_modules/unified/index.js");
/* harmony import */ var unified__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(unified__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var remark_rehype__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! remark-rehype */ "./node_modules/remark-rehype/index.js");
/* harmony import */ var remark_rehype__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(remark_rehype__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rehype_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rehype-react */ "./node_modules/rehype-react/index.js");
/* harmony import */ var rehype_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(rehype_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var remark_parse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! remark-parse */ "./node_modules/remark-parse/index.js");
/* harmony import */ var remark_parse__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(remark_parse__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var remark_footnotes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! remark-footnotes */ "./node_modules/remark-footnotes/index.js");
/* harmony import */ var remark_footnotes__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(remark_footnotes__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var remark_numbered_footnotes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! remark-numbered-footnotes */ "./node_modules/remark-numbered-footnotes/dist/index.js");
/* harmony import */ var remark_numbered_footnotes__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(remark_numbered_footnotes__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_markdown_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/markdown-link */ "./components/markdown-link.tsx");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _markdown_module_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./markdown.module.css */ "./pages/posts/markdown.module.css");
/* harmony import */ var _markdown_module_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_markdown_module_css__WEBPACK_IMPORTED_MODULE_12__);


var _jsxFileName = "/Users/bjorn/projects/nextjs-blog/pages/posts/[id].tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_4__["createElement"];











var markdownProcessor = unified__WEBPACK_IMPORTED_MODULE_3___default()().use(remark_parse__WEBPACK_IMPORTED_MODULE_7___default.a).use(remark_footnotes__WEBPACK_IMPORTED_MODULE_8___default.a, {
  inlineNotes: true
}).use(remark_numbered_footnotes__WEBPACK_IMPORTED_MODULE_9___default.a).use(remark_rehype__WEBPACK_IMPORTED_MODULE_5___default.a).use(rehype_react__WEBPACK_IMPORTED_MODULE_6___default.a, {
  createElement: react__WEBPACK_IMPORTED_MODULE_4__["createElement"],
  components: {
    a: _components_markdown_link__WEBPACK_IMPORTED_MODULE_10__["MarkdownLink"],
    img: Image,
    sup: Reference
  }
});
var __N_SSG = true;
function Post(_ref) {
  var post = _ref.post;
  return __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: _markdown_module_css__WEBPACK_IMPORTED_MODULE_12___default.a.container,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }, markdownProcessor.processSync(post.contents).result), __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }), post.inboundLinks.length > 0 && __jsx(InboundLinks, {
    links: post.inboundLinks,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 9
    }
  }));
}

function Image(_ref2) {
  var src = _ref2.src,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, ["src"]);

  var modifiedSrc = "/".concat(src.slice(2));
  return __jsx("img", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    src: modifiedSrc
  }, rest, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 10
    }
  }));
}

function InboundLinks(_ref3) {
  var _this = this;

  var links = _ref3.links;
  return __jsx("div", {
    className: "bg-gray-200 p-3 rounded-lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 5
    }
  }, __jsx("h5", {
    className: "mt-0 text-gray-500 leading-tight mb-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }
  }, "Inbound Links"), __jsx("div", {
    className: "flex flex-wrap",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }
  }, links.map(function (link) {
    return __jsx(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: "/posts/[id]",
      as: "/posts/".concat(link.id),
      key: link.id,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 11
      }
    }, __jsx("button", {
      className: "w-1/2 h-32 text-left p-2 opacity-50 hover:opacity-75 hover:bg-gray-400 rounded-md text-sm flex flex-col",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 13
      }
    }, __jsx("strong", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 15
      }
    }, link.title), __jsx("div", {
      className: "overflow-y-auto text-gray-700",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 15
      }
    }, markdownProcessor.processSync(link.context).result)));
  })));
}

/***/ })

})
//# sourceMappingURL=[id].js.b3c136726b5381e2d689.hot-update.js.map