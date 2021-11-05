<template>
  <div class="container">
    <div class="pt-4">
      <div class="card border-success mb-3" style="max-width: 640px">
        <div class="row g-0">
          <div class="col" style="max-width: 96px">
            <img v-bind:src="user.avatar" class="img-fluid rounded-start" />
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ user.name }}</h5>
              <p class="card-text">
                <small class="text-muted">{{ user.email }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isTeacher">
      <embed
        v-bind:src="formURL"
        width="100%"
        height="2500"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        >Loading…</embed
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: "",
      formURL: "",
      isTeacher: false
    };
  },
  methods: {},
  mounted() {
    var vm = this;
    axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4yEEBcaKhjlHMm-0n6mMGWeufXPNFfsoDE_OxzFDaqyR-NsniaooWDq0jZFFXNVTtLZi5KHircUv6/pub?gid=422401452&single=true&output=csv"
      )
      .then(function (response) {
        // handle success
        let res = response.data;
        if (res.includes(vm.user.email)) {
          vm.formURL =
            "https://docs.google.com/forms/d/e/1FAIpQLSePYL6e2KkIRwLwZt0NE6q77n1ID-M8XP-GqacIfUKCAUhqAw/viewform?usp=pp_url&embedded=true&entry.1783085868=" +
            vm.user.email;
          vm.isTeacher = true;
        } else {
          alert("กรุณาเข้าสู่ระบบใหม่ด้วย email ของครูโรงเรียนภูเขียว");
          window.location.href = "/logout";
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  props: ["user"],
};
</script>
<style>
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  padding: 0;
}
</style>
