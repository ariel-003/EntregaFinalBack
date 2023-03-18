const socket = io();

let chatForm = document.getElementById('chatForm')

const handleSubmit = (evt, form) => {
    evt.preventDefault();
    let formData = new FormData(form);
    let obj = {}
    formData.forEach((value, key) => obj[key]=value);
    fetch('/chat', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => socket.emit('chat', response))
        .then(() => form.reset())
}

chatForm.addEventListener('submit', (e) => handleSubmit(e, e.target))

socket.on('Historial', data => {
    if (data.length > 0) {
        let chatHistory = document.getElementById('chatHistory')
        let html = ''
        data.forEach(msj => {
            html += `
            <div>
                <span class="span-email">${msj.email}</span>
                <span class="span-timestamp">[${msj.timestamp}]: </span>
                <span class="span-mensaje">${msj.mensaje}</span>
            </div>
            `
        })
        chatHistory.innerHTML = html
    }
})
