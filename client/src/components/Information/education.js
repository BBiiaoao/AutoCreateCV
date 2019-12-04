import React from 'react';
import {
    Typography,
    Form,
    Input,
    DatePicker,
    Select,
    Icon,
    Button
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';


const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = DatePicker;
let achievementId = 1;
let experienceId = 1;



export default class Education extends React.Component {
    state = {};

    remove = (k, type) => {
        const { form } = this.props;
        if (type == "achievement") {
            const AchievementKeys = form.getFieldValue('AchievementKeys');
            if (AchievementKeys.length === 1) {
                return;
            }
            form.setFieldsValue({
                AchievementKeys: AchievementKeys.filter(key => key !== k),
            });
        }
        else if (type == "experience") {
            const ExperienceKeys = form.getFieldValue('ExperienceKeys');
            if (ExperienceKeys.length === 1) {
                return;
            }
            form.setFieldsValue({
                ExperienceKeys: ExperienceKeys.filter(key => key !== k),
            });
        }
    };

    add = (e, type) => {
        const { form } = this.props;
        if (type == "achievement") {
            const AchievementKeys = form.getFieldValue('AchievementKeys');
            const nextKeys = AchievementKeys.concat(achievementId++);
            form.setFieldsValue({
                AchievementKeys: nextKeys,
            });
        }
        else if(type=="experience"){
            const ExperienceKeys = form.getFieldValue('ExperienceKeys');
            const nextKeys = ExperienceKeys.concat(experienceId++);
            form.setFieldsValue({
                ExperienceKeys: nextKeys,
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
        getFieldDecorator('AchievementKeys', { initialValue: [0] });
        getFieldDecorator('ExperienceKeys', { initialValue: [0] });
        const AchievementKeys = getFieldValue('AchievementKeys');
        const ExperienceKeys = getFieldValue('ExperienceKeys');

        //成绩/奖项
        const AchievementFormItems = AchievementKeys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '成绩/奖项' : ''}
                required={true}
                key={k}
            >{getFieldDecorator(`achievement[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        message: "请输入成绩奖项或者移除此项",
                    },
                ],
            })(<Input style={{ width: '60%', marginRight: 8 }} />)}
                {AchievementKeys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k, 'achievement')}
                    />
                ) : null}
            </Form.Item>));

        //校园经历
        const ExperienceFormItems = ExperienceKeys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '校园经历' : ''}
                required={false}
                key={k}
            >{getFieldDecorator(`experience[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                    {
                        required: index === 0 ? false : true,
                        whitespace: true,
                        message: "请输入校园经历或者移除此项",
                    },
                ],
            })(<Input style={{ width: '60%', marginRight: 8 }} />)}
                {ExperienceKeys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={(e) => this.remove(k, 'experience')}
                    />
                ) : null}
            </Form.Item>));
        return (
            <div>
                <Title level={2}>教育经历</Title>
                <Form.Item label="毕业院校">
                    {getFieldDecorator('毕业院校', {
                        rules: [{ required: true, message: '请填入毕业院校', whitespace: true }],
                    })(<Input autoComplete="off"/>)}
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
                        rules: [{ type: 'array', required: true, message: '请选择就读时间' }],
                    })(<RangePicker locale={locale} />)}
                </Form.Item>
                {AchievementFormItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={(e) => { this.add(e, "achievement") }} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加
                    </Button>
                </Form.Item>
                {ExperienceFormItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={(e) => { this.add(e, "experience") }} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加
                    </Button>
                </Form.Item>
            </div>
        );
    }
}

