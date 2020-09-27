import { formatNumber, formatTime } from '../formats';

export function renderBalanceLog( item, even ) {
  var line = 'line_odd';
  if ( even )
    line = 'line_even';

  var change = '';
  if ( item.Change > 0 )
    change = `<span class="tag raise large">+₵${formatNumber(item.Change, 2)}</span>`;
  else if ( item.Change < 0 )
    change = `<span class="tag fall large">-₵${formatNumber(Math.abs(item.Change), 2)}</span>`;

  var amount = '';
  if ( item.Amount > 0 )
    amount = `<span class="tag new large">+${formatNumber(item.Amount, 0)}</span>`;
  else if ( item.Amount < 0 )
    amount = `<span class="tag even large">${formatNumber(item.Amount, 0)}</span>`;

  var id = '';
  if ( item.Type === 4 || item.Type === 5 || item.Type === 6 ) {
    id = `data-id="${item.RelatedId}"`;
  }

  var log = `<li class="${line} item_list item_log" ${id}>
                <div class="inner">₵${formatNumber(item.Balance, 2)}
                  <small class="grey">${formatTime(item.LogTime)}</small>
                  <span class="row"><small class="time">${item.Description}</small></span>
                </div>
                <span class="tags">
                  ${change}
                  ${amount}
                </span>
              </li>`;
  return log;
}
