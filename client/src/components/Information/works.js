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
        else if(type=="success"){
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
                <Title level={2}>工作经历</Title>
                <Form.Item label="工作单位">
                    {getFieldDecorator('工作单位', {
                        rules: [{ required: false, message: '请填入工作单位'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="单位部门">
                    {getFieldDecorator('单位部门', {
                        rules: [{ required: false, message: '请填入单位部门'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="工作时间">
                    {getFieldDecorator('工作时间', {
                        rules: [{ type: 'array', required: false, message: '请选择工作时间' }],
                    })(<RangePicker locale={locale} />)}
                </Form.Item>
                {ContentFormItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={(e) => { this.add(e, "content") }} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加
                    </Button>
                </Form.Item>
                {SuccessFormItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={(e) => { this.add(e, "success") }} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加
                    </Button>
                </Form.Item>
            </div>
        );
    }
}

