<!--
 * @Author: your name
 * @Date: 2021-01-11 16:35:25
 * @LastEditTime: 2021-01-14 11:59:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /live-merchant-enter-back/src/pages/selectTree.vue
-->
<!--
 * @Author: your name
 * @Date: 2020-12-30 14:09:15
 * @LastEditTime: 2021-01-11 16:34:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /live-merchant-enter-back/src/pages/supplier_management/contract_details.vue
-->
<style lang="scss" scoped>
  // @import '../../css/pages/contract.scss';
</style>
<template>
  <div id="contract_details">
    <SelectTree
               :props="props"
               :options="options"
               :value="valueId"
               :clearable="isClearable"
               :accordion="isAccordion"
               @getValue="getValue($event)"/>
  </div>
</template>
<script>
  import SelectTree from "../components/treeSelect.vue";

  export default {
    data () {
      return {
        isClearable:true,      // 可清空（可选）
        isAccordion:false,      // 可收起（可选）
        valueId:'0',            // 初始ID（可选）
        props:{                // 配置项（必选）
          value: 'id',
          label: 'label',
          children: 'children',
          // disabled:true
        },
        options:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      };
    },
    components:{
      SelectTree
    },
    mounted(){
     
    },
    methods:{
      // 取值
      getValue(value){
        this.valueId = value;
        console.log(value)
      },
    }
  }
</script>