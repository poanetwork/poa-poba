import sweetAlert2 from 'sweetalert2'

export function successAlert(msg = 'Your bank account was successfully registered') {
  sweetAlert2({
    title: 'Proof of Bank Account',
    html: msg,
    type: 'success'
  })
}

export function errorAlert(msg = 'There was a problem registering your bank account') {
  sweetAlert2({
    title: 'Proof of Bank Account',
    html: msg,
    type: 'error'
  })
}
