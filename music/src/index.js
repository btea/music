import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FetchData from  './fetch/fetch';
// import registerServiceWorker from './registerServiceWorker';
class Index extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        let request = {
            type: 'post',
            url: 'http://music.163.com/api/search/pc',
            data: {
                type: 1000,
                s: '古风'
            }
        }
        FetchData(request.url,request.url,request.data).then(
            res => res.json().then(response => {
                console.log(response);
            })
        )
    }

    render(){
        return(
            <div>123</div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// 作用？
// registerServiceWorker();
