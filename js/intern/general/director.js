/* Parameters which has to defined for the page to work */
let pageSpecificScripts = [
  {
    "index.html": [
      "intern/pages/index/index.js",
      "intern/pages/index/randomSection.js",
    ],
    "imprint.html": ["intern/pages/imprint/imprint.js"],
    "privacy.html": ["intern/pages/privacy/privacy.js"],
  },
];

let csContent = document.getElementsByTagName("csContent")[0];
let dynamicallyLoadedScripts = document.getElementsByTagName(
  "dynamicallyloadedscripts"
)[0];
let directorFinishedEvent = new Event("directorFinishedEvent");

/* This function fully navigates including uri modification */

/* Keep in mind that navigate can use params or not */
function navigate(page, withGetParams = false) {
  if (withGetParams) {
    page = page + getExistingUrlParams();
  }
  window.history.pushState({ page }, `${page}`, `/${page}`);
  direct(page);
}

/* This inners the html of the requested page, it replaces all icons */
function direct(page) {
  let requestedUrl = "html/pages/" + page + ".html" + getRequestUrlParameter();
  console.log("PageRequest " + requestedUrl);
  $.get(requestedUrl, function (pageData) {
    csContent.innerHTML = pageData;
    dynamicallyLoadScript(page, function () {
      window.dispatchEvent(directorFinishedEvent);
    });
    feather.replace();
  });
}

/* This inserts the page specific javascripts */
function dynamicallyLoadScript(page, dispatched) {
  page = page.substring(0, page.length - window.location.search.length); // This removes the previous added search string
  dynamicallyLoadedScripts.innerHTML = "";
  let scripts = [];
  for (let a = 0; a < pageSpecificScripts.length; a++) {
    for (let extraPage in pageSpecificScripts[a]) {
      if (extraPage === page + ".html") {
        let extraPageScripts = pageSpecificScripts[a][extraPage];
        for (let e = 0; e < extraPageScripts.length; e++) {
          let extraScriptElement = document.createElement("script");
          extraScriptElement.src = "js/" + extraPageScripts[e];
          scripts.push(extraScriptElement);
        }
      }
    }
  }
  let loadedScripts = 0;
  let availableScripts = scripts.length;
  for (let a = 0; a < availableScripts; a++) {
    let script = scripts[a];
    dynamicallyLoadedScripts.appendChild(script);
    script.onload = function () {
      loadedScripts++;

      if (loadedScripts >= availableScripts) {
        dispatched();
      }
    };
  }
  scrollToTop();
}

/* This event listener listens for navigation actions */
window.addEventListener("popstate", function (event) {
  if (!event.state) {
    return;
  }
  let stateId = event.state.page;
  direct(stateId);
});

/* This function scrolls to top if a new pages was loaded */
function scrollToTop() {
  document.documentElement.scrollTop = 0;
}

/* this function adds presented url queries to the redirect url */
function getExistingUrlParams() {
  return window.location.search;
}

/* This function modifies the url back in order to get no other error messages doing e.g. subscription or contact form */
function resetUrlParameters() {
  window.history.pushState("", "", "/index");
}
