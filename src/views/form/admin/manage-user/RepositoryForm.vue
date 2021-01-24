<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item label="Username">
          <a-input
            placeholder="Please enter username"
            v-decorator="[
              'username',
              {rules: [{ message: 'Please enter username', whitespace: false}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item label="Full Name">
          <a-input
            placeholder="Please enter fullname"
            v-decorator="[
              'name',
              {rules: [{ required: true, message: 'Please enter fullname', whitespace: true}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item label="E-mail">
          <a-input
            placeholder="Please enter email address"
            v-decorator="[
              'email',
              {rules: [{ required: true, message: 'Please enter email address', whitespace: true}]}
            ]" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item label="NIK">
          <a-input
            placeholder="Please enter NIK"
            v-decorator="[
              'mediaselid',
              {rules: [{ message: 'Please enter NIK', whitespace: false}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item
          label="Region">
          <a-select placeholder="Select Region" v-decorator="[ 'area', {rules: [{ required: true, message: 'regional'}]} ]">
            <a-select-option value="area">AREA</a-select-option>
            <a-select-option value="sumbagut">Sumbagut</a-select-option>
            <a-select-option value="Sumbagteng">Sumbagteng</a-select-option>
            <a-select-option value="Sumbagsel">Sumbagsel</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item
          label="User Type">
          <a-select placeholder="Select UserType" v-decorator="[ 'group', {rules: [{ required: true, message: 'usertype'}]} ]">
            <a-select-option value="3">User Excecutor</a-select-option>
            <a-select-option value="1">Site Admin</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col>
        <a-form-item label="Password">
          <a-input-password
            placeholder="Please enter Password"
            v-decorator="[
              'password',
              {rules: [{ required: true, message: 'Please enter Password', whitespace: false}]}
            ]" />
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
