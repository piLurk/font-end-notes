<template>
  <div class="tableWrap">
    <table>
      <table-header></table-header>
      <table-body
        :data="dataList"
      >
      </table-body>
      <table-footer></table-footer>
    </table>
  </div>
</template>

<script>

export default {
  props:{

  },
  data() {
    return {

    }
  },

}

</script>