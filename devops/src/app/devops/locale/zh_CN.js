// zh_CN.js
// 文档地址前缀
const docServer = 'http://v0-6.choerodon.io/zh/docs';
// 界面标题描述统一管理
const pageDetail = {
  // network
  'network.title': '项目"{name}"的网络配置',
  'network.description': '网络管理是定义了一种访问网络的策略，是指内部的负载均衡以及网络转发，会将网络流量定向转发到指定的单个或者多个实例容器组。',
  'network.link': `${docServer}/user-guide/deployment-pipeline/service/`,
  'network.create.title': '项目"{name}"中创建网络',
  'network.create.description': '请选择环境及实例，配置网络转发策略。目前支持内部和外部两种网络转发方式。\n' +
  '        转发内部网络，则只需定义端口即可，系统会自动为您分配集群内部IP；转发外部网络，则需要定义外部IP及端口。',
  'network.create.link': `${docServer}/user-guide/deployment-pipeline/service/`,
  'network.update.title': '对网络"{name}"进行修改',
  'network.update.description': '您可在此修改网络配置信息。',
  'network.update.link': `${docServer}/user-guide/deployment-pipeline/service/`,

  // 环境
  'env.title': '项目"{name}"的环境流水线',
  'env.description': '环境是指一个应用可以被部署的地方。常见环境有开发测试环境，预生产环境，生产环境等。平台自动为您的项目生成一条环境流水线，您可在下方拖拽需要调整顺序的环境至目标位置。',
  'env.link': `${docServer}/user-guide/deployment-pipeline/environment-pipeline/`,
  'env.create.title': '项目"{name}"的环境创建',
  'env.create.description': '请在下面输入环境编码、名称、描述，创建新环境。新环境默认新增在环境流水线的最后一个节点。',
  'env.create.link': `${docServer}/user-guide/deployment-pipeline/environment-pipeline/`,
  'env.update.title': '对"{name}"环境修改',
  'env.update.description': '您可在此修改环境名称及描述，也可以复制指令至Kubernetes运行，与平台建立连接。',
  'env.update.link': `${docServer}/user-guide/deployment-pipeline/environment-pipeline/`,
  'env.token.title': '复制环境"{name}"的指令',
  'env.token.description': '复制下文代码至Kubernetes运行，与平台建立链接。',
  'env.token.link': `${docServer}/user-guide/deployment-pipeline/environment-pipeline/`,

  // domain
  'domain.title': '项目"{name}"的域名管理',
  'domain.description': '域名管理是将您已经预定义好的域名在平台中进行配置，使外部能够通过指定的域名访问到系统内部的实例。',
  'domain.link': `${docServer}/user-guide/deployment-pipeline/ingress`,
  'domain.create.title': '在项目"{name}"中创建域名',
  'domain.create.description': '请选择环境，填写域名名称、地址、路径，并选择网络配置域名访问规则。',
  'domain.create.link': `${docServer}/user-guide/deployment-pipeline/service/`,
  'domain.update.title': '对域名"{name}"进行修改',
  'domain.update.description': '您可在此修改域名配置信息。',
  'domain.update.link': `${docServer}/user-guide/deployment-pipeline/service/`,

  // deploymentApp
  'deploy.title': '项目"{name}"的部署应用',
  'deploy.description': '应用部署是一个将某版本的应用部署至某环境的操作。您可以在此按指引分步骤完成应用部署。',
  'deploy.link': `${docServer}/user-guide/deployment-pipeline/application-deployment/`,
  'deploy.sidebar.title': '项目"{name}"的部署选择应用',
  'deploy.sidebar.description': '您可以在此灵活选择来源于本项目及应用市场的应用，且有列表式及卡片式两种展示方式可以切换。',
  'deploy.sidebar.link': `${docServer}/user-guide/deployment-pipeline/application-deployment/`,

  // appRelease
  'release.title': '项目"{name}"的应用发布',
  'release.description': '应用发布是可以将您研发的应用发布至其他项目使用，可发布的范围有本组织或全平台下的所有项目。并且可以控制发布应用版本的范围。',
  'release.link': `${docServer}/user-guide/development-pipeline/application-release/`,
  'release.add.title': '项目"{name}"的应用发布',
  'release.add.description': '应用发布是可以将您研发的应用发布至其他项目使用，可发布的范围有本组织或全平台下的所有项目。并且可以控制发布应用版本的范围。',
  'release.edit.title': '修改应用"{name}"的信息',
  'release.edit.description': '您可以在此修改应用发布的展示信息，包括贡献者、分类及应用描述。',
  'release.editVersion.title': '查看应用"{name}"的版本',
  'release.editVersion.description': '您可以在此查看未发布及已发布的版本，且可以发布未发布的版本。',
  'release.addVersion.title': '添加应用"{name}"发布的版本',
  'release.addVersion.description': '您可以在此勾选并添加需要发布的版本。',
};

const zhCN = {
  // public
  refresh: '刷新',
  detail: '详情',
  operate: '操作',
  save: '保存',
  active: '启用',
  edit: '修改',
  cancel: '取消',
  delete: '删除',
  'confirm.delete': '确认删除吗？',
  'confirm.delete.tip': '当你点击删除后，该条数据将被永久删除，不可恢复!',
  MicroApp: '微应用',
  MicroAppUI: 'Web前端',
  Mobile: '移动',
  Application: '普通应用',
  JavaLib: 'Java 库',
  create: '创建',
  running: '运行中',
  operating: '处理中',
  stopping: '停止中',
  deleting: '删除中',
  pending: '部署中',
  stoped: '已停止',
  failed: '创建失败',
  deleted: '已删除',
  install_failed: '创建失败',
  upgrade_failed: '更新失败',
  starting_failed: '重启失败',
  stop_failed: '停止失败',
  delete_failed: '删除失败',
  deploy_failed: '部署失败',
  rollback_failed: '回滚失败',
  null: '无',
  learnmore: '了解详情',
  required: '该字段是必输的',
  connect: '已连接',
  disconnect: '未连接',
  project: '本项目',
  market: '应用市场',
  organization: '本组织',
  public: '全平台',
  filter: '过滤表',
  stop: '停用',
  confirm: '确认',
  previous: '上一步',
  next: '下一步',
  finish: '结束',
  ok: '确定',

  // ist
  ist_create: '创建中',
  ist_stop: '停止中',
  ist_restart: '重启中',
  ist_delete: '删除中',
  ist_update: '更新中',
  // network

  network_create: '网络创建中，请耐心等待',
  network_delete: '网络删除中，请耐心等待',
  network_update: '网络更新中，请耐心等待',
  'network.header.title': '网络管理',
  'network.header.create': '创建网络',
  'network.header.update': '修改网络',
  'network.column.name': '名称',
  'network.column.status': '状态',
  'network.column.env': '环境名称',
  'network.column.ip': '外部IP',
  'network.column.port': '端口',
  'network.column.targetPort': '目标端口',
  'network.column.app': '应用',
  'network.column.version': '版本',
  'network.column.instance': '部署实例',
  'network.delete': '删除网络',
  'network.delete.tooltip': '删除网络后，需要您再去修改相关的域名信息。确定要删除该网络吗',
  'network.env.tooltip': '请先连接环境',
  'network.form.name': '网络名称',
  'network.form.ip': '外部IP',
  'network.form.port': '端口',
  'network.form.targetPort': '目标端口',
  'network.form.app': '应用名称',
  'network.form.instance': '实例',
  'network.name.check.failed': '编码只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾',
  'network.name.check.exist': '名称已存在',
  'network.ip.check.failed': '请输入正确的ip类似 (0-255).(0-255).(0-255).(0-255)',
  'network.instance.check.failed': '请移除不可用实例',
  'network.port.check.failed': '该字段必须是数字且大小在0-65535之间',
  'network.form.version.null': '请先选择一个版本',
  'network.form.version.checked': '该应用下没有多余的可用版本',
  'network.form.app.disable': '请先选择环境',
  'network.form.version.disable': '请先选择应用',
  'network.form.instance.disable': '请先选择版本',
  'network.btn.add': '添加版本',
  'network.form.targetPort.help': '网络选择的目标实例所暴露的端口号',

  // deploymentApp

  'deploy.title': '应用部署',
  'deploy.detail': '部署详情',
  'deploy.info': '部署信息',
  'deploy.stage': '阶段及日志',
  'deploy.status': '容器状态',
  'deploy.istStatus': '实例状态',
  'deploy.appName': '应用名称',
  'deploy.instance': '实例名称',
  'deploy.envName': '环境名称',
  'deploy.app': '应用',
  'deploy.ver': '版本',
  'deploy.env': '环境',
  'deploy.cNumber': '容器数量',
  'deploy.header.title': '部署应用',
  'deploy.step.one.title': '选择应用及版本',
  'deploy.step.one.description': '您可以点击“打开应用列表”，选择本项目的应用或来自应用市场的应用，再在此界面选择需要部署的版本。',
  'deploy.app.add': '打开应用列表',
  'deploy.step.one.app': '选择应用',
  'deploy.step.one.version.title': '选择版本',
  'deploy.step.one.version': '应用版本',
  'deploy.step.two.title': '选择环境及修改配置信息',
  'deploy.step.two.description': '请在此选择需要部署的环境并修改相关配置信息，平台默认会引用该应用上次在该环境部署的信息。',
  'deploy.step.two.env.title': '选择环境',
  'deploy.step.two.env': '环境',
  'deploy.step.two.config': '配置信息',
  'deploy.step.three.title': '选择部署模式',
  'deploy.step.three.description': '平台支持两种部署模式：新建实例和替换实例。新建实例是部署生成新的实例；替换实例是等待新部署生成的副本集通过健康检查后再删除原副本集，但实例不变，只替换其相关参数。',
  'deploy.step.three.mode.title': '选择部署模式',
  'deploy.step.three.mode': '部署模式',
  'deploy.step.three.mode.new': '新建实例',
  'deploy.step.three.mode.replace': '替换实例',
  'deploy.step.three.mode.replace.label': '选择要的替换实例',
  'deploy.step.three.mode.help': '替换实例会更新该实例的镜像及配置信息，请确认要替换的实例选择无误。',
  'deploy.step.four.title': '确认信息及部署',
  'deploy.step.four.app': '应用名称',
  'deploy.step.four.version': '应用版本',
  'deploy.btn.deploy': '部署',
  'deploy.sidebar.project': '项目应用',
  'deploy.sidebar.market': '应用市场',
  'deploy.sidebar.search': '搜索应用',

  // envPipeline
  'envPl.title': '环境流水线',
  'envPl.create': '创建环境',
  'envPl.edit': '修改环境',
  'envPl.update': '修改环境',
  'envPl.form.name': '环境名称',
  'envPl.form.code': '环境编码',
  'envPl.form.description': '环境描述',
  'envPl.close': '关闭',
  'envPl.confirm.disable': '确认禁用',
  'envPl.confirm.content.hasInstance': '该环境下存在实例，不可禁用',
  'envPl.confirm.content.noInstance': '当你点击确认后，该环境将被禁用',
  'envPl.code.copy.tooltip': '复制下文代码至Kubernetes运行，与平台建立链接',
  'envPl.code.check.failed': '编码只能由小写字母、数字、"-"组成，且以小写字母开头，不能以"-"结尾',
  'envPl.code.check.exist': '编码已存在',
  'envPl.name.check.exist': '编码已存在',
  'envPl.token.copy.tooltip': '复制指令',
  'envPl.status.stop': '暂无停用环境',
  'envPl.status.restart': '重启环境',
  'envPl.status.stopped': '已停用',
  'envPl.description': '描述:',
  'envPl.token': '指令',
  'envPl.status.update': '版本过低，请更新',
  'envPl.active': '激活环境',
  'envPl.stop': '停用环境',
  'envPl.add': '请添加一个环境',


  // form
  'form.required': '该字段是必输的',
  'form.save': '保存',
  'form.create': '创建',
  'form.update': '编辑',
  'form.cancel': '取消',
  'form.return': '返回',

  // project
  'project.id': '标识',
  'project.title': '项目管理',
  'project.create': '创建项目',
  'project.edit': '编辑项目',
  'project.name': '项目名称',
  'project.code': '项目编码',

  // app
  'app.title': '应用管理',
  'app.appDetail': '应用详情',
  'app.id': '标识',
  'app.name': '名称',
  'app.type': '应用类型',
  'app.url': '仓库地址',
  'app.active': '状态',
  'app.delete.tip': '这将会删除gitlab代码库，请确认是否删除？',
  'app.detail': '详情',
  'app.stop': '停用',
  'app.run': '启用',
  'app.creating': '创建中',
  'app.synch': '应用同步中',
  'app.start': '请先启用应用',
  'app.create': '创建应用',
  'app.edit': '修改应用',
  'app.chooseTem': '选择应用模板',
  'app.image': '镜像',
  'app.env': '发布环境',
  'app.publish': '发布',
  'app.branchName': '分支名称',
  'app.branch': '分支',
  'app.branchManage': '分支管理',
  'app.branchType': '分支类型',
  'app.commitCode': '提交编码',
  'app.commitDescription': '提交描述',
  'app.commitUser': '提交者',
  'app.stage': '阶段',
  'app.creator': '创建者',
  'app.commitTime': '提交时间',
  'app.pipeline': '流水线',
  'app.status': '服务状态',

  // 应用版本
  'app.version': '应用版本',
  'app.appVersion': '版本',
  'app.commit': '提交',
  'app.group': '应用组',
  'app.code': '编码',
  'app.createTime': '生成时间',

  // user
  'user.password.update': '修改密码',
  'user.password.origin': '原始密码',
  'user.password.origin.required': '原始密码是必须的',
  'user.password.new': '新密码',
  'user.password.new.required': '新密码是必须的',
  'user.password.confirm': '确认密码',
  'user.password.required': '密码是必须的',
  'user.userName': '用户名',
  'user.detail': '用户详情',
  'user.email': '邮箱',
  'user.emailInvalid': '邮箱格式不合法，请输入正确的邮箱！',
  'user.fieldRequired': '该字段是必输的！',
  'user.language': '语言',
  'user.timeZone': '时区',
  'user.source': '认证来源',
  'user.ldap': 'LDAP 用户',
  'user.noLdap': '非LDAP用户',
  'user.statue': '状态',
  'user.statue.enable': '启用',
  'user.statue.disable': '未启用',
  'user.locked': '是否锁住',
  'user.locked.ok': '锁住',
  'user.locked.no': '未锁住',
  'user.addtionInfo': '附加信息',
  user: '用户管理',
  'user.create': '创建用户',
  'user.organization': '组织名称',
  'user.password': '密码',
  'user.edit': '编辑用户',
  'user.userInfo': '个人信息',

  // organizationMember

  'organizationMemberRole.type': '类型',
  'organizationMemberRole.member': '成员',
  'organizationMemberRole.user': '用户',
  'organizationMemberRole.organization': '组织',
  'organizationMemberRole.role': '角色',
  'organizationMemberRole.operate': '操作',
  'organizationMemberRole.cancel': '删除',
  'organizationMemberRole.MemberRoleOrganization': '成员角色管理',
  'organizationMemberRole.add': '添加',
  'organizationMemberRole.lookMethod': '查看方式',
  'organizationMemberRole.refresh': '刷新',
  'organizationMemberRole.save': '保存',

  // projectMemberRole

  'projectMemberRole.type': '类型',
  'projectMemberRole.member': '成员',
  'projectMemberRole.user': '用户',
  'projectMemberRole.organization': '组织',
  'projectMemberRole.role': '角色',
  'projectMemberRole.operate': '操作',
  'projectMemberRole.cancel': '删除',
  'projectMemberRole.MemberRoleOrganization': '成员角色管理',
  'projectMemberRole.add': '添加',
  'projectMemberRole.lookMethod': '查看方式',
  'projectMemberRole.refresh': '刷新',

  // environment
  'environment.title': '环境管理',
  'environment.name': '环境名称',
  'environment.url': '环境地址',
  'environment.token': '环境密钥',
  'environment.active': '环境状态',
  'environment.level': '环境所属',
  'environment.description': '环境描述',

  // template

  'template.title': '应用模板',
  'template.name': '名称',
  'template.description': '描述',
  'template.url': '地址',
  'template.code': '编码',
  'template.type': '来源',
  'template.copyFrom': '复制于现有应用模板',


  // branch
  'branch.create': '创建分支',
  'branch.title': '分支管理',
  'branch.name': '名称',
  'branch.type': '类型',
  'branch.code': '提交编码',
  'branch.des': '提交描述',
  'branch.owner': '提交者',
  'branch.time': '提交时间',
  'branch.tag': '标记',

  // ciPipeline

  'ciPipeline.title': '持续集成',
  'ciPipeline.status': '状态',
  'ciPipeline.sign': '标识',
  'ciPipeline.appCode': '应用编码',
  'ciPipeline.appName': '应用名称',
  'ciPipeline.commit': '提交',
  'ciPipeline.jobs': '阶段',
  'ciPipeline.time': '时长',
  'ciPipeline.createdAt': '创建时间',

  // resource
  
  'resource.title': '资源管理',
  'resource.name': '资源名称',
  'resource.description': '资源描述',
  'resource.type': '资源类型',

  // container
  'container.title': '容器管理',
  'container.status': '状态',
  'container.name': '容器名称',
  'container.app': '应用',
  'container.ip': '容器地址',
  'container.usable': '可用',
  'container.createTime': '已创建',

  // version feature
  'version.feature': '特性',
  'version.commit': '提交',
  'version.creator': '贡献者',
  'version.createTime': '时间',

  // domain

  'domain.header.title': '域名管理',
  'domain.header.create': '创建域名',
  'domain.header.update': '修改域名',
  'domain.header.delete': '删除域名',
  'domain.column.name': '域名名称',
  'domain.column.status': '状态',
  'domain.column.env': '环境名称',
  'domain.column.network': '网络',
  'domain.column.path': '路径',
  'domain.column.domain': '地址',
  'domain.form.domain': '域名地址',
  domain_create: '域名创建中，请耐心等待',
  domain_delete: '域名删除中，请耐心等待',
  domain_update: '域名更新中，请耐心等待',
  'domain.name.check.exist': '名称已存在',
  'domain.name.check.failed': '由小写字母、数字、\'-\'或\'.\'组成，并且必须以字母、数字开始和结束',
  'domain.path.check.exist': '路径在该域名路径下已存在，请更改路径或者域名路径',
  'domain.network.check.failed': '请移除不可用的网络',
  'domain.path.add': '添加路径',
  'domain.path.isnull': '请先填写路径',

  // appstore
  'appstore.title': '应用市场',
  'appstore.noMD': '# 暂无',
  'appstore.deploy': '部署',
  'appstore.category': '分类',
  'appstore.lastDate': '上次更新日期',
  'appstore.doc': '教程和文档',
  'appstore.name': '名称',
  'appstore.contributor': '贡献者',
  'appstore.description': '描述',

  // app-release
  'release.home.header.title': '应用发布',
  'release.home.app.publish': '已发布应用',
  'release.home.app.unpublish': '未发布应用',
  'release.column.level': '发布范围',
  'release.action.version': '版本控制',
  'release.action.publish': '发布应用',
  'release.add.step.one.title': '选择应用',
  'release.add.step.one.description': '您可以在此选择需要发布的应用。',
  'release.add.step.two.title': '选择发布版本',
  'release.add.step.two.description': '您可以在此点击添加版本选择添加需要发布的版本。',
  'release.add.step.two.btn.add': '添加版本',
  'release.add.step.three.title': '选择发布范围',
  'release.add.step.three.description': '请在此选择应用发布的范围。若本组织内所有项目均可使用，则选择本组织；若全平台下的所有项目均可使用，则选择全平台。',
  'release.add.step.three.tooltip': '请注意：发布后不可修改发布范围。',
  'release.add.step.four.description': '您可以在此上传应用图标，填写贡献者、分类及应用描述，维护应用展示信息。',
  'release.add.step.four.title': '填写应用信息。',
  'release.add.step.four.tooltip': '请注意：平台将会提取发布的应用版本中Readme文件展示在应用市场的应用详情页，请先维护好对应的Readme文件后再发布。',
  'release.add.step.four.app.icon': '应用图标',
  'release.add.step.five.title': '确认信息',
  'release.add.step.five.description': '您可以在此确认应用发布的信息，如需修改请返回相应步骤。',
  'release.add.step.five.tooltip': '请注意：该版本发布后不可取消发布，且不可修改发布范围。',
  'release.add.step.five.btn.confirm': '发布',
  'release.edit.header.title': '修改应用信息',
  'release.editVersion.publishTime': '发布时间',
  'release.editVersion.header.title': '查看应用版本',
  'release.editVersion.version.publish': '已发布版本',
  'release.editVersion.version.unpublish': '未发布版本',
  'release.editVersion.modal.title': '确认发布版本',
  'release.editVersion.modal.content': '版本发布后不可取消，确定要发布吗?',
  'release.addVersion.header.title': '添加应用版本',
  'release.addVersion.btn.confirm': '添加',


  // yaml file
  'yaml.lastModify': '上次修改',
  'yaml.modify': '本次修改',
  'yaml.yaml.error': 'yaml 格式错误',
  'yaml.error.tooltip': 'Values文件yaml格式错误，请在应用代码中修改错误并重新生成正确的应用版本。',


  ...pageDetail,

};
export default zhCN;
