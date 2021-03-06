import React from 'react';
import {
    Typography,
    Form,
    Input,
    DatePicker,
    Icon,
    Button
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';


const { Title } = Typography;
const { RangePicker } = DatePicker;
let contentId = 1;
let successId = 1;



export default class Work extends React.Component {
    state = {};

    remove = (k, type) => {
        const { form } = this.props;
        if (type == "content") {
            const ContentKeys = form.getFieldValue('ContentKeys');
            if (ContentKeys.length === 1) {
                return;
            }
            form.setFieldsValue({
                ContentKeys: ContentKeys.filter(key => key !== k),
            });
        }
        else if (type == "success") {
            const SuccessKeys = form.getFieldValue('SuccessKeys');
            if (SuccessKeys.length === 1) {
                return;
            }
            form.setFieldsValue({
                SuccessKeys: SuccessKeys.filter(key => key !== k),
            });
        }
    };

    add = (e, type) => {
        const { form } = this.props;
        if (type == "content") {
            const ContentKeys = form.getFieldValue('ContentKeys');
            const nextKeys = ContentKeys.concat(contentId++);
            form.setFieldsValue({
                ContentKeys: nextKeys,
            });
        }
        else if (type == "success") {
            const SuccessKeys = form.getFieldValue('SuccessKeys');
            const nextKeys = SuccessKeys.concat(successId++);
            form.setFieldsValue({
                SuccessKeys: nextKeys,
            });
        }
    };
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('ContentKeys', { initialValue: [0] });
        getFieldDecorator('SuccessKeys', { initialValue: [0] });
        const ContentKeys = getFieldValue('ContentKeys');
        const SuccessKeys = getFieldValue('SuccessKeys');

        //工作内容
        const ContentFormItems = ContentKeys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '工作内容' : ''}
                required={false}
                key={k}
            >{getFieldDecorator(`content[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                    {
                        required: index === 0 ? false : true,
                        whitespace: true,
                        message: "请输入工作内容或者移除此项",
                    },
                ],
            })(<Input style={{ width: '60%', marginRight: 8 }} />)}
                {ContentKeys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k, 'content')}
                    />
                ) : null}
            </Form.Item>));

        //工作成就
        const SuccessFormItems = SuccessKeys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '工作成就' : ''}
                required={false}
                key={k}
            >{getFieldDecorator(`success[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                    {
                        required: index === 0 ? false : true,
                        whitespace: true,
                        message: "请输入工作成就或者移除此项",
                    },
                ],
            })(<Input style={{ width: '60%', marginRight: 8 }} />)}
                {SuccessKeys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={(e) => this.remove(k, 'success')}
                    />
                ) : null}
            </Form.Item>));
        return (
            <div>
                <Title level={2}>个人信息</Title>
                <Form.Item label="姓名">
                    {getFieldDecorator('姓名', {
                        rules: [{ required: true, message: '请填入姓名' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="联系电话">
                    {getFieldDecorator('联系电话', {
                        rules: [{ required: true, message: '请填入联系电话' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '邮箱格式还不是正确的┗|｀O′|┛ 嗷~~',
                            },
                            {
                                required: true,
                                message: '请输入邮箱',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="求职意向">
                    {getFieldDecorator('求职意向', {
                        rules: [{ required: true, message: '请填入求职意向' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="微信">
                    {getFieldDecorator('微信', {
                        rules: [{ required: false}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="个人博客">
                    {getFieldDecorator('个人博客', {
                        rules: [{ required: false}],
                    })(<Input />)}
                </Form.Item>
            </div>
        );
    }
}

