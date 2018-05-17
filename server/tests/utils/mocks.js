const data = {
  exchangePublicToken: {
    access_token: 'access-sandbox-de3ce8ef-33f8-452c-a685-8671031fc0f6',
    item_id: 'M5eVJqLnv3tbzdngLDp9FL5OlDNxlNhlE55op',
    request_id: 'Aim3b',
    status_code: 200
  },
  exchangePublicTokenError: {
    display_message: null,
    error_code: 'INVALID_PUBLIC_TOKEN',
    error_message: 'provided public token is in an invalid format',
    error_type: 'INVALID_INPUT',
    request_id: 'qcaHi',
    status_code: 400
  },
  getAuth: {
    accounts: [
      {
        account_id: 'vzeNDwK7KQIm4yEog683uElbp9GRLEFXGK98D',
        balances: {
          available: 100,
          current: 110,
          limit: null
        },
        mask: '0000',
        name: 'Plaid Checking',
        official_name: 'Plaid Gold Checking',
        subtype: 'checking',
        type: 'depository'
      }
    ],
    numbers: [
      {
        account: '9900009606',
        account_id: 'vzeNDwK7KQIm4yEog683uElbp9GRLEFXGK98D',
        routing: '011401533',
        wire_routing: '021000021'
      }
    ],
    item: { Object },
    request_id: '45QSn',
    status_code: 200
  },
  getAuthError: {
    display_message: null,
    error_code: 'NOT_FOUND',
    error_message: 'Accounts not found',
    error_type: 'INVALID_REQUEST',
    request_id: 'qcaHk',
    http_code: 404
  }
}

module.exports = data
