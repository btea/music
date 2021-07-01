import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import IndexCarousel from './containers/indexCarousel/carousel';
import Search from './component/index';
import Single from './component/IndexCarousel/single';
import SearchIndex from './containers/searchIndex';
import MV from './containers/mv/mvIndex';
import './iconfont/material-icons.css';

// import registerServiceWorker from './registerServiceWorker';
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Search} />
                    <Route exact path='/' component={IndexCarousel} />
                    <Route path='/single' component={Single} />
                    <Route path='/searchIndex' component={SearchIndex} />
                    <Route path='/mv/:mvid' component={MV} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// registerServiceWorker();
// 作用？  主要用于在身产环境中为用户在本地创创建一个service worker来缓存资源到本地，提升应用的访问速度
// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

// https://api.imjad.cn/cloudmusic/?type=search&search_type=1002&s=木暮睦    //获取个人信息
// 我的歌单id集合
// [
//     {
//         name: '木暮睦喜欢的音乐',
//         id: 59753871
//     },
//     {
//         name: 'en',
//         id: 2000385839
//     },
//     {
//         name: 'bgm',
//         id: 2000388786
//     },
//     {
//         name: '妖尾',
//         id: 820184907
//     },
//     {
//         name: '古风',
//         id: 480591861
//     },
//     {
//         name: 'clannad',
//         id: 467595782
//     },
//     {
//         name: '古风集',
//         id: 379919506
//     },
//     {
//         name: '我的歌单',
//         id: 363515658
//     },
//     {
//         name: '[]',
//         id: 159011281
//     },
//     {
//         name: '洛天依作品集',
//         id: 115559161
//     },
//     {
//         name: '90回不去的慢慢回忆',
//         id: 101953302
//     },
//     {
//         name: '动漫',
//         id: 96816234
//     }
// ]
