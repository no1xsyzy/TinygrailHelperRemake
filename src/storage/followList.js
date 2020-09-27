import { defineStorage } from "./base";

export let [ getFollowList, setFollowList ] = defineStorage( 'TinyGrail_followList', {
  "user": '',
  "charas": [],
  "auctions": []
} );
