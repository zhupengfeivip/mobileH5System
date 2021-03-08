<template>
  <van-form>
    <van-nav-bar
      title="设备管理"
      left-text="返回"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell
      v-for="item in list"
      :key="item.id"
      :title="item.deviceName"
      is-link
      :label="item.createdAt"
      @click="
        show = true;
        currentId = item.id;
        currentName = item.deviceName;
      "
    >
    </van-cell>
    <van-pagination
      v-model="listQuery.page"
      :total-items="totalCount"
      :page-count="pageCount"
      :show-page-size="listQuery.limit"
      mode="simple"
      @change="getInfo()"
    />
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </van-form>
</template>

<script>
import { getDeviceList } from "@/api";

export default {
  name: 'list2',
  components: {},
  computed: {

  },
  data() {
    return {
      totalCount: 0,
      pageCount: 0,
      currentId: 0,
      currentName: '',
      show: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      list: [],
      actions: [{ name: '编辑', action: 'edit' }, { name: '删除', action: 'delete' }],
    }
  },
  async created() {
    // const { roles } = await this.$store.dispatch('user/getInfo');
    // console.log('role', roles);
    // console.log('role', this.roles);
    //只有管理员有远程锁定功能
    // if (roles.indexOf('admin') >= 0)
    //   this.actions.push({ name: '远程锁定', action: 'lock' });
    this.getInfo()
  },
  methods: {
    async getInfo() {
      let { code, msg, data } = await getDeviceList(this.listQuery);
      console.log(data)
      this.totalCount = data.total;
      this.pageCount = data.pageTotal;
      this.list = data.items;
    },
    onCellClick(cell) {
      this.show = true;
      console.log(cell);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;

      if (item.action == 'edit') {
        this.$router.push({ name: 'list2_edit', params: { id: this.currentId } });
      }
      else if (item.action == 'delete') {
        //删除设备
        this.deleteDevice(this.currentId);
      }
      else if (item.action == 'lock') {
        //锁定设备

      }
      else {
        this.$toast(`暂不支持当前命令${item.action}`);
      }
    },
    deleteDevice(companyId) {
      this.$dialog.confirm({
        message: '确定要删除【' + this.currentName + "】吗？",
      })
        .then(() => {
          //确定删除
          deleteDevice({ id: this.currentId }).then(() => {
            this.getInfo();
          });

        })
        .catch(() => {
          // on cancel
        });
    },
    onClickLeft() {
      this.$router.push('/show');
    },
    onClickRight() {
      this.$router.push('/list2_edit');
    },
  }
}

</script>

<style>
</style>
