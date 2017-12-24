import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IndexCarousel from './containers/indexCarousel/carousel';
// import registerServiceWorker from './registerServiceWorker';
class Index extends React.Component{
    constructor(props){
        super(props);

    }


    render(){
        return(
            <IndexCarousel/>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// 作用？
// registerServiceWorker();
