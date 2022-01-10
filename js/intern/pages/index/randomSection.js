/* properties for random section */
var getProductButton = document.getElementById("getProductButton");
var productPicture = document.getElementsByTagName("productPicture")[0];
var metadata = document.getElementsByTagName("metadata")[0];

/* EventListener */
getProductButton.addEventListener("click", function () {
  if (!getProductButton.disabled) {
    showLoader();
    innerRandomProduct(getProductStartsWith.value);
  }
  getProductButton.disabled = true;
});

function innerRandomProduct(startWith = null) {
  let url = csApiEndpoint + "/v1/product";
  if (startWith) {
    url = url + "?startsWith=" + startWith;
  }
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (!json.error) {
        innerPicture(json);
        innerMetadata(json);
      } else {
        productPicture.innerHTML = JSON.stringify(json);
      }
    })
    .catch((err) => {
      console.log(err);
      productPicture.innerHTML = err;
    })
    .finally(() => {
      getProductButton.disabled = false;
    });
}

function innerPicture(json) {
  productPicture.innerHTML = "<img src='" + json.mainImageUrl + "'/>";
}

function innerMetadata(json) {
  metadata.innerHTML = "";
  metadata.innerHTML =
    metadata.innerHTML + `<metadataItem>Id: ${json.id}</metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML +
    `<metadataItem>LocalId: ${json.localId}</metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML + `<metadataItem>Pos: ${json.pos}</metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML + `<metadataItem>Name: ${json.name}</metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML +
    `<metadataItem>Other Name: ${json.typeName}</metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML +
    `<metadataItem>Description: ${json.mainImageAlt}</metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML +
    `<metadataItem>Price: ${json.priceNumeral} EUR</metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML +
    `<metadataItem>Shop: <a target="_blank" href="${json.pipUrl}">buy</a></metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML +
    `<metadataItem small>Number ${json.apiData.random} out of ${json.apiData.results} item(s) was selected</metadataItem>`;
  metadata.innerHTML =
    metadata.innerHTML +
    `<metadataItem small>*We take no responsibility for the topicality, correctness and completeness of the information.</metadataItem>`;
}

function showLoader() {
  productPicture.innerHTML = "<div class='csLoader'/>";
}
