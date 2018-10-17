import { observable, action, computed } from 'mobx';
import { axios, store, stores } from 'choerodon-front-boot';
import _ from 'lodash';
import { handleProptError } from '../../../utils';
import AppTagStore from '../appTag';
import BranchStore from '../branchManage';
import MergeRequestStore from '../mergeRequest';
import CiPipelineStore from '../ciPipelineManage';

const { AppState } = stores;

function findDataIndex(collection, value) {
  return collection ? collection.findIndex(
    ({ id, projectId }) => id === value.id && (
      (!projectId && !value.projectId)
      || projectId === value.projectId
    ),
  ) : -1;
}

// 保留多少recent内容,更新最新顺序
function saveRecent(collection = [], value, number) {
  const index = findDataIndex(collection, value);
  if (index !== -1) {
    return collection.splice(index, 1).concat(collection.slice());
  } else {
    collection.unshift(value);
    return collection.slice(0, number);
  }
}

@store('DevPipelineStore')
class DevPipelineStore {
  @observable appData = [];

  @observable selectedApp = null;

  @observable defaultAppName = null;

  @observable recentApp = null;

  @action setAppData(data) {
    this.appData = data;
  }

  @computed get getAppData() {
    return this.appData.slice();
  }

  @action setSelectApp(app) {
    this.selectedApp = app;
  }

  @computed get getSelectApp() {
    return this.selectedApp;
  }

  @action setDefaultAppName(name) {
    this.defaultAppName = name;
  }

  @computed get getDefaultAppName() {
    return this.defaultAppName;
  }

  @computed
  get getRecentApp() {
    let recents = [];
    if (this.recentApp) {
      recents = this.recentApp;
    } else if (localStorage.recentApp) {
      recents = JSON.parse(localStorage.recentApp);
    }
    return recents.filter(
      value => findDataIndex(this.appData, value) !== -1,
    );
  }

  @action
  setRecentApp(id) {
    if (id) {
      const recent = this.appData.filter(value => value.id === id)[0];
      const recentApp = saveRecent(this.getRecentApp, recent, 3);
      localStorage.recentApp = JSON.stringify(recentApp);
      this.recentApp = recentApp;
    }
  }

  /**
   * 查询该项目下的所有应用
   * @param projectId
   * @param type
   * @returns {Promise<T>}
   */
  queryAppData = (projectId = AppState.currentMenuType.id, type) => {
    AppTagStore.setTagData([]);
    BranchStore.setBranchList([]);
    this.setAppData([]);
    axios.get(`/devops/v1/projects/${projectId}/apps`)
      .then((data) => {
        const result = handleProptError(data);
        if (result) {
          this.setAppData(result);
          if (result.length) {
            if (this.selectedApp) {
              if (_.filter(result, ['id', this.selectedApp]).length === 0) {
                this.setSelectApp(result[0].id);
              }
            } else {
              this.setSelectApp(result[0].id);
            }
            switch (type) {
              case 'branch':
                BranchStore.loadBranchList({ projectId });
                break;
              case 'tag':
                AppTagStore.queryTagData(projectId, 0, 10);
                break;
              case 'merge':
                MergeRequestStore.loadMergeRquest(this.selectedApp);
                MergeRequestStore.loadUrl(projectId, this.selectedApp);
                break;
              case 'ci':
                CiPipelineStore.loadPipelines(this.selectedApp);
                break;
              default:
                break;
            }
            AppTagStore.setDefaultAppName(result[0].name);
          } else {
            this.setSelectApp(null);
            AppTagStore.setLoading(false);
          }
        }
      }).catch(err => Choerodon.handleResponseError(err));
  };
}

const devPipelineStore = new DevPipelineStore();
export default devPipelineStore;
