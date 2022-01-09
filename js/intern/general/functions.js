var contactDepartment = "support";
var contactSpacer = "@";
var contactDomain = "ika-namez.com";

/* function to simplify math random number */
function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}

/* This generated a random request id
    The Browser than thinks, a completely new page needs to be loaded -> cache */
function getRequestUrlParameter() {
  let requestId = randomInt(1, 999999);
  let requestParameter = "request";
  let requestUrlParameter = "?" + requestParameter + "=" + requestId;
  return requestUrlParameter;
}

/* function for Buttons setting the request style */
window.addEventListener("directorFinishedEvent", function () {
  HTMLDivElement.prototype.requestState = function (requesting) {
    if (requesting === true) {
      this.classList.add("requesting");
    } else if (requesting === false) {
      this.classList.remove("requesting");
    } else {
      return this.classList.contains("requesting");
    }
  };

  HTMLDivElement.prototype.resetRequestState = function () {
    if (this.requestState() === true) {
      this.classList.remove("requesting");
    }
  };
});
