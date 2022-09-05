import './index.less';
import moment from 'moment';
import { Link } from 'umi';

const PageItem = (props: PageItemProps) => {
  const { value, monclasses, setHasclass } = props;
  return (
    <div className="tr-cnt">
      {monclasses.map((item: any, index: any) => {
        if (
          moment(item.s_time).format('YYYY-MM-DD') ===
          value.format('YYYY-MM-DD')
        ) {
          if (
            moment(item.s_time).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD')
          ) {
            setHasclass(true);
            console.log(item);

            console.log('item日期' + moment(item.s_time).format('YYYY-MM-DD'));
            console.log('今日日期' + moment().format('YYYY-MM-DD'));
          }

          return (
            <Link to={'/information?item=' + encodeURI(JSON.stringify(item))}>
              <div className="m-img">
                <img
                  src={require('../../../public/img/class/' +
                    item.c_name +
                    '.svg')}
                  alt=""
                />
                <div className="num">{item.n_num}</div>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
};

export interface PageItemProps {
  //暴露接口
  monclasses: any;
  setHasclass: any;
  value: any;
}
export default PageItem;
