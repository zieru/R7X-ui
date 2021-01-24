<template>
  <div>
    <a-row>
      <div class="card-container">
        <a-tabs default-active-key="1_SERAH">
          <a-tab-pane key="1_SERAH" tab="Cek Bayar">
            <a-form class="ant-advanced-search-form" :layout="formLayout">
              <a-form-item label="Periode / Data" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                <a-month-picker placeholder="Periode" @change="onChangeDataserahoutsstart" :default-value="dataserahouts.startdate" />
                <a-divider type="vertical"></a-divider>
                <a-radio-group :loading="dataserahouts.loading" v-model="dataserahouts.msisdn" default-value="false" button-style="solid">
                  <a-radio-button :loading="dataserahouts.loading" value="false">
                    Outstanding
                  </a-radio-button>
                  <a-radio-button value="true" :loading="dataserahouts.loading">
                    MSISDN
                  </a-radio-button>
                </a-radio-group>
              </a-form-item>
              <!-- <a-form-item label="Tahap" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                <a-select default-value="0" placeholder="Tahap" @change="onChangeTahapDataserahouts">
                  <a-select-option value="0">Semua Tahap</a-select-option>
                  <a-select-option value="1">Tahap I</a-select-option>
                  <a-select-option value="2">Tahap II</a-select-option>
                  <a-select-option value="3">Tahap III</a-select-option>
                </a-select>
              </a-form-item> -->
              <a-form-item label="Tahap / Date" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                <a-radio-group :loading="dataserahouts.loading" v-model="dataserahouts.tahap" default-value="false" button-style="solid">
                  <a-radio-button :loading="dataserahouts.loading" value="0">
                    Semua
                  </a-radio-button>
                  <a-radio-button value="1" :loading="dataserahouts.loading">
                    I
                  </a-radio-button>
                  <a-radio-button value="2" :loading="dataserahouts.loading">
                    II
                  </a-radio-button>
                  <a-radio-button value="3" :loading="dataserahouts.loading">
                    III
                  </a-radio-button>
                </a-radio-group>
                <a-divider type="vertical"></a-divider>
                <a-date-picker placeholder="Date" @change="onChangeDataserahouts" :default-value="dataserahouts.date"></a-date-picker>
              </a-form-item>
              <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
                <a-button @click="fetchserahouts()" icon="search" type="primary" :loading="dataserahouts.loading">Submit</a-button>
              </a-form-item>
              <!--
              <a-button @click="fetchexport()" type="default" :loading="dataserahouts.loading">Export to XLSX</a-button>
              <a-tag color="blue">
                tahap I {{ ' = ' + this.dataserahouts.last_update[0] }}
              </a-tag>
              <a-tag color="blue">
                tahap II {{ ' = ' + this.dataserahouts.last_update[1] }}
              </a-tag>
              <a-tag color="blue">
                tahap III {{ ' = ' + this.dataserahouts.last_update[2] }}
              </a-tag>
              <a-button @click="exportserahouts()" type="primary" :loading="dataserahouts.loading">Export Current Result</a-button>-->
            </a-form>
            <a-table
              :expandRowByClick="true"
              :key="dataserahouts.key"
              :defaultExpandAllRows="true"
              :scroll="{ x:3000, y:500 }"
              :row-key="record => 'a_' + record.id"
              :data-source="dataserahouts.data"
              :loading="dataserahouts.loading"
              :rowClassName="(record, index) => ['All BC'].includes(record.kpi) ? 'highlight' : false"
              bordered
              :columns="dataserahouts.column"
              size="small"
            >
            </a-table>
          </a-tab-pane>
          <!--
          <a-tab-pane key="2_SERAH" tab="MoM cek Bayar">
             <Mom></Mom>
          </a-tab-pane>
          -->
        </a-tabs>
      </div>
    </a-row>
  </div>
</template>

<script>
  import { timeFix } from '@/utils/util'
  import { mapState } from 'vuex'

  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import { Radar } from '@/components'
  import ChartPage from '@/views/dataserah/Chart'
  import moment from 'moment'
  import Mom from '@/views/dataserah/CekBayar/Mom'
  const columnserah = [
    {
      title: 'regional',
      dataIndex: 'regional',
      width: 100,
      fixed: 'left'
    },
    {
      title: 'msisdn',
      dataIndex: 'msisdn'
    },
    {
      title: 'bucket 4',
      dataIndex: 'bucket_4'
    },
    {
      title: 'bucket 3',
      dataIndex: 'bucket_3'
    },
    {
      title: 'bucket 2',
      dataIndex: 'bucket_2'
    },
    {
      title: 'bucket 1',
      dataIndex: 'bucket_1'
    },
    {
      title: 'total_outstanding',
      dataIndex: 'total_outstanding'
    }
  ]
  const columnserahkpi = []
  const columnserahouts = []
  export default {
    name: 'Workplace',
    components: {
      PageView,
      HeadInfo,
      Mom,
      ChartPage,
      Radar
    },
    data () {
      return {
          formLayout: 'inline',
        dataserah: {
          data: [],
          column: columnserah,
          date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
          loading: false
        },
        dataserahkpi: {
          data: [],
          column: columnserahkpi,
          startdate: moment().subtract(2, 'days').format('YYYY-MM'),
          tahap: 0,
          bc: 0,
          loading: false,
          enddate: moment().add(1, 'months').format('YYYY-MM')
        },
        dataserahouts: {
          msisdn: 'false',
          key: 0,
          data: [],
          column: columnserahouts,
          startdate: moment().subtract(2, 'days').format('YYYY-MM'),
            date: null,
          tahap: 0,
          loading: false,
          enddate: moment().add(1, 'months').format('YYYY-MM'),
            last_update: []
        },
        standard: { dateformat: 'YYYY-MM-DD' },
        bcselect: null,
        datenasional: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        datearea: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        dateperfomancestart: moment().subtract(3, 'days').format('YYYY-MM-DD'),
        dateperfomanceend: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        datanasional: [],
        paginationnasional: [],
        loadingtablenasional: false,
        dataarea: [],
        paginationarea: [],
        loadingtablearea: false,
        dataperfomance: [],
        dataperfomancetarget: [],
        dataperfomance2: [],
        paginationperfomance: [],
        paginationperfomance2: [],
        loadingtableperfomance: true,
        loadingtableperfomance2: true,
        visibledrawertargetinput: false,
        monthtargetDate: null,
        formInline: {
          user: '',
          monthtargetSumbagut: '',
          monthtargetSumbagteng: '',
          monthtargetSumbagsel: '',
          password: ''
        },
        timeFix: timeFix(),
        avatar: '',
        user: {},

        projects: [],
        loading: true,
        radarLoading: true,
        activities: [],
        teams: [],

        // data
        axis1Opts: {
          dataKey: 'item',
          line: null,
          tickLine: null,
          grid: {
            lineStyle: {
              lineDash: null
            },
            hideFirstLine: false
          }
        },
        axis2Opts: {
          dataKey: 'score',
          line: null,
          tickLine: null,
          grid: {
            type: 'polygon',
            lineStyle: {
              lineDash: null
            }
          }
        },
        scale: [{
          dataKey: 'score',
          min: 0,
          max: 80
        }],
        axisData: [
          { item: '引用', a: 70, b: 30, c: 40 },
          { item: '口碑', a: 60, b: 70, c: 40 },
          { item: '产量', a: 50, b: 60, c: 40 },
          { item: '贡献', a: 40, b: 50, c: 40 },
          { item: '热度', a: 60, b: 70, c: 40 },
          { item: '引用', a: 70, b: 50, c: 40 }
        ],
        radarData: []
      }
    },
    computed: {
        buttonItemLayout () {
            const { formLayout } = this
            return formLayout === 'inline'
                ? {
                    wrapperCol: { span: 14, offset: 4 }
                }
                : {}
        },
        formItemLayout () {
            const { formLayout } = this
            return formLayout === 'inline'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 5 }
                }
                : {}
        },
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
      this.fetchserahouts()
        this.cekupdate()
    },
    methods: {
      forceRerender () {
        this.dataserahouts.key += 1
      },
      onChangeTahapDataserahouts (value) {
        this.dataserahouts.tahap = value
      },
      onChangeTahapDataserahkpi (value) {
        this.dataserahkpi.tahap = value
      },
      onChangeBCDataserahkpi (value) {
        this.dataserahkpi.bc = value
      },
      onChangeDataserah (date, dateString) {
          this.dataserah.date = dateString
      },
      onChangeDataserahoutsstart (date, dateString) {
        this.dataserahouts.startdate = dateString
      },
      onChangeDataserahouts (date, dateString) {
          this.dataserahouts.date = dateString
      },
      onChangeDataserahoutsend (date, dateString) {
        this.dataserahouts.enddate = dateString
        // return this.fetchserahouts()
      },
      onChangeDataserahkpistart (date, dateString) {
        this.dataserahkpi.startdate = dateString
        // return this.fetchserahkpi()
      },
      onChangeDataserahkpiend (date, dateString) {
        this.dataserahkpi.enddate = dateString
        // return this.fetchserahkpi()
      },

        cekupdate () {
            this.$http.get('/api/v1/bilcodataserahcekbayars/cekupdate', {
                type: 'json'
            }).then(data => {
                this.dataserahouts.last_update = data.data
            })
        },
        fetchexport (params = { periode: this.dataserahouts.startdate, outs: true, msisdn: this.dataserahouts.msisdn, tahap: this.dataserahouts.tahap }) {
          this.$http.get('api/v1/bilcodataserahcekbayars/export', {
              params: params
          }).then(data => {
              console.log(data)
            })
        },
      fetchserahouts (params = { periode: this.dataserahouts.startdate, date: this.dataserahouts.date, outs: true, msisdn: this.dataserahouts.msisdn, tahap: this.dataserahouts.tahap }) {
         this.cekupdate()
        const key = 'updatable'
        if (this.dataserahouts.startdate !== undefined && this.dataserahouts.enddate !== undefined) {
          this.$message.loading({ content: 'Processing', key })
          this.dataserahouts.loading = true
          this.$http.get('/api/v1/bilcodataserahcekbayar', {
            params: params,
            type: 'json'
          }).then(data => {
            this.dataserahouts.loading = true
            if (data) {
              if ('datecolumn' in data) {
                const periodes = data.datecolumn
                  /*
                const lastUpdate = data.last_update
                  const lastupdatelabel = []
                lastUpdate.forEach(function (entry) {
                    lastupdatelabel.push(entry)
                })
                this.dataserahouts.last_update = lastupdatelabel
                */
                const periodescol = []
                periodescol.push({
                  title: 'Regional',
                  dataIndex: 'regional',
                  width: 175,
                  fixed: 'left'
                })
                periodescol.push({
                  title: 'Bill Cycle',
                  dataIndex: 'kpi',
                  width: 70,
                  fixed: 'left'
                })
                periodes.forEach(function (entry) {
                  let titleh = entry + 'H'
                  if (entry === 0) {
                    titleh = 'ALL KPI'
                  }
                  console.log('data', 'period' + entry + 'totalmsisdn')
                  periodescol.push({
                    title: titleh,
                    children: [
                      {
                        title: 'Data Serah',
                        dataIndex: 'period.' + entry + '.totalmsisdn'
                      },
                      {
                        title: 'Collection',
                        dataIndex: 'period.' + entry + '.collection'
                      },
                      {
                        title: 'Uncollected',
                        dataIndex: 'period.' + entry + '.uncollected'
                      },
                      {
                        title: '% Collection',
                        dataIndex: 'period.' + entry + '.pcollection'
                      }
                      ]
                  })
                })
                Object.assign([], periodescol)
                this.dataserahouts.column = periodescol
                // console.log(this.dataserahkpi.column)
                this.dataserahouts.data = data.data
                this.forceRerender()
                this.dataserahouts.loading = false
              }
            }
          }).catch(data => {
              this.dataserahouts.loading = false
          })
        } else {
          this.$message.warning({ content: 'Please specify start and end of date', key })
        }
      },
      exportserahouts (params = { periode: this.dataserahkpi.startdate, tahap: this.dataserahkpi.tahap, outs: true }) {
        this.$http.get('/api/v1/bilcodataserahexport', {
          params: params,
          type: 'json',
          responseType: 'blob'
        }).then(data => {
          const url = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'export' + this.dataserahkpi.startdate + this.dataserahkpi.startdate + '.xlsx')
          document.body.appendChild(link)
          link.click()
        })
      },
      exportserahkpi (params = { periode: this.dataserahkpi.startdate + ':' + this.dataserahkpi.enddate, tahap: this.dataserahkpi.tahap, bc: this.dataserahkpi.bc }) {

      },
      fetchserahkpi (params = { periode: this.dataserahkpi.startdate + ':' + this.dataserahkpi.enddate, tahap: this.dataserahkpi.tahap, bc: this.dataserahkpi.bc }) {
        const key = 'updatable'
        if (this.dataserahkpi.startdate !== undefined && this.dataserahkpi.enddate !== undefined) {
          this.$message.loading({ content: 'Processing', key })
          this.dataserahkpi.loading = true
          this.$http.get('/api/v1/bilcodataserahkpi', {
            params: params,
            type: 'json'
          }).then(data => {
            // console.log(data.data)
            // const csx = {
            //  title: 'test'
            // }
            const periodes = data.datecolumn
            const periodescol = []
            periodescol.push({
              title: 'Regional',
              dataIndex: 'regional'
            })
            periodescol.push({
              title: 'KPI',
              dataIndex: 'kpi'
            })
            periodes.forEach(function (entry) {
              periodescol.push({
                title: entry,
                children: [
                  {
                    title: 'msisdn',
                    dataIndex: 'period.' + entry + '.totalmsisdn'
                  },
                  {
                    title: 'total outstanding',
                    dataIndex: 'period.' + entry + '.total'
                  }]
              })
            })
            Object.assign([], periodescol)
            console.log(periodescol)
            this.dataserahkpi.column = periodescol
            console.log(this.dataserahkpi.column)
            this.dataserahkpi.data = data.data
            this.dataserahkpi.loading = false
          })
        } else {
          this.$message.warning({ content: 'Please specify start and end of date', key })
        }
      },
      fetchserah (params = { period: this.dataserah.date }) {
        this.dataserah.loading = true
        this.$http.get('/api/v1/bilcodataserah', {
          params: params,
          data: {
            ...params
          },
          type: 'json'
        }).then(data => {
          alert('x')
          // console.log(data.data)
          this.dataserah.data = data.data
          this.dataserah.loading = false
        })
      }
    }
  }
</script>

<style>
  .ant-advanced-search-form {
    padding: 4px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }

  .ant-advanced-search-form .ant-form-item {
    display: flex;
    margin-bottom: 4px;
  }

  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }

  #components-form-demo-advanced-search .ant-form {
    max-width: none;
  }
  #components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
</style>
