import React, { Component } from 'react';
import Header from  './../header/index';
import Main from  './../main/index';
import Footer from  './../footer/index';

import './index.css';

class Search extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default Search;
