<template>
    <m-page class="page-signup" title="ユーザー登録">
        <m-form class="c-signup-form">
            <c-error :errors.sync="errors" />
            <c-labeled-item label="お名前" required>
                <input v-model="form.name" type="text" />
            </c-labeled-item>
            <c-labeled-item label="メールアドレス" required>
                <input v-model="form.email" type="text" />
            </c-labeled-item>
            <c-labeled-item label="パスワード" required>
                <input v-model="form.password" type="password" />
            </c-labeled-item>
            <c-labeled-item label="パスワード（確認）" required>
                <input v-model="form.password_confirmation" type="password" />
            </c-labeled-item>
            <c-button label="上記の内容で登録" tiny warning @c-click="signup" />
        </m-form>
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApplicationError, BadRequest } from '~/types/error'
@Component({
    head: {
        titleTemplate: 'ユーザー登録 | %s'
    }
})
export default class PageSignup extends Vue {
    errors: Array<ApplicationError> = []
    form = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    async signup() {
        try {
            this.errors = []
            // バリデーション
            if (this.form.name.length === 0) {
                this.errors.push(new BadRequest('名前が入力されていません'))
            }
            if (this.form.email.length === 0) {
                this.errors.push(new BadRequest('メールアドレスが入力されていません'))
            }
            if (this.form.password.length === 0) {
                this.errors.push(new BadRequest('パスワードが入力されていません'))
            }
            if (this.form.password_confirmation.length === 0) {
                this.errors.push(new BadRequest('パスワード（確認）が入力されていません'))
            }
            if (this.errors.length === 0) {
                const response = await this.$axios.$post('/api/signup', this.form).catch((e) => {
                console.log('ユーザー登録失敗')
                })
                // クッキーにアクセストークンを保存
                this.$cookies.set('__cred__', response.access_token, {
                    path: '/',
                })
                // ダッシュボードに遷移
                this.$router.replace('/song')
            }
        } catch (e) {
            this.errors.push(e)
        }
    }

    mounted() {
        if(!this.$store.getters['user/isGuest']) {
            this.$router.replace('/dashboard')
        }
    }
}
</script>

<style lang="stylus">
.page-signup
    .c-signup-form
        text-align center
</style>