import React from 'react';
import {
    Typography,
    Form,
    Input,
} from 'antd';

const { Title } = Typography;
const {TextArea} =Input;



export default class SelfEvaluation extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 14 },
                sm: { span: 20 },
            },
        };

        return (
            <div>
                <Title level={2}>自我评价</Title>
                <Form.Item label="自我评价" {...formItemLayout}>
                    {getFieldDecorator('自我评价', {
                        rules: [{ required: false, message: '请填入姓名' }],
                    })(<TextArea rows={8}/>)}
                </Form.Item>
            </div>
        );
    }
}

