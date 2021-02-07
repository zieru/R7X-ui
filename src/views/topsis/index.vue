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
          :rowClassName="(record, index) => record.regional === 'AREA I' ? 'highlight' : false"
        >
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Nilai Matrix Ternormalisasi">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Nilai Bobot Ternormalisasi">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
      </a-tab-pane>
      <a-tab-pane key="4" tab="Nilai Ideal Positif / Negatif">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
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
                },
                {
                    title: 'C5',
                    dataIndex: 'C5',
                    align: 'center',
                    key: 'C5'
                }
            ]
        }
    ]
    export default {
        name: 'Index',
        data () {
            return {
                datamatrix: {
                    columns: columns,
                    data: []
                }
            }
        },
        methods: {
            fetch () {
                this.$http.get('api/v1/matrix/hasil').then(data => {
                  this.datamatrix.data = data.data
                })
            }
        }
    }
</script>

<style scoped>

</style>
