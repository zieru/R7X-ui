<template>
  <div>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="Nama Kriteria">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="Bobot">
        <a-input-number v-model="form.bobot" :min="1" :max="10" placeholder="Bobot"/>
      </a-form-model-item>
      <a-form-model-item label="Poin">
        <a-input-number placeholder="Poin I" v-model="form.poin1" :min="1" :max="10"/>
        <a-input-number placeholder="Poin II" v-model="form.poin2" :min="1" :max="10"/>
        <a-input-number placeholder="Poin III" v-model="form.poin3" :min="1" :max="10"/>
        <a-input-number placeholder="Poin IV" v-model="form.poin4" :min="1" :max="10"/>
        <a-input-number placeholder="Poin V" v-model="form.poin5" :min="1" :max="10"/>
      </a-form-model-item>
      <a-form-model-item label="Sifat Kriteria">
        <a-select>
          <a-select-option value="Benefit">
            Benefit
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <div
      :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
    >
      <a-button type="primary" @click="onClose">
        Submit
      </a-button>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'Tambah',
        data () {
            return {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
                form: {
                    name: '',
                    region: undefined,
                    date1: undefined,
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit () {
                console.log('submit!', this.form)
            }
        }
    }
</script>
