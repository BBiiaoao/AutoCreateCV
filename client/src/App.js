import React from 'react';
import { Form } from 'antd';
import ShowPDF from '../src/components/showPDF/showPDF';
import Information from './components/Information/information';
import './App.scss';

export default class App extends React.Component {
  render() {
    const InformationFrom = Form.create({ name: 'information'})(Information);

    return (
      <div>
        <ShowPDF/>  
        <InformationFrom/>
      </div>
    );
  }
}
