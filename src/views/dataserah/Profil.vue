<template>
  <div>
    <a-row>
      <div class="card-container">
        <a-tabs default-active-key="1_SERAH">
          <a-tab-pane key="1_SERAH" tab="Outstanding">
            <a-month-picker placeholder="Start" @change="onChangeDataserahoutsstart" :default-value="dataserahouts.startdate" />
            <a-month-picker placeholder="End" @change="onChangeDataserahoutsend" :default-value="dataserahouts.enddate" />
            <a-select default-value="0" placeholder="Tahap" @change="onChangeTahapDataserahouts">
              <a-select-option value="0">Semua Tahap</a-select-option>
              <a-select-option value="1">Tahap I</a-select-option>
              <a-select-option value="2">Tahap II</a-select-option>
              <a-select-option value="3">Tahap III</a-select-option>
            </a-select>
            <a-button @click="fetchserahouts()" type="primary" :loading="dataserahouts.loading">Submit</a-button>
            <!--<a-button @click="exportserahouts()" type="primary" :loading="dataserahouts.loading">Export Current Result</a-button>-->
            <a-table
              :expandRowByClick="true"
              :key="dataserahouts.key"
              :defaultExpandAllRows="dataserahouts.expand"
              :row-key="record => 'a_' + record.id"
              :data-source="dataserahouts.data"
              :loading="dataserahouts.loading"
              :rowClassName="(record, index) => ['All BC'].includes(record.kpi) ? 'highlight' : false"
              bordered
              :columns="dataserahouts.column"
              size="small"
            >
            </a-table>
            <a-collapse>
              <a-collapse-panel key="1" header="Chart">
                <ChartPage
                  ref="chartpage"
                  :pstartdate="dataserahouts.startdate"
                  :penddate="dataserahouts.enddate"
                />
              </a-collapse-panel>
            </a-collapse>
          </a-tab-pane>
          <a-tab-pane key="2_SERAH" tab="KPI">
            <a-month-picker placeholder="Start" @change="onChangeDataserahkpistart" :default-value="dataserahkpi.startdate" />
            <a-month-picker placeholder="End" @change="onChangeDataserahkpiend" :default-value="dataserahkpi.enddate" />
            <a-select default-value="0" placeholder="Tahap" @change="onChangeTahapDataserahkpi">
              <a-select-option value="0">Semua Tahap</a-select-option>
              <a-select-option value="1">Tahap I</a-select-option>
              <a-select-option value="2">Tahap II</a-select-option>
              <a-select-option value="3">Tahap III</a-select-option>
            </a-select>
            <a-select default-value="0" placeholder="Tahap" @change="onChangeBCDataserahkpi">
              <a-select-option value="0">Semua BC</a-select-option>
              <a-select-option value="1">BC 1</a-select-option>
              <a-select-option value="6">BC 6</a-select-option>
              <a-select-option value="11">BC 11</a-select-option>
              <a-select-option value="16">BC 16</a-select-option>
              <a-select-option value="20">BC 20</a-select-option>
            </a-select>
            <a-button @click="fetchserahkpi()" type="primary" :loading="dataserahkpi.loading">Submit</a-button>
            <!--<a-button @click="exportserahkpi()" type="primary" :loading="dataserahouts.loading">Export Current Result</a-button>-->
            <a-table
              :key="dataserahkpi.key"
              :expandRowByClick="true"
              :defaultExpandAllRows="true"
              :row-key="record => 'kpi_' + record.id"
              :data-source="dataserahkpi.data"
              :loading="dataserahkpi.loading"
              bordered
              :rowClassName="(record, index) => ['Sumbagsel', 'Sumbagteng', 'Sumbagut','AREA Sumatra'].includes(record.regional) ? 'highlight' : false"
              :columns="dataserahkpi.column"
              size="small"
            >
            </a-table>
          </a-tab-pane>
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
		ChartPage,
      Radar
    },
    data () {
      return {
        dataserah: {
          data: [],
          column: columnserah,
          date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
          loading: false
        },
        dataserahkpi: {
          expand: 1,
          key: 0,
          data: [],
          column: columnserahkpi,
          startdate: moment().subtract(2, 'days').format('YYYY-MM'),
          tahap: 0,
          bc: 0,
          loading: false,
          enddate: moment().add(1, 'months').format('YYYY-MM')
        },
        dataserahouts: {
          expand: 1,
          key: 0,
          data: [],
          column: columnserahouts,
          startdate: moment().subtract(2, 'days').format('YYYY-MM'),
          tahap: 0,
          loading: false,
          enddate: moment().add(1, 'months').format('YYYY-MM')
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
    },
    methods: {
      onChangeTahapDataserahouts (value) {
        this.dataserahouts.tahap = value
        // return this.fetchserahouts()
      },
      onChangeTahapDataserahkpi (value) {
        this.dataserahkpi.tahap = value
        // return this.fetchserahkpi()
      },
      onChangeBCDataserahkpi (value) {
        this.dataserahkpi.bc = value
        // return this.fetchserahkpi()
      },
      onChangeDataserah (date, dateString) {
          this.dataserah.date = dateString
        // return this.fetchserah()
      },
      onChangeDataserahoutsstart (date, dateString) {
        this.dataserahouts.startdate = dateString
        // return this.fetchserahouts()
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
      fetchserahouts (params = { periode: this.dataserahouts.startdate + ':' + this.dataserahouts.enddate, outs: true, tahap: this.dataserahouts.tahap }) {
        const key = 'updatable'
        if (this.dataserahouts.startdate !== undefined && this.dataserahouts.enddate !== undefined) {
          this.$message.loading({ content: 'Processing', key })
          this.dataserahouts.loading = true
          this.$http.get('/api/v1/bilcodataserahkpi', {
            params: params,
            type: 'json'
          }).then(data => {
            // console.log(data.data)
            // const csx = {
            //  title: 'test'
            // }
            const periodes = data.datecolumn
            console.log(data.data)
            const periodescol = []
            periodescol.push({
              title: 'Regional',
              dataIndex: 'regional'
            })
            periodescol.push({
              title: 'Bill Cycle',
              dataIndex: 'kpi'
            })
            periodes.forEach(function (entry) {
              console.log('data', 'period' + entry + 'totalmsisdn')
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
            this.dataserahouts.column = periodescol
            // console.log(this.dataserahkpi.column)
            this.dataserahouts.data = data.data
            this.dataserahouts.loading = false
            this.dataserahouts.key += 1
          })
        } else {
          this.$message.warning({ content: 'Please specify start and end of date', key })
        }
        this.$refs.chartpage.fetchall()
      },
      exportserahouts (params = { periode: this.dataserahkpi.startdate + ':' + this.dataserahkpi.enddate, tahap: this.dataserahkpi.tahap, outs: true }) {
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
            console.log(periodes)
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
            this.dataserahkpi.key += 1
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
</style>
