<template>
  <tr v-if="!visible">
    <td colspan="20" style="line-height:80px; text-align: center;">没有数据</td>
  </tr>
</template>
<script>
export default {
  props: ['visible']
}
</script>