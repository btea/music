import React from 'react';

export default class Single extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.match);
        return(
            <div className="single_music">
                <header className="back">返回</header>
                {/*播放动画*/}
                <div className="container">

                </div>
                {/*播放进度条*/}
                <footer className="progress_bar">

                </footer>
            </div>
        )
    }
}