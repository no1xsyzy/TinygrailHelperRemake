import { getAutoTempleList } from "./storage/autoTempleList";
import { autoBuildTemple } from "./autoBuildTemple";

export function autoTemple() {
  let autoTempleList = getAutoTempleList();
  if ( autoTempleList.length )
    autoBuildTemple( autoTempleList );
}
