<template>
          <a slot="extra" href="#">

            <repository-form ref="repository" :showSubmit="false" />

            <a-button type="primary" @click="validate" :loading="loading">Submit</a-button>
            <span class="popover-wrapper">
               <a-popover title="Form verification information" overlayClassName="antd-pro-pages-forms-style-errorPopover" trigger="click" :getPopupContainer="trigger => trigger.parentNode">
                 <template slot="content">
                   <li v-for="item in errors" :key="item.key" @click="scrollToField(item.key)" class="antd-pro-pages-forms-style-errorListItem">
                     <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon" />
                     <div class="">{{ item.message }}</div>
                     <div class="antd-pro-pages-forms-style-errorField">{{ item.fieldLabel }}</div>
                   </li>
                 </template>
                 <span class="antd-pro-pages-forms-style-errorIcon" v-if="errors.length > 0">
                   <a-icon type="exclamation-circle" />{{ errors.length }}
                 </span>
               </a-popover>
             </span>
          </a>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { axios, request } from '@/utils/request'
    import RepositoryForm from '@/views/kriteria/KriteriaForm'
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
    const columnsuserlist = [
        {
            title: 'Full Name',
            dataIndex: 'name'
        },
        {
            title: 'Area',
            dataIndex: 'area'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Active',
            dataIndex: 'active'
        }
    ]

    export default {
        name: 'UserManage',
        mixins: [mixin, mixinDevice],
        components: {
            FooterToolBar,
            RepositoryForm,
            TaskForm
        },
        data () {
            return {
                description: 'Administering site user',
                loading: false,
                datauserlist: [],
                loadingtableuserlist: false,
                activeswitchloading: false,
                columnsuserlist,
                memberLoading: false,
                errors: []
            }
        },
        methods: {
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
                    url: '/api/v1/manage/user/list',
                    method: 'get',
                    data: {
                        results: 10
                    },
                    type: 'json'
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
                        url: '/api/v1/kriteria',
                        method: 'post',
                        data: {
                            ...values[0]
                        },
                        type: 'json'
                    }).then(data => {
                        console.log(data)
                        $notification.success({
                            message: 'Sukses',
                            description: JSON.stringify(data.message)
                        })
                    })

                    console.log(values[0])
                    /* $notification.success({
                        message: 'Received values of form:',
                        description: JSON.stringify(values)
                    }) */
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
            // this.fetchuserlist()
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
