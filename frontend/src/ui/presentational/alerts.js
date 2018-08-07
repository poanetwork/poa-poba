import sweetAlert2 from 'sweetalert2'

export function successAlert() {
  sweetAlert2({
    title: 'Bank account registration',
    html: 'Your bank account was successfully registered',
    type: 'success'
  })
}

export function errorAlert(msg = 'There was a problem registering your bank account') {
  sweetAlert2({
    title: 'Bank account registration',
    html: msg,
    type: 'error'
  })
}
