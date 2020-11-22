from app.utils.extractors import (
    extract_top_mention,
    extract_top_follower,
    extract_summary
)


def test_extract_top_mention():
    # We test the success request status
    input_top_mention = {'top_mention': {'html': '<div class="home-panel typed organic">\n  <div '
                                                 'class="home-panel-content">\n    <h2 '
                                                 'class="home-panel-title">Top mention\n      <small>\n   '
                                                 '     earned 33 engagements\n      </small>\n    </h2>\n '
                                                 ' </div>\n  <div class="home-panel-content">\n      <div '
                                                 'class="tweet-container">\n  <a '
                                                 'href="https://twitter.com/sanixdarker" '
                                                 'target="_blank">\n    <img class="tweet-avatar" '
                                                 'src="https://pbs.twimg.com/profile_images'
                                                 '/1310698801066319873/J5-h12Rk_reasonably_small.jpg" '
                                                 '/>\n  </a>\n  <div class="tweet-details">\n      <a '
                                                 'class="tweet-profile-link" '
                                                 'href="https://twitter.com/sanixdarker" '
                                                 'target="_blank">\n        <span class="tweet-name"\n    '
                                                 '      \n          dir="ltr">d4rk3r</span>\n        '
                                                 '<span class="tweet-screen-name" '
                                                 'dir="ltr">@sanixdarker</span>\n      </a>\n        '
                                                 '<span class="tweet-created-at">\n          <a '
                                                 'href="https://twitter.com/sanixdarker/status'
                                                 '/1322848604902535170" target="_blank">Nov 1</a>\n       '
                                                 ' </span>\n\n    <span\n      \n      dir="ltr"\n      '
                                                 'class="tweet-text"><a '
                                                 'href="https://twitter.com/abdounasser202" '
                                                 'target="_blank" class="twitter-atreply pretty-link '
                                                 'js-nav" dir="ltr" '
                                                 'data-mentioned-user-id="888910995422359553" >@<b '
                                                 'class="p-nickname">abdounasser202</b></a> <a '
                                                 'href="https://twitter.com/gabriel_TheCode" '
                                                 'target="_blank" class="twitter-atreply pretty-link '
                                                 'js-nav" dir="ltr" '
                                                 'data-mentioned-user-id="830767782623059968" >@<b '
                                                 'class="p-nickname">gabriel_TheCode</b></a> <a '
                                                 'href="https://twitter.com/caparledev" target="_blank" '
                                                 'class="twitter-atreply pretty-link js-nav" dir="ltr" '
                                                 'data-mentioned-user-id="1205602583227838465" >@<b '
                                                 'class="p-nickname">caparledev</b></a> C&#39;est finit '
                                                 'mdrrr <a href="https://t.co/yCKPQNOeBV" target="_blank" '
                                                 'class="twitter-timeline-link" data-pre-embedded="true" '
                                                 'dir="ltr" >pic.twitter.com/yCKPQNOeBV</a></span>\n  '
                                                 '</div>\n</div>\n\n        <a '
                                                 'href="https://twitter.com/sanixdarker/status'
                                                 '/1322848604902535170" target="_blank">\n          '
                                                 '\n<div class="tweet-media-container js-media-container '
                                                 'modal-tweet">\n  <div class="cards-base '
                                                 'cards-multimedia">\n      <div class="multi-photos '
                                                 'photos-1">\n          <div class="multi-photo photo-1 '
                                                 'media-thumbnail twitter-timeline-link" '
                                                 'data-url="https://pbs.twimg.com/media/Eluzy0vXIAIcmEz'
                                                 '.jpg:large" '
                                                 'data-resolved-url-large="https://pbs.twimg.com/media'
                                                 '/Eluzy0vXIAIcmEz.jpg:large">\n            <img '
                                                 'src="https://pbs.twimg.com/media/Eluzy0vXIAIcmEz.jpg'
                                                 ':large"  style="top: -41.988953%; width: 100%; height: '
                                                 'auto;">\n          </div>\n      </div>\n  '
                                                 '</div>\n</div>\n        </a>\n      <div '
                                                 'class="tweet-metrics-container">\n    <span '
                                                 'class="tweet-metric"><span class="Icon '
                                                 'Icon--reply"></span> 2</span>\n  <span '
                                                 'class="tweet-metric">\n    <span class="Icon '
                                                 'Icon--heart"></span>\n    1\n  </span>\n</div>\n\n  '
                                                 '</div>\n  <div class="home-panel-footer">\n      <a '
                                                 'class="view-tweet-link" '
                                                 'href="https://twitter.com/sanixdarker/status'
                                                 '/1322848604902535170" target="_blank">View Tweet</a>\n  '
                                                 '</div>\n</div>\n'}}

    output_top_mention = {
            'engagements': '33',
            'user': {
                'avatar': 'https://pbs.twimg.com/profile_images/1310698801066319873/J5-h12Rk_reasonably_small.jpg',
                'href': 'https://twitter.com/sanixdarker',
                'name': 'd4rk3r',
                'sreen-name': '@sanixdarker'
            }, 'href': 'https://twitter.com/sanixdarker/status/1322848604902535170',
            'tweet': "@abdounasser202 @gabriel_TheCode @caparledev C'est finit mdrrr pic.twitter.com/yCKPQNOeBV",
            'metrics': {
                'comments': '2',
                'likes': '1'
            }
    }

    assert extract_top_mention(input_top_mention) == output_top_mention


def test_extract_top_follower():
    # We test the success request status
    input_top_follower = {'top_follower': {
        'html': '<div class="home-panel organic">\n  <div class="home-panel-content">\n    <h2 '
                'class="home-panel-title">Top Follower\n      <small>\n        followed by 51.6K people\n      '
                '</small>\n    </h2>\n  </div>\n  <div class="home-panel-content wide">\n    \n\n<div '
                'class="profile-card">\n  <a class="profile-card-bg" href="https://twitter.com/ctricot" '
                'target="_blank" style="\n    background-color: #1B1E1C;\n    background-image: url('
                'https://pbs.twimg.com/profile_banners/16663249/1595343909/600x200);">\n  </a>\n\n  <div '
                'class="profile-card-content">\n    <a class="profile-card-avatar-link" '
                'href="https://twitter.com/ctricot" target="_blank" title="Christophe Tricot">\n      <img '
                'class="profile-card-avatar-image" '
                'src="https://pbs.twimg.com/profile_images/959784798591045632/X3D3D18-_bigger.jpg" alt="">\n    '
                '</a>\n\n    <div class="profile-card-user-fields">\n      <div class="profile-card-name">\n        '
                '<div class="">\n          <a class="profile-card-name-link" href="https://twitter.com/ctricot" '
                'target="_blank"\n            \n            dir="ltr">Christophe Tricot</a>\n        </div>\n      '
                '</div>\n\n      <div class="profile-card-screenname">\n        <a href="https://twitter.com/ctricot" '
                'target="_blank" class="profile-card-screenname-link" dir="ltr">@<span>ctricot</span></a>\n        '
                '<span class="profile-card-follows-status">follows you</span>\n      </div>\n\n      <p '
                'class="profile-card-bio"\n        \n        dir="ltr">CEO <a href="https://twitter.com/LaForge_AI" '
                'target="_blank" class="tweet-url twitter-atreply pretty-link" dir="ltr" data-mentioned-user-id="0" '
                'rel="nofollow" ><s>@</s><b>LaForge_AI</b></a> &amp; <a '
                'href="https://twitter.com/hashtag/ArtificialIntelligence?src=hash" target="_blank" '
                'data-query-source="hashtag_click" class="twitter-hashtag pretty-link js-nav" dir="ltr" '
                '><s>#</s><b>ArtificialIntelligence</b></a> Expert (PhD)\n</p>\n    </div>\n  </div>\n</div>\n\n  '
                '</div>\n  <div class="home-panel-footer">\n    \n    <a class="view-profile-link" '
                'href="https://twitter.com/ctricot/" target="_blank">View profile</a>\n  </div>\n</div>\n'}}

    output_top_follower = {
        'top_follower': {
            'followed_by': '51.6K',
            'user': {
                'href': 'https://twitter.com/ctricot',
                'username': 'Christophe Tricot',
                'avatar': 'https://pbs.twimg.com/profile_images/959784798591045632/X3D3D18-_bigger.jpg',
                'bio': 'CEO @LaForge_AI & #ArtificialIntelligence Expert (PhD)\n'
            }
        }
    }

    assert extract_top_follower(input_top_follower) == output_top_follower


def test_extract_summary():
    # We test the success request status
    input_summary = {'page_summary': {'html': '<div class="home-pagesummary">\n\n\n  <div class="home-summary-metric '
                                              'col-md-6">\n    <div class="DataPoint DataPoint--withBottomBorder">\n  '
                                              '    <h3 class="DataPoint-label">Profile visits</h3>\n      <div '
                                              'class="DataPoint-info metric-profile-views">194</div>\n    </div>\n  '
                                              '</div>\n\n  <div class="home-summary-metric col-md-6">\n    <div '
                                              'class="DataPoint DataPoint--withBottomBorder">\n      <h3 '
                                              'class="DataPoint-label">Mentions</h3>\n      <div '
                                              'class="DataPoint-info metric-mentions">28</div>\n    </div>\n  '
                                              '</div>\n\n  <div class="home-summary-metric col-md-6">\n    <div '
                                              'class="DataPoint DataPoint--withBottomBorder">\n        <h3 '
                                              'class="DataPoint-label">New followers</h3>\n      <div '
                                              'class="DataPoint-info metric-followers">4</div>\n    </div>\n  '
                                              '</div>\n\n</div>\n'}, 'no_data': {'html': ''}}

    output_summary = {
        'page_summary': {
            'visits': '194',
            'mentions': '28',
            'followers': '4'
        },
        'no_data': {
            'html': ''
        }
    }

    assert extract_summary(input_summary) == output_summary
