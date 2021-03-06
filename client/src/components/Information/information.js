import React from 'react';
import {
    Form,
    Button
} from 'antd';
import Educations from "./educations";
import Work from "./work";
import Skill from "./skill";
import PersonalInfo from "./personalInfo";
import SelfEvaluation from "./selfEvaluation";


export default class Information extends React.Component {
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
        const { form } = this.props;

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
                    <Educations form={form} />
                    <Work form={form} />
                    <Skill form={form} />
                    <PersonalInfo form={form} />
                    <SelfEvaluation form={form} />
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

