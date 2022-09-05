import './index.less';
import { Button } from 'antd';
import moment from 'moment';

const InfoBtn = (props: InfoBtnProps) => {
  return (
    <>
      {localStorage.getItem('u_id') != null &&
      localStorage.getItem('is_teacher') === '0' &&
      moment().diff(moment(props.m_item.s_time), 'm') < 0 ? (
        <div className="signup">
          {
            // 学员在黑名单
            props.isdefault ? (
              <div className="up m-btn">
                <Button type="primary" disabled size="large">
                  无报名权限
                </Button>
              </div>
            ) : // 已满员
            props.m_item.n_num === props.m_item.num ? (
              <div className="up m-btn">
                <Button type="primary" disabled size="large">
                  已满员
                </Button>
              </div>
            ) : // 如果未报名该课程
            props.isSignup ? (
              <div className="down m-btn">
                <Button onClick={props.handledown} size="large">
                  取消报名
                </Button>
              </div>
            ) : (
              <div className="up m-btn">
                <Button type="primary" onClick={props.handleup} size="large">
                  报名
                </Button>
              </div>
            )
          }
        </div>
      ) : null}
    </>
  );
};

export interface InfoBtnProps {
  //暴露接口
  isdefault: any;
  m_item: any;
  isSignup: any;
  handledown: any;
  handleup: any;
}
export default InfoBtn;
