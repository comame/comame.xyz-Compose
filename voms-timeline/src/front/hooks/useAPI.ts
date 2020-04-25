import { useState, useEffect } from 'react'
import { Video } from '../../API/YouTubeApiOptions/VideosAPIOptions'

export function useFetchVideos(): {
    videos: Video[],
    updateVideos: () => void,
    isFetching: boolean
} {
    const [ videos, setVideos ] = useState<Video[]>([])
    const [ willFetch, setWillFetch ] = useState<boolean>(true)
    const [ isFetching, setIsFetching ] = useState<boolean>(false)

    const fetchUpcomingStreams = async () => {
        setIsFetching(true)
        const _videos: Video[] = [{
            "kind": "youtube#video",
            "etag": "\"nxOHAKTVB7baOKsQgTtJIyGxcs8/aKNIXNb_009Kl0k915Q8oyYME7I\"",
            "id": "NYxhdaQK1VE",
            "snippet": {
             "publishedAt": "2020-04-23T09:10:14.000Z",
             "channelId": "UCajhBT4nMrg3DLS-bLL2RCg",
             "title": "【#8 バイオハザード４】アシュリーまた救出成功！【#voms_project 】",
             "description": "アシュリーとまた合流したよ！\n今度はエイム君お家に帰ってくるかな・・・？？\n\nピカミィだよ！いつも見てくれてありがとう！⚡\n楽しい！と思ったらチャンネル登録、高評価をおねがいします！🌩\nHey I'm Pikamee! If you like it, please hit the like button like a THUNDER!!⚡\n...oh and subscribe!!\n\n配信タグ：#pikatube\nファンアート：#pikart\n質問とか：#pikask\n推しマーク：⚡\n\n⚡YouTube：\nhttps://www.youtube.com/channel/UCajhBT4nMrg3DLS-bLL2RCg/featured\n⚡Twitter：\nhttps://twitter.com/amanopikamee\n\nママ鳥：\nhttps://www.youtube.com/channel/UCOl0Rfe3Erum2cP74y7Eayw\n\n⚡ピカミィとのお約束⚡\n・コメントでケンカは悲しいからみんなで楽しく遊ぼう！\nNot many rules, just respect each other in the chat dayo :3\n・変なコメントとかあっても無視しちゃおう🐛\nIf you find some weird comments, Please ignore it.\n・ピカの配信は大体日本語でたまに英語だよ！気軽にコメントしてね！\nMy streams are most of the time Japanese and sometimes English. I will respond in whichever language you type into the chat desune!\n・配信で関係のない他の配信者さんのお名前を出すのは控えましょう⚡\nPlease do not bring up other streamer names unless I talk about them.\n・関係のないお話はFree chatでたくさんお話ししよう！\nUse my free chat room to talk with other viewers. NO chit-chat b4 the stream starts pls.\n\n\n⚡あまりにも酷い人はピカの雷（NGリスト）が落ちます⚡\n⚡If someone can not follow rules, that person will get pikamee's thunder (BAN)⚡\n\nFree chat: \nhttps://youtu.be/NB11zj6Rrek\n\n\n応援＆見に来てくれてありがとう！ピカの配信を楽しんでくれたらうれしいな！⚡\nTHANK YOU FOR ALL YOUR SUPPORT!( ⸝⸝⸝ ᐢ ᵕ ᐢ ⸝⸝⸝ )\n\n・EDでお借りしたBGM＆効果音\n\nフリーBGM「リコ・マーチ」／作（編）曲 ： G-MIYA様\nhttps://youtu.be/5fgif6Pc3wA\n\nフリーBGM「ワクワクアリクイ」／作（編）曲 ： かずち様\nhttps://youtu.be/0oCnVSEBY3E\n\nピコン！・ファミコン風効果音：小森平 様\nhttps://taira-komori.jpn.org/\n\n-----------------------------------------------------------------------------------------\n\nTwitter: https://twitter.com/amanopikamee\nCheck out our latest info from here!: https://voms.net/",
             "thumbnails": {
              "default": {
               "url": "https://i.ytimg.com/vi/NYxhdaQK1VE/default.jpg",
               "width": 120,
               "height": 90
              },
              "medium": {
               "url": "https://i.ytimg.com/vi/NYxhdaQK1VE/mqdefault.jpg",
               "width": 320,
               "height": 180
              },
              "high": {
               "url": "https://i.ytimg.com/vi/NYxhdaQK1VE/hqdefault.jpg",
               "width": 480,
               "height": 360
              },
              "standard": {
               "url": "https://i.ytimg.com/vi/NYxhdaQK1VE/sddefault.jpg",
               "width": 640,
               "height": 480
              },
              "maxres": {
               "url": "https://i.ytimg.com/vi/NYxhdaQK1VE/maxresdefault.jpg",
               "width": 1280,
               "height": 720
              }
             },
             "channelTitle": "天野ピカミィ. Pikamee",
             "liveBroadcastContent": "none",
            },
            "contentDetails": {
             "duration": "PT3H39M5S",
            },
            "liveStreamingDetails": {
             "actualStartTime": "2020-04-23T04:00:36.501Z",
             "actualEndTime": "2020-04-23T07:40:19.000Z",
             "scheduledStartTime": "2020-04-23T04:00:00.000Z"
            }
           }, {
            "kind": "youtube#video",
            "etag": "\"nxOHAKTVB7baOKsQgTtJIyGxcs8/mpQxSHTQNtcPkeiCZfkHGPNmmbg\"",
            "id": "gWrScbWO79M",
            "snippet": {
             "liveBroadcastContent": "upcoming",
             "publishedAt": "2020-04-09T05:53:37.000Z",
             "channelId": "UC3vzVK_N_SUVKqbX69L_X4g",
             "title": "【フリーチャット】雑魚のたまり場【VOMS/緋笠トモシカ】",
             "description": "はじめまして！\nVOX MONSTERS、略してVOMSの緋笠トモシカです！\n\n暇なときの雑談等にみんなで仲良く利用してね\n誰でも閲覧可能な場所ということを忘れず、モラルやマナーを守って自由に楽しもう！\n暴言、喧嘩、ほかの方に迷惑をかけたりするようなことはやめよう！\n\nたまにトモシカものぞきに来るのだ\n\n\n▽ツイッター\nhttps://twitter.com/Tomoshika_H",
             "thumbnails": {
              "default": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/default_live.jpg",
               "width": 120,
               "height": 90
              },
              "medium": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/mqdefault_live.jpg",
               "width": 320,
               "height": 180
              },
              "high": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/hqdefault_live.jpg",
               "width": 480,
               "height": 360
              },
              "standard": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/sddefault_live.jpg",
               "width": 640,
               "height": 480
              },
              "maxres": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/maxresdefault_live.jpg",
               "width": 1280,
               "height": 720
              }
             },
             "channelTitle": "緋笠トモシカ - Tomoshika Hikasa -",
            },
            "player": {
             "embedHtml": "\u003ciframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/gWrScbWO79M\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
            },
            "liveStreamingDetails": {
             "scheduledStartTime": "2023-04-09T05:45:00.000Z",
            }
           }, {
                "kind": "youtube#video",
                "etag": "\"nxOHAKTVB7baOKsQgTtJIyGxcs8/bZZpzPKgTmvN2iSk_bsoDTfhXzo\"",
                "id": "RRuOEDlil18",
                "snippet": {
                 "publishedAt": "2020-04-22T17:52:44.000Z",
                 "channelId": "UCajhBT4nMrg3DLS-bLL2RCg",
                 "title": "【#7 バイオハザード４】いざ小島へ！【#voms_project 】",
                 "description": "アシュリーがまたとらわれた！\n今度はお城から小島に行くよ！\n\nサムネ絵：\n御園 薊（おその あざみ）様　( osono_OOO )\n\nピカミィだよ！いつも見てくれてありがとう！⚡\n楽しい！と思ったらチャンネル登録、高評価をおねがいします！🌩\nHey I'm Pikamee! If you like it, please hit the like button like a THUNDER!!⚡\n...oh and subscribe!!\n\n配信タグ：#pikatube\nファンアート：#pikart\n質問とか：#pikask\n推しマーク：⚡\n\n⚡YouTube：\nhttps://www.youtube.com/channel/UCajhBT4nMrg3DLS-bLL2RCg/featured\n⚡Twitter：\nhttps://twitter.com/amanopikamee\n\nママ鳥：\nhttps://www.youtube.com/channel/UCOl0Rfe3Erum2cP74y7Eayw\n\n⚡ピカミィとのお約束⚡\n・コメントでケンカは悲しいからみんなで楽しく遊ぼう！\nNot many rules, just respect each other in the chat dayo :3\n・変なコメントとかあっても無視しちゃおう🐛\nIf you find some weird comments, Please ignore it.\n・ピカの配信は大体日本語でたまに英語だよ！気軽にコメントしてね！\nMy streams are most of the time Japanese and sometimes English. I will respond in whichever language you type into the chat desune!\n・配信で関係のない他の配信者さんのお名前を出すのは控えましょう⚡\nPlease do not bring up other streamer names unless I talk about them.\n・関係のないお話はFree chatでたくさんお話ししよう！\nUse my free chat room to talk with other viewers. NO chit-chat b4 the stream starts pls.\n\n\n⚡あまりにも酷い人はピカの雷（NGリスト）が落ちます⚡\n⚡If someone can not follow rules, that person will get pikamee's thunder (BAN)⚡\n\nFree chat: \nhttps://youtu.be/NB11zj6Rrek\n\n\n応援＆見に来てくれてありがとう！ピカの配信を楽しんでくれたらうれしいな！⚡\nTHANK YOU FOR ALL YOUR SUPPORT!( ⸝⸝⸝ ᐢ ᵕ ᐢ ⸝⸝⸝ )\n\n・EDでお借りしたBGM＆効果音\n\nフリーBGM「リコ・マーチ」／作（編）曲 ： G-MIYA様\nhttps://youtu.be/5fgif6Pc3wA\n\nフリーBGM「ワクワクアリクイ」／作（編）曲 ： かずち様\nhttps://youtu.be/0oCnVSEBY3E\n\nピコン！・ファミコン風効果音：小森平 様\nhttps://taira-komori.jpn.org/\n\n-----------------------------------------------------------------------------------------\n\nTwitter: https://twitter.com/amanopikamee\nCheck out our latest info from here!: https://voms.net/",
                 "thumbnails": {
                  "default": {
                   "url": "https://i.ytimg.com/vi/RRuOEDlil18/default.jpg",
                   "width": 120,
                   "height": 90
                  },
                  "medium": {
                   "url": "https://i.ytimg.com/vi/RRuOEDlil18/mqdefault.jpg",
                   "width": 320,
                   "height": 180
                  },
                  "high": {
                   "url": "https://i.ytimg.com/vi/RRuOEDlil18/hqdefault.jpg",
                   "width": 480,
                   "height": 360
                  },
                  "standard": {
                   "url": "https://i.ytimg.com/vi/RRuOEDlil18/sddefault.jpg",
                   "width": 640,
                   "height": 480
                  },
                  "maxres": {
                   "url": "https://i.ytimg.com/vi/RRuOEDlil18/maxresdefault.jpg",
                   "width": 1280,
                   "height": 720
                  }
                 },
                 "channelTitle": "天野ピカミィ. Pikamee",
                 "liveBroadcastContent": "none",
                },
                "contentDetails": {
                 "duration": "PT1H43M",
                },
                "liveStreamingDetails": {
                 "actualStartTime": "2020-04-22T04:00:48.550Z",
                 "actualEndTime": "2020-04-22T05:44:36.000Z",
                 "scheduledStartTime": "2020-04-22T04:00:00.000Z"
                }
           },{
            "kind": "youtube#video",
            "etag": "\"nxOHAKTVB7baOKsQgTtJIyGxcs8/y-uLt7ROE4tL8V-G4h_Q2lT5eac\"",
            "id": "IirPUnts91k",
            "snippet": {
             "publishedAt": "2020-04-23T12:18:20.000Z",
             "channelId": "UCaFhsCKSSS821N-EcWmPkUQ",
             "title": "【お知らせ】少しお話ししよう【#voms_project】",
             "description": "これは磁富の配信内での話で他は他のルールを読みましょう。\n\n初めまして🧲\nVOX MONSTERS、略してVOMS所属の個人バーチャルYoutuber(Vtuber)　磁富モノエ(Jitomi Monoe)です。\n楽しい時間を増やして共有するを目標に頑張っていくから、よかったら立ち止まって覗いてみてほしい\n\n\n🧲マグネットリテラシー（注意事項）🧲\n\n・磁富の名前を他のチャンネル（同グループ内も含め）で無暗に出さないでください。\n（磁富から～、磁富はこうしてた等）\n\n・人を不快にさせるような発言はお控えください。\n（性的、暴力的、批判的な発言）\n\n・内輪ネタは他のチャンネルに出さないでください\n（磁富が○○してたよ等の伝書鳩行為、唯我独尊…等）\n\n・配信と関係のない人名や話題を出すのはお控えください\n（○○さんだ等のリスナー同士の絡み、○○っていう人はこうやってた等の他のチャンネルの話…等）\n\n上記の行動を発見した場合直ちにBANさせていただきますのでご容赦ください。（気を付けるんじゃぞ！！！）\n\n\n\n応援、チャンネル登録、通知オンしてくれると磁富がとっても嬉しくなるかも🧲\n\n\n▼チャンネル登録\nhttp://www.youtube.com/channel/UCaFhsCKSSS821N-EcWmPkUQ?sub_confirmation=1\n\n\n▼公式サイト（未稼働）\nhttps://voms.net/\n\n\n▼Twitter\nhttps://twitter.com/Jitomi_Monoe\n\n\n▼マシュマロ（リクエストや質問等）\nhttps://marshmallow-qa.com/jitomi_monoe?utm_medium=url_text&utm_source=promotion\n\n\n #バーチャルYoutuber #Vtuber #マグnet",
             "thumbnails": {
              "default": {
               "url": "https://i.ytimg.com/vi/IirPUnts91k/default.jpg",
               "width": 120,
               "height": 90
              },
              "medium": {
               "url": "https://i.ytimg.com/vi/IirPUnts91k/mqdefault.jpg",
               "width": 320,
               "height": 180
              },
              "high": {
               "url": "https://i.ytimg.com/vi/IirPUnts91k/hqdefault.jpg",
               "width": 480,
               "height": 360
              },
              "standard": {
               "url": "https://i.ytimg.com/vi/IirPUnts91k/sddefault.jpg",
               "width": 640,
               "height": 480
              },
              "maxres": {
               "url": "https://i.ytimg.com/vi/IirPUnts91k/maxresdefault.jpg",
               "width": 1280,
               "height": 720
              }
             },
             "channelTitle": "磁富モノエ",
             "liveBroadcastContent": "none",

            },
            "contentDetails": {
             "duration": "PT1H11M36S",
            },
            "liveStreamingDetails": {
             "actualStartTime": "2020-04-23T10:31:06.701Z",
             "actualEndTime": "2020-04-23T11:42:46.000Z",
             "scheduledStartTime": "2020-04-23T10:30:00.000Z"
            }
           }, {
            "kind": "youtube#video",
            "etag": "\"nxOHAKTVB7baOKsQgTtJIyGxcs8/pKYcYYN5DADyb-rRdmN39PxnOH4\"",
            "id": "rNvoRCBXKBw",
            "snippet": {
             "publishedAt": "2020-04-24T12:44:47.000Z",
             "channelId": "UCajhBT4nMrg3DLS-bLL2RCg",
             "title": "【#3 大神】桃を探してあっちこっち【#voms_project 】",
             "description": "桃はどこだ～～！！！！\n桃はないか～～～！！！！！！！\n\nサムネ絵：隅谷ナダテル様 ( @katasumi5o )\n\nピカミィだよ！いつも見てくれてありがとう！⚡\n楽しい！と思ったらチャンネル登録、高評価をおねがいします！🌩\nHey I'm Pikamee! If you like it, please hit the like button like a THUNDER!!⚡\n...oh and subscribe!!\n\n配信タグ：#pikatube\nファンアート：#pikart\n質問とか：#pikask\n推しマーク：⚡\n\n⚡YouTube：\nhttps://www.youtube.com/channel/UCajhBT4nMrg3DLS-bLL2RCg/featured\n⚡Twitter：\nhttps://twitter.com/amanopikamee\n\nママ鳥：\nhttps://www.youtube.com/channel/UCOl0Rfe3Erum2cP74y7Eayw\n\n⚡ピカミィとのお約束⚡\n・コメントでケンカは悲しいからみんなで楽しく遊ぼう！\nNot many rules, just respect each other in the chat dayo :3\n・変なコメントとかあっても無視しちゃおう🐛\nIf you find some weird comments, Please ignore it.\n・ピカの配信は大体日本語でたまに英語だよ！気軽にコメントしてね！\nMy streams are most of the time Japanese and sometimes English. I will respond in whichever language you type into the chat desune!\n・配信で関係のない他の配信者さんのお名前を出すのは控えましょう⚡\nPlease do not bring up other streamer names unless I talk about them.\n・ネタバレやあれしてこれしてなどの指示厨はやめてねえ！\nNo spoilers and do not force me to play the game in your way. sadly I'm not a pro gamer. I can't do it perfectly.\n・関係のないお話はFree chatでたくさんお話ししよう！\nUse my free chat room to talk with other viewers. NO chit-chat b4 the stream starts pls.\n\n\n⚡あまりにも酷い人はピカの雷（NGリスト）が落ちます⚡\n⚡If someone can not follow rules, that person will get pikamee's BAN thunder ⚡\n\nFree chat: \nhttps://youtu.be/NB11zj6Rrek\n\n\n応援＆見に来てくれてありがとう！ピカの配信を楽しんでくれたらうれしいな！⚡\nTHANK YOU FOR ALL YOUR SUPPORT!( ⸝⸝⸝ ᐢ ᵕ ᐢ ⸝⸝⸝ )\n\n・EDでお借りしたBGM＆効果音\n\nフリーBGM「リコ・マーチ」／作（編）曲 ： G-MIYA様\nhttps://youtu.be/5fgif6Pc3wA\n\nフリーBGM「ワクワクアリクイ」／作（編）曲 ： かずち様\nhttps://youtu.be/0oCnVSEBY3E\n\nピコン！・ファミコン風効果音：小森平 様\nhttps://taira-komori.jpn.org/\n\n-----------------------------------------------------------------------------------------\n\nTwitter: https://twitter.com/amanopikamee\nCheck out our latest info from here!: https://voms.net/",
             "thumbnails": {
              "default": {
               "url": "https://i.ytimg.com/vi/rNvoRCBXKBw/default.jpg",
               "width": 120,
               "height": 90
              },
              "medium": {
               "url": "https://i.ytimg.com/vi/rNvoRCBXKBw/mqdefault.jpg",
               "width": 320,
               "height": 180
              },
              "high": {
               "url": "https://i.ytimg.com/vi/rNvoRCBXKBw/hqdefault.jpg",
               "width": 480,
               "height": 360
              },
              "standard": {
               "url": "https://i.ytimg.com/vi/rNvoRCBXKBw/sddefault.jpg",
               "width": 640,
               "height": 480
              },
              "maxres": {
               "url": "https://i.ytimg.com/vi/rNvoRCBXKBw/maxresdefault.jpg",
               "width": 1280,
               "height": 720
              }
             },
             "channelTitle": "天野ピカミィ. Pikamee",
             "liveBroadcastContent": "none",

            },
            "contentDetails": {
             "duration": "PT2H5M13S",
            },
            "liveStreamingDetails": {
             "actualStartTime": "2020-04-24T10:00:09.577Z",
             "actualEndTime": "2020-04-24T12:05:46.000Z",
             "scheduledStartTime": "2020-04-24T10:00:00.000Z"
            }
           }, {
            "kind": "youtube#video",
            "etag": "\"nxOHAKTVB7baOKsQgTtJIyGxcs8/GTfolUXDBjgcqYkCzTCPguWIlRw\"",
            "id": "auZtIuHGxIc",
            "snippet": {
             "publishedAt": "2020-04-24T15:34:24.000Z",
             "channelId": "UC3vzVK_N_SUVKqbX69L_X4g",
             "title": "ンゴ",
             "description": "ンゴゴゴゴゴ",
             "thumbnails": {
              "default": {
               "url": "https://i.ytimg.com/vi/auZtIuHGxIc/default.jpg",
               "width": 120,
               "height": 90
              },
              "medium": {
               "url": "https://i.ytimg.com/vi/auZtIuHGxIc/mqdefault.jpg",
               "width": 320,
               "height": 180
              },
              "high": {
               "url": "https://i.ytimg.com/vi/auZtIuHGxIc/hqdefault.jpg",
               "width": 480,
               "height": 360
              },
              "standard": {
               "url": "https://i.ytimg.com/vi/auZtIuHGxIc/sddefault.jpg",
               "width": 640,
               "height": 480
              },
              "maxres": {
               "url": "https://i.ytimg.com/vi/auZtIuHGxIc/maxresdefault.jpg",
               "width": 1280,
               "height": 720
              }
             },
             "channelTitle": "緋笠トモシカ - Tomoshika Hikasa -",
             "liveBroadcastContent": "none",
            },
            "contentDetails": {
             "duration": "PT22S",
            }
           }]
        const videos: Video[] = await Promise.resolve(_videos)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setVideos([ ...videos ])
        setIsFetching(false)
    }

    useEffect(() => {
        fetchUpcomingStreams()
    }, [ willFetch ])

    const updateUpcomingStreams = () => {
        setWillFetch(prev => !prev)
    }

    return { videos, updateVideos: updateUpcomingStreams, isFetching }
}
