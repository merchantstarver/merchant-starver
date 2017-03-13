var host = "https://archive.today/?run=1&url=";
var enable=true;
archive = function (details){
    return {redirectUrl: host + details.url};
};
function setListener(){
    chrome.webRequest.onBeforeRequest.addListener(archive,
    {
        urls: [
            "*://www.salon.com/*",
            "*://www.buzzfeed.com/*",
            "*://www.huffingtonpost.com/*",
            "*://www.cnn.com/*",
            "*://www.nytimes.com/*",
            "*://www.politico.com/*",
            "*://www.washingtonpost.com/*"],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
    );
}
setListener();
chrome.browserAction.onClicked.addListener(function (tab) {
 enable = enable ? false : true;
 if(enable){
  setListener();
  chrome.browserAction.setIcon({ path: 'ON.png' });
 }else{
  if(chrome.webRequest.onBeforeRequest.hasListener(archive)) {
    chrome.webRequest.onBeforeRequest.removeListener(archive);
  }
  chrome.browserAction.setIcon({ path: 'OFF.png'});
 }
});