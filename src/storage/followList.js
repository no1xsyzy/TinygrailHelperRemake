import { defineStorage } from './base'

export const [getFollowList, setFollowList] = defineStorage('TinyGrail_followList', {
  user: '',
  charas: [],
  auctions: []
})
