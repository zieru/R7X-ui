<template>
  <page-view :avatar="avatar" :title="true">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}
        <br><span class="welcome-text">{{ welcome }}</span></div>
    </div>

    <div>
      <a-row :gutter="16">
        <div class="card-container">
          <a-col :span="12">
            <a-card title="Data Alternatif">
              <a-space size="small" slot="extra">
                <a-button type="primary" :loading="dataalternatif.loading" @click="fetchAlternatif()">
                  <a-icon type="reload" />  Refresh data
                </a-button>
                <a-button slot="extra" type="primary" @click="showAlternatif()"> <a-icon type="plus" /> Alternatif </a-button>
              </a-space>
              <a-row>
                <a-col>
                  <a-table
                    class="table-dark"
                    :bordered="true"
                    :data-source="dataalternatif.data"
                    :loading="dataalternatif.loading"
                    :pagination="false"
                    :row-key="record => 'b_' + record.id_alternatif"
                    @change="handleTableChangeperfomance"
                    size="small"
                    :rowClassName="(record, index) => record.regional === 'AREA I' ? 'highlight' : false"
                  >
                    <a-table-column data-index="id_alternatif">
                      <span slot="title">ID Alternatif</span>
                    </a-table-column>
                    <a-table-column data-index="nm_alternatif">
                      <span slot="title">Nama Alternatif</span>
                    </a-table-column>
                    <a-table-column title="Action">
                      <template slot-scope="text, record">
                        <span>
                          <a-button block type="primary" ghost @click="showMatrix(record.id_alternatif)"><a-icon type="setting"/> Matrix</a-button>
                        </span>
                      </template>
                    </a-table-column>
                  </a-table>
                </a-col>
              </a-row>
              <TambahAlternatif ref="TambahAlternatif"/>
            </a-card>
            <a-drawer
              title="Matrix"
              :width="720"
              :visible="visiblematrix"
              :body-style="{ paddingBottom: '80px' }"
              @close="onCloseMatrix"
            >
              <Matrix :matrixid="matrixID"></Matrix>
            </a-drawer>
          </a-col>
          <a-col :span="12">
            <a-card title="Data Kriteria">
              <a-space size="small" slot="extra">
                <a-button type="primary" :loading="datakriteria.loading" @click="fetchkriteria()">
                  <a-icon type="reload" />  Refresh data
                </a-button>
                <a-button type="primary" @click="showDrawer()"> <a-icon type="plus" /> Kriteria </a-button>
              </a-space>
              <a-drawer
                title="Kriteria Baru"
                :width="720"
                :visible="visible"
                :body-style="{ paddingBottom: '80px' }"
                @close="onClose"
              >
                <Tambah></Tambah>
              </a-drawer>
              <a-row>
                <a-col> <a-table
                  class="table-dark"
                  :bordered="true"
                  :data-source="datakriteria.data"
                  :loading="datakriteria.loading"
                  :pagination="false"
                  :row-key="record => 'a_' + record.id_kriteria"
                  @change="handleTableChangeperfomance"
                  size="small"
                  :rowClassName="(record, index) => record.regional === 'AREA I' ? 'highlight' : false"
                >
                  <a-table-column data-index="nama_kriteria">
                    <span slot="title">nama kriteria</span>
                  </a-table-column>
                  <a-table-column data-index="bobot">
                    <span slot="title">Bobot</span>
                  </a-table-column>
                  <a-table-column data-index="poin1">
                    <span slot="title">poin 1</span>
                  </a-table-column>
                  <a-table-column data-index="poin2">
                    <span slot="title">poin 2</span>
                  </a-table-column>
                  <a-table-column data-index="poin3">
                    <span slot="title">poin 3</span>
                  </a-table-column>
                  <a-table-column data-index="poin4">
                    <span slot="title">poin 4</span>
                  </a-table-column>
                  <a-table-column data-index="poin5">
                    <span slot="title">poin 5</span>
                  </a-table-column>
                  <a-table-column data-index="sifat">
                    <span slot="title">sifat</span>
                  </a-table-column>
                </a-table>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="Data Alat">
              <a-space size="small" slot="extra">
                <a-button type="primary" :loading="dataalat.loading" @click="fetchAlat()">
                  <a-icon type="reload" />  Refresh data
                </a-button>
                <a-button type="primary" @click="showAlat()"> <a-icon type="plus" /> Alat</a-button>
              </a-space>
              <TambahAlat ref="TambahAlat"/>
              <a-row>
                <a-col> <a-table
                  class="table-dark"
                  :bordered="true"
                  :data-source="dataalat.data"
                  :loading="dataalat.loading"
                  :pagination="false"
                  :row-key="record => 'a_' + record.id_kriteria"
                  @change="handleTableChangeperfomance"
                  size="small"
                  :rowClassName="(record, index) => record.regional === 'AREA I' ? 'highlight' : false"
                >
                  <a-table-column data-index="nm_alternatif">
                    <span slot="title">nama alat</span>
                  </a-table-column>
                </a-table>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
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
  import { Radar } from '@/components'
  import Tambah from '@/views/kriteria/TambahKriteria'
  import TambahAlternatif from '@/views/alternatif/tambah'
  import TambahAlat from '@/views/alat/tambah'
  import Matrix from '@/views/matrix'
  import moment from 'moment'
  // import { latLng } from 'leaflet'
  // import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet'

  /* const DataSet = require('@antv/data-set') */

  export default {
    name: 'Workplace',
    components: {
        Matrix,
      PageView,
      HeadInfo,
      Radar,
        Tambah,
        TambahAlternatif,
        TambahAlat
    },
    data () {
      return {
          visiblematrix: false,
          visible: false,
          visiblemodal: false,
          labelCol: 4,
          wrapperCol: 14,
          modalAlternatif: false,
        standard: { dateformat: 'YYYY-MM-DD' },
          matrixID: null,
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
        datakriteria: {
          data: [],
          loading: false
        },
        dataalternatif: {
            data: [],
            loading: false
        },
        dataalat: {
            data: [],
            loading: false
        },
        dataperfomance: [],
        dataperfomancetarget: [],
        dataperfomance2: [],
        paginationperfomance: [],
        paginationperfomance2: [],
        loadingtableperfomance: true,
        loadingtableperfomancetarget: true,
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
      this.fetchAlternatif()
      this.fetchkriteria()
    },
    methods: {
        showMatrix (id) {
            this.matrixID = id
            this.visiblematrix = true
        },
        showAlternatif () {
            this.$refs.TambahAlternatif.show(1)
        },
        showAlat () {
            this.$refs.TambahAlat.show(1)
        },
        showDrawer () {
            this.visible = true
        },
        onClose () {
            this.visible = false
        },
        onCloseMatrix () {
            this.visiblematrix = false
        },
        zoomUpdate (zoom) {
            this.currentZoom = zoom
        },
        centerUpdate (center) {
            this.currentCenter = center
        },
        showLongText () {
            this.showParagraph = !this.showParagraph
        },
      onBCChange (value) {
        if (value > 0) {
          this.bcselect = value
        } else {
          this.bcselect = null
        }
        this.fetchperfomance()
      },

      onChange (date, dateString) {
          console.log(dateString)
          this.dateperfomancestart = dateString[0]
          this.dateperfomanceend = dateString[1]
          return this.fetchperfomance()
      },
      onChangeDateArea (date, dateString) {
        console.log(date, dateString)
        this.datearea = dateString
        return this.fetcharea()
      },
      onChangeDateNasional (date, dateString) {
        console.log(date, dateString)
        console.log(dateString)
        this.datenasional = dateString
        return this.fetchnasional()
      },
      onChangeDate (date, dateString) {
        console.log(date, dateString)
        this.dateperfomancestart = dateString
        return this.fetchperfomance()
      },
      onChangeDate2 (date, dateString) {
        console.log(date, dateString)
        this.disabledDate(date)
        this.dateperfomanceend = dateString
        return this.fetchperfomance()
      },
      disabledDate (current) {
        // Can not select days before today and today
        moment().endOf('day')
        return current
      },
      formatPrice: function (number) {
        // eslint-disable-next-line no-unused-vars
        return (number / 1).toFixed(3).replace('.', ',')
        /* var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'IDR'
      }) */
        // return formatter.format(number).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(/\.00/g, '')
      },
      handleTableChangenasional (pagination, filters, sorter) {
        const pager = { ...this.paginationnasional }
        pager.current = pagination.current
        this.paginationnasional = pager
      },
      handleTableChangeperfomance (pagination, filters, sorter) {
        const pager = { ...this.paginationperfomance }
        pager.current = pagination.current
        this.paginationperfomance = pager
      },
      handleTableChangearea (pagination, filters, sorter) {
        const pager = { ...this.paginationarea }
        pager.current = pagination.current
        this.paginationarea = pager
      },
      fetchkriteria () {
            this.datakriteria.loading = true
            this.$http.get('/api/v1/kriteria').then(data => {
                // console.log(data.data)
                this.datakriteria.data = data.data
                this.datakriteria.loading = false
            })
        },
        fetchAlternatif () {
            this.dataalternatif.loading = true
            this.$http.get('/api/v1/alternatif').then(data => {
                // console.log(data.data)
                this.dataalternatif.data = data.data
                this.dataalternatif.loading = false
            })
        },
        fetchAlat () {
            this.dataalat.loading = true
            this.$http.get('/api/v1/alat').then(data => {
                // console.log(data.data)
                this.dataalat.data = data.data
                this.dataalat.loading = false
            })
        },
      onChangeDataserah (date, dateString) {
          this.dataserah.date = dateString
          return this.fetchserah()
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
          // console.log(data.data)
          this.dataserah.data = data.data
          this.dataserah.loading = false
        })
      },
      fetchnasional (params = { start: this.datenasional }) {
        console.log('date basuibak', this.datenasional)
        this.loadingtablenasional = true
        this.$http.get('/api/v1/billCo/dashboard', {
          params: params,
          data: {
            ...params
          },
          type: 'json'
        }).then(data => {
          const pagination = { ...this.paginationnasional }
          pagination.total = data.recordsTotal
          this.loadingtablenasional = false
          this.datanasional = data.data
          this.paginationnasional = pagination
        })
      },
      fetcharea (params = { start: this.datearea }) {
        this.loadingtablearea = true
        this.$http.get('/api/v1/billCo/dashboard/area', {
          params: params,
          data: {
            results: 10,
            ...params
          },
          type: 'json'
        }).then(data => {
          const pagination = { ...this.paginationarea }
          // Read total count from server
          // paginationnasional.total = data.totalCount;
          pagination.total = data.recordsTotal
          this.loadingtablearea = false
          this.dataarea = data.data
          this.paginationarea = pagination
        })
      },
        exportnasional (params = { start: this.datearea }) {
            this.$http.get('/api/v1/billCo/dashboard?export=xlsx', {
                responseType: 'arraybuffer',
                params: params,
                headers: {
                    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                data: {
                    results: 10,
                    ...params
                },
                type: 'json'
            }).then(data => {
                const blob = new Blob([data])
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'file.xlsx'
                link.click()
            })
        },
        exportarea (params = { start: this.datearea }) {
          this.$http.get('/api/v1/billCo/dashboard/area?export=xlsx', {
                responseType: 'arraybuffer',
                params: params,
                headers: {
                    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                data: {
                    results: 10,
                    ...params
                },
                type: 'json'
            }).then(data => {
                const blob = new Blob([data])
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'file.xlsx'
                link.click()
            })
        },
      oncollectionTabChange (key, type) {
        console.log(key, type)
        this[type] = key
      }
    }
  }
</script>

<style>
</style>
