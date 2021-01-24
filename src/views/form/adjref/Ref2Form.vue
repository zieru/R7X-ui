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
                label="MSISDN">
                <a-input-number
                  style="width: 100%"
                  v-decorator="[
                    'MSISDN',
                    {rules: [{ type:'number', required: true}]}
                  ]"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '')"
                  :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Tanggal Permintaan">
                <a-date-picker
                  style="width: 100%"
                  v-decorator="[
                    'tanggalPermintaan',
                    {rules: [{ required: true }]}
                  ]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Tanggal Eksekusi">
                <a-date-picker
                  style="width: 100%"
                  name="tanggaleksekusi"
                  v-decorator="[
                    'tanggalEksekusi',
                    {rules: [{ required: true }]}
                  ]"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Amount">
                <a-input-number
                  style="width: 100%"
                  name="amount"
                  v-decorator="[
                    'amount',
                    {rules: [{ type:'number', required: true}]}
                  ]"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Balance">
                <a-input-number
                  style="width: 100%"
                  name="balance"
                  v-decorator="[
                    'balance',
                    {rules: [{ type:'number', required: true}]}
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
                label="New Balance">
                <a-input-number
                  style="width: 100%"
                  name="newbalance"
                  v-decorator="[
                    'newbalance',
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
                  @change="changereason"
                  v-decorator="[
                    'reason',
                    {
                      initialValue : 'Aktivasi Gagal Pulsa Terpotong',
                      rules: [{ required: true}]}
                  ]">
                  <a-select-option value="Aktivasi Gagal Pulsa Terpotong">
                    Aktivasi Gagal Pulsa Terpotong
                  </a-select-option>
                  <a-select-option value="Charging Aktivasi Berulang-ulang">
                    Charging Aktivasi Berulang-ulang
                  </a-select-option>
                  <a-select-option value="Disconnect Berhasil Kuota Berkurang">
                    Disconnect Berhasil Kuota Berkurang
                  </a-select-option>
                  <a-select-option value="Download Content Gagal Pulsa Berkurang">
                    Download Content Gagal Pulsa Berkurang
                  </a-select-option>
                  <a-select-option value="Ganti Paket Gagal, Pulsa Terpotong">
                    Ganti Paket Gagal, Pulsa Terpotong
                  </a-select-option>
                  <a-select-option value="Ketidaksesuain Tarif Aktivasi">
                    Ketidaksesuain Tarif Aktivasi
                  </a-select-option>
                  <a-select-option value="Ketidaksesuain Tarif Penggunaan Layanan">
                    Ketidaksesuain Tarif Penggunaan Layanan
                  </a-select-option>
                  <a-select-option value="Lain-lain">
                    Lain-lain
                  </a-select-option>
                  <a-select-option value="Penyesuaian untuk Recharge">
                    Penyesuaian untuk Recharge
                  </a-select-option>
                  <a-select-option value="Pulsa Terlambat Diterima">
                    Pulsa Terlambat Diterima
                  </a-select-option>
                  <a-select-option value="Pulsa Tiba-tiba Berkurang (Tanpa Rincian)">
                    Pulsa Tiba-tiba Berkurang (Tanpa Rincian)
                  </a-select-option>
                  <a-select-option value="Pulsa Yang Diterima Tidak Sesuai">
                    Pulsa Yang Diterima Tidak Sesuai
                  </a-select-option>
                  <a-select-option value="Top Up Berhasil Pulsa Belum Bertambah">
                    Top Up Berhasil Pulsa Belum Bertambah
                  </a-select-option>
                  <a-select-option value="Tarif Transaksi m-Commerce Tidak Sesuai">
                    Tarif Transaksi m-Commerce Tidak Sesuai
                  </a-select-option>
                  <a-select-option value="Transaksi m-Comm Gagal Saldo Berkurang">
                    Transaksi m-Comm Gagal Saldo Berkurang
                  </a-select-option>
                  <a-select-option value="Transfer Pulsa, Pulsa Belum Bertambah">
                    Transfer Pulsa, Pulsa Belum Bertambah
                  </a-select-option>
                  <a-select-option value="Transfer Pulsa Gagal Pulsa Terpotong">
                    Transfer Pulsa Gagal Pulsa Terpotong
                  </a-select-option>
                  <a-select-option value="Tukar Free Usage / Pulsa Belum Masuk">
                    Tukar Free Usage / Pulsa Belum Masuk
                  </a-select-option>
                  <a-select-option value="Tukar Pulsa Simpati Belum Masuk">
                    Tukar Pulsa Simpati Belum Masuk
                  </a-select-option>
                  <a-select-option value="Upload Content Gagal Pulsa Berkurang">
                    Upload Content Gagal Pulsa Berkurang
                  </a-select-option>
                  <a-select-option value="Migrasi Prepaid ke Postpaid">
                    Migrasi Prepaid ke Postpaid
                  </a-select-option>
                  <a-select-option value="Fc Google">
                    Fc Google
                  </a-select-option>
                  <a-select-option value="Digicore/Konten Digital">
                    Digicore/Konten Digital
                  </a-select-option>
                  <a-select-option value="*Shortcode">
                    Shortcode
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item
                label="Nodin Ba">
                <a-input
                  v-decorator="[
                    'nodinBa',
                    {rules: [{ required: true}]}
                  ]"
                  name="nodinBa"
                  placeholder="" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16" v-if="isActive">
            <a-col :lg="8" :md="12" :sm="24" :push="8">
              <a-form-item
                label="Reason Name">
                <a-input
                  v-decorator="[
                    'newreason',
                    {rules: [{ required: false}]}
                  ]"
                  name="newreason"
                  placeholder="" />
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
                isActive: false,
                form: this.$form.createForm(this)
            }
        },
        methods: {
            changereason (e) {
                if (e === 'Lain-lain') {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
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
