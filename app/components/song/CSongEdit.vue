<template>
    <m-modal
        :visible.sync="modalVisible"
        width="900px"
        height="80vh"
        :title="syncModel.id === null ? '新しい曲を登録' : syncModel.title + 'を編集'"
        :is-button="false"
    >
        <m-form v-if="showModal == '1'" title="基本情報" class="c-song-edit-form">
            <c-error :errors.sync="errors" />
            <c-labeled-item label="曲名" required>
                <c-text-input :model.sync="model.title" />
            </c-labeled-item>
            <c-labeled-item label="アーティスト名" required>
                <c-text-input :model.sync="model.artist_name" />
            </c-labeled-item>
            <c-labeled-item label="曲の年代" required>
                <c-dropdown :model.sync="model.music_age" :items="musicAgeItems" data-value="value" />
            </c-labeled-item>
            <div class="button-area">
                <c-button label="キャンセル" small @c-click="cancelHandler" />
                <c-button label="次へ" primary small @c-click="nextHandler" />
            </div>
        </m-form>
        <m-form v-else-if="showModal == '2'" title="詳細情報" class="c-song-edit-form">
            <c-error :errors.sync="errors" />
            <c-labeled-item label="曲の紹介">
                <c-text-input :model.sync="model.description" multiline />
            </c-labeled-item>
            <c-labeled-item label="YouTubeのURL">
                https://www.youtube.com/watch?v=
                <c-text-input :model.sync="model.video_url" />
            </c-labeled-item>
            <div class="button-area">
                <c-button class="button-back" label="戻る" small @c-click="previousHandler" />
                <c-button class="button-confirm" label="完了" :disabled="saveButtonDisabled" primary small @c-click="saveHandler" />
            </div>
        </m-form>
    </m-modal>
</template>
<script lang="ts">
import { Component, Vue, PropSync, Watch } from 'vue-property-decorator'
import { ISong } from '~/types/song'
import { ApplicationError, BadRequest } from '~/types/error'
@Component
export default class CSongEdit extends Vue {
    @PropSync('visible') modalVisible!: boolean
    @PropSync('model') syncModel!: ISong
    errors: Array<ApplicationError> = []
    showModal: number = 1
    musicAgeItems = [
        { label: '1970年代', value: 1970 },
        { label: '1980年代', value: 1980 },
        { label: '1990年代', value: 1990 },
        { label: '2000年代', value: 2000 },
        { label: '2010年代', value: 2010 }
    ]
    // 次へボタンが押された
    async nextHandler() {
        try {
            this.errors = []
            // バリデーション
            if (this.syncModel.title.length === 0) {
                this.errors.push(new BadRequest('曲名が入力されていません'))
            }
            if (this.syncModel.artist_name.length === 0) {
                this.errors.push(new BadRequest('アーティスト名が入力されていません'))
            }
            if (!this.syncModel.music_age) {
                this.errors.push(new BadRequest('曲の年代が入力されていません'))
            }
            // 次の入力画面へ画面遷移する
            if (this.errors.length === 0) {
                this.showModal = 2
            }
        } catch (e) {
            this.errors.push(e)
        }
    }
    // 前へボタンが押された
    previousHandler() {
        this.showModal = 1
    }
    // キャンセルボタンが押された
    cancelHandler() {
        this.modalVisible = false
        this.showModal = 1
    }
    // 完了ボタンが押された
    saveButtonDisabled: boolean = false
    async saveHandler() {
        this.saveButtonDisabled = true
        this.errors = []
        try {
            if (this.syncModel.id !== null) {
                await this.$axios.$put(`/api/song/${this.syncModel.id}`, this.syncModel).catch((e) => {
                    const { message, code } = e.response.data
                    throw new ApplicationError(message, code)
                })
            } else {
                await this.$axios.$post('/api/song', this.syncModel).catch((e) => {
                    const { message, code } = e.response.data
                    throw new ApplicationError(message, code)
                })
            }
            this.modalVisible = false
            this.$emit('c-song-edit-finished')
            this.showModal = 1
            this.saveButtonDisabled = false
        } catch (e) {
            this.errors.push(e)
            this.saveButtonDisabled = false
        }
    }
}
</script>
<style lang="stylus">
.c-song-edit-form
    .c-text-input
        ::placeholder
            text-align right
</style>