function usageNotification() {

  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  if (!("Notification" in window)) {
    alert("Benachrichtigungen werden vom Browser nicht unterstützt");
  }
  else if (Notification.permission === "granted") {
    var notification = new Notification("Im Hintergrund werden Daten gesendet und empfangen. " +
        "Falls Sie mit einem Mobiltelefon online sind, beachten Sie dass eventuell Gebühren für Datendienste anfallen können.");
    if (navigator.vibrate) {
      navigator.vibrate([500, 500, 500]);
    }
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Im Hintergrund werden Daten gesendet und empfangen. " +
            "Falls Sie mit einem Mobiltelefon online sind, beachten Sie dass eventuell Gebühren für Datendienste anfallen können.");
          if (navigator.vibrate) {
              navigator.vibrate([500, 500, 500]);
          }
      }
    });
  }
}

$(document).ready(usageNotification);