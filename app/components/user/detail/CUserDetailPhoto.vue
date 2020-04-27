<template>
    <div v-if="user" class="c-user-detail-photo">
        <div class="user-photo">
            <img v-if="user.image_url" :src="user.image_url" />
            <img v-else src="/img/user-icon.png" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ILoginUser } from '~/types/user'
@Component
export default class CUserDetailPhoto extends Vue {
    // ユーザー情報
    @Prop(Object) user!: ILoginUser
}
</script>

<style lang="stylus">
.c-user-photo
    position: relative
    width: 100%
    margin-bottom: 16px
    &:before
        content: ''
        display: block
        padding-top: 100%
    .user-photo
        position: absolute
        width: 100%
        height: 100%
        left: 0
        top: 0
        right: 0
        bottom: 0
        background-color: $light-bg-color
        border-radius: 4px
        img
            width: 100%
            border-radius: 4px
</style>