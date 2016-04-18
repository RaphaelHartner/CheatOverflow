function usageNotification() {

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (!("Notification" in window)) {
        alert("Benachrichtigungen werden vom Browser nicht unterstützt");
    }
    else if (Notification.permission === "granted") {
        if (navigator.vibrate) {
            navigator.vibrate([500, 500, 500]);
        }

        var notification = new Notification("Im Hintergrund werden Daten gesendet und empfangen. " +
            "Falls Sie mit einem Mobiltelefon online sind, beachten Sie dass eventuell Gebühren für Datendienste anfallen können.");
    }
    else if (Notification.permission !== 'denied'){

        Notification.requestPermission(function (permission) {
            if (permission === "granted") {

                if (navigator.vibrate) {
                    navigator.vibrate([500, 500, 500]);
                }
                var notification = new Notification("Im Hintergrund werden Daten gesendet und empfangen. " +
                    "Falls Sie mit einem Mobiltelefon online sind, beachten Sie dass eventuell Gebühren für Datendienste anfallen können.");
            }
        });
    }
}

$(document).ready(usageNotification);