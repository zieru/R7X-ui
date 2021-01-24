<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data">
      <v-coord type="rect" direction="LB" />
      <v-tooltip />
      <v-legend />
      <v-axis dataKey="State" :label="label" />
      <v-stack-bar position="State*人口数量" color="年龄段" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  { State: 'WY', MSISDN: 25635, OUTSTANDING: 1890, '14至17岁': 9314 },
  { State: 'DC', MSISDN: 30352, OUTSTANDING: 20439, '14至17岁': 10225 },
  { State: 'VT', MSISDN: 38253, OUTSTANDING: 42538, '14至17岁': 15757 },
  { State: 'ND', 小于5岁: 51896, '5至13岁': 67358, '14至17岁': 18794 },
  { State: 'AK', 小于5岁: 72083, '5至13岁': 85640, '14至17岁': 22153 }
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'fold',
  fields: ['MSISDN', 'OUTSTANDING'],
  key: '年龄段',
  value: '人口数量',
  retains: ['State']
})
const data = dv.rows

const label = { offset: 12 }

export default {
  data () {
    return {
      data,
      height: 400,
      label: label
    }
  }
}
</script>
