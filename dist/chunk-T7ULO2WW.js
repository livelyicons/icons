'use strict';

var React2 = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React2__namespace = /*#__PURE__*/_interopNamespace(React2);

// src/static/create-static-icon.tsx
function createStaticIcon(name, pathData) {
  const { paths, viewBox = "0 0 24 24" } = pathData;
  const StaticIcon = ({
    size = 24,
    strokeWidth = 2,
    className,
    animationClass,
    "aria-label": ariaLabel,
    color = "currentColor",
    style
  }) => {
    const combinedClassName = [className, animationClass].filter(Boolean).join(" ");
    return /* @__PURE__ */ React2__namespace.createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox,
        fill: "none",
        stroke: color,
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: combinedClassName || void 0,
        style,
        role: ariaLabel ? "img" : void 0,
        "aria-label": ariaLabel,
        "aria-hidden": ariaLabel ? void 0 : true
      },
      paths
    );
  };
  StaticIcon.displayName = name;
  return StaticIcon;
}
function withStatic(StaticIconComponent, name) {
  const WrappedStatic = (props) => {
    return /* @__PURE__ */ React2__namespace.createElement(StaticIconComponent, { ...props, animated: false });
  };
  WrappedStatic.displayName = `Static${name}`;
  return WrappedStatic;
}
var StaticCheck = createStaticIcon("StaticCheck", {
  paths: /* @__PURE__ */ React2__namespace.createElement("polyline", { points: "20 6 9 17 4 12" })
});
var StaticX = createStaticIcon("StaticX", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M18 6 6 18" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m6 6 12 12" }))
});
var StaticPlus = createStaticIcon("StaticPlus", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M5 12h14" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M12 5v14" }))
});
var StaticMinus = createStaticIcon("StaticMinus", {
  paths: /* @__PURE__ */ React2__namespace.createElement("path", { d: "M5 12h14" })
});
var StaticArrowLeft = createStaticIcon("StaticArrowLeft", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "m12 19-7-7 7-7" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M19 12H5" }))
});
var StaticArrowRight = createStaticIcon("StaticArrowRight", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "m12 5 7 7-7 7" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M5 12h14" }))
});
var StaticChevronDown = createStaticIcon("StaticChevronDown", {
  paths: /* @__PURE__ */ React2__namespace.createElement("path", { d: "m6 9 6 6 6-6" })
});
var StaticChevronUp = createStaticIcon("StaticChevronUp", {
  paths: /* @__PURE__ */ React2__namespace.createElement("path", { d: "m18 15-6-6-6 6" })
});
var StaticMenu = createStaticIcon("StaticMenu", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("line", { x1: "4", x2: "20", y1: "12", y2: "12" }), /* @__PURE__ */ React2__namespace.createElement("line", { x1: "4", x2: "20", y1: "6", y2: "6" }), /* @__PURE__ */ React2__namespace.createElement("line", { x1: "4", x2: "20", y1: "18", y2: "18" }))
});
var StaticHome = createStaticIcon("StaticHome", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }))
});
var StaticMail = createStaticIcon("StaticMail", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }))
});
var StaticBell = createStaticIcon("StaticBell", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }))
});
var StaticMessageCircle = createStaticIcon("StaticMessageCircle", {
  paths: /* @__PURE__ */ React2__namespace.createElement("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" })
});
var StaticPhone = createStaticIcon("StaticPhone", {
  paths: /* @__PURE__ */ React2__namespace.createElement("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
});
var StaticCheckCircle = createStaticIcon("StaticCheckCircle", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m9 12 2 2 4-4" }))
});
var StaticXCircle = createStaticIcon("StaticXCircle", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m15 9-6 6" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m9 9 6 6" }))
});
var StaticAlertCircle = createStaticIcon("StaticAlertCircle", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React2__namespace.createElement("line", { x1: "12", x2: "12", y1: "8", y2: "12" }), /* @__PURE__ */ React2__namespace.createElement("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }))
});
var StaticInfo = createStaticIcon("StaticInfo", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M12 16v-4" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M12 8h.01" }))
});
var StaticHelpCircle = createStaticIcon("StaticHelpCircle", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M12 17h.01" }))
});
var StaticSearch = createStaticIcon("StaticSearch", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m21 21-4.3-4.3" }))
});
var StaticSettings = createStaticIcon("StaticSettings", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }), /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "12", r: "3" }))
});
var StaticEdit = createStaticIcon("StaticEdit", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m15 5 4 4" }))
});
var StaticTrash = createStaticIcon("StaticTrash", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M3 6h18" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }))
});
var StaticDownload = createStaticIcon("StaticDownload", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), /* @__PURE__ */ React2__namespace.createElement("polyline", { points: "7 10 12 15 17 10" }), /* @__PURE__ */ React2__namespace.createElement("line", { x1: "12", x2: "12", y1: "15", y2: "3" }))
});
var StaticUpload = createStaticIcon("StaticUpload", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), /* @__PURE__ */ React2__namespace.createElement("polyline", { points: "17 8 12 3 7 8" }), /* @__PURE__ */ React2__namespace.createElement("line", { x1: "12", x2: "12", y1: "3", y2: "15" }))
});
var StaticCopy = createStaticIcon("StaticCopy", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }))
});
var StaticShare = createStaticIcon("StaticShare", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "18", cy: "5", r: "3" }), /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "6", cy: "12", r: "3" }), /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "18", cy: "19", r: "3" }), /* @__PURE__ */ React2__namespace.createElement("line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49" }), /* @__PURE__ */ React2__namespace.createElement("line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49" }))
});
var StaticHeart = createStaticIcon("StaticHeart", {
  paths: /* @__PURE__ */ React2__namespace.createElement("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })
});
var StaticStar = createStaticIcon("StaticStar", {
  paths: /* @__PURE__ */ React2__namespace.createElement("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
});
var StaticThumbsUp = createStaticIcon("StaticThumbsUp", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M7 10v12" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" }))
});
var StaticThumbsDown = createStaticIcon("StaticThumbsDown", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M17 14V2" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" }))
});
var StaticEye = createStaticIcon("StaticEye", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }), /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "12", r: "3" }))
});
var StaticEyeOff = createStaticIcon("StaticEyeOff", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.749 10.749 0 0 1 4.446-5.143" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m2 2 20 20" }))
});
var StaticUser = createStaticIcon("StaticUser", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "7", r: "4" }))
});
var StaticUsers = createStaticIcon("StaticUsers", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }))
});
var StaticLock = createStaticIcon("StaticLock", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }))
});
var StaticLoader = createStaticIcon("StaticLoader", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M12 2v4" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m16.2 7.8 2.9-2.9" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M18 12h4" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m16.2 16.2 2.9 2.9" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M12 18v4" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m4.9 19.1 2.9-2.9" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M2 12h4" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "m4.9 4.9 2.9 2.9" }))
});
var StaticRefresh = createStaticIcon("StaticRefresh", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M8 16H3v5" }))
});
var StaticClock = createStaticIcon("StaticClock", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React2__namespace.createElement("polyline", { points: "12 6 12 12 16 14" }))
});
var StaticCalendar = createStaticIcon("StaticCalendar", {
  paths: /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, /* @__PURE__ */ React2__namespace.createElement("path", { d: "M8 2v4" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M16 2v4" }), /* @__PURE__ */ React2__namespace.createElement("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }), /* @__PURE__ */ React2__namespace.createElement("path", { d: "M3 10h18" }))
});

exports.StaticAlertCircle = StaticAlertCircle;
exports.StaticArrowLeft = StaticArrowLeft;
exports.StaticArrowRight = StaticArrowRight;
exports.StaticBell = StaticBell;
exports.StaticCalendar = StaticCalendar;
exports.StaticCheck = StaticCheck;
exports.StaticCheckCircle = StaticCheckCircle;
exports.StaticChevronDown = StaticChevronDown;
exports.StaticChevronUp = StaticChevronUp;
exports.StaticClock = StaticClock;
exports.StaticCopy = StaticCopy;
exports.StaticDownload = StaticDownload;
exports.StaticEdit = StaticEdit;
exports.StaticEye = StaticEye;
exports.StaticEyeOff = StaticEyeOff;
exports.StaticHeart = StaticHeart;
exports.StaticHelpCircle = StaticHelpCircle;
exports.StaticHome = StaticHome;
exports.StaticInfo = StaticInfo;
exports.StaticLoader = StaticLoader;
exports.StaticLock = StaticLock;
exports.StaticMail = StaticMail;
exports.StaticMenu = StaticMenu;
exports.StaticMessageCircle = StaticMessageCircle;
exports.StaticMinus = StaticMinus;
exports.StaticPhone = StaticPhone;
exports.StaticPlus = StaticPlus;
exports.StaticRefresh = StaticRefresh;
exports.StaticSearch = StaticSearch;
exports.StaticSettings = StaticSettings;
exports.StaticShare = StaticShare;
exports.StaticStar = StaticStar;
exports.StaticThumbsDown = StaticThumbsDown;
exports.StaticThumbsUp = StaticThumbsUp;
exports.StaticTrash = StaticTrash;
exports.StaticUpload = StaticUpload;
exports.StaticUser = StaticUser;
exports.StaticUsers = StaticUsers;
exports.StaticX = StaticX;
exports.StaticXCircle = StaticXCircle;
exports.createStaticIcon = createStaticIcon;
exports.withStatic = withStatic;
//# sourceMappingURL=chunk-T7ULO2WW.js.map
//# sourceMappingURL=chunk-T7ULO2WW.js.map