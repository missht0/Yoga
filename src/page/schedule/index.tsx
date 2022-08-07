import './index.less';
import { LeftOutlined } from '@ant-design/icons';
import {
  Button,
  Modal,
  TimePicker,
  Form,
  Input,
  Row,
  Col,
  Slider,
  Radio,
  message,
} from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import Api from '../../request/request';

const date = new URLSearchParams(window.location.search).get('date');
console.log(date);

const Schedule = (props: ScheduleProps) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    values.s_time =
      values.time === undefined
        ? null
        : moment(
            props.date + ' ' + values.time.format('HH:mm'),
            'YYYY-MM-DD HH:mm',
          );
    // 把time_long中的分钟数转化为moment对象
    values.time_long = moment('00:00:00', 'HH:mm:ss')
      .add(moment.duration(values.time_long, 'minutes'))
      .format('HH:mm:ss');
    console.log('Received values of form: ', values);
    // 提交表单到数据库
    const api = new Api();
    api
      .AddClass(values)
      .then((res: any) => {
        if (res.code === 1) {
          message.success('添加成功');
          console.log('success', res);
        } else {
          console.log('error', res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });

    props.handleCancel();
  };
  const backHome = () => {
    props.handleCancel();
  };

  return (
    //对话框
    <Modal
      title={
        <div className="m-back">
          <LeftOutlined onClick={backHome} />
          <span>创建课程</span>
        </div>
      }
      visible={props.isModalVisible}
      onCancel={props.handleCancel}
      footer={null}
    >
      <div className="schedule">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            time: moment('17:00', 'HH:mm'),
            time_long: 90,
            date: props.date,
            place: '师生活动中心2-108',
            price: 400,
            num: 10,
            c_name: '瑜伽',
          }}
        >
          <Form.Item label="课程" name="c_name">
            <Radio.Group size="large">
              <Radio.Button defaultChecked={true} value="瑜伽">
                瑜伽
              </Radio.Button>
              <Radio.Button defaultChecked={true} value="围棋">
                围棋
              </Radio.Button>
              <Radio.Button defaultChecked={true} value="羽毛球">
                羽毛球
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="开始时间" name="time">
            <TimePicker format="HH:mm" minuteStep={30} />
          </Form.Item>
          <Form.Item label="时长" name="time_long">
            <Radio.Group>
              <Radio.Button defaultChecked={true} value={60}>
                60
              </Radio.Button>
              <Radio.Button defaultChecked={true} value={90}>
                90
              </Radio.Button>
              <Radio.Button defaultChecked={true} value={120}>
                120
              </Radio.Button>
              <Radio.Button defaultChecked={true} value={150}>
                150
              </Radio.Button>
              <Radio.Button defaultChecked={true} value={180}>
                180
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="地点" name="place">
            <Input allowClear size="large" />
          </Form.Item>
          <Row justify="space-between">
            <Col span={24}>
              <Form.Item label="预约金额" name="price">
                <Slider
                  marks={{
                    300: '300',
                    350: '350',
                    400: '400',
                    450: '450',
                    500: '500',
                  }}
                  step={10}
                  min={300}
                  max={500}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="人数" name="num">
            <Slider
              min={5}
              max={12}
              marks={{
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                10: '10',
                11: '11',
                12: '12',
              }}
            />
          </Form.Item>
          <Row justify="end">
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  OK
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
export interface ScheduleProps {
  isModalVisible: boolean;
  handleCancel: any;
  date: string;
}
export default Schedule;
