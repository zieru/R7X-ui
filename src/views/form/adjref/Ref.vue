<template>
  <div>
    <a-row>
      <a-col :md="12">
        <a-card class="card" title="Import Refund" :bordered="false">
          <a-alert
            v-if="alertrefs.error !== false"
            type="error"
            show-icon
          >
            <span slot="message">{{ alertrefs.error }}</span>
          </a-alert>
          <a-alert
            v-if="alertrefs.success !== false"
            type="success"
            show-icon
          >
            <a-divider/>
            <span slot="message">{{ alertrefs.success }}</span>
          </a-alert>
          <a-upload v-if="alertrefs.success === false" :file-list="fileList" :before-upload="beforeUpload">
            <a-button> <a-icon type="upload" /> Select File </a-button>
          </a-upload>
          <a-popconfirm
            title="Upload file Now ?"
            ok-text="Yes"
            cancel-text="No"
            :disabled="fileList.length === 0"
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
          <span slot="description">Download template <a :href="downloadlink+'/doc/formrefund.xlsx'">here</a></span>
        </a-alert>
      </a-col>
    </a-row>
  </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { axios, request } from '@/utils/request'
    import RepositoryForm from '@/views/form/admin/manage-user/RepositoryForm'
    import TaskForm from '@/views/form/advancedForm/TaskForm'
    import FooterToolBar from '@/components/FooterToolbar'
    import { mixin, mixinDevice } from '@/utils/mixin'

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

    export default {
        name: 'Ref',
        mixins: [mixin, mixinDevice],
        components: {
            FooterToolBar,
            RepositoryForm,
            TaskForm
        },
        data () {
            return {
                downloadlink: process.env.VUE_APP_API_BASE_URL,
                loading: false,
                datauserlist: [],
                loadingtableuserlist: false,
                activeswitchloading: false,
                memberLoading: false,
                errors: [],
                fileList: [],
                uploading: false,
                alertrefs: { error: false, success: false }
            }
        },
        methods: {
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
                this.uploading = true
                const msgkey = 'upload'
                this.$message.loading({ content: 'uploading...', msgkey })
                // You can use any AJAX library you like
                axios({
                    url: 'api/v1/refund',
                    method: 'post',
                    processData: true,
                    data: formData
                }).then((response) => {
                  self.alertrefs.success = response.message + ' To prevent duplicate upload, you need to relogin for reuploading'
                  this.fileList = []
                  this.$message.success('upload successfully.')
                }).catch(function (error) {
                  this.$message.error('upload failed.')
                  if (error.response) {
                    self.alertrefs.error = error.response.data.message
                  } else {
                    self.alertrefs.error = 'The request was made but no response was received from the server'
                  }
                })
                this.uploading = false
            },
            beforeUpload (file) {
                this.fileList = [this.fileList, file]
                return false
            },
            onChangeActiveUser (checked, val) {
                this.activeswitchloading = true
                const i = checked ? 1 : 0
                const params = {
                    user_id: val,
                    active: i
                }
                console.log(val)
                console.log(`a-switch to ${checked} ${val}`)
                axios({
                    url: '/api/v1/manage/user/activateuser',
                    method: 'post',
                    data: {
                        ...params
                    },
                    type: 'json'
                }).then(data => {
                    console.log(data)
                    console.log(data.data[0])
                    if (data.data[0].success === '1') {
                        const active = data.data[0].active ? 'Activated' : 'Deactivated'
                        console.log(data.data[0])
                        this.$message.success(data.data[0].name + ' has been ' + active)
                    }

                    this.activeswitchloading = this.loadingtableuserlist = false
                    this.fetchuserlist()
                })
            },
            handleSubmit (e) {
                e.preventDefault()
            },
            fetchuserlist () {
                this.loadingtableuserlist = true
                this.activeswitchloading = true
                // this.datauserlist = []
                axios({
                    url: 'api/v1/adjustment',
                    method: 'get',
                    data: {
                        results: 10
                    }
                }).then(data => {
                    this.activeswitchloading = this.loadingtableuserlist = false
                    this.datauserlist = data.data
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
                    axios({
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
            this.fetchuserlist()
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
</style>
