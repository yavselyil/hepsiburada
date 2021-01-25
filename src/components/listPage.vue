<template>
  <div style="padding: 20px">
    <a-row :gutter="16">
      <div class="link-div">
        <a-button class="link" style="width: 30%" type="primary" @click="goToRoute">Add New Link </a-button>
      </div>
    </a-row>
    <a-row :gutter="16">
      <a-select placeholder="Select an order" style="width: 30%" @change="handleChange">
        <a-select-option value="mostVoted">Most Voted <a-icon type="sort-descending" /></a-select-option>
        <a-select-option value="lessVoted">Less Voted <a-icon type="sort-ascending" /></a-select-option>
      </a-select>
    </a-row>
    <a-list
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="list"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-popover placement="rightTop">
          <template slot="content">
            <a-button id="deleteBtn" type="danger" @click="openDialogModal(item)">
              Delete
            </a-button>
          </template>
          <a-card :title="item.name" :bordered="true">
            <p style="font-size: 18px;">Point: {{ item.points }}</p>
            <p class="title">{{ item.url }}</p>
          </a-card>
        </a-popover>
        <div class="btns">
          <a-button class="btn" @click="upvote(item)"><a-icon type="plus-circle" /> Up Vote </a-button>
          <a-button class="btn" @click="downvote(item)"><a-icon type="minus-circle" /> Down Vote</a-button>
        </div>
      </a-list-item>
    </a-list>
    <a-modal v-model="visible" title="Remove" @ok="removeItem('success')">
      <p>Are you sure want to delete?</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "listPage",
  props: {
      clickMe: {
        type: Function
      }
  },
  data() {
    return {
      selectedItem: "",
      selectedSortType: "",
      list: [],
      current: 0,
      name: "hello",
      visible: false,
      point: 0,
      link: "www.hepsiburada.com",
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
    };
  },
  methods: {
    removeItem(type) {
      let index = this.list.indexOf(this.selectedItem);
      console.warn("oklandı", this.selectedItem, index);
      this.list.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(this.list));
      this.visible = false;
      this.$notification[type]({
        message: 'Success',
        description:
          'You successfully deleted the item',
      });
    },
    handleChange(val) {
      this.selectedSortType = val;
      this.sort(val);
    },
    sort(val) {
      if (val === "lessVoted") {
        this.list.sort(function (a, b) {
          if (a.points < b.points) return -1;
          if (a.points > b.points) return 1;
          return 0;
        });
      } else if (val === "mostVoted") {
        this.list.sort(function (a, b) {
          if (a.points < b.points) return 1;
          if (a.points > b.points) return -1;
          if (a.points === b.points) {
            if (
              new Date(a.eventClicked).getTime() <
              new Date(b.eventClicked).getTime()
            )
              return 1;
            if (
              new Date(a.eventClicked).getTime() >
              new Date(b.eventClicked).getTime()
            )
              return -1;

            return 0;
          }
        });
      }
    },
    goToRoute() {
      this.$router.push({ name: "create" });
    },
    openDialogModal(item) {
      this.visible = true;
      this.selectedItem = item;
    },
    handleOk() {
      this.visible = false;
    },
    upvote(item) {
      let index = this.list.indexOf(item);
      this.list[index].points++;
      let date = new Date();
      this.list[index].eventClicked = date;
      localStorage.setItem("list", JSON.stringify(this.list));
      this.sort(this.selectedSortType);
    },
    downvote(item) {
      let index = this.list.indexOf(item);
      this.list[index].points--;
      let date = new Date();
      this.list[index].eventClicked = date;
      localStorage.setItem("list", JSON.stringify(this.list));
      this.sort(this.selectedSortType);
    },
  },
  created() {
    if (!localStorage.getItem("list")) {
      let exampleData = [
        {
          name: "HepsiBurada",
          url: "www.hepsiburada.com",
          points: 18,
          eventClicked: "2021-01-23T21:49:34.235Z",
        },
        {
          name: "Hepsi Express",
          url: "www.hepsiexpress.com",
          points: 19,
          eventClicked: "2021-01-23T21:49:32.741Z",
        }
      ];
      JSON.parse(localStorage.setItem("list", JSON.stringify(exampleData)));
    }
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("list")).reverse();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .ant-list-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/deep/ .ant-card:hover {
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
}
/deep/ .ant-list-vertical .ant-list-item {
    align-items: initial;
    width: 30%;
}
/deep/ .ant-pagination {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    text-align: center;
}
.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.btn {
  border: none;
}
.link {
 margin-bottom: 20px
}
.title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
@media screen and (max-width: 576px) {
  .ant-list-vertical .ant-list-item {
      flex-wrap: wrap-reverse;
      width: 70% !important;
  }
}
.btns {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px
}
</style>