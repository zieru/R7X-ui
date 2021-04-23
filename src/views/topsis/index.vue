<template>
  <div class="card-container">
    <a-card title="Hasil Topsis">
      <a-button type="primary" slot="extra" @click="fetch()">Reload</a-button>
      <a-tabs tab-position="left">
        <a-tab-pane key="1" tab="Nilai Matrix">
          <a-table
            :columns="datamatrix.columns"
            :data-source="datamatrix.data"
            class="table-dark"
            :bordered="true"
            :pagination="false"
            size="small"
            :row-key="(record, index) => 'Matrixxx_' + index"
          >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Nilai Matrix Ternormalisasi">
          <a-table
            :columns="datamatrixnormalisasi.columns"
            :data-source="datamatrixnormalisasi.data"
            class="table-dark"
            :bordered="true"
            :pagination="false"
            size="small"
            :row-key="(record, index) => 'Matrix0_' + index"
          >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Nilai Bobot Ternormalisasi">
          <a-table
            :columns="datamatrixbobotnormalisasi.columns"
            :data-source="datamatrixbobotnormalisasi.data"
            class="table-dark"
            :bordered="true"
            :pagination="false"
            size="small"
            :row-key="(record, index) => 'Matrixx_' + index"
          >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="4" tab="Nilai Ideal Positif / Negatif">
          <div v-for="(x, indexheader) in datatest" :key="indexheader">
            <a-list bordered :data-source="x">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-tag v-if="index === 0" color="cyan">Solusi Ideal Negatif </a-tag>
                <a-tag v-else color="green">Solusi Ideal Positif</a-tag>
                {{ item }}
              </a-list-item>
              <div slot="header">
                {{ indexheader }}
              </div>
            </a-list>
          </div>
        </a-tab-pane>
        <a-tab-pane key="5" tab="Jarak Ideal Positif/Negatif">
          <div v-for="(x, indexheader) in datajarakideal" :key="indexheader">
            <a-list bordered :data-source="x">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-tag v-if="index === 0" color="cyan">Solusi Ideal Negatif </a-tag>
                <a-tag v-else color="green">Solusi Ideal Positif</a-tag>
                {{ item }}
              </a-list-item>
              <div slot="header">
                {{ indexheader }}
              </div>
            </a-list>
          </div>
        </a-tab-pane>

        <a-tab-pane key="6" tab="Nilai preferensi">
          <a-table
            :columns="datapreferensi.columns"
            :data-source="datapreferensi.data"
            class="table-dark"
            :bordered="true"
            :pagination="false"
            size="small"
          >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="7" tab="Ranking">
          <a-table
            :columns="dataranking.columns"
            :data-source="dataranking.data"
            class="table-dark"
            :bordered="true"
            :pagination="false"
            size="small"
          >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="8" tab="Peralatan">
          <div v-for="(x, indexheader) in dataalat" :key="indexheader">
            <a-list bordered :data-source="x">
              <a-list-item slot="renderItem" slot-scope="item">
                {{ item }}
              </a-list-item>
              <div slot="header">
                {{ indexheader }}
              </div>
            </a-list>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: 100,
            onFilter: (value, record) => record.name.indexOf(value) === 0
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama'
        },
        {
            title: 'Kriteria',
            children: [
                {
                    title: 'C1',
                    align: 'center',
                    dataIndex: 'C1',
                    key: 'C1'
                },
                {
                    title: 'C2',
                    dataIndex: 'C2',
                    align: 'center',
                    key: 'C2'
                },
                {
                    title: 'C3',
                    dataIndex: 'C3',
                    align: 'center',
                    key: 'C3'
                },
                {
                    title: 'C4',
                    dataIndex: 'C4',
                    align: 'center',
                    key: 'C4'
                }/*,
                {
                    title: 'C5',
                    dataIndex: 'C5',
                    align: 'center',
                    key: 'C5'
                } */
            ]
        }
    ]
    const columnspref = [
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama'
        },
        {
            title: 'Hasil',
            dataIndex: 'nilai',
            key: 'nilai'
        }
    ]
    const columnsrank = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank'
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama'
        },
        {
            title: 'Hasil',
            dataIndex: 'nilai',
            key: 'nilai'
        }
    ]
    export default {
        name: 'Index',
        data () {
            return {
                datatest: {
                },
                dataalat: {
                },
                datajarakideal: {
                },
                datamatrix: {
                    columns: columns,
                    data: []
                },
                dataranking: {
                    columns: columnsrank,
                    data: []
                },
                datapreferensi: {
                    columns: columnspref,
                    data: []
                },
                datamatrixnormalisasi: {
                    columns: columns,
                    data: []
                },
                datamatrixbobotnormalisasi: {
                    columns: columns,
                    data: []
                }
            }
        },
        methods: {
            fetch () {
                this.$http.get('api/v1/matrix/nilaiideal').then(data => {
                    Object.values(data.data).forEach(val => {
                        console.log('x', val)
                        this.datatest = val
                    })

                    console.log('testx', this.datatest)
                })
                this.$http.get('api/v1/matrix/alat').then(data => {
                    Object.values(data.data).forEach(val => {
                        console.log('x', val)
                        this.dataalat = val
                    })

                    console.log('testx', this.datatest)
                })
                this.$http.get('api/v1/matrix/jarakideal').then(data => {
                    Object.values(data.data).forEach(val => {
                        console.log('x', val)
                        this.datajarakideal = val
                    })
                })
                /* this.$http.get('api/v1/matrix/jarakideal').then(data => {
                  console.log('x', data)
                }) */
                this.$http.get('api/v1/matrix/hasil').then(data => {
                  this.datamatrix.data = data.data
                })
                this.$http.get('api/v1/matrix/preferensi').then(data => {
                    this.datapreferensi.data = data.data[0]
                })
                this.$http.get('api/v1/matrix/ranking').then(data => {
                    this.dataranking.data = data.data
                })
                this.$http.get('api/v1/matrix/normalisasi').then(data => {
                    this.datamatrixnormalisasi.data = data.data
                })
                this.$http.get('api/v1/matrix/bobotnormalisasi').then(data => {
                    this.datamatrixbobotnormalisasi.data = data.data
                })
            }
        }
    }
</script>

<style>
.ant-list-header{
  color:#fff;
  background: #f5222d !important;
  background: linear-gradient(
    163deg
    , #f5222d 1%, #6d0019 100%) !important;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5222d', endColorstr='#6d0019', GradientType=1);
}
</style>
