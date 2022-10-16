let enabled = false;
function settings() {
    if (enabled == true) {
        document.getElementById("settings").style.display = "none";
        enabled = false;
    } else {
        document.getElementById("settings").style.display = "block";
        enabled = true;
    }
}