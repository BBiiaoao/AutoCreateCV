import React from 'react';
import {
    Typography,
    Form,
    Input,
    DatePicker,
    Select,
    Button
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';


const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = DatePicker;



export default class Education extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
            labelAlign: 'left'
        };

        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Title level={2}>教育经历</Title>
                    <Form.Item label="毕业院校">
                        {getFieldDecorator('毕业院校', {
                            rules: [{ required: true, message: '请填入毕业院校', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="学历">
                        {getFieldDecorator('学历', {
                            rules: [
                                { required: true, message: '请填入学历' },
                            ],
                            initialValue: "undergraduate"
                        })(<Select>
                            <Option value="junior">大专</Option>
                            <Option value="undergraduate">本科</Option>
                            <Option value="master">硕士</Option>
                            <Option value="doctor">博士</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="就读时间">
                        {getFieldDecorator('就读时间', {
                            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                        })(<RangePicker locale={locale} />)}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

