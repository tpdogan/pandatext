import consumer from "./consumer"

const cageChannel = consumer.subscriptions.create("CageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const history = document.getElementById('text-history')
    history.insertAdjacentHTML('beforeend', this.template(data))
    history.scrollTop = history.scrollHeight
  },

  template(data) {
    const main = data['text']['body']
    return `<div class='report'>
              <div class='tale'>${main}</div>
            </div>`
  }
});

document.addEventListener('turbolinks:load', () => {
  const form = document.getElementById('text-form')
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const text = document.getElementById('text-input').value
      if (text != '') {
        const message = {
          body: text
        }
        document.getElementById('text-input').value = ''
        cageChannel.send({text: message})
      }
    })
  }
})