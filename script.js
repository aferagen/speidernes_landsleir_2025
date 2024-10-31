const mapEl = document.getElementById("mapEl");

mapEl.addEventListener("arcgisViewReadyChange", () => {
  const { title, thumbnailUrl, snippet, modified, tags } = mapEl.map.portalItem;
  //document.getElementById("app-heading").heading = `${title} Explorer`;
  document.getElementById("app-heading").heading = `${title}`;
  document.getElementById("card-heading").innerHTML = title;
  document.getElementById("card-thumbnail").src = thumbnailUrl;
  document.getElementById("card-description").innerHTML = `<p>${snippet}</p><p>Last modified on ${modified}.</p>`;
  tags.forEach(tag => {
    document.getElementById("card-tags").innerHTML += `<calcite-chip>${tag}</calcite-chip>`;
  });

  document.querySelector("calcite-loader").hidden = true;
  document.getElementById("app-heading").removeAttribute("hidden");

});

let activeWidget;
const handleActionBarClick = ({ target }) => {
  if (target.tagName !== "CALCITE-ACTION") {
    return;
  }
  if (activeWidget) {
    document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
    document.querySelector(`[data-block-id=${activeWidget}]`).hidden = true;
  }
  const nextWidget = target.dataset.actionId;
  if (nextWidget !== activeWidget) {
    document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
    document.querySelector(`[data-block-id=${nextWidget}]`).hidden = false;
    activeWidget = nextWidget;
  } else {
    activeWidget = null;
  }
};

document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);
