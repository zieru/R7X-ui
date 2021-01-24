<template>
  <div>
    <div v-if="profileadjs.id < 1">
      <div class="main" style="max-width: 368px;margin:auto;">
        <h3 align="center">Login To Continue</h3>
        <a-form-model
          class="user-layout-login"
          :v-model="loginadjs"
          onsubmit="handleLoginInApps()"
        >
          <a-form-item>
            <a-input
              size="large"
              type="text"
              v-model="loginadjs.username"
              placeholder="Username"
              v-decorator="[
                'email',
                {rules: [{ required: true, message: 'Please enter account name or email address'}, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              size="large"
              type="password"
              v-model="loginadjs.password"
              option.initialValue="zierong7"
              autocomplete="false"
              placeholder="Password"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please enter the password' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input-password>
          </a-form-item>
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              class="login-button"
              htmlType="submit"
              @click="handleLoginInApps"
              :loading="loadings.formlogin"
            >Sign In</a-button>

          </a-form-item>
        </a-form-model>
      </div>
    </div>
    <a-tabs
      v-else
      default-active-key="1"
      tab-position="left"
    >
      <a-tab-pane key="0">
        <span slot="tab">Logged in as {{ profileadjs.name }}</span>
        <pre>{{ profileadjs }}</pre>
      </a-tab-pane>
      <a-tab-pane key="1" tab="Report">
        <a-tabs
          default-active-key="1"
          tab-position="left"
        >
          <a-tab-pane key="1" tab="Adjustment">
            <div class="card-container">
              <a-tabs
                default-active-key="1"
                type="card"
              >
                <a-tab-pane key="1" tab="User">
                  <a-button @click="fetchuserlist()" type="primary" :loading="loadingtableuserlist">Refresh</a-button>
                  <a-month-picker
                    placeholder="Select month"
                    @change="onChangeadjuser"
                    format="YYYY-MM"
                    :default-value="dateuserlist.user"/>
                  <a-table
                    :loading="loadingtableuserlist"
                    :data-source="datauserlist.user"
                    bordered
                    :columns="columnsuserlist.user"
                    size="small"
                  >
                    <router-link slot="action" slot-scope="text" :to="{ path: 'adjrefreason', params: { user: text.user_eksekutor }}">view details {{ text.nominal }}</router-link>
                  </a-table>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Reason">
                  <a-button @click="fetchuserlist('reason')" type="primary" :loading="loadingtableuserlist">Refresh</a-button>
                  <a-month-picker
                    placeholder="Select month"
                    @change="onChangeadjreason"
                    format="YYYY-MM"
                    :default-value="dateuserlist.reason"/>

                  <a-drawer width="640" placement="right" :visible="AdjDetailshow" @close="closeAdjDetail">
                    <a-row>
                      Hello World !
                    </a-row>
                  </a-drawer>
                  <a-table
                    :loading="loadingtableuserlist"
                    :data-source="datauserlist.reason"
                    bordered
                    :columns="columnsuserlist.reason"
                    size="small"
                  >
                    <span slot="action" slot-scope="text, record">
                      <a v-if="record.id > 0" @click="showAdjDetail(record.id)">Detail</a>
                    </span>
                  </a-table>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Refund">
            <div class="card-container">
              <a-tabs
                default-active-key="1"
                type="card"
              >
                <a-tab-pane key="1" tab="User">
                  <a-button @click="fetchRefundlist()" type="primary" :loading="loadings.reportRefundList.user">Refresh</a-button>
                  <a-month-picker
                    placeholder="Select month"
                    @change="onChangerefuser"
                    format="YYYY-MM"
                    :default-value="daterefundlist.user"/>
                  <a-table
                    :loading="loadings.reportRefundList.user"
                    :data-source="reportRefundList.user"
                    bordered
                    :columns="columnsrefundlist.user"
                    size="small"
                  />
                </a-tab-pane>
                <a-tab-pane key="2" tab="Reason">
                  <a-button @click="fetchRefundlist('reason')" type="primary" :loading="loadings.reportRefundList.reason">Refresh</a-button>
                  <a-month-picker
                    placeholder="Select month"
                    @change="onChangerefreason"
                    format="YYYY-MM"
                    :default-value="daterefundlist.reason"/>
                  <a-table
                    :loading="loadings.reportRefundList.reason"
                    :data-source="reportRefundList.reason"
                    bordered
                    :columns="columnsrefundlist.reason"
                    size="small"
                  />
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
      <!--<a-tab-pane v-if="profileadjs.user_group.name !== 'GUEST'" key="2" tab="Import Adj">
        <div v-if="formOpen">
          <a-row>
            <a-col :md="12">
              <a-card class="card" title="Import Adjustment" :bordered="false">
                <a-alert
                  v-if="alertadjs.error !== false"
                  type="error"
                  show-icon
                >
                  <span slot="message">{{ alertadjs.error }}</span>
                </a-alert>
                <a-alert
                  v-if="alertadjs.success !== false"
                  type="success"
                  show-icon
                >
                  <span slot="message">{{ alertadjs.success }}</span>
                </a-alert>
                <a-divider></a-divider>
                <a-upload v-if="alertadjs.success === false" :file-list="fileList" :before-upload="beforeUpload">
                  <a-button> <a-icon type="upload" /> Select File </a-button>
                </a-upload>
                <a-popconfirm
                  title="Upload file Now ?"
                  ok-text="Yes"
                  cancel-text="No"
                  :disabled="fileList.length === 0"
                  :loading="uploading"
                  @confirm="handleUpload"
                >
                  <a-button
                    type="primary"
                    :disabled="fileList.length === 0"
                    :loading="uploading"
                    style="margin-top: 16px"
                  >
                    {{ uploading ? 'Uploading' : 'Start Upload' }}
                  </a-button>

                </a-popconfirm>
              </a-card>
            </a-col>
            <a-col :md="6">
              <a-alert
                message="Informational Notes"
                type="info"
                show-icon
              >
                <span slot="description">Download template <a :href="downloadlink+'/doc/formadjustment.xlsx'">here</a></span>
              </a-alert>
            </a-col>
          </a-row>

        </div>
        <exception-page v-else type="expired" />
      </a-tab-pane>
      <a-tab-pane v-if="profileadjs.user_group.name !== 'GUEST'" key="3" tab="Import Ref">
        <RefForm v-if="formOpen"/>
        <exception-page v-else type="expired" />
      </a-tab-pane>-->
      <a-tab-pane v-if="profileadjs.user_group.name !== 'GUEST'" key="11" tab="Adjustment">
        <Adj2Form v-if="formOpen"/>
        <exception-page v-else type="expired" />
      </a-tab-pane>
      <a-tab-pane v-if="profileadjs.user_group.name !== 'GUEST'" key="12" tab="Refund">
        <Ref2Form v-if="formOpen"/>
        <exception-page v-else type="expired" />
      </a-tab-pane>
      <a-tab-pane v-if="profileadjs.user_group.name === 'ADMIN'" key="5" tab="Settings">
        <a-card title="Restrict Form" :loading="loadings.restrictform" :bordered="false" style="width: 300px">
          <a-form-model :model="settingform">
            <a-switch v-model="settingform.restrictform" :loading="loadings.restrictformcheck" @change="changerestrictform" />
            <a-tag v-if="settingform.restrictform">Import on 5th days only</a-tag>
            <a-tag v-else>Import will be allowed anytime</a-tag>
          </a-form-model>
          <pre>{{ settingform }}</pre>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
    import RepositoryForm from '@/views/form/admin/manage-user/RepositoryForm'
    import TaskForm from '@/views/form/advancedForm/TaskForm'
    import FooterToolBar from '@/components/FooterToolbar'
    import { mixin, mixinDevice } from '@/utils/mixin'
    import RefForm from '@/views/form/adjref/Ref'
    import Adj2Form from '@/views/form/adjref/Adj2'
    import Ref2Form from '@/views/form/adjref/Ref2'
    import moment from 'moment'
    import { ExceptionPage } from '@/components'
    const fieldLabels = {
        name: '仓库名',
        url: '仓库域名',
        owner: '仓库管理员',
        approver: '审批人',
        dateRange: '生效日期',
        type: '仓库类型',
        name2: '任务名',
        url2: '任务描述',
        owner2: '执行人',
        approver2: '责任人',
        dateRange2: '生效日期',
        type2: '任务类型'
    }
    const columnsuserlist =
      {
        user: [
          {
            title: 'User',
            dataIndex: 'user_eksekutor'
          },
          {
            title: 'Reason',
            dataIndex: 'reason'
          },
          {
            title: 'MSISDN',
            dataIndex: 'msisdn'
          },
          {
            title: 'Nominal',
            dataIndex: 'nominal'
          }
        ],
        reason: [
          {
            title: 'Reason',
            dataIndex: 'reason'
          },
          {
            title: 'User',
            dataIndex: 'user_eksekutor'
          },
          {
            title: 'MSISDN',
            dataIndex: 'msisdn'
          },
          {
            title: 'Nominal',
            dataIndex: 'nominal'
          },
          {
            title: 'Action',
            dataIndex: 'id',
            scopedSlots: { customRender: 'action' }
          }
        ]
      }
    const columnsrefundlist =
      {
        user: [
          {
            title: 'User',
            dataIndex: 'user_eksekutor'
          },
          {
            title: 'MSISDN',
            dataIndex: 'msisdn'
          },
          {
            title: 'Nominal',
            dataIndex: 'nominal'
          },
          {
            title: 'Reason',
            dataIndex: 'reason'
          }],
        reason: [
          {
            title: 'Reason',
            dataIndex: 'reason'
          },
          {
            title: 'MSISDN',
            dataIndex: 'msisdn'
          },
          {
            title: 'Nominal',
            dataIndex: 'nominal'
          },
          {
            title: 'User',
            dataIndex: 'user_eksekutor'
          }]
        }

    export default {
        name: 'Adj',
        mixins: [mixin, mixinDevice],
        components: {
            FooterToolBar,
            RepositoryForm,
            TaskForm,
            RefForm,
            ExceptionPage,
            Adj2Form,
            Ref2Form
        },
        data () {
            return {
                downloadlink: process.env.VUE_APP_API_BASE_URL,
                AdjDetailshow: false,
                loadings: {
                  formlogin: false,
                  restrictform: false,
                  restrictformcheck: false,
                  reportRefundList: {
                    user: false,
                    reason: false
                  }
                  },
                settingform: { restrictform: false },
                maxdate: moment().format('DD'),
                loading: false,
                datauserlist: {
                  user: null,
                  reason: null
                },
                dateuserlist: {
                  user: moment().format('YYYY-MM'),
                  reason: moment().format('YYYY-MM')
                },
                daterefundlist: {
                  user: moment().format('YYYY-MM'),
                  reason: moment().format('YYYY-MM')
                },
                reportRefundList: {
                  user: null,
                  reason: null
                },
                loadingtableuserlist: false,
                activeswitchloading: false,
                columnsuserlist,
                columnsrefundlist,
                memberLoading: false,
                errors: [],
                fileList: [],
                uploading: false,
                alertadjs: { error: false, success: false },
                loginadjs: { state: false },
                profileadjs: { id: 0, name: null }
            }
        },
        computed: {
          formOpen () {
            return this.maxdate <= 5 || Boolean(this.settingform.restrictform) === false
          }
        },
        methods: {
          closeAdjDetail () {
            this.AdjDetailshow = false
            return true
          },
          showAdjDetail (id) {
            console.log(id)
            this.AdjDetailshow = true
            return true
          },
          onChangeadjuser (date, dateString) {
            this.dateuserlist.user = dateString
            return this.fetchuserlist('user')
          },
          onChangeadjreason (date, dateString) {
            this.dateuserlist.reason = dateString
            return this.fetchuserlist('reason')
          },
          onChangerefuser (date, dateString) {
            this.daterefundlist.user = dateString
            return this.fetchRefundlist('user')
          },
          onChangerefreason (date, dateString) {
            this.daterefundlist.reason = dateString
            return this.fetchRefundlist('reason')
          },
          changerestrictform  () {
            this.loadings.restrictformcheck = true
            return new Promise((resolve, reject) => {
              this.$http({
                url: 'api/v1/config/adj_form_open',
                data: { value: this.settingform.restrictform, _method: 'PATCH' },
                method: 'POST'
              }).then(response => {
                console.log('reponse setingform', response)
                // this.formOpen()
                this.loadings.restrictformcheck = false
              }).catch(error => {
                // this.$message.error({ content: error.message, msgkey })
                reject(error)
              })
            })
          },
          checkAllowFormImport () {
            this.loadings.restrictform = true
            return new Promise((resolve, reject) => {
              this.$http({
                url: 'api/v1/config/adj_form_open',
                method: 'get'
              }).then(response => {
                  this.settingform.restrictform = (response.value === 'true')
                  this.loadings.restrictform = false
              }).catch(error => {
                // this.$message.error({ content: error.message, msgkey })
                reject(error)
              })
            })
          },
            handleUsernameOrEmail (rule, value, callback) {
                const { state } = this
                const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
                if (regex.test(value)) {
                    state.loginType = 0
                } else {
                    state.loginType = 1
                }
                callback()
            },
            handleLoginInApps (e) {
                const msgkey = 'logon'
                this.loadings.formlogin = true
                this.$message.loading({ content: 'Authenticating...', msgkey })
                return new Promise((resolve, reject) => {
                    this.$http({
                        url: 'api/v1/authcheck',
                        method: 'post',
                        data: this.loginadjs
                    }).then(response => {
                        console.log('response', response)
                        this.$message.success({ content: 'HI ! ' + response.name, msgkey })
                        this.profileadjs = response
                        this.checkAllowFormImport()
                      this.fetchuserlist()
                      this.loadings.formlogin = false
                    }).catch(error => {
                        this.$message.error({ content: error.message, msgkey })
                        reject(error)
                      this.loadings.formlogin = false
                    })
                })
                // this.loginadjs.state = true
            },
            handleRemove (file) {
                const index = this.fileList.indexOf(file)
                const newFileList = this.fileList.slice()
                newFileList.splice(index, 1)
                this.fileList = newFileList
            },
            handleUpload () {
                const self = this
                const { fileList } = this
                const formData = new FormData()
                fileList.forEach(file => {
                    formData.append('files', file)
                })
                self.alertadjs.success = self.alertadjs.error = false
                this.uploading = true
                const msgkey = 'upload'
                this.$message.loading({ content: 'uploading...', msgkey })
                // You can use any AJAX library you like
                this.$http({
                    url: 'api/v1/adjustment',
                    method: 'post',
                    processData: true,
                    data: formData
                }).then((response) => {
                  self.alertadjs.success = response.message + ' To prevent duplicate upload, you need to relogin for reuploading'

                  this.fileList = []
                  self.$message.success('upload successfully.', msgkey)
                }).catch(function (error) {
                  self.$message.error('upload failed.', msgkey)
                  if (error.response) {
                    self.alertadjs.error = error.response.data.message
                  } else {
                    self.alertadjs.error = 'The request was made but no response was received from the server'
                  }
                })
                this.uploading = false
            },
            beforeUpload (file) {
                this.fileList = [this.fileList, file]
                return false
            },
            handleSubmit (e) {
                e.preventDefault()
            },
            fetchuserlist (tipe = 'user') {
                let date = null
                if (tipe === 'user') date = this.dateuserlist.user
                if (tipe === 'reason') date = this.dateuserlist.reason
                console.log('date', this.dateuserlist.reason)
                const param = { grup: tipe, period: date }
                this.loadingtableuserlist = true
                this.activeswitchloading = true
                // this.datauserlist = []
                this.$http({
                    url: 'api/v1/adjustmentreport',
                    method: 'get',
                    data: {
                        results: 10
                    },
                    params: param
                }).then(data => {
                    this.activeswitchloading = this.loadingtableuserlist = false
                    if (tipe === 'reason') this.datauserlist.reason = data.data
                    if (tipe === 'user') this.datauserlist.user = data.data
                })
            },
          fetchRefundlist (tipe = 'user') {
            let date = null
            if (tipe === 'user') {
              this.loadings.reportRefundList.user = true
              date = this.daterefundlist.user
            }
            if (tipe === 'reason') {
              this.loadings.reportRefundList.reason = true
              date = this.daterefundlist.reason
            }
            const param = { grup: tipe, period: date }
            // this.datauserlist = []
            this.$http({
              url: 'api/v1/refund',
              method: 'get',
              data: {
                results: 10
              },
              params: param
            }).then(data => {
              if (tipe === 'reason') {
                this.loadings.reportRefundList.reason = false
                this.reportRefundList.reason = data.data
              }
              if (tipe === 'user') {
                this.loadings.reportRefundList.user = false
                this.reportRefundList.user = data.data
              }
            })
          },
            // 最终全页面提交
            validate () {
                const { $refs: { repository }, $notification } = this
                const repositoryForm = new Promise((resolve, reject) => {
                    repository.form.validateFields((err, values) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        resolve(values)
                    })
                })
                // clean this.errors
                this.errors = []
                Promise.all([repositoryForm]).then(values => {
                    this.$http({
                        url: '/api/v1/register',
                        method: 'post',
                        data: {
                            ...values[0]
                        },
                        type: 'json'
                    }).then(data => {
                        console.log(data)
                    })

                    console.log(values[0])
                    $notification.success({
                        message: 'Received values of form:',
                        description: JSON.stringify(values)
                    })
                }).catch(() => {
                    const errors = Object.assign({}, repository.form.getFieldsError())
                    const tmp = { ...errors }
                    this.errorList(tmp)
                })
            },
            errorList (errors) {
                if (!errors || errors.length === 0) {
                    return
                }
                this.errors = Object.keys(errors)
                    .filter(key => errors[key])
                    .map(key => ({
                        key: key,
                        message: errors[key][0],
                        fieldLabel: fieldLabels[key]
                    }))
            },
            scrollToField (fieldKey) {
                const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
                if (labelNode) {
                    labelNode.scrollIntoView(true)
                }
            }
        },
        mounted () {

        }
    }
</script>

<style>
  .popover-wrapper {
  /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
    min-width: 256px;
    max-height: 290px;
    padding: 0;
    overflow: auto;
  }
  }
  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;
  i {
    margin-right: 4px;
  }
  }
  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

  &:hover {
     background: #e6f7ff;
   }
  .antd-pro-pages-forms-style-errorIcon {
    float: left;
    margin-top: 4px;
    margin-right: 12px;
    padding-bottom: 22px;
    color: #f5222d;
  }
  .antd-pro-pages-forms-style-errorField {
    margin-top: 2px;
    color: rgba(0,0,0,.45);
    font-size: 12px;
  }
  }
  thead.ant-table-thead{
    background: #f5222d !important; /* Old browsers */
    background: -moz-linear-gradient(163deg, #f5222d 1%, #6d0019 100%) !important; /* FF3.6-15 */
    background: -webkit-linear-gradient(163deg, #f5222d 1%,#6d0019 100%) !important; /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(163deg, #f5222d 1%,#6d0019 100%) !important;
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f5222d', endColorstr='#6d0019',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }

  ant-table-row ant-table-row-level-1{
    background:gray;
  }
</style>
<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
