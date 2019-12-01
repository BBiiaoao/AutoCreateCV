import React from 'react';
import { Tabs, Radio } from 'antd';
import { showExample } from '../../constants/showExample';

const { TabPane } = Tabs;

export default class ShowPDF extends React.Component {

  state = {
    type: 0,
    kinds: 0
  };

  tabsChanged = e => {
    console.log(parseInt(e));
    this.setState({ type: parseInt(e)});
    console.log(this.state);

  }

  buttonChanged = e => {
    this.setState({ kinds: e.target.index });

  };

  render() {
    const type=this.state.type;
    const kinds=this.state.kinds;
    return (
      <div>
        <div className="title">
          <h1>Just For Your CV Automatically!</h1>
          <p>定制你自己的简历</p>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.tabsChanged}>
          {
            showExample.map((value, index) => {
              return (
                <TabPane tab={value.typeDes} key={index} onTabClick={this.tabPaneChanged}>
                  <Radio.Group defaultValue="color1" onChange={this.buttonChanged} style={{ marginBottom: 16 }}>
                    {
                      value.kinds.map((value, index) => {
                        return (
                          <Radio.Button index={index} value={value.color} key={index}>{value.colorDes}</Radio.Button>
                        )
                      })
                    }
                  </Radio.Group>
                </TabPane>
              )
            })
          }
        </Tabs>
        <img className="img_preview" src={showExample[type].kinds[kinds].img}></img>
      </div>
    );
  }
}
