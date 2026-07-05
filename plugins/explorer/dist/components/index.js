// ../../node_modules/github-slugger/index.js
var own = Object.hasOwnProperty;

// ../../node_modules/@quartz-community/utils/dist/path.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith(s, suffix) {
  return s === suffix || s.endsWith("/" + suffix);
}
function trimSuffix(s, suffix) {
  if (endsWith(s, suffix)) {
    s = s.slice(0, -suffix.length);
  }
  return s;
}
function stripSlashes(s, onlyStripPrefix) {
  if (s.startsWith("/")) {
    s = s.substring(1);
  }
  if (!onlyStripPrefix && s.endsWith("/")) {
    s = s.slice(0, -1);
  }
  return s;
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x) => x !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}
function slugTag(tag) {
  return tag.split("/").map((tagSegment) => _sluggify(tagSegment)).join("/");
}
function slugifyPath(s) {
  return s.split("/").map(
    (segment) => segment.replace(/\s/g, "-").replace(/&/g, "-and-").replace(/%/g, "-percent").replace(/\?/g, "").replace(/#/g, "").toLowerCase()
  ).join("/").replace(/\/$/, "");
}
function _sluggify(s) {
  return slugifyPath(s);
}

// ../../node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  components: {
    explorer: {
      title: "Explorer"
    }
  }
};

// src/i18n/locales/en-GB.ts
var en_GB_default = {
  components: {
    explorer: {
      title: "Explorer"
    }
  }
};

// src/i18n/locales/ar-SA.ts
var ar_SA_default = {
  components: {
    explorer: {
      title: "\u0627\u0644\u0645\u0633\u062A\u0639\u0631\u0636"
    }
  }
};

// src/i18n/locales/ca-ES.ts
var ca_ES_default = {
  components: {
    explorer: {
      title: "Explorador"
    }
  }
};

// src/i18n/locales/cs-CZ.ts
var cs_CZ_default = {
  components: {
    explorer: {
      title: "Proch\xE1zet"
    }
  }
};

// src/i18n/locales/de-DE.ts
var de_DE_default = {
  components: {
    explorer: {
      title: "Explorer"
    }
  }
};

// src/i18n/locales/es-ES.ts
var es_ES_default = {
  components: {
    explorer: {
      title: "Explorador"
    }
  }
};

// src/i18n/locales/fa-IR.ts
var fa_IR_default = {
  components: {
    explorer: {
      title: "\u0645\u0637\u0627\u0644\u0628"
    }
  }
};

// src/i18n/locales/fi-FI.ts
var fi_FI_default = {
  components: {
    explorer: {
      title: "Selain"
    }
  }
};

// src/i18n/locales/fr-FR.ts
var fr_FR_default = {
  components: {
    explorer: {
      title: "Explorateur"
    }
  }
};

// src/i18n/locales/he-IL.ts
var he_IL_default = {
  components: {
    explorer: {
      title: "\u05E1\u05D9\u05D9\u05E8"
    }
  }
};

// src/i18n/locales/hu-HU.ts
var hu_HU_default = {
  components: {
    explorer: {
      title: "F\xE1jlb\xF6ng\xE9sz\u0151"
    }
  }
};

// src/i18n/locales/id-ID.ts
var id_ID_default = {
  components: {
    explorer: {
      title: "Penjelajah"
    }
  }
};

// src/i18n/locales/it-IT.ts
var it_IT_default = {
  components: {
    explorer: {
      title: "Esplora"
    }
  }
};

// src/i18n/locales/ja-JP.ts
var ja_JP_default = {
  components: {
    explorer: {
      title: "\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC"
    }
  }
};

// src/i18n/locales/kk-KZ.ts
var kk_KZ_default = {
  components: {
    explorer: {
      title: "\u0417\u0435\u0440\u0442\u0442\u0435\u0443\u0448\u0456"
    }
  }
};

// src/i18n/locales/ko-KR.ts
var ko_KR_default = {
  components: {
    explorer: {
      title: "\uD0D0\uC0C9\uAE30"
    }
  }
};

// src/i18n/locales/lt-LT.ts
var lt_LT_default = {
  components: {
    explorer: {
      title: "Nar\u0161ykl\u0117"
    }
  }
};

// src/i18n/locales/nb-NO.ts
var nb_NO_default = {
  components: {
    explorer: {
      title: "Utforsker"
    }
  }
};

// src/i18n/locales/nl-NL.ts
var nl_NL_default = {
  components: {
    explorer: {
      title: "Verkenner"
    }
  }
};

// src/i18n/locales/pl-PL.ts
var pl_PL_default = {
  components: {
    explorer: {
      title: "Przegl\u0105daj"
    }
  }
};

// src/i18n/locales/pt-BR.ts
var pt_BR_default = {
  components: {
    explorer: {
      title: "Explorador"
    }
  }
};

// src/i18n/locales/ro-RO.ts
var ro_RO_default = {
  components: {
    explorer: {
      title: "Explorator"
    }
  }
};

// src/i18n/locales/ru-RU.ts
var ru_RU_default = {
  components: {
    explorer: {
      title: "\u041F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A"
    }
  }
};

// src/i18n/locales/th-TH.ts
var th_TH_default = {
  components: {
    explorer: {
      title: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2B\u0E19\u0E49\u0E32"
    }
  }
};

// src/i18n/locales/tr-TR.ts
var tr_TR_default = {
  components: {
    explorer: {
      title: "Gezgin"
    }
  }
};

// src/i18n/locales/uk-UA.ts
var uk_UA_default = {
  components: {
    explorer: {
      title: "\u041F\u0440\u043E\u0432\u0456\u0434\u043D\u0438\u043A"
    }
  }
};

// src/i18n/locales/vi-VN.ts
var vi_VN_default = {
  components: {
    explorer: {
      title: "N\u1ED9i dung"
    }
  }
};

// src/i18n/locales/zh-CN.ts
var zh_CN_default = {
  components: {
    explorer: {
      title: "\u63A2\u7D22"
    }
  }
};

// src/i18n/locales/zh-TW.ts
var zh_TW_default = {
  components: {
    explorer: {
      title: "\u63A2\u7D22"
    }
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default,
  "en-GB": en_GB_default,
  "ar-SA": ar_SA_default,
  "ca-ES": ca_ES_default,
  "cs-CZ": cs_CZ_default,
  "de-DE": de_DE_default,
  "es-ES": es_ES_default,
  "fa-IR": fa_IR_default,
  "fi-FI": fi_FI_default,
  "fr-FR": fr_FR_default,
  "he-IL": he_IL_default,
  "hu-HU": hu_HU_default,
  "id-ID": id_ID_default,
  "it-IT": it_IT_default,
  "ja-JP": ja_JP_default,
  "kk-KZ": kk_KZ_default,
  "ko-KR": ko_KR_default,
  "lt-LT": lt_LT_default,
  "nb-NO": nb_NO_default,
  "nl-NL": nl_NL_default,
  "pl-PL": pl_PL_default,
  "pt-BR": pt_BR_default,
  "ro-RO": ro_RO_default,
  "ru-RU": ru_RU_default,
  "th-TH": th_TH_default,
  "tr-TR": tr_TR_default,
  "uk-UA": uk_UA_default,
  "vi-VN": vi_VN_default,
  "zh-CN": zh_CN_default,
  "zh-TW": zh_TW_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}

// src/components/styles/explorer.scss
var explorer_default = '@media all and (max-width: 800px) {\n  .page > #quartz-body > :not(.sidebar.left:has(.explorer)) {\n    transform: translateX(0);\n    transition: transform 300ms ease-in-out;\n  }\n  .page > #quartz-body.lock-scroll > :not(.sidebar.left:has(.explorer)) {\n    transform: translateX(100dvw);\n    transition: transform 300ms ease-in-out;\n  }\n  .page > #quartz-body .sidebar.left:has(.explorer) {\n    box-sizing: border-box;\n    position: sticky;\n    background-color: var(--light);\n  }\n  .page > #quartz-body .hide-until-loaded ~ #explorer-content {\n    display: none;\n  }\n}\n.explorer-tabs {\n  display: flex;\n  gap: 0;\n  margin-bottom: 0.25rem;\n  border-bottom: 1px solid var(--lightgray);\n}\n.explorer-tabs .explorer-tab {\n  background: transparent;\n  border: none;\n  border-bottom: 2px solid transparent;\n  padding: 0.2rem 0.6rem;\n  cursor: pointer;\n  font-size: 0.8rem;\n  color: var(--darkgray);\n  font-family: var(--headerFont);\n  margin-bottom: -1px;\n}\n.explorer-tabs .explorer-tab.active {\n  color: var(--secondary);\n  border-bottom-color: var(--secondary);\n  font-weight: 600;\n}\n.explorer-tabs .explorer-tab:hover:not(.active) {\n  color: var(--dark);\n}\n\n.explorer {\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n  overflow-y: hidden;\n}\n@media all and (max-width: 800px) {\n  .explorer {\n    order: -1;\n    height: initial;\n    overflow: hidden;\n    flex-shrink: 0;\n    align-self: flex-start;\n  }\n}\n.explorer button#mobile-explorer {\n  display: none;\n}\n.explorer button#desktop-explorer {\n  display: flex;\n}\n@media all and (max-width: 800px) {\n  .explorer button#mobile-explorer {\n    display: flex;\n  }\n  .explorer button#desktop-explorer {\n    display: none;\n  }\n}\n@media all and not (max-width: 800px) {\n  .explorer.desktop-only {\n    display: flex;\n  }\n}\n.explorer {\n  /*&:after {\n    pointer-events: none;\n    content: "";\n    width: 100%;\n    height: 50px;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    opacity: 1;\n    transition: opacity 0.3s ease;\n    background: linear-gradient(transparent 0px, var(--light));\n  }*/\n}\n\nbutton#mobile-explorer,\nbutton#desktop-explorer {\n  background-color: transparent;\n  border: none;\n  text-align: left;\n  cursor: pointer;\n  padding: 0;\n  color: var(--dark);\n  display: flex;\n  align-items: center;\n}\nbutton#mobile-explorer h2,\nbutton#desktop-explorer h2 {\n  font-size: 1rem;\n  display: inline-block;\n  margin: 0;\n}\nbutton#mobile-explorer .fold,\nbutton#desktop-explorer .fold {\n  margin-left: 0.5rem;\n  transition: transform 0.3s ease;\n  opacity: 0.8;\n}\nbutton#mobile-explorer.collapsed .fold,\nbutton#desktop-explorer.collapsed .fold {\n  transform: rotateZ(-90deg);\n}\n\n.folder-outer {\n  display: grid;\n  grid-template-rows: 0fr;\n  transition: grid-template-rows 0.3s ease-in-out;\n}\n\n.folder-outer.open {\n  grid-template-rows: 1fr;\n}\n\n.folder-outer > ul {\n  overflow: hidden;\n}\n\n#explorer-content {\n  list-style: none;\n  overflow: hidden;\n  overflow-y: auto;\n  max-height: 0px;\n  transition: max-height 0.35s ease, visibility 0s linear 0.35s;\n  margin-top: 0.5rem;\n  visibility: hidden;\n}\n#explorer-content.collapsed {\n  max-height: 100%;\n  transition: max-height 0.35s ease, visibility 0s linear 0s;\n  visibility: visible;\n}\n#explorer-content ul {\n  list-style: none;\n  margin: 0.08rem 0;\n  padding: 0;\n  transition: max-height 0.35s ease, transform 0.35s ease, opacity 0.2s ease;\n}\n#explorer-content ul li > a {\n  color: var(--dark);\n  opacity: 0.75;\n  pointer-events: all;\n}\n#explorer-content ul li > a.is-active {\n  opacity: 1;\n  color: var(--secondary);\n  font-weight: 600;\n  background: var(--highlight);\n  border-radius: 6px;\n  padding: 2px 6px;\n}\n#explorer-content > #explorer-ul {\n  max-height: none;\n}\n\nsvg {\n  pointer-events: all;\n}\nsvg > polyline {\n  pointer-events: none;\n}\n\n.folder-container {\n  flex-direction: row;\n  display: flex;\n  align-items: center;\n  user-select: none;\n}\n.folder-container div > a {\n  color: var(--secondary);\n  font-family: var(--headerFont);\n  font-size: 0.95rem;\n  font-weight: 600;\n  line-height: 1.5rem;\n  display: inline-block;\n}\n.folder-container div > a:hover {\n  color: var(--tertiary);\n}\n.folder-container div > button {\n  color: var(--dark);\n  background-color: transparent;\n  border: none;\n  text-align: left;\n  cursor: pointer;\n  padding-left: 0;\n  padding-right: 0;\n  display: flex;\n  align-items: center;\n  font-family: var(--headerFont);\n}\n.folder-container div > button span {\n  font-size: 0.95rem;\n  display: inline-block;\n  color: var(--secondary);\n  font-weight: 600;\n  margin: 0;\n  line-height: 1.5rem;\n  pointer-events: none;\n}\n\n.folder-icon {\n  margin-right: 5px;\n  color: var(--secondary);\n  cursor: pointer;\n  transition: transform 0.3s ease;\n  backface-visibility: visible;\n}\n\nli:has(> .folder-outer:not(.open)) > .folder-container > svg {\n  transform: rotate(-90deg);\n}\n\n.folder-icon:hover {\n  color: var(--tertiary);\n}\n\n.no-background::after {\n  background: none !important;\n}\n\n#explorer-end {\n  height: 4px;\n  margin: 0;\n}\n\n@media all and (max-width: 800px) {\n  .explorer #explorer-content {\n    box-sizing: border-box;\n    overscroll-behavior: none;\n    z-index: 100;\n    position: absolute;\n    top: 0;\n    background-color: var(--light);\n    max-width: 100dvw;\n    left: -100dvw;\n    width: 100%;\n    transition: transform 300ms ease-in-out;\n    overflow: hidden;\n    padding: 6rem 2rem 2rem;\n    height: 100dvh;\n    max-height: 100dvh;\n    margin-top: 0;\n    visibility: hidden;\n  }\n  .explorer #explorer-content:not(.collapsed) {\n    transform: translateX(100dvw);\n    visibility: visible;\n  }\n  .explorer #explorer-content ul.overflow {\n    max-height: 100%;\n    width: 100%;\n  }\n  .explorer #explorer-content.collapsed {\n    transform: translateX(0);\n    visibility: visible;\n  }\n  .explorer #mobile-explorer {\n    margin: 5px;\n    z-index: 101;\n  }\n  .explorer #mobile-explorer:not(.collapsed) .lucide-menu {\n    transform: rotate(-90deg);\n    transition: transform 200ms ease-in-out;\n  }\n  .explorer #mobile-explorer .lucide-menu {\n    stroke: var(--darkgray);\n    transition: transform 200ms ease;\n  }\n  .explorer #mobile-explorer .lucide-menu:hover {\n    stroke: var(--dark);\n  }\n}\n\n.tag-explorer {\n  padding: 0.25rem 0;\n}\n\n.tag-category {\n  margin-bottom: 0.4rem;\n}\n\n.tag-category-header {\n  display: flex;\n  align-items: center;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0.15rem 0;\n  color: var(--secondary);\n  font-family: var(--headerFont);\n  font-size: 0.8rem;\n  font-weight: 600;\n  gap: 0.25rem;\n}\n.tag-category-header .tag-category-icon {\n  transition: transform 0.3s ease;\n  width: 10px;\n  height: 10px;\n  flex-shrink: 0;\n}\n.tag-category-header:hover {\n  color: var(--tertiary);\n}\n\n.tag-category-body {\n  display: grid;\n  grid-template-rows: 0fr;\n  transition: grid-template-rows 0.3s ease-in-out;\n}\n.tag-category-body.open {\n  grid-template-rows: 1fr;\n}\n.tag-category-body > .tag-pill-list {\n  overflow: hidden;\n}\n\n.tag-category:has(> .tag-category-body:not(.open)) > .tag-category-header .tag-category-icon {\n  transform: rotate(-90deg);\n}\n\n.tag-pill-list a.internal.tag-link.is-active {\n  color: var(--secondary);\n  font-weight: 600;\n  opacity: 1;\n}\n\n.tag-pill-list {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n  padding: 0.2rem 0 0.2rem 0.2rem;\n  margin: 0;\n}\n.tag-pill-list li {\n  margin: 0;\n}\n.tag-pill-list a.internal.tag-link {\n  font-size: 0.85rem;\n  padding: 0.15rem 0.4rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  white-space: nowrap;\n  background: none;\n}\n.tag-pill-list a.internal.tag-link .tag-count {\n  font-size: 0.7rem;\n  opacity: 0.45;\n  font-weight: normal;\n  margin-left: 0.1rem;\n}\n\n.no-scroll {\n  opacity: 0;\n  overflow: hidden;\n}\n\nhtml:has(.no-scroll) {\n  overflow: hidden;\n}\n\n@media all and not (max-width: 800px) {\n  .no-scroll {\n    opacity: 1 !important;\n    overflow: auto !important;\n  }\n  html:has(.no-scroll) {\n    overflow: auto !important;\n  }\n}';

// src/components/scripts/explorer.inline.ts
var explorer_inline_default = `var g,i="year",p=new IntersectionObserver(e=>{let t=document.getElementById("explorer-ul");if(t)for(let a of e)a.isIntersecting?t.classList.add("no-background"):t.classList.remove("no-background")});function y(){this.classList.toggle("collapsed"),this.setAttribute("aria-expanded",this.getAttribute("aria-expanded")==="true"?"false":"true");let e=this.nextElementSibling?.nextElementSibling?this.nextElementSibling.nextElementSibling:this.nextElementSibling;if(e&&(e.classList.toggle("collapsed"),e.classList.toggle("explorer-viewmode"),document.querySelector("#mobile-explorer"))){let t=document.querySelector("#quartz-body");t&&t.classList.toggle("lock-scroll")}}function u(e){e.stopPropagation();let t=e.target;if(!t)return;let a=t.nodeName==="svg",l=a?t.parentElement?.nextSibling:t.parentElement?.parentElement?.nextElementSibling,r=a?t.nextElementSibling:t.parentElement;if(!(l&&r))return;l.classList.toggle("open");let n=l.classList.contains("open");L(l,!n);let o=r.dataset.folderpath;T(g,o);let c=JSON.stringify(g);localStorage.setItem("fileTree",c)}function x(){let e=[];document.querySelectorAll(".tag-category").forEach(t=>{let a=t.querySelector(".tag-category-body"),l=t.querySelector(".tag-category-header span")?.textContent??"";a?.classList.contains("open")&&l&&e.push(l)}),localStorage.setItem("tag-categories-open",JSON.stringify(e))}function f(e){e.stopPropagation();let a=e.currentTarget.nextElementSibling;a&&a.classList.toggle("open"),x()}function h(e){i=e,localStorage.setItem("explorer-active-view",e),document.querySelectorAll(".explorer-tab").forEach(l=>{let r=l;r.dataset.view===e?r.classList.add("active"):r.classList.remove("active")});let t=document.querySelector("[data-explorer-view='year']"),a=document.querySelector("[data-explorer-view='tag']");t&&(t.style.display=e==="year"?"":"none"),a&&(a.style.display=e==="tag"?"":"none")}function E(){localStorage.getItem("explorer-active-view")==="tag"?i="tag":i="year";let t=document.querySelectorAll(".explorer > button");for(let n of t){let o=localStorage.getItem("fileTree"),c=n?.dataset.savestate==="true";if(n){if(n.dataset.behavior==="collapse")for(let d of document.getElementsByClassName("folder-button"))window.addCleanup(()=>d.removeEventListener("click",u)),d.addEventListener("click",u);window.addCleanup(()=>n.removeEventListener("click",y)),n.addEventListener("click",y)}for(let s of document.getElementsByClassName("folder-icon"))s.addEventListener("click",u),window.addCleanup(()=>s.removeEventListener("click",u));let S=o&&c?JSON.parse(o):[],v=new Map(S.map(s=>[s.path,s.collapsed])),b=n.dataset.tree?JSON.parse(n.dataset.tree):[];g=[];for(let{path:s,collapsed:d}of b)g.push({path:s,collapsed:v.get(s)??d});g.map(s=>{let m=document.querySelector(\`[data-folderpath='\${s.path.replace("'","-")}']\`)?.parentElement?.nextElementSibling;m&&L(m,s.collapsed)})}let a=document.querySelector("[data-explorer-view='year']"),l=document.querySelector("[data-explorer-view='tag']");a&&l&&(a.style.display=i==="year"?"":"none",l.style.display=i==="tag"?"":"none",document.querySelectorAll(".explorer-tab").forEach(n=>{let o=n;o.dataset.view===i?o.classList.add("active"):o.classList.remove("active")})),document.querySelectorAll(".explorer-tab").forEach(n=>{let o=n,c=()=>h(o.dataset.view);o.addEventListener("click",c),window.addCleanup(()=>o.removeEventListener("click",c))}),document.querySelectorAll(".tag-category-header").forEach(n=>{let o=n;o.addEventListener("click",f),window.addCleanup(()=>o.removeEventListener("click",f))});let r=JSON.parse(localStorage.getItem("tag-categories-open")??"[]");r.length>0&&document.querySelectorAll(".tag-category").forEach(n=>{let o=n.querySelector(".tag-category-header span")?.textContent??"",c=n.querySelector(".tag-category-body");c&&r.includes(o)&&c.classList.add("open")})}function M(){let e=(document.querySelector("body")?.getAttribute("data-slug")??"").replace(/\\/index$/g,"");document.querySelectorAll("[data-explorer-view='year'] .folder-outer").forEach(a=>{let l=Array.from(a.children).find(r=>r.matches("ul[data-folderul]"));l&&e.includes(l.getAttribute("data-folderul")??"")&&(a.classList.contains("open")||a.classList.add("open"))})}window.addEventListener("resize",E);document.addEventListener("nav",()=>{let e=document.querySelector("#mobile-explorer");if(e){e.classList.add("collapsed");let o=e.nextElementSibling?.nextElementSibling;o&&(o.classList.add("collapsed"),o.classList.toggle("explorer-viewmode"))}E(),p.disconnect();let t=document.getElementById("explorer-end");t&&p.observe(t),document.querySelector("#mobile-explorer")?.classList.remove("hide-until-loaded"),M();let l=(document.body?.dataset.slug??"").replace(/\\/$/,"");document.querySelectorAll("#explorer-content a.is-active").forEach(o=>o.classList.remove("is-active"));let r=document.querySelector(\`#explorer-content a[data-for='\${CSS.escape(l)}']\`);if(!r&&l.endsWith("index")){let o=l.replace(/\\/index$/,"");r=document.querySelector(\`#explorer-content a[data-for='\${CSS.escape(o)}']\`)}r&&(r.classList.add("is-active"),r.scrollIntoView({block:"nearest"}));let n=l.match(/^tags\\/(.+)$/);if(n){let o=document.querySelector(\`[data-explorer-view='tag'] a.tag-link[href$='/tags/\${CSS.escape(n[1])}']\`);o&&o.classList.add("is-active")}});function L(e,t){return t?e.classList.remove("open"):e.classList.add("open")}function T(e,t){let a=e.find(l=>l.path===t);a&&(a.collapsed=!a.collapsed)}
`;

// src/components/ExplorerNode.tsx
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
function clone(data) {
  return { ...data };
}
function getPathSegment(fp, idx) {
  if (!fp) {
    return void 0;
  }
  return fp.split("/").at(idx);
}
var FileNode = class _FileNode {
  children;
  name;
  // this is the slug segment
  displayName;
  file;
  depth;
  constructor(slugSegment, displayName, file, depth) {
    this.children = [];
    this.name = slugSegment;
    this.displayName = displayName ?? file?.frontmatter?.title ?? slugSegment;
    this.file = file ? clone(file) : null;
    this.depth = depth ?? 0;
  }
  insert(fileData) {
    if (fileData.path.length === 0) {
      return;
    }
    const nextSegment = fileData.path[0];
    if (fileData.path.length === 1) {
      if (nextSegment === "") {
        const title = fileData.file.frontmatter?.title;
        if (title && title !== "index") {
          this.displayName = title;
        }
      } else {
        this.children.push(new _FileNode(nextSegment, void 0, fileData.file, this.depth + 1));
      }
      return;
    }
    fileData.path = fileData.path.splice(1);
    const child = this.children.find((c) => c.name === nextSegment);
    if (child) {
      child.insert(fileData);
      return;
    }
    const newChild = new _FileNode(
      nextSegment,
      getPathSegment(fileData.file.relativePath, this.depth),
      void 0,
      this.depth + 1
    );
    newChild.insert(fileData);
    this.children.push(newChild);
  }
  // Add new file to tree
  add(file) {
    this.insert({ file, path: simplifySlug(file.slug).split("/") });
  }
  /**
   * Filter FileNode tree. Behaves similar to `Array.prototype.filter()`, but modifies tree in place
   * @param filterFn function to filter tree with
   */
  filter(filterFn) {
    this.children = this.children.filter(filterFn);
    this.children.forEach((child) => child.filter(filterFn));
  }
  /**
   * Filter FileNode tree. Behaves similar to `Array.prototype.map()`, but modifies tree in place
   * @param mapFn function to use for mapping over tree
   */
  map(mapFn) {
    mapFn(this);
    this.children.forEach((child) => child.map(mapFn));
  }
  /**
   * Get folder representation with state of tree.
   * Intended to only be called on root node before changes to the tree are made
   * @param collapsed default state of folders (collapsed by default or not)
   * @returns array containing folder state for tree
   */
  getFolderPaths(collapsed) {
    const folderPaths = [];
    const traverse = (node, currentPath) => {
      if (!node.file) {
        const folderPath = joinSegments(currentPath, node.name);
        if (folderPath !== "") {
          folderPaths.push({ path: folderPath, collapsed });
        }
        node.children.forEach((child) => traverse(child, folderPath));
      }
    };
    traverse(this, "");
    return folderPaths;
  }
  // Sort order: folders first, then files. Sort folders and files alphabetically
  /**
   * Sorts tree according to sort/compare function
   * @param sortFn compare function used for `.sort()`, also used recursively for children
   */
  sort(sortFn) {
    this.children = this.children.sort(sortFn);
    this.children.forEach((e) => e.sort(sortFn));
  }
};
var CATEGORY_ORDER = [
  "dev",
  "productivity",
  "knowledge-management",
  "essay",
  "writing",
  "science",
  "others"
];
function buildTagCategoryData(allFiles) {
  const categoryTagCounts = /* @__PURE__ */ new Map();
  for (const file of allFiles) {
    const tags = file.frontmatter?.tags ?? [];
    if (tags.length === 0) continue;
    const rawCategory = file.frontmatter?.category;
    const categories = Array.isArray(rawCategory) ? rawCategory : rawCategory ? [rawCategory] : ["others"];
    for (const category of categories) {
      if (!categoryTagCounts.has(category)) {
        categoryTagCounts.set(category, /* @__PURE__ */ new Map());
      }
      const tagCounts = categoryTagCounts.get(category);
      for (const tag of tags) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      }
    }
  }
  const sortedCategories = [...categoryTagCounts.keys()].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
  return sortedCategories.map((category) => {
    const tagCounts = categoryTagCounts.get(category);
    const tags = [...tagCounts.entries()].map(([name, count]) => ({ name, slug: slugTag(name), count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    return { category, tags };
  });
}
function ExplorerNode({ node, opts, fullPath, fileData, expandedYear }) {
  const folderBehavior = opts.folderClickBehavior;
  const isDefaultOpen = opts.folderDefaultState === "open";
  const isExpandedYear = expandedYear !== void 0 && node.name === expandedYear;
  const folderPath = node.name !== "" ? joinSegments(fullPath ?? "", node.name) : "";
  const href = resolveRelative(fileData.slug, folderPath) + "/";
  return /* @__PURE__ */ jsx(Fragment, { children: node.file ? (
    // Single file node
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: resolveRelative(fileData.slug, node.file.slug), "data-for": node.file.slug, children: node.displayName }) }, node.file.slug)
  ) : /* @__PURE__ */ jsxs("li", { children: [
    node.name !== "" && // Node with entire folder
    // Render svg button + folder name, then children
    /* @__PURE__ */ jsxs("div", { class: "folder-container", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "12",
          height: "12",
          viewBox: "5 8 14 8",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          class: "folder-icon",
          children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
        }
      ),
      /* @__PURE__ */ jsx("div", { "data-folderpath": folderPath, children: folderBehavior === "link" ? /* @__PURE__ */ jsx("a", { href, "data-for": node.name, class: "folder-title", children: node.displayName }) : /* @__PURE__ */ jsx("button", { class: "folder-button", children: /* @__PURE__ */ jsx("span", { class: "folder-title", children: node.displayName }) }) }, node.name)
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        class: `folder-outer ${node.depth === 0 || isDefaultOpen || isExpandedYear ? "open" : ""}`,
        children: /* @__PURE__ */ jsx(
          "ul",
          {
            style: {
              paddingLeft: node.name !== "" ? "1.4rem" : "0"
            },
            class: "content",
            "data-folderul": folderPath,
            children: node.children.map((childNode, i) => /* @__PURE__ */ jsx(
              ExplorerNode,
              {
                node: childNode,
                opts,
                fullPath: folderPath,
                fileData,
                expandedYear
              },
              i
            ))
          }
        )
      }
    )
  ] }) });
}

// src/components/Explorer.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "preact/jsx-runtime";
var defaultOptions = {
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: false,
  enableTagView: false,
  mapFn: (node) => {
    return node;
  },
  sortFn: (a, b) => {
    const aIsFolder = !a.file;
    const bIsFolder = !b.file;
    if (aIsFolder && bIsFolder) {
      return b.displayName.localeCompare(a.displayName, void 0, {
        numeric: true,
        sensitivity: "base"
      });
    }
    if (!aIsFolder && !bIsFolder) {
      const getPrimaryDate = (n) => n.file?.dates?.published ?? n.file?.dates?.created ?? n.file?.dates?.modified;
      const da = getPrimaryDate(a);
      const db = getPrimaryDate(b);
      if (da && db) {
        return db.getTime() - da.getTime();
      } else if (da && !db) {
        return -1;
      } else if (!da && db) {
        return 1;
      }
      return a.displayName.localeCompare(b.displayName, void 0, {
        numeric: true,
        sensitivity: "base"
      });
    }
    return aIsFolder ? -1 : 1;
  },
  filterFn: (node) => node.name !== "tags",
  order: ["filter", "map", "sort"]
};
var Explorer_default = ((userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  let fileTree;
  let jsonTree;
  let tagCategories;
  let expandedYear;
  let lastBuildId = "";
  function computeExpandedYear(tree) {
    const yearFolders = tree.children.filter((c) => !c.file && /^\d+$/.test(c.name)).map((c) => c.name);
    if (yearFolders.length === 0) return void 0;
    return yearFolders.sort(
      (a, b) => b.localeCompare(a, void 0, { numeric: true, sensitivity: "base" })
    )[0];
  }
  function constructFileTree(allFiles) {
    fileTree = new FileNode("");
    allFiles.forEach((file) => fileTree.add(file));
    if (opts.order) {
      for (let i = 0; i < opts.order.length; i++) {
        const functionName = opts.order[i];
        if (functionName === "map") {
          fileTree.map(opts.mapFn);
        } else if (functionName === "sort") {
          fileTree.sort(opts.sortFn);
        } else if (functionName === "filter") {
          fileTree.filter(opts.filterFn);
        }
      }
    }
    expandedYear = computeExpandedYear(fileTree);
    const folders = fileTree.getFolderPaths(opts.folderDefaultState === "collapsed");
    for (const folder of folders) {
      if (folder.path === expandedYear) {
        folder.collapsed = false;
      }
    }
    jsonTree = JSON.stringify(folders);
    if (opts.enableTagView) {
      tagCategories = buildTagCategoryData(allFiles);
    }
  }
  const Explorer = ({
    ctx,
    cfg,
    allFiles,
    displayClass,
    fileData
  }) => {
    const buildId = ctx?.buildId;
    if (buildId !== lastBuildId) {
      lastBuildId = buildId;
      constructFileTree(allFiles);
    }
    const baseDir = pathToRoot(fileData.slug);
    return /* @__PURE__ */ jsxs2("div", { class: classNames(displayClass, "explorer"), children: [
      /* @__PURE__ */ jsx2(
        "button",
        {
          type: "button",
          id: "mobile-explorer",
          class: "collapsed hide-until-loaded",
          "data-behavior": opts.folderClickBehavior,
          "data-collapsed": opts.folderDefaultState,
          "data-savestate": opts.useSavedState,
          "data-tree": jsonTree,
          "data-mobile": true,
          "aria-controls": "explorer-content",
          "aria-expanded": false,
          children: /* @__PURE__ */ jsxs2(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              class: "lucide lucide-menu",
              children: [
                /* @__PURE__ */ jsx2("line", { x1: "4", x2: "20", y1: "12", y2: "12" }),
                /* @__PURE__ */ jsx2("line", { x1: "4", x2: "20", y1: "6", y2: "6" }),
                /* @__PURE__ */ jsx2("line", { x1: "4", x2: "20", y1: "18", y2: "18" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs2(
        "button",
        {
          type: "button",
          id: "desktop-explorer",
          class: "title-button",
          "data-behavior": opts.folderClickBehavior,
          "data-collapsed": opts.folderDefaultState,
          "data-savestate": opts.useSavedState,
          "data-tree": jsonTree,
          "data-mobile": false,
          "aria-controls": "explorer-content",
          "aria-expanded": true,
          children: [
            /* @__PURE__ */ jsx2("h2", { children: opts.title ?? i18n(cfg.locale).components.explorer.title }),
            /* @__PURE__ */ jsx2(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "14",
                height: "14",
                viewBox: "5 8 14 8",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "fold",
                children: /* @__PURE__ */ jsx2("polyline", { points: "6 9 12 15 18 9" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs2("div", { id: "explorer-content", children: [
        opts.enableTagView && /* @__PURE__ */ jsxs2("div", { class: "explorer-tabs", children: [
          /* @__PURE__ */ jsx2("button", { class: "explorer-tab active", "data-view": "year", children: "\uC5F0\uB3C4" }),
          /* @__PURE__ */ jsx2("button", { class: "explorer-tab", "data-view": "tag", children: "\uD0DC\uADF8" })
        ] }),
        /* @__PURE__ */ jsx2("div", { "data-explorer-view": "year", children: /* @__PURE__ */ jsxs2("ul", { class: "overflow", id: "explorer-ul", children: [
          /* @__PURE__ */ jsx2(
            ExplorerNode,
            {
              node: fileTree,
              opts,
              fileData,
              expandedYear
            }
          ),
          /* @__PURE__ */ jsx2("li", { id: "explorer-end" })
        ] }) }),
        opts.enableTagView && /* @__PURE__ */ jsx2("div", { "data-explorer-view": "tag", style: "display:none", children: /* @__PURE__ */ jsx2("div", { class: "tag-explorer", children: tagCategories.map((cat) => /* @__PURE__ */ jsxs2("div", { class: "tag-category", children: [
          /* @__PURE__ */ jsxs2("button", { class: "tag-category-header", type: "button", children: [
            /* @__PURE__ */ jsx2(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "10",
                height: "10",
                viewBox: "5 8 14 8",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "tag-category-icon",
                children: /* @__PURE__ */ jsx2("polyline", { points: "6 9 12 15 18 9" })
              }
            ),
            /* @__PURE__ */ jsx2("span", { children: cat.category })
          ] }),
          /* @__PURE__ */ jsx2("div", { class: "tag-category-body", children: /* @__PURE__ */ jsx2("ul", { class: "tag-pill-list", children: cat.tags.map((t) => /* @__PURE__ */ jsx2("li", { children: /* @__PURE__ */ jsxs2("a", { href: `${baseDir}/tags/${t.slug}`, class: "internal tag-link", children: [
            t.name,
            /* @__PURE__ */ jsx2("span", { class: "tag-count", children: t.count })
          ] }) })) }) })
        ] })) }) })
      ] })
    ] });
  };
  Explorer.css = explorer_default;
  Explorer.afterDOMLoaded = explorer_inline_default;
  return Explorer;
});
export {
  Explorer_default as Explorer
};
