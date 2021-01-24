<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">

      <a-card-grid style="width:50%;text-align:center">
        <a-month-picker placeholder="Select month" @change="refreshMonthTarget" />
      </a-card-grid>

      <a-card-grid style="width:50%;text-align:center">
        <a-skeleton v-if="disabled" :active="loading"/>
        <a-form-model v-else layout="inline" :model="formInline">
          <a-input addon-before="target Sumbagut" v-model="formInline.monthtargetSumbagut" />
          <a-input addon-before="target Sumbagteng" v-model="formInline.monthtargetSumbagteng" />
          <a-input addon-before="target Sumbagsel" v-model="formInline.monthtargetSumbagsel" />
          <a-input addon-before="target Area" v-model="formInline.monthtargetArea" />
          <a-button type="primary" @click="storeMonthTarget">
            Save
          </a-button>
        </a-form-model>
      </a-card-grid>
    </a-row>
  </div>
</template>

<script>
    import AvatarModal from './AvatarModal'

    export default {
        components: {
            AvatarModal
        },
        data () {
            return {
                monthtargetDate: null,
                disabled: true,
                loading: false,
                formInline: {
                    user: '',
                    monthtargetSumbagut: '',
                    monthtargetSumbagteng: '',
                    monthtargetSumbagsel: '',
                    monthtargetArea: ''
                }
            }
        },

        methods: {
            refreshMonthTarget (date, datestring) {
                const self = this
                this.monthtargetDate = datestring
                this.formInline.monthtargetSumbagut = this.formInline.monthtargetArea = this.formInline.monthtargetSumbagteng = this.formInline.monthtargetSumbagsel = ''
                this.disabled = this.loading = true
                const params = { start: datestring }
                this.$http({
                    url: '/api/v1/billCo/dashboard/inputtarget',
                    method: 'get',
                    params: {
                        ...params
                    },
                    type: 'json'
                }).then(response => {
                    response.data.forEach(function (entry) {
                      console.log(entry)
                      if (entry.regional === 'Sumbagut') self.formInline.monthtargetSumbagut = entry.target
                      if (entry.regional === 'Sumbagteng') self.formInline.monthtargetSumbagteng = entry.target
                      if (entry.regional === 'Sumbagsel') self.formInline.monthtargetSumbagsel = entry.target
                      if (entry.regional === 'AREA1') self.formInline.monthtargetArea = entry.target
                    })
                  this.loading = false
                  this.disabled = false
                })
            },
            storeMonthTarget () {
                this.loading = true
                const params = { periode: this.monthtargetDate, sumbagut: this.formInline.monthtargetSumbagut, sumbagteng: this.formInline.monthtargetSumbagteng, sumbagsel: this.formInline.monthtargetSumbagsel, area1: this.formInline.monthtargetArea }
                this.$http({
                    url: '/api/v1/billCo/dashboard/inputtarget',
                    method: 'post',
                    data: {
                        ...params
                    },
                    type: 'json'
                }).then(data => {
                  this.loading = false
                    return null
                })
            }
        }
    }
</script>

<style lang="less" scoped>

    .avatar-upload-wrapper {
        height: 200px;
        width: 100%;
    }

    .ant-upload-preview {
        position: relative;
        margin: 0 auto;
        width: 100%;
        max-width: 180px;
        border-radius: 50%;
        box-shadow: 0 0 4px #ccc;

        .upload-icon {
            position: absolute;
            top: 0;
            right: 10px;
            font-size: 1.4rem;
            padding: 0.5rem;
            background: rgba(222, 221, 221, 0.7);
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.2);
        }
        .mask {
            opacity: 0;
            position: absolute;
            background: rgba(0,0,0,0.4);
            cursor: pointer;
            transition: opacity 0.4s;

            &:hover {
                opacity: 1;
            }

            i {
                font-size: 2rem;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -1rem;
                margin-top: -1rem;
                color: #d6d6d6;
            }
        }

        img, .mask {
            width: 100%;
            max-width: 180px;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
        }
    }
</style>
