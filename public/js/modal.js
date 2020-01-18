function sendAlert(msg) {
    let modal = document.querySelector('.modal');
    modal.style.display = "block"
    document.querySelector(".modal-body").innerHTML = msg;
}

document.querySelector('span.close').onclick = function() {
    let modal = document.querySelector('.modal');
    modal.style.display = "none"
}

window.onclick = event => {
    let modal = document.querySelector('.modal');

    if(event.target == modal) {
      modal.style.display = "none"
    }
}