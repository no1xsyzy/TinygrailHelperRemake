import { formatNumber } from '../formats';

export default function renderCharacterDepth( chara ) {
  let depth = `<small class="raise">+${formatNumber(chara.Bids, 0)}</small><small class="fall">-${formatNumber(chara.Asks, 0)}</small><small class="even">${formatNumber(chara.Change, 0)}</small>`;
  return depth;
}
