<template>
  <page-view :avatar="avatar" :title="true">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}
        <br><span class="welcome-text">{{ welcome }}</span></div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <!-- <a-col :span="8">
          <head-info title="项目" content="56" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="团队排名" content="8/24" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="项目数" content="2,223" :center="false" />
        </a-col>-->
      </a-row>
    </div>

    <div>
      <a-row>
        <div class="card-container">
          <a-tabs
            default-active-key="0"
            tab-position="left"
          >
            <a-tab-pane key="0" tab="Data Serah">
              <!-- <a-button icon="download" @click="exportnasional()" :loading="loadingtablearea">Export</a-button> -->
              <a-month-picker placeholder="Start" @change="onChangeDataserahstart" :default-value="dataserah.startdate" />
              <a-select default-value="0" placeholder="Tahap" @change="onChangeTahapDataserahouts">
                <a-select-option value="0">Semua Tahap</a-select-option>
                <a-select-option value="1">Tahap I</a-select-option>
                <a-select-option value="2">Tahap II</a-select-option>
                <a-select-option value="3">Tahap III</a-select-option>
              </a-select>
              <a-button @click="fetchserah()" type="primary" :loading="dataserah.loading">Submit</a-button>
              <a-table
                :data-source="dataserah.data"
                :loading="dataserah.loading"
                bordered
                :row-key="record => 'a_' + record.regional"
                :columns="dataserah.column"
                size="small"
              >
                <template slot="operation" slot-scope="text, record">
                  <a :href="record.download">Download</a>
                </template>
              </a-table>
            </a-tab-pane>
            <a-tab-pane key="1" tab="Profil Data Serah">
              <DataSerahProfil/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Cek Bayar">
              <CekBayar/>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-row>
    </div>
  </page-view>
</template>

<script>
  import { timeFix } from '@/utils/util'
  import { mapState } from 'vuex'
  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import DataSerahProfil from '@/views/dataserah/Profil'
  import CekBayar from '@/views/dataserah/CekBayar'
  import ChartPage from '@/views/dataserah/Chart'
  import { Radar } from '@/components'

  import moment from 'moment'
  const columnserah = [
    {
      title: 'regional',
      dataIndex: 'regional'
    },
    {
      title: 'msisdn',
      dataIndex: 'msisdn'
    },
    {
      title: '120H',
      dataIndex: 'bucket_4'
    },
    {
      title: '90H',
      dataIndex: 'bucket_3'
    },
    {
      title: '60H',
      dataIndex: 'bucket_2'
    },
    {
      title: '30H',
      dataIndex: 'bucket_1'
    },
    {
      title: 'Total Outstanding',
      dataIndex: 'total_outstanding'
    },
    {
      title: 'Action',
      dataIndex: 'name',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: 'Workplace',
    components: {
      PageView,
      HeadInfo,
      Radar,
      ChartPage,
      DataSerahProfil,
      CekBayar
    },
    data () {
      return {
        dataserah: {
          data: [],
          column: columnserah,
          startdate: moment().subtract(2, 'days').format('YYYY-MM'),
          loading: false,
          enddate: moment().add(1, 'months').format('YYYY-MM'),
          tahap: 0
        },
        standard: { dateformat: 'YYYY-MM-DD' },
        bcselect: null,
        timeFix: timeFix(),
        avatar: '',
        user: {},

        loading: true
      }
    },
    computed: {
      ...mapState({
        nickname: (state) => state.user.nickname,
        welcome: (state) => state.user.welcome
      }),
      userInfo () {
        return this.$store.getters.userInfo
      }
    },
    created () {
      this.user = this.userInfo
      this.avatar = this.userInfo.avatar
    },
    mounted () {
      this.fetchserah()
    },
    methods: {
      onChangeTahapDataserahouts (value) {
        this.dataserah.tahap = value
        // return this.fetchserah()
      },
      onChangeDataserahstart (date, dateString) {
        this.dataserah.startdate = dateString
        // return this.fetchserah()
      },
      onChangeDataserahend (date, dateString) {
        this.dataserahkpi.enddate = dateString
        // return this.fetchserah()
      },
      fetchserah: function (params = { periode: this.dataserah.startdate, tahap: this.dataserah.tahap }) {
        this.dataserah.loading = true
        this.$http.get('/api/v1/bilcodataserah', {
          params: params,
          data: {
            ...params
          },
          type: 'json'
        }).then(data => {
          console.log(data.data)
          this.dataserah.data = data.data
          this.dataserah.loading = false
        })
      }
    }
  }
</script>

<style>
</style>
