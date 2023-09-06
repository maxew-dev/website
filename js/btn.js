document.addEventListener("DOMContentLoaded", ()=>{
    initListeners();
})

function initListeners()
{
    document.getElementById("btnNotif").addEventListener("click", (ev)=>{
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
              showNotification();
            }
        });
    });


    document.getElementById("btnAccept").addEventListener("click", (ev)=>{
        window.location = "page1.html";
    });


    document.getElementById("btnInstall").addEventListener("click", async () =>{
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        logMessage(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
    });



}

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    // Optionally, send analytics event that PWA install promo was shown.
    logMessage(`'beforeinstallprompt' event was fired.`);
  });


function showNotification()
{
    const randomItem = Math.floor(Math.random() * 100);
    const notifTitle = "Mission n°" + randomItem;
    const notifBody = `Created by Max.`;
    const notifImg = `icons/icon72.png`;
    const options = {
        body: notifBody,
        icon: notifImg,
    };

    new Notification(notifTitle, options);
    //window.setTimeout(showNotification, 5000);
}

