

var APP_ID = '';
console.log('page')

var cast_api_ready, cast_api, cv_activity;

// Wait for API to post a message to us
window.addEventListener("message", function(event) {
  if (event.source == window && event.data && 
    event.data.source == "CastApi" &&
    event.data.event == "Hello")
    cast_api_ready = true;
});

var onLaunch = function(activity, cb) {
  if (activity.status == "running") {
    cv_activity = activity;
    cb();
  } else if (activity.status == "error") {
    cv_activity = null;
    console.error("error", activity);
  }
}

var init = function(cb) {
  cast_api = new cast.Api();
  //could not get a receiver to popup in the receiverList using my APP ID to using "YouTube" works just fine
  cast_api.addReceiverListener("YouTube", function(list) {
    if (!list.length) return;
    var request = new cast.LaunchRequest(APP_ID, list[0]);
    cast_api.launch(request, function(activity) {
      onLaunch(activity, cb);
    });
  });
}

var cast = function(cb) {
  cv_activity ? cb() : init(cb);
}

var sendImage = function(src) {
  var data = {"src": src};
  cast_api.sendMessage(cv_activity.activityId, "castaway", data)
}

$(document).on('click', 'img', function(e) {
  if (!e.metaKey) return true;
  cast(function() {
    sendImage(e.target.src);
  })
})