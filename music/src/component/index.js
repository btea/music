import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './index.css';

export default class Search  extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="search_words">
                {/*<input type="text" className="input_words" placeholder="请输入关键词"/>*/}
                <Link to="searchIndex">
                    <i className="material-icons">search</i>
                </Link>
            </div>
        )
    }
}