var utils = window["optimizely"].get("utils");

// waituntil drift is defined on the page
utils.waitUntil(function() {
  return (typeof(drift) !== 'undefined');
}).then(function() {
  drift.on('ready',function(api, payload) {

    // clicked default conversation response buttons in drift
    window.drift.on("conversation:buttonClicked", function(data) {
      console.log("user clicked a button with text: " + data.buttonBody);
      window['optimizely'].push({
        type: "event",
        eventName: "drift_convo_btn_click"
      });
    });

    // first interaction with playbook tracking
    // response in text box or text button click
    window.drift.on("conversation:firstInteraction", function(data) {
      console.log("First interaction: " + JSON.stringify(data));
       window['optimizely'].push({
        type: "event",
        eventName: "drift_first_convo"
      });
    });

    // user closes side bar
    window.drift.on('sidebarClose', function (e) {
       console.log('sidebar close', JSON.stringify(e));

       // set session storage to not re-activate drift in same session
       sessionStorage.setItem(“drift_sidebar_close”, “clicked”)

       window['optimizely'].push({
        type: "event",
        eventName: "drift_sidebar_close"
      });
    });

    // user re-opens sidebar
     window.drift.on('sidebarOpen', function (e) {
       console.log('sidebar open', JSON.stringify(e));
        window['optimizely'].push({
        type: "event",
        eventName: "drift_sidebar_open"
      });
     });

    // email captured
    window.drift.on("emailCapture", function(e) {
      console.log("user identified as: " + e);
       window['optimizely'].push({
        type: "event",
        eventName: "drift_email_capture"
      });
    });

    // meeting booked
    window.drift.on("scheduling:meetingBooked", function(data) {
      console.log("user booked a meeting with " + data.teamMember.name);
       window['optimizely'].push({
        type: "event",
        eventName: "drift_meeting_booked"
      });
    });
  });
});
