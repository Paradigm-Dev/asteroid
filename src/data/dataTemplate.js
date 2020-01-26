export default {
  setup_completed: false,
  username: '',
  password: '',
  given_name: '',
  region: '',
  apps: {
    Calculator: {
      width: 500,
      color: 'rgba(72, 72, 72, .8)',
    },
    Contacts: {
      width: 600,
      color: 'rgba(72, 72, 72, .8)',
      contacts: [
        { name: 'Aidan Liddy' }
      ]
    },
    Satellite: {
      width: 1200,
      color: 'rgba(69, 90, 100, .8)',
    }
  }
}