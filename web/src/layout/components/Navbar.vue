<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <span class="github-btn">
        <a class="gh-btn" href="https://github.com/zhenorzz" target="_blank">
          <span class="gh-ico" />
          <span class="gh-text">Follow @zhenorzz</span>
        </a>
      </span>
      <span class="github-btn">
        <a class="gh-btn" href="https://github.com/zhenorzz/goploy/" target="_blank">
          <span class="gh-ico" />
          <span class="gh-text">Star</span>
        </a>
        <a class="gh-count" href="https://github.com/zhenorzz/goploy/stargazers" target="_blank">{{ starCount }}</a>
      </span>
      <span class="github-btn github-forks">
        <a class="gh-btn" href="https://github.com/zhenorzz/goploy/fork" target="_blank">
          <span class="gh-ico" aria-hidden="true" />
          <span class="gh-text">Fork</span>
        </a>
        <a class="gh-count" href="https://github.com/zhenorzz/goploy/network" target="_blank">{{ forkCount }}</a>
      </span>
      <el-dropdown class="user-container" trigger="click" size="medium">
        <div class="user-wrapper">
          {{ name }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/user/info">
            <el-dropdown-item>
              个人信息设置
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      starCount: 0,
      forkCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  created() {
    fetch('https://api.github.com/repos/zhenorzz/goploy').then(response => response.json()).then(data => {
      this.starCount = data.stargazers_count
      this.forkCount = data.forks_count
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .github-btn {
      display: inline-block;
      font: 700 11px/14px 'Helvetica Neue',Helvetica,Arial,sans-serif;
      height: 20px;
      overflow: hidden;
      margin-right: 3px;
      position: relative;
      top:5px;
      .gh-btn, .gh-count {
        padding: 2px 5px 2px 4px;
        color: #333;
        text-decoration: none;
        text-shadow: 0 1px 0 #fff;
        white-space: nowrap;
        cursor: pointer;
        border-radius: 3px
      }
      .gh-btn, .gh-count,.gh-ico {
        float: left
      }
      .gh-btn {
        background-color: #eee;
        background-image: linear-gradient(to bottom,#fcfcfc 0,#eee 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#eeeeee', GradientType=0);
        background-repeat: no-repeat;
        border: 1px solid #d5d5d5;
        position: relative;
        &:focus,&:hover{
          text-decoration: none;
          background-color: #ddd;
          background-image: linear-gradient(to bottom,#eee 0,#ddd 100%);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#dddddd', GradientType=0);
          border-color: #ccc
        }
        &:active {
          background-image: none;
          background-color: #dcdcdc;
          border-color: #b5b5b5;
          box-shadow: inset 0 2px 4px rgba(0,0,0,.15)
        }
      }
      .gh-ico {
        width: 14px;
        height: 14px;
        margin-right: 4px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4=);
        background-size: 100% 100%;
        background-repeat: no-repeat
      }
      .gh-count {
        position: relative;
        display: none;
        margin-left: 4px;
        background-color: #fafafa;
        border: 1px solid #d4d4d4;
        z-index: 1;
        display: block;
        &:focus,&:hover {
          color: #4183C4
        }
        &:after,&:before {
          content: '';
          position: absolute;
          display: inline-block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid
        }
        &:before {
          top: 50%;
          left: -2px;
          margin-top: -3px;
          border-width: 2px 2px 2px 0;
          border-right-color: #fafafa
        }

        &:after {
          top: 50%;
          left: -3px;
          z-index: -1;
          margin-top: -4px;
          border-width: 3px 3px 3px 0;
          border-right-color: #d4d4d4
        }
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .user-container {
      margin-right: 30px;

      .user-wrapper {
        position: relative;
      }
    }
  }
}
</style>
