import React from 'react';
import { Tabs, Radio } from 'antd';
import { showExample } from '../../constants/showExample';

const { TabPane } = Tabs;

export default class ShowPDF extends React.Component {

  state = { template: 'template1' };

  onChange = e => {
    this.setState({ template: e.target.value });
  };

  render() {
    const { template } = this.state;
    return (
      <div>
        <div className="title">
          <h1>Just For Your CV Automatically!</h1>
          <p>定制你自己的简历</p>
        </div>
        <Tabs defaultActiveKey="1" template={template}>
          {
            showExample.map((value, index) => {
              return (
                <TabPane tab={value.typeDes} key={index} template={value.type}>
                  <Radio.Group value="template1" onChange={this.onChange} style={{ marginBottom: 16 }}>
                    {
                      value.kinds.map((value) => {
                        return (
                          <Radio.Button value={value.color}>{value.colorDes}</Radio.Button>
                        )
                      })
                    }
                  </Radio.Group>
                </TabPane>
              )
            })
          }
        </Tabs>
      </div>
    );
  }
}
