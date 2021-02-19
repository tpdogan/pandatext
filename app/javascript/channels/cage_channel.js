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
    console.log(data)
    const name = data['animal']['name']
    const time = data['time']
    const main = data['text']
    const viewer = document.getElementById('current_animal').name
    const side = name == viewer ? 'right' : 'left'
    return `<div style="display: inline-block; width: 100%;">
              <div class='report-${side}'>
                <div class='fairy'>
                  <div class='name is-capitalized'>${name}</div>
                  <div class='time pl-4'>(${time})</div>
                </div>
                <div class='tale'>${main}</div>
              </div>
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
        document.getElementById('text-input').value = ''
        cageChannel.send({text: text})
      }
    })
  }
})