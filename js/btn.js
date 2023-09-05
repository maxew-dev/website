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
        window.location = "/page1.html";
    });



}

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
    setTimeout(randomNotification, 30000);
}

