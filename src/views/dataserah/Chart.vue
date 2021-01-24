<template>
  <div>
    <a-row :gutter="24">
      <a-card title="Chart">
        <a-skeleton :loading="msisdn2.loading" active>
          <h4>Based on MSISDN</h4>
          <v-chart :forceFit="true" :height="400" :data="msisdn2.data" :scale="scale2">
            <v-tooltip :label="label2" :showTitle="true" />
            <v-view>
              <v-axis :label="label2" />
              <v-legend />
              <v-line position="periode*msisdn" color="region"/>
              <v-point position="periode*msisdn" color="region" :size="4" :shape="'circle'" />
            </v-view>
          </v-chart>
        </a-skeleton>
        <a-skeleton :loading="outstanding2.loading" active>
          <h4>Based on OUTSTANDING</h4>
          <v-chart :forceFit="true" :height="400" :data="outstanding2.data" :scale="scale2">
            <v-tooltip :label="label2" />
            <v-axis :label="label2" />
            <v-legend />
            <v-line position="periode*msisdn" color="region" />
            <v-point position="periode*msisdn" color="region" :size="4" :shape="'circle'" />
          </v-chart>
        </a-skeleton>
      </a-card>
    </a-row>
    <a-row>
    </a-row>
  </div>
</template>

<script>
  import DataSerahProfil from '@/views/dataserah/Profil'

  const DataSet = require('@antv/data-set')

  const label = {
    textStyle: {
      fill: '#aaaaaa'
    }
  }

  const label2 = {
    textStyle: {
      fill: '#fff'
    },
    formatter: function formatter (text) {
      return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
  }
  const title = {
    offset: 50
  }

  const tickLine = {
    alignWithLabel: false,
    length: 0
  }
  const scale2 = [{
    dataKey: 'msisdn',
    min: 1,
    alias: 'MSISDN',
    formatter: function formatter (val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }, {
    dataKey: 'periode',
    min: 0,
    max: 1,
    alias: 'Periode'
  }]
  const scale = [{
    dataKey: 'value',
    max: 75,
    min: 0,
    tickCount: 4
  },
    {
    dataKey: 'hlr_region',
    min: 0,
    max: 1
  }]
  const adjust = [{
    type: 'dodge',
    marginRatio: 1 / 32
  }]
  export default {
    name: 'ChartPage',
    props: {
      pstartdate: {
        type: String,
        required: true,
        default: ''
      },
      penddate: {
        type: String,
        required: true,
        default: ''
      }
    },
    components: {
      DataSerahProfil
    },
    data () {
      return {
        label2: label2,
        startdate: this.pstartdate,
        enddate: this.penddate,
        outstanding: {
          data: null,
          loading: true
        },
        msisdn: {
          data: null,
          loading: true
        },
        msisdn2: {
          data: null,
          loading: true
        },
        outstanding2: {
          data: null,
          loading: true
        },
        data2: false,
        scale,
        scale2,
        tickLine,
        title,
        adjust,
        dv: false,
        sourceData: false,
        data: false,
        height: 400,
        label: label,
        loadingChart1: true,
        dataserah: {
          data: [],
          column: false,
          loading: true,
          tahap: 0
        },
        standard: { dateformat: 'YYYY-MM-DD' }
      }
    },
    watch: {
      $props: {
        handler () {
          this.startdate = this.pstartdate
          this.enddate = this.penddate
        },
        deep: true,
        immediate: true
      }
    },
    mounted () {
      this.fetchall()
    },
    methods: {
      onChangeTahapDataserah (value) {
        this.dataserah.tahap = value
        return this.fetchall()
      },
      onChangeDataserahstart (date, dateString) {
        this.startdate = dateString
        return this.fetchall()
      },
      onChangeDataserahend (date, dateString) {
        this.enddate = dateString
        return this.fetchall()
      },
      fetchall () {
        this.fetchserahmsisdn2()
        this.fetchserahoutstanding2()
      },
      fetchserahoutstanding2: function (params = { periode: this.startdate + ':' + this.enddate, tahap: this.dataserah.tahap }) {
        this.outstanding2.loading = true
        this.$http.get('/api/v1/bilcodataserahchart', {
          params: { tipe: 'outs2', ...params },
          data: {
            ...params
          },
          type: 'json'
        }).then(data => {
          this.sourceData = data.data
          this.dv = new DataSet.View().source(this.sourceData).transform({
            type: 'fold',
            fields: ['Sumbagut', 'Sumbagteng', 'Sumbagsel', 'AREA I'],
            key: 'region',
            value: 'msisdn'
          })
          this.outstanding2.data = this.dv.rows
          this.outstanding2.loading = false
        })
      },
      fetchserahmsisdn2: function (params = { periode: this.startdate + ':' + this.enddate, tahap: this.dataserah.tahap }) {
        this.msisdn2.loading = true
        this.$http.get('/api/v1/bilcodataserahchart', {
          params: { tipe: 'msisdn2', ...params },
          data: {
            ...params
          },
          type: 'json'
        }).then(data => {
          const dv = new DataSet.View().source(data.data)
          dv.transform({
            type: 'fold',
            fields: ['Sumbagut', 'Sumbagteng', 'Sumbagsel', 'AREA I'],
            key: 'region',
            value: 'msisdn'
          })
          this.msisdn2.data = dv.rows
          this.msisdn2.loading = false
        })
      }
    }
  }
</script>

<style>
</style>
