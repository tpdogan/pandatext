import consumer from './consumer'

const idFinder = () => {
  const url = document.URL
  const index = url.indexOf('id') + 3
  const id = index == 2 ? 0 : url.substr(index)
  return id
}

const cageChannel = consumer.subscriptions.create(
  {
    channel: 'CageChannel',
    id: idFinder()
  },
  {
    connected() {
      console.log('connected')
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
      const json = JSON.parse(data)
      const name = json['sender']
      const time = json['time']
      const main = json['body']
      const viewer = document.getElementById('current_animal').name
      const side = name == viewer ? 'right' : 'left'
      return `<div style='display: inline-block; width: 100%;'>
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
/*
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
*/
document.addEventListener("turbolinks:load", () => {
  const history = document.getElementById('text-history')
  history.scrollTop = history.scrollHeight

  const sender = document.getElementById('message-send')
  const input = document.getElementById('anthropotext_body')
  sender.addEventListener('click', () => {
    setTimeout(() => { input.value = '' }, 100)
  })
})