<template>
    <m-page class="page-user-index">
        <ul class="user-list">
            <li v-if="users.length > 0">
                全ユーザー数: {{ users.length }}名
            </li>
            <li v-else>
                <c-message warning>ユーザーが見つかりませんでした</c-message>
            </li>
            <c-user-list-item v-for="user in users" :key="user.id" :user="user" />
        </ul>
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CUserListItem from '~/components/user/CUserListItem.vue'
import { ILoginUser } from '~/types/user'
@Component({
    head: {
        titleTemplate: 'ユーザ一覧 | %s'
    },
    components: {
        CUserListItem
    }
})
export default class PageUserIndex extends Vue {
    users: Array<ILoginUser> = []
    // ユーザ一覧を読み込み
    async loadUsers() {
        await this.$store.dispatch('user/sync')
        this.users = await this.$store.getters['user/list']
    }
    mounted () {
        if(this.$store.getters['user/isGuest']) {
            this.$router.replace('/user/signin')
        }
        this.loadUsers()
    }
}
</script>

<style lang="stylus"></style>
