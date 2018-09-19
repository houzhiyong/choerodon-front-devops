import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action, configure, toJS } from 'mobx';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Page, Header, Content, stores, Permission } from 'choerodon-front-boot';
import { Select, Button, Table } from 'choerodon-ui';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import ChartSwitch from '../Component/ChartSwitch';
import TimePicker from '../Component/TimePicker';
import StatusTags from '../../../../components/StatusTags';
import ContainerStore from '../../../../stores/project/container';
import './DeployDuration.scss';

configure({ enforceActions: false });

const { AppState } = stores;
const { Option } = Select;

const COLOR = ['50,198,222', '87,170,248', '255,177,0', '116,59,231', '237,74,103'];

@observer
class DeployDuration extends Component {
  @observable env = [];

  @observable app = [];

  @observable envId = null;

  @observable appIds = [];

  @observable appArr = [];

  @observable dateArr = [];

  @observable seriesArr = [];

  handleRefresh = () => {};

  /**
   * 选择环境
   * @param id 环境ID
   */
  @action
  handleEnvSelect = (id) => {
    this.envId = id;
    this.loadAppByEnv(id);
    this.loadCharts();
  };

  /**
   * 选择应用
   * @param ids 应用ID
   */
  @action
  handleAppSelect = (ids) => {
    this.appIds = ids;
    if (ids.length < 6) {
      this.loadCharts();
    }
  };

  componentDidMount() {
    this.loadEnvCards();
  }

  /**
   * 获取可用环境
   */
  @action
  loadEnvCards = () => {
    const { ReportsStore } = this.props;
    const projectId = AppState.currentMenuType.id;
    ContainerStore.loadActiveEnv(projectId)
      .then((env) => {
        if (env.length) {
          this.env = env;
          this.envId = ReportsStore.getEnvId || env[0].id;
          this.loadAppByEnv(env[0].id);
        }
      });
  };

  /**
   * 加载table数据
   */
  loadTables = () => {
    const { ReportsStore } = this.props;
    const projectId = AppState.currentMenuType.id;
    const startTime = ReportsStore.getStartTime.format().split('T')[0].replace(/-/g, '/');
    const endTime = ReportsStore.getEndTime.format().split('T')[0].replace(/-/g, '/');
    ReportsStore.loadDeployDurationTable(projectId, this.envId, startTime, endTime, this.appIds.slice());
  };

  /**
   * 加载图表数据
   */
  @action
  loadCharts = () => {
    const { ReportsStore } = this.props;
    const projectId = AppState.currentMenuType.id;
    const startTime = ReportsStore.getStartTime.format().split('T')[0].replace(/-/g, '/');
    const endTime = ReportsStore.getEndTime.format().split('T')[0].replace(/-/g, '/');
    ReportsStore.loadDeployDurationChart(projectId, this.envId, startTime, endTime, this.appIds.slice())
      .then((res) => {
        if (res) {
          this.appArr = _.map(res.deployAppDTOS, v => v.appName);
          this.dateArr = res.creationDates;
          const seriesArr = [];
          _.map(res.deployAppDTOS, (v, index) => {
            const series = {
              name: v.appName,
              symbolSize: 24,
              itemStyle: {
                color: `rgba(${COLOR[index]}, 0.4)`,
                borderColor: `rgb(${COLOR[index]})`,
              },
              data: _.map(v.deployAppDetails, c => Object.values(c)),
              type: 'scatter',
            };
            seriesArr.push(series);
          });
          this.seriesArr = seriesArr;
        }
      });
    this.loadTables();
  };

  /**
   * 环境ID筛选应用
   * @param envId
   */
  @action
  loadAppByEnv = (envId) => {
    const projectId = AppState.currentMenuType.id;
    ContainerStore.loadAppDataByEnv(projectId, envId)
      .then((app) => {
        this.app = app;
        if (app.length) {
          this.appIds = [app[0].id];
        } else {
          this.appIds = [];
        }
        this.loadCharts();
      });
  };

  /**
   * 图表函数
   * @returns {*}
   */
  getOption() {
    const { intl: { formatMessage } } = this.props;
    return {
      legend: {
        data: this.appArr,
      },
      toolbox: {
        feature: {
          dataZoom: {},
          brush: {
            type: ['clear'],
          },
        },
      },
      brush: {
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1,
          },
        },
        backgroundColor: '#fff',
        textStyle: {
          color: '#000',
          fontSize: 13,
          lineHeight: 20,
        },
        padding: [10, 15, 10, 15],
        extraCssText:
          'box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); border: 1px solid #ddd; border-radius: 0;',
        formatter(params, ticket) {
          let time = params[0].value[1];
          if (time.split('.')[1] === '0') {
            time = `${time.toString().split('.')[0]}${formatMessage({ id: 'minutes' })}`;
          } else if (time.split('.')[0] === '0') {
            time = `${Number(time.toString().split('.')[1]) * 6}${formatMessage({ id: 'seconds' })}`;
          } else if (time.split('.').length === 2) {
            time = `${time.toString().split('.')[0]}${formatMessage({ id: 'minutes' })}${Number(time.toString().split('.')[1]) * 6}${formatMessage({ id: 'seconds' })}`;
          } else {
            time = null;
          }
          return `<div>
                <div>${formatMessage({ id: 'branch.issue.date' })}：${params[0].name}</div>
                <div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[0].color};"></span>${params[0].seriesName}：${time}</div>
              <div>`;
        },
      },
      grid: {
        left: '2%',
        right: '3%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        scale: true,
        boundaryGap: false,
        data: this.dateArr,
        axisLabel: {
          formatter(value) {
            return value.slice(5, 10).replace('-', '/');
          },
        },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            show: true,
            type: 'solid',
          },
        },
        boundaryGap: false,
        name: formatMessage({ id: 'minTime' }),
        scale: true,
      },
      series: this.seriesArr,
    };
  }

  /**
   * 表格函数
   * @returns {*}
   */
  renderTable() {
    const { intl: { formatMessage }, ReportsStore } = this.props;
    const data = ReportsStore.getAllData;

    const column = [
      {
        title: formatMessage({ id: 'app.active' }),
        key: 'status',
        render: record => (<StatusTags name={formatMessage({ id: record.status })} colorCode={record.status} />),
      }, {
        title: formatMessage({ id: 'report.deploy-duration.time' }),
        key: 'creationDate',
        dataIndex: 'creationDate',
      }, {
        title: formatMessage({ id: 'deploy.instance' }),
        key: 'appInstanceCode',
        dataIndex: 'appInstanceCode',
      }, {
        title: formatMessage({ id: 'deploy.appName' }),
        key: 'appName',
        dataIndex: 'appName',
      }, {
        title: formatMessage({ id: 'deploy.ver' }),
        key: 'appVersion',
        dataIndex: 'appVersion',
      }, {
        title: formatMessage({ id: 'report.deploy-duration.user' }),
        key: 'lastUpdatedName',
        dataIndex: 'lastUpdatedName',
      },
    ];

    return (
      <Table
        rowKey={record => record.creationDate}
        dataSource={data}
        filterBar={false}
        columns={column}
        // loading={tableLoading}
      />
    );
  }

  render() {
    const { intl: { formatMessage }, history, ReportsStore } = this.props;
    const { id, name, type, organizationId } = AppState.currentMenuType;

    const envDom = this.env.length ? _.map(this.env, d => (<Option key={d.id} value={d.id}>{d.name}</Option>)) : null;

    const appDom = this.app.length ? _.map(this.app, d => (<Option key={d.id} value={d.id}>{d.name}</Option>)) : null;

    return (<Page className="c7n-region">
      <Header
        title={formatMessage({ id: 'report.deploy-duration.head' })}
        backPath={`/devops/reports?type=${type}&id=${id}&name=${name}&organizationId=${organizationId}`}
      >
        <ChartSwitch
          history={history}
          current="deploy-duration"
        />
        <Button
          icon="refresh"
          onClick={this.handleRefresh}
        >
          <FormattedMessage id="refresh" />
        </Button>
      </Header>
      <Content code="report.deploy-duration" value={{ name }}>
        <div className="c7n-report-screen">
          <Select
            value={this.envId}
            label={formatMessage({ id: 'deploy.envName' })}
            className="c7n-select_200"
            onChange={this.handleEnvSelect}
          >
            {envDom}
          </Select>
          <Select
            value={this.appIds}
            label={formatMessage({ id: 'deploy.appName' })}
            className="c7n-select_400"
            mode="multiple"
            maxTagCount={5}
            onChange={this.handleAppSelect}
          >
            {appDom}
          </Select>
          <TimePicker startTime={ReportsStore.getStartTime} endTime={ReportsStore.getEndTime} func={this.loadCharts} store={ReportsStore} />
        </div>
        <div className="c7n-report-content">
          <ReactEcharts
            option={this.getOption()}
            notMerge
            lazyUpdate
            style={{ height: '350px', width: '100%' }}
            theme="theme_name"
            onChartReady={this.onChartReadyCallback}
          />
        </div>
        <div className="c7n-report-table">
          {this.renderTable()}
        </div>
      </Content>
    </Page>);
  }
}

export default injectIntl(DeployDuration);
