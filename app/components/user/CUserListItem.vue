<template>
    <li v-if="user" class="c-user-list-item">
        <m-column center>
            <div class="c-user-list-item-photo">
                <img v-if="user.image_url" :src="user.image_url" />
                <img v-else src="/img/user-icon.png" />
                <nuxt-link :to="`/user/${user.id}`" class="button primary">ユーザー詳細へ</nuxt-link>
            </div>
            <table class="c-user-list-item-data table no-border">
                <tbody>
                    <tr>
                        <th style="width: 130px">名前</th>
                        <td>
                            <p class="item-header">
                                <strong>{{ user.name }}</strong>
                            </p>
                        </td>
                    </tr>
                    <tr v-if="user.age">
                        <th>年齢</th>
                        <td>{{ user.age }}代</td>
                    </tr>
                    <tr v-if="user.gender">
                        <th>性別</th>
                        <td>{{ user.gender | genderFormat }}</td>
                    </tr>
                    <tr v-if="user.favorite_music_age">
                        <th>好きな音楽の年代</th>
                        <td>{{ user.favorite_music_age }}年代</td>
                    </tr>
                    <tr v-if="user.favorite_artist">
                        <th>好きなアーティスト</th>
                        <td>{{ user.favorite_artist }}</td>
                    </tr>
                    <tr v-if="user.comment">
                        <th>コメント</th>
                        <td>{{ user.comment }}</td>
                    </tr>
                </tbody>
            </table>
        </m-column>
    </li>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ILoginUser } from '~/types/user'
@Component({
    filters: {
        genderFormat: (gender: string) => {
            if (gender === '1') {
                return '男性'
            } else if (gender === '2') {
                return '女性'
            } else {
                return '-'
            }
        }
    }
})
export default class CUserListItem extends Vue {
    @Prop(Object) user!: ILoginUser
}
</script>

<style lang="stylus">
.c-user-list-item
    padding: 8px 4px
    border-bottom: 1px solid #ddd
    cursor: pointer
    .c-user-list-item-photo
        flex: 0 0 200px !important
        height: 200px
        position: relative
        background-color: #eee
        margin-right: 8px
        img
            width: 100%
        .button
            position: absolute
            right: 8px
            bottom: 8px
    .c-user-list-item-data
        flex: 1 1 auto !important
        tr:first-child
            th, td strong
                font-weight: bold
                font-size: 14px
            td
                .item-header
                    display: flex
                    justify-content: space-between
                    .tags
                        text-align: right
                        .tag
                            margin-left: 8px
</style>