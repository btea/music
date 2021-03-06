import React from 'react';
import {Link} from 'react-router-dom';

export default class SingleSongTemp extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        // lazyload
        // 问题????
        let ele = this.refs.cover_img;


        // 简单的节流函数
        function throttle(func, wait, mustRun) {
            let timeout,
                startTime = new Date();

            return function() {
                let context = this,
                    args = arguments,
                    curTime = new Date();

                clearTimeout(timeout);
                // 如果达到了规定的触发时间间隔，触发 handler
                if(curTime - startTime >= mustRun){
                    func.apply(context,args);
                    startTime = curTime;
                    // 没达到触发间隔，重新设定定时器
                }else{
                    timeout = setTimeout(func, wait);
                }
            };
        };
        // 实际想绑定在 scroll 事件上的 handler
        function realFunc(){
            let getBounding = ele.getBoundingClientRect();
            let height = window.screen.height;
            if(getBounding.top < height){
                let img = ele.querySelector('.picUrl');
                if(!img.getAttribute('src')){
                    img.setAttribute('src',img.dataset.src);
                }
            }
        }
        // 采用了节流函数
        window.addEventListener('scroll',throttle(realFunc,500,800));

    }
    render(){
        let item = this.props.item;
        let index = this.props.index;
        let mvid = item.mv;
        return(
            <li className="single_song"  data-id={item.id} ref="cover_img">
                <div className="img_picUrl">
                    <img src={index < 10 ? item.al.picUrl :''} data-src={index >= 10 ? item.al.picUrl : ''} alt="" className="picUrl"/>
                </div>
                <div className="right">
                    <div className="name">
                        <div className="song_name">{item.name}</div>
                        <span className="mv" style={{display: item.mv ? 'block' : 'none'}} data-mv={item.mv || ''}>
                            <Link to={"/mv/" + mvid}>MV</Link>
                        </span>
                    </div>
                    <div className="className">{item.ar[0].name}</div>
                </div>
            </li>
        )
    }
}