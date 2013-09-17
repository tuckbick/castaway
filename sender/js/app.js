if (document.documentElement.hasAttribute('data-castaway-ext')) {
  document.documentElement.setAttribute('data-cast-api-enabled', 'true');
  var jquery = document.createElement('script');
  jquery.onload = function() {
    var page = document.createElement('script');
    page.src = chrome.extension.getURL('js/page.js');
    document.body.appendChild(page);
  }
  jquery.src = chrome.extension.getURL('js/jquery.min.js');
  document.body.appendChild(jquery);
}