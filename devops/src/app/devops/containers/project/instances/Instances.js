import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Select, Progress, Tooltip, Pagination, Button, Icon } from 'choerodon-ui';
import { Action, stores, Content, Header, Page } from 'choerodon-front-boot';
import _ from 'lodash';
import { handleProptError } from '../../../utils';
import ValueConfig from './ValueConfig';
import UpgradeIst from './UpgradeIst';
import DelIst from './components/DelIst';
import ExpandRow from './components/ExpandRow';
import StatusIcon from '../../../components/StatusIcon';
import './Instances.scss';
import '../../main.scss';

const Option = Select.Option;
const { AppState } = stores;

@observer
class Instances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleUp: false,
      envId: null,
      appId: null,
    };
  }

  componentDidMount() {
    this.loadInitData();
  }

  componentWillUnmount() {
    const { InstancesStore } = this.props;
    if (!InstancesStore.getIsCache) {
      InstancesStore.setEnvId(null);
      InstancesStore.setAppId(null);
      InstancesStore.setEnvcard([]);
      InstancesStore.setAppNameByEnv([]);
      InstancesStore.setIstAll([]);
    }
  }

  /**
   * 页码改变的回调
   * @param page
   * @param size
   */
  onPageChange = (page, size) => {
    const { InstancesStore } = this.props;
    const { envId } = this.state;
    InstancesStore.setAppPage(page);
    InstancesStore.setAppPageSize(size);
    this.handleEnvChange(envId);
  };

  /**
   * 选择应用后获取实例列表
   * @param envId
   * @param appId
   */
  loadDetail = (envId, appId) => {
    const { InstancesStore } = this.props;
    const { appId: currentApp } = this.state;
    const nextApp = (appId !== currentApp) && appId;
    InstancesStore.setAppId(nextApp);
    this.setState({ appId: nextApp });
    this.reloadData(envId, nextApp);
  };

  /**
   * 查看部署详情
   */
  linkDeployDetail = (record) => {
    const { id, status, appName } = record;
    const { InstancesStore } = this.props;
    InstancesStore.setIsCache(true);
    const { history } = this.props;
    const {
      id: projectId,
      name: projectName,
      type,
      organizationId,
    } = AppState.currentMenuType;
    history.push({
      pathname: `/devops/instance/${id}/${status}/detail`,
      search: `?type=${type}&id=${projectId}&name=${encodeURIComponent(projectName)}&organizationId=${organizationId}`,
      state: { appName },
    });
  };

  /**
   * 查询应用标签及实例列表
   * @param id 环境id
   */
  handleEnvChange = (id) => {
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const { InstancesStore } = this.props;
    const { loadAppNameByEnv, getAppPage, getAppPageSize } = InstancesStore;
    InstancesStore.setEnvId(id);
    this.setState({ envId: id, appId: false });
    loadAppNameByEnv(projectId, id, getAppPage - 1, getAppPageSize);
    this.reloadData(id);
  };

  /**
   * table 改变的函数
   * @param pagination 分页
   * @param filters 过滤
   * @param sorter 排序
   * @param param 搜索
   */
  tableChange =(pagination, filters, sorter, param) => {
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const { InstancesStore } = this.props;
    const { envId, appId } = this.state;
    const { current, pageSize } = pagination;
    let searchParam = {};
    if (Object.keys(filters).length) {
      searchParam = filters;
    }
    const datas = {
      searchParam,
      param: param.toString(),
    };
    InstancesStore.loadInstanceAll(projectId, { page: current - 1, size: pageSize, envId, appId, datas });
    InstancesStore.setIstTableFilter({ filters, param });
  };

  /**
   * 修改配置实例信息
   */
  updateConfig = (record) => {
    const { code, id, envId, appVersionId, appId } = record;
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const { InstancesStore } = this.props;
    this.setState({
      idArr: [envId, appVersionId, appId],
      name: code,
    });
    InstancesStore.setAlertType('valueConfig');
    InstancesStore.loadValue(projectId, id, appVersionId)
      .then((data) => {
        const res = handleProptError(data);
        if (res) {
          this.setState({
            visible: true,
            id,
          });
        }
      });
  };

  /**
   * 重新部署
   * @param id
   */
  reStart = (id) => {
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const {
      InstancesStore: {
        reStarts,
        loadInstanceAll,
      },
    } = this.props;
    reStarts(projectId, id)
      .then((data) => {
        const res = handleProptError(data);
        if (res) {
          loadInstanceAll(projectId);
        }
      });
  };


  /**
   * 升级配置实例信息
   */
  upgradeIst = (record) => {
    const { code, id, envId, appVersionId, appId } = record;
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const {
      InstancesStore: {
        loadUpVersion,
        loadValue,
      },
      intl,
    } = this.props;
    loadUpVersion(projectId, appVersionId)
      .then((data) => {
        const res = handleProptError(data);
        if (res) {
          if (res.length === 0) {
            Choerodon.prompt(intl.formatMessage({ id: 'ist.noUpVer' }));
          } else {
            this.setState({
              idArr: [envId, res[0].id, appId],
              id,
              name: code,
            });
            loadValue(projectId, id, res[0].id)
              .then((value) => {
                const val = handleProptError(value);
                if (val) {
                  this.setState({
                    visibleUp: true,
                  });
                }
              });
          }
        }
      });
  };

  /**
   * 关闭滑块
   * @param res 是否重新部署需要重载数据
   */
  handleCancel =(res) => {
    const { appId, envId } = this.state;
    this.setState({
      visible: false,
    });
    res && this.reloadData(envId, appId);
  };

  /**
   * 关闭升级滑块
   * @param res 是否重新部署需要重载数据
   */
  handleCancelUp = (res) => {
    this.setState({
      visibleUp: false,
    });
    res && this.reloadData();
  };

  /**
   * 页面数据重载
   * @param envId
   * @param appId
   */
  reloadData = (envId = false, appId = false) => {
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const { InstancesStore } = this.props;
    InstancesStore.loadInstanceAll(projectId, { envId, appId });
    InstancesStore.setIstTableFilter(null);
  };

  /**
   * 刷新按钮
   */
  reload = () => {
    const { id: projectId } = AppState.currentMenuType;
    const {
      InstancesStore: {
        getAppPageSize,
        loadAppNameByEnv,
        getAppPage,
      },
    } = this.props;
    const { envId, appId } = this.state;
    loadAppNameByEnv(projectId, envId, getAppPage - 1, getAppPageSize);
    this.reloadData(envId, appId);
  };

  /**
   * 删除数据
   */
  handleDelete = (id) => {
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const { InstancesStore } = this.props;
    const {
      loadInstanceAll,
      deleteIst,
    } = InstancesStore;
    const { appId, envId } = this.state;
    this.setState({
      loading: true,
    });
    deleteIst(projectId, id)
      .then((data) => {
        const res = handleProptError(data);
        if (res) {
          loadInstanceAll(projectId, { envId, appId });
        }
        this.setState({
          openRemove: false,
          loading: false,
        });
      });
    InstancesStore.setIstTableFilter(null);
  };

  /**
   * 启停用实例
   * @param id 实例ID
   * @param status 状态
   */
  activeIst = (id, status) => {
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const {
      InstancesStore: {
        changeIstActive,
        loadInstanceAll,
      },
    } = this.props;
    const { envId, appId } = this.state;
    changeIstActive(projectId, id, status)
      .then((data) => {
        const res = handleProptError(data);
        if (res) {
          loadInstanceAll(projectId, { envId, appId });
        }
      });
  };

  /**
   * 关闭删除数据的模态框
   */
  handleClose = () => {
    this.setState({ openRemove: false });
  };

  /**
   * action 权限控制
   * @param record 行数据
   * @returns {*}
   */
  columnAction = (record) => {
    const {
      id: projectId,
      type,
      organizationId,
    } = AppState.currentMenuType;
    const { intl: { formatMessage } } = this.props;
    const { id, status, connect } = record;
    const actionType = {
      detail: {
        service: ['devops-service.application-instance.listResources'],
        text: formatMessage({ id: 'ist.detail' }),
        action: this.linkDeployDetail.bind(this, record),
      },
      change: {
        service: ['devops-service.application-instance.queryValues'],
        text: formatMessage({ id: 'ist.values' }),
        action: this.updateConfig.bind(this, record),
      },
      restart: {
        service: ['devops-service.application-instance.restart'],
        text: formatMessage({ id: 'ist.reDeploy' }),
        action: this.reStart.bind(this, id),
      },
      update: {
        service: ['devops-service.application-version.getUpgradeAppVersion'],
        text: formatMessage({ id: 'ist.upgrade' }),
        action: this.upgradeIst.bind(this, record),
      },
      stop: {
        service: ['devops-service.application-instance.start', 'devops-service.application-instance.stop'],
        text: status !== 'stopped' ? formatMessage({ id: 'ist.stop' }) : formatMessage({ id: 'ist.run' }),
        action: status !== 'stopped' ? this.activeIst.bind(this, id, 'stop') : this.activeIst.bind(this, id, 'start'),
      },
      delete: {
        service: ['devops-service.application-instance.delete'],
        text: formatMessage({ id: 'ist.del' }),
        action: this.handleOpen.bind(this, record),
      },
    };
    let actionItem = [];
    switch (status) {
      case 'operating' || !connect:
        actionItem = ['detail'];
        break;
      case 'stopped':
        actionItem = ['detail', 'change', 'stop', 'delete'];
        break;
      case 'failed':
      case 'running':
        actionItem = ['detail', 'change', 'restart', 'update', 'stop', 'delete'];
        break;
      default:
        actionItem = ['detail'];
    }
    const actionData = _.map(actionItem, item => ({
      projectId,
      type,
      organizationId,
      ...actionType[item],
    }));
    return (<Action data={actionData} />);
  };

  loadInitData = () => {
    const {
      id: projectId,
    } = AppState.currentMenuType;
    const { InstancesStore } = this.props;
    const {
      loadActiveEnv,
      loadAppNameByEnv,
      loadInstanceAll,
      getEnvId,
      getIsCache,
      getAppId,
    } = InstancesStore;
    if (getIsCache && getEnvId) {
      this.setState({ envId: getEnvId, appId: getAppId });
    } else {
      loadActiveEnv(projectId).then((env) => {
        if (env && env.length) {
          const envId = getEnvId || env[0].id;
          const appPageSize = Math.floor((window.innerWidth - 350) / 200) * 3;
          InstancesStore.setAppPageSize(appPageSize);
          this.setState({ envId });
          loadAppNameByEnv(projectId, envId, 0, appPageSize);
          loadInstanceAll(projectId, { envId, appId: false });
        }
      });
    }
    InstancesStore.setIsCache(false);
  };

  /**
   * 打开删除数据模态框
   */
  handleOpen(record) {
    const { id, code } = record;
    this.setState({ openRemove: true, id, name: code });
  }

  render() {
    const {
      id: projectId,
      name: projectName,
    } = AppState.currentMenuType;
    const {
      InstancesStore,
      intl: { formatMessage },
    } = this.props;
    const {
      getIstAll,
      getPageInfo,
      getEnvcard,
      getAppNameByEnv,
      getAppPageInfo: { current, total, pageSize },
      getIsLoading,
      getIstParams: { filters, param },
    } = InstancesStore;
    const {
      name,
      envId,
      appId,
      visible,
      visibleUp,
      idArr,
      openRemove,
      id,
      loading,
    } = this.state;

    const title = _.find(getEnvcard, ['id', envId]);

    const envNameDom = getEnvcard.length ? _.map(getEnvcard, d => (<Option key={d.id} value={d.id}>
      <span className={`c7n-ist-status_${d.connect ? 'on' : 'off'}`} />{d.name}</Option>)) : [];

    const appNameDom = getAppNameByEnv.length ? _.map(getAppNameByEnv, d => (<div
      role="none"
      className={`c7n-deploy-single_card ${Number(appId) === d.id ? 'c7n-deploy-single_card-active' : ''}`}
      onClick={this.loadDetail.bind(this, envId, d.id)}
      key={`${d.id}-${d.projectId}`}
    >
      <i className={`icon icon-${d.projectId === Number(projectId) ? 'project' : 'apps'} c7n-icon-publish`} />
      <div className="c7n-text-ellipsis"><Tooltip title={d.name || ''}>{d.name}</Tooltip></div>
    </div>)) : (<div className="c7n-deploy-single_card">
      <div className="c7n-deploy-square"><div>App</div></div>
      <FormattedMessage id="ist.noApp" />
    </div>);

    const columns = [{
      title: <FormattedMessage id="deploy.instance" />,
      key: 'code',
      filters: [],
      filteredValue: filters.code || [],
      render: record => <StatusIcon
        name={record.code}
        status={record.commandStatus || ''}
        error={record.error || ''}
      />,
    }, {
      title: <FormattedMessage id="deploy.ver" />,
      key: 'appVersion',
      dataIndex: 'appVersion',
      filters: [],
      filteredValue: filters.appVersion || [],
    }, {
      width: 56,
      className: 'c7n-operate-icon',
      key: 'action',
      render: this.columnAction,
    }];

    const detailDom = (<Fragment>
      <div className="c7n-deploy-env-title">
        <FormattedMessage id="deploy.app" />
      </div>
      <div>
        {appNameDom}
      </div>
      <div className="c7n-store-pagination">
        <Pagination
          tiny={false}
          showSizeChanger
          showSizeChangerLabel={false}
          total={total}
          current={current}
          pageSize={pageSize}
          onChange={this.onPageChange}
          onShowSizeChange={this.onPageChange}
        />
      </div>
      <div className="c7n-deploy-env-title c7n-deploy-env-ist">
        <FormattedMessage id="ist.head" />
      </div>
      <Table
        className="c7n-devops-instance-table"
        filterBarPlaceholder={formatMessage({ id: 'filter' })}
        onChange={this.tableChange}
        dataSource={getIstAll}
        loading={getIsLoading}
        pagination={getPageInfo}
        filters={param.slice() || []}
        columns={columns}
        rowKey={record => record.id}
        expandedRowRender={record => <ExpandRow record={record} />}
      />
    </Fragment>);

    return (
      <Page
        className="c7n-region"
        service={[
          'devops-service.application-instance.pageByOptions',
          'devops-service.application.pageByEnvIdAndStatus',
          'devops-service.devops-environment.listByProjectIdAndActive',
          'devops-service.application-version.queryByAppId',
          'devops-service.application-instance.listByAppId',
          'devops-service.application-instance.queryValues',
          'devops-service.application-instance.formatValue',
          'devops-service.application-instance.stop',
          'devops-service.application-instance.start',
          'devops-service.application-instance.deploy',
          'devops-service.application-instance.delete',
        ]}
      >
        <Header title={<FormattedMessage id="ist.head" />}>
          <Button
            icon="refresh"
            funcType="flat"
            onClick={this.reload}
          >
            <FormattedMessage id="refresh" />
          </Button>
        </Header>
        <Content className="page-content">
          <div className="c7n-instance-header">
            <div className="c7n-instance-title">{formatMessage({ id: 'ist.title.env' }, { name: title ? title.name : projectName })}</div>
            <div className="c7n-instance-describe">{formatMessage({ id: 'ist.description' })}
              <a href={formatMessage({ id: 'ist.link' })}>{formatMessage({ id: 'learnmore' })}<Icon type="open_in_new" /></a>
            </div>
          </div>
          <Select
            value={envId}
            label={formatMessage({ id: 'deploy.envName' })}
            className="c7n-app-select"
            onChange={this.handleEnvChange}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filter
            showSearch
          >
            {envNameDom}
          </Select>
          {detailDom}
          {visible && <ValueConfig
            store={InstancesStore}
            visible={visible}
            name={name}
            id={id}
            idArr={idArr}
            onClose={this.handleCancel}
          />}
          {visibleUp && <UpgradeIst
            store={InstancesStore}
            visible={visibleUp}
            name={name}
            appInstanceId={id}
            idArr={idArr}
            onClose={this.handleCancelUp}
          /> }
          <DelIst
            open={openRemove}
            handleCancel={this.handleClose}
            handleConfirm={this.handleDelete.bind(this, id)}
            confirmLoading={loading}
            name={name}
          />
        </Content>
      </Page>
    );
  }
}

export default withRouter(injectIntl(Instances));