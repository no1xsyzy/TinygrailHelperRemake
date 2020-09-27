import { formatNumber } from '../formats';

export default function renderBadge( item, withCrown, withNew, withLevel ) {
  let badge = '';

  if ( withLevel ) {
    badge = `<span class="badge level lv${item.Level}">lv${item.Level}</span>`;
  }
  if ( item.Type == 1 && withNew ) {
    badge += `<span class="badge new" title="+${formatNumber(item.Rate, 1)}新番加成剩余${item.Bonus}期">×${item.Bonus}</span>`;
  }
  if ( item.State > 0 && withCrown ) {
    badge += `<span class="badge crown" title="获得${item.State}次萌王">×${item.State}</span>`;
  }
  return badge;
}
