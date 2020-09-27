import { formatNumber } from '../formats';

export default function renderCharacterTag( chara, item ) {
  let id = chara.Id;
  let flu = '--';
  let tclass = 'even';
  if ( chara.Fluctuation > 0 ) {
    tclass = 'raise';
    flu = `+${formatNumber(chara.Fluctuation * 100, 2)}%`;
  } else if ( chara.Fluctuation < 0 ) {
    tclass = 'fall';
    flu = `${formatNumber(chara.Fluctuation * 100, 2)}%`;
  }

  let tag = `<div class="tag ${tclass}" title="₵${formatNumber(chara.MarketValue, 0)} / ${formatNumber(chara.Total, 0)}">₵${formatNumber(chara.Current, 2)} ${flu}</div>`;
  return tag;
}
