<template>
  <div>
    <a-row>
      <a-row class="form-row" :gutter="16">
        <a-form layout="vertical" :form="form" class="form">
          <a-row class="form-row" :gutter="16">
            <a-col :lg="3" :md="9" :sm="9">
              <a-form-item
                label="CTP TYPE">
                <a-select
                  v-decorator="[
                    'ctptype',
                    {
                      initialValue : 'Grapari',
                      rules: [{ required: true}]}
                  ]">
                  <a-select-option value="Grapari">
                    Grapari
                  </a-select-option>
                  <a-select-option value="Grapari Mitra">
                    Grapari Mitra
                  </a-select-option>
                  <a-select-option value="GTG">
                    GTG
                  </a-select-option>
                  <a-select-option value="CC">
                    CC
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="5" :md="15" :sm="15">
              <a-form-item
                label="CTP NAME">
                <a-input
                  v-decorator="[
                    'ctp',
                    {rules: [{ required: true}]}
                  ]"
                  name="shop"
                  placeholder="" />
              </a-form-item>
            </a-col>

            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Account">
                <a-input
                  v-decorator="[
                    'account',
                    {rules: [{ required: true}]}
                  ]"
                  name="account"
                  placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="8" :sm="16">
              <a-form-item
                label="MSISDN">
                <a-input-number
                  style="width: 100%"
                  v-decorator="[
                    'MSISDN',
                    {rules: [{ type:'number', required: true}]}
                  ]"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '')"
                  :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                  name="msisdn"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="2" :md="4" :sm="8">
              <a-form-item
                label="BC">
                <a-select
                  v-decorator="[
                    'bill_cycle',
                    {
                      initialValue : '1',
                      rules: [{ required: true}]}
                  ]">
                  <a-select-option value="1">
                    1
                  </a-select-option>
                  <a-select-option value="6">
                    6
                  </a-select-option>
                  <a-select-option value="11">
                    11
                  </a-select-option>
                  <a-select-option value="16">
                    16
                  </a-select-option>
                  <a-select-option value="20">
                    20
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Status MSISDN"
              >
                <a-select
                  v-decorator="[
                    'statusmsisdn',
                    {
                      initialValue : 'active',
                      rules: [{ required: true}]}
                  ]">
                  <a-select-option value="active">
                    ACTIVE
                  </a-select-option>
                  <a-select-option value="BLOCK I">
                    BLOCK I
                  </a-select-option>
                  <a-select-option value="BLOCK II">
                    BLOCK II
                  </a-select-option>
                  <a-select-option value="CEASE">
                    CEASE
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="LOS"
              >
                <a-select
                  v-decorator="[
                    'los',
                    {
                      initialValue : '',
                      rules: [{ required: false}]}
                  ]">
                  <a-select-option value="">---LOS---</a-select-option>
                  <a-select-option value="1 s/d 3 bulan">
                    1 s/d 3 bulan
                  </a-select-option>
                  <a-select-option value="3 s/d 6 bulan">
                    3 s/d 6 bulan
                  </a-select-option>
                  <a-select-option value="6 s/d 12 bulan">
                    6 s/d 12 bulan
                  </a-select-option>
                  <a-select-option value="12 s/d 24 bulan">
                    12 s/d 24 bulan
                  </a-select-option>
                  <a-select-option value="diatas 2 tahun">
                    diatas 2 tahun
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="ARPU">
                <a-input-number
                  style="width: 100%"
                  v-decorator="[
                    'arpu',
                    {rules: [{ type:'number', required: false}]}
                  ]"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Bulan Tagihan">
                <a-month-picker
                  format="YYYY-MM"
                  style="width: 100%"
                  v-decorator="[
                    'bulantagihan',
                    {rules: [{ required: true }]}
                  ]" />
              </a-form-item>
            </a-col>

            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Nominal">
                <a-input-number
                  style="width: 100%"
                  v-decorator="[
                    'nominal',
                    {rules: [{ type:'number', required: true}]}
                  ]"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                />
              </a-form-item>
            </a-col>

            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Reason">
                <a-select
                  v-decorator="[
                    'reason',
                    {
                      initialValue : 'GPRS Normal',
                      rules: [{ required: true}]}
                  ]">
                  <a-select-option value="GPRS Normal">
                    GPRS Normal
                  </a-select-option>
                  <a-select-option value="Pemakaian melebihi Limit">
                    Pemakaian melebihi Limit
                  </a-select-option>
                  <a-select-option value="PAKET ROAMING TIDAK BISA DIGUNAKAN">
                    PAKET ROAMING TIDAK BISA DIGUNAKAN
                  </a-select-option>
                  <a-select-option value="CHARGING VOICE ROAMING">
                    CHARGING VOICE ROAMING
                  </a-select-option>
                  <a-select-option value="Paket data domestik">
                    Paket data domestik
                  </a-select-option>
                  <a-select-option value="SMS internasional">
                    SMS internasional
                  </a-select-option>
                  <a-select-option value="Aktivasi berhasil paket tidak didapatkan">
                    Aktivasi berhasil paket tidak didapatkan
                  </a-select-option>
                  <a-select-option value="Lain-lain">
                    Lain-lain
                  </a-select-option>
                  <a-select-option value="Double tagihan">
                    Double tagihan
                  </a-select-option>
                  <a-select-option value="Program bundling">
                    Program bundling
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Tanggal Adjustment">
                <a-date-picker
                  format="YYYY-MM"
                  style="width: 100%"
                  v-decorator="[
                    'tgl_adj',
                    {rules: [{ required: true }]}
                  ]" />
              </a-form-item>
            </a-col>

            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="nomor Nodin/BA">
                <a-input
                  style="width: 100%"
                  v-decorator="[
                    'nodin_ba',
                    {rules: [{ required: true}]}
                  ]"
                />
              </a-form-item>
            </a-col>

            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="User Eksekutor">
                <a-input
                  style="width: 100%"
                  v-decorator="[
                    'user_eksekutor',
                    {rules: [{ required: true}]}
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item
            label="Notes DSC">
            <a-textarea v-decorator="[ 'notes_dsc', {rules: [{ required: true}]} ]" rows="4" />
          </a-form-item>
        </a-form>
      </a-row>
    </a-row>
  </div>
</template>

<script>
    import { mixin, mixinDevice } from '@/utils/mixin'

    export default {
        name: 'Adj2Form',
        mixins: [mixin, mixinDevice],
        data () {
            return {
                form: this.$form.createForm(this)
            }
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
