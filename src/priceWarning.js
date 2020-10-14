import $ from 'jquery'
export function priceWarning () {
  const price = $('.bid .price').val()
  $('#bidButton').after('<button style="display:none" id="confirm_bidButton" class="active bid">买入</button>')
  $('.bid .price').on('input', function () {
    const priceNow = $('.bid .price').val()
    if (priceNow > Math.max(price * 3, 100)) {
      $('.bid .price').css({
        color: 'red'
      })
      $('#confirm_bidButton').show()
      $('#bidButton').hide()
    } else {
      $('#confirm_bidButton').hide()
      $('#bidButton').show()
      $('.bid .price').css({
        color: 'inherit'
      })
    }
  })
  $('#confirm_bidButton').on('click', function () {
    const price = $('.bid .price').val()
    const amount = $('.bid .amount').val()
    if (!confirm(`买入价格过高提醒！\n确定以${price}的价格买入${amount}股？`)) {
      return
    }
    $('#bidButton').click()
  })
}
