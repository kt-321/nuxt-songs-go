<template>
    <m-panel v-if="user" class="c-user-detail-info">
        <table class="table no-border">
            <tbody>
                <tr>
                    <td style="width:120px">名前</td>
                    <td>{{ user.name }}</td>
                </tr>
                <tr v-if="user.age">
                    <td>年齢</td>
                    <td>{{ user.age }}代</td>
                </tr>
                <tr v-if="user.gender">
                    <td>性別</td>
                    <td>{{ user.gender | genderFormat}}</td>
                </tr>
                <tr v-if="user.favorite_music_age">
                    <td>好きな音楽の年代</td>
                    <td>{{ user.favorite_music_age }}年代</td>
                </tr>
                <tr v-if="user.favorite_artist">
                    <td>好きなアーティスト</td>
                    <td>{{ user.favorite_artist }}</td>
                </tr>
                <tr v-if="user.comment">
                    <td>コメント</td>
                    <td>{{ user.comment }}</td>
                </tr>
            </tbody>
        </table>
    </m-panel>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
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
export default class CUserDetailInfo extends Vue {
    @Prop(Object) user!: ILoginUser
}
</script>

<style lang="stylus">
.c-user-detail-info
    .table
        margin-bottom: 16px
</style>