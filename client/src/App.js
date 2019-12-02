import React from 'react';
import { Form } from 'antd';
import ShowPDF from '../src/components/showPDF/showPDF';
import Education from './components/personalInfo/education';
import './App.scss';

export default class App extends React.Component {
  render() {
    const EducationForm = Form.create({ name: 'education' })(Education);

    return (
      <div>
        <ShowPDF/>  
        <EducationForm/>
      </div>
    );
  }
}
