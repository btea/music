import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './index.css';
import IndexCarousel from './containers/indexCarousel/carousel';
import Search from './component/index';
import Single from './component/IndexCarousel/single';

// import registerServiceWorker from './registerServiceWorker';
class Index extends React.Component{
    constructor(props){
        super(props);

    }


    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Search}/>
                    <Route exact path="/" component={IndexCarousel}/>
                    <Route path="/single/:id" component={Single}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// 作用？
// registerServiceWorker();
