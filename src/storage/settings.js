import { defineStorage } from "./base";

export let [ getSettings, setSettings ] = defineStorage( 'TinyGrail_settings', {
  "pre_temple": "on",
  "hide_grail": "off",
  "auction_num": "one",
  "merge_order": "off",
  "get_bonus": "on",
  "gallery": "off",
  "auto_fill_temple": "off"
} );
