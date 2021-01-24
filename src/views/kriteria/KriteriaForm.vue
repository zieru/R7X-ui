<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="24">
        <a-form-item label="Nama Kriteria">
          <a-input
            v-decorator="[
              'namakriteria',
              {rules: [{ required: true, message: 'Please enter nama kriteria', whitespace: true}]}
            ]" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="24">
        <a-form-item label="Bobot">
          <a-input-number
            :max="10"
            :min="1"
            v-decorator="[
              'bobot',
              {rules: [{ message: 'Please enter bobot', required: true}]}
            ]" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="4">
        <a-form-item label="Poin 1">
          <a-input-number
            :max="10"
            :min="1"
            v-decorator="[
              'poin1',
              {rules: [{ message: 'Please enter poin 1', required: true}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :lg="4">
        <a-form-item label="Poin 2">
          <a-input-number
            :max="10"
            :min="1"
            v-decorator="[
              'poin2',
              {rules: [{ message: 'Please enter poin 2', required: true}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :lg="4">
        <a-form-item label="Poin 3">
          <a-input-number
            :max="10"
            :min="1"
            v-decorator="[
              'poin3',
              {rules: [{ message: 'Please enter poin 3', required: true}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :lg="4">
        <a-form-item label="Poin 4">
          <a-input-number
            :max="10"
            :min="1"
            v-decorator="[
              'poin4',
              {rules: [{ message: 'Please enter poin 4', required: true}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :lg="4">
        <a-form-item label="Poin 5">
          <a-input-number
            :max="10"
            :min="1"
            v-decorator="[
              'poin5',
              {rules: [{ message: 'Please enter poin 5', required: true}]}
            ]" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col>
        <a-form-item label="Sifat Kriteria">
          <a-select
            v-decorator="[
                'sifat',
                {rules: [{ required: true, message: 'Please choose sifat kriteria'}]}
              ]">
            <a-select-option
              value="Benefit"
            >
              Benefit
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit" >Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
    export default {
        name: 'RepositoryForm',
        props: {
            showSubmit: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                form: this.$form.createForm(this)
            }
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$notification.error({
                            message: 'Received values of form:',
                            description: values
                        })
                    }
                })
            },
            validate (rule, value, callback) {
                const regex = /^user-(.*)$/
                if (!regex.test(value)) {
                    callback(new Error('需要以 user- 开头'))
                }
                callback()
            }
        }
    }
</script>

<style scoped>

</style>
