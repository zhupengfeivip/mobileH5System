<template>
  <van-form>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="goLastOnePage"
    />
    <van-field
      readonly
      clickable
      is-link
      name="compayPicker"
      :value="deviceInfo.companyIdText"
      label="所属公司"
      placeholder="请先选择给哪个公司创建设备"
      @click="showCompanyListPicker = true"
    />
    <van-popup v-model="showCompanyListPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="companyTextList"
        @confirm="onCompanyListConfirm"
        @cancel="showCompanyListPicker = false"
      />
    </van-popup>
    <van-field
      readonly
      clickable
      is-link
      name="deviceTypeIdPicker"
      :value="deviceInfo.deviceTypeIdText"
      label="设备类型"
      placeholder="点击选择设备类型"
      @click="showDeviceTypeIdPicker = true"
    />
    <van-popup v-model="showDeviceTypeIdPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="deviceTypeIdColumns"
        @confirm="onDeviceTypeIdPickerConfirm"
        @cancel="showDeviceTypeIdPicker = false"
      />
    </van-popup>
    <van-field
      v-model="deviceInfo.deviceName"
      required
      name="deviceName"
      label="设备名称"
      placeholder="请输入设备名称"
      :rules="[{ validator, message: '请正确输入设备名称' }]"
    />
    <van-field
      v-model="deviceInfo.imme"
      required
      name="imme"
      label="imme"
      placeholder="请输入DTU串号，见DTU正面文字"
      :rules="[{ validator, message: '请正确输入' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit" @click="doSave"
        >提交</van-button
      >
    </div>
  </van-form>
</template>

<script>
import { Toast, Dialog } from 'vant'
// import { getAllCompanyList, getOperatorCompanyByToken } from '@/api/company'
// import { createDevice, updateDevice, getDeviceDetail } from '@/api/device'
import { Picker } from 'vant';
// import { mapGetters } from 'vuex'

export default {
  components: {},
  computed: {
    // ...mapGetters([
    //   'roles'
    // ])
  },
  data() {
    return {
      title: '',
      action: '',
      deviceTypeIdColumns: ['1:某设备'],
      showCompanyListPicker: false,
      companyList: [],
      companyTextList: [],
      showDeviceTypeIdPicker: false,
      deviceInfo: {
        id: null,
        imme: null,
        deviceName: null,
        deviceTypeId: null,
        deviceTypeIdText: '',
        companyId: null,
        companyIdText: ''
      }
    }
  },
  async created() {
    // const { roles } = await this.$store.dispatch('user/getInfo');
    // console.log('role', roles);
    // console.log('roles', this.roles);
    // if (roles.indexOf('admin') >= 0)
    //   this.identityColumns = ['1:系统管理员', '2:代理商', '3:公司管理员', '4:员工'];
    // else if (roles.indexOf('agent') >= 0)
    //   this.identityColumns = ['3:公司管理员', '4:员工'];
    // else if (roles.indexOf('boss') >= 0)
    //   this.identityColumns = ['4:员工'];
    // else if (roles.indexOf('operator') >= 0) {
    //   //普通员工无权限，返回到首页
    //   this.$toast('普通员工无权限创建操作员');
    //   this.$router.push({ name: 'home' });
    // }

    this.deviceInfo.id = this.$route.params.id;

    // let res = await getOperatorCompanyByToken();
    // for (let i = 0; i < res.data.length; i++) {
    //   const company = res.data[i];
    //   this.companyTextList.push(`${company.id}:${company.companyName}`);
    //   this.companyList.push({ id: company.id, companyName: company.companyName });
    // }

    if (this.deviceInfo.id == undefined) {
      this.title = "新增设备";
      this.action = 'add';
    }
    else {
      this.title = "修改设备";
      this.action = "edit";

      res = await getDeviceDetail({ id: this.deviceInfo.id });
      this.deviceInfo.deviceName = res.data.deviceName;
      this.deviceInfo.imme = res.data.imme;
      this.deviceInfo.deviceTypeId = res.data.deviceTypeId;
      this.deviceInfo.companyId = res.data.companyId;

      this.deviceInfo.deviceTypeIdText = '1:某设备';
      this.deviceInfo.companyIdText = `${res.data.companyId}:${res.data.companyName}`;

      console.log('this.deviceInfo', this.deviceInfo);
    }
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return true
    },
    goLastOnePage() {
      this.$router.push({ name: 'list2' });
    },
    onCompanyListConfirm(value) {
      console.log('onCompanyListConfirm', value);
      this.deviceInfo.companyIdText = value;
      this.deviceInfo.companyId = this.deviceInfo.companyIdText.split(':')[0];
      this.showCompanyListPicker = false;
    },
    onDeviceTypeIdPickerConfirm(value) {
      console.log(value);
      this.deviceInfo.deviceTypeIdText = value;
      this.deviceInfo.deviceTypeId = this.deviceInfo.deviceTypeIdText.split(':')[0];
      this.showDeviceTypeIdPicker = false;
    },
    doSave() {
      if (this.deviceInfo.deviceName == '') {
        Toast.fail('名称不能为空');
        return;
      }
      console.log('deviceInfo', this.deviceInfo);
      if (this.action === 'add') {
        //新增
        createDevice(this.deviceInfo).then(() => {
          this.$toast('创建成功');
          this.goLastOnePage();
        });
      }
      else {
        //修改
        updateDevice(this.deviceInfo).then(() => {
          this.$toast('修改成功');
          this.goLastOnePage();
        });
      }

    },

  }
}

</script>

<style>
</style>
