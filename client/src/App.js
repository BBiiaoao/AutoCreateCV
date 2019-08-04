import React from 'react';
import ShowPDF from '../src/components/showPDF/showPDF'
import './App.scss';
import { Tabs, Radio } from 'antd';

const { TabPane } = Tabs;
export default class App extends React.Component {

  state = { size: 'template1' };

  onChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <ShowPDF/>  
      </div>
    );
  }
}
