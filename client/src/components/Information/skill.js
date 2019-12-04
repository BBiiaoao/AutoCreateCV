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
let skillId = 1;
let certificateId = 1;



export default class Skill extends React.Component {
    state = {};

    remove = (k, type) => {
        const { form } = this.props;
        if (type == "skill") {
            const SkillKeys = form.getFieldValue('SkillKeys');
            if (SkillKeys.length === 1) {
                return;
            }
            form.setFieldsValue({
                SkillKeys: SkillKeys.filter(key => key !== k),
            });
        }
        else if (type == "certificate") {
            const CertificateKeys = form.getFieldValue('CertificateKeys');
            if (CertificateKeys.length === 1) {
                return;
            }
            form.setFieldsValue({
                CertificateKeys: CertificateKeys.filter(key => key !== k),
            });
        }
    };

    add = (e, type) => {
        const { form } = this.props;
        if (type == "skill") {
            const SkillKeys = form.getFieldValue('SkillKeys');
            const nextKeys = SkillKeys.concat(skillId++);
            form.setFieldsValue({
                SkillKeys: nextKeys,
            });
        }
        else if(type=="certificate"){
            const CertificateKeys = form.getFieldValue('CertificateKeys');
            const nextKeys = CertificateKeys.concat(certificateId++);
            form.setFieldsValue({
                CertificateKeys: nextKeys,
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
        getFieldDecorator('SkillKeys', { initialValue: [0] });
        getFieldDecorator('CertificateKeys', { initialValue: [0] });
        const SkillKeys = getFieldValue('SkillKeys');
        const CertificateKeys = getFieldValue('CertificateKeys');

        //个人技能
        const SkillFormItems = SkillKeys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '个人技能' : ''}
                required={false}
                key={k}
            >{getFieldDecorator(`skill[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                    {
                        required: index === 0 ? false : true,
                        whitespace: true,
                        message: "请输入个人技能或者移除此项",
                    },
                ],
            })(<Input style={{ width: '60%', marginRight: 8 }} />)}
                {SkillKeys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k, 'skill')}
                    />
                ) : null}
            </Form.Item>));

        //获得证书
        const CertificateFormItems = CertificateKeys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '获得证书' : ''}
                required={false}
                key={k}
            >{getFieldDecorator(`certificate[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                    {
                        required: index === 0 ? false : true,
                        whitespace: true,
                        message: "请输入获得证书或者移除此项",
                    },
                ],
            })(<Input style={{ width: '60%', marginRight: 8 }} />)}
                {CertificateKeys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={(e) => this.remove(k, 'certificate')}
                    />
                ) : null}
            </Form.Item>));
        return (
            <div>
                <Title level={2}>个人成绩</Title>
                {SkillFormItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={(e) => { this.add(e, "skill") }} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加
                    </Button>
                </Form.Item>
                {CertificateFormItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={(e) => { this.add(e, "certificate") }} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加
                    </Button>
                </Form.Item>
            </div>
        );
    }
}

