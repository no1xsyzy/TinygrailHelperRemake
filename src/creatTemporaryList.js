import $ from 'jquery'
import { postData } from './api.js'
import { getFollowList, setFollowList } from './storage/followList'
import { closeDialog } from './closeDialog'
import { loadFollowChara } from './loadFollowChara'
import { loadTemperaryList } from './loadTemperaryList'
import { charasList, setCharasList } from './charasList'
import { autoJoinICO } from './autoJoinICO'
import { joinAuctions } from './joinAuctions'
import { loadFollowAuction } from './loadFollowAuction'

const dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<div class="bibeBox" style="padding:10px">
<label>在超展开左边创建角色列表 请输入角色url或id，如 https://bgm.tv/character/29282 或 29282，一行一个</label>
<textarea rows="10" class="quick" name="urls"></textarea>
<input class="inputBtn" value="创建列表" id="submit_list" type="submit" style="padding: 3px 5px;">
<input class="inputBtn" value="关注角色" id="add_follow" type="submit" style="padding: 3px 5px;">
<input class="inputBtn" value="关注竞拍" id="add_auction" type="submit" style="padding: 3px 5px;">
<input class="inputBtn" value="参与竞拍" id="join_auction" type="submit" style="padding: 3px 5px;">
<input class="inputBtn" value="参与ICO" id="join_ico" type="submit" style="padding: 3px 5px;">
</div>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>
</div>`

function getCharasList () {
  const charasList = []
  const charas = $('.bibeBox textarea').val().split('\n')
  for (let i = 0; i < charas.length; i++) {
    try {
      const charaId = charas[i].match(/(character\/|crt\/)?(\d+)/)[2]
      charasList.push(charaId)
    } catch (e) {};
  }
  setCharasList(charasList)
}

export function creatTemporaryList (page) {
  closeDialog()

  $('body').append(dialog)
  $('#TB_closeWindowButton').on('click', closeDialog)
  $('#TB_overlay').on('click', closeDialog)
  $('#submit_list').on('click', () => {
    getCharasList()
    loadTemperaryList(1)
    closeDialog()
  })
  $('#add_follow').on('click', () => {
    const charasList = getCharasList()
    for (let i = 0; i < charasList.length; i++) {
      const followList = getFollowList()
      const charaId = charasList[i].toString()
      if (followList.charas.includes(charaId)) {
        followList.charas.splice(followList.charas.indexOf(charaId), 1)
        followList.charas.unshift(charaId)
      } else {
        followList.charas.unshift(charaId)
      }
      setFollowList(followList)
    }
    loadFollowChara(1)
    closeDialog()
  })

  $('#add_auction').on('click', () => {
    getCharasList()
    for (let i = 0; i < charasList.length; i++) {
      const followList = getFollowList()
      const charaId = charasList[i].toString()
      if (followList.auctions.includes(charaId)) {
        followList.auctions.splice(followList.auctions.indexOf(charaId), 1)
        followList.auctions.unshift(charaId)
      } else {
        followList.auctions.unshift(charaId)
      }
      setFollowList(followList)
    }
    loadFollowAuction(1)
    closeDialog()
  })

  $('#join_auction').on('click', () => {
    getCharasList()
    $('#eden_tpc_list ul').html('')
    loadTemperaryList(1)
    joinAuctions(charasList)
    closeDialog()
  })

  $('#join_ico').on('click', () => {
    getCharasList()
    postData('chara/list', charasList).then((d) => {
      autoJoinICO(d.Value)
      loadTemperaryList(1)
      closeDialog()
    })
  })
}
