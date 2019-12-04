import React from 'react';
import {
    Typography,
    Form,
    Divider,
    DatePicker,
    Select,
    Icon,
    Button
} from 'antd';
import Education from './education'


const { Title } = Typography;
let educationId = 1;



export default class Educations extends React.Component {
    state = {
        edu: [0]
    };

    remove = (k, type) => {
        const edu = this.state.edu;
        if (edu.length === 1) {
            return;
        }
        this.setState({ edu: edu.filter(key => key !== k) })

    };

    add = () => {
        const edu = this.state.edu;
        const nextEdu = edu.concat(educationId++);
        this.setState({ edu: nextEdu });
    };
    render() {

        const { form } = this.props;
        const educationItems = this.state.edu.map((k, index) => {
            return (
                <div key={index}>
                    {index > 0 ? <Divider style={{ height: '2px' }} /> : ''}
                    <Education form={form} flag={k} />
                </div>
            )
        }
        );
        return (
            <div>
                <Title level={2}>教育经历</Title>
                {educationItems}
                <Form.Item {...{
                    wrapperCol: {
                        xs: { span: 24, offset: 0 },
                        sm: { span: 20, offset: 4 },
                    }
                }}>
                    <Button type="dashed" onClick={this.add} style={{ width: '30%', borderStyle: 'solid', }}>
                        <Icon type="plus" /> 添加教育经历
                    </Button>
                </Form.Item>
            </div >
        );
    }
}

